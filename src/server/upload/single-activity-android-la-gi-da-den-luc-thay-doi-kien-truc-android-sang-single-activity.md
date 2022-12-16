# I, Tổng quan
* Trong Android, các component ở mức application level như Content Provider, Broadcast Receiver, Service, Activity...
* Activity điểm truy cập chính của user vào giao diện UI. Do đó khi chúng ta sử dụng app, chúng ta cũng đang chạy ít nhất 1 Activity.
* Năm 2016, android framework team member là Diane Hackborn đã có phát biểu là:
```
Once we have gotten into this entry-point to your UI, we really don’t care how you organize the flow inside
```
* Điều này có nghĩa là:
    * Android framework không nên quan tâm tới cấu trúc của app như API level...
    * Chúng ta cần phải cung cấp 1 start destination cố định cho Android framework start app.
* Vấn đề lớn ở đây là gì ?
* Chúng ta sẽ không biết default aniimation của Activity là gì. Chúng dựa vào nhiều yếu tố:
    * Android version (Android API).
    * Theme của app.
    * Loại device của các hãng.
* Nếu sử dụng multi activity, liệu chúng ta đã sử dụng được hết sức manh của ViewModel chưa ? Liệu việc sharing data đã hiệu quả ?
# II, Animation
* **Ví dụ**: Property animation được thêm vào từ API 11 trở lên. Do phần cứng hạn chế, loại device... sẽ không cho phép Android team đưa Property animation hỗ trợ Activity ở những API sớm hơn.
```
If(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP){
    // Apply activity transition with 5.0 and higher
    val intent = Intent(this, Activity2::class.java)
    val options = ActivityOptions.makeSceneTransitionAnimation(this, androidRobotView, "robot")
    startActivity(intent, options.toBundle())
} else {
    // Swap without transition
}
```
* Trong ví dụ trên mình start **Activity2** sử dụng shared element transition nhưng đáng tiếc là nó chỉ hỗ trợ từ API 5.0 trở lên :sweat_smile:.
* Các API trước 5.0 sẽ không được hỗ trợ animation này.
* Nếu user sử dụng trên device với API 16 và 22 thì sao, sẽ có khác biệt về Animation, họ sẽ không hiểu và cho đó là bug hay 1 thứ gì đó đó đại loại như thế.

# III, Sharing data
 **1, Mutlitple Activity**
 
![](https://images.viblo.asia/fe4ee70c-2ab6-49fc-b0fe-3dff00d37876.png)
* Nếu như chúng ta thay đổi Activity 1 và muôn notify cho Activity 2 thì sao ?
* Như đã nói rằng Activity là thành phần ở application level. Các application level khác như Service, Broadcast Receiver...sẽ biết và có thể tương tác với chúng (bảo mật).
* Hơn nữa việc share data ở mức application level sẽ khiến data tồn tại phụ thuộc vào application lifecycle. Trong khi chúng ta chỉ muốn nó gắn ở mức Activity như start Activity 2 từ Activity 1 thì sharing data sẽ bị clear.
* Trong trường hợp này developer muốn xây dựng một kiến trúc đúng đắn và phù hợp ? Đó là gì ? Câu trả lời chính là multi destination trong 1 Activity.

 **2, Multiple destination trong 1 Activity**
 
![](https://images.viblo.asia/ad08498c-4149-4356-bb04-1da565f39eaa.png)
* Chúng ta thay thế các Activity bằng các destination.
* Vấn đề được đề cập ở trên được giải quyết nhanh chóng qua **shared ViewModel** để giao tiếp giữa các destination.
* Không còn application scope, giờ chỉ là Activity scope :+1:.

**3, Destination là gì ?**
* Nó đơn giản chỉ là 1 phần của giao diện UI. Phổ biến nhất là Fragment.
* Fragment là thành phần sinh ra với mục đích tạo ra nhiều destination trong 1 Activity.
* Trường hợp phổ biến nhất là: User đi từ screen này đến screen khác nhưng chỉ thay đổi 1 phần của UI như Fragment (destination) nhưng vẫn giữ nguyên ActionBar, BottomNavigation, BottomAppBar...

# IV, Tổng kết
* Hi vọng bài viết này sẽ giúp mọi người hiểu sâu hơn về Single Activity mà Google recommend.
* Nó đặc biệt hiệu quả khi chúng ta kết hợp với Navigation.
* Trên thực tế, các Animation mình đã test thì chúng rất smooth và đẹp có phần đồng bộ hơn rất nhiều so với multiple Activity.
* Mọi người có thể tham khảo các app của Google từ Android 8.0 trở lên đã xem chúng hoạt động thế nào nhé.
* Lưu ý: Vẫn có những case chúng ta nên sử dụng multiple Activity thay vì sử dụng multiple destination.
* Happy coding :grinning:.