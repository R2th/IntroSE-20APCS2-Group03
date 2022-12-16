Tiếp nối phần get locator cơ bản đợt trước. Click vào đây để xem nhé [Link](https://viblo.asia/p/locator-cac-cach-de-lay-locator-cua-web-element-co-ban-jvEla4LzZkw)

Hôm nay mình xin tiếp tục giới thiệu kĩ hơn một chút về Xpath bằng cách sử dụng hàm, toán tử


## 1.  Sử dụng toán tử AND, OR

Chỉ một thuộc tính nhiều khi không thể xác định được Locator, đòi hỏi chúng ta phải khéo léo kết hợp nhiều thuộc tính. 
Sử dụng AND để tìm với nhiều điều kiện đúng, OR để tìm một trong số nhiều điều kiện đúng 

`//input[@type='text' and @autocomplete = "off" and @role ="combobox"]`  
Tìm kiếm toàn bộ element có đầy đủ 3 điều kiện: type='text', autocomplete = "off", role ="combobox"

`//input[@type='text' or @autocomplete = "off" or @role ="combobox"]` 
Tìm kiếm toàn bộ element chỉ cần thỏa mãn 1 trong điều kiện: type='text', autocomplete = "off", role ="combobox"

## 2.  Sử dụng hàm NOT()
Mải miết tìm theo điều kiện đúng mà đôi khi chúng ta quên rằng sẽ có lúc cần dùng tới điều kiện phủ định: NOT

`//input[@type='text' and not (@autocomplete = "off")]`
Tìm kiếm toàn bộ element thỏa mãn điều kiện có type='text' và KHÔNG có thuộc tính autocomplete = "off"

## 3.  Sử dụng hàm Contains()
Đối với thuộc tính có nội dung rất dài thì làm sao để thu gọn bớt? Việc áp dụng contains là 1 cách rất hiệu quả để tối giản bớt những xpath dài ngoằng không cần thiết. 

Ví dụ có 1 element như sau:  `<div class="social-sharing mr-1 social-sharing--vertical social-sharing--medium" data-v-1b6678dc"></div>`

Nếu như bình thường sử dụng xpath `//div[@class="social-sharing mr-1 social-sharing--vertical social-sharing--medium" data-v-1b6678dc"]`

thì thay vào đó có thể sử dụng contains để rút gọn về như sau: `//div[contains(@class, "social-sharing--vertical")]`

Thực hiện xóa bớt những nội dung không cần thiết trong class, chỉ giữ lại những keyword chính sao cho chỉ cần chừng đó text thì vẫn xác định được locator

## 4.  Sử dụng hàm Starts-with()
Tìm kiếm thuộc tính được bắt đầu với 1 từ khóa cố định

Có một số element mỗi lần reload trang sẽ sinh ra 1 ID khác nhau tuy nhiên từ khóa phía trước nó không thay đổi. 

Ví dụ: 
Lần 1 access 
`<div id="useraccess_ID987he63"></div>`

Lần 2 access 
`<div id="useraccess_ID6279j40"></div>`

Với ví dụ trên trên ta có thể sử dụng Xpath sau: 

`//div[starts-with(@id,'useraccess_ID')]`
Tìm kiếm tất cả element được bắt đầu bằng từ khóa "useraccess_ID"

==========================

Chúc mọi người sớm làm quen với Xpath và tiếp tục theo dõi những bài viết sau của mình nhé ^^. 

Tài liệu cho mọi người tham khảo thêm: https://www.guru99.com/xpath-selenium.html