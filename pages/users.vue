<template>
  <v-container class="wrapper">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="12">
        <h1 class="mb-5">Users</h1>
        <v-row justify="start" no-gutters>
          <v-col cols="4" sm="2" md="1">
            <v-btn block class="blue-grey darken-2 mb-5" @click="showDialog()">
              New item
            </v-btn>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="-1"
          class="elevation-15"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="getOneItem(item)">
              mdi-account
            </v-icon>
            <v-icon small class="mr-2" @click="showDialog(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-dialog
        v-model="isDialogOpen"
        width="400"
        class="item-dialog"
        @click:outside="cancelChanges()"
      >
        <v-card max-width="400" class="edit-dialog-card dialog-card">
          <v-row justify="center">
            <v-card-title class="mt-3">{{
              this.editedItem.id ? "Edit Item" : "New Item"
            }}</v-card-title>
            <v-col cols="10">
              <v-text-field v-model="editedItem.name" label="Name" />
              <v-text-field v-model="editedItem.username" label="Username" />
              <v-text-field v-model="editedItem.email" label="Email" />
              <v-text-field v-model="editedItem.address.city" label="City" />
              <v-text-field
                v-model="editedItem.address.street"
                label="Street"
              />
              <v-text-field v-model="editedItem.address.suite" label="Suite">
              </v-text-field>
              <v-row justify="center" class="mb-3">
                <v-col cols="12">
                  <v-btn
                    class="mb-3"
                    block
                    color="blue-grey darken-1"
                    @click="saveChanges()"
                    >Save</v-btn
                  >
                  <v-btn
                    plain
                    block
                    color="grey--text text--lighten-1 blue-grey darken-4"
                    @click="cancelChanges()"
                    >Cancel</v-btn
                  >
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
export default {
  data() {
    return {
      headers: [
        {
          text: "ID",
          value: "id",
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Username",
          value: "username",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "City",
          value: "address.city",
        },
        {
          text: "Street",
          value: "address.street",
        },
        {
          text: "Suite",
          value: "address.suite",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      items: [],
      idCounter: 1000,
      isDialogOpen: false,
      editedItem: {},
      defaultItem: {
        id: "",
        name: "",
        username: "",
        email: "",
        address: {
          city: "",
          street: "",
          suite: "",
        },
      },
    };
  },
  async fetch() {
    // Getting data from remote server
    this.items = await this.$api.users.find();
  },
  created() {
    this.editedItem = JSON.parse(JSON.stringify(this.defaultItem));
  },
  methods: {
    async getOneItem(item) {
      //Getting one item from remote server
      await this.$api.users.findOne(item.id);
    },
    showDialog(item = null) {
      //Show modal window for New Item / Edit Item
      //Check if item has any values
      //? the item already exists == editing
      //: it's a new item == clear the inputs
      this.editedItem = item
        ? JSON.parse(JSON.stringify(item))
        : JSON.parse(JSON.stringify(this.defaultItem));
      this.isDialogOpen = true;
    },
    async deleteItem(item) {
      // Deleting the item on server, checking if it's deleted
      // ? Delete it locally
      // : Alert an error
      (await this.$api.users.remove(item.id)) == 200
        ? this.items.splice(this.items.indexOf(item), 1)
        : alert("There's some problem with deleting on server!");
    },
    async saveChanges() {
      // Saving edited data on server
      // Check if the item already existed
      if (this.editedItem.id) {
        //If true == Pass the item.id as a parameter to store() in api.js
        //Updating the item on server
        const response = await this.$api.users.store(
          this.editedItem,
          this.editedItem.id
        );
        //Find the index of the editedItem to splice it locally
        const editedItemIndex = this.items.findIndex(
          (item) => item.id == this.editedItem.id
        );
        //Updating the response.data locally
        this.items.splice(
          editedItemIndex,
          1,
          JSON.parse(JSON.stringify(response))
        );
      } else {
        //If the item didn't exist (=creating)
        //Creating data on server
        const response = await this.$api.users.store(this.editedItem);
        //Assigning unique fake id to the item
        response.id = this.idCounter++;
        //Pushing the response.data locally
        this.items.push(response);
      }
      this.isDialogOpen = false;
    },
    cancelChanges() {
      this.isDialogOpen = false;
      this.editedItem = JSON.parse(JSON.stringify(this.defaultItem));
    },
  },
};
</script>

<style scoped>
.dialog-card {
  overflow: hidden;
}
</style>
