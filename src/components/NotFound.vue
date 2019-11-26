<script>
export default {
  name: 'NotFound',
  data () {
    return {
      notFoundImg: require('@/assets/img/404.png')
    }
  },

  render (h) {
    return h('div', {
      class: 'wrapper'
    }, [
      h('div', {
        class: 'img-wrapper'
      }, [
        h('img', {
          class: 'img404',
          attrs: {
            src: this.notFoundImg
          }
        })
      ])
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/mixin.scss';
  .wrapper {
    @include flex();
    width: 100%;
    height: 100%;
  }

  .img-wrapper {
    width: 100%;
    height: 320px;
  }
  .img404 {
    display: block;
    width: 100%;
  }
</style>
