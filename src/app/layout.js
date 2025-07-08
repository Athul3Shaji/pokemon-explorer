import './globals.css'

export const metadata = {
  title: 'Pokémon Explorer',
  description: 'Explore Pokémon with style',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  )
}
