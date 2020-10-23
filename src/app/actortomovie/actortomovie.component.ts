import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-actortomovie',
  templateUrl: './actortomovie.component.html',
  styleUrls: ['./actortomovie.component.css']
})
export class ActortomovieComponent implements OnInit {
  constructor(private dbService: DatabaseService, private router: Router) {}

  moviesDB: any[] = [];
  movieId: string = "";
  title: string = "";
  year: number = 0;
  actorsDB: any[] = [];
  actorId: string = "";
  fullName: string = "";
  bYear: number = 0;
  movieIndiv: object;

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  onGetMovie() {
    this.dbService.getMovie(this.movieId).subscribe((data: any[]) => {
      this.movieIndiv = data;
    });
  }
  onMovieSelect(item) {
    this.movieId = item._id;
    this.title = item.title;
    this.year = item.year;
  }
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }  
  onActorSelect(item) {
    this.actorId = item._id;
    this.fullName = item.name;
    this.bYear = item.bYear;
  }
  onAddActorMovie(){
    let actor = {id: this.actorId}; 
    this.dbService.addActorMovie(this.movieId,actor).subscribe(result=>{
      this.onGetMovies();
      this.onGetMovie();
      this.router.navigate(["/listactors"]);
    });

  }

  ngOnInit(): void {
    this.onGetMovies();
    this.onGetActors();
  }
}
