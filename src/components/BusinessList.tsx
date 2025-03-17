import BusinessCard from "./BusinessCard";

interface Business {
  name: string;
  place_id: string;
  rating?: number;
  vicinity: string;
  opening_hours?: { open_now: boolean };
}

interface BusinessListProps {
  businesses: Business[];
}

const BusinessList: React.FC<BusinessListProps> = ({ businesses }) => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {businesses.length === 0 ? (
        <p>No businesses found.</p>
      ) : (
        businesses.map((biz) => <BusinessCard key={biz.place_id} business={biz} />)
      )}
    </div>
  );
};

export default BusinessList;
