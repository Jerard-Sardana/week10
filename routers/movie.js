var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
const { lte } = require('semver');
module.exports = {
    getAll: function (req, res) {
        Movie.find({
            _id: mongoose.Types.ObjectId(req.params.id)
         }).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteByID: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, req.body, function (err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json();
        })
    },
    removeActor: function(req, res){
        Movie.findOneAndUpdate({ _id: req.params.idm }, { $pullAll: { 'actors' : [ req.params.ida ] } }, function (err, doc){ 
            if (err) return res.status(400).json(err);
            if (!doc) return res.status(404).json();
            res.json(doc);
        });
    },
    addActor: function (req, res){
        Movie.findOne({ _id: req.params.id }, function (err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.body.ida }, function (err, actor){
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err){
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            });
        });
    },
    getMoviesPeriod: function (req, res){
        let year1 = req.params.first;
        let year2 = req.params.second;
        Movie.find({ year: { $gte: year2, $lte: year1 }, year: { $lte: req.params.year1 } })
        .populate('actors')
        .exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            if (!movies) return res.status(404).json();
            res.json(movies);
        }); 
    },
    deleteMoviesPeriod: function (req, res){
        Movie.find({ year: { $gte: req.params.year2 }, year: { $lte: req.params.year1 } })
        .populate('actors')
        .exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            if (!movies) return res.status(404).json();                
                Movie.deleteMany({ _id: movies}, function (err) {
                    if (err) return res.status(400).json(err);
                    res.json();
                });                
            res.json(movies);
        });
}
};