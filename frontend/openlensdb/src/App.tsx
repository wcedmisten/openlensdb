import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type Lens = {
  model_name: string
  zoom_type: string
  focal_length_min: number
  focal_length_max: number
  aperture_min: number
  aperture_max: number
  mounts: string[]
}

function App() {
  // fetch the lenses from GET /api/lenses
  const [lenses, setLenses] = useState<Lens[] | null>(null)

  useEffect(() => {
    fetch('/api/lenses')
      .then((response) => response.json())
      .then((data) => setLenses(data))
  }, [])

  console.log(lenses)

  // visualize them as a list of cards
  return (
    <div className="App">
      <h1>OpenLensDB</h1>
      <div className="lenses">
        {!!lenses && lenses.map((lens) => (
          <div className="lens-card" key={lens.model_name}>
            <h2>{lens.model_name}</h2>
            <p>Zoom Type: {lens.zoom_type}</p>
            { // focal length should be displayed as a range if the min and max are different, otherwise just display the single value
            lens.focal_length_min === lens.focal_length_max ? (
              <p>Focal Length: {lens.focal_length_min}mm</p>
            ) : (
              <p>Focal Length: {lens.focal_length_min}mm - {lens.focal_length_max}mm</p>
            )}
            <p>Aperture: f/{lens.aperture_min} - f/{lens.aperture_max}</p>
            <p>Mounts: {lens.mounts.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
