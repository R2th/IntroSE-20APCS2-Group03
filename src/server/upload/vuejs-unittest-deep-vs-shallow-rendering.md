# Deep rendering
Đúng với cái tên thì deep rendering sẽ có nhiệm vụ render tất cả các component trong cây.

Lấy ví dụ dưới đây:
```js
// File: UserList.vue
<template>
  <ul>
    <li v-for="user in users" :key="user">
      {{ user }}
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      users: Array
    }
  };
</script>
```

Component trên sau đó sẽ được sử dụng trong `App.vue`:

```js
// File: App.vue
<template>
  <div>
    <h3>User List</h3>
    <user-list :users="['Rob Wesley']" />
  </div>
</template>

<script>
  import UserList from "./UserList";

  export default {
    components: { UserList }
  };
</script>
```

Khi render sẽ cho ra DOM tree như dưới:
```html
<div>
  <h3>User List</h3>
  <ul>
    <li>
      Rob Wesley
    </li>
  </ul>
</div>
```

Để test việc render trên thì chúng ta có thể sử dụng Jest Snapshots. Các bạn có thể hiểu thêm về Jest Snapshots tại [đây](https://livebook.manning.com/book/testing-vue-js-applications/chapter-12/23).

Chúng ta sẽ sử dụng phương thức `mount` được cung cấp bởi thư viện [@vue/test-utils](https://vue-test-utils.vuejs.org/) để xử lý deep rendering.

```js
import { mount } from "@vue/test-utils";
import App from "@/App";

describe("App.vue", () => {
  it("Deeply renders the App component", () => {
    const wrapper = mount(App);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
```

# Shallow rendering
Trái ngược với deep rendering thì shallow rendering chỉ có nhiệm vụ render component mà chúng ta cần test, không đi sâu vào các component con.

Để thực hiện shallow rendering thì chúng ta sử dụng phương thức `shallowMount` cũng của thư viện `@vue/test-utils`.

```js
import { shallowMount } from "@vue/test-utils";
import App from "@/App";

describe("App.vue", () => {
  it("Shallow renders the App component", () => {
    const wrapper = shallowMount(App);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
```

Snapshot được sinh ra khi sử dụng `shallowMount`:

```html
<div>
  <h3>User List</h3>
  <user-list-stub users="Rob Wesley"></user-list-stub>
</div>
```

Ta thấy khi sử dụng `shallowMount` thì Jest sẽ `stub` các component con bên trong đối tượng được test hiện tại (`App.vue`). Từ đó thay vì phải tạo và render ra 1 component `<user-list>`, Jest sẽ thay thế nó bằng 1 thẻ `<user-list-stub>` đại diện cho component `user-list`.

# Cách sử dụng

Trên lý thuyết của việc thực hiện UnitTest, chúng ta sẽ chú trọng vào các điểm:
* Đối tượng được test sẽ độc lập với các chủ thể khác.
* Tập trung test vào 1 đối tượng.
* Dễ maintain và test case ổn định theo thời gian.

Cho nên bằng việc sử dụng `mount` để deep rendering thì chúng ta sẽ vi phạm các điểm trên, và với việc khi có thay đổi xảy ra trên các component con thì các test case của component cha hầu hết sẽ failed, việc viết lại các test case sẽ là không tránh khỏi.

Vì vậy nếu chưa rành viết test thì mình khuyên nên sử dụng `shallowMount` hầu hết các file test để thực hiện shallow rendering.

Tất nhiên vẫn sẽ có những trường hợp sử dụng `mount`. Chẳng hạn như nếu chúng ta có thêm 1 component `UserListItem` dùng để render từng item có trong `UserList`. Có thể thấy là component `UserList` và `UserListItem` quan hệ mật thiết với nhau, tạo thành 1 thể thống nhất (giữa list với item trong list) nên hoàn toàn dễ hiểu nếu chúng ta deep rendering để chắc chắn rằng 2 component trên working với nhau được trơn tru.