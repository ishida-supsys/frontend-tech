import { MaybeRefOrGetter, computed, toValue } from "vue";

export const useFeature = (value: MaybeRefOrGetter<string>) => {
  const hoge = computed(()=>`${toValue(value)}hoge`)

  return { hoge };
}
