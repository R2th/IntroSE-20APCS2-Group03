Một vài cách để fix lỗi trong node_module ( dùng patch-package, ... )
## 1. Khi cần fix thư viện từ npm:
Đối với các anh em người chơi hệ js , thì chắc đều không lạ lẫm gì với việc cài đặt các thư viện của bên thứ ba qua câu lệnh 
`npm install <package name>` ( hoặc yarn )

Các thư viện này sau khi được cài đặt sẽ nằm trong node module và tôi và các bạn chỉ việc lấy ra sử dụng.

![](https://images.viblo.asia/35468773-2fcb-4363-8ac0-52a6a00f2f07.jpg)

Những gì có trong node_module chúng ta không cần thiết phải biết gồm những gì.

Node_module có khi còn là vùng cấm không ai muốn đụng vào.

Xóa node_module và cài lại cũng là 1 trong những giải pháp tâm linh chắc chắn bạn từng sử dụng để fix bug trong tuyệt vong.

Vấn đề phát sinh khi chúng ta phát hiện 1 issues của thư viện không như chúng ta mong muốn nhưng không muốn tìm thư viện khác để thay thế.

### Vậy làm cách nào để tự mình sửa thư viện và không bị mất đi nếu xóa node_module 
Chúng ta có những cách sau đây:

## 2.Các cách sửa thư viện trong node_modules
### Cách 1: Fork repo của package
Bạn có thể vào source code của package đó, fork về git của mình một bản , sửa đổi nó sau đó sửa.

Sau đó khai báo nó vào trong package.json:
Ví dụ như này 
![image.png](https://images.viblo.asia/072ae723-f94b-4da3-9802-17bd928bfb57.png)

Thay số phiên bản của package bằng đường dẫn đến repo của bạn theo dạng `git+{repo}`

Đến đây bạn có thể sẽ gặp một số vấn đề nếu cố sửa đổi các package siêu to khổng lồ như mấy cái của facebook, có vài package lại là thư mục con của 1 package khác.

Bạn có thể vào trang https://gitpkg.vercel.app/ , dán đường link trực tiếp đến thư mục chứa package đó . Trang web này sẽ render cho bạn 1 đường link và cả câu lệnh yarn ( npm ).

(Lý thuyết là thế, nhưng nó có chạy hay không thì, ..., để chắc kèo thì mọi người có thể chơi cách 2 )
### Cách 2: Sử dụng patch-package
Cách này trực tiếp hơn cách thứ nhất, 

Bạn cứ mạnh dạn tìm đến chỗ code trong node_module bạn định sửa và mạnh dạn sửa nó.

Sau đó chạy câu lệnh: 

` npx patch-package <package name>`

patch-package sau đó sẽ tạo một thư mục patches, khai báo về các thay đổi của bạn. 

Bạn có thể push folder này lên git và chạy lệnh `npx patch-package` để render lại những thay đổi của bạn.

Để đỡ mất một bước mỗi khi install lại project, bạn có thể thêm dòng `"postinstall": "npx patch-package"` vào script như thế này để node_module tự render theo thay đổi của bạn mỗi khi install lại .

![image.png](https://images.viblo.asia/ef048d12-b117-4597-8e6e-3de033978daa.png)

## 3. Demo:
Mình có một demo nho nhỏ .

Đó là đổi cái cái logo mặc định của thằng metro trong REACT-NATIVE,
sau 1 hồi lục lọi mình phát hiện ra cái đống ấy viết ở một file tên TerminalReporter.js trong /node_modules/metro/src/lib

Tưởng là sẽ có mấy hàm thuật toán loằng ngoằng để in ra như hồi học C++ ở trường, nhưng không, nó chỉ là cái mảng chứ từng dòng dấu #### một :))))) 
Thế thì dễ rồi, mình cứ thế mà đổi lại thôi.

Từ:

![image.png](https://images.viblo.asia/6dffe6ba-b46f-43a1-a235-d30d12bf7cfa.png)

Thành: 

![image.png](https://images.viblo.asia/adef09a3-5890-477a-92af-7c5c4dbc7118.png)

( Mình làm trong những ngày deadline dí tận cổ, bận quá nên mình quyết định nằm nghịch hết 1 ngày cho đỡ khủng hoảng, nghịch xong stress hơn )