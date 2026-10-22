"use strict";
/* ---------------------------------------------------------------- data */
const H_PHRASES=[
 ["H226","Flammable liquid and vapour"],
 ["H302","Harmful if swallowed"],
 ["H304","May be fatal if swallowed and enters airways"],
 ["H315","Causes skin irritation"],
 ["H317","May cause an allergic skin reaction"],
 ["H318","Causes serious eye damage"],
 ["H319","Causes serious eye irritation"],
 ["H332","Harmful if inhaled"],
 ["H335","May cause respiratory irritation"],
 ["H336","May cause drowsiness or dizziness"],
 ["H400","Very toxic to aquatic life"],
 ["H410","Very toxic to aquatic life with long lasting effects"],
 ["H411","Toxic to aquatic life with long lasting effects"],
 ["H412","Harmful to aquatic life with long lasting effects"],
 ["H413","May cause long lasting harmful effects to aquatic life"]
];
const P_PHRASES=[
 ["P101","If medical advice is needed, have product container or label at hand"],
 ["P102","Keep out of reach of children"],
 ["P103","Read label before use"],
 ["P210","Keep away from heat, hot surfaces, sparks, open flames and other ignition sources. No smoking"],
 ["P261","Avoid breathing vapour or dust"],
 ["P264","Wash hands thoroughly after handling"],
 ["P271","Use only outdoors or in a well-ventilated area"],
 ["P272","Contaminated work clothing should not be allowed out of the workplace"],
 ["P273","Avoid release to the environment"],
 ["P280","Wear protective gloves/eye protection/face protection"],
 ["P301+P310","IF SWALLOWED: Immediately call a POISON CENTER/doctor"],
 ["P302+P352","IF ON SKIN: Wash with plenty of soap and water"],
 ["P305+P351+P338","IF IN EYES: Rinse cautiously with water for several minutes. Remove contact lenses, if present and easy to do. Continue rinsing"],
 ["P333+P313","If skin irritation or rash occurs: Get medical advice/attention"],
 ["P337+P313","If eye irritation persists: Get medical advice/attention"],
 ["P362+P364","Take off contaminated clothing and wash it before reuse"],
 ["P391","Collect spillage"],
 ["P501","Dispose of contents/container to approved disposal site, in accordance with local regulations"]
];
const PICTOS={
 GHS07:{cap:"Exclamation",vb:"0 0 5790 5790",sym:"<path d=\"m253 2897 2640 2640 2641-2640c-880-880-1760-1762-2640-2640L253 2897\" fill=\"#fff\"/><path d=\"m60 2897 2833 2833 2834-2834L2894 63 60 2897zm5218 0L2893 5280 510 2896 2894 512l2384 2384\" fill=\"red\"/><path d=\"M2892 1428h-20a475 475 0 0 0-301 121 229 229 0 0 0-64 113c-3 11-3 14-3 35s0 25 3 37c2 14 195 1314 197 1336a213 213 0 0 0 239 182 213 213 0 0 0 180-182c3-27 195-1324 198-1337 2-12 2-16 2-35 0-23 0-31-5-47a234 234 0 0 0-106-138 496 496 0 0 0-291-85h-30zm20 2011h-12a302 302 0 0 0-243 141 338 338 0 0 0-55 232 343 343 0 0 0 114 218 310 310 0 0 0 199 74 316 316 0 0 0 258-141 341 341 0 0 0 54-234 390 390 0 0 0-32-110 317 317 0 0 0-281-180\"/>"},
 GHS09:{cap:"Environment",vb:"0 0 735 735",sym:"<path d=\"m367.5 727.4l360-360-360-360-360 360z\" fill=\"#f00\"/> <path d=\"m367.5 670.3-302.8-302.8l302.8-302.8 302.8 302.8z\" fill=\"#fff\"/> <g stroke=\"#000\" stroke-width=\"5\"> <path d=\"m223.7 367.2h281.2\"/> <path stroke-width=\"4\" d=\"m462.7 418 32.98 23.79-31.36 15.1 42.2 3.79-11.36 15.1h23.3l.54 16.76-294.2-1.605s49.2-14.58 57.3-8.635c10.82-4.87 89.8-38.4 89.8-36.2m-75.72-25.98 1.62-85.4-42.72-23.2s-6.49-4.33-15.68-1.62c-3.25 1.08-7.57 2.16-7.57 2.16s23.3-19.47 27.58-17.84c4.33 1.62 34.61 16.22 34.61 16.22s-3.25-22.71-11.36-29.2-39.47-31.36-39.47-31.36v-5.95l42.72 25.96s1.62-24.87-7-39.47c-8.65-14.6-15.1-27.58-15.1-27.58l2.7-2.16 21.1 32.44 7-22.2 4.33-1.08s-5.41 31.36-1.62 41.1c3.79 9.73 17.84 62.73 17.84 62.73l21.1-30.3s.54-12.44-.54-21.1c-1.08-8.65-2.7-48.67-2.7-48.67h3.79l5.95 43.8 34.1-39.47v4.33s-33.51 42.2-31.89 51.4c1.62 9.19 3.24 14.6-2.7 27.58s-9.73 22.2-9.73 22.2 17.84-21.1 25.96-22.71c8.11-.54 18.91.54 26.48-5.95s25.96-27 25.96-27l-28.66 44.3s-13.51.54-18.91 6.49c-5.41 5.95-27.58 31.36-27.58 31.36v58.4l36.76 18.38-44.87 6.49-10.82 15.68-14.6-12.44-40.62 3.735z\"/> <path fill=\"#fff\" d=\"m355.2 445.1c10.29-4.29 27-11.36 36.76-25.42 10.1-14.54 45.96-75.7 95.2-70.8-2.7 6.49-11.36 20.55-11.36 20.55l35.1-10.82s.54 46.5-65.97 76.2c-30.82 10.82-37.3 11.36-40 15.1-2.7 3.79-15.1 22.71-15.1 22.71l-55.14-24.3s14.06-.515 20.51-3.215z\"/> </g> <ellipse cy=\"385.8\" cx=\"484.3\" rx=\"5.95\" ry=\"5.13\"/>"},
 GHS02:{cap:"Flame",vb:"0 0 579 579",sym:"<path d=\"m25 290 264 264 264-264L289 26 25 290z\" fill=\"#fff\"/><path d=\"M148 148 6 290l142 141 141 142 142-142 142-141-142-142L289 6 148 148zm261 22 119 120-119 119-120 119-119-119L51 290l119-120L289 51l120 119z\" fill=\"red\"/><path d=\"M290 121c-18 34 3 53-20 102-13-10-6-47-30-48 3 12 1 16 0 20-3 17-8 31 3 52-17-8-18-23-32-33 3 16-4 49 15 81-17-2-23-8-41-26 19 100 34 103 105 109-6-1-42-7-55-48 0-10-1 9 34 10-22-35-16-28-14-48 10 13 2 15 27 25-8-26 13-43 8-73 6 13 26 11 25 73 17-19 18-6 26-26 1 11 6 25-17 49 6 2 16 3 31-8-15 18-1 18-40 46 49 1 81-30 80-97-2 6-3 18-29 21 16-16 25-49 12-75-5 4-12 24-29 29 8-14 6-32 6-32s3-25-12-45c-4 30-4 46-23 50 3-17 4-26-6-46-10-21-22-42-24-62zm-81 274v18h171v-18H209z\"/>"},
 GHS05:{cap:"Corrosion",vb:"0 0 735 735",sym:"<path d=\"m367.5 727.4l360-360-360-360-360 360z\" fill=\"#f00\"/> <path d=\"m367.5 670.3-302.8-302.8l302.8-302.8 302.8 302.8z\" fill=\"#fff\"/> <path d=\"m233.3 384.1c-11.1 0-17.9-3.85-21.1-10.13h-79.98v36.56h199.3v-36.56h-72.5c-4.93 6.32-14.54 10.13-25.76 10.13\"/><path d=\"m251.7 370.5c3.25 0 7.91-1.57 11.67-9.1.86-1.71 1.03-3.89 1.22-6.2.1-1.2.26-3.13.54-3.87.36-.25 1.19-.61 1.78-.87 2.21-.97 5.24-2.29 6.83-5.47.89-1.78 1.15-3.54 1.15-5.22 0-1.26-.15-2.47-.29-3.62-.15-1.21-.28-2.37-.28-3.57 0-.41.001-.82.05-1.24.18-2.1 3.87-6.65 7.19-9.58l-5.07-5.77c-1.54 1.35-9.23 8.4-9.78 14.69-.21 2.47.04 4.56.26 6.4.26 2.19.39 3.48-.11 4.48-.35.69-1.77 1.32-3.04 1.87-1.96.86-4.17 1.82-5.4 4.07-1.08 1.99-1.29 4.58-1.5 7.09-.09 1.15-.23 2.9-.45 3.42-.66 1.31-1.35 2.37-2.06 3.16-.48 1.32-1.31 3.21-2.73 5.25v4.08\"/><path d=\"m241.7 365.7l4.39 6.3c2.51-1.75 4.31-3.73 5.61-5.59 1.42-2.03 2.24-3.92 2.73-5.25.18-.5.32-.92.42-1.23.69-2.15.18-4.19-.27-5.98-.47-1.88-.74-3.09-.22-4.23.6-1.34 1.62-2.14 2.91-3.15 1.47-1.15 3.3-2.59 4.44-5 1.42-2.98.59-6.27-.21-9.44-.56-2.23-1.14-4.54-.83-6.3l-7.56-1.34c-.15.82-.21 1.63-.21 2.44 0 2.51.6 4.91 1.16 7.09.31 1.23.76 3 .76 3.9 0 .16-.001.29-.04.39-.34.72-1.04 1.29-2.24 2.24-1.69 1.33-3.79 2.98-5.16 6-.71 1.58-.95 3.11-.95 4.51 0 1.84.41 3.47.73 4.74.15.6.37 1.48.38 1.84-.79 2.42-2.17 5.5-5.81 8\"/><path d=\"m208 350c.51.95.84 1.84 1.06 2.68.76.49 1.88 1.22 2.1 1.58.34.9.02 3.43-.2 5.11-.07.55-.14 1.08-.19 1.6 1.83 1.83 4.71 3.95 6.26 4.73l-2.89 5.79c1.43 2.04 3.1 4.08 4.62 5.75l5.68-5.17c-3.27-3.6-5.57-7.1-6.12-8.64-.001-.07-.001-.14-.001-.24 0-.67.16-1.95.28-2.84.19-1.51.4-3.12.4-4.71 0-1.44-.17-2.87-.67-4.18-1.01-2.64-3.38-4.15-5.27-5.36-1.12-.71-2.65-1.69-2.73-2.31-.02-.16-.03-.31-.03-.47 0-.77.24-1.56.67-2.9.63-1.95 1.46-4.53 1.46-8.3 0-.51-.02-1.04-.05-1.59l-7.67.46c.19 3.2-.42 5.08-1.06 7.1-.6 1.87-1.29 4-.96 6.67.02.13.04.25.06.38 1.78.94 3.86 2.29 5.25 4.87\"/><path d=\"m191.8 334.1c.13 1.5-.11 2.56-.38 3.8-.47 2.11-1.05 4.73.69 8.19 1.55 3.09 4.21 4.42 6.15 5.38 1.57.78 2.48 1.27 2.99 2.19.63 1.16.56 1.96.44 3.29-.14 1.62-.34 3.85 1.07 6.25 2.3 3.92 8.29 8.11 10.84 9.38l.54-1.08 2.89-5.79c-1.56-.78-4.44-2.89-6.26-4.73-.61-.61-1.1-1.19-1.39-1.68-.14-.23-.15-.52-.04-1.67.11-1.24.25-2.94-.28-4.94-.22-.84-.55-1.74-1.06-2.68-1.4-2.58-3.47-3.93-5.26-4.87-.37-.19-.73-.38-1.07-.55-1.64-.81-2.34-1.21-2.7-1.94-.5-1-.44-1.39-.06-3.1.32-1.46.77-3.45.54-6.12-.44-5.07-4.36-9.32-7.52-12.73l-2.33-2.61-5.94 4.86 2.63 2.96c2.36 2.55 5.29 5.73 5.51 8.18\"/><path d=\"m225.8 339.3c0 5.9 1.42 13.83 8.34 13.83 6.91 0 8.74-8.94 8.74-12.6 0-3.23-4.91-16.91-6.1-29.3-1.53-.02-2.81-.46-3.88-1.16-1.07 13.9-7.15 23.86-7.15 29.2\"/><path d=\"m334.1 227.5c-15.1 2.4-84.1 14.8-90.7 16.1-9.81 1.88-12.1-7-16.56-9.12 0 0 6.61 38.83 7 41.72 1.38 10.38-5.72 15.72-5.72 23.48 0 2.81 1.22 8 4.79 10.35 1.07.7 2.35 1.13 3.88 1.16.05 0 .09 0 .14 0 6.72 0 8.16-6.72 8.16-11.84 0-7.92-3.84-12.48-3.84-14.4s1.6-4.16 7.68-5.12c6.08-.96 82.1-14.16 94.1-16.1s20.88-11.76 18.96-21.84c-1.92-10.1-12.72-16.8-27.84-14.4m5.2 28.32c-10.24.64-99.7 9.28-99.7 9.28l-1.92-12.64s88.5-15.36 98.9-17.1c10.4-1.76 17.76 2.4 17.76 8.96 0 6.56-4.8 10.88-15 11.52\"/><path d=\"m498.8 306.2c-2.07 10.68-6.52 20.93-6.52 23.74 0 3.66 1.09 12.8 8 12.8s9.1-8.13 9.1-14c0-4.66-4.08-12.2-5.79-23.1-1 .44-2.14.7-3.45.7-.47 0-.9-.05-1.32-.13\"/><path d=\"m387.7 261.5c12 1.92 96.1 15.93 102.2 16.9 3.47.55 6.31 2.84 6.31 3.79s-3.71 4.5-3.71 10.73c0 4.76.74 12.26 6.26 13.29.41.08.85.13 1.32.13 1.31 0 2.45-.25 3.45-.7 4.14-1.83 5.78-6.99 5.78-11.69 0-10.97-5.7-8.81-4.33-19.2.38-2.88 5.92-40.54 5.92-40.54-4.48 2.08-5.67 9.82-15.48 7.94-6.67-1.28-83.8-15.51-98.9-17.91s-25.36 5.46-27.3 15.54 6.48 19.79 18.48 21.71m9-29.75c10.41 1.71 104.1 18.1 104.1 18.1l-1.92 12.64s-96.9-8.48-107.1-9.12c-10.24-.64-14.88-4.16-14.88-10.72s8.16-12.8 19.84-10.88\"/><path d=\"m532.7 318.2c.05 1.08.08 1.67-.51 3-1.12 2.48-3.07 5.57-6 6.27l1.75 7.48c3.33-.78 7.99-3.25 11.3-10.6 1.36-3 1.25-5.1 1.18-6.54-.06-1.2-.09-1.7.93-3.31.73-1.14.93-1.19 1.8-1.42 1.97-.52 4.23-1.37 6.18-5 2.22-4.14 1.5-7.58.98-10.1-.28-1.38-.51-2.46-.33-3.59.27-1.72 1.48-3.04 3.79-5.41 1.25-1.29 2.67-2.75 4.11-4.58l-6-4.75c-1.18 1.51-2.4 2.76-3.58 3.97-2.56 2.63-5.2 5.35-5.87 9.56-.4 2.51.04 4.64.4 6.35.46 2.24.63 3.29-.23 4.9-.52.98-.54.98-1.36 1.2-1.93.51-4.18 1.33-6.34 4.74-2.15 3.39-2.23 5.63-2.12 7.81\"/><path d=\"m519.6 331.2c3.68-3.24 4.82-4.41 6.5-9.81 1.09-3.51.84-5.83.64-7.69-.16-1.48-.27-2.55.23-4.46.26-.98.35-1.02 1.42-1.6 1.64-.88 4.38-2.35 5.59-7.11 1.11-4.37-.15-7.12-1.07-9.13-.72-1.56-1.15-2.51-.77-4.56l-7.56-1.38c-.8 4.43.44 7.15 1.35 9.13.72 1.57 1.05 2.29.61 4-.38 1.49-.65 1.63-1.78 2.24-1.53.82-4.1 2.2-5.22 6.39-.88 3.29-.64 5.49-.45 7.26.17 1.56.28 2.6-.34 4.58-1.11 3.57-1.23 3.68-4.24 6.32l-1.79 1.59 5.14 5.71 1.72-1.53\"/><path d=\"m462.7 305.6c.87 3.85 3.61 5.54 5.61 6.78 1.82 1.13 2.44 1.59 2.69 2.8.4 1.88.22 2.42-.05 3.22-.54 1.6-.95 3.28-.13 6.18 1.44 5.1 2.98 6.76 8.1 11.87l5.43-5.43c-4.85-4.85-5.25-5.41-6.15-8.55-.24-.84-.22-.9.02-1.63.56-1.68 1.05-3.63.28-7.26-.96-4.52-4.1-6.45-6.17-7.73-1.57-.97-2-1.32-2.15-1.93-.27-1.22.02-2.15.67-3.98.78-2.22 1.76-4.98 1.3-8.93l-7.63.9c.26 2.17-.26 3.63-.91 5.47-.75 2.13-1.69 4.8-.92 8.23\"/><path d=\"m457.5 303.6c0-1.37-.21-2.96-.85-4.86-1.78-5.23-3.63-7.25-5.77-9.58l-2.15-2.44-5.91 4.9 2.41 2.73c1.93 2.1 2.9 3.16 4.16 6.86.66 1.95.46 2.97.17 4.51-.38 1.98-.91 4.69.79 8.52 1.88 4.22 4.69 5.26 6.56 5.95 1.24.46 1.46.54 1.9 1.47.74 1.6.65 2.06.47 2.89-.23 1.1-.62 2.94.45 5.35 1.37 3.12 5.24 10.48 11.51 11.4l1.12-7.6c-1.54-.23-4-3.25-5.6-6.89l-.06-.18.1-.51c.16-.76.3-1.57.3-2.49 0-1.39-.31-3.04-1.31-5.21-1.77-3.81-4.44-4.8-6.21-5.45-1.32-.49-1.63-.6-2.19-1.86-.38-.86-.52-1.47-.52-2.09 0-.55.11-1.1.25-1.85.19-.99.42-2.16.42-3.58\"/><path d=\"m507.7 348.4c-7.53 6.09-24.39 6.56-33.3-1.56l-1.88-1.71-2.31 1.07c-3.43 1.59-8 1.72-11.67 1.82-4.67.13-8.36.24-10.25 3.19-1.37 2.14-1.24 5.1.37 7.99.26.48.57.96.91 1.44h16.75c-6.23 0-9.5-2.94-10.71-4.8.98-.07 2.15-.12 3.15-.14 3.68-.11 8.11-.31 12.31-1.69 4.58 3.49 10.17 5.49 15.87 6.25 4.13-4.86 11.1-6.64 15.18-6.64v5.75c3.18-.83 6.11-2.06 8.56-3.65 4.08 1.76 9.8 5.23 13.78 7.64 3.46 2.1 5.17 3.13 6.31 3.56 3.48 1.34 18 2.53 26.99 2.53v-7.68c-10.16 0-22.32-1.34-24.2-2.02-.61-.25-3.09-1.75-5.07-2.96-5.17-3.14-12.25-7.44-17.1-9.1l-1.99-.66-1.63 1.32\"/><path d=\"m466.3 360.6h-28.65c-12.9 0-14.28 7.9-14.28 10.67 0 .77.09 1.75.36 2.8h11.64c-3.42 0-4.51-1.34-4.51-2.77s1.31-3 6.79-3h45.99c.25-3.12 1.36-5.66 2.96-7.68h-20.3\"/><path d=\"m491.4 368.3h1.1l22.96-5.36-13.1-2.32h-.24v.66c-.1 0-9.61.43-10.73 7\"/><path d=\"m419.3 374.1c-7.4 0-12.38 5.81-12.38 11.24 0 5.18 4.6 11.43 12.76 11.43h2.39c.55-2.95 2.9-7.15 11.65-7.63v-.05h-14c-2.88 0-5-2.82-5.08-3.76 0-1 1.4-3.55 4.7-3.55h49.89v-7.68h-49.89\"/><path d=\"m422 396.7c-.12.63-.15 1.19-.15 1.66 0 6.3 5.55 11.43 15 11.43h.18c1.44-4.26 6.69-7.26 13.67-7.64v-.05h-13.85c-4.76 0-7.36-2.48-7.36-3.75 0-1.09 2.94-1.66 5.84-1.66h33.77v-7.68h-33.77c-.6 0-1.16.02-1.71.05-8.75.48-11.1 4.68-11.65 7.63\"/><path d=\"m437.1 409.8c-.26.77-.41 1.58-.41 2.42 0 4.82 4.32 10 13.96 10.85 6.98.58 37.1 1.53 42.62 1.53 4.5 0 23.36-.61 33.52-3.57 3-.88 5.55-2.06 8-3.2 5.28-2.46 10.74-5 22.6-5v-7.68c-13.57 0-20.1 3.04-25.84 5.71-2.29 1.06-4.45 2.07-6.91 2.79-8.53 2.49-25.98 3.26-31.37 3.26-5.1 0-35.2-.94-41.99-1.5-4.88-.41-6.91-2.28-6.91-3.19.17-.47 2.52-2.42 7.92-2.42h30.92l-7.4-7.68h-23.52c-.51 0-1.02.02-1.52.05-6.99.38-12.23 3.37-13.67 7.63\"/><path d=\"m486.9 360.2c-.11.13-.22.25-.32.38-1.6 2.02-2.71 4.56-2.96 7.68-.03.43-.06.86-.06 1.31 0 7.14 3.76 19.6 28.96 22.79l.96-7.62c-8.31-1.05-22.2-4.42-22.2-15.17 0-.46.04-.9.11-1.31 1.13-6.59 10.63-7 10.73-7v-7.68c-4.07 0-11.1 1.78-15.18 6.63\"/>"},
 GHS08:{cap:"Health hazard",vb:"0 0 919 919",sym:"<path fill=\"#f00\" d=\"m459.5 909.3l449.8-449.8-449.8-449.8-449.8 449.8z\"/><path fill=\"#fff\" d=\"m459.5 838-378.5-378.5 378.5-378.6 378.5 378.6z\"/><path d=\"m461.6 170.1c-53 0-96 46.3-96 103.4 0 37.1 13.88 89.2 40.94 121.1l-3.31 33.86-72.6 26.3c1.16 5.67 6.18 9.93 12.18 9.93 1.06 0 2.09-.15 3.07-.4 1.38 5.36 6.23 9.31 12 9.31.61 0 1.21-.05 1.8-.14 1.42 5.3 6.24 9.21 12 9.21 1.69 0 3.3-.34 4.77-.95.39 3.98 3.76 7.1 7.85 7.1.8 0 1.58-.12 2.31-.35 1 5.85 6.1 10.31 12.24 10.31 4.78 0 8.93-2.7 11-6.65 2.09 1.59 4.69 2.54 7.51 2.54 1.83 0 3.57-.41 5.13-1.12 1.62 3.44 4.63 6.09 8.29 7.23-.14.45-.25.93-.25 1.43 0 2.53 2.05 4.57 4.57 4.57s4.57-2.04 4.57-4.57c0-.56-.11-1.09-.3-1.59 5.33-1.87 9.16-6.93 9.16-12.9 0-2.73-.81-5.27-2.19-7.4 2.24-.3 3.96-2.19 3.96-4.51 0-1.97-1.25-3.64-3-4.27 1.9-2.19 3.07-5 3.07-8.17 0-.59-.06-1.18-.14-1.75 4.69-1.78 8-6.31 8-11.62 0-3.32-1.32-6.32-3.44-8.55.39.11.79.19 1.21.19 2.52 0 4.56-2.05 4.56-4.57 0-2.53-2.04-4.57-4.56-4.57-1 0-1.92.33-2.68.88-.91-1.7-2.56-2.93-4.52-3.25 1.54-2.52 2.44-5.46 2.44-8.63 0-2.05-.39-4-1.07-5.82 4.71-1.76 8.1-6.3 8.1-11.62 0-3.11-1.14-5.94-3-8.12 3.45-1.14 5.94-4.39 5.94-8.23 0-3.15-1.69-5.9-4.2-7.42 1.18-1.48 1.88-3.34 1.88-5.38 0-.52-.05-1.03-.14-1.52 1.8-.09 3.46-.7 4.82-1.72-.11.54-.16 1.08-.16 1.64 0 3.08 1.6 5.78 4 7.32-.48 1.32-.75 2.74-.75 4.22 0 5.07 3 9.41 7.36 11.35-.4 1.42-.63 2.92-.63 4.46 0 5.26 2.48 9.94 6.33 12.94-3.37 1.47-5.73 4.83-5.73 8.74s2.35 7.26 5.71 8.74c-.67 1.16-1.06 2.51-1.06 3.95 0 3.16 1.85 5.87 4.53 7.13-.77 1.91-1.2 3.99-1.2 6.17 0 2.62.63 5.1 1.73 7.3-.53.6-1 1.22-1.45 1.89-.83-.84-1.98-1.36-3.25-1.36-2.52 0-4.57 2.04-4.57 4.57 0 2.52 2.05 4.56 4.57 4.56.22 0 .42-.03.63-.06-.03.42-.06.84-.06 1.27 0 3.17.91 6.11 2.46 8.62-1.33 2.52-2.09 5.39-2.09 8.44 0 4.68 1.78 8.92 4.67 12.14-.8 1.3-1.27 2.82-1.27 4.46 0 4.67 3.78 8.46 8.46 8.46 4.16 0 7.61-3 8.32-6.96 2.29-.25 4.44-.92 6.39-1.93 1 2.17 3.2 3.69 5.75 3.69 3.51 0 6.35-2.84 6.35-6.35 0-2.65-1.64-4.92-3.95-5.87.64-1.38 1.1-2.87 1.38-4.41 1.37.37 2.8.58 4.29.58.18 0 .37-.02.56-.02 1.11 2.86 3.89 4.88 7.15 4.88 2.5 0 4.72-1.2 6.12-3.06.79 2.88 3.42 5 6.56 5 2.37 0 4.46-1.22 5.68-3.07 1.32.81 2.86 1.29 4.53 1.29 4.79 0 8.67-3.89 8.67-8.68 0-1.6-.44-3.09-1.2-4.38.66.22 1.37.33 2.09.33 3.76 0 6.81-3.04 6.81-6.8 0-.32-.03-.63-.08-.94 1.45 2.79 4.35 4.69 7.71 4.69 4.73 0 8.57-3.78 8.66-8.49 2.26-1.4 3.84-3.81 4.09-6.6.44.15.9.24 1.39.24 2.52 0 4.57-2.04 4.57-4.57 0-.52-.09-1.03-.26-1.5l-6.94-2.23-72.5-23.34-.29-30.95c11-11.84 19.59-27.1 25.81-43.69 11.78-31.4 18.1-64.6 18.1-81.98 0-45-43-103.4-96-103.4zm-148.6 291.9c-1.25 0-2.42.36-3.41.97-17.25 6.61-31.57 12.1-37 14.3-12.17 4.86-21.2 17.87-21.2 30.76v41.54l67.3 68.3c.68.15 1.4.22 2.13.22 3.73 0 6.99-2.03 8.73-5 1.35.51 2.82.8 4.35.8 6.87 0 12.44-5.57 12.44-12.44 0-.49-.04-.98-.09-1.45 1.84 2.28 4.66 3.74 7.83 3.74 5.56 0 10.1-4.51 10.1-10.1 0-1.51-.34-2.93-.93-4.21 2-.71 3.74-2.04 4.94-3.76 1.28 1.31 3.06 2.12 5 2.12 3.89 0 7.1-3.16 7.1-7 0-2.03-.86-3.85-2.23-5.14 2.58-1.25 4.54-3.57 5.31-6.39 1.62 1.78 3.87 2.98 6.39 3.24-1 1.23-1.63 2.8-1.63 4.52 0 3.89 3.16 7 7.1 7s7.1-3.16 7.1-7c0-3.19-2.12-5.88-5-6.75 2.24-1.85 3.67-4.65 3.67-7.78 0-.93-.13-1.81-.37-2.66.31.02.62.04.93.04 1.42 0 2.77-.29 3.99-.82.11 2.71 2.32 4.88 5.06 4.88 2.8 0 5.08-2.28 5.08-5.08 0-2.74-2.17-4.95-4.89-5.06.53-1.22.83-2.57.83-3.99 0-.87-.13-1.7-.34-2.5 2.53 0 4.58-2.04 4.58-4.57 0-2.52-2.05-4.56-4.58-4.56-.13 0-.25.02-.38.03-.26-3.8-2.22-7.13-5.13-9.23.001-.29.04-.58.04-.88 0-6.87-5.57-12.43-12.44-12.43-2.39 0-4.62.68-6.51 1.86.27-.72.42-1.5.42-2.31 0-3.6-2.91-6.52-6.51-6.52-.65 0-1.26.1-1.85.27.09-.58.14-1.18.14-1.78 0-6.87-5.56-12.44-12.43-12.44-2.13 0-4.13.53-5.88 1.47-1.57-2.56-4-4.5-6.97-5.39.37-.82.59-1.74.59-2.7 0-3.6-2.92-6.52-6.52-6.52-.85 0-1.65.17-2.39.46-.05-6.83-5.59-12.35-12.43-12.35-1.11 0-2.17.16-3.19.43-.99-2.33-3.3-3.97-6-3.97-1.59 0-3.04.57-4.17 1.52-.44-3.18-3.15-5.63-6.45-5.63m304.3 1.46c-3.06.24-5.55 2.49-6.14 5.44-.93-.48-1.98-.75-3.1-.75-3.76 0-6.8 3.04-6.8 6.8 0 .37.03.73.09 1.08-2.07-1.54-4.63-2.46-7.41-2.46-6.87 0-12.44 5.56-12.44 12.43v.06c-1.26-.3-2.57-.49-3.93-.49-9.1 0-16.41 7.35-16.41 16.42 0 .85.08 1.68.21 2.5-.97-.43-2.04-.67-3.16-.67-2.59 0-4.88 1.26-6.32 3.18-1.49-.49-3.07-.76-4.72-.76-8.09 0-14.67 6.39-15 14.4-.52-.11-1.05-.16-1.6-.16-4.35 0-7.88 3.53-7.88 7.88 0 1.33.33 2.57.9 3.67-1.25-.71-2.7-1.12-4.24-1.12-4.79 0-8.68 3.89-8.68 8.68 0 2.5 1.07 4.75 2.76 6.33v.08c-2 .2-3.68 1.55-4.32 3.39-.26.57-.4 1.2-.4 1.86 0 1.6.83 3 2.08 3.83.87.67 1.94 1.08 3.12 1.08 2.18 0 4-1.37 4.76-3.29 1.18.64 2.53 1 3.97 1 .65 0 1.28-.08 1.89-.22-.05.52-.08 1.05-.08 1.59 0 1.98.39 3.87 1.09 5.61-2.8.66-4.89 3.16-4.89 6.16 0 .93.2 1.8.56 2.59.9 2.29 3.12 3.92 5.73 3.92 2.17 0 4.06-1.12 5.16-2.8.41-.58.74-1.21.95-1.9 1.95.93 4.13 1.46 6.44 1.46.72 0 1.41-.07 2.1-.16-.41 1.09-.64 2.27-.64 3.51 0 1.63.4 3.16 1.09 4.52-.32-.06-.65-.1-.99-.1-2.8 0-5.08 2.27-5.08 5.08 0 2.8 2.28 5.08 5.08 5.08 2.53 0 4.61-1.86 4.99-4.28 1.37 5.38 6.24 9.36 12 9.36 2.61 0 5-.8 7-2.17.6 4.99 4.85 8.86 10 8.86 2.62 0 5-1 6.8-2.66-.02.3-.05.61-.05.92 0 6.86 5.57 12.43 12.44 12.43 2.35 0 4.54-.66 6.42-1.8-.94 1.28-1.5 2.86-1.5 4.57 0 4.29 3.47 7.76 7.75 7.76 2.59 0 4.88-1.28 6.29-3.22l67.3-61.99v-45.4c0-13.77-14.82-30.98-32.74-37.1-4-1.37-30.56-10-30.56-10m-153.4 6c-3.51 0-6.35 2.84-6.35 6.35 0 2.42 1.37 4.5 3.37 5.57-1.91.55-3.31 2.29-3.31 4.37 0 2.53 2.05 4.57 4.57 4.57s4.57-2.04 4.57-4.57c0-1.52-.75-2.86-1.9-3.69 3.05-.46 5.39-3.07 5.39-6.25 0-3.51-2.84-6.35-6.34-6.35m-22.7 5.89l-.03.27-.32-.17c.12-.03.24-.07.35-.1m13.78 21.61c-2.53 0-4.57 2.05-4.57 4.57s2.04 4.57 4.57 4.57c2.52 0 4.57-2.05 4.57-4.57s-2.05-4.57-4.57-4.57m-42.1 4.86c-3.6 0-6.52 2.92-6.52 6.52s2.92 6.51 6.52 6.51 6.52-2.91 6.52-6.51-2.92-6.52-6.52-6.52m73.86 11.58c-2.81 0-5.1 2.29-5.1 5.1 0 2.82 2.29 5.11 5.1 5.11.41 0 .81-.06 1.18-.16.19 3.6 3.15 6.46 6.79 6.46.5 0 .98-.06 1.45-.16 3.16-.36 5.62-3 5.62-6.27 0-1.16-.33-2.23-.87-3.17-1.07-2.36-3.44-4-6.2-4-1.12 0-2.17.27-3.1.75-.63-2.1-2.56-3.65-4.87-3.65m-70.85 11.67c-2.53 0-4.57 2.05-4.57 4.57 0 2.53 2.04 4.57 4.57 4.57.96 0 1.86-.3 2.6-.82.17 3.36 2.91 6 6.31 6 3.51 0 6.35-2.84 6.35-6.35 0-3.5-2.84-6.34-6.35-6.34-1.75 0-3.33.71-4.48 1.85-.48-2-2.28-3.51-4.43-3.51m89 32.51c-3.76 0-6.8 3.04-6.8 6.8 0 .86.16 1.68.45 2.44-2.46.34-4.37 2.44-4.37 5 0 .72.16 1.4.43 2 .71 1.79 2.45 3.07 4.5 3.07h.13c2.82 0 5.1-2.28 5.1-5.08 0-.23-.04-.45-.07-.67.21.02.42.03.63.03 3.76 0 6.8-3.04 6.8-6.8s-3.04-6.8-6.8-6.8m-53.3 8.58c-3.51 0-6.35 2.85-6.35 6.35 0 3.51 2.84 6.35 6.35 6.35 3.5 0 6.34-2.84 6.34-6.35 0-3.5-2.84-6.35-6.34-6.35m-37 .93c-2.8 0-5.08 2.27-5.08 5.08 0 2.8 2.28 5.07 5.08 5.07s5.07-2.27 5.07-5.07c0-2.81-2.27-5.08-5.07-5.08m7.44 13.78c-3.89 0-7.1 3.16-7.1 7 0 3.54 2.61 6.46 6 6.97-.02.26-.05.52-.05.79-2.16-1.78-4.92-2.86-7.94-2.86-4.52 0-8.47 2.43-10.65 6-1.84-2.03-4.49-3.31-7.45-3.31-4.7 0-8.64 3.22-9.75 7.58-1.62-1.11-3.57-1.75-5.68-1.75-5.56 0-10.1 4.5-10.1 10.1 0 .78.09 1.53.26 2.26-2.67-2.43-6.21-3.93-10.1-3.93-6.21 0-11.53 3.76-13.83 9.12-1.62-1.1-3.57-1.75-5.68-1.75-5.56 0-10.1 4.5-10.1 10.1 0 .81.1 1.6.28 2.35l122.2 124.1c1.6-.67 2.72-2.25 2.72-4.09 0-1.74-1.02-3.23-2.48-3.96 1.73-.61 2.98-2.23 2.98-4.17 0-1.83-1.11-3.4-2.69-4.08 1.57-1.03 2.6-2.8 2.6-4.81 0-2.75-1.92-5-4.49-5.62 5.11-3.53 8.47-9.42 8.47-16.1 0-4.13-1.28-7.95-3.46-11.1 3.52-2.2 5.86-6.1 5.86-10.55 0-5-2.98-9.35-7.27-11.31 1.69-1.29 2.78-3.31 2.78-5.6 0-2.39-1.19-4.5-3-5.78 1.03-1.22 1.64-2.79 1.64-4.51 0-3.89-3.16-7-7.1-7-.59 0-1.15.08-1.7.21.79-1.63 1.25-3.46 1.25-5.4 0-1.81-.4-3.53-1.1-5.08 3.66-.26 6.54-3.3 6.54-7 0-3-1.92-5.61-4.61-6.6 2.63-2.28 4.31-5.64 4.31-9.4 0-4.3-2.18-8.09-5.5-10.32 1.92-2.19 3.1-5.06 3.1-8.2 0-2.75-.9-5.28-2.42-7.34 1.96-.7 3.37-2.56 3.37-4.76 0-2.8-2.27-5.08-5.08-5.08-1.71 0-3.22.86-4.14 2.16-2.27-2.81-5.75-4.61-9.65-4.61-1.83 0-3.55.4-5.11 1.1-1.19-2.21-3.53-3.72-6.22-3.72zm69.1 2.03c-4.67 0-8.46 3.79-8.46 8.46 0 1.44.37 2.8 1 3.98-1.22-1-2.78-1.61-4.48-1.61-3.9 0-7.1 3.15-7.1 7 0 3.35 2.34 6.15 5.48 6.86-.92 1.74-1.45 3.71-1.45 5.81 0 4 1.93 7.61 4.91 9.88-1.14 2.12-1.79 4.54-1.79 7.11 0 3.99 1.56 7.61 4.1 10.3-.83 1.87-1.3 3.93-1.3 6.1 0 .84.09 1.66.22 2.46-1.02-.7-2.23-1.16-3.54-1.25.86-1.17 1.38-2.61 1.38-4.17 0-3.9-3.16-7-7.1-7-3.9 0-7.1 3.15-7.1 7 0 1.87.72 3.56 1.91 4.82-2.95.84-5.12 3.56-5.12 6.78 0 3.89 3.16 7 7.1 7 .22 0 .43-.04.65-.06-1.3 2.22-2.06 4.81-2.06 7.57 0 5.25 2.69 9.86 6.76 12.55-5.38 2.29-9.16 7.63-9.16 13.85 0 4.51 1.99 8.55 5.14 11.31-3.26 2.24-5.4 5.99-5.4 10.24 0 1.74.36 3.39 1 4.89-.91 1.51-1.44 3.27-1.44 5.16 0 2.18.71 4.2 1.89 5.85-1.02.81-1.69 2.05-1.69 3.46 0 1.52.77 2.87 1.94 3.67-1.22.79-2 2.15-2 3.71 0 .28.03.56.08.83-1 .81-1.68 2.04-1.68 3.45 0 1.84 1.12 3.41 2.71 4.09l131.7-121.6c.26-.74.41-1.53.41-2.36 0-3.9-3.16-7-7-7-1.21 0-2.35.31-3.34.84-1.22-4.19-5.09-7.25-9.67-7.25-1.98 0-3.81.58-5.37 1.56.02-.26.04-.51.04-.77 0-6.87-5.57-12.44-12.44-12.44-1.61 0-3.14.32-4.55.88-.18-3.74-3.25-6.72-7-6.72-3.9 0-7 3.16-7 7.1 0 .3.02.6.06.89-1.77-2.88-4.95-4.81-8.58-4.81-.58 0-1.14.06-1.69.15-.08-6.8-5.61-12.29-12.43-12.29-.7 0-1.37.07-2.04.18-.33-3.58-3.35-6.38-7-6.38-3.04 0-5.62 1.92-6.62 4.61-.31-.02-.62-.04-.94-.04-1.42 0-2.79.21-4.09.57-1.21-3.19-4.29-5.47-7.91-5.47zm-28.2 27.73c-2.81 0-5.08 2.28-5.08 5.08 0 1.52.68 2.86 1.73 3.79-1.36 1.28-2.21 3.1-2.21 5.12 0 3.89 3.16 7 7.1 7 3.9 0 7.1-3.16 7.1-7 0-2.86-1.7-5.31-4.15-6.42.42-.74.68-1.58.68-2.49 0-2.8-2.27-5.08-5.07-5.08\"/>"}
};
const pictoSVG=k=>'<svg viewBox="'+PICTOS[k].vb+'" aria-hidden="true">'+PICTOS[k].sym+'</svg>';

