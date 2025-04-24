import { Repository } from "../../Models/Repository";

type ResultsProps = {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
};

export default function Results({
  repositories,
  loading,
  error,
  isEmpty,
}: Readonly<ResultsProps>) {
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }
  if (isEmpty) {
    return <></>;
  }
  if (repositories.length === 0) {
    return <div className="text-center">No results found</div>;
  }
  return (
    <div className="mt-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {repositories.map((repository) => (
        <div
          key={repository.id}
          className="border border-gray-300 rounded-md p-4 shadow-md"
        >
          <h2 className="text-xl font-bold">{repository.name}</h2>
          <p className="text-gray-600">{repository.description}</p>
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Repository
          </a>
          <p className="text-gray-500">Stars: {repository.stargazers_count}</p>
        </div>
      ))}
    </div>
  );
}
