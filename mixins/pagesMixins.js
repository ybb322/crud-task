export const pagesMixins = {
  methods: {
    async find() {
      this.items = await this.$api[this.entity].find();
    },
    async deleteItem(item) {
      //If local array has <100 items, the item.id will differ from the remote array.
      //Passing item as parameter to sync local & remote deleting.
      let deleteStatus = await this.$api[this.entity].remove(item.id);
      deleteStatus === 200
        ? this.items.splice(this.items.indexOf(item), 1)
        : alert("There's some problem with deleting on server!");
    },
    saveChanges(item) {
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
