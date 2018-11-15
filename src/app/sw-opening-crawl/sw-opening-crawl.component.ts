import { Component, OnInit } from '@angular/core';
import { SwMoviesService } from '../sw-movies/sw-movies.service';
import { SwMovie } from '../sw-movies/sw-movies.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sw-opening-crawl',
  templateUrl: './sw-opening-crawl.component.html',
  styleUrls: ['./sw-opening-crawl.component.scss'],
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
export class SwOpeningCrawlComponent implements OnInit {
  movie: SwMovie;
  loading: boolean;

  constructor(private movieService: SwMoviesService) { 
    this.loading = true;
    this.movieService.selectedMovie$.subscribe(
      (c: SwMovie) => {
        setTimeout(() => {
          this.movie = c? c: null;
          if (this.movie) {
            this.loading = false;
          }
        }, 1000);        
      });
  }

  ngOnInit() {
  }

}
