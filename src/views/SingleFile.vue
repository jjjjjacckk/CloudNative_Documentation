<template>
  <!-- nav bar -->
  <div class="navbar d-grid nav-grid py-0" style="background-color:#E5E8E8">
    <div class="d-flex justify-content-between ps-2 pe-3" style="grid-column:1;">
      <router-link to="/home" class="btn d-flex align-items-center fs-5 px-0 fw-bolder ms-2" style="color:#2c3e50">
        <i class="fa-solid fa-file-lines fs-4" style="color:#2c3e50"></i>&nbsp;&nbsp;My Workspace
      </router-link>
      <div class="btn-group btn-group-sm my-2" role="group" >
        <button class="btn btn-mode"><i class="fa-solid fa-eye" style="width:15px"></i></button>
        <button class="btn btn-mode"><i class="fa-solid fa-table-columns" style="width:15px"></i></button>
      </div>
    </div>
    <div style="grid-column:2;">
      <span class="navbar-brand ms-4 fs-5 fw-bold" style="color:#2c3e50">File1</span>
    </div>
    <div class="d-flex justify-content-between ps-3 pe-2" style="grid-column:3;">
      <button class="btn btn-save my-2"><i class="fa-solid fa-floppy-disk"></i>&nbsp;&nbsp;Save</button>
      <div class="d-flex justify-content-between">
        <button class="btn btn-others my-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Page history"><i class="fa-solid fa-clock-rotate-left"></i></button>
        <button class="btn btn-others my-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Page snapshot"><i class="fa-solid fa-camera"></i></button>
        <button class="btn btn-others my-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Share"><i class="fa-solid fa-cloud-arrow-up"></i></button>
      </div>
    </div>
  </div>
  <!-- edit area -->
  <div class="d-grid editor-grid">
    <div class="grid-item border border-dark" style="grid-column:1;height: 100vh">
        <textarea class="form-control" v-model="markdown" style="height: 100%; background-color:#454545; color:white"></textarea>
    </div>
    <div class="grid-item border border-dark" style="grid-column:2;height: 100vh;text-align: left;">
        <div class="" v-html="markdownToHtml" style="height: 100%"></div>
    </div>
  </div>
</template>

<script>
import {marked} from 'marked';

export default {
  data(){
    return{
      markdown: 'fsdf',
    }
  },
  computed: {
    markdownToHtml(){
      return marked(this.markdown);
    }
  }
}
</script>

<style scoped>
.btn-mode {
  background-color:#E5E8E8; 
  color:#2c3e50;
  border-color:#2c3e50;
}
.btn-mode:hover {
  background-color:#2c3e50;
  color:white;
}
.btn-save {
  background-color:#2c3e50;
  color:white;
}
.btn-others {
  color:#2c3e50;
}
.btn-save:hover {
  background-color:#D7DBDD; 
  color:#2c3e50;
}
.editor-grid {
  grid-template-columns: 1fr 1fr;
  column-gap: 0px;
}
.nav-grid {
  grid-template-columns: 2fr 7fr 2fr;
  column-gap: 0px;
}
.grid-item {
  min-width: 0; /* Ensure minimum width for grid item */
}
</style>