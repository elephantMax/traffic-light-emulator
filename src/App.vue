<template>
  <div id="app">
    <h1>Traffic Light Emulator</h1>
    <h3 class="timer">{{ timer }}</h3>
    <div class="lights">
      <Light v-for="light in lights" :key="light.index" :light="light" />
    </div>
  </div>
</template>

<script>
import Light from "./components/Light.vue";
export default {
  components: { Light },
  data() {
    return {
      lights: [
        { color: "red", url: "/red", duration: 10, active: false },
        { color: "yellow", url: "/yellow", duration: 3, active: false },
        { color: "green", url: "/green", duration: 15, active: false },
      ],
      activeLight: null,
      timer: null,
      direction: null,
    };
  },
  methods: {
    checkRouteParam() {
      return new Promise((res) => {
        const availableColors = ["red", "green", "yellow"];
        setTimeout(() => {
          if (!this.$route.params.color) return res(false);
          return res(availableColors.includes(this.$route.params.color));
        }, 0);
      });
    },
    startTimer() {
      setInterval(() => {
        this.timer -= 1;
        this.checkTimer();
        this.checkBlinking();
        this.saveToLocal();
      }, 1000);
    },
    checkTimer() {
      if (this.timer !== 0) return;
      this.setDirection();
      if (this.direction === "top") {
        this.activeLight =
          this.activeLight < this.lights.length - 1
            ? this.activeLight + 1
            : this.activeLight - 1;
      } else {
        this.activeLight =
          this.activeLight > 0 ? this.activeLight - 1 : this.activeLight + 1;
      }
      this.drawActiveLight(this.activeLight);
    },
    drawActiveLight() {
      this.lights.forEach((light, index) => {
        light.active = false;
        if (index === this.activeLight) {
          light.active = true;
          this.timer = this.timer ? this.timer : light.duration;
          if (this.$route.fullPath === light.url) return;

          this.$router.push(light.url);
        }
      });
    },
    getActiveLightByColor(color) {
      this.lights.forEach((light, index) => {
        if (light.url === "/" + color) {
          this.activeLight = index;
        }
      });
    },
    setDirection() {
      if (this.activeLight === this.lights.length - 1) {
        this.direction = "bot";
      } else if (this.activeLight === 0) this.direction = "top";
    },
    checkBlinking() {
      if (this.timer <= 3) {
        this.lights[this.activeLight].active = 3 % this.timer === 0;
      }
    },
    hasDataInLocal() {
      if (
        localStorage.getItem("timer") === null ||
        localStorage.getItem("color") === null ||
        localStorage.getItem("direction") === null
      ) {
        return false;
      }
      return true;
    },
    saveToLocal() {
      localStorage.setItem("timer", this.timer);
      localStorage.setItem("color", this.lights[this.activeLight].color);
      localStorage.setItem("direction", this.direction);
    },
    getLocalData() {
      this.timer = localStorage.getItem("timer");
      this.direction = localStorage.getItem("direction");
      const color = localStorage.getItem("color");
      this.getActiveLightByColor(color);
    },
  },
  async mounted() {
    const hasColorParam = await this.checkRouteParam();
    if (!hasColorParam) { 
      //set default behaviot
      this.activeLight = 0;
      this.direction = "bot";
    } else {
      // set color from url
      const color = this.$route.params.color;
      if (this.hasDataInLocal()) {
        if (localStorage.getItem("color") === color) {
          // set data from local
          this.getLocalData();
        } else {
          // set default data start from color
          this.getActiveLightByColor(color);
        }
      } else {
        // set default data start from color
        this.getActiveLightByColor(color);
      }
    }
    this.drawActiveLight();
    this.startTimer();
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
  background-color: rgb(59, 56, 56);
  color: rgb(255, 255, 255);
}
* {
  box-sizing: border-box;
}
#app {
  max-width: 800px;
  margin: auto;
  text-align: center;
}
.timer {
  font-size: 55px;
  margin: 10px 0;
}
.lights {
  width: 130px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(30, 30, 31);
  padding: 20px;
}
</style>
