import { Component, OnInit, ViewEncapsulation, Renderer2 } from '@angular/core';
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {

  isSearch: boolean;
  
  searchText: string;

  constructor(private renderer2: Renderer2, private dataService: DataService) { }

  ngOnInit() {
    this.isSearch = false;

    //subscribing on changes of search text
    this.dataService.currentSearch.subscribe(message => this.searchText = message);
  }

  //set focus on "search" input
  searchFieldOnFocus() {
    let onElement = this.renderer2.selectRootElement('#searchFieldFocus');
    onElement.focus();
  }

  //for listening event of "keyup"
  typeSearchText(event: any) {
    this.searchText = event.target.value;

    this.dataService.changeSearchText(this.searchText);
  }
}
