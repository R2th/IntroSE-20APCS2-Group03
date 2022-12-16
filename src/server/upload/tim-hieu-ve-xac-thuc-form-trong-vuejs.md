Xác thực form là việc buộc người dùng khi nhập thông tin trên form cần tuân theo quy tắc mà nhà nhát triển đặt ra.
#### Getting Started With VeeValidate
Đầu tiên chúng ta cần có Vue và thư viện VeeValidate.
Chúng ta sẽ bản có sẵn CDN cho Vue.js: https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.js & https://cdn.jsdelivr.net/npm/vee-validate@latest/dist/vee-validate.js
### Create 1 file register.html & add content:
```
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Vue Template Form Validation</title>
</head>
<body>
</body>
<!-- include the Vue.js library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.js"></script>
<!-- include the VeeValidate library -->
<script src="https://cdn.jsdelivr.net/npm/vee-validate@latest/dist/vee-validate.js"></script>
<script>
// Notify vue about the VeeValidate plugin
 Vue.use(VeeValidate);
</script>
```
Đoạn code trên cho thấy việc sử dụng VeeValidate trong ứng dụng Vuejs là tương đối dễ dàng. 
### VeeValidate Rules
Quy tắc VeeValidate là quy tắc đặt giới hạn hoặc điều kiện cho những gì có thể được nhập vào một hoặc nhiều trường.

 Quy tắc xác thực được kiểm tra khi bạn cập nhật một bản ghi có chứa các trường yêu cầu xác thực. 
 
Nếu quy tắc bị vi phạm, một lỗi có thể xảy ra.  Để sử dụng quy tắc bạn chỉ cần áp dụng chỉ thị v-validate trên đầu vào của bạn và truyền một giá trị chuỗi là danh sách các xác nhận được phân tách bằng một dấu "|". Ví dụ: chúng tôi sẽ sử dụng các quy tắc `required` &` email`:

```
<input v-validate="'required|email'" type="text" name="email">
```
Ngoài ra bạn còn có thể validate 1 cách link hoạt hoạt hơn
```
<input v-validate="{ required: true, email: true, regex: /[0-9]+/ }" type="text" name="email">

```
 Bây giờ mỗi khi đầu vào thay đổi, trinh xác nhận sẽ chạy danh sách xác nhận từ trái qua phải. Để xác thực lỗi dữ liệu đầu vào.
 Bạn có thể xem thêm các quy tắc khác của VeeValidate tại đây:
 http://vee-validate.logaretm.com/rules.html#available-rules
 ### VeeValidate Errors
 Theo mặc định VeeValidate cung cấp cho chúng ta một biến lỗi được đưa vào phần dữ liệu của thành phần Vue bởi plugin. Khi xác thực mẫu không thành công, VeeValidate biến lỗi này với một mảng chứa các đối tượng xác thực không thành công, 
  có thể được truy cập theo cách sau:
  ```
  //check if an input has errors
  this.errors.has(Inputname)
  //return the first error of an input
  this.errors.first(Inputname)
  ``` 
 Tuy nhiên, để sử dụng phương pháp này, thuộc tính tên phải được chỉ định.  
 Bạn có thể sử dụng data-vv-name  cho một số lý do, bạn có thể sử dụng thuộc tính name trong mẫu của mình.
 ### VeeValidate Custom Validation
 Trong khi VeeValidate cung c ấpkhoảng 30 quy tắc, các quy tắc này có thể không công bằng với hình thức của bạn như dự định. Điều gì xảy ra nếu chúng ta cần xác thực tùy chỉnh mà VeeValidate không đi kèm? Ví dụ: nếu chúng ta muốn xác thực rằng tên người dùng là duy nhất trong cơ sở dữ liệu của chúng ta thì sao? VeeValidate cho phép bạn viết các quy tắc và thông báo xác thực tùy chỉnh.
  Hãy xem mã dưới đây :
  ```
  //declare an array of some usernames user must not input
   var username = [
      'admin',
      'password',
      'administartor'
  ]
  //create new rule
  const newrule = {
  // will be added to default English messages.
    getMessage(field, params, data) {
        return (data && data.message) || 'Something went wrong';
    },
    // Returns a Boolean or a Promise.
    validate(value) {
      return new Promise(resolve => {
        resolve({
          valid: username.includes(value.toLowerCase()) ? false : !! value,
          data: { message: `${value} has already been taken` }
        });
      });
    }
  };
  ```
Những lưu ý quan trọng cần lưu ý là: Phương thức `getMessage` trong đối tượng được sử dụng để trả về một thông báo lỗi tùy chỉnh. Thông báocó thể được truyền trực tiếp hoặc chuyển qua một biến từ dữ liệu được gọi từ phương thức `validate`. Phương thức `validate` trong đối tượng trả về một boolean, một đối tượng . Nếu nó trả về một đối tượng, 
thuộc tính hợp lệ phải có giá trị boolean.
 Giá trị boolean này là những gì được kiểm tra để xem biểu mẫu có hợp lệ hay không. 
 Trong trường hợp của chúng ta đã kiểm tra xem giá trị có được đưa 
 vào danh sách tên người dùng mà chúng ta muốn người dùng chọn hay không.
