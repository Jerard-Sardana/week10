const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let path = require('path');
app.use("/", express.static(path.join(__dirname, "dist/week10")));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:id/removeMovie', actors.removeMovie);
app.delete('/actors/:ida/deleteActorMovies/:idm', actors.deleteActorMovies);
app.post('/actors/:id/clearActorMovies', actors.clearActorMovies);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteByID);
app.delete('movies/:idm/removeActor/:ida', movies.removeActor);
app.put('/movies/:id/addActor', movies.addActor); 
app.get('/movies/:year1/:year2', movies.getMoviesPeriod);
app.delete('/movies/:year1/:year2', movies.deleteMoviesPeriod);
