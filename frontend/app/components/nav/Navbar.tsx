import React from "react";
import Link from "next/link";
import Container from "../Container";
import UserMenu from "./UserMenu";

const Navbar = () => {

  return (
    <div>
      <div className="py-3 border-b border-gray-200" >
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/">Tianlong</Link>
            <div className="flex items-center gap-8 md:gap-12">
              <UserMenu />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
