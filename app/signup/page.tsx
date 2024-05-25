"use client";

import React, { FormEvent, useRef, useState } from "react";
import { CgLock } from "react-icons/cg";
import {
  FiArrowUp,
  FiCalendar,
  FiEye,
  FiEyeOff,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { authenticate } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import userData from "../api/userData";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BiWorld } from "react-icons/bi";

type User = {
  username: string;
  password: string;
};

export default function SignUpPage() {
  const [showPaswd, setShowPaswd] = useState(false);
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const usrnameRef = useRef<HTMLInputElement>(null);
  const fullnameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const pswdRef = useRef<HTMLInputElement>(null);
  const confirmPswdRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let crntUser: User = {
      username: "",
      password: "",
    };

    if (usrnameRef.current && pswdRef.current) {
      if (
        (usrnameRef.current.value == "" && pswdRef.current.value == "") ||
        usrnameRef.current.value == "" ||
        pswdRef.current.value == ""
      )
        return;

      saveUser({
        username: usrnameRef.current.value,
        password: pswdRef.current.value,
      });
      router.replace("/");
    }
  }

  function handleShowHidePaswd() {
    showPaswd ? setShowPaswd(false) : setShowPaswd(true);
  }

  function saveUser(user: User) {
    if (typeof window !== "undefined") {
      localStorage.setItem("logged-user", JSON.stringify(user));
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] flex gap-5 items-center justify-center">
      <form
        onSubmit={handleFormSubmit}
        className="signup-form w-[300px] h-[700px] flex flex-col justify-start py-10 items-center gap-3 p-5 rounded-md bg-foreground-color"
      >
        <div className="w-full h-[50px] border-2 border-secondary-color/10 rounded-md px-5 flex justify-center items-center gap-3">
          <span className="text-[1rem] text-secondary-color">
            <FiUser />
          </span>
          <input
            type="text"
            className="w-full h-full bg-transparent outline-none text-[0.9rem]"
            placeholder="Full Name"
            name="fullname"
            ref={fullnameRef}
          />
        </div>
        <div className="w-full h-[50px] border-2 border-secondary-color/10 rounded-md px-5 flex justify-center items-center gap-3">
          <span className="text-[1rem] text-secondary-color">
            <FiUser />
          </span>
          <input
            type="text"
            className="w-full h-full bg-transparent outline-none text-[0.9rem]"
            placeholder="Username"
            name="username"
            ref={usrnameRef}
          />
        </div>
        <div className="w-full h-[50px] border-2 border-secondary-color/10 rounded-md px-5 flex justify-center items-center gap-3">
          <span className="text-[1rem] text-secondary-color">
            <FiMail />
          </span>
          <input
            type="email"
            className="w-full h-full bg-transparent outline-none text-[0.9rem]"
            placeholder="Email"
            name="email"
            ref={emailRef}
          />
        </div>

        <div className="w-full h-[50px] border-2 border-secondary-color/10 rounded-md px-5 flex justify-center items-center gap-3">
          <span className="text-[1rem] text-secondary-color">
            <BiWorld />
          </span>
          <input
            type="text"
            className="w-full h-full bg-transparent outline-none text-[0.9rem]"
            placeholder="Country"
            name="country"
            ref={countryRef}
          />
        </div>
        <div className="w-full h-[50px] border-2 border-secondary-color/10 rounded-md px-5 flex justify-center items-center gap-3">
          <span className="text-[1rem] text-secondary-color">
            <FiCalendar />
          </span>
          <input
            type="number"
            className="w-full h-full bg-transparent outline-none text-[0.9rem]"
            placeholder="Age"
            name="age"
            ref={ageRef}
          />
        </div>
        <div className="w-full h-[50px] border-2 border-secondary-color/10 rounded-md px-5 flex justify-center items-center gap-3">
          <span className="text-[1rem] text-secondary-color">
            <FiArrowUp />
          </span>
          <input
            type="number"
            className="w-full h-full bg-transparent outline-none text-[0.9rem]"
            placeholder="Height"
            name="height"
            ref={heightRef}
          />
        </div>

        <div className="w-full h-[50px] border-2 border-secondary-color/10 rounded-md px-5 flex justify-center items-center gap-3">
          <span className="text-[1rem] text-secondary-color">
            <CgLock />
          </span>
          <input
            type={showPaswd ? "text" : "password"}
            className="w-full h-full bg-transparent outline-none text-[0.9rem]"
            placeholder="Password"
            name="password"
            ref={pswdRef}
          />
          <span
            className="text-[1rem] text-secondary-color icon only-icon"
            onClick={handleShowHidePaswd}
          >
            {showPaswd ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        <div className="w-full h-[50px] border-2 border-secondary-color/10 rounded-md px-5 flex justify-center items-center gap-3">
          <span className="text-[1rem] text-secondary-color">
            <CgLock />
          </span>
          <input
            type={showPaswd ? "text" : "password"}
            className="w-full h-full bg-transparent outline-none text-[0.9rem]"
            placeholder="Confirm Password"
            name="confirm-password"
            ref={confirmPswdRef}
          />
          <span
            className="text-[1rem] text-secondary-color icon only-icon"
            onClick={handleShowHidePaswd}
          >
            {showPaswd ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="py-[10px] w-full text-[0.8rem] font-medium bg-royalblue text-white rounded-md transition-all active:scale-95"
          >
            Create Account
          </button>
        </div>

        <p className=" text-secondary-color px-1 text-[0.9rem] mt-[20px] text-center">
          Already have an account ?{" "}
          <Link
            href="/login"
            className="cursor-pointer text-royalblue/80 transition-colors hover:text-royalblue whitespace-nowrap"
          >
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
}
