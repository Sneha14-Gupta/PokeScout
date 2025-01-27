"use client";
import React from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import { Button } from "@/components/ui/button";
function Home() {
  const router = useRouter()
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-[50vh]">
        <Image
          src="/images/logo.png"
          sizes="100"
          height={200}
          width={400}
          alt="pokemon logo"
          className="mb-10 mt-40"
        ></Image>
        <Button variant="destructive" onClick={()=>router.push("/gens")}>Get Started</Button>
      </div>
      <div className="flex h-[50vh] justify-center items-end md:justify-center lg:justify-between md:items-end">
        <Image
          src="/images/ash.png"
          sizes="100"
          height={200}
          width={200}
          alt="ash"
          className="hidden lg:block"
        ></Image>
        <Image
          src="/images/charmender.png"
          sizes="100"
          height={200}
          width={200}
          alt="ash"
          className="hidden lg:block"
        ></Image>
        <Image
          src="/images/pikachu.png"
          sizes="100"
          height={200}
          width={200}
          alt="ash"
          className="hidden lg:block"
        ></Image>
        <Image
          src="/images/bulbasaur.png"
          sizes="100"
          height={200}
          width={200}
          alt="ash"
          className="hidden lg:block"
        ></Image>
        <Image
          src="/images/squirtle.png"
          sizes="100"
          height={200}
          width={200}
          alt="ash"
          className="hidden lg:block"
        ></Image>

        <Image
          src="/images/misty.png"
          sizes="100"
          height={200}
          width={250}
          alt="misty"
          className="hidden lg:block"
        ></Image>
        <Image
          src="/images/darkrai.png"
          sizes="100"
          height={150}
          width={200}
          alt="misty"
          className="lg:hidden"
        ></Image>
      </div>
    </div>
  );
}

export default Home;
