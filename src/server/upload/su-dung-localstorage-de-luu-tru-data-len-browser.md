***Dịch từ bài viết [ブラウザにデータを保存するlocalStorage（ローカルストレージ）の使い方](https://www.granfairs.com/blog/staff/local-storage-01)***

Trong bài viết lần này, tôi sẽ giới thiệu về localStorage.

localStorage là API được đưa vào sử dụng cùng với sự xuất hiện của phiên bản HTML5, là một loại Web storage với cơ chế tương tự cookie.

Tiếp theo hãy cùng tôi tìm hiểu sự khác biệt giữa Web Storage và Cookie.

# 1) Mục đích việc lưu Data lên browser
Cookie và Web Storage đều là chức năng lưu trữ data phía client (browser). Vậy, tại sao cần có chức năng này?

Câu trả lời là do, HTTP là một stateless protocol, tức là protocol không chưa trạng thái.

Việc truyền tin theo giao thức HTTP được thực hiện theo luồng sau: 

**Client gửi request → Server response**

Mỗi một luồng truyền tin được xử lý bằng một hoàn toàn request riêng biệt. Vì thế, server không phân biệt client đưa ra request access lần đầu hay đã từng access trước kia. Dù với bất cứ trường hợp nào đi nữa, server luôn coi client đó như một “khách lạ” ghé thăm lần đầu.

Để giải quyết vấn đề này, cookie được sử dụng.

Cùng với response nhận được từ phía server, các thông tin như: nội dung input, số lần access cũng được lưu trữ.

Khi client access kể từ lần 2 trở đi, cookie này cũng được gửi đi kèm với request. Phía server tham chiếu thông tin trong cookie để response tùy theo trạng thái của request.

# 2) So sánh Web Storage và Cookie
Đến đây chúng ta đã hiểu được mục đích của việc lưu data lên browser. Giờ hãy cùng trở lại chủ đề Web Storage.

Như đã nói ở trên, cả Cookie và Web Storage đều là chức năng lưu trữ data lên browser. Vậy điểm chung và điểm khác nhau giữa cookie và web storage là gì?

**Điểm giống nhau:**

*  Có thể tự do lưu đè thông tin lên phía client
*  Thông tin được lưu trữ theo cặp “key ” và “value”
 
**Điểm khác nhau:**

* Web Storage lưu trữ được lượng Data lớn hơn
* Web Storage có thể control dễ dàng hơn bằng JavaScript
* Cookie được gửi kèm tự độngt mỗi lần client gửi request đến Server side, còn Web Storage chỉ gửi thông tin cần thiết, vào thời điểm cần thiết mà thôi
 
Điểm khác nhau thứ 3: thời điểm gửi Data, đưa đến ứng dụng khác nhau của Web Storage và Cookie tùy trường hợp sử dụng

Ví dụ, với việc xử lý: “chỉ hiển thị modal nếu user access lần đầu”, nếu sử dụng cookies để phán đoán người dùng đã từng access hay chưa, thì ngay cả khi truyền nhận những thông tin khác, không liên quan đến số lần access thì thông tin ấy vẫn bị gửi kèm request.

Trường hợp này, việc sử dụng Web Storage hợp lý hơn và cũng dễ dàng xử lý hơn nhiều.

Mặt khác, Web Storage được chia thành 2 loại: localStorage và sessionStorage. Sự khác nhau giữa 2 loại này là ở thời hạn data được lưu trữ.

Các thông tin về localStorage, sesstionStorage và Cookie được tổng hợp trong bảng sau:




||Thời hạn|Lượng Data|Thời điểm gửi Data lên Server|
| -------- | -------- | -------- |-------- |
|localStorage|Vĩnh viễn|5MB|Chỉ khi cần|
|sessionStorage|Cho đến khi tab bị đóng|5MB|Chỉ khi cần|
|Cookie|Cho đến thời hạn được chỉ định|4KB|Tự động gửi kèm mỗi request|

# 3) Cách sử dụng localStorage:
## 3.1) Lưu trữ data:
Data được lưu trữ vào localStorage bằng cách sử dụng method setItem() với localStorage:

`localStorage.setItem(‘key’, ‘value’);`

Để lưu trữ nhiều giá trị vào một key trên localStorage bằng cách sử dụng mảng (array), cần chuyển mảng sang dạng json do localStorage chỉ lưu trữ dữ liệu dưới dạng chuỗi (string) mà thôi.

```
const array=[{
‘key1’: ‘value 1’,
‘key2’: ‘value2’
}] ;
const setjson=JSON.stringify(obj);
localStorage.setItem(‘key’, setjson);
```
## 3.2) Get data
Để get data từ localStorage, ta sử dụng method getItem():

`localStorage.getItem(‘key’);`

Trường hợp data được lưu trữ vào localStorage dưới dạng mảng, data được trả về dưới dạng json nên cần phải chuyển thành object trước khi xử lý tiếp bằng javascript:

`const obj=JSON.parse(localStorage.getItem(‘key’));`
## 3.3) Xóa Data:
Sử dụng method sau để xóa một data chỉ định hay toàn bộ data:

```
// Xóa data chỉ định
localStorage.removeItem(‘key’);
//Xóa toàn bộ data
localStorage.clear(); 
```

## 3.4) Cách check data đã được lưu trên localStorage của Chrome :
Trên trình duyệt Chrome, mở developer tool, vào tab application, chọn URL muốn kiểm tra trong mục local Storage để xem data đã được lưu trữ.
![](https://images.viblo.asia/eba91912-8623-4d19-b817-d91a09070770.png)

Trên đây là toàn bộ những gì tôi muốn giới thiệu về localStorage.