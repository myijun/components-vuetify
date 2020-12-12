<template>
  <v-data-table
    :headers="tableHeader == false?defaultTableHeader:tableHeader"
    :items="tableData"
    :items-per-page="pageSize"
    :server-items-length="total"
    @update:page="updatePage"
    class="elevation-1"
  >
    <slot name="top" slot="top">
      <v-toolbar flat>
        <v-toolbar-title>编辑/新增</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- start toolbar  -->
        <slot name="toolbar">
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">添加数据</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">编辑</span>
              </v-card-title>
              <v-card-text>
                <v-container>未定义编辑新增表单数据!</v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                <v-btn color="blue darken-1" text @click="save">保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </slot>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">是否确实要删除此数据?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </slot>
    <!-- end slot -->

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>

    <!--  -->

    <template v-slot:no-data>
      <v-btn color="primary" @click="__construct">重试</v-btn>
    </template>

    
  </v-data-table>
</template>

<script>
// import VDataTable from "vuetify/lib/components/VDataTable/VDataTable";
export default {
  name: "ex-table",
  props: {
    action: String,
    getQueryData: {
      type: Function,
      default: () => {
        return [];
      }
    },
    tableHeader: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      defaultTableHeader: [{ text: "id", value: "id", default: true }],
      tableData: [],
      totalpage: 0,
      total: 1000,
      pageSize: 15,
      currentPage: 1,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {}
    };
  },
  watch: {
    tableData: function() {
      if (this.tableHeader.length || !this.tableData.length) {
        return;
      }
      let tableHead = [];
      for (let key in this.tableData[0]) {
        tableHead.push({
          text: key,
          value: key
        });
      }
      tableHead.push({ text: "编辑", value: "actions", sortable: false });
      this.defaultTableHeader = tableHead;
    }
  },
  methods: {
    closeDelete() {
      //this.dialogDelete = false;
    },
    deleteItemConfirm() {
      this.closeDelete();
    },
    close() {},
    save() {},
    deleteItem(item) {
      this.editedIndex = this.tableData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    editItem(item) {
      this.editedIndex = this.tableData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    __construct() {
      this.pullData();
    },
    updatePage(r) {
      this.pullData(r);
    },
    async pullData(page) {
      var queryData = {
        page: page
      };
      const { data } = await this.$http.get(
        this.action,
        this.$qs.stringify(queryData)
      );
      this.tableData = data;
    }
  },
  created() {
    this.__construct();
  }
};
</script>