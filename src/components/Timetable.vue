<template>
  <div>

	<b>timetable unfinished:</b> <br>

	<!-- this should be a computed value -->
	<div v-for="key in Object.keys(timetable)" :key="key">
		{{ key }}
		<div v-for="(date, index) in timetable" :key="date">
			<div v-if="index == key ">{{ date }}</div>
		</div>
	</div>

  </div>

</template>

<script>
import jsonData from "./../assets/dates.JSON";

export default {
  data() {
	return{
		jsonDates : jsonData
	}
    
  },
  computed: {
    timetable() {
      let i = 0 
      let dates = []
      let datesf
      let split = []
      let map = {}
      

      //builds timetable for each JSON start to end
      for (; i < Object.keys(this.jsonDates.available).length; i++) {
        dates.push(
          this.getDates(
            new Date(this.jsonDates.available[i].start),
            new Date(this.jsonDates.available[i].end)
          )
        );
      }
      // flattens all out - for accesibility
      datesf = dates.flat();

      // splits the dates from hours 
      // '03 9:30' -> ['03', '9:30'] 
      for (i = 0; i < Object.keys(datesf).length; i++) {
        split[i] = datesf[i].split(" ");
      }

      // loops through each array
      for (i = 0; i < Object.keys(datesf).length; i++) {
        let splitd = split[i];
        let dateNumber = splitd[0];
        let dateValue = splitd[1];

        // if no date - make date + push hour
        // else just push hour
        if (!map[dateNumber]) {
          map[dateNumber] = [];
          map[dateNumber].push(dateValue);
        } else {
          map[dateNumber].push(dateValue);
        }
      }

      return map;
      // { '03': ['9:30', '10:00'], '04': ['8:00'] }
    } 
  },
  methods: {
    getDates(startDate, endDate) {
      let dates = []
      let currentDate = startDate

      //use Date to increment time
      function add30min() {
          let date = new Date(this.valueOf())
          date.setMinutes(date.getMinutes() + 30)
          return date
        }
        //pushes string -> '03 9:30'
      while (currentDate <= endDate) {
        dates.push(
          currentDate.getDate() + " " +
          currentDate.getHours() + ":" +
          currentDate.getMinutes()
        )
        currentDate = add30min.call(currentDate);
      }
      return dates;
    }
  },
};
</script>
