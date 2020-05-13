<template lang="html">
  <div class="tree">
    <!-- <v-stage :config="configKonva">
      <v-layer>
        <v-circle :config="configCircle"></v-circle>
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
    </v-stage> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      configKonva: {
        width: 200,
        height: 1000
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
