"use client";
import React, { useEffect, useState } from "react";
import Container from "./ui/Container";
import Grid from "./ui/Grid";
import Title from "./ui/Title";
import { UserType } from "@/types/common";
import DiverCard from "./DiverCard";

const AllDivers = () => {
  const [data, setData] = useState<UserType[]>([]);
  const getAllDivers = async () => {
    const data = await fetch("api/getUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { users } = await data.json();
    setData(users);
  };

  useEffect(() => {
    getAllDivers();
  }, []);
  return (
    <Container className="pt-header lg:py-32">
      <Grid>
        <Title
          fontSize="text-3xl lg:text-4xl text-center"
          className="col-span-4 lg:col-span-12 flex justify-center pb-4"
          h="h2"
        >
          Discover the community
        </Title>
        {data.map((item: UserType) => {
          return (
            <DiverCard
              key={item._id}
              _id={item._id}
              name={item.name}
              email={item.email}
              avatarUrl={item.avatarUrl}
            />
          );
        })}
      </Grid>
    </Container>
  );
};

export default AllDivers;
