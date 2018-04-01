import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { AgentDataService } from './services/agent-data.service';
import { BlogDataService } from './services/blog-data.service';
import { UserDataService } from './services/user-data.service';
import { AgentListComponent } from './components/agent-list/agent-list.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { MaterialModule } from './material.module';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { GridComponent } from './components/grid/grid.component'
import { AgmHeatmapModule } from 'agm-heatmap/agm-heatmap.module';
import { AgentCardComponent } from './components/agent-card/agent-card.component';
import { ChartComponent } from './components/chart/chart.component';
import { FilterComponent } from './components/filter/filter.component';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { OrderModule } from 'ngx-order-pipe';

declare var google: any;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    AgentListComponent,
    GridComponent,
    AgentCardComponent,
    ChartComponent,
    FilterComponent,
    BlogCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    Ng2GoogleChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFzBg6EWivP2e2GR0DmXdosJKqJylV9AQ',
      libraries: ['visualization']
    }),
    AgmDirectionModule,
    AgmHeatmapModule,
    FlexLayoutModule,
    Angular2FontawesomeModule,
    NgHttpLoaderModule,
    OrderModule
  ],
  providers: [AgentDataService, UserDataService, BlogDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
