"use client";
import Image from "next/image";
import { IoSettingsSharp } from "react-icons/io5";
import { AlignJustify, Clipboard, Home, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import RightSidebar from "./RightSidebar";
import { MdHome } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  RiHome5Fill,
  RiHome5Line,
  RiClipboardFill,
  RiClipboardLine,
  RiUser3Line,
  RiUser3Fill,
} from "react-icons/ri";

const Navbar = () => {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  // useEffect(() => {
  //   if (!user && !pathname.includes("login") && !pathname.includes("signup")) {
  //     router.replace("/login");
  //   }
  // }, [user, pathname, router]);

  return (
    <nav className="w-full p-4 bg-white">
      <ul className="w-full flex justify-between items-center">
        <li>
          <Image
            src="/assets/images/doutya4.png"
            alt="logo"
            width={100}
            height={100}
            className=" rounded-md"
          />
        </li>
        <li>
          {!user ? (
            <Button>
              <Link href="/signup">Login</Link>
            </Button>
          ) : (
            <Sheet>
              <SheetTrigger>
                <AlignJustify size={24} />
              </SheetTrigger>
              <SheetContent side={"right"}>
                <RightSidebar />
              </SheetContent>
            </Sheet>
          )}
        </li>
      </ul>
      <div className="  fixed py-1 px-3  w-full left-0 bottom-0 z-50 ">
        <div className=" px-3 py-1 max-w-[800px] rounded-full  bg-[#0b6ebf] border mx-auto relative flex w-full justify-around items-center">
          <Link
            href={"/home"}
            className=" w-1/3 text-sm flex flex-col items-center justify-center"
          >
            {pathname.includes("home") ? (
              <RiHome5Fill
                color={pathname.includes("home") ? "#fdbd5b" : "white"}
                size={24}
              />
            ) : (
              <RiHome5Line
                color={pathname.includes("home") ? "#fdbd5b" : "white"}
                size={24}
              />
            )}
            <p
              className={
                pathname.includes("home") ? "text-[#fdbd5b]" : "text-white"
              }
            >
              Home
            </p>
          </Link>
          <Link
            href={"/results"}
            className="w-1/3 text-sm flex-wrap flex flex-col items-center justify-center"
          >
            {pathname.includes("results") ? (
              <RiClipboardFill
                color={pathname.includes("results") ? "#fdbd5b" : "white"}
                size={24}
              />
            ) : (
              <RiClipboardLine
                color={pathname.includes("results") ? "#fdbd5b" : "white"}
                size={24}
              />
            )}
            <p
              className={
                pathname.includes("results") ? "text-[#fdbd5b]" : "text-white"
              }
            >
              Result
            </p>
          </Link>
          {user ? (
            <div className="w-1/3 text-sm flex-wrap flex flex-col items-center justify-center">
              <Sheet>
                <SheetTrigger>
                  {pathname.includes("user") ? (
                    <RiUser3Fill
                      color={pathname.includes("user") ? "#fdbd5b" : "white"}
                      size={24}
                      className="mx-auto"
                    />
                  ) : (
                    <RiUser3Line
                      color={pathname.includes("user") ? "#fdbd5b" : "white"}
                      size={24}
                      className="mx-auto"
                    />
                  )}
                  <p
                    className={
                      pathname.includes("user") ? "text-[#fdbd5b]" : "text-white"
                    }
                  >
                    Profile
                  </p>
                </SheetTrigger>
                <SheetContent side={"right"}>
                  <RightSidebar />
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <Link
              href={"/signup"}
              className="w-1/3 text-sm flex-wrap flex flex-col items-center justify-center"
            >
              {pathname.includes("user") ? (
                <RiUser3Fill
                  color={pathname.includes("signup") ? "#fdbd5b" : "white"}
                  size={24}
                />
              ) : (
                <RiUser3Line
                  color={pathname.includes("signup") ? "#fdbd5b" : "white"}
                  size={24}
                />
              )}
              <p
                className={
                  pathname.includes("signup") ? "text-[#fdbd5b]" : "text-white"
                }
              >
                Profile
              </p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
