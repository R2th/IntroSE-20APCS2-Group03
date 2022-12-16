Chào mọi người, hôm nay mình tiếp tục viết về VueJS, và lần này mình sẽ giới thiệu đến mọi người package cực kỳ hay ho mà mình sử dụng trong dự án về VueJS. Đó là [vuex-shared-mutations](https://github.com/xanf/vuex-shared-mutations).

## 1. Giới thiệu:
Nhìn vào tên package, các bạn cũng biết `vuex-shared-mutations` dùng để làm gì rồi nhỉ?
>Share certain Vuex mutations across multiple tabs/windows.


`vuex-shared-mutations`  về cơ bản sẽ đồng bộ `vuex` trong trang web của bạn giữa các tabs và cả windows.

Tại sao `mình` cần đồng bộ `vuex`?

Cùng xem qua 1 bài toán cơ bản:

Mình sẽ dùng [Lazada](https://www.lazada.vn/#) làm ví dụ. Chúng ta tạm coi giỏ hàng của Lazada là 1 `Store` trong `Vuex`. 

Hãy thử đăng nhập vào `Lazada`, để trống giỏ hàng, rồi chọn mở 3 sản phẩm bất kỳ sang tab mới. Ở tab 1, ta chọn `THÊM VÀO GIỎ HÀNG`. Giỏ hàng sẽ thay đổi từ `0 -> 1`. Sau đó vào tab thứ 2, ta sẽ chọn `THÊM VÀO GIỎ HÀNG`, lúc này tổng sản phẩm sẽ là `0 -> 2`. Đầu tiên, đây là 1 UX không tốt đối với cá nhân mình. Điều may mắn là khi cập nhật giỏ hàng, Lazada đã gọi API để lấy dữ liệu mới nhất, và vì giỏ hàng được gắn vào user, nên chúng ta sẽ có `total` của giỏ hàng là `1`, sau đó thêm X sản phẩm mới vào. Thử trong trường hợp chúng ta có 1 VueApp chưa login nhưng vẫn cho mua hàng thì sao? Dữ liệu ở `Vuex` lúc này không thể cross tabs/window được. À không, dữ liệu lúc này có thể cross tabs/windows được, nhờ  [vuex-shared-mutations](https://github.com/xanf/vuex-shared-mutations).

## 2. Config `vuex-shared-mutations`:
Mình viết 1 app đơn giản để đồng bộ biến đếm `counter` như sau.

Trong file `store/index`, mình sẽ viết đầy đủ các thuộc tính `actions, mutations, state`:

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    increment(_state, data) {
      _state.counter += data;
    },
  },
  actions: {
    updateCounter({ commit }, data) {
      commit("increment", data);
    },
  },
});
```

Chúng ta tạo đơn giản 1 store với biến `counter` tượng trưng. Lúc này, nếu bạn mở 2 tabs khác nhau thì có thể thấy dữ liệu 2 trang đang là 2 store khác nhau.
 Lúc này hãy thêm `vuex-shared-mutations` vào store của chúng ta:
 
 ```js
...
import createMutationsSharer from "vuex-shared-mutations";
...
  actions: {
    updateCounter({ commit }, data) {
      commit("increment", data);
    },
  },
  plugins: [createMutationsSharer({ predicate: ["increment"] })],
});
```

Ở phần `createMutationsSharer({ predicate: ["increment"] })`, bạn truyền vào tên `mutaion` mà mình sẽ lắng nghe, và `vuex-shared-mutaions` sẽ tự động update `vuex` dựa theo mutations đã được chọn.

Demo:
1. Khi chưa có `vuex-shared-mutations`:

![](https://images.viblo.asia/5d78ef88-7939-4c21-9ba4-b7f64acf1904.gif)

2. Khi có `vuex-shared-mutations`:

![](https://images.viblo.asia/e98361bb-278d-41d9-a4a9-de566f5e6180.gif)

Bài viết của mình đến đây là hết. Cảm ơn mọi người đã xem qua :bow:.