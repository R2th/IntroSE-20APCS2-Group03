Trước hết chúng ta đều biết rằng, cả 3 thằng này đều là  để lưu một ít thông tin ở trên trình duyệt để sau này có thể sử dụng dễ dàng hơn.
Khác biệt lớn nhất ở đây là nơi mà chúng lưu trữ và chúng có được gửi đi cùng request  hay là không và thời gian tồn tại của chúng là bao lâu.
Vậy hôm nay chúng ta tìm hiểu kỹ hơn về 3 khái niệm này và nêu lên sự khác nhau giữa chúng như thế nào nhé.
## localStorage là gì ?
Tất cả các trình duyệt hiện đại đều hỗ trợ chức năng này. LocalStorage giúp website lưu trữ dữ liệu vĩnh viễn trên trình duyệt. Trừ khi người dùng xóa cache hoặc làm các hành động như cài lại trình duyệt.

Về cơ bản, nó như một table trong Excel, nhưng chỉ có hai trường là: key và value.
Một số ví dụ dùng localStorage như một số user preferences: ngôn ngữ, theme, danh mục sản phẩm được chọn, giao diện tuỳ chỉnh, dashboard, layout, …

Để có thể tạo ra 1 localStorge ở trên trình duyệt thì ta  thực hiện như sau:
```
window.LocalStorage.setItem('name', 'value');
```
Để đọc lại giá trị, bạn gọi hàm:
```
window.LocalStorage.getItem('name');
```
Và để xóa chúng đi:
```
window.LocalStorage.clear(); //xóa tất cả
window.LocalStorage.removeItem('name'); //chỉ xóa phần tử có tên là name
```

Có rất nhiều giá trị trong một ứng dụng website nên lưu trong LocalStorage thay vì SessionStorage.

Tuy nhiên, bạn nên lưu ý là LocalStorage không bảo mật. Bạn có thể dễ dàng lưu dữ liệu, lấy dữ liệu và chỉnh sửa dữ liệu từ LocalStorage.

Ngoài ra, điểm yếu của LocalStorage là nó chỉ lưu đơn thuần một String. Các kiểu dữ liệu phức tạp đều không phù hợp để lưu trong LocalStorage.

## sessionStorge là gì ?
sessionStorage khá giống với localStorage. Vì chúng đều thuộc về web storage API.

* Lưu data theo cặp key/value ở local browser và phía server không access được các data này.
* Có cùng APIs: setItem, getItem, removeItem, clear.
* Cho phép lưu trữ nhiều data(khoảng 10MB).

Một khuyết điểm của cả localStorage và sessionStorage là có thể bị đọc bởi Javascript. Do đó dễ bị đánh cắp thông tin thông qua một cross-site scriting.
Vì vậy, chúng ta không nên lưu trữ những thông tin nhạy cảm như token ID, password, username, email của người dùng vào localStorage hay sessionStorage.

Ví dụ về các hàm:
```
// Save data to sessionStorage
sessionStorage.setItem('key', 'value');

// Get saved data from sessionStorage
var data = sessionStorage.getItem('key');

// Remove saved data from sessionStorage
sessionStorage.removeItem('key');

// Remove all saved data from sessionStorage
sessionStorage.clear();
```

Khi close tab hay close browser thì data ở localStorage vẫn tồn tại, và chỉ bị mất khi user xoá cache hoặc clear web data. Còn đối với sessionStorage thì data sẽ bị mất ngay khi close tab hoặc close browser.

## Cookie là gì ?
Cookies là các tệp được trang web người dùng truy cập tạo ra. Cookie giúp trải nghiệm trực tuyến của bạn dễ dàng hơn bằng cách lưu thông tin duyệt web. Với Cookies, các trang web có thể duy trì trạng thái đăng nhập của bạn, ghi nhớ tùy chọn trang web và cung cấp nội dung phù hợp với vị trí của người dùng. Và bản chất lưu trữ Cookie cũng là một bản ghi đơn giản gồm key, value.

### Một số điểm nổi bật của cookie đó là:
* localStorage chỉ access được trên browser client; còn cookies thì có thể access được ở browser client và cả phía server (khi tạo một http request thì cookies của browser sẽ được attach vào header Cookie, từ đó phía server có thể parse header này và get được data cookie).
* cookies có thời gian hết hạn expires, sau thời gian này thì cookies sẽ biến mất khỏi browser.
* cookies chỉ cho phép lưu tối đa khoảng 4 KB, vì vậy ta nên sử dụng cookies với mục đích save những loại data simple ví dụ như token cho authentication,...

Ví dụ hàm set-cookie trong Javascript:
```
document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
```

Cookie thường được dùng để đăng nhập, lưu vài giá trị cơ bản và đơn giản. Cookie không bị giới hạn bởi độ dài dung lượng hay ký tự. Tuy nhiên vì nó chuyển từ Client tới Server và ngược lại theo Header Request. Nên chúng càng nhẹ càng tốt. Trong các cách tăng tốc website thì giảm bớt Cookie là một ý kiến hay ho…

### Một số lưu ý khi dùng cookie:
* Nên xác định thời gian expire/max-age. Thông thường chỉ nên cho phép một cookie chứa thông tin để authenticate trong khoảng 3-4 tháng. Để tránh người dùng phải đăng nhập nhiều lần, chúng ta cung cấp một option lưu trữ thông tin để lần sau user không cần đăng nhập nữa.
* Nếu cookie dùng để authenticate nên set httpOnly bằng true. Dùng cờ này để không cho phép đọc được cookie từ Javascript. Tránh được sự tấn công từ bên ngoài bằng thủ thuật scripting.
* Dễ bị đánh cắp thông tin người dùng. Cho nên đừng bao giờ lưu password nguyên gốc của user mà hãy mã hoá nó, hay dùng token-based authentication.

## Kết luận
* Vì localStorage và sessionStorage được lưu trữ trên trình duyệt của người dùng, nên các bạn cần phải xem xét nội dung lưu trữ có liên quan đến vấn đề bảo mật hay không.
* Và cũng chính vì localStorage và sessionStorage được lưu trữ trên trình duyệt nên việc sử dụng nó sẽ không ảnh hưởng đến hiệu xuất của trang web nhưng nó sẽ làm nặng trình duyệt của người dùng (không đáng kể).
* Về phạm vi: sessionStorage: giới hạn trong một cửa sổ hoăc thẻ của trình duyệt. Một trang web được mở trong hai thẻ của cùng một trình duyệt cũng không thể truy xuất dữ liệu lẫn nhau. Như vậy, khi bạn đóng trang web thì dữ liệu lưu trong sessionStorage hiện tại cũng bị xóa. Còn localStorage: có thể truy xuất lẫn nhau giữa các cửa sổ trình duyệt. Dữ liệu sẽ được lưu trữ không giới hạn thời gian.