import { gql } from "@apollo/client";

export const USER_QUERY = gql`
   query GetUser($userId: ID, $clientId: ID) {
      user(userId: $userId, clientId: $clientId) {
         name
         clientId
         userId
         config
         watchlist
      }
   }
`;

export const LOGIN_QUERY = gql`
   mutation LoginUser($userId: ID!, $clientId: ID!) {
      loginUser(userId: $userId, clientId: $clientId) {
         name
         clientId
         userId
         config
         watchlist
      }
   }
`;
