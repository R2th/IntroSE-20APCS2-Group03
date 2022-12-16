Lifecycle methods có lẽ là một thứ bị nhầm lẫn khá nhiều với mọi người khi mới học React. Kể từ React v16.0, mọi thứ còn trở nên phức tạp hơn nữa với *async rendering*. Vậy nên từ giờ cho đến React v17.0, một vài lifecycle methods sẽ dần dần bị loại bỏ và vài method khác sẽ được thêm vào. React v16.3 mới được release hôm trước là bước đầu tiên của quá trình thay đổi này.

## What will change

Chi tiết về thay đổi này bạn có thể xem ở [đây](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html). 3 lifecycle method sẽ bị loại bỏ, gồm có:

- *componentWillMount*
- *componentWillReceiveProps*
- *componentWillUpdate*

React v16.3 mới được release hôm trước đã thêm vào 3 methods mới:

- *UNSAFE_componentWillMount*
- *UNSAFE_componentWillReceiveProps*
- *UNSAFE_componentWillUpdate*

Bạn có thể thấy là 3 lifecycle method ở trên giờ đã bị mark là unsafe. Kể từ phiên bản kế tiếp (v16.4?) cho đến trước v17.0, các lifecycle method kia sẽ bị mark là deprecated và sẽ bị xóa bỏ ở v17.0.

2 lifecycle method mới đã được thêm vào kể từ v16.3:

- static *getDerivedStateFromProps*
- *getSnapshotBeforeUpdate*

### getDerivedStateFromProps

Nhìn tên thì chắc bạn cũng đoán ra nó sẽ làm gì rồi. Method này sẽ thay thế cho *componentWillReceiveProps*. Khác với *componentWillReceiveProps*, *getDerivedStateFromProps* được gọi cả trong lần đầu tiên component được tạo ra thay vì chỉ mỗi khi props thay đổi. Vì nó phải được gọi trước cả khi component được tạo ra nên nó phải là một static method rồi. Bạn sẽ viết nó như thế này

```js
static getDerivedStateFromProps(nextProps, prevState) {
    // ...
    // return newState;
    // or
    // return null;
}
```

Để update state mới, bạn cần return một object. Nếu state không có gì thay đổi thì return `null`.

### getSnapshotBeforeUpdate

Method này cũng tương tự như cái trên

```js
getSnapshotBeforeUpdate(prevProps, prevState) {
    // ...
}
```

*getSnapshotBeforeUpdate* được gọi sau khi state/props thay đổi và trước khi `render` được gọi để update DOM. Vậy nghĩa là nó sẽ thay thế cho *componentWillUpdate*. Return value của nó sẽ được truyền cho *componentDidUpdate*. Nghĩa là bây giờ *componentDidUpdate* sẽ có thêm một parameter `snapshot` nữa, như thế này

```js
componentDidUpdate(prevProps, prevState, snapshot) {
    // ...
}
```

Bạn có thể thấy là có 3 method bị bỏ đi mà chỉ có 2 được thêm vào. Một cái thay thế cho *componentWillReceiveProps* còn một cái thay thế cho *componentWillUpdate*, vậy là còn *componentWillMount* không có method nào để thay thế. Ở đầu bài viết mình vừa nói là các method này bị bỏ đi một phần lớn là vì nó bị hiểu nhầm và sử dụng sai quá nhiều. Thế có nghĩa là số use case đúng cho *componentWillMount* thực sự rất là ít đó. Vậy nên nếu bạn đang dùng *componentWillMount* thì rất có thể bạn đang dùng nó sai cách rồi đấy.

