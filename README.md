## WeatherApp
Challange JCC partnership membuat aplikasi ramalan cuaca, dengan menggunakan API dari [OpenWeather.org](https://openweathermap.org/api).

[Demo Video](https://drive.google.com/file/d/1s23wN_cchewENbgErGqZBGI1lFBXoJ0h/view?usp=sharing)

## Aplikasi
[Download](https://drive.google.com/file/d/1YODEeIyclFMJ3wOb5CWgGTDCikXETTEJ/view?usp=sharing)

## Build App
Sebelum build up, silakan install dulu dependencies yang dibutuhkan dengan mengetikan perintah `npm install` atau `yarn install` sesuai dengan package manager yang digunakan.

### Metode 1 (Akun Expo)
```bash
expo build:android -t apk
```

### Metode 2
```bash
expo eject
cd android
./gradlew assembleRelease
```
