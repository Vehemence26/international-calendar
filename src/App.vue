<template>
  <div id="app" class="l-grid-container">

    <div class="l-title">
      <h1>{{ $t("calendar.available") }}</h1>
      <LanguageSwitcher></LanguageSwitcher>
    </div>

    <Calendar></Calendar>

  </div>
</template>

<script>
import Calendar from "./components/Calendar.vue";
import LanguageSwitcher from "./components/LanguageSwitcher.vue";


export default {
  name: "App",
  components: {
    Calendar,
    LanguageSwitcher
  }
};
</script>

<style></style>
