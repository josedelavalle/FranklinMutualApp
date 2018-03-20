import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  audio = new Audio();

  constructor() { }

  ngOnInit() {
    this.audio.src = "/assets/franklin.mp3";
    this.audio.load();
  }

  playAudio() {
    this.audio.play();
  }
}
