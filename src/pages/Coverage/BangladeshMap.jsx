import { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const BangladeshMap = ({ serviceCenters }) => {
  const bangladeshPosition = [23.685, 90.3563];
  const [search, setSearch] = useState("");
  const mapRef = useRef(null);
  const popupRefs = useRef([]);

  // Custom map marker icon
  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // 🔍 Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const found = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(search.toLowerCase())
    );

    if (found && mapRef.current) {
      // Fly to the location
      mapRef.current.flyTo([found.latitude, found.longitude], 10, {
        duration: 2,
      });

      // Open popup after fly animation
      setTimeout(() => {
        const index = serviceCenters.indexOf(found);
        const popup = popupRefs.current[index];
        if (popup) popup.openOn(mapRef.current);
      }, 1200);
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-start py-10 bg-base-200">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-center mb-3">
        We are available in 64 districts
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Find your district to check our delivery coverage.
      </p>
      
      {/* 🔍 Search Box */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 mb-6 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Search district..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {/* 🗺 Map Container */}
      <div className="  w-full max-w-4xl h-[600px] rounded-2xl overflow-hidden shadow-lg border border-base-300">


        <MapContainer
          center={bangladeshPosition}
          zoom={9}
          scrollWheelZoom={false}
          className="h-full w-full"
          whenCreated={(map) => (mapRef.current = map)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render Markers */}
          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
              icon={markerIcon}
              ref={(ref) => (popupRefs.current[index] = ref)}
            >
              <Popup>
                <strong>{center.district}</strong>
                <br />
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