Bây giờ chúng ta đã có 1 số quy tắc mới. VeeValidate sẽ chưa tự động biết về quy tắc này. Chúng ta cần tiến hành thêm quy tắc mới này:
```
 VeeValidate.Validator.extend('checkuser',newrule);
```
Trong ví dụ này, chúng tôi chỉ mở rộng trình xác nhận VeeValidate bằng trình xác nhận tùy chỉnh của riêng xác thực tên qua `checkuser`. Vì vậy, chúng ta có thể gọi Trình xác thực cho bất kỳ đầu vào nào theo cách này:
```
<input v-validate="'checkuser'" type="text" name="username">
```
#### Validating A Simple Registration Page
Chúng ta sẽ cùng làm 1 bản demo nhỏ. Quay trở lại tệp register.html được tạo ban đầu và thêm HTML sau:
```
  <body>
        <div class="container">
            <div class="row main">
                <div class="main-login main-center">
                <h5>Sign up once and watch any of our free demos.</h5>
                    <form id="signup-form" @submit.prevent="processForm">


                        <div class="form-group">
                            <label for="name" class="cols-sm-2 control-label">Your Name</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                  <input type="text" name="name" placeholder="Name" :class="{ 'form-control': true, 'is-danger': errors.has('name') }" v-model="name" v-validate="'required|alpha'">

                                </div>
                 <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email" class="cols-sm-2 control-label">Your Email</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                    <input type="email" :class="{ 'form-control': true, 'is-danger': errors.has('email') }" name="email" placeholder="my@email.com" v-model="email" v-validate="'required|email'">

                </div>
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="username" class="cols-sm-2 control-label">Username</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                                        <input type="text" :class="{ 'form-control': true, 'is-danger': errors.has('username') }" name="username" placeholder="Enter your username" v-model="username" v-validate="'required|checkuser'">
                                </div>
                 <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password" class="cols-sm-2 control-label">Password</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                    <input type="password" :class="{ 'form-control': true, 'is-danger': errors.has('password') }" name="password" placeholder="Enter a password" v-model="password" v-validate="'required|min:6'">
                                </div>
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>

                                <input v-validate="'required|confirmed:password'" name="password_confirmation" type="password" :class="{ 'form-control': true, 'is-danger': errors.has('password') }" placeholder="Password, Again" data-vv-as="password">
                </div>
                <span v-show="errors.has('password_confirmation')" class="help is-danger">{{ errors.first('password_confirmation') }}</span>
                            </div>
                        </div>

                        <div class="form-group ">
                            <button id="button" :disabled="errors.any()" class="btn btn-primary btn-lg btn-block login-button">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>
```
 Trong đoạn code trên chúng ta có 5 input. 
 Name: Sử dụng v-validate để chỉ thị. Và có những rule sau: `required|alpha` & hiển thị errors lỗi xác thực.`errors.has('name')` là true. và `v-show` để hiển hiển thị lỗi xác thực `errors.first('name')`.
 
   Tương tự như vậy cho các input phía dưới chúng ta có sử dụng thêm  v-validate nhưng rule sau: email, checkuser,min:6,confirmed:password ...  
   
