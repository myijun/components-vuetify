<template>
  <v-toolbar flat>
    <v-toolbar-title>编辑/新增</v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-spacer></v-spacer>
    <v-dialog v-model="table.dialog" max-width="500px">
      <template #activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">添加数据</v-btn>
      </template>
    </v-dialog>
  </v-toolbar>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    table: Object
  },
  name: "m-table-top",
  methods: {}
};
</script>