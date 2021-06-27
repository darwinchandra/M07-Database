<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row bg-dark">
        <div class="col-lg-12">
          <p
            class="text-center text-light display-4 pt-2"
            style="font-size: 25px"
          >
            Darwin Chandra - 181110468
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-3">
        <div class="col-lg-6">
          <h3 class="text-primary">Registrasi obat</h3>
        </div>
        <div class="col-lg-6">
          <button
            class="btn btn-outline-primary float-end"
            @click="showAddModal = true"
          >
            Tambah Obat Baru
          </button>
        </div>
      </div>
      <hr class="bg-info" />
      <div class="alert alert-danger" v-if="errorMsg">Error</div>
      <div class="alert alert-success" v-if="successMsg">Success</div>

      <!-- Display Record -->
      <div class="row">
        <div class="col-lg-12">
          <table class="table table-bordered table-striped">
            <thead>
              <tr class="text-center bg-primary text-light">
                <th>ID</th>
                <th>Nama Obat</th>
                <th>kegunaan</th>
                <th>Harga</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center"
                v-for="(obat, index) in obats"
                :key="index"
              >
                <td>{{ obat.id }}</td>
                <td>{{ obat.namaObat }}</td>
                <td>{{ obat.kegunaan }}</td>
                <td>{{ obat.harga }}</td>
                <td>
                  <a
                    href="#"
                    class="text-success"
                    @click="
                      showEditModal = true;
                      selectObat(obat);
                    "
                    >Edit Obat</a
                  >
                </td>
                <td>
                  <a
                    href="#"
                    class="text-danger"
                    @click="
                      showDeleteModal = true;
                      selectObat(obat);
                    "
                    >Delete</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- tambah obat baru  -->
    <div id="overlay" v-if="showAddModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Obat baru</h5>
            <button
              type="button"
              class="btn-close"
              @click="
                showAddModal = false;
                clearAddObat();
              "
            ></button>
          </div>
          <div class="model-body p-4">
            <form action="#" method="POST">
              <div class="form-group mb-2">
                <input
                  type="text"
                  name="nama"
                  class="form-control form-control-lg"
                  placeholder="Nama Obat"
                  v-model="newObat.namaObat"
                />
              </div>
              <div class="form-group mb-2">
                <input
                  type="text"
                  name="kegunaan"
                  class="form-control form-control-lg"
                  placeholder="kegunaan"
                  v-model="newObat.kegunaan"
                />
              </div>
              <div class="form-group mb-2">
                <input
                  type="text"
                  name="harga"
                  class="form-control form-control-lg"
                  placeholder="Harga"
                  v-model="newObat.harga"
                />
              </div>
              <div class="form-group mb-2">
                <button
                  type="button"
                  class="btn btn-info btn-lg btn-block w-100"
                  @click="
                    showAddModal = false;
                    addObat();
                  "
                >
                  Tambah
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- edit obat  -->
    <div id="overlay" v-if="showEditModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Obat</h5>
            <button
              type="button"
              class="btn-close"
              @click="
                showEditModal = false;
                refreshList();
              "
            ></button>
          </div>
          <div class="model-body p-4">
            <form action="#" method="POST">
              <div class="form-group mb-2">
                <input
                  type="text"
                  name="nama"
                  class="form-control form-control-lg"
                  v-model="obatselected.namaObat"
                />
              </div>
              <div class="form-group mb-2">
                <input
                  type="text"
                  name="kegunaan"
                  class="form-control form-control-lg"
                  v-model="obatselected.kegunaan"
                />
              </div>
              <div class="form-group mb-2">
                <input
                  type="text"
                  name="harga"
                  class="form-control form-control-lg"
                  v-model="obatselected.harga"
                />
              </div>
              <div class="form-group mb-2">
                <button
                  type="button"
                  class="btn btn-info btn-lg btn-block w-100"
                  @click="
                    showEditModal = false;
                    updateObat();
                  "
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete obat  -->
    <div id="overlay" v-if="showDeleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Obat</h5>
            <button
              type="button"
              class="btn-close"
              @click="
                showDeleteModal = false;
                refreshList();
              "
            ></button>
          </div>
          <div class="model-body p-4">
            <h4>
              Aapakah yakin untuk hapus Obat '{{ obatselected.namaObat }}'?
            </h4>
            <hr />
            <button
              class="btn btn-danger btn-lg"
              @click="
                showDeleteModal = false;
                deleteObat();
              "
            >
              Yes
            </button>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <button
              class="btn btn-success btn-lg"
              @click="showDeleteModal = false"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataObatService from '../services/DataObatService';
export default {
  name: 'list-obat',
  data() {
    return {
      obats: [],
      obatselected: {},
      indexselected: -1,
      newObat: { namaObat: '', kegunaan: '', harga: '' },
      errorMsg: false,
      successMsg: false,
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
    };
  },
  methods: {
    getAllObat() {
      DataObatService.getAll()
        .then((response) => {
          this.obats = response.data.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.getAllObat();
      this.obatselected = {};
      this.indexselected = -1;
    },
    addObat() {
      this.newObat = {
        namaObat: this.newObat.namaObat,
        kegunaan: this.newObat.kegunaan,
        harga: this.newObat.harga,
      };
      DataObatService.create(this.newObat)
        .then((response) => {
          this.clearAddObat();
          this.getAllObat();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    clearAddObat() {
      this.newObat = { namaObat: '', kegunaan: '', harga: '' };
    },
    updateObat() {
      this.obatselected = {
        id: this.obatselected.id,
        namaObat: this.obatselected.namaObat,
        kegunaan: this.obatselected.kegunaan,
        harga: this.obatselected.harga,
      };
      console.log(this.obatselected);
      DataObatService.update(this.obatselected)
        .then((response) => {
          this.refreshList();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteObat() {
      DataObatService.delete(this.obatselected.id)
        .then((response) => {
          this.refreshList();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    selectObat(obat) {
      this.obatselected = obat;
    },
  },
  mounted() {
    this.getAllObat();
  },
};
</script>

<style>
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
</style>
