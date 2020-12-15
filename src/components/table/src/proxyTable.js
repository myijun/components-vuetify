import { xConfirm } from "../../layer/src/layer";
import qs from 'qs'
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

    /**
     * 
     * @param {Object} item  删除项目
     */
    async deleteItem(item) {
        xConfirm().then((v) => {
            if (!v) {
                return false;
            }
            this.$http.post(
                this.$http.post(
                    this.config.delURL,
                    qs.stringify(item)
                )
            );
        });
    }


    updatePage(page) {
        this.pullData(page);
    }

    mounted() {
        this.pullData(1);
    }

    /**
     * 获取数据
     */
    async pullData() {
        const { data } = await this.$http.get(
            this.config.getURL
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

