// declarations.d.ts
declare module "lodash.debounce" {
  import { debounce } from "lodash";
  export default debounce;
}

declare module "cal-heatmap/plugins/Tooltip" {
  import { Plugin } from "cal-heatmap";
  export default class Tooltip extends Plugin {}
}

declare module 'cal-heatmap' {
  import CalHeatmap from 'cal-heatmap/dist/cal-heatmap.esm.js';
  export * from 'cal-heatmap/dist/cal-heatmap.esm.js';
  export default CalHeatmap;
}

declare module 'cal-heatmap/plugins/LegendLite';
declare module 'cal-heatmap/plugins/CalendarLabel';