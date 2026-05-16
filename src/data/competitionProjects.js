/* Competition & major project entries.
   External links open in new tab; projects without links expand inline.
   thumbnail: path under /assets/competition/ — shows gradient placeholder if missing. */

export const competitionProjects = [
  {
    id: 'project-sunflower',
    title: 'Project Sunflower',
    tagline: 'Smart solar-tracking plant health monitor — hackathon submission',
    description: `Project Sunflower is a solar-powered IoT platform designed to maximize photosynthetic efficiency for urban agriculture. The system uses a dual-axis stepper mechanism to orient a sensor array toward the sun, pairing real-time soil-moisture, light-intensity, and temperature data with a React dashboard.

Built during a 24-hour hackathon, the firmware runs on an ESP32 and streams readings over MQTT to a Node.js broker. A trained regression model predicts optimal watering intervals, reducing water usage by an estimated 30 % in test trials. The enclosure was designed in Fusion 360 and 3D-printed on-site.`,
    techStack: ['ESP32', 'C/C++', 'Python', 'Servo Control', 'PID'],
    tags: ['Solar', 'Hackathon', 'Django', 'Embedded'],
    externalLink: 'https://devpost.com/software/project-sunflower-a4vum9',
    externalLabel: 'View on Devpost',
    hasExternalPage: true,
    color: 'cyan',
    year: '2025',
    thumbnail: '/assets/competition/project-sunflower.jpg',
  },
  {
    id: 'doom-mini',
    title: 'Doom Mini',
    tagline: 'MSPM0G3507-based first-person shooter — ECE319k competition',
    description: `• DDA raycasting on an MSPM0G3507 (ARM Cortex-M4, 32 KB SRAM) renders a pseudo-3D world onto a 128×160 SPI TFTLCD at a stable 7 fps with fixed-point arithmetic & hardware overclock.

• Enemy AI uses a finite-state machine with patrol, chase, and line-of-sight attack states; a custom DAC audio driver plays sampled sound effects from SD card synced to gameplay events.

• 12-bit ADC reads an analog joystick for movement — placed in the top tier of the UT Austin ECE319k class competition.`,
    techStack: ['C/C++', 'MSPM0G3507', 'ARM Cortex-M4', 'SPI', 'DAC', 'ADC', 'DDA Raycasting', 'Hardware Acceleration'],
    tags: ['Embedded', 'Game Dev', 'Competition', 'Real-time'],
    hasExternalPage: false,
    color: 'purple',
    year: '2026',
    thumbnail: '/assets/competition/doom-mini.jpg',
  },
  {
    id: 'sigma',
    title: 'S.I.G.M.A',
    tagline: 'An offline-first hiking safety system that keeps people alive where cell service can\'t',
    description: ``,
    techStack: ['React', 'HTML/CSS', 'C++', 'Arduino', 'ESP32'],
    tags: ['IoT', 'GPS/Radio', 'Sensor Fusion', 'Open Source'],
    externalLink: 'https://github.com/AthM23/S.I.G.M.A',
    externalLabel: 'View on GitHub',
    hasExternalPage: true,
    color: 'green',
    year: '2026',
    thumbnail: '/assets/competition/sigma.jpg',
  },
];
