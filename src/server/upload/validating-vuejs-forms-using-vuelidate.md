### Introduction
Validate thông tin đầu vào trên các ứng dụng web là rất quan trọng. Vì nó cho phép ứng dựng web mang lại trải nghiệm tốt hơn cho người dùng. Tuy nhiên việc nhận thôn tin đầu vào của người dùng không quá đơn giản vì bạn phải.
. Đảm bảo bạn phải nhận thông tin đầu vàoác phù hợp với người dùng.
. Đảm bảo đầu vào có định dạng chính xác.
Và bạn cần chắc chắn rằng đầu vào người dùng cung cấp ở định dạng phù hợp được gọi là xác thực biểu mẫu.
Trong bài viết này chúng ta sẽ cùng tìm hiểu xác thực biểu mẫu bằng Vue.js bằng thư viện Vuelidate.
### Getting Started
Tạo mới project vuejs bằng cách run command sau:
```
vue create validate-vue-forms
```
Tiếp theo chuyển vào folder của project sau đó chúng ta sẽ cài đặt thư viện `vuelidate`.
```
yarn add vuelidate
```
Tiếp theo chúng ta add nó  đến Vue app:
```
// main.js
import Vuelidate from ‘vuelidate’
Vue.use(Vuelidate)
```

Hoặc bạn có thể nhập trực tiếp nó trong các `components` được yêu cầu:
```
import { validationMixin } from 'vuelidate'

export default {
  ...
  mixins: [validationMixin],
  validations: { ... }
  ...
}
```
Chúng ta sẽ nhập nó bằng cách sử dụng latter and importing vuelidate trực tiếp trong thành phần của `component`

### Validating Form Fields

Khi xác thực form nói chúng và trong vuejs nói riêng. Chúng ta cần xác định chính xác yêu cầu của chúng ta cần xác thực là gì 
, điều này sẽ hướng dẫn logic xác thực của chúng ta. Vì mục đính của hướng dẫn này. Chúng ta sẽ sử lý 1 biểu mẫu cơ bản gồm 3 trường sau:

. name

. email

. website

Chúng ta cần xác định trường nào sẽ là bắt buộc và trường nào sẽ không, loại dữ liệu dự kiến ​​và các điều kiện để có đầu vào “đúng” cho mỗi trường. Hãy làm việc với bộ quy tắc sau:

. name - là bắt buộc và phải lớn hơn 6 ký tự và ít hơn 20 ký tự.

. email -  là bắt buộc và phải là một email hợp lệ (ví dụ: mail@example.com)

