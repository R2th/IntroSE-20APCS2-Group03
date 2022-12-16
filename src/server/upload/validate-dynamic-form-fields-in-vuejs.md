Trong mỗi website, việc validate cho các form là vô cùng quan trọng và cần thiết. Nhiều trình duyệt hiện đại cũng xây dựng validation phía client bằng việc sử dụng các thuộc tính HTML chẳng hạn như required ` <input required>`

Tuy nhiên không phải trình duyệt nào cũng hỗ trợ điều này và các trình duyệt khác nhau sẽ có các cách xử lý khác nhau.

Như vậy mặc dù validation đã được hỗ trợ, có rất nhiều khi chúng ta cần tùy chỉnh validation một các thủ công. Khi ấy giải pháp dựa trên Vue có thể sẽ rất thích hợp. Chúng ta cùng đi tới những ví dụ cơ bản xây dựng Validation cho Form với VueJS nhé.

Trong bài viết này mình sẽ hướng dẫn các bạn validate động cho form theo từng trường  sử dụng vee-validate trong Vue.js
# I. Cài đặt
* Có 2 cách để bạn bắt đầu với vee-validate:
    * Sử dụng npm : Chạy câu lệnh sau `php npm install vee-validate --save`
    * Sử dụng CDN : Gián trực tiếp link 
   ```php <!-- jsdelivr cdn -->
  <script src="https://cdn.jsdelivr.net/npm/vee-validate@latest/dist/vee-validate.js"></script>
  <!-- unpkg -->
  <script src="https://unpkg.com/vee-validate@latest"></script>
# II. Import vee-validate
* Import vee-validate vào dự án, bạn thêm đoạn code vào file app.js để có thể sử dụng trong toàn bộ dự án.
```php
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
Vue.use(VeeValidate);
```
# III. Cú pháp
## 3.1 Rules Parameters
Một số quy tắc có thể có các tham số, có thể được chỉ định theo nhiều cách để đảm bảo: 
* Là một danh sách được phân tách bằng dấu phẩy (phù hợp với định dạng chuỗi). 
* Một mảng chứa các giá trị params (Thích hợp cho định dạng đối tượng). 
* Một đối tượng 
```php
// Params as a string
const someRule = 'included:1,2,3,4';

// Params as an array.
const someRuleObj = { included: [1, 2, 3, 4] };

// Params as an object.
const someCplxObj = {
  email: {
    allow_utf8_local_part: true
  }
};
```
## 3.2 Rules in practice
Thẻ input sẽ có dạng :
```php
<input v-validate="'required|email'" type="email" name="email">

<input v-validate="{ required: true, email: true }" type="email" name="email">
```
# IV. Hiển thị thông báo
## 4.1 Hiển thị thông báo đơn
Sử dụng phương thức `error.first ('fieldName').`
```php
<input type="text" name="fieldName" v-validate="'required'">
<span>{{ errors.first('fieldName') }}</span>
```
## 4.2 Hiển thị nhiều thông báo lỗi
Một trường hợp sử dụng khác là bạn có thể muốn loại bỏ tất cả các lỗi cho một đầu vào, thường là cho phép người dùng sửa nhiều lỗi đầu vào cùng một lúc. 

Phương thức error.collect ('fieldName') thu thập tất cả các thông báo lỗi cho một trường cụ thể thành một mảng.
```php
<input type="text" name="fieldName" v-validate.continues="'required|alpha|min:5'">
<ul>
  <li v-for="error in errors.collect('fieldName')">{{ error }}</li>
</ul>
```
## 4.3 Hiển thị tất cả các lỗi
Đôi khi bạn cũng cần hiển thị tất cả lỗi, có 2 cách để làm điều đó:
### 4.3.1 Danh sách lỗi
Bạn có thể sử dụng `errors.all()`để thu thập tất cả các lỗi trường thành một mảng phẳng duy nhất.
```php
<input type="text" name="first" v-validate.continues="'required|alpha|min:5'">
<input type="text" name="second" v-validate.continues="'required|alpha|min:5'">
<ul>
  <li v-for="error in errors.all()">{{ error }}</li>
</ul>
```
### 4.3.2 Nhóm theo tên trường
Sử dụng `errors.collect()`  để nhóm các thông báo lỗi theo tên trường
```php
<input type="text" name="first" v-validate.continues="'required|alpha|min:5'">

<input type="text" name="second" v-validate.continues="'required|alpha|min:5'">

<ul>
  <li v-for="group in errors.collect()">
    <ul>
      <li v-for="error in group">{{ error }}</li>
    <ul>
  </li>
</ul>
```
# V. Tùy chỉnh thông báo lỗi
Mặc định veeValidate có những thông báo lỗi chung, bạn có thế custom lại sử dụng với nhiều ngôn ngữ khác nhau
## 5.1 Ghi đè theo validation
```php
import { Validator } from 'vee-validate';

const dictionary = {
    en: {
        messages:{
          alpha: () => 'Some English Message'
        }
      },
    vi: {
      messages:{
        alpha: () => 'Viết thông báo vào đây'
      }
    }
};
// Override and merge the dictionaries
Validator.localize(dictionary);

const validator = new Validator({ first_name: 'alpha' });

validator.localize('vi'); // Bây giờ validator sẽ tạo ra thông báo lỗi bằng tiếng việt.
```
## 5.2 Ghi đè theo tên trường
```php
import { Validator } from 'vee-validate';
const dictionary = {
  en: {
    attributes: {
      email: 'Email Address'
    }
  },
  vi: {
    attributes: {
      email: 'Viết thông báo vào đây'
    }
  }
};
Validator.localize(dictionary)
```
## 5.3 Tùy chỉnh theo trường cụ thể
```php
const dict = {
  custom: {
    email: {
      required: 'Viết thông báo vào đây'
    },
    name: {
      required: () => 'Viết thông báo vào đây'
    }
  }
};
Validator.localize('en', dict);
// or use the instance method
this.$validator.localize('en', dict);
```
# VI. Validate động cho các trường
Vd : Có một thẻ input như sau :
```php
<div class="form-group m-form__group row">
    <label class="col-form-label col-lg-3 col-sm-12" >Tên khóa học : </label>
    <input class="form-control col-lg-7 col-md-9 col-sm-12" v-model="course_category_name" v-validate="'required|min:3|max:50'" name="Tên khóa học">
    <span class="error">{{ errors.first('Tên khóa học') }}</span>
 </div>
```
Khi đó, sẽ tùy chỉnh thông báo như sau:
```php
const dictionary = {
    vi: {
        messages:{
            //Tùy chỉnh chung cho tất cá
            required: field => field +' không được để trống',
            min: field => field + ' không được ít hơn 3 ký tự',
        },
        custom: {
        // Tủy chỉnh theo từng trường
        'Tên khóa học' : {
                max: 'Tên khóa học không được vượt quá 50 ký tự'
            },
        }
    },

```
Sử dụng watch để cập nhật thay đổi ngay sau khi nhập. Trong file vue sẽ như sau:
```php
export default {
        name: "CreateCourse",
        data() {
            return {
                course_category_name: ''
            }
        },
        watch: {
            course_category_name(value) {
                store.commit('course_category/updateCategoryName', value);
            },
       }
  }
```
Kết quả sẽ như này:
![](https://images.viblo.asia/be6be47f-18e7-4746-8ace-0d0aaf031acf.gif)
# VII. Kết luận
Mong rằng bài viết có thẻ giúp ích cho các bạn.

Tham khảo : https://baianat.github.io/vee-validate/