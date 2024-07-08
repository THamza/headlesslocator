"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { CSVLink } from "react-csv";
import { Loader2, MoreHorizontal } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MAX_RADIUS_RANGE } from "@/lib/constants";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

// Dynamically import the LeafletMap component
const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telegram: string;
  latitude: number;
  longitude: number;
  interests: string;
  country: string;
  city: string;
  state: string;
};

export default function MapPage() {
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [radius, setRadius] = useState(5);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unit, setUnit] = useState("km");
  const [isExportLoading, setIsExportLoading] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  const handleMarkerDragEnd = (latlng: { lat: number; lng: number }) => {
    setCurrentPosition({ lat: latlng.lat, lng: latlng.lng });
  };

  useEffect(() => {
    if (user) {
      const fetchProfile = async (userId: string) => {
        const res = await fetch(`/api/profile/${userId}`);
        if (res.ok) {
          const profile = await res.json();
          setCurrentPosition({
            lat: profile.latitude,
            lng: profile.longitude,
          });
        } else {
          console.error("Error fetching profile: ", res.statusText);
          toast({
            title: "Could not find your profile information",
            description: "Please update your profile first",
          });
          router.push("/profile");
        }
      };

      fetchProfile(user.id);
    }
  }, [user, router]);

  useEffect(() => {
    handleApply();
  }, [currentPosition]);

  const handleApply = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/users-within-radius`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: currentPosition?.lat,
        longitude: currentPosition?.lng,
        radius,
      }),
    });
    const data = await res.json();
    setUsers(data.users);
    setIsLoading(false);
  };

  const csvData = users.map((user) => ({
    Name: `${user.firstName} ${user.lastName}`,
    Email: user.email,
    Telegram: user.telegram
      ? user.telegram.startsWith("@")
        ? user.telegram
        : `@${user.telegram}`
      : "",
    country: user.country,
    city: user.city,
    state: user.state,
    Interests: user.interests,
  }));

  const handleEmail = async () => {
    setIsExportLoading(true);
    const emailResponse = await fetch(`/api/email/users-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: user?.firstName,
        email: user?.emailAddresses[0].emailAddress,
        users: users.map((user) => ({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          username: user.telegram,
          country: user.country,
          city: user.city,
          state: user.state,
          interests: user.interests,
        })),
      }),
    });

    setIsExportLoading(false);

    if (emailResponse.ok) {
      toast({
        title: "Email Sent",
        description: "The list of users has been sent to your email.",
      });
    } else {
      toast({
        title: "Email Failed",
        description: "There was an error sending the email. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isLoaded || !currentPosition) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!isSignedIn && isLoaded) {
    router.push("/");
    return null;
  }

  const convertedRadius = unit === "km" ? radius : radius * 0.621371; // 1 Km = 0.621371 Miles

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <ResizablePanelGroup direction="vertical" className="flex-1">
        <ResizablePanel defaultSize={50}>
          <div className="relative h-full">
            <div className="absolute top-4 right-4 z-[1000]">
              <Card className="w-[300px] bg-white">
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="flex items-center justify-between w-full mt-4">
                    <span className="font-medium">Radius</span>
                    <div className="flex items-center gap-2">
                      Km
                      <Switch
                        checked={unit === "miles"}
                        onCheckedChange={(checked) => {
                          setUnit(checked ? "miles" : "km");
                        }}
                      />
                      Miles
                    </div>
                  </div>
                  <div className="text-center">
                    {convertedRadius.toFixed(2)} {unit}
                  </div>
                  <Slider
                    min={0}
                    max={MAX_RADIUS_RANGE}
                    step={0.2}
                    defaultValue={[5]}
                    value={[radius]}
                    onValueChange={([value]) => {
                      setRadius(value);
                    }}
                  />
                  <Button
                    onClick={handleApply}
                    className="glow-button mt-2 flex w-full items-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-white"
                  >
                    Search
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="relative z-0 h-full w-full">
              {currentPosition && (
                <LeafletMap
                  position={currentPosition}
                  radius={radius}
                  zoom={13}
                  onMarkerDragEnd={handleMarkerDragEnd}
                  users={users}
                />
              )}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="border-t bg-muted/40 px-4 py-6 h-full">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Users</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isExportLoading}
                  >
                    {isExportLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <MoreHorizontal />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <CSVLink
                      data={csvData}
                      filename={"users.csv"}
                      className="text-black"
                    >
                      Export to spreadsheet
                    </CSVLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleEmail}>
                    Send by Email
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-4 overflow-auto h-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telegram</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Interests</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.telegram
                            ? user.telegram.startsWith("@")
                              ? user.telegram
                              : `@${user.telegram}`
                            : ""}
                        </TableCell>
                        <TableCell>{user.country}</TableCell>
                        <TableCell>{user.city}</TableCell>
                        <TableCell>{user.state}</TableCell>
                        <TableCell>{user.interests}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
