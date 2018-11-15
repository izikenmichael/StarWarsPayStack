import { Component, OnInit } from '@angular/core';
import { SwMoviesService } from './sw-movies.service';
import { SwMovie } from './sw-movies.model';
import { SwCharacter } from '../sw-characters/sw-characters.model';
import { SwCharactersService } from '../sw-characters/sw-characters.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sw-movies',
  templateUrl: './sw-movies.component.html',
  styleUrls: ['./sw-movies.component.scss'],
  animations: [
    trigger('slideUpDown', [
      state('in', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate('300ms', style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: 0 }),
        animate('300ms', style({ height: '*' }))
      ]),
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SwMoviesComponent implements OnInit {
  movies: SwMovie[];
  selectedMovie: SwMovie;
  errorMessage: string;
  selected = false;
  loading: boolean;
  constructor(
    private movieService: SwMoviesService,
  ) {
    this.movieService.movies$.subscribe(m => {
      setTimeout(() => {
        this.movies = m;
        this.sortMovies(this.movies);
        console.log(this.movies);
      }, 100);
    });
    this.movieService.selectedMovie$.subscribe(s => { this.selected = s ? true : false; this.selectedMovie = s })
    this.movieService.error$.subscribe(err => this.errorMessage = err);
    this.movieService.loader$.subscribe(l => {
      this.loading = l;
      console.log(this.loading);
    });
  }

  ngOnInit(): void {
  }

  sortMovies(movies) {
    let sortedMovie;
    if (movies) {
      sortedMovie = movies.sort((a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    }
    return sortedMovie;
  }

}
