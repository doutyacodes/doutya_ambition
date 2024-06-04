"use client"
import { baseURL } from '@/lib/baseData';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CertificateList from '../(components)/CertificateList';
import Link from 'next/link';

const page = () => {
 const user = {id:24}
    const [searchText, setSearchText] = useState("");
    const [peopleData, setPeopleData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    console.log(searchText)
    useEffect(()=>{
        const fetchPeople = async () => {
            if (user) {
              try {
                // Only fetch rewards if user data is available
                const response = await axios.get(
                  `${baseURL}/getBuzzPeople.php?userId=${user.id}`
                );
    
                if (response.status === 200) {
                  setPeopleData(response.data);
                  // console.log(response.data);
                } else {
                  console.error("Failed to fetch people");
                }
              } catch (error) {
                console.error("Error while fetching people:", error.message);
              }
            }
          };
    
          fetchPeople();
    },[user])
    useEffect(() => {
        const fetchSearch = async () => {
          if (user && searchText.length > 0) {
            try {
              // Only fetch rewards if user data is available
              const response = await axios.get(
                `${baseURL}/searchUser.php?user_id=${user.id}&text=${searchText}`
              );
    
              if (response.status === 200) {
                setSearchData(response.data);
                // console.log(response.data);
              } else {
                console.error("Failed to fetch users");
              }
            } catch (error) {
              console.error("Error while fetching users:", error.message);
            }
          }
          if (searchText.length <= 0) {
            setSearchData([]);
          }
        };
    
        fetchSearch();
      }, [searchText]);
  return (
    <div className="max-w-[600px]  min-h-screen overflow-y-scroll w-full mx-auto bg-white border p-3 relative flex flex-col gap-4">
      <div className="mt-2 w-full relative">
      <input type='text' placeholder='Explore connections...' class='bg-[#e5e5e5] rounded-md w-full p-2 placeholder:text-sm text-sm focus:outline-none' onChange={(e)=>setSearchText(e.target.value)} />
<div className="absolute top-10 left-0 w-full z-[9999] flex flex-col gap-1 ">
{searchData && searchData?.length > 0 && (
  <>
  {
    searchData?.map((item,index)=>{
      return(
        <Link href={`user/${item.id}`} key={index} >
         <p className='bg-white border p-2 rounded-md'>
          {item.name}
          </p> 
        </Link>
      )
    })
  }
  </>
)}
</div>
        </div>
      <div className="mt-2">
      {peopleData?.length > 0 &&
          peopleData.map((item, index) => {
            // console.log(item);
            return (
              <CertificateList
                key={index}
                item={item}
                index={index}
                user_id={user.id}
                arena={null}
              />
            );
          })}
      </div>
    </div>
  )
}

export default page