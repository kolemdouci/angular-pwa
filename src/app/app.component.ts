import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Item, ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'firstpwa';
  items: Array<Item>;
  isChecked = true;
  constructor(private viewContainerRef: ViewContainerRef, private cfr: ComponentFactoryResolver, private apiService: ApiService) {}

    async getLazy1() {
      this.viewContainerRef.clear();
      const { Lazy1Component } = await import('./lazy1.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(Lazy1Component)
      );
    }

    async getLazy2() {
      this.viewContainerRef.clear();
      const { Lazy2Component } = await import('./lazy2.component');
      this.viewContainerRef.createComponent(
        this.cfr.resolveComponentFactory(Lazy2Component)
      );
    }
    ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.apiService.fetch().subscribe(
      (data: Array<Item>) => {
         console.log(data);
         this.items = data;
      }, (err) => {
        console.log(err);
      }
    );
  }
}