Cách dùng 2 method mới thì các bạn xem [ở đây](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#examples) nhé. Bây giờ chúng ta hãy đi tìm hiểu nguyên nhân vì sao lại có thay đổi này. Đây là một breaking change rất lớn mà.

## Why

Lý do chính cho thay đổi này là vì tính năng *async rendering* mới từ *Fiber* trong React v16.0. Nếu bạn chưa biết về nó thì có thể [xem ở đây](https://www.youtube.com/watch?v=v6iR3Zk4oDY).

{@embed: https://www.youtube.com/watch?v=v6iR3Zk4oDY}

Nếu bạn không muốn xem video thì hãy xem ví dụ này:

```js
document.getElementById('searchBox').addEventListener('input', function (e) {
    asyncFetchSearchResult(e.target.value)
        .then(function (results) {
            this.setState({ results })
        })
})
```

Ví dụ trên là về một search box, giống như search box của Viblo, khi bạn gõ từ khóa tìm kiếm thì nó sẽ lấy kết quả và hiện ra ngay cho bạn thấy. Tuy nhiên vì mỗi lần bạn gõ thì nó lại phải lấy kết quả tìm kiếm với từ khóa mới nên kết quả đã lấy được với từ khóa cũ đành phải bỏ đi, nhưng request thì lần nào cũng phải gửi.

*Async rendering* cũng giống như thế. Toàn bộ quá trình render (từ *componentWillMount* hay *componentWillReceiveProps* cho đến *componentDidMount* hay *componentDidUpdate*) sẽ là asynchronous, nếu nó chạy quá lâu thì cũng sẽ không làm trình duyệt bị đơ vì nó không block main thread, cũng giống như async request vậy. Tuy nhiên nếu trong quá trình render mà có một update khác thì quá trình render trước đó sẽ bị bỏ đi và phải render lại từ đầu, tức là những gì bạn làm trong *componentWillMount*, *componentWillReceiveProps* hay *componentWillUpdate* sẽ được gọi thêm lần nữa.

Giờ chắc bạn đã hiểu vì sao chỉ có 3 method trên bị bỏ đi rồi. Chúng đều là các method được gọi *trước khi việc render được hoàn thành*. Vì thế nên với async rendering, chúng có thể sẽ bị gọi nhiều lần khi có update.

Vấn đề là có rất nhiều người đang dùng các method này chưa đúng cách. Các method này được sử dụng phổ biến nhất là để `setState`, gửi request để lấy data, `dispatch` action trong *Redux*, `addEventListener` .etc. Gửi request để lấy data thì trong hầu hết trường hợp không có hậu quả gì đáng sợ, chỉ là bạn sẽ gửi thêm vài cái request giống nhau. Tuy nhiên nếu bạn làm gì đó gây ra *side effect* thì có thể sẽ có chuyện không hay xảy ra. Ví dụ Redux action sẽ được `dispatch` nhiều lần thay vì một lần. Hay là các *Event Listener* được thêm vào ở *componentWillMount* và sẽ được xóa đi ở *componentWillUnmount*. Nhưng với *async rendering* thì các method kia có thể được gọi mà không có *componentWillUnmount* tương ứng để xóa bỏ các *Event Listener*. Và thế là bạn sẽ có rất nhiều *Event Listener* trùng nhau. Tóm lại là có nhiều thứ nguy hiểm có thể sẽ xảy ra.

2 method mới được thêm vào đều có điểm chung đó là khác hẳn các lifecycle method khác, chúng đều có return value và tên gọi cũng khác hẳn các method khác. Thay vì tên gọi hao hao nhau như kiểu `componentWillMount` và `componentDidMount`, cách dùng và kết quả cũng y chang nhau, thì bây giờ tên gọi của 2 method mới sẽ làm rõ hơn mục đích của chúng để mọi người khỏi nhầm lẫn và băn khoăn không biết dùng cái nào nữa. *getDerivedStateFromProps* là để truyền state mới cho *render* còn *getSnapshotBeforeUpdate* là để truyền một cái gì đó cho *componentDidUpdate*.

## What to do now

Như bạn biết thì *Fiber* và async rendering đã được phát triển từ cách đây cả 2 năm rồi, và ý định loại bỏ các method này [cũng đã có từ cách đây rất lâu](https://github.com/facebook/react/issues/7671). [RFC](https://github.com/reactjs/rfcs/blob/master/text/0006-static-lifecycle-methods.md) cho thay đổi này thì cũng mới được thêm vào [gần đây thôi](https://github.com/reactjs/rfcs/pull/6). Hiện tại thì dù bạn có làm gì trong các method trên thì cũng sẽ chẳng có gì đáng sợ xảy ra cả. Đó là vì mặc dù *Fiber* đã được bắt đầu sử dụng từ v16.0, tính năng *async rendering* [thật ra vẫn chưa được bật](https://github.com/reactjs/reactjs.org/issues/302#issuecomment-345445888). Từ giờ cho đến v17.0 thì các method trên vẫn sẽ còn đấy. Hướng dẫn migrate và cách dùng các lifecycle method sao cho đúng thì ở [đây](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#examples). Chúng ta cứ thong thả mà migrate thôi.

## TL;DR

Bạn băn khoăn không biết nên dùng `componentWillMount` hay `componentDidMount` để request data? Giờ thì không cần mất công Google xem dùng cái nào hay tại sao nữa. Vì chỉ còn dùng được `componentDidMount` thôi.