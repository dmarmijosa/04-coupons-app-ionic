import { Injectable } from '@angular/core';
import { CouponData } from '../models/coupon.model';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  getCouponDiscount(): Promise<CouponData[]> {
    return fetch('./assets/data/coupons.json')
      .then(async (res) => {
        const couponsData: CouponData[] = await res.json();
        couponsData;
        couponsData.forEach((coupon) => (coupon.active = false));
        return couponsData;
      })
      .catch((error) => {
        console.error('Error fetching coupon data:', error);
        return [];
      });
  }
}
