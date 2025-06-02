import { cn } from "lib/utils";
import { useState, useRef, ClipboardEvent, ChangeEvent, KeyboardEvent, useEffect } from "react";

export default function OTPInput() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];

    if (value.length === 1) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5 && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (value === "") {
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0 && inputsRef.current[index - 1]) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").replace(/[^0-9]/g, "");
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || "";
    }
    setOtp(newOtp);

    const lastFilledIndex = Math.min(pastedData.length, 6) - 1;
    if (inputsRef.current[lastFilledIndex]) {
      inputsRef.current[lastFilledIndex]?.focus();
    }
  };
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);
  return (
    <div className="flex justify-center gap-2" onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className={cn("xemdi_inp","w-12 h-12 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500")}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => { inputsRef.current[index] = el }}
        />
      ))}
    </div>
  );
}
