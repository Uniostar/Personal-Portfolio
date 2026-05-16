/* Hardcoded photo captions for each PCB card's slideshow.
   Key = slug matching the folder name in public/pcb-data/.
   Each entry has 4 photo captions (photo-1 through photo-4) and a schematic caption. */

export const pcbPhotoData = {
  'arduino-nano-rc-receiver': {
    photos: [
      'Assembled Arduino Nano RC receiver with E01-ML01DP5 module soldered and antenna mounted',
      'KiCad PCB layout — differential pair RF routing with controlled 50 Ω impedance trace',
      '3D render — front: Nano header, RF module footprint, and SMA connector placement',
      '3D render — back: ground plane pours and decoupling cap placement',
    ],
    schematic: 'Full schematic: Nano I/O, nRF24 SPI lines, power regulation, and LED indicators',
  },
  'esp32-cam-flight-camera': {
    photos: [
      'Fabricated flight camera board with ESP32-CAM, IMU, and pressure sensor populated',
      'PCB layout showing camera module cutout, BMP388 footprint, and SD card routing',
      '3D render — front: camera header, IMU, and JST battery connector',
      '3D render — back: USB-C charging circuit and SD card slot',
    ],
    schematic: 'Full schematic: ESP32-CAM power tree, ICM-42688 SPI, BMP388 I²C, and SD card SPI bus',
  },
  'non-inverting-amplifier': {
    photos: [
      'Assembled TLV2372 non-inverting amplifier board with BNC input/output connectors',
      'KiCad layout — star-ground topology with short signal traces and large bypass caps',
      '3D render — front: op-amp, gain resistors, and BNC footprints',
      '3D render — back: solid ground pour with via stitching',
    ],
    schematic: 'Full schematic: TLV2372 dual op-amp in non-inverting configuration with adjustable gain network',
  },
  'switching-buck-converter': {
    photos: [
      'Fabricated buck converter board: TPS2832 driver, dual CSD18534KCS MOSFETs, and output choke',
      'PCB layout — wide power traces, thermal reliefs, and current-sense resistor placement',
      '3D render — front: MOSFETs on heatsink pads, bootstrap capacitor network',
      '3D render — back: bottom-side copper pours for thermal dissipation',
    ],
    schematic: 'Full schematic: TPS2832 gate driver, MOSFET bridge, LC output filter, and TLV2372 feedback compensation',
  },
  'esp32-s3-breakout': {
    photos: [
      '3D render — front: ESP32-S3 module, USB-C, and 40-pin header row',
      '3D render — back: decoupling capacitor array and exposed castellated pads',
      'PCB layout — RF keep-out zone, USB differential pair, and GPIO breakout headers',
    ],
    schematic: 'Full schematic: ESP32-S3 power tree (3.3 V LDO, LiPo charger), USB 2.0 FS, and GPIO breakout',
  },
  'esp32-s3-flight-breakout': {
    photos: [
      '3D render — front: ESP32-S3 module, IMU, barometer, and 5 V boost converter',
      '3D render — back: SD card slot, ground pour, and antenna keep-out',
      'PCB layout — IMU placement near center of mass, SPI bus routing, and USB-C port',
    ],
    schematic: 'Full schematic: ESP32-S3, ICM-42688-P SPI, BMP388 I²C, SD card SPI, and 5 V → 3.3 V regulation',
  },
  'tps6302x-buck-boost': {
    photos: [
      '3D render — front: TPS63021 IC, inductor, and output capacitors',
      '3D render — back: input/output header and feedback resistor divider',
      'PCB layout — inductor and capacitor placement optimized for minimal switching noise',
    ],
    schematic: 'Full schematic: TPS63021 buck-boost with adjustable output, soft-start, and enable control',
  },
  'mpu6050-9dof': {
    photos: [
      '3D render — front: MPU6050, LIS3MDL, and Qwiic I²C connector',
      '3D render — back: level-shifter ICs for 5 V/3.3 V compatibility',
      'PCB layout — I²C address selection jumpers and decoupling cap placement',
    ],
    schematic: 'Full schematic: MPU6050 and LIS3MDL on shared I²C bus with interrupt routing and power filtering',
  },
  'bme280-breakout': {
    photos: [
      '3D render — front: BME280 LGA package with solderable pads',
      '3D render — back: via-in-pad thermal connection and selection jumper bridge',
      'PCB layout — minimal bypass cap count, LDO regulator, and SPI/I²C selection header',
    ],
    schematic: 'Full schematic: BME280 with SPI/I²C interface selection, decoupling, and 3.3 V regulation',
  },
  'lm2596-step-up': {
    photos: [
      '3D render — front: LM2596, catch diode, and adjustable feedback divider',
      '3D render — back: input/output capacitor bank and copper ground plane',
      'PCB layout — Schottky diode placement, inductor on copper pour island, and output filter',
    ],
    schematic: 'Full schematic: LM2596-ADJ in boost topology with output voltage setting resistors and voltage/current indicators',
  },
};
