// import { useEffect, useState } from "react";
// import Loader from "../loader/Loader";

// const SavedProfilesTab = () => {
//   const [loading, setLoading] = useState(true);
//   const [profiles, setProfiles] = useState<any[]>([]);

//   useEffect(() => {
//     setTimeout(() => {
//       setProfiles([]); 
//       setLoading(false);
//     }, 2000);
//   }, []);

//   return (
//     <div
//       className="flex flex-wrap content-start overflow-y-auto justify-start gap-3"
//       style={{ maxHeight: "650px" }}
//     >
//       {loading ? (
//         <div className="w-full flex m-28 justify-center items-center py-10">
//           <Loader isVisible={loading} />
//         </div>
//       ) : profiles.length > 0 ? (
//         profiles.map((_, i) => null)
//       ) : (
//         <p className="w-full text-center text-gray-500 py-10">No profiles found</p>
//       )}
//     </div>
//   );
// };

// export default SavedProfilesTab;


import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import CandidateCard from "../candidate-card/CandidateCard";
import { getSavedProfiles, SavedProfile, SavedProfilesResponse } from "@/helpers/apis/saral-ai";
import PaginationHelper from "../pagination-helper/PaginationHelper";

const SavedProfilesTab = () => {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  const fetchProfiles = async (page: number = 1) => {
    try {
      setLoading(true);
      const res: SavedProfilesResponse = await getSavedProfiles(page, limit);
      setProfiles(res.data || []);
      setTotalPages(res.total_pages || 1);
      setCurrentPage(res.page || 1);
    } catch (error) {
      console.error("Error fetching saved profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(currentPage);
  }, [currentPage]);

  return (
    <div>
      {/* Profiles Grid */}
      <div
        className="flex flex-wrap content-start overflow-y-auto justify-start gap-3"
        style={{ maxHeight: "650px" }}
      >
        {loading ? (
          <div className="w-full flex m-28 justify-center items-center py-10">
            <Loader isVisible={loading} />
          </div>
        ) : profiles.length > 0 ? (
          profiles.map((profile, i) => {
            const candidate = {
              id: profile.id,
              name: profile.name,
              initials: profile.name
                .split(" ")
                .map((n) => n[0])
                .join(""),
              position: profile.headline || "N/A",
              experience: profile.experience || "N/A",
              location: profile.location || "Unknown",
              assessmentScore: 10,
              profileUrl: profile.linkedin_url || "",
            };

            return (
              <CandidateCard
                key={profile.id}
                candidate={candidate}
                initialSavedState={true}
                animationDelay={i * 0.1}
                maxWidth={400}
              />
            );
          })
        ) : (
          <p className="w-full text-center text-gray-500 py-10">
            No profiles found
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6">
          <PaginationHelper
            totalItems={totalPages}
            itemsPerPage={limit}
            currentPage={currentPage}
            onPageChange={(page: any) => setCurrentPage(page)}
            hasNextPage={currentPage < totalPages}
            hasPrevPage={currentPage > 1}
          />
        </div>
      )}
    </div>
  );
};

export default SavedProfilesTab;
