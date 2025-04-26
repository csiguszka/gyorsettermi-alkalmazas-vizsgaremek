"use client";

import Loading from "@/components/Loading";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { RootState } from "@/state/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Label } from "recharts";

const ImageUploader = ({
  handleImageChange,
  image,
}: {
  handleImageChange: (url: string) => void;
  image: string;
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useSelector((state: RootState) => state.states.user.value);

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    setLoading(true);
    const handleSubmit = async () => {
      if (!selectedFile) {
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await fetch("https://mateszadam.koyeb.app/images", {
          method: "POST",
          headers: {
            "Accept-Language": "hu",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        console.log(response);
        if (!response.ok) throw new Error("Hiba a feltöltés során");

        const result = await response.json();
        setMessage("Sikeres feltöltés!");
        setError("");
        console.log(result);
        handleImageChange(result.url.split("/").at(-1));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(
          "A kép feltöltése sikertelen. Próbáljon másik fényképet feltölteni"
        );
        setMessage("");
        setLoading(false);
      }
    };
    handleSubmit();
  }, [selectedFile]);

  return (
    <div>
      <Label>Képfeltöltés</Label>
      <Link
        className="text-sm"
        href={"https://mateszadam.koyeb.app/images/name/" + image}
        target="_blank"
      >
        Jelenlegi kép: {image}
      </Link>
      <div className="flex items-center">
        <Input
          type="file"
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
        {loading && <Loading />}
      </div>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ImageUploader;