. website - không bắt buộc nhưng nếu được nhập, nó phải là một URL hợp lệ (ví dụ: http://example.com)


### Validating the Name
Thay thế nộ dung trong App.vue.
```
<template>
  <div>

  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>

```
Thêm cái này vào thuộc tính dữ liệu của component:
```
data() {
  return {
    name: "",
    email: "",
    website: ""
  };
}

```

Import Vuelidate vào thành phần như sau:

```
import { validationMixin } from "vuelidate"
```
Trường `name`, chúng ta muốn đảm bảo rằng nó là bắt buộc và có độ dài ký tự tối thiểu và tối đa như đã xác định ở trên, vì vậy, hãy cũng nhập một số trình xác thực nội trang từ `vuelidate` để giúp đạt được điều này.

const {
  required,
  maxLength,
  minLength
} = require("vuelidate/lib/validators")

Thêm xác thực là mixin:
```
mixins: [validationMixin],
```

Với điều đó, chúng ta có thể viết xác thực cho trường tên như sau:
```
validations: {
  name: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(20)
  }
}
```
Mã này khá đơn giản. Giống như chúng tôi đã mô tả trước đó, chúng tôi muốn trường `name` là bắt buộc, có độ dài ký tự tối thiểu là 6 và độ dài ký tự tối đa là 20. Đó là tất cả những gì mã này làm được.

Tiếp theo chúng ta có thể xử dụng mã này để xác thực như sau:
```
<div class="form-group">
  <input type="text" placeholder="Name" v-model.trim="$v.name.$model">
  <div class="error" v-if="name.length && !$v.name.required">Name is required</div>
  <div
    class="error"
    v-if="!$v.name.minLength"
  >Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
  <div
    class="error"
    v-if="!$v.name.maxLength"
  >Name must have at most {{$v.name.$params.maxLength.max}} letters.</div>
</div>

```
Vuelidate xuất ra $v cái mà cí thể xử dụng ở bất cứ đâu trong component để kiểm tra xác thực dữ liệu hiện tại 
v-model.trim="$v.name.$model" liên kết đầu vào biểu mẫu với dữ liệu `name`.
```
<div class="error" v-if="name.length && !$v.name.required">Name is required</div>
```
Hiển thị lỗi để cho người dùng biết đây là trường bắt buộc.
```
<div
  class="error"
  v-if="!$v.name.minLength"
>Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
<div
  class="error"
  v-if="!$v.name.maxLength"
>Name must have at most {{$v.name.$params.maxLength.max}} letters.</div>
```
Đây là kết quả

![](https://images.viblo.asia/93525a41-3a1b-4b14-8e82-eae06648d654.png)

### Validating the Email
Cũng tương tự như validate `name`. CHúng ta có thể viết một biểu thức chính quy xác thực điều này hoặc chúng ta có thể tận dụng một thư viện đã kiểm tra tố như vuelidate `email` validator.
```
const {
  required,
  email,
  maxLength,
  minLength
} = require("vuelidate/lib/validators")
```
Chúng ta thêm email vào xác nhận:
```
validations: {
  ...
  email: {
    required,
    email
  },
  ...
}
```
Điều này làm cho trường `email` được xác thực đầu vào. 
```
<div class="form-group">
  <input type="email" placeholder="Email" v-model.trim="email">
  <div class="error" v-if="email.length && !$v.email.required">Email is required</div>
  <div class="error" v-if="!$v.email.email">Email must be valid</div>
</div>
```
Nó khá giống với trường `name` phía trên. Kiểm tra xem email có hợp lệ không.
(v-if="!$v.email.email) và hiển thị thông báo để người dùng biết có lỗi hay không.


### Validating the Website
Ở 2 trường hợp chúng ta đã validate bắt buộc nhập nhưng trường website không bắt buộc. Đồng thời url cần phải hợp lệ. 
chúng ta xẽ xử dụng xác thực url có sẵn. Vì vậy hãy cập nhật `url` xác thực như sau:
```
const {
  required,
  url,
  email,
  maxLength,
  minLength
} 
```
Sau đó sử dụng nó như sau:
```
validations: {
  ...
  website: {
    url
  }
}
```
Thêm đoạn mã sau:
```
<div class="form-group">
  <input type="text" placeholder="Website" v-model.trim="website">
  <p class="error" v-if="!$v.website.url">Website must be a valid URL</p>
</div>

```
Nó khá giống với email nhưng lần này chúng ta kiểm tra xem thực suwk địa chỉ website có hợp lệ hay không `(!$v.website.url)`.
### Programmatically Validate Forms
Đôi khi chúng ta không muốn xác thực form khi trong thời gian thực mà chỉ muốn xác th
ực khi người dùng cố gắng gửi biểu mẫu. Vuelidate cũng cho phép bạn làm điều này:
```
methods: {
  onSubmit() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      alert("Please complete all field correctly");
    }
  }
}
```
Bạn có thể gọi validate  form bằng `this.$v.$touch()` trong submit của bạn. Nếu bất kỳ trường nào không vượt qua quá trình xác thực
thì `this.$v.$invalid` được set = true sẽ nhắc người dùng cần kiểm tra lại các dữ liệu họ đã nhập.

### Custom Validation with Vuelidate
Cho đến giờ chúng ta mới chỉ sử dụng các biểu mẫu được xác thực cung cấp sẵn bơi vuelidate.
vuelidate cho phép chúng ta viết logic xác thực tùy chỉnh của riêng theo cách mà nó có thể dễ dàng sử dụng giống như xác thực tích hợp sẵn. Điều quan trọng là hàm xác nhận của bạn phải trả về `true/false`.

Ví dụ: giả sử chúng ta có một mảng và chúng ta muốn xác thực rằng mảng đó không trống. Một cách để làm điều đó sẽ là kiểm tra độ dài của mảng:

```
const validArray = item => item.length > 0
```
Sau đó, chúng tôi có thể sử dụng phương pháp này giống như xác thực tích hợp như vậy:
```
validations: {
  users: {
    validArray
  }
}
```
Miễn là xác thực tùy chỉnh của bạn trả về `true/false`, nó sẽ tích hợp độc đáo với vuelidate.
### Conclusion
Trong bài viết này, chúng ta đã biết cách sử dụng vuelidate, tùy chỉnh vuelidate  để xác thực liền mạch các biểu mẫu trong Vue. 

Mặc dù xác thực biểu mẫu phía client là tốt, nhưng nó không có nghĩa là chống dấu đầu dòng và nó phải luôn được xác thực phía sever.

Tham khỏa thêm tại: https://codesandbox.io/s/naughty-elbakyan-u3nxo

### References
https://vuelidate.js.org/#getting-started

https://vuejs.org/v2/guide/

https://codesandbox.io/s/naughty-elbakyan-u3nxo

https://codesource.io/validating-vue-js-forms-using-vuelidate/