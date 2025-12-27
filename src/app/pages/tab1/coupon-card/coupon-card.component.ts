import { Component, input, OnInit, output } from '@angular/core';
import {
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonBadge,
} from '@ionic/angular/standalone';
import { CouponData } from 'src/app/models/coupon.model';

@Component({
  selector: 'app-coupon-card',
  templateUrl: './coupon-card.component.html',
  styleUrls: ['./coupon-card.component.scss'],
  imports: [IonImg, IonCard, IonCardHeader, IonCardTitle, IonBadge],
})
export class CouponCardComponent implements OnInit {
  coupon = input<CouponData>();
  couponClicked = output<any>();
  constructor() {}

  ngOnInit() {}
  onCardClick() {
    this.couponClicked.emit(this.coupon());
  }
}
