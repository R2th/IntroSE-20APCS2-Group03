## Tại sao phải verify JSON trước khi xử lý?
Trong quá trinh viết một API mọi người thường nhận request sau đó bay ngay vào xử lý sau đó nếu có exception thì trả về response lỗi. Điều này là không tốt! Một số lý do chúng ta nên verify request json trước khi xử lý các function chính:
- Verify nhanh và trả về kết quả khi json input không đúng với cấu trúc dữ liệu cần có.
- Hạn chế cá exeption, tiêu biểu nhất là null exeption. ví dụ, chúng ta sử dụng people.child.nephew mà người dùng truyền vào child là null chúng ra không thể đặt if trước tất cả các properties muốn lấy value để kiểm tra giá trị.
- Hạn chế những xử lý không cần thiết khi người dùng input giá trị sai. Thay vì việc xử lý các bước cho đến lúc gặp data bị sai rồi response exception thì kiểm tra một vòng trước để đảm bảo data input đúng trước khi xử lý.
- Đảm bảo sự toàn vẹn dữ liệu, hạn chế việc rollback dữ liệu ở database. Ví dụ như ở ví dụ trước khi nhận request chúng ta lưu People vào một bảng trong database, sau đó lưu tất cả child vào một bảng khác. Trong trường hợp chúng ta tiến hành lưu People mà không kiểm tra json input trước có thể data của child có thể sai dẫn đến việc phải rollback data ở database.
## Giới thiệu về JOI
```
The most powerful schema description language and data validator for JavaScript.
```

Nói chung joi là một thư viện giúp bạn có thể kiểm tra xem cấu trúc JSON có đúng với cấu trúc bạn mong muốn không? để cài đặt và sử dụng joi ở [đây](https://www.npmjs.com/package/joi)

   Các bước để sử dụng JOI
1.    thêm JOI vào project
```
npm install joi
```
3.    require/import joi
```
const Joi = require('joi');
```
5.    định nghĩa cấu trúc
```
const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');
```
với cấu trúc phía trên:
* `username`: kiểm tra cho thuộc tính **username**
    * `.string()`: phải là string.
    * `.alphanum()`: chỉ được chứa các ký tự chữ và số.
    * `.min(3)`: tối thiểu 3 ký tự.
    * `.max(30)`: tối đa 30 ký tự.
    * `.required()`: bắt buộc phải có.
 * `password`: kiểm tra cho thuộc tính **password**
     * `.string()`: phải là string.
     * `.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))`: phải thảo mãn biểu thức chính quy Regex (**^[a-zA-Z0-9]{3,30}$**), để tạo một regex tìm hiểu thêm ở [đây](https://regex101.com/).
 * `repeat_password`: giá trị giống với giá trị của `password`.
 * `access_token`: kiểm tra cho thuộc tính **access_token**, không bắt buộc.
     * ` [ Joi.string(),  Joi.number() ]` bao gồm số và chữ.
* `birth_year`: kiểm tra cho thuộc tính **birth_year**
    * `.integer()`: là sốn nguyên.
    * ` .min(1900)`: min là 1900.
    * ` .max(2013),`: max là 2013.
* `email`: kiểm tra cho thuộc tính **email**
    * `.string()`: phải là string.
    * `.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })`: 
        * là địa chỉ email
        *  có 2 phần tên miền  ví dụ `example.com`
        *  phải là tên miền `.com` hoặc `.net`

7.    kiểm tra json
```
schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }
```

Bài viết của mình chỉ là giới thiệu cơ bản về JOI, các bạn có thể xem thêm tài liệu nâng cao ở [đây](https://joi.dev/api/?v=17.3.0)

Tài liệu tham khảo: [https://joi.dev/api/?v=17.3.0](https://joi.dev/api/?v=17.3.0)