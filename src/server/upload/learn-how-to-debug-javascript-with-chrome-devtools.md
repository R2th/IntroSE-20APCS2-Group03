Là một Developer, việc tìm kiếm và fix bugs có thể có đôi chút khó khăn. Bạn có thể chỉ chú tâm sử dụng `console.log()` hoặc đặt `debugger` tại vị trí nào đó để sửa vấn đề bạn đang gặp phải làm cho code chạy chính xác. **Not Anymore!**

Trong bài viết này là tất cả về cách tìm lỗi một cách chính xác! Bạn sẽ tìm hiểu cách sử dụng **Chrome Developer Tools** để thiết lập các điểm dừng tại đây và tìm chúng trong code của bạn. Quy trình công việc này thường là một cách hiệu quả hơn nhiều để tìm và sửa lỗi trong code của bạn.

Hướng dẫn này chỉ cho bạn cách sửa lỗi một vấn đề cụ thể, nhưng quy trình công việc chung là để sửa lỗi tất cả các loại lỗi JavaScript. Sau đây sẽ là các step cụ thể để fix bug bằng **Chrome Developer Tools** :scream:

## Step 1: Reproduce the bug :flushed:

-----

Đầu tiên để chương trình có bug thì chúng ta cố tình tạo ra bug với mục đích để chương trình chạy sẽ xuất hiện lỗi liên tục.  Ở đây, chúng ta có một demo nho nhỏ như sau, hãy thực hiện các bước sau để xác định lỗi.

* Mở trang web chứa chương trình cộng hai số bị lỗi ở một tab mới, **[OPEN DEMO](https://googlechrome.github.io/devtools-samples/debug-js/get-started)**
* Tại ô input đầu tiên thì nhập 1 số tùy ý, ở đây nhập số `1` cho **Number 1**
* Tại ô input thứ hai cũng vậy, ở đây sẽ nhập số `1` cho **Number 2**
* Click vào button `Add Number 1 and Number 2`
* Nhìn kết quả sẽ thấy dòng sau `1 + 1 = 11`

Như vậy đây là một kết quả sai, đáng nhẽ ra kết quả ta nhận được phải là `1 + 1 = 2` mới là kết quả đúng. Và đây là một bug của chương trình mà chúng ta phải sửa.

## Step 2: Pause the code with a breakpoint

-----

**DevTools** cho phép bạn tạm dừng mã của mình ở giữa quá trình thực thi và kiểm tra giá trị của tất cả các biến tại thời điểm đó. Hay nói cách khác được gọi là `breakpoint` (điểm dừng) . Hãy cùng thử đặt một điểm dừng nào:

* Quay trở lại tab chương trình Demo và mở `DevTools` bằng cách nhấn `Command + Option + I` (Mac) hoặc `Ctrl + Shift + I` (Windows, Linux).
* Click vào tab **Sources**
* Chọn vào **Event Listener Breakpoints**,  DevTools sẽ hiển thị ra một danh sách các danh mục sự kiện có thể mở rộng. Ví dụ như `Animation và Clipboard`.
* Sau đó nhìn xuống event **Mouse** và click vào **Expand**
* Tích chọn vào `click` checkbox
![](https://images.viblo.asia/44a22fd5-8780-4680-a957-a045bf9e8b2c.png)

* Quay lại bản demo, thử chạy lại chương trình một lần nữa. DevTools tạm dừng bản demo và làm nổi bật một code trong tab **Sources** . DevTools nhấn mạnh dòng code sau:
> function onClick() {

### Why?
Khi bạn chọn `click` thì lúc đó coi như đã thiết lập điểm dừng ở tất cả các button hay gì đó mà chúng ta dùng sự kiện `click` ở đó và khi đó DevTools sữ tạm dừng ở dòng đâu tiên function xử lý sự kiện đó.

## Step 3: Step through the code

-----

Có thể hiểu trong bước này chúng ta sẽ duyệt chương trình theo từng dòng code một, từ đó sẽ tìm ra chính xác code sai ở dòng nào.

* Tại tab **Sources** của DevTools, click vào **Step over next function call**

![](https://images.viblo.asia/7b941b24-3370-4b3e-9ddf-84ed560b9514.png)
 
Khi click vào đó thì DevTools sẽ thực thi nhảy qua câu lệnh `if (inputsAreEmpty()) {` chứ không nhảy vào bên trong if. Điều này có nghĩa là bạn đã điền đầy đủ 2 ô input nên không có lỗi lúc này, câu lệnh if sẽ không được thực thi và nhảy xuống dòng code gọi hàm `updateLabel()` luôn, như vậy lỗi sai `1 + 1 = 11` sẽ có thể xảy ra ở trong hàm này. Tiếp tục đặt `breakpoint` trong hàm `updateLabel()`.

## Step 4: Set another breakpoint

-----

Giờ nhìn vào function muốn đặt điểm dừng, khi bạn xác định nghi vấn lỗi do dòng nào thì sẽ đặt breakdpoint ở dòng đó. Ở đây cụ thể sẽ là dòng sau trong hàm `updateLabel()`
> label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;

Ở bên trái của dòng code này, bạn có thể thấy số dòng của dòng code cụ thể này là: 32 . Bấm vào 32 , DevTools sẽ hiển thị background ở số 32 đó . Điều này có nghĩa là có một điểm dừng trên dòng này. DevTools bây giờ luôn tạm dừng trước khi dòng mã này được thực thi.

* Giờ click **Resume script execution**

![](https://images.viblo.asia/97c8732a-061b-4906-aa0f-e4c922dddbcf.png)

Chương trình sẽ chạy đến dòng code số 32 bên trên thì dừng lại![](https://images.viblo.asia/68988ab6-fa7f-4b9d-8b91-c865872c7597.png)

Ở đây có thể thấy DevTools đã in ra giá trị của `addend1`, `addend2` và `sum`. Nhìn vào giá trị `sum` thì thấy có vẻ ở đây nó đang hiểu là một chuỗi, trong khi giá trị mình mong muốn phải là integer. Đây là nguyên nhân lỗi!

## Step 5: Check variable values

-----

Nếu như bình thường thì bạn sẽ dùng `console.log()` để kiểm tra các giá trị biến rồi kiểu biến các thứ, nhưng với DevTools thì sẽ thay thế bằng `Watch Expressions`. Sử dụng biểu thức để theo dõi giá trị của biến theo thời gian. Ngoài ra nó cũng có thể lưu bất kỳ biểu thức Javascript hợp lệ nào trong `Watch Expression`. Áp dụng vào ví dụ trên:

* Trên bảng **Sources** của DevTools, bấm **Watch** . Phần mở rộng
* Click **Add Expression**

![](https://images.viblo.asia/95eb8952-ccd8-43f5-9917-a71d67093794.png)

* Viết dòng sau `typeof sum`
* Bấm phím Enter hoặc click chuột ra ngoài ô viết đó thì nó sẽ hiển thị kiểu dữ liệu biến đó cho mình.

![](https://images.viblo.asia/686c206f-7ce8-4f95-bbab-52f94e1d514c.png)

Như vậy giá trị biến `sum` kia đang là một chuỗi chứ không phải là một số.

Một thay thế DevTools thứ hai` console.log()` là Console. Sử dụng Console để đánh giá các câu lệnh JavaScript tùy ý. Các nhà phát triển thường sử dụng Console để ghi đè lên các giá trị biến khi fix lỗi. Trong trường hợp của bạn, Console có thể giúp bạn kiểm tra các cách để sửa lỗi vừa phát hiện. Áp dụng vào ví dụ tiếp:

* Chọn sang tab **Console** hoặc nhấn `Escape` để mở nó.
* Nhập vào dòng code sau `parseInt(addend1) + parseInt(addend2)`.
* Nhấn Enter và sẽ hiển thị kết quả bằng 2 đúng như mong đợi của chương trình demo.

![](https://images.viblo.asia/3c5c6d37-c25a-4385-b427-755bfb313ea4.png)

## Step 6: Apply a fix

-----

Cuối cùng chắc chắn là phải sửa lại logic code để chạy chương trình cho đúng rồi :)))
Bạn có thể sửa trên DevTools trước rồi sau đó sẽ vào code sửa sau cũng được.

Trên đây là cách tìm bug bằng DevTools của Google, bài viết được lược dịch và lấy DEMO từ https://codeburst.io/learn-how-to-debug-javascript-with-chrome-devtools-9514c58479db.

Cảm ơn mọi người đã đọc bài viết của mình!