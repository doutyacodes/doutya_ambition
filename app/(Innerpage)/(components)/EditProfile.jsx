"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { baseURL } from "@/lib/baseData";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const EditProfile = ({setReloadData,reloadData}) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [form, setForm] = useState({
    name: "",
    education: "",
    college: "",
    university: "",
    student: "no",
    gender: "Mr",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    if (!user) {
      router.replace("/signup");
    } else {
      getUserDetails();
    }
  }, [user]);

  const getUserDetails = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/getUserEditDetails.php`,
        {
          id: user?.id,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.data) {
        const userData = response.data.data;
        setForm({
          name: userData.name,
          education: userData.education,
          college: userData.college,
          university: userData.university,
          student: userData.student,
          gender: userData.gender,
        });
      } else {
        console.error("No user data found");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const submitForm = async () => {
    // Form validation
    if (!form.name || !form.education || !form.gender) {
      return alert("Please fill all required fields to continue.");
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("education", form.education);
      formData.append("college", form.college);
      formData.append("university", form.university);
      formData.append("student", form.student);
      formData.append("gender", form.gender);
      formData.append("id", user.id);

      const response = await axios.post(`${baseURL}/updateUser.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(response);

      if (response.data.success) {
        setReloadData(!reloadData)
        toast({
          title: "Success",
          description: "User data edited successfully.",
        });
      } else {
        alert(response.data.error[0] || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Something went wrong while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-white ">
      <div className="w-full">
        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="education">Education</Label>
            <Input
              id="education"
              value={form.education}
              placeholder="Education"
              onChange={(e) => setForm({ ...form, education: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="student">Are you currently a student?</Label>
            <Select
              id="student"
              value={form.student}
              onValueChange={(value) => setForm({ ...form, student: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {form.student == "yes" && (
            <>
              <div>
                <Label htmlFor="college">College</Label>
                <Input
                  id="college"
                  value={form.college}
                  placeholder="College"
                  onChange={(e) =>
                    setForm({ ...form, college: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  value={form.university}
                  placeholder="University"
                  onChange={(e) =>
                    setForm({ ...form, university: e.target.value })
                  }
                />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select
              id="gender"
              value={form.gender}
              onValueChange={(value) => setForm({ ...form, gender: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mr">Mr</SelectItem>
                <SelectItem value="Ms">Ms</SelectItem>
                <SelectItem value="Mrs">Mrs</SelectItem>
                <SelectItem value="None">__</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            isLoading={isLoading}
            onClick={submitForm}
            className="mt-4 w-full"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
