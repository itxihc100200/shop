<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">商品管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="15" class="inputstyle">
        <el-col :span="10">
          <el-input
            @keyup.enter.native="queryinfo.query=searchKey"
            placeholder="请输入关键字 "
            v-model="searchKey"
          >
            <el-button @click="queryinfo.query=searchKey" slot="append" icon="el-icon-search"></el-button>-->
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="addclickform=true" type="primary">添加新商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="datalist" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="500"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
        <el-table-column prop="add_time" label="创建时间"></el-table-column>

        <el-table-column prop="address" label="操作">
          <!-- <template slot-scope="data">
            <el-button
              size="mini"
              type="primary"
              @click="edituserform(data.row)"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del(data.row.id)"
              icon="el-icon-delete"
              circle
            ></el-button>
           
          </template>-->
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加商品 -->
    <el-dialog
      width="900px"
      @closed="$refs.addgoodsRef.resetFields()"
      title="添加商品"
      :visible.sync="addclickform"
    >
      <el-form label-position="top" ref="addgoodsRef" :model="addform" :rules="addformRules">
        <!-- active需要的是数字,加-0转换成数字 -->
        <el-steps :active="active-0" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <template>
          <el-tabs :before-leave="beforeleave" tab-position="left" v-model="active">
            <el-tab-pane label="基本信息" name="0">
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="addform.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input v-model="addform.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input v-model="addform.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input v-model="addform.goods_number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" prop="name">
                <el-cascader
                  v-model="addform.goods_cat"
                  :options="catlist"
                  :props="{ label:'cat_name', value:'cat_id', expandTrigger: 'hover' }"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="1">
              <div v-for="(item, index) in goodsparam" :key="index">
                <h3>{{item.attr_name}}</h3>
                <div>
                  <el-checkbox-group v-model="goodsparamvalues" size="small">
                    <el-checkbox
                      :label="item1"
                      v-for="(item1, index1) in item.attr_vals.split(' ')"
                      :key="index1"
                      border
                    ></el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="2">
              <el-form-item
                v-for="(item, index) in goodsattrs"
                :key="index"
                :label="item.attr_name"
              >
                <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="3">
              <el-upload
                :action="axios.defaults.baseURL+'/upload'"
                :headers="headerstoten"
                :on-success="uploadsuccess"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
              <template>
                <m-quill-editor
                  
                  :has-border="quill.border"
                  v-model="addform.goods_introduce"
                  :sync-output="quill.syncOutput"
                  :theme="quill.theme"
                  :disabled="quill.disabled"
                  :fullscreen="quill.full"
                 
                  @upload="addupload"
                ></m-quill-editor>
              </template>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addclickform = false">取 消</el-button>
        <el-button @click="add" type="primary" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
            
     

<script>
import Datalist from "../Datalist.js";
import Goods from "./Goods.js";

export default {
  mixins: [Datalist, Goods]
};
</script>

<style>
.el-dialog__title {
  font-size: 18px;
}
.el-steps .el-step__title {
  font-size: 10px;
  margin-bottom: 20px;
}
</style>