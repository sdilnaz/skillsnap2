
import Link from "next/link"
import Image from "next/image"

export default function Component() {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
      <Image 
      src="/images/logo.png" 
      alt="SkillSnap Logo" 
      width={80} 
      height={80} 
      priority
      className="cursor-pointer"
    />
        <span className="text-lg font-semibold">SkillSnap</span>
      </Link>
      <nav className="flex items-center gap-2">
        <Link
          href="#"
          className="inline-flex h-9 w-max items-center justify-center rounded-full border border-foreground bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="#"
          className="inline-flex h-9 w-max items-center justify-center rounded-full border border-foreground bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Evaluate
        </Link>
        <Link
          href="#"
          className="inline-flex h-9 w-max items-center justify-center rounded-full border border-foreground bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Courses
        </Link>
        <Link
          href="#"
          className="inline-flex h-9 w-max items-center justify-center rounded-full border border-foreground bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Gallery
        </Link>
        <Link
          href="#"
          className="inline-flex h-9 w-max items-center justify-center rounded-full border border-foreground bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Log in
        </Link>
      </nav>
    </header>
  )
}
