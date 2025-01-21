"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import "@/public/font/fontawesome-free-6.7.2-web/css/all.css"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"

// Separate search component to wrap with Suspense
function SearchForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams)
    const searchTermFromUrl = urlParams.get("searchTerm")
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [searchParams])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(searchParams)
    urlParams.set("searchTerm", searchTerm)
    const searchQuery = urlParams.toString()
    router.push(`/search?${searchQuery}`)
  }

  return (
    <form
      className="bg-slate-100 p-3 rounded-lg flex items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus:outline-none w-24 sm:w-64"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button></button>
    </form>
  )
}

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link href="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <Suspense
          fallback={
            <div className="bg-slate-100 p-3 rounded-lg w-24 sm:w-64" />
          }
        >
          <SearchForm />
        </Suspense>

        <ul className="flex gap-4">
          <Link href="/">
            <li className="hidden md:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link href="/about">
            <li className="hidden md:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <li className="hidden md:inline text-slate-700 hover:underline">
                Sign In
              </li>
            </Link>
          </SignedOut>
        </ul>
      </div>
    </header>
  )
}
