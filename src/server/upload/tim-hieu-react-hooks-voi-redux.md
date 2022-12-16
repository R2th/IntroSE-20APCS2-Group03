Gần đây React nâng cấp lên sử dụng Hooks thay vì sử dụng class component (hay stateful). Giờ đây thế giới của React sẽ chỉ còn khái niệm function component. Hooks được cộng đồng đón nhận rất hồ hởi và tớ cũng thế mặc dù lời cảnh báo của các lập trình viên lão luyện về framework luôn văng vẳng bên tai
## Tìm hiểu về redux hooks
Redux hooks không chỉ thay thế connect(); chúng là một triển khai hoàn toàn riêng biệt đi kèm với các đặc điểm khác nhau và một số lợi ích khi sử dụng chúng. Sau khi đi sâu vào useSelectorví dụ, rõ ràng đó là một móc câu rất thú vị, cung cấp khả năng mở rộng nhiều hơn những gì bạn có thể tin. Chúng tôi sẽ khám phá useSelectorchi tiết hơn trong suốt bài viết và kết hợp với các gói như chọn lại để mở rộng useSelectorkhả năng của hơn nữa.
## Muốn sử dụng được React hooks với redux ,chúng ta sẽ phải làm gì ?
trước tiên ta sẽ build một cái counter cơ bản chỉ làm công việc là cộng và trừ. Với mấy thứ như thế này thì create-react-app luôn là tiện nhất. Nếu anh chị em nào chưa cài thì có thể cài bằng
npm install --save create-react-app 
hoặc
yarn add create-react-app
### Bước 1: Viết counter bằng Redux truyền thống
![](https://images.viblo.asia/81ddd64f-995b-44a4-bd17-9939704b1572.JPG)

Như anh chị em có thể thấy, hiện tại file Counter.js được viết theo cách cũ bằng class component. Sử dụng HOC connect của react-redux để nhận state và actions thông qua hai hàm là mapStateToProps (hay mapState cho gọn) và mapDispatchToProps.
### Bước 2: Chuyển qua Redux hooks
Giờ chúng ta hãy bắt đầu viết lại counter bằng hooks. Thực ra hooks cho redux khá đơn giản một khi bạn đã thành thạo React Hooks. Nếu chưa hãy giành chút thời gian tham khảo tại trang chính thức của  [redux hooks](https://react-redux.js.org/api/hooks) nhé. Tớ chưa thấy đâu giải thích hook dễ hiểu như chính document của React.
Chúng ta sẽ dùng useSelector thay cho mapStateToProps và useDispatch thay mapDispatchToProps
Toàn bộ thay đổi chỉ có trong Counter.js như bên dưới:
![](https://images.viblo.asia/f8a557e7-c668-44f8-834f-a64ee2b9982f.JPG)

### Kết luận
Rõ ràng,khi sử dụng redux với react hooks sẽ đơn giản code,tối ưu nhiều thời gian khi phải viết nhiều lần connect ở mỗi component thay vì chỉ dùng useSelector và useDispatch.
Khi sử dụng Hooks trong Redux, anh chị em nên giành chút thời gian đọc documentation của react-redux vì bản thân useSelector sẽ có những khác biệt với HOC connect. Ngoài ra stale props và zombie children là 2 trường hợp gây ra bug được cộng đồng thảo luận nhiều mà anh chị em cũng cần biết.

*tham khảo HungHayHo via kipalog*