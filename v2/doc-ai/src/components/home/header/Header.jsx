import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Spacer
} from "@nextui-org/react";
import LogoImg from '../LogoImg.png'

export default function Header() {
    return (
        <Navbar isBlurred shouldHideOnScroll isBordered className="bg-brown-50">
            <NavbarBrand>
                <img height="36" viewBox="0 0 32 32" width="36" alt="DocAI Logo" src={LogoImg} />
                <Spacer x={4} />
                <p className="font-bold text-inherit">DocAI</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#about">
                        About Us
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#research">
                        Our Research
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#contact">
                        Contact
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} className="bg-gradient-to-tr from-brown-100 to-brown-400 text-white shadow-lg" href="trial" variant="flat" radius="full">
                        Try it out
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
