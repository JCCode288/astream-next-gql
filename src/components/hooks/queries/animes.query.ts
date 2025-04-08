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

export const DETAIL_QUERY = gql`
   query GetDetail($id: ID!) {
      detail(id: $id) {
         id
         title
         url
         image
         cover
         status
         rating
         type
         releaseDate
         malId
         genres
         description
         totalEpisodes
         subOrDub
         synonyms
         hasSub
         hasDub
         countryOfOrigin
         isAdult
         isLicensed
         season
         studios
         color
         episodes {
            id
            number
            title
            url
            releaseDate
         }
         startDate {
            year
            month
            day
         }
         endDate {
            year
            month
            day
         }
         recommendations {
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
         relations {
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
