import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-10-29",
  useCdn: true,
  token: import.meta.env.VITE_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
