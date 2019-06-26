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
       
        handleSizeChange(vel) {
            this.queryinfo.pagesize = vel
        },
        handleCurrentChange(vel) {
            this.queryinfo.pagenum = vel
        }
    },
}