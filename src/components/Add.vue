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
            v-model="item.title"
            name="title"
        />
      </div>

      <div class="form-group">
        <label for="contents">Contents</label>
        <input
            class="form-control"
            id="contents"
            required
            v-model="item.contents"
            name="contents"
        />
      </div>

      <button class="btn btn-success">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Board} from "@/types";
export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()

    const item = ref<any>({} as Board);

    return {
      item,
    }

  }
});
</script>