import React from "react";

const Leader = ({ item }) => {
  // console.log(item)
  return (
    <div className="w-full flex gap-5 ">
      <div className="flex items-center justify-center font-bold">
        {item.ranking}
      </div>
      <div className="flex-1 flex gap-3 items-center">
        <div className="rounded-full h-16 w-16 font-bold bg-[#ff8f8e] text-xl text-white flex justify-center items-center">
          {item.first_character}
        </div>
        <div className="flex flex-col gap-1">
          <p className=" font-bold">{item.name}</p>
         {item.time_spent &&( <p className="text-xs text-slate-500"> {`Spent ${item.time_spent}`}</p>)}
        </div>
      </div>
      <div className="flex items-center justify-center font-bold">
        {item.total_points ? item.total_points : item.points}
      </div>
    </div>
  );
};

export default Leader;
