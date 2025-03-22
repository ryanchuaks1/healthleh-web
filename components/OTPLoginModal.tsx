"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface OTPLoginModalProps {
  onClose: () => void;
}

export default function OTPLoginModal({ onClose }: OTPLoginModalProps) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSendOTP = () => {
    if (!phone) {
      setError("Please enter your phone number.");
      return;
    }
    // In a real app, you would call an API to send the OTP here.
    setShowOTPInput(true);
    setError("");
  };

  const handleVerifyOTP = () => {
    if (otp === "1234") {
      // Save phone number (for later use) and redirect to charts page.
      localStorage.setItem("userPhoneNumber", phone);
      onClose();
      router.push("/charts");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Log In</h2>
        {!showOTPInput ? (
          <>
            <label className="block mb-2">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter your phone number"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              onClick={handleSendOTP}
              className="w-full bg-orange-500 text-white p-2 rounded"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <label className="block mb-2">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter OTP"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              onClick={handleVerifyOTP}
              className="w-full bg-orange-500 text-white p-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}
        <button onClick={onClose} className="mt-4 text-sm text-gray-500 underline">
          Cancel
        </button>
      </div>
    </div>
  );
}
