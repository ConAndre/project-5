<template>
  <div class="container wrapper">
    <span class="header">Home</span>
    <div class="container mb-5">
      <div v-if="!!Object.keys(getStateKey('data')).length">
        <div
          class="row justify-content-center"
          v-for="(value, key) in getStateKey('data')"
          :key="value"
        >
          {{ key }}: {{ value }}
        </div>
      </div>
      <div v-else>Data is empty</div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-3 col-lg-3 col-12">
        <div class="form-group">
          <label for="textbox">Input</label>
          <input
            class="form-control"
            type="text"
            name="textbox"
            id="textbox"
            v-model.lazy="inputText"
            @keyup.enter="inputRun"
          />
        </div>
        <div class="form-group">
          <button @click="reset" class="btn btn-warning">Reset</button>
          <button @click="run" class="btn btn-primary ms-3">Run</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import store from '@/store';

export default {
  name: 'home',
  data() {
    return {
      inputText: '',
    };
  },
  computed: {
    ...mapGetters(['getStateKey']),
  },
  methods: {
    ...mapActions(['setData']),
    reset() {
      store.replaceState({ data: { key: 'default' } });
    },
    inputRun() {
      this.setData({ key: this.inputText });
    },
    run() {
      alert('RAN');
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1em !important;
}
.header {
  font-weight: 700;
  font-size: 35px;
}
</style>