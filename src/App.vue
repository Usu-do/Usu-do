<template>
  <div id="view">

  </div>
</template>

<script setup>
import { onMounted} from 'vue'
import MyThree from './components/threeInit';
const MyThrees=new MyThree()
onMounted(() => {
  MyThrees.init()
})
</script>

<style lang="scss" scoped>
#view{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>