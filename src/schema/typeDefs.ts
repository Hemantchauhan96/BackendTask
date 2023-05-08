export const typeDefs = `
    type User {
        id: ID!
        username: String!
        email: String!
        createdAt: String
        updatedAt: String
        token: String!
    }

    input SortInput {
        field: String!
        order: SortOrder!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
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
