<script setup lang="ts">
import {
  generateLut,
  stringToLut,
  lutToString,
} from './lib/generateLut'

const {
  file: inFile,
  data: inLutStr,
} = useFile()

const {
  file: outFile,
  data: outLutStr,
} = useFile()

const resultLutStr = ref('')
const filename = ref('')

const downloadHref = computed(() => {
  if (!resultLutStr.value) return ''
  const blob = new Blob([resultLutStr.value], { type: 'text/plain' });
  return URL.createObjectURL(blob);
})

const submittable = computed(() => inLutStr.value && outLutStr.value)

const handleSubmit = async() => {
  if (!submittable.value) return
  const inLut = stringToLut(inLutStr.value)
  const outLut = stringToLut(outLutStr.value)
  const lut = generateLut(inLut, outLut)
  resultLutStr.value = lutToString(lut)
  filename.value = `result_${Date.now()}.cube`
}
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <p>
        camera<br />
        <input type="file" @change="e => inFile = e.target.files[0]" />
      </p>
      <p>
        target<br />
        <input type="file" @change="e => outFile = e.target.files[0]" />
      </p>
      <p><button type="submit" :disabled="!submittable">generate</button></p>
    </form>
    <textarea readonly :value="resultLutStr"></textarea>
    <p v-if="downloadHref">
      <small>{{ filename }}</small><br />
      <a :href="downloadHref" :download="filename">download</a>
    </p>
  </div>
</template>

<style module>
textarea {
  width: 100%;
  height: 10rem;
}
</style>