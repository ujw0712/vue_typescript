<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Board List</h4>
      <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(item, index) in list"
            :key="index"
        >
          {{ item.title }}
          <button class="btn btn-sm btn-primary float-right" @click="$router.push(`/${item.id}`)">View</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getBoardList } from "@/api";
import { Board, Response } from "@/types";
export default defineComponent({
  setup() {
    const list = ref<any>([] as Board[]);
    const getList = () => {
      const res: Response = getBoardList()
      if (res.result) {
        list.value = res.data
      }
    }



    getList();

    return {
      list,

    }
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>