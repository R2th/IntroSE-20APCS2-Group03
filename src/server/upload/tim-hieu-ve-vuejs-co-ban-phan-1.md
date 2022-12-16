## Giới thiệu:
**Vue.js** là một *framework* dùng để xây dựng giao diện người dùng (user interfaces). Khác với các *framework* nguyên khối (monolithic framework ) **Vuejs** ngay từ ban đầu được thiết kế theo hướng cho phép và khuyến khích việc phát triển ứng dụng theo từng bước và cho các cấu trúc thiết kế linh hoạt. Nó cho phép bạn thiết kế mọi thứ từ đầu và thành công trong việc phát triển các dự án lớn.
## Cài đặt và chạy thử:
**1. Cách 1: Sử dụng CDN**

   Sử dụng **CDN** là file thư viện của **Vuejs** đã được chia sẻ trên *server* và bạn có thể dùng trực tiếp online bằng cách dán câu lệnh sau:
   >  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

   Khi bạn *publish* bản *production* cho dự án của bạn thì hãy đổi `vue.js` thành `vue.min.js` để tăng tốc độ xử lý nhé.

**2. Cách 2: Sử dụng NPM và CLI**

   **NPM** được mọi người khuyến khích sử dụng khi bạn muốn xây dựng dự án lớn với **Vuejs**. **NPM** được hoạt động rất tốt với các* module bundler* (các công cụ đóng gói module) như *Webpack* hoặc *Browserify*. **Vue** cũng cung cấp công cụ hỗ trợ để viết các *single file component*. Chỉ cần các bạn chạy command sau:

>    $ npm install vue

   Sau đó, bạn hãy cài đặt thêm **Vue-CLI** bằng các command sau:
   
   ```
   #Cài đặt vue-cli
   $ npm install --global vue-cli
   #Khởi tạo một project mới với template "webpack"
   $ vue init webpack test-vuejs
   #Trỏ đến thư mục project vừa tạo
   $ cd test-vuejs
   #Chạy server nào!
   $ npm run dev
   ```
   Và đây là kết quả sau khi cài đặt và `run server` thành công:
   ![](https://images.viblo.asia/cedc0178-770a-4046-a7c0-02efb6fed831.JPG)
   Chú ý, để sử dụng được NPM các bạn hãy kiểm tra xem máy mình đã cài đặt NodeJs hay chưa bằng command `node -v`. Nếu chưa, các bạn có thể tải về tại [đây](https://nodejs.org/en/).
   
   Nếu các bạn cài đặt **Vuejs** cho **Laravel** thì chỉ cần câu lệnh command `npm install` bởi vì **Laravel** đã hỗ trợ tích hợp **Vuejs** nên việc cài đặt rất đơn giản đúng không nào. Để chạy chương trình **Vuejs** trong **Laravel** các bạn chạy lần lượt các command sau:
   
   ```
   $ php artisan serve
   $ npm run watch
   ```
##    Vòng đời của một đối tượng trong Vuejs:
Để hiểu rõ hơn bản chất của **Vuejs** và cách thức hoạt động của nó ra sao thì chúng ta cần phải nắm được vòng đời của **Vuejs** là như thế nào. Dười đây là hình ảnh vòng đời của **Vuejs** mình lấy trên trang chủ của **Vue**:
![](https://images.viblo.asia/18c96081-c31b-4eaf-b4e0-39a2feb77ace.png)
### Quá trình khởi tạo:
**1. beforeCreate():**

Hàm **beforeCreate** sẽ được đồng bộ ngay sau khi Vue được khởi tạo. Trong quá trình này, các *data* (dữ liệu) và *event* (sự kiện) sẽ chưa được thiết lập.
```
<template>
    <div id="my-text">
        Hello world
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'Demo Vuejs'
            }
        },
        beforeCreate() {
            console.log("Hello Viblo")
            console.log(this.msg)
        }
    }
</script>
```
Sau đó kiểm tra kết quả:
![](https://images.viblo.asia/ab3324d4-5569-4276-aa70-c5d092fa8515.JPG)
Chúng ta có thể thấy rằng `this.msg` không nhận được dữ liệu trong `data` từ hàm **beforeCreate**.

**2.  created():**

Hàm **created** lúc này đã có thể sử dụng và thao tác *data* và *event* và các bạn đã thiết lập trước đó.
```
<template>
    <div id="my-id">
        Hello world
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'Demo Vuejs'
            }
        },
        created() {
            console.log("Created")
            console.log(this.msg)
            console.log(document.getElementById('my-id').innerHTML)
        }
    }
</script>
```
Sau đó bạn hãy kiểm tra kết quả:
![](https://images.viblo.asia/a8bb4786-1d32-4c9e-bc12-983082c2376f.JPG)
Mặc dù đã in ra được data nhưng các **template** và **Virtual DOM(Document Object Model)** chưa được *mount* và *render* nên bạn không thể truy cập.
### Quá trình Mounting:
Trong quá trình này **Vue** cho phép truy xuất vào các `component` ngay lập tức, sau khi `component` được render lần đầu tiên. Sử dụng khi bạn muốn thay đổi *DOM(Document Object Model)* trước hoặc sau khi render. Không sử dụng được khi Liên quan đến *data*.

**1. beforeMount():**
Hàm này được gọi sau khi *component* được biên dịch và trước lần *render* đầu tiên. Tuy nhiên, các phần tử như *template* và *DOM* vẫn chưa được truy cập.

**2. mounted():**

Trong hàm này, chúng ta có thể toàn quyền truy cập đến *component, template và DOM* thông qua `this.$el`. Hàm này được sử dụng thường xuyên khi chúng ta có thể viết các câu lệnh *Jquery* truy cập đến *DOM*.
```
<template>
    <div id="my-id">
        Hello world
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'Demo Vuejs'
            }
        },
        mounted() {
            console.log("mounted")
            console.log(this.$el)
            console.log(document.getElementById('my-id').innerHTML)
         }
    }
</script>
```

![](https://images.viblo.asia/899bdb62-8dbe-4bea-bf8b-91635f46a4c8.JPG)
### Quá trình Updating (Thay đổi và Re-render):
Quá trình này sẽ được gọi khi có sự thay đổi trong *component* khiến cho nó phải `re-render`.

**1. beforeUpdate():**

Hàm này được gọi ngay khi có sự thay đổi về dữ liệu trong *component* và sẽ được thực hiện trước khi `re-render`.
```
<template>
    <div id="my-id">
        {{ count }}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            }
        },
        created() {
          setInterval(() => {
            this.count++
          }, 1000)
        },
        beforeUpdate() {
          console.log("Số lượng:" + this.count)
        }
    }
</script>
```
Như ví dụ trên, chúng ta sẽ tăng giá trị `count` lên 1 trong mỗi giây. Hàm `created()` được chạy đầu tiên và thay đổi giá trị của *data*. Ngay khi nhân được sự thay đổi dữ liệu của *component*, `beforeUpdate()` hook sẽ lấy dữ liệu data mới được update và log ra *console*. Cuối cùng mới đến *DOM re-render* và hiển thị giá trị ở *template*.

**2. updated():**
Hàm này được thực hiện ngay sau khi *DOM* đã *re-render*. Dữ liệu truy xuất được là dữ liệu sau khi được thay đổi của *component*, cũng là dữ liệu lấy được trong `beforeUpdate()`.
```
<template>
    <div id="my-id">
        {{ count }}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            }
        },
        created() {
          setInterval(() => {
            this.count++
          }, 1000)
        },
        beforeUpdate() {
          console.log("Số lượng beforeUpdate:" + this.count)
        },
        updated() {
            console.log("Số lượng updated: " + this.count)
        },
    }
</script>
```
Kết quả cho ta thấy được rằng hàm `updated()` thực hiện ngay sau hàm` beforeUpdate()`, sau khi* DOM re-render* và dữ liệu của chúng cũng trùng khớp với nhau.
![](https://images.viblo.asia/332c540d-3a02-49f1-97ae-b67f698e1ced.JPG)
### Quá trình Destroy(hủy bỏ):
**1. beforeDestroy():**
Hàm này được gọi ngay trước khi *component* bị hủy bỏ. Đây là lúc phù hợp nhất để chúng ta loại bỏ đi *data* và *event* không cần thiết khi *component* bị hủy.
**2. destroyed():**
Hàm này được gọi khi component đã bị xoá bỏ khỏi DOM.
### Những hàm thường dùng và cần chú ý:
Như các bạn đã thấy, **Vue** cung cấp khá nhiều hàm trong toàn bộ vòng đời của 1 *component*, nhưng chủ yếu chúng ta sẽ dùng các hàm sau đây:
* **created():** thường được sử dụng để *call api* lấy dữ liệu từ *server*, lắng nghe các sự kiện.
* **mounted():** thường được sử dụng để viết câu lệnh Jquery để truy vấn đến *DOM*.
* **beforeDestroy():** thường được sử dụng để loại bỏ *data* và *event* trong *component*.

## Tổng kết:
Như vậy trong bài này, mình đã giới thiệu cho các bạn về các cách cài đặt **Vuejs** và vòng đời của 1 đối tượng trong **Vuejs** giúp các bạn hiểu thêm về nó. Mình rất mong nhận được sự góp ý của các bạn. Cảm ơn các bạn đã lắng nghe bài chia sẻ của mình. Chúc các bạn thành công!
## Tài liệu tham khảo:
[https://vi.vuejs.org/v2/guide/](https://vi.vuejs.org/v2/guide/)