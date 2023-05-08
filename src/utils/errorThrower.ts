import { GraphQLError } from "graphql";

class DuplicateError extends Error {
  errors: [
    {
      message: string;
    }
  ] = [{ message: "" }];
}

export const thrower = (err: Error) => {
  if (err?.name === "SequelizeUniqueConstraintError")
    throw new GraphQLError(`${(err as DuplicateError)?.errors[0]?.message} !`);
  throw new GraphQLError(err?.message);
};
