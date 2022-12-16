# Giới thiệu
Khi phát triển Web, không biết có bao giờ bạn muốn (hay khách hàng muốn) phát triển thêm các tính năng rất "ngầu" như dưới đây chưa:
* Tự gửi yêu cầu tìm kiếm và hiện kết quả ngay khi người dùng đang gõ vào khung nhập
* Lazy load hình ảnh và chỉ load hình khi đã (gần) cuộn đến hình ảnh đó
* Autoplay video khi người dùng cuộn đến video và tự pause khi người dùng cuộn qua mất
* Cuộn vô hạn: tự load thêm nội dung mới khi cuộn đến gần cuối trang
* Theo dõi con trỏ chuột của người dùng để làm điều mờ ám gì đó (ví dụ trang bán hàng muốn theo dõi người dùng để chuột vào item nào trong bao lâu để đoán mức độ quan tâm)
* Kéo/thả được các phần tử trên trang web

Kể ra thì mấy tính năng trên cũng không khó lắm. Ví dụ, đối với tính năng đầu tiên, chúng ta chỉ cần lắng nghe sự kiện `oninput` của khung nhập liệu, sau đó cho chạy hàm để gửi đi dữ liệu với AJAX chả hạn. Nhưng làm thế này lại nảy sinh thêm vấn đề: server có thể sẽ phải hứng chịu một lượng lớn yêu cầu mỗi khi người dùng gõ vào khung tìm kiếm. Một người gõ trung bình có thể gõ đến 6-8 ký tự mỗi giây, tương đương với từng đó event được bắn ra. Vậy làm sao để giảm thiểu số lần gọi hàm trên và giảm thiểu yêu cầu đến server?

Mặt khác, với các tính năng còn lại, giả dụ như việc tự động play và pause video chẳng hạn. Chúng ta có thể bắt sự kiện `onscroll` và check mọi phần tử `<video>` xem phần tử nào đang nằm trong viewport và phần tử nào không để thực hiện hành động play/pause tương ứng. Khổ nỗi, event `onscroll` lại thường xuyên bị "bắn" ra rất nhiều lần. Một phát trượt nhẹ trên touch pad hoặc cuộn con lăn chuột có thể trigger đến tận 30 event `onscroll`, còn một phát vuốt trên màn hình điện thoại có khi còn nhiều hơn nữa (lên đến >100 event `onscroll`!). Logic bên trong hàm callback có khi rất nặng nề vì phải check từng phần tử `<video>` một và có khi phải thực hiện nhiều hành động khác nữa (logic cho việc check xem element có nằm trong viewport không cũng không đơn giản đâu nhé). Vấn đề này gây ảnh hưởng lớn đến hiệu năng của trang Web. Liệu có cách nào khắc phục không?

Xin giới thiệu: kỹ thuật Throttle và Debounce trong Javascript!

# Throttle
> Throttle giới hạn số lần hàm được gọi trong một khoảng thời gian.

Ví dụ như: *hãy chỉ thực thi hàm này nhiều nhất 100ms một lần*.

Giả sử với trường hợp bình thường, một hàm được gọi 1000 lần trong 10 giây. Nếu bạn *throttle* hàm đó còn 100ms, như vậy với mỗi 10 giây, hàm này chỉ được chạy 100 lần.

# Debounce
> Debounce đảm bảo rằng hàm không được gọi lại, cho đến khi nó không được gọi đến sau một khoảng thời gian.

Ví dụ như: *thực thi hàm này chỉ khi 100ms đã trôi qua mà hàm đó vẫn không được gọi*.

Giả sử một hàm được gọi liên tục tận 3000 lần trong khoảng thời gian rất ngắn, như 3 giây chẳng hạn, sau đó ngừng lại. Nếu bạn sử dụng *debounce* lên hàm đó là 100ms, thì hàm này chỉ được chạy duy nhất một lần vào giây thứ 3,1. Mỗi lần hàm được gọi thì thời gian sẽ bị tính lại từ đầu (chứ không cộng dồn)

# Cách thực hiện
Đáng tiếc là Javascript mặc định không hỗ trợ sẵn 2 kỹ thuật này. Bạn có thể tự viết hàm Throttle và Debounce nhưng sẽ phải dành ra khá nhiều nỗ lực để viết được nó chuẩn xác nhất.

Thay vào đó, bạn có thể sử dụng các thư viện Javascript phổ biến như [Underscore](https://underscorejs.org/), [Lodash](https://lodash.com) hay gần đây là [Rambdax](https://github.com/selfrefactor/rambdax). Chúng đã cung cấp sẵn những hàm cần thiết cho việc Throttle và Debounce, đồng thời cũng đã được thử, kiểm chứng và production-ready.

Ví dụ về sử dụng throttle đối với lodash:
```javascript
document.body.addEventListener("scroll", _.throttle(() => {
  // Logic tại đây
}, 300));
```

Thực hiện debounce cũng tương tự:
```javascript
document.body.addEventListener("scroll", _.debounce(() => {
  // Logic tại đây
}, 300));
```

Việc Debounce đôi khi khá khó chịu so với Throttle ở chỗ, mặc định hàm đã Debounce chỉ được thực thi một khi chuỗi event đã dừng. Bạn có thể dùng thêm option `leading` và `trailing` để khắc phục điều này:
```javascript
document.body.addEventListener("scroll", _.debounce(() => {
  // Logic tại đây
}, 300, {leading:true, trailing:true}));
```
Như vậy, hàm đã Debounce sẽ thực thi một lần khi chuỗi event liên tục bắt đầu, thực thi lần nữa khi chuỗi event liên tục ngừng lại.

Dưới đây là ví dụ so sánh giữa *Không Dùng Gì ™* vs *Throttle* vs *Debounce* đối với sự kiện `mousemove`:
{@embed: https://jsfiddle.net/tranxuanthang/vna3509m/2/}

Xem các đường dẫn tham khảo để có nhiều ví dụ hơn.

# Tham khảo
1. [Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/)
2. [The Difference Between Throttling and Debouncing](https://css-tricks.com/the-difference-between-throttling-and-debouncing/)