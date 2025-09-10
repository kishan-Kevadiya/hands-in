import { useEffect, useState } from "react";
import  { CandidateCardDemo } from "../candidate-card/CandidateCard";
import Loader from "../loader/Loader";

const SavedProfilesTab = () => {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setProfiles([]); 
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div
      className="flex flex-wrap content-start overflow-y-auto justify-start gap-3"
      style={{ maxHeight: "650px" }}
    >
      {loading ? (
        <div className="w-full flex m-28 justify-center items-center py-10">
          <Loader isVisible={loading} />
        </div>
      ) : profiles.length > 0 ? (
        profiles.map((_, i) => <CandidateCardDemo key={i} />)
      ) : (
        <p className="w-full text-center text-gray-500 py-10">No profiles found</p>
      )}
    </div>
  );
};

export default SavedProfilesTab;
