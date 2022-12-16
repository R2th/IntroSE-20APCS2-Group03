**Optional chaining** hay **Safe navigation**  là một operator trong lập trình hướng đổi tượng thường access một object và trả về **các giá trị pointer được nested** hoặc **undefined/null nếu không tồn tại**.

Chắc chắn trong quá trình làm việc với JS bạn đã không ít lần nhận được error variable `undefined/null` khi chain các properties và app chết luôn ngay tức khắc

```html
const user = this.props
const field = user.data.attributes.field
```

Bất cứ prop nào trong chuỗi chain phía trên bị null (ở đây ví dụ là `attributes`) thì lập tức có error **đỏ rực** sau:
```
Uncaught TypeError: Cannot read property 'field' of undefined 😭😭😭
```
Chúng ta mong muốn có prop `field` nested trong `attributes` và trong `data`, nhưng vì một yếu tố nào đó (tại thời điểm check) `attributes` đã không tồn tại.

Các cách tiếp cận thường thấy:
### 1.Logic

```html
const user = this.props
const field = user
  && user.data
  && user.data.attributes
  && user.data.attributes.field
```
Thực sự dài dòng và tốn carlo

Cách tiếp cận tiếp theo
### 2.Ternary Operators
Ternery Operators cũng có thể được áp dụng trong trường hợp này, nhưng cũng không gọn gàng chút nào

```html
const user = this.props
const field = user === undefined
  ? undefined
  : user.data === undefined
    ? undefined
    : user.data.attributes === undefined
      ? undefined
      : user.data.attributes.field
```
😭😭😭

### 3.Try-catch
```html
const user = this.props
const field
try {
  field = user.data.attributes.field
} catch (error) {
  field = null
}
```

Cách này trông có vẻ cũng khá ổn nhưng code bị mất tính liền mạch và scope bị thay đổi

### 4.Optional Chaining Operator
**Optional Chaining Operator** chỉ mới được proposal trong Javascript và phải setup **Babel alpha 7** để có thể dùng feature này

```js
npm install --save-dev babel-cli@7.0.0-alpha.19
npm install --save-dev babel-plugin-transform-optional-chaining@^7.0.0-alpha.13.1
```

Setting up **.babelrc**
```js
{
  "plugins": ["transform-optional-chaining"]
}
```

Khi đó việc chain một object sẽ hết sức dễ dàng, clean and clear:
```html
const user = this.props
const field = user?.data?.attributes?.field // 🙌 Horray!!!
```

Qua babel đoạn code trên sẽ được compile sang dạng Ternary Operators đã trình bày ở trên, nhưng nó hoàn toàn dễ hiểu và ngắn gọn

Cảm ơn các bạn đã theo dõi!!!