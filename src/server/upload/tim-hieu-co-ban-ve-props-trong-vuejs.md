## 1. Props là gì?

Theo tài liệu của VueJS có viết:
> Props are custom attributes you can register on a component. When a value is passed to a prop attribute, it becomes a property on that component instance.

Hiểu đơn giản đó là props là cách ta truyền dữ liệu giữa các components, từ component cha đến component con.

Trong bài này chúng ta sẽ xem xét một vài khái niệm về props trong VueJS

## 2.  Cách định nghĩa 1 prop

Để 1 component định nghĩa 1 prop, thì nó phải được định nghĩa bên trong thuộc tính props

```javascript:Todo.vue
<template>
  <p>Pending {{ task }}</p>
</template>

<script>
export default {
  name: 'Todo',
  props: ['task']
}
</script>
```

## 3.  Truyền dữ liệu bằng props

Để 1 component sử dụng được prop, thì ta có thể thêm vào đơn giản giống như thêm thuộc tính trong thẻ HTML:

```javascript
<Todo task="Learn about Vue.js props"/>
```

Vậy điều gì sẽ xảy ra nếu bây giờ ta muốn truyền nhiều hơn 1 prop vào component. Đơn giản bạn làm như sau:

```javascript
<template>
  <p>Pending {{ task }} at {{time}}</p>
</template>

<script>
export default {
  name: 'Todo',
  props: ['task', 'time']
}
</script>
```

## 4.  Prop types

Việc định nghĩa kiểu dữ liệu cho props là rất cần thiết vì khi dữ liệu prop truyền vào không trùng khớp với kiểu đã định nghĩa, Vue sẽ trả về lỗi ngay lập tức trong console

Để set prop types, bạn có thể liệt kê props giống như 1 object với prop names là keys và prop types là values.

```javascript
props: {
    task: String,
    time: String,
    isCompleted: Boolean
 }
```

> Để tìm hiểu sâu hơn về props cũng như VueJS, hãy truy cập trang docs của VueJS [tại đây](https://vuejs.org/v2/guide/). Cảm ơn các bạn đã theo dõi.