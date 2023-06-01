<template>
  <!-- nav bar -->
  <div class="navbar d-grid nav-grid py-0" style="background-color:#E5E8E8">
    <div class="d-flex justify-content-between ps-2 pe-3" style="grid-column:1;">
      <router-link to="/home" class="btn d-flex align-items-center fs-5 px-0 fw-bolder ms-2 text-nowrap" style="color:#2c3e50">
        <i class="fa-solid fa-file-lines fs-4" style="color:#2c3e50"></i>&nbsp;&nbsp;My Workspace
      </router-link>
      <div class="btn-group btn-group-sm my-2 mx-3" role="group">
        <button class="btn btn-mode" :class="{ 'active': editMode }"  @click="editMode=true"><i class="fa-solid fa-eye" style="width:15px"></i></button>
        <button class="btn btn-mode" :class="{ 'active': !editMode }" @click="editMode=false"><i class="fa-solid fa-table-columns" style="width:15px"></i></button>
      </div>
    </div>
    <div style="grid-column:2;">
      <div class="d-flex justify-content-center align-items-center">
        <span v-if="!isEdit" class="navbar-brand ms-4 fs-5 fw-bold" style="color:#2c3e50">{{ filename }}</span>
        <input v-else class="form-control inline" type="text" placeholder="filename" v-model="filename" >
        <button class="btn my-2" style="color:#2c3e50" @click="isEdit = !isEdit"><i class="fa-solid fa-pencil"></i></button>
      </div>
    </div>
    <div class="d-flex justify-content-end ps-3 pe-2 text-nowrap" style="grid-column:3;">
      <button class="btn btn-save my-2 mx-3"><i class="fa-solid fa-floppy-disk"></i>&nbsp;&nbsp;Save</button>
      <div class="d-flex justify-content-between">
        <span data-bs-toggle="modal" data-bs-target="#historyModal">
          <button class="btn btn-others my-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Page history"><i class="fa-solid fa-clock-rotate-left"></i></button>
        </span>
        <span data-bs-toggle="modal" data-bs-target="#snapshotModal">
          <button class="btn btn-others my-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Page snapshot"><i class="fa-solid fa-camera"></i></button>
        </span>
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

  <!-- Snapshot Modal !-->
  <div id="snapshotModal" class="modal fade" role="dialog">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog modal-xl">
            <div class="modal-content" style="height:80vh; width:100%">
              <div class="modal-header">
                <h4 class="modal-title">Snapshot</h4>
                <button class="btn btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div class="modal-body">
                <!-- <div v-for="item in members" :key="item._id">
                  <p>
                    {{ item.username }}
                  </p>
                </div> -->
                <div class="sidebutton">
                  <div class="d-flex flex-column flex-shrink-0 p-3">

                  <div class="list-group" style="overflow-y: auto;">
                    <button class="btn btn-text-color btn-workspace btn-block m-1 active">Group1</button>
                    <button class="btn btn-text-color btn-workspace btn-block m-1">Group2</button>
                    <button class="btn btn-text-color btn-workspace btn-block m-1">Group3</button>
                    <button class="btn btn-text-color btn-workspace btn-block m-1">Group4</button>
                    <button class="btn btn-text-color btn-workspace btn-block m-1">Group5</button>
                    <button class="btn btn-text-color btn-workspace btn-block m-1">Group6</button>
                  </div>
                  </div>
                </div>
                <div class="content">
                  <div class="card border-0">
                    <div class="card-body" style="padding-right:32px;overflow-y: auto;">
                      <v-md-editor v-model="markdown" mode="preview" :toolbar="toolbar" left-toolbar="undo redo | h bold italic strikethrough quote tagBar | ul ol table hr | link image" right-toolbar=""></v-md-editor>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- History Modal !-->
    <div id="historyModal" class="modal fade" role="dialog">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">History</h4>
                <button class="btn btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div class="modal-body">
                <!-- <div v-for="item in members" :key="item._id">
                  <p>
                    {{ item.username }}
                  </p>
                </div> -->
                  <code-diff
                    :old-string="oldStr"
                    :new-string="newStr"
                    output-format="side-by-side"/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>

export default {
  data(){
    return{
      filename: 'File1',
      markdown: '',
      // mode: "editable",
      editMode: true,
      isEdit: false,
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
      oldStr: "hihi\nvuescript",
      newStr: "hihi\nJavaScript",
    }
  },
  setup() {
    //File data 

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

.sidebutton {
  width: 120px;
  position: fixed;
  height:100%;
}
.content {
  width: calc(100% - 120px);
  height: 100%;
  margin-left: 120px;
  border-style:double;
}
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
.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>