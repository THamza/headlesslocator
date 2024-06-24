import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, MapPinIcon, SearchIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Profile } from "@prisma/client";
import { toast } from "./ui/use-toast";
import dynamic from "next/dynamic";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Badge } from "./ui/badge";
import { TelegramUsernameTutorial } from "./TelegramUsernameTutorial";
import { Separator } from "./ui/separator";
import { debounce } from "@/lib/utils";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

type PartialProfile = Partial<Profile>;

type ProfileEditProps = {
  profile: Profile | null;
};

const LONDON_COORDS = { lat: 51.505, lng: -0.09 };

export default function ProfileEdit({ profile }: ProfileEditProps) {
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isAddressSearchLoading, setIsAddressSearchLoading] = useState(false);
  const [position, setPosition] = useState({
    lat: profile?.latitude || LONDON_COORDS.lat,
    lng: profile?.longitude || LONDON_COORDS.lng,
  });
  const [formData, setFormData] = useState<PartialProfile>({
    email: profile?.email || "",
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    telegram: profile?.telegram || "",
    interests: profile?.interests || "",
    address: profile?.address || "",
    country: profile?.country || "",
    city: profile?.city || "",
    state: profile?.state || "",
    zipCode: profile?.zipCode || "",
    latitude: position.lat,
    longitude: position.lng,
  });

  const formDataRef = useRef<PartialProfile>(formData);
  formDataRef.current = formData;

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, interests: value });
  };

  const handleAddressSearch = useCallback(async () => {
    const { city, state, zipCode, country } = formDataRef.current;
    if (!city && !state && !zipCode && !country) return;

    setIsAddressSearchLoading(true);

    const params = new URLSearchParams({
      city: city || "",
      state: state || "",
      postalcode: zipCode || "",
      country: country || "",
      format: "json",
    });

    const url = `https://nominatim.openstreetmap.org/search?${params.toString()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setIsAddressSearchLoading(false);

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        toast({
          title: "Address not found",
          description: "Could not find the address. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsAddressSearchLoading(false);
      console.error("Failed to fetch the address:", error);
      toast({
        title: "Error",
        description:
          "Failed to fetch the address. Please check your network connection and try again.",
        variant: "destructive",
      });
    }
  }, []);

  const debouncedAddressSearch = useMemo(
    () => debounce(handleAddressSearch, 1500),
    []
  );

  // Apply change handlers for individual inputs related to the address search
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Trigger debouncing if the changed field is relevant to the address
    if (["city", "state", "zipCode", "country"].includes(e.target.name)) {
      debouncedAddressSearch();
    }
  };

  const handleMarkerDragEnd = (latlng: { lat: number; lng: number }) => {
    setPosition({ lat: latlng.lat, lng: latlng.lng });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUpdateLoading(true);
    formData.latitude = position.lat;
    formData.longitude = position.lng;
    formData.address =
      `${formData.city} ${formData.state} ${formData.zipCode} ${formData.country}`
        .replaceAll("undefined", "")
        .trim();

    const res = await fetch(`/api/profile/${profile?.clerkId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const updatedProfile = await res.json();
    setFormData(updatedProfile);
    setIsUpdateLoading(false);
    if (res.ok) {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } else {
      toast({
        title: "Profile update failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    }
  };

  if (!profile)
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <div className=" flex justify-between items-center w-full">
          <div>
            <CardTitle>Profile Setup</CardTitle>
            <CardDescription>
              Please provide your details to complete your profile.
            </CardDescription>
          </div>
          <div>
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 mt-8"
              disabled={isUpdateLoading}
            >
              {isUpdateLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={formData.email} disabled />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid w-full gap-1.5">
            <div className="flex flex-row items-center gap-1.5">
              <Label htmlFor="telegramHandle">Telegram Handle</Label>
              <TelegramUsernameTutorial />
            </div>
            <div className="flex flex-row items-center gap-1.5">
              <p className="text-gray-500">@</p>
              <Input
                id="telegramHandle"
                name="telegram"
                placeholder="Enter your Telegram handle"
                value={formData.telegram || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="interests">Interest</Label>
            <Select
              value={formData.interests || ""}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Interests</SelectLabel>
                  <SelectItem value="meeting">In-person meetings</SelectItem>
                  <SelectItem value="group-calls">Group Calls</SelectItem>
                  <SelectItem value="both">Calls and meetings</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Separator className="my-4" />
          <div className="grid w-full gap-1.5">
            <h2 className="text-lg font-semibold">Location</h2>
            <div className="grid w-full gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="San Francisco"
                    value={formData.city || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="New York"
                    value={formData.state || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    placeholder="12345"
                    type="number"
                    value={formData.zipCode || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="United States"
                    value={formData.country || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* <Button
                type="button"
                className="bg-white text-black hover:bg-gray-100 p-2 w-full"
                onClick={handleAddressSearch}
                disabled={isAddressSearchLoading}
                variant="outline"
              >
                {isAddressSearchLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <SearchIcon />
                )}
              </Button> */}
            </div>
          </div>
          <div className="h-96 w-full">
            <p className="text-gray-500 text-sm mb-2">
              Drag the marker (<MapPinIcon className="inline-block" />) on the
              map to edit or refine your location.{" "}
            </p>
            <LeafletMap
              position={position}
              zoom={13}
              onMarkerDragEnd={handleMarkerDragEnd}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800 mt-8"
            disabled={isUpdateLoading}
          >
            {isUpdateLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Update Profile"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
