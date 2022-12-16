![](https://images.viblo.asia/5ccd7fe3-ef6d-4ac8-bd3a-ed20fe1b6a6d.png)

**Typescript là gì ?**

TypeScript là một ngôn ngữ mã nguồn mở miễn phí hiện đang được phát triển và bảo trì bởi Microsoft (theo wikipedia). Người ta thường biết đến typescript và sử dụng nó trong các ngôn ngữ như C sharp, Angular hay Node.js. Vì TypeScript là tập cha của JavaScript nên bất kì chương trình JavaScript nào đã có cũng đều là chương trình TypeScript hợp lệ. Chính vì vậy chúng ta hoàn toàn có thể áp dụng TypeScript vào project vuejs.

**Vì sao lại sử dụng TypeScript?**

- Vấn đề về dự án: Việc phát triển các dự án có dễ dàng hay không cũng phụ thuộc khá nhiều vào bản thân người lập trình, nó phần lớn cũng phụ thuộc vào yếu tố khách quan nữa. Tuy nhiên, theo quan điểm của mình thì áp dụng được kỹ thuật mới và đặc biệt kỹ thuật lập trình hướng đối tượng như TypeScript làm việc phát triển các dự án lớn được dễ dàng, và việc code cũng hợp lý đúng không nào :<.
- Việc áp dụng TypeSCript có hỗ trợ nhiều Framework dễ dàng cho việc lựa chọn: Ví dụ như AngularJS 2.0
- Hỗ trợ các tính năng của Javascript phiên bản mới nhất: Hiện tại nó cũng hỗ trợ đến version mới của javascript là ECMAScript 2015 (ES6).
- Bên cạnh việc không bị tính phí, TypeScript dần trở nên phổ biến và được khá nhiều người dùng sử dụng. Chính vì vậy cộng đồng phát triển TypeScript ngày càng lớn, đã được hỗ trợ dễ dàng hơn.
- TypeScript là Javascript: Bản chất của TypeScript là biên dịch tạo ra các đoạn mã javascript nên bạn có thế chạy bất kì ở đâu miễn ở đó có hỗ trợ biên dịch Javascript. Ngoài ra bạn có thể sử dụng trộn lẫn cú pháp của Javascript vào bên trong TypeScript, điều này giúp các lập trình viên tiếp cận TypeScript dễ dàng hơn.

### 1. Cài đặt Typescript
Đầu tiên thì ta cần cài đặt project Nuxt.js như sau:

- Cài đặt sử dụng `npx`: `npx create-nuxt-app nuxt-ts-project`

- Cài đặt sử dụng `npm`: `npm init nuxt-app@latest nuxt-ts-project`

- Cài đặt sử dụng `yarn`: `yarn create nuxt-app nuxt-ts-project`

Sau khi cài đặt xong, hãy mở folder project lên thôi nào...

```bash
cd nuxt-ts-project
//Cài đặt nuxt typescript build
npm install --save-dev @nuxt/typescript-build
```
### 2. Cấu hình Typescript trong project

Thêm `@nuxt/typescript-build` vào `buildModules` trong `nuxt.config.js`:
```nuxt.config.js
export default {
  buildModules: ['@nuxt/typescript-build']
}
```
Tạo file `tsconfig.json` và thêm các tùy chọn như bên dưới:
```tsconfig.json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": [
      "esnext",
      "esnext.asynciterable",
      "dom"
    ],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./*"
      ]
    },
    "types": [
      "@types/node",
      "@nuxt/types"
    ]
  },
  "exclude": [
    "node_modules"
  ]
}
```
Rồi thì tạo file `vue-shim.d.ts`:
```vue-shim.d.ts
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}
```
Sau đó bạn cần cài `eslint` cho TypeScript. Nếu trước đó đã cài `eslint` cho Javascript rồi thì xóa nó đi nhé rồi cài lại
```bash
npm remove @nuxtjs/eslint-config
npm i -D @nuxtjs/eslint-config-typescript
```

Hãy sửa lại một chút file `.eslinttrc`:
```.eslintrc
{
  "extends": [
    "@nuxtjs/eslint-config-typescript"
  ]
}
```

Và update lại script:
```js
"lint": "eslint --ext .ts,.js,.vue ."
```

### 3. Code theo phong cách TypeScript
**1. Options API (vanilla)**

Chúng ta có thể viết Typescript theo các này để không phải thay đổi code Javascript quá nhiều. Cú pháp này sẽ trông giống cách viết code mà chúng ta thường dùng.
```ts
<template>
  <div class="container">
    <p>Project: {{ project }}</p>
    <div>Calculate Age:</div>
    <input v-model="year" type="number" />
    {{ text }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      project: 'Viblo',
      year: null,
      text: 'May Fest'
    }
  },
  computed: {
    project(): string {
      return this.project
    }
  },
  watch: {
    year(newVal: number) {
      this.text = this.calculate(newVal)
    }
  },
  methods: {
    calculate(newVal: number): string {
      return 'May Fest:' + newVal
    }
  }
})
</script>

```

**2. Vuex typing (vanilla)**
```js
import { GetterTree, ActionTree, MutationTree } from 'vuex'
export const state = () => ({
  count: 0 as number
})
export type RootState = ReturnType<typeof state>
export const getters: GetterTree<RootState, RootState> = {
  count: state => state.count
}
export const mutations: MutationTree<RootState> = {
  CHANGE_COUNT: (state, newVal: number) => (state.count = newVal)
}
export const actions: ActionTree<RootState, RootState> = {
  updateCount({ commit }, newVal) {
    // Some async code
    commit('CHANGE_COUNT', newVal)
  }
}
```

**3. Class-based API**

Cài đặt thư viện:

```bash
npm install --save nuxt-property-decorator
```
**Khởi tạo một class:**

Với cách code Javascript thông thường:
```js
<script>
    export default {
        name: 'MayFest'
    }
</script>
```
Ta có thể thay đổi chút xíu theo kiểu Typescript: 
```ts
<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator'
    @Component
    export default class MayFest extends Vue {
    }
</script>
```
Thuộc tính `lang="ts"` là bắt buộc cho thẻ script để sử dụng TypeScript.

**Import một component**

Thông thường sẽ được viết với:
```js
<script>
    import Header from '@/components/Header.vue'
    export default {
      name: 'MayFest',
      components: {
        Header
      }
    }
</script>
```
Để đăng ký component trong một component khác sử dụng `@Component` của `nuxt-property-decorator`:
```ts
<script lang="ts">
import Header from '@/components/Header.vue'
import { Vue, Component } from 'nuxt-property-decorator'
@Component({
  components: {
    Header
  }
})
export default class MayFest extends Vue {}
</script>
```

**Data**

Thông thường sẽ được viết với:
```js
export default {
  title: 'Post'
  list: [
    {
      name: 'Có gì mới trong phiên bản NextJS 10',
      link: 'https://viblo.asia/p/co-gi-moi-trong-phien-ban-nextjs-10-gGJ59MRx5X2',
    },
    {
      name: 'Tailwind CSS v2 có gì mới?',
      link: 'https://viblo.asia/p/tailwind-css-v2-co-gi-moi-6J3ZgNMMKmB',
    }
  ]
}
```
Viết theo kiểu Typescript
```ts
export default class MayFest extends Vue {
  title: string = 'Post'
  list: Array<object> = [
    {
      name: 'Có gì mới trong phiên bản NextJS 10',
      link: 'https://viblo.asia/p/co-gi-moi-trong-phien-ban-nextjs-10-gGJ59MRx5X2',
    },
    {
      name: 'Tailwind CSS v2 có gì mới?',
      link: 'https://viblo.asia/p/tailwind-css-v2-co-gi-moi-6J3ZgNMMKmB',
    }
  ]
}
```

**Props**

Thông thường sẽ được viết với:
```js
export default {
  props: {
   item: {
      required: true  
  },
   quantity,
   brand: {
      default: 'Apple',
    },
   type: {
      type: String
    },
   stock: {
      required: false,
      type: string,
      default: 'Available'
    }
  }
}
```
Viết theo Typescript

```ts
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class Tile extends Vue {
  @Prop({ required: true }) readonly item!: object
  @Prop() quantity!: number
  @Prop({ default: 'Apple' }) brand!: string
  @Prop(String) readonly type!: string
  @Prop({ required: false, type: String, default: 'Available' })
  readonly stock!: string
}
```

**Computed properties**

Cách viết thông thường:
```js
export default {
  buttonText() {
   if (this.quantity) {
      return 'Buy Now!'
    } else {
      return 'Coming Soon!'
    }
  }
}
```

Viết theo kiểu Typescript:
```ts
export default class Tile extends Vue {
  get buttonText(): string {
    if (this.quantity) {
      return 'Buy Now!'
    } else {
      return 'Coming Soon!'
    }
  }
}
```

Sử dụng `getter` và `setter`
Viết code thông thường:
```js
searchText: {
  get: function () {
    return this.searchTextValue
  },
  set: function (val) {
    this.searchTextValue = val
  }
}
```
Viết code Typescript:
```ts
export default class MayFest extends Vue {
 get searchText() {
    return this.searchTextValue
  }
  set searchText(val) {
    this.searchTextValue = val
  }
```

**Methods**

Viết code thông thường:
```js
export default {
  data() {
    return {
      laptopPrice: 1400
        quantity: 0
    }
  }
  methods: {
    calculateTotal() {
      return this.laptopPrice * this.quantity
    }
  }
}
```
Viết code Typescript:
```ts
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class Laptop extends Vue {
  laptopPrice: number = 1400
  quantity: number = 0
  calculateTotal(): number {
    return this.laptopPrice * this.quantity
  }
}
```

**Watcher**

Watcher có nhiều cách viết, ví dụ chúng ta hay viết kiểu:

```js
watch: {
  total: function(newval) {
    //do something
  }
}
```
và cách viết ít được sử dụng:
```js
watch: {
  total: {
    handler: 'totalChanged'
  }
}
methods: {
  totalChanged(newVal) {
    // do something
  }
}
```
Tuy nhiên, viết theo kiểu Typescript sẽ giống với cách viết thứ 2 và sử dụng `@watch` để truyền tên biến mà bạn cần theo dõi (watch).
```ts
@Watch('name')
totalChanged(newVal: string) {
  if(newVal > 20000) {
    this.status = 'limit exceeded for user'
  }
}
```
Chúng ta cũng thiết lập `immediate` và `deep` cho watchers:
```ts
@Watch('itemList', { 
  immediate: true, deep: true 
})
itemChanged(newVal: Product, oldVal: Product) {
  // do something
}
```
Có khác đôi chút so với cách viết JS thông thường:
```js
watch: {
  itemList: {
      handler: 'itemChanged',
      immediate: true,
      deep: true
    }
}
methods: {
  itemChanged(newVal, oldVal) {
    // do something
  }
}
```

**Emit**

Viết code thông thường:
```js
<some-component add-to-count="someMethod" />
<some-component reset-data="someMethod" />


//Javascript Equivalent
 methods: {
    addToCount(n) {
      this.count += n
      this.$emit('add-to-count', n)
    },
    resetCount() {
      this.count = 0
      this.$emit('resetData')
    }
}
```

và theo cách viết của Typescript
```ts
@Emit()
addToCount(n: number) {
  this.count += n
}
@Emit('resetData')
resetCount() {
  this.count = 0
}
```

**Lifecycle hooks**

Cách viết thông thường
```js
export default {
  asyncData() {
    //do something
  }
  beforeUpdate() {
    // do something
  }
}
```
Do không có đối số nào nên cách viết không hề thay đổi
```ts
export default class MayFest extends Vue {
  asyncData() {
    //do something
  }
  beforeUpdate() {
    // do something
  }
}
```

**Mixins**

Cách viết thông thường là:
```js
export default {
  data() {
    return {
      cartProducts: []
    }
  },
  methods: {
    addToCart(newItem) {
     this.cartProducts = { ...this.cartProducts, ...newItem }
    }
  }
}
```

Tạo một file `CartMixin.ts` trong folder `mixín`:
```mixín/CartMixin.ts
/mixins/CartMixin.ts
import { Component, Vue } from 'nuxt-property-decorator'
@Component
class CartMixin extends Vue {
  public cartProducts: Array<object> = []
  public addToCart(newItem: object): void {
    this.cartProducts = { ...this.cartProducts, ...newItem }
  }
}
export default CartMixin
```

Sử dụng mixin với JS thông thường:
```js
<template>
  <div class="phones">
    <div class="item">
      <img src="@/assets/images/iphone-11.png" />
      <div>iphone 11</div>
      <button @click="add">Add to Cart</button>
    </div>
    <div class="cart">
      <div v-for="(item, i) in cartProducts" :key="i" class="item">
        <div>Item: {{ item.name}}</div>
        <div>Quantity: {{ item.quantity }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CartMixin from '@/mixins/CartMixin'
export default {
  mixins: [ CartMixin],
  methods: {
     public add() {
      this.addToCart({ name: 'phone', quantity: 1 })
    }
  }
}
</script>
```

Sử dụng với Typescript:
```ts
<template>
  <div class="phones">
    <div class="item">
      <img src="@/assets/images/iphone-11.png" />
      <div>iphone 11</div>
      <button @click="add">Add to Cart</button>
    </div>
    <div class="cart">
      <div v-for="(item, i) in cartProducts" :key="i" class="item">
        <div>Item: {{ item.name}}</div>
        <div>Quantity: {{ item.quantity }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, mixins } from 'nuxt-property-decorator'
import CartMixin from '@/mixins/CartMixin'
@Component
export default class Phones extends mixins(CartMixin) {
  public add() {
    this.addToCart({ name: 'phone', quantity: 1 })
  }
}
</script>
```

**Vuex**

Viết thông thường:
```js
export default {
  namespaced: true,
  state: {
    info: {
      first: 'Preetish',
      last: 'HS',
      address1: '',
      address2: '',
      state: '',
      country: '',
      phone: 9000000009
    }
  },
  getters: {
    fullName() {
      return this.info.first + ' ' + this.info.last
    }
  }
  mutations: {
    updateUserInfo(data) {
      this.info = { ...this.info, ...data }
    }
  }
}
```

Sử dụng Typescript:
Cài đặt `vuex-module-decorators`
```bash
npm install -D vuex-module-decorators
```
Sau đó tạo file `users.ts` trong `store`

```ts
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
interface UserData {
  first: string
  last: string
  address1: string
  address2: string
  state: string
  country: string
  phone: number
}
@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class User extends VuexModule {
  public info: UserData = {
    first: 'Preetish',
    last: 'HS',
    address1: '',
    address2: '',
    state: '',
    country: '',
    phone: 9000000009
  }
  get fullName(): string {
    return this.info.first + ' ' + this.info.last
  }
  @Mutation
  public updateUserInfo(data: UserData) {
    this.info = { ...this.info, ...data }
  }
}
```

**Sử dụng vuex trong components**

Viết JS thông thường:

```js
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      localData: {}
    }
  },
  computed: {
    ...mapState('user', ['info']),
    ...mapGetters('user', ['fullName'])
  },
  mounted() {
    this.localData = { ...this.localData, ...this.info }
  },
  methods: {
    ...mapMutations('user', ['updateUserInfo']),
    update() {
      this.updateUserInfo(this.localData)
    }
  }
}
</script>
```


Sử dụng Typescript:
```ts
<template>
  <div class="user">
    <div class="title">Welcome {{ fullName }}</div>
    <div>
      First:
      <input type="text" v-model="localData.first" />
    </div>
    <button @click="update">Update Info</button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
const user = namespace('user')
@Component
export default class User extends Vue {
  public localData: object = {}
  @user.State
  public info!: object
  @user.Getter
  public fullName!: string
  @user.Mutation
  public updateUserInfo!: (data: object) => void
  mounted() {
    this.localData = { ...this.localData, ...this.info }
  }
  public update(): void {
    this.updateUserInfo(this.localData)
  }
}
</script>
```
 
### 4. Tạm kết
Việc áp dụng TypeScript vào Vuejs cũng khá đơn giản đúng không nào. Ban đầu, các bạn sẽ thấy việc áp dụng này khiến chúng ta phải code phức tạp hơn, code nhiều file hơn, hay thậm chí là dài hơn chẳng hạn. Tuy nhiên, với những lợi ích mà nó mang lại thì không thể phủ nhận được. Nếu bạn là một người yêu thích tìm hiểu cái mới và không ngại thử thách, hãy thử áp dụng ngay nhé. Thú vị lắm đấy 😉
![](https://images.viblo.asia/b67bf6ec-fa7f-475b-8173-6e09f9e5d848.gif)