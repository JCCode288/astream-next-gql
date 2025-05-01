import { gql } from "@apollo/client";

export const USER_QUERY = gql`
   query GetUser($userId: ID, $browserId: ID) {
      user(userId: $userId, browserId: $browserId) {
         name
         browserId
         userId
         config
         watchlist
      }
   }
`;

export const LOGIN_QUERY = gql`
   mutation LoginUser($userId: ID!, $browserId: ID!) {
      loginUser(userId: $userId, browserId: $browserId) {
         name
         browserId
         userId
         config
         watchlist
      }
   }
`;
