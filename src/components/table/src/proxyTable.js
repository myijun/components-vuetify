import { xConfirm, xError } from "../../layer/src/layer";
import qs from 'qs'
import MRequest from "../../../Maa/MRequest";

class proxyTable {

    constructor(config) {
        this.config = Object.assign({
            xPullBefore: res => {
                if (!MRequest.get(res, 'data', 'list')) {
                    throw Error('获取到的数据为空');
                }
                return MRequest.get(res, 'data', 'list');
            },
            pullDataBefore: () => {
                return {
                    "t": ~new Date
                }
            },
            headers: []
        }, config);
        this.headers = this.config.headers;
        this.items = [];
        this.$http = config.$http;
        this.pageSize = 15;
        this.total = 1000;
        this.page = 1;
        this.dialog;
        this.vm = undefined;
        this.chooseItem = undefined;
        this.chooseIndex = undefined;
    }

    async editItem(item) {
        let index = 0;
        for (let i of this.items) {
            if (i == item) {
                this.chooseIndex = index;
                this.chooseItem = i;
                break;
            }
            index++;
        }
    }

    bind(vm) {
        this.vm = vm;
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
                this.config.delURL,
                qs.stringify(item)
            ).then(res => {
                console.log(res);
            }).catch(() => {
                xError();
            });
        });
    }


    updatePage() {
        this.pullData(this.page++);
    }

    mounted() {
        this.pullData(1);
    }

    /**
     * 获取数据
     */
    async pullData() {

        let postData = {
            page: this.page
        };
        if (typeof this.config.pullDataBefore == 'function') {
            postData = Object.assign(this.config.pullDataBefore.call(this, this.vm) || [], postData);
        }
        const { data } = await this.$http.post(
            this.config.getURL,
            qs.stringify(postData)
        );
        this.page = data.page || this.page++
        this.items = typeof this.config.xPullBefore == 'function' ? this.config.xPullBefore.call(this, data) : data;
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

