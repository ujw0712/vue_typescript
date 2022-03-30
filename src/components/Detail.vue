<template>
  <div class="edit-form col-md-6">
    <h4>Board Detail</h4>

    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" class="form-control" id="title" v-model="title" />
    </div>

    <div class="form-group">
      <label for="contents">contents</label>
      <input
        type="text"
        class="form-control"
        id="contents"
        v-model="contents"
      />
    </div>

    <button class="btn btn-danger mr-2" @click="remove">Delete</button>

    <button class="btn btn-success mr-2" @click="edit">Update</button>

    <button class="btn btn-primary" @click="goList">List</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getBoardDetail, updateBoard, deleteBoard } from "@/api";
import { Board } from "@/types";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const id = ref<number>();
    const title = ref<string>();
    const contents = ref<string>();

    const getItem = () => {
      const res = getBoardDetail(parseInt(route.params.id.toString()));
      if (res.result) {
        id.value = res.data?.id;
        title.value = res.data?.title;
        contents.value = res.data?.contents;
      }
    };

    const edit = () => {
      const res = updateBoard({
        id: id.value,
        title: title.value,
        contents: contents.value,
      } as Board);
      if (res.result) {
        alert('변경되었습니다.')
      }
    };

    const remove = () => {
      const res = deleteBoard(parseInt(route.params.id.toString()));
      if (res.result) {
        alert('삭제되었습니다.');
        goList();
      }
    };

    const goList = () => router.push("/");

    getItem();

    return {
      title,
      contents,
      edit,
      remove,
      goList,
    };
  },
});
</script>