## Dịch bệnh đáng sợ

Tình hình dịch bệnh ngày càng đáng sợ, chưa thấy dấu hiệu sẽ chấm dứt trong thời gian gần.
Đặc biệt gần đây dịch bệnh đã lan ra khắp toàn cầu và đặc biệt dịch đã bùng phát mất kiểm soát ở Hàn quốc(3526 ca/17 người tử vong) và Italia (1128 ca/29 người tử vong) vào ngày 01-03-2020.

Cũng chưa hề có bằng chứng khoa học nào chứng minh dịch sẽ giảm vào mùa hè như virus cúm thông thường khác.

**Liệu rằng còn mất thêm bao lâu để chúng ta có thể chiến thắng dịch bệnh này.**

Có hai lý do khiến chúng ta lo ngại Covid-19 chính là mối đe dọa:

- nCoV có khả năng lây lan chóng mặt, cao hơn các dịch MERS và SARS trong quá khứ.

- Dữ liệu đến nay cho thấy tỷ lệ tử vong là khoảng 1%. 1 con số rất báo động.

## Phòng chống thế nào

Có câu phòng bệnh hơn chữa bệnh, hiện tại Việt nam đang phòng chống dịch rất quyết tâm và triệt để.

Tại các nước phát triển như Nhật bản, Hàn quốc, hay các nước châu âu. Có lẽ vấn đề tự do cá nhân cũng như đánh đổi của việc phát triển kinh tế khiến việc phòng dịch của các nước này không hề thấy quyết tâm như tại Việt nam. Tại thời điểm hiện tại có thể thấy việc quyết tâm của chúng ta đã cho thấy sự đúng đắn.

Hiện chưa có thuốc đặc trị và vắc xin, nên cách chống dịch rất cần được quan tâm.

Chúng ta hãy tự bảo về mình và cộng đồng bằng cách:

- Hạn chế tối đa việc ra ngoài
- Tránh tụ tập nơi đông người
- Cần đeo khẩu trang khi ra ngoài và rửa tay thường xuyên
- Tự cách ly khi có dấu hiệu ho, sốt

## Dịch vụ hỏi đáp

Do dịch tình hình phức tạp, nên mình muốn triển khai 1 hệ thống hỏi đáp để thường xuyên cập nhật thông tin, ghi nhớ những vấn đề trọng điểm.

### Ý tưởng

- Dịch vụ sẽ đưa ra các câu hỏi hay được quan tâm
- Hệ thông đưa ra câu trả lời và các lời khuyên
- Triển khai nhanh, cập nhật thông tin dễ dàng
- Có thể triển khai ở mọi nơi
- Nội dung public để mọi người cùng nhau cập nhật

### Giải quyết

Ý tưởng rất nhiều nhưng thực hiện như nào có lẽ không dễ dàng.
Rất vui mình xin giới thiệu hệ thống tạo chatbot hoàn toàn
miễn phí và triển khai dễ dàng tại

https://botviet.asia/dich-vu/chatbot#custom

## Chatbot

### Mở đầu

Tại `Xây dựng cuộc hội thoại` các bạn thử nhập đoạn dưới đây (gọi là đoạn mở đầu) vào và ấn nút `Test Chatbot` để xem cách hoạt động của bot nhé

```yaml
-
  -   Dịch vụ hỏi đáp COVID-19
  - |
      Các câu hỏi thường gặp
      ["COVID-19 là gì", "Cách phòng tránh", "Tình hình hiện tại ra sao"]
```

Kết quả:

