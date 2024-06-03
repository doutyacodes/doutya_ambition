"use client";
import SearchBar from "@/app/(Innerpage)/(components)/SearchBar";
import { baseURL } from "@/lib/baseData";
import { editUser } from "@/lib/features/authSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

function ChooseKeyword() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState([]);
  const [itemColors, setItemColors] = useState({});
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/signup");
    } else {
      fetchUserKeywords();
    }
  }, [user]);

  const fetchKeyword = async () => {
    try {
      const response = await axios.get(`${baseURL}/search-keywords.php`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserKeywords = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/get-user-keywords.php?user_id=${user.id}`
      );
      console.log("User keywords:", response.data);
      if (response.data.success) {
        setSelectedItems(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchKeyword();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const colors = [
        { from: "#D4145A", to: "#FBB03B" },
        { from: "#009245", to: "#FCEE21" },
        { from: "#662D8C", to: "#ED1E79" },
        { from: "#614385", to: "#516395" },
      ];
      const assignedColors = data.reduce((acc, item, index) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        acc[item.id] = randomColor;
        return acc;
      }, {});
      setItemColors(assignedColors);
    }
  }, [data]);

  const handleSelectionChange = (newSelectedItems) => {
    if (selectedItems.length + newSelectedItems.length <= 2) {
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        ...newSelectedItems.filter(
          (item) =>
            !prevSelectedItems.some((prevItem) => prevItem.id === item.id)
        ),
      ]);
    }
  };

  const handleItemClick = (item) => {
    if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else if (selectedItems.length < 2) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    }
  };

  const handleSubmit = async () => {
    if (window.confirm("The change is irreversible. Do you want to continue?")) {
      console.log(selectedItems);
      if (user) {
        if (selectedItems.length > 0 && selectedItems.length <= 2) {
          try {
            const requests = selectedItems.map((item) => {
              const payload = {
                user_id: user.id,
                keyword_id: item.id,
              };
              console.log("Submitting payload: ", payload); // Log the payload
              return axios.post(`${baseURL}/add-keywords.php`, payload, {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              });
            });

            const responses = await Promise.all(requests);
            console.log(responses);

            const successResponses = responses.filter(
              (response) => response.data.success
            );

            if (successResponses.length === selectedItems.length) {
              // Update user.steps to 2
              dispatch(editUser({ steps: 2 }));
              router.replace("/home");
            } else {
              alert("Some tasks failed to submit");
            }
          } catch (error) {
            console.error("Submission error:", error);
            alert("An error occurred while submitting tasks.");
          }
        } else {
          alert(
            "You must select at least one item and can't select more than two items."
          );
        }
      } else {
        router.replace("/signup");
      }
    }
  }

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
      {/* <SearchBar
        data={data}
        initialSelected={Array.isArray(selectedItems) ? selectedItems : []}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        onSelectionChange={handleSelectionChange}
      /> */}
      <div className="w-full p-2">
        <p className="text-center text-lg font-bold">Select up to 2 keywords.</p>
      </div>
      <div className="w-full max-h-[60vh] overflow-y-scroll grid grid-cols-12 rounded-md gap-3 py-4">
        {data?.length > 0 &&
          data.map((item, index) => {
            const { from, to } = itemColors[item.id] || { from: "#D4145A", to: "#FBB03B" };
            const isSelected = selectedItems.some(
              (selectedItem) => selectedItem.id === item.id
            );
            return (
              <div
                key={index}
                className={`rounded-full border shadow-md col-span-4 py-3 md:col-span-3 relative cursor-pointer ${
                  isSelected ? 'bg-gradient-to-tr from-blue-500 to-purple-500' : 'bg-gray-200'
                }`}
                onClick={() => handleItemClick(item)}
                style={{
                  background: `linear-gradient(to top right, ${from}, ${to})`,
                }}
              >
                <p
                  className="text-center text-white truncate px-2 max-h-10 overflow-hidden font-bold"
                  title={item.name}
                >
                  {item.name}
                </p>
                {isSelected && (
                  <div className="absolute right-0 top-0 rounded-full bg-[#0b6ebf] p-1">
                    <FaCheck color="white" size={10} />
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-[#fdbd5b] text-white py-3 px-6 rounded-md"
          disabled={selectedItems.length < 1 || selectedItems.length > 2}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ChooseKeyword;
