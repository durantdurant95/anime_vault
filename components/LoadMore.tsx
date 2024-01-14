"use client";
import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export type AnimeCard = JSX.Element;

let page = 2;

function LoadMore() {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect(() => {
    if (inView) {
      fetchAnime(page).then((res) => {
        setData([...data, ...res]);
      });
      page++;
    }
  }, [inView, data]);
  return (
    <>
      <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data}
      </section>
      <section className="flex w-full items-center justify-center">
        <Image
          ref={ref}
          src="./spinner.svg"
          alt="spinner"
          width={56}
          height={56}
          className="object-contain"
        />
      </section>
    </>
  );
}

export default LoadMore;
