import { gql } from "@apollo/client";

export const WATCH_QUERY = gql`
   query WatchEpisode($id: ID!) {
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
         subtitles {
            url
            lang
         }
      }
   }
`;
