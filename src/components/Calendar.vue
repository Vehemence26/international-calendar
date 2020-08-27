<template>
  <div class="l-main">

    <div class="l-paginator">
      <button class="pure-button" 
        @click="weekDown()" 
        :disabled="isInitialWeek">
        🡠
      </button>
      <button class="pure-button" 
      @click="weekUp()"> 
        🡢
      </button>
      
      <p> {{ dateString }} </p>

    </div>

    <div class="l-timezone">
      <p>{{ $t("calendar.timezone", { TZ: userTimezone }) }}</p>
    </div>

    <div class="l-calendar">
      <div v-for="(day, index) in currentWeek" :key="day">
        <div class="is-available">
          <h4>
            {{ $t("calendar.days[" + index + "]") }} <br />
            {{ day }}
          </h4>
        
        </div>
           
      </div>

    </div>
<Timetable>
</Timetable>

  </div>
</template>

<script>

import Timetable from './Timetable.vue'

export default {
  data: function() {
    return {
      currentDate: {
        date: 0,
        month: 0,
        year: 0
      },
      initialDate: {
        date: 0,
        month: 0,
        year: 0
      },
      timetable: Timetable
    };
  },
  computed: {
    dateString() {
      return this.currentDate.year + "/" + 
        this.format(this.currentDate.month + 1) + "/" + 
        this.currentWeek[0] + " - " +
        this.currentWeek[6]
    },
    isInitialWeek() {
      return (
        JSON.stringify(this.currentDate) === JSON.stringify(this.initialDate)
      );
    },
    currentWeek() {
      let i = 0;
      const weekArray = [];
      let day = this.currentDate.date;
      for (; i < 7; i++) {
        if (day === this.currentMonthDays + 1) {
          day = 1;
        }
        weekArray.push(this.format(day));
        day++;
      }
      return weekArray;
    },
    prevMonthDays() {
      const year =
        this.currentDate.month === 0
          ? this.currentDate.year - 1
          : this.currentDate.year;
      const month = this.currentDate.month === 0 ? 12 : this.currentDate.month;
      return new Date(year, month, 0).getDate();
    },
    currentMonthDays() {
      return new Date(
        this.currentDate.year,
        this.currentDate.month + 1,
        0
      ).getDate();
    },
    userTimezone() {
      let regex = new RegExp("([A-Z]+[+-][0-9]+)");

      let userTimezoneShort = new Date().toString().match(regex)[1];

      return " (" + userTimezoneShort + ")";
    }
  },
  methods: {
    format(date) {
      if (date < 10) return "0" + date;
      else return date;
    },
    getCurrentDate() {
      const today = new Date();
      this.currentDate.date = today.getDate() - today.getDay();
      this.currentDate.month = today.getMonth();
      this.currentDate.year = today.getFullYear();

      this.initialDate.date = today.getDate() - today.getDay();
      this.initialDate.month = today.getMonth();
      this.initialDate.year = today.getFullYear();
    },
    weekUp() {
      let i = 0;
      for (; i < 7; i++) {
        if (this.currentDate.date === this.currentMonthDays) {
          this.currentDate.date = 1;
          this.monthUp();
        } else {
          this.currentDate.date += 1;
        }
      }
    },
    weekDown() {
      let i = 0;
      for (; i < 7; i++) {
        if (this.currentDate.date === 1) {
          this.currentDate.date = this.prevMonthDays;
          this.monthDown();
        } else {
          this.currentDate.date -= 1;
        }
      }
    },
    monthUp() {
      if (this.currentDate.month === 11) {
        this.currentDate.month = 0;
        this.currentDate.year += 1;
      } else {
        this.currentDate.month += 1;
      }
    },
    monthDown() {
      if (this.currentDate.month === 0) {
        this.currentDate.month = 11;
        this.currentDate.year -= 1;
      } else {
        this.currentDate.month -= 1;
      }
    }
  },
  components: {
    Timetable
  },
  created() {
    this.getCurrentDate();
  }
};
</script>
<style type="text/css"></style>
