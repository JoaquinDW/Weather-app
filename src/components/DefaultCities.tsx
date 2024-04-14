import React from "react"
import { City } from "../types"

export default function DefaultCities({ setQuery }: any) {
  const CITIES: Record<string, City> = {
    CABA: {
      id: "CABA",
      name: "Buenos Aires",
    },
    corrientes: {
      id: "corrientes",
      name: "Corrientes",
    },
    bariloche: {
      id: "bariloche",
      name: "Bariloche",
    },
    cordoba: {
      id: "cordoba",
      name: "Cordoba",
    },
    mendoza: {
      id: "mendoza",
      name: "Mendoza",
    },
  }

  return (
    <div className="flex items-center justify-around bar overflow-x-scroll gap-12 xl:gap-2 w-full my-4 flex-row">
      {Object.values(CITIES).map((city) => (
        <button
          key={city.id}
          value={city.id}
          onClick={() => setQuery({ q: city.name })}
          className="text-lg font-medium text-white transition hover:scale-110"
        >
          {city.name}
        </button>
      ))}
    </div>
  )
}
