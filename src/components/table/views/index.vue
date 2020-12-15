<template>
  <div>
    <!-- <x-data-table action="assets/json/table.json"></x-data-table> -->


    <!-- start:表单列表功能 -->
    <v-data-table
      :headers="table.headers"
      :items="table.items"
      :items-per-page="table.pageSize"
      :server-items-length="table.total"
      @update:page="updatePage"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>编辑/新增</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <!-- start toolbar  -->
          <slot name="toolbar">
            <v-dialog v-model="table.dialog" max-width="500px">
              <template #activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">添加数据</v-btn>
              </template>
            </v-dialog>
          </slot>
        </v-toolbar>
      </template>
      <template #item.actions="{ item }">
        <v-icon small class="mr-2" @click="table.editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="table.deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template #no-data>
        <v-btn color="primary" @click="table.pullData">重试</v-btn>
      </template>
    </v-data-table>
    <!-- end:表单功能 -->




    <!-- <ex-table action="assets/json/table.json">
      <template v-slot:item.name="{ item }">
        <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip>
      </template>
    </ex-table>-->
  </div>
</template>
<script>
import proxyTable from "../src/proxyTable";
import Vue from "vue";
let table = new proxyTable({
  action: "assets/json/table.json",
  $http: Vue.prototype.$http
});

export default {
  data() {
    return {
      desserts: [],
      table: table
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.table.mounted();
    });
  },
  methods: {
    deleteItem(item) {
      console.log(item);
    },
    updatePage(page) {
      this.table.updatePage(page);
    }
  },
  name: "view-table",
  computed: {
    // items() {
    //   return table.items;
    // }
  }
};
</script>