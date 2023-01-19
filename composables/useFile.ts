export const useFile = () => {
  const fileRef = ref<Blob>();
  const data = ref<string>("");
  const reader = new FileReader();
  reader.onload = () => {
    data.value = String(reader.result);
  };

  const file = computed({
    get: () => {
      return fileRef.value;
    },
    set: (value) => {
      fileRef.value = value;
      if (value) {
        reader.readAsText(value);
      } else {
        data.value = "";
      }
    },
  });

  return {
    file,
    data,
  };
};
