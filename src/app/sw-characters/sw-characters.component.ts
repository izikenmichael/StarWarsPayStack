import { Component, OnInit, ViewChild } from '@angular/core';
import { SwCharactersService } from './sw-characters.service';
import { SwCharacter } from './sw-characters.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sw-characters',
  templateUrl: './sw-characters.component.html',
  styleUrls: ['./sw-characters.component.scss'],
  animations: [
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
export class SwCharactersComponent implements OnInit {
  // displayedColumns = ['name', 'email', 'phone', 'company']
  displayedColumns: string[] = ['char_id', 'name', 'gender', 'height'];
  characters: SwCharacter[];
  dataSource: any;
  filterValue: string;
  errorMessage: string;
  loading: boolean;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private charService: SwCharactersService,
  ) {
    this.charService.characters$.subscribe(char => {
      setTimeout(() => {
        this.characters = char;
        this.dataSource = new MatTableDataSource(this.characters);
        this.dataSource.sort = this.sort;
      }, 100);

    });
    this.charService.error$.subscribe(err => this.errorMessage = err)
    this.charService.loader$.subscribe(l => this.loading = l)
  }

  ngOnInit() {
  }

  toTop() {
    let top = !this.characters? 0:80;
    let height = !this.characters? 450:370;
    return {'top.px': top, 'height.px': height }
  }

  // ** Filters array list based on gender string provided 
  //**  *this method is called on click of any gender button, 
  //**  *if filter string is empty it return the original array list
  filterGender(filterValue: string) {
    this.filterValue = filterValue;
    const filteredResult: SwCharacter[] = filterValue ?
      this.characters.filter(char => char.gender === filterValue.toLowerCase()) :
      this.characters;
    this.dataSource = new MatTableDataSource(filteredResult);
    this.dataSource.sort = this.sort;
    console.log(filteredResult);
  }

  //** Get total hieghts of characters in the array
  //** Method is called in the footer view */
  getTotalHeights() {
    if (this.characters) {
      let totalMeters = this.dataSource.data.map(t => t.height).reduce((total, n) => total + n, 0);
      let totalCentimeters = totalMeters * 100;
      let totalInches = totalMeters * 39.37;
      let remainingInches = (totalInches % 12).toFixed(2);
      let totalFts = Math.floor(totalInches / 12);
      return `${totalCentimeters} cm (${totalFts}ft/${remainingInches}in)`;
    }
  }
}