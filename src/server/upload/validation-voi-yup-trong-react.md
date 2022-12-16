Ở bài viết này chúng ta sẽ tìm hiểu tại sao nên sử dụng `Yup` trong React, nó chính xác là gì và cách ứng dụng tối đa `Yup` trong code cùng ví dụ.
## Yup là gì?
`Yup` là một Javascript object schema validator. Cùng lấy một ví dụ đơn giản để hiểu hơn về `yup` nhé. Cùng hướng tới một form đăng nhập bao gồm các trường 'username' và 'password'. Trước khi gửi request chúng ta cần kiểm tra xem end-user đã nhập đầy đủ thông tin và đúng kiểu dữ liệu hay không. Vỳ vậy chúng ta cần xác định được đối tượng cảu chúng ta là gì, bắt buộc những gì và kiểu dữ liệu được phép gửi request lên là gì. Từ đó chúng ta có thể sử dụng `yup` để kiểm tra dữ liệu được nhập có phù hợp với đối tượng đó không.
## Tại sao chúng ta nên sử dụng Yup?
`Yup` làm cho ứng dụng của chúng ta trở nên dễ dàng hơn trong việc kiểm tra dữ liệu mà không cần can thiệp vào logic. Các ứng dụng web được xây dựng trên Frameworks Javascript có tính tương tác cao và có thể thay đổi trong chính nó; đó cũng chính là những gì người dùng mong đợi. Với điều này sẽ xuất hiện một lượng lớn dữ liệu được trao đổi liên tục dù đó là từ yêu cầu của API, form hay các đối tượng tùy chỉnh để xử lý trạng thái.

Vì vậy chúng ta cần đảm bảo rằng chúng ta đang cung cấp dữ liệu đúng để cho các component hoạt động, nếu không chúng ta sẽ gặp những sự cố không mong muốn, điều này là thật tệ. Yup có thể giúp chúng ta giải quyết vấn đề này.
## Vậy Yup hoạt động như thế nào?
Cách đơn giản nhất để sử dụng Yup là:
1. Định nghĩa một Object schema và validation nó
2. Tạo đối trượng validate sử dụng Yup tương ứng với Object schema và validation
3. Sử dụng function 'validate' của Yup (nếu object hợp lệ thì passed)

Cùng lấy một ví dụ để dễ hình dung nha mọi người :D. ở đây chúng ta lấy ví dụ về một object là "person":
```css
const person = {
  old: 25,
  name: "Dang Dinh Luan",
  phone: "0987654321",
  email: "luan-example@gmail.com"
};
```
Để một object person hợp lệ nó cần đáp ứng các điều kiện sau:
* "name", "phone", "email" phải có kiểu là string
* "phone" phải là một chuỗi toàn số
* "email" phải có định dạng đúng
* "old" phải có kiểu là number
* Ngoại trừ "email" tất cả phải là bắt buộc

## Validator Object
Bây giờ chúng ta sẽ dựa vào yup để tạo Validator object cho đối tượng person ở trên:
```javascript
const yup = require("yup");
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

const yupObject = yup.object().shape({
  old: yup.number().required(),
  name: yup.string().required(),
  phone: yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
  email: yup.string().email()
});
```
:D Đoạn mã này chắc mọi người đều hiểu nhỉ, nó tương đương với việc định nghĩa các proptypes trong react.
## Xác thực (Verify)
Tiếp theo chúng ta sẽ cùng nhau đi xác thực object person ở trên bằng cách sử dụng phương thức "validate" trong yup: 
```javascript
yupObject
  .validate(person)
  .then(function(value) {
    console.log(value); // returns person object
  })
  .catch(function(err) {
    console.log(err);
  });
```
Phương thức "validate" sẽ trả về object đó nếu nó hợp lệ và trả về đối tượng kèm theo lỗi của nó.
```cpp
const person = {
  old: 25,
  phone: "0987654321",
  email: "luan-example@gmail.com"
};
yupObject.validate(car); //ValidationError: name is a required field
```
Chúng ta cũng có thể khai báo một chuỗi các validations ví dụ như:
```markdown
phone: yup.string().required().matches(phoneRegExp, 'Phone number is not valid')
```
## Custom Validation
Trong nhiều trường hợp chúng ta cần custom lại validate sao cho phù hợp và vượt qua những gì mà thư viện yup hỗ trợ. Cùng nhìn vào ví dụ sau:
```javascript
let customValidation = yup.object().shape({
  beverage: yup
    .string()
    .test("is-tea", "${path} is not tea", value => value === "tea")
});
await customValidation.validate({ beverage: "tea" });
```
Trong ví dụ này chúng ta sẽ kiểm tra xem beverage có phải là "tea" hay không.

## Async Validation
Để thực hiện validation async hãy trả về "true" hoặc "false" hoặc một ValidationError
```javascript
let orderTea = yup.object().shape({
  bevrage: yup
    .string()
    .test(
      "is-tea",
      "${path} is not tea",
      async value => (await value) === "tea"
    )
});
await orderTea.validate({ bevrage: "coffee" }); // returns Error
```
## Kết luận
Trên đây chúng ta đã cùng nhau đi tìm hiểu cơ bản về yup. Các bạn có thể xem thêm nhiều ví dụ về yup tại [đây](https://runkit.com/pratik14/yup-examples).

Bài viết được dịch (một phần) và tham khảo từ:
- https://www.techzaion.com/validation-with-yup
- https://medium.com/@rossbulat/introduction-to-yup-object-validation-in-react-9863af93dc0e