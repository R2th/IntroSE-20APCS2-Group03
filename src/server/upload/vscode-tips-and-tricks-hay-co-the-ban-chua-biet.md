Visual Studio Code là một công cụ “Code Editing” được Microsoft phát hành năm 2015. Nhanh và mạnh mẽ, quan trọng là miễn phí :D, VsCode đang ngày càng trở nên phổ biến, trong bài viết này mình sẽ chia sẻ 1 số mẹo hữu ích để code hiệu quả hơn trên phần mềm đa năng này.

## 1. Tự tạo custom snippets

Chắc hẳn mọi người khi code đều muốn có thật nhiều snippet để việc code nhanh thuận tiện, nhưng có nhiều thứ VsCode và các package không có sẵn, mình sẽ giới thiệu 1 cách để các bạn tự tạo snippet cho riêng mình.

Đầu tiên ta sẽ đi tới chức năng này: 
`File > Preferences > User Snippets (Code > Preferences > User Snippets on macOS)`

Lúc này VsCode sẽ xuất hiện 1 dropdown các lựa chọn ngôn ngữ: 

![](https://images.viblo.asia/b3d84ebc-47d0-40ab-b4dc-cc3ac2177339.png)

Ví dụ ta search  và chọn javascript, đây là file javascript.json mở ra: 

![](https://images.viblo.asia/11d4e77b-f6a5-4719-923e-e1ffda387c3d.png)

Trong đây đã hướng dẫn sử dụng sẵn rồi, ta làm thử 1 ví dụ tạo shortkey cho arrow function: 

![](https://images.viblo.asia/ce7ddf4d-ffe2-46f4-b1b4-0e82d40ea8c6.png)

Trong đó prefix là shortkey, body là nội dung sẽ xuất ra, description là mô tả sẽ hiển thị bên cạnh khi bạn gõ shortkey.

Save xong thì ta sang 1 file js để test, gõ `arf`, VsCode sẽ show ra: 

![](https://images.viblo.asia/79805725-5920-4d63-81bc-87ac5cddb3a1.png)

Ok, cái chúng ta vừa tạo đã ở đây rồi, Enter và kết quả: 

![](https://images.viblo.asia/c18e635d-3e2e-415e-b9f0-b0817719912a.png)

![](https://images.viblo.asia/933ad0f1-aa3d-489a-8a1e-8a5f835c8558.gif)


## 2. Xoá khoảng trắng

![](https://images.viblo.asia/c2b38b35-881d-4733-9ca6-e161a7410e4c.png)

Giả sử chúng ta có khoảng trắng đằng sau thẻ `b` như trên, thay vì trỏ chuột tới và xoá thủ công thì ta có thể bôi đen đoạn đó hoặc toàn trang (cho nhanh :robot:) và nhấn tổ hợp phím `⌘K + X`, (`Ctrl K + X` với Window và Linux), `⌘K` để lựa chọn phần đã bôi đen, ấn thêm `X` (trong khi vẫn giữ `⌘`) để xoá khoảng trắng:

![](https://images.viblo.asia/cd0b232e-9e33-457b-8e43-fbfe7152d33c.png)


## 3. Code formatting

![](https://images.viblo.asia/73143cc1-2d0d-4be6-a05a-1bf0dd060199.png)

Nhìn thật khó chịu phải không nào!

Để format đoạn code trên, bôi đen và ấn `⌘K + F`. Kết quả:

![](https://images.viblo.asia/4c245dc9-df02-4745-a59f-c94af63258d7.png)

![](https://images.viblo.asia/05850509-e478-4d00-973c-af65e079d39e.png)

Mẹo `không nhỏ` là cách này xoá được cả khoảng trắng, tuy nhiên cứ thêm mục 2, biết đâu có người thích dùng riêng như vậy thì sao, ngoài ra cách này cũng không xoá được khoảng trắng trong comment còn cách ở mục 2 thì vô tư :D


## 4. Column (box) selection

![](https://images.viblo.asia/5c466590-68dc-4011-94f7-ce4d445d9066.gif)

Đôi khi ta không muốn xoá cả đoạn mà chỉ muốn xoá 1 cột, 1 phần nào đó theo chiều dọc như trên thì chỉ cần giữ `Shift+Alt` và kéo chuột để bôi đen phần cần xoá, việc còn lại là nhấn `BackSpace`!


## 5. Thay đổi toàn bộ 1 đoạn text có trong 1 file

Đầu tiên ấn tìm kiếm, thanh tìm kiếm hiện ra thì ấn vào mũi tên khoanh đỏ như hình:

![](https://images.viblo.asia/2bc2e5df-eee8-4629-8fe7-80bc0a09256a.png)

1 ô nhập hiện ra bên dưới, trong đó ô trên là từ ta muốn thay đổi, ô dưới là kết quả ta muốn nó trở thành:

![](https://images.viblo.asia/b6617497-a579-4b4b-b692-28667bd06e56.png)

Tiếp đó ấn nút khoanh đỏ:

![](https://images.viblo.asia/2e31685a-e9e7-4a47-aaed-d88be031cbc2.png)

Thành quả là như ví dụ trong hình trên, toàn bộ những text `haha` trong file sẽ được đổi thành `hihi`. 

Mẹo này tuy hữu hiệu nhanh gọn nhưng bạn phải cần thận, vì đôi khi bạn có thể đổi cả những đoạn text ngoài ý muốn nếu không kiểm tra kỹ, ví dụ bạn muốn xoá toàn bộ class `btn` và làm theo cách trên, nhưng không để ý còn 1 class là `btn-info`, kết quả là nó sẽ bị xoá thành `-info`   ![](https://images.viblo.asia/275fd211-dd05-4f7d-8ab7-5035c37f9919.gif)  
### 
**Trên đây là 1 số thủ thuật khá hay ho trong VS Code, hy vọng có thể giúp các bạn code hiệu quả hơn. Nếu ai có những tips, tricks khác có thể comment chia sẻ cho mọi người. Cám ơn vì đã xem! :grin:**


### Tham khảo
https://code.visualstudio.com/docs/getstarted/tips-and-tricks