// 其中 ? 表示可选属性，可以为空，| 表示属性值类型的可选项。
// 可以多种类型的属性值，any 表示任何类型都可以。

export interface User {
  id: number,
  username: string,
  email: string,
  avatar: string | any,
  nickname: string | any,
  is_active?: any,
  is_superuser?: any,
  created_at?: string
}

export interface Nav {
  index: string,
  path: string,
  name: string
}