/* Which pictogram and signal word each hazard statement calls for under GB CLP.
   Several statements — H412 and H413 among them — require neither, which is why
   plenty of correct wax melt labels carry no pictogram at all. */
const CLASSIFY={
 H226:{p:"GHS02",s:"Warning"}, H302:{p:"GHS07",s:"Warning"}, H304:{p:"GHS08",s:"Danger"},
 H315:{p:"GHS07",s:"Warning"}, H317:{p:"GHS07",s:"Warning"}, H318:{p:"GHS05",s:"Danger"},
 H319:{p:"GHS07",s:"Warning"}, H332:{p:"GHS07",s:"Warning"}, H335:{p:"GHS07",s:"Warning"},
 H336:{p:"GHS07",s:"Warning"}, H400:{p:"GHS09",s:"Warning"}, H410:{p:"GHS09",s:"Warning"},
 H411:{p:"GHS09",s:""},        H412:{p:"",s:""},             H413:{p:"",s:""}
};
function required(codes){
  const pics=new Set(), sigs=[];
  (codes||[]).forEach(c=>{const r=CLASSIFY[c]; if(!r) return; if(r.p) pics.add(r.p); if(r.s) sigs.push(r.s);});
  return {pictos:[...pics], signal: sigs.includes("Danger")?"Danger":sigs.includes("Warning")?"Warning":""};
}

