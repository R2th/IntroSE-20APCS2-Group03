Javascript có một điểm mà mình khá là thích đó là có thể chạy bất đồng bộ trong một số trường hợp như thực hiện [Ajax calls](https://www.w3schools.com/js/js_ajax_intro.asp), [timers](https://www.w3schools.com/js/js_timing.asp), đại loại là các sự kiện có thể xảy ra bất cứ lúc nào. Nhắc về bất đồng bộ, nếu bạn làm JS đủ nhiều thì chắc cũng từng nghe qua hoặc đã làm việc với [Promise](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Promise) rồi, một giải pháp bất đồng bộ cực kỳ mạnh mẽ của JS mà mình rất thích.

Tuy mạnh mẽ là vậy nhưng `Promise` vẫn chưa toàn diện, nó vẫn còn thiếu một tính năng cực kỳ quan trọng: __cancellation__.

Trong bài viết này, mình sẽ cho các bạn thấy tại sao việc phải cancel các hành động bất đồng bộ là quan trọng mà thông thường mọi người thường hay bỏ qua. Mình sẽ sử dụng VueJS trong bài viết cho các ví dụ, trên React, Angular hay các loại JS khác bạn cũng có thể thực hiện tương tự.

# Ví dụ thực tiễn
Giả sử mình có 1 trang, trên đó có 3 tabs khác nhau, người dùng click các button để chuyển giữa các tabs, và component sẽ tải data từ server để hiển thị nội dung của mỗi tab.

Phần code có thể sẽ trông như thế này:
```html
<template lang="html">
  <div>
    <button v-for="n in 3" :key="n" @click="switchTab(n)">Tab {{ n }}</button>
    <div v-text="message"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      message: 'Select a tab',
    };
  },

  methods: {
    switchTab(index) {
      this.index = index;
      this.message = 'Loading...';
      this.loadContent(index)
        .then(message => { this.message = message; });
    },

    loadContent(index) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(`Message #${index}`), 1000);
      });
    },
  },
};
</script>
```

Hàm `switchTab()` sẽ đánh dấu tab được active, thay đổi message thành `Loading...` sau đó bắt đầu một hành động bất đồng bộ là load nội dung của tab đã chọn.

Hàm `loadContent()` tạm thời sử dụng timeout để mô phỏng việc tải dữ liệu bất đồng bộ từ server.

Nếu bạn không hiểu code Vue thì có thể vọc qua một tí qua minimal repo https://codepen.io/sontd/pen/qGZBmZ
{@embed: https://codepen.io/sontd/pen/qGZBmZ}

Click lên 1 tab bạn sẽ thấy message đổi sang `Loading...`, sau 1s sẽ có content của tab.

Bây giờ thử click vào 3 buttons thật nhanh và ngẫu nhiên. Bạn sẽ thấy các "__Message #1__", "__Message #2__" và "__Message #3__" xất hiện lần lượt và mất đi sau khi cái sau xuất hiện, dù cho lúc đó bạn đã dừng lại ở 1 tab khác.

Nó chưa phải là hoàn hảo tuy nhiên miễn cưỡng vẫn tạm chấp nhận được nhỉ, chỉ là do nó bị delay.

# Delay ngẫu nhiên
Thử 1 vài thay đổi nhẹ nhé, thay vì hard-code delay `1000` ms, mình sẽ thử random thời gian delay ngẫu nhiên ở mỗi lần click:

```js
loadContent(index) {
  const DELAY = Math.floor(1000 + Math.random() * 3000);
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Message #${index}`), DELAY);
  });
},
```

Bạn có thể thử qua kết quả ở đây: https://codepen.io/sontd/pen/QRNWQz
{@embed: https://codepen.io/sontd/pen/QRNWQz}

Thử lại động tác như lúc nãy, nó vẫn bị delay như lúc nãy, nhưng lần này có khác 1 chút, giả sử bạn click theo thứ tự `1 -> 2 -> 3`, nhưng có thể message sẽ hiển thị theo thứ tự `3 -> 1 -> 2`, vì thời gian hoàn thành của tab 3 có thể thấp hơn tab 1 và tab 2, nên mặc dù click sau cùng nhưng nội dung lại hiển thị trước.

Đây là vấn đề hết sức bình thường trong thực tế, bởi thời gian phản hồi từ server phụ thuộc vào rất nhiều yếu tố, và khác nhau trong từng thời điểm.

Có vài cách để giải quyết vấn đề này. Đơn giản nhất là check nếu đang dừng lại ở tab đó thì mới set lại message
```js
switchTab(index) {
  this.index = index;
  this.message = 'Loading...';
  this.loadContent(index)
    .then(message => {
      if (this.index === index) this.message = message; // Check it here
    });
},
```

Với ví dụ nhỏ này thì OK, nhưng trong thực tế thường đi kèm rất nhiều vấn đề và các điều kiện khác. Trong trường hợp đó chúng ta cần một giải pháp ngon lành hơn, bảo đảm là dữ liệu của tab được click sau cùng sẽ hiển thị lên, còn dữ liệu từ các request trước đó sẽ bị bỏ qua.

> Mình biết để giải quyết vấn đề trong ví dụ này có nhiều bạn sẽ nghĩ đến kỹ thuật [debounce](https://css-tricks.com/the-difference-between-throttling-and-debouncing/), tuy nhiên trong thực tế bạn sẽ gặp những tình huống mà không thể sử dụng debounce.
> 
> Với các ajax request có thể bạn cũng sẽ nghĩ đến [`abort()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort), request hoặc [cancel token](https://github.com/axios/axios/blob/master/README.md#cancellation) nếu bạn sử dụng axios, nhưng mình xin nhắc lại bài viết này mình muốn focus hơn vào Promise, bởi không phải lúc nào cũng là ajax, Promise còn được dùng rộng rãi và nhiều tình huống hơn là chỉ ajax.
 
# Cancelling a Promise
Như mình có đề cập ban đầu, `Promise` không được thiết kế trạng thái `cancelled`  riêng biệt, cách làm thường thấy nhất cũng thường là handle error như thế này:

```js
this.loadContent(index)
  .then(message => {/* do something */})
  .catch(error => {/* handle error */});

// or
this.loadContent(index).then(
  success => {/* do something */},
  error => {/* handle error */}
);
```

Vậy là trong lúc handle error, bạn sẽ phải tự mình phân biệt đâu là `cancelling`, đâu là error từ các điều kiện khác, ví dụ như lỗi mạng, lỗi faild từ API...

Trong một vài trường hợp đơn giản, việc cancel có thể bị bỏ qua, vì chúng ta có thể chắc chắc hành động phía sau đã được thực hiện. Trong trường hợp đó, Promise sẽ ở trạng thái pending (ko resolve, cũng không reject).

Thử vào trong ví dụ xem sao:
```js
loadLastContent(index) {
  const promise = this.loadContent(index);
  this.lastPromise = promise;

  return new Promise((resolve) => {
    promise.then((result) => {
      if (promise === this.lastPromise) {
        this.lastPromise = null;
        resolve(result);
      }
    });
  });
}
```

Hàm trên sẽ là trung gian gọi đến hàm `loadContent()` rồi tạo ra một promise mới.

Khi vào hàm `loadLastContent()` được gọi nhiều lần cùng lúc, `lastPromise` sẽ được set lại, và chỉ lưu giá trị của promise mới nhất từ  hàm `loadContent()` trả về, sau khi promise của `loadLastContent` resolves, nếu promise đó trùng với `lastPromise` sẽ resolve nó, ngược lại nó sẽ vẫn ở trạng thái unresolved.

Sau đó chỉ cần chút thay đổi nhỏ ở hàm `switchTab()`, gọi hàm `loadLastContent()` thay vì `loadContent()` như trước đây

```js
switchTab(index) {
  this.index = index;
  this.message = 'Loading...';
  this.loadLastMessage(index)
    .then(message => { this.message = message; });
};
```

Bây giờ `message` sẽ chỉ bị thay đổi khi ko còn hành động nào diễn ra, ngược lại nó sẽ vẫn chỉ hiển thị một message `loading...` mãi cho đến khi hành động (click) cuối cùng hoàn thành.

Đây là phần code sau khi hoàn thành: https://codepen.io/sontd/pen/yWOyXO
{@embed: https://codepen.io/sontd/pen/yWOyXO}

Chú ý rằng vẫn chưa có handle error trong ví dụ đơn giản này.  Bạn có thể có thêm handle error bằng việc gọi hàm `reject()` bên trong promise nếu promise hiện tại là promise mới nhất. Bằng cách này các error từ các promise trước đó cũng bị "lơ đẹp", tương tự như `resolve()`.

Ngoài ra cũng rất dễ để cancel một pending promise từ bên ngoài. Ví dụ, khi nội dung tab được hiển thị bằng modal chẳng hạn, và người dùng close modal ngay khi chưa load xong content, trong trường hợp đó, có thể cancel việc load dữ liệu bằng cách:
```js
this.lastPromise = null;
```

Vậy là hàm handler trong `switchTab()`  sẽ không còn được gọi khi load xong.

# Cancelling a Vuex action
Ngang đây là dành cho bạn nào đã biết đến Vue + Vuex nhé, còn nếu bạn chưa làm qua Vue + Vuex, bạn có thể dừng lại tại đây và hẹn gặp lại vào những bài viết sau nhé.

Bây giờ hãy thử tưởng tượng nếu app của bạn sử dụng Vuex, việc load data được thực hiện ở action.

```js
const state = {
  index: 0,
  message: 'Select a tab',
  lastPromise: null,
};

const mutations = {
  setIndex(state, value) {
    state.index = value;
  },
  
  setMessage(state, value) {
    state.message = value;
  },
  
  setLastPromise(state, value) {
    state.lastPromise = value;
  },
};

const actions = {
  loadContent({ commit, state }, index) {
    commit('setIndex', index);
    const promise = fetch(`/message/${index}`);
    commit('setLastPromise', promise);
    promise.then(result => result.json())
      .then((data) => {
        if (state.lastPromise === promise) {
          commit('setMessage', data.message);
          commit('setLastPromise', null);
          resolve();
        }
      })
      .catch((error) => {
        if (state.lastPromise === promise) {
          commit('setLastPromise', null);
          reject(error);
        }
      });
  },
};
```

Phụ thuộc vào những thứ bạn cần, có thể bạn sẽ thích những behavior khác cho việc cancel các hành động bất đồng bộ, đây có thể chỉ là một gợi ý nhỏ, biết đâu bạn sẽ tạo nên một solution cho riêng bạn dựa trên ý tưởng này.

Còn bây giờ xin cảm ơn và hẹn gặp lại trong những bài sau nhé.