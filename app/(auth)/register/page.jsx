"use client";
// pages/signup.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/app/(Innerpage)/(components)/CustomButton";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { baseURL } from "@/lib/baseData";
import { loginSuccess } from "@/lib/features/authSlice";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import YearMonthPicker from "../(components)/YearMonthPicker";
import Image from "next/image";

const SignUp = () => {
  const router = useRouter();
  const mobile = useAppSelector((state) => state.auth.mobile);

  useEffect(() => {
    if (!mobile.phone) {
      router.replace("/signup");
    }
  }, [mobile]);

  const [form, setForm] = useState({
    email: "",
    name: "",
    education: "Post Doctoral Fellowship",
    college: "",
    date: new Date(),
    gender: "Mr",
    mobile: null,
    student: "yes",
    country_id: 101,
    state_id: "",
    university: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);

  const fetchCountry = async () => {
    try {
      const response = await axios.get(`${baseURL}/country.php`);
      setCountry(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchState = async (country_id) => {
    if (form.country_id == 101) {
      try {
        const response = await axios.get(
          `${baseURL}/state.php?country_id=${country_id}`
        );
        setStates(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const dispatch = useAppDispatch();

  const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth() - dob.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const submitForm = async () => {
    // console.log(form)
    if (
      !form.email ||
      !form.name ||
      !form.education ||
      !date ||
      !form.gender
    ) {
      return alert("Please fill all fields to continue.");
    }
    const age = calculateAge(date);
    if (age < 18) {
      return alert("You must be at least 18 years old to sign up.");
    }
    try {
      setIsLoading(true);

      const formData = new URLSearchParams();
      formData.append("email", form.email);
      formData.append("name", form.name);
      formData.append("education", form.education);
      formData.append("college", form.college);
      formData.append("university", form.university);
      formData.append("student", form.student);
      formData.append("date", formatDate(date));
      formData.append("gender", form.gender);
      formData.append("phone", mobile.phone);
      formData.append("country_id", form.country_id);
      formData.append("state_id", form.state_id);

      const response = await axios.post(`${baseURL}/sign-up.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const result = response.data;
      console.log("result", result);
      if (result.success) {
        dispatch(loginSuccess(result.user));
        router.replace("/choose-keyword");
      } else {
        console.log(result.error);
        alert(result.error[0] || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Something went wrong while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  useEffect(() => {
    if (form.country_id) {
      fetchState(form.country_id);
    }
  }, [form.country_id]);

  return (
    <div className="h-full w-full p-4 bg-white min-h-screen">
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
      <div className="max-w-md mx-auto">
        <h1 className="text-xl font-bold tracking-wide mt-3 text-center">
          Sign Up!
        </h1>

        <div className="space-y-4 mt-4">
          <div className="flex rounded-md">
            <Select
              onValueChange={(value) => setForm({ ...form, gender: value })}
            >
              <SelectTrigger className="w-[100px] rounded-none focus:ring-white ring-white">
                <SelectValue placeholder="Mr" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mr">Mr</SelectItem>
                <SelectItem value="Ms">Ms</SelectItem>
                <SelectItem value="Mrs">Mrs</SelectItem>
                <SelectItem value="None">__</SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={form.name}
              placeholder="Name"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="rounded-none focus:ring-white ring-white"
            />
          </div>
          <Input
            value={form.email}
            placeholder="Email Address"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            type="email"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Date of birth</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <YearMonthPicker onChange={setDate} />
            </PopoverContent>
          </Popover>
          <Select
            onValueChange={(value) => setForm({ ...form, education: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Education" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"Post Doctoral Fellowship"}>
                {"Post Doctoral Fellowship"}
              </SelectItem>
              <SelectItem value={"PHD"}>{"PHD"}</SelectItem>
              <SelectItem value={"Masters Degree"}>
                {"Masters Degree"}
              </SelectItem>
              <SelectItem value={"Bachelors Degree"}>
                {"Bachelors Degree"}
              </SelectItem>
              <SelectItem value={"Secondary School"}>
                {"Secondary School"}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => setForm({ ...form, country_id: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="101">India</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
          {form.country_id == 101 && (
            <Select
              onValueChange={(value) => setForm({ ...form, state_id: value })}
            >
              <SelectTrigger
                className="w-full"
                disabled={form.country_id == 101 ? false : true}
              >
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                {states &&
                  states.length > 0 &&
                  form.country_id == 101 &&
                  states.map((item, index) => {
                    return (
                      <SelectItem value={item.value} key={index}>
                        {item.label}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          )}
          
          {form.student == "yes" && (
            <>
              <Input
                value={form.college}
                placeholder="College"
                onChange={(e) =>
                  setForm({
                    ...form,
                    college: e.target.value,
                  })
                }
              />
              <Input
                value={form.university}
                placeholder="University"
                onChange={(e) =>
                  setForm({
                    ...form,
                    university: e.target.value,
                  })
                }
              />
            </>
          )}
          <CustomButton
            isLoading={isLoading}
            handlePress={submitForm}
            containerStyle="mt-4 w-full"
            title="Submit"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
