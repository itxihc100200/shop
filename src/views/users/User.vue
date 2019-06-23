<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
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
          <el-button @click="dialogFormVisible=true" type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userlist" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="data">
            <el-switch
              @change="changestate($event,data.row)"
              v-model="data.row.mg_state"
              active-color="#13ce66"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="data">
           
             <el-button size="mini" type="primary" @click="edituserform(data.row)" icon="el-icon-edit" circle></el-button>
             <el-button  size="mini" type="danger" @click="del(data.row.id)" icon="el-icon-delete" circle></el-button>
             <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
             <el-button  size="mini" type="warning" icon="el-icon-s-tools"  circle></el-button>
             </el-tooltip>
          
          </template>
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
    <!-- 添加用户 -->
    <el-dialog @closed="$refs.adduserRef.resetFields()" title="添加用户" :visible.sync="dialogFormVisible">
      <el-form ref="adduserRef" :model="adduserform" :rules="adduserRules">
        <el-form-item label="用户" label-width="80px" prop="username">
          <el-input v-model="adduserform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input  type="password" v-model="adduserform.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input  v-model="adduserform.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="mobile">
          <el-input  v-model="adduserform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户 -->
    <el-dialog @closed="$refs.edituserRef.resetFields()" title="修改用户" :visible.sync="edituserdialog">
      <el-form ref="edituserRef" :model="editform" :rules="edituserRules">
        <el-form-item label="用户" label-width="80px" prop="username">
          <el-input v-model="editform.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input  v-model="editform.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="mobile">
          <el-input  v-model="editform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edituserdialog = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import User from "./User.js";
export default {
  mixins: [User]
};
</script>

<style>
</style>