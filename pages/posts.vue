<template>
  <v-container class="wrapper">
    <h1>Posts</h1>
    <v-btn class="mb-2 mt-4" @click="showDialog()">New Item</v-btn>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-list-item :key="item.title">
          <v-list-item-content class="pr-10">
            <v-list-item-subtitle v-text="item.userId"></v-list-item-subtitle>
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle
              class="list-item-subtitle"
              v-text="item.body"
            ></v-list-item-subtitle>
          </v-list-item-content>
          <v-icon class="ma-2" small @click="getOneItem(item)">
            mdi-account
          </v-icon>
          <v-icon class="ma-2" small @click="showDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon class="ma-2" small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
          <h5 class="ml-6 text--disabled" v-text="item.id"></h5>
        </v-list-item>
        <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
      </template>
    </v-list>

    <v-dialog
      width="400"
      v-model="isDialogOpen"
      @click:outside="cancelChanges()"
    >
      <v-card max-width="400" class="pa-4" v-show="isEditActive">
        <h2 class="text-center mb-6">
          {{ this.editedItem.id ? "Edit Item" : "New Item" }}
        </h2>
        <v-textarea
          auto-grow
          no-resize
          v-model="editedItem.title"
          label="Title"
        ></v-textarea>
        <v-textarea
          auto-grow
          no-resize
          v-model="editedItem.body"
          label="Body"
        ></v-textarea>
        <v-btn block class="mb-4" @click="saveChanges()">Save</v-btn>
        <v-btn block @click="cancelChanges()">Cancel</v-btn>
      </v-card>
      <v-card v-show="!isEditActive">
        <v-card-title>{{ editedItem.title }}</v-card-title>
        <v-card-text>{{ editedItem.body }}</v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      idCounter: 1000,
      isDialogOpen: false,
      isEditActive: false,
      editedItem: {},
      defaultItem: {
        id: "",
        userId: "",
        title: "",
        body: "",
      },
    };
  },
  async fetch() {
    // Getting data from remote server
    this.items = await this.$api.posts.find();
  },
  methods: {
    async getOneItem(item) {
      //Checking if the item actually exists on the server (there are 100 items initially)
      if (item.id <= 100) {
        //If true - get it.
        const response = await this.$api.posts.findOne(item.id);
        //Put its data into the modal
        this.editedItem = JSON.parse(JSON.stringify(response.data));
      } else {
        //If false - clear the text
        this.editedItem = JSON.parse(JSON.stringify(this.defaultItem));
        // Show the error
        this.editedItem.title = "This item doesn't exist on the server";
      }
      this.isEditActive = false;
      this.isDialogOpen = true;
    },
    showDialog(item = null) {
      //Show modal window for New Item / Edit Item
      //Check if item has any values
      //? the item already exists == editing
      //: it's a new item == clear the inputs
      this.editedItem = item
        ? JSON.parse(JSON.stringify(item))
        : JSON.parse(JSON.stringify(this.defaultItem));
      this.isEditActive = true;
      this.isDialogOpen = true;
    },
    async deleteItem(item) {
      // Deleting the item on server, checking if it's deleted
      // ? Delete it locally
      // : Alert an error
      (await this.$api.posts.remove(item.id)) == 200
        ? this.items.splice(this.items.indexOf(item), 1)
        : alert("There's some problem with deleting on server!");
    },
    async saveChanges() {
      // Saving edited data on server
      // Check if the item already existed
      if (this.editedItem.id) {
        //If true == Pass the item.id as a parameter to store() in api.js
        //Updating the item on server
        const response = await this.$api.posts.store(
          this.editedItem,
          this.editedItem.id
        );
        //Find the index of the editedItem to splice it locally
        const editedItemIndex = this.items.findIndex(
          (item) => item.id == this.editedItem.id
        );
        //Updating the response.data locally
        this.items.splice(editedItemIndex, 1, response);
      } else {
        //If the item didn't exist (=creating)
        //Creating data on server
        const response = await this.$api.posts.store(this.editedItem);
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
