*Chuyện là mình có một anh bạn đang làm `Mark-up`. Dạo gần đây, anh ấy có hướng mở rộng `Tech Stack` và có tìm hiểu về `ReactJS`. Trong một lần trao đổi, anh ấy bảo mình:*

```js
- Cái setState() trong React kì cục quá. Nhiều lúc cứ bị "chậm một nhịp" ấy =)))
```

*Sau đó gửi mình 1 `demo` và đúng là như vậy thật. Con đường chinh phục `React` của người anh có vẻ không dễ dàng lắm... Nói như bây giờ thì:*
```js
Trứng rán cần mỡ, bắp cần bơ,
Yêu React chẳng cần cớ, cần hiểu setState() cơ 🙂))
```

*Trong bài viết này chúng ta hãy cùng người anh tìm hiểu `setState()` nhé !*
## Đối tượng
Bài viết chủ yếu hướng tới các bạn mới tiếp cận, đã và đang làm `ReactJS` nhưng còn băn khoăn về cơ chế hoạt động của `setState()` cũng như muốn có cái nhìn rõ nét hơn về `React API` này ^^

*Nhấp một ngụm `espresso` và bắt đầu với `state` trong `ReactJS` trước nào !*

![](https://images.viblo.asia/ccbfb04b-e806-42de-9448-27daf5692551.gif)
## State
### Tại sao cần có State?
`ReactJS` cho phép chúng ta chia `UI` thành các `component` độc lập để tiện xử lý `logic` và dễ dàng tái sử dụng. Trong `concept` của `ReactJS`:
> `All React Components` must act like `pure functions` with respect to their `props`.

<br/>

Điều này có nghĩa là, `React component` sẽ không cố thay đổi `props` nhận được và sẽ luôn trả về cùng một kết quả với cùng một đầu vào.

Song, ứng dụng của chúng ta luôn cần phản hồi tương ứng với các tương tác như `user actions`, `network responses` cũng như xử lý một số `logic`, tính toán dữ liệu thay đổi. Lúc này thì `state` chính là giải pháp ^^

> `State` contains `private information` for interactivity, data-handling over time `within the component`.

### Khởi tạo
Thông thường, `state` sẽ có dạng một `POJO` *(`Plain Old Javascript Object`)*.
Trong  `Class Component`, `state` được *recommend* khai báo trong `constructor()`:
```js
constructor() {
    this.state = {
        votes: 0,
        views: 98
    }
}
```
Sau khi khởi tạo và xử lý tính toán với các `state` này, `ReactJS` cho phép chúng ta cập nhật lại `state` thông qua `setState() API`.

## `setState()` API
### Cú pháp
```js
this.setState(object);            // Type (1)            
this.setState(a_function);        // Type (2) 
this.setState(object, callback);  // Type (3) 
```
### Cơ chế hoạt động
Theo trang chủ, **khi `setState()` được gọi, `ReactJS` sẽ `merge` `object` được truyền qua hàm với `state` hiện tại**. Sau đó, hàm `render()` của `component` sẽ chạy lại, `UI` trên `browser` được cập nhật tương ứng với `state` mới .

<br/>

##### `Merge` ở đây có nghĩa là gì?

Giả sử mình cập nhật `votes` trong `state` được khởi tạo phía trên: 
```js
this.setState({ votes: 93 });
```

Sau câu lệnh này, `ReactJS` sẽ giữ nguyên `views`, chỉ thay đổi giá trị của `votes` thôi.

> The `merging` is **`shallow`**

<br/>

##### Tại sao không thay đổi trực tiếp `state`?
```js
this.state = object;
```
Khi muốn thay đổi `state`, chúng ta KHÔNG trực tiếp thay đổi qua `this.state` *(mà nên thông qua `this.setState()`)* bởi vì điều này sẽ không làm cho `component` `re-render` và thường dẫn đến việc không nhất quán `state`.
## Các vấn đề thường gặp với `setState()`
### Async
Giả sử chúng ta có đoạn `code`:
```js
// State khởi tạo: { votes: 0 }
this.setState({ votes: 0910 });
console.log(this.state.votes); // 0
```

Dù chúng ta đã `log` `state` ra ngay sau `setState()`, thế nhưng giá trị được in ra vẫn là `state` cũ. Phải chăng lệnh `log` đã được chạy trước khi quá trình `state mutation` thực hiện xong?

Theo *Trang chủ của `ReactJS`*, **`setState()` là hàm bất đồng bộ, và dĩ nhiên là nó không thay đổi `state` xong ngay lúc đó mà sẽ tạo một `pending state transition`**. Có nghĩa là, `log` trước và để `setState()` vào [**`event loop`**](https://viblo.asia/p/cuoi-cung-thi-event-loop-la-gi-LzD5dX705jY) tiếp theo. Chính vì vậy, việc chúng ta truy cập vào `state` sau khi gọi `setState()` thì có khả năng sẽ được trả về giá trị `state hiện tại`.

Đó là lý do giá trị được `log` ra là `0` mà chẳng phải `1` - đúng là *`"chậm một nhịp"`* như anh bạn mình đã đề cập trong câu chuyện trên.

![](https://images.viblo.asia/ad9ce24a-fd26-4a7d-ba09-1f15c9b136f3.gif)

#### Giải pháp
`State` của chúng ta cần một thời gian để cập nhật thay đổi. Và để đảm bảo quá trình `state mutate` thật sự đã thực hiện xong, hãy truy cập giá trị `state` trong một `callback`:
```js
// State khởi tạo: { votes: 0 }
this.setState(
    { votes: 0910 },
    function () { console.log(this.state.votes)}; // 0910
);
// OR
this.setState(
    { votes: 0910 },
    () => console.log(this.state.votes) // 0910
);
```
Giải pháp này hữu ích trong trường hợp muốn thực hiện một số `functions` hoặc kiểm tra `state` đã được tính toán `logic` chính xác chưa sau khi được cập nhật *(`fully-updated state`)*.

<br/>

##### Bonus
Một cách khác để đảm bảo việc này là đặt nó trong `componentWillUpdate()` hoặc `componentDidUpdate()`. Song, khác với `callback` một chút, các `functions` này có thể không được chạy nếu như có sự ngăn chặn việc `component` `re-render` trong `shouldComponentUpdate()`.

Hoặc nếu thấy cách này cồng kềnh, bạn có thể thử với `async - await`:
```js
async ensureStateUpdate(){
    await this.setState({ votes: 0910 });
    console.log(this.state.votes);
}
```
*Hãy tự mình kiểm tra xem cách này khả thi không nhé =))*

![](https://images.viblo.asia/13c3496e-5360-49dd-a2a3-741d6bcd1135.gif)

#### `setState()` đồng bộ ? Tại sao không ?
Sau khi nhận được lời giải thích và giải pháp phía trên, anh bạn `Markup` của tôi thắc mắc tại sao `ReactJS` không để `setState()` là một hàm đồng bộ luôn, để cú pháp với `callback` vào làm gì cho dài dòng?

*Hmm*...

> Hàm `setState()` thay đổi `state` và `component` sẽ `re-render`. Đây là một `expensive operation` và điều này có thể khiến gây ra vấn đề `browser unresponsive` hay một số ảnh hưởng tới `performance` khác.

<br/>

Có lẽ bởi vì như vậy, `setState()` nên là một hàm bất đồng bộ để có thể tốt hơn cho trải nghiệm của người dùng 😽😽

<br/>

*Okayyy, chúng ta đi vào một vấn đề hay gặp với `setState()` nữa !*

### Multi-setState() in a batch
Xét một ví dụ, khi ta `click` vào  `button`, một `function` được `trigger` có nội dung như sau:
```js
// State khởi tạo: { votes: 0 }
this.setState({ votes: this.state.votes + 1});
this.setState({ votes: this.state.votes + 1});
this.setState({ votes: this.state.votes + 1});
```
Hàm này cập nhật 3 lần liên tiếp `state` với  `setState()`. Bây giờ bạn thử đoán xem **giá trị cuối cùng của `this.state.value`** là bao nhiêu ?

![](https://images.viblo.asia/ecf33b5e-87fb-4130-83fc-2bc55103b0bf.PNG)

Sẽ là `1`, hay `2`, nhưng chẳng phải là `3` như chúng ta mong đợi ! Lý do chính là:

> `ReactJS` sẽ nhóm các `batch` gọi `setState()` *(gộp các lần gọi `setState()` gần nhau)* thành một lần cập nhật.

<br/>

#### Giải pháp
Chúng ta truyền vào `setState()` một `function`:
```js
// State khởi tạo: { votes: 0 }
this.setState(state => ({ votes: state.votes + 1}));
this.setState(state => ({ votes: state.votes + 1}));
this.setState(state => ({ votes: state.votes + 1})); // 3
```

*Yeahhh, lần này thì `this.state.votes = 3` rồi nè!* <br/> [***Bạn có thể xem demo chi tiết  tại đây nhé ▷***](https://stackblitz.com/edit/haodev-demo-setstate)

Song, như đã nói ở trên thì `props` và `state` được cập nhật theo cơ chế bất đồng bộ nên hãy `tránh-tối-đa` việc tính toán các `state mới` dựa vào các giá trị `state cũ` hay `props` nhé. Trường hợp cần thiết thì **cú pháp `setState(a_funtion)` được *recommend*  sử dụng để tránh một số lỗi `logic` không đáng có.**

```js
this.setState((state, props) => ({
    votes: state.votes + props.increment
}))
```

### `setState()` in lifecycle methods

Lại nói về các giai đoạn trong `lifecycle` của `ReactJS component`:

- **Mounting**: `Component` bắt đầu được tạo ra và `lần-đầu-tiên-được-chèn-vào-DOM` *(lần render đầu tiên của `Component`)*
- **Updating**: Khi `props/state` thay đổi làm cho `component` `re-render`; giai đoạn này có được diễn ra hay không có thể kiểm soát qua các `lifecycle methods`.
- **Unmounting**: Ngay trước khi `Component` bị loại bỏ ra khỏi `DOM`.

<br/>

Khái quát là vậy, một câu hỏi đặt ra là **chúng ta có thể gọi `setState()` trong bất kì `lifecycle methods` nào mà chẳng xảy ra `side-effects` nào không ?** 

*Hãy cùng điểm qua nhé !*


| Lifecycle methods | `setState()` is OK? |
| -------- | -------- |
| constructor()     | *NO. Vì đây là hàm khởi tạo `state`.* |
| componentWillMount()     | *⇒ componentDidMount()*  |
| render()     | *NOT DIRECTLY. Vì nếu không thì sẽ tạo ra `infinite loop`.* |
| componentDidMount()     | *YES. Song, người dùng sẽ không nhìn thấy `state` ngay lập tức.* |
| componentWillReceiveProps()     | *YES.* |
| shouldComponentUpdate()     | *N/A.* |
| componentWillUpdate()     | *NO. Vì sẽ tạo ra `infinite loop`.* |
| componentDidUpdate()     | *YES. Song, cần được bọc trong điều kiện nào đó (chỉ chạy nếu thỏa mãn điều kiện); nếu không sẽ tạo ra `infinite loop`.* |
| componentWillUnmount()     | *NO.* |

<br/>

#### Notes:
##### `setState()` trong `componentDidMount()` được xem là một `anti-pattern` (?)
Bạn đã từng `setState()` trong `componentDidMount()` và nhận ra `state` trên màn hình được cập nhật `chậm một nhịp` chưa ?

Để giải thích điều này, chúng ta có thể dựa vào `lifecycle` của `ReactJS`. Khi `setState()` được gọi, nó sẽ kích hoạt thêm một lần `render()` nữa *(`render()` trong quá trình `Mouting` và `render()` trong quá trình `Updating`)*. Điều này có thể gây ra một số vấn đề về `performance`.

Song, việc này giúp chúng ta đảm bảo được một điều rằng `data` sẽ không được load trước khi quá trình khởi tạo xong, tránh các lỗi không đáng có, đặc biệt là đối với `Modals` hay các `element` cần được tính toán vị trí, `size`, ... của `node` trong `DOM` trước khi được `render` ra màn hình.

<br/>

##### Infinite loop

Một vòng lặp vô hạn *(`infinite loop`)* có thể được tạo ra trong một vài trường hợp chúng ta sử dụng `setState()` không cẩn thận.

Một ví dụ cụ thể như một lần vô tình đặt `setState()` **trực tiếp** trong `render()`. `setState()` sẽ kích hoạt việc `re-render`, rồi lại `setState()`, lại `re-render`, cứ như vậy... và một vòng lặp vô hạn được tạo ra 😹😹
```js
// ⇒ An infinite loop
render() {
    this.setState({ votes: 93 });
    return ( ... )
}
```

Để khắc phục điều này, chúng ta cần hiểu cơ chế hoạt động của `setState()` và `ReactJS lifecycle` để có thể nắm rõ được luồng chạy của ứng dụng ^^
 ## Kết
Như vậy là chúng ta đã cùng nhau điểm qua cơ chế hoạt động của `setState()` và những điều thú vị xung quanh nó rồi.

Hy vọng rằng bài viết này có thể giúp ích được các bạn đang tiếp cận với `ReactJS` cũng như người anh trong câu chuyện của mình, từ đó có thể hiểu về luồng của ứng dụng và kiểm soát được một số lỗi liên quan tốt hơn.

![](https://images.viblo.asia/c31b6da5-d6c3-454c-9505-2054eb56cf91.gif)

Cảm ơn các bạn đã đọc bài chia sẻ này. Tặng mình **`1 upvote`** để có thêm động lực cho những bài viết sắp tới nhé 😺😺

<br/>

*Chúc các bạn cuối tuần vui vẻ ! Tiện ghé qua [**nhà mình**](https://haodev.wordpress.com/) chơi một chút rồi về !*

*Happy coding !*

<br/>

***Reference**: Medium posts of [Bartosz](https://medium.com/@baphemot/understanding-reactjs-setstate-a4640451865b) & [Hootsuite](https://medium.com/hootsuite-engineering/everything-you-need-to-know-about-setstate-8233a7042677), [Stackoverflow](https://stackoverflow.com/questions/52168047/is-setstate-inside-componentdidmount-considered-an-anti-pattern), [Freecodecamp](https://www.freecodecamp.org/news/get-pro-with-react-setstate-in-10-minutes-d38251d1c781/), [My Blog](https://haodev.wordpress.com).*