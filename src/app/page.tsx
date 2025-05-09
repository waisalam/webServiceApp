import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRightIcon } from "lucide-react"

export const metadata = {
  title: "Home – WebBuilder",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-6 bg-transparent backdrop-blur-md fixed top-0">
        <div className="text-2xl font-extrabold tracking-wide">WebBuilder</div>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-gray-500 transition-all duration-500">
              Home
            </Button>
          </Link>
          <Link href="/signin">
            <Button variant="outline" className="border-white text-gray-600 hover:text-white hover:bg-black/20 transition-all duration-500">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          We Craft Bold & Modern Websites
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Empowering businesses with stunning, high-performance web experiences.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <Link href="/signup">
            <Button className="bg-white/10 text-white border border-transparent hover:bg-white/20 hover:border-white transition-all duration-500 font-semibold px-8 py-4 rounded-xl flex items-center gap-2">
              <span>Get Started</span>
              <ChevronRightIcon className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="#services">
            <Button variant="ghost" className="text-white hover:text-gray-400 transition-all duration-500 px-8 py-4">
              Learn More
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {['Fully Responsive', 'SEO Optimized', 'Lightning Fast'].map((tag) => (
            <Badge
              key={tag}
              className="bg-white/10 text-white px-4 py-2 rounded-full tracking-wide transition-all duration-500 hover:bg-white/20"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </section>
    </main>
  )
}
