"use client";
import Container from "../ui/Container";
import Grid from "../ui/Grid";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useSession } from "next-auth/react";
import { DiveType } from "@/types/common";
import Title from "../ui/Title";
import { SingleImageDropzone } from "../ui/SingleImageDropzone";
import { useEdgeStore } from "../../../lib/edgestore";
import BackButton from "../ui/BackButton";
import { useRouter } from "next/navigation";

const DiveForm = () => {
  const { data: session } = useSession();
  const form = useRef<HTMLFormElement>(null);
  const options: any = useMemo(() => countryList().getData(), []);
  const [countryValue, setCountryValue] = useState("");
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const { push } = useRouter();

  const diveSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    date: z.string().min(1, { message: "Required" }),
    location: z.string().min(1, { message: "Required" }),
    deepth: z.string().min(1, { message: "Required" }),
    temperature: z.string().min(1, { message: "Required" }),
    weights: z.string().min(1, { message: "Required" }),
    time: z.string().min(1, { message: "Required" }),
    instructor: z.string().optional(),
    suit: z.string().min(1, { message: "Required" }),
    description: z.string().min(1, { message: "Required" }),
    imageUrl: z.string().optional(),
  });

  const changeCountryValue = (value: any) => {
    setCountryValue(value);
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<DiveType>({
    defaultValues: {
      date: null,
      user: {},
      name: "",
      country: {},
      location: "",
      description: "",
      deepth: "",
      temperature: "",
      weights: "",
      time: "",
      instructor: "",
      suit: "",
    },
    resolver: zodResolver(diveSchema),
  });

  const uploadFile = async (file: File | undefined) => {
    try {
      if (file) {
        const res = await edgestore.myPublicImages.upload({ file });
        setAvatarUrl(res.url);
      }
    } catch {
      throw Error("An error ocurred while uploading a file. Please try again ");
    }
  };
  const createDive = async (values: DiveType) => {
    const parsedValues = {
      date: values.date,
      user: session?.user,
      name: values.name,
      country: countryValue,
      location: values.location,
      deepth: values.deepth.concat(" ", "m"),
      temperature: values.temperature.concat(" ", "ºC"),
      weights: values.weights.concat(" ", "kg"),
      time: values.time.concat(" ", "min"),
      instructor: values.instructor,
      suit: values.suit,
      description: values.description,
      imageUrl: avatarUrl
        ? avatarUrl
        : "https://files.edgestore.dev/0ajhytejvs3pwkiy/myPublicImages/_public/4563940c-50b7-496e-977b-c3153f282d23.png",
    };

    try {
      await fetch("api/dive", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          parsedValues,
        }),
      });
      reset();
      push("/profile");
    } catch {
      throw Error("An error ocurred while registering. Please try again ");
    }
  };

  return (
    <Container>
      <BackButton />
      <Grid>
        <Title className="col-span-4 lg:col-span-12" h="h1">
          Tell us about your last dive!
        </Title>
        <form
          ref={form}
          onSubmit={handleSubmit(createDive)}
          className="flex flex-col pb-10 lg:pb-20 col-span-4 lg:col-start-3 lg:col-span-8 lg:gap-3"
        >
          <div className="flex flex-col lg:flex-row  lg:gap-6">
            <div className="flex flex-col flex-1 gap-3">
              <label htmlFor="date" className="font-medium pt-4">
                When was it?
              </label>
              <input
                {...register("date")}
                className="border border-mediumGray py-2 px-3 rounded-md"
                type="date"
              />
              {errors.date?.message && (
                <p aria-describedby="date" className="text-red pt-1">
                  {errors.date?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col flex-1 gap-3">
              <label htmlFor="name" className="font-medium pt-4">
                Put a name to your dive
              </label>
              <input
                id="name"
                className="border border-mediumGray py-2 px-3 rounded-md"
                type="text"
                placeholder="Dive's name"
                {...register("name")}
              />
              {errors.name?.message && (
                <p aria-describedby="name" className="text-red pt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-6">
            <div className="flex flex-col flex-1 gap-3">
              <label htmlFor="country" className="font-medium pt-4">
                Country
              </label>
              <Select
                options={options}
                value={countryValue}
                onChange={changeCountryValue}
              />
              {errors.country?.message && (
                <p aria-describedby="country" className="text-red pt-1">
                  {errors.country?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col flex-1 gap-3">
              <label htmlFor="location" className="font-medium pt-4">
                Where was it?
              </label>
              <input
                id="location"
                className="border border-mediumGray py-2 px-3 rounded-md"
                type="text"
                placeholder="Location"
                {...register("location")}
              />
              {errors.location?.message && (
                <p aria-describedby="location" className="text-red pt-1">
                  {errors.location?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-6">
            <div className="flex flex-col flex-1 gap-3">
              <label htmlFor="deepth" className="font-medium pt-4">
                How deep was it ?
              </label>
              <input
                id="deepth"
                className="border border-mediumGray py-2 px-3 rounded-md"
                type="number"
                placeholder="Depth in meeters"
                {...register("deepth")}
              />
              {errors.deepth?.message && (
                <p aria-describedby="deepth" className="text-red pt-1">
                  {errors.deepth?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col flex-1 gap-3">
              <label htmlFor="deepth" className="font-medium pt-4">
                Water temperature
              </label>
              <input
                id="temperature"
                className="border border-mediumGray py-2 px-3 rounded-md w-full"
                type="number"
                placeholder="Temperature in celsius"
                {...register("temperature")}
              />
              {errors.temperature?.message && (
                <p aria-describedby="temperature" className="text-red pt-1">
                  {errors.temperature?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-6">
            <div className="flex flex-col flex-1 gap-3">
              <label htmlFor="weights" className="font-medium pt-4">
                Belt weights
              </label>
              <input
                id="weight"
                className="border border-mediumGray py-2 px-3 rounded-md w-full"
                type="number"
                placeholder="Weights in kg"
                {...register("weights")}
              />
              {errors.weights?.message && (
                <p aria-describedby="weights" className="text-red pt-1">
                  {errors.weights?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col flex-1 gap-3">
              <label htmlFor="time" className="font-medium pt-4">
                Dive duration
              </label>
              <input
                id="time"
                className="border border-mediumGray py-2 px-3 rounded-md w-full"
                type="number"
                placeholder="Duration in min"
                {...register("time")}
              />
              {errors.time?.message && (
                <p aria-describedby="time" className="text-red pt-1">
                  {errors.time?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-6">
            <div className="flex flex-col flex-1 gap-3">
              <label htmlFor="instructor" className="font-medium pt-4">
                Who was your instructor?
              </label>
              <input
                id="instructor"
                className="border border-mediumGray py-2 px-3 rounded-md"
                type="text"
                placeholder="Instructor name"
                {...register("instructor")}
              />
              {errors.instructor?.message && (
                <p aria-describedby="instructor" className="text-red pt-1">
                  {errors.instructor?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col flex-1 gap-3">
              <label htmlFor="suit" className="font-medium pt-4">
                Tell us about your suit
              </label>
              <select
                {...register("suit")}
                className="border border-mediumGray py-2 px-3 rounded-md"
              >
                <option value="" disabled selected>
                  Select ...
                </option>
                <option value="Wet suit 3mm">Wet suit 3mm </option>
                <option value="Wet suit 5mm">Wet suit 5mm </option>
                <option value="Wet suit 7mm">Wet suit 7mm </option>
                <option value="Neoprene dry suit">Neoprene dry suit</option>
                <option value="Membrane dry suit">Membrane dry suit</option>
                <option value="Hybrid dry suits"> Hybrid dry suits</option>
                <option value="Semi-dry suits">Semi-dry suits </option>
                <option value="Exposure suits">Exposure suits </option>
              </select>
              {errors.suit?.message && (
                <p aria-describedby="suit" className="text-red pt-1">
                  {errors.suit?.message}
                </p>
              )}
            </div>
          </div>

          <label htmlFor="description" className="font-medium py-4">
            Tell us about your experience
          </label>
          <textarea
            id="description"
            className="border border-mediumGray py-2 px-3 rounded-md"
            placeholder="Description"
            rows={3}
            {...register("description")}
          />
          {errors.description?.message && (
            <p aria-describedby="description" className="text-red pt-1">
              {errors.description?.message}
            </p>
          )}
          <label htmlFor="file" className="font-medium py-4">
            Add an Image
          </label>
          <SingleImageDropzone
            width={100}
            height={100}
            value={file}
            onChange={(file) => {
              setFile(file);
              uploadFile(file);
            }}
          />
          <button
            type="submit"
            className="bg-primary cursor-pointer px-16 py-2 text-white rounded-md my-4 lg:w-fit"
          >
            Submit
          </button>
        </form>
      </Grid>
    </Container>
  );
};

export default DiveForm;
