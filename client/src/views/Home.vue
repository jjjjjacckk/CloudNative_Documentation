<template>
  <div class="d-flex">
    <!-- sidebar -->
    <!-- <div class="col-lg-2 col-mid-3 col-sm-3 sidebar"> -->
    <div class="sidebar">
      <div class="d-flex flex-column flex-shrink-0 p-3" style="background-color:#E5E8E8; height:100vh;">
        <span class="fs-4 fw-semibold">My Workspace</span>
        <hr style="border-color:#909497">
        <form>
          <input class="form-control mb-2" type="text" placeholder="Search file ..." aria-label="Search">
        </form>
        <button class="btn btn-text-color mb-1 text-start" onmouseover="this.style.backgroundColor='#D7DBDD';" onmouseout="this.style.backgroundColor='#E5E8E8';" data-bs-toggle="modal" data-bs-target="#aboutModal">
          <i class="fa-solid fa-lightbulb" style="width:23px"></i> About
        </button>
        <button class="btn btn-text-color mb-1 text-start" onmouseover="this.style.backgroundColor='#D7DBDD';" onmouseout="this.style.backgroundColor='#E5E8E8';">
          <i class="fa-solid fa-file" style="width:23px"></i> Create a file
        </button>
        <button class="btn btn-text-color mb-1 text-start" @click="isCreate=!isCreate" onmouseover="this.style.backgroundColor='#D7DBDD';" onmouseout="this.style.backgroundColor='#E5E8E8';">
          <i class="fa-solid fa-user-plus" style="width:23px"></i> Create a workspace
        </button>
        <div v-if="isCreate" class="mx-2">
          <div class="d-flex my-2">
            <button class="btn btn-text-color btn-outline-dark me-3 text-nowrap my-2" @click="createWorkspaceModal=true">
              <i class="fa-solid fa-plus"></i>
            </button>
            <dropSearch class="form-control" 
                        :options="options"
                        :disabled="false"
                        :placeholder="'搜尋隊伍...'"
                        v-on:selected="validateSelection">
            </dropSearch>
          </div>
        </div>
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
              <div class="list-group">
                <button class="btn btn-text-color btn-workspace btn-block m-1">Group1</button>
                <button class="btn btn-text-color btn-workspace btn-block m-1">Group2</button>
                <button class="btn btn-text-color btn-workspace btn-block m-1">Group3</button>
              </div>
            </div>
          </div>
        </div>
        <div class="" style="margin-top: auto;">
          <div class="d-flex justify-content-between align-items-center">
            <span>
              <i class="fa-solid fa-user"></i>&nbsp;&nbsp;
              <span class="fs-5 fw-semibold">User Name</span>
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
      <div class="card border-0">
        <div class="card-body" style="padding-left:32px">
          <div class="col-1">
            <select class="form-select">
              <option value="" selected disabled>Tags</option>
              <option value="all">All</option>
              <option value="untitled">Untagged</option>
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
              <div class="d-flex flex-column card-body grid-item btn file-card">
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
              </div>
              <div class="d-flex flex-column card-body grid-item btn file-card">
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
              </div>
              <div class="d-flex flex-column card-body grid-item btn file-card">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- About Modal !-->
      <!-- Create File Modal !-->
      <!-- Create Workspace Modal ! -->
    </div>

    <div id="aboutModal" class="modal" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">About</h4>
            <!-- <button type="button" class="btn-close" @click="aboutModal=false"></button> -->
            <button type="button" class="close" data-bs-dismiss="modal">&times</button>
          </div>
          <!-- <div v-if="errorMessage !== ''" class="alert alert-danger mx-4" role="alert">
            <span>{{ errorMessage }}</span>
          </div> -->
          <div class="modal-body">
            test
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
import DropSearch from '../components/dropSearch.vue';
export default{
  components:{
    'dropSearch':DropSearch,
  },
  data() {
    return {
      createWorkspaceModal: false,
      isOwner: true,
      isCreate: false,
    }
  },
  setup(){
  },
  methods: {
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

</style>