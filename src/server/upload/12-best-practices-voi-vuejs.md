### Giới thiệu

Xin chào tất cả các bạn, hôm nay mình sẽ giới thiệu với các bạn một số lưu ý khi coding vuejs.
Hy vọng bài ciết này có thể giúp cho các bạn tốt hơn khi coding vuejs
Không dài dòng nữa mình bắt đầu luôn nhé.

### 1. Luôn sử dụng **:key** với v-for
 
Vì sao cần phải sử dụng **:key** ,  vì nó sẽ giúp giữ lại các state của component. 

```html
<!-- BAD -->
<product-item v-for="product in products" />

<!-- GOOD -->
<product-item
  v-for="product in products"
  :key="product.id"
/>
```

### 2. Sử dụng kebab-case cho events

Khi viết các custom event thì chúng ta nên sử dụng kebab-case vì khi lắng nghe lại event này ở conponent cha nó cũng ở dạng kebab-case. Vì vậy chúng ta nên sử dụng cho cả 2 để thống nhất và dễ quản lý sau này.

```
// ProductItem.vue
this.$emit('choose-this-item');

// ProductList.vue
<product-item @choose-this-item="handleEvent" />
```

### 3. Khai báo Props với camelCase trong script và kebab-case trong template

Vì trong mỗi ngôn ngữ có convention khác nhau. Như trong javascript thì camelCase thường là chuẩn, còn trong HTML thì thường là kebab-case. Vì vậy chúng ta nên sù dụng chúng hợp lý.

Trong vuejs thì nó sẽ tự động chuyển camelCasse thành kebab-case trong template, nhưng các bạn hãy chú ý khi sử dụng nó nhé.

```
<!-- BAD -->
<template>
  <product-item productTitle="Product 1" />
</template>
<script>
export default {
  props: {
    'product-title': String,
  },
}
</script>

<!-- GOOD -->
<template>
  <product-item product-title="Product 1" />
</template>
<script>
export default {
  props: {
    productTitle: String,
  },
}
</script>
```

### 4. Luôn sử dụng function return cho data

```javascript
// BAD!
data: {
  name: 'Product 1',
},
```
Vì sao lại như vậy, bởi vì nếu bạn dùng data là một object thì thì đó tất cả các component được tạo ra đều sẽ có chung 1 data vì nó reference với nhau. Dẫn đến khi thay đổi data trong 1 component nó có thể thay đổi cả data của component khác.

Vậy nên chúng ta hãy dùng function return thay vì 1 object.

```javascript
// GOOD!
data() {
  return {
    name: 'Product 1',
  };
},
```

### 5. Không sử dụng **v-if** với **v-for**
```html
<product-item
  v-for="product in products"
  v-if="product.price < 500"
/>
```

Khi bạn sử dụng như vậy nó sẽ chạy qua tất cả phần tử trong array sau đó mới kiểm tra điều kiện trong **v-if**. Có nghĩa nó sẽ render hết phần tử rồi mới kiểm tra điều kiện để ẩn đi. Điều này nghe có vẻ không tốt lắm nhỉ.

Thay vì vậy chúng ta hãy dùng computed

```Vuejs
<template>
  <product-item v-for="product in cheapProducts" />
</template>
<script>
export default {
  computed: {
    cheapProducts() {
      return this.products.filter(({ price }) => price < 500); 
    },
  },
}
</script>
```

### 6. Nên validate dữ liệu của props ngay trong phần khai báo

Nếu như bạn làm việc trong một team lớn và không thể hiểu hết được ý của nhau thì chúng ta cần phải làm rõ nó ở trong code hơn. Khi người khác đọc sẽ hiểu ngay ý tưởng của mình.

Đây là 1 ví dụ về validate prop của Vue docs.

```javascript
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```

### 7. Sử dụng PascalCase hoặc kebab-case khi đặt tên cho file component

Đây không phải là một vấn đề gì quá nghiêm trọng nhưng nó cần có để thông nhất cách đặt tên file giữa các member trong team.

```
# BAD
mycomponent.vue
myComponent.vue
Mycomponent.vue

# GOOD
MyComponent.vue // Nên dùng vì đa số mọi người đều dùng kiểu này
my-component.vue
```

### 8. Nên sử dụng prefix cho các base component

Đây cũng là một vấn đề khác liên quan đến việc đặt tên file.

Các base component thường là các component độc lập và sử dụng được ở nhiều nơi trong project.

Ví dụ như các base component sau:

```
BaseButton.vue
BaseIcon.vue
BaseLink.vue
```

Và dựa vào cách đặt tên này chúng ta có thể nhóm chúng lại và import global trong project để sử dụng ở bất kỳ đâu.

### 9. Đặt prefix "The" cho các component duy nhất mà có thể thấy ở bất kỳ đâu. Ví dụ:

```
TheHeader.vue
TheFooter.vue
TheSidebar.vue
```

### 10. Sử dụng một cách thống nhất các directive

Đa số các dev Vue đều sử dụng theo kểu shorthand vì nó gọn hơn:

-- `@` thay cho `v-on`
-- `:` thay cho `v-bind`
-- `#` thay cho `v-slot`

### 11. Đừng gọi method trong `created` và `watch`

Giả sử các bạn muốn sử dụng watch, nhưng khi mới khởi tạo component thì watch không thực hiện vì chưa có thay đổi nào cả, nên bạn quyết định gọi method trong hook created như thế này:

```javascript
// BAD!
created() {
  this.handleChange();
},
methods: {
  handleChange() {
    // do something
  },
},
watch: {
  item() {
    this.handleChange();
  },
},
```

Bạn không nên sử dụng như thế này vì vue đã có property của watcher để bạn có thể làm điều này một cách dễ dàng

```javascript
// GOOD
methods: {
  handleChange() {
    // do something
  },
},
watch: {
  item: {
    immediate: true,
    handle() {
      this.handleChange();
    }
  },
},
```

### 12. Không nên sử dụng các biểu thức trong template

Về thực tế thì bạn vẫn có thể sử dụng nhưng chức năng chính của template là để hiển thị nên các bạn không nên đưa quá nhiều cá biểu thức vào mà hãy để nó vào phần script thay cho.

```
{{ products.map(({ name }) => name).join(',') }}
```

Hãy làm cho template đơn giản hơn:

```
{{ allProductName }}

// ...
computed: {
  allProductName() {
    return this.products.map(({ name }) => name).join(',');
  }
}
```

### Tổng kết

Trên đây là 12 lưu ý có thể làm cho project vue của bạn trở nên dễ đọc, dễ maintain và có vẻ chuyên nghiệp hơn đấy nhỉ :)))

Hy vọng bài viết này có thể giúp ích được cho các bạn.

Chúc các bạn một ngày làm việc và học tập hiệu quả.