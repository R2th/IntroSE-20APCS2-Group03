![](https://images.viblo.asia/3cc20c36-0e1f-42d0-b41c-d091dcea28ab.jpeg)
Lifecycle là một API không thể thiếu của React. Kể từ version 16, Lifecycle methods có những thay đổi đáng kể (một số methods hoàn toàn mới, một số được mark tag UNSAFE và có thể bị remove trong tương lai...). Chúng ta hãy cùng đi tìm hiểu những điều mới mẻ này.

Những method này sẽ được chạy theo 4 phần: Mounting, Updating, Unmounting và Errors là một chu kỳ vòng đời của **Component**. Tác giả bài viết [**demo**](https://blissful-ptolemy-8b66a6.netlify.com/) một ứng dụng load một masonry layout (dạng Pinterest) và các bạn có thể xem source code tại [đây](https://github.com/scottdomes/react-lifecycle-example).

### I. Mounting
1. Build constructor (or not)

Một **class-based Component** trong React giờ có thế không xây dựng với **constructor** (các boilerplate hiện tại đều đã setup [class-fields](https://github.com/tc39/proposal-class-fields) cho tác vụ này)

Chúng ta vẫn hoàn toàn có thể sử dụng props và nhìn gọn gàng hơn rất nhiều, đây là một cách được sử dụng rộng rãi:
```js
class MyComponent extends React.Component {
  state = {
    counter: props.initialCounterValue,
  }
}
```
Chú ý: Bạn vẫn cần constructor cho những tác vụ phức tạp hơn, ví dụ như dùng **createRef()**...

2. static **getDerivedStateFromProps**
Khi một **Component** đang được mount, **getDerivedStateFromProps** là method cuối cùng được call trước khi quá trình render diễn ra. Toàn bộ quá trình này diễn ra rất nhanh nhưng vẫn có một vài tác vụ có thể xảy ra tại đây. **getDerivedStateFromProps** handle việc đó.
```js
static getDerivedStateFromProps(props, state) {
  return { blocks: createBlocks(props.numberOfBlocks) };
}
```
**getDerivedStateFromProps** là một hàm *được thiết kế cụ thể cho việc setting initialState dựa trên initial props* (trong khi **constructor** đảm nhận nhiều vai trò hơn).

Nhìn vào prop **numberOfBlocks**, ta sẽ dùng props này để define một số lượng blocks nhất định. Khi `console.log(this.state)` ngay sau đó, ta nhận được:
```js
console.log(this.state);
// -> {blocks: Array(20)}
```

Chú ý:  
- **getDerivedStateFromProps** cũng được gọi trước khi mount và trước khi update **Component**
- *static* keyword giúp người dùng không phải trỏ đến Component thông qua *this* (nhưng như vậy chúng ta cũng không thể access đến ref được)

3. **componentDidMount**
Không có gì mới lạ và không thay đổi gì nhiều. **componentDidMount** sẽ được gọi khi chúng ta render **Component** lần đầu tiên. **componentDidMount** là nơi thích hợp nhất để gọi các AJAX call, ngoài ra chúng ta cũng có thể thực hiện một số tác vụ hay ho ở đây khi mà bóng dáng thằng Component còn 'chưa thấy đâu' ví dụ như:
- Add những event listener
- Tạo `<canvas>` element
- Khởi tạo một layout từ nhiều elements/data (như Pinterest hay cũng như app demo trên)

Đây là phần code để phục vụ mục đích trên:
```js
componentDidMount() {
    this.bricks = initializeGrid(this.grid.current);
    layoutInitialGrid(this.bricks)

    this.interval = setInterval(() => {
      this.addBlocks()
    }, 2000);
  }
```

### II. Updating
1. **getDerivedStateFromProps(props, state)**

Vẫn là method đã được đề cập phía trên. Khi cần update state dựa trên việc thay đổi props, chúng ta hoàn toàn có thể thực hiện thông qua **getDerivedStateFromProps**

```js
static getDerivedStateFromProps(props, state) {
  if (state.blocks.length > 0) {
    return {};
  }
  return { blocks: createBlocks(props.numberOfBlocks) }
}
```

2. **shouldComponentUpdate(nextProps, nextState)**

React sẽ render lại bất cứ *Component* nào khi có sự thay đổi về state, nhưng nếu bạn quan tâm về performance hay tập trung kiếm soát vấn đề này thì **shouldComponentUpdate** là phương thức cần sử dụng.

Ở ví dụ này nếu khi được update, next prop `numberOfBlocks` trả về cùng một giá trị thì việc render lại cơ số elements là rất lãng phí, ta sẽ quản lý việc này bằng cách sau:
```js
shouldComponentUpdate(nextProps, nextState) {
  // Only update if bricks change
  return nextState.blocks.length > this.state.blocks.length
}
```

3. **getSnapshotBeforeUpdate(prevProps, prevState)**

Đây là một method mới của **React 16**

Đúng như cái tên của method, **getSnapshotBeforeUpdate** sẽ nhìn vào trạng thái của Component một lần cuối giữa quá trình render và khi Component được update thành công vào DOM.

Ở demo app này, ta sẽ thực hiện spec như sau: *khi User đang ở bottom page (scrollY ở vị trí cuối cùng của page) thì khi có những block mới được thêm vào vẫn luôn giữ User ở đúng vị trí này (thông tin được thêm vào sẽ update lên phía trên)*

```js
getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.blocks.length < this.state.blocks.length) {
      const grid = this.grid.current
      const isAtBottomOfGrid =
        window.innerHeight + window.pageYOffset === grid.scrollHeight;
      return { isAtBottomOfGrid }
    }
    return null
  }
```
Kết quả trả về sẽ là một Object dạng `{ isAtBottomOfGrid: true }` hoặc trả về `null` nếu điều kiện không thỏa mãn. SỞ dĩ cần trả về null là để tham số này phục vụ cho method ở giai đoạn tiếp theo **componentDidUpdate**

4. **componentDidUpdate(prevProps, prevState, snapshot)**

**componentDidUpdate** là nơi ta sẽ xử lý những thay đổi được commit tới DOM qua 3 tham số: prevProps, prevState và value có được từ **getSnapshotBeforeUpdate**

```js
componentDidUpdate(prevProps, prevState, snapshot) {
  this.bricks.pack();
  if (snapshot.isAtBottomOfGrid) {
    window.scrollTo({
      top: this.grid.current.scrollHeight,
      behavior: 'smooth',
    });
  }
}
```

### III. Unmounting
**componentWillUnmount**

Đây là nơi chúng ta sẽ 'gột rửa' tất cả những phần còn ảnh hưởng của một Component trước khi nó rời xa DOM, ví dụ như:
- Cancel những API request
- Remove những Event listener
Hãy ghi nhớ thật đơn giản, một Component unmount nghĩa là nó sẽ hoàn toàn biến mất, đừng đề lại bất cứ gì liên quan đến phần còn lại.

Ở trường hợp ví dụ này, chúng ta cần clear interval nếu không sẽ ảnh hưởng đến những kì làm việc tiếp theo

```js
componentWillUnmount() {
  clearInterval(this.interval);
}
```

### IV. Errors
1. **getDerivedStateFromError(error)**
Method này không sử dụng với các side effects (thay vào đó là componentDidCatch). Khi chúng ta muôn show error xảy ra khi bất cứ descendant nào của Component xảy ra lỗi, cách tốt nhất là lưu error vào một state và trả về `true` trong trường hợp này:
```js
static getDerivedStateFromError(error) {
  return { hasError: true };
}
```
2. **componentDidCatch(error, info)**

**componentDidCatch** được trigger khi có error xảy ra trong bất cứ child component nào. Ở **componentDidCatch** có thể catch được side effects, ví dụ như log chúng ra:
```js
componentDidCatch(error, info) {
  sendErrorLog(error, info);
}
```

`error` là sẽ là message còn `info` sẽ giúp ta trace được vị trí (in div/Component/...). Chú ý các click handle sẽ không được catch ở **componentDidCatch** mà method này chỉ bắt được những lỗi trong đúng chu trình lifecycle của Component.

### V. Ref
Bài viết tham khảo [React 16 Lifecycle Methods: How and When to Use Them](https://blog.bitsrc.io/react-16-lifecycle-methods-how-and-when-to-use-them-f4ad31fb2282)