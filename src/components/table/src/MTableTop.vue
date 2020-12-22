<template>
  <v-toolbar flat>
    <v-toolbar-title>编辑/新增</v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-spacer></v-spacer>
    <v-dialog v-model="table.dialog" max-width="900px">
      <template #activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">添加数据</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{table.headline.title||'?'}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <slot name="card"></slot>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onCancel">取消</v-btn>
          <v-btn color="blue darken-1" text @click="onSave">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>
<script>
export default {
  data() {
    return {
      v: {
        a: 1
      }
    };
  },
  props: {
    table: Object
  },
  name: "m-table-top",
  methods: {
    onCancel: function() {      
      this.table.onCancel();
      this.$emit("onCancel");
    },
    onSave:function(){
       this.table.onSave();
       this.$emit("onSave");
    }
  }
};
</script>