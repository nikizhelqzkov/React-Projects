export type SearchBarProps = {
  search: string;
  setSearch: (search: string) => void;
};

export type SearchCriteria = Omit<SearchBarProps, "setSearch"> & SearchOptions;

export type SearchOptions = {
  perPage: number;
  sortBy: SortOption;
  order: OrderOption;
};

export type SortOption = "best_match" | "stars" | "forks" | "updated";
export type OrderOption = "asc" | "desc";

export type SearchProps = {
  onSearch: (searchCriteria: SearchCriteria) => void;
  onFilterChange: (data: SearchCriteria) => void;
};

export type OptionsProps = {
  perPage: number;
  setPerPage: (perPage: number) => void;
  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;
  order: OrderOption;
  setOrder: (order: OrderOption) => void;
  onFilterChange: (data: SearchOptions) => void;
};