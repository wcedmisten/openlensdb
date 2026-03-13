import { useEffect, useState } from 'react'
import './App.css'
import type { Lens } from './types/Lens'

import LensTable from './components/LensTable'
import Button from './components/Button';

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
      <h1><a className="logo" href="/">OpenLensDB</a></h1>
      <div className="searchWrapper">
        <input className="searchInput" type="text" placeholder="Search for a lens..." onChange={
          (e) => setSearchTerm(e.currentTarget.value)} />
        <Button onClick={() => {
          setSearchedTerm(searchTerm);
          console.log(searchedTerm);
        }}>Search</Button>
      </div>
      {!!searchedTerm && <div>Search results for: {searchedTerm}</div>}
      <div className="lenses">
        {lenses && <LensTable data={lenses} />}
      </div>
    </div>
  )
}

export default App
