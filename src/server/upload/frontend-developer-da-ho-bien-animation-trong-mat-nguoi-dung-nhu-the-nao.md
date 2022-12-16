Xin chào các bạn,

Đã lâu không gặp, sau một tháng mình đã quay trở lại với một tâm thế khác. Chả là mấy hôm trước mình có vô tình đọc được một bài viết khá hay liên quan đến phần UI/UX, ắt hẳn là một frontend-developer thì UI/UX cũng là một phần rất đáng được quan tâm trong quá trình làm việc của các bạn. Chỉ UI tốt thôi thì chưa đủ, hoặc chỉ UX thôi thì cũng không được. “Một giao diện đẹp nhưng khó sử dụng là một ví dụ UI tốt và UX tồi. Trái lại, một sản phẩm dễ sử dụng với giao diện xấu lại là ví dụ cho UX tốt và UI tồi.” Làm sao để trải nghiệm người dùng với sản phẩm của mình cảm thấy thoải mái, dễ dàng sử dụng?
Vì vậy, bài hôm nay mình sẽ đá đưa một chút về một số tips animation tối ưu nhất trong UX. Let's go !! :muscle:

### 1. Thời gian và tốc độ của animation
Khi các yếu tố thay đổi trạng thái hoặc vị trí của chúng, thời gian của animation phải đủ chậm để người dùng có khả năng nhận thấy sự thay đổi, nhưng đồng thời đủ nhanh để không phải chờ đợi.
![](https://images.viblo.asia/74902e76-a7b0-4dca-8e33-c20e4b4e2373.gif)
Nhiều nghiên cứu đã phát hiện ra rằng tốc độ tối ưu cho animation của giao diện là từ 200 đến 500 ms. Những con số này được dựa trên những phẩm chất đặc biệt của bộ não con người. Bất kỳ animation nào ngắn hơn 100 ms đều mang cảm giác dịch chuyển tức thời và sẽ không được công nhận. Trong khi đó, animation dài hơn 1 giây sẽ truyền đạt cảm giác chậm trễ và do đó sẽ nhàm chán cho người dùng.

![](https://images.viblo.asia/5532a618-a895-4187-844f-121da8ec6ee6.gif)
Trên thiết bị di động, Đối với máy tính bảng, thời lượng phải dài hơn 30% - khoảng 400–450 ms. Lý do rất đơn giản: kích thước của màn hình lớn hơn khiến các đối tượng cần thêm thời gian để vượt qua con đường dài hơn khi chúng thay đổi vị trí. Trên thiết bị đeo được, thời lượng phải ngắn hơn 30% - khoảng 150-200 ms, bởi vì trên màn hình nhỏ hơn, khoảng cách đi lại ngắn hơn.

![](https://images.viblo.asia/2baca28d-3a34-46fe-8fd4-ea59317f0da3.gif)

Animation trên web được xử lý theo một cách khác. Vì chúng ta đã quen với việc mở các trang web gần như ngay lập tức trong một trình duyệt, chúng ta cũng mong đợi chuyển nhanh giữa các trạng thái khác nhau. Vì vậy, thời lượng chuyển đổi web sẽ kéo dài khoảng 2 lần so với trên thiết bị di động.Trong các trường hợp khác, người dùng chắc chắn sẽ nghĩ rằng máy tính bị treo hoặc gặp sự cố với kết nối internet.

Nhưng. Hãy quên đi các quy tắc này nếu bạn đang tạo ra animation trang trí trên trang web của mình hoặc cố thu hút sự chú ý của người dùng đến các yếu tố nhất định. Trong những trường hợp này, animation có thể dài hơn.

![](https://images.viblo.asia/4d4f4b50-b05e-499b-9bda-166eeb3ada88.gif)


Bạn cần phải nhớ rằng bất kể nền tảng nào thì thời lượng của animation sẽ không chỉ phụ thuộc vào khoảng cách đi mà còn phụ thuộc vào kích thước của đối tượng. Các đối tượng nhỏ hơn hoặc animation với những thay đổi nhỏ nên di chuyển nhanh hơn. Theo đó, các animation với các yếu tố lớn và phức tạp có vẻ tốt hơn khi nó kéo dài lâu hơn một chút.

Trong trường hợp, khi có animation va chạm giữa các phần tử, ví dụ như hình bên dưới. Tốt hơn là loại trừ hiệu ứng nảy lên. Chỉ sử dụng nó trong trường hợp đặc biệt khi nó có ý nghĩa.

![](https://images.viblo.asia/1e34fd06-8a61-4778-b30d-f0a989e53cc9.gif)

Chuyển động của các đối tượng phải rõ ràng và sắc nét nên không sử dụng chuyển động mờ (motion blur của After Effects). Rất khó để tái tạo hiệu ứng ngay cả trên các thiết bị di động hiện đại và nó không được sử dụng trong animation giao diện.
![](https://images.viblo.asia/b7dd5875-16e1-43d4-bcd3-345a18467808.gif)

Các mục danh sách (thẻ tin tức, danh sách email, v.v.) sẽ có độ trễ rất ngắn giữa diện mạo của nó. Mỗi lần xuất hiện của phần tử mới sẽ kéo dài từ 20 đến 25 ms. Sự xuất hiện chậm hơn của các yếu tố có thể làm người dùng cảm giác phải chờ đợi không cần thiết.
![](https://images.viblo.asia/62fe4eb2-190b-4db3-8309-b596e0f9cc23.gif)

## 2. Easing - Liner
### 2.1. Easing
Easing giúp làm cho chuyển động của vật thể tự nhiên hơn. Đó là một trong những nguyên tắc cơ bản của hoạt hình, được mô tả kỹ lưỡng trong cuốn sách Ảo ảnh của cuộc sống: Disney Animation, được viết bởi hai họa sĩ hoạt hình chính của Disney - Ollie Johnston và Frank Thomas.

Đối với các animation không có trong thực tế và do con người tạo ra, các đối tượng nên di chuyển với một số tăng tốc hoặc giảm tốc - giống như tất cả các đối tượng sống trong thế giới vật lý.
![](https://images.viblo.asia/b7dd5875-16e1-43d4-bcd3-345a18467808.gif)

### 2.2. Liner motion
Các đối tượng không bị ảnh hưởng bởi bất kỳ lực vật lý nào di chuyển tuyến tính, nói cách khác là tốc độ không đổi. Và chỉ vì thực tế này liner trông rất không tự nhiên và giả trong mắt người dùng.

Tất cả các ứng dụng có animation sử dụng đường cong chuyển động. Mình sẽ cố gắng giải thích cách đọc chúng và ý nghĩa của chúng. Đường cong chỉ ra cách vị trí của đối tượng (trục y) thay đổi trong cùng khoảng thời gian (trục x). Trong trường hợp hiện tại, chuyển động là tuyến tính, vì vậy vật thể di chuyển cùng một khoảng cách cùng một lúc.

![](https://images.viblo.asia/49e5f2a8-f5a3-40f1-b729-b3342c1c2910.gif)

Ví dụ, chuyển động tuyến tính có thể được sử dụng chỉ khi đối tượng thay đổi màu sắc hoặc độ trong suốt của nó. Nói chung, chúng ta có thể sử dụng nó cho các trạng thái khi một đối tượng không thay đổi vị trí của nó.

### 2.3. Ease-in hoặc đường cong tăng tốc (Ease-in or acceleration curve)
Chúng ta có thể thấy trên đường cong ở đầu vị trí của vật thể thay đổi chậm và tốc độ tăng dần. Điều đó có nghĩa là đối tượng đang chuyển động với một gia tốc nhất định.

![](https://images.viblo.asia/5649a0bc-0850-49d5-ba3e-73dc76159624.gif)

Đường cong này nên được sử dụng khi các vật thể bay ra khỏi màn hình ở tốc độ tối đa. Đó có thể là thông báo hệ thống. Nhưng hãy nhớ rằng loại đường cong như vậy chỉ nên được sử dụng khi các đối tượng rời khỏi màn hình mãi mãi và chúng tôi không thể bị gọi lại hoặc quay lại.

![](https://images.viblo.asia/39bd0bc1-d8ca-44ea-9c6a-3a3df19fc932.gif)

Đường cong animation giúp thể hiện tâm trạng phù hợp. Trong ví dụ dưới đây, chúng ta có thể thấy rằng thời gian di chuyển và khoảng cách cho tất cả các đối tượng là như nhau, nhưng ngay cả những thay đổi nhỏ trong đường cong cũng cho bạn khả năng ảnh hưởng đến trạng thái của animation.
![](https://images.viblo.asia/1b3b18d4-3b9f-453a-88b7-b46e73ccb142.gif)

Và tất nhiên, bằng cách thay đổi các đường cong, bạn có thể di chuyển đối tượng tương tự như giống ở thế giới thực.

### 2.4. Ease-out hoặc đường cong giảm tốc (Ease-out or deceleration curve)
![](https://images.viblo.asia/a0d338f4-ec39-4874-b6ea-8821c2ff80a0.gif)

Loại đường cong này nên được sử dụng khi các đối tượng xuất hiện trên màn hình - nó di chuyển lên trên màn hình ở tốc độ tối đa, dần dần chậm lại cho đến khi nó dừng hoàn toàn. Điều này cũng có thể được áp dụng cho các thẻ hoặc đối tượng khác xuất hiện từ bên ngoài màn hình.

![](https://images.viblo.asia/a5d607e8-7f9f-440f-8048-861a8e605a65.gif)

### 2.5. Ease-in-out hoặc đường cong tiêu chuẩn (Ease-in-out or standard curve)
Đường cong này làm cho các đối tượng đạt được tốc độ ngay từ đầu và sau đó từ từ thả nó về không. Kiểu chuyển động đó thường được sử dụng nhất trong animation giao diện. Bất cứ khi nào bạn đặt câu hỏi loại chuyển động nào sẽ sử dụng cho animation của mình, hãy sử dụng đường cong chuẩn.

![](https://images.viblo.asia/32d8e246-d2f9-49a8-aaec-a2529ad08308.gif)


Theo Nguyên tắc thiết kế Material Design, tốt hơn nên sử dụng đường cong bất đối xứng để làm cho chuyển động trông tự nhiên hơn và thực tế hơn. Sự kết thúc của đường cong phải được nhấn mạnh hơn điểm bắt đầu của nó, do đó thời gian tăng tốc ngắn hơn tốc độ chậm lại. Trong trường hợp này, người dùng sẽ chú ý nhiều hơn đến chuyển động cuối cùng của đối tượng và đến trạng thái mới của nó.

![](https://images.viblo.asia/958bf7f8-53fd-41a2-b588-286069f2a77a.gif)


Dễ sử dụng khi các đối tượng chuyển từ một phần của màn hình sang một phần khác của màn hình. Trong trường hợp này, animation sẽ tránh được sự theo dõi của mắt và ấn tượng.

![](https://images.viblo.asia/39bd0bc1-d8ca-44ea-9c6a-3a3df19fc932.gif)


Cùng một loại chuyển động nên được sử dụng khi đối tượng biến mất khỏi màn hình nhưng người dùng có thể trả lại nó về vị trí trước đó bất kỳ lúc nào. Giống như ví dụ ở dưới về menu left.
![](https://images.viblo.asia/802320ee-4b46-44b6-af0a-d3ae5d53c241.gif)

Từ những ví dụ này theo một nguyên tắc cơ bản mà nhiều người mới bắt đầu bị quên mất đó là - animation bắt đầu không bằng với animation kết thúc. Như trong trường hợp với left menu - nó xuất hiện với đường cong giảm tốc và biến mất với đường cong tiêu chuẩn. Bên cạnh đó, theo Thiết kế Vật liệu của Google, thời gian xuất hiện của đối tượng sẽ lâu hơn để thu hút nhiều sự chú ý hơn.

![](https://images.viblo.asia/35f43279-45d9-49eb-8a36-89c1000d3351.gif)

## Kết Luận:
Và thế là cũng tới kết bài, cảm ơn các bạn đã kiên nhẫn theo dõi tới đây, mình mong rằng một số hướng dẫn tối ưu nhất về animation trong UX mình liệt kê trên đây có thể giúp ích phần nào cho bạn trong quá trình làm việc. Mình chỉ nêu một số những animation hay được sử dụng, nếu muốn biết thêm chi tiết, hay truy cập vào bài viết dưới đây nhé: [The ultimate guide to proper use of animation in UX](https://uxdesign.cc/the-ultimate-guide-to-proper-use-of-animation-in-ux-10bd98614fa9)

Xin cảm ơn !

### Reference:
 - [The ultimate guide to proper use of animation in UX](https://uxdesign.cc/the-ultimate-guide-to-proper-use-of-animation-in-ux-10bd98614fa9)