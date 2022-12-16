# Angular JS là gì?
* AngularJS là một Framework được xây dựng trên nền tảng của JavaScript
* AngularJS rất mạnh trong lập trình giao diện phía client và tổ chức ứng dụng web Single Page Application (SPA)
* AngularJS hoạt động dựa trên các thuộc tính HTML mở rộng được gọi là directive
* AngularJS rất phổ biến, được hàng ngàn các lập trình viên trên thế giới ưa chuộng và sử dụng.

 ![](https://images.viblo.asia/f6a95991-a298-41f4-a2df-f08f11105afb.png)
###  Ưu điểm:
* AngularJS cho phép tạo ra các ứng dụng một cách đơn giản với mã được tổ chức khoa học, rõ ràng.
* AngularJS sử dụng data bind - liên kết dữ liệu với các thể HTML nên làm giảm thiểu mã lệnh đọc ghi dữ liệu.
* AngularJS có thể chạy trên hầu hết các trình duyệt điện thoại thông minh.
### Nhược điểm:
* Không an toàn: Được phát triển từ javascript nên nó không an toàn, phía máy chủ phải thường xuyên xác nhận quyền truy cập.
* Phụ thuộc: Nếu người dùng vô hiệu hóa javascript thì ứng dụng không hoạt động được.
* Hạn chế về SEO
# Bắt đầu 
Đầu tiên truy cập vào trang chủ : http://angularjs.org và download về: 

![](https://images.viblo.asia/9f92cb87-63bb-4ff0-818d-92a8088ee0c9.png)

### Chương trình đầu tiên: 
![](https://images.viblo.asia/10d79997-3aff-439a-86ae-d684f6732bb9.png)

* ng-app : Định nghĩa phạm vi ứng dụng Angularjs
* ng-controller : Định nghĩa phạm vi giao diện được kiểm soát bởi controller
* {{ wellcome }} : Biểu thức hiện thị giá trị thuộc tính wellcome trong object $scope
* var app = angular.module("my-app",[]) : Tạo ứng dụng AngularJS
* app.controller("my-controller", myfunc) : ĐỊng nghĩa function myfunc xử lý phạm vi giao diện my-controller
**$scope cũng có thể tạo một object gồm thông tin User như :**

![](https://images.viblo.asia/2da05333-5e4e-4084-92b0-1479464a2ee8.png)

### ng-bind, ng-model, $scope :
1.    ng-bind : buộc dữ liệu vào nội dung thẻ bất kỳ
2.    ng-model : buộc dữ liệu vào các điều khiển form, directive này dùng để buộc dữ liệu **2 chiều ** ( Nghĩa là khi báo biến trong scope nếu data trên điều khiển thay đổi thì data trong $scope cũng thay đổi theo )
3.    $scope : là 1 object có nhiệm vụ quản lý data (model) được share giữa controller và view ( cầu nối giữa Controller và View)
4.    $scope : ngoài ra nó còn bổ sung các methods thực hiện theo mục đích riêng 

![](https://images.viblo.asia/84b6a7b1-7a3c-4c48-b9ab-fa7289ba4e79.png)

# Event
### Định nghĩa?
 - Event là những tác động do người sử dụng tương tác vào hoặc hệ thống phát sinh ra, nghe có vẽ khó hiểu nhỉ :D, tiếp tục xem bên dưới nhé
 - Nó cần được điều khiển bẵng mã js để thực hiện một công việc nào đó
 - Event của Anguar JS được sử dụng thay vì event HTML thông thường
 - Methods của event là các properties được định nghĩa trong $scope
  **Các event thườn gặp :**
1.       Click
2.       Blur
3.       Focus
4.       Change
5.       Check
6.       ....

   ![](https://images.viblo.asia/53abcc14-2f9d-4974-82aa-31547af063cf.png)
   
   hoặc
   
   ![](https://images.viblo.asia/dc31f3a0-4bf1-4836-9098-6083b5a45c31.png)
   
###    Events trong angularjs


| Thường dùng | Chuột  | Phím  | Content |
| -------- | -------- | -------- | -------- |
| ng-blur     | ng-mousedown     | ng-keydown     | ng-paste     |
| ng-focus     | ng-mouseenter     | ng-keypress     | ng-coppy     |
| ng-change     | ng-mouseleave     | ng-keyup     | ng-cuut     |
| ng-click     | ng-mousemove     |
| ng-dblick     | ng-mouseover     |
| ng-submit     | ng-mouseup     |

# $scope & $rootScope
- Trong AngularJS, Controller là một hàm có nhiệm vụ thực hiện xử lý dữ liệu trong đối tượng $scope. Dữ liệu sẽ được đồng bộ lên giao diện (View) thông qua cơ chế data-binding
- Khi một controller được gán vào một thẻ HTML bằng directive ng-controllerthì AngularJS sẽ tạo ra một đối tượng $scope mới chứa dữ liệu và các phương thức dành riêng cho controller làm việc với phạm vi giao diện của thẻ đó
- Trong phạm vi ứng dụng angular có thể có nhiều controller. Mỗi controller điều khiển 1 view riêng và có $scope quản lý dữ liệu riêng

![](https://images.viblo.asia/b8fc4a8c-ea1d-4137-a0a0-f4b9eaf6d9a2.png)
 
 Cơ chế: Mỗi $scope trong mỗi controller là khác nhau, và mỗi $scope chỉ xử lý data trên từng vùng dữ liệu của controller được khi báo $scope đó:
 ![](https://images.viblo.asia/2a69adc3-685f-4b96-b2b3-d4c85575b382.png)
 
 - Dữ liệu trong mỗi scope là khau nhau, không thể truy xuất vào dữ liệu của scope khác! vậy nếu chúng ta có scope trùng data với nhau thì sao? nó lặp code -> đó là điều tối kí của một Programmers professional.
 
 ![](https://images.viblo.asia/5487df30-04e3-447b-909a-ce76293a2089.png)
 - Ơ? cái gì vậy? :D :D
     - Như các bạn đã thấy trong $scope con có thể truy xuất trực tiếp scope cha thông qua $parent còn ngược lại thì không.
     - $rootScope có thể truy xuất trực tiếp trong phạm vi ng-app hoặc sử dụng $parent
     - Cần khai báo tham số $rootScope nếu controller muốn làm việc với $rootScope

# Directive
Cơ bản: 
    - @ng-app, @ng-controller và @ng-bind thì mình đã giới thiệu ở trên, còn @ng-init là khởi tạo thuộc tính dữ liệu trong $scope
 Directive về giao diện:
1. @ng-show ="expression": Hiển thị khi biểu thức có giá trị true
1. @ng-hide ="expression"  : Ẩn khi biểu thức có giá trị true
1. @ng-if ="expression"        : Thực hiện hiện khi biểu thức có giá trị false
1. @ng-switch ="expression": Thực hiện @ng-switch -when="value" khi biểu thức có giá trị là value
1. @ng-repeat ="array"          : Duyệt các phần tử trong mảng
    
   ![](https://images.viblo.asia/54e17a05-1359-46c6-a971-d7eb0859ccb6.png)
    
    những cái khác cũng tương tự, cú pháp bạn tham khảo trên Http://angularjs.org
    
    
    Vì bài cũng khá là dài rồi nên mình sẽ chuyển phần còn lại qua bài viết sau, trong bài viết có gì sai sót mọi người bỏ qua cho mình :D , mọi người có thể kham khảo nguồn trên trang chủ để rõ hơn. mình xin kết thúc tại đây