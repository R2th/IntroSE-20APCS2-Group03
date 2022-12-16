# Hiệu suất của Constraint Layout
Constraint lauout là một ViewGroup được Google giới thiệu tại Google I/O 2016. Nó thực sự là một ViewGroup mới giúp cho việc giảm thiểu độ sâu của các layout được thiết kế, cùng với đó là giúp cho việc thiết kế bằng kéo thả (design editor) được dễ dàng hơn. Với những lợi ích trên thì khá nhiều lập trình viên Android đã sử dụng Constraint layout như một thói quen và sử dụng nó mọi lúc có thể. Tuy nhiên Contraint layout có thật sự tốt đến như thế và chúng ta có nên lạm dụng Constraint layout trong việc thiết kế. Tôi sẽ đưa ra một số những khía cạnh khác và so sánh Constraint layout với những layout khác. 
# Test
Tôi đã chuẩn bị một số các ví dụ sử dung Constraint layout với version 1.1.3. Với mỗi trường hợp thì bài test sẽ được chạy 1000 lần và kết quả được đưa ra là trung bình của những kết quả trên. Bạn có thể check test code [ở đây](https://github.com/mac229/ConstraintLayoutPerformance/blob/master/app/src/androidTest/java/com/maciejkozlowski/constraintlayoutperformance/LayoutTest.kt).

### 1.  Một ViewGroup và 3 child views nằm dưới nhau
Đầu tiên, tôi có một layout như thế này. Đường bao màu xanh cho thấy một layout với 3 view con.

 ![](https://images.viblo.asia/61fbb0a5-2df7-420d-837e-95b3fc6cf2df.png)
 
 Đây là một trường hợp tiêu biểu của việc sử dụng Linear Layout. Và như các bạn thấy ở biểu đồ bên dưới thì Linear Layout nhanh hơn hẳn Constraint Layout. Quan điểm của tôi trong trường hợp này là những layout được tạo ra để giải quyết những việc cụ thể thường sẽ nhanh hơn các layout được tạo ra để giải quyết các vấn đề tổng quát như Constraint Layout
 
 ![](https://images.viblo.asia/74acaf34-3835-4fb8-b3b2-4d3eaf176d5e.png)
###  2. Tiếp tục thử với một center view
![](https://images.viblo.asia/371d22f5-6948-4868-84b8-c3427ff1a8a1.png)
Tiếp theo ta thử với một trường hợp khác. Nếu như bạn phải sử dụng một view để thiết kế một UI như trên, thì lựa chọn tốt nhất là FrameLayout. Và ví dụ này cho thấy rằng. Nếu chúng chúng ta sử dụng một layout đơn giản nhất để giải quyết vấn đề thì nó chính là lựa chọn tốt nhất cho hiệu suất của chúng ta.

![](https://images.viblo.asia/48c0a828-9d60-4b36-855c-0be60f85821a.png)
### 3. Một layout với 2 view con nằm ở 2 phía khác nhau
![](https://images.viblo.asia/83a36c89-0464-4312-85a7-8be3c477eb64.png)
Kết quả cho thấy rằng Relative Layout là layout cho hiệu suất tốt nhất. Tuy nhiên độ chênh lệch giữa Relative Layout và Linear Layout thật sự nhỏ. Nhưng với Constraint Layout thì khoảng cách là khá đáng kể.

![](https://images.viblo.asia/188a2463-27c6-4b4a-a803-6cca4c6530f1.png)
### 4. Cuối cùng ta thử một view phức tạp một chút
![](https://images.viblo.asia/78eface6-f61f-40ae-8faf-75636527a162.png)

Ở đây tôi đã sử dụng một Constraint Layout trong một trường hợp và trường hợp còn lại là sử dụng 3 Linear Layout lồng nhau. Và thật bất ngờ Constraint Layout cho hiệu suất chậm hơn.

![](https://images.viblo.asia/23d2d6a9-cb82-491d-b82b-7e1b92111a54.png)

Tôi muốn đưa ra thêm 2 ý kiến chủ quan nữa về việc sử dụng Constarint layout
* Theo tôi thấy thì tạo một Constarint layout tốn nhiều thời gian hơn sử dụng các layout truyền thống được tạo ra nhằm giải quyết các vấn đề cụ thể. 
* Thêm nữa theo ý kiến các nhân thì tôi thấy file xml của Constarint layout trong phức tạp hơn và khó đọc hơn và điều đó làm tốn thời gian hơn khi bạn muốn sử code đã có sẵn.
# Tổng kết
Các thử nghiệm của tôi cho thấy rằng Constarint layout chưa hẳn là giải pháp tố cho các bố cục đơn giản. Ta nên sử dụng Constarint layout một cách hợp lý với những bố cụ phức tạp để lại bỏ chiều sâu layout không cần thiết và sử dụng các layout truyền thống để giản quyết vấn đề khi có thể. Tôi chắc chắn rằng Google vẫn sẽ tiếp tục cải thiện Constarint layout trong tương lai để giúp nó có thể đạt hiệu suất tốt hơn nữa. Tôi cũng rất mong chờ điều này. Còn bây giờ thì chúng ta vẫn nên suy nghĩ trước khi sử dụng Constarint layout cho dự án của chúng ta.

Trên đây là những ý kiến các nhân. Nếu bạn có suy nghĩ khác hay đóng góp để bài viết thêm hoàn thiện. Cảm ơn!

ref : https://android.jlelse.eu/constraint-layout-performance-870e5f238100