![](https://images.viblo.asia/aae4fc0c-ef17-4293-997b-096517414348.jpeg)
Mình đang tham gia phát triển một dự án về game đua xe, nhưng có một hiện tượng là nhân vật chạy không được mượt trên các máy mạnh yếu khác nhau, và may mắn mình được anh em team Dev chia sẻ cho một bài về "Delta time". Mình thấy bài viết rất hay và đã giải quyết được bài toán trên của mình nên xin phép được dịch lại bài này.

Nguồn: https://dev.to/dsaghliani/understanding-delta-time-in-games-3olf

# 🔒 Vấn đề
Chúng ta có một chiếc ô tô, và chúng ta muốn di chuyển nó với tốc độ không đổi.

Để đơn giản nhất, chúng ta hãy bỏ qua vector và chỉ sử dụng đơn vị trục số. Chiếc xe sẽ bắt đầu ở vị trí 0 và chúng ta muốn tăng nó lên 10 đơn vị mỗi giây.

# 🔑 Giải pháp
Chúng ta sẽ làm điều đó bằng cách điều chỉnh trực tiếp vị trí của chiếc xe.

Chúng ta viết hàm `update()` với đoạn code đơn giản: `car.position += speed`. Ta gán `speed = 10` và bắt đầu chạy, nhưng *đường đi* của ô tô nhanh hơn dự định, ta gán lại `speed` về 0.2

Mọi thứ giờ có vẻ ổn. Chiếc xe đang chạy nhưng sau đó, FPS đột ngột giảm và nó chậm lại. Một giây sau, tất cả trở lại bình thường.

Nếu chơi một mình, bạn có thể không quá để ý vấn đề giật lag này: game bị dừng và xe hơi cũng vậy. Nhưng nếu bạn đang chạy đua với người khác trên mạng - hãy gọi cô ấy là Sarah - cô ấy chơi trên một chiếc máy khoẻ và không gặp phải tình trạng như vậy, qua thời gian lag bạn tăng tốc trở lại ngay lập tức, nhưng bây giờ bạn đã bị tụt lại phía sau rồi.

Vấn đề với đoạn code trên là nó được thực thi mọi khung hình. Chúng ta không đặt tốc độ của ô tô thành 0,2 đơn vị mỗi giây; chúng ta đang đặt nó thành 0,2 đơn vị mỗi khung hình.

Lý do khiến chiếc xe chạy nhanh như chớp lúc ban đầu, trước khi chúng ta điều chỉnh `speed`, là hàm `update()` này được gọi hàng chục lần mỗi giây. Nếu trò chơi chạy ở 50 FPS, điều đó có nghĩa là chiếc xe sẽ chạy với tốc độ 500 đơn vị mỗi giây, thay vì 10 mà chúng ta dự định ban đầu. Cũng như thế khi tốc độ khung hình giảm xuống gần bằng 0, cả giây trôi qua ô tô cũng sẽ không chuyển động.

Bây giờ, hãy tưởng tượng bạn đang quay lại đua với Sarah, nhưng PC của bạn mạnh hơn. Game của bạn chạy với tốc độ khổng lồ 100 FPS thay vì 50. Trong khi Sarah đang lê bước với tốc độ 10 đơn vị mỗi giây (`0.2 * 50 = 10`), bạn khiến cô ấy ho ra bụi với 20 đơn vị mỗi giây của bạn (`0.2 * 100 = 20`). Điều này với bạn có vẻ tốt, nhưng nó không công bằng cho lắm.

Đây là lúc Delta time xuất hiện. **Delta time là thời gian cần để hiển thị khung hình.** Nói cách khác: **delta time là khoảng thời gian giữa khung hình cuối cùng và khung hình hiện tại.**

> Delta có nghĩa là "sự khác biệt".

Giả sử tốc độ khung hình là 50, delta time sẽ luôn là `1 / 50 = 0.02` giây trên mỗi khung hình. Làm thế nào chúng ta có thể áp dụng cái delta time này? Tương tự với kiến thức vật lý thời trung học.

Khi chúng ta viết `car.position += 10 * Time.deltaTime`, chúng ta viết `(10 units) * (0.02 seconds / frame)`, hoặc `0.2 units * seconds / frame`. Vì game chạy ở 50 FPS, nếu viết công thức trên giấy, chúng ta có như sau:
![](https://images.viblo.asia/0e2fefe0-488a-4d45-88c6-38d42963a85d.jpg)

Triệt tiêu `frame` và `second` đi cho nhau, công thức còn lại là `0.2 * 50 = 10` units!

Tất nhiên, hiếm khi các trò chơi chạy ở FPS ổn định. Nhưng khi tốc độ khung hình thay đổi, delta time cũng vậy. Bạn có nhớ sự sụt giảm FPS đột ngột mà bạn đã trải qua không? Vì cả giây trôi qua cho đến khung hình tiếp theo, delta time trong khung hình tiếp theo đó sẽ là 1 giây trên mỗi khung hình - chứ không phải 0.02 như lúc bình thường nữa.

Sau khi lag, thay vì thêm `speed * 0.02` vào vị trí của ô tô, trò chơi sẽ thêm `speed * 1`, hoặc 0,2. Trước mắt bạn, chiếc xe có vẻ như sẽ tốc biến về phía trước sau cú drop FPS đó, nhưng đó là cách nó *sẽ* di chuyển nếu sự giảm đột ngột FPS trên chưa bao giờ xảy ra và bạn sẽ không bị tụt lại phía sau Sarah.

Bây giờ chúng ta có thể tự tin rằng chiếc xe sẽ luôn di chuyển với tốc độ 10 đơn vị mỗi giây và không phải mù quáng tìm kiếm một giá trị "cảm thấy đúng".

# ➕ Ví dụ bổ sung
Một khi bạn hiểu điều này, bạn nhận ra rằng bạn có thể làm được nhiều hơn thế với nó. Ví dụ: gần đây tôi đang làm thử một trò dùng con trỏ kéo một quả bóng và khi bạn buông tay, quả bóng sẽ bay.
![](https://images.viblo.asia/924e69c2-4eb2-4603-90e6-f8bcbfaa5b3e.gif)
Vấn đề là quả bóng sẽ không bay. Tất cả những gì tôi đã làm là làm cho nó di chuyển theo con trỏ chuột khi nhấp vào. Nhưng khi bạn buông tay, quả bóng sẽ ... dừng lại.

Vì vậy, tôi phải đo vận tốc của nó ngay khi tôi buông tay và gán nó theo cách thủ công. Vấn đề là không có cái gọi là vận tốc tại một thời điểm cụ thể nào cả . Theo định nghĩa, vận tốc của một đối tượng mô tả sự thay đổi vị trí. Nó được đo bằng thời gian cần thiết để bao phủ một khoảng cách nhất định (công thức vật lý: `v = S/t`).

Nếu bạn đo trong một giờ, bạn sẽ nhận được một vận tốc, nhưng nó hầu như không mô tả đối tượng tại một thời điểm cụ thể. Thay vào đó, chúng ta muốn khung thời gian càng ngắn càng tốt.

Khoảng cách ngắn nhất mà chúng ta có thể nhận được trong trò chơi là khoảng cách đối tượng được bao phủ trong một khung hình. Và chúng ta có kết quả là 0,2 đơn vị. Vì vậy, tốc độ của nó là 0,2 đơn vị trên mỗi khung hình.

Thật không may, cái này không hỗ trợ các đơn vị trên mỗi khung hình. Nó chạy trên đơn vị mỗi giây. Chúng ta cần chuyển đổi một lần nữa.

Nếu chúng ta giả định tốc độ khung hình ổn định là 50, delta time là 0,02 giây mỗi khung hình. Chúng ta *chia* 0,2 đơn vị mỗi khung hình với 0,02 giây mỗi khung hình, được kết quả như sau:
![](https://images.viblo.asia/41c62ae5-49e6-4a11-bd92-69591a1c6edf.png)

Ta-da! Kết quả bằng 10 đơn vị mỗi giây. Bây giờ chúng ta chỉ cần gán nó cho `car.velocity` (hoặc `rigidbody.velocity`, nếu bạn đang sử dụng Unity).

# ❓ Câu hỏi
Tại sao chúng ta lại nhận được kết quả tính theo *đơn vị* trong bài toán đầu tiên và *đơn vị trên giây* trong bài toán thứ 2?

# ✔ Trả lời
Bởi vì, trong vấn đề đầu tiên, chúng ta đã thay đổi **vị trí**. Mỗi khung hình, chúng ta cần tìm khoảng cách chính xác để tiến tới, sao cho khoảng cách đó tăng lên đến 10 đơn vị sau một giây.

Trong vấn đề thứ hai, chúng ta đã ấn định **vận tốc** khi người chơi buông tay. Chúng ta không chỉ cần khoảng cách (đơn vị) mà còn cần vận tốc (đơn vị trên giây).