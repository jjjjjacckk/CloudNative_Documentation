<template>
  <!-- nav bar -->
  <div class="navbar d-grid nav-grid py-0" style="background-color:#E5E8E8">
    <div class="d-flex justify-content-between ps-2 pe-3" style="grid-column:1;">
      <router-link :to="{ path: `/home/${uid}`, query: { wid: wid }}" class="btn d-flex align-items-center fs-5 px-0 fw-bolder ms-2 text-nowrap" style="color:#2c3e50">
        <i class="fa-solid fa-file-lines fs-4" style="color:#2c3e50"></i>
        <span v-if="workspaceInfo.name === userName" class="fs-4" style="color:#2c3e50">
          &nbsp;&nbsp;My Workspace
        </span>
        <span v-else class="fs-4" style="color:#2c3e50">
          &nbsp;&nbsp;{{ workspaceInfo.name }} Workspace
        </span>
      </router-link>
      <div class="btn-group btn-group-sm my-2 mx-3" role="group">
        <button class="btn btn-mode" :class="{ 'active': editMode }"  @click="editMode=true"><i class="fa-solid fa-eye" style="width:15px"></i></button>
        <button class="btn btn-mode" :class="{ 'active': !editMode }" @click="editMode=false"><i class="fa-solid fa-table-columns" style="width:15px"></i></button>
      </div>
    </div>
    <div style="grid-column:2;">
      <div class="d-flex justify-content-center align-items-center">
        <span v-if="!isEdit" class="navbar-brand ms-4 fs-5 fw-bold" style="color:#2c3e50">{{ fileInfo.name }}</span>
        <input v-else class="form-control inline" type="text" placeholder="filename" v-model="fileInfo.name" >
        <button class="btn my-2" style="color:#2c3e50" @click="isEdit=!isEdit"><i class="fa-solid fa-pencil"></i></button>
      </div>
    </div>
    <div class="d-flex justify-content-end ps-3 pe-2 text-nowrap" style="grid-column:3;">
      <button class="btn btn-save my-2 mx-3" @click="updateFile"><i class="fa-solid fa-floppy-disk"></i>&nbsp;&nbsp;Save</button>
      <div class="d-flex justify-content-between">
        <span data-bs-toggle="modal" data-bs-target="#historyModal">
          <button class="btn btn-others my-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Page history"><i class="fa-solid fa-clock-rotate-left"></i></button>
        </span>
        <span data-bs-toggle="modal" data-bs-target="#snapshotModal">
          <button class="btn btn-others my-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Page snapshot"><i class="fa-solid fa-camera"></i></button>
        </span>
      </div>
    </div>
  </div>
  <!-- <p>{{fileInfo}}</p> -->
  
  <!-- edit area -->
  <div style="text-align: left;">
    <div v-if="editMode">
      <v-md-editor v-model="fileInfo.data" mode="editable" :toolbar="toolbar" left-toolbar="undo redo | h bold italic strikethrough quote tagBar | ul ol table hr | link image" right-toolbar=""></v-md-editor>
    </div>
    <div v-else class="container">
      <v-md-editor v-model="fileInfo.data" mode="preview" :toolbar="toolbar" left-toolbar="undo redo | h bold italic strikethrough quote tagBar | ul ol table hr | link image" right-toolbar=""></v-md-editor>
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

            <div v-if="hasHistory" class="modal-body">
              <div class="sidebutton" style="height: 65vh; overflow-y:auto">
                <div class="list-group text-start" style="; color:#2c3e50">
                  <button v-for="(history, idx) in fileInfo.history" :key="idx" :class="{active: currentHistory === history.time}" @click="setHistoryText(history.origin_text, history.modify_text, history.time)" class="list-group-item d-flex flex-column justify-content-between"> 
                    <span class="fw-bolder fs-5" style="color:#2c3e50">{{ history.username}}</span>  
                    <span class="fw-bolder" style="color:#2c3e50; font-size: 14px">{{ history.time.split(", ")[0] }} - {{ history.time.split(", ")[1] }}</span> 
                  </button>
                </div>
              </div>
              <div class="content border">
                <div class="card-body" style="height: 65vh; overflow-y:auto;">
                  <code-diff
                    :old-string="oldText"
                    :new-string="newText"
                    output-format="line-by-line"/>
                </div>
              </div>
            </div>
            <div v-else class="modal-body">
              <span class="fs-3">There is no history!!</span>
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
              <div class="sidebutton" style="height: 65vh; overflow-y:auto">
                <div class="list-group text-start" style="; color:#2c3e50">
                  <button v-for="(snapshot, idx) in fileInfo.snapshot" :key="idx" :class="{active: currentSnapshot === snapshot.time}" @click="setSnapshotText(snapshot.plain_text, snapshot.time)" class="list-group-item d-flex flex-column justify-content-between"> 
                    <span class="fw-bolder py-2" style="color:#2c3e50; font-size: 13px">{{ snapshot.time.split(", ")[0] }} - {{ snapshot.time.split(", ")[1]}}</span> 
                  </button>
                </div>
              </div>
              <div class="content border">
                <div class="card border-0">
                  <div class="card-body" style="height: 65vh; overflow-y:auto;">
                    <v-md-editor v-model="snapshotText" mode="preview" :toolbar="toolbar" left-toolbar="undo redo | h bold italic strikethrough quote tagBar | ul ol table hr | link image" right-toolbar=""></v-md-editor>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
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
    'DropSearchFile': DropSearchFile,
  },
  data(){
    return{
      oldText: '',
      newText: '',
      currentHistory: '',
      snapshotText: '',
      currentSnapshot: '',

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
  setup() {
    const route = useRoute();
    const router = useRouter();

    const uid = ref('');
    const wid = ref('');
    const fid = ref('');
    
    const errorMessage = ref('')
    const successMessage = ref('')

    const editMode = ref(true);
    const isEdit = ref(false);
    const hasHistory = ref(false);

    // get user name
    const userName = ref({});
    const getUserName = async() => {
      try {
        await fetch(`http://localhost:3080/api/getUserInfo/${uid.value}`)
        .then(res => res.json())
        .then(res => {
          userName.value = res.data.username;
          // debugger
        })
      }
      catch(error) {
        console.log(error) 
      }
    }

    // get file info
    const fileInfo = ref({});
    const originFileData = ref('');
    const getFileInfo = async() => {
      try {
        // console.log(fid);
        await fetch(`http://localhost:3080/api/getFile/${fid.value}`)
        .then(res => res.json())
        .then(res => {
          fileInfo.value = res.data;
          originFileData.value = fileInfo.value.data;
          if(fileInfo.value.history.length > 0){
            fileInfo.value.history = fileInfo.value.history.reverse();
            hasHistory.value = true;
          } 
        })
      }
      catch(error) {
        console.log(error)
      }
    }

    // get workspace info
    const workspaceInfo = ref({});
    const getWorkspaceInfo = async() => {
      try {
        await fetch(`http://localhost:3080/api/getWorkspace/${wid.value}`)
        .then(res => res.json())
        .then(res => {
          workspaceInfo.value = res.data;
        })
      }
      catch {
        console.log(error)
      }
    }

    // set snapshot
    const updateSnapshot = async() => {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
          // "auth-token": state.token
        },
        body: JSON.stringify({
          file_id:      fid.value,
          time: new Date().toLocaleString(),
          file_data: fileInfo.value.data
        }),
      }

      console.log(new Date().toLocaleString());
      console.log(fileInfo.value.data);

      await fetch("http://localhost:3080/api/updateSnapshot", requestOptions)
        .then(res => res.json())
        .then(res => {
          fileInfo.value.snapshot = res.data.snapshot;
          console.log(fileInfo.value.snapshot);
          fileInfo.value.snapshot = fileInfo.value.snapshot.reverse();
        })
        .catch(err => {
          err.json().then(data => { errorMessage.value = data.message } )
        })

    }

    let intervalId;
    const disableSnapshot = () => {
      // Disable the snapshotting interval
      clearInterval(intervalId);
      intervalId = null;
    };

    onMounted(async() => {
      uid.value = route.params.uid;
      wid.value = route.query.wid;
      fid.value = route.params.fid;

      await getUserName();
      await getFileInfo();
      await getWorkspaceInfo();
      await updateSnapshot();

      intervalId = setInterval(updateSnapshot, 10 * 60 * 1000);
    })

    onBeforeUnmount(async() => {
      disableSnapshot();
    })

    // update file
    const updateFile = async() => { 

      // push history
      console.log(fileInfo.value.name);
      if(fileInfo.value.data != originFileData.value){

        const history = {
          username: userName.value,
          time: new Date().toLocaleString(),
          origin_text: originFileData.value,
          modify_text: fileInfo.value.data
        }
        originFileData.value = fileInfo.value.data;
        
        // old -> new
        fileInfo.value.history = fileInfo.value.history.reverse();
        fileInfo.value.history.push(history);
        // console.log(fileInfo.value.history);

        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
            // "auth-token": state.token
          },
          body: JSON.stringify({
            file_name:    fileInfo.value.name,
            file_id:      fid.value,
            file_data:    fileInfo.value.data,
            file_history: fileInfo.value.history
          }),
        }

        await fetch("http://localhost:3080/api/updateFile", requestOptions)
          .then(res => res.json())
          .then(res => {
            fileInfo.value = res.data;
            // new -> old
            fileInfo.value.history = fileInfo.value.history.reverse();
            hasHistory.value = true;
          })
          .catch(err => {
            err.json().then(data => { errorMessage.value = data.message } )
          })
      }else{
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
            // "auth-token": state.token
          },
          body: JSON.stringify({
            file_name:    fileInfo.value.name,
            file_id:      fid.value,
            file_data:    fileInfo.value.data,
            file_history: fileInfo.value.history.reverse()
          }),
        }

        await fetch("http://localhost:3080/api/updateFile", requestOptions)
          .then(res => res.json())
          .then(res => {
            fileInfo.value = res.data;
            // new -> old
            fileInfo.value.history = fileInfo.value.history.reverse();
          })
          .catch(err => {
            err.json().then(data => { errorMessage.value = data.message } )
          })
      }

    }

    return {
      errorMessage,
      successMessage,
      //
      editMode,
      isEdit,
      hasHistory,
      //
      uid,
      wid,
      fid,
      //
      userName,
      getUserName,
      //
      fileInfo,
      originFileData,
      getFileInfo,
      //
      workspaceInfo,
      getWorkspaceInfo,
      //
      updateFile,
    }

  },
  computed: {
  },
  methods: {
    setHistoryText(olds, news, time){
      // console.log('[setHistoryText]', olds, '|', news, '|', time, '|');
      this.oldText = olds;
      this.newText = news;
      this.currentHistory = time;
    },
    setSnapshotText(txt, time){
      this.snapshotText = txt;
      this.currentSnapshot = time;
    }
  }
}
</script>

<style scoped>

.sidebutton {
  width: 220px;
  position: fixed;
  height:100%;
}
.content {
  width: calc(100% - 220px);
  margin-left: 220px;
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
  background-color:#e5e8e8; 
  color:#2c3e50;
}
.list-group-item.active {
  background-color:#e5e8e8; 
  color:#2c3e50;
  border-color: #e5e8e8;
}
</style>