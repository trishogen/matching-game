# matching-game
  A simple card matching memory game. This is a  Javascript single page application, with a Ruby on Rails backend.

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
`open index.html`
