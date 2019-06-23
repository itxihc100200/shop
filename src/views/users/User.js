export default {
    data() {
        // 验证用户名是否唯一
        /*
            rule: 这条规则对象
            value：要验证的值
            callback：回调函数，必须要调用
        */
        let validateNameExists = async (rule, value, callback) => {
            let exists = await this.axios.get('/users/exists/' + value)
            if (exists.data.meta.status == 200) {
                callback('用户已存在')
            } else {
                callback()
            }
        }
        return {
            adduserRules: {
                username: [{
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    },
                    {
                        validator: validateNameExists,
                        trigger: 'blur'
                    }
                ],
                password: [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }],
                email: [{
                        required: true,
                        message: '邮箱不能为空',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: '请输入正确邮箱地址',
                        trigger: ['blur', 'change']
                    }
                ],
                mobile: [{
                        required: true,
                        message: '手机号码不能为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^1[345789]\d{9}$/,
                        message: '手机格式不正确',
                        trigger: ['blur', 'change']
                    }
                ]
            },

            edituserRules: {
                 email: [{
                        required: true,
                        message: '邮箱不能为空',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: '请输入正确邮箱地址',
                        trigger: ['blur', 'change']
                    }
                ],
                mobile: [{
                        required: true,
                        message: '手机号码不能为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^1[345789]\d{9}$/,
                        message: '手机格式不正确',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            dialogFormVisible: false,
            adduserform: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            edituserdialog:false,
            editform:{
                id:'',
                username: '',
                email: '',
                mobile: ''
            },
            searchKey: '',
            userlist: [],
            queryinfo: {
                query: '',
                pagenum: 1,
                pagesize: 2
            },
            total: 0 //总记录数
        }
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
    created() {
        this.getData()
    },
    methods: {
        edituserform(data){
            this.editform.id=data.id
            this.editform.username=data.username
            this.editform.email=data.email
            this.editform.mobile=data.mobile

            this.edituserdialog=true
        },
        // 添加用户
        add(){
             this.$refs.adduserRef.validate(async c=>{
                 if(c){
                    const res = await this.axios.post('/users',this.adduserform)
                    console.log( res )
                    if(res.data.meta.status == 201){
                        this.$message.success('添加成功')
                        // 重新获取数据
                        this.getData()
                        // 关闭框
                        this.dialogFormVisible = false
                    }
                 }
            })
        },
        // 修改用户
        edit(){
            this.$refs.edituserRef.validate(async e=>{
                if(e){
                   const res=await this.axios.put('/users/'+this.editform.id ,this.editform)
                   console.log(res)
                   if(res.data.meta.status == 200){
                    this.$message.success('修改成功')
                    // 重新获取
                    this.getData()
                    // 关闭框
                    this.edituserdialog = false
                   }
                }
            })
        },
        // 删除用户
        del(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async () => {
                const res = await this.axios.delete(`/useers/${id}`)
                console.log(res)
                if(res.data.meta.status==200){
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                    this.getData()
                }else{
                    this.$message.error('删除失败,失败原因:'+res.data.meta.msg)
                }
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
        },
        // 设置状态按钮
        async changestate(val, row) {
            let res = await this.axios.put(`/users/${row.id}/state/${val}`)
            console.log(res)
            if (res.data.meta.status != 200) {
                this.$message.error('更新状态失败')
                setTimeout(() => {
                    row.mg_state = !row.mg_state
                }, 500)
            }
        },
        async getData() {
            let {
                data: res
            } = await this.axios.get('/users', {
                params: this.queryinfo
            })
            // console.log(res)
            if (res.meta.status != 200) return this.$message.error('用户数据获取失败')
            //    设置用户数据
            this.userlist = res.data.users
            this.total = res.data.total
        },
        handleSizeChange(vel) {
            this.queryinfo.pagesize = vel
        },
        handleCurrentChange(vel) {
            this.queryinfo.pagenum = vel
        }
    },
}