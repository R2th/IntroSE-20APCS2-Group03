### 1. Ghi đè scoped style
Scoped CSS giúp bạn style cho component nhưng không ảnh hưởng tới style của những component khác. Vậy muốn style component đã được scoped thì bạn làm thế nào?

Xem nè:
```javascript
// Nhớ  đóng scoped cho cả hai component.
<style scoped>
.my-component >>> .child-component {
  color: blue;
}
</style>
```
```javascript
// Nếu bạn sử dụng CSS pre-processor như scss. Bạn cần xử dụng /deep/ thay thế.
<style scoped lang="scss">
.my-component {
  /deep/ {
    .child-component {
      color: blue;
    }
  }
}
</style>
```
### 2. Reset data đã được khởi tạo từ ban đầu
Khi làm việc với form, bạn sẽ cần reset lại data của form khi cần thiết, hay app dụng cách này.

```javascript
<template>
  <div class="my-component">
    <input v-model="formData.name" />
    <button @click="resetFormData">Change Text</button>
  </div>
</template>

<script>
const initalState = () => ({ name: "Viblo" }); // Tạo một function trả về giá trị khởi tạo ban đầu

export default {
  data() {
    return {
      formData: initalState(), // Gán data
    };
  },
  methods: {
    resetFormData() {
      this.formData = initalState(); // Reset data
    },
  },
};
</script>
```
### 3. Lặp qua một khoảng nhất định
Lệnh `v-for` cho phép chúng ta lặp qua một mảng, nhưng nó cũng cho phép chúng ta lặp qua một khoảng nhất định:
```javascript
<template>
  <ul>
    <li v-for="n in 5">Item #{{ n }}</li>
  </ul>
</template>
/*
Item #1
Item #2
Item #3
Item #4
Item #5
*/
```

### 4. Watch một giá trị computed
Như các bạn biết, `watch` theo dõi prop, state thay đổi. Nhưng các bạn đã bao giờ thử `watch` một giá trị `computed` chưa.  Hay nên nhớ điều này để phục vụ trong quá trình làm việc với `Vue`

```javascript
export default {
  computed: {
    someComputedProperty() {
      // Cập nhật thay đổi của thuộc tính
    },
  },
  watch: {
    someComputedProperty() {
      // Xử lý giá trị someComputedProperty thay đổi
    }
  }
};
```

-----

Nếu thấy không hiểu hoặc có những góp ý cho bài viết thì mong các bạn để lại comment nhé !@#$%^&*