<template lang="html">
  <div id="topo">
    <v-stage :config="configKonva">
      <v-layer>
        <template v-for="(item, index) in mockJson">
          <v-image
          :config="{
            x: centerRow - item.width / 2,
            y: item.y,
            image: item.imageObj,
            height: item.height,
            width: item.width

            }"></v-image>
            <v-line :config="{
              x: centerRow - 2,
              y: item.y + item.height,
              points: [0, 0, 0, 50],
              strokeWidth: 4,
              /* lineCap: 'round',
              lineJoin: 'round', */
              stroke: '#666'
            }"/>
        </template>
        <!-- <v-circle :config="configCircle"></v-circle> -->
        <!-- <v-line :config="{
          x: 100,
          y: 160,
          points: [0, 0, 0, 100],
          strokeWidth: 10,
          lineCap: 'round',
          lineJoin: 'round',
          stroke: 'black'
        }"/> -->
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mockJson: [
        { imgUrl: '4.png', type: 'img', text: '', height: 90, width: 143 },
        { imgUrl: '1.png', type: 'img', text: '', height: 50, width: 50 },
        { imgUrl: '2.png', type: 'img', text: '', height: 112, width: 129 },
        { imgUrl: '3.png', type: 'img', text: '', height: 38, width: 38 },
      ],
      configKonva: {
        width: 500,
        height: 1000
      },
      centerRow: ''
    }
  },
  methods: {

  },
  mounted() {
    this.configKonva.width = document.getElementById('topo').clientWidth
    this.centerRow = this.configKonva.width / 2
  },
  created() {
    let yh = 0
    this.mockJson.map(async (item, index) => {
      if (index) {
        yh += (this.mockJson[index - 1].height + 50)

        this.$set(item, 'y', yh)
      } else {
        this.$set(item, 'y', 0)
      }
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
