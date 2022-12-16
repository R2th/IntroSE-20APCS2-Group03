### Giới thiệu
Mình có nói chuyện với một số bạn bè và đồng nghiệp về việc chính phủ quyết định điều chỉnh mức đóng thuế thu nhập cá nhân từ năm 2020, nhưng có vẻ như các bạn chưa rõ về vấn đề này, nên mình viết bài này để đưa ra câu trả lời cho những bạn có thắc mắc tương tự nhé.

### Thuế thu nhập cá nhân là gì?
Thuế thu nhập cá nhân là các khoản tiền thuế mà người có thu nhập phải trích một phần tiền lương hoặc từ các nguồn thu khác vào ngân sách nhà nước sau khi đã tính các khoản được giảm trừ
Đối tượng phải nộp thuế thu nhập cá nhân gồm: cá nhân cư trú và cá nhân không cư trú tại Việt Nam có thu nhập chịu thuế.
+ Đối với cá nhân cư trú, thu nhập chịu thuế là thu nhập phát sinh trong và ngoài lãnh thổ Việt Nam, không phân biệt nơi trả thu nhập
+ Đối với cá nhân không cư trú, thu nhập chịu thuế là thu nhập phát sinh tại Việt Nam, không phân biệt nơi trả và nhận thu nhập

[Nguồn tham khảo](https://ketoansongkim.vn/thue-thu-nhap-ca-nhan-la-gi-15-van-de-co-ban-ve-thue-tncn-ban-nen-biet.html)

### Điều chỉnh mức đóng thu nhập cá nhân ra sao?
Chính phủ đã ra quyết định điều chỉnh mức giảm trừ gia cảnh nâng từ 9 lên **11 triệu đồng/tháng**, người phụ thuộc từ 3,6 lên **4,4 triệu đồng/tháng** và sẽ bắt đầu áp dụng cho tính thuế thu nhập cá nhân(**TTNCN**) năm 2020, và sẽ có hiệu lực vào mùa quyết toán thuế đầu năm 2021.

Tức là khi thực hiện quyết toán thuế thu nhập cá nhân năm 2020 vào đầu năm 2021, các cá nhân đóng **TTNCN** sẽ được hoàn lại một phần tiền đã đóng.

[Nguồn tham khảo](https://thanhnien.vn/thoi-su/tu-112020-thu-nhap-tren-11-trieu-moi-phai-dong-thue-thu-nhap-ca-nhan-1225494.html)

### Cách tính thuế
Thu nhập tính thuế (**TNTT**) = Tổng thu nhập - giảm trừ cá nhân (**11tr**) - giảm trừ phụ thuộc (**4.4tr** x số người phụ thuộc)

TNTT sẽ được tính luỹ tiến theo các bậc, tức là TNTT mức càng cao thì sẽ chịu thuế suất càng lớn , cụ thể như sau:

| Bậc | Thu nhập tính thuế/tháng | Thuế suất |Tính số thuế phải nộp |
| -------- | -------- | -------- | -------- |
| 1     | Đến 5 triệu đồng (trđ)     | 5%     |5%  x TNTT    |
| 2     | Trên 5 trđ đến 10 trđ     | 10%     |10% TNTT - 0,25 trđ    |
| 3     | Trên 10 trđ đến 18 trđ     | 15%     |15% TNTT - 0,75 trđ    |
| 4     | Trên 18 trđ đến 32 trđ    | 20%     |20% TNTT - 1,65 trđ    |
| 5     | Trên 32 trđ đến 52 trđ    | 25%     |25% TNTT - 3,25 trđ    |
| 6     | 	Trên 52 trđ đến 80 trđ     | 30%     |30 % TNTT - 5,85 trđ    |
| 7     | Trên 80 trđ    | 35%     |35% TNTT - 9,85 trđ    |


[Nguồn tham khảo](https://luatvietnam.vn/thue-phi/cach-tinh-thue-thu-nhap-ca-nhan-2020-565-23087-article.html)

### Công cụ tính
Từ công thức tính thuế ở trên mình có xây dựng 1 tool nhỏ lấy đầu vào là **tổng thu nhập**, và **số lượng người phụ thuộc**, đầu ra là số **thuế phải đóng** và số tiền **bạn nhận được**.

Các bạn xem và thử ở demo sau nhé
{@embed: https://codepen.io/minhkhmt1k3/pen/wvKOzLo}