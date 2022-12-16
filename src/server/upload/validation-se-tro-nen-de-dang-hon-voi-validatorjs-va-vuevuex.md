Bài viết được tham khảo từ bài viết gốc của tác giả Morishita ở [tech.actindi.net](https://tech.actindi.net/2019/02/22/162634) và từ lời giới thiệu của chính tác giả của [Validatorjs](https://github.com/skaterdav85/validatorjs).

# Giới thiệu validatorjs
[Validatorjs](https://github.com/skaterdav85/validatorjs) là 1 thư viện javascript xử lý validation. Theo tự nhận của tác giả của thư viện thì nó "lấy cảm hứng từ Validator của Laravel".

Thư viện được giới thiệu là có những ưu điểm sau:
- Không phụ thuộc vào bất cứ thư viện nào khác.
- Hoạt động trên cả browser lẫn Node.
- Các luật validation dễ đọc, dễ khai báo.
- Các thông báo lỗi hỗ trợ đa ngôn ngữ.
- Hỗ trợ AMD/Require.js và CommonJS/Browserify.
# Sử dụng validatorjs
Chúng ta sẽ tạo 1 đối tượng `person` để validate như sau:
- Thuộc tính `name` là bắt buộc.
- Khi `accept_mail_magazine` là giá trị `true`, thuộc tính `mail` là bắt buộc.
- Thuộc tính `mail` phải ở dạng địa chỉ E-mail.
```js
const Validator = require('validatorjs');

// đối tượng dùng để validate
const person = {
  name: 'hogehoge',
  accept_mail_magazine: true,
  email: 'hoge@example.com',
}

// luật
const rules = {
  name: 'required',
  email: [{required_if: ['accept_mail_magazine',true]}, 'email'],
}

const v = new Validator(person, rules); // tạo đối tượng để validate

// validation
check: v.check() // => true
v.errors // Hiện tất cả thông tin về lỗi có thể có
```
Cái này là căn bản nên tác giả quyết định lồng thêm 1 đối tượng nữa vào. Đó là `languages`. Mỗi 1 người có ít nhất 1 ngôn ngữ lập trình nên ta có `languages`:
- `ruby`
- `javascript`
- `python`
- `kotlin`
- `swift`
- `others`

Và chúng ta sẽ dựng code mới như sau:
```js
const Validator = require('validatorjs');

// Tuỳ chỉnh lại định nghĩa của validator
function someOneTrue(value, requirement, attribute) {
  return Object.values(value).some((val) => val);
}
// Đăng ký cho validator mới
Validator.register(
  'some_one_true', 
  someOneTrue, 
  ':attribute は少なくとも1つはチェックする必要があります'
);

const person = {
  name: 'hogehoge',
  accept_mail_magazine: true,
  email: 'hoge@example.com',
  languages: {
    ruby: false,
    javascript: false,
    python: false,
    kotlin: false,
    swift: false,
    others: false,
  }
}
const rules = {
  name: 'required',
  email: [{required_if: ['accept_mail_magazine',true]}, 'email'],
  languages: 'some_one_true', 
}
const v = new Validator(person, rules);

check: v.check() // => true
const errors = v.errors 
```
Thực hiện đoạn code trên sẽ báo kết quả sau:
```json
{"languages":["languages は少なくとも1つはチェックする必要があります"]}
```
Tiếp theo sẽ là Vue+Vuex
# Vue+Vuex
Câu hỏi đầu tiên là liệu dùng Vue+Vuex với validationjs có tiện không? Vậy chúng ta sẽ giới thiệu Vuex 1 chút.

Vuex quản lý các pattern và library cho ứng dụng Vue.js. Đối với các ứng dụng Vue + Vuex, nó có dữ liệu dưới dạng các đối tượng JS được quản lý bởi Vuex `store`. Nó chịu ảnh hưởng của Flux và Redux, và nó quản lý và cập nhật trạng thái dữ liệu với **luồng dữ liệu đơn hướng**.

![](https://images.viblo.asia/f0b09499-b392-4c27-a5e7-0bc0a6412af0.png)

   Ứng dụng Vue sử dụng `mutation` của Vuex để thay đổi `state`. Thay đổi của `state` sẽ nhanh chóng tác động lên component Vue đang sử dụng nó.

Ngoài ra, Vuex có một cơ chế tương ứng với thuộc tính computed (`computed`) của thành phần Vue được gọi là getter (`getters`). Trường hợp này thì kết quả của computed sẽ được trỏ đến getter thay vì trực tiếp vào `state`. Như vậy, khi `state` thay đổi thì `getter` sẽ thay đổi và kéo theo đó là component thay đổi.
# Kết hợp Vue+Vuex và validatorjs
Đoạn code sau đây là một ví dụ triển khai của store trong Vuex.

```js
import Vue from 'vue';
import Vuex from 'vuex';

// Giả sử bạn đã có sẵn validator 
// và quy tắc sử dụng nó trong module tiếp theo.
import {Validator, rules} from './validator';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    person: {
      name: '',
      accept_mail_magazine: true,
      email: 'hoge@example.com',
      languages: {
        ruby: false,
        javascript: false,
        python: false,
        kotlin: false,
        swift: false,
        others: false,
      }
    },
  },
  getters: {
    validationErrors: (state) => {
      const v = new Validator(state.person, rules);
      v.check();
      return v.errors;
    },
  }
});
```
Đây là module
```js
export default {
    store,
    computed: {
      validationErrors() {
        return this.$store.getters.validationErrors;
      },
    },
  // 〜 các dòng khác 〜
}
```

Theo cách này, `validationErrors` lưu trữ kết quả xác thực của đối tượng `person` được lưu trữ trong `store`.

Vì kết quả xác thực cũng được cập nhật mỗi khi đối tượng `person` được cập nhật, giao diện người dùng tham chiếu đến xác thực thuộc tính `validationErrors` phản ánh ngay lập tức kết quả.

Thuận tiện và dễ dàng phải không? Hãy thử một lần.