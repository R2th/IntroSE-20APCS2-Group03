![](https://images.viblo.asia/4065754b-1e11-4b35-a2cc-6b7d0598e599.jpg)






Nhiều trình duyệt hiện đại cũng xây dựng validation phía client bằng việc sử dụng các thuộc tính HTML chẳng hạn như required hay maxlength="10". Ví dụ như:

```html
<form>
   <input required>
   <button>Submit</button>
</form>
```


Với form trên khi bạn để trống input mà click button Submit, trình duyệt chẳng hạn Chrome sẽ ngăn chặn việc bạn submit và cảnh báo:
![](https://images.viblo.asia/8d09e72e-fbe9-4867-a3a5-1332838f5092.png)

Tuy nhiên không phải trình duyệt nào cũng hỗ trợ điều này và các trình duyệt khác nhau sẽ có các cách xử lý khác nhau.

Như vậy mặc dù validation đã được hỗ trợ, có rất nhiều khi chúng ta cần tùy chỉnh validation một các thủ công. Khi ấy giải pháp dựa trên Vue có thể sẽ rất thích hợp. Chúng ta cùng đi tới những ví dụ cơ bản xây dựng Validation cho Form với VueJS nhé :)

## **1. Ví dụ cơ bản**
* Chúng ta sẽ xây dựng một Form với 2 trường input:
    * Name 
    * Age
	
    Hai trường trên đều yêu cầu phải nhập (required). 
* Setup
    * Ta sử dụng một form với một ID (id="app") để sử dụng cho Vue component, không quên method="post" và action cho form.
    * Ngay bên dưới là thẻ  `<p>` để hiển thị danh sách lỗi Validate (chỉ khi có lỗi ) ở ngay đầu form. Và các lỗi Validate chỉ được phóng ra khi click vào button submit chứ không phải ngay khi các trường thay đổi.
    * Mỗi một trường input ta sử dụng v-model tương ứng để gắn với các giá trị của biến mà ta sử dụng ở trong Vue.
Để hiểu hơn về v-model của Vue, các bạn đọc qua tài liệu này nhé:
https://vuejs.org/v2/guide/forms.html

    ```html
    <form
     id="app"
     @submit="checkForm"
     action="https://vuejs.org/"
     method="post"
    >

     <p v-if="errors.length">
       <b>Please correct the following error(s):</b>
       <ul>
         <li v-for="error in errors">{{ error }}</li>
       </ul>
     </p>

     <p>
       <label for="name">Name</label>
       <input
         id="name"
         v-model="name"
         type="text"
         name="name"
       >
     </p>

     <p>
       <label for="age">Age</label>
       <input
         id="age"
         v-model="age"
         type="number"
         name="age"
         min="0">
     </p>

     <p>
       <input
         type="submit"
         value="Submit"
       >
     </p>

    </form>

    ```
    
* Xây dựng một Vue App

    Với HTML như trên, giờ ta tạo một file app.js và viết code logic cho form của chúng ta:





    ```js
    const app = new Vue({
     el: '#app',
     data: {
       errors: [],
       name: null,
       age: null
     },
     methods:{
       checkForm: function (e) {
         if (this.name && this.age) {
           return true;
         }

         this.errors = [];

         if (!this.name) {
           this.errors.push('Name required.');
         }
         if (!this.age) {
           this.errors.push('Age required.');
         }

         e.preventDefault();
       }
     }
    })

    ```


    * Gắn đối tượng Vue với phần tử HTML có id="app"
    * Trong object data, ta khai báo 
        - Một mảng errors để lưu danh sách các lỗi
        - Biến name: Giữ giá trị của input name, set giá trị bằng null
        - Biến age: Giữ giá trị của input age, set giá trị bằng null.
            
         Hai biến name và age có thể giữ giá trị của thẻ input tương ứng là do ta sử dụng v-model đã nói ở phía trên.
         
    * Trong object methods, ta viết hàm checkForm, kiểm tra name và age là bắt buộc.
Kiểm tra riêng từng trường và chỉ định lỗi cụ thể cho từng trường nếu chúng trống.
* Done với Javascript, quay lại HTML ta chỉ định sự kiện khi click button submit của form (gọi hàm checkForm)
    ```
    <form
     id="app"
     @submit="checkForm"
     ...

    ```

## 2. Custom Validatation với Validate Email 
* Với vị dụ thứ 2 này ta chuyển đổi trường text thành email, sử dụng thuộc tính novalidate="true" cho thẻ form để ngăn trình duyệt xác thực cho trường input với type="email"  (vì mình đang muốn custom validation mà)
    ```html
    <form
     id="app"
     @submit="checkForm"
     action="https://vuejs.org/"
     method="post"
     novalidate="true"
    >

     <p v-if="errors.length">
       <b>Please correct the following error(s):</b>
       <ul>
         <li v-for="error in errors">{{ error }}</li>
       </ul>
     </p>

     <p>
       <label for="name">Name</label>
       <input
         id="name"
         v-model="name"
         type="text"
         name="name"
       >
     </p>

     <p>
       <label for="email">Email</label>
       <input
         id="email"
         v-model="email"
         type="email"
         name="email"
       >
     </p>

     <p>
       <label for="movie">Favorite Movie</label>
       <select
         id="movie"
         v-model="movie"
         name="movie"
       >
         <option>Star Wars</option>
         <option>Vanilla Sky</option>
         <option>Atomic Blonde</option>
       </select>
     </p>

     <p>
       <input
         type="submit"
         value="Submit"
       >
     </p>

    </form>
    ```




* Update file app.js: viết thêm hàm validEmail vào object methods gọi nó khi check validate email trong hàm checkForm:
    ```js
    const app = new Vue({
     el: '#app',
     data: {
       errors: [],
       name: null,
       email: null,
       movie: null
     },
     methods: {
       checkForm: function (e) {
         this.errors = [];

         if (!this.name) {
           this.errors.push("Name required.");
         }
         if (!this.email) {
           this.errors.push('Email required.');
         } else if (!this.validEmail(this.email)) {
           this.errors.push('Valid email required.');
         }

         if (!this.errors.length) {
           return true;
         }

         e.preventDefault();
       },
       validEmail: function (email) {
         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    ```


    

## 3. Tổng kết



2 ví dụ trên là 2 ví dụ cơ bản về Form Validation, và được thiết lập một cách thủ công. Bạn có thể sử dụng một số thư viện lớn của Vue, mặc dù chúng có thể làm cho kích thước ứng dụng của bạn trở lên cồng kềnh tuy nhiên nó có ích lợi rất lớn. Một số ứng thư viện validation cho Vue như:
* Vuelidate
* VeeValidate

Mặc dù vậy, bài viết này mình chia sẻ cũng với mục đích cho các bạn một bài thực hành đơn giản dễ hiểu với Vue, hiểu hơn về v-model, về các viết và sử dụng các hàm trong methods…
Mong bài viết sẽ hữu ích đối với các bạn :D :D

Nguồn tham khảo:
* https://vuejs.org/v2/cookbook/form-validation.html#Another-Example-of-Custom-Validation
* https://travishorn.com/form-validation-with-vue-js-4d2e7ba8d2fc