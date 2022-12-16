Chrome dev tool, hay cái thứ xuất hiện bên dưới hoặc bên cạch của trình duyệt Chrome mỗi khi bạn nhận F12, Ctrl+Shift+C hoặc Ctrl+Shift+I, dân lập trình đặc biệt là mấy ông frontend thì chắc chắn là chả lạ gì cái này rồi, nhưng nó vẫn còn rất nhiều thứ hay ho mà thậm trí nhiều bô lão vẫn không biết.

## 1. Command Menu
Một thứ vừa quen lại vừa lạ, `Ctrl + Shift + P`. Phải, chính là nó. Dùng IDE thì chả là gì cái này rồi, từ Sublime text đến VS code, là menu cài đặt package, và làm nhiều thứ khác, và tất nhiên là hiện giờ tôi đang nói đến `Ctrl + Shift + P` trong Chrome dev tool rồi. Và cũng như trong các IDE, có rất nhiều thứ, nhưng tôi dùng chính thì chỉ có chức năng chụp màn hình =))

Từ chụp cả trang, chụp màn hình hiện tại đến chụp element đang chọn, khá là đầy đủ cho ae dùng, quen rồi thì còn tiện hơn cài tool chỉnh sửa nhiều =))

![](https://images.viblo.asia/f476de59-5fd6-4acb-a2c0-4d7115444158.gif)

## 2. Console có thể làm nhiều thứ lắm đấy
Câu lệnh `console.log` thần thánh thì ai cũng biết rồi, nhưng bạn có biết là ngoài nó ra thì còn nhiều nhưng câu `console` tiện dụng khác không?

### 2.1. Info, Warn, và Error
Tương tự như `console.log`, nhưng `console.info` `console.warn` và `console.error` chuyên dùng để báo log một cách chuyên dụng và trông pro hơn =))

