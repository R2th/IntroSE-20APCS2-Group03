> Khi bạn cần fetch dữ liệu cho Component của react-js, bạn sẽ lấy ở đâu?
> 
 
Đây là một câu hỏi mình thấy được đề cập rất nhiều.

Cùng nhìn lại Lifecycle component trong Reactjs để xem gán dữ liệu ở đâu thì hợp lý nhé
![](https://images.viblo.asia/713118f6-cf93-4a56-b888-53f1ec3d46eb.png)

Có 2 nơi lý tưởng để ta fetch dữ liệu cho components, đó là:

- componentWillMount
- componentDidMount

Trong những bản cập nhật mới của React đã có thêm React Hooks cho function Components, và ta có thể fetch dữ liệu với hàm `useEffectHook`, chúng ta có thể tìm hiểu thêm hàm này trên mạng. Tuy nhiên trong bài viết này mình chỉ đề cập tới việc Fetch dữ liệu với class Components thôi nhé :)

Quay lại vấn đề chính, đương nhiên hàm render không phải là một nơi tốt để ta xử lý dữ liệu, hàm render chỉ nên sử dụng để trả về JSX để hiển thị hoặc đôi khi là sử lý một vài dòng dữ liệu cho việc hiển thị mà thôi. Hãy nhìn vào 2 hàm `componentWillMount` và `componentDidMount`.

# **componentWillMount**

Nhìn qua thì đây có vẻ là nơi hợp lý để fetch data. Tuy nhiên có một vài vấn đề ở đây

- Đầu tiên, vấn đề lớn nhất là `componentWillMount` sẽ không còn được sử dụng kể tự React 16.3 (tháng 3 - 2018). Cho đến React 17, hàm vẫn sẽ hoạt động tuy nhiên sẽ có thông báo cảnh báo về việc trong những bản update tiếp theo `componentWillMount` sẽ không còn hoạt động. Thay cho nó, bản có thể sử dụng constructor trong class components. Tuy nhiên bây giờ chúng ta vẫn có thể fetch data trong `componentWillMount` một cánh bình thường
- Vấn đề thứ hai mà ta gặp phải. tuy nó không trực quan lắm :) nhưng đó là khi ta Gọi API để fetch dữ liệu hoặc sử dụng axios trong componentWillMount sẽ không trả về dữ liệu trước render lần đầu tiên. Điều đó đồng nghĩa với việc component sẽ render với empty data ít nhất một lần.

Do tính chất các không đồng bộ trong Javascript, khi ta gọi API, trình duyệt sẽ làm một công việc khác, khi React đang thực hiện render component, nó sẽ không chờ hàm `componentWillMount` kết thúc mà sẽ thực hiện luôn hàm render.
Sẽ không có cách nào có thể "tạm dừng" việc render để chờ dữ liệu được gọi tới, bạn cũng không thể trả về 1 promise từ `componentWillMount` hoặc sử dụng `setTimeout`. Cách hợp lý nhât để xử lý là sử dụng components's intial state ngay cả khi render mà không có dữ liệu, điều đó vãn có thể được chấp nhận

Vậy ta có thể làm gì ở `componentWillMount`? Bạn có thể render ra một empty list, hoặc đôi khi là hiển thị hướng dẫn cho người dùng mới bắt đầu. Đừng cố xử lý dữ liệu ở `componentWillMount`, bạn sẽ gặp một mảng `undefined` hoặc lỗi "Cannot read property 'map' of undefined".

# **componentDidMount**

Khi `componentDidMount` được gọi, component đã được render một lần

**componentDidMount** là nơi lý tưởng nhất để fetch data, có 2 lý do chính:

- Sử dụng `componentDidMount`  chắn sẽ khiến dữ liệu không được tải lên cho tới khi lần đầu render xong. Nó nhắc nhở chúng ta `state` đúng cách để lấy dữ liệu mà không gặp phải lỗi.
- Nếu ta cần lấy dữ liệu để render từ server(server-side-rendering), `componentWillMount` sẽ thực hiện **2** lần, 1 lần trên server và 1 lần trên client, đây là điều không ai mong muốn chút nào. Hãy thực hiện hàm gọi API trong `componentDidMount` để chắc chắn rằng dự liệu sẽ chỉ được fetch từ client.

Sau bài viết này mình mong các bạn hiểu qua về `componentWillMount` và `componentDidMount`,  `componentDidMount` là nơi lý tưởng nhất để fetch data :) Hồi đầu mình hay gọi API lấy dữ liệu ở `componentWillMount` nên gặp rất nhiều lỗi, sau khi tìm hiểu thì thấy DidMount xử lý dữ liệu tuyệt vời hơn nhiều. Mình khuyên các bạn khi làm việc với ReactJS thì nên đọc kỹ phần Lifecycle nhé, quan trọng lắm đấy!

# Tư liệu tham khảo:

- https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
- https://dev.to/torianne02/componentwillmount-vs-componentdidmount-5f0n
- https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
- https://viblo.asia/p/react-component-lifecycle-co-ban-cho-nguoi-moi-bat-dau-924lJL3WKPM