<template>
  <div>
    <extable action="assets/json/table.json">
      <template v-slot:top></template>
    </extable>
  </div>
</template>
<script>
import extable from "../src/table";
export default {
  data() {
    return {
      tableHeader: [
        {
          text: "名称",
          value: "name"
        }
      ]
    };
  },
  methods: {
    deleteItem(item) {
      console.log(item);
    }
  },
  name: "view-table",
  components: {
    extable
  }
};
</script>