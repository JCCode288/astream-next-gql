import gql from "graphql-tag";

const inputTypeDefs = gql`
   input AddUser {
      name: String!
      email: String
      clientId: [String]!
      userId: String
      canComment: Boolean!
      config: AddUserConfig
      watchlists: [AddWatchlist]!
      createdAt: String
      updatedAt: String
   }

   input AddUserConfig {
      autoplay: Boolean
      theme: String!
   }

   input AddWatchlist {
      episode: AddEpisode!
      timestamp: Int!
      duration: Int
   }

   input AddComment {
      epsId: ID!
      userId: ID!
      comment: String!
      createdAt: String
      updatedAt: String
   }

   input AddEpisode {
      id: ID!
      number: Int!
      title: String
      description: String
      url: String
      image: String
      releaseDate: String
   }

   input AddDetailResult {
      id: ID!
      title: String!
      url: String
      image: String
      cover: String
      status: String
      rating: Int
      type: String
      releaseDate: String
      malId: String
      genres: [String]
      description: String
      totalEpisodes: Int
      subOrDub: String
      synonyms: [String]
      hasSub: Boolean
      hasDub: Boolean
      countryOfOrigin: String
      isAdult: Boolean
      isLicensed: Boolean
      season: String
      studios: [String]
      color: String
      episodes: [AddEpisode]
      startDate: AddFuzzyDate
      endDate: AddFuzzyDate
      recommendations: [AddAnime]
      relations: [AddAnime]
   }

   input AddAnime {
      id: ID!
      title: String!
      url: String
      image: String
      cover: String
      status: String
      rating: Int
      type: String
      releaseDate: String
      duration: String
   }

   input AddTrailer {
      id: ID!
      url: String
      site: String
      thumbnail: String
   }

   input AddFuzzyDate {
      year: Int
      month: Int
      day: Int
   }

   input AddSource {
      headers: AddSourceHeader
      sources: [AddVideo]!
      subtitles: [AddSubtitle]!
      download: String
      embedURL: String
   }

   input AddSourceHeader {
      Referer: String
   }

   input AddSubtitle {
      url: String!
      lang: String
   }

   input AddVideo {
      url: String!
      quality: String
      isM3U8: Boolean
      isDASH: Boolean
      size: Int
      type: String
   }
`;

export default inputTypeDefs;
