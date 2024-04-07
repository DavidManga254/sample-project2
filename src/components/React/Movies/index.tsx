import API from "../../../API";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import type { Movie } from "../../../types/APi/Movie/movie";

const Movies = (props: { page?: number }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["movieList"],
    queryFn: () => API.movies().movies(props.page ? props.page : 1),
  });

  console.log("here is data", data);

  const handleFetchMore = () => {
    const numberOfMovies: number = data?.length as number;

    const currentPage = numberOfMovies / 20;

    const baseUrl = window.location.origin;

    window.location.href = `${baseUrl}/movies/${(props.page as number) + 1}`;
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
          type="text"
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
        {props.page ? (
          <button
            className="p-2 bg-blue-500 text-white"
            onClick={handleFetchMore}
          >
            Fetch more
          </button>
        ) : null}
      </div>
    </div>
  );
};

const MovieComponent = (prop: { page?: number }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Movies page={prop.page} />
    </QueryClientProvider>
  );
};

export default MovieComponent;
