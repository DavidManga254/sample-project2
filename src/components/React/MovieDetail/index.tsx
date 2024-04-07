import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import API from "../../../API";
import type { MovieData } from "../../../types/APi/Movie/movie";

const MovieDetail = (prop: { id: number }) => {
  console.log("here is id", prop.id);
  const { isPending, data, error } = useQuery({
    queryKey: ["movieDetails"],
    queryFn: () => API.movies().moviesDetails(prop.id),
  });

  const VideosComponent = (prop: { id: number }) => {
    const { isPending, data, error } = useQuery({
      queryKey: ["movieVideos"],
      queryFn: () => API.movies().movieVideos(prop.id),
    });

    const movieList = data?.results;

    return (
      <div className="flex flex-row flex-wrap w-[100%] overflow-x-sc">
        {!isPending
          ? movieList?.map((movie, id) => {
              return (
                <iframe
                  key={id}
                  src={`https://www.youtube.com/embed/${movie.key}?autoplay=0&mute=0`}
                  className="mr-10 my-5 w-[30%] aspect-video "
                />
              );
            })
          : null}
      </div>
    );
  };

  const movieInfo: MovieData = data as MovieData;

  return (
    <div>
      {!isPending ? (
        <div className="px-10">
          <div className="flex flex-row  justify-center">
            <img
              src={`https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`}
              className="w-[25%] mx-20"
            />
            <div className="mx-20">
              <div className="mb-5">
                <h3 className="text-3xl">Overview</h3>
                <p className="text-xl">{movieInfo.overview}</p>
              </div>
              <div className="mb-5">
                <h3 className="text-3xl">Release Date</h3>
                <p className="text-xl">{movieInfo.release_date}</p>
              </div>
              <div className="mb-5">
                <h3 className="text-3xl">Overview</h3>
                <p className="text-xl">{movieInfo.overview}</p>
              </div>
              <div className="mb-5">
                <h3 className="text-3xl">Runtime</h3>
                <p className="text-xl">{movieInfo.runtime} min</p>
              </div>
              <div className="mb-5">
                <h3 className="text-3xl">Genres</h3>
                <div>
                  {movieInfo.genres.map((genre, id) => (
                    <span key={id} className="mr-2 text-xl">
                      {" "}
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <VideosComponent id={movieInfo.id} />
        </div>
      ) : null}
    </div>
  );
};

const MovieDetailWrap = (prop: { id: number }) => {
  console.log("here is first id", prop.id);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MovieDetail id={prop.id} />
    </QueryClientProvider>
  );
};

export default MovieDetailWrap;
