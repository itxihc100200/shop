export default {
    data() {
        return {
            searchKey: '',
            datalist: [],
            queryinfo: {
                query: '',
                pagenum: 1,
                pagesize: 2
            },
            total: 0, //总记录数
            
            addclickform: false,
           
        }

    },
    created() {
        this.getData()
    },
     // 定义监听器
     watch: {
        queryinfo: {
            deep: true,
            handler() {
                this.getData()
            }
        }
    },
    methods: {
    //    分页-每页显示条数
        handleSizeChange(vel) {
            this.queryinfo.pagesize = vel
        },
        // 更新分页数据
        handleCurrentChange(vel) {
            this.queryinfo.pagenum = vel
        }
    },
}