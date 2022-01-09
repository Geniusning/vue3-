<template>
  <div class="navbar">
    <Hamburger id="guide-hamburger" class="hamburger-container" />
    <Breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
    <div class="right-menu">
      <guide class="right-menu-item hover-effect" />
      <header-search class="right-menu-item hover-effect"></header-search>
      <screen-full class="right-menu-item hover-effect"></screen-full>
      <theme-select class="right-menu-item hover-effect"></theme-select>
      <lang-select class="right-menu-item hover-effect"></lang-select>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <el-icon class="el-icon--right"><setting /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <a href="#" target="__blank">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">{{
              $t('msg.navBar.logout')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { Setting } from '@element-plus/icons'
import { useStore } from 'vuex'
import Hamburger from '@/components/hamburger/index'
import Breadcrumb from '@/components/Breadcrumb/index'
import LangSelect from '@/components/LangSelect/index'
import ThemeSelect from '@/components/ThemeSelect/index'
import ScreenFull from '@/components/ScreenFull/index'
import HeaderSearch from '@/components/HeaderSearch/index'
import Guide from '@/components/Guide/index'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.5s;
    &:hover {
      background: rgb(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    :deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
    :deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
