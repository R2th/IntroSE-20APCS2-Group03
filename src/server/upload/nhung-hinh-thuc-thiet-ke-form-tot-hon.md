### Những lỗi phổ biến mà các nhà thiết kế mắc phải và cách khắc phục chúng

![](https://cdn-images-1.medium.com/max/5760/1*VvQeOFsY57NJxtZmKyRnHA.jpeg)

Cho dù đó là một luồng đăng ký, một multi-view stepper hoặc giao diện nhập dữ liệu đơn thuần. Form (biễu mẫu) là một trong những thành phần quan trọng nhất của thiết kế sản phẩm kỹ thuật số. Bài viết này tập trung vào những thứ Dos (nên làm) và Don'ts (không nên làm) trong thiết kế Form. Vui lòng ghi nhớ rằng đây chỉ là những hướng dẫn chung và tất nhiên là sẽ có những ngoại lệ cho mọi quy tắc.

## Form nên có 1 cột

![](https://cdn-images-1.medium.com/max/6138/1*XhzxeTnAuWoaeJmlPBP0bw.jpeg)
*Chúng ta thường hay nhìn vào Website theo một hướng từ trên xuống. Vì thế việc có nhiều cột sẽ phá vỡ Vertical Momentum (động lực dọc) của người dùng.*

## Label (nhãn) căn chỉnh lên trên

![](https://cdn-images-1.medium.com/max/5760/1*tnR_OXAKMJW8S9cqRy416A.jpeg)
*Người dùng thường hoàn thành Form được gắn Label được căn chỉnh lên trên với tỷ lệ cao hơn rất nhiều so với những thứ có Label được căn trái. Khả năng giải thích của Label khi được căn chỉnh lên trên cũng tốt hơn ở trên Mobile. Tuy nhiên, hãy cân nhắc sử dụng Label căn trái cho mục địch nhập vào tập dữ liệu lớn với những tùy chọn thay đổi, vì mắt người dùng sẽ dễ dàng quét hơn, độ cao cũng được gảm xuống, và tính nhắc nhở điền vào Form sẽ cao hơn khi để Label căn chỉnh lên trên.*

## Nhóm Label với Input của nó lại gần nhau hơn

![](https://cdn-images-1.medium.com/max/5760/1*obwyjb54NCWy3sOPfm2WEg.jpeg)
*Trình bày Label và Input gần với nhau và đảm bảo có đủ chiều cao giữa các trường để người dùng không bị nhầm lẫn.*

## Tránh việc tất cả ký tự đều CAPS LOCK (viết hoa)

![](https://cdn-images-1.medium.com/max/5760/1*w6nZOf5pZSha6FoWu3YtRw.jpeg)
*Tất cả ký tự đều Caps Lock thì sẽ gây khó đọc và mắt khó nhìn hơn.*

## Hiển thị tất cả các Options (tùy chọn) nếu số lượng tùy chọn là nhỏ hơn 6

![](https://cdn-images-1.medium.com/max/5760/1*VvQeOFsY57NJxtZmKyRnHA.jpeg)
*Đặt tùy chọn trong Drop-down sẽ yêu cầu người dùng nhấp vào 2 lần để hiển thị danh sách và ẩn tùy chọn. Sử dụng một Input Selector (Select Option Element) nếu như ở đó có nhiều hơn 5 tùy chọn. Ngoài ra, nên kết hợp tìm kiếm theo ngữ cảnh trong Drop-down nếu có nhiều hơn 25 tùy chọn. (kiểu như thư viện giao diện của thư viện Select2 chẳng hạn)*

## Không nên sử dụng Placeholder để làm Label

![](https://cdn-images-1.medium.com/max/5760/1*XvUnJwHtQhJ3Wl8Apj9lhQ.jpeg)
*Nó thật ý tưởng hấp dẫn để tối ưu hóa không gian bằng cách sử dụng Placeholder giống như một Label. 
Tuy nhiên điều này gây ra nhiều vấn đề về Usability (tính khả dụng), cái mà đã được tóm tắt bởi Katie Sherwin of Nielsen Norman Group.
(https://www.nngroup.com/articles/form-design-placeholders)*

## Đặt các Checkbox (và Radio) bên dưới nhau để mắt người dùng có thể dễ dàng quét được.

![](https://cdn-images-1.medium.com/max/5760/1*VLqTEZP8OrH24FooksePbQ.jpeg)
*Đặt Checkbox bên dưới nhau cho phép mắt dễ dàng nhìn thấy được.*

## Tạo các mô tả CTA (call to action)

![](https://cdn-images-1.medium.com/max/5760/1*VzlN4tj2hQRUel2iNzM9dw.jpeg)
*Cần nêu rõ Call to action (Lời kêu gọi hành động) đối với hạng mục hiển thị, liên kết hay Button.*

## Xác định lỗi Inline

![](https://cdn-images-1.medium.com/max/5760/1*-NXH_4cKK_ngIgrcqShTbg.jpeg)
*Hiển thị cho người dùng nơi xảy ra lỗi và cung cấp lý do.*

## Sử dụng Inline Validation sau khi người dùng nhập hết các trường (trừ khi nó giúp họ nhanh hơn trong khi xử lý điền Form)

![](https://cdn-images-1.medium.com/max/5760/1*aGO8yGo2jqu9XgntfFvlsQ.jpeg)
*Không sử dụng Inline Validation trong khi người dùng đang nhập. Trừ khi nó gợi ý giúp người dùng nhanh hơn, chẳng hạn như trong trường hợp tạo mật khẩu, username hoặc Message có đếm số ký tự.*

## Không nên để ẩn Text trợ giúp cơ bản

![](https://cdn-images-1.medium.com/max/5760/1*D2A7FGZdYdtt9YC1q7IAUw.jpeg)
*Đưa ra Text trợ giúp ở bất cứ nơi nào có thể. Đối với Text  trợ giúp phức tạp thì nên xem xét đặt nó bên cạnh Input khi đang ở trạng thái Focused.*

## Phân biệt Action chính với những cái thứ cấp

![](https://cdn-images-1.medium.com/max/5760/1*STZ7rbj0wO5u2sn0bsR-KQ.jpeg)
*Có một cuộc tranh luận mang tính triết học về việc liệu có nên đưa vào tùy chọn phụ (thứ cấp) hay không.*

## Sử dụng độ dài trường dài quá mức cần thiết

![](https://cdn-images-1.medium.com/max/5760/1*3rOjyzcj68Dm7badROWuxg.jpeg)
*Độ dài của Field nên phù hợp với độ dài của câu trả lời. Sử dụng cho các trường mà ở đó có độ dài xác định trước như số điện thoại, mã zip ...*

## Bỏ (*) đối với trường bắt buộc và biểu thị những trường tùy chọn

![](https://cdn-images-1.medium.com/max/5760/1*riNfOVAxTChvaQ29n-6IPQ.jpeg)
*Người dùng không biết những gì được ngụ ý trong dấu trường bắt buộc (\*) . Thay vào đó, tốt hơn là biểu thị cho họ biết những trường tùy chọn.*

## Nhóm thông tin liên quan

![](https://cdn-images-1.medium.com/max/5760/1*1mPIcYr9ZMmZ4g2Ayf5BPA.jpeg)
*Người dùng thường nghĩ theo từng đợt (batch), và những Form dài sẽ khiến họ quá sức và cảm thấy mệt mỏi. Bằng cách tạo các nhóm Logic, người dùng sẽ hiểu được các Form nhanh hơn nhiều.*

## Why ask ?

Bỏ qua các trường tùy chọn và nghĩ ra các cách khác tinh tế hơn để thu thập dữ liệu người dùng. Luôn tự hỏi chính bản thân bạn rằng, liệu câu hỏi có thể nên được suy luận, hoãn lại hoặc loại trừ hoàn toàn ra khỏi Form.

Việc nhập dữ liệu ngày càng tự động. Ví dụ, thiết bị di dộng và thiết bị đeo thu thập một lượng lớn dữ liệu mà không cần có ý thức của người dùng. Hãy nghĩ về những thứ cách mà bạn có thể tận dụng về mạng xã hội, giao diện người dùng trò chuyện, SMS, email, voice, OCR, định vị, dấu vân tay, sinh trắc học v.v

##  Make it fun

Cuộc sống rất ngắn ngủi và không ai muốn điền vào Form cả. Hãy trò chuyện nhiều hơn, hài hước, dần dần Engage với người dùng và làm điều bất ngờ (Aha moment). Đó là vai trò của nhà thiết kế để thể hiện thương hiệu của công ty họ và để khơi gợi phản ứng cảm xúc của người dùng. Nếu nó được thực hiện đúng và chỉ cần đảm bảo rằng bạn không vi phạm các quy tắc được liệt kê ở trên thì tôi nghĩ rằng tỷ lệ hoàn thành Form sẽ tăng hơn nhiều lần.

*Thank you for reading. Vui lòng Share nếu bạn thích bản dịch này và hãy chia sẻ suy nghĩ của bạn nhé! Hy vọng bạn cũng thích những bài dịch khác của tôi.*

Source: [Andrew Coyle](https://medium.com/nextux/design-better-forms-96fadca0f49c)