/* The label rolls that come with the Phomemo M110 (2-inch thermal label
   printer, 48 mm printable width). Each label is its own page when printing. */
const SIZES=[
 {id:"a4x8",label:"105 × 74 mm — A4 sticker sheets, 8 per sheet (colour printer: fits every fragrance, red diamonds)",w:105,h:74,ok:true,
  sheet:{cols:2,rows:4,left:0,top:0,pitchX:105,pitchY:74.25}},
 {id:"m110-50x80",label:"50 × 80 mm roll — fits every fragrance without a symbol",w:50,h:80,roll:true,ok:false,why:"2 mm narrower than the 52 × 74 mm minimum"},
 {id:"m110-50x30",label:"50 × 30 mm roll — small, no room for a symbol",w:50,h:30,roll:true,ok:false,why:"well under the 52 × 74 mm minimum"},
 {id:"m110-40x30",label:"40 × 30 mm roll — smallest",w:40,h:30,roll:true,ok:false,why:"well under the 52 × 74 mm minimum"}
];
const DEMO={id:"__demo",name:"Example Scent",signal:"Warning",pictos:["GHS07","GHS09"],
 h:["H317","H411"],hx:"",p:["P102","P273","P501"],px:"",
 allergens:"LINALOOL, CITRONELLOL",qty:"Net weight 70 g",batch:"",extra:""};

