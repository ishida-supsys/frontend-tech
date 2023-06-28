import { queryClient } from '@/plugins/vue-query'
import { VueQueryPlugin } from 'vue-query';
import { GlobalMountOptions } from '@vue/test-utils/dist/types';
import { mount } from '@vue/test-utils';
import invariant from 'tiny-invariant';

export const withSetup = <T>(composable: ()=>T, globalOptions?: GlobalMountOptions): T =>{
  let result;
  const component = {
    template: "<template id='test'></template>",
    setup() {
      result = composable();
      return { result };
    }
  }
  mount(component, {
    global: globalOptions?.plugins
      ? globalOptions
      : {
        ...globalOptions,
        plugins: [[VueQueryPlugin, { queryClient }]]
      },
    shallow: true,
  })
  invariant(result, "result is undefined");
  return result;
}
