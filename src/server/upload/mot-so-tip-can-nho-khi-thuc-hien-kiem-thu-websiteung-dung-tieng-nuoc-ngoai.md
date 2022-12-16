Bạn là một Tester và bạn không biết ngôn ngữ gì khác ngoài tiếng Việt và  tiếng Anh nhưng bạn phải thực hiện kiểm thử 1 website/ ứng dụng.. tiếng nước ngoài mà  bạn không hề biết. 

Ví dụ như: tiếng Nhật, tiếng Thái Lan , Tây ban nha, Ấn độ ...vv..  Và hẳn công việc này sẽ đem đến cho bạn nhiều phiền toái ban đầu vì bạn không thể hiểu được ý nghĩa của website hay ứng dụng đang thực hiện test. Nhưng đừng hoang mang, dù là bất kì ngôn ngữ nào, bạn cũng sẽ dễ dàng vượt qua được với những tip sau đây:

## 1. Tìm hiểu và nắm vững spec 
Việc đầu tiên bạn cần làm là tìm hiểu spec, hiểu các yêu cầu của hệ thống. Việc làm này sẽ giúp bạn có cái nhìn bao quát nhất về công việc mình phải làm, bạn sẽ dễ dàng nắm bắt mọi thứ hơn trước khi bắt tay vào thực hiện test. Nếu spec là tiếng nước ngoài, hãy thử công cụ hỗ trợ như google để hiểu nội dung của spec. Trường hợp bạn rất khó khăn trong việc tìm hiểu  hãy nhờ tới sự giúp đỡ của comtor, Brse, hoặc các tester cùng team nhé.  
Đừng ngần ngại hỏi về các vấn đề trong bước đầu này. 

## 2. Sử dụng các công cụ hỗ trợ
Việc tìm hiểu 1 website hay ứng dụng toàn bộ là tiếng nước ngoài dễ làm cho bạn bị "choáng" vì website hay ứng dụng chứa rất nhiều nội dung mà bạn chưa hiểu. Các button, text, các component này.. có ý nghĩa là gì ? Chắc chắn bạn sẽ tự hỏi như vậy. Vậy thì hãy sử dụng ngay các công cụ hỗ trợ việc dịch website hay ứng dụng sang tiếng Việt/ hoặc tiếng anh để dễ dàng nắm bắt nội dung của chúng hơn.
Các công cụ phổ biến mà bạn có thể sử dụng để dịch : Google translate, Ddict..
Có thể nhiều bạn không chú ý rằng trong ứng dụng Google Translate có một tính năng đó là nhận diện ngôn ngữ bằng kí tự.
Bạn chỉ việc chụp lại ảnh màn hình bạn cần dịch, sau đó ứng dụng quét xong hình ảnh nó sẽ nhận diện những từ ngữ có trong hình ảnh đó và việc bạn cần làm đó là sử dụng ngón tay để chạm vào những từ hay đoạn văn bản mà bạn cần dịch.

