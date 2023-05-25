<template>
  <el-container>
    <el-header>ConstTypeParametersView</el-header>
    <el-main>
      {{ names }}
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
// compiler-core: support parsing const modifier in type parameters (#7912) (b7bd50f)
// https://github.com/vuejs/core/issues/7912
import { ElHeader, ElContainer, ElMain } from "element-plus"
defineOptions({
  name: "ConstTypeParametersView",
})

//Example1 ////////////////////////////////////////////////////////////////////
type HasNames = { names: readonly string[] };
const getNamesExactly = <const T extends HasNames>(arg: T): T["names"] => {
  return arg.names;
}

// Inferred type: readonly ["Alice", "Bob", "Eve"]
// Note: Didn't need to write 'as const' here
const names = getNamesExactly({ names: ["Alice", "Bob", "Eve"] });

//Example2 ////////////////////////////////////////////////////////////////////
declare function fnBad<const T extends string[]>(args: T): void;

// 'T' is still 'string[]' since 'readonly ["a", "b", "c"]' is not assignable to 'string[]'
fnBad(["a", "b" ,"c"]);

//Example3 ////////////////////////////////////////////////////////////////////
declare function fnGood<const T extends readonly string[]>(args: T): void;

// T is readonly ["a", "b", "c"]
fnGood(["a", "b" ,"c"]);

//Example4 ////////////////////////////////////////////////////////////////////
declare function fnGood<const T extends readonly string[]>(args: T): void;
const arr = ["a", "b" ,"c"];

// 'T' is still 'string[]'-- the 'const' modifier has no effect here
fnGood(arr);
</script>
