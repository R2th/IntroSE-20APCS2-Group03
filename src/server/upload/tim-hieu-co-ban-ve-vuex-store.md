## 1.  Creating a Store

Vuex đã cung cấp sẵn class Store, vì vậy ta có thể sử dụng bằng cách `import` vào để lấy đối tượng Vuex và tạo một Store mới

```javascript
import Vuex from 'vuex';

// Create a new store:
const store = new Vuex.Store({
  state: {
    count: 0
  }
});
```

Hoặc có thể load Vuex thông qua CDN như sau:

```javascript
<script src="https://unpkg.com/vuex/dist/vuex.js"></script>
<script>
  const store = new Vuex.Store({
    state: {
      count: 0
    }
  });
</script>
```

## 2.  Using a Store

Để lấy được giá trị trong store, khá đơn giản, bạn chỉ cần gọi đến hành động tương ứng khi định nghĩa store như ví dụ sau:

```javascript
import Vuex from 'vuex';

// Create a new store:
const store = new Vuex.Store({
  state: {
    count: 0
  }
});

store.state; // { count: 0 }
```

Theo lời khuyên từ các chuyên gia, bạn không nên thay đổi `state` một cách trực tiếp mà phải thông qua `mutations`. Hãy cũng xem ví dụ sau:

```javascript
const Vuex = require('vuex');

const store = new Vuex.Store({
  state: { count: 0 },
  mutations: {
    increment: store.count += 1,
    decrement: store.count -= 1
  }
});

store.state; // { count: 0 }

store.commit('increment');
store.state; // { count: 1 }

store.commit('decrement');
store.state; // { count: 0 }
```

Ở trên mình có định nghĩa một `mutation` để thực hiện việc tăng giảm biến `count` được khởi tạo trong `state`. Khi muốn gọi `mutations` để thay đổi `state` thì bạn phải thực hiện 1 commit và message tương ứng với biến đã định nghĩa trong `mutations`. Và store sẽ thực hiện hành động bên trong `mutations` được gọi và thay đổi `state`.

Một điều nữa, mặc dù bạn có thể gọi trực tiếp `store.state`, nhưng bạn ko nên làm điều đó. Vì Vuex đã cung cấp cho bạn một phương thức `getters` để thực hiện việc get dữ liệu 

```javascript
const Vuex = require('vuex');

const store = new Vuex.Store({
  state: { count: 0 },
  getters: {
    count: store => store.count
  },
  mutations: {
    increment: store => store.count += 1,
    decrement: store => store.count -= 1
  }
});

store.getters.count; // 0

store.commit('increment');
store.getters.count; // 1
```
> Cảm ơn các bạn đã theo dõi. Để tìm hiểu thêm về Vuex cũng như VueJS, các bạn có thể truy cập [tại đây](https://vuejs.org/v2/guide/).