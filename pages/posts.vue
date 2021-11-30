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
          <v-icon class="ma-2" small @click="console(item.id)">
            mdi-account
          </v-icon>
          <!--</v-list-item-action>-->
          <!--<v-list-item-action>-->
          <v-icon class="ma-2" small @click="console(item)">
            mdi-pencil
          </v-icon>
          <!--</v-list-item-action>-->
          <!--<v-list-item-action>-->
          <v-icon class="ma-2" small @click="console(item.body)">
            mdi-delete
          </v-icon>
          <!--</v-list-item-action>-->
          <h5 class="ml-6 text--disabled" v-text="item.id"></h5>
        </v-list-item>

        <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
      </template>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  async fetch() {
    this.items = await this.$api.posts.find();
  },
  methods: {
    console(item) {
      console.log(item);
    },
  },
};
</script>
