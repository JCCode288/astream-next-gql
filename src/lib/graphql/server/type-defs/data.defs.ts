import gql from "graphql-tag";

const dataTypeDefs = gql`
   type Anime {
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

   type AnimeResult {
      currentPage: Int
      hasNextPage: Boolean
      results: [Anime]
   }

   type MainAnimes {
      recent: AnimeResult
      top: AnimeResult
      popular: AnimeResult
      movies: AnimeResult
   }

   type ZoroResult {
      keys: [String]!
      datas: MainAnimes
   }

   type DetailResult {
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
      episodes: [Episode]
      startDate: FuzzyDate
      endDate: FuzzyDate
      recommendations: [Anime]
      relations: [Anime]
   }

   type Episode {
      id: ID!
      number: Int!
      title: String
      description: String
      url: String
      image: String
      releaseDate: String
   }

   type Trailer {
      id: ID!
      url: String
      site: String
      thumbnail: String
   }

   type FuzzyDate {
      year: Int
      month: Int
      day: Int
   }

   type Source {
      headers: SourceHeader
      intro: SourceStamp
      outro: SourceStamp
      sources: [Video]!
      subtitles: [Subtitle]
      download: String
      embedURL: String
   }

   type SourceStamp {
      start: Int!
      end: Int!
   }

   type SourceHeader {
      Referer: String
   }

   type Subtitle {
      url: String!
      lang: String
   }

   type Video {
      url: String!
      quality: String
      isM3U8: Boolean
      isDASH: Boolean
      size: Int
      type: String
   }

   type User {
      name: String!
      email: String
      clientId: [String]!
      userId: String
      canComment: Boolean!
      config: UserConfig
      watchlists: [Watchlist]!
      createdAt: String
      updatedAt: String
   }

   type UserConfig {
      autoplay: Boolean
      theme: String!
   }

   type Watchlist {
      episode: Episode!
      timestamp: Int!
      duration: Int
   }

   type Comment {
      userId: ID!
      comment: String!
      createdAt: String
      updatedAt: String
   }
`;

export default dataTypeDefs;
