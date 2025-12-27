import {
  Component,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import { QRCodeComponent } from 'angularx-qrcode';
import {
  GetBrightnessReturnValue,
  ScreenBrightness,
} from '@capacitor-community/screen-brightness';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { state } from '@angular/animations';
import { plugins } from './plugins';
import { FilterCouponCategoryPipe } from 'src/app/pipes/filter-coupon-category-pipe';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [plugins, QRCodeComponent, FilterCouponCategoryPipe],
})
export class Tab2Page {
  private couponService = inject(CouponService);
  private platform = inject(Platform);

  private currentBrightness = signal<any>({});
  // Estado reactivo con signal
  private coupons = signal<any[]>([]);
  isLoading = signal(false);

  // Derivado: cupones activos
  activeCoupons = computed(() =>
    this.coupons().filter((coupon) => coupon.active)
  );

  // Derivado: QR code (solo genera si hay cupones activos)
  QrCode = computed(() => {
    const active = this.activeCoupons();
    return active.length > 0 ? JSON.stringify(active) : '';
  });

  // Derivado: conteo de cupones activos
  activeCount = computed(() => this.activeCoupons().length);

  async ionViewWillEnter() {
    // Recarga cada vez que entras a la página (sincronización en tiempo real)
    await this.loadCoupons();

    if (!this.platform.is('desktop')) {
      // Ajusta el brillo de la pantalla solo en dispositivos móviles
      try {
        const brightness = await ScreenBrightness.getBrightness();
        this.currentBrightness.set(brightness);
        await this.setMaxBrightness();
        if (this.platform.is('ios') || this.platform.is('android')) {
          App.addListener('appStateChange', async (state) => {
            if (state.isActive) {
              await this.setMaxBrightness();
            } else {
              await this.restoreBrightness();
            }
          });
        }
      } catch (error) {
        console.error('Error setting brightness:', error);
      }
    }
  }

  private async loadCoupons() {
    this.isLoading.set(true);
    try {
      const allCoupons = await this.couponService.getCouponDiscount();
      this.coupons.set(allCoupons); // Actualiza el signal
    } catch (error) {
      console.error('Error loading coupons:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async setMaxBrightness() {
    if (!this.platform.is('desktop')) {
      try {
        await ScreenBrightness.setBrightness({ brightness: 1.0 });
      } catch (error) {
        console.error('Error setting max brightness:', error);
      }
    }
  }

  async restoreBrightness() {
    if (!this.platform.is('desktop')) {
      try {
        const original = this.currentBrightness();
        if (original && original.brightness !== undefined) {
          await ScreenBrightness.setBrightness({
            brightness: original.brightness,
          });
        }
      } catch (error) {
        console.error('Error restoring brightness:', error);
      }
    }
  }

  async ionViewWillLeave() {
    if (!this.platform.is('desktop')) {
      // Restaura el brillo original al salir de la página
      await this.restoreBrightness();
      App.removeAllListeners();
    }
  }
}
