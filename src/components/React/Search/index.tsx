import API from "../../../API";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import MovieCard from "../Movies/MovieCard";
import type { Movie } from "../../../types/APi/Movie/movie";

const Movies = (prop: { query: string }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["movieList"],
    queryFn: () => API.movies().searchMovie(prop.query),
  });

  console.log("here is data", data);

  const handleFetchMore = () => {
    const numberOfMovies: number = data?.length as number;

    const currentPage = numberOfMovies / 20;
  };

  const handleSearch = (event: any) => {
    if (event.key === "Enter") {
      const baseUrl = window.location.origin;

      window.location.href = `${baseUrl}/search/${event.target.value}`;
    }
  };

  return (
    <div className="text-2xl">
      <div>
        <h1>Movies</h1>
        <input
          onKeyDown={(e) => handleSearch(e)}
          placeholder="Search Movies or TV Shows"
          className="p-3 border-solid border w-[20%] outline-none border-red-500"
        />
      </div>
      <div className="flex flex-row flex-wrap">
        {isPending ? (
          <h1> Loading </h1>
        ) : (
          data?.map((movie: Movie, key) => (
            <MovieCard
              cover={movie.poster_path}
              name={movie.title}
              key={key}
              id={movie.id}
            />
          ))
        )}
      </div>
      <div className="flex flex-row justify-center">
        <button onClick={handleFetchMore}>Fetch more</button>
      </div>
    </div>
  );
};

const MovieSearch = (prop: { query: string }) => {
  const queryClient = new QueryClient();

  console.log("search query is", prop.query);

  return (
    <QueryClientProvider client={queryClient}>
      <Movies query={prop.query} />
    </QueryClientProvider>
  );
};

export default MovieSearch;
