Lifecycle của các component trong React và các methods của nó là một phần thiết yếu để phát triển các ứng dụng trong React. Mặc dù ngày nay phương pháp này đang ngày càng bị thay thế bởi React Hooks, nhưng bạn nên xem xét kỹ hơn cách hoạt động của nó, nghiên cứu mối quan hệ giữa class components và functions, đồng thời hiểu sâu hơn về thao tác DOM với React. Hãy thực hành các phương pháp dựa trên class và xem xét mức độ phù hợp của chúng trong sự xuất hiện của useEffect.


Kể từ khi React ra đời, năm 2013 trở lại , các nhà phát triển React đã sử dụng các class component để sử dụng toàn bộ thư viện React (*extend từ React.Component*) nhằm thao túng DOM trong quá trình phát triển ứng dụng dựa trên React. Làm thế nào nó hoạt động?


## Các method React lidecycle:


Trước tiên, hãy xem cách nó được thực hiện theo cách truyền thống. Như bạn có thể biết, mỗi thành phần React có một vòng đời, bao gồm ba giai đoạn:

* **Mounting**, đây là giai đoạn đưa elements vào DOM
* **Updating**, đây là giai đoạn cập nhật components trong DOM
* **Unmounting**, đây là giai đoạn xóa components khỏi DOM


Mỗi giai đoạn có các method riêng, giúp thực hiện các thao tác điển hình trên các components dễ dàng hơn. Với các components dựa nên class-based, các nhà phát triển React trực tiếp mở rộng từ *React.Component* để truy cập các methods.

Ở đây không cần phải giải quyết tất cả các lifecycle methods của component React. Nguồn thông tin tốt nhất về các phương thức hiện được hỗ trợ cho các class components là tài liệu React chính thức. Thay vào đó, hãy xem xét kỹ hơn một vài ví dụ về các lifecycle methods. Tuy nhiên, trước khi thực hiện, hãy giải quyết chủ đề mà bạn có thể nghĩ đến ngay bây giờ.

## Class components vs functional components


Như bạn có thể biết, một cách thay thế để tận dụng các lifecycle methods là sử dụng hook. Với việc phát hành React 16.8 vào tháng 3 năm 2019, giờ đây có thể tạo các function components  **not** stateless và có thể sử dụng các  lifecycle methods.

Tất cả là nhờ vào các hook useState và useEffect - các chức năng đặc biệt kết hợp với các tính năng của React cho phép thiết lập trạng thái và sử dụng các events lifecycle trong các function components. Hiện tại, có thể mô phỏng hiệu suất của hầu hết mọi lifecycle method được hỗ trợ bằng cách áp dụng khéo léo hai hook này trong các pure function JavaScript của bạn.

Các hook functional component nâng cao có ưu việt hơn các class components không? Trước khi đạt được điều đó, chúng ta hãy xem xét các giai đoạn của vòng đời bằng cách sử dụng phương pháp truyền thống.


## Mouting trong React component lifecycle


Như chúng tôi đã đề cập, trong giai đoạn mouting của lifecycle, class components được chèn vào DOM. Một ví dụ điển hình là *componentDidMount ()* - một lifecycle methods chạy sau khi components được mouting và render cho DOM. Nó rất tuyệt vời khi bạn muốn thực hiện một interval function hoặc một yêu cầu asynchronous. Ví dụ:

```
componentDidMount() {
  fetch(url).then(res => {
    // Handle response in the way you want.
    // Most often with editing state values.
  })
}
```


## Updating trong React component lifecycle


Phương thức *componentDidUpdate ()* được gọi ngay sau khi cập nhật xảy ra. Cái này được gọi là luôn luôn ngoại trừ lần render đầu tiên. Bạn nên thực hiện các yêu cầu http tại đây.


Bạn có thể gọi *setState ()* trong phương thức này nhưng điều rất quan trọng là phải bọc nó trong một số điều kiện để tránh vòng lặp vô hạn (không quan trọng nếu trạng thái có cùng giá trị hay không). Nếu không có điều kiện, quá trình diễn ra như sau:

1. Bạn gọi setState () trong method *componentDidUpdate ()*.
2. Component được update
3. *componentDidUpdate ()* được gọi.
4. setState được gọi lại.


```
componentDidUpdate(prevProps, prevState) {
  // Always compare props or state
  if (this.props.counter !== prevProps.counter) {
    this.postCounter(this.props.counter);
  }
}
```


## Unmouting trong React component lifecycle


*componentWillUnmount ()* được gọi ngay trước khi components bị xóa khỏi DOM. Bạn nên sử dụng điều đó để loại bỏ event listeners, clear interval và hủy yêu cầu. Nói cách khác: tất cả những thứ cần dọn dẹp .


```
componentWillUnmount() {
	document.removeEventListener("click", this.someFunction);
}
```


Bạn không nên sử dụng *setState* trong method đó vì component sẽ không được render nữa.


## React components lifecycle với hooks


Bạn có thể tận dụng hook *useEffect* để đạt được kết quả tương tự như với các method *componentDidMount*, *componentDidUpdate* và *componentWillUnmount*. *useEffect* chấp nhận hai tham số. Cái đầu tiên là mottj *callback* chạy sau khi render, giống như trong *componentDidMount*. Tham số thứ hai là một dependency. Nếu bạn chỉ muốn chạy nó trên mount và dừng lại, hãy chuyển một mảng trống `[]`.


Để dọn dẹp, hãy sử dụng hàm return trong *useEffect*:


```
useEffect(
  () => {
    document.addEventListener(“click”, someFunc);
    
    return () => {
      document.removeEventListener(“click”, someFunc);
    };
  },
  []
);
```


Nếu bạn muốn nó hoạt động giống như *componentDidUpdate*, hãy đặt một số dependencies vào mảng hoặc không chuyển đối số thứ hai.


Bạn cũng có thể sử dụng *useState* thay vì *this.state* trong các class components. Thay vì:


```
this.state = {
	counter: 0,
	usersList: [],
}
```


Chúng ta có thể viết là:


```
const [counter, setCounter] = useState(0); 
const [usersList, setUsersList] = useState([]);
```


## Class components vs hooks, lựa chọn cái nào tốt hơn?


Đây sự lựa chọn chủ yếu là vấn đề sở thích cá nhân? Nếu bạn đã quen với lập trình functional, bạn chắc chắn sẽ thích sử dụng hook. Các nhà phát triển có thể sử dụng các functional components mà không cần phải chuyển đổi chúng thành các class components.


Mặc dù thực tế rằng hook thực sự phổ biến hiện nay, không có gì sai khi sử dụng các class components. Mọi thứ bạn có thể làm với hook cũng có thể được thực hiện với các class components. Các class components không còn được dùng nữa, vì vậy hãy sử dụng chúng nếu kiểu đó phù hợp với bạn hơn. Đó là tất cả về các cách tổ chức code khác nhau và chọn thứ gì đó trực quan hơn cho bạn và nhóm của bạn.


Bạn có thể tìm hiểu nhiều hơn và kỹ hơn tại [React.js](https://reactjs.org/)


Tài liệu tham khảo:
1. [(https://reactjs.org/docs/hooks-effect.html)](https://reactjs.org/docs/hooks-effect.html)
2. [https://reactjs.org/docs/state-and-lifecycle.html](https://reactjs.org/docs/state-and-lifecycle.html)