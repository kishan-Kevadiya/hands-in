import RecentSearch from "@/assets/svg/saral-ai/recent-search/RecentSearch";
import { getSearchHistory, SearchHistoryItem } from "@/helpers/apis/saral-ai";
import { useEffect, useState, useRef, useCallback } from "react";
import Loader from "../loader/Loader";
import ButtonLoader from "../loader/ButtonLoader";

const RecentSearchTab = () => {
  const [expanded, setExpanded] = useState(false);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const limit = 6;
  const profileId = 123; // replace with real profile ID

  const containerRef = useRef<HTMLDivElement>(null);

  const fetchHistory = useCallback(
    async (pageNum: number) => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        const res = await getSearchHistory(pageNum, limit, profileId);
        if (pageNum === 1) {
          setHistory(res.data);
        } else {
          setHistory((prev) => [...prev, ...res.data]);
        }
        setHasMore(pageNum < res.total_pages);
      } catch (error) {
        console.error("Error fetching search history:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, limit, profileId]
  );

  useEffect(() => {
    // fetchHistory(1);
  }, [fetchHistory]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || loading || !hasMore) return;

    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 10
    ) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchHistory(page);
    }
  }, [page, fetchHistory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div className="bg-white/50 rounded-2xl border-[3px] border-white p-3 w-full mt-[15px] max-w-xs">
      {/* Header */}
      <h3 className="text-[#6b54a3] tracking-wide font-semibold mb-2 flex items-center gap-2">
        <RecentSearch />
        Recent Search
      </h3>

      {/* Divider */}
      <div className="border-t border-[#e9e4f3] mb-3" />

      {/* Scrollable list */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#e1d6f2] scrollbar-track-transparent transition-all duration-300 ease-in-out"
        style={{
          maxHeight: expanded ? "16rem" : "8rem",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {history.map((item) => {
          const { date, time } = formatDate(item.created_at);
          return (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white rounded-xl px-3 py-2 mb-2 shadow-sm border border-[#f0ebf8]"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#2d1b4a] truncate max-w-[150px]">
                  {item.query_text}
                </span>
                <span className="text-xs text-[#7965a8]">
                  {item.total_results} results
                </span>
              </div>
             <span className="text-xs text-[#7965a8] flex flex-col sm:flex-col sm:gap-1">
  <span>{date}</span>
  <span>{time}</span>
</span>

            </div>
          );
        })}

        {loading && (
          <div className="text-center text-xs text-[#7965a8] py-2">
            <ButtonLoader isVisible={loading}/>
          </div>
        )}
      </div>

      {/* View More / Less */}
      {history.length > 4 && (
        <div className="text-center mt-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm outline-none font-medium px-5 py-2 rounded-full bg-clip-text text-transparent bg-gradient-to-r from-[#3F1562] to-[#DF6789] border border-transparent hover:border-[#DF6789] transition-all duration-300"
          >
            {expanded ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentSearchTab;