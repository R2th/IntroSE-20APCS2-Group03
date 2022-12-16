Ở bài viết này chúng ta sẽ cùng nhau tìm hiểu về lifecycle hay vòng đời sống của một component trong React v16.3+. Tại sao lại là v16.3+? Vì ở phiên bản này React đã thay đổi Lifecycle, và một số methods không còn được dùng nữa.

Các bạn có thể tham khảo thêm ở [Component LifeCycle Changes](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes).

Ngoài ra, nếu các bạn muốn tìm hiểu thêm về Lifecycle cũ có thể tham khảo bài viết
[ReactJs component lifecycle methods — A deep dive](https://hackernoon.com/reactjs-component-lifecycle-methods-a-deep-dive-38275d9d13c0)

# 1. Lifecyle methods là gì? Tại sao nó lại quan trọng?
Mọi vật tồn tại trong vũ trụ này đều có một vòng đời riêng. Giống như quy luật đời người đều phải trải qua "Sinh lão bệnh tử" không ai có thể tránh khỏi. Hoặc đơn giản như vòng đời của một chiếc lá.

![](https://images.viblo.asia/8a5eb587-0c95-4313-82b5-ee21bc141c6c.png)


Tương tự vậy các component trong React được sinh ra, thay đổi khi có input vào và tại một thời điểm nào đó nó sẽ chết. Nếu chúng ta nắm rõ được vòng đời này thì chúng ta có thể kiểm soát component này và chắc chắn sẽ giúp chúng ta tạo ra kết quả tốt hơn, hiệu suất của component cao hơn.

Giả sử, bạn có một ứng dụng phát video tương tự như Youtube. Để đảm bảo ứng dụng của bạn trở nên tuyệt vời thì bạn nên xem xét việc sử dụng phần cứng như network, pin trong ứng dụng của bạn một cách hiệu quả nhất. Nếu user play video sau đó chuyển sang một ứng dụng khác thì ứng dụng của bạn cần stop video tại đúng thời điểm user chuyển ứng dụng sau đó cần play lại video khi user quay trở lại ứng dụng của bạn.

Như vậy Lifecycle methods có thể hiểu là các phương thức ảnh hưởng đến vòng đời của component.

# 2. Các giai đoạn trong Lifecycle
Lifecycle của một componet được chia làm 3 giai đoạn chính:
* **Mounting**
* **Updating**
* **Unmounting**

![](https://images.viblo.asia/5093ec18-9bcb-414e-865a-340f69f7629c.png)
## 2.1. Mounting
Trong React, mounting liên quan đến tải các components lên trên DOM. Giai đoạn này chứa các phương thức xử lý khi component được khởi tạo và khi load lên trên DOM.

### `constructor`
Đây là phương thức gọi trước tiên mỗi khi component được khởi tạo. Phương thức này chỉ gọi một lần duy nhất. Và được để set up giá trị initial của các biến và state.
Thông thường, ta sẽ khởi tạo state và bind các function ở đây.

### `getDerivedStateFromProps`
Mục đích của phương thức này là để đồng bộ state vs props mà nó phụ thuộc. Phương thức này sẽ được gọi sau `constructor` và sẽ trả về một object để update state của component. Nếu nó trả về `null` thì sẽ không có state nào thay đổi. Đây là phương thức thay thế cho `componentWillReceiveProps`.

**Note:** Vì phương thức `getDerivedStateFromProps` là static method nên nó sẽ không dùng được **this** . Tham số đầu vào của phương thức này là props và state hiện tại của component.

### `render`
Đây là phương thức bắt buộc phải có của React Component, vì phương thức này dùng để chuẩn bị element và để mount lên trên DOM của trình duyệt.

**Note:** Phương thức là pure function nên không gây ra bất kỳ side effect nào như thay đổi state.

### `componentDidMount`
Phương thức này sẽ được gọi ngay lập tức sau khi component đã được mount vào DOM của trình duyệt. Các tương tác trực tiếp với DOM của trình duyệt hoặc việc gọi API nên được thực hiện ở đây.

## 2.2. Updating
Giai đoạn này bắt đầu từ khi component bắt đầu "xuất hiện" trong trình duyệt và phát triển bằng cách nhận các cập nhật mới. Có hai cách để cập nhật một component. Đó là *cập nhật props từ component cha* và *update state hiện tại*.

Trong giai đoạn này, các phương thức dưới đây sẽ thực hiện một cách tuần tự.

### `getDerivedStateFromProps`
Tương tự như trong giai đoạn **Mounting**.

### `shouldComponentUpdate`
Phương thức này cho biết component có nên update hay không? Nếu giá trị trả về là true thì component sẽ được re-render và ngược lại. Mặc định phương thức này trả về giá trị là true.

**Note:** Đây là một trong những đặc điểm nhận dạng giữa Component thông thường và Pure Component.

### `render`
Tương tự như trong giai đoạn **Mounting**.

### `getSnapshotBeforeUpdate`
Phương thức này được gọi sau khi Component được tạo và trước khi nó được cập nhật từ DOM ảo vào DOM thật. Phương thức này có thể sử dụng được cả props và state hiện tại và trước đó. Giá trị của phương thức này trả về là tham số thứ 3 của phương thức `componentDidUpdate`.

Thường thì ta sử dụng phương thức này để đồng bộ giữa DOM hiện tại và DOM được update. Ví dụ, vị trí scroll, audio/video, text-selection,...

Tham khảo thêm anh Dan: [New commit phase lifecycles](https://github.com/reactjs/rfcs/blob/master/text/0033-new-commit-phase-lifecycles.md#basic-example).

### `componentDidUpdate`
Phương thức được thực thi khi component mới được cập nhật đã được cập nhật trong DOM. Các trigger gọi đến thư viện thứ ba được gọi ở `componentDidUpdate` sẽ được re-trigger tại đây. 

Các trường hợp hầu hết tương tự như sử dụng `componentDidUpdate` để giữ cho thư việc hoặc giao diện đồng bộ mỗi khi cập nhật.

## 2.3. Unmounting
Trong giai đoạn này, component sẽ được unmount khỏi DOM.

### `componentWillUnmount`
Đây là phương thức cuối cùng trong lifecycle. Nó được thực thi ngay trước khi component bị xóa khỏi DOM. Chúng ta cần clean up tất cả những gì liên quan đến component.

# 3. Tổng kết
Hiểu được lifecycle trong React giúp chúng ta đảm bảo sẽ tạo được những "best" component. Bên cạnh đó, giúp ta hiểu được cách một component và biết cách để nâng cao hiệu suất.

Hy vọng ở bài viết này mọi người có thể tìm được những thứ hay ho.

Cảm ơn các bạn. Hẹn gặp lại các bạn ở những bài viết tiếp theo.

## Tài liệu tham khảo
1. [ReactJs component lifecycle methods — A deep dive](https://medium.com/hackernoon/reactjs-component-lifecycle-methods-a-deep-dive-38275d9d13c0)
2. [Understanding React v16.4+ New Component Lifecycle Methods](https://blog.bitsrc.io/understanding-react-v16-4-new-component-lifecycle-methods-fa7b224efd7d)
3. [Dan Abramov: Beyond React 16 | JSConf Iceland](https://www.youtube.com/watch?v=nLF0n9SACd4)
4. [Component LifeCycle Changes](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes)
5. [New commit phase lifecycles](https://github.com/reactjs/rfcs/blob/master/text/0033-new-commit-phase-lifecycles.md#basic-example).