```js
<marquee bgcolor="#000">Chào buổi sáng</marquee>
```
```js
React.createElement(
    /* type */ 'marquee',
    /* props */ { bgcolor: '#000' },
    /* children */ 'Hi'
)
```
Bạn thấy 2 đoạn code trên có liên quan tí nào không ?
Thực tế thì có đó, đoạn code đầu tiên sẽ được `babel` biên dịch ra giống như đoạn code thứ 2. Và `function` trên sẽ trả về cho chúng ta một `object`, và nó được gọi là `React element`, nó cho biết tiếp theo `React` sẽ cần làm gì 
```js
{
    type: 'marquee',
    props: {
        bgcolor: '#000',
        children: 'Hi',
    },
    key: null,
    ref: null,
    $$typeof: Symbol.for('react.element'), // 🧐
}
```
Mọi thứ trông rất bình thường, nhưng có một thứ mà ta cần phải đặt dấu chấm hỏi ở đây, `$$typeof` là cái gì và tại sao lại có kiểu `Symbol` ?
Tò mò thì mình tìm hiểu về nó thôi, thực tế thì nếu chỉ sử dụng `React` thì nó cũng không ảnh hưởng tới việc coding của chúng ta.
Lúc còn là `newbie` mình thường sử dụng như thế này để chèn `HTML` bằng javascript.
```js
const messageEl = document.getElementById('message');
messageEl.innerHTML = '<p>' + message.text + '</p>';
```
Sau này khi đi thực tập, mình mới biết làm điều này nguy hiểm tới chừng nào.  Thử thay thế tạm đoạn code này vào `message.text`
```html
  // Thậm chí viblo còn không cho phép mình viết trực tiếp :))
  <img src nerror=" stealYourPassword() ">
```
Bumpppp, bạn có nguy cơ bị `XSS`. Một anh senior đã hướng dẫn mình sử dụng tránh bị `XSS` đó là:
- Sử dụng `document.createTextNode()`
- Sử dụng `textContent`
- Bỏ hết ký tự `<` `>` đi
Với `React` thì mọi thử đơn giản đã là mặc định.
```js
<div>
  {message.text}
</div>
```
 Hoặc có thể sử dụng cách như thế này.
```js
dangerouslySetInnerHTML={{ __html: message.text }}
```
Nhưng mà tới đây vẫn chưa đủ, vẫn còn rất nhiều cách để `XSS` bằng `HTML` và `DOM`
Ví dụ: `<a href={user.website}>` hay `<div {...userData}>` cũng nguy hiểm
Với cách viết này
```js
<div>
    {message.text}
</div>
```
vẫn chưa đủ an toàn một số trường hợp, một `React element` được khởi tạo bằng `React.createElement()` có dạng `object` như thế này 
```js
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'),
}
```
Nếu chúng ta lưu trữ nó ở trên server như một `JSON`, với `React 0.13` đây là điểm bị lợi dụng để `XSS`
```js
// JSON được lưu trên server
let expectedTextButGotJSON = {
  type: 'div',
  props: {
    dangerouslySetInnerHTML: {
      __html: '/* đưa đoạn XSS vào đây */'
    },
  },
  // ...
};
let message = { text: expectedTextButGotJSON };

// Nguy hiểm
<p>
  {message.text}
</p>
```
Phiên bản 0.14 React hỗ trợ xử lý con bug này bằng cách thêm đánh dấu  [`đây chính hiệu là React element bằng Symbol`](https://github.com/facebook/react/pull/4832)
```js
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'),
}
```
Tại vì, trong `JSON` chúng ta không thể chèn một `Symbol` (khi `stringyfy Symbol` sẽ trở thành `undefined`), thậm chí Back end có cho phép `return JSON` thay vì `text` thì cũng không thể đưa `Symbol.for('react.element')` vào trong `JSON` đó.

Điều tuyệt vời nữa, là `Symbol.for()` thì `scope` ở mức `global` giữa các môi trường như `iframe`, `worker`. Nghĩa là sử dụng  `component` qua lại giữa các môi trường khác nhau cũng không bị ảnh hưởng.

Nhưng có một điều, trình duyệt không hỗ trợ `Symbol` thì sao?
React sẽ vẫn thêm vào property` $$typeof`, nhưng với giá trị `0xeac7`, tại sao là `0xeac7`? Tại `React team` thấy nhìn nó giống chữ `"React"` =))

- [Tham khảo](https://overreacted.io/why-do-react-elements-have-typeof-property/)