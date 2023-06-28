<template>
  <el-container>
    <el-header>UseQuery</el-header>
    <el-main>
      <el-form>
        <el-form-item label="Input">
          <el-input v-model="key" />
        </el-form-item>
        <el-form-item label="data1">
          <div v-loading="isLoading1">
            {{ data1 }}
          </div>
        </el-form-item>
        <el-form-item label="data2">
          <div v-loading="isLoading2">
            {{ data2 }}
          </div>
        </el-form-item>
        <el-form-item label="data3">
          <div>
            {{ data3 }}
          </div>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { MaybeRef, computed, ref, unref } from "vue";
import { ElHeader, ElContainer, ElMain, ElForm, ElFormItem, ElInput } from "element-plus"
import { UseQueryOptions, useQuery } from "vue-query";
defineOptions({
  name: "UseQueryView",
})

// 同一のuseQueryを二か所から呼び出す場合 /////////////////////////////////

const key = ref("aaaa");
const computedKey = computed(()=>key.value);

const useHoge = (id: MaybeRef<string|undefined>, options?: UseQueryOptions<string>)=>{
  /**
   * Getterにするとwatchは検知してくれないので、unrefできるcomputedが正しいのかも
   */
  const { data, isLoading } = useQuery<string>(["fix", computed(()=>unref(id))], ()=>{
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(`[${unref(id)}]`);
      }, 1000);
    });
  }, { ...options });
  
  return {
    data,
    isLoading,
  }
}

const data3 = ref<string>(); //実際のデータのつもり
const {
  data: data1,
  isLoading: isLoading1,
} = useHoge(computedKey, {
  onSuccess: (res)=>{
    data3.value = res;
  }
});

const {
  data: data2,
  isLoading: isLoading2,
} = useHoge(computed(()=>unref(data3)));


</script>
