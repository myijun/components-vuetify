<template>
  <div>
    <!-- <x-data-table action="assets/json/table.json"></x-data-table> -->
    <input type="text" style="background:red" v-model="table.chooseIndex" />
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
        <!-- <v-toolbar flat>
          <v-toolbar-title>编辑/新增</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="table.dialog" max-width="500px">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">添加数据</v-btn>
            </template>
          </v-dialog>
        </v-toolbar>-->
        <m-table-top :table="table"></m-table-top>
      </template>

      <template #item.actions="{ item }">
        <v-icon small class="mr-2" @click="table.editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="table.deleteItem(item)">mdi-delete</v-icon>
      </template>

      <template #item.thumb="{ item }">
        <img :src="item.thumb" alt />
      </template>

      <template #no-data>
        <v-btn color="primary" @click="table.pullData">重试</v-btn>
      </template>
    </v-data-table>

    <!-- end:表单功能 -->
  </div>
</template>
<script>
import proxyTable from "../src/proxyTable";
import Vue from "vue";
import MTableTop from "../src/MTableTop";

let table = new proxyTable({
  getURL:
    "https://www.fastmock.site/mock/496f07e3a4c2fb5cf51acbac5a6f0d0e/fcmi/estate/list",
  delURL:
    "https://www.fastmock.site/mock/496f07e3a4c2fb5cf51acbac5a6f0d0e/fcmi/normal/remove",
  $http: Vue.prototype.$http,
  pullDataBefore: vm => {
    return {
      size: table.pageSize,
      uuid: vm.uuid
    };
  }
});

export default {
  data() {
    return {
      desserts: [],
      table: table,
      uuid: 123
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.table.mounted();
    });
    table.bind(this);
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
  computed: {},
  components: {
    MTableTop
  }
};
</script>