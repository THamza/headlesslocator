"use client";
import { useState } from "react";
import { SignUp } from "@clerk/nextjs";
import SignUpQuiz from "@/components/SignUpQuiz";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/footer";

export default function Page() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      <Header />
      <div className="flex justify-center py-24 bg-gray-100 min-h-screen">
        {showSignUp ? (
          <SignUp />
        ) : (
          <SignUpQuiz onQuizSuccess={() => setShowSignUp(true)} />
        )}
      </div>
      <Footer />
    </>
  );
}
