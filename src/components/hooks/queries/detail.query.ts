import { gql } from "@apollo/client";

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
