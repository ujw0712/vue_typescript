<template>
  <div class="submit-form col-md-6">
    <div>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="contents">Contents</label>
        <input
          class="form-control"
          id="contents"
          required
          v-model="contents"
          name="contents"
        />
      </div>

      <button class="btn btn-success" @click="add">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { createBoard } from "@/api";
import { Board } from "@/types";

export default defineComponent({
  setup() {
    const router = useRouter();

    const title = ref<string>('');
    const contents = ref<string>('');

    const add = () => {
      if (!title.value) {
        alert("title 입력 바람");
        return false;
      }
      if (!contents.value) {
        alert("contents 입력 바람");
        return false;
      }

      const params: Board = {
        id: 0,
        title: title.value,
        contents: contents.value,
      };

      const res = createBoard(params);
      if (res.result) {
        alert("등록되었습니다.");
        goList();
      }
    };

    const goList = () => router.push("/");

    return {
      title,
      contents,
      add,
    };
  },
});
</script>
