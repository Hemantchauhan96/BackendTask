export const typeDefs = `
    type User {
        id: ID!
        username: String!
        email: String!
        createdAt: String
        updatedAt: String
        token: String
    }

    type Movie {
        id: ID!
        movieName: String!
        description: String
        directorName: String
        releaseDate: String
        createdAt: String
        updatedAt: String
        createdBy: ID
    }

    type Review {
        id: ID!
        movieId: Int!
        userId: Int!
        rating: Int
        comment: String
        createdAt: String
        updatedAt: String
    }

    input MovieFilterInput {
        directorName: String
        createdBy: Int
        releaseDateAfter: String
        releaseDateBefore: String
    }

    input SortInput {
        field: String!
        order: SortOrder!
    }

    enum SortOrder {
        ASC
        DESC
    }

    input ReviewFilterInput {
        movieId: Int
        userId: Int
        ratingGreaterThan: Float
        ratingLessThan: Float
    }

    type Query {
        users: [User]

        movies (
            page: Int
            limit: Int
            filter: MovieFilterInput
            sort: SortInput
        ): [Movie!]!

        reviews (
            page: Int
            limit: Int
            filter: ReviewFilterInput
            sort: SortInput
        ) : [Review]

        movie (id: Int) : Movie!

        searchMovie (
            page: Int
            limit: Int
            movieName: String
            description: String
        ) : [Movie]

        review (id: Int) : Review

        reviewsByMovie (
            page: Int
            limit: Int
            movieId: Int!
        ): [Review]

    }

    type Mutation {

        createMovie(
            movieName: String!
            description: String!
            directorName: String!
            releaseDate: String!
        ): Movie!

        updateMovie (
            id: ID!
            movieName: String
            description: String
            directorName: String
            releaseDate: String
        ): Movie!

        deleteMovie (
            id: ID!
        ) : Boolean!
        
        createReview(
            movieId: Int!
            userId: Int
            rating: Int!
            comment: String!
        ): Review!

        updateReview (
            id: ID!
            movieId: ID
            userId: ID
            rating: Int
            comment: String
        ): Review!

        deleteReview (
            id: ID!
        ): Boolean!
        
        signUp(
            username: String!
            email: String!
            password: String!
        ): User!

        signin(
            email: String!
            password: String!
        ): User!

        changePassword(
            email: String!
            oldPassword: String!
            newPassword: String!
        ): User!
    }
`;
