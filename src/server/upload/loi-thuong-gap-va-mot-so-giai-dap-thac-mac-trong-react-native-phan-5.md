# 1. Running in development mode (dev=true)

   Hiệu suất luồng JavaScript bị ảnh hưởng rất nhiều khi chạy ở chế độ **dev**. 
   
   Điều này là không thể tránh khỏi: rất nhiều công việc cần phải được thực hiện trong thời gian chạy để cung cấp cho bạn các thông báo và thông báo lỗi, chẳng hạn như xác nhận propTypes và các xác nhận khác. 
   
   Nhưng nó luôn đảm bảo hiệu năng trong các bản dựng phát hành.
   
   # 2. Sử dụng câu lệnh console.log
   
   Khi chạy một ứng dụng đi kèm, các câu lệnh này có thể gây ra một nút cổ chai lớn trong luồng JavaScript. Điều này bao gồm các cuộc gọi từ các thư viện gỡ lỗi như **redux-logger**, vì vậy hãy đảm bảo xóa chúng trước khi đóng gói. 
   
   Bạn cũng có thể sử dụng  **plugin babel** này để loại bỏ tất cả các cuộc gọi từ console.* . 
   
   Bạn cần cài đặt nó trước với `npm i babel-plugin-transform-remove-console --save-dev` , sau đó chỉnh sửa tệp` .babelrc` trong thư mục dự án của bạn như sau:
   
```
{
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
```
   Điều này sẽ tự động loại bỏ tất cả các cuộc gọi console. * Trong các phiên bản phát hành (sản xuất) của dự án của bạn.
   
   # 3. Kết xuất ban đầu của ListView quá chậm hoặc hiệu suất cuộn không tốt cho danh sách lớn
   Sử dụng thành phần `FlatList` hoặc `PartList` mới thay thế. 
   
   Bên cạnh việc đơn giản hóa API, các thành phần danh sách mới cũng có những cải tiến hiệu suất đáng kể, yếu tố chính là sử dụng bộ nhớ gần như không đổi cho bất kỳ số lượng data nào. 
   
   Nếu FlatList của bạn hiển thị chậm, hãy chắc chắn rằng bạn đã triển khai `getItemLayout` để tối ưu hóa tốc độ kết xuất bằng cách bỏ qua phép đo các mục được kết xuất.
   
   # 4. Chuyển hướng chậm
   
   Như đã đề cập ở trên, hoạt ảnh **Navigator** được điều khiển bởi luồng JavaScript. Hãy tưởng tượng quá trình chuyển cảnh "đẩy từ phải": mỗi khung hình, cảnh mới được chuyển từ phải sang trái, bắt đầu ngoài màn hình (giả sử ở độ lệch x (x-offset) là 320) và cuối cùng sẽ ổn định khi cảnh nằm ở độ lệch x của Mỗi khung trong quá trình chuyển đổi này, luồng JavaScript cần gửi một độ lệch x mới đến luồng chính. 
   
   Nếu luồng JavaScript bị khóa, nó không thể thực hiện điều này và do đó không có cập nhật nào xảy ra trên khung đó và hoạt hình bị gián đoạn. Một giải pháp cho vấn đề này là cho phép các hình ảnh động dựa trên JavaScript được giảm tải cho luồng chính. 
   
   Nếu chúng ta thực hiện tương tự như trong ví dụ trên với cách tiếp cận này, chúng ta có thể tính toán một danh sách tất cả các x-off cho cảnh mới khi chúng ta bắt đầu chuyển đổi và gửi chúng đến luồng chính để thực hiện theo cách tối ưu hóa . Bây giờ, luồng JavaScript đã được giải phóng khỏi trách nhiệm này, sẽ không có vấn đề gì lớn nếu nó làm rơi một vài khung hình trong khi hiển thị cảnh - bạn có thể sẽ không nhận thấy vì bạn sẽ bị phân tâm bởi quá trình chuyển đổi đẹp. 
   
   Giải quyết điều này là một trong những mục tiêu chính đằng sau thư viện **React Navigation** mới. Các khung nhìn trong React Navigation sử dụng các thành phần gốc và thư viện **Animated** để cung cấp 60 hình ảnh động FPS được chạy trên luồng gốc.
   
   # 5. Chế độ xem TouchableX của tôi không phản hồi
   
   Đôi khi, nếu chúng ta thực hiện một hành động trong cùng một khung mà chúng ta đang điều chỉnh độ mờ hoặc làm nổi bật của một thành phần đang phản ứng với một cú chạm, chúng ta sẽ không thấy hiệu ứng đó cho đến khi chức năng onPress trở lại. 
   
   Nếu onPress thực hiện `setState` dẫn đến nhiều công việc và một vài khung hình bị loại bỏ, điều này có thể xảy ra. Giải pháp cho vấn đề này là bọc bất kỳ hành động nào bên trong trình xử lý onPress của bạn trong requestAnimationFrame:
   
