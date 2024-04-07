const MovieCard = (props: { cover: string; name: string; id: number }) => {
  return (
    <div className="w-[18%] p-3 mx-4 my-2 hover:cursor-pointer">
      <a href={`/movie/${props.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/original/${props.cover}`}
          className="rounded-lg mb-3"
        />
        <h2> {props.name}</h2>
      </a>
    </div>
  );
};

export default MovieCard;
