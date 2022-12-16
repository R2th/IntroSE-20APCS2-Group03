`Google Analytics` (còn được viết tắt là GA). Một từ khoá chắc rất nhiều bạn đã quen thuộc. GA dùng để thống kê lưu lượng truy cập ứng dụng của chúng ta. Ví dụ đơn giản như việc chúng ta sẽ thống kê được số lần người dùng login, logout, ... Ngoài ra chúng ta có thể thống kê một số business đặc biệt khác nữa. Trước đây mình có làm về GA nhưng chỉ làm ở mức đó. Và sau này khi mình vọc lại thì lại thấy GA có thể được tích hợp trong `Firebase`. Vậy thì hôm nay chúng ta hãy cùng tìm hiểu xem GA có gì mới khi được tích hợp với `Firebase` nhé! Bắt đầu thôi...!

#  I. Tìm hiểu về GA và các bước tích hợp trong `Firebase`.
## 1. Google Analytics (GA).
`Google Analytics` là một giải pháp đo lường ứng dụng miễn phí cung cấp cái nhìn sâu sắc về việc sử dụng ứng dụng và thao tác của người dùng đối với ứng dụng.

Trung tâm của Firebase là `Google Analytics`, một giải pháp phân tích miễn phí và không giới hạn.

Analytics tích hợp trên các tính năng của Firebase và cung cấp cho chúng ta báo cáo không giới hạn cho tối đa 500 sự kiện riêng biệt (sự kiện ở đây là có thể là login, logout hoặc là những sự kiện khác liên quan đến business riêng của chúng ta) mà chúng ta có thể xác định, định nghĩa bằng cách sử dụng SDK của Firebase.

Báo cáo phân tích giúp chúng ta hiểu rõ các hành vi của người dùng khi sử dụng ứng dụng của chúng ta, điều này cho phép chúng ta có thể đưa ra những quyết định sáng suốt liên quan đến tiếp thị (marketing) ứng dụng và tối ưu hóa hiệu suất (performance optimizations).

Vậy thì GA làm việc như thế nào? ... Cùng tìm hiểu ở phần tiếp theo...!

## 2. GA làm việc như thế nào?
`Google Analytics` giúp chúng ta hiểu cách mà người dùng sử dụng ứng dụng web, iOS hoặc Android của mình.

Khi ứng dụng của chúng ta được tích hợp GA thì GA sẽ tự động nắm bắt một số sự kiện và thuộc tính người dùng và cũng cho phép chúng ta xác định các sự kiện tùy chỉnh của riêng mình để đo lường những business riêng tương ứng với ứng dụng của chúng ta.

Khi dữ liệu được ghi lại, nó có sẵn trong bảng điều khiển (dashboard) thông qua bảng điều khiển Firebase. Bảng điều khiển này cung cấp thông tin chi tiết về dữ liệu của chúng ta - từ dữ liệu tóm tắt như số người dùng hoạt động và nhân khẩu học (Demographic là khái niệm quen thuộc trong Marketing để chỉ một trong những cách phân khúc thị trường, xác định khách hàng tiềm năng của doanh nghiệp), đến dữ liệu chi tiết hơn như xác định các mặt hàng được mua nhiều nhất của ứng dụng bán hàng online.

Analytics cũng tích hợp với một số tính năng khác của Firebase. Ví dụ: nó tự động ghi nhật ký các sự kiện tương ứng với tin nhắn thông báo được gửi qua trình soạn thảo thông báo và cung cấp báo cáo về tác động của từng chiến dịch (trong marketing).

Analytics giúp chúng ta hiểu hành vi của người dùng là như thế nào, từ đó chúng ta có thể đưa ra quyết định sáng suốt về cách tiếp thị (markting) ứng dụng của mình. Xem hiệu suất của các chiến dịch của bạn trên các kênh organic (nguồn khách hàng tiếp cận tự nhiên trong marketing) và trả phí để hiểu phương pháp nào hiệu quả nhất trong việc hướng đến người dùng có giá trị cao. Nếu bạn cần thực hiện phân tích tùy chỉnh hoặc nối dữ liệu của mình với các nguồn khác, bạn có thể liên kết dữ liệu Analytics của mình với BigQuery, cho phép phân tích phức tạp hơn như truy vấn các tập dữ liệu lớn và nối nhiều nguồn dữ liệu.

