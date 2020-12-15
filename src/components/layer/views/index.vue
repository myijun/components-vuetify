<template>
  <div>
    <v-btn class="ma-2" color="secondary" @click="callback">Accept Terms</v-btn>
  </div>
</template>
<script>
import alerts from "../src/layer.js";

export default {
  data() {
    return {
      dialog: false
    };
  },
  name: "layer",
  methods: {
    callback: () => {
      alerts().then(willDelete => {
        if (willDelete) {
          alert(2);
        } else {
          alert(1);
        }
      });
    }
  }
};
</script>