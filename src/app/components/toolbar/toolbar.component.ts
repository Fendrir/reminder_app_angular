import { Component, OnInit, ViewEncapsulation, Renderer2, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {

  @Input() sidenav: any;

  isSearch: boolean;
  isLoggedIn: boolean;

  searchText: string;

  constructor(private renderer2: Renderer2, private dataService: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.isSearch = false;

    // subscribing on changes of search text
    this.dataService.currentSearch.subscribe(message => this.searchText = message);

    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  // set focus on "search" input
  searchFieldOnFocus() {
    let onElement = this.renderer2.selectRootElement('#searchFieldFocus');
    onElement.focus();
  }

  // for listening event of "keyup"
  typeSearchText(event: any) {
    this.searchText = event.target.value;

    this.dataService.changeSearchText(this.searchText);
  }
}