/* ---------------------------------------------------------------- state */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const uid=()=>"f"+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const state={
  biz:{name:"Over The Rainbow Wax Melts",addr:"18 Sutton Way\nEllesmere Port\nCH65 7DN",phone:"",email:""},
  scents:[], packs:[], selId:null, search:"", size:"a4x8", fs:8, redName:false, gap:2, qty:{}, tab:"labels", nudge:{x:0,y:0}
};
let draft=null, saveTimer=null, bizTimer=null;

/* ------------------------------------------------------------- saving
   Labels live in the shop's own database, so Michelle sees the same list on
   her phone and on the computer. The browser copy below is only a cache, to
   get something on screen before the first request comes back. */
let pending=0;
async function api(method,body){
  const res=await fetch("/api/admin/clp",{
    method, redirect:"manual",
    headers:{"x-otr-admin":"1",...(body?{"content-type":"application/json"}:{})},
    body:body?JSON.stringify(body):undefined
  });
  if(res.type==="opaqueredirect"||res.status===302){ location.reload(); throw new Error("Signing in again…"); }
  const data=await res.json().catch(()=>({}));
  if(!res.ok) throw new Error(data.error||("Could not save ("+res.status+")."));
  return data;
}
function saveState(kind,msg){
  const el=document.getElementById("saveState"); if(!el) return;
  el.dataset.kind=kind; el.textContent=msg||"";
}
async function send(method,body,what){
  pending++; saveState("busy","Saving…");
  try{ const r=await api(method,body); pending--; if(!pending) saveState("ok","Saved"); return r; }
  catch(e){ pending--; saveState("bad",(what||"Not saved")+" — "+e.message); throw e; }
}

/* local fallback so the page still works signed out */
const LS="otr-clp-v1";
function lsRead(){ try{const r=localStorage.getItem(LS);return r?JSON.parse(r):null}catch(e){return null} }
function lsWrite(){ try{localStorage.setItem(LS,JSON.stringify({biz:state.biz,scents:state.scents,packs:state.packs,nudge:state.nudge}))}catch(e){} }

/* ---------------------------------------------------------------- label */
function joinPhrases(codes,extra,table){
  const map=Object.fromEntries(table);
  const out=codes.map(c=>map[c]).filter(Boolean);
  const x=(extra||"").split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
  return out.concat(x);
}
function sentence(list){
  return list.map(t=>/[.!?]$/.test(t)?t:t+".").join(" ");
}
function labelHTML(s,{demo=false,size=null,fs=null}={}){
  const sz=size||SIZES.find(z=>z.id===state.size)||SIZES[0];
  const f=fs||state.fs;
  const pic=16; /* CLP: each pictogram at least 1/15 of the 52x74mm minimum label = 16x16mm */
  const hz=sentence(joinPhrases(s.h||[],s.hx,H_PHRASES));
  const pz=sentence(joinPhrases(s.p||[],s.px,P_PHRASES));
  const al=(s.allergens||"").trim();
  const pics=(s.pictos||[]).filter(k=>PICTOS[k]);
  const addr=(state.biz.addr||"").split(/\r?\n/).map(t=>t.trim()).filter(Boolean).join(", ");
  const supplier='<div class="sup">'+esc(state.biz.name||"")+
    '<div class="addr">'+esc(addr)+(state.biz.phone?"<br>"+esc(state.biz.phone):"")+'</div></div>';
  /* Pictograms flank the supplier block only where the label is wide enough
     for both 16mm diamonds and a readable address between them. */
  const flank=pics.length===2&&sz.w>=72;
  let foot;
  if(flank){
    foot='<div class="l-foot"><div class="l-pics">'+pictoSVG(pics[0])+'</div>'+supplier+
         '<div class="l-pics">'+pictoSVG(pics[1])+'</div></div>';
  }else{
    foot=(pics.length?'<div class="l-pics" style="margin-top:auto">'+pics.map(pictoSVG).join("")+'</div>':"")+
         '<div class="l-foot"'+(pics.length?' style="margin-top:0"':"")+'>'+supplier+'</div>';
  }
  const bits=[];
  bits.push('<div class="l-name'+(state.redName?" red":"")+'">'+esc(s.name||"Untitled")+'</div>');
  /* CLP Art.18(3)(b): for a skin sensitiser the product identifier must also name
     the substance responsible, so this prints as part of the name block. */
  if((s.contains||"").trim()) bits.push('<div class="l-contains">Contains '+esc(s.contains.trim())+'</div>');
  if(s.signal) bits.push('<div class="l-signal">'+esc(s.signal)+'</div>');
  const body=[];
  if(hz) body.push(esc(hz));
  if(pz) body.push(esc(pz));
  if(al) body.push("<b>Contains</b> "+esc(al)+". May produce an allergic reaction.");
  if((s.extra||"").trim()) body.push(esc(s.extra.trim()));
  if(body.length) bits.push('<div class="l-body">'+body.join(" ")+'</div>');
  bits.push(foot);
  const q=[s.qty,s.batch?"Batch "+s.batch:""].filter(Boolean).join("  ·  ");
  if(q) bits.push('<div class="l-qty">'+esc(q)+'</div>');
  let lbl;
  if(sz.w>sz.h){
    /* Landscape labels: text in a column on the left, pictograms down the right. */
    const col=[bits[0]];
    if((s.contains||"").trim()) col.push('<div class="l-contains">Contains '+esc(s.contains.trim())+'</div>');
    if(s.signal) col.push('<div class="l-signal">'+esc(s.signal)+'</div>');
    if(body.length) col.push('<div class="l-body">'+body.join(" ")+'</div>');
    col.push('<div class="l-foot">'+supplier+'</div>');
    if(q) col.push('<div class="l-qty">'+esc(q)+'</div>');
    lbl='<div class="lbl wide" data-name="'+esc(s.name||"Untitled")+'" style="--w:'+sz.w+'mm;--h:'+sz.h+'mm;--fs:'+f+'pt;--pic:'+pic+'mm"><div class="l-col">'+col.join("")+'</div>'+
        (pics.length?'<div class="l-pics side">'+pics.map(pictoSVG).join("")+'</div>':"")+'</div>';
  }else{
    lbl='<div class="lbl" data-name="'+esc(s.name||"Untitled")+'" style="--w:'+sz.w+'mm;--h:'+sz.h+'mm;--fs:'+f+'pt;--pic:'+pic+'mm">'+bits.join("")+'</div>';
  }
  return demo?'<div><div class="demoflag">EXAMPLE ONLY — NOT REAL SAFETY DATA</div>'+lbl+'</div>':lbl;
}

