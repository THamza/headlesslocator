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
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

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
  }));

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
    <div>
      <Header />
      <div className="grid min-h-screen w-full grid-cols-[1fr_600px]">
        <div className="relative">
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
                  max={20}
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
                // fixedMarker
                onMarkerDragEnd={handleMarkerDragEnd}
                users={users}
              />
            )}
          </div>
        </div>
        <div className="border-l bg-muted/40 px-4 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Users</h2>
            <Button variant="outline" size="sm">
              <CSVLink
                data={csvData}
                filename={"users.csv"}
                className="text-black"
              >
                Export
              </CSVLink>
            </Button>
          </div>
          <div className="mt-4 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telegram</TableHead>
                  <TableHead>Interests</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
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
                      <TableCell>{user.interests}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
