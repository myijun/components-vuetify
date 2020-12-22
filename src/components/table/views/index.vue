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
        <m-table-top :table="table">
          <template #card>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="table.editedItem.title" label="title"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="table.editedItem.price" label="price"></v-text-field>
              </v-col>
            </v-row>
          </template>
        </m-table-top>
      </template>

      <template #item.actions="{ item }">
        <v-icon small class="mr-2" @click="table.editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="table.deleteItem(item)">mdi-delete</v-icon>
      </template>

      <template #item.thumb="{ item }">
        <a :href="item.thumb" target="block">
          <img :src="item.thumb" :alt="item.title" :title="item.title" />
        </a>
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
import MTableTop from "../src/MTableTop";

let table = new proxyTable({
  getURL:
    "https://www.fastmock.site/mock/496f07e3a4c2fb5cf51acbac5a6f0d0e/fcmi/estate/list",
  delURL:
    "https://www.fastmock.site/mock/496f07e3a4c2fb5cf51acbac5a6f0d0e/fcmi/normal/remove",
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
      uuid: 123123123
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