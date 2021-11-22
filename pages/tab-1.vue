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
          class="elevation-1"
        >
          <template #[`item.actions`]="{ item }">
              <v-icon
              small
              class="mr-2"
              @click="getOneItem(item)"
            >
              mdi-account
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
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
      <v-dialog
        v-model="editDialog"
        width="400"
        class="edit-dialog"
      >
        <v-card
          max-width="400"
          class="edit-dialog-card dialog-card"
        >
          <v-row justify="center">
            <v-card-title class="mt-3">
              Edit item
            </v-card-title>
            <v-col cols="10">
              <v-text-field
                v-model="editedItem.id"
                class="shrink"
                label="ID"
              />
              <v-text-field
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
              />
              <v-row
                justify="center"
                class="mb-3"
              >
                <v-col cols="4">
                  <v-btn
                    block
                    color="blue-grey darken-4"
                    @click="saveChanges"
                  >
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="newItemDialog"
        width="400"
      >
        <v-card
          max-width="400"
          class="dialog-card"
        >
          <v-row justify="center">
            <v-card-title class="mt-3">
              New item
            </v-card-title>
            <v-col cols="10">
              <v-text-field
                v-model="newItem.id"
                label="ID"
              />
              <v-text-field
                v-model="newItem.name"
                label="Name"
              />
              <v-text-field
                v-model="newItem.username"
                label="Username"
              />
              <v-text-field
                v-model="newItem.email"
                label="Email"
              />
              <v-text-field
                v-model="newItem.address.city"
                label="City"
              />
              <v-text-field
                v-model="newItem.address.street"
                label="Street"
              />
              <v-text-field
                v-model="newItem.address.suite"
                label="Suite"
              />
              <v-row
                justify="center"
                class="mb-3"
              >
                <v-col cols="4">
                  <v-btn
                    block
                    color="blue-grey darken-4"
                    @click="saveNewItem"
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
    <v-btn
      class="primary"
      @click="fetchData"
    >
      Fetch data with api.js
    </v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';

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
      newItemDialog: false,
      editDialog: false,
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
  async fetch() {
    // Getting data from remote server
    this.apiData = await this.$api.users.find();
  },
  methods: {
    async getOneItem (item) {
    await this.$api.users.findOne(item.id)
    },
    deleteItem(item) {
      // Deleting data on server
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${item.id}`)
        .then((response) => {
          if (response.status == 200) {
            // If successful => deleting data locally
            this.apiData.splice(this.apiData.indexOf(item), 1);
            console.log(`Item ${item.id} was deleted from the remote storage!`);
          }
        });
    },
    editItem(item) {
      // Editing data locally
      this.editedIndex = this.apiData.indexOf(item);
      this.editedItem.id = item.id;
      this.editedItem.name = item.name;
      this.editedItem.username = item.username;
      this.editedItem.email = item.email;
      this.editedItem.address.city = item.address.city;
      this.editedItem.address.street = item.address.street;
      this.editedItem.address.suite = item.address.suite;
      this.editDialog = true;
    },
    saveChanges() {
      // Saving edited data locally
      this.apiData[this.editedIndex].id = this.editedItem.id;
      this.apiData[this.editedIndex].name = this.editedItem.name;
      this.apiData[this.editedIndex].username = this.editedItem.username;
      this.apiData[this.editedIndex].email = this.editedItem.email;
      this.apiData[this.editedIndex].address.city = this.editedItem.address.city;
      this.apiData[this.editedIndex].address.street = this.editedItem.address.street;
      this.apiData[this.editedIndex].address.suite = this.editedItem.address.suite;
      // Updating saved data on server
      axios
        .patch(
          `https://jsonplaceholder.typicode.com/users/${this.apiData.indexOf(
            this.apiData[this.editedIndex + 1],
          )}`,
          {
            body: {
              id: `${this.editedItem.id}`,
              name: `${this.editedItem.name}`,
              username: `${this.editedItem.username}`,
              email: `${this.editedItem.id}`,
              address: {
                city: `${this.editedItem.address.city}`,
                street: `${this.editedItem.address.street}`,
                suite: `${this.editedItem.address.suite}`,
              },
            },
          },
        )
        .then((response) => console.log(response));
      this.editDialog = false;
    },
    createItem() {
      this.newItemDialog = true;
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
