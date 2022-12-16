Điểm chính của bài viết này là cung cấp cho bạn những lời khuyên sẽ hỗ trợ bạn và nhóm của bạn trong các dự án React Native của bạn. Một số trong những lời khuyên này hoàn toàn liên quan đến React Native, trong khi những lời khuyên khác thường thiên về phát triển ứng dụng di động hơn. Hãy cùng bắt đầu!

## 1. Xoá logs trong các bản builds release
Có nhiều câu lệnh console.log có thể làm chậm ứng dụng của bạn, đặc biệt nếu bạn đang sử dụng các thư viện ghi nhật ký như redux-logger. Đảm bảo tắt tất cả nhật ký (thủ công hoặc bằng tập lệnh) khi tạo bản phát hành, điều này cũng sẽ giúp phần nào ứng dụng của bạn mượt mà hơn mặc dù đôi khi bạn sẽ không thấy sự thay đổi quá rõ ràng. Nhưng cứ đề phòng cũng chẳng thừa.

## 2. Sử dụng Flexbox nhiều hơn

Thật đáng buồn là tôi đã thấy mã React Native sử dụng định vị phần tử tuyệt đối (absolute) thay vì flexbox, phá vỡ bố cục và không cung cấp khả năng sử dụng lại. Bất kể yêu cầu thiết kế của bạn là gì, sử dụng flexbox hầu như luôn là câu trả lời chính xác. Đối với những người đến từ nền web: Flexbox trong React Native hoạt động gần như chính xác như CSS vậy, sự khác biệt quan trọng là flexDirection mặc định thành cột thay vì hàng trong React Native.

## 3. Đặt tên các object một cách nhất quán

Nếu một phần tử của bạn có một đối tượng kiểu có tên là container, thì hãy sử dụng tên đó cho mọi phần tử cùng cấp độ trên dự án. Nếu nút gửi của bạn có một đối tượng kiểu có tên là submitButton, thì hãy gắn bó với nó và không sử dụng saveButton, submitBtn hoặc gửi cho các trường hợp khác.

## 4. Sử dụng toán tử ba ngôi một cách chuẩn xác

Viết như thế này **color = error ? ‘red’: ‘gray’** xem ra là rất ngắn gọn và dễ hiểu.

Nhưng khi viết **color = error ? (id === myID) ? ‘red’ : ‘black’ : ‘gray’** thì không. Toán tử ba ngôi giúp bạn rút ngắn số lượng dòng code nhưng tốt hơn hết là không bao giờ lồng toán tử ba ngôi vào nhau bởi làm thế sẽ khiến cho logic trở nên rối rắm và khó hiểu.

## 5.Đừng lạm dụng zIndex

Chỉ sử dụng zIndex khi bạn phải. Ví dụ: nếu bạn muốn phủ một <Text> trên <Image>, sử dụng zIndex là cách làm sai. Bạn nên sử dụng thành phần <ImageBackground> thay thế. Một nguyên tắc nhỏ là nếu bạn nghĩ rằng bạn đang làm phức tạp mã của mình với rất nhiều thuộc tính zIndex, thì có lẽ bạn đã đúng. Quay trở lại và suy nghĩ lại về bố cục của bạn.
    
## 6. setState() là không đồng bộ
    
Đây phải là một trong những lỗi phổ biến nhất cho người mới bắt đầu trong React Native. Mặc dù việc thay đổi trạng thái của một thành phần gây ra việc render lại, nhưng nếu bạn viết một cái gì đó như setState({username: 'somevalue'}), và sau đó thử đọc this.state.username trong dòng mã tiếp theo, bạn sẽ không đọc giá trị chính xác, vì setState() là một hoạt động không đồng bộ. Sử dụng await setState ({username}) để tránh sự cố này hoặc có thể sử dụng callback của setState.
    
## 7. Bạn có thể dispatch 1 redux action trong một action khác

Một hành động không được giới hạn trong một request API hoặc một thao tác với dữ liệu. Bất kỳ hành động nào cũng có thể được gửi từ một hành động khác, từ cùng một tệp hoặc một tệp khác. Nghe có vẻ rõ ràng nhưng có thể bị bỏ qua.
    
## 8. Sử dụng Object destructuring

Chẳng ai muốn nhìn thấy cái này **this.props.navulation.state.params.username** ở khắp mọi nơi. Vì vậy, sử dụng object destructuring, Nó làm cho mã dễ đọc và dễ hiểu hơn. Và bạn cũng có thể (và nên) sử dụng nó trong các tham số hàm, vì vậy thay vì 
    
```
    const MyComponent = (props) => {}
```
    

bạn có thể viết 
    
```
    const MyComponent = ({username, userID}) => {}
```
    
Nhưng hãy cẩn thận một chút, destructuring một object có chiều sâu lớn hơn 2 đôi khi sẽ gây crash
    
Ví dụ
    
```
const { data } = this.props
    
const { username, firstName, lastName } = data
```

Trông có vẻ không có gì, nhưng nếu *data* ở trên là null thì việc destructuring object data như ở dưới sẽ gây lỗi.
    
## 9. Không dùng TouchableWithoutFeedback nếu bạn không có lý do chính đáng
    
Như tài liệu React Native chính thức nêu rõ, tất cả các yếu tố phản hồi nên có phản hồi trực quan khi chạm vào. Hãy ghi nhớ điều này khi tạo các thành phần UI của bạn và sử dụng <TouchableWithoutFeedback> một cách tiết kiệm. 
    
Một điểm đáng chú ý nữa là TouchableWithoutFeedback chỉ chấp nhận có duy nhất 1 phần tử children, hãy lưu ý bọc các thành phần con của nó trong 1 wrapper để không gặp lỗi đỏ cả màn hình :))
    
## 10. Sửa đổi nội dung của 1 array state sẽ không gây ra re-render
    
Chắc chắn đã có lúc bạn có 1 state là 1 array, khi bạn thay đổi state này nhưng flatList bên dưới sử dụng state này lại không chịu render lại (ví dụ bạn xoá 1 phần tử trong array, nhưng flatList vẫn y như cũ, mặc dù về lý là state thay đổi thì view phải re-render). Sự thật thì không, chỉnh sửa một phần tử của array state, sẽ không làm view re-render.
    
Để tránh trường hợp này, thay vì dùng trực tiếp array state đó để làm data cho flatList hãy deep copy nó (có thể sử dụng hàm cloneDeep của Lodash) hoặc đơn giản là object assign ([...array]). Và rồi flatList hay view của bạn sẽ re-render như bạn muốn.
    
Source: [https://medium.com/mop-developers/50-react-native-tips-part-1-2-5cb12803228b](https://medium.com/mop-developers/50-react-native-tips-part-1-2-5cb12803228b)