/* ---------------------------------------------------------------- checks */
function checkList(s,isDemo){
  const out=[];
  const req=(label,val,msg)=>out.push({s:val?"ok":"bad",t:val?label:msg});
  req("Business name","Business name is missing — set it in Business details".length&&state.biz.name,"Business name is missing — add it in Business details");
  req("Address",(state.biz.addr||"").trim(),"Address is missing — add it in Business details");
  req("Telephone number",(state.biz.phone||"").trim(),"No telephone number. GB CLP requires one; an email address is not enough");
  req("Fragrance name",(s.name||"").trim()&&s.name!=="Untitled","The fragrance needs a name");
  const hz=joinPhrases(s.h||[],s.hx,H_PHRASES);
  const pz=joinPhrases(s.p||[],s.px,P_PHRASES);
  out.push(hz.length?{s:"ok",t:hz.length+" hazard statement"+(hz.length>1?"s":"")}:{s:"warn",t:"No hazard statements — only correct if the CLP sheet shows none"});
  out.push(pz.length?{s:"ok",t:pz.length+" precautionary statement"+(pz.length>1?"s":"")}:{s:"warn",t:"No precautionary statements"});
  /* Pictograms and signal word are checked against the hazard statements rather
     than simply counted: too many is as wrong as too few. */
  const unknown=(s.h||[]).filter(c=>!CLASSIFY[c]);
  const need=required(s.h);
  const have=(s.pictos||[]).slice().sort().join(",");
  const want=need.pictos.slice().sort().join(",");
  const capOf=k=>PICTOS[k]?PICTOS[k].cap:k;
  if(have===want){
    out.push({s:"ok",t:want
      ? need.pictos.length+" pictogram"+(need.pictos.length>1?"s":"")+", matching the hazard statements"
      : "No pictogram needed — this classification carries none"});
  }else{
    const missing=need.pictos.filter(k=>!(s.pictos||[]).includes(k));
    const extra=(s.pictos||[]).filter(k=>!need.pictos.includes(k));
    if(missing.length) out.push({s:"bad",t:"The hazard statements call for the "+missing.map(capOf).join(" and ")+" pictogram"+(missing.length>1?"s":"")+" — tick "+(missing.length>1?"them":"it")+", or use “Set from the hazard statements”"});
    if(extra.length) out.push({s:"warn",t:"The "+extra.map(capOf).join(" and ")+" pictogram"+(extra.length>1?"s are":" is")+" ticked but the hazard statements do not call for "+(extra.length>1?"them":"it")+" — extra pictograms are over-labelling"});
  }
  if((s.signal||"")===need.signal){
    out.push({s:"ok",t:need.signal?"Signal word: "+need.signal:"No signal word needed — this classification carries none"});
  }else{
    out.push({s:"bad",t:need.signal
      ? 'Signal word should be "'+need.signal+'" for these hazard statements'
      : "No signal word should appear for these hazard statements"});
  }
  if(unknown.length) out.push({s:"warn",t:"Can’t check the pictogram for "+unknown.join(", ")+" — copy whatever the CLP sheet prints"});
  if((s.h||[]).includes("H317")&&!(s.contains||"").trim())
    out.push({s:"bad",t:"This one can cause an allergic skin reaction, so CLP requires the substance responsible to be named. Copy the sheet's “(Contains: …)” line in."});
  out.push((s.allergens||"").trim()?{s:"ok",t:"Allergens listed"}:{s:"warn",t:"No allergens — only correct if the sheet lists none"});
  out.push((s.qty||"").trim()?{s:"ok",t:"Net quantity shown"}:{s:"warn",t:"No net quantity — fine only if it is printed elsewhere on the pack"});
  const sz=SIZES.find(z=>z.id===state.size);
  if(sz&&!sz.ok) out.push({s:"warn",t:"This size is "+(sz.why||"under the 52 × 74 mm minimum")+" — only safe on small packs where the full details are on the outer packaging"});
  /* A thermal label printer prints black only. CLP pictograms must have a red
     frame, so a black-framed diamond is not a compliant pictogram. */
  if(sz&&sz.roll&&(s.pictos||[]).length) out.push({s:"bad",t:"This label has a warning symbol, and CLP requires its diamond frame to be red. The Phomemo prints black only, so print this one on a colour printer, or on pre-printed red-diamond labels"});
  if(state.fs<7) out.push({s:"warn",t:"Text under 7 pt may be too small to count as easily legible"});
  if(isDemo) out.unshift({s:"bad",t:"This is a worked example, not your data. Add a fragrance to replace it."});
  return out;
}
function scentStatus(s){
  const bad=checkList(s,false).some(c=>c.s==="bad");
  const warn=checkList(s,false).some(c=>c.s==="warn");
  return bad?"bad":warn?"part":"ok";
}

/* ---------------------------------------------------------------- render */
function renderScents(){
  const ul=$("#scentList"); const q=state.search.toLowerCase();
  const list=state.scents.filter(s=>!q||(s.name||"").toLowerCase().includes(q));
  if(!state.scents.length){
    ul.innerHTML='<div class="empty-list">No fragrances yet. Add your first one, then copy its wording across from the supplier’s CLP sheet.</div>';
    return;
  }
  if(!list.length){ ul.innerHTML='<div class="empty-list">Nothing matches that.</div>'; return; }
  ul.innerHTML=list.map(s=>
    '<li><button class="pick" type="button" data-id="'+s.id+'" aria-current="'+(s.id===state.selId)+'">'+
    '<span class="dot '+scentStatus(s)+'" aria-hidden="true"></span>'+
    '<span class="nm">'+esc(s.name||"Untitled")+'</span></button>'+
    '<button class="icon-x" type="button" data-del="'+s.id+'" aria-label="Delete '+esc(s.name||"fragrance")+'">&times;</button></li>'
  ).join("");
}

function phraseBox(id,table,chosen){
  return '<div class="phrases" id="'+id+'">'+table.map(([c,t])=>
    '<label><input type="checkbox" value="'+c+'"'+(chosen.includes(c)?" checked":"")+'>'+
    '<code>'+c+'</code><span>'+esc(t)+'</span></label>').join("")+'</div>';
}

function renderEditor(){
  const body=$("#editorBody");
  if(!draft){
    body.innerHTML='<div class="empty-list" style="padding:26px">Pick a fragrance from the list, or add one.</div>';
    $("#editorTitle").textContent="Fragrance details";
    return;
  }
  $("#editorTitle").textContent=draft.name||"Untitled fragrance";
  body.innerHTML=
  '<div class="grid2">'+
    '<div class="field"><label class="f" for="e-name">Fragrance name</label><input type="text" id="e-name" value="'+esc(draft.name)+'" placeholder="e.g. Vanilla Blossom"></div>'+
    '<div class="field"><label class="f" for="e-qty">Net quantity</label><input type="text" id="e-qty" value="'+esc(draft.qty)+'" placeholder="e.g. Net weight 70 g"></div>'+
  '</div>'+
  (draft.source?'<p class="hintline" style="margin:-6px 0 14px">From your supplier’s sheet: <strong>'+esc(draft.source)+'</strong></p>':"")+
  '<div class="field"><label class="f" for="e-contains">Sensitiser named in the product identifier <span class="opt">— the supplier’s "(Contains: …)" line</span></label>'+
    '<input type="text" id="e-contains" value="'+esc(draft.contains)+'" placeholder="Leave blank unless the sheet shows one">'+
    '<p class="hintline">Required by CLP where the melt can cause an allergic skin reaction. Prints under the name.</p></div>'+
  '<div class="field"><label class="f">Signal word</label><div class="seg">'+
    ["","Warning","Danger"].map(v=>'<label><input type="radio" name="sig" value="'+v+'"'+(draft.signal===v?" checked":"")+'><span>'+(v||"None")+'</span></label>').join("")+
  '</div><p class="hintline">Exactly as the CLP sheet states it.</p></div>'+
  '<div class="field"><label class="f">Pictograms</label><div class="pictos" id="e-pics">'+
    Object.keys(PICTOS).map(k=>'<label><input type="checkbox" value="'+k+'"'+(draft.pictos.includes(k)?" checked":"")+'>'+
    pictoSVG(k)+'<span class="cap">'+PICTOS[k].cap+'</span></label>').join("")+
  '</div>'+
    '<button class="btn btn-ghost btn-sm" id="e-auto" type="button" style="margin-top:9px">Set from the hazard statements</button>'+
    '<p class="hintline">Many melts need none at all — “Harmful to aquatic life with long lasting effects” carries no pictogram and no signal word, so a bare label is the correct one.</p></div>'+
  '<div class="field"><label class="f">Hazard statements <span class="opt">— tick the H codes on your sheet</span></label>'+phraseBox("e-h",H_PHRASES,draft.h)+
    '<input type="text" id="e-hx" style="margin-top:8px" value="'+esc(draft.hx)+'" placeholder="Anything else, one per line — press Enter in the box below instead for long text"></div>'+
  '<div class="field"><label class="f">Precautionary statements <span class="opt">— tick the P codes on your sheet</span></label>'+phraseBox("e-p",P_PHRASES,draft.p)+
    '<input type="text" id="e-px" style="margin-top:8px" value="'+esc(draft.px)+'" placeholder="Any extra precautionary wording"></div>'+
  '<div class="field"><label class="f" for="e-all">Allergens <span class="opt">— the "Contains…" list</span></label>'+
    '<textarea id="e-all" placeholder="LINALOOL, CITRONELLOL, GERANIOL">'+esc(draft.allergens)+'</textarea>'+
    '<p class="hintline">Just the names. "Contains" and "May produce an allergic reaction." are added for you.</p></div>'+
  '<div class="grid2">'+
    '<div class="field"><label class="f" for="e-batch">Batch <span class="opt">optional</span></label><input type="text" id="e-batch" value="'+esc(draft.batch)+'" placeholder="e.g. 2026-10"></div>'+
    '<div class="field"><label class="f" for="e-extra">Anything else <span class="opt">optional</span></label><input type="text" id="e-extra" value="'+esc(draft.extra)+'" placeholder="e.g. Safety data sheet available on request."></div>'+
  '</div>'+
  '<div style="display:flex;gap:9px;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" id="e-dup" type="button">Duplicate</button>'+
  '<button class="btn btn-danger btn-sm" id="e-del" type="button">Delete this fragrance</button></div>';
  wireEditor();
}

