import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.sass'],
})
export class FaqItemComponent implements OnInit {
  @Input() answer = new FormControl('');
  @Input() answerEnglish = new FormControl('');
  @Input() question = new FormControl('');
  @Input() questionEnglish = new FormControl('');
  faqTitles: any;
  profileTitles: any;
  constructor(private sharedService: SharedService) {
    this.sharedService.faqTitles.subscribe(titles => {
      this.faqTitles = titles;
    });
    this.sharedService.profileTranslatorTitles.subscribe(titles => {
      this.profileTitles = titles;
    });
  }

  ngOnInit(): void {}
}
