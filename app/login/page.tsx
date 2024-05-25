"use client";

import React, { FormEvent, useRef, useState } from "react";
import { CgLock } from "react-icons/cg";
import { FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { authenticate } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import userData from "../api/userData";
import { useRouter } from "next/navigation";
import Link from "next/link";

type User = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const [showPaswd, setShowPaswd] = useState(false);
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const usrnameRef = useRef<HTMLInputElement>(null);
  const pswdRef = useRef<HTMLInputElement>(null);
  const errorMessageRef = useRef<HTMLParagraphElement>(null)
  const router = useRouter();


  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let userList = userData.UserList;
    let crntUser: User = {
      username: "",
      password: "",
    };

    userList.forEach((user) => {
      if (usrnameRef.current) {
        if (usrnameRef.current.value == user.username) {
          crntUser = user;
        }
      }
    });

    if (usrnameRef.current && pswdRef.current) {
      if (
        (usrnameRef.current.value == "" && pswdRef.current.value == "") ||
        usrnameRef.current.value == "" ||
        pswdRef.current.value == ""
      )
        return;

      if (
        usrnameRef.current.value == crntUser.username &&
        pswdRef.current.value == crntUser.password
      ) {
        saveUser(crntUser);
        router.replace("/");
      } else setShowErrorMessage(true);
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
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
      <form
        onSubmit={handleFormSubmit}
        className="login-form w-[300px] h-[400px] flex flex-col justify-start py-10 items-center gap-3 p-5 rounded-md bg-accent-3 border-2 border-foreground-color/40"
      >
        <div className="w-full h-[50px] border-2 border-secondary-color/10 rounded-md px-5 flex justify-center items-center gap-3">
          <span className="text-[1rem] text-secondary-color">
            <FiUser />
          </span>
          <input
            type="text"
            className="w-full h-full bg-transparent outline-none text-[0.9rem]"
            placeholder="Username or email"
            name="username"
            ref={usrnameRef}
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
        <div className="w-full flex justify-between items-center">
          <p className=" text-secondary-color px-1 text-[0.9rem] cursor-pointer transition-colors hover:text-primary-color/80">
            Forget Password?
          </p>
          <button
            type="submit"
            className="py-[10px] px-[20px] text-[0.8rem] font-medium bg-royalblue text-white rounded-md transition-all active:scale-95"
          >
            Login
          </button>
        </div>

        {showErrorMessage ? <p className=" text-red-500 px-1 text-[0.9rem] mt-[20px] text-center" ref={errorMessageRef}>
          Password or username inccorect
        </p> : <></>}

        <p className=" text-secondary-color px-1 text-[0.9rem] mt-[70px] text-center">
          Don't have an account ?{" "}
          <Link
            href="/signup"
            className=" whitespace-nowrap cursor-pointer text-royalblue/80 transition-colors hover:text-royalblue"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
