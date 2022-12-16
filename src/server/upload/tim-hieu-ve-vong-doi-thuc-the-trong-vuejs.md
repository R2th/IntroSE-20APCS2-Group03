Bài viết được dịch từ: https://alligator.io/vuejs/component-lifecycle/ của tác giả: [Joshua Bemenderfer](https://alligator.io/author/joshua-bemenderfer)
Chúng ta đã được biết đến sơ đồ vòng thực thể trong Vue.js tuy nhiên chúng ta chưa thực sự đi sâu vào các hook trong sơ đồ này. Khi xem sơ đồ này, có thể bạn không hiểu ngay, nhưng sau một thời gian làm việc với Vue.js, đặc biệt khi thực hiện một vài dự án với Vue, bạn sẽ dần hiểu được các khái niệm. Và giờ là lúc chúng ta sẽ đi chi tiết hơn vào sơ đồ vòng đời một thực thể trong Vue.

> Hook là cơ chế can thiệp vào một chuỗi các hành động nhằm thực thi các logic riêng hoặc ngăn chặn sự kiện được hook xảy ra. Trong phần này, chúng ta sẽ sử dụng nguyên từ hook do tiếng Việt thật khó để mô tả kỹ từ này bằng một vài từ ngắn gọn. Hook trong vòng đời thực thể là các hàm, phương thức dùng để can thiệp vào từng giai đoạn của vòng đời thực thể.

![](https://images.viblo.asia/8ee5f072-0163-487c-a4f4-fe900e07d4a2.png)

Hook trong vòng đời thực thể là khái niệm quan trọng giúp bạn biết được khi nào Vue component được tạo ra, được đưa vào DOM, được cập nhật và được hủy bỏ. Nhìn trên sơ đồ trên chúng ta thấy được một số các hook mà Vue.js cung cấp là **beforeCreate(), created(), beforeMount(), mounted(), beforeUpdate(), updated(), beforeDestroy(), destroyed().**
# Khởi tạo component

- Hook khởi tạo là phương thức dùng để can thiệp vào quá trình đầu tiên khi component chạy, chúng cho phép thực hiện các hành động trước khi component được đưa vào cây DOM. Không giống như các hook khác, hook khởi tạo cũng chạy trong quá trình render phía server.
- Sử dụng hook khởi tạo nếu bạn muốn thiết lập những gì liên quan trong component trong suốt quá trình render ở client và server. Bạn sẽ không thể truy xuất vào DOM hoặc phần tử được mouting (this.$el) trong hook khởi tạo.
# beforeCreate()

- beforeCreate được chạy tại quá trình khởi tạo của component, tùy chọn data sẽ không “phản ứng” và events cũng chưa được thiết lập. “phản ứng” ở đây đồng nghĩa với thuộc tính “phản ứng” ám chỉ rằng khi dữ liệu (model) thay đổi thì nó sẽ tác động ngược lại để các view thay đổi. 
- Ví dụ:

```php
<script>
export default {
  beforeCreate() {
    console.log('Nothing gets called before me!')
  }
}
</script>
```

# created()

- Trong hook created, bạn có thể truy xuất được dữ liệu “phản ứng” và events đã được hoạt động. Các template và Virtual DOM lúc này chưa được mount và render. 
- Ví dụ:
```php
<script>
export default {
  data: () => ({
    property: 'Blank'
  }),

  computed: {
    propertyComputed() {
      console.log('I change when this.property changes.')
      return this.property
    }
  },

  created() {
    this.property = 'Example property update.'
    console.log('propertyComputed will update, as this.property is now reactive.')
  }
}
</script>
```

# Chèn phần tử DOM

Hook trong giai đoạn chèn thêm phần tử DOM thường được sử dụng nhiều nhất, ở giai đoạn này mọi việc không quá sớm cũng như quá muộn. Chúng cho phép bạn truy xuất vào component ngay lập tức trước và sau khi component render lần đầu. Tuy nhiên, hook này không chạy khi render phía server.

- Sử dụng hook này nếu bạn muốn truy xuất hoặc thay đổi DOM của component ngay trước hoặc sau khi khởi tạo render.
- Không sử dụng nếu bạn muốn lấy dữ liệu từ component khi khởi tạo. Thay vào đó sử dụng created() (hoặc created() và actived() với keep-alive component), đặc biệt khi bạn cần dữ liệu trong quá trình render phía server.

# beforeMount()

- beforeMount() hook chạy trước khi khởi tạo render xảy ra và sau khi template hoặc hàm render được biên dịch. Phần lớn, bạn sẽ không bao giờ cần sử dụng hook này, nhớ rằng nó không được gọi khi render phía server. 
- Ví dụ:
```php
<script>
export default {
  beforeMount() {
    console.log(`this.$el doesn't exist yet, but it will soon!`)
  }
}
</script>
```

# mounted()

- Trong mounted() hook, bạn có thể truy xuất đầy đủ các component “phản ứng”, các template và các DOM đã được render thông qua this.$el. Hook mounted() được sử dụng thường xuyên nhất trong các hook có trong vòng đời thực thể. Thường sử dụng hook này để lấy dữ liệu cho component và thay đổi DOM, cũng thường được sử dụng để tích hợp với các thư viện khác ngoài Vue.js.
- Ví dụ:
```php
<template>
  <p>I'm text inside the component.</p>
