<template lang="html">
  <div id="topo">
    <v-stage :config="configKonva">
      <v-layer>
        <!-- <v-image v-for="(item, index) in mockJson" :config="{ x: 100, y: 100 * (index + 1), image: item.imageObj }"></v-image> -->
        <!-- <v-circle :config="configCircle"></v-circle> -->
        <v-line :config="{
          x: 100,
          y: 160,
          points: [0, 0, 0, 100],
          strokeWidth: 10,
          lineCap: 'round',
          lineJoin: 'round',
          stroke: 'black'
        }"/>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mockJson: [
        { imgUrl: '4.png', type: 'img', text: '' },
        { imgUrl: '1.png', type: 'img', text: '' },
        { imgUrl: '2.png', type: 'img', text: '' },
        { imgUrl: '3.png', type: 'img', text: '' },
      ],
      configKonva: {
        width: 500,
        height: 1000
      }
    }
  },
  methods: {

  },
  mounted() {
    this.configKonva.width = document.getElementById('topo').clientWidth
  },
  created() {
    this.mockJson.map(async item => {
      this.$set(item, 'imageObj', await this.imageLoaded(item.imgUrl))
    })
  },
  methods: {
    imageLoaded(name) {
      const image = new Image()
      image.src = require('../../assets/img/' + name)
      return new Promise(resolve => {
        image.onload = () => {
          resolve(image)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
