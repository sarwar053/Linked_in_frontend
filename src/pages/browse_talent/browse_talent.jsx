import { useEffect, useRef, useState, useCallback } from "react";
import Chat from "../../chat/chat.jsx";
import Footer from "../../footer/footer.jsx";
import Header from "../../header/header.jsx";
import Bt_sectionOne from "./component/bt_sectionOne.jsx";
import Bt_sectionTwo from "./component/bt_sectionTwo.jsx";
import { fetchTalents } from "../../api/talentApi.js";

const DEFAULT_FILTERS = {
  search: "",
  category: "All categories",
  locations: [],
  sort: "recent",
  page: 1,
};

function Browse_talent() {
  const [searchInput, setSearchInput] = useState("");

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const filtersRef = useRef(DEFAULT_FILTERS);

  const [talents, setTalents] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetchTalents({ ...DEFAULT_FILTERS, limit: 12 });
        if (ignore) return;
        setTalents(res.data || []);
        setPagination(res.pagination || null);
        setCategoryCounts(res.categoryCounts || {});
      } catch (err) {
        if (ignore) return;
        setError(err.message || "Something went wrong loading talent profiles.");
        setTalents([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };

  }, []);


  const runSearch = useCallback(async (nextFilters) => {
    filtersRef.current = nextFilters;
    setFilters(nextFilters);
    setLoading(true);
    setError("");
    try {
      const res = await fetchTalents({ ...nextFilters, limit: 12 });
      setTalents(res.data || []);
      setPagination(res.pagination || null);
      setCategoryCounts(res.categoryCounts || {});
    } catch (err) {
      setError(err.message || "Something went wrong loading talent profiles.");
      setTalents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearchSubmit = () => {
    runSearch({ ...filtersRef.current, search: searchInput, page: 1 });
  };

  const handleCategoryChange = (cat) => {
    runSearch({ ...filtersRef.current, category: cat, page: 1 });
  };

  const handleLocationToggle = (city) => {
    const current = filtersRef.current.locations;
    const nextLocations = current.includes(city)
      ? current.filter((c) => c !== city)
      : [...current, city];
    runSearch({ ...filtersRef.current, locations: nextLocations, page: 1 });
  };

  const handleSortChange = (value) => {
    runSearch({ ...filtersRef.current, sort: value, page: 1 });
  };

  const handlePageChange = (nextPage) => {
    runSearch({ ...filtersRef.current, page: nextPage });
  };

  return (
    <>
      <Header />
      <Bt_sectionOne
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <Bt_sectionTwo
        talents={talents}
        loading={loading}
        error={error}
        pagination={pagination}
        categoryCounts={categoryCounts}
        category={filters.category}
        onCategoryChange={handleCategoryChange}
        locations={filters.locations}
        onLocationToggle={handleLocationToggle}
        sort={filters.sort}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
      />
      <Footer />
      <Chat />
    </>
  );
}

export default Browse_talent;