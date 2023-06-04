<template>
  <div class="d-flex">
    <!-- sidebar -->
    <!-- <div class="col-lg-2 col-mid-3 col-sm-3 sidebar"> -->
    <div class="sidebar">
      <div class="d-flex flex-column flex-shrink-0 p-3" style="background-color:#E5E8E8; height:100vh;">
        <span class="fs-4 fw-semibold text-truncate">My Workspace</span>
        <hr style="border-color:#909497">
        <dropSearchFile class="form-control mb-2 mt-0" 
                    :options="fileOptions"
                    :disabled="false"
                    :placeholder="'Search file...'"
                    v-on:selected="validateFileSelection">
        </dropSearchFile>

        <button class="btn btn-text-color mb-1 text-start" onmouseover="this.style.backgroundColor='#D7DBDD';" onmouseout="this.style.backgroundColor='#E5E8E8';" data-bs-toggle="modal" data-bs-target="#aboutModal">
          <i class="fa-solid fa-lightbulb" style="width:23px"></i> About
        </button>
        <button class="btn btn-text-color mb-1 text-start" onmouseover="this.style.backgroundColor='#D7DBDD';" onmouseout="this.style.backgroundColor='#E5E8E8';" data-bs-toggle="modal" data-bs-target="#fileModal">
          <i class="fa-solid fa-file" style="width:23px"></i> Create File
        </button>
        <button class="btn btn-text-color mb-1 text-start" onmouseover="this.style.backgroundColor='#D7DBDD';" onmouseout="this.style.backgroundColor='#E5E8E8';" data-bs-toggle="modal" data-bs-target="#workspaceModal">
          <i class="fa-solid fa-user-plus" style="width:23px"></i> Search Workspace
        </button>


        <div class="container mt-5">
          <div class="row">
            <div class="col">
              <hr style="border-color:#909497">
            </div>
            <div class="align-self-center col px-0" style="color:#909497">
              <span>workspaces</span>
            </div>
            <div class="col">
              <hr style="border-color:#909497">
            </div>
          </div>
        </div>
        <div class="list-unstyled ps-0 mt-2">
          <div class="">
            <button class="btn btn-text-color btn-toggle align-items-center rounded collapsed d-flex justify-content-start ms-0" data-bs-toggle="collapse" data-bs-target="#private-collapse" aria-expanded="true" onmouseover="this.style.backgroundColor='#D7DBDD';" onmouseout="this.style.backgroundColor='#E5E8E8';">
              <i class="fa-solid fa-lock" style="width:20px"></i>&nbsp;
              Private
            </button>
            <div class="collapse show list-group" id="private-collapse">
              <button class="btn btn-text-color btn-workspace btn-block m-1">My workspace</button>
            </div>
          </div>
          <div class="">
            <button class="btn btn-text-color btn-toggle align-items-center rounded collapsed d-flex justify-content-start ms-0" data-bs-toggle="collapse" data-bs-target="#public-collapse" aria-expanded="false" onmouseover="this.style.backgroundColor='#D7DBDD';" onmouseout="this.style.backgroundColor='#E5E8E8';">
              <i class="fa-solid fa-globe" style="width:20px"></i>&nbsp;
              Public
            </button>
            <div class="collapse list-group" id="public-collapse">
              <button class="btn btn-text-color btn-workspace btn-block m-1">Public workspace</button>
            </div>
          </div>
          <div class="">
            <button class="btn btn-text-color btn-toggle align-items-center rounded collapsed d-flex justify-content-start ms-0" data-bs-toggle="collapse" data-bs-target="#groups-collapse" aria-expanded="false" onmouseover="this.style.backgroundColor='#D7DBDD';" onmouseout="this.style.backgroundColor='#E5E8E8';">
              <i class="fa-solid fa-people-group" style="width:20px"></i>&nbsp;
              Groups
            </button>
            <div class="collapse" id="groups-collapse">    
              <div class="list-group text-truncate" style="height: 18vh;overflow-y: auto;">
                <button class="btn btn-text-color btn-workspace btn-block m-1"><div class="text-truncate">Group1</div></button>
                <button class="btn btn-text-color btn-workspace btn-block m-1"><div class="text-truncate">Group2</div></button>
                <button class="btn btn-text-color btn-workspace btn-block m-1"><div class="text-truncate">Group3</div></button>
                <button class="btn btn-text-color btn-workspace btn-block m-1"><div class="text-truncate">Group4</div></button>
                <button class="btn btn-text-color btn-workspace btn-block m-1"><div class="text-truncate">Group5</div></button>
                <button class="btn btn-text-color btn-workspace btn-block m-1"><div class="text-truncate">Group6</div></button>
              </div>
            </div>
          </div>
        </div>
        <div class="" style="margin-top: auto;">
          <div class="d-flex justify-content-between align-items-center">
            <span>
              <i class="fa-solid fa-user"></i>&nbsp;&nbsp;
              <span class="fs-5 fw-semibold">{{ myUserInfo.username }}</span>
            </span>
            <router-link class="nav-link" style="text-color: #2c3e50;" to="/">
              <i class="fa-solid fa-right-from-bracket"/> 
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- all files in the group -->
    <div class="content">
      <p>{{myUserInfo}}</p>
      <p>{{currentWorkspace}}</p>
      <!-- <p>{{getOwnerInfo(uid)}}</p> -->
      <!-- <p>{{allFiles}}</p> -->
      <div class="card border-0">
        <div class="card-body" style="padding-left:32px">
          <div class="col-1">
            <select class="form-select">
              <option value="" selected disabled>Tags</option>
              <option value="all">All</option>
              <option value="untagged">Untagged</option>
              <option value="tag1">Tag1</option>
              <option value="tag2">Tag2</option>
            </select>
          </div>
        </div>
        <!-- tag 1-->
        <div class="card-body">
          <!-- show tag -->
          <div class="card-body row align-items-center">
            <div class="col">
              <hr class="w-100">
            </div>
            <div class="col px-0">
              <h2 class="fw-bolder" style="color:#2c3e50;">Untagged</h2>
            </div>
            <div class="col">
              <hr class="w-100">
            </div>
          </div>
          <!-- show files-->
          <div class="card-body">
            <div class="d-grid file-grid">
              <!-- single file -->
              <div v-for="(file, idx) in allFiles" :key="idx" class="d-flex flex-column card-body grid-item btn file-card">
                <div class="text-truncate justify-content-center align-items-center">
                  <i class="fa-solid fa-file fs-4"></i><span class="fs-3 fw-semibold">&nbsp;&nbsp;{{file.name}}</span>
                </div>
                <div class="d-grid edit-delete-grid mt-1 justify-content-center align-items-center">
                  <span class="card-subtitle text-nowrap" style="grid-column:2">owner: {{ getOwnerInfo(file.owner).username }}</span>
                  <button v-if="getOwnerInfo(file.owner).isOwner" class="btn btn-delete" style="grid-column:3">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
                <router-link :to="{ path: `/home/${uid}/file/${file._id}`, query: { wid: currentWorkspace._id }}" class="btn btn-edit mt-1">
                  <i class="fa-solid fa-pen-to-square"></i> Edit
                </router-link>
              </div>
              <!-- <div class="d-flex flex-column card-body grid-item btn file-card">
                <div class="text-truncate justify-content-center align-items-center">
                  <i class="fa-solid fa-file fs-4"></i><span class="fs-3 fw-semibold"> File1</span>
                </div>
                <div class="d-grid edit-delete-grid mt-1 justify-content-center align-items-center">
                  <span class="card-subtitle text-nowrap" style="grid-column:2">owner: user1</span>
                  <button v-if="isOwner" class="btn btn-delete" style="grid-column:3">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
                <router-link to="/file" class="btn btn-edit mt-1">
                  <i class="fa-solid fa-pen-to-square"></i> Edit
                </router-link>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- About Modal !-->
    <div id="aboutModal" class="modal fade" role="dialog">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title fw-bolder"><i class="fa-solid fa-lightbulb"></i>&nbsp;&nbsp;About</h4>
                <span class="badge bg-warning d-flex align-items-center mx-3">{{ MemberNum }}</span>
                <button class="btn btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div id="aboutModalBody" class="modal-body">
                <!-- <div v-for="item in members" :key="item._id">
                  <p>
                    {{ item.username }}
                  </p>
                </div> -->
                <div class="card-body text-start">
                  <div class="list-group px-3" style="height: 18vh; overflow-y:scroll; color:#2c3e50">
                    <div class="list-group-item d-flex justify-content-between list-group-item-action"> 
                      <span class="fw-bolder fs-5" style="color:#2c3e50"> user 1</span>
                      <span class="badge bg-success d-flex align-items-center my-1">Admin</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between list-group-item-action"> 
                      <span class="fw-bolder fs-5" style="color:#2c3e50"> user 2</span>
                      <span class="badge bg-primary d-flex align-items-center my-1">Member</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between list-group-item-action"> 
                      <span class="fw-bolder fs-5" style="color:#2c3e50"> user 3</span>
                      <span class="badge bg-primary d-flex align-items-center my-1">Member</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between list-group-item-action"> 
                      <span class="fw-bolder fs-5" style="color:#2c3e50"> user 4</span>
                      <span class="badge bg-primary d-flex align-items-center my-1">Member</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between list-group-item-action"> 
                      <span class="fw-bolder fs-5" style="color:#2c3e50"> user 5</span>
                      <span class="badge bg-primary d-flex align-items-center my-1">Member</span>
                    </div>
                    <div class="list-group-item d-flex justify-content-between list-group-item-action"> 
                      <span class="fw-bolder fs-5" style="color:#2c3e50"> user 6</span>
                      <span class="badge bg-primary d-flex align-items-center my-1">Member</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Leave</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Create File Modal !-->
    <div id="fileModal" class="modal fade" role="dialog" aria-hidden="true">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title fw-bolder"><i class="fa-solid fa-file"></i>&nbsp;&nbsp;Create File</h4>
                <button class="btn btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div class="modal-body">  
                <!-- filename -->
                <div class="form-group">
                  <label>FileName</label>
                </div>          
                <div class="container my-2">
                  <input type="text" class="form-control" v-model="filename"/>
                </div>  
                <!-- add tags -->
                <div class="form-group">
                  <label>Added Tags</label>
                </div>
                <div class="card-body">
                  <div class="container my-2">
                    <dropSearch class="form-control" 
                      :options="options"
                      :disabled="false"
                      :placeholder="'search for a tag...'"
                      v-on:selected="tagSelection">
                    </dropSearch>
                    <div class="card-body mt-2">
                      <div class="list-group my-2" style="height: 20vh; overflow-y:scroll;">
                        <div v-for="(tag, idx) in selectedTag" :key="idx" class="list-group-item d-flex justify-content-between list-group-item-action"> 
                          <span class="fw-bolder" style="color:#2c3e50"> {{ tag }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="modal-footer">
                <button @click="createFile" :disabled="filename == ''" type="button" class="btn btn-success" data-bs-dismiss="modal">Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Create Workspace Modal ! -->
    <div id="workspaceModal" class="modal fade" role="dialog" aria-hidden="true">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Search Workspace</h4>
                <button class="btn btn-close" data-bs-dismiss="modal"></button>
              </div>
              
              <div class="modal-body">
                <div class="d-flex mx-2 my-2">
                  <dropSearchWorkspace class="form-control" 
                              :options="workspaceOptions"
                              :disabled="false"
                              :placeholder="'Workspace name...'"
                              v-on:selected="validateWorkspaceSelection">
                  </dropSearchWorkspace>
                  <!-- <button class="btn btn-text-color btn-outline-dark text-nowrap my-2" @click="createWorkspaceModal=true">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </button> -->
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
import dropSearchWorkspace from '../components/dropSearchWorkspace.vue';
import dropSearchFile from '../components/dropSearchFile.vue';
import { ref, onMounted } from 'vue'
import { useRoute , useRouter } from 'vue-router'


export default{
  components:{
    'dropSearchWorkspace':dropSearchWorkspace,
    'dropSearchFile':dropSearchFile,
  },
  data() {
    return {
      
    }
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const uid = ref('');

    const errorMessage = ref('')
    const successMessage = ref('')

    const isOwner = ref(true);
    const MemberNum = ref(6);
    
    const options = ref(['']);

    // get user info 
    const myUserInfo = ref({});
    const getUserInfo = async() => {
      try {
        await fetch(`http://localhost:3080/api/getUserInfo/${uid.value}`)
        .then(res => res.json())
        .then(res => {
          myUserInfo.value = res.data
          // debugger
        })
      }
      catch(error) {
        console.log(error) 
      }
    }

    // get workspace info
    const currentWorkspace = ref({});
    const allWorkspaces = ref([]);
    const workspaceInfo = ref({});
    const getWorkspaceInfo = async(wid) => {
      try {
        await fetch(`http://localhost:3080/api/getWorkspace/${wid}`)
        .then(res => res.json())
        .then(res => {
          workspaceInfo.value = res.data;
        })
      }
      catch {
        console.log(error)
      }
    }

    const getAllWorkspaces = async() => {
      for(var wid of myUserInfo.value.workspace){
        await getWorkspaceInfo(wid);
        // if(!allWorkspaces.value.includes(workspaceInfo.value)){
        // }
        allWorkspaces.value.push(workspaceInfo.value);
      }
    }

    const getCurrentWorkspace = async() => {
      try {
        var wid = currentWorkspace.value._id;
        await fetch(`http://localhost:3080/api/getWorkspace/${wid}`)
        .then(res => res.json())
        .then(res => {
          // get new current workspace
          currentWorkspace.value = res.data;
          // update the all workspace list
          var index = allWorkspaces.value.findIndex((workspace) => workspace._id === wid);
          if (index !== -1) {
            allWorkspaces.value[index] = currentWorkspace.value;
          }
          // console.log(index);
        })
      }
      catch {
        console.log(error)
      }
    }

    // get file info
    const allFiles = ref([]);
    const fileInfo = ref({});
    const getFileInfo = async(fid) => {
      try {
        // console.log(fid);
        await fetch(`http://localhost:3080/api/getFile/${fid}`)
        .then(res => res.json())
        .then(res => {
          fileInfo.value = res.data;
        })
      }
      catch(error) {
        console.log(error)
      }
    }

    const getAllFiles = async(workspace) => {
      for(var fid of workspace.files){
        await getFileInfo(fid);
        // if (!allFiles.value.includes(fileInfo.value)) {
        // }
        allFiles.value.push(fileInfo.value);
      }
    }

    // on Mounted

    onMounted(async() => {
      uid.value = route.params.id;
      await getUserInfo();
      await getAllWorkspaces();
      // console.log(allWorkspaces);
      currentWorkspace.value = allWorkspaces.value[0];
      // await getCurrentWorkspace();

      await getAllFiles(currentWorkspace.value);

    })

    // create file
    const filename = ref('');
    const selectedTag = ref(['untagged']);
    const createFile = () => { 

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // "auth-token": state.token
        },
        body: JSON.stringify({
          file_name:    filename.value,
          user_id:      uid.value,
          file_tags:    selectedTag.value, 
          workspace_id: currentWorkspace.value._id
        }),
      }
      
      fetch("http://localhost:3080/api/createFile", requestOptions)
        .then(res => {
          res.json().then(data => { successMessage.value = data.message } )
        })
        .then(getCurrentWorkspace())
        .then(getAllFiles(currentWorkspace.value))
        .catch(err => {
          err.json().then(data => { errorMessage.value = data.message } )
        })
    }

    // get file owner name
    const getOwnerInfo = async(ownerId) => {
      const ownerInfo = {
        username: '',
        isOwner: false,
      };
      try {
        await fetch(`http://localhost:3080/api/getUserInfo/${ownerId}`)
        .then(res => res.json())
        .then(res => {
          ownerInfo.username = res.data.username;
          if(ownerInfo.username === myUserInfo.value.username){
            ownerInfo.isOwner = true;
          }
          // console.log(ownerInfo);
          return ownerInfo;
        })
      }
      catch(error) {
        console.log(error);
        return null;
      }
    }

    // drop search file & workspace
    const workspaceOptions = ref([{name: 'jack1', id: '123123'}, {name: 'jack2', id: '123123'}, {name: 'jack3', id: '123123'}, 
                                  {name: 'jack4', id: '123123'}, {name: 'jack5', id: '123123'}, {name: 'jack6', id: '123123'}, 
                                  {name: 'jack7', id: '123123'}, {name: 'jack8', id: '123123'}, {name: 'jack9', id: '123123'}]); // [ {name: '', id: ''} ]
    const fileOptions = ref([{name: 'jack8', id: '123123'}, {name: 'jack9', id: '123123'}, {name: 'jack0', id: '123123'}, 
                             {name: 'jack4', id: '123123'}, {name: 'jack5', id: '123123'}, {name: 'jack6', id: '123123'},
                             {name: 'jack7', id: '123123'}, {name: 'jack8', id: '123123'}, {name: 'jack9', id: '123123'}]); // [ {name: '', id: ''} ]

    const validateWorkspaceSelection = (selection) => {
      console.log(selection.name + " has been selected");
      if(selection.name != undefined) {
        if (selection.name.includes('Create')) {
          // create workspace
          // console.log("should create workspace");
          // const requestOptions = {
          //   method: "PUT",
          //   headers: {
          //     "Content-Type": "application/json"
          //     // "auth-token": state.token
          //   },
          //   body: JSON.stringify({
          //     name: selection.name,
          //     members: uid
          //   }) 
          // }

          // fetch("http://localhost:3000/api/createWorkspace" , requestOptions)
          // // .then(GetAllTodos())
          //   .then(res =>  res.body) // redundant
          //   .then(res => {console.log(res)}) // redundant
          //   router.push('/todos')
        } else {
          // join workspace
          // fetch("http://localhost:3080/api/joinWorkspace/" + _workspaceid)
          //   .then(res => {
          //     res.json().then(data => { successMessage.value = data.message } )
          //   })
          //   .catch(err => {
          //     err.json().then(data => { errorMessage.value = data.message } )
          //   })
        }

      } 
    }

    const validateFileSelection = (selection) => {
      const route = useRoute();
      const router = useRouter();


      console.log(selection.name + " has been selected");
      if(selection.name != undefined) {
        // goto file edit (selection.id <- file id)
        // router.push('/file');
      } 
    }



    return {  errorMessage,
              successMessage,
              //
              uid,
              getUserInfo,
              myUserInfo,
              //
              getAllWorkspaces,
              getWorkspaceInfo,
              getCurrentWorkspace,
              workspaceInfo,
              allWorkspaces,
              currentWorkspace,
              //
              getAllFiles,
              getFileInfo,
              fileInfo,
              allFiles,
              // 
              filename,
              selectedTag,
              createFile,
              //
              getOwnerInfo,

              isOwner,
              MemberNum,
              options,
              
              //
              validateWorkspaceSelection,
              validateFileSelection,
              workspaceOptions,
              fileOptions,
    }
  },
  methods: {
    tagSelection(selection) {
      // this.selectedTag = selection;
      // console.log(selection + " has been selected");
      // if(selection != undefined){
        // this.teamInfo.teamName = selection.name;
        // this.$http.get(this.db + 'team/'+ selection.teamid + '.json').then(function(data){
        //   return data.json();
        // }).then(function(data){
        //   this.teamInfo.members = data.members;
        //   // console.log(this.teamInfo.members);
        //   this.teamInfoModal = true;
        // })
        
      // }
    },
  },
}
</script>


