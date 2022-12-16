# Giới thiệu

Chắc hẳn mấy hôm nay mọi người thường đau đầu vì lúc nhắn tin trên facebook thường bị nhảy ký tự cuối câu lên đầu lúc xóa hoặc enter, hôm nay chúng ta sẽ cùng nhau khắc phục vấn đề này nhé!
Bài viết hôm nay sẽ có những mục chính như sau:

1. Tình trạng chung
2. Giới thiệu ibus-bamboo
3. Config làm sao để khắc phục vấn đề?
4. kết luận

Chúng ta cùng bắt đầu nhé!

# Tình trạng chung
Quay lại đợt WFH (work from home) lại xuất hiện nhiều vấn đề, và một trong số những vấn đề tuy là nhỏ nhưng nó khíến anh em dùng Ubuntu khó chịu mấy hôm nay đó là tình trạng nhắn tin facebook bị nhảy chữ cuối lên đầu đoạn văn bản. cụ thể là như ảnh dưới:
![](https://images.viblo.asia/02130539-ae7f-4d13-8724-91cb2b998d07.gif)
Rất khó chịu đúng không, theo mình tìm hiểu thì phía facebook chưa có phản hồi cho vấn đề này, và cũng không biết là bên window có bị hay không, anh em nào dùng window hãy comment vào bài viết cho mình kết quả nhé!
Vậy để khắc phục vấn đề này thì phải làm như thế nào? Mình đã tìm cách fix và đã thành công, chúng ta sẽ sử dụng ibus-bamboo để khắc phục. Tuy nhiên cài nó và sử dụng thôi là chưa đủ. Trước hết, chúng ta hãy tìm hiểu xem ibus-bamboo là gì và sử dụng làm sao để khắc phục tình trạng trên một cách triệt để nhé!

# Giới thiệu ibus-bamboo
### 1. Sơ lược tính năng

**Hỗ trợ tất cả các bảng mã phổ biến:**
* Unicode, TCVN (ABC)
* VIQR, VNI, VPS, VISCII, BK HCM1, BK HCM2,…
* Unicode UTF-8, Unicode NCR - for Web editors.

**Các kiểu gõ thông dụng:**
* Telex, Telex W, Telex 2, Telex + VNI + VIQR
* VNI, VIQR, Microsoft layout

**Nhiều tính năng hữu ích, dễ dàng tùy chỉnh:**
* Kiểm tra chính tả (sử dụng từ điển/luật ghép vần)
* Dấu thanh chuẩn và dấu thanh kiểu mới
* Bỏ dấu tự do, Gõ tắt,...
* 2666 emojis từ emojiOne

**Sử dụng phím tắt Shift+~ để loại trừ ứng dụng không dùng bộ gõ, chuyển qua lại giữa các chế độ gõ:**
* Pre-edit (default)
* Surrounding text, IBus ForwardKeyEvent,...

### 2. Cách cài đặt

```
sudo add-apt-repository ppa:bamboo-engine/ibus-bamboo
sudo apt-get update
sudo apt-get install ibus-bamboo
ibus restart
# Đặt ibus-bamboo làm bộ gõ mặc định
env DCONF_PROFILE=ibus dconf

```

### 3. Hướng dẫn sử dụng

Điểm khác biệt giữa `ibus-bamboo` và các bộ gõ khác là `ibus-bamboo` cung cấp nhiều chế độ gõ khác nhau (1 chế độ gõ có gạch chân và 5 chế độ gõ không gạch chân; tránh nhầm lẫn chế độ gõ với kiểu gõ, các kiểu gõ bao gồm `telex`, `vni`, ...).

Để chuyển đổi giữa các chế độ gõ, chỉ cần nhấn vào một khung nhập liệu (một cái hộp để nhập văn bản) nào đó, sau đó nhấn tổ hợp `Shift`+`~`, một bảng với những chế độ gõ hiện có sẽ xuất hiện, bạn chỉ cần nhấn phím số tương ứng để lựa chọn.

**Một số lưu ý:**

* Một ứng dụng có thể hoạt động tốt với chế độ gõ này trong khi không hoạt động tốt với chế độ gõ kia. Ví dụ gõ trên web có vẻ ngon nhưng vào terminal lại không được ngon tí nào.
* Một điểm khá hay là các chế độ gõ được lưu riêng biệt cho mỗi phần mềm, ví dụ như chrome có thể là chế độ 1 nhưng vscode lại là chế độ 2
* Bạn có thể dùng chế độ Thêm vào danh sách loại trừ để không gõ tiếng Việt trong một app nào đó. Loại trừ gõ tiếng việt cho terminal là hợp lý rồi đúng không :D
* Để gõ ký tự `~` hãy nhấn 2 lần `Shift`+`~` .


# Config làm sao để khắc phục vấn đề?
Qua phần giới thiệu ở trên thì chắc hẳn các bạn cũng nắm được ibus-bamboo ngon lành cành đào ra sao rồi đúng không? Vậy tại sao đầu bài viết mình lại nói cài đặt và sử dụng thôi chưa đủ? Bởi vì chính cái ảnh demo mà các bạn đang xem là mình sử dụng ibus-bamboo để gõ đấy. Giờ chúng ta sẽ thử các chế độ gõ xem thế nào nhé:

=> Chế độ 1:
![](https://images.viblo.asia/02130539-ae7f-4d13-8724-91cb2b998d07.gif)

=> Chế độ 2:
![chedo2.gif](https://images.viblo.asia/e8bf15a6-0d7b-4aa4-ba41-4c0d1f524cfe.gif)

=> Chế độ 3:
![chedo3.gif](https://images.viblo.asia/c2b3806e-6cd2-4754-9522-a6f5c27f14eb.gif)

=> Chế độ 4:
![chedo4.gif](https://images.viblo.asia/cd5c745a-e446-4bcd-85f7-6c4ec5d53e9a.gif)

=> Chế độ 5:
![chedo5.gif](https://images.viblo.asia/fc95aae4-7649-4621-a647-83a7715d1b52.gif)

=> Chế độ 6:
![chedo6.gif](https://images.viblo.asia/0ba2f99f-eeef-43c2-8cda-c44dc0bc16b5.gif)

Như vậy cuộc đua của chúng ta đã kết thúc, chiến thằng thuộc về chế độ gõ thứ 4. Và đây là câu trả lời cho toàn bộ bài biết này. Tóm lại:

Bước 1: cài ibus-bamboo

Bước 2: đặt làm bộ gõ mặc định

Bước 3: nhấn `shift` +  `~` và nhấn 4

Done!

# kết luận
Như vậy mình đã giới thiệu cho mọi người cách khắc phục lỗi nhắn tin bị nhảy chữ, rất đơn giản đúng không! Hi vọng bài viết này mang tới giá trị tới mọi người. Cảm ơn các bạn đã đọc bài viết. Đừng quên like, share và bấm follow để có thể nhận thông báo về những bài viết của mình nhé. Chúc mọi người một ngày làm việc hiệu quả!

Link ibus-bamboo: https://github.com/BambooEngine/ibus-bamboo