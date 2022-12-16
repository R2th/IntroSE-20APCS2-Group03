# Giới thiệu
BLoC a.k.a Business Logic Components là một design pattern được giới thiệu bởi Paolo Soares và Cong hui tư Google tại DartConf 2018

Ban đầu BLoC pattern được tạo ra để cho phép tái sử dụng những code giống nhau giữa các nền tản: web application, mobile application, back-end. Vì vậy pattern này đã được phát triển nhằm giảm bớt khối lượng công việc cho các developer với ý tưởng tái sử dụng code. 
Bạn có thể tham khảo video bên dưới để hiểu hơn cách mà BloC pattern được sử dụng để chia sẻ code cho các nền tảng khác nhau
{@embed: https://www.youtube.com/watch?v=PLHln7wHgPE}

# Streams
Để biết rõ hơn về BloC trước tiên bạn phải biết về Streams

Theo một nghĩa chung thì luồng là một dòng chảy liên tục hoặc tiếp nối bất cứ thứ gì trước đó

Ex: Đây là một Cat Streams =))
![](https://images.viblo.asia/c0586b7c-ebd5-4970-b089-259e75ac5e7f.gif)

Nhưng về mặt kỹ thuật, Stream không là gì ngoài một luồng dữ liệu liên tục
Hãy lấy ví dụ về băng chuyền. Một bằng chuyền có hai đầu, một vật phẩm được đưa vào từ một đầu (đầu vào) sau đó nó được xử lý và được lấy ra từ một đầu khác (đầu ra)
Các khái niệm:

* **Stream**, băng chuyền hay gọi là luồng
* **StreamController**, là thứ điều khiển Stream
* **StreamTransformer**, là thứ xử lý dữ liệu đầu vào
* **StreamBuilder**, là phương thức lấy Stream làm đầu vào và provide một builder mỗi khi có giá trị mới của Stream được đưa ra
* **sink**, thuộc tính lấy đầu vào
* **stream**, thuộc tính cung cấp đầu ra khỏi luồng

Giờ chúng ta đã có ý tưởng về Streams. Trở lại với FLutter , Có một trở ngại chính xuất hiện trong khi code với FLuitter là để tương tác với UI và mọi thứ khác trong Flutter, chúng ta không có ngôn ngữ thiết kế trung gian nào cho UI như trong Android chúng ta có XML, thay vào đó trong Flutter, chúng ta viết tất cả ở một nơi. Vì vậy BLoC xuất hiện và giúp loại bỏ trở ngại này một cách hiệu quả
* BLoC không chỉ giải quyết vấn đề chia sẻ code mà còn tận dụng chức năng Streams để quản lý và thông báo các thay đổi trạng thái trong Flutter
* BLoC giúp chúng ta tách Business Logic ra khỏi UI. Nói cách khác, các thành phần UI chỉ nên take care về mặc UI chứ không phải logic
* Vì vậy , mặc dù Flutter thieeys ngôn ngữ trung gian cho UI, nhưng với việc sử dụng BLoC chúng ta có thể tách cả hau thứ làm việc độc lập với nhau
* Nếu bạn là một Android Developer truyền thống thì hãy nghĩ đối tượng BLoC chúng là ViewModel và StreamController là các LiveData
# Vậy tất cả điều này có nghĩa là gì?
Như chúng ta đã biết ở trên BLoC sử dụng Streams, chúng ta có thể suy ra những điều sau
![](https://images.viblo.asia/81f8a5bb-9b25-4cdd-b544-a4ba5a55700d.png)


* Input được lấy thông qua sink property
* Output được cung cấp bằng cách sử dụng stream property
* Widgets bắn event tới BLoC thông qua sinks
* BLoC notify thay đổi đến Widget thông qua stream
* Bât giờ thì Business Logic và UI component đã được tách ra, chúng ta có thể thay đổi business logic  mọi lúc mà không làm ảnh hưởng đến các thành phần UI
* Tương tự, chúng ta cõ thể thay đổi các UI component mà không có bất kỳ tác động nào đến business logic
# Tại sao nên sử dụng BLoC?
Bây giờ bạn đã hiểu cách BLoC hoạt động như thế nào. Vậy bạn có tự hỏi tại sao lại nên sử dụng nó cho việc quản lý và phân bổ code thay vì một vài cách khác đã được giới thiệu. Cùng thảo luận về chúng và xem tại sao BLoC lại hiệu quả như vậy

## setState()
Phương thức setState ()  sẽ notify đến framework rằng trạng thái của object bên trong setState() đã thay đổi. Bất cứ khi nào bạn thay đổi trạng thái bên trong của một object state hãy thực hiện thay đổi trong function mà bạn chuyển sang setState
```
setState(() 
 { 
   _myState = newValue 
 }
);
```
Việc gọi phương thức setState() sẽ thông báo cho framework rằng trạng thái bên trong của đối tượng đã thay đổi và điều này khiến cho framework sẽ build lại trạng thái mới cho đối tượng

Các vẫn đề với cách làm như trên:
- Toàn bộ cây widget được build lại mỗi khi trạng thái của một widget duy nhất that đổi
- Không giúp tách biệt các thành phần UI và business logic
## InheritedWidget
Nó là một loại widget đặc biệt xác định context tại root của các cây con và có thể phân bổ các context này đến mọi widget trong cây con đó một cách hiệu quả
Như đã nói , nó có thể
* Truyền dữ liệu xuống cây
* Cập nhật lại các widget khi có thây đổi

![](https://images.viblo.asia/784261e8-2ba2-4b5b-8793-5f373b0c3c56.png)

Các vấn đề với cách làm này
* State được set final điều này có nghĩa là nó bất biến
* Nó không cung cấp bất kỳ phương pháp nào để giải phóng tài nguyên và tránh rò rỉ dữ liệu

## Scoped Model
Scoped Model là một third party package được cung cấp và maintain bởi Brain Egan. Nó được xây dựng dựa trên InheritedWidget và cung cấp cách truy cập, cập nhật và thay đổi trạng thái tốt hơn. Nó cho phép bạn dễ dàng truyền một data model từ parent widget xuống các widget con cháu của nó và build lại tất cả những childrent widget có sử dụng model. Để kiểm tra có bất kỳ thay đổi nào, phương thức listeners() được sử dụng bởi Scoped Model
![](https://images.viblo.asia/07eec9e6-ef1a-4d6a-919b-3fc7d3b9e857.png)

Vấn đề với cách làm này là: Khi model trở nên phức tạp hơn, thật khó để theo dõi khi nào bạn nên gọi notifylistener()

Vì vậy tất cả cách tiếp cận được đề cập ở trên đều có một hoặc nhiều vấn đề  nên không thể được coi là cách quản lý state tốt nhất trong Flutter và đó là cách mà mô hình BLoC hoạt động hiệu quả vì nó có thể giải quyết tất cả các vấn đề nêu trên

Xem video sau để hiểu rõ hơn
{@embed: https://www.youtube.com/watch?v=RS36gBEp8OI}
# Khi nào nên sử dụng BLoC?
Để biết khi nào nên sử dụng BLoC và khi nào không sử dụng, chúng ta phải nhận thức được khái niệm về Local state và Global State.
### Local State vs Global State
Lấy một ví dụ có thể bạn đã từng gặp qua: hãy tưởng tượng có một form Login, nới mà user phải nhập username và password và sau đó một API validate sẽ được gọi để xác thực user đó. Vì vậy ở đây validation login form  được xem như là **Local state** do phạm vi của nó chỉ áp dụng cho component này và phần còn lại của ứng dụng không liên quan gì đến nó. Trong khi việc gọi API xác thực user được coi là **Global state** vì nó dựa trên xác thực này, toàn bộ phạm vi của ứng dụng phụ thuộc

Vì vậy khác nhau cơ bản giữa Local State và Global State là phạm vi phụ thuộc
![](https://images.viblo.asia/52405b8c-c655-4dcd-a95d-6b153cc4929e.png)

Redux cũng là một cách quản lý state. Để xử lý các local state BLoC là phương pháp tốt nhất, trong khi đối với global state BLoC có thể sử dụng tốt đối với nhứng ứng dụng đơn giản và không phức tạp lắm nhưng không được khuyến nghị. Đối với global state redux là phương pháp được khuyến nghị


# Nguồn tham khảo
http://flutterdevs.com/blog/bloc-pattern-in-flutter-part-1/