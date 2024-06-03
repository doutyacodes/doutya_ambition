"use client";
import React, { useState, useEffect } from "react";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { auth } from "../(components)/firebase";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { loginSuccess, storeMobile } from "@/lib/features/authSlice";
import axios from "axios";
import { baseURL } from "@/lib/baseData";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval;
    if (showOTP && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [showOTP, timer]);

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
          console.log(response);
        },
      });
    }
  };

  const onSignInSubmit = () => {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = countryCode + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        setTimer(30);
        setCanResend(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onResendOTP = () => {
    onSignInSubmit();
  };

  const onOTPVerify = async () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setUser(res.user);
        setLoading(false);
        const formatPh = countryCode + ph;
        dispatch(storeMobile({ phone: formatPh, uid: res.user.uid }));

        try {
          const response = await axios.get(
            `${baseURL}/checkAlreadyUser.php?phone=${formatPh}`
          );
          console.log(response.data);
          if (response.data.success) {
            dispatch(loginSuccess(response.data.user));
            router.push("/home");
          } else {
            router.push("/register");
          }
        } catch (error) {
          console.error("error", error);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="relative w-full overflow-hidden h-screen bg-white z-40">
      <div className="mt-0 w-full flex justify-center">
        <div className="relative w-32 h-24">
          <Image
            src={"/assets/images/doutya4.png"}
            fill
            alt="logo"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="w-full items-center justify-center flex">
        <div className="relative w-full min-h-56">
          <Image
            src={"/assets/images/sasd.png"}
            fill
            alt="logo"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="px-4 md:px-10 flex flex-col justify-center mt-5 gap-3 w-full">
        {!showOTP && (
          <p className=" text-lg text-center font-bold ">
            Enter Your Mobile Number
          </p>
        )}
        {showOTP && (
          <p className=" text-lg text-center font-bold ">Enter Your OTP</p>
        )}
        <div className="mt-2 p-3 space-y-5 w-full flex flex-col items-center gap-1">
          {!showOTP && (
            <>
              <input
                type="text"
                className="focus:outline-none p-3 bg-white border w-full rounded-lg"
                placeholder="eg: 9876543210"
                onChange={(e) => setPh(e.target.value)}
              />
            </>
          )}
          {showOTP && (
            <>
              <input
                type="text"
                className="focus:outline-none p-3 bg-white border w-full rounded-lg"
                placeholder="OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
              {canResend ? (
                <Button onClick={onResendOTP} className="bg-red-500 mt-3">
                  Resend OTP
                </Button>
              ) : (
                <p className="font-bold">
                  Resend OTP in <span className="text-red-700">{timer} s</span>
                </p>
              )}
            </>
          )}
        </div>
        <div className="mx-auto justify-center flex w-full">
          {!showOTP && (
            <Button
              disabled={loading}
              onClick={onSignInSubmit}
              className="bg-[#fdbd5b]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <p>Please wait</p>
                </>
              ) : (
                <p className="font-bold text-lg">Next</p>
              )}
            </Button>
          )}
          {showOTP && (
            <Button
              disabled={loading}
              onClick={onOTPVerify}
              className="bg-[#fdbd5b]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <p>Please wait</p>
                </>
              ) : (
                <p className="font-bold text-lg">Submit</p>
              )}{" "}
            </Button>
          )}
        </div>
        <div id="sign-in-button"></div>
      </div>
      {/* <img
        src="/assets/images/vector-bg.svg"
        alt="svg"
        className="absolute bottom-0 left-0 max-md:w-[700px] md:min-w-[700px] max-md:h-64 md:h-32 opacity-30 z-[1] object-cover"
      /> */}
    </div>
  );
};

export default Signup;
