<template>
  <div
    class="light"
    :class="`${light.color} ${light.active ? 'active' : ''}`"
  ></div>
</template>

<script>
export default {
  name: "Light",
  props: {
    light: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped>
.light {
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0.5;
}
.red {
  background-color: red;
  box-shadow: 1px 1px 20px red;
}
.yellow {
  background-color: yellow;
  box-shadow: 1px 1px 20px yellow;
}
.green {
  background-color: rgb(3, 192, 3);
  box-shadow: 1px 1px 20px rgb(1, 200, 1);
}
.active {
  opacity: 1;
}
</style>