<template>
  <v-container class="wrapper">
    <h1>Posts</h1>
    <v-btn class="mb-2 mt-4" @click="$refs.PostsEditDialog.open()"
      >New Item</v-btn
    >
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-list-item :key="item.title">
          <v-list-item-content class="pr-10">
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle
              class="list-item-subtitle"
              v-text="item.body"
            ></v-list-item-subtitle>
          </v-list-item-content>
          <v-icon
            class="ma-2"
            small
            @click="$refs.PostsDetailsDialog.open(item.id)"
          >
            mdi-account
          </v-icon>
          <v-icon class="ma-2" small @click="$refs.PostsEditDialog.open(item)">
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

    <PostsEditDialog ref="PostsEditDialog" @save="renderChanges" />
    <PostsDetailsDialog ref="PostsDetailsDialog" />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      idCounter: 1000,
      item: {},
      defaultItem: {
        id: "",
        userId: "",
        title: "",
        body: "",
      },
    };
  },
  async fetch() {
    this.items = await this.$api.posts.find();
  },
  methods: {
    async deleteItem(item) {
      (await this.$api.posts.remove(item.id)) == 200
        ? this.items.splice(this.items.indexOf(item), 1)
        : alert("There's some problem with deleting on server!");
    },
    async renderChanges(item) {
      if (item.id != 101) {
        const editedItemIndex = this.items.findIndex(
          (currentItem) => currentItem.id == item.id
        );
        this.items.splice(editedItemIndex, 1, item);
      } else {
        item.id = this.idCounter++;
        this.items.push(item);
      }
    },
  },
};
</script>
