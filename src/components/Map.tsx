import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface MapProps {
  businesses: { geometry: { location: { lat: number; lng: number } } }[];
}

const Map: React.FC<MapProps> = ({ businesses }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
  });

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap
      zoom={12}
      center={
        businesses.length > 0
          ? businesses[0].geometry.location
          : { lat: 37.7749, lng: -122.4194 }
      }
      mapContainerStyle={{ width: "100%", height: "400px" }}
    >
      {businesses.map((biz, index) => (
        <Marker key={index} position={biz.geometry.location} />
      ))}
    </GoogleMap>
  );
};

export default Map;
