## Giới thiệu
VeeValidate - một thư viện validation cho Vue.js. Nó cung cấp rất nhiều quy tắc để validation dữ liệu và dễ dàng custom lại theo mong muốn. Chúng ta có thể validate HTML5 inputs cũng như custom Vue components. Để hiểu rõ hơn về cách cài đặt cũng như sử dụng VeeValidate hãy cùng mình tìm hiểu nhé! :)

## Cài đặt
Bạn có thể cài plugin này thông qua npm hoặc CND.

* npm
```
npm install vee-validate --save
```

* CND
```
 <!-- jsdelivr cdn -->
  <script src="https://cdn.jsdelivr.net/npm/vee-validate@latest/dist/vee-validate.js"></script>

  <!-- unpkg -->
  <script src="https://unpkg.com/vee-validate@latest"></script>
```

## Cách sử dụng
>Chú ý:
 Các ví dụ dưới đây mình sử dụng cú pháp ES2015, hãy đảm bảo cập nhật ES2015 nếu bạn chưa có.

```
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
```

Hoặc include đường dẫn script
```
<script src="path/to/vue.js"></script>
  <script src="path/to/vee-validate.js"></script>
  <script>
    Vue.use(VeeValidate); // good to go.
  </script>
```

Ví dụ đơn giản:
Để sử dụng ta cần thêm v-validate cùng các rules trong thẻ input như sau:
```
<input v-validate="'required|email'" name="email" type="text">
```
Và hiển thị message lỗi:

```
<span>{{ errors.first('email') }}</span>
```

## Hiển thị lỗi
1. Hiển thị một thông báo lỗi

Thông thường, bạn chỉ muốn hiển thị một lỗi tại một thời điểm cho các trường input của mình, bạn có thể thực hiện việc này bằng cách sử dụng phương thức error.first ('fieldName').
```
<input type="text" name="fieldName" v-validate="'required'">
<span>{{ errors.first('fieldName') }}</span>
```
Kết quả
![](https://images.viblo.asia/67fb6abc-6b1e-476f-8969-31da1ccd1d38.png)
2. Hiển thị nhiều thông báo lỗi

Thế khi bạn muốn hiển thị nhiều lỗi tại một thời điểm cho một trường inpput thì phương thức errors.collect('fieldName') sẽ giúp bạn điều đó. Tức là nó lấy tất cả các thông báo lỗi của trường đó thành một mảng và hiển thị ra.
```
<input class="form-control" name="name"
        v-validate.continues="'required|alpha|min:5'"
        type="text"
        id="name" placeholder="Enter your name!">
<ul class="list-errors">
    <li class="error" v-for="error in errors.collect('name')">{{ error }}</li>
</ul>
```
![](https://images.viblo.asia/e7812844-9d38-46dd-9de8-84cb4abf83fb.png)
3. Hiển thị tất cả thông báo lỗi

Trường hợp cuối cùng, nếu bạn cần hiển thị tất cả các lỗi của tất cả các trường input, trên đầu form, đặt biệt với form với nhiều trường input. Bạn có thể sử dụng các cách sau:
* Danh sách lỗi

Bạn có thể errors.all() để hiển thị tất cả lỗi dạng single flat array.
```
<input type="text" name="first" v-validate.continues="'required|alpha|min:5'">

<input type="text" name="second" v-validate.continues="'required|alpha|min:5'">

<ul>
  <li v-for="error in errors.all()">{{ error }}</li>
</ul>
```

Kết quả:
![](https://images.viblo.asia/e11833d9-f6da-4d89-a174-1a96bf05a876.png)
* Nhóm theo trường input

Sử dụng error.collect () mà không cung cấp tên trường, thay vào đó, phương thức này tạo một đối tượng mà các key là tên trường và các value là mảng các thông báo lỗi cho mỗi trường. Nói cách khác, nó nhóm các thông báo lỗi theo tên trường.
```
<input type="text" name="first" v-validate.continues="'required|alpha|min:5'">

<input type="text" name="second" v-validate.continues="'required|alpha|min:5'">

<ul>
  <li v-for="group in errors.collect()">
    <ul>
      <li v-for="error in group">{{ error }}</li>
    </ul>
  </li>
</ul>
```

Kết quả
![](https://images.viblo.asia/2bcfb079-3671-405f-a254-c4a59a8cd84c.png)
### Valiation Rules
Bạn có thể xem chi tiết các rules tại [đây](https://baianat.github.io/vee-validate/guide/rules.html)

## Custom rules
Bạn có thể dễ dàng thêm các rules VeeValidate, nhưng các rules phải tuân thủ contract hoặc cấu trúc nhất định.

### Tạo mới một rule
1. Function form
Đây là phương thức custom validator form cơ bản nhất. Function trả về Boolean hoặc một promise. Tuy nhiên, nó vẫn có một thông báo lỗi mặc định.

```
const validator = (value, args) => {
  // Return a Boolean or a Promise that resolves to a boolean.
};
```

2. Object form
```
const validator = {
  getMessage(field, args) {
    // will be added to default locale messages.
    // Returns a message.
  },
  validate(value, args) {
    // Returns a Boolean or a Promise that resolves to a boolean.
  }
};
```

Đối tượng validator này phải có phương thức validate  và có thể chứa phương thức getMessage để trả về message lỗi mà bạn mong muốn. Đối với nhiều ngôn ngữ, bạn nên sử dụng [localization API](https://baianat.github.io/vee-validate/guide/localization.html)

> Chú ý
> Như bạn có thể thấy, một validation rule phải implement một trong hai cách nói trên. Nếu không nó sẽ bắn ra một Exception với message lỗi những gì bạn đang thiếu. 

### Cách sử dụng custom rule
Sau khi tạo xong custom rule, bạn có thể thêm nó vào trong list các rule bằng cách extend(name, validator) trong validator instance.
Ví dụ, mình muốn check địa chỉ Ipv4, thì mình custom rule như sau:

```
import {Validator} from 'vee-validate'

    Validator.extend('reg_ipv4', {
        getMessage: field => 'The ' + field + ' is Invalid!',
        validate(value, obj){
            let condition = $('#condition').val()
            let ip = $('#ip').val()

            if (condition == 'equals') {
                let regIpv4 = /^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/;
                if (!regIpv4.test(ip)) {
                    return false
                }
            }

            return true
        }
    });
```

Và trong thẻ input, bạn gọi lại reg_ipv4:

```
<input class="form-control"
            id="ip" name="ip"
            v-validate.continues="'required|reg_ipv4'"
            type="text" placeholder="Enter ipv4 address!">
<ul class="list-errors">
        <li class="error" v-for="error in errors.collect('ip')">{{ error }}</li>
</ul>
```

Kết quả thu được:
![](https://images.viblo.asia/4a96e7d6-34fd-4b96-a6c5-74057ee4a236.png)

> Sử dụng extend trong class hoặc instance sẽ extend tất cả các validators với rule mới. Nếu extend rule đã tồn tại trước đó thì nó sẽ overwrite lại.

-----

Trên đây là phần giới thiệu cũng như hướng dẫn sử dụng VeeValidate được mình tham khảo tại [đây](https://baianat.github.io/vee-validate/guide/getting-started.html)  hy vọng bài viết sẽ giúp cho bạn đọc dễ dàng áp dụng vào project :)