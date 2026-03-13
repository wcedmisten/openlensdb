import type { Lens } from '../types/Lens'
import './LensCard.css'

export const LensCard = ({ lens }: { lens: Lens }) =>
    <div className="lens-card" key={lens.model_name}>
        <h2 className="lens-card-text">{lens.model_name}</h2>
        <p className="lens-card-text lens-card-text-item"><b>Zoom Type:</b> {lens.zoom_type}</p>
        { // focal length should be displayed as a range if the min and max are different, otherwise just display the single value
            lens.focal_length_min === lens.focal_length_max ? (
                <p className="lens-card-text lens-card-text-item"><b>Focal Length:</b> {lens.focal_length_min}mm</p>
            ) : (
                <p className="lens-card-text lens-card-text-item"><b>Focal Length:</b> {lens.focal_length_min}mm - {lens.focal_length_max}mm</p>
            )}
        <p className="lens-card-text lens-card-text-item"><b>Aperture:</b> {lens.aperture_min ? `f/${lens.aperture_max} - f/${lens.aperture_min}` : `f/${lens.aperture_max}`}</p>
        <p className="lens-card-text lens-card-text-item"><b>Mounts:</b> <ul>{lens.mounts.map((mount) => (<li key={mount}>{mount}</li>))}</ul></p>
    </div>
