# matching-game
  A simple card matching memory game. This is a vanilla Javascript single page application, with a Ruby on Rails backend. A demo of this app can be found [here](https://www.youtube.com/watch?v=hiawumrc_nY&t=1s).

## Running Locally

### Backend
To get the backend working, first install dependencies, then create and seed the database, then start up the server.

#### Install Dependencies
Matching game uses Ruby version 2.6.1, to install its dependencies run `bundle install` from the root.

#### Set up database
From the root run:

```
cd matching-game-backend
rails db:create
rails db:migrate
rails db:seed
```

#### Start up Server
`rails s`

### Frontend
From the root run:
```
npm install
open index.html
```

## Images
Icons are from [icons8](https://icons8.com/)

## Future Improvements:
* Build out test suite
* Users can select a difficult level on games, which adjusts the number of cards
they receive in a game
* Users can select different game categories corresponding to images shown i.e. animal icons vs. plant icons etc.
* App pulls card images from an API (or look at storage solutions)
* User authentication
* Transition to one startup command via rake for both the front and back end
* Move over React on the front-end when things get more complex
