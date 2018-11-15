import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SwMovie } from './sw-movies.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from '../_utilities/utilities.service';
import { SwCharactersService } from '../sw-characters/sw-characters.service';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwMoviesService {
  private base_URL = environment.BASE_URL;

  // Observable sources: Star Wars Movies Array
  private moviesSource = new BehaviorSubject<SwMovie[]>(null);
  movies$ = this.moviesSource.asObservable();

  // Observable sources: Selected Movie
  private selectedMovieSource = new BehaviorSubject<SwMovie>(null);
  selectedMovie$ = this.selectedMovieSource.asObservable();

  // Observable sources: Error
  private errorSource = new BehaviorSubject<string>(null);
  error$ = this.errorSource.asObservable();

  // Observable sources: Error
  private loaderSource = new BehaviorSubject<boolean>(false);
  loader$ = this.loaderSource.asObservable();

  constructor(
    private http: HttpClient,
    private util: UtilitiesService
  ) { }

  getMoviesData() {
    this.updateLoader(true);
    this.getMovies().subscribe(
      res => {
        console.log(res);
        console.log(res.results.length);
        this.extractMovieData(res.results)
        this.updateError(null);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.updateError(err);
        this.updateMovies(null);
        this.updateLoader(false);
      }
    );
  }

  getMovies(): Observable<any> {
    const PATH = this.base_URL + `/films`;
    return this.http.get<Response>(PATH).pipe(
      retry(3),
      catchError(this.util.handleError)
    );
  }

  extractMovieData(result: any[]) {
    let movieData: SwMovie[] = [];
    for (const movie of result) {
      movieData.push(
        new SwMovie(
          movie.title,
          movie.episode_id,
          movie.opening_crawl,
          movie.producer,
          movie.release_date,
          movie.characters
        )
      )
    }
    console.log(movieData);
    this.updateMovies(movieData);
    this.updateLoader(false);
    this.updateError(null);
  }

  updateMovies(movies: SwMovie[]) {
    this.moviesSource.next(movies);
  }

  updateSelectedMovie(movie) {
    this.selectedMovieSource.next(movie);
    console.log(movie)
  }

  updateError(message) {
    this.errorSource.next(message);
    console.log(message);
  }

  updateLoader(state) {
    this.loaderSource.next(state);
    console.log(state);
  }
}
