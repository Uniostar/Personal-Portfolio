/* Competition & major project entries.
   External links open in new tab; projects without links expand inline.
   thumbnail: path under /assets/competition/ — shows gradient placeholder if missing. */

export const competitionProjects = [
  {
    id: 'project-sunflower',
    title: 'Project Sunflower',
    tagline: 'Smart solar-tracking plant health monitor — hackathon submission',
    description: `• Single-axis servo mechanism orients solar array toward the sun using PID control & inputs from light-sensitive photoresistors.\n\n• Website created in HTML/CSS/Django raises investor awareness for improved solar architecture installments in sub-urban areas through business tactics.

• Developed during a 24-hour hackathon - placed 2nd overall, best hardware & best design.`,
    techStack: ['ESP32', 'C/C++', 'Django', 'Python', 'Solar'],
    tags: ['PID', 'Hackathon', 'Servo Control', 'Embedded'],
    externalLink: 'https://devpost.com/software/project-sunflower-a4vum9',
    externalLabel: 'View on Devpost',
    hasExternalPage: false,
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
    techStack: ['C/C++', 'MSPM0G3507', 'ARM Cortex-M4', 'DDA Raycasting', 'Hardware Acceleration'],
    tags: ['Embedded', 'Game Dev Competition', 'Real-time'],
    hasExternalPage: false,
    color: 'purple',
    year: '2026',
    thumbnail: '/assets/competition/doom-mini.jpg',
  },
  {
    id: 'sigma',
    title: 'S.I.G.M.A',
    tagline: 'An offline-first hiking safety system that keeps people alive where cell service can\'t',
    description: `• Wearable device connects to ground station with NRF24lo1+ mesh radio to relay GPS position and vitals to first responders with no cell service required — system stays live up to 1 km.

• Sensor fusion combines GPS, heart rate, and environmental data; SOS alert activates through repeated motion inputs to prevent false positive triggers & records last known position.

• Open-source hardware and software stack with a React dashboard communicating over MQTT to ground stations deployed in field.`,
    techStack: ['React', 'HTML/CSS', 'C++', 'Arduino', 'ESP32'],
    tags: ['IoT', 'GPS/Radio', 'Sensor Fusion', 'Open Source'],
    externalLink: 'https://github.com/AthM23/S.I.G.M.A',
    externalLabel: 'View on GitHub',
    hasExternalPage: false,
    color: 'green',
    year: '2026',
    thumbnail: '/assets/competition/sigma.jpg',
  },
];