/* How many of her fragrances actually fit the chosen label, measured rather than guessed. */
let fitHost=null;
function renderFitCount(){
  const el=$("#fitCount"); if(!el) return;
  if(!state.scents.length){ el.textContent=""; return; }
  if(!fitHost){ fitHost=document.createElement("div"); fitHost.style.cssText="position:absolute;left:-9999px;top:0;visibility:hidden"; document.body.append(fitHost); }
  const sz=SIZES.find(z=>z.id===state.size)||SIZES[0];
  let fits=0, plain=0, plainFit=0;
  for(const s of state.scents){
    fitHost.innerHTML=labelHTML(s,{size:sz});
    const e=fitHost.firstElementChild;
    const ok=e.scrollHeight<=e.clientHeight+1;
    const hasPic=(s.pictos||[]).some(k=>PICTOS[k]);
    if(ok) fits++;
    if(!hasPic){ plain++; if(ok) plainFit++; }
  }
  fitHost.innerHTML="";
  const n=state.scents.length;
  if(sz.roll&&plain<n){
    /* On the thermal printer only the symbol-free labels can be printed properly, so count those. */
    el.textContent=plainFit===plain
      ? `All ${plain} fragrances without a warning symbol fit this size. The ${n-plain} with a symbol need a colour printer (red diamond).`
      : `${plainFit} of the ${plain} fragrances without a warning symbol fit this size — ${plain-plainFit} need smaller text. The ${n-plain} with a symbol need a colour printer anyway.`;
    el.style.color=plainFit===plain?"var(--ok)":"var(--warn)";
    return;
  }
  el.textContent=fits===n
    ? `All ${n} of your fragrances fit this size.`
    : `${fits} of your ${n} fragrances fit this size — ${n-fits} need a bigger label or smaller text.`;
  el.style.color=fits===n?"var(--ok)":"var(--warn)";
}
function renderPreview(){
  const demo=!draft;
  const s=draft||DEMO;
  $("#stage").innerHTML=labelHTML(s,{demo});
  $("#previewSub").textContent=demo?"A worked example so you can see the layout.":"Shown at roughly life size.";
  const el=$(".lbl",$("#stage"));
  requestAnimationFrame(()=>{
    const over=el.scrollHeight>el.clientHeight+1;
    el.classList.toggle("overflowing",over);
    const ul=$("#checks");
    const items=checkList(s,demo);
    if(over) items.unshift({s:"bad",t:"The text does not fit. Use a larger label, smaller text, or trim the wording."});
    ul.innerHTML=items.map(c=>'<li class="'+c.s+'"><span class="mk">'+(c.s==="ok"?"✓":c.s==="warn"?"!":"✕")+'</span><span>'+esc(c.t)+'</span></li>').join("");
    renderFitCount();
  });
}

function renderQty(){
  const tb=$("#qtyBody");
  if(!state.scents.length){ tb.innerHTML='<tr><td colspan="2"><div class="empty-list">Add a fragrance first.</div></td></tr>'; renderSheet(); return; }
  tb.innerHTML=state.scents.map(s=>
    '<tr><td>'+esc(s.name||"Untitled")+'</td><td class="n"><input type="number" min="0" max="200" step="1" value="'+(state.qty[s.id]||0)+'" data-qty="'+s.id+'" aria-label="How many '+esc(s.name||"")+'"></td></tr>'
  ).join("");
  renderSheet();
}
function renderSheet(){
  const sz=SIZES.find(z=>z.id===$("#sheetSize").value)||SIZES[0];
  const out=$("#sheet-out"), g=$("#sheetGrid");
  out.classList.remove("packs");
  const labels=[];
  state.scents.forEach(s=>{ const n=Math.min(200,+state.qty[s.id]||0); for(let i=0;i<n;i++) labels.push(labelHTML(s,{size:sz})); });
  const empty='<div style="color:#555;font:400 13px sans-serif;padding:20px">Set how many of each you need above.</div>';
  $("#sheetFs").value=String(state.fs);
  $("#nudgeRow").hidden=!sz.sheet;
  const total=labels.length;
  if(sz.sheet){
    /* A4 sheet of pre-cut stickers: each label goes exactly where its sticker
       is, laid out from the page corner with no printer margin of our own. */
    const sh=sz.sheet, per=sh.cols*sh.rows, nx=state.nudge.x, ny=state.nudge.y;
    $("#rollPage").textContent="@page{size:A4;margin:0}";
    $("#sheetFit").textContent=(total?total+" label"+(total===1?"":"s")+" to print, ":"")+per+" per A4 sheet ("+sh.cols+" across × "+sh.rows+" down). "+
      "Print on the colour inkjet: paper size A4, margins none, scale 100%, no fit to page. Print one on plain paper first and hold it against a label sheet; if it is off, use the nudge boxes.";
    const pages=[];
    for(let i=0;i<labels.length;i+=per){
      const slice=labels.slice(i,i+per);
      pages.push('<div class="precut-page">'+slice.map((h,k)=>{
        const c=k%sh.cols, r=Math.floor(k/sh.cols);
        return '<div class="slot" style="left:'+(sh.left+c*sh.pitchX+nx).toFixed(2)+'mm;top:'+(sh.top+r*sh.pitchY+ny).toFixed(2)+'mm">'+h+'</div>';
      }).join("")+'</div>');
    }
    g.innerHTML=pages.join("")||empty;
    dropOverflowing(g,sz);
    $("#picWarn").hidden=true;
    return;
  }
  /* Phomemo rolls: one label per page, the page being the label itself, so the
     printer feeds one sticker per label. The page size follows the chosen roll. */
  $("#rollPage").textContent="@page{size:"+sz.w+"mm "+sz.h+"mm;margin:0}";
  $("#sheetFit").textContent=(total?total+" label"+(total===1?"":"s")+" to print, one per sticker, ":"")+
    "on the "+sz.w+" × "+sz.h+" mm roll. In the print box choose the Phomemo M110, set the paper size to "+sz.w+" × "+sz.h+" mm and the scale to 100%.";
  g.innerHTML=labels.map(h=>'<div class="roll-page">'+h+'</div>').join("")||empty;
  dropOverflowing(g,sz);
  const withPics=[...new Set(state.scents.filter(s=>(+state.qty[s.id]||0)>0&&(s.pictos||[]).filter(k=>PICTOS[k]).length).map(s=>s.name||"Untitled"))];
  const pw=$("#picWarn"); pw.hidden=!withPics.length;
  if(withPics.length) pw.innerHTML='<strong>'+withPics.length+' of these need a red diamond.</strong> The Phomemo prints black only, and CLP requires the frame of a warning symbol to be red, so a black diamond is not a compliant pictogram. Print these on a colour printer or on pre-printed red-diamond stock instead: '+withPics.map(esc).join(", ")+'.';
}
/* A label whose wording does not fit is not printed at all: a hazard statement
   with its end cut off is worse than a blank sticker. */
function dropOverflowing(g,sz){
  const bad=[];
  $$(".lbl",g).forEach(el=>{
    if(el.scrollHeight<=el.clientHeight+1) return;
    const name=el.dataset.name||"Untitled";
    if(!bad.includes(name)) bad.push(name);
    const ph=document.createElement("div");
    ph.className="nofit"; ph.style.width=sz.w+"mm"; ph.style.height=sz.h+"mm";
    ph.innerHTML='<b>Not printed</b><br>'+esc(name)+'<br>does not fit at this size';
    el.replaceWith(ph);
  });
  const w=$("#sheetWarn");
  w.hidden=!bad.length;
  if(bad.length) w.innerHTML='<strong>'+bad.length+' fragrance'+(bad.length===1?"":"s")+' not printed</strong> because the wording does not fit at '+
    sz.w+' × '+sz.h+' mm and '+state.fs+' pt — a cut-off hazard statement is not a label. Use a bigger size or smaller text for: '+bad.map(esc).join(", ")+'.';
}

function renderBiz(){
  $("#bizBody").innerHTML=
  '<div class="field"><label class="f" for="b-name">Business name</label><input type="text" id="b-name" value="'+esc(state.biz.name)+'"></div>'+
  '<div class="field"><label class="f" for="b-addr">Address</label><textarea id="b-addr" placeholder="Street&#10;Town&#10;Postcode">'+esc(state.biz.addr)+'</textarea>'+
    '<p class="hintline">One line each. This is the address a customer or enforcement officer would write to.</p></div>'+
  '<div class="grid2">'+
    '<div class="field"><label class="f" for="b-phone">Telephone number</label><input type="tel" id="b-phone" value="'+esc(state.biz.phone)+'" placeholder="e.g. 0151 000 0000"></div>'+
    '<div class="field"><label class="f" for="b-email">Email <span class="opt">optional</span></label><input type="email" id="b-email" value="'+esc(state.biz.email)+'"></div>'+
  '</div>'+
  (state.biz.phone?"":'<div class="note alert"><strong>A telephone number is required.</strong> GB CLP asks for the supplier’s name, address <em>and</em> telephone number. An email address on its own does not satisfy it. A mobile is fine, as long as someone answers it.</div>')+
  '<div class="note" style="margin-top:12px">These details appear on every label, so changing them here changes them everywhere.</div>';
  $("#b-name").addEventListener("input",onBiz);
  $("#b-addr").addEventListener("input",onBiz);
  $("#b-phone").addEventListener("input",onBiz);
  $("#b-email").addEventListener("input",onBiz);
}
function onBiz(){
  state.biz={name:$("#b-name").value,addr:$("#b-addr").value,phone:$("#b-phone").value,email:$("#b-email").value};
  renderPreview(); renderSheet(); lsWrite();
  clearTimeout(bizTimer);
  bizTimer=setTimeout(()=>{ send("PUT",{business:state.biz},"Your business details were not saved").catch(()=>{}); renderBizNote(); },700);
}
function renderBizNote(){ /* re-render only the alert, keeping focus */
  const has=!!state.biz.phone.trim(); const n=$("#bizBody .note.alert");
  if(has&&n) n.remove();
}

/* ---------------------------------------------------------------- wiring */
function wireEditor(){
  const upd=()=>{ renderPreview(); renderScents(); renderQty(); queueSave(); };
  $("#e-name").addEventListener("input",e=>{draft.name=e.target.value;$("#editorTitle").textContent=draft.name||"Untitled fragrance";upd()});
  $("#e-qty").addEventListener("input",e=>{draft.qty=e.target.value;upd()});
  $("#e-all").addEventListener("input",e=>{draft.allergens=e.target.value;upd()});
  $("#e-batch").addEventListener("input",e=>{draft.batch=e.target.value;upd()});
  $("#e-extra").addEventListener("input",e=>{draft.extra=e.target.value;upd()});
  $("#e-contains").addEventListener("input",e=>{draft.contains=e.target.value;upd()});
  $("#e-hx").addEventListener("input",e=>{draft.hx=e.target.value;upd()});
  $("#e-px").addEventListener("input",e=>{draft.px=e.target.value;upd()});
  $$('input[name=sig]').forEach(r=>r.addEventListener("change",e=>{draft.signal=e.target.value;upd()}));
  $("#e-pics").addEventListener("change",()=>{draft.pictos=$$("#e-pics input:checked").map(i=>i.value);upd()});
  $("#e-h").addEventListener("change",()=>{draft.h=$$("#e-h input:checked").map(i=>i.value);upd()});
  $("#e-p").addEventListener("change",()=>{draft.p=$$("#e-p input:checked").map(i=>i.value);upd()});
  $("#e-auto").addEventListener("click",()=>{
    const r=required(draft.h);
    draft.pictos=r.pictos; draft.signal=r.signal;
    renderEditor(); upd();
  });
  $("#e-del").addEventListener("click",()=>delScent(draft.id));
  $("#e-dup").addEventListener("click",()=>{
    const c={...draft,id:uid(),name:(draft.name||"Untitled")+" (copy)",h:[...draft.h],p:[...draft.p],pictos:[...draft.pictos]};
    state.scents.push(c); select(c.id); persist(c); renderScents(); renderQty();
  });
}
function blank(){ return {id:uid(),name:"",signal:"",pictos:[],h:[],hx:"",p:[],px:"",allergens:"",qty:"",batch:"",extra:"",contains:"",source:""}; }
function select(id){
  state.selId=id;
  const s=state.scents.find(x=>x.id===id);
  draft=s?JSON.parse(JSON.stringify(s)):null;
  renderScents(); renderEditor(); renderPreview();
}
function queueSave(){
  if(!draft) return;
  const i=state.scents.findIndex(x=>x.id===draft.id);
  if(i>-1) state.scents[i]=JSON.parse(JSON.stringify(draft));
  lsWrite();
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>persist(draft),650);
}
function persist(s){ if(s) send("POST",{label:JSON.parse(JSON.stringify(s))},"This fragrance was not saved").catch(()=>{}); }
function delScent(id){
  state.scents=state.scents.filter(s=>s.id!==id);
  delete state.qty[id];
  send("DELETE",{id},"It was not deleted").catch(()=>{});
  lsWrite();
  if(state.tab==="packs"){ renderPacks(); renderPackPreview(); }
  select(state.scents.length?state.scents[0].id:null);
  renderQty();
}

