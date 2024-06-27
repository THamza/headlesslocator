import Header from "@/components/Header";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <Header />
      <div className="flex justify-center py-24">
        <SignIn routing="hash" />
      </div>
    </>
  );
}
