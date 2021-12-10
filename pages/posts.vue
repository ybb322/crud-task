<template>
  <v-container class="wrapper">
    <h1>Posts</h1>
    <v-btn class="mb-2 mt-4" @click="$refs.PostsEditDialog.open()"
      >New Item</v-btn
    >
    <v-list three-line>
      <template v-for="item in items">
        <v-list-item :key="'A' + item.id">
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
        <v-divider :key="'B' + item.id"></v-divider>
      </template>
    </v-list>
    <PostsEditDialog ref="PostsEditDialog" @save="saveChanges" />
    <PostsDetailsDialog ref="PostsDetailsDialog" />
  </v-container>
</template>

<script>
import { Mixins } from "~/mixins/mixins";
export default {
  mixins: [Mixins],
  data() {
    return {
      items: [],
      entity: "posts",
    };
  },
  async fetch() {
    await this.mixinFind();
  },
  methods: {
    async deleteItem(item) {
      await this.mixinDeleteItem(item);
    },
    saveChanges(item) {
      this.mixinSaveChanges(item);
    },
  },
};
</script>
