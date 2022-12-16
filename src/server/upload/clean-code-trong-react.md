Khi bạn làm một project lớn thì việc viết "code sạch" là một điều rất quan trọng, Để những người vào sau có thể hiểu được và tiếp tục maintain dự án. Sau đây là một vài ví dụ clean code trong React
## Clean code là tự comment
* Boolean variables, hay functions trả vè true hoặc fale, nên bắt đầu với "is", "has" hoặc "should"
* Fuction nên ngắn nhất có thể. Nếu function quá dài thì lên tách ra làm các function con.
* Nên để tên function thể hiện nó làm gì chứ không phải nó làm như thế nào.
* Event function nên có tên của event đó nếu bạn có hơn 1 event function (vd: onClick)


![](https://images.viblo.asia/0f7b0151-812b-4f3a-a8c6-ae1654c50565.png)

### Luôn luôn khai báo `PropTypes` cho Component
![](https://images.viblo.asia/dc6cdca7-42a9-4890-8e0c-a37bdc05bb96.png)

## Clean code là DRY
Dry hay "Dont repeat yourself" là một nguyên tắc giúp bạn tránh khỏi trùng lặp code. Giúp code "sạch" hơn.
![](https://images.viblo.asia/e3d47e59-2bb0-4166-84c8-6c87c860ea13.png)
## Clean code chứa giá trị mặc định (Default value)
default value giúp bạn tránh khỏi tránh được khỏi các đoạn code kiểm tra sự tồn tại của biến. Giúp code trông ngắn gọn và dễ đọc hơn. Trong React bạn có thể khai báo default props code component bằng Component.defaultProps = {}

![](https://images.viblo.asia/7a0e9533-d70f-4ef2-9ef8-1b15aceb7d37.png)
## Clean code là khai báo một cách ngắn gọn
ES6 có hỗ trợ `Object destructuring` và `Array destructuring`. Giúp bạn khai báo các biên trông gọn hơn, đẹp hơn.

![](https://images.viblo.asia/e1e764e5-bb65-471d-8519-e0b157501a1c.png)
## Clean code là viết đúng thứ tự lifecycle của React
Khi viết các hàm lifecyle của React thì nên viết theo đúng thứ tự khi chạy của hàm đó. Ví dụ `componentDidMount` sẽ được đặt sau `componentWillMount`, `render` thì luôn được khai báo ở cuối cùng.

![](https://images.viblo.asia/1953da87-6a65-47bd-a626-1c4613b5b35a.png)

### Bài gốc
https://developers.caffeina.com/clean-code-saves-devs-the-caffeina-approach-to-reactjs-1b56ad15aa64