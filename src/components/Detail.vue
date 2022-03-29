<template>
  <div class="edit-form col-md-6">
    <h4>Board Detail</h4>

    <div class="form-group">
      <label for="title">Title</label>
      <input
          type="text"
          class="form-control"
          id="title"
          v-model="item.title"
      />
    </div>

    <div class="form-group">
      <label for="contents">contents</label>
      <input
          type="text"
          class="form-control"
          id="contents"
          v-model="item.contents"
      />
    </div>

    <button class="btn btn-danger mr-2" @click="remove">
      Delete
    </button>

    <button class="btn btn-success mr-2" @click="edit">
      Update
    </button>

    <button class="btn btn-primary" @click="goList">
      List
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { getBoardDetail, updateBoard, deleteBoard } from "@/api";
import {Board, Response} from "@/types";

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()

    const item = ref<any>({} as Board);

    const getItem = () => {
      const res: Response = getBoardDetail(parseInt(route.params.id.toString()));
      if (res.result) {
        item.value = res.data;
      }
    }

    const edit = () => {
      const res: Response = updateBoard(item.value);
      if (res.result) {
        alert('변경되었습니다.')
      }
    }

    const remove = () => {
      const res: Response = deleteBoard(parseInt(route.params.id.toString()));
      if (res.result) {
        alert('삭제되었습니다.')
        goList()
      }
    }

    const goList = () => router.push('/');

    getItem();

    return {
      item,
      edit,
      remove,
      goList,
    }
  },
});
</script>