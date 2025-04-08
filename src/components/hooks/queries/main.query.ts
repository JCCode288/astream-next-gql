import { gql } from "@apollo/client";

export const ANIMES_QUERY = gql`
   query GetMain(
      $page: Int
      $recent_page: Int
      $top_page: Int
      $movie_page: Int
      $popular_page: Int
   ) {
      main(
         page: $page
         recent_page: $recent_page
         top_page: $top_page
         movie_page: $movie_page
         popular_page: $popular_page
      ) {
         recent {
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
            currentPage
            hasNextPage
         }
         top {
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
            currentPage
            hasNextPage
         }
         movies {
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
            currentPage
            hasNextPage
         }
         popular {
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
            currentPage
            hasNextPage
         }
      }
   }
`;
