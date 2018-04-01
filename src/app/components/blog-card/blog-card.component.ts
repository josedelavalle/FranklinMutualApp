import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml, SafeUrl, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
  @Input() blog: any;
  public image: SafeStyle;
  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.image = this.sanitizer.bypassSecurityTrustStyle(`url(${this.blog.image})`);
  }

}
