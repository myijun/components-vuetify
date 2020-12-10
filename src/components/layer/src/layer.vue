<template>
  <component :is="getActiveName"></component>
</template>


<script>
import alert from "./alert";
export default {
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    getActiveName() {
      return "alert";
    }
  },
  components: {
    alert
  }
};
</script>