/* ---------------------------------------------------------------- sample packs
   Several fragrances in one package. The label is a strip of equal panels
   (one per fold of the sticker). The front panel carries the pack name and the
   supplier details; every fragrance then gets a numbered block with its own
   signal word, pictograms, statements and allergens. Blocks flow across
   panels but are never split or merged, because each one describes one
   mixture and the hazard information has to stay attributable to it. */
const PIC_MM=16;
let packDraft=null, packTimer=null;
function blankPack(){ return {id:uid(),name:"",qty:"",scents:[],w:70,h:95,fs:7}; }
function packScents(p){ return (p.scents||[]).map(id=>state.scents.find(s=>s.id===id)).filter(Boolean); }
function packVars(p){ return '--w:'+p.w+'mm;--h:'+p.h+'mm;--fs:'+p.fs+'pt;--pic:'+PIC_MM+'mm'; }

function packBlocks(p){
  const scents=packScents(p);
  const addr=(state.biz.addr||"").split(/\r?\n/).map(t=>t.trim()).filter(Boolean).join(", ");
  const n=scents.length;
  let front='<div class="pk-head"><div class="pk-name'+(state.redName?" red":"")+'">'+esc(p.name||"Sample pack")+'</div>'+
    '<div class="pk-lede">'+(n?n+" different wax melt"+(n===1?"":"s")+". The safety information for each one follows, numbered to match the melt.":"")+'</div></div>'+
    '<div class="pk-sup">'+esc(state.biz.name||"")+'<div class="addr">'+esc(addr)+(state.biz.phone?"<br>"+esc(state.biz.phone):"")+'</div></div>'+
    ((p.qty||"").trim()?'<div class="pk-qty">'+esc(p.qty.trim())+'</div>':"");
  const blocks=[{html:front,name:"the front panel"}];
  scents.forEach((s,i)=>{
    const hz=sentence(joinPhrases(s.h||[],s.hx,H_PHRASES));
    const pz=sentence(joinPhrases(s.p||[],s.px,P_PHRASES));
    const al=(s.allergens||"").trim();
    const pics=(s.pictos||[]).filter(k=>PICTOS[k]);
    const body=[];
    if(hz) body.push(esc(hz));
    if(pz) body.push(esc(pz));
    if(al) body.push("<b>Contains</b> "+esc(al)+". May produce an allergic reaction.");
    if((s.extra||"").trim()) body.push(esc(s.extra.trim()));
    const txt='<div class="pb-txt"><div class="pb-h"><span class="pb-n">'+(i+1)+'</span>'+esc(s.name||"Untitled")+'</div>'+
      ((s.contains||"").trim()?'<div class="pb-contains">Contains '+esc(s.contains.trim())+'</div>':"")+
      (s.signal?'<div class="pb-signal">'+esc(s.signal)+'</div>':"")+
      (body.length?'<div class="pb-body">'+body.join(" ")+'</div>':"")+'</div>';
    const pic=pics.length?'<div class="pb-pics">'+pics.map(pictoSVG).join("")+'</div>':"";
    blocks.push({html:'<div class="pb">'+txt+pic+'</div>',name:(i+1)+". "+(s.name||"Untitled")});
  });
  return blocks;
}

/* Lay blocks into panels by measuring them in a hidden panel of the real size. */
function paginate(p,blocks){
  const host=$("#measure");
  host.innerHTML='<div class="pnl" style="'+packVars(p)+'"></div>';
  const pnl=host.firstElementChild;
  const fits=()=>pnl.scrollHeight<=pnl.clientHeight+0.5;
  const panels=[], tooBig=[];
  let cur=[];
  for(const b of blocks){
    pnl.insertAdjacentHTML("beforeend",b.html);
    if(fits()){ cur.push(b.html); continue; }
    pnl.lastElementChild.remove();
    if(cur.length){ panels.push(cur); cur=[]; pnl.innerHTML=""; pnl.insertAdjacentHTML("beforeend",b.html); }
    if(!fits()) tooBig.push(b.name); /* kept on a panel of its own, and flagged */
    cur.push(b.html);
  }
  if(cur.length) panels.push(cur);
  host.innerHTML="";
  return {panels,tooBig};
}
function stripHTML(p,panels){
  return '<div class="strip" style="'+packVars(p)+'">'+panels.map((bl,i)=>
    '<div class="pnl">'+bl.join("")+'<div class="pnl-no">'+(i+1)+'/'+panels.length+'</div></div>').join("")+'</div>';
}
const PAGE_W=297-14; /* A4 landscape less the 7 mm print margins */
function packLayout(p){
  const {panels,tooBig}=paginate(p,packBlocks(p));
  const across=Math.max(1,Math.floor((PAGE_W+0.01)/p.w));
  return {panels,tooBig,across};
}

function packChecks(p,lay){
  const out=[];
  const req=(label,val,msg)=>out.push({s:val?"ok":"bad",t:val?label:msg});
  req("Business name",(state.biz.name||"").trim(),"Business name is missing — add it in Business details");
  req("Address",(state.biz.addr||"").trim(),"Address is missing — add it in Business details");
  req("Telephone number",(state.biz.phone||"").trim(),"No telephone number. GB CLP requires one; an email address is not enough");
  req("Pack name",(p.name||"").trim(),"The pack needs a name — it is the product identifier for the pack");
  const scents=packScents(p);
  req(scents.length+" fragrance"+(scents.length===1?"":"s")+" in the pack",scents.length,"Tick the fragrances that go in this pack");
  if((p.scents||[]).length>scents.length) out.push({s:"warn",t:"A fragrance that was in this pack has since been deleted — it has been left off"});
  out.push((p.qty||"").trim()?{s:"ok",t:"Net quantity shown"}:{s:"warn",t:"No net quantity — fine only if it is printed elsewhere on the pack"});
  if(lay){
    out.push({s:lay.panels.length>lay.across?"warn":"ok",t:lay.panels.length+" panel"+(lay.panels.length===1?"":"s")+" of "+p.w+" × "+p.h+" mm"+
      (lay.panels.length>lay.across?" — wider than an A4 sheet, so it prints as two rows to join at a fold. Narrower panels, fewer fragrances or smaller text would bring it onto one.":"")});
    lay.tooBig.forEach(n=>out.push({s:"bad",t:n+" does not fit on one panel even by itself — use a taller panel or smaller text"}));
  }
  if(p.fs<7) out.push({s:"warn",t:"Text under 7 pt may be too small to count as easily legible"});
  /* Each fragrance's own problems, minus the business ones already listed. */
  scents.forEach((s,i)=>{
    checkList(s,false).filter(c=>c.s==="bad"&&!/Business name|Address|telephone/i.test(c.t))
      .forEach(c=>out.push({s:"bad",t:(i+1)+". "+(s.name||"Untitled")+": "+c.t}));
  });
  return out;
}
function packStatus(p){
  const cs=packChecks(p,null);
  return cs.some(c=>c.s==="bad")?"bad":cs.some(c=>c.s==="warn")?"part":"ok";
}

