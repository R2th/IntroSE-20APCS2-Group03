# Giới thiệu
Để hiểu rõ hơn về cơ chế hoạt động của VueJS chắc chắn bạn phải biết về lifecycle hooks (vòng đời) của một **Vue instance**. **Lifecycle hooks** thể hiện cách mà một **component** được khởi tạo, được thêm vào DOM, được cập nhật hoặc khi bị hủy.

Dưới đây là sơ đồ về vòng đời của **Vue.js Instance Lifecycle**:
![](https://vuejs.org/images/lifecycle.png)
# Creation Hooks
Quá trình khởi tạo diễn ra đầu tiên trên `component`. Nó cho phép bạn thực hiện các hành động với dữ liệu của component trước khi được thêm vào DOM. Không giống như **hooks** khác, **creation hooks** có thể chạy trong quá trình **server-side rendering**.

Sử dụng **creation hooks** khi bạn muốn setup cho component, trong khi client đang reder và server đang render. Và bạn không thể truy cập vào DOM.

### beforeCreat
Hàm **beforeCreat** chạy trước khi  `component` được khởi tạo. Trong quá trình này `data` chưa được `reactive`(cập nhật khi thay đổi) và `events` chưa được khởi tạo.
```
<template>
  <div id="app">
    <ul>
      <li 
      v-for="item in todoList" 
      v-bind:key="item.id"
      >
      {{ item.content }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      todoList: [
        { id: 1, content: "Go out"},
        { id: 2, content: "Playing Game"},
        { id: 3, content: "Cooking"},
      ]
    }
  },
  beforeCreate() {
    console.log("Ở thời điểm này, events và vòng đời đã được khởi tạo");
    console.log(this.todoList);
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

Ở ví dụ này khi ta chưa thể tương tác với dữ liệu `todoList` và không thực hiện được các thao tác lên DOM.

![](https://images.viblo.asia/112fc14f-6ecd-4d9e-be05-b19238385af5.png)


### created
Trong hàm **created** ta có thể thao tác với `data` và `events` có thể kích hoạt được. `Templates` và `Virtual DOM` chưa được `mounted` hoặc `rendered`. Lúc này ta vẫn chưa truy cập được đến các phần tử DOM.
```
created() {
    console.log(this.todoList);
}
```
Ở đây ta đã có thể thao tác với `data`.
![](https://images.viblo.asia/99d66452-5840-4a33-868c-1583bd652b49.png)

# Mounting Hooks
**Moungting hooks** thường được sử dụng nhiều nhất. Quá trình này xảy ra trước khi `component` được khởi tạo. Thường sử dụng khi cần truy cập vào DOM.

### beforeMount
Hàm **beforeMount** được gọi sau khi `component` đã được compile và trước lần `render` lần đầu tiên.
```
beforeMount() {
    console.log(this);
    console.log(document.getElementById('app').innerHTML)
  }
```
Ở đây ta vẫn có thể in ra `component` hiện tại nhưng khi truy cập vào Vitural DOM sẽ báo `null`.
![](https://images.viblo.asia/175f9801-6e3d-4a8e-861d-60be2b31533a.png)

### mounted
Hàm **mounted** (khi ta đã nhìn thấy nội dung ở trình duyệt), ta có thể truy cập vào `data`, `template`, `DOM` (thông qua `this.$el`).
```
mounted() {
    console.log(this.$el);
    console.log(document.getElementById('app').innerHTML)
}
```
![](https://images.viblo.asia/136f7d70-6051-4042-bca6-4191a7577590.png)

# Updating Hooks
**Updating hooks** sẽ được gọi bất cứ khi nào `reactive data` bị thay đổi hoặc khi `component` re-render.

Sử dụng **updating hooks** khi ta cần biết khi nào `component` re-renders, hoặc để `debugging`. Debug với `data reactive` thì ta nên dùng `computed` hoặc `watch`.

### beforeUpdate
Hàm **beforeUpdate** được gọi ngay sau khi dữ liệu của `component` bị thay đổi và trước khi `component` re-render.

Use beforeUpdate if you need to get the new state of any reactive data on your component before it actually gets rendered:

Sử dụng **beforeUpdate** khi ta cần lấy `state` mới của bất cứ `reactive data` của `component` trước khi dữ liệu được re-render.

```
<template>
  <div id="app">
    <div>{{ counter }}</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      counter: 1,
    }
  },
  created() {
    setInterval(() => {
      this.counter++;
    }, 1000)
  },
  beforeUpdate() {
    console.log(this.counter);
  }
}
</script>
```

Ta thấy mỗi lần tăng `counter` lên thêm 1 thì hàm **beforeUpdate** sẽ được gọi.
![](https://images.viblo.asia/e3d55aef-2bfe-4ad9-9c58-42167ab2265d.png)

### updated
**Updated** được gọi sau khi `data` của `component` thay đổi và `DOM` re-render.

Sử dụng `updated` khi ta cần truy cập vào `DOM` sau khi thay đổi thuộc tính. Dữ liệu ở **beforeUpdate** và **updated** là như nhau.

# Destruction Hooks
### beforeDestroy

**beforeDestroy** sẽ được gọi trước khi `instance` bị hủy. Ta có thể quản lý việc xóa tài nguyên, sự kiện không cần thiết sau khi `component` bị hủy.

### destroyed
**destroyed** sau khi `component` đã được hủy bỏ hết.
```
destroyed() {
    console.log(this);
}
```
VÌ `component` đã bị hủy nên ta sẽ không in ra gì ở console.

# Tổng kết
Ở bài viết này ta đã tìm hiểu về **Vue Instance Lifecycle Hooks**, các giai đoạn, **lifecycle hooks**:
* beforeCreate
* created
* beforeMount
* mounted
* beforeDestroy
* destroyed

# Tài liệu tham khảo
https://www.digitalocean.com/community/tutorials/vuejs-component-lifecycle