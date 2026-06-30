// Named birds in the flock. Founder-flock birds are the foundational genetics
// for the Heritage Plymouth Barred Rock breeding program and are treated as
// headline birds, not gallery filler.

export type FlockBird = {
  name: string;
  breed: string; // e.g. "Barred Plymouth Rock Hen"
  id: string; // breeder / lineage ID, e.g. "Abigail-FRT-F2-A-01-H"
  role: string; // short description shown under the bird
  image: {
    src: string;
    alt: string;
  };
  /** CSS aspect-ratio for the card image, matched to the photo so nothing is
   *  cropped (e.g. "1086 / 1448" portrait, "1448 / 1086" landscape). */
  aspect?: string;
  /** object-position for the card image. Defaults to "center". */
  objectPosition?: string;
  founder?: boolean;
};

export const founderFlock: FlockBird[] = [
  {
    name: "Abigail",
    breed: "Barred Plymouth Rock Hen",
    id: "Abigail-FRT-F2-A-01-H",
    role: "A founder breeding hen and one of the foundational genetics behind the Heritage Plymouth Barred Rock program.",
    image: {
      src: "/images/chickens/abigail.webp",
      alt: "Abigail, a Barred Plymouth Rock hen, founder flock breeding hen at Shaggy Ink Farms.",
    },
    aspect: "1086 / 1448",
    objectPosition: "center",
    founder: true,
  },
  {
    name: "Boone",
    breed: "Barred Plymouth Rock Rooster",
    id: "Boone-FRT-F2-A-01-R",
    role: "A founder breeding rooster and one of the foundational genetics behind the Heritage Plymouth Barred Rock program.",
    image: {
      src: "/images/chickens/boone.webp",
      alt: "Boone, a Barred Plymouth Rock rooster, founder flock breeding rooster at Shaggy Ink Farms.",
    },
    aspect: "1448 / 1086",
    objectPosition: "center",
    founder: true,
  },
];
