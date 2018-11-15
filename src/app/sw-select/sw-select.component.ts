import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SwMovie } from '../sw-movies/sw-movies.model';
import { SwMoviesService } from '../sw-movies/sw-movies.service';
import { SwCharactersService } from '../sw-characters/sw-characters.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sw-select',
  templateUrl: './sw-select.component.html',
  styleUrls: ['./sw-select.component.scss'],
  animations: [
    trigger('slideUpDown', [
      state('in', style({height: '*'})),
      transition('* => void', [
        style({height: '*'}),
        animate('300ms', style({height: 0}))
      ]),
      transition('void => *', [
        style({height: 0}),
        animate('300ms', style({height: '*'}))
      ]),
    ])
  ]
})
export class SwSelectComponent implements OnInit {
  movieListControl = new FormControl();
  moviesList: SwMovie[];
  filteredList: Observable<SwMovie[]>;
  @Output() isSelected = new EventEmitter<boolean>();

  constructor(
    private movieService: SwMoviesService,
    private charService: SwCharactersService
  ) {
    this.movieService.movies$.subscribe(m => {
      this.setFitleredList(m);
    }
    );
  }

  ngOnInit() {
  }

  setFitleredList(m) {
    this.moviesList = m;
    if (this.moviesList) {
      console.log(this.moviesList);
      this.filteredList = this.movieListControl.valueChanges
        .pipe(
          startWith(''),
          map(inputValue => (inputValue === '' ? this.moviesList.slice()
            : this.filterListWithUserInput(inputValue)).slice())
        );
    }
  }

  filterListWithUserInput(value: string): SwMovie[] {
    const filterValue = value ? value.toLowerCase() : '';
    return this.moviesList.filter(movie => movie.title.toLowerCase().indexOf(filterValue) > -1);
  }

  clearInput() {
    this.movieListControl.reset()
  }

  onSelect(movie) {
    this.isSelected.emit(true);
    this.movieService.updateSelectedMovie(null);
    this.charService.updateCharacters(null);
    console.log(movie);
    this.movieService.updateSelectedMovie(movie);
    this.charService.processEachCharacter(movie.characters);
    this.resetAnimation();
  }

  resetAnimation() {
    let crawDiv = document.getElementById('movingCrawl');
    if (crawDiv) {
      crawDiv.id = 'toBottom';
      setTimeout(() => {
        crawDiv.id = 'movingCrawl'
      }, 100);
    }
  }

}
