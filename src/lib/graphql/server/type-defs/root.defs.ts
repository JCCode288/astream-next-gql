import gql from "graphql-tag";

const rootTypeDefs = gql`
   type Query {
      hello: String
      detail(id: ID!): DetailResult
      watch(id: ID!): Source
      main(
         page: Int
         recent_page: Int
         top_page: Int
         movie_page: Int
         popular_page: Int
      ): ZoroResult
      user(userId: ID, browserId: ID): User
   }

   type Mutation {
      search(query: String!, page: Int): AnimeResult
      login(userId: ID!): User
      register(userData: AddUser): User
      addComment(commentData: AddComment): Comment
      editComment(commentId: ID!, commentData: AddComment): Comment
      deleteComment(commentId: ID!): Comment
   }

   type Subscription {
      commentSection(epsId: ID!): [Comment]!
   }
`;

export default rootTypeDefs;
