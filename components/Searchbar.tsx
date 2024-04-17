"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import SearchManufacturer from "./SearchManufacturer";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = ({
  setManufacturer,
  setModel,
}: {
  setManufacturer: (manufacturer: string) => void;
  setModel: (model: string) => void;
}) => {
  const [manufacturerSelected, setManuFacturerSelected] = useState("");
  const [modelSelected, setModelSelected] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturerSelected.trim() === "" && modelSelected.trim() === "") {
      return alert("Please provide some input");
    }

    // updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
    setManufacturer(manufacturerSelected);
    setModel(modelSelected);
  };

  // const updateSearchParams = (model: string, manufacturer: string) => {
  //   // Create a new URLSearchParams current url
  //   const searchParams = new URLSearchParams(window.location.search);

  //   // Update atau hapus jika kosong
  //   if (model) {
  //     searchParams.set("model", model);
  //   } else {
  //     searchParams.delete("model");
  //   }

  //   // Update atau hapus jika kosong
  //   if (manufacturer) {
  //     searchParams.set("manufacturer", manufacturer);
  //   } else {
  //     searchParams.delete("manufacturer");
  //   }

  //   // Buat url baru
  //   const newPathname = `${
  //     window.location.pathname
  //   }?${searchParams.toString()}`;

  //   // Perbarui halaman
  //   router.push(newPathname);
  // };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item mr-2">
        <SearchManufacturer
          manufacturer={manufacturerSelected}
          setManuFacturer={setManuFacturerSelected}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={modelSelected}
          onChange={(e) => setModelSelected(e.target.value)}
          placeholder="Tiguan..."
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
