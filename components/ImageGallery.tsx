import Image from "next/image";

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};

type ImageGalleryProps = {
  items: GalleryItem[];
};

export function ImageGallery({ items }: ImageGalleryProps) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item) => (
        <figure
          key={item.src}
          className="overflow-hidden rounded-sm border-2 border-[#1C1C1A] bg-[#F5F0E8] shadow-[8px_8px_0_rgba(44,74,46,0.16)]"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="p-5">
            <p className="font-serif text-xl font-bold">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-[#1C1C1A]/70">
              {item.caption}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
