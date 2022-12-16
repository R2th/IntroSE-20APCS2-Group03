## Kiểm tra "ngắt" (interrupt) trong ứng dụng di động là gì?

Kiểm tra "ngắt" là một nhánh của kiểm tra ứng dụng di động, nó liên quan đến cách ứng dụng phản ứng với sự gián đoạn và tiếp tục trạng thái trước đó.
![](https://images.viblo.asia/e9acbd4e-7e73-4bb7-9a23-ff08810ae2d3.png)

## Tại sao phải kiểm tra "ngắt" (interrupt)?

Điều duy nhất luôn xảy ra khi bạn đang trong một cuộc họp là gì? Bạn bị gián đoạn, phải không? Khi điều đó xảy ra, một số cần một phút để quay lại và một số hoàn toàn mất đi sự suy nghĩ trước đó. Nói một cách đơn giản, kiểm tra "ngắt" cố gắng tìm ra hành vi nào mà ứng dụng của bạn thể hiện.

Kiểm tra "ngắt" áp dụng cho mọi loại ứng dụng - Web, Mobile, Stand Alone, v.v ... Sự đa dạng của các thiết bị, mạng, cấu hình, v.v ... làm cho nó nổi bật hơn cho các ứng dụng Di động so với các ứng dụng khác.

## Các loại gián đoạn trong ứng dụng di dộng.
![](https://images.viblo.asia/fe6e53c3-68e8-4710-9269-36bfcebc5e26.jpg)

Chúng ta đều quen thuộc với các gián đoạn phổ biến thường xảy ra.

Dưới đây là một vài gián đoạn:
* Pin yếu
* Pin đầy - khi sạc
* Cuộc gọi điện thoại đến
* SMS đến
* Thông báo đến từ một ứng dụng di động khác
* Cắm để sạc
* Đã cắm sạc
* Tắt thiết bị
* Nhắc nhở cập nhật ứng dụng
* Báo thức
* Mất kết nối mạng
* Phục hồi kết nối mạng

Danh sách này không đầy đủ nhưng mình nghĩ cũng đã bao gồm các tình huống gián đoạn phổ biến nhất.

## Resolution trong các trường hợp "ngắt" (interrupt)
Expect trong trường hợp xảy ra những gián đoạn này là một trong những điều sau đây:

1. **Run in background** : Sự gián đoạn diễn ra trong khi ứng dụng đang chạy ngầm (background). Nó giành quyền kiểm soát sau khi sự gián đoạn kết thúc. Ví dụ: Cuộc gọi điện thoại / Facetime mà bạn tham dự khi bạn đang đọc sách kỹ thuật số trên iBooks (hoặc ứng dụng tương tự). Khi người dùng trả lời điện thoại, iBooks sẽ đợi cho đến khi hoàn thành và sau đó tiếp tục lại khi cuộc gọi kết thúc.

1. **Show alert. Alert disappears, and you work as usual**. 'Tin nhắn SMS nhận được' - tin nhắn xuất hiện trong tiêu đề. Người dùng không bận tâm về nó và tiếp tục làm việc với ứng dụng như bình thường. Các cảnh báo ứng dụng di động khác, như yêu cầu kết bạn mới trên tin nhắn Facebook hoặc WhatsApp, cũng thuộc danh mục này. Nhưng nếu người dùng quyết định đọc tin nhắn, hành vi được mô tả trong Điểm 1 sẽ được tuân theo. Nếu bỏ qua, trạng thái của ứng dụng là không thay đổi.
1. **Call to Action**: Cảnh báo (alarms) phải được tắt hoặc báo lại trước khi bạn tiếp tục làm việc. Điều tương tự với các thông báo cập nhật ứng dụng. Bạn phải Hủy bỏ hoặc Chấp nhận các thay đổi trước khi tiếp tục. Một ví dụ khác là cảnh báo pin yếu- Bạn có thể chọn tiếp tục như bình thường hoặc chuyển sang chế độ năng lượng thấp (nếu thiết bị cho phép.)
1. **No impact**: Một ví dụ là: nếu kết nối mạng khả dụng và thiết bị của bạn kết nối với nó. Ngoài ra, khi bạn cắm thiết bị của mình để sạc, không cần có cảnh báo hoặc gọi hành động nào. Nó có thể sẽ thực hiện công việc của nó trong khi bạn tiếp tục sử dụng ứng dụng của mình.
Do đó, tùy thuộc vào sự gián đoạn mà bạn đang kiểm tra, hãy hiểu hành vi và xem ứng dụng của bạn có thỏa mãn nó không. Ngoài ra, hành vi được mô tả ở trên không cần phải giống nhau cho tất cả các ứng dụng và thiết bị. Hãy chắc chắn để tìm hiểu chi tiết cụ thể về Ứng dụng di động của bạn.

Bây giờ chúng ta đã hiểu kiểm tra "ngắt" (interrupt) là gì và xác nhận những gì khi tiến hành nó, đã đến lúc nói về cách thực hiện (*Mình xin phép được nêu ở bài viết sau *)


Nguồn: https://www.guru99.com/interrupt-testing.html