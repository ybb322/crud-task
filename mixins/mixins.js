export const Mixins = {
  methods: {
    async mixinFind() {
      this.items = await this.$api[this.entity].find();
    },
    async mixinFindOne(id) {
      this.item = await this.$api[this.entity].findOne(id);
    },
    mixinOpen(item = null) {
      this.editedItem = item
        ? JSON.parse(JSON.stringify(item))
        : JSON.parse(JSON.stringify(this.defaultItem));
      this.isDialogOpen = true;
    },
    async mixinStoreChanges() {
      let item;
      if (this.editedItem.id) {
        item = await this.$api[this.entity].store(
          this.editedItem,
          this.editedItem.id
        );
      } else {
        item = await this.$api[this.entity].store(this.editedItem);
      }
      this.$emit("save", item);
      this.close();
    },
    async mixinDeleteItem(item) {
      //If local array has <100 items, the item.id will differ from the remote array.
      //Passing item as parameter to sync local & remote deleting.
      let deleteStatus = await this.$api[this.entity].remove(item.id);
      deleteStatus === 200
        ? this.items.splice(this.items.indexOf(item), 1)
        : alert("There's some problem with deleting on server!");
    },
    mixinSaveChanges(item) {
      const editedItemIndex = this.items.findIndex(
        (currentItem) => currentItem.id === item.id
      );
      if (editedItemIndex === -1) {
        // New item always has id === 101 i.e. it never exists in the local array initially.
        // Next new item always overwrites the old one.
        this.items.push(item);
      } else {
        this.items.splice(editedItemIndex, 1, item);
      }
    },
  },
};