Ngoài ra chúng ta còn cón 1 button đươc dùng để gửi biểu mẫu. Đầu tiên chúng ta khai báo biểu mẫu trong đánh dấu và chú ý: `@submit.prevent="processForm".`
Điều này ngăn biểu mẫu làm mới hoặc thực hiện bất kỳ hành động nào khác khi 
nhấp vào nút này thay vì biểu mẫu được xác định trong `@submit.prevent="processForm"`. 
 Trong các phương thức Vue . Ngoài ra, lưu ý rằng trong button, 
 chúng tôi có một điều kiện nhỏ cho thuộc tính bị vô hiệu hóa của button:
  `:disabled="errors.any()"`. Các `errors.any()` là một phương thức được VeeValidate trưng ra để xác minh xem tất cả các xác nhận đã được thông qua hay chưa. Tiếp theo chúng ta sẽ thêm css làm cho nó trông đẹp hơn.
 ```
 #playground-container {
     height: 500px;
     overflow: hidden !important;
     -webkit-overflow-scrolling: touch;
 }
 body, html{
      height: 100%;
      background-repeat: no-repeat;
      background:url(https://i.ytimg.com/vi/4kfXjatgeEU/maxresdefault.jpg);
      font-family: 'Oxygen', sans-serif;
         background-size: cover;
 }
 
 .main{
      margin:50px 15px;
 }
 
 h1.title { 
     font-size: 50px;
     font-family: 'Passion One', cursive; 
     font-weight: 400; 
 }
 
 hr{
     width: 10%;
     color: #fff;
 }
 
 .form-group{
     margin-bottom: 15px;
 }
 
 label{
     margin-bottom: 15px;
 }
 
 input,
 input::-webkit-input-placeholder {
     font-size: 11px;
     padding-top: 3px;
 }
 
 .main-login{
      background-color: #fff;
     /* shadows and rounded borders */
     -moz-border-radius: 2px;
     -webkit-border-radius: 2px;
     border-radius: 2px;
     -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
     -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
     box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
 
 }
 .form-control {
     height: auto!important;
 padding: 8px 12px !important;
 }
 .input-group {
     -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.21)!important;
     -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.21)!important;
     box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.21)!important;
 }
 #button {
     border: 1px solid #ccc;
     margin-top: 28px;
     padding: 6px 12px;
     color: #666;
     text-shadow: 0 1px #fff;
     cursor: pointer;
     -moz-border-radius: 3px 3px;
     -webkit-border-radius: 3px 3px;
     border-radius: 3px 3px;
     -moz-box-shadow: 0 1px #fff inset, 0 1px #ddd;
     -webkit-box-shadow: 0 1px #fff inset, 0 1px #ddd;
     box-shadow: 0 1px #fff inset, 0 1px #ddd;
     background: #f5f5f5;
     background: -moz-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
     background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f5f5f5), color-stop(100%, #eeeeee));
     background: -webkit-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
     background: -o-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
     background: -ms-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
     background: linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
     filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f5f5f5', endColorstr='#eeeeee', GradientType=0);
 }
 .main-center{
      margin-top: 30px;
      margin: 0 auto;
      max-width: 400px;
     padding: 10px 40px;
     background:rgb(123, 131, 134);
         color: #FFF;
     text-shadow: none;
     -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
 -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
 box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
 
 }
 span.input-group-addon i {
     color: #009edf;
     font-size: 17px;
 }
 
 .login-button{
     margin-top: 5px;
 }
 
 .login-register{
     font-size: 11px;
     text-align: center;
 }
 .is-danger{
   color: red;
   font-weight: 700;
 }
 .help {
     background: white;
     }
 ```
Trên đây là một số kiểu CSS để làm cho trang của chúng t trông tuyệt vời. Đừng quên thêm bootstrap css v àothẻ đầu của bạn:
```
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

```
### Vue Component
Bây giờ chúng ta hãy xem Thành phần Vue của chúng ta sẽ trông như thế nào. 
Thay thế phần tập lệnh nơi chúng ta có Vue.use (VeeValidate) bằng:
 ```
 // Notify vue about the VeeValidate plugin
 Vue.use(VeeValidate);
 //declare an array of some usernames user must not input
  var username = [
     'admin',
     'password',
     'administartor'
 ]
 //create new rule
 const newrule = {
 // will be added to default English messages.
   getMessage(field, params, data) {
       return (data && data.message) || 'Something went wrong';
   },
     // Returns a Boolean or a Promise.
   validate(value) {
     return new Promise(resolve => {
       resolve({
         valid: username.includes(value.toLowerCase()) ? false : !! value,
         data: { message: `${value} has already been taken` }
       });
     });
   }
 };
 // Tell the Validator about the new rule
   VeeValidate.Validator.extend('checkuser',newrule);
     const signupForm = new Vue({
         el: '#signup-form',
         data: {
             name: '',
             email: '',
             username: '',
             password: ''
         },
         methods: {
             processForm: function() {
         //attempt validating all
                 this.$validator.validateAll().then((result) => {
                     if (result) {
             //validation passed succesfully
 
                        alert('Form validated succesfully');
                     }
                 });
             }
         }
     });
 ```
 Khối mã khá giống nhau. Đầu tiên chúng ta thấy quy tắc tùy chỉnh mà chúng ta đã tạo trước đó, mở rộng nó sang trình. xác nhận mặc định và gắn phiên bản Vue của chúng ta. Hãy chuyển sang phần phương thức và xem những gì chúng ta có trong phương thức `proessForm` của chúng ta. Ở đây, chúng ta gọi hàm  `$validator.validate ALL()`,  đây là một phương thức được VeeValidate  trưng ra, nó cố gắng xác nhận tất cả các đầu vào và sau đó trả về một xác thực. Kiểm tra xem việc xác thực có thành công hay không và đưa ra cảnh báo.
 
Bạn có thể xem demo tại đây:

 https://codepen.io/samuelayo/pen/pdqvxB
 ### Conclusion
 Trong bài viết này, chúng ta đã xem làm thế nào để xác nhận hợp
  lệ đầu vào mẫu bằng cách sử dụng phương pháp hướng mẫu. 
  VeeValidate đã làm cho việc xác thực các đầu vào biểu mẫu rất
   đơn giản bằng cách hiển thị một chỉ thị v-validate cũng như
 thêm các mở rộng.
 
 Bài viết của mình đến đây là hết hẹn gặp lại các bạn ở các bài viết tiếp theo:)
 Tài liệu tham khảo:
 
 https://logaretm.github.io/vee-validate/
 
 https://vuejs.org/v2/guide/

https://scotch.io/tutorials/template-driven-form-validation-in-vuejs
 
   
   






****