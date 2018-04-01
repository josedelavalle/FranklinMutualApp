import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  audio = new Audio();
  public message: string = '';

  constructor(public snackBar: MatSnackBar) { }  

  ngOnInit() {
    this.audio.src = "/assets/franklin.mp3";
    this.audio.load();

    this.message = `Welcome to this Angular 5 sample application, with supporting back-end (Data Collator and API - .NET Core 2 / SQL Server).  
      It was created by Jose DeLavalle in the hopes of gaining employment with Franklin Mutual Insurance.
      This app is simply a demonstration of ability, desire and initiative and not representative of FMI or any of its affiliates.
      The red circle defaults to your current location, if you are in New Jersey, and Trenton otherwise.
      It can be moved and expanded or contracted to narrow down agencies within its area.  
      Dynamic charts of agencies broken down by county are provided as well as a single filtering mechanism to narrow results down by various fields.`

    setTimeout(() => this.openSnackBar());
  }

  playAudio() {
    this.audio.play();
  }

  openSnackBar() {
    this.snackBar.open(this.message, "Close", {
      duration: 30000,
    });
  }
}
