/* Confirmed blog/article data — all verified from live profile pages.
   Only posts with 1 000+ views are included, sorted by view count descending. */

export const blogPosts = [
  // ── Hackster.io ───────────────────────────────────────────────────────
  {
    id: 'hc05-smartphone',
    title: 'Sending Data to Smart Phone Using HC-05 Bluetooth Module',
    blurb:
      'Send live sensor readings from an Arduino to your smartphone over Bluetooth using the HC-05 module — no cloud, no Wi-Fi, just simple serial wireless communication.',
    tags: ['Arduino', 'Bluetooth', 'HC-05', 'Smartphone'],
    thumbnail: '/assets/blog/hc05-smartphone.jpg',
    readMoreUrl: 'https://www.hackster.io/Uniostar/sending-data-to-smart-phone-using-hc-05-bluetooth-module-53ad70',
    source: 'Hackster.io',
  },
  // ── Arduino Project Hub ───────────────────────────────────────────────
  {
    id: 'esp32-gps-phone',
    title: 'Send GPS Data to Your Phone with ESP32 + Neo-6M GPS Module',
    blurb:
      'Stream live GPS coordinates from a Neo-6M module straight to your smartphone over Wi-Fi using an ESP32 — no cloud service required.',
    tags: ['ESP32', 'GPS', 'Neo-6M', 'Wi-Fi', 'IoT'],
    thumbnail: '/assets/blog/esp32-gps-phone.jpg',
    readMoreUrl: 'https://projecthub.arduino.cc/uniostar/send-gps-data-to-your-phone-w-esp32-neo-6m-gps-module-2d02d1',
    source: 'Arduino Project Hub',
  },
  {
    id: 'arduino-neo6m-gps',
    title: 'Arduino with Neo-6M GPS Sensor',
    blurb:
      'A complete walkthrough for parsing NMEA sentences from a Neo-6M GPS module with an Arduino — from wiring to displaying live coordinates on an OLED.',
    tags: ['Arduino', 'GPS', 'Neo-6M', 'OLED', 'NMEA'],
    thumbnail: '/assets/blog/arduino-neo6m.jpg',
    readMoreUrl: 'https://projecthub.arduino.cc/uniostar/arduino-with-neo6m-gps-sensor-647800',
    source: 'Arduino Project Hub',
  },
  {
    id: 'rc-controller-8ch',
    title: 'Arduino 8+ Channel RC Controller with Expo & Trim (Range 5km+)',
    blurb:
      'Building a full-featured RC transmitter from scratch on Arduino — exponential response curves, trim adjustment, and a 5km+ range transceiver module.',
    tags: ['Arduino', 'RC', 'RF', 'Transmitter', 'nRF24'],
    thumbnail: '/assets/blog/rc-controller.jpg',
    readMoreUrl: 'https://projecthub.arduino.cc/uniostar/arduino-8-channel-rc-controller-with-expo-trim-range-5km-5afe71',
    source: 'Arduino Project Hub',
  },
  // ── Arduino Project Hub ───────────────────────────────────────────────
  {
    id: 'hc05-oled-display',
    title: 'HC-05 Bluetooth Module with Arduino Using OLED Display',
    blurb:
      'Pair an HC-05 Bluetooth module with a 0.96" OLED to build a wireless sensor display — send data from your phone straight to the screen.',
    tags: ['Arduino', 'Bluetooth', 'HC-05', 'OLED', 'SSD1306'],
    thumbnail: '/assets/blog/hc05-oled.jpg',
    readMoreUrl: 'https://projecthub.arduino.cc/uniostar/hc-05-bluetooth-module-with-arduino-using-oled-display-86173b',
    source: 'Arduino Project Hub',
  },
  {
    id: 'bmp280-altimeter-logger',
    title: 'Adafruit BMP280 + Micro SD Card Reader for Altimeter Data Logger',
    blurb:
      'Log continuous pressure and altitude data from a BMP280 sensor to a micro-SD card — ideal for rocketry flight computers and weather balloon payloads.',
    tags: ['Arduino', 'BMP280', 'SD Card', 'Altimeter', 'Data Logging'],
    thumbnail: '/assets/blog/bmp280-logger.jpg',
    readMoreUrl: 'https://projecthub.arduino.cc/uniostar/adafruit-bmp280-micro-sd-card-reader-for-altimeter-data-logger-fea241',
    source: 'Arduino Project Hub',
  },
];
