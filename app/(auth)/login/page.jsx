"use client"
import React, { useState } from "react";
import Image from "next/image";
import { User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { editUser, loginSuccess } from "@/lib/features/authSlice";
import axios from "axios";
import { baseURL } from "@/lib/baseData";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useAppDispatch();
  const router = useRouter()
  // const user = useAppSelector((state) => state.auth.user);
// console.log(user)
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/checkUserExist2.php`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // console.log(response.data);
      if (response.data.page_exists == "yes") {
        // User details found, save in AsyncStorage
        const userData = response.data.data;
        dispatch(loginSuccess(userData));
        // if (response.data.data.steps >= 2) {
        //   navigation.replace("InnerPage");
        // } else if (response.data.data.steps == 1) {
        //   navigation.replace("DetailSignup");
        // }
        console.log(userData)
        router.push("/home")
      } else {
        toast({
          variant: "destructive",
          title: "Sorry.",
          description: "No user exist with these credentials.",
        })
      }
    } catch (error) {

      console.error("Error fetching user details:", error);
    }
  };
  const handleLoginInfo = async() =>{
    if(username!="" && password!=""){
await handleLogin()
    }
    else{
      alert("Please fill all details")
    }
  }
  return (
    <div className=" flex flex-col gap-4 border border-[#20bb59] min-h-screen">
      <div className="h-48 relative">
        <Image src={"/assets/images/wave.png"} alt="Wave" fill />
      </div>
      <div className=" h-full w-full space-y-3">
        <p className="text-center text-[#20bb59] text-2xl">Welcome Back</p>
        <p className="text-center text-slate-500">Login to your account</p>
        <div className="mt-2 p-3 space-y-6">
          <div className="flex  border-[#20bb59] border rounded-xl items-center">
            <p className="ml-3">
              <User color="gray" />
            </p>
            <input
              type="text"
              placeholder="Username"
              className="flex-1 p-3 focus:outline-none rounded-xl"
              onChange={(e) => setUsername(e.target.value)}

            />
          </div>
          <div className="flex  border-[#20bb59] border rounded-xl items-center">
            <p className="ml-3">
              <Lock color="gray" />
            </p>
            <input
              type="password"

              placeholder="Password"
              className="flex-1 p-3 focus:outline-none rounded-xl"
              onChange={(e) => setPassword(e.target.value)}

            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <input
                type="checkbox"
                id="remember"
                name="remember"
                value="remember"
              />
              <label  className="text-[#20bb59]">
                {" "}
                Remember me
              </label>
            </div>
            <div>
              <p className="text-[#20bb59]">Forgotten Password?</p>
            </div>
          </div>
          <div className="mt-3 flex justify-center flex-col items-center gap-3">
            <Button onClick={handleLoginInfo} className="bg-[#20bb59] px-10 rounded-full py-6 text-lg">
              Login
            </Button>
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link href={"/signup"}>
                <text className="text-[#20bb59]">Register</text>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
