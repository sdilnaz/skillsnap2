'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/nextjs";

interface NavLinkProps {
  href: string;
  text: string;
}

interface MenuIconProps {
  className?: string;
}

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { userId } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 870);
    };
    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="navbar sticky top-0 z-50 flex h-16 w-full items-center justify-between px-4 md:px-6 bg-white">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image 
          src="/images/logo.png" 
          alt="SkillSnap Logo" 
          width={80} 
          height={80} 
          priority
          className="cursor-pointer"
        />
        <span className="text-lg sm:text-xl md:text-2xl font-semibold">SkillSnap</span>
      </Link>
      <nav className="flex items-center space-x-4">
        {window.innerWidth > 870 ? (
          <div className="hidden md:flex space-x-4">
            <NavLink href="#" text="Оценить фото" />
            <NavLink href="/roadmap" text="Курс" />
            <NavLink href="#" text="Галлерея" />
            <NavLink href="#" text="О Нас" />
            <SignedIn>
              <NavLink href="/profile" text="Профиль" />
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="inline-flex h-9 w-max items-center justify-center rounded-full border border-foreground bg-transparent px-4 py-2 text-sm md:text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-black focus:bg-accent focus:text-black focus:outline-none">
                  Вход
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        ) : (
          <Button variant="primary" size="icon" className="ml-auto lg:hidden bg-transparent hover:bg-transparent" onClick={toggleMenu}>
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        )}
      </nav>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white bg-opacity-90 px-4 py-4 shadow-lg lg:hidden">
          <nav className="flex flex-col items-center gap-2">
            <NavLink href="#" text="Оценить фото" onClick={closeMenu} className="w-[150px] h-[30px]" />
            <NavLink href="/roadmap" text="Курс" onClick={closeMenu} className="w-[150px] h-[30px]" />
            <NavLink href="#" text="Галлерея" onClick={closeMenu} className="w-[150px] h-[30px]" />
            <NavLink href="#" text="О Нас" onClick={closeMenu} className="w-[150px] h-[30px]" />
            <SignedIn>
              <NavLink href="/profile" text="Профиль" onClick={closeMenu} className="w-[150px] h-[30px]" />
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button 
                  className="inline-flex h-9 w-max items-center justify-center rounded-full border border-foreground bg-transparent px-4 py-2 text-sm md:text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-black focus:bg-accent focus:text-black focus:outline-none"
                  onClick={closeMenu}
                >
                  Вход
                </button>
              </SignInButton>
            </SignedOut>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, text, onClick, className }: NavLinkProps & { onClick?: () => void, className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full border border-foreground bg-transparent px-2 text-sm md:text-base font-medium text-foreground transition-colors hover:bg-orange-600 hover:border-orange-600 hover:text-white focus:bg-accent focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${className}`}
      prefetch={false}
      onClick={onClick}
    >
      {text}
    </Link>
  );
}

function MenuIcon(props: MenuIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
