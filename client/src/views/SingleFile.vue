<template>
  <!-- nav bar -->
  <div class="navbar d-grid nav-grid py-0" style="background-color:#E5E8E8">
    <div class="d-flex justify-content-between ps-2 pe-3" style="grid-column:1;">
      <router-link :to="`/home/${uid}`" class="btn d-flex align-items-center fs-5 px-0 fw-bolder ms-2 text-nowrap" style="color:#2c3e50">
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
        <button class="btn btn-others my-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="File sharing"><i class="fa-solid fa-cloud-arrow-up"></i></button>
        <!-- <span data-bs-toggle="modal" data-bs-target="#settingModal">
        </span> -->
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

  <!-- History Modal !-->
  <div id="historyModal" class="modal fade" role="dialog">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-xl">
          <div class="modal-content" style="height:80vh;">
            <div class="modal-header">
              <h4 class="modal-title fw-bolder"><i class="fa-solid fa-clock-rotate-left"></i>&nbsp;&nbsp;History</h4>
              <button class="btn btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
              <div class="sidebutton" style="height: 70vh; overflow-y:auto">
                <div class="list-group text-start" style="; color:#2c3e50">
                  <button v-for="(idx) in 14" :key="idx" class="list-group-item d-flex flex-column justify-content-between"> 
                    <span class="fw-bolder fs-5" style="color:#2c3e50">user {{idx}}</span>  
                    <span class="fw-bolder fs-6" style="color:#2c3e50">2023-06-01 20:{{idx}}</span>                   
                  </button>
                </div>
              </div>
              <div class="content border">
                  <div class="card-body" style="height: 70vh; overflow-y:auto;">
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
    </div>
  </div>
  
  <!-- Snapshot Modal !-->
  <div id="snapshotModal" class="modal fade" role="dialog">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-xl ">
          <div class="modal-content" style="height:80vh;">
            <div class="modal-header">
              <h4 class="modal-title fw-bolder"><i class="fa-solid fa-camera"></i>&nbsp;&nbsp;Snapshot</h4>
              <button class="btn btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
              <!-- <div v-for="item in members" :key="item._id">
                <p>
                  {{ item.username }}
                </p>
              </div> -->
              <div class="sidebutton" style="height: 70vh; overflow-y:auto">
                <div class="list-group text-start" style="; color:#2c3e50">
                  <!-- <button v-for="(idx) in 14" class="btn btn-mode btn-block m-1">
                    <span class="fw-bolder fs-6 py-2" style="color:#2c3e50">2023-06-01 20:10</span>
                  </button> -->
                  <button v-for="(idx) in 14" :key="idx" class="list-group-item d-flex flex-column justify-content-between"> 
                    <span class="fw-bolder fs-6 py-2" style="color:#2c3e50" @click="console.log('helo')">2023-06-01 20:{{idx}}</span>                   
                  </button>
                </div>
              </div>
              <div class="content border">
                <div class="card border-0">
                  <div class="card-body" style="height: 70vh; overflow-y:auto;">
                    <v-md-editor v-model="snapshot" mode="preview" :toolbar="toolbar" left-toolbar="undo redo | h bold italic strikethrough quote tagBar | ul ol table hr | link image" right-toolbar=""></v-md-editor>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Setting Modal ! -->
  <!-- <div id="settingModal" class="modal fade" role="dialog">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title fw-bolder"><i class="fa-solid fa-gear"></i>&nbsp;&nbsp;Setting</h4>
              <button class="btn btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
              <div class="d-flex flex-column">
                <span class="fs-3 text-start text-truncate">File1</span>
                <span class="fs-6 text-end text-nowrap">- created by user1</span>
              </div>
              <div class="d-flex flex-column mt-3">
                <dropSearch class="form-control" 
                  :options="options"
                  :disabled="false"
                  :placeholder="'search for a tag...'"
                  v-on:selected="validateSelection">
                </dropSearch>
                <div class="card-body mt-2">
                  <div class="list-group my-2" style="height: 24vh; overflow-y:scroll;">
                    <div v-for="(idx) in 14" class="list-group-item d-flex justify-content-between list-group-item-action"> 
                      <span class="fw-bolder" style="color:#2c3e50"> tag {{ idx }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Share to Public</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->

</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute , useRouter } from 'vue-router'
import DropSearchFile from '../components/dropSearchFile.vue';

export default {
  // props: {
  //   wid: {
  //     type: String,
  //     required: true,
  //   },
  // },
  components:{
    'dropSearch': DropSearchFile,
  },
  data(){
    return{

      filename: 'File1',
      markdown: '',
      snapshot: '# hello',
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
      oldStr: "hihi\nvuescriptaaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaa\naaaaaaaaa\n\n\n\nn\n\n\n\n\n\n\n\n\n\n\nn\n\n\\n\n\n\n\n\nn\n\n\n\n\n\n\n\n\n\n\\n\n",
      newStr: "hihi\nJavaScript",
    }
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const uid = ref('');
    const wid = ref('');
    const fid = ref('');
    
    const errorMessage = ref('')
    const successMessage = ref('')

    onMounted(async() => {
      uid.value = route.params.uid;
      wid.value = route.query.wid;
      fid.value = route.params.fid;
    })

    return {
      uid,
      wid,
      fid,
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

.sidebutton {
  width: 200px;
  position: fixed;
  height:100%;
}
.content {
  width: calc(100% - 200px);
  margin-left: 200px;
  height: 100%;
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
.list-group-item:hover {
  background-color:#D7DBDD; 
  color:#2c3e50;
}
</style>