import MQuillEditor from 'vue-m-quill-editor'
export default {
    components: {
        MQuillEditor
    },
    data() {
        return {
            // 编辑器
           
            quill: {
                width: 800,
                border: false,
                content: 'wellcome ~',
                syncOutput: true,
                theme: 'snow', //bubble snow
                disabled: false,
                full: false,
               
            },
            headerstoten: {
                Authorization: sessionStorage.getItem('token')
            },
            goodsparamvalues: [],
            goodsattrs: [],
            goodsparam: [],
            catlist: [],
            active: '0',

            // 定义表单数据
            addform: {
                goods_name: '',
                goods_price: '',
                goods_weight: '',
                goods_number: '',
                goods_cat: '',
                goods_introduce: '',
                pics: {},
                attrs: [],
            },
            // 过滤数据
            addformRules: {
                goods_name: [{
                        required: true,
                        message: '商品名称不能为空',
                        trigger: 'blur'
                    },

                ],
                goods_price: [{
                    required: true,
                    message: '商品价格不能为空',
                    trigger: 'blur'
                }],
                goods_weight: [{
                        required: true,
                        message: '商品重量不能为空',
                        trigger: 'blur'
                    },

                ],
                goods_number: [{
                        required: true,
                        message: '商品数量不能为空',
                        trigger: 'blur'
                    },

                ]
            },

        }


    },
    async created() {
        let {
            data: res
        } = await this.axios.get("/categories")
        // console.log(res)
        if (res.meta.status != 200) return this.$message.error('获取分类列表失败')
        this.catlist = res.data
    },
    methods: {
        // 上传文件
        addupload (file, insert) {
            console.log(file)
            insert('https://avatars0.githubusercontent.com/u/11366654?s=460&v=4', 'center')
          },
        uploadsuccess(response, file, fileList) {
            console.log(response, file, fileList)
            if (response.meta.status != 200) {
                setTimeout(() => {
                    fileList.splice(fileList.findIndex(v => v.uid = file.uid), 1)
                }, 500)

                return this.$message.error('上传失败')
            }
        },
        async handleChange(lve) {
            // console.log(lve)
            let id = lve[lve.length - 1]

            // 调接口取出商品属性
            let attrData = await this.axios.get(`/categories/${id}/attributes`, {
                params: {
                    sel: 'only'
                }
            })
            console.log(attrData)
            if (attrData.data.meta.status != 200) return this.$message.error('获取属性失败')
            this.goodsattrs = attrData.data.data

            // 调取接口获取商品参数
            let goodsparam = await this.axios.get(`/categories/${id}/attributes`, {
                params: {
                    sel: 'many'
                }
            })
            console.log(goodsparam)
            if (goodsparam.data.meta.status != 200) return this.$message.error('获取商品参数失败')
            this.goodsparam = goodsparam.data.data
        },
        async getData() {
            let {
                data: res
            } = await this.axios.get('/goods', {
                params: this.queryinfo
            })
            // console.log(res)
            if (res.meta.status != 200) return this.$message.error('商品数据获取失败')
            //    设置商品数据
            this.datalist = res.data.goods
            this.total = res.data.total
        },
        // 添加商品
        add() {
            // 验证表单数据
            this.$refs.addgoodsRef.validate(async v => {
                if (v) {
                    //goods-cat和三级联动绑定的,默认是数组,用join转化为以','隔开的字符串
                    this.addform.goods_cat = this.addform.goods_cat.join(',')
                    const res = await this.axios.post('/goods', this.addform)
                    console.log(res)
                    if (res.data.meta.status != 201) return this.$message.error('添加商品失败')

                    this.getData()
                    this.$message.success('添加成功')

                    this.addclickform = false
                }
            })
        },
        handleSizeChange(vel) {
            this.queryinfo.pagesize = vel
        },
        handleCurrentChange(vel) {
            this.queryinfo.pagenum = vel
        },
        // 必须选择分类才能切换
        beforeleave(activeName, oldActiveName) {
            // console.log(activeName, oldActiveName)
            // if (oldActiveName == 0 && this.addform.goods_cat.length == 0) {
            //     this.$message.error('必须选择三级分类')
            //     return false
            // }
        }
    },
}