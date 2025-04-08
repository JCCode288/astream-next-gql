import { gql } from "@apollo/client";

export const SEARCH_QUERY = gql`
   mutation SearchAnime($query: String!, $page: Int) {
      search(query: $query, page: $page) {
         hasNextPage
         results {
            id
            title
            url
            image
            cover
            status
            rating
            type
            releaseDate
         }
      }
   }
`;
