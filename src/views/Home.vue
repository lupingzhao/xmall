<template>
  <div class="p-b-25">
    <carousel v-if="carousel" :carousel="carousel"></carousel>
    <demo v-if="activity" :activity="activity"></demo>
    <hot v-if="hot" :hot="hot" class="m-tb-25"></hot>
    <!-- <all-select v-if="allselect" :allselect="allselect"></all-select> -->
    <!-- <all-select v-if="allselect" :allselect="allselect1[1]"></all-select>
    <all-select v-if="allselect" :allselect="allselect1[2]"></all-select> -->
    <ademo v-if="allselect1" :allselect1="allselect1"></ademo>

    <container-foot v-if="foot" :foot="foot"></container-foot>
  </div>
</template>

<script>
import axios from "axios";

import Carousel from "../components/carousel/Carousel.vue";
import Demo from "../components/demo/Demo.vue";
import Hot from "../components/carousel/hot.vue";
import AllSelect from "../components/carousel/AllSelect.vue";
import Ademo from "../components/carousel/Ademo.vue";
import ContainerFoot from "../components/carousel/containerFoot.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      carousel: null,
      activity: null,
      hot: null,
      allselect: null,
      allselect1: null,
      foot: null,
    };
  },
  components: { Carousel, Demo, Hot, AllSelect, Ademo, ContainerFoot },
  methods: {
    getData() {
      axios
        .get("/api/goods/home")
        .then((res) => {
          if (res.data.code === 200) {
            // console.log(res.data.data);
            this.carousel = res.data.data[0];
            this.activity = res.data.data[1];
            this.hot = res.data.data[2];
            this.allselect = res.data.data[3];
            this.foot = res.data.data[6];
            this.allselect1 = res.data.data.slice(3, 6);
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 1000px;
}
</style>