# 📱 Coupons App Ionic

<div align="center">
  <img src="resource/icon-only.png" alt="Coupons App Logo" width="200"/>
  
  Una aplicación móvil moderna para gestionar cupones de descuento y generar códigos QR
</div>

## 📋 Descripción

Coupons App es una aplicación móvil desarrollada con Ionic Framework y Angular que permite a los usuarios gestionar cupones de descuento para diferentes productos. Los usuarios pueden activar/desactivar cupones y generar códigos QR con los cupones activos para su uso en tiendas.

## ✨ Características

- 🎫 **Gestión de Cupones**: Visualiza y gestiona cupones de descuento para productos de diferentes categorías
- 🔄 **Activación/Desactivación**: Activa o desactiva cupones con un simple toque
- 📊 **Categorías**: Organización por categorías (bebidas, dulces, carnes)
- 📱 **Códigos QR**: Genera códigos QR automáticamente con los cupones activos
- 💾 **Persistencia de Datos**: Guarda el estado de los cupones usando Capacitor Preferences
- 🎨 **Interfaz Moderna**: Diseño intuitivo con Ionic y Tailwind CSS
- 📲 **Multiplataforma**: Compatible con iOS, Android y Web

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Ionic Framework](https://ionicframework.com/) v8.0.0
- **Frontend**: [Angular](https://angular.io/) v20.0.0
- **Capacitor**: v8.0.0 (para funcionalidades nativas)
- **Estilos**: Tailwind CSS v4.1.18
- **QR Code**: angularx-qrcode v20.0.0
- **Lenguaje**: TypeScript v5.9.0

## 📦 Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Ionic CLI: `npm install -g @ionic/cli`
- (Opcional) Android Studio para desarrollo Android
- (Opcional) Xcode para desarrollo iOS

### Pasos de Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/dmarmijosa/04-coupons-app-ionic.git
cd 04-coupons-app-ionic
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta la aplicación en el navegador:
```bash
npm start
# o
ionic serve
```

4. (Opcional) Ejecuta en dispositivos móviles:
```bash
# Android
ionic capacitor run android

# iOS
ionic capacitor run ios
```

## 🚀 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas unitarias
- `npm run lint` - Ejecuta el linter para verificar el código
- `npm run generate-icons-android` - Genera iconos para Android
- `npm run generate-icons-ios` - Genera iconos para iOS
- `npm run generate-icons-pwa` - Genera iconos para PWA

## 📱 Uso

### Tab 1: Cupones Disponibles
- Visualiza todos los cupones de descuento disponibles
- Filtra por categorías (Todos, Bebidas, Dulces, Carnes)
- Activa/desactiva cupones tocando la tarjeta del cupón
- Cada cupón muestra:
  - Imagen del producto
  - Nombre del producto
  - Porcentaje de descuento
  - Estado (activo/inactivo)

### Tab 2: Generar QR
- Visualiza los cupones activos
- Genera automáticamente un código QR con la información de todos los cupones activos
- El código QR puede ser escaneado en tiendas para aplicar los descuentos

## 📂 Estructura del Proyecto

```
04-coupons-app-ionic/
├── src/
│   ├── app/
│   │   ├── models/           # Modelos de datos
│   │   │   └── coupon.model.ts
│   │   ├── pages/            # Páginas de la aplicación
│   │   │   ├── tab1/         # Gestión de cupones
│   │   │   ├── tab2/         # Generación de QR
│   │   │   └── tabs/         # Navegación por tabs
│   │   ├── pipes/            # Pipes personalizados
│   │   └── services/         # Servicios
│   │       └── coupon.service.ts
│   ├── assets/
│   │   ├── data/             # Datos JSON
│   │   │   └── coupons.json
│   │   ├── img/              # Imágenes de productos
│   │   └── icon/             # Iconos
│   └── environments/         # Configuraciones de entorno
├── resource/                 # Recursos de la app (iconos, splash)
└── capacitor.config.ts       # Configuración de Capacitor
```

## 📊 Modelo de Datos

Los cupones siguen esta estructura:

```typescript
interface CouponData {
  idProduct: string;
  img: string;
  name: string;
  category: string;  // 'drinks', 'candies', 'meats'
  discount: number;  // Porcentaje de descuento
  active?: boolean;  // Estado del cupón
}
```

## 🔧 Configuración

La aplicación está configurada para usar:
- **App ID**: `io.ionic.starter`
- **App Name**: `04-coupons-app`
- **Storage**: Capacitor Preferences para persistencia local

## 👨‍💻 Desarrollo

Para contribuir al proyecto:

1. Crea un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto fue creado con Ionic Framework.

## 👤 Autor

**Ionic Framework**

---

<div align="center">
  Hecho con ❤️ usando Ionic Framework
</div>
