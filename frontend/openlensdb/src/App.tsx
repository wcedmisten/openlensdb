import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LensCard } from './components/LensCard'
import type { Lens } from './types/Lens'

function App() {
  // fetch the lenses from GET /api/lenses
  const [lenses, setLenses] = useState<Lens[] | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchedTerm, setSearchedTerm] = useState<string>('');

  useEffect(() => {
    // add searchTerm to the query params when searchedTerm is not null
    const url = new URL('/api/lenses', window.location.origin);
    if (searchedTerm) {
      url.searchParams.append('search', searchedTerm);
      fetch(url.toString())
      .then((response) => response.json())
      .then((data) => setLenses(data))
    }
  }, [searchedTerm])

  // visualize them as a list of cards
  return (
    <div className="App">
      <h1>OpenLensDB</h1>
      <div className="search">
        <input type="text" placeholder="Search for a lens..." onChange={
          (e) => setSearchTerm(e.currentTarget.value)} />
        <button onClick={() => {
          setSearchedTerm(searchTerm);
          console.log(searchedTerm);
        }}>Search</button>
      </div>
      {!!searchedTerm && <div>Search results for: {searchedTerm}</div>}
      <div className="lenses">
        {!!lenses && lenses.map((lens) => { 
          return <div key={lens.id}>
            <LensCard lens={lens} key={lens.id} />
            <a href={`/lens/?id=${lens.id}`}>View Details</a>
          </div>
        })}
      </div>
    </div>
  )
}

export default App
