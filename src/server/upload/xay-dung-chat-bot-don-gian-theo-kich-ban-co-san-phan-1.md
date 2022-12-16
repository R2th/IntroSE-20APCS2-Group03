## I. Đặt vấn đề
- Hiện nay, hệ thống trả lời tin nhắn tự động, hay hệ thống điện thoại tự động được áp dụng
trong rất nhiều các kênh bán hàng, trang web bán hàng, các dịch vụ tư vấn trực tuyến, … Để
giảm bớt chi phí cho đội ngũ TeleSale, việc sử dụng ChatBot thay cho con người là ứng dụng rất
quan trọng.
- Các bài toán xây dựng ChatBot đã được đưa vào thực tiễn khá nhiều, càng ngày ChatBot càng
được cải tiến, thông minh, tiện lợi hơn.
- Dưới đây là bài viết xây dựng ChatBot đơn giản theo kịch bản có sẵn, sử dụng với mục đích tư
vấn, đưa ra các chọn lựa cho khách hàng

## II. Về Chatbot
Workflow của 1 Chatbot:

![](https://images.viblo.asia/99f8b602-f755-40e2-9870-8adc135661fa.png)

- Translator : Dịch yêu cầu của user, giúp máy tính hiểu được yêu cầu mình cần thực hiện → quyết định việc chatbot có thông minh hay không.
- Respondent: Xử lý yêu cầu, thành phần này giúp khả năng của chatbot không bị giới hạn, máy tính làm được gì thì chatbot cũng làm được như vậy.
- Processor: Nhận output và đóng gói gửi trả lại messenger platform, trả lại cho người dùng kết quả.

## III. Xây dựng kịch bản 

Kịch bản được phía bên tư vấn cung cấp.

Ví dụ về 1 kịch bản:
![](https://images.viblo.asia/e8884647-b9d5-408c-924d-cf02554b8f09.png)

Một kịch bản gồm các thành phần (các **Node**):
- Câu kích hoạt: câu hỏi chủ đề.
- Bot hỏi (nói).
- Người dùng trả lời (yêu cầu).
- Bot Xử lý lấy kết quả.

Định dạng **Node** khi lưu trữ:
- Câu kích hoạt:
```
id::start::<câu kích hoạt>::next::
```
- Bot nói :
```
id::speak::<câu nói>::next::
```
- Người dùng trả lời:
```
id::listen::<câu nói>::next0::<lựa chọn 1>::next1::<lựa chọn 2>::next2:: ... ::
```
- Bot xử lý:
```
id::solve::<function>::<kết quả 1>::next1::<kết quả 2>::next2:: ... ::
```

Trong đó :
- **id**: id của **Node**
- **next**: id của **Node** kế tiếp theo kịch bản
- **next1**, **next2**, ... : id của **Node** kế tiếp tương ứng với lựa chọn 1, 2, …
- **next0**: id của **Node** kế tiếp trong trường hợp người dùng phải nhập câu trả lời.

Các **Node** được liên kết với nhau qua **id Node**, và xây dựng thành kịch bản theo luồng kịch bản
gốc. Quản lý luồng kịch bản qua **id Node**, biết được vị trí **Node** hiện tại, và các hướng đi khi lựa chọn.

## IV. Các phương pháp thực hiện

- **So khớp**: So khớp giữa câu nói của người dùng với câu dạng tổng quát trong CSDL.

Ví dụ: "Tôi muốn hỏi về hợp đồng mua bán điện?" khớp với câu "* hỏi * hợp đồng * điện *"
- **Keyword/Value extraction:**

Trích xuất Keyword/Value trong câu:

Ví dụ: 

"Tôi muốn đặt lịch vào ngày 1/1/2019" => Value: "1/1/2019"

"Tôi cần tư vấn về hồ sơ" => Keyword: "tư vấn",  "hồ sơ"

- Xác định **Node**:

1. Câu kích hoạt (start): Xác định câu kích hoạt. So khớp để xác nhận câu kích hoạt.
2. Bot nhận câu trả lời (listen): Tìm từ trong câu, Keyword/Value extraction để lấy câu trả lời khớp với các lựa chọn
hoặc dạng value.
3. Xử lý (solve): Bot gọi hàm xử lý bằng api.
4. Trả lời (speak): Speak (text)

## V. Tạm kết

Trên đây là ý tưởng của mình được áp dụng trong việc xây dựng một Chatbot theo kịch bản của khách hàng. Do thời gian có hạn, mình sẽ diễn giải cụ thể hơn, và demo một chút cho mọi người trong bài viết tiếp theo nhé :D .