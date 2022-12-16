# 1. Không open được simulator trên iOS.
Nếu bạn gặp vấn đề này với mả lỗi như sau .
```
error Could not find "iPhone X" simulator. Run CLI with --verbose flag for more details.
```

Việc đầu tiên là bạn hãy thử kiểm tra xem trên Xcode của mình đả có cài simulator tương thích với version và simulator mặc định của Project mình chưa.
Ở đây mình đang thấy là không tìm thấy thiết bị iPhone X và mình sẽ vào.
```
Xcode > Open Developer tool > simulator > Add Simulator
```
Để thêm 1 máy ảo mới giống tên với thiết bị không tìm thấy

![](https://images.viblo.asia/65b4e1f5-5218-47d7-8839-924e13eb489c.png)

# 2. Không nên sử dụng Expo cho các dự án 

Bạn không nên sử dụng Expo với dự án của mình. Lý do là :

- Toàn bộ quá trình bạn làm chỉ thảo tác với JS và không thực hiện một cách chi tiết đầy đủ các khâu trong quy trình sản xuất dự án. 
- Bạn không kiểm soát được các vấn đề khi gặp lỗi trực tiếp trên các thiết bị phần cứng và thực sự không chủ động về vấn đề này.
- Khi bạn sử dụng Expo đồng nghĩa với việc bạn đang thêm một gói dữ liệu phức tạp vào dự án của mình, điều này làm chậm và tằng kích thước ứng dụng .
- Quan trọng nhất là các modules iOS / Android gốc mới nhất mà bạn chắc chắn cần dùng tại thời điểm hiện tại sẽ không được hổ trợ . Bạn chỉ được dùng những modules có sẵn mà Expo SDK cung cấp. 
- Sớm hay muộn thì bạn củng sẽ phải đẩy ứng dụng Expo vào một ứng dụng React Native thông thường, vì vậy bạn không nên lãng phí thời gian của mình với Expo và bắt đầu dự án đúng cách.

# 3. Sử dụng ESLint.

Sử dụng một Linter trong bất kỳ dự án nào là điều bắt buộc, đặc biệt đối với một ngôn ngữ hoang dã như JavaScript. 
ESLint là một phần mở rộng tuyệt vời, cực kỳ dễ cài đặt, thiết lập và sử dụng, vì vậy hãy chắc chắn đưa nó vào dự án của bạn ngay từ đầu. 

Nếu bạn không đồng ý với một số quy tắc, bạn luôn có thể vô hiệu hóa chúng trong file .eslintrc, nhưng có một số loại kiểm soát chất lượng mã sẽ giúp bạn và nhóm của bạn về lâu dài.

# 4. Xóa tất cả các logs ra khỏi các bản dựng phát hành của bạn

Có nhiều câu lệnh console.log có thể làm chậm ứng dụng của bạn, đặc biệt nếu bạn đang sử dụng các thư viện logs như redux-logger . Đảm bảo tắt tất cả các bản ghi (thủ công hoặc bằng tập lệnh) khi tạo bản phát hành.

# 5. Sử dụng Flexbox

Nếu bạn không sử dụng Flexbox trong React Native thì có thể dẩn đến việc phá vỡ bố cục của ứng dụng và không cung cấp khả năng sử dụng lại cho các component mà mình viết ra.

Bất kể yêu cầu thiết kế của bạn là gì, sử dụng flexbox hầu như luôn là sự lựa chọn chính xác. Đối với những người đến từ nền web: Flexbox trong React Native hoạt động gần như chính xác như đối tác CSS của nó, sự khác biệt quan trọng là flexDirection mặc định column thay vì row trong React Native.

# 6. Đặt tên cho các Object của bạn một cách nhất quán

Nên điều hướng dự án của bạn về một mô hình tổng thể nhất quán thì việc sử dụng lại và code nhanh là điều quá bình thường. Và để nhớ hết các Component và Object chung để sử dụng lại nếu bạn không đặt tên một cách nhất quán thì có thể gây nhầm lẩn .
Chính vì vậy mà bạn nên có một quy tắc đặt tên cố định và nhất quán trong dự án để có thể thao tác nhanh hơn nhé.
Ví dụ : 

Nếu nút gửi của bạn có một đối tượng chung thì bạn nên đặt tên theo phong cách này chẳng hạn submitButton, saveButton, submitBtn hoặc submit cho các trường hợp khác.

# 7. Sử dụng toán tử ternary chính xác
Sử dụng toán tử ternary chính xác
```
Viết color = error ? ‘red’: ‘gray’ là ngắn và nên sử dụng.
Còn viết color = error ? (id === myID) ? ‘red’ : ‘black’ : ‘gray’ thì không nên. 
```

Toán tử ternary có thể giúp giảm số lượng dòng trong mã của bạn nhưng không bao giờ lồng chúng vì logic trở nên khó đọc.

# 8. Đừng lạm dụng z-Index

Sử dụng z-Index khi :
Ví dụ: nếu bạn muốn phủ `<Text>`lên trên một `<Image>`, sử dụng z Index là cách làm sai. 
  
Bạn nên sử dụng `<ImageBackground>` thành phần thay thế. 
    
Bạn không nên sử dụng nhiều thuộc tính z-Index vì thực sự mã nguồn đả hổ trợ khá đầy đủ cho bạn rồi. Và việc đưa z-Index vào khiến source của bạn trở nên rối rắm thêm.
# 9. setState () không đồng bộ
    
> Đây phải là một trong những lỗi phổ biến nhất trong React Native. 


Mặc dù việc thay đổi trạng thái của một thành phần làm cho view render lại và bạn có thể xem được các thông tin sau khi render, nhưng nếu bạn viết một cái gì đó giống như setState({ username: ‘somevalue’ }), sau đó cố gắng đọc this.state.username trong dòng mã tiếp theo thì đôi khi bạn sẽ không đọc được giá trị chính xác.

Vì setState () là một hoạt động không đồng bộ. 

`Sử dụng await setState({ username })để tránh vấn đề này.`


# 10. Hẹn gặp lại bạn trong các bài viết tiếp theo nhé . 😍👍👍👍

Nội dung sưu tầm và đúc kết từ kinh nghiệm của mình. Cảm ơn bạn đọc .