/* eslint-disable @next/next/no-img-element */
"use client";
import { DiveCardType, ReviewType } from "@/types/common";
import Button from "../ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdStarRate } from "react-icons/md";

const DiveCard = ({
  _id,
  name,
  country,
  location,
  description,
  date,
  imageUrl,
  user,
  profileCard,
}: DiveCardType) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [reviewsWithRate, setReviewsWithRate] = useState<number | null>(null);
  const getUser = async () => {
    try {
      const userData = await fetch("/api/getUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await userData.json();
      setUserId(data.user._id);
    } catch {
      throw Error("An error occurred while fetching data.");
    }
  };

  const getReviews = async () => {
    try {
      const reviews = await fetch("/api/getReviews", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await reviews.json();
      const diveReviews: ReviewType[] = [];
      data.map((item: ReviewType) => {
        if (item.diveId === _id) {
          diveReviews.push(item);
        }
      });

      const reviewsWithRate = diveReviews.filter(
        (review: ReviewType) => review.rate !== null
      );

      const rateSum = diveReviews.reduce(
        (accumulator: number, review: ReviewType) => accumulator + review.rate,
        0
      );

      const rateAverage =
        Math.ceil((rateSum / reviewsWithRate.length) * 10) / 10;
      setRate(rateAverage);
      setReviewsWithRate(reviewsWithRate.length);
    } catch {
      throw Error("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    getReviews();
  }, []);
  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-4 shadow-lg hover:shadow-primary rounded-md border-mediumGray border">
      {imageUrl && (
        <div className="flex justify-center border-b border-mediumGray">
          <img
            className="rounded-md aspect-[4/3] object-cover"
            src={imageUrl}
            alt="Placehodler Image"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between">
          <h6 className="text-xl font-semibold line-clamp-1">{name}</h6>
          {typeof rate === "number" && !isNaN(rate) && (
            <div className="flex items-center gap-2">
              <MdStarRate className="size-6 text-primary" />
              <div className="text-lg">{rate}</div>
              <div className="text-lg text-gray">({reviewsWithRate})</div>
            </div>
          )}
        </div>
        <p className="mt-2">{date}</p>
        <div className="flex gap-2 items-center py-2 text-lg">
          <p className="line-clamp-1">{country.label}</p>
          <small>-</small>
          <p className="line-clamp-1">{location}</p>
        </div>
        <p className="text-base font-thin mb-4 line-clamp-2">{description}</p>
        {!profileCard && (
          <div className="flex items-center gap-2 py-3 ">
            <p>Posted by:</p>
            <Link
              href={`/divers/${userId}`}
              className="hover:text-gray underline"
            >
              {user.name}
            </Link>
          </div>
        )}
        <Button
          className="mt-6 mb-2"
          link={`/dives/${_id}`}
          label="Read more"
        />
      </div>
    </div>
  );
};

export default DiveCard;
