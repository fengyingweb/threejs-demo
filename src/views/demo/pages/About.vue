<template>
  <div class="about">
    <h1>This is an about page</h1>
    <img v-if="show" ref="img" crossOrigin="anonymous" src="../../../assets/logo.png" alt="图片不存在" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = true;
    this.$nextTick(()=> {
      if (this.$refs['img']) {
        console.log(this.$refs['img']);
        this.$refs['img'].addEventListener('load', ()=> {
          console.log('img load');
        }, false)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .about {
    width: 100%;
    height: 667px;
  }
</style>
