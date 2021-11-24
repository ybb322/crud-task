<template>
  <v-container class="wrapper">
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        sm="12"
        md="12"
      >
        <h1 class="mb-5">
          {{ usersTabTitle }}
        </h1>
        <v-row
          justify="start"
          no-gutters
        >
          <v-col
            cols="4"
            sm="2"
            md="1"
          >
            <v-btn
              block
              class="blue-grey darken-2 mb-5"
              @click="createItem"
            >
              New item
            </v-btn>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="apiData"
          :items-per-page="-1"
          class="elevation-15"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="getOneItem(item)">
              mdi-account
            </v-icon>
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-dialog v-model="itemDialog" width="400" class="item-dialog">
        <v-card max-width="400" class="edit-dialog-card dialog-card">
          <v-row justify="center">
            <v-card-title class="mt-3">{{ itemDialogTitle }}</v-card-title>
            <v-col cols="10">
              <v-text-field
                label="Name"
                v-model="editedItem.name"
                label="Name"
              />
              <v-text-field
                v-model="editedItem.username"
                label="Username"
              />
              <v-text-field
                v-model="editedItem.email"
                label="Email"
              />
              <v-text-field
                v-model="editedItem.address.city"
                label="City"
              />
              <v-text-field
                v-model="editedItem.address.street"
                label="Street"
              />
              <v-text-field
                v-model="editedItem.address.suite"
                label="Suite"
              ></v-text-field>
              <v-row justify="center" class="mb-3">
                <v-col cols="12">
                  <v-btn
                    class="mb-3"
                    block
                    color="blue-grey darken-1"
                    @click="saveChanges"
                    >Save</v-btn
                  >
                  <v-btn
                    plain
                    block
                    color="grey--text text--lighten-1 blue-grey darken-4"
                    @click="cancelChanges"
                    >Cancel</v-btn
                  >
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Vue from "vue";

export default {
  data() {
    return {
      headers: [
        {
          text: 'ID',
          value: 'id',
        },
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Username',
          value: 'username',
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'City',
          value: 'address.city',
        },
        {
          text: 'Street',
          value: 'address.street',
        },
        {
          text: 'Suite',
          value: 'address.suite',
        },
        {
          text: 'Actions',
          value: 'actions',
        },
      ],
      usersTabTitle: 'Users data',
      id:null,
      apiData: [],
      editedIndex: -1,
      newItemDialog: false,
      itemDialog: false,
      editedItem: {
        id: '',
        name: '',
        username: '',
        email: '',
        address: {
          city: '',
          street: '',
          suite: '',
        },
      },
      newItem: {
        id: '',
        name: '',
        username: '',
        email: '',
        address: {
          city: '',
          street: '',
          suite: '',
        },
      },
      defaultItem: {
        id: '',
        name: '',
        username: '',
        email: '',
        address: {
          city: '',
          street: '',
          suite: '',
        },
      },
    };
  },
  watch: {
    itemDialog(val) {
      val || this.cancelChanges();
    },
  },
  computed: {
    itemDialogTitle() {
      if (this.editedIndex === -1) {
        return (this.itemDialogTitle = "New Item");
      } else {
        return (this.itemDialogTitle = "Edit Item");
      }
      //  return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  async fetch() {
    // Getting data from remote server
    this.apiData = await this.$api.users.find();
  },
  methods: {
    async getOneItem(item) {
      await this.$api.users.findOne(item.id);
    },
    editItem(item) {
      // Editing data locally
      this.editedIndex = this.apiData.indexOf(item);
      this.editedItem = JSON.parse(JSON.stringify(item));
      this.itemDialog = true;
    },
    async deleteItem(item) {
      // Deleting data on server
      if (this.apiData.indexOf(item) > 9) {
        item.id = this.apiData.indexOf(item) + 1;
      }
      await this.$api.users.remove(item.id);
      this.apiData.splice(this.apiData.indexOf(item), 1);
    },
    async saveChanges() {
      // Saving edited data locally
      if (this.editedIndex > -1) {
        Vue.set(
          this.apiData,
          this.editedIndex,
          JSON.parse(JSON.stringify(this.editedItem))
        );
        let userId = this.apiData.indexOf(this.apiData[this.editedIndex + 1]);
        let updatedItem = this.apiData[this.editedIndex];
        await this.$api.users.update(userId, updatedItem);
      } else {
        this.apiData.push(this.editedItem);
        let newItem = this.editedItem;
        await this.$api.users.create(newItem);
      }
      this.itemDialog = false;
      this.editedIndex = -1;
    },
    cancelChanges() {
      this.itemDialog = false;
      this.editedItem = JSON.parse(JSON.stringify(this.defaultItem));
      this.editedIndex = -1;
    },
    createItem() {
      if (this.editedIndex == -1) {
        this.itemDialogTitle = "New Item";
      } else {
        this.itemDialogTitle = "Edit Item";
      }
      this.itemDialog = true;
    },
    saveNewItem() {
      this.apiData.push(this.newItem);
      axios
        .post('https://jsonplaceholder.typicode.com/users', this.newItem)
        .then((response) => console.log(response));
      this.newItemDialog = false;
      this.newItem = { ...this.defaultItem };
    },
    fetchData() {
    },
  },
};
</script>

<style scoped>
.dialog-card {
  overflow: hidden;
}
</style>
