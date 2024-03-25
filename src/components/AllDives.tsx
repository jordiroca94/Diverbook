/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Container from "./ui/Container";
import Grid from "./ui/Grid";
import { DiveType } from "@/types/common";
import Button from "./ui/Button";
import Link from "next/link";
import Title from "./ui/Title";

const AllDives = () => {
  const [data, setData] = useState<DiveType[]>([]);
  const getAllDives = async () => {
    const data = await fetch("api/getDives", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { dives } = await data.json();
    setData(dives);
  };

  useEffect(() => {
    getAllDives();
  }, []);
  return (
    <Container>
      <Grid>
        <Title
          fontSize="text-3xl lg:text-4xl text-center"
          className="col-span-4 lg:col-span-12 flex justify-center pb-4"
          h="h2"
        >
          Dives of Our Users
        </Title>

        {data.map((item: DiveType) => {
          const date = new Date(item.updatedAt);
          const formattedDate = `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`;
          return (
            <div
              key={item._id}
              className="col-span-4 xlg:col-span-3 shadow-lg rounded-md border-mediumGray border"
            >
              <div className="flex justify-center">
                <img
                  className="rounded-md"
                  src={item.imageUrl}
                  alt="Placehodler Image"
                />
              </div>
              <div className="p-6">
                <h6 className="text-xl font-semibold">{item.name}</h6>
                <p className="mt-2">{formattedDate}</p>
                <div className="flex gap-2 items-center py-2 text-lg">
                  <p>{item.country.label}</p>
                  <small>-</small>
                  <p>{item.location}</p>
                </div>
                <p className="text-base font-thin">{item.description}</p>
                <div className="flex items-center gap-2 py-4 ">
                  <p>Posted by:</p>
                  <Link href="/" className="text-gray underline">
                    {item.user.name}
                  </Link>
                </div>
                <Button
                  openNewTab
                  className="mt-6 mb-2"
                  link="/item"
                  label="Read more"
                />
              </div>
            </div>
          );
        })}
      </Grid>
    </Container>
  );
};

export default AllDives;
