import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HeaderComponent} from "./header/header.component";
import {PostListComponent} from "./posts/post-list/post-list.component";
import {MatExpansionModule} from "@angular/material/expansion";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {PostCreateComponent} from "./posts/post-create/post-create.component";
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PostService} from "./posts/post.service";
import {AppRoutingModule} from "./app-routing.module";
import {MainpageComponent} from "./mainpage/mainpage.component";



@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    MainpageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule

  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
