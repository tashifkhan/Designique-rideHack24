"use client";

import PlaceholdersAndVanishInput from "../ui/placeholders-and-vanish-input";

export default function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Best Manufacturer",
    "Fast Work",
    "Quality Services",
    "Bulk Order",
    "Experience People",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className=" flex flex-col justify-center  items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
