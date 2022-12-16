Hey, everybody. Sau một thời gian vắng bóng các bài viết mới. Thì nay, mình đã quay lại rồi đây. Và mình sẽ đem đến một seri hoàn toàn mới mẻ, mới tinh có thể chưa từng có nội dung này trên trang. Đó là một seri về những tip and trick mà mình khám phá được trên chiếc dế yêu của mình, nó sẽ không phải như các trang công nghệ đi rì view điện thoại đâu, sẽ là những tính năng hay ho như cái cách mà một lập trình viên mày mò khám phá các ứng dụng.

Như các bạn có thể thấy rằng với sự phát triển như vũ bão hiện nay, thì chiếc điện thoại cũng có nhiều cải tiến vượt trội. Ngày trước các hồi mới có điện thoại thì đủ chứng năng nghe gọi là quá đủ rồi. Và hồi đó mình luôn có một câu cửa miệng rằng: "Chỉ cần chiếc điện thoại đủ chức năng của nó là quá đủ rầu - không cần gì hơn nữa" , chức năng ở đây là nghe và gọi, (ôi dào tiền không có nên nói vậy đó =)) ). Tuy nhiên từ khi chiếc điện thoại kia không sửa được nữa thì mình đã chuyển lên một chiếc điện thoại mới. Và từ đây cuộc đời thay đổi hẳn. Có quá nhiều thứ thay đổi và khác biệt trên chiếc điện thoại làm mình thấy ngạc nhiên. Nó qua mới mẻ, có nhiều tính năng mới khiến cho chúng ta phần nào đó bị phụ thuộc vào nó, khó có thể rời khỏi nó.

Và rồi, bạn chợt nhận ra là mình không biết code hoặc không code Swift. Vậy thì seri này sẽ giành cho bạn. Bạn và tôi không cần phải biết code nhưng cũng có thể code trực tiếp trên iphone. Bạn có tin vào điều đó không.

Yes, và đó là bài toán mà mình đã đưa ra cho các bạn cùng đọc. Trong các số sắp tới trong seri này mình sẽ đem đến các cách giải quyết giúp bản thân mình và hy vọng các bạn có thể ứng dụng vào thiết bị của các bạn. Mong các bạn ủng hộ và cho mình feedback nhé. ~~ Tun tun ~~

Nào đi vào số đầu tiên thôi nhỉ.

-----

# Tự động hóa thời gian tính giờ làm

## 1. Bài toán
Hiện tại bản thân mình đang làm việc cho một công ty có chế độ flexible time - Có thời gian làm việc linh hoạt. Nghĩa là sao? Tức là thời gian làm việc của bạn không cố định ví dụ 8h có mặt và 18h tan làm, nhưng có một khoảng thời gian core - time: từ 9h - 16h là phải có mặt tại công ty.

Ví dụ: bạn đến cty lúc 8h thì tan làm lúc 16h.

------------------------------ 7h --------------------- 17h.

Và đó 17h là thời gian mà bạn hoàn thành 8h theo đúng hợp đồng lao động của cty, còn được tan làm hay không thì còn phụ thuộc vào nhiều yếu tố ... :v.

Nhưng mà nhiều lúc thời gian đến sẽ là số lẻ, và rồi chúng ta lại phải vắt óc suy nghĩ tính thời gian. Có người sẽ bảo là dễ ẹc ý mà, à dễ thật mà :v. Nhưng mình không thích ngày nào cũng tính có được không. Được nha bạn, bạn tiếp tục đọc tiếp bài của mình nhé.

Và đó là bài toán. Các bạn có nắm được vấn đề không ạ? Và nếu nắm được vấn đề rồi thì chúng ta cùng tiến đến giải pháp cho bài toán trên nào.

## 2. Suy Luận
Nào, Có công cụ nào giải quyết bài toán trên không:
- 1. App thì mình nghĩ nhỏ nhỏ thế này chắc chả có app nào đâu. 
- 2. Xây dựng những phép tính đơn giản và run code `console.log(18 + (8 - startTime))`, cái này cũng vất vả chỉ bớt tư duy, tuy nhiên nó không nhắc nhở được cho bản thân khi đến giờ.
- 3. Tự code app, tool hoặc đi thuê => cái này chắc là không rồi, tốn công tốn xèng, nếu những ai không có nhiều khả năng về code thì chắc không làm được rồi.

=> Và đây, từ đó trick này được ra đời.

## 3. Yêu cầu
Để thực hiện được trick này thì yêu cầu bạn phải có những thứ sau:
- Điều đầu tiên và tiên quyết là có iphone :v - do mình sử dụng iphone nên cũng chưa có trải nghiệm trên samsung hoặc các máy khác, Khi vọng các bạn đóng góp.
- Sử dụng hệ điều hành IOS bản từ 13 trở lên có cài đặt được shortcuts app
- Cài đặt Shortcut app - ứng dụng có sẵn của iphone, do apple build

![](https://images.viblo.asia/a5e4e544-6464-4006-a45e-7ba60d0cb116.jpg)

## 4. Sơ qua về shortcuts app
Siri Shortcuts (hay tạm dịch là Phím Tắt) là ứng dụng chính chủ Apple, cho phép người dùng thể thiết lập những câu lệnh đơn giản để thực hiện các tác vụ mong muốn, thông qua việc thiết lập những câu lệnh cụ thể trong ứng dụng và người dùng có thể điều khiển bằng Siri.

![](https://images.viblo.asia/6e7a4047-ca81-4230-85b5-987f0fe5147c.png)

Shortcuts là một tính năng hay trên iOS nhưng ở Việt Nam ít ai sử dụng đến. Shortcuts sẽ giúp bạn tuỳ biến cách sử dụng iPhone một cách hiệu quả hơn, thông minh hơn, được cá nhân hoá hơn. Là một công cụ tạo theo dạng “Work Flow” cho phép người dùng được tạo các hành động sử dụng iPhone mỗi ngày vào chung một chuỗi, gọi là chuỗi “Shortcuts”.

Mỗi Shortcuts sẽ có một chức năng khác nhau do chính bạn thiết lập ra, đồng thời cũng có một số Shortcus có sẵn trong thư viện của App về các hành động hằng ngày cơ bản như chụp ảnh, tạo ảnh grid, tạo Gif, chỉ đường, nhắn tin nhanh, vân vân…

Ví dụ nhu cầu cá nhân: Mình muốn một buổi sáng dậy mình có thể nghe được dự báo thời tiết của ngày đó
- Tự động mở Wi-fi
- Nhắc nhở mình hôm đó cần phải là gì (đã tạo Reminders trước đó)
- Nghe các bài nhạc năng động cho buổi sáng hứng khởi
- Thì đó là những chuỗi hành động do chính mình tự đề ra và mình có thể gom lại trong Shortcuts. Mình tự set up các nhu cầu đó vô và đặt tên cho Shortcuts đó là “Good Morning” và bấm Add to Siri để khi mình gọi Siri thì Shortcuts đó sẽ hoạt động.

Một ví dụ khác như mình muốn chụp hình một sự vật đang diễn ra để up Facebook ngay, từ trước giờ mình phải vào Camera – Chụp – Bấm vào Facebook – Chọn Post bài – Chọn ảnh. Thì những thao tác trên rất lâu và mất thời gian, có khi mình lại không kịp chụp ngay cái khoảnh khắc mà mình muốn.

![](https://images.viblo.asia/0b49aa6b-f2b5-4af4-98f3-9ee92907a6b7.png)

Và với sự ghép nối với widget, chỉ cần có thể là bạn có thể tự động xây dựng app cá nhân cho riêng bạn rồi đó, mà không cần phải biết code.

Và đây, sẽ là link hướng dẫn việc sử dụng cơ bản các bạn có thể tham khảo: [shortcuts app by thegioididong](https://www.thegioididong.com/hoi-dap/shortcuts-tren-ios-12-la-gi-1136562)

## 5. Giải quyết bài toán
Đầu tiên chúng ta sẽ xác định một mốc thời gian cố định giờ đến và giờ tan, điều này giúp cho việc thuận tiện tính thời gian. Như mình thì mình chọn mốc thời gian cố định là: Giờ đến 8h30 và giờ tan là 17h30 (8h30 -> 12h, và 13h -> 17h30), 1h nghỉ trưa. Như vậy là đủ 8 tiếng.

Có mỗc thời gian rồi thì bây giờ làm gì? Chúng ta sẽ suy luận một chút để đưa ra công thức tính. Như các bạn đã biết thì thời gian tan làm phụ thuộc thời gian đến và độ chênh lệch thời gian đến với mốc 8h30 chính là độ chênh lệch đối với thời gian tan làm với mốc 17h30.

Ví dụ: 

| Giờ đến | Độ chênh lệch (8h) | Giờ tan |  Độ chênh lệch (17h30) |
| -------- | -------- | -------- | -------- |
| 8h     | `30' = 8h30 - 8h`     | 17h30     | `17h = 17h30 - 30'`     |
| 9h     | `-30' = 8h30 - 9h`     | 17h30     |` 17h = 17h30 - ( -30')`    |

Và rồi ta có công thức: `Giờ tan = 17h30 - (8h30 - Giờ đến)`. Easy phải không. :v: :v: :v: :v: :v:

Tiếp đến, làm thế nào để có thể tính toán đơn giản, không cần phải nhập thời gian bằng cơm, có thể lưu lại thời gian của lúc đến, và nhắc nhở khi qua thời gian. Lúc này chúng ta lại nghĩ đến data lưu ở DB, nhớ nó ghê á. Cơ mà như phần đầu mình có đề cập, không cần cài thêm bất kỳ extention nào nữa và cũng ko cần DB - hệ quản trị CSDL luôn. Ớ mài bị ngu à - thế lưu ở đâu á, hay tau phải tự nhớ?

![](https://images.viblo.asia/db3f8805-37fa-4bec-ae7a-c32c4e5f3719.jpg)

Tất nhiên là không cần extention nào và cũng ko cần nhớ nha. Sẽ có 1 chút magic ở đây. Mình sẽ sử dụng ứng dụng nhắc nhở có sẵn trên iphone làm thứ lưu lại thời gian đến và thực hiện alert thì đến thời gian. DB - ứng dụng nhắc nhở. Có gì đó sai sai. Bạn không tin đúng không? Vâng đúng chúng ta có thể tạo mới được nhắc nhở và coi như là DB đó. Cách làm như thế nào sẽ có ở phần triển khai nha.

## 6. Triển khai
Và dưới đây là cách mình setting, mình sẽ giải thích trên từng câu lệnh:

LINE1: Đầu tiên mình sẽ lọc trong reminders (tạm gọi là DB) để check xem ngày hôm nay mình đã check done time chưa. Cách lọc thì mình dựa vào thời gian hôm nay và tiêu đề là "Done time" (- tiêu đề này mình tự đặt sao cho dễ lọc nhất).
![](https://images.viblo.asia/dfd0b28a-537d-44d9-ad6f-07dd43287d37.jpg)

LINE2: Đây là 1 câu lệnh if lấy thông tin từ DB trên, kiểm tra xem ngày hôm nay đã tồn tại done time chưa. Nêú chưa thì vào trong if.
![](https://images.viblo.asia/a47fbe8b-3329-4d7f-99d8-70761cb99df2.jpg)

LINE3: Lấy sự thay đổi của thời gian mình check với 8h30 với đơn vị thay đổi là phút.
![](https://images.viblo.asia/5fdc93c5-59d1-40b5-b590-d6b34f57a76a.jpg)

LINE4: Sau đó lấy 17h30 trừ đi với kết quả trên là ra thời gian kết thúc.
![](https://images.viblo.asia/180fa884-ef70-443a-9668-51c8525690ef.jpg)

LINE5: Ở bước này mình tạo một remider với những thông tin phù hợp với LINE1 và có thêm nhắc nhở khi đến giờ.
![](https://images.viblo.asia/50923b19-fb5d-4488-8917-b6cd3429eba8.jpg)

LINE6: Ở bước này, mình cho hiển thị 1 thông báo trên màn hình để mình nhìn là biết ngay thời gian.
![](https://images.viblo.asia/ab6c890c-e8c8-448c-9341-195d70aa8660.jpg)

LINE7: Để cho chắc cú hơn, mình sẽ cho siri đọc thời gian cho mình luôn. Đầu tiên là cài đặt âm lượng lên 50%.
![](https://images.viblo.asia/447c178c-fb09-4a38-be07-bbdecbec78eb.jpg)

LINE8: Cho Siri hót
![](https://images.viblo.asia/db2517b0-5cc5-41f2-92d3-eb135c10495d.jpg)

LINE9: Tắt âm lượng. Khá tiện mình không cần quan tâm đã tắt âm lượng chưa khi làm.
![](https://images.viblo.asia/ca587730-b97c-451b-8517-aed100e5be73.jpg)

LINE10: Khi đã tồn tại bản ghi reminder - đã check done time.
![](https://images.viblo.asia/ecae7924-789f-4da6-9891-f8931d868cd7.jpg)

LINE11: Thì hiển thị noti trên màn hình đã kiểm tra, nếu sai thì xóa item reminder đi và check lại.
![](https://images.viblo.asia/3f6d39eb-3ee9-49bb-b181-f3b5a780446b.jpg)

LINE12: Và kết thúc.
![](https://images.viblo.asia/1cfd0cc8-b612-4133-8244-831afab5bb7c.jpg)

## 7. Thành quả
Và dưới đây là thành quả, vì page không cho đưa ảnh gif dung lượng quá 6MB và không cho up video vậy nên mình tải tạm ảnh gif lên public, nếu bạn muốn xem demo thì coi link dưới né:

[demo](https://gfycat.com/niftysevereamericancreamdraft)
![https://gfycat.com/niftysevereamericancreamdraft](https://gfycat.com/niftysevereamericancreamdraft)

Đánh giá: vậy là mình đã thiết kế được hoàn chỉnh 1 tool cho phép mình biết được thời gian, nhắc nhở mình, tránh cho việc mình quên chấm công đến và về tránh mất thì giờ đi kiểm tra. Sau quá trình sử dụng mình thấy ổn. Tool này chỉ ứng dụng mục đích cá nhân.

Ngoài ra chúng ta có thể tự động hóa việc chạy này bằng cách auto khi điện thoại connect với wifi công ty thì chạy job này. Nhưng mà hên sui, lúc nó connect wifi ổn định lúc thì không. Mà nếu tự động thì vãn có thể quên chấm công.

Hy vọng tip này có thể giúp bạn có hướng để phát triển những tool hữu ích cho bản thân mình hơn từ công cụ remider và shortcuts. Hy vọng bạn thấy hữu ích. Chúc bạn ngày mới vui vẻ và nhiều hạnh phúc.

-----

Ở những số sau mình sẽ đem đến những tip khác để tự động hóa được "dế yêu" của bạn. Giúp cho cuộc sống đơn giản hơn. 

Tạo ra nhiều giá trị sáng tạo cho một thế giới đơn giản và tuyệt vời hơn!

TunTun

TuanLinhChi