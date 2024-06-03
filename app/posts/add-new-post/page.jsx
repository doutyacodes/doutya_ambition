"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { FaImage, FaVideo } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { baseURL } from "@/lib/baseData";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/lib/hooks";

const AddNewPost = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [textData, setTextData] = useState("");
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoClick = () => {
    videoInputRef.current.click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!textData && !image && !video) {
      alert("Empty posts are not allowed");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("textData", textData);
      formData.append("user_id", user.id);

      if (image) {
        formData.append("imageFile", image);
      }

      if (video) {
        formData.append("videoFile", video);
      }

      const apiUrl = `${baseURL}/add-posts.php`; // Replace this with your actual API endpoint
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData)
      if (responseData.success) {
        toast({
          description: "Post added successfully.",
        })

        // Optionally, you can reset the form here
        setTextData("");
        setImage(null);
        setVideo(null);
      } else {
        alert(`Error: ${responseData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-[600px]  min-h-screen w-full mx-auto bg-[#e5e5e5] relative">
      <div className="flex p-3 justify-between items-center">
        <Link href={"/home"}>
          <IoMdClose color="gray" size={24} />
        </Link>
        <div className="font-bold text-gray-600">Post</div>
        <Button
          variant="ghost"
          className="font-bold text-gray-600 hover:bg-transparent"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <div className="flex-1 p-3">
        <textarea
          rows="10"
          placeholder="Write your posts"
          className="placeholder:text-sm w-full rounded-md focus:outline-none p-2"
          value={textData}
          onChange={(e) => setTextData(e.target.value)}
        ></textarea>
        <div className="flex flex-col gap-3 ">
          {image && <Image src={image} width={150} height={150} />}
          {video && (
            <video width="200" height="200" controls>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
      <div className="fixed w-full max-w-[600px]  bottom-0 bg-white">
        <div className="flex justify-center items-center mt-2">
          <div className="w-6 h-1 bg-black rounded-full" />
        </div>
        <div className="flex flex-col gap-3 p-3">
          <div
            className="flex gap-3 items-center cursor-pointer"
            onClick={handleImageClick}
          >
            <FaImage color="#3b99ff" size={20} />
            <p className="text-sm">Add Photo</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={imageInputRef}
            />
          </div>
        </div>
        <div className="w-full h-[1px] bg-slate-200" />
        <div className="flex flex-col gap-3 p-3">
          <div
            className="flex gap-3 items-center cursor-pointer"
            onClick={handleVideoClick}
          >
            <FaVideo color="#3b99ff" size={20} />
            <p className="text-sm">Add Video</p>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              style={{ display: "none" }}
              ref={videoInputRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPost;
