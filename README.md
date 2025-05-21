# Astreamline Project

this project is an anime streaming website without obstructive ads.

## Features

### GraphQL

-  Data is served to client side nextjs by GrapQL API. it was done so to give "Realtime" feel as i cannot have event where the anime has been updates, app will repeatedly request for new data for defined interval (main: 1 min, detail: 3 min)

### Anime Scrapper

-  Anime scrapper is used in wrapper to strategize the interface. just in case datasource is changed, the layer above it shouldn't changed that much.

For base scrapper it used <a href="https://github.com/consumet/consumet.ts">Consumet.ts</a>. it scrapped from big provider using cheerio (in this case i used zoro/hianime)

### API Provider

-  Scrapped anime can be saved using API Provider. Provider can be interexchangeable and is separate system from this main app. you can built the API backend in same interface as mine, and interexchange it. as it doesn't throw any error. just to persist data scrapped

It saves and fetched:

-  Stream data
-  Subs data
-  Stream Sources data
-  Anime detail data

> the data is signed in hash mechanism that tooks identification from the payload + secret key and arrange it in manner to backend for easier validation.

### Client Identification

-  IP is hashed and embedded as cookies for easier identification of clients.

### Stream Proxy

-  Stream source is proxied and to add proper headers for player to stream the hls data. proxy mechanism takes the url as parameter to the hls stream data.

### Watchlist Record

-  Locally recorded watchlist history in browser. this means that no credentials needed for watchlist mechanism other than `Client ID`. Further implementation of persisting watchlist will be method to persisting this record to API and if there's one set up.

   > Finish status implemented from Quartile 3 (75%) of the duration has been reached, eventhough most animes are in 80% but Q3 is enough to determine finished status for anime above 5 mins. under 10 mins, it is on 90%.

-  This features will receive future updates. (re: upcoming features)

## Upcoming Features

Upcoming features will be sorted from most important and will be worked on in ascending

### Skip Intro/Outro

-  There will be toggle button either in player or stream page where user can toggle whether intro/outro is skipped or not. this toggle will be available if the data has intro/outro data on it. the config will be saved locally per client and will be persisted if API Provider is set up.

### Ratings

-  Ratings for each user will be recorded locally and integrated to watchlist record. will have averaged ratings per anime id, editable and persisted through API Provider

### Recommendation

-  Once ratings has been implemented. It will have recommendation system that tooks averaged and other implicit data from client watchlist to determine the recommendation for user

## Routes\*

### View

-  Main Page: `/`
-  Detail Page: `/anime/<id>`
-  Stream Page: `/anime/<id>/watch/<eps_id>`

### API

-  GraphQL: `/api/graphql`
-  Stream Proxy: `/api/stream/<url>`
-  Subs Proxy: `/api/subs?url=<url>&animeId=<id>&episodeId=<id>`

\*All routes detail will be excluded
