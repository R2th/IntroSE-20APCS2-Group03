## 1. Components
- Các components trong Vue có thể giúp cho code của bạn được chia tách một cách rõ ràng, và mỗi file của bạn sẽ ngắn hơn, người đọc dễ hiểu và dễ maintain hơn. 
- Có thể có nhiều conponent con được sử dụng trong trong một component cha.
- Hạn chế và tránh tình trạng những đoạn code giống nhau bị lặp đi lặp lại vì các component này có thể tái sử dụng lại nhiều lần.
- Các component giữ tất cả dữ liệu trong một tệp .vue duy nhất - bao gồm cấu trúc giống như HTML với các thành phần <template> (markup), <script> (JavaScript) và <style> (CSS).
![](https://images.viblo.asia/4a7d9445-0323-4525-90fd-ba40f52e8124.png)
## 2. Tryền data từ component cha xuống component con
    
### - Import các component con trong component cha, sau đó chúng ta có thể sử dụng chúng
```html
<script>
import Child from '@/components/Child.vue'
    
export default {
  components: {
    Child
  },
  data: function () {
    return {
         //
    }
  },
}
</script>
```
### - Gọi component con trong component cha: Trong thẻ <template> chúng ta có thể gọi component con đã được import
```html
<template>
  <div>
     <!-- truyền một string -->
     <Child title="This is my title"></Child>
    <!-- truyền một object -->
    <Child :parentData="{msg: 'xxx'}"></Child>

    <!-- truyền một object đã define trong data() -->
    <Child :parentData="myData"></Child>

    <!-- truyền một biến đã define trong data() -->
    <Child :stringProp="stringMessage"></Child>
  </div>
</template>
```
 Dấu ":" ở :parentData hay  :stringProp chỉ ra rằng đây là truyền một biến không phải một string
### - Nhận data từ component con:
Khai báo prop trong phần <script> của component con:
```html
<script>
export default {
  name: 'Child',
  // khai báo props
  props: {
    parentData: Object,
    stringProp: String,
    title: String
  }
}
</script>
```
Giờ chúng ta có thể sử dụng nó như một biến định nghĩa Vue bình thường ở component con.
## 3. Truyền data từ component con lên component cha
Bạn có thể gửi dữ liệu từ một component con lên một component cha bằng phương thức $emit () đã được tích hợp sẵn của Vue. Tham số đầu tiên của $emit là sự kiện cần được lắng nghe trong trong component cha. Tham số thứ hai (tùy chọn) là giá trị dữ liệu cần truyền.
```html
<!-- Parent.vue -->
<template>
  <div>
    <!-- Lắng nghe childToParent, component cha lắng nghe sự kiện truyền lên của con là childToParent -->
    <Child :parentData="myData" v-on:childToParent="onChildClick"></PassProps>
  </div>
</template>
<script>
import Child from '@/components/Child.vue'
export default {
  data () {
    return {
      fromChild: '', 
    }
  },
  name: 'about',
  components: {
    Child
  },
  methods: {
    // click bắt sự kiện $emit từ con
    onChildClick (value) {
      this.fromChild = value
    }
  }
}
</script>
```
Phát sự kiện từ component con:
```html
<!-- Child.vue -->
<template>
  <div class="child">
    <!-- set a variable then trigger a method which calls `$emit()` -->
    <label for="child-input">Child input: </label>
    <input id="child-input" type="text" name="msg" v-model="childMessage" v-on:keyup="emitToParent">
  </div>
</template>
<script>
export default {
  data() {
    return {
      childMessage: ''
    }
  },
  name: 'Child',
  methods: {
    emitToParent (event) {
      this.$emit('childToParent', this.childMessage)
    }
  }
}
</script>
```
Ở đây khi bạn nhập ô input ở component con childMessage sẽ được $emit lên conponent cha
    
Vậy là bài viết này mình đã giỡi thiệu cho các bạn qua về tác dụng của component trong Vue và cách truyền biến giữa các component từ cha xuống con và từ con lên cha
    
link tham khảo: https://dev-notes.eu/2018/05/passing-data-between-vue-components/