</template>

<script>
export default {
  mounted() {
    console.log(this.$el.textContent) // I'm text inside the component.
  }
}
</script>
```

# Re-render

Hook này của component được gọi khi các thuộc tính “phản ứng” của component thay đổi và nó cũng chính là nguyên nhân mọi thứ re-render. Chúng cho phép bạn hook vào vòng watch-compute-render trong component.
- Sử dụng nếu bạn muốn biết khi nào component được re-rend.
- Không sử dụng nếu bạn muốn biết khi nào thuộc tính “phản ứng” trên component của bạn thay đổi. Thay vào đó sử dụng các thuộc tính computed hoặc watcher.
# beforeUpdate()

Hook này được gọi sau khi data thay đổi trên component và vòng cập nhật bắt đầu, ngay trước khi DOM được re-render. Nó cho phép bạn lấy trạng thái mới của bất kỳ dữ liệu “phản ứng” trên component trước khi nó render. 
- Ví dụ:
```php
<script>
export default {
  data: () => ({
    counter: 0
  }),

  beforeUpdate() {
    console.log(this.counter) // Logs the counter value every second, before the DOM updates.
  },

  created() {
    setInterval(() => {
      this.counter++
    }, 1000)
  }
}
</script>
```

# updated()

Hook updated() chạy sau khi data thay đổi trên component và DOM được re-render. Nếu bạn muốn truy xuất DOM sau khi thuộc tính thay đổi, đây chính là hook phù hợp nhất để thực hiện. 
- Ví dụ:
```php
<template>
  <p ref="dom-element">{{counter}}</p>
</template>
<script>
export default {
  data: () => ({
    counter: 0
  }),

  updated() {
    // Fired every second, should always be true
    console.log(+this.$refs['dom-element'].textContent === this.counter)
  },

  created() {
    setInterval(() => {
      this.counter++
    }, 1000)
  }
}
</script>
```

# Hủy bỏ

Hook hủy bỏ cho phép bạn thực hiện các hành đồng khi component được hủy bỏ. Chúng được gọi khi component được remove khỏi DOM.
# beforeDestroy()

beforeDestroy được gọi ngay trước khi phá bỏ, component vẫn còn đó. Nếu bạn muốn xóa bỏ các event, các đoạn công việc liên quan đến “phản ứng”, beforeDetroy rất phù hợp cho việc đó.
- Ví dụ:
```php
<script>
export default {
  data: () => ({
    someLeakyProperty: 'I leak memory if not cleaned up!'
  }),

  beforeDestroy() {
    // Perform the teardown procedure for someLeakyProperty.
    // (In this case, effectively nothing)
    this.someLeakyProperty = null
    delete this.someLeakyProperty
  }
}
</script>
```

# destroy()

Khi không còn gì để nuối tiếc component, bạn sử dụng destroy() hook để dọn dẹp lần cuối và thông báo với máy chủ rằng component đã được hủy bỏ. 
- Ví dụ:
```php
<script>
import MyCreepyAnalyticsService from './somewhere-bad'

export default {
  destroyed() {
    console.log(this) // There's practically nothing here!
    MyCreepyAnalyticsService.informService('Component destroyed. All assets move in on target on my mark.')
  }
}
</script>
```
# Các hook khác

Còn một số các hook khác như actived(), deactived()… nó được sử dụng trong keep-alive component và ngoài phạm vi của bài viết này. Nó cho phép bạn phát hiện một component được bao quanh bởi thẻ <keep-alive>. Bạn cũng có thể sử dụng chúng để lấy dữ liệu cho component hoặc quản lý thay đổi trạng thái mà không cần rebuild lại component.