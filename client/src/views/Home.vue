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
      <!-- <p>{{myUserInfo}}</p>
      <p>{{currentWorkspace}}</p> -->
      <!-- <p>{{getOwnerInfo(uid)}}</p> -->
      <!-- <p>{{WorkspaceFiles}}</p> -->
      <div class="card border-0">
        <div class="card-body pb-1" style="padding-left:32px">
          <div class="col-1 selectWrapper p-2">
            <select class="form-select" v-model="filterSelectedTag" 
                    onfocus='this.size=4;' onblur='this.size=1;' onchange='this.size=1; this.blur();'>
              <option value="all">All</option> 
              <!-- <option value="untagged">Untagged</option>  -->
              <option v-for="(tag, idx) in tagOptions" :key="idx" :value="tag.name">{{ tag.name }}</option>
            </select>
          </div>
        </div>
        <!-- tag 1-->
        <div class="card-body" v-for="(tag, idx) in tagOptions.filter(i => {if (i.name == filterSelectedTag || filterSelectedTag == 'all') return i; })" :key="idx">
          <!-- <div v-if="filterSelectedTag == tag.name">  -->
            <!-- show tag -->
            <div class="card-body row align-items-center">
              <div class="col">
                <hr class="w-100">
              </div>
              <div class="col px-0">
                <h2 class="fw-bolder" style="color:#2c3e50;"> {{ tag.name }} </h2>
              </div>
              <div class="col">
                <hr class="w-100">
              </div>
            </div>
            <!-- show files-->
            <div class="card-body">
              <div class="d-grid file-grid">
                <!-- single file -->
                <div v-for="(file, idx) in getFilteredWorkspaceFiles(tag.name)" :key="idx" class="d-flex flex-column card-body grid-item btn file-card">
                  <!-- <div v-if="file.tag[0] == tag.name">  -->
                  <div> 
                    <div class="text-truncate justify-content-center align-items-center">
                      <i class="fa-solid fa-file fs-4"></i><span class="fs-3 fw-semibold">&nbsp;&nbsp;{{file.filename}}</span>
                    </div>
                    <div class="d-grid edit-delete-grid mt-1 justify-content-center align-items-center">
                      <span class="card-subtitle text-nowrap" style="grid-column:2">owner: {{ file.ownername }}</span>
                      <button v-if="file.isOwner" class="btn btn-delete" style="grid-column:3">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                    <router-link :to="{ path: `/home/${uid}/file/${file._id}`, query: { wid: currentWorkspace._id }}" class="btn btn-edit mt-1">
                      <i class="fa-solid fa-pen-to-square"></i> Edit
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          <!-- </div> -->
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
                <button class="btn btn-close" data-bs-dismiss="modal" @click="selectedTag=['untagged']"></button>
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
                    <!-- use filter to avoid "untagged" to be shown -->
                    <dropSearchTag class="form-control mb-2 mt-0" 
                                :options="tagOptions.filter(i => {if (!i.name.includes('untagged')) return i;})" 
                                :disabled="false"
                                :placeholder="'Search Tag...'"
                                v-on:selected="validateTagSelection">
                    </dropSearchTag>
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
import { booleanLiteral } from '@babel/types';

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
    const workspaceOptions = ref([]); // [ {name: '', id: ''} ]
    const tagOptions = ref([]); // [ {name: '', id: ''} ]
    const fileOptions = ref([]); // [ {name: '', id: ''} ]

    const validateWorkspaceSelection = async(selection) => {
      // console.log('[validate Workspace Selection] ' + selection.name + " has been selected with wid = " + selection.id);
      // console.log(" uid = " + uid.value + " wid = " + wid.value);
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
            .then(res => {
              console.log(res);
              router.go(0);
            }) // redundant
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
      // console.log('[validate Tag Selection] ' + selection.name + " has been selected with wid = " + selection.id);
      // console.log(" uid = " + uid.value + " wid = " + wid.value);
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
      // console.log('[validate File Selection] ' + selection.name + " has been selected with fid = " + selection.id);
      if(selection.name != undefined) {
        // goto file edit (selection.id <- file id)
        // console.log('url = ' + '/home/' + uid.value + '/file/' + selection.id + '?wid=' + wid.value);
        router.push('/home/' + uid.value + '/file/' + selection.id + '?wid=' + wid.value);
      } 
    }

    const getWorkspaceOptions = async() => {
      try {
        await fetch('http://localhost:3080/api/getAllWorkspace/')
        .then(res => res.json())
        .then(res => {
          for (var workspace of res.data) {
            workspaceOptions.value.push({name: workspace.name, id: workspace._id});
          }
        })
      }
      catch (error) {
        console.log(error)
      }
    }

    const getTagOptions = async() => {
      try {
        await fetch(`http://localhost:3080/api/getWorkspaceTags/${wid.value}`)
        .then(res => res.json())
        .then(res => {
          for (var tag of res.data) {
            // some() = to avoid duplicate tags
            if (!tagOptions.value.some(dic => dic.name == tag.tag)) {
              tagOptions.value.push({name: tag.tag, id: tag._id});
            }
          }
        })
      }
      catch (error) {
        console.log(error)
      }
    }

    const getFileOptions = async() => {
      fileOptions.value = [];
      for(var files of WorkspaceFiles.value) {
        fileOptions.value.push({name: files.filename, id: files.id});
      }
      // console.log('[getFileOptions] ', WorkspaceFiles.value, fileOptions.value);
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
    const myUserWorkspaces = ref([]);
    const workspaceInfo = ref({});
    const currentWorkspace = ref({});

    const getUserWorkspaces = async() => {
      myUserWorkspaces.value = []
      for(var wid of myUserInfo.value.workspace){
        await getWorkspaceInfo(wid);
          myUserWorkspaces.value.push(workspaceInfo.value);
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

    const getFilteredWorkspaceFiles = (tag) => {
      var filtered = [];
      for(var file of WorkspaceFiles.value) {
        if (file.tag.includes(tag)) {
          filtered.push(file);
        }
      }
      
      return filtered;
    }

    const getWorkspaceFiles = async(workspace) => {
      WorkspaceFiles.value = [];
      for(var fid of workspace.files) {
        await getFileInfo(fid).then(targetFile => {
          WorkspaceFiles.value.push(targetFile.value);
        });
      }
    }

    const getFileInfo = async(fid) => {
      const fileInfo = ref({
        id: '',
        filename: '',
        tag: [],
        ownerId: '',
        ownername: '',
        isOwner: false,
      });

      try {
        // console.log(fid);
        await fetch(`http://localhost:3080/api/getFile/${fid}`)
        .then(res => res.json())
        .then(res => {
          fileInfo.value.id = res.data._id;
          fileInfo.value.filename = res.data.name;
          fileInfo.value.tag = res.data.tag;
          fileInfo.value.ownerId = res.data.owner;
          // console.log(fileInfo.value.tag, res.data.tag.number);
        })
        .then(()=>{
          // console.log(fileInfo.value.filename);
          // console.log(fileInfo.value.id);
          fetch(`http://localhost:3080/api/getUserName/${fileInfo.value.ownerId}`)
          .then(res => res.json())
          .then(res => {
            fileInfo.value.ownername = res.data;
            // console.log(fileInfo.value.ownername)
            if(fileInfo.value.ownername === myUserInfo.value.username){
              fileInfo.value.isOwner = true;
              // console.log(fileInfo.value.isOwner)
            }
            // console.log(ownerInfo);
            
          })
        })
        return fileInfo;
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
      await getUserWorkspaces();
      
      currentWorkspace.value = myUserWorkspaces.value.find(element => element._id == wid.value);
      await getWorkspaceFiles(currentWorkspace.value);

      // get all options
      await getWorkspaceOptions();
      await getTagOptions();
      await getFileOptions();
    })

    // create file
    const filename = ref('');
    const selectedTag = ref(['untagged']);
    const filterSelectedTag = ref('all')

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
          res.json().then(data => { 
            successMessage.value = data.message 
          }).then(() => { 
            router.go(0);
          })
        })
        .catch(err => {
          err.json().then(data => { errorMessage.value = data.message } )
        })
    }

    // get file owner name
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
      wid,
      getUserInfo,
      myUserInfo,
      //
      myUserWorkspaces,
      currentWorkspace,
      getUserWorkspaces,
      //
      WorkspaceFiles,
      getFilteredWorkspaceFiles,
      getWorkspaceFiles,
      getFileInfo,
      // 
      filename,
      selectedTag,
      createFile,
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
      filterSelectedTag,
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
    // getOwnerInfo(ownerId) {
    //   try {
    //     fetch(`http://localhost:3080/api/getUserName/${ownerId}`)
    //     .then(res => res.json())
    //     .then(res => {
    //       this.ownerInfo.username = res.data;
    //       console.log(this.ownerInfo.username)
    //       if(this.ownerInfo.username === this.myUserInfo.username){
    //         this.ownerInfo.isOwner = true;
    //         console.log(this.ownerInfo.isOwner)
    //       }
    //       // console.log(ownerInfo);
    //     })
    //   }
    //   catch(error) {
    //     console.log(error);
    //   }
    // },
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
.selectWrapper{
  width:200px;
  padding:20px;
  height: 90px;
}

</style>