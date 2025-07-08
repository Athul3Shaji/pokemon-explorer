'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [pokemons, setPokemons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadMore() // initial load
  }, [])

  const loadMore = async () => {
    setLoading(true)
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`)
    const data = await res.json()
    const fullData = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url)
        return res.json()
      })
    )
    const updated = [...pokemons, ...fullData]
    setPokemons(updated)
    setFiltered(updated.filter(p => p.name.includes(search)))
    setOffset(prev => prev + 30)
    setLoading(false)
  }

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    setSearch(value)
    const results = pokemons.filter((p) =>
      p.name.toLowerCase().includes(value)
    )
    setFiltered(results)
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 to-sky-200 p-6">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Pokémon Explorer</h1>

      <input
        onChange={handleSearch}
        type="text"
        placeholder="Search Pokémon..."
        className="w-full max-w-md mx-auto mb-6 px-4 py-2 border rounded shadow"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((pokemon) => (
          <Link key={pokemon.id} href={`/pokemon/${pokemon.name}`}>
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-xl text-center cursor-pointer transition-transform duration-200 hover:scale-105">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto transition-all duration-300 hover:scale-110"
                onMouseOver={(e) => e.currentTarget.src = pokemon.sprites.front_shiny}
                onMouseOut={(e) => e.currentTarget.src = pokemon.sprites.front_default}
              />
              <h2 className="mt-2 capitalize font-semibold text-lg">{pokemon.name}</h2>
              <div className="mt-2 flex justify-center gap-1 flex-wrap">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className={`text-xs px-2 py-0.5 rounded-full capitalize text-white ${
                      t.type.name === 'fire' ? 'bg-red-500' :
                      t.type.name === 'water' ? 'bg-blue-500' :
                      t.type.name === 'grass' ? 'bg-green-500' :
                      t.type.name === 'electric' ? 'bg-yellow-400 text-black' :
                      t.type.name === 'psychic' ? 'bg-pink-500' :
                      t.type.name === 'ice' ? 'bg-cyan-400' :
                      t.type.name === 'dragon' ? 'bg-purple-500' :
                      'bg-gray-400'
                    }`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {loading && (
        <div className="text-center mt-6">
          <div className="h-8 w-8 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  )
}
