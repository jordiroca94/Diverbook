export type Inputs = {
  name: string;
  email: string;
  message: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  description?: string;
  country?: CountryType;
  certificate?: string;
  birthDate?: string | null;
  instructor?: Boolean;
  terms?: boolean;
  geolocation?: GeolocationType;
};

export type GeolocationType = { latitude: number; longitude: number };

export type CountryType = {
  value: string;
  label: string;
};

export type DiveType = {
  _id: string;
  date: Date | null | string;
  user: UserType;
  name: string;
  country: CountryType;
  location: string;
  description: string;
  deepth: string;
  temperature: string;
  weights: string;
  time: string;
  instructor: string;
  suit: string;
  updatedAt: string;
  imageUrl: string;
  rate?: number;
};

export type DiveCardType = {
  _id: string;
  name: string;
  country: CountryType;
  location: string;
  description: string;
  date: string;
  imageUrl: string;
  user: UserType;
  profileCard?: boolean;
};

export type HighlightedDestinationType = {
  id: string;
  name: string;
  country: string;
  description: string;
  type: string;
  season: string;
  image: string;
};

export type ParamsType = {
  params: { id: string };
};

export type ReviewType = {
  _id: string;
  postedBy: string;
  userId: string;
  diveId: string;
  rate: number;
  description: string;
  createdAt: Date;
};
