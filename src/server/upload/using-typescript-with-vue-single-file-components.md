![](https://images.viblo.asia/d781eed8-2edd-4f53-b0fc-b9b15d104377.png)
# I. Tìm hiểu TypeScript.
## 1. TypeScript Là gì?
TypeScript là một phiên bản cao hơn của JavaScript, được thiết kế để xây dựng các ứng dụng lớn và phức tạp.  Nó kế thừa nhiều khái niệm từ Java và C#, TypeScript là ngôn ngữ tĩnh (Static typed) có nghĩa là nó nghiêm ngặt và có trật tự trái ngược với free-type. Nó còn được bổ sung thêm lớp hướng đối tượng mà điều này không có ở Javascript.

## 2. Tại sao gọi là bản cao cấp hơn Javascript? 
Với TypeScript, ta có thể bê nguyên xi code JavaScript vào trong cùng một file và chạy cùng nhau bình thường, bởi vì TypeScript duy trì cú pháp của JavaScript và mở rộng nó bằng một loạt tính năng mới. Nhờ đó mà hiệu năng làm việc được tăng lên đáng kể.

TypeScript là một dự án kéo dài hơn 3 năm của Microsoft nhằm tạo ra một ngôn ngữ để mở rộng JavaScript. Giúp nó trở nên phù hợp hơn với những ứng dụng lớn, nhưng vẫn quen thuộc với cấu trúc ngôn ngữ JS hiện tại để mọi người có thể học nhanh hơn. Trưởng nhóm dự án này là Anders Hejlsberg, cha đẻ của C#, Turbo Pascal và Delphi.

Tại sao lại cần với Vue.js ?

Đối với bản 3.0 của vue.js thì cơ sở mã của Vue.js 3.0 sẽ được viết lại hoàn toàn bằng TypeScript, điều này sẽ không ảnh hưởng đến những người phát triển ES6, nhưng chắc chắn nó sẽ cải thiện rất nhiều trải nghiệm TypeScript. Điều này bạn có thể xem ở [đây](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf)
# II. Sử dụng TypeScript trong Vue.js.
## 1. Tạo dự án với CLI.
Với Vue CLI 3, bạn có thể tạo một dự án mới với TypeScript đã được cấu hình khá đơn giản bạn chỉ cần chú ý chọn TypeScript khi tạo dự án mới với CLI.
```php
# Tạo dự án vue
$ vue create .
```

![](https://images.viblo.asia/4f64a739-0112-4c3b-99fb-56b42471a48a.png)

Sau đó bạn chọn yes là ok.

![](https://images.viblo.asia/fa444036-d910-4745-95ae-13746c69e5d0.png)

Nếu bạn đã có một dự án vue mà muốn thêm TypeScript thì có thể làm như sau.
```php
$ vue add typescript
```
## 2. Cấu hình trình biên dịch TypeScript
Vì TypeScript yêu cầu một bước để xây dựng nên bạn có thể tùy ý cấu hình TypeScript theo nhu cầu của dự án thông qua file tsconfig.json. Tệp tin này sẽ nằm trong thư mục gốc của dự án.

Hãy thử nghiệm với các tùy chọn này để tìm ra cái nào hữu ích nhất cho bạn và dự án của bạn. Tôi sẽ khuyên bạn nên kích hoạt noImplicitAny, noImplicit This, noImplicitReturn ở mức cơ bản nhất.

noImplicitAny: Tăng khả năng tìm ra lỗi đối với biểu thức hay với các biến được khai báo, nó sẽ đưa ra một lỗi nếu một đối số, const, let hoặc var không có một kiểu dữ liệu.

noImplicitThis: Tương tự noImplicitAny nhưng sẽ gây ra lỗi với từ khóa this.

noImplicitReturns: Báo lỗi khi không phải tất cả các đường dẫn mã code trong hàm đều trả về giá trị. Điều này giúp đảm bảo rằng tất cả các điều kiện trong một hàm đã cho sẽ trả về một gía trị và một kiểu dữ liệu cụ thể.

Trong tsconfig.js
```js:tsconfig.js
{
  "compilerOptions": {
    "module": "ES6",
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "sourceMap": true
  },
  "paths": {
    "@/*": [
      "src/*"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.vue"
  ],
  "files": [
    "src/vue-shims.d.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```


## 3. Kiểu dữ liệu cơ bản
### 1. Các kiểu dữ liệu trong TypeScript
Trong TypeScript có 12 loại kiểu dữ liệu.
* boolean
* number
* string
* array
* object
* tuple
* enum
* any
* void
* undefined
* null
* never

Các loại phổ biến mà bạn sẽ sử dụng thuộc kiểu dữ liệu nguyên thủy: string, number, boolean, null, undefined, và void. Tuy nhiên, sẽ có lúc bạn cần tạo một kiểu dữ liệu tùy chỉnh. Để tạo được bạn có thể sử dụng Interface trong TypeScript.

### 2. Tùy chỉnh một kiểu dữ liệu.
Trong thư mục gốc của bạn, tạo một thư mục và đặt tên cho nó types. Trong thư mục mới này, tạo một tệp mới có tên là index.ts. Bạn sử dụng interface đẻ khai báo.
```js
export interface User {

}
```

Từ đây, bạn có thể bắt đầu xác định các thuộc tính và loại giá trị mà đối tượng sẽ có.
```js
export interface User {
  firstName: string,
  lastName: string,
  twitterHandle: string,
  location: {
    city: string,
    state: string
  }
}
```

Trong ví dụ này, bạn có thể khai báo thêm một kiểu dữ liệu tùy chỉnh khác như sau. 
```js
export interface User {
  firstName: string,
  lastName: string,
  twitterHandle?: string,
  location: Location
}

export interface Location {
  city: string,
  state: string
}
```

Bây giờ chúng ta có thể sử dụng kiểu dữ liệu tùy chỉnh này trong bất kỳ tệp Vue.js ( .vue) hoặc TypeScript ( .ts)  nào mình muốn.

Sử dụng các kiểu dữ liệu tùy chỉnh trong các thành phần Vue tệp đơn (SFC)

Bây giờ chúng ta đã tạo xong một kiểu dữ liệu của riêng mình, để sử dụng bạn cần import SFC giống các tệp ESM, JavaScript khác, v.v. Để sử dụng TypeScript trong thành phần của mình, bạn sẽ cần thêm một lang thuộc tính vào thẻ script. Giá trị của thuộc tính đó phải là ts.

Khi sử dụng TypeScript trong các thành phần Vue, thư viện Vue phải được import để bạn có thể mở rộng từ nó. Vì tôi không sử dụng cú pháp kiểu lớp, nên bạn cần sử dụng từ khóa as để khai báo data dưới data types.
trong App.vue
```html
<template>
  <p></p>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { User } from '@/types' // Our interface
  
  export default Vue.extend({
    name: 'Home' as string,
    data() {
      return {
        user: {} as User // Declaring reactive data as type User
      }
    },
    mounted() {
      this.user = {
        firstName: `Dave`,
        lastName: `Berning`,
        twitterHandle: `@daveberning`,
        location: {
          city: `Cincinnati`,
          state: `OH`
        }
      }
    }
  })
</script>
```

Đối với những biến được khai báo const, let, var hoặc một kiểu trả về hàm, bạn có thể định nghĩa kiểu dữ liệu cho nó bằng cách sử dụng dấu hai chấm :.
```html
<script lang="ts">
  import Vue from 'vue'
  import { User } from '@/types'
  
  export default Vue.extend({
    name: 'Home' as string,
    data() {
      return {
        user: {} as User
      }
    },
    computed: {
      fullName(): string { // Computed Property returns a string
        return `${this.user.firstName} ${this.user.lastName}`
      }
    },
    mounted(): void { // The mounted hook returns nothing
      ...
    }
  })
</script>
```

### 3. Khai báo xử lý.
Sau khi đã tạo dự án Vue, bạn có thể thấy file shims-vue.d.ts. Đó là tệp khai báo ( .d.ts). Tệp khai báo là một tệp không chứa bất kỳ mã thực thi nào, nhưng chứa các mô tả về mã tồn tại bên ngoài các tệp dự án.

Chúng rất hữu ích khi sử dụng các module Node không chứa bất kỳ giao diện nào. Bán có thể hiểu mục đích duy nhất của tệp tin này là cho TypeScript biết cách xử lý các mã bên ngoài.

Trong file shims.d.ts

```js
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

Trong trường hợp trên, về cơ bản, bạn có thể hiểu là tôi đang nói cho trình biên dịch TypeScript (và IDE) cách xử lý các tệp .vue.

# III. Kết luận.
Như vậy mình đã giới thiệu xong cách sử dụng TypeScript trong Vue.js một cách cơ bản. Bạn có thể hiểu đơn giản TypeScript là JavaScript như SASS là CSS còn để sử dụng tốt hơn thì bạn có thể tìm hiểu thêm các bài học về TypeScript trên mạng.

Link tham khảo : https://alligator.io/vuejs/using-typescript-with-vue/