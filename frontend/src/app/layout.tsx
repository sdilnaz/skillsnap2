import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  
} from '@clerk/nextjs'
import Navbar from "@/components/ui/navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skill Snap",
  description: "Personalized photography tutor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        
          <body className={inter.className}>

          <ClerkLoading>
            <div className="flex items-center justify-center h-screen text-2xl">
              LOADING...
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <Navbar />
            {children}
          </ClerkLoaded>
          </body>
       
      </html>
     </ClerkProvider>
  );
}