Chúng ta đã biết GA làm việc như thế, tiếp theo hãy cùng đi đến các bước tích hợp GA vào ứng dụng của mình nhé!
### 3. Các bước tích hợp GA vào ứng dụng web (ReactJS).
Đầu tiên hãy tạo 1 dự án `Firebase`. Sau đó tạo 1 ứng dụng webapp. Tiếp đến là bật `Google Analytics` (chúng ta có thể vào `Project settings` tab `Integrations`). Khi đã được bật thì Project `Firebase` sẽ được link tới bên phần dữ liệu bên `Google Analytics` .

Ở tại ứng dụng web thì chúng ta  bắt đầu cài đặt gói `Firebase` như dưới:
```javascript
npm install --save firebase
```
Tiếp đến tạo 1 file `init-firebase.js` dùng để lưu các cấu hình của `Firebase` và khởi tạo như dưới:
```javascript
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCGQ0tYppWFJkuSxBhOpkH0xVDmX245Vdc",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "637908496727",
  appId: "2:637908496727:web:a4284b4c99e329d5",
  measurementId: "G-9VP01NDSXJ"
};

firebase.initializeApp(firebaseConfig);
```
Chú ý là phải có cấu hình này `measurementId: "G-9VP01NDSXJ"` thì mới chắc được là `Google Analytics` đã được bật ở dự án `Firebase` và theo dõi ở ứng dụng. Còn nếu không có thì có lẽ chúng ta đang sai 1 bước nào đó, hãy thử xem xét kỹ lưỡng và lấy lại file cấu hình cho đúng.

Sau đó để có thể log được những sự kiện đưa lên thì chúng ta sẽ tạo một tham chiếu analytics và gọi function `logEvent` như dưới:
```javascript
firebase.analytics().logEvent('example_event');
```

