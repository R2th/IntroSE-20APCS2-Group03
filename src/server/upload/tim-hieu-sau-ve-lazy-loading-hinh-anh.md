Các trang web ngày nay chứa rất nhiều hình ảnh và video. Trung bình hình ảnh chiếm khoảng 50% lưu lượng truy cập của một trang web. 
Tuy nhiên, nhiều hình ảnh không bao giờ được hiển thị cho người dùng vì chúng được đặt khá sâu bên dưới màn hình đầu tiên.
Khi đó, cơ chế lazy-loading hình ảnh ra đời để tối ưu hóa hiển thị & tốc độ hiển thị trang đầu tiên với người dùng, tiết kiệm băng thông cho trang web đáng kể.

![](https://images.viblo.asia/7a0ad73c-ce3a-4aca-92fd-2f0c89f1b621.jpg)

## Cách tiếp cận pre-native 
Cho đến tận bây giờ, các nhà phát triển đã phải sử dụng JavaScript (thư viện hoặc tự viết từ đầu) để lazy-load hình ảnh. Hầu hết các thư viện hoạt động như thế này:

- Ban đầu, thẻ `img` sẽ không để thuộc tính `src` mà thay vào đó sử dụng thuộc tính `data-src` để chứa link ảnh.
```
<img data-src="https://tiny.pictures/example1.jpg" alt="...">
```
- Sau đó sẽ sử dụng thư viện lazy-load hoặc tự viết code để khi người dùng cuộn tới vị trí của ảnh, chúng ta sẽ thay thế thuộc tính `data-src` bằng `src`, ảnh sẽ được tải về & hiển thị.

**Cách này đã hoạt động khá tốt trong một thời gian dài. Nhưng nó không lý tưởng vì một số lý do sau:**
    
- Nếu kỹ thuật này được sử dụng cho hình ảnh trên màn hình đầu tiên, trang web sẽ nhấp nháy trong khi tải vì nó được hiển thị đầu tiên mà không có hình ảnh.

- Ngoài ra, chính thư viện lazy-loading làm tăng yêu cầu về băng thông và CPU của trang web. Và đừng quên rằng cách tiếp cận JavaScript sẽ không hiệu quả đối với những người bị vô hiệu hóa JavaScript (mặc dù chúng ta không thực sự quan tâm đến họ vào năm 2019, phải không?).

## Cách tiếp cận lazy-loading native

Chromium và Google Chrome sẽ cung cấp cơ chế lazy-loading dưới dạng thuộc tính tải mới, bắt đầu từ Chrome 75. Chúng ta sẽ sử dụng thuộc tính và giá trị mới này, nhưng trước tiên hãy để nó hoạt động trong trình duyệt hiện tại của chúng ta thì sẽ phải bật tính năng này lên.

1. Mở chrome://flags
2. Tìm kiếm từ khóa "lazy"
3. Bật cờ "Enable lazy image loading" và "Enable lazy frame loading"
4. Khởi động lại trình duyệt bằng nút ở góc dưới bên phải của màn hình.
![](https://images.viblo.asia/e9cc1ad1-4f93-4619-866a-a3c4d079d481.png)

## Thuộc tính "loading" với giá trị "lazy"

```
<img src="auto-cat.jpg" loading="lazy" alt="...">
```

Giá trị `lazy` gợi ý cho trình duyệt rằng một hình ảnh nên được lazy-load. Tùy thuộc vào trình duyệt thực hiện điều này như nào nhưng trong tài liệu mô tả, người giải thích nói rằng nó sẽ bắt đầu tải khi người dùng cuộn "gần" hình ảnh để nó có thể được tải khi nó thực sự cần xuất hiện.

## Cách thuộc tính "loading" hoạt động

Trái ngược với các thư viện JavaScript lazy-load, lazy-load kiểu native sẽ yêu cầu trước 2048 byte của tệp hình ảnh đầu tiên. Sử dụng dữ liệu này, trình duyệt cố gắng xác định kích thước của hình ảnh để chèn một placeholder vô hình cho hình ảnh đầy đủ và ngăn nội dung bị nháy trong khi tải.

## Responsive hình ảnh với srcset

Native lazy-loading cũng có thể khiến hình ảnh được responsive bằng cách sử dụng thuộc tính srcset. 
Thuộc tính này cung cấp một danh sách các ứng viên hình ảnh cho trình duyệt. Dựa trên kích thước màn hình của người dùng, tỷ lệ pixel hiển thị, điều kiện mạng, v.v., trình duyệt sẽ chọn ứng cử viên hình ảnh tối ưu cho điều kiện hiện tại. CDN tối ưu hóa hình ảnh như tiny.pictures có thể cung cấp tất cả các ứng cử viên hình ảnh trong thời gian thực mà không cần bất kỳ sự can thiệp từ phía backend.

```
<img src="https://demo.tiny.pictures/native-lazy-loading/lazy-cat.jpg" srcset="https://demo.tiny.pictures/native-lazy-loading/lazy-cat.jpg?width=400 400w, https://demo.tiny.pictures/native-lazy-loading/lazy-cat.jpg?width=800 800w" loading="lazy" alt="...">
```

## Trình duyệt hỗ trợ

Tại thời điểm viết bài này thì native-loading chưa được trình duyệt nào hỗ trợ. Phải từ phiên bản Chrome 75 thì tính năng này mới được hỗ trợ.

## Kết luận

Tôi thực sự hào hứng với tính năng này. Và thành thật mà nói, tôi vẫn tự hỏi tại sao cho đến giờ nó vẫn chưa được chú ý nhiều hơn, vì thực tế là việc phát hành nó sẽ tác động đến rất tích cực đến lưu lượng truy cập internet toàn cầu.