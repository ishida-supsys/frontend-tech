//app: app.runWithContext() (#7451) (869f3fb)
//https://github.com/vuejs/core/issues/7451
import { InjectionKey, Plugin } from 'vue'

export const GlobalProvideKey: InjectionKey<string> = Symbol('hoge')

export const GlobalProvide:Plugin = {
  install(app){
    app.provide(GlobalProvideKey, 'hoge')
  }
}
