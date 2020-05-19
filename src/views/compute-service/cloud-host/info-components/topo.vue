<template lang="html">
  <div id="topo-container">
    <v-stage :config="configKonva">
      <v-layer>
        <v-image :config="{ x: 100, y: 100, image: image1 }"></v-image>
        <!-- <v-circle :config="configCircle"></v-circle>
        <v-line :config="{
          x: 100,
          y: 160,
          points: [0, 0, 0, 100],
          strokeWidth: 10,
          lineCap: 'round',
          lineJoin: 'round',
          stroke: 'black'
        }"/> -->
        <v-text :config="{
          text: '<h1>ddddd</h1>',

        fontSize: 30,
        fontFamily: 'Calibri',}"></v-text>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
export default {
  data() {
    return {
      configKonva: {
        width: 300,
        height: 1000
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4
      },
      image1: '',
      image2: '',
      image3: '',
      image4: ''
    }
  },
  methods: {

  },
  mounted() {
    console.log(document.getElementById('topo-container').offsetWidth)
    const image = new Image()
    image.src = require('@/assets/img/1.png')
    image.onload = () => {
      // set image only when it is loaded
      this.image1 = image;
    };
  }
}
</script>

<style lang="scss" scoped>
</style>