Lưu ý là chúng ta sẽ có 3 loại event chính lần lượt là:
- Event được tự động lấy (khi đã tích hợp vào rùi thì khi người dùng sử dụng ứng dụng thì các event này sẽ được tự động lấy, nếu chúng ta không muốn lấy thì có thể thêm cấu hình ở analytics để loại bỏ) như là `page_view` (`screen_view` đối với IOS hoặc android), `session_start`,  `first_visit` (`fist_open` đối với IOS hoặc android), ... có thể xem thêm tại [đây](https://support.google.com/analytics/answer/9234069).
- Event được khuyến cáo sử dụng (những event được GA khuyến cáo sử dụng, có thể là những event này đã được GA tổng hợp dựa trên những ứng dụng đã sử dụng GA và được GA đánh giá là phổ biến) và chia ra làm các lĩnh vực nhất định như là bán lẻ, thương mại điện tử, du lịch, việc làm, giáo dục, ... có thể xem thêm tại [đây](https://support.google.com/analytics/answer/9268036?hl=en&ref_topic=9267641#), [đây](https://support.google.com/analytics/answer/9268037?hl=en&ref_topic=9267641), [đây](https://support.google.com/analytics/answer/9267738?hl=en&ref_topic=9267641) và [đây](https://support.google.com/analytics/answer/9267565?hl=en&ref_topic=9267641).
- Event được chính chúng ta định nghĩa để phù hợp với business của ứng dụng. Ví dụ đơn giản như có 1 ứng dụng thương mại điện tử, chúng ta muốn thống kê số lượng hàng được đặt, số lượng đơn hàng được tạo, số lượng đơn hàng đặt thành công .. thì sẽ có các event tương ứng là `request_order`, `create_order`, `create_order_successfullly`.

Ở trên chúng ta đã tích hợp xong vậy giờ hãy xem thành quả trên bảng điều khiển (dashboard) của Analytics trên `Firebase` nhé (Chú ý là những event của chúng ta sẽ được hiển thị sau 1 ngày kể từ lúc sự kiện dc log lên nhé :) chứ không được log realtime ngay đâu :v. Nếu khi dev chúng ta muốn xem ngay tại thời điểm log event để test thì có thể dùng [debug view](https://firebase.google.com/docs/analytics/debugview)).

Tiếp đến chúng ta hãy cùng đi sơ qua một số tính năng khá hay của `Google Analytics` trên `Firebase`.

# II. Nhìn sơ qua một số tính năng của GA.
Chúng ta cùng đi qua lần lượt một số tính năng lớn mà mình cảm thấy khá ưng ý nhé:
![](https://images.viblo.asia/16e0122a-fb2c-40de-9f25-ab550442bcad.png)
- Dashboard: Đầu tiên là phần Dashboard là bảng điều khiển giúp cho chúng ta có một cái nhìn tổng thể về ứng dụng của mình như là số người hoạt động trong 30 phút trước (so với thời điểm hiện tại), số người thao tác với các màn hình tương ứng nào (% tương ứng từng màn hình, thời gian trung bình), quốc gia trên thế giới và số lượng người dùng tương ứng.

![](https://images.viblo.asia/3f308abb-0d7d-46e2-8f4f-3f9996ace273.png)
- Events: Tiếp theo là event sẽ là nơi chứa tất cả các event được log lên nhưng sẽ là 24 sau khi được log, còn trường hợp khi dev thì chúng ta có thể dùng debug view để xem realtime.

![](https://images.viblo.asia/5d9897cf-1c8d-4869-9a4f-4534692e153e.png)
![](https://images.viblo.asia/ecfc9bf8-c7ed-48c5-ac58-37876db19748.png)

- Audiences: Sẽ giúp chúng ta phần chia nhỏ từng phân khúc người dùng và xem các thông tin chỉ nằm trong phần khúc người dùng đó. Ví dụ như là phân vùng người dùng chỉ dùng website, hoặc smartphone, .... Ví dụ ở hinh trên sẽ là phân khúc người dùng mà đã trả tiền để mua hàng chẳng hạn.

![](https://images.viblo.asia/b4d69da4-cc2a-4814-8d84-224d13e60377.png)
![](https://images.viblo.asia/7128657b-140f-4716-a6d6-e7dcc8e95bcc.png)
- Funnels: Một tính năng khá thú vị và hữu ích. Funnels mang lại cho chúng ta một cái nhìn rõ nét, cụ thể về 1 quá trình phục vụ cho 1 business nào đó. Như ở hình trên chúng ta có 1 quá trình bất đầu từ lúc người dùng vào app cho đến khi người dùng chả tiền để mua 1 sản phẩm nào đó. Từ đó chúng ta sẽ biết được con số rõ ràng để đưa ra phương án marketing tiếp theo. Ví dụ có 10 người vào app và có 5 người mua sản phẩm chẳng hạn.

Ở trên là một số tính năng mà mình cảm thấy thú vị còn các bạn thì sao! Hay cùng bắt tay vào thử vào trải nghiệm ngay nào!

# III. Kết luận.
`Google Analytics` rất khác trước và sau khi được kết hợp với `Firebase` đúng không nào! Thêm nhiều tính năng thú vị hơn, giúp chúng ta có những nhận định chính xác nhất về người dùng khi sử dụng ứng dụng của mình, để từ có có đưa ra những chiến lược hợp lý quảng bá sản phẩm, tăng doanh thu, ...

Thì bài chia sẻ của mình đến đây là hết rồi! Mong là nó sẽ mang lại cho các bạn những kiến thức hữu ích về `Google Analytics`. Trong bài tới mình sẽ làm một demo để đi sâu vào khám phá nhiều hơn nữa về GA nhé! Còn bây giờ thì xin chào và hẹn gặp lại các bạn trong bài kết tiếp! Xin chào!