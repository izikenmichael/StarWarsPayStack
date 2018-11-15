import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SwCharacter } from './sw-characters.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilitiesService } from '../_utilities/utilities.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwCharactersService {
  private base_URL = environment.BASE_URL;
  characters: SwCharacter[];
  loading: boolean;

  // Observable sources: Star Wars Characters Array
  public charactersSource = new BehaviorSubject<SwCharacter[]>(null);
  characters$ = this.charactersSource.asObservable();

  // Observable sources: Error
  private errorSource = new BehaviorSubject<string>(null);
  error$ = this.errorSource.asObservable();

  // Observable sources: Loader
  private loaderSource = new BehaviorSubject<boolean>(false);
  loader$ = this.loaderSource.asObservable();

  constructor(
    private http: HttpClient,
    private util: UtilitiesService
  ) { }

  async processEachCharacter(characterPaths: SwCharacter[]) {
    this.updateCharacters(null);
    this.updateLoader(true);
    // Empty character array 
    this.characters = [];
    let index = 0;
    // Loop through the character url from API request
    for (const path of characterPaths) {
      index++;
      // call method that gets character data using path
      this.getCharactersData(path, characterPaths.length, index);
    }
    console.log(this.characters);
  }

  getCharactersData(path, l, i) {
    this.getCharacters(path).subscribe(
      res => {
        this.extractCharacterData(res, l, i)
        this.updateError(null);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.updateError(err);
        this.updateLoader(false);
        this.updateCharacters(null);
      }
    );
  }

  getCharacters(path): Observable<any> {
    return this.http.get<Response>(path).pipe(
      retry(3),
      catchError(this.util.handleError)
    );
  }

  extractCharacterData(result: any, l, i) {
    let characterData: any = {};
    let icon: string = '';
    switch (result.gender) {
      case 'male': icon = 'M'
        break;
      case 'female': icon = 'F'
        break;
      case 'hermaphrodite': icon = 'H'
        break;
      default: icon = 'n/a'
        break;
    }
    if (result.height === 'unknown') {
      result.height = '0';
    }
    characterData = new SwCharacter(i, result.url, result.name, result.gender, Number(result.height), icon);

    // Add each character object to the character array
    this.characters.push(characterData);
    if (this.characters.length === l) {
      console.log(this.characters);
      this.updateCharacters(this.characters);
      this.updateLoader(false);
      this.updateError(null);
    }
  }

  updateCharacters(characters: SwCharacter[]) {
    this.charactersSource.next(characters);
  }

  updateError(message) {
    this.errorSource.next(message);
    console.log(message);
  }

  updateLoader(state) {
    this.loaderSource.next(state);
  }

}