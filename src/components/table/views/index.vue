<template>
  <div>
    <extable action="assets/json/table.json">
      <template v-slot:top>
        
      </template>
    </extable>
    <extable action="assets/json/table2.json"></extable>
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
  name: "view-table",
  components: {
    extable
  }
};
</script>