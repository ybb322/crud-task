<template>
  <v-container class="wrapper">
    <h1>Posts</h1>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-list-item :key="item.title">
          <v-list-item-content class="pr-10">
            <v-list-item-subtitle v-text="item.userId"></v-list-item-subtitle>
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle v-text="item.body"></v-list-item-subtitle>
          </v-list-item-content>
          <!--<v-list-item-action>-->
          <v-icon class="ma-2" small @click="getItem(item.id)">
            mdi-account
          </v-icon>
          <!--</v-list-item-action>-->
          <!--<v-list-item-action>-->
          <v-icon class="ma-2" small @click="showDialog(item)">
            mdi-pencil
          </v-icon>
          <!--</v-list-item-action>-->
          <!--<v-list-item-action>-->
          <v-icon class="ma-2" small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
          <!--</v-list-item-action>-->
          <h5 class="ml-6 text--disabled" v-text="item.id"></h5>
        </v-list-item>

        <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
      </template>
    </v-list>

    <v-dialog width="400" class="item-dialog" v-model="isDialogOpen">
      <v-card max-width="400">
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
        <v-btn block class="mb-4">Save</v-btn>
        <v-btn block>Cancel</v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      isDialogOpen: false,
      editedItem: {},
    };
  },
  async fetch() {
    this.items = await this.$api.posts.find();
  },
  methods: {
    async getItem(id) {
      console.log(await this.$api.posts.findOne(id));
    },
    async deleteItem(item) {
      (await this.$api.posts.remove(item.id)) == 200
        ? this.items.splice(this.items.indexOf(item), 1)
        : console.log("error");
    },
    showDialog(item = null) {
      this.editedItem = JSON.parse(JSON.stringify(item));
      this.isDialogOpen = true;
    },
  },
};
</script>
