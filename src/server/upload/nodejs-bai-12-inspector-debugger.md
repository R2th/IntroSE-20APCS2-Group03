Trong Sub-Series JavaScript trước đó, chúng ta đã biết cách sử dụng lệnh `debugger;` và chương trình rà soát lỗi vận hành của code `Inspector` của trình duyệt web. Bằng cách tạm dừng tiến trình vận hành của code tại vị trí của `debugger;` và tiếp tục thực thi từng câu lệnh tiếp theo, chúng ta có thể tìm ra lỗi logic lập trình dễ dàng hơn và tiến hành công việc chỉnh sửa cần tiết.

NodeJS cũng có sẵn các trình `Debugger` và `Inspector` dựng sẵn, tuy nhiên về giao diện sử dụng thì chúng ta sẽ phải học cách tương tác qua cửa sổ dòng lệnh hoặc mượn tạm của trình duyệt web. Mình không quen dùng cái cửa sổ dòng lệnh lắm, và nếu như bạn cũng vậy thì...

## Sử dụng giao diện Inspector của trình duyệt web cho NodeJS

Chúng ta sẽ cần chuẩn bị một trình duyệt web được xây dựng trên Chromium. Ví dụ như Google Chrome, Microsoft Edge, Opera, v.v... Để đảm bảo trình duyệt web của bạn phù hợp với tiêu chí này thì bạn cứ Google theo cú pháp: `is ${browserName} chromium based?`. Chắc chắn sẽ có câu trả lời đâu đó.

Sau đó trên thanh địa chỉ của trình duyệt web, chúng ta cần nhập vào đường dẫn có dạng: `${browserName}://inspect/`. Sẽ có một trang đơn với tiêu đề là `DevTools` hiện ra, và đâu đó bạn sẽ có thể tìm thấy một đường link `Open dedicated DevTools for Node`.

![](https://images.viblo.asia/80dfd84c-0d95-489b-a522-3d3cce654dd0.png)

Tiếp tục nhấn vào liên kết đó thì chúng ta sẽ có thêm một cửa sổ `console` dành riêng cho `NodeJS` như thế này.

![](https://images.viblo.asia/597c4bdc-01aa-4689-9623-60796eefb07d.png)

Bây giờ chúng ta mở cửa sổ dòng lệnh của hệ điều hành và sử dụng câu lệnh `node inspect app.js` để chạy code `server` mà chúng ta đã xây dựng. Chờ thêm một chút và bạn sẽ thấy trình `Inspector` của trình duyệt web tự động được kết nối với ứng dụng `server` vừa được khởi chạy.

![](https://images.viblo.asia/8b566988-54e4-428d-ae31-28437595caf8.png)

Tiến trình vận hành code đang được tạm dừng ở ngay dòng code đầu tiên của tệp `app.js`. Nếu bạn không còn giữ code `server` này thì có thể tạo ra một tệp `.js` đơn giản nào đó với vài dòng code `console.log()` cũng được. Mục tiêu của chúng ta ở đây chỉ là để làm quen với cách thiết lập trình chạy thử code với `Inspector` mượn tạm của trình duyệt web.

Ở phía bên phải của cửa sổ `Sources`, chúng ta vẫn có các nút điều khiển tiến trình chạy code. Nếu bạn muốn di chuyển nhanh tới một điểm nào đó trong code thì có thể viết một lệnh `debugger;` vào trình soạn thảo code ở giữa, sau đó nhấn nút `Play`, hoặc `F8`, hoặc `Ctrl + \`.

Nút có ký hiệu hình mũi tên `->o` ở gần cuối hàng nút điều khiển có phím tắt là `F9`, được sử dụng để chạy lần lần từng câu lệnh một và như vậy chúng ta sẽ có thể theo dõi logic chạy code để tìm ra lỗi cần sửa. Và bên cạnh các thao tác sử dụng cơ bản vừa mô tả, thì NodeJS có cung cấp thêm [module `Inspector`](https://nodejs.org/dist/latest-v16.x/docs/api/inspector.html) với một số tính năng khác nữa.

## Kết thúc Sub-Series NodeJS

Đây là bài viết cuối cùng của Sub-Series NodeJS trong Tự Học Lập Trình Web Một Cách Thật Tự Nhiên. Ở thời điểm hiện tại thì chúng ta chỉ còn một vài bài viết cuối cùng của Sub-Series JavaScript về các mô hình lập trình phổ biến để kết thúc Series Web này. 

JavaScript là một ngôn ngữ tuyệt vời dành cho thời điểm mà chúng ta bắt đầu tự học lập trình; Và có lẽ cũng sẽ rất tuyệt vời khi quan sát ở vị trí đứng của các lập trình viên rất rất giỏi như Sir Jeff Atwood:

> Bất kỳ ứng dụng nào có thể được viết bằng JavaScript, cuối cùng rồi sẽ được viết bằng JavaScript.  
> *_Jeff Atwood*

Thế nhưng ở giai đoạn chưng lửng như chúng ta ở thời điểm hiện tại thì có lẽ là rất khó để khẳng định như vậy. Lý do là vì ngôn ngữ này quá linh động, hỗ trợ cùng lúc nhiều mô hình lập trình khác nhau, với các nhóm công cụ dựng sẵn được thiết kế theo phong cách lai tạp giữa các mô hình lập trình. Điều này có thể khiến chúng ta trở nên lúng túng khi tìm hiểu thêm về các công cụ do JavaScript cung cấp hoặc khi đọc những bộ code được viết theo những phong cách khác nhau.

Vì vậy nên việc tìm hiểu nghiêm túc về các mô hình lập trình phổ biến thực sự quan trọng (ít nhất là đối với bản thân mình :D). Và nếu như bạn có dư thời gian, hay cũng muốn dành một chút sự quan tâm cho chủ đề này thì... Chúng ta sẽ học thêm một vài ngôn ngữ khác để tìm hiểu chi tiết về một số mô hình lập trình phổ biến đã đề cập trước đó.

[[Hướng Dẫn Cơ Bản] Một Số Mô Hình Lập Trình Phổ Biến](https://viblo.asia/s/jeZ103X3KWz)

Series mới này được tạo ra để làm chất liệu chi tiết cho các bài viết giới thiệu về các mô hình lập trình của Sub-Series JavaScript. Với mỗi một mô hình lập trình đã giới thiệu thì mình đã chọn ra một ngôn ngữ đại diện để tìm hiểu và tập trung áp dụng phương cách tư duy chủ điểm của mô hình đó. Một số ngôn ngữ được chọn thuộc nhóm rất phổ biến và một số khác thì không hẳn được biết đến rộng rãi lắm.

Tuy nhiên mục tiêu học tập của Series mới không phải là cố gắng ghi nhớ thêm các cú pháp chi tiết của các ngôn ngữ khác. Mà chủ yếu là để trải nghiệm đi qua các phương cách tư duy chủ điểm được sử dụng với mỗi ngôn ngữ và mô hình lập trình. Sau đó thì chúng ta sẽ có thể hiểu rõ hơn về JavaScript, cả về những ưu điểm của ngôn ngữ này và về những thứ cần lưu ý khi sử dụng.

Hẹn gặp lại bạn trong những bài viết tiếp theo. :D