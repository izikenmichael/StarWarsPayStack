import { Component, OnInit } from "@angular/core";
import { SwMoviesService } from "./sw-movies/sw-movies.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "starWarsLocal";

  constructor(private moviesService: SwMoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMoviesData();
  }
}
