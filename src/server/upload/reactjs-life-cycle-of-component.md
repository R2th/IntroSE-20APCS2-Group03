Tiếp tục với series **ReactJS**. Ngày hôm nay mình sẽ đi vào một phần rất quan trọng của ReactJS đấy là vòng đời của một Component - Component LifeCycle. 

Nếu các bạn đã từng tiếp xúc với VueJS hay đã đọc qua series VueJS của mình chắc cũng đã khá quen thuộc với Component LifeCycle của Vue. Và với ReactJS, vòng đời của nó cũng khá tương đồng như VueJS. Nếu đã từng học qua VueJS thì khi chuyển qua ReactJS sẽ nhanh hơn so với khi chưa từng học framework Javascript nào. Còn với ai chưa tiếp xúc với Vue thì cũng đừng lo lắng, chúng ta cùng bắt đầu thôi nhé.

![](https://images.viblo.asia/75d64185-331d-4a90-8ccd-8263b5759e4e.png)

# Các giai đoạn trong vòng đời React Component
Từ lúc khởi tạo Component đến lúc kết thúc ứng dụng React. Chúng ta sẽ có 4 giai đoạn chính :
- **Khởi tạo (initalization)**
- **Gắn kết DOM (mounting)**
- **Cập nhật (updating)**
- **Ngắt kết nối với DOM (unmounting)**

Okay, và bây giờ chúng ta sẽ cùng đi sâu vào từng giai đoạn một nhé (có thể ai đã tiếp xúc với Vue.js thì chắc hẳn sẽ thấy rằng các giai đoạn này rất quen thuộc đúng không :D )

# 1. Khởi tạo (initalization)
```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
// đoạn code này được lấy từ trang chủ của reactjs.org
```

Cùng nhìn đoạn code phía trên, với giai đoạn khới tạo sẽ được thể hiện qua phương thức **constructor().** Trong giai đoạn này hay cụ thể ở phương thức ```constructor()``` là nơi chúng ta bắt đầu khởi tạo và thiết lập những **state** hay đưa vào **props** ( hai khái niệm state, props cái mà đã được mình giới thiệu ở phần trước).  Cái này khá tương đồng với phương thức constructor trong lập trình hướng đối tượng của các ngôn ngữ khác, đều thực hiện khi khởi tạo một đối tượng. Ở đây chính là phương thức thực hiện khi khởi tạo hay sử dụng một Component. Với phương thức constructor() chúng ta nên sử dụng khi khởi tạo state cho Component hoặc bind method (bind method là gì thì các bạn vào đây tìm hiểu nhé https://reactjs.org/docs/faq-functions.html ).


Ngoài ra vì Class Component bắt buộc phải extends từ React.Component nên khi muốn sử dụng props chúng ta cần phải sử dụng super(props) để gọi tới hàm khởi tạo của class React.Component thì mới có thể dùng được.

# 2. Gắn kết DOM (mounting)

Trong giai đoạn này, chúng ta sẽ quan tâm đến 2 phương thức chính đấy là
- **componentWillMount()**
- **componentDidMount()**

Mình sẽ lấy ví dụ từ trang chủ của reactjs luôn nhé : 
```js
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```
Với 2 phương thức này tương ứng sẽ như sau: 
componentWillMount() sẽ được thực thi khi trước khi component Được gọi còn componentDidMount sẽ được thực thi khi Component đã được gắn kết vào DOM (tương tự như **beforeMount** và **mounted** hooks trong Vue) 

Ở phương thức componentDidMount, Component đã được gắn kết vào DOM vì vậy chúng ta có thể lấy dữ liệu từ API để đưa vào DOM hay thực hiện các tác vụ khác với DOM hay như đoạn code trên chúng ta có thể thực hiện ở phương thức componentDidMount việc setInterval để lặp lại theo chu kỳ 1 giây cho việc set lại **state**. 
# 3. Cập nhật (updating)
Tiếp theo chúng ta sẽ đến với giai đoạn cập nhật. Ở giai đoạn này chúng ta cũng sẽ có 2 phương thức thực thi chính đẩy là
- **shouldComponentUpdate()**
- **componentWillUpdate()**
- **componentDidUpdate()**

Mình sẽ đi vào 2 phương thức hay sử dụng đấy là **shouldComponentUpdate()** và **componentDidUpdate()**
Với shouldComponentUpdate() đây là phương thức thiết lập điều kiện để quyết định xem có thực hiện Update hay không. Mặc định phương thức này trả về true tức là sẽ render lại bất cứ lúc nào update. Tuy nhiên đôi lúc chúng ta cần cải thiện hiệu năng bằng cách thiết lập chỉ khi thành phần thay đổi chúng ta mới render lại component. Vậy đây chính là nơi hoàn hảo cho việc thiết lập điều kiện tiên quyết này.

- componentDidUpdate(): Đây là phương thức được gọi ngay sau khi được cập nhật component. Ở đây chúng ta nhận được giá trị trước khi cập nhật (prevProps và prevState). Với giá trị này chúng ta có thể sử dụng để so sánh với giá trị sau khi cập nhật dùng làm điều kiện và để thực hiện các hành động như fetch lại dữ liệu như ví dụ ở dưới.
```js 
componentDidUpdate(prevProps) {
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

Tuy nhiên hãy cẩn thận với nó vì nếu không đặt trong điều kiện trên khả năng chúng ta sẽ có một vòng lặp vô hạn không mong muốn xảy ra.

# 4. Ngắt kết nối với DOM (unmounting)
-  **componentWillUnmount()** : Đây là phương thức được gọi sau khi component ngắt kết nối với DOM. Ở đây là nơi chúng ta dọn dẹp những dữ liệu không cần thiết nữa như các bộ đếm thời gian, các dữ liệu không còn sử dụng... để giải phóng bộ nhớ.
Chúng ta cũng không nên thiết lập lại state ở đay vì khi đã ngắt kết nối với DOM thì chúng ta sẽ không thể render được gì. Vì vậy thiết lập lại state ở đây là vô nghĩa.



# 6. Kết luận:

Chắc nhiều bạn sẽ thắc mắc khi sử dụng theo kiểu Class Component như thế này chúng ta có các method để có thể custom thêm code ở mỗi giai đoạn trên nhưng function liệu có cách nào thay đế hay không. Với vấn đề này chúng ta sẽ cùng tìm hiểu ở các bài tiếp theo nhé. Bài viết hôm nay của mình khá ngắn tuy nhiên hi vọng mọi người có thể hiểu được cơ bản vòng đời của React Component. 

Cảm ơn mọi người đã theo dõi bài viết của mình. Chào tạm biệt mọi người và hẹn gặp lại ở những bài sau!