```
handleOnPress() {
  requestAnimationFrame(() => {
    this.doExpensiveAction();
  });
}
```

# 6. Không lưu trữ dữ liệu nhạy cảm trong ứng dụng của bạn
Nó bao gồm API keys, API secrets, project IDs, client secrets, domains và bất kỳ dữ liệu khác nhạy cảm. Hãy giữ nó ở trên server, không nên giữ trong project.

# 7. Quản lý nguồn ảnh

Đặt tên ảnh rõ ràng. Ví dụ đặt tên là `login_button_disabled.png` thay vì `login_button_gray.png` để nó clear hơn. Sử dụng `@1x, @2x, @3x` dimensions để xử lý các độ phân giải màn hình khác nhau cho cả iOS và Android.

Nếu dimensions của ảnh quá nhỏ, bạn có thể blurred ảnh, nhưng hãy cân nhắc vì điều đó sẽ khiến cho ứng dụng của bạn trông sẽ thiếu chuyên nghiệp đấy. Khía cạnh khác, nếu bạn muốn giảm kích thước của ảnh mà không làm giảm chất lượng, hãy sử dụng 1 vài gợi ý như: `ImageOptim`.

# 8. Sử dụng đối tượng destructuring

Chắc rằng không ai muốn thấy `this.props.navigation.state.params.username` tại mọi nơi. Vì vậy nên sử dụng đối tượng destructuring.

Nó làm cho code dễ đọc và dễ hiểu hơn. Bạn có thể sử dụng nó như là parameters trong hàm, thay vì sử dụng 

`const MyComponent = (props) => {`

bạn có thể viết là 

`const MyComponent = ({ username, userID}) => {` 

Bạn cũng cần phải xem xét khi nào nên sử dụng destructuring và khi nào không, nhưng hầu hết việc sử dụng nó là 1 ý tưởng tốt.

Việc sử dụng nó không tốt nếu nó khiến cho 1 function nhỏ trở nên phình to ra, hoặc nếu sử dụng nó tạo tên biến conflicts. Ví dụ, nếu bạn có 1 biến là **this.props.id** và **this.state.id** việc sử dụng destructuring sẽ cắt giảm cả các biến với cùng tên id, và điều đó không tốt chút nào.

# 9. Sử dụng thư viện ngoài
Nếu có 1 thư viện hay ho bạn cần dùng, nó thật là tốt để sử dụng thay vì tốn thời gian tạo lại 1 cái tương tự. Tuy nhiên, bạn cần phải tìm hiểu về thư viện mà bạn sẽ sử dụng.

Nó có đang còn được sử dụng hay không, và có được maintain thường xuyên hay không? Có được rating tốt không? Có được test kỹ hay không? Có issue nào không? Có hỗ trợ cho cả iOS và Android hay không?

Thi thoảng, nếu bạn muốn thay đổi đôi chút trong thư viện ngoài, không được edit trực tiếp folder `node_module/`. Folder này giả định ignored bất kỳ các version nào, nên nếu bạn thay đổi code trực tiếp, đồng đội của bạn sẽ không thấy các thay đổi đó. Giải pháp là bạn có thể fork original repository và có thể tạo pull request tới tác giả hoặc nếu thư viện nhỏ, bạn có thể copy/paste từng component vào project của bạn sau đó thay đổi nó ở local.

# 10. Sửa đổi nội dung của 1 state array/map sẽ không re-render.

Nếu bạn có 1 biến state là 1 hashmap, sửa đổi nội dung của nó sẽ không thay đổi chính nó, nên là **render()** sẽ không được gọi. Để tránh điều này, bạn cần tạo 1 bản copy của biến đó, ví dụ sử dụng hàm **_.cloneDeep()** trong thư viện **lodash**.

# 11. Hẹn gặp lại bạn trong các bài viết tiếp theo nhé . 😍👍👍👍
Nội dung sưu tầm và đúc kết từ kinh nghiệm của mình. Cảm ơn bạn đọc .