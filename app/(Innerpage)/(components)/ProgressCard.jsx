import React from "react";
import { FaStar } from "react-icons/fa";

const ProgressCard = ({ item }) => {
  const colors = [
    {
      id: 2,
      from: "#D4145A",
      to: "#FBB03B",
    },
    {
      id: 3,
      from: "#009245",
      to: "#FCEE21",
    },
    {
      id: 4,
      from: "#662D8C",
      to: "#ED1E79",
    },
    {
      id: 5,
      from: "#614385",
      to: "#516395",
    },
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  const { from, to } = getRandomColor();

  return (
    <div className="grid w-full grid-cols-12 items-center gap-3">
      <div className="col-span-3">
        <p className="font-bold">{item.name}</p>
      </div>
      <div className="col-span-7 w-full space-y-2">
        <div className="bg-slate-400 rounded-md h-2 ">
          <div
            className=" h-2 rounded-md"
            style={{
              width: `${item.percentage_level}%`,
              background: `linear-gradient(to top right, ${from}, ${to})`,
            }}
          />
          <div className="flex w-full justify-between">
            <p className="text-xs">Level {item.level}</p>
            <p className="text-xs">Level {item.next_level}</p>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <p className="font-bold flex gap-1 items-center">
          {" "}
          {item.stars}/{item.next_star} <span> <FaStar size={"17"} color="gold" /> </span>
        </p>
      </div>
    </div>
  );
};

export default ProgressCard;
