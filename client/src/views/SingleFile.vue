<template>
  <!-- nav bar -->
  <div class="navbar d-grid nav-grid py-0" style="background-color:#E5E8E8">
    <div class="d-flex justify-content-between ps-2 pe-3" style="grid-column:1;">
      <router-link to="/home" class="btn d-flex align-items-center fs-5 px-0 fw-bolder ms-2 text-nowrap" style="color:#2c3e50">
        <i class="fa-solid fa-file-lines fs-4" style="color:#2c3e50"></i>&nbsp;&nbsp;My Workspace
      </router-link>
      <div class="btn-group btn-group-sm my-2" role="group">
        <button class="btn btn-mode" :class="{ 'active': editMode }"  @click="editMode=true"><i class="fa-solid fa-eye" style="width:15px"></i></button>
        <button class="btn btn-mode" :class="{ 'active': !editMode }" @click="editMode=false"><i class="fa-solid fa-table-columns" style="width:15px"></i></button>
      </div>
    </div>
    <div style="grid-column:2;">
      <span class="navbar-brand ms-4 fs-5 fw-bold text-truncate" style="color:#2c3e50">File1</span>
    </div>
    <div class="d-flex justify-content-between ps-3 pe-2 text-nowrap" style="grid-column:3;">
      <button class="btn btn-save my-2"><i class="fa-solid fa-floppy-disk"></i>&nbsp;&nbsp;Save</button>
      <div class="d-flex justify-content-between">
        <button class="btn btn-others my-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Page history"><i class="fa-solid fa-clock-rotate-left"></i></button>
        <button class="btn btn-others my-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Page snapshot"><i class="fa-solid fa-camera"></i></button>
        <button class="btn btn-others my-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Share"><i class="fa-solid fa-cloud-arrow-up"></i></button>
      </div>
    </div>
  </div>
  <!-- edit area -->
  <div style="text-align: left;">
    <div v-if="editMode">
      <v-md-editor v-model="markdown" mode="editable" :toolbar="toolbar" @change="history" left-toolbar="undo redo | h bold italic strikethrough quote tagBar | ul ol table hr | link image" right-toolbar=""></v-md-editor>
    </div>
    <div v-else class="container">
      <v-md-editor v-model="markdown" mode="preview" :toolbar="toolbar" left-toolbar="undo redo | h bold italic strikethrough quote tagBar | ul ol table hr | link image" right-toolbar=""></v-md-editor>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      markdown: '',
      // mode: "editable",
      editMode: true,
      toolbar: {
        tagBar: {
          title: 'tag',
          icon: 'v-md-icon-tip',
          action(editor){
            editor.insert(function (selected){
              const prefix = '###### tags: ';
              const content = selected;

              return {
                text: `${prefix}${content}`,
                selected: content,
              };
            });
          },
        },
      },
    }
  },
  computed: {
  },
  methods: {
    history(text,html){
      console.log(text, html);
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
.btn-mode.active {
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