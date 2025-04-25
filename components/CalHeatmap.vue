<script setup lang="ts">
import { onMounted } from 'vue';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import LegendLite from 'cal-heatmap/plugins/LegendLite';
import CalendarLabel from 'cal-heatmap/plugins/CalendarLabel';
import dayjs from 'dayjs';
import 'cal-heatmap/cal-heatmap.css';

const cal = new CalHeatmap();

// Generate fake temperature max data for each day in 2012
function generateSampleData() {
  const startDate = new Date('2012-01-01');
  const endDate = new Date('2012-12-31');
  const data = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    data.push({
      date: new Date(d),
      temp_max: Math.floor(Math.random() * 35), // 0 to 34°C
    });
  }

  return data;
}

function paintCalendar() {
  const data = generateSampleData();

  cal.paint(
    {
      data: {
        source: data,
        type: 'json',
        x: 'date',
        y: d => +d['temp_max'],
        groupY: 'max',
      },
      date: { start: new Date('2012-01-01') },
      range: 12,
      itemSelector: '#ex-ghDay',
      scale: {
        color: {
          type: 'threshold',
          range: ['#14432a', '#166b34', '#37a446', '#4dd05a'],
          domain: [10, 20, 30],
        },
      },
      domain: {
        type: 'month',
        gutter: 4,
        label: { text: 'MMM', textAlign: 'start', position: 'top' },
      },
      subDomain: {
        type: 'ghDay',
        radius: 2,
        width: 11,
        height: 11,
        gutter: 4,
      },
    },
    [
      [
        Tooltip,
        {
          text: (date: Date, value: number, dayjsDate: dayjs.Dayjs) =>
            (value ?? 'No') + ' contributions on ' + dayjsDate.format('dddd, MMMM D, YYYY'),
        },
      ],
      [
        LegendLite,
        {
          includeBlank: true,
          itemSelector: '#ex-ghDay-legend',
          radius: 2,
          width: 11,
          height: 11,
          gutter: 4,
        },
      ],
      [
        CalendarLabel,
        {
          width: 30,
          textAlign: 'start',
          text: () => dayjs.weekdaysShort().map((d, i) => (i % 2 === 0 ? '' : d)),
          padding: [25, 0, 0, 0],
        },
      ],
    ]
  );
}

function handlePrev(e: Event) {
  e.preventDefault();
  cal.previous();
}

function handleNext(e: Event) {
  e.preventDefault();
  cal.next();
}

onMounted(() => paintCalendar());
</script>

<template>
  <div
    style="
      background: #22272d;
      color: #adbac7;
      border-radius: 3px;
      padding: 1rem;
      overflow: hidden;
    "
  >
    <div id="ex-ghDay" class="margin-bottom--md"></div>

    <a
      class="button button--sm button--secondary margin-top--sm"
      href="#"
      @click="handlePrev"
    >
      ← Previous
    </a>
    <a
      class="button button--sm button--secondary margin-top--sm margin-left--xs"
      href="#"
      @click="handleNext"
    >
      Next →
    </a>

    <div style="float: right; font-size: 12px">
      <span style="color: #768390">Less</span>
      <div
        id="ex-ghDay-legend"
        style="display: inline-block; margin: 0 4px"
      ></div>
      <span style="color: #768390; font-size: 12px">More</span>
    </div>
  </div>
</template>
