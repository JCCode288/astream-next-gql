import { gql } from "@apollo/client";

export const WATCH_QUERY = gql`
   query WatchEpisode($id: ID!, $animeId: ID!) {
      watch(id: $id) {
         headers {
            Referer
         }
         sources {
            url
            quality
            isM3U8
            isDASH
            size
            type
         }
         download
         embedURL
         intro {
            start
            end
         }
         outro {
            start
            end
         }
         subtitles {
            url
            lang
         }
      }
      detail(id: $animeId) {
         id
         title
         image
         episodes {
            id
            title
            number
            image
         }
      }
   }
`;
