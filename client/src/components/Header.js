import React from "react";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaKeyboard } from "react-icons/fa6"; 
const Header=()=>{
    return (
        <Navbar fluid rounded>
                <Navbar.Brand as={Link} href="https://flowbite-react.com">
                    <FaKeyboard className="mr-3 h-6 sm:h-9 text-black" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Key-King</span>
                </Navbar.Brand>
                {/* <Navbar.Toggle /> */}
                <Navbar.Collapse>
                    <Navbar.Link href="#" active>
                        Home
                    </Navbar.Link>
                    <Link to="/about">
                        About
                    </Link>
                    <Navbar.Link href="#">Mode</Navbar.Link>
                    <Navbar.Link href="#">Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
    )
}
export default Header;