![](https://images.viblo.asia/90e54ace-c546-4f7f-b718-4665af32fe85.png)

### 2.2. In Array thành Table
**`console.table`, chính là hắn!**

Biến 1 dòng `console.log(arr)` bình thường thành một cái bảng đẹp mê ly. Tiếc là với một coder thuần túy như tôi thì cũng chả biết dùng cái command  này vào việc gì khi nhìn arr kiểu string đã quen mắt rồi :/

![](https://images.viblo.asia/fa884021-26c3-4917-8310-b79e552eaed2.png)

### 2.3. Thêm style cho console
Khi mở dev tool trên FB thì các bạn sẽ thấy dòng chữ đỏ to vật vã này.
![](https://images.viblo.asia/53b68f80-645c-41f1-ae11-0503631a8872.png)

Điều này có nghĩa là `console.log` có có thể thêm được style, nhưng như trên, để lòe mấy thằng tính học hack NASA bằng HTML thì được chứ cũng không có tác dùng gì nhiều, dù là khá vui =))

![](https://images.viblo.asia/77b2cc07-ed99-40c9-ad35-47d8321d3f67.png)

### 2.4. Group log message
Cái này thì hữu dụng hơn 2 cái trên, dùng để nhóm các log lại trong trường hợp bạn in ra cả một đống :v

Có 3 method là `console.group`, `console.groupCollapsed` và `console.groupEnd`

![](https://images.viblo.asia/77774c4e-3661-4879-bbfb-032c1aad74d9.gif)

### 2.5. Tính thời gian thực hiện đoạn script
Dùng `console.time` và `console.timeEnd` để hiển thị thời gian thực thị đoạn script

![](https://images.viblo.asia/b7345f5b-4aee-4828-9631-9be540316dca.gif)

## 3. Copy request network thành fetch, cURL hoặc NodeJS fetch
Khi gọi API từ front thì ta hay dùng Postman hoặc cURL để tiến hành, nhưng thay vì phải nhập thủ công url, header và các param thì bạn có thể copy nhanh cái request trong mục network của dev tool

![](https://images.viblo.asia/5f70312a-a872-4ec6-a442-d61e9188ec7f.gif)

## 4. Tham chiếu đến tag đang chọn
Chọn element bạn muốn, vào console, gõ `$0` rồi enter và... TA-DA! Cái element bạn vừa chọn xuất hiện một cách thần kì

![](https://images.viblo.asia/01d4557e-ebf5-41ae-b90b-63234b6447f8.png)

## 5. Breakpoint
Hơi xấu hổ chút, nhưng trước giờ t code không dùng breakpoint lần nào :sweat_smile: nên là phần này đành dịch lại cho mn vậy.

### 5.1. Conditional Breakpoint
Bạn thấy cái tab Sources thứ 3 từ trái trang trong dev tool chứ, chọn file trong này, chuột phải vào dòng muốn đặt điều kiện breakpoint, là được, cụ thể thì lại nhìn ảnh dưới

![](https://images.viblo.asia/e8831283-3de6-48e6-9138-6d75b2feb7c4.gif)

### 5.2. DOM Change breakpoints
Phần trên là tạo breakpoint trong function js, còn phần này là tạo breakpoint trong HTML.

Chuột phải vào element chọn `break on`

![](https://images.viblo.asia/6bc10786-7bd1-4feb-9fea-150fb3d23416.gif)


## 6. Định dạng lại code đã minify
Cái này thì đơn giản rồi, mà cái pretty code này của dev tool tôi thấy dùng còn khá ngon nữa =))

![](https://images.viblo.asia/8c6d6227-418f-4ab6-8235-57cd4a668950.gif)


## 7. Thay đổi trạng thái element
Cái này thì đen giản thôi, nghe thì ghê chứ cái trạng thái của element chính là mấy cái hover, focus ấy, và bật tắt mấy cái trạng thái đó thì cũng cũng lại bài vỡ lòng với các dev frontend rồi =))

Hướng dẫn chữ thì nghe khó khăn, nên ae nhìn cái ảnh dưới mô tả cho dễ này

![](https://images.viblo.asia/89ca3a1c-0817-464b-927a-50b366424231.gif)

## 8. Dữ lại log console và request network sau khi load lại trang
Bạn muốn xem log nhưng lại chỉ có data trả về khi refesh trang? Vậy thì đây là phần dành cho bạn.

Log trong console thì bạn vào cái bánh răng góc trên phải của tool, và chọn `Preserve log`

![](https://images.viblo.asia/5acc6175-a288-4ce3-b37e-23468e512f59.gif)

Request của Network thì vào tab Network, ngay dưới cái tab đó có `Preserve log` đó, bạn chọn là được

![](https://images.viblo.asia/94316a61-8cd0-44aa-bed3-4626433b151c.png)

## 9. Debug bất cứ function nào
Sửa js, save, f5 trang, nhập lại input để test... phiền quá sao? Vậy thì hãy sửa luôn function trong tab Sources đi.

Không tìm được function trong tabs Source? Hãy gõ tên function vào Console, nháy đúp vào method được gọi ra để được điều hướng đến function cần chính sửa :thumbsup:

![](https://images.viblo.asia/b8d0a5ee-f52f-43f8-a0e0-fc58b2388c42.gif)

## 10. Design Mode
Chạy command `document.designMode="on"` trong Console và... WOW!! Bạn giờ đã có thể chỉnh sửa nội dung trên web như đang dùng Word vậy =))

![](https://images.viblo.asia/ab46badf-eb44-4cf0-b36b-ea7e53c8d3d0.gif)

## Kết
Chrome Dev Tool là một công cụ rất mạnh, với vô số chức năng, nhưng biết thêm vài mẹo đây cũng đủ để bạn thành ~~hacker~~ coder chuyên nghiệp rồi. Chúc thành công và quyết thắng

*Nguồn:* https://blog.bitsrc.io/10-tips-to-improve-productivity-using-chrome-dev-tools-7918fc8203f3