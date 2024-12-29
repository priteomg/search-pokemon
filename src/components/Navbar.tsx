"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const Navbar = () => {
  const router = useRouter();

  const [searchText, setSearchText] = useState<string>("");
  const onClickHome = () => {
    // redirect("/");
    // router.prefetch("/");
    setSearchText("");
    router.push("/");
  };

  const handleKey = (event) => {
    if (searchText.trim() && event.key === "Enter") {
      router.push(`/?search=${searchText}`);
    }
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={onClickHome}>
          Pokemon Finder
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            onKeyDown={handleKey}
            onChange={handleChange}
            value={searchText}
          />
        </div>
        <div
        // className="dropdown dropdown-end"
        >
          <div
            tabIndex={0}
            // role="button"
            className="avatar"
          >
            <div className="w-10 rounded-full">
              <img src="https://i.guim.co.uk/img/media/dd703cd39013271a45bc199fae6aa1ddad72faaf/0_0_2000_1200/master/2000.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=2192262d7832a184dbb583c238563695" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
