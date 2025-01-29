import React from "react";
import Image from "next/image";

function Header() {
  return (
    <div>
      <section className="py-5 flex justify-between  items-center drop-shadow-2xl">
        <Image
          src="/images/header.png"
          height={180}
          width={180}
          sizes="100"
          alt="logo"
          className="drop-shadow-2xl hidden md:block"
        ></Image>
        <Image
          src="/images/rotom.png"
          height={80}
          width={80}
          sizes="100"
          alt="logo"
          className="drop-shadow-2xl hidden md:block"
        ></Image>
      </section>
    </div>
  );
}

export default Header;
