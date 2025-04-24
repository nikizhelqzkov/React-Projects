import { useEffect, useRef, useState } from "react";
import {
  OptionsProps,
  OrderOption,
  SearchBarProps,
  SearchOptions,
  SearchProps,
  SortOption,
} from "../../Models/Search";
import { Dropdown } from "../shared/Dropdown/Dropdown";

export default function Search({
  onSearch,
  onFilterChange,
}: Readonly<SearchProps>) {
  const [search, setSearch] = useState<string>("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [perPage, setPerPage] = useState<number>(10);
  const [sortBy, setSortBy] = useState<SortOption>("best_match");
  const [order, setOrder] = useState<OrderOption>("desc");

  const filterValuesRef = useRef({ perPage, sortBy, order });

  // Update ref whenever filter values change
  useEffect(() => {
    filterValuesRef.current = { perPage, sortBy, order };
  }, [perPage, sortBy, order]);

  // Debounce ONLY search text changes
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer only if search has content
    if (search.trim()) {
      debounceTimerRef.current = setTimeout(() => {
        // Use the current filter values from ref
        const { perPage, sortBy, order } = filterValuesRef.current;
        onSearch({ search, perPage, sortBy, order });
        debounceTimerRef.current = null;
      }, 500);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [search, onSearch]); // Only depend on search text changes

  return (
    <form action="">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="mt-4">
        <Options
          perPage={perPage}
          setPerPage={setPerPage}
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
          onFilterChange={(data: SearchOptions) => {
            onFilterChange({ search, ...data });
          }}
        />
      </div>
    </form>
  );
}

export const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="Search for a repository..."
      className="border border-gray-300 rounded-md p-2 w-full h-15 focus:border-b-blue-800 focus:outline-none focus:bg-sky-200"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export const Options = ({
  perPage,
  setPerPage,
  sortBy,
  setSortBy,
  order,
  setOrder,
  onFilterChange,
}: OptionsProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <Dropdown
        key={"perPage"}
        id="perPage"
        label="Items per page"
        value={perPage}
        onChange={(value) => {
          setPerPage(Number(value));
          onFilterChange({ perPage: Number(value), sortBy, order });
        }}
        options={[
          { value: "10", label: "10" },
          { value: "25", label: "25" },
          { value: "50", label: "50" },
          { value: "100", label: "100" },
        ]}
        labelWidth="130px"
        containerClassName="flex-1 min-w-[150px]"
      />

      <Dropdown
        id="sort-by"
        label="Sort by"
        value={sortBy}
        onChange={(value) => {
          setSortBy(value as SortOption);
          onFilterChange({ perPage, sortBy: value as SortOption, order });
        }}
        options={[
          { value: "best_match", label: "Best match" },
          { value: "stars", label: "Stars" },
          { value: "forks", label: "Forks" },
          { value: "updated", label: "Updated" },
        ]}
        labelWidth="80px"
        containerClassName="flex-1/4 min-w-[250px]"
      />

      <Dropdown
        id="order"
        label="Order"
        value={order}
        onChange={(value) => {
          setOrder(value as OrderOption);
          onFilterChange({ perPage, sortBy, order: value as OrderOption });
        }}
        options={[
          { value: "desc", label: "Descending" },
          { value: "asc", label: "Ascending" },
        ]}
        labelWidth="65px"
        containerClassName="flex-1 min-w-[150px]"
      />
    </div>
  );
};
