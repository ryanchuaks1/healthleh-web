"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import OTPLoginModal from "@/components/OTPLoginModal";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <header className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            HealthLeh
          </Link>
          <Button variant="outline" onClick={handleLoginClick}>
            Log In
          </Button>
        </div>
      </header>
      {showModal && <OTPLoginModal onClose={() => setShowModal(false)} />}
    </>
  );
}
