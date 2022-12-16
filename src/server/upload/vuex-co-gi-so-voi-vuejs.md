### Mở đầu

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hiện nay Vuejs đang là một framework js đang khá hot và ngày càng được ưa chuộng hơn.  Tương tự như React nó được xây dựng dựa trên hệ thống component và việc truyền dữ liệu giữa các component giữa cha và con vẫn còn nhiều hạn chế trong việc đồng bộ dữ liệu. Với Vuejs khi chúng ta truyền dữ liệu từ cha sang con sẽ sử dụng props. Thế còn trong trường hợp khó hơn như này thì sao?

![](https://images.viblo.asia/93e2f563-ec1d-4cbc-8278-c80ebc39a213.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mình cần truyền data từ compenent `<UserDetail>` đến component `<Project>`. Nếu sử dụng props bình thường thì chúng ta sẽ làm như sau: <br> <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Từ data tại component `<UserDetail>` chúng ta sẽ thông báo đến component `<User>` rồi tiếp tục báo cho component `<App>` biết là đã có data thay đổi rồi từ đó báo tới component `<Project>`. Cũng không đến nỗi phức tạp lắm nhỉ :D. Nhưng đây mới chỉ là 3 component nếu nhiều hơn thì sao? Là 10 component? chắc chết quá.  :D <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br>Nhưng ở Vuejs chúng ta cũng có cách để giải quyết vấn đề này đó là dùng Event Bus. Đó là commit một thay đổi tại component `<UserDetail>` và bên component `<Detail>` chúng ta sẽ hứng sự thay đổi đó và xử lý tiếp. Vậy thế Vuex sinh ra có gì khác? <br>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bạn có thể hiển đơn giản Event Bus ở đây như một xe chở hàng vậy, nó mang data thay đổi từ component A sang component B. 
    Rồi từ đó xử lý tiếp. <br>
    <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thế Vuex làm được gì? <br>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nếu coi Event Bus là xe chở hàng thì Vuex ở đây chúng ta có thể coi là một kho hàng và chứa nhiều hàng và chứa nhiều loại xe chở hàng khác nhau (State, Getter, Mutation, Action) Chúng ta có nhiều phương án xử lý hơn, gói gọn data vào một nơi để dễ dàng quản lý và làm việc.
    Trong phần này mình sẽ giới thiệu về kho chứa (store) và các xe chở hàng (State, Getter, Mutation, Action).

### 1. Vuex là gì?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; VueX là thư viện giúp quản lý trạng thái các component trong VueJS, đây là nơi lưu trữ tập trung dữ liệu cho tất cả các component trong một ứng dụng, với nguyên tắc trạng thái chỉ có thể được thay đổi theo kiểu có thể dự đoán.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Vuex được xem như là một thư viện dùng để quản lý state cho các ứng dụng của Vue. Sử dụng store tập trung hoá, và toàn cục cho tất cả component trong một ứng dụng, tận dụng hệ thống các phản ứng cho những cập nhanh tức thời.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Vuex store được xây dựng theo cách để không thể thay đổi trạng thái của nó từ bất kỳ component nào. Bảo đảm rằng trạng thái chỉ có thể biến đổi theo cách có thể dự đoán được. Do đó store của bạn trở thành một nguồn đáng tin: mỗi yếu tố dữ liệu chỉ được lưu một lần và chỉ cho phép đọc để tránh các component của ứng dụng không làm hỏng trạng thái được truy xuất từ các component khác. State được hiểu như là trạng thái của của ứng dụng. 

### 2. State
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; State là trạng thái hay đơn giản chỉ là một object chứa các biến và các biến này có thể dùng chung ở store. <br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Vuex sử dụng một cây trạng thái duy nhất, đối tượng này sẽ chứa tất các trạng thái của ứng dụng, như vậy bạn chỉ có duy nhất một kho lưu trữ cho mỗi ứng dụng, điều này làm cho việc xác định các trạng thái là dễ dàng và cũng đơn giản trong việc tạo ra các ảnh chụp trạng thái (snapshot) của ứng dụng hiện tại.

Vì chúng ta cần một nơi chứa data nên chúng ta sẽ tạo 1 file store.js

```js
//store.js

const store = new Vuex.Store({
  state: {
    name: 'Nguyen Van A',
    gender: 'Female'
  }
})

```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Để sử dụng state ở một component khác ta làm như sau:

```js
import { store } from './src.store';

// và sử dụng:
$this.store.state.name 

```

### 3. Getter
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Là một tập các hàm dùng để filter state ra được output như mong muốn. <br>
Nó có thể truy cập như là một thuộc tính, không phải hàm. `$this.store.getters.property`

```js

const store = new Vuex.Store({
  state: {
    count: 1
  },
  getters: {
    filterData: state => {
        return state.count * 2;
    }
}
})

//và truy cập
$this.store.getters.filterData // 2
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tuy nhiên, cách dễ dàng để truy cập vào các getters trong components của bạn là thông qua phương thức mapGetters của Vuex. Điều này cho phép bạn gắn getters vào các thuộc tính ở mức cao nhất trong component của bạn.

```js
export default {
    computed: {
        ...mapGetters([
          'filterData'
        ])
      }
}
```

### 4. Mutation
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Store là nơi component chỉ có thể đọc dữ liệu và không thể thay đổi trạng thái một cách trực tiếp. Để thay đổi trạng thái thì Mutations sẽ đảm nhiệm chức năng này, đây là nơi duy nhất có thể thay đổi state. Mutations sẽ thực hiện thay đổi thông qua commit. 

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Vuex mutation tương tự như các sự kiện, mỗi mutation có kiểu chuỗi và một handler. Handler function là nơi chúng ta thực hiện các thay đổi trạng thái và nó cần được truyền vào tham số đầu tiên là state.

Một điều cần lưu ý là mutations là synchronous nhằm kiểm soát được action đã thay đổi state hay thứ tự thay đổi state như nào

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // mutate state
      state.count++
    }
  }
})
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bạn không thể gọi trực tiếp một handler của mutation, cách thức gọi các handler này sẽ giống như việc đăng ký các sự kiện: “Khi mutation với dạng increment được trigger, gọi đến handler này”, cách thức này được thực bằng cách sử dụng store.commit

```js
store.commit('increment')
```

### 5. Action
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Action cũng tương tự như mutation, tuy nhiên có một vài điểm khác biệt - Thay vì thay đổi trạng thái, action commit các thay đổi. Action có thể chứa các hoạt động không đồng bộ (asynchronous), còn mutation thì là hoạt động đồng bộ (synchronous). Là nơi thể hiện bussiness logic. Nó là nơi gọi API, save vào database, thực hiện các commit (gọi mutation) để thay đổi state…

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

### 6. Module
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Khi ứng dụng của chúng ta đủ lớn thì sẽ store của chúng ta sẽ rất cồng kềnh, Để giải quyết vấn đề này thì Vuex cho phép chúng ta chia nhỏ store thành các module để dễ dàng quản lý và làm việc. Mỗi module cũng sẽ có state, getters, mutation, action riêng biệt.

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA state
store.state.b // -> moduleB state

```

### Kết luận
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nếu như bạn đã sử dụng vuejs và gặp vấn đề trong việc đồng bộ, hiển thị và update dữ liệu , data được sử dụng bởi nhiều component, vuex chính là giải pháp cho bạn. Các ứng dụng vuejs lớn hầu như đều cần sử dụng vuex để quản lý và xử lý thay đổi trạng thái hiệu quả nhất.

Đây mới là giới thiệu sơ lược về Vuex, Để có thể hiểu rõ hơn về nó bạn có thể đọc docs của nó tại [đây](https://vuex.vuejs.org/guide/mutations.html)