![](https://images.viblo.asia/40918b8a-2662-488f-ae5f-6051fee3e215.jpg)

Từ việc hiểu được ý nghĩa các button, text, các component ... bạn sẽ dần dần làm quen được với  từng vị trí của chúng trên website/ứng dụng bạn đang thực hiện kiểm thử.

## 3. Ghi nhớ vị trí của text, button trong từng màn hình  
Khi đã có thể hiểu được text, hay button này dùng để làm gì, dần dần bằng việc thực hiện các hoạt động trên website/ứng dụng bạn sẽ ghi nhớ được vị trí của từng text, button mà không cần thực hiện dịch cả website hay ứng dụng nữa. Để có thể làm được điểu này, bạn cần có thời gian, vì vậy , hãy bắt đầu bằng việc ghi nhớ các button/ text lớn/quan trọng trước, hiểu ý nghĩa của nó, sau đó hãy tìm hiểu các button/text.. ít quan trọng hơn. Và vì đây là 1 công việc cần có thời gian, vì vậy hãy luôn kiên trì nhé. 

## 4. Nhập liệu bằng tiếng nước ngoài 
Các website hay ứng dụng hầu như đều phải tương tác với phần nhập liệu, input dữ liệu tiếng Nhật như input thông tin đầu vào để đăng ký, chat, gửi email,... Bạn hãy thử nhập dữ liệu bằng ngôn ngữ này để dễ dàng làm quen với chúng hơn. Và hơn nữa việc thực hiện kiểm thử bằng ngôn ngữ này là 1 case không thể thiếu trong khi thực thi test. Đối với các ngôn ngữ không sử dụng chữ latinh, hãy nhớ sử dụng các công cụ chuyển đổi bàn phím để có thể nhập liệu nhé. 

Ví dụ như đối với tiếng nhật, bạn có thể dùng Google Japanese Input:  khá tiện dụng, tương đối gọn nhẹ, đơn giản.

## 5. Chú ý tới timezone hoặc location tại nước ngoài
Khi test 1 website hay ứng dụng nước ngoài, bạn sẽ gặp trường hợp lệch giờ với Việt Nam, hoặc website hay ứng dụng test yêu cầu vị trí tại nước bạn. Vậy làm sao để giải quyết được vấn đề này ? giải pháp là:

- Hãy nhớ chuyển đổi múi giờ trên thiết bị test. Chỉ đơn giản với vài thao tác Setting bạn sẽ có được bất cứ giờ UTC nào cần kiểm thử.
- Bạn chỉ cần dùng ứng dụng fake GPS để thiết lập vị trí bạn đang ở Japan hay bất kỳ nơi nào mong muốn.
Chức năng của những ứng dụng này cho phép giúp bạn giả lập vị trí dùng để check-in facebook, instagram, foursquare, Google map…, dùng để test phần mềm (ví dụ cần định vị giữa khách hàng và bên cung cấp dịch vụ). Bạn chỉ mất vài giây để có thiết lập vị trí mới của mình trên bản đồ tại vị trí mà bạn cần. 

Một vài ứng dụng fake Location (GPS):
Fake Location Map
Fake GPS Location Spoofer Free
..
![](https://images.viblo.asia/7fb06ad8-60cc-4da9-b57d-2d201fd8df74.jpg)

Ngoài ra, có 1 vài lưu ý các bạn cũng cần quan tâm như sau:

+ Tận dụng việc sử dụng các công cụ để search 1 text (button, label...) trong spec, xem có hiển thị trên màn hình không ? Vì khi nhìn những chữ cái chưa quen rất dễ bị nhầm lẫn.
+ Chú ý kiểm tra layout khi chuyển ngôn ngữ (VD: Anh -> Nhật) vì cỡ chữ to hơn, dễ bị vỡ layout.
+ Chú ý các dấu ký tự đặc biệt khi chuyển từ đổi giữa ngôn ngữ này với ngôn ngữ khác (VD: thường hay có lỗi ở dấu | )

## 6. Học ngôn ngữ thứ 3
Việc học ngôn ngữ thứ 3 không phải việc dễ dàng, nhưng nếu đó là một ngôn ngữ có thể giúp đỡ bạn lâu dài trong công việc thì tại sao không? 
Hãy thử học thêm về ngôn ngữ này để có thể thực hiện việc kiểm thử 1 cách dễ dàng và đơn giản hơn nhé, và nó cũng có thể giúp bạn biết thêm 1 ngôn ngữ mới giúp ích cho mình sau này. 
![](https://images.viblo.asia/834935dc-2656-4702-98e1-fa2ad33621a8.jpg)

Trên đây là những tip nhỏ giúp bạn có thể dễ dàng thực hiện kiểm thử 1 website hay ứng dụng dễ dàng và nhẹ nhàng hơn. Hi vọng chúng sẽ giúp bạn trong công việc và sớm làm quen với ngôn ngữ mới nhé!