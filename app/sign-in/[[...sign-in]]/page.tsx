import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/Header";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <Header />
      <div className="flex justify-center py-24">
        <SignIn routing="hash" />
      </div>
      <Footer />
    </>
  );
}
