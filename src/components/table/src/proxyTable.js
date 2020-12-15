import { xConfirm } from "../../layer/src/layer";

class proxyTable {

    constructor(config) {
        this.config = config;
        this.headers = [];
        this.items = [];
        this.$http = config.$http;
        this.pageSize = 15;
        this.total = 1000;
        this.dialog;
    }

    async editItem(item) {
        console.log(item, this);
    }

    async deleteItem(item) {
        xConfirm().then((v) => {
            if (!v) {
                return false;
            }
            console.log(item, this, v);
        });
    }


    updatePage(page) {
        this.pullData(page);
    }

    mounted() {
        this.pullData(1);
    }


    async pullData() {
        const { data } = await this.$http.get(
            this.config.action
        );
        this.items = data;
        if (this.headers.length || !this.items.length) {
            return;
        }
        let tableHead = [];
        for (let key in this.items[0]) {
            tableHead.push({
                text: key,
                value: key
            });
        }
        tableHead.push({ text: "编辑", value: "actions", sortable: false });
        this.headers = tableHead;
    }



}

export default proxyTable;