<style scoped>
.sidebar {
  width: 270px;
  position: fixed;
  height:100%;
}
.content {
  width: calc(100% - 270px);
  min-height: 100vh;
  margin-left: 270px;
}
.btn-text-color {
  color:#2c3e50;
}
.btn-workspace {
  background-color:#2c3e50; 
  color:white;
}
.btn-workspace:hover {
  background-color:#D7DBDD; 
  color:#2c3e50;
}
.file-card {
  background-color:#D7DBDD; 
  color:#2c3e50 ;
}
.file-card:hover {
  background-color:#E5E7E9 ; 
  color:#2c3e50;
}
.btn-delete {
  color:#C0392B;
}
.btn-delete:hover {
  background-color:#C0392B; 
  color:white;
}
.btn-edit {
  background-color:#2c3e50;
  color:white;
}
.btn-edit:hover {
  background-color:#D7DBDD; 
  color:#2c3e50;
}
.file-grid {
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 10px;
}
.edit-delete-grid {
  grid-template-columns: 1fr 3fr 1fr;
  column-gap: 10px;
}
.grid-item {
  min-width: 0; /* Ensure minimum width for grid item */
  overflow: hidden; /* Hide overflowing text */
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
/* .modal-dialog{
    overflow-y: initial 
} */
/* #aboutModalBody{
    height: 40vh;
    overflow-y: auto;
    word-wrap:break-word
} */
.owner {
  background-color: #90be6d;
  margin: 1px;
  text-align: center;
}

</style>