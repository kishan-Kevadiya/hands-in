import RecentSearch from "@/assets/svg/saral-ai/recent-search/RecentSearch";
import { getSearchHistory, SearchHistoryItem } from "@/helpers/apis/saral-ai";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import ButtonLoader from "../loader/ButtonLoader";
import { useNavigate } from "react-router";
import { getAuthorizedUserId } from "@/helpers/authorization";
import { LOGIN } from "@/routes";

const RecentSearchTab = () => {
  const [expanded, setExpanded] = useState(false);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const [authorizedUserId, setAutorizedUserId] = useState<string>("");

  useEffect(() => {
    const userId = getAuthorizedUserId();
    if (!userId) {
      navigate(LOGIN);
    }
    setAutorizedUserId(userId ?? "");
  }, []);

  const navigate = useNavigate();
  const limit = 6;

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoadingRef = useRef(false);

  const fetchHistory = useCallback(
    async (pageNum: number, isInitial = false) => {
      if (isLoadingRef.current || (!hasMore && !isInitial)) return;

      isLoadingRef.current = true;
      setLoading(true);

      try {
        const res = await getSearchHistory(authorizedUserId, pageNum, limit);

        if (pageNum === 1) {
          setHistory(res.data);
        } else {
          setHistory((prev) => {
            // Prevent duplicate entries
            const existingIds = new Set(prev.map((item) => item.id));
            const newItems = res.data.filter(
              (item) => !existingIds.has(item.id)
            );
            return [...prev, ...newItems];
          });
        }

        setHasMore(pageNum < res.total_pages);

        if (isInitial) {
          setInitialLoad(false);
        }
      } catch (error) {
        console.error("Error fetching search history:", error);
        // Reset loading state on error
        setHasMore(false);
      } finally {
        setLoading(false);
        isLoadingRef.current = false;
      }
    },
    [hasMore, limit]
  );

  useEffect(() => {
    fetchHistory(1, true);
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const container = containerRef.current;
      if (!container || isLoadingRef.current || !hasMore) return;

      const { scrollTop, clientHeight, scrollHeight } = container;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 100);
  }, [hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchHistory(page);
    }
  }, [page]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }, []);

  // Handle navigation to results page
  const handleHistoryClick = useCallback(
    (itemId: string) => {
      console.log("itemId", itemId);
      navigate(`/saral-ai/result/${itemId}/view`);
    },
    [navigate]
  );

  const renderedItems = useMemo(() => {
    return history.map((item) => {
      const { date, time } = formatDate(item.created_at);
      return (
        <div
          key={item.id}
          onClick={() => handleHistoryClick(item.id)}
          className="flex justify-between items-center bg-white rounded-xl px-3 py-2 mb-2 shadow-sm border border-[#f0ebf8] cursor-pointer transition-all duration-200 hover:shadow-md hover:border-[#e1d6f2] hover:bg-[#fefefe] active:transform active:scale-[0.98]"
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
    });
  }, [history, formatDate, handleHistoryClick]);

  // Memoized expand/collapse handler
  const handleToggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  // Show initial loader only on first load
  if (initialLoad && loading) {
    return (
      <div className="bg-white/50 rounded-2xl border-[3px] border-white p-3 w-full mt-[15px] max-w-xs">
        <h3 className="text-[#6b54a3] tracking-wide font-semibold mb-2 flex items-center gap-2">
          <RecentSearch />
          Recent Search
        </h3>
        <div className="border-t border-[#e9e4f3] mb-3" />
        <div className="flex justify-center py-8">
          <ButtonLoader isVisible={loading} />
        </div>
      </div>
    );
  }

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
        {renderedItems}

        {loading && !initialLoad && (
          <div className="text-center text-xs text-[#7965a8] py-2">
            <ButtonLoader isVisible={loading} />
          </div>
        )}
      </div>

      {/* View More / Less */}
      {history.length > 4 && (
        <div className="text-center mt-2">
          <button
            onClick={handleToggleExpanded}
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