function renderPacks(){
  const ul=$("#packList"); const q=($("#packSearch").value||"").toLowerCase();
  if(!state.packs.length){ ul.innerHTML='<div class="empty-list">No sample packs yet. Add one, give it a name, and tick the fragrances that go in it.</div>'; return; }
  const list=state.packs.filter(p=>!q||(p.name||"").toLowerCase().includes(q));
  if(!list.length){ ul.innerHTML='<div class="empty-list">Nothing matches that.</div>'; return; }
  ul.innerHTML=list.map(p=>
    '<li><button class="pick" type="button" data-pack="'+p.id+'" aria-current="'+(packDraft&&p.id===packDraft.id)+'">'+
    '<span class="dot '+packStatus(p)+'" aria-hidden="true"></span>'+
    '<span class="nm">'+esc(p.name||"Untitled pack")+'<span class="hintline" style="margin:0 0 0 8px;display:inline">'+packScents(p).length+' melts</span></span></button>'+
    '<button class="icon-x" type="button" data-delpack="'+p.id+'" aria-label="Delete '+esc(p.name||"pack")+'">&times;</button></li>'
  ).join("");
}
function renderPackEditor(){
  const card=$("#packEditor");
  if(!packDraft){ card.hidden=true; return; }
  card.hidden=false;
  const p=packDraft;
  $("#packTitle").textContent=p.name||"Untitled pack";
  const sorted=state.scents.slice().sort((a,b)=>(a.name||"").localeCompare(b.name||"","en-GB"));
  const q=(p._q||"").toLowerCase();
  $("#packBody").innerHTML=
    '<div class="grid2">'+
      '<div class="field"><label class="f" for="pk-name">Pack name</label><input type="text" id="pk-name" value="'+esc(p.name)+'" placeholder="e.g. Perfume sample pack"></div>'+
      '<div class="field"><label class="f" for="pk-qty">Net quantity</label><input type="text" id="pk-qty" value="'+esc(p.qty)+'" placeholder="e.g. 8 × 10 g"></div>'+
    '</div>'+
    '<div class="field"><label class="f" for="pk-search">Fragrances in this pack <span class="opt">— '+p.scents.length+' ticked</span></label>'+
      '<input type="search" id="pk-search" value="'+esc(p._q||"")+'" placeholder="Find a fragrance" style="margin-bottom:8px">'+
      '<div class="phrases" id="pk-scents" style="max-height:280px">'+
      sorted.filter(s=>!q||(s.name||"").toLowerCase().includes(q)).map(s=>{
        const i=p.scents.indexOf(s.id);
        return '<label><input type="checkbox" value="'+s.id+'"'+(i>-1?" checked":"")+'>'+
          '<code style="min-width:1.4em;text-align:right">'+(i>-1?(i+1):"")+'</code><span>'+esc(s.name||"Untitled")+'</span></label>';
      }).join("")+'</div>'+
      '<p class="hintline">Numbered in the order you tick them. Put a matching number, or the name, on each melt.</p></div>'+
    '<div class="ctrlrow">'+
      '<div class="field" style="flex:0 0 110px"><label class="f" for="pk-w">Panel width mm</label><input type="number" id="pk-w" min="30" max="150" step="1" value="'+p.w+'"></div>'+
      '<div class="field" style="flex:0 0 110px"><label class="f" for="pk-h">Panel height mm</label><input type="number" id="pk-h" min="30" max="200" step="1" value="'+p.h+'"></div>'+
      '<div class="field" style="flex:0 0 110px"><label class="f" for="pk-fs">Text size</label><select id="pk-fs">'+
        [6,6.5,7,7.5,8].map(v=>'<option value="'+v+'"'+(+p.fs===v?" selected":"")+'>'+v+' pt</option>').join("")+'</select></div>'+
    '</div>'+
    '<p class="hintline">A panel is one fold of the sticker. Measure the space on the back of the clamshell: that is the panel size, and the strip folds down to it.</p>'+
    '<div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:12px"><button class="btn btn-ghost btn-sm" id="pk-dup" type="button">Duplicate</button>'+
    '<button class="btn btn-danger btn-sm" id="pk-del" type="button">Delete this pack</button></div>';
  wirePackEditor();
}
function wirePackEditor(){
  const p=packDraft;
  const upd=()=>{ renderPackPreview(); renderPacks(); queuePackSave(); };
  $("#pk-name").addEventListener("input",e=>{p.name=e.target.value;$("#packTitle").textContent=p.name||"Untitled pack";upd()});
  $("#pk-qty").addEventListener("input",e=>{p.qty=e.target.value;upd()});
  $("#pk-w").addEventListener("change",e=>{p.w=Math.min(150,Math.max(30,+e.target.value||70));e.target.value=p.w;upd()});
  $("#pk-h").addEventListener("change",e=>{p.h=Math.min(200,Math.max(30,+e.target.value||95));e.target.value=p.h;upd()});
  $("#pk-fs").addEventListener("change",e=>{p.fs=+e.target.value;upd()});
  $("#pk-search").addEventListener("input",e=>{
    p._q=e.target.value; const pos=e.target.selectionStart;
    renderPackEditor(); const s=$("#pk-search"); s.focus(); s.setSelectionRange(pos,pos);
  });
  $("#pk-scents").addEventListener("change",e=>{
    const id=e.target.value;
    if(e.target.checked){ if(!p.scents.includes(id)) p.scents.push(id); }
    else p.scents=p.scents.filter(x=>x!==id);
    const top=$("#pk-scents").scrollTop;
    renderPackEditor(); $("#pk-scents").scrollTop=top; upd();
  });
  $("#pk-del").addEventListener("click",()=>delPack(p.id));
  $("#pk-dup").addEventListener("click",()=>{
    const c={...p,id:uid(),name:(p.name||"Untitled pack")+" (copy)",scents:[...p.scents]}; delete c._q;
    state.packs.push(c); selectPack(c.id); queuePackSave(true);
  });
}
function selectPack(id){
  const p=state.packs.find(x=>x.id===id);
  packDraft=p?JSON.parse(JSON.stringify(p)):null;
  renderPacks(); renderPackEditor(); renderPackPreview();
}
function delPack(id){
  state.packs=state.packs.filter(p=>p.id!==id);
  if(packDraft&&packDraft.id===id) packDraft=null;
  selectPack(state.packs.length?state.packs[0].id:null);
  queuePackSave(true);
}
function cleanPack(p){ const c={...p}; delete c._q; return c; }
function queuePackSave(now){
  if(packDraft){
    const i=state.packs.findIndex(x=>x.id===packDraft.id);
    if(i>-1) state.packs[i]=cleanPack(packDraft);
  }
  lsWrite();
  clearTimeout(packTimer);
  const go=()=>send("PUT",{packs:state.packs.map(cleanPack)},"The sample packs were not saved").catch(()=>{});
  if(now) go(); else packTimer=setTimeout(go,650);
}
function renderPackPreview(){
  const stage=$("#packStage"), fit=$("#packFit"), ul=$("#packChecks");
  if(!packDraft){
    stage.innerHTML='<div class="empty-list" style="background:transparent">Pick a pack, or add one.</div>';
    fit.textContent=""; ul.innerHTML=""; return;
  }
  const p=packDraft;
  const lay=packLayout(p);
  stage.innerHTML=stripHTML(p,lay.panels);
  const w=(lay.panels.length*p.w).toFixed(0);
  fit.textContent=lay.panels.length+" panel"+(lay.panels.length===1?"":"s")+" — the strip is "+w+" × "+p.h+" mm flat"+
    (lay.panels.length>lay.across?" (two rows on A4)":"")+". Dashed lines are the folds.";
  const items=packChecks(p,lay);
  ul.innerHTML=items.map(c=>'<li class="'+c.s+'"><span class="mk">'+(c.s==="ok"?"✓":c.s==="warn"?"!":"✕")+'</span><span>'+esc(c.t)+'</span></li>').join("");
  renderPackSheet();
}
/* What Ctrl+P prints while this tab is open: the chosen pack, N times, on landscape A4. */
function renderPackSheet(){
  const out=$("#sheet-out"), g=$("#sheetGrid");
  out.classList.add("packs");
  $("#rollPage").textContent="@page{size:A4 landscape;margin:7mm}";
  g.style.gridTemplateColumns="1fr"; g.style.setProperty("--gap","4mm");
  if(!packDraft){ g.innerHTML=""; return; }
  const copies=Math.min(50,Math.max(1,+$("#packCopies").value||1));
  const lay=packLayout(packDraft);
  let html="";
  for(let i=0;i<copies;i++) html+='<div class="strip-copy">'+stripHTML(packDraft,lay.panels)+'</div>';
  g.innerHTML=html;
}

/* tabs */
function setTab(t){
  state.tab=t; document.body.dataset.tab=t;
  $$(".tabrow button").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.tab===t)));
  $$(".panel").forEach(p=>{p.hidden=p.id!=="p-"+t});
  if(t==="sheet"){ $("#sheet-out").classList.remove("packs"); renderSheet(); }
  if(t==="packs"){ renderPacks(); renderPackPreview(); }
  if(t==="guide") $("#ioBox").value=JSON.stringify({biz:state.biz,scents:state.scents,packs:state.packs},null,1);
}
$$(".tabrow button").forEach(b=>b.addEventListener("click",()=>setTab(b.dataset.tab)));

/* top-level controls */
SIZES.forEach(z=>{
  $("#sizePreset").insertAdjacentHTML("beforeend",'<option value="'+z.id+'">'+esc(z.label)+'</option>');
  $("#sheetSize").insertAdjacentHTML("beforeend",'<option value="'+z.id+'">'+esc(z.label)+'</option>');
});
$("#sizePreset").addEventListener("change",e=>{state.size=e.target.value;$("#sheetSize").value=e.target.value;renderPreview();renderSheet()});
$("#sheetSize").addEventListener("change",e=>{state.size=e.target.value;$("#sizePreset").value=e.target.value;renderPreview();renderSheet()});
$("#fsize").addEventListener("change",e=>{state.fs=+e.target.value;$("#sheetFs").value=e.target.value;renderPreview();renderSheet()});
$("#sheetFs").addEventListener("change",e=>{state.fs=+e.target.value;$("#fsize").value=e.target.value;renderPreview();renderSheet()});
$("#redName").addEventListener("change",e=>{state.redName=e.target.checked;renderPreview();renderSheet()});

$("#scentSearch").addEventListener("input",e=>{state.search=e.target.value;renderScents()});
$("#addScent").addEventListener("click",()=>{
  const n=blank(); state.scents.push(n); select(n.id); persist(n); renderQty();
  setTimeout(()=>$("#e-name")&&$("#e-name").focus(),30);
});
$("#scentList").addEventListener("click",e=>{
  const p=e.target.closest("[data-id]"); if(p) return select(p.dataset.id);
  const d=e.target.closest("[data-del]"); if(d) delScent(d.dataset.del);
});
$("#qtyBody").addEventListener("input",e=>{
  const i=e.target.closest("[data-qty]"); if(!i) return;
  state.qty[i.dataset.qty]=Math.max(0,Math.min(200,+i.value||0)); renderSheet();
});
["x","y"].forEach(k=>$("#nudge"+k.toUpperCase()).addEventListener("change",e=>{
  state.nudge[k]=Math.max(-10,Math.min(10,Math.round((+e.target.value||0)*10)/10)); e.target.value=state.nudge[k]; lsWrite(); renderSheet();
}));
$("#clearQty").addEventListener("click",()=>{state.qty={};renderQty()});
$("#printSheet").addEventListener("click",()=>{ $("#sheet-out").classList.remove("packs"); renderSheet(); window.print(); });
$("#addPack").addEventListener("click",()=>{
  const n=blankPack(); state.packs.push(n); selectPack(n.id); queuePackSave(true);
  setTimeout(()=>$("#pk-name")&&$("#pk-name").focus(),30);
});
$("#packSearch").addEventListener("input",renderPacks);
$("#packList").addEventListener("click",e=>{
  const p=e.target.closest("[data-pack]"); if(p) return selectPack(p.dataset.pack);
  const d=e.target.closest("[data-delpack]"); if(d) delPack(d.dataset.delpack);
});
$("#packCopies").addEventListener("change",renderPackSheet);
$("#printPacks").addEventListener("click",()=>{ renderPackSheet(); window.print(); });
/* Ctrl+P prints whatever the open tab is about. */
addEventListener("beforeprint",()=>{ if(state.tab==="packs") renderPackSheet(); else { $("#sheet-out").classList.remove("packs"); renderSheet(); } });
/* Measurements depend on the real font, so lay out again once it has arrived. */
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{ if(state.tab==="packs") renderPackPreview(); renderPreview(); });
$("#ioCopy").addEventListener("click",async()=>{
  try{ await navigator.clipboard.writeText($("#ioBox").value); $("#ioMsg").textContent="Copied."; }
  catch(e){ $("#ioBox").select(); $("#ioMsg").textContent="Press Ctrl+C to copy."; }
  setTimeout(()=>$("#ioMsg").textContent="",2500);
});
$("#ioLoad").addEventListener("click",()=>{
  try{
    const d=JSON.parse($("#ioBox").value);
    if(d.biz) state.biz={...state.biz,...d.biz};
    if(Array.isArray(d.scents)) state.scents=d.scents.map(s=>({...blank(),...s,id:s.id||uid()}));
    if(Array.isArray(d.packs)) state.packs=d.packs.map(p=>({...blankPack(),...p,id:p.id||uid()}));
    lsWrite();
    select(state.scents.length?state.scents[0].id:null);
    renderBiz(); renderQty(); renderPreview();
    $("#ioMsg").textContent="Loaded "+state.scents.length+" fragrances. Saving…";
    /* Replaces the stored list outright, which is what loading a backup means. */
    send("PUT",{business:state.biz,labels:state.scents,packs:state.packs.map(cleanPack)},"The list was not saved")
      .then(()=>{ $("#ioMsg").textContent="Loaded and saved "+state.scents.length+" fragrances."; })
      .catch(e=>{ $("#ioMsg").textContent="Loaded on screen, but not saved: "+e.message; });
  }catch(e){ $("#ioMsg").textContent="That isn't valid data."; }
  setTimeout(()=>$("#ioMsg").textContent="",6000);
});

/* ---------------------------------------------------------------- boot */
const cached=lsRead();
if(cached){ if(cached.biz) state.biz={...state.biz,...cached.biz}; if(Array.isArray(cached.scents)) state.scents=cached.scents; if(Array.isArray(cached.packs)) state.packs=cached.packs; if(cached.nudge) state.nudge={x:+cached.nudge.x||0,y:+cached.nudge.y||0}; }
$("#nudgeX").value=state.nudge.x; $("#nudgeY").value=state.nudge.y;
renderBiz(); renderScents(); renderEditor(); renderPreview(); renderQty(); setTab("labels");

(async()=>{
  saveState("busy","Loading…");
  try{
    const { business, labels, packs } = await api("GET");
    if(business) state.biz={...state.biz,...business};
    if(Array.isArray(labels)) state.scents=labels.map(s=>({...blank(),...s}));
    if(Array.isArray(packs)) state.packs=packs.map(p=>({...blankPack(),...p}));
    if(packDraft&&!state.packs.some(p=>p.id===packDraft.id)) packDraft=null;
    lsWrite();
    if(state.selId&&!state.scents.some(s=>s.id===state.selId)) state.selId=null;
    renderBiz(); renderScents(); renderQty();
    select(state.selId||(state.scents.length?state.scents[0].id:null));
    saveState("ok", state.scents.length+" fragrance"+(state.scents.length===1?"":"s")+" loaded");
  }catch(e){
    saveState("bad","Could not load your fragrances — "+e.message+". Anything you change now may not be saved.");
    renderPreview();
  }
})();
