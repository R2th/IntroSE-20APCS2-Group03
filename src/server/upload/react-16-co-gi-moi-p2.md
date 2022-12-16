> Link phần 1: https://viblo.asia/p/react-16-co-gi-moi-63vKj0o6l2R

React 16.6 đã ra mắt với một số tính năng thú vị đáng để thử qua, nó là một bản release nhỏ với nhiều tính năng tập trung chủ yếu vào tối ưu hiệu năng. Các tính năng chính đó bao gồm:
* React.memo()
* React.lazy()

Hãy cùng tìm hiểu xem các tính năng đó hoạt động như thế nào nhé.
# React.memo()
Bằng cách sử dụng `React.PureComponent` hoặc `ShouldComponentUpdate`, class component có thể ngăn không re-render khi mà props của chúng không thay đổi. Bây giờ bạn có thể áp dụng `React.memo()` cho function component để cho ra kết quả tương tự.

`React.memo()` là một dạng `High Order Component` (aka `HOC`) sẽ bọc function component lại để tạo ra một `memoized component`.
> Memoized component là gì ? Để có thể hiểu được nó, chúng ta phải nhìn vào khái niệm của memoization, nó là một dạng kỹ thuật tối ưu dùng để chứa kết quả trả về  của các hàm thực hiện tốn thời gian và sẽ trả về các kết quả đã được lưu trữ dưới dạng cache này trong trường hợp input đầu vào không thay đổi.

Sau đây là một ví dụ đơn giản của việc sử dụng `React.memo`:
```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* only rerenders if props change */
});
```
# React.lazy()
`Code-spliting` cho phép chúng ta `lazy-load` mọi thứ, có nghĩa là chúng ta chỉ import những gì cần thiết khi mà chúng được sử dụng bởi thế ứng dụng của chúng ta sẽ có tốc độ và phản hồi tốt hơn. 

`React.lazy()` cho phép chúng ta làm những điều trên, nó sẽ nhận vào một function gọi đến hàm `import()`. Một Promise sẽ được trả về với component mà chúng ta đã import.

Không dùng `React.lazy()`:
```javascript
import OtherComponent from './OtherComponent';

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```
Dùng `React.lazy()`
```javascript
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```
Như bạn để ý, tất cả những gì chúng ta cần làm chỉ là update lại phần import! Cực kỳ dễ thực hiện và hiệu quả mang lại thì y hệt [react-loadable](https://github.com/jamiebuilds/react-loadable)