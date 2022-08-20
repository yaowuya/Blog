/* 
定义 User 和 Nav 相关的全局 state
首先定义 state的接口，目前我们需要用到三个state，一个是用户信息 User，一个是博客页面顶部导航的路由数据navs，是一个Nav的数组，还有一个是当前导航菜单的索引navIndex，表示当前页面是在哪一个菜单下。
通过Symbol定义一个 InjectKey，用于在 Vue3 中通过 useState 获取到我们定义state
定义 state 在dispatch时用到的方法名，这里我们需要用到三个setUser，clearUser，setNavIndex
定义初始化 User 信息的方法，在登录完成后，我们为了保证用户信息在刷新页面后仍然可以识别用户是已经登录的状态，需要sessionStorage中存放登录后的用户信息，所以 User 的state在初始化的时候，需要考虑从 sessionStorage中读取。
通过 createStore 方法构建 store，在state() 返回初始数据，在 mutations 中定义对 state的操作方法。 
*/
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex"
import { Nav, User } from "../types";

export interface State {
  user: User,
  navIndex: string,
  navs: Array<Nav>
}

export const StateKey: InjectionKey<Store<State>> = Symbol()

export const SET_USER = 'setUser'
export const CLEAR_USER = 'clearUser'
export const SET_NAV_INDEX = 'setNavIndex'

export const initDefaultUserInfo = (): User => {
  let user: User = {
    id: 0,
    username: "",
    email: "",
    avatar: "",
    nickname: "",
    is_superuser: false
  }
  if (window.sessionStorage.userInfo) {
    user = JSON.parse(window.sessionStorage.userInfo)
  }
  return user
}

export const store = createStore<State>({
  state() {
    return {
      user: initDefaultUserInfo(),
      navIndex: '1',
      navs: [
        {
          index: "1",
          path: "/",
          name: "主页",
        },
        {
          index: "2",
          path: "/catalog",
          name: "分类",
        },
        {
          index: "3",
          path: "/archive",
          name: "归档",
        },
        {
          index: "4",
          path: "/message",
          name: "留言",
        },
        {
          index: "5",
          path: "/about",
          name: "关于",
        },
      ],
    }
  },
  mutations: {
    setUser(state: object | any, userInfo: object | any) {
      for (const prop in userInfo) {
        state[prop] = userInfo[prop];
      }
    },
    clearUser(state: object | any) {
      state.user = initDefaultUserInfo()
    },
    setNavIndex(state: object | any, navIndex: string) {
      state.navIndex = navIndex
    }
  }
})