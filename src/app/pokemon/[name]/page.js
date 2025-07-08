import Image from 'next/image'

async function getPokemon(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  
  return res.json()
}

export default async function PokemonPage({ params }) {
  const { name } = params
  const pokemon = await getPokemon(name)

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8 border-4 border-blue-300">
        <a href="/" className="text-indigo-600 font-semibold underline text-sm mb-6 inline-block">← Back to Pokemon</a>

        <div className="text-center">
          <Image
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            width={180}
            height={180}
            className="mx-auto mb-4 transition-transform duration-300 transform hover:scale-105 active:scale-110"
          />
          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
          <div className="flex justify-center gap-3 mt-2">
            {pokemon.types.map(t => (
              <span
                key={t.type.name}
                className={`px-3 py-1 text-sm font-medium rounded-full bg-${getTypeColor(t.type.name)}-200 text-${getTypeColor(t.type.name)}-800 capitalize`}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Abilities</h2>
            <div className="flex gap-2 flex-wrap mt-2">
              {pokemon.abilities.map(a => (
                <span key={a.ability.name} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm capitalize">
                  {a.ability.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Base Stats</h2>
            <div className="mt-2 space-y-3">
              {pokemon.stats.map(s => (
                <div key={s.stat.name}>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="capitalize">{s.stat.name.replace('-', ' ')}</span>
                    <span>{s.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Moves (First 10)</h2>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              {pokemon.moves.slice(0, 10).map(m => (
                <li key={m.move.name} className="capitalize">{m.move.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple color mapping for type badges
function getTypeColor(type) {
  const map = {
    fire: 'red',
    water: 'blue',
    grass: 'green',
    electric: 'yellow',
    bug: 'lime',
    poison: 'purple',
    ground: 'orange',
    flying: 'sky',
    psychic: 'pink',
    rock: 'gray',
    ghost: 'indigo',
    dragon: 'violet',
    ice: 'cyan',
    steel: 'slate',
    dark: 'neutral',
    fairy: 'rose',
    normal: 'zinc'
  }
  return map[type] || 'gray'
}
