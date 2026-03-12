import { useEffect, useState } from 'react'

import './App.css'
import type { Lens } from '../src/types/Lens'
import { LensCard } from '../src/components/LensCard'

function App() {
  // fetch the lenses from GET /api/lenses
  const [lens, setLens] = useState<Lens | null>(null)

  const pathname = window.location.search; // Example: "/dashboard"

  const [ , paramString ] = pathname.split( '?' );

  // Return parameters
  const params = new URLSearchParams( paramString );
  const lensID = params.get("id");

    useEffect(() => {
    fetch(`/api/lens/${lensID}`)
      .then((response) => response.json())
      .then((data: Lens) => setLens(data))
  }, [lensID])

  // visualize them as a list of cards
  return (
    <div className="App">
      <h1><a className="logo" href="/">OpenLensDB</a></h1>
      <div className="lenses">
        {!!lens && <LensCard lens={lens} />}
      </div>
    </div>
  )
}

export default App
