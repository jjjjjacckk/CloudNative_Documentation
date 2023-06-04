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

        <dropSearchTag class="form-control mb-2 mt-0" 
                    :options="tagOptions"
                    :disabled="false"
                    :placeholder="'Search Tag...'"
                    v-on:selected="validateTagSelection">
        </dropSearchTag>

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
      <!-- <p>{{WorkspaceFiles}}</p> -->
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
              <div v-for="(file, idx) in WorkspaceFiles" :key="idx" class="d-flex flex-column card-body grid-item btn file-card">
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
                <button @click="leaveWorkspace" type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">
                  Leave
                </button>
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
import dropSearchTag from '../components/dropSearchTag.vue';
import { ref, onMounted } from 'vue'
import { useRoute , useRouter } from 'vue-router'


export default{
  components:{
    'dropSearchWorkspace':dropSearchWorkspace,
    'dropSearchFile':dropSearchFile,
    'dropSearchTag':dropSearchTag,
  },
  data() {
    return {
      
    }
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const uid = ref('');
    const wid = ref('');

    const errorMessage = ref('')
    const successMessage = ref('')

    // dropsearch data
    const isOwner = ref(true);
    const MemberNum = ref(6);
    const workspaceOptions = ref( [{name: 'jack', id: '647b4c73ad70df001ac25468'}] ); // [ {name: '', id: ''} ]
    const tagOptions = ref( [{name: 'jack', id: '647b4c73ad70df001ac25468'}] ); // [ {name: '', id: ''} ]
    const fileOptions = ref([{name: 'Jack', id: '647c406e69c85800134e472b'}, 
                             {name: 'qwe', id: '647c491a95652a001a5e1aca'},
                             {name: '123', id: '647c4d573ef8ed001383503d'}]); // [ {name: '', id: ''} ]

    const validateWorkspaceSelection = async(selection) => {
      console.log(selection.name + " has been selected with wid = " + selection.id);
      console.log(" uid = " + uid.value + " wid = " + wid.value);
      if(selection.name != undefined) {
        if (selection.name.includes('Create')) {
          // create workspace
          console.log("name = " + selection.name.substring(8));
          var newWorkspaceName = selection.name.substring(8);

          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              // "auth-token": state.token
            },
            body: JSON.stringify({
              name: newWorkspaceName,
              members: uid.value
            }) 
          }

          fetch("http://localhost:3080/api/createWorkspace" , requestOptions)
          // .then(GetAllTodos())
            .then(res => res.body ) // redundant
            .then(res => {console.log(res); }) // redundant
            // router.push('/todos')
        } else {
          // join workspace
          const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
              // "auth-token": state.token
            },
            body: JSON.stringify({
              id: uid.value
            }) 
          }

          fetch("http://localhost:3080/api/joinWorkspace/" + selection.id , requestOptions)
          // .then(GetAllTodos())
            .then(res =>  res.body) // redundant
            .then(res => {console.log(res.data)}) // redundant
            // router.push('/todos')
        }

      } 
    }

    const validateTagSelection = async(selection) => {
      console.log(selection.name + " has been selected with wid = " + selection.id);
      console.log(" uid = " + uid.value + " wid = " + wid.value);
      if(selection.name != undefined) {
        var newTagName = selection.name
        if (selection.name.includes('Create')) {
          // Create Tag
          console.log("name = " + selection.name.substring(8));
          newTagName = selection.name.substring(8);
        } 
        
        console.log("newTagName = " + newTagName);
        if (selectedTag.value.includes('untagged')) 
          selectedTag.value = []
        selectedTag.value.push(newTagName)
        console.log("selectedTag = " + selectedTag.value);
      } 
    }

    const validateFileSelection = async(selection) => {
      console.log(selection.name + " has been selected with fid = " + selection.id);
      if(selection.name != undefined) {
        // goto file edit (selection.id <- file id)
        // console.log('url = ' + '/home/' + uid.value + '/file/' + selection.id + '?wid=' + wid.value);
        router.push('/home/' + uid.value + '/file/' + selection.id + '?wid=' + wid.value);
      } 
    }

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
    

    const getAllWorkspaces = async() => {
      //YODO: getAll
      // for(var wid of myUserInfo.value.workspace){
      //   await getWorkspaceInfo(wid);
      //   // if(!allWorkspaces.value.includes(workspaceInfo.value)){
      //   // }
      //   allWorkspaces.value.push(workspaceInfo.value);
      // }

      try {
        await fetch("http://localhost:3080/api/getAllWorkspace")
        .then(res => res.json())
        .then(res => {
          // console.log(res.data)
          allWorkspaces.value = res.data;
        })
      }
      catch(error) {
        console.log(error) 
      }
    }

    const getCurrentWorkspace = async() => {
      try {
        await fetch(`http://localhost:3080/api/getWorkspace/${wid}`)
        .then(res => res.json())
        .then(res => {
          // get new current workspace
          currentWorkspace.value = res.data;
          // // update the all workspace list

          // var index = allWorkspaces.value.findIndex((workspace) => workspace._id === wid);
          // if (index !== -1) {
          //   allWorkspaces.value[index] = currentWorkspace.value;
          // }
          // console.log(index);
        })
      }
      catch {
        console.log(error)
      }
    }

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

    // get file info
    const WorkspaceFiles = ref([]);
    const fileInfo = ref({});
    
    const getWorkspaceFiles = async(workspace) => {
      WorkspaceFiles.value = [];
      for(var fid of workspace.files){
        await getFileInfo(fid);
        // if (!WorkspaceFiles.value.includes(fileInfo.value)) {
        // }
        WorkspaceFiles.value.push(fileInfo.value);
      }
    }

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


    // on Mounted
    onMounted(async() => {
      uid.value = route.params.id;
      wid.value = route.query.wid;

      await getUserInfo();
      await getAllWorkspaces();
      // console.log(allWorkspaces);
      //find wid 
      currentWorkspace.value = allWorkspaces.value.find(element => element._id == wid.value);
      console.log(currentWorkspace.value);
      // await getCurrentWorkspace();

      await getWorkspaceFiles(currentWorkspace.value);
    })

    // create file
    const filename = ref('');
    const selectedTag = ref(['untagged']);
    const createFile = async() => { 

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
        .then(getWorkspaceFiles(currentWorkspace.value))
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

    // leave workspace
    const leaveWorkspace = async() => {
      try {
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
            // "auth-token": state.token
          },
          body: JSON.stringify({
            id: uid.value
          }) 
        }

        console.log('leave workspace');

        // fetch(`http://localhost:3080/api/leaveWorkspace/${wid.value}`, requestOptions)
        // // .then(GetAllTodos())
        //   .then(res =>  res.body) // redundant
        //   .then(res => {console.log(res.data)}) // redundant
        //   router.push('/todos')
      } catch(error) {
        console.log(error);
      } 
    }

    return {
      errorMessage,
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
      getWorkspaceFiles,
      getFileInfo,
      fileInfo,
      WorkspaceFiles,
      // 
      filename,
      selectedTag,
      createFile,
      //
      getOwnerInfo,
      //
      isOwner,
      MemberNum,              
      workspaceOptions,
      fileOptions,
      tagOptions,
      validateWorkspaceSelection,
      validateFileSelection,
      validateTagSelection,
      //
      leaveWorkspace,
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