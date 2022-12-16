## Kiểm thử gián đoạn là gì?
Kiểm thử gián đoạn là một phần của Kiểm thử ứng dụng dành cho thiết bị di động giải quyết cách ứng dụng phản ứng với gián đoạn và tiếp tục lại trạng thái trước đó của nó.

## Tại sao bạn cần Kiểm thử gián đoạn?
Một điều hầu như luôn xảy ra khi bạn đang họp là gì? Bạn bị gián đoạn, phải không? Khi điều đó xảy ra, một số người thậm chí không chớp mắt, một số người cần một phút để quay lại, và một số người mất hoàn toàn suy nghĩ. Nói cách đơn giản, Kiểm thử gián đoạn cố gắng tìm ra hành vi mà ứng dụng của bạn sẽ phản ứng.

Gạt tất cả sang một bên trong một giây và xem xét một tình huống thực tế khác. Giả sử bạn sở hữu một đèn pin và BẬT nó. Pin hết, là sự gián đoạn đối với trạng thái đang hoạt động hiện tại của nó. Thay pin và khôi phục lại nó. Đèn pin sẽ BẬT trở lại như bình thường. Đây là trường hợp sử dụng. Một danh sách kiểm thử tập trung vào việc điều này có xảy ra hay không gọi là Kiểm thử gián đoạn​.

Kiểm thử gián đoạn áp dụng cho bất kỳ loại ứng dụng nào - Web, Di động, Stand Alone, v.v. Sự đa dạng về thiết bị, mạng, cấu hình, v.v. làm cho ứng dụng Di động trở nên nổi bật hơn những ứng dụng khác.

## Các loại gián đoạn trong ứng dụng di động
Tất cả chúng ta đều quen thuộc với những gián đoạn phổ biến thường xảy ra.

![](https://images.viblo.asia/1f830fc8-d970-4e16-97f1-4c2e5dfaafcb.jpg)

Dưới đây là một số gián đoạn:

* Pin yếu
* Pin đầy - khi sạc
* Cuộc gọi đến
* SMS đến
* Thông báo đến từ một ứng dụng di động khác
* Đã cắm để sạc
* Đã cắm sạc
* Thiết bị tắt
* Lời nhắc cập nhật ứng dụng
* báo thức
* Mất kết nối mạng
* Khôi phục kết nối mạng

Danh sách này không đầy đủ nhưng bao gồm các tình huống phổ biến nhất.

## Giải quyết trong trường hợp bị gián đoạn
Hành vi dự kiến ​​trong trường hợp có những gián đoạn này là một trong những hành vi sau:

**1. Chạy trong nền**: Gián đoạn diễn ra trong khi ứng dụng ở chế độ chạy nền. Nó giành được quyền kiểm soát sau khi kết thúc gián đoạn. 

Ví dụ: Một cuộc gọi điện thoại / Facetime mà bạn tham gia khi đang đọc sách kỹ thuật số trên iBooks (hoặc ứng dụng tương tự). Khi người dùng trả lời điện thoại, iBooks sẽ đợi cho đến khi hoàn tất và sau đó tiếp tục khi cuộc gọi kết thúc.

**2. Hiển thị cảnh báo**: Cảnh báo biến mất và bạn làm việc như bình thường. 'Đã nhận SMS'- tin nhắn xuất hiện trong tiêu đề. Người dùng không bận tâm về nó và tiếp tục làm việc với ứng dụng như bình thường. Các cảnh báo ứng dụng di động khác, chẳng hạn như yêu cầu kết bạn mới trên Facebook hoặc tin nhắn WhatsApp, cũng thuộc loại này. Nhưng nếu người dùng quyết định đọc thông báo, hành vi được mô tả trong trường hợp 1 sẽ được tuân theo. Nếu bỏ qua, trạng thái của ứng dụng là không thay đổi.

**3. Kêu gọi hành động** : Báo thức phải được tắt hoặc báo lại trước khi bạn tiếp tục làm việc. Điều tương tự với các thông báo cập nhật ứng dụng. Bạn phải Hủy hoặc Chấp nhận các thay đổi trước khi tiếp tục. Một ví dụ khác là cảnh báo pin yếu - Bạn có thể chọn tiếp tục như bình thường hoặc chuyển sang chế độ nguồn điện thấp (nếu thiết bị cho phép.)

**4. Không ảnh hưởng**: Ví dụ là: nếu kết nối mạng khả dụng và thiết bị của bạn kết nối với nó. Ngoài ra, khi bạn cắm thiết bị của mình để sạc, không cần cảnh báo hoặc bước kêu gọi hành động. Nó có thể sẽ thực hiện công việc của mình trong khi bạn tiếp tục sử dụng ứng dụng của mình.

Do đó, tùy thuộc vào sự gián đoạn mà bạn đang tiến hành kiểm thử, hãy hiểu hành vi và xem liệu ứng dụng của bạn có đáp ứng nó hay không. Ngoài ra, hành vi được mô tả ở trên không cần giống nhau đối với tất cả các ứng dụng và thiết bị. Hãy nhớ tìm hiểu chi tiết cụ thể về Ứng dụng dành cho thiết bị di động của bạn.

Bây giờ chúng ta đã hiểu Kiểm thử gián đoạn là gì và những gì cần xác thực khi tiến hành nó, đã đến lúc nói về cách thực hiện.

## Cách thực hiện Kiểm thử gián đoạn
Nhìn vào câu này: iBooks phải chạy ở chế độ nền khi người dùng nhận được cuộc gọi đến.

Bạn sẽ không gọi đây là một yêu cầu chức năng của ứng dụng iBooks chứ? 

Vì vậy, Kiểm thử gián đoạn là một tập hợp con của Kiểm thử chức năng cho một ứng dụng di động. Và, để tiến hành Kiểm thử gián đoạn, bạn sẽ tuân theo cùng một Khung và Công cụ Kiểm tra Ứng dụng Di động. Đó là kỹ năng của người kiểm thử để hình thành các kịch bản này. Sau khi hoàn tất, bạn sẽ thiết kế các Test cases và thực thi theo cách chính xác như bất kỳ loại kiểm thử nào khác.

Để biết thêm thông tin về Kiểm tra ứng dụng dành cho thiết bị di động, hãy xem: https://www.guru99.com/mobile-testing.html

Cuối cùng, tôi muốn giải quyết một câu hỏi nữa trước khi chúng ta kết thúc bài viết này:

## Kiểm thử gián đoạn có giống như Kiểm thử phục hồi - Recovery Testing không?
Không, không phải vậy. Kiểm thử phục hồi là xác nhận việc khôi phục từ lỗi. Kiểm thử gián đoạn không nhất thiết là một thất bại - failure. Nó chỉ là một sự distraction - phân tâm.

Nó giống như sự khác biệt giữa dấu phẩy và dấu chấm trong tiếng Anh. 

Đúng vậy, chúng ta chỉ cần biết và bắt đầu với Kiểm thử gián đoạn - Một phần quan trọng và trực quan của Kiểm thử ứng dụng dành cho thiết bị di động


----------------*Nguồn: https://www.guru99.com/interrupt-testing.html *-----------------