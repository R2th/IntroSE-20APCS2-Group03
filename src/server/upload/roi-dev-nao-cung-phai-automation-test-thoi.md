Bài viết đứng dưới góc nhìn của dev về vấn đề performace testing
![](https://images.viblo.asia/725b1296-ba69-4eb2-92e0-5ec552f4fb43.png)

# Đặt vấn đề
Trong cuộc đời dev của chúng ta chắc hẳn sẽ gặp những câu như: tại sao biết code của A chậm hơn code của B, refactor xong làm sao biết code mới hiệu quả hơn cũ ... Để trả lời vấn đề này ta cần kiểm tra nhiều thứ nhưng 1 điều chắc chắn phải kiểm tra là hiệu năng. Ở bài viết này tôi sẽ sử dụng jmeter để kiểm tra performance của app sau khi thực hiện một loạt thao tác.
# Cách thực hiện
Để thực hiện test tôi sẽ chia ra làm các bước chính:
* Ghi lại các thao tác người dùng bằng Blazemeter
* Import vào jmeter và sửa jmeter
* Test

## Ghi lại các thao tác người dùng bằng Blazemeter
### Cài đặt
Để sử dụng Blazemeter, tôi cài extension lên chrome tại [link](https://chrome.google.com/webstore/detail/blazemeter-the-continuous/mbopgmdnpcbohhpnfglgohlbhfongabi?hl=en). 
Sau khi cài xong, trên giao diện của Chrome ta được như sau
![](https://images.viblo.asia/0b0c1d2b-32ef-40e3-a4b1-8757b14061eb.png)

### Sử dụng
Sau khi đã cài xong, ta mở trình duyệt đến chức năng cần test. Chức năng của tôi như sau:
* Mở link survey
* Nhấn nút "OK"
* Điền thông tin vào survey
* Ấn nút "Next"
* Điền tiếp thông tin
* Ấn nút "Finish"

Để ghi lại các thao tác này bạn cần làm là:
* Mở BlazeMeter lên
* Điền tên của chức năng
* Nhấn nút Record (nút tròn màu đỏ) rồi thực hiện các thao tác
* Khi thực hiện xong ấn nút Stop như hình
![](https://images.viblo.asia/d6b2c832-c48c-427e-9678-423643ac194f.png)
* Mở lại BlazeMeter lên => Save => Check vào jmter only. Sau bước này ta sẽ được 1 file `.jmx`

##  Import vào jmeter và sửa file .jmx
### Import
Mở jmeter lên và import file bên trên.

> **Tuy file `.jmx` trên đã ghi lại toàn bộ thao tác của chức năng đó nhưng ta sẽ không sử dụng ngay được. Bởi vì một số params ở các request sau phải lấy từ response của request trước, nói cách khác mỗi lần ta test thì params đó lại thay đổi. Cách giải quyết là ta lưu chúng lại thành các biến và gọi ở các request sau, chứ không fix cứng như file `.jmx` bên trên**.
### Config jmeter
Đây là giao diện jmter sau khi tôi import file `.jmx` bên trên và chạy thử. Đây là cú sốc đầu đời:
![Screenshot 2022-10-14 at 14.37.09.png](https://images.viblo.asia/b38a922e-5319-4875-aa50-e72347a00713.png)
Nguyên nhân failed: sau request đầu, hệ thống trả về `csrf_token`, `third-party-token`,... để sử dụng cho các request sau. Trong khi đó `csrf_token` của tôi là của request khi tôi thực hiện ở trên mà không phải là của request khi thực hiện test.

Trong bài viết này tôi sẽ giới thiệu 2 phương thức lấy giá trị trong request và lưu lại để sử dụng cho các request sau, đó là: `Regular Expression Extractor`,  `JSON Extractor`
#### Regular Expression Extractor
Tôi sử dụng Regular Expression Extractor để lấy giá trị khi response trả về là html. Giá trị cần lấy nằm trong thẻ `title`, `meta`, `div` ... chẳng hạn. Để sử dụng ta làm như sau:
![Screenshot 2022-10-14 at 14.43.38.png](https://images.viblo.asia/a5c0ea85-edf1-4cc6-999c-539a4e72375d.png)

Đây là giao diện:
![](https://images.viblo.asia/73da5007-6b52-4160-9d9c-415e02df39f8.png)
Tôi sẽ giải thích các mục chính:
* **Name of created variable**: điền vào tên biến mà ta muốn sử dụng sau này
* **Regular Expression**: Điền vào biểu thức để lấy ra thông tin cần lấy, trong ví dụ này là tôi muốn lấy ra `csrf-token`. Biến này nằm trong `content` của thẻ `meta` có tên là `csrf-token`
* **Template**: Ta nhập vào `$1$`, theo tôi hiểu là lấy group đầu tiên trả về, điền `$1$` để lấy group đầu tiên.

Cách sử dụng:
Muốn sử dụng biến `csrf` vừa mới tạo, ta dùng cú pháp: `${csrf}`, Ví dụ:
![](https://images.viblo.asia/b959bac7-476a-4457-af32-369a71604df3.png)




#### JSON Extractor
Tôi sử dụng JSON Extractor để lấy giá trị khi response trả về là JSON. Để sử dụng ta làm như sau:
![Screenshot 2022-10-14 at 14.55.02.png](https://images.viblo.asia/bfc6f6ab-c838-4a97-95c8-4180df6e2c20.png)
Đây là giao diện:

![Screenshot 2022-10-14 at 14.55.40.png](https://images.viblo.asia/3236854c-f8d8-483d-bcb4-298e871e49ab.png)

Ví dụ response của resquest trước trả về có dạng: `{panel_id: 1, name: 'Panel_1'}`, tôi sẽ lưu biến `panel_id` như hình bên trên.

Cách sử dụng: 

![Screenshot 2022-10-14 at 14.57.34.png](https://images.viblo.asia/9fbbd9fa-a7e1-4885-b103-589f9964e53a.png)

Sử dụng cú pháp `${<tên biến>}` để import biến đó. Ta có thể import vào mọi nơi như url, request params, http headers ..... 

## Test
Tùy vào chức năng của các bạn mà có cách lấy giá trị biến riêng. Bạn cứ thực hiên từng request một xem request đó thiếu những gì mà thêm cho phù hợp.
Sau khi đã sửa xong tôi sử dụng `Aggregate Report` để kiểm tra hiệu năng. Và đây là kết quả, ta chú ý đến cột Throughput để so sánh giữa các lần test:
![](https://images.viblo.asia/fc81f6d9-192c-43f5-9e40-73c613a38e07.png)

# Kết luận
* Dev cũng có thể thực hiện automation test
* Jmeter mạnh hơn chúng ta (dev) nghĩ