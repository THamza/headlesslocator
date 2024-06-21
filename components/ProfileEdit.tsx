import { useEffect, useMemo, useState } from "react";
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
import { Loader2, MapPinIcon } from "lucide-react";
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
import LeafletMap from "./LeafletMap";

type PartialProfile = Partial<Profile>;

type ProfileEditProps = {
  profile: Profile | null;
};

export default function ProfileEdit({ profile }: ProfileEditProps) {
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [formData, setFormData] = useState<PartialProfile>({
    email: profile?.email || "",
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    telegram: profile?.telegram || "",
    interests: profile?.interests || "",
    address: profile?.address || "",
  });
  // const LMap = useMemo(
  //   () =>
  //     dynamic(() => import("@/components/LeafletMap"), {
  //       loading: () => <p>A map is loading</p>,
  //       ssr: false,
  //     }),
  //   []
  // );

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, interests: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUpdateLoading(true);

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

  if (!profile) return <div>Loading...</div>;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Profile Setup</CardTitle>
        <CardDescription>
          Please provide your details to complete your profile.
        </CardDescription>
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
            <Label htmlFor="telegramHandle">Telegram Handle</Label>
            <Input
              id="telegramHandle"
              name="telegram"
              placeholder="Enter your Telegram handle"
              value={formData.telegram || ""}
              onChange={handleChange}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="interests">Interests</Label>
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
                  <SelectItem value="meeting">Meeting People</SelectItem>
                  <SelectItem value="1-1-calls">1-1 Video Calls</SelectItem>
                  <SelectItem value="group-calls">Group Calls</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <Input
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address || ""}
                onChange={handleChange}
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-2"
              >
                <MapPinIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="h-96 w-full">
            <LeafletMap position={{ lat: 51.505, lng: -0.09 }} zoom={13} />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800"
            disabled={isUpdateLoading}
          >
            {isUpdateLoading ? <Loader2 /> : "Update Profile"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
