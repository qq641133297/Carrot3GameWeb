<template>
  <div class="user-info">
    <div class="logo">
      <img src="../assets/logo.png" style="width:20px;height:28px;">
      <span style="color:#fff;padding:0 10px;font-size:20px">C3GAME</span>
    </div>
    <el-menu
      style="padding:0 150px"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">用户中心</el-menu-item>
      <el-menu-item index="2">账号激活</el-menu-item>
    </el-menu>
    <div class="right-menu">
      <div class="user">
        <i class="fa fa-user"></i>
        <span style="padding:0 10px">{{username}}</span>
      </div>
    </div>
    <div class="content" style="padding:100px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="UID" width="210"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="roleId" label="角色ID" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="180"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import config from '@/config'
export default {
  data () {
    return {
      activeIndex: '1',
      username: '',
      tableData: []
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted () {
    this.username = window.localStorage.getItem('username')
    window.$api.user.getUserList()
      .then(res => {
        this.tableData = res.userList.map(item => {
          return {
            id: item.id,
            username: item.username,
            roleId: item.roleId || '暂无角色',
            createTime: new Date(item.createTime).toLocaleString(),
            status: item.status ? '已激活' : '未激活'
          }
        })
      })
  }
}
</script>
<style scoped>
.logo {
  position: absolute;
  z-index: 100;
  display: flex;
  width: 150px;
  height: 60px;
  justify-content: center;
  align-items: center;
}
.right-menu {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 150px;
  height: 60px;
  z-index: 100;
  justify-content: center;
  align-items: center;
  display: flex;
  color: #fff;
}
.user-info {
  position: relative;
}
</style>
