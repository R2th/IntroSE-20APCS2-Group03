Xây dựng giao diện người dùng trong Flutter khá đơn giản với tất cả các widget mà Flutter cung cấp. Nhưng chúng ta không thể chỉ taọ ra một ứng dụng đẹp mà không có chức năng gì. Trong tất cả các ứng dụng sẽ, một việc thường thấy đó là di chuyển hoặc gửi dữ liệu qua lại giữa các màn hình. Trong Flutter, có thể điều hướng từ màn hình này sang màn hình khác nhờ Navigator.
Bạn sẽ tìm thấy rất nhiều bài viết hướng dẫn bạn cách chuyển sang màn hình mới hoặc mở từ màn hình hiện tại, nhưng bài viết này còn nhiều hơn thế một chút. Điều này chủ yếu sẽ tập trung vào hầu hết các tính năng mà Navigator cung cấp và mô tả một trường hợp sử dụng cho mỗi cách.

# 1.Chuẩn bị
**Routes** đã được đề cập ở đâu đó, vậy nó là gì?
Routes là một phần trừu tượng cho một màn hình hoặc một trang của một ứng dụng. Ví dụ: '/ home' sẽ đưa bạn đến HomeScreen hoặc '/ login' sẽ đưa bạn đến LoginScreen. '/' sẽ là  trang mặc định của bạn. Điều này nghe có vẻ rất giống với **Routing** trong phát triển API REST. Vì vậy, '/' có thể hoạt động như một gốc.
Đây là cách bạn khai báo các router của mình trong ứng dụng Flutter. 
```
new MaterialApp(
  home: new Screen1(),
  routes: <String, WidgetBuilder> {
    '/screen1': (BuildContext context) => new Screen1(),
    '/screen2' : (BuildContext context) => new Screen2(),
    '/screen3' : (BuildContext context) => new Screen3(),
    '/screen4' : (BuildContext context) => new Screen4()
  },
)
```
Screen1 (), Screen2 (), v.v. là tên của các lớp cho mỗi màn hình. 

