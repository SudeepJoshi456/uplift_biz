interface BusinessCardProps {
    business: {
      name: string;
      rating?: number;
      vicinity: string;
      opening_hours?: { open_now: boolean };
    };
  }
  
  const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
    return (
      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-bold">{business.name}</h2>
        <p>⭐ Rating: {business.rating ?? "N/A"}</p>
        <p>📍 {business.vicinity}</p>
        <p>🕒 {business.opening_hours?.open_now ? "Open Now" : "Closed"}</p>
      </div>
    );
  };
  
  export default BusinessCard;
  