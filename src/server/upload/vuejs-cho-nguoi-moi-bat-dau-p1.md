Sau khi tạo được 1 dự án mới với Vue chúng ta cùng vào tìm hiểu rõ hơn về VueJs
Nếu bạn nào chưa biết các tạo 1 dự án Vue mới [tham khảo ở link sau](https://vi.vuejs.org/v2/guide/installation.html)
## 1. Vue instance lifecycle
Khi tiếp cận bất kỳ framework nào, chúng ta đều cần phải hiểu rõ Lifecycle của chúng, từ lúc khởi tạo ứng dụng, chạy ứng dụng hay kết thúc ứng dụng đấy. Trong Vue cũng vậy, cụ thể dưới đây là sơ đồ vòng đời của một instance trong Vue.
![](https://images.viblo.asia/4c5deed4-aae6-4ff8-a1f1-bf3debde1a9d.png)

Sơ đồ phía trên là vòng đời của một instance. Như chúng ta thấy, Lifecycle của một instance sẽ gồm

Khởi tạo một đối tượng Vue
Gắn kết vào DOM
Cập nhật DOM khi dữ liệu thay đổi
Hủy instance.
## 2. LIFECYCLE HOOKS
Với những giai đoạn trong vòng đời của một instance VueJS kể trên, chúng ta sẽ đi vào tìm hiều về Lifecycle Hooks tương ứng với từng giai đoạn. 

Vậy Lifecycle Hooks là gì : Lifecycle Hooks là những phương thức được thực thi trong mỗi giai đoạn trong vòng đời của Vue.

Với bốn giai đoạn lần lượt tương ứng với các hooks:
* beforeCreate
* created
* beforeMount
* mounted
* beforeUpdate
* updated
* beforeDestroy
* destroyed.

Để hiểu hơn về Lifecycle Hooks chúng ta xem qua ví dụ sau
```vue
 data() {
    return {
      title: "Tiêu đề trang web"
    };
  },
  beforeCreate() {
    console.log(
      "BeforeCreate title: " + this.title);
  },
  created() {
    console.log(
      "created title: " + this.title);
  },
  beforeMount() {
    console.log(
      "beforeMount title: " + this.title,
      document.querySelector(".container")
    );
  },
  mounted() {
    console.log(
      "mounted title: " + this.title,
      document.querySelector(".container").classList
    );
  }

```
Kết quả: 
![](https://images.viblo.asia/4895796a-07fc-437b-994a-50a3fd353d03.PNG)

 Như đã thấy:
 Giai đoạn khởi tạo
*  beforeCreate hook chạy mỗi khi khởi tạo một instance. Tại thời điểm này, data, event chưa được thiết lập.

* created hook được chạy khi data, event đã thiết lập thành công.
    Từ created  ta đã truy suất được data nên có thể sử dụng để  thao tác dữ liệu như call api... 
    
 Giai đoạn gắn kết DOM
* beforeMount hook sẽ chạy sau khi data, event được thiết lập và trước khi gắn kết vào DOM. Trong hook này chúng ta vẫn chưa – truy cập được phần tử trong DOM.

* mounted hook: giai đoạn này, mounted hook sẽ cho phép chúng ta có thể truy cập vào phẩn tử trong DOM. Tức là khi này, DOM đã được gắn kết.

Giai đoạn cập nhật DOM khi dữ liệu thay đổi:
* beforeUpdate hook : Sau khi đối tượng đã được gắn vào DOM, khi dữ liệu thay đổi, và trước khi render, patch lại và hiển thị ra cho người dùng.
* updated hook : Chạy ngay sau khi beforeUpdate . Sử dụng khi bạn cần truy cập DOM sau khi thay đổi thuộc tính. dữ liệu ở beforeUpdate và updated là như nhau
![](https://images.viblo.asia/f334e9ac-eed3-43df-998f-9340e5dbe4bd.gif)

Giai đoạn hủy instance:
* beforeDestroy hook: Là giai đoạn trước khi instance bị hủy. Đây là nơi để quản lý tài nguyên xóa tài nguyên, dọn dẹp các component.
* destroyed hook: Thời điểm này , mọi thành phần đã được hủy bỏ hết. Khi console.log() đối tượng này thì sẽ không nhận được thuộc tính hay dữ liệu gì.
## 3. Vue Component
### Tại sao chúng ta phải dùng component?

```Component``` là một trong những tính năng quan trọng nhất trong VueJS. Nó giúp chúng ta có thể kế thừa các phần tử HTML , có thể tái sử dụng code, giúp code chúng ta nhìn ngắn gọn, sạch sẽ hơn. Những đoạn code chúng ta có thể khai báo trong một component sẽ là HTML, CSS hay là cả Javascript, chúng được gói gọn vào trong một component rồi sau đó chúng ta có thể gọi tới component và tái sử dụng chúng.
### Cách khai báo component
### Đăng ký toàn cục

Khi bạn đăng ký component bằng phương thức Vue.component() thì các component này được đăng ký toàn cục (globally registered), nghĩa là chúng có thể được sử dụng ở bất kỳ đầu trong Vue instance gốc được tạo ra bằng câu lệnh new Vue.

```vue
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
    />
  </head>
  <body>
    <div class="container" id="app">
      <h1>ĐĂNG KÝ TOÀN CỤC</h1>
      <a-component></a-component>
    </div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <script>
      Vue.component("a-component", {
        components: {
        },
        template: `<h1>BÁ Hùng</h1>`,
      });
      var app = new Vue({
        el: "#app",
      });
    </script>
  </body>
</html>
    ```
    
### Đăng ký cục bộ
* Khởi tạo cùng trong file cần sử dụng đoạn code html được khai báo trong template:"..."
```vue 
var ComponentA = {
  /* ... */
  template: "<li>Đây là ComponentA</li>"
};
```

* Khởi tạo ra 1 file tách biệt
```vue
<template>
  <div class="header ">
    <div class="m-auto">
      <h3>File vue tách biệt</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompHeader"
};
</script>

<style scoped>
.header ul {
  display: flex;
  list-style: none;
}
.header ul li {
  padding: 8px 16px;
}
</style>
Header.vue
```
* Khai báo sử dụng
```vue
 <script>
import Header from "./Header.vue";
var ComponentA = {
  /* ... */
  template: "<li>Đây là ComponentA</li>"
};
export default {
  name: "HelloWorld",
  components: {
    Header,
    ComponentA
  },
  
};
</script>
  ```
* Chúng ta có thể dùng 1 hoặc tái sử dụng nhiều lần đều được
```vue
<template>
  <div class="hello">
    <ComponentA/>
    <ComponentA/>
    <ComponentA/>
    <hr>
    <Header />

  </div>
</template>
  ```
* Kết quả

![](https://images.viblo.asia/371f040e-8453-4ed3-a519-422ec384b693.PNG)
## 4. Sự khác nhau của computed và mehods
### So sánh
* Khác nhau về cách gọi methods có thêm cặp dấu () đằng sau còn computed thì không có. Ta có thể thấy rằng computed không nhận tham số đầu vào giống methods
* computed sẽ chỉ tính toán lại mỗi khi các biến phụ thuộc trong nó thay đổi, còn methods sẽ được tính toán bất kì khi nào nó được gọi, nên nếu biết tận dụng computed để tính toán các dữ liệu có sẵn thì sẽ cải thiện được performance app
* Điều tuyệt vời của computed là nó sẽ được cached nên giả sử bạn có 1 computed với hàng loạt tính toán, nhiều vòng lặp trong đó, mà nếu các các biến phụ thuộc không thay đổi thì khi sử dụng nó sẽ chỉ mất thời gian tính 1 lần, những lần sau kết quả sẽ được sử dụng lại từ lần trước, còn methods lại phải tính toán lại từ đầu
### Cách dùng
### computed
* Khi bạn cần xử lý dữ liệu có sẵn trong data
* Khi bạn cần gọi tới một chức năng nào đó nhiều hơn một lần
* Khi bạn cần tham chiếu đến một giá trị chính xác trong template
###  methods
* Được dùng khi xử lý một sự kiện nào đó trong DOM
* Khi bạn cần gọi tới các function trong computed hay watchers khi có điều gì xảy trong components
* Khi bạn cần truyền thêm tham số
## Watchers
Watchers theo dõi sự thay đổi của một đối tượng, khi đối tượng thay đổi watchers sẽ xử lý hàm tương ứng với sự thay đổi của đối tượng đó
Tác dụng: 
* Xử lý bất đồng bộ khi dữ liệu thay đổi,
* Hạn chế số lần thực hiện phương thức khi dữ liệu thay đổi.
* Các thiết lập giá trị ngay lập tức
Ví dụ về watch:
```vue
<template>
  <div class="hello">

    <button @click="countMethod++">Method Count {{countMethod}} times</button>

    <p>  {{ methodFunc() }}</p>

  </div>
</template>

<script>

export default {
  name: "HelloWorld",
  components: {
    Header,
    ComponentA
  },
  data() {
    return {
     
      countMethod:0,
    };
  },

  methods:{
    methodFunc(){
      // console.log('method count: '+this.countMethod);
    }
  },
  watch:{
    countMethod: function (newValue, oldValue){
      console.log('watch countMethod new value: ' + newValue);
      console.log('watch countMethod old value: ' + oldValue);
    }
  }
};
</script>
```

Đoạn code trên xử lý đến số lượt click và watch giám sát sự thay đổi của countMethod, khi có sự thay đổi sẽ mình thực hiện log giá trị cũ và mới.
Bạn cũng có thể thay đổi chức năng khi của hàm.<br>
Chúng ta kết thúc P1 ở đây!