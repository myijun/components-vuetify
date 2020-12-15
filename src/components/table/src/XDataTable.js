import VDataTable from "vuetify/lib/components/VDataTable/VDataTable";
import mixins from 'vuetify/lib/util/mixins'
export default mixins(VDataTable).extend({
    name: 'x-data-table',
    props: {
        action: String,
    },
    data() {
        return {
            field: "carbs",
            fieldPlaceholder: "item.",
            dialog: false,
            dialogDelete: false,
            defaultTableHeader: [{ text: "id", value: "id", default: true }],
            tableData: [],
            totalpage: 0,
            total: 1000,
            pageSize: 15,
            currentPage: 1,
        }
    },
    methods: {
        __construct() {
            this.pullData();
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
            this.action = "";
            console.log(this.$props.items = this.tableData);
        },
    },

    mounted() {
        let that = this;
        this.$nextTick(function () {
            that.__construct();
        });
    }
});