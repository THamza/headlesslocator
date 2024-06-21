"use client";
import Header from "@/components/Header";
import ProfileEdit from "@/components/ProfileEdit";
import { useUser } from "@clerk/clerk-react";
import { Profile } from "@prisma/client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isProfileFetchLoading, setIsProfileFetchLoading] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    async function fetchUser() {
      if (!user) {
        return;
      }

      async function fetchProfile(userId: string) {
        setIsProfileFetchLoading(true);
        const res = await fetch(`/api/profile/${userId}`);
        const data = await res.json();
        const formattedData: Profile = {
          ...data,
          firstName: data.firstName ?? undefined,
          lastName: data.lastName ?? undefined,
          telegram: data.telegram ?? undefined,
          interests: data.interests ?? undefined,
          address: data.address ?? undefined,
          latitude: data.latitude ?? undefined,
          longitude: data.longitude ?? undefined,
        };
        setProfile(formattedData);
        setIsProfileFetchLoading(false);
      }

      fetchProfile(user.id);
    }

    fetchUser();
  }, [user]);

  if (!user) return <div>Not signed in</div>;

  return (
    <>
      <Header />
      <main className="flex justify-center p-8">
        {isProfileFetchLoading && <div>Loading...</div>}

        {isLoaded && !isProfileFetchLoading && (
          <ProfileEdit profile={profile} />
        )}
      </main>
    </>
  );
}
