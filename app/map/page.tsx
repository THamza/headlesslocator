"use client";
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
import LeafletMap from "@/components/LeafletMap";
import { toast } from "@/components/ui/use-toast";
import { CSVLink } from "react-csv";
import { Loader2, MapPin } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telegram: string;
  latitude: number;
  longitude: number;
};

export default function MapPage() {
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [radius, setRadius] = useState(5);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

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
            // variant: "destructive",
          });
          router.push("/profile");
        }
      };

      fetchProfile(user.id);
    }
  }, [user, router]);

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
    Telegram: user.telegram,
  }));

  if (!isLoaded || !currentPosition) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!isSignedIn && isLoaded) {
    window.location.href = "/";
    return null;
  }

  return (
    <div>
      <Header />
      <div className="grid min-h-screen w-full grid-cols-[1fr_500px]">
        <div className="relative">
          <div className="absolute top-4 right-4 z-[1000]">
            {" "}
            {/* Ensure high z-index */}
            <Card className="w-[300px] bg-white">
              <CardContent className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-medium mt-4 mb-4">Radius</div>
                  <Slider
                    min={0}
                    max={20}
                    step={0.2}
                    defaultValue={[5]}
                    value={[radius]}
                    onValueChange={([value]) => setRadius(value)}
                    className="h-2 w-full mb-2"
                  />
                  <Button
                    onClick={handleApply}
                    className="mt-2 w-full bg-black text-white hover:bg-gray-800"
                  >
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="relative z-0 h-full w-full">
            {" "}
            {/* Ensure lower z-index */}
            {currentPosition && (
              <LeafletMap
                position={currentPosition}
                radius={radius}
                zoom={13}
                fixedMarker
                users={users} // Pass users to the LeafletMap component
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
                      <TableCell>{user.telegram}</TableCell>
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
