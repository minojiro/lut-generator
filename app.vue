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
  <div class="max-w-3xl px-5 mx-auto my-20">
    <h1 class="text-3xl font-bold">📸 LUT Generator</h1>
    <form @submit.prevent="handleSubmit" class="block mt-20">
      <div class="flex gap-5 items-end">
        <label class="flex-1">
          <span class="block font-bold mb-3">🎨 Source Camera LUT</span>
          <input
            class="file-input file-input-bordered w-full"
            type="file"
            @change="e => inFile = e.target.files[0]"
          />
        </label>
        <span class="text-5xl">👉</span>
        <label class="flex-1">
          <span class="block font-bold mb-3">🎨 Target Camera LUT</span>
          <input
            class="file-input file-input-bordered w-full"
            type="file"
            @change="e => outFile = e.target.files[0]"
          />
        </label>
      </div>
      <p class="mt-10"><button class="btn btn-primary" type="submit" :disabled="!submittable">generate!</button></p>
    </form>
    <div class="rounded border border-4 bg-base-200 border-accent p-10 mt-20" v-if="downloadHref">
      <p class="mb-5 center font-bold">🎉 LUT has been generated!</p>
      <div class="flex items-center gap-3">
        <a class="btn btn-accent" :href="downloadHref" :download="filename">🎨 download LUT file</a>
        <p>{{ filename }}</p>
      </div>
      <textarea class="textarea textarea-bordered w-full h-36 mt-5 text-xs" readonly :value="resultLutStr"></textarea>
    </div>
  </div>
</template>
