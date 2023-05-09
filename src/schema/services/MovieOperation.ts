import { GraphQLError } from "graphql";
import { Movie, MovieModel } from "../../models";
import { thrower } from "../../utils/errorThrower";
import { MyContext } from "../../../app";
import { Op, OrderItem, WhereOptions } from "sequelize";
import { SortMovieArgs, FilterMovieArgs } from "../../types/Movie";

export const MovieOperation = {
  movies: async (
    _: undefined,
    args: {
      page?: number;
      limit?: number;
      filter?: FilterMovieArgs;
      sort?: SortMovieArgs;
    }
  ) => {
    try {
      const page = args?.page || 1;
      const limit = args?.limit || 10;
      const offset = limit * (page - 1);
      const { filter, sort } = args;
      const where: WhereOptions<MovieModel> = {};
      if (filter) {
        if (filter?.directorName) {
          where.directorName = filter.directorName;
        }
        if (filter?.createdBy) {
          where.createdBy = filter.createdBy;
        }
        if (filter?.releaseDateAfter) {
          where.releaseDate = { [Op.gt]: filter.releaseDateAfter };
        }
        if (filter?.releaseDateBefore) {
          where.releaseDate = { [Op.lt]: filter.releaseDateBefore };
        }
      }

      const order: OrderItem[] | undefined = sort
        ? [[sort.field, sort.order]]
        : undefined;

      const movies = await MovieModel.findAll({
        where,
        order,
        offset: offset,
        limit: limit,
      });

      return movies;
    } catch (err) {
      if (err instanceof Error) {
        thrower(err);
      } else {
        throw new Error(`An unknown error occurred: ${err}`);
      }
    }
  },
  searchMovies: async (
    _: undefined,
    args: { page?: number; limit?: number } & Partial<Movie>
  ) => {
    try {
      const page = args?.page || 1;
      const limit = args?.limit || 10;
      const offset = limit * (page - 1);

      const movies = await MovieModel.findAll({
        where: {
          movieName: `${args.movieName}`,
          description: `${args.description}`,
        },
        offset: offset,
        limit: limit,
      });

      return movies;
    } catch (err) {
      if (err instanceof Error) {
        thrower(err);
      } else {
        throw new Error(`An unknown error occurred: ${err}`);
      }
    }
  },
  movie: async (parent: undefined, args: { id: number }) => {
    try {
      const { id } = args;
      const movie = await MovieModel.findByPk(id);
      if (!movie) throw new GraphQLError(`Movie not found!`);
      return movie;
    } catch (err) {
      if (err instanceof Error) {
        thrower(err);
      } else {
        throw new Error(`An unknown error occurred: ${err}`);
      }
    }
  },
  createMovie: async (
    parent: undefined,
    args: Partial<Movie>,
    { user }: MyContext
  ) => {
    try {
      if (!user) throw new GraphQLError(`Not allowed to create movie.`);

      args.createdBy = user.id;
      args.releaseDate = new Date(args.releaseDate);
      const newMovie = await MovieModel.create(args);
      console.log({ newMovie });

      return newMovie;
    } catch (err) {
      if (err instanceof Error) {
        thrower(err);
      } else {
        throw new Error(`An unknown error occurred: ${err}`);
      }
    }
  },
  updateMovie: async (
    parent: undefined,
    args: Partial<Movie>,
    { user }: MyContext
  ) => {
    try {
      if (!user)
        throw new GraphQLError(`You are not allowed to perform this action !`);
      const { id, ...toUpdate } = args;
      const selected = await MovieModel.findByPk(id);
      if (selected.createdBy !== user.id)
        throw new GraphQLError(`You are not allowed to perform this action !`);
      const movie = await selected.update(toUpdate);
      if (!movie) {
        throw new GraphQLError(`Movie not found !`);
      }
      return movie;
    } catch (err) {
      if (err instanceof Error) {
        thrower(err);
      } else {
        throw new Error(`An unknown error occurred: ${err}`);
      }
    }
  },
  deleteMovie: async (
    parent: undefined,
    args: { id: string },
    { user }: MyContext
  ) => {
    try {
      if (!user)
        throw new GraphQLError(`You are not allowed to perform this action !`);
      const { id } = args;
      const selected = await MovieModel.findByPk(id);
      if (selected.createdBy !== user.id)
        throw new GraphQLError(`You are not allowed to perform this action !`);
      if (!selected) throw new GraphQLError(`Movie not found !`);
      await selected.destroy();
      return true;
    } catch (err) {
      if (err instanceof Error) {
        thrower(err);
      } else {
        throw new Error(`An unknown error occurred: ${err}`);
      }
    }
  },
};
