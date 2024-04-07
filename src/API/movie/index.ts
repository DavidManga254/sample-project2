import { type MovieData } from "./../../types/APi/Movie/movie";
import type { AxiosInstance, AxiosResponse } from "axios";
import type {
  Movie,
  MovieResponse,
  VideoListResponse,
} from "../../types/APi/Movie/movie";

class MovieApi {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async movies(page: number): Promise<Movie[]> {
    const response: AxiosResponse<MovieResponse> = await this.axios(
      "/discover/movie",
      {
        method: "get",
        params: {
          include_adult: false,
          include_video: false,
          language: "en-US",
          page: page,
          sort_by: "popularity.desc",
        },
      }
    );

    return response.data.results;
  }

  async moviesDetails(id: number): Promise<MovieData> {
    const response: AxiosResponse<MovieData> = await this.axios(
      `/movie/${id}`,
      {
        method: "get",
        params: {
          language: "en-Us",
        },
      }
    );

    return response.data;
  }

  async movieVideos(id: number): Promise<VideoListResponse> {
    const response: AxiosResponse<VideoListResponse> = await this.axios(
      `/movie/${id}/videos`,
      {
        method: "get",
        params: {
          language: "en-Us",
        },
      }
    );

    return response.data;
  }

  async searchMovie(query: string): Promise<Movie[]> {
    const response: AxiosResponse<MovieResponse> = await this.axios(
      "/search/movie",
      {
        method: "get",
        params: {
          query: query,
        },
      }
    );

    return response.data.results;
  }
}

export default MovieApi;
