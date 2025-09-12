// import { useEffect, useState } from "react";
// import Loader from "../loader/Loader";
// import CandidateCard from "../candidate-card/CandidateCard";
// import { deleteSavedProfile, getSavedProfiles, SavedProfile, SavedProfilesResponse } from "@/helpers/apis/saral-ai";
// import PaginationHelper from "../pagination-helper/PaginationHelper";

// const SavedProfilesTab = () => {
//   const [loading, setLoading] = useState(true);
//   const [profiles, setProfiles] = useState<SavedProfile[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit] = useState(10);
//   const [delLoading, setDelLoading] = useState(false);
//   const [refreshFlag, setRefreshFlag] = useState(false);

//   const fetchProfiles = async (page: number = 1) => {
//     try {
//       setLoading(true);
//       const res: SavedProfilesResponse = await getSavedProfiles(page, limit);
//       setProfiles(res.data || []);
//       setTotalPages(res.total_pages || 1);
//       setCurrentPage(res.page || 1);
//     } catch (error) {
//       console.error("Error fetching saved profiles:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     setDelLoading(true);

//     try {
//       const res = await deleteSavedProfile(id);
//       setRefreshFlag(!refreshFlag); 
//       console.log("Delete response:", res.message);
//     } catch (err: any) {
//       console.error("Error deleting profile:", err);
//     } finally {
//       setDelLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfiles(currentPage);
//   }, [currentPage, refreshFlag]);

//   return (
//   <>
//     <div>
//       {/* Profiles Grid */}
//       <div
//         className="flex h-full flex-wrap content-start overflow-y-auto justify-start gap-3"
//         style={{ maxHeight: "700px" }}
//       >
//         {loading ? (
//           <div className="w-full flex m-28 justify-center items-center py-10">
//             <Loader isVisible={loading} />
//           </div>
//         ) : profiles.length > 0 ? (
//           profiles.map((profile, i) => {

//             const experienceData = JSON.parse(profile.experience || "[]");

//             function parseCaption(caption?: string) {
//               if (!caption || typeof caption !== "string") {
//                 return { years: 0, months: 0 };
//               }

//               const yearMatch = caption.match(/(\d+)\s*yrs?/);
//               const monthMatch = caption.match(/(\d+)\s*mos?/);

//               return {
//                 years: yearMatch ? parseInt(yearMatch[1], 10) : 0,
//                 months: monthMatch ? parseInt(monthMatch[1], 10) : 0,
//               };
//             }

//             let totalMonths = 0;
//             experienceData.forEach((item: any) => {
//               const { years, months } = parseCaption(item?.caption);
//               totalMonths += years * 12 + months;
//             });

//             const totalYears = Math.floor(totalMonths / 12);
//             const remainingMonths = totalMonths % 12;

//             const overallExperience = `${totalYears} yrs ${remainingMonths} mos`;

//             const candidate = {
//               id: profile.id,
//               name: profile.name,
//               initials: profile.name
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join(""),
//               position: profile.headline ?? "N/A",
//               experience: overallExperience,
//               location: profile.location ?? "Unknown",
//               assessmentScore: profile.score,
//               profileUrl: profile.linkedin_url ?? "",
//             };

//             return (
//               <CandidateCard
//                 key={profile.id}
//                 candidate={candidate}
//                 initialSavedState={true}
//                 animationDelay={i * 0.1}
//                 maxWidth={400}
//                 isForSavedList={true}
//                 handleDelete= {() => handleDelete(profile.id)}
//               />
//             );
//           })
//         ) : (
//           <p className="w-full text-center text-gray-500 py-10">
//             No profiles found
//           </p>
//         )}
//       </div>

//       {/* Pagination Controls */}
//     </div>
//       {true && (
//         <div className="mt-6">
//           <PaginationHelper
//             totalItems={totalPages}
//             itemsPerPage={limit}
//             currentPage={currentPage}
//             onPageChange={(page: any) => setCurrentPage(page)}
//             hasNextPage={currentPage < totalPages}
//             hasPrevPage={currentPage > 1}
//           />
//         </div>
//       )}
//   </>
//   );
// };

// export default SavedProfilesTab;







import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import CandidateCard from "../candidate-card/CandidateCard";
import {
  deleteSavedProfile,
  getSavedProfiles,
  SavedProfile,
  SavedProfilesResponse,
} from "@/helpers/apis/saral-ai";
import PaginationHelper from "../pagination-helper/PaginationHelper";
import NoCandidatesShortlisted from "../no-candidate-shortlisted/NoCandidateShortListed";
import { calculateExperience } from "@/helpers/apis/experience-counter";

interface SavedProfilesTabProps {
  onSavedNotify: () => void; // 👈 define the prop here
}

const SavedProfilesTab:  React.FC<SavedProfilesTabProps>   = ( {onSavedNotify} ) => {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [delLoading, setDelLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

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

  const handleDelete = async (id: number) => {
    setDelLoading(true);
    try {
      const res = await deleteSavedProfile(id);
      setRefreshFlag(!refreshFlag);
      onSavedNotify
      console.log("Delete response:", res.message);
    } catch (err: any) {
      console.error("Error deleting profile:", err);
    } finally {
      setDelLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(currentPage);
  }, [currentPage, refreshFlag]);

  return (
    <div className="flex flex-col h-full">
      {/* Profiles Grid */}
      <div
        className="flex flex-wrap mt-30 content-start overflow-y-auto justify-center gap-3 w-full flex-grow"
        style={{ maxHeight: "700px" }}
      >
        {loading ? (
          <div className="w-full flex m-28 justify-center items-center py-10">
            <Loader isVisible={loading} />
          </div>
        ) : profiles.length > 0 ? (
          profiles.map((profile, i) => {

            const experienceData = JSON.parse(profile.experience || "[]");
           const overallExperience = calculateExperience(experienceData);


            const candidate = {
              id: profile.id,
              name: profile.name,
              initials: profile.name
                .split(" ")
                .map((n) => n[0])
                .join(""),
              position: profile.headline ?? "N/A",
              experience: overallExperience.formatted,
              location: profile.location ?? "Unknown",
              assessmentScore: profile.score,
              profileUrl: profile.linkedin_url ?? "",
            };

            return (
              <CandidateCard
                key={profile.id}
                candidate={candidate}
                initialSavedState={true}
                animationDelay={i * 0.1}
                maxWidth={400}
                isForSavedList={true}
                handleDelete={() => handleDelete(profile.id)}
              />
            );
          })
        ) : (
          <p className="w-full text-center text-gray-500 py-10">
            <NoCandidatesShortlisted />
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