# 2. Push, push, push.
Nếu bạn có bất kỳ kiến thức nào về Cấu trúc dữ liệu, thì bạn sẽ biết về Stack. Nếu bạn có kiến thức cơ bản về stack, thì bạn sẽ biết về push và pop.
Khi chúng tôi điều hướng đến một màn hình khác, chúng tôi sử dụng các phương pháp push và Navigator sẽ thêm màn hình mới lên trên cùng của ngăn xếp. Đương nhiên, các phương thức pop sẽ xóa màn hình đó khỏi ngăn xếp.
Hãy xem cách chúng ta có thể chuyển từ Screen 1 sang Screen 2. Bạn có thể thử nghiệm các phương pháp bằng cách chạy ứng dụng mẫu. 
```
new RaisedButton(
   onPressed:(){
   Navigator.of(context).pushNamed('/screen2');
},
   child: new Text("Push to Screen 2"),
),
```
Với sự trợ giúp của các phương thức pushNamed, chúng ta có thể điều hướng đến bất kỳ màn hình nào có  router được xác định trong main.dart. Chúng tôi gọi chúng có tên là Routes để tham khảo. Trường hợp sử dụng của phương pháp này khá đơn giản.
![](https://images.viblo.asia/918b111c-cfdf-4bb3-931c-5b14a700ecd9.png)
Khi sử dụng push, một màn hình sẽ được thêm vào stack như trên

# 3. Pop
Bây giờ, khi chúng ta muốn loại bỏ màn hình được truy cập gần đây nhất, đó là Screen2 trong trường hợp này, chúng ta cần pop màn hình đó từ ngăn xếp của Navigator bằng cách sử dụng các phương thức pop.

```
Navigator.of(context).pop();
```
![](https://images.viblo.asia/c3bc1559-0e51-4dd7-8780-04d383d294dd.png)
Kết quả chúng ta thu được sau khi gọi hàm pop(). 
Khi sử dụng Scaffold, thông thường không cần thiết phải bật lộ trình một cách rõ ràng vì Scaffold tự động thêm nút ‘quay lại’ vào AppBar của nó, nút này sẽ gọi Navigator.pop () khi được nhấn. Ngay cả trong Android, nhấn nút quay lại thiết bị cũng sẽ làm như vậy. Tuy nhiên, bạn có thể cần phương pháp này cho các tiện ích khác, chẳng hạn như bật AlertDialog khi người dùng nhấp vào nút Hủy. 

### 3.1 Tại sao dùng pop thay cho push để có thế tới được màn trước đó ?
Hãy tưởng tượng bạn có một ứng dụng Đặt phòng khách sạn liệt kê các khách sạn ở vị trí mong muốn của bạn. Nhấp vào bất kỳ mục nào trong danh sách sẽ đưa bạn đến màn hình có thêm thông tin chi tiết về khách sạn. Bạn chọn một khách sạn, và bạn ghét khách sạn và muốn quay lại danh sách. Nếu bạn quay lại HotelListScreen, bạn cũng sẽ giữ lại DetailsScreen trên ngăn xếp của mình. Vì vậy, nhấn vào nút quay lại sẽ đưa bạn trở lại Màn hình Chi tiết. Thật khó hiểu phải không nào!

![](https://images.viblo.asia/47385664-4fcf-424f-8fec-e6d94bea7904.png)

# 4.1 maybePop
Bây giờ điều gì sẽ xảy ra nếu bạn đang ở trên Router gốc và ai đó đã cố gắng mở màn hình này một cách nhầm lẫn. Việc pop màn hình duy nhất trên ngăn xếp sẽ đóng ứng dụng của bạn, vì khi đó ứng dụng không có đường để hiển thị. Bạn chắc chắn không muốn người dùng của mình có trải nghiệm  không tốt như vậy.  Vì thế maybePop() xuất hiện. Hãy dùng thử, nhấp vào nút mightPop trên Screen1 và nó sẽ không làm gì cả. 

# 4.2 canPop
Thật ngạc nhiên khi chúng tôi có thể làm được điều này, nhưng làm sao tôi có thể biết đây có phải là router gốc hay không? Sẽ thật tuyệt nếu tôi có thể hiển thị một số cảnh báo cho người dùng trong những trường hợp như vậy.
Câu hỏi hay, chỉ cần gọi phương thức canPop () này và nó sẽ trả về true nếu tuyến đường này có thể xuất hiện và false nếu không thể.
Hãy thử cả hai phương pháp này canPop và couldPop trên Screen1 và Screen3 và xem sự khác biệt. Các giá trị in cho canPop sẽ hiển thị trong tab bảng điều khiển của IDE của bạn. 

# 4.3 pushReplacementNamed and popAndPushNamed
Hãy quay lại với các phương pháp push khác. Bây giờ chúng ta đang tìm hiểu sâu hơn về nó. Chúng ta sẽ nói về việc thay thế một router bằng một tuyến router mới. Chúng tôi có hai phương pháp có thể thực hiện điều này - pushReplacementNamed và popAndPushNamed. 
```
Navigator.of(context).pushReplacementNamed('/screen4');
                       //and
Navigator.popAndPushNamed(context, '/screen4');
```
![](https://images.viblo.asia/8ff413ad-6f2f-42f8-b80f-205e76298fc7.png)

# 5. Until the end…
Chúng ta gần đến cuối bài viết. Chà, gần như vậy.
Trong phần này, chúng tôi sẽ đề cập đến hai phương pháp sau pushNamedAndRemoveUntil và popUntil. 

Vì vậy, về cơ bản, bạn xây dựng một ứng dụng giống Facebook / Instagram, nơi người dùng đăng nhập, cuộn qua nguồn cấp dữ liệu của họ, xem qua các hồ sơ khác nhau và khi hoàn thành, muốn đăng xuất khỏi ứng dụng. Sau khi đăng xuất, bạn không thể chỉ đẩy Màn hình chính (hoặc bất kỳ màn hình nào cần hiển thị sau khi đăng xuất) trong những trường hợp như vậy. Bạn muốn xóa tất cả các tuyến trong ngăn xếp để người dùng không thể quay lại các tuyến trước đó sau khi họ đã đăng xuất. 
```
Navigator.of(context).pushNamedAndRemoveUntil('/screen4', (Route<dynamic> route) => false);
```
![](https://images.viblo.asia/cc408a3c-909b-4bf1-b7ea-b7fe753f75b7.png)
Bây giờ thay vì xóa tất cả các tuyến trước các tuyến đã đẩy, chúng tôi chỉ có thể xóa một số tuyến nhất định. Hãy lấy một ví dụ khác về ứng dụng Mua sắm! Hoặc về cơ bản là bất kỳ ứng dụng nào yêu cầu giao dịch thanh toán.

Vì vậy, trong các ứng dụng này, khi người dùng đã hoàn tất giao dịch thanh toán, tất cả các màn hình liên quan đến giao dịch hoặc giỏ hàng sẽ được xóa khỏi ngăn xếp và người dùng sẽ được đưa đến Màn hình PaymentConfirmationScreen. Nhấp vào nút quay lại sẽ chỉ đưa chúng trở lại ProductsListScreen hoặc HomeScreen. 
![](https://images.viblo.asia/95f429ab-d1d4-4f87-a776-75f0ce687388.png)
```
Navigator.of(context).pushNamedAndRemoveUntil('/screen4', ModalRoute.withName('/screen1'));
```

## 5.1 popUntil
Hãy tưởng tượng bạn đang xây dựng một ứng dụng giống như Google Biểu mẫu hoặc một ứng dụng cho phép bạn điền và sắp xếp các biểu mẫu của Google. Giờ đây, một số người dùng có thể phải điền vào một biểu mẫu dài gồm 3 phần, có thể được hiển thị trong 3 màn hình tuần tự trong một ứng dụng di động. Bây giờ ở phần thứ 3 của biểu mẫu, người dùng quyết định hủy điền vào biểu mẫu. Người dùng nhấp vào Hủy và tất cả các màn hình liên quan đến biểu mẫu trước đó sẽ được bật lên và người dùng sẽ được đưa trở lại Màn hình chính hoặc Màn hình bảng điều khiển, do đó mất tất cả dữ liệu liên quan đến biểu mẫu (đó là những gì chúng tôi muốn trong những trường hợp như vậy). Chúng tôi sẽ không thúc đẩy bất cứ điều gì mới ở đây, chỉ quay trở lại lộ trình trước đó. 
![](https://images.viblo.asia/d7fd7d96-ad83-4ef8-a9d6-de78e05b8fc1.png)
```
Navigator.popUntil(context, ModalRoute.withName('/screen2'));
```