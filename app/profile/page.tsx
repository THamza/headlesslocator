"use client";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Profile } from "@prisma/client";
import ProfileEdit from "@/components/ProfileEdit";
import { Footer } from "@/components/layout/footer";

// Dynamically import the ProfileEdit component
// const ProfileEdit = dynamic(() => import("@/components/ProfileEdit"), {
//   ssr: false,
// });

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isProfileFetchLoading, setIsProfileFetchLoading] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

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

  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!isSignedIn && isLoaded) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Header />
      <main className="flex justify-center p-8">
        {isProfileFetchLoading && (
          <div className="flex justify-center items-center h-screen w-screen">
            <Loader2 className="animate-spin" />
          </div>
        )}

        {isLoaded && !isProfileFetchLoading && (
          <ProfileEdit profile={profile} />
        )}
      </main>
      <Footer />
    </>
  );
}
