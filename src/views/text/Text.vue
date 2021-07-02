<template>
  <div class="ww">
    <div class="flex m-tb-10">
      <span class="m-l-15" @click="zh(0)">综合排序 </span>
      <span class="m-l-15" @click="zh(-1)">从高到低 </span>
      <span class="m-l-15" @click="zh(1)">从低到高 </span>
    </div>
    <div class="flex ww flex-wrap">
      <div v-for="(item, index) in data" :key="index" class="imgbox mr-5">
        <img :src="item.productImageBig" alt="" />
        dafdf
      </div>
    </div>
    <div class="block flex jce">
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="datas.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Demo from "../../components/demo/Demo.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      data: [],
      datas: [],
      // 当前显示的页数
      currentPage: 1,
      // 显示条数
      pageSize: 10,
    };
  },
  components: { Demo },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      // 根据页数发请求
      axios
        .get(`/api//goods/allGoods?page=${val}&&size= ${this.pageSize}`)
        .then((res) => {
          // console.log(res.data.data);
          this.data = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //根据排序请求数据
    getData(a) {
      console.log(this.currentPage);
      console.log(a);
      let url = null;
      if (a === 0 || !Boolean(a)) {
        url = `/api//goods/allGoods?page=${this.currentPage}&&size= ${this.pageSize}`;
      } else {
        url = `/api//goods/allGoods?page=${this.currentPage}&&size= ${this.pageSize}&&sort=${a}`;
      }
      axios
        .get(url)
        .then((res) => {
          // console.log(res.data.data);
          this.data = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //
    zh(val) {
      this.getData(val);
    },
  },
  mounted() {
    // 请求原始数据
    axios
      .get(`/api//goods/allGoods`)
      .then((res) => {
        console.log(res.data.data);
        this.data = res.data.data;
        this.datas = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.imgbox {
  width: 24%;
  img {
    width: 100%;
  }
}
</style>