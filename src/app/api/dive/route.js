import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";

export async function POST(req) {
  try {
    const res = await req.json();
    const {
      date,
      user,
      name,
      country,
      location,
      deepth,
      temperature,
      weights,
      time,
      instructor,
      suit,
      description,
      imageUrl,
    } = res.parsedValues;
    await connectMongoDB();
    await Dive.create({
      date,
      user,
      name,
      country,
      location,
      deepth,
      temperature,
      weights,
      time,
      instructor,
      suit,
      description,
      imageUrl,
    });

    return NextResponse.json({ message: "Dive saved" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the dive" },
      { status: 500 }
    );
  }
}
