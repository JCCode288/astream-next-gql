import gql from "graphql-tag";

const typeDefs = gql`
   type Query {
      hello: String
      detail(id: ID!): DetailResult
      watch(id: ID!): Source
      main(
         page: Int
         recent_page: Int
         top_page: Int
         movie_page: Int
         popular_page: Int
      ): ZoroResult
      search(query: String!, page: Int): AnimeResult
   }

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
   }

   type AnimeResult {
      currentPage: Int
      hasNextPage: Boolean
      results: [Anime]
   }

   type ZoroResult {
      recent: AnimeResult
      top: AnimeResult
      movies: AnimeResult
      popular: AnimeResult
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
      sources: [Video]!
      subtitles: [Subtitle]!
      download: String
      embedURL: String
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
`;

export default typeDefs;
