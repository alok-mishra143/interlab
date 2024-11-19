"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart2 } from "lucide-react";

export function HeroSectionComponent() {
  return (
    <section className="w-full py-16 md:py-32 lg:py-40 xl:py-52 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-10 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500">
              Welcome to Interface-lab
            </h1>
            <p className="mx-auto max-w-[650px] text-zinc-300 md:text-lg lg:text-xl font-light leading-relaxed">
              Transforming raw data into actionable insights with impactful
              visualizations and professional reports.
            </p>
          </div>
          <div className="w-full max-w-md space-y-5">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold py-4 px-7 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <Link
                href="/dashboard"
                className="flex items-center justify-center"
              >
                Let&apos;s Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="pt-10">
            <BarChart2 className="h-20 w-20 text-blue-500 animate-pulse transform rotate-0 transition-transform duration-500 hover:rotate-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
