Bạn đang dùng sublime? Bạn đang làm web đa ngôn ngữ? Bạn đang đau đầu với đống I18n? Bạn cảm thấy mệt mỏi với mấy file en.yml, vi, yml, jav.yml.... à nhầm ja.yml :v :v nhưng lâu lâu vẫn gặp "translation missing"?

Bạn muốn code đến đâu "t chấm" đến đó, và việc còn lại khỏi phải lo?

Ở bài viết này mình xin chia sẽ một package nho nhỏ giúp làm đơn giản hóa việc thêm đa ngôn ngữ cho trang web của các bạn, đó là "sublime-text-i18n-rails", tất nhiên bài viết này chỉ có ích cho những người đang dùng sublime-text (yaoming)

## Cài đặt

Bạn nhấn tổ hợp phím Ctrl + Shift + P (Command + Shift + P) và gõ Install Package: Chọn Package Controll:: Install Package

![](https://images.viblo.asia/306d5cfd-a6a5-4e7c-8212-6205c809d47d.png)

Sau đó tìm kiếm với từ khóa "I18n", chọn package "I18n Rails"

![](https://images.viblo.asia/88a657ef-3f4b-4739-ad64-b72098b9cc33.png)

Đợi tí là xong :v: 

# Sử dụng
Giả sử ở trang home/index.html.erb mình có đơn giản như thế này

> home/index.html.erb

```
<%= t ".jang" %>
<%= t ".nara" %>
<%= t ".jangnara" %>
```

### Kiểm tra keys

Nhấn tổ hợp: 

> **ctrl+alt+u**


để kiểm tra các keys nào đã có mặt trong các tệp * .yml

kết quả:

![](https://images.viblo.asia/d0e861d6-3488-45e0-b492-812301625323.png)

- Các keys được đánh dấu màu "đỏ" là các keys chưa được định nghĩa ở bất cứ file yml nào
- Các keys được đánh dấu màu "vàng" là các keys đã được định nghĩa nhưng chưa đầy đủ (ví dụ chỉ có định nghĩa ở file ja.yml nhưng chưa định nghĩa ở file en.yml)
- Các keys được đánh dấu màu "xám" là các keys đã được thêm đúng

### Thêm keys

Để thêm một key, bạn chọn key đó, sau đó nhấn tổ hợp:

> ctrl+alt+i

sublime sẽ hiển thị ô input để bạn nhập giá trị cho key đó, lần lượt trong các file yml hiện có (bạn có thể bỏ qua các file này)

![](https://images.viblo.asia/ebc2b0fb-32fe-4031-972f-e5f079f9900c.png)

Và kết quả ở trong file en.yml

![](https://images.viblo.asia/1b00f31a-83da-49c3-8589-de2c1ee9194d.png)


Trên đây mình đã giới thiệu sơ qua về cách sữ dụng package "sublime-text-i18n-rails", ngoài ra còn có một số settings cơ bản, các bạn có thể tham khảo thêm tại: 

https://github.com/NicoSantangelo/sublime-text-i18n-rails

Hi vọng bài viết sẽ giúp ích cho các bạn!



-----


## Mr.nara