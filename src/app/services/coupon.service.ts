import { Injectable } from '@angular/core';
import { CouponData } from '../models/coupon.model';
import { Preferences } from '@capacitor/preferences';
@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private readonly storageKey = 'coupons';
  async getCouponDiscount(): Promise<CouponData[]> {
    // 1) Intenta cargar lo que ya estaba guardado
    const savedCoupons = await this.getSavedCoupons();
    if (savedCoupons.length) {
      return savedCoupons;
    }

    // 2) Si no hay nada guardado, trae del JSON y marca active solo una vez
    try {
      const res = await fetch('./assets/data/coupons.json');
      const couponsData: CouponData[] = await res.json();
      couponsData.forEach((coupon) => (coupon.active = coupon.active ?? false));
      return couponsData;
    } catch (error) {
      console.error('Error fetching coupon data:', error);
      return [];
    }
  }

  async saveCoupons(coupons: CouponData[]): Promise<void> {
    const couponsData: CouponData[] = coupons.map((coupon) => ({ ...coupon }));
    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify(couponsData),
    });
  }

  private async getSavedCoupons(): Promise<CouponData[]> {
    const { value } = await Preferences.get({ key: this.storageKey });
    return value ? (JSON.parse(value) as CouponData[]) : [];
  }
}
