<template>
  <div class="l-lang-switch">
    <form class="pure-form">
      <select class="stacked-state" v-model="$i18n.locale">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{
          lang
        }}</option>
      </select>
    </form>
  </div>
</template>

<script>
export default {
  name: "lang-switch",
  data() {
    return { langs: ["zh-TW", "en"] };
  }
};
</script>