![botviet.asia](https://images.viblo.asia/13085be4-3156-42ec-9bcb-7fe922144faf.PNG)

Vậy với 2 thao tác trên đã tạo ra được giao diện chatbot hoạt động rồi.

**Giải thích 1 chút :** `Xây dựng cuộc hội thoại` là nơi chúng ta định nghĩa chatbot hoạt động.

Cuộc hội thoại viết trên định dạng file **YAML**.
Và do đó YAML là kiến thức cần có duy nhất để bạn có thể làm ra 1 chatbot cho bản thân.

Ai chưa biết yaml là gì thì tham khảo thêm [tại đây](https://iamvon.github.io/iamvon.github.io/2017/05/29/yaml/)

**Chú ý** là file yaml thì không được sử dụng phím tab tạo khoảng trắng đầu dòng, do đó hãy sử dụng phím cách nhé.

Tiếp tục xây chatbot nào.

Đoạn trên ta đã xây xong được câu hỏi cho chatbot rồi, tiếp ta sẽ xây dựng câu trả lời.

### Trả lời

Thêm đoạn dưới đây xuống dưới đoạn mở đầu, nhấn `Test Chatbot`

```yaml
-
  -   COVID-19 là gì
  - |
      Virus corona gây hội chứng hô hấp cấp tính nặng 2, viết tắt <b>SARS-CoV-2</b> được Tổ chức Y tế Thế giới gọi là virus <b>COVID-19</b>
      là bệnh viêm phổi do virus corona mới bởi Trung Quốc (tiếng Anh: Novel Coronavirus Pneumonia, NCP)[1] và bệnh viêm phổi Vũ Hán
      Virus SARS-CoV-2 được cho là có nguồn gốc từ động vật nhưng phương thức lây truyền chủ yếu của nó hiện nay là lây truyền từ người sang người, thường được truyền thông qua các giọt dịch hô hấp mà con người hắt hơi, ho hoặc thở ra
```

Kết quả:

![botviet.asia](https://images.viblo.asia/844229ff-40e4-42ac-ab32-edd1f577c540.PNG)

### Trick

Để sau khi kết thúc câu trả lời, có thể hỏi lại các câu hỏi khác. hãy thêm đoạn dưới đây vào dưới cùng câu trả lời

```yaml
      ["COVID-19 là gì", "Cách phòng tránh", "Tình hình hiện tại ra sao"]
```

![botviet.asia](https://images.viblo.asia/2e27935c-4a3c-40ab-9527-49df4f77d528.PNG)

### Release

Sau khi chatbot đã hoạt động theo đúng ý bạn, ấn nút `Release`

*Nếu bạn chưa có tài khoản, tạo mới tài khoản trong 1 thao tác nhé.*

![botviet.asia](https://images.viblo.asia/4d8bada1-ef24-4b55-aee8-5f610a2133bb.PNG)

### Triển khai lên Website của mình

Như hướng dẫn trên hình, hãy chèn 2 dòng code này vào [website](https://bijinclothes.com/danh-muc/dam-vintage) của bạn.

```html
<script src="https://botviet.asia/chatbot/static/sdk.min.js?20200301"></script>
<div id="botviet" data-email="botviet.asia.public@gmail.com" data-chatbot-id="300" data-auto-show-dialog="1" />
```

Chèn ngay vào dưới thẻ `<body>` nhé. Hoặc tốt hơn nếu hiểu về cấu trúc html hãy chia ra `<script>` vào trong thẻ `<head>`
nhé.

![botviet.asia](https://images.viblo.asia/4bc58663-1ed8-4032-af1b-8747b3cbbaa7.PNG)

Mở website của bạn lên, bot sẽ tự hoạt động như hình

![botviet.asia](https://images.viblo.asia/7a669770-28c8-4c07-90d6-e0f3e07fa947.PNG)

### Public

https://botviet.asia/dich-vu/chatbot#home?id=300

chỉ với đoạn HTML này, bất kỳ ai cũng có thể sử dụng được bằng cách chèn vào website của mình.

```html
<script src="https://botviet.asia/chatbot/static/sdk.min.js?20200301"></script>
<div id="botviet" data-email="botviet.asia.public@gmail.com" data-chatbot-id="300" data-auto-show-dialog="1" />
```

Mình cũng public tài khoàn này để ai cũng có thể thay đổi nội dung cho chatbot được.

[Đăng nhập](https://botviet.asia/dang-nhap) với tài khoản
botviet.asia.public@gmail.com
Pass: 123456@abc

Vào Menu chatbot (click vào logo của website trên cùng bên trái) và click vào chatbot >> nút Sửa (icon bút chì)

Hi vọng mọi người hãy cập nhật thông tin về dịch bệnh cùng mình.

## Kết

Bài viết dài, câu văn lủng củng. Cảm ơn mọi người đã đọc tới đây.

Mình sẽ thường xuyên update nội dung cho con bot này.

**Note:**

Nếu muốn thêm câu hỏi mới, hãy tìm all các đoạn tương tự và sửa cùng nhé.
ví dụ: thêm câu hỏi `Dấu hiệu của người bệnh`

Sửa tất cả:  ["COVID-19 là gì", "Cách phòng tránh", "Tình hình hiện tại ra sao"]

Thành :   ["COVID-19 là gì", "Cách phòng tránh", "Tình hình hiện tại ra sao", "Dấu hiệu của người bệnh"]

**Update nội dung Chatbot**

```yaml
# Đoạn mở đầu
-
  -   Dịch vụ hỏi đáp COVID-19
  - |
      Các câu hỏi thường gặp
      ["COVID-19 là gì", "Tỷ lệ tử vong do Covid-19", "Cách phòng tránh", "Tình hình hiện tại ra sao"]

# Quest: COVID-19 là gì
-
  -   COVID-19 là gì
  - |
      Virus corona gây hội chứng hô hấp cấp tính nặng 2, viết tắt <b>SARS-CoV-2</b> được Tổ chức Y tế Thế giới gọi là virus <b>COVID-19</b>
      là bệnh viêm phổi do virus corona mới bởi Trung Quốc (tiếng Anh: Novel Coronavirus Pneumonia, NCP)[1] và bệnh viêm phổi Vũ Hán
      Virus SARS-CoV-2 được cho là có nguồn gốc từ động vật nhưng phương thức lây truyền chủ yếu của nó hiện nay là lây truyền từ người sang người, thường được truyền thông qua các giọt dịch hô hấp mà con người hắt hơi, ho hoặc thở ra
      WHO: Tỷ lệ tử vong do Covid-19 là 3,4%
      Tổ chức Y tế Thế giới công bố tỷ lệ bệnh nhân Covid-19 tử vong là 3,4%, cao hơn nhiều so với mức ước tính 2% hồi đầu dịch. 
      Cập nhật vào ngày 1/3
      Thế giới đã có 65 quốc gia có người bị nhiễm Covid-19
      có 86927 người mắc bệnh viêm đường hô hấp cấp do chủng mới virus corona (Covid-19) và 2.982 người tử vong
      ["COVID-19 là gì", "Tỷ lệ tử vong do Covid-19", "Cách phòng tránh", "Tình hình hiện tại ra sao"]

# Quest: Tỷ lệ tử vong do Covid-19
-
  -   Tỷ lệ tử vong do Covid-19
  - |
      Các bệnh nhân ở nhóm tuổi 80 trở lên có 14,9% tử vong
      các bệnh nhân tuổi 70 là 8%.
      bệnh nhân tuổi 50-59 có tỷ lệ tử vong 1,3%, cao gấp ba lần những người tuổi 40.
      Thanh niên lứa tuổi 30 cũng như nhóm từ 10 đến 19 tuổi, tỷ lệ tử vong do virus này là 0,2%
      Người mắc bệnh tim bị tăng 10% nguy cơ chết nếu mắc Covid-19, ở người tiểu đường là 7%. 
      Tỷ lệ tử vong ở các bệnh nhân nam là 2,8%, nữ 1,7%
      ["COVID-19 là gì", "Tỷ lệ tử vong do Covid-19", "Cách phòng tránh", "Tình hình hiện tại ra sao"]

# Quest: Cách phòng tránh
-
  -   Cách phòng tránh
  - |
      Hạn chế tối đa việc ra ngoài
      Tránh tụ tập nơi đông người
      Cần đeo khẩu trang khi ra ngoài và rửa tay thường xuyên
      Tự cách ly khi có dấu hiệu ho, sốt
      ["COVID-19 là gì", "Tỷ lệ tử vong do Covid-19", "Cách phòng tránh", "Tình hình hiện tại ra sao"]

# Quest: Tình hình hiện tại ra sao
-
  -   Tình hình hiện tại ra sao
  - |
      ["Thế giới", "Việt Nam", "Trung Quốc", "Nhật Bản", "Hàn Quốc", "Italy", "Pháp"]

# Thế giới
-
  -   Thế giới
  - |
      Cập nhật vào ngày 4/3
      WHO: Tỷ lệ tử vong do Covid-19 là 3,4%
      Tổ chức Y tế Thế giới công bố tỷ lệ bệnh nhân Covid-19 tử vong là 3,4%, cao hơn nhiều so với mức ước tính 2% hồi đầu dịch. 
      ["Lịch sử", "Thế giới", "Việt Nam", "Nhật Bản", "Hàn Quốc", "Italy", "Pháp"]
  -   Lịch sử
  - |
      Cập nhật vào ngày 3/3
      Covid-19 xuất hiện ở 76 quốc gia, vùng lãnh thổ trên thế giới, khiến gần 91.000 người nhiễm bệnh, 3.124 người chết.
      Cập nhật vào ngày 1/3
      Thế giới đã có 65 quốc gia có người bị nhiễm Covid-19
      có 86927 người mắc bệnh viêm đường hô hấp cấp do chủng mới virus corona (Covid-19) và 2.982 người tử vong
      ["Thế giới", "Việt Nam", "Trung Quốc", "Nhật Bản", "Hàn Quốc", "Italy", "Pháp"]
# Việt Nam
-
  -   Việt Nam
  - |
      Cập nhật 6/3
      Bệnh Covid-19 xuất hiện ở Hà Nội
      Một phụ nữ ở Hà Nội đi du lịch vùng dịch Italy, về nước hôm 2/3 không khai báo y tế, được xác định dương tính nCoV tối nay.
      Cơ quan chức năng đã phong tỏa phố Trúc Bạch khi cô gái 26 tuổi tạm trú ở đây được xác định là ca dương tính nCoV thứ 17 tại Việt Nam.
      ["Lịch sử", "Thế giới", "Việt Nam", "Trung Quốc", "Nhật Bản", "Hàn Quốc", "Italy", "Pháp"]
  -   Lịch sử
  - |
      Cập nhật vào 8h30 sáng 2/3
      18 ngày qua, Việt Nam chưa phát hiện thêm ca nhiễm mới. 16 bệnh nhân Covid-19 tại Việt Nam hiện đều khỏi bệnh.
      Đến 8h30 sáng 2/3, Việt Nam có 115 người nghi nhiễm nCoV đang được cách ly tại bệnh viện, nhiều nhất trong vòng một tháng qua.
      Sáng 2/3, học sinh THPT của 59 tỉnh thành đã trở lại trường sau một tháng nghỉ phòng tránh Covid-19, tuy nhiên nhiều em vắng mặt.
# Trung Quốc
-
  -   Trung Quốc
  - |
      Cập nhật vào ngày 1/3
      Trung Quốc thêm 573 ca nhiễm, 35 ca tử vong
      nâng tổng số ca nhiễm và số người chết trong dịch COVID-19 của Trung Quốc lên lần lượt là 79.824 và 2.870
      ["Thế giới", "Việt Nam", "Trung Quốc", "Nhật Bản", "Hàn Quốc", "Italy", "Pháp"]
# Nhật Bản
-
  -   Nhật Bản
  - |
      Cập nhật vào ngày 3/3
      Nhật có 980 người nhiễm Covid-19 (gồm cả du thuyền Diamond Princess)
      ["Lịch sử", "Thế giới", "Việt Nam", "Trung Quốc", "Nhật Bản", "Hàn Quốc", "Italy", "Pháp"]
  -   Lịch sử
  - |
      Cập nhật vào ngày 1/3
      Nhật thêm 1 người chết nâng số người chết lên 6 (không tính du thuyền Diamond Princess)
      ["Thế giới", "Việt Nam", "Trung Quốc", "Nhật Bản", "Hàn Quốc", "Italy", "Pháp"]
# Hàn Quốc
-
  -   Hàn Quốc
  - |
      Cập nhật vào ngày 4/3
      Hàn Quốc chiều nay thông báo ghi nhận thêm 293 trường hợp nhiễm nCoV, đưa tổng số ca nhiễm trên cả nước lên 5.621.
      ["Lịch sử", "Thế giới", "Việt Nam", "Trung Quốc", "Nhật Bản", "Hàn Quốc", "Italy", "Pháp"]
  -   Lịch sử
  - |
      Cập nhật vào ngày 3/3
      Hàn Quốc có 26 trường hợp tử vong và tổng số ca nhiễm lên tới 4.812
      Cập nhật vào ngày 2/3
      Hàn Quốc chiều nay ghi nhận thêm 123 ca nhiễm nCoV, trong đó 4 ca tử vong, nâng tổng số trường hợp nhiễm ở nước này lên 4.335.
      ["Thế giới", "Việt Nam", "Trung Quốc", "Nhật Bản", "Hàn Quốc", "Italy", "Pháp"]
# Italy
-
  -   Italy
  - |
      Cập nhật vào 4/3
      Italy ghi nhận thêm 27 người chết vì nCoV trong một ngày, nâng số ca tử vong lên 79, cao hơn Iran và chỉ sau Trung Quốc đại lục.
      Số ca nhiễm nCoV tại Italy cũng tăng từ 2.036 lên 2.502, cao thứ ba thế giới sau Trung Quốc đại lục và Hàn Quốc.
      ["Lịch sử", "Thế giới", "Việt Nam", "Trung Quốc", "Nhật Bản", "Hàn Quốc", "Italy", "Pháp"]
  -   Lịch sử
  - |
      Cập nhật vào 3/3
      Tại Italy, hiện có tổng cộng 2036 người nhiễm Covid-19
      Cập nhật vào 15h ngày 29/2
      Tại Italy, hiện có tổng cộng 889 người nhiễm Covid-19, trong đó có 46 người đã bình phục và được xuất viện và 21 trường hợp tử vong – cao thứ 3 thế giới, sau Trung Quốc đại lục và Iran.
      ["Thế giới", "Việt Nam", "Trung Quốc", "Nhật Bản", "Hàn Quốc", "Italy", "Pháp"]
# Pháp
-
  -   Pháp
  - |
      Cập nhật vào 15h ngày 29/2
      Pháp đã xác nhận thêm 19 ca nhiễm mới Covid-19, nâng tổng số ca nhiễm bệnh tại nước này lên 57 người. Theo Phủ Tổng thống Pháp, chính phủ sẽ nhóm họp trong ngày 29/2 nhằm thảo luận về cuộc khủng hoảng y tế tại nước này.
      ["Thế giới", "Việt Nam", "Trung Quốc", "Nhật Bản", "Hàn Quốc", "Italy", "Pháp"]
```