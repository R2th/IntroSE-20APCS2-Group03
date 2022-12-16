Tiếp tục với Angular JS p.2
Nếu bạn nào chưa xem p.1 thì hãy xem tại đây : https://viblo.asia/p/angular-js-for-beginners-1VgZvG6mlAw#_angular-js-la-gi-0
Phần trước tôi đã giới thiệu đến các bạn về các directive, scope, rootscope, event... hôm nay tối sẽ giới thiệu cho các bạn về làm việc với form, filter, serivce
##  Làm việc với form
Tôi sẽ giới thiệu đơn giản về cách làm việc với form đơn giản với:
* @ng-model 
* @ng-model-option
* @ng-checked
* Dropdown
    * @ng-repeat
    * @ng-option
* Validator
### @ng-model
- @ng-model được sử dụng để buộc dữ liệu 2 chiều từ $scope vào các điều khiển của form như input, select, textarea
- Nếu trong $scope chưa có thuộc tính được buộc lên điều khiển thì thuộc tính đó sẽ tự động được tạo ra
- Buộc dữ liệu 2 chiều có nghĩa là khi bạn thay đổi dữ liệu trong $scope thì sẽ làm thay đổi dữ liệu trên các điều khiển và ngược lại
Ví dụ: 
    ![](https://images.viblo.asia/69c97377-2cf8-4d0e-8601-239a72ccf00f.png)
       Khi bạn nhập dữ liệu vào ô nhập họ và tên sẽ làm thay đổi $scope.name nên sẽ làm thay đổi ngay tức thì dữ liệu hiển thị phần Họ và tên đã nhập4
 ### @ng-model-option
  - @ng-model buộc dữ liệu giữa điều khiển và $scope trong khi đó @ng-model-options qui định cách thức cập nhật dữ liệu từ điều khiển vào $scope
  - @ng-model-options được giới thiệu từ AngularJS 1.3+
   Ví dụ:
   ![](https://images.viblo.asia/67547c3e-9f71-484b-887e-ae8d5f435b1e.png)
   ![](https://images.viblo.asia/ae951710-50b9-454b-8666-9b830ed3ede2.png)
 **@ng-model-options={updateOn: ‘blur’}**
   + Thuộc tính updateOn chỉ ra thời điểm cập nhật dữ liệu trong $scope
   +  Blur là sự kiện xảy ra khi điều khiển mất trỏ phím. Bạn có thể sử dụng các sự kiện khác như: click, focus…
   +  Ngoài updateOn thì thuộc tính debounce cũng thường được sử dụng để chỉ ra sau bao lâu thì sẽ cập nhật dữ liệu vào $scope , ng-model-options={debounce: 1000} Sau 1000 mi li giây (1 giây) sẽ cập nhật dữ liệu từ điều khiển vào $scope
   +  Với checkbox thì chỉ thị ng-model buộc trạng thái của checkbox vào $scope
  ![](https://images.viblo.asia/7c1e3e4c-e9a0-4f53-b4c2-1161edb06e38.png)https://images.viblo.asia/7c1e3e4c-e9a0-4f53-b4c2-1161edb06e38.png
 **@ng-checked=”expr” sẽ chọn radio hay không tùy vào giá trị của biểu thức expr**
  Directive ng-checked=”expr” sẽ chọn radio/checkbox nếu giá trị của biểu thức expr là true, ngược lại sẽ bỏ chọn
      ![](https://images.viblo.asia/e86f91e5-dc5d-4569-a270-c3d5c56d6fe5.png)
###  DropdownList
 Được tạo ra và buộc dữ liệu vào $scope
- Sử dụng **@ng-model** để buộc giá trị mục chọn vào $scope
- Sử dụng **@ng-options** hoặc **@ng-repeat **để đổ các mục vào dropdown list.
![](https://images.viblo.asia/d3adaff5-f70b-46c1-a9bd-1ad143468ddf.png)

## Validate form
Trong HTML 5 bạn có thể kiểm lỗi form thông qua các thuộc tính của các điều khiển trên form
- required
- type = 'email'
- ....
Các thuộc tính này vẫn chưa phản ánh hết các tình trạng dữ liệu trên form
- Dữ liệu đã bị sửa hay chưa
- Có tương tác với điều khiển hay chưa
- Chưa cung cấp cách định nghĩa thêm các thuộc tính kiểm lỗi mới
- ...
- Với AngularJS các qui luật kiểm lỗi được tăng cường đáng kể, giúp kiểm lỗi thuận tiện hơn.
- AngularJS không những cho biết tình trạng lỗi của các điều khiển mà còn cho biết tình trạng lỗi của form.
- Ngoài qui luật kiểm lỗi, AngularJS còn cung cấp các class CSS giúp trình bày lỗi theo từng tình trang lỗi khác nhau
- AngularJS cũng cung cấp cách thức để bạn có thể tự định nghĩa thêm các thuộc tính kiểm lỗi riêng của mình.
![](https://images.viblo.asia/fce600cc-cbf6-4857-9f9e-77fd782b18be.png)
Để biết được một điều khiển đã nhập đúng như điều kiện kiểm lỗi hay chưa bạn cần kiểm tra $valid của điều khiển đó:
-<tên form>.<tên điều khiển>.$valid
-Ví dụ: User.txtName.$valid
Nếu đã nhập đúng thì giá trị này sẽ là true. Form hợp lệ khi tất cả các điều khiển của form hợp lệ
![](https://images.viblo.asia/1905acc2-5409-4ae2-ba36-f57897b353ef.png)

**CÁC THUỘC TÍNH TRẠNG THÁI LỖI **

| Thuộc tính  | Ý nghĩa | Ví dụ |
| -------- | -------- | -------- |
| $untouched     | chưa tác động     | frm1.txt1.$untouched     |
| $touched     | đã tác động     | frm1.txt1.$touched     |
| $pristine     | chưa có sửa chửa  | frm1.txt1.$pristine     |
| $dirty     | đax có sửa chữa     | frm1.txt1.$dirty     |
| $invalid     | chưa hợp lệ   | frm1.txt1.$invalid     |
| $valid     | đã hợp lệ     | frm1.txt1.$valid     |
| $submitted     | đã gửi data   | frm1.txt1.$submitted    |

AngularJS cung cấp các CSS class cho phép chúng ta định dạng các trang thái kiểm lỗi của form. Bạn chỉ cần override các class này để định nghĩa các định dạng mới cho việc trình bày trạng thái lỗi
    -> input.ng-invalid{} định dạng cho các thẻ <input> có dữ liệu không hợp lệ
![](https://images.viblo.asia/0761cdc9-7dca-4680-99cd-7856eaa331ac.png)
**Ngoài ra chúng ta cũng có thể validate theo cách như sau :**
+ B1: Tạo đối tượng ứng dụng
  - var app = angular.module('myapp', []);
  - B2: Định nghĩa chỉ thị
  - app.directive('evenNumber', function () {…});
+ B3: Sử dụng chỉ thị
   -<input ng-model=“age” even-number>
 - **Chú ý:**
 - Tên định nghĩa trong JavaScript là evenNumber (theo qui ước camel)
 - Tên sử dụng trên các thẻ là even-number (mỗi từ cách nhau dấu -)
 ![](https://images.viblo.asia/6e669669-2a2b-4582-b058-eb823130a750.png)
 Hàm xử lý chỉ thị phải return một đối tượng gồm
2 thuộc tính là require và link
- require: ‘ngModel’
- link: function(scope, element, attr, mCtrl). Trong hàm này chứa hàm fnValidate(value), mã kiểm tra lỗi được viết ở đây để kiểm lỗi đối số value
## Filter
AngularJS cung cấp các filter dựng sẵn đồng thời hướng dẫn cách để bạn tạo ra bộ lọc cho mục đích của riêng mình
![](https://images.viblo.asia/ef2b08ad-6707-45e7-b574-b2d8f2d0e695.png) 
- number
     -> Định dạng số -> {{ value | number : fractionsize}}
- currency
     -> Định dạng tiền tệ. -> {{ value | currency : symbol : fractionsize }}
- date
     -> Định dạng thời gian. -> {{ value | date : format : timezone }}
- lowercase
     -> Định dạng chuỗi in thường.  -> {{ string | uppercase}}, {{ string | lowercase}}
- uppercase
     -> Định dạng chuỗi in hoa. -> {{ string | uppercase}}, {{ string | lowercase}}
- json
     -> Định dạng một đối tượng thành chuỗi JSON. -> {{ object | json : spacing }}
- limitTo
     -> Giới hạn số phần tử của mảng hoặc số ký tự của chuỗi. ->{{ object | limitTo : limit : begin }}
- orderBy
     -> Sắp xếp các phần tử mảng. -> {{ array | orderBy : expression : reverse }}
- filter
     -> Lấy tập con của mảng -> {{ array | filter : expression : comparator }}
    
    ![](https://images.viblo.asia/69d5b5d4-5209-4cf3-a15b-df3a5784abf5.png)
###     Custom filter
![](https://images.viblo.asia/17c5ab2d-ee1d-4897-a9db-96d5ca1be153.png)
## Service
Trong AngularJS, dịch vụ là một hàm hoặc một đối tượng cung cấp các chức năng xử lý phía hậu trường nhằm hỗ trợ cho lập trình AngularJS
 - $location: là một đối tượng
 - $interval: là 1 hàm
 - $http: là một đối tượng
 AngularJS cung cấp sẵn rất nhiều service đồng thời cũng cung cấp cách thức để bạn có thể xây dựng dịch vụ mới của riêng mình. Để sử dụng một service, bạn chỉ cần bổ sung nó vào danh sách đối số của phương thức controller. Dịch vụ $interval là một hàm tương tự setInterval() của window
Ví dụ sau sử dụng $interval để tạo đồng hồ trên trang web. Để sử dụng dịch vụ này trước hết phải truyền thông qua đối số của hàm controller
![](https://images.viblo.asia/8101bad9-e099-4cb6-9f08-7d7e9523630f.png)
![](https://images.viblo.asia/ddcc43fe-886a-4991-bd5e-d30e2228fadf.png)
### $http giúp tạo các yêu cầu đọc dữ liệu từ server
Phương thức get được sử dụng để đọc dữ liệu từ server

  **Cú pháp**
  
    $http.get(url).then( tải dữ liệu từ url
        function (response) {}, thực hiện sau khi tải dữ liệu
        function (response) {} thực hiện nếu không tải được
    );
    
   ![](https://images.viblo.asia/36cc1e22-546d-4e97-8a22-81d4ab9edb42.png)
   
   ví dụ ta có một file json với dữ liueje như trên:
   ![](https://images.viblo.asia/90ec16cb-6a09-4a4d-89cf-e8bd3fc0f0db.png)
   
Bên cạnh $http.get() để đọc dữ liệu từ server, dịch vụ $http còn cung cấp các phương thức khác để làm việc với Web API.
- Sau đây là một số phương thức thường dùng khác:
     + $http.get(url, config)
     + $http.post(url, data, config).then(f1, f2)
     + $http.put(url, data, config) .then(f1, f2)
     + $http.delete(url, config) .then(f1, f2)
 
- Trong đó f1 là hàm xử lý thành công và f2 là hàm xử lý lỗi.
- Cú pháp của f1 và f2 là function(response){} với response chứa thông tin phản hồi từ server
- Nếu bạn nắm một trong những công nghệ lập trình phía server (PHP, Java, ASP.NET, MVC…) bạn có thể xây dựng các API. Khi đó $http sẽ tương tác rất thuận lợi.

Response chứa dữ liệu phản hồi từ server có cấu trúc như sau:
- data - > Dữ liệu chính (chuỗi hoặc json data)
- status - > Mã trạng thái
- statusText - > Mô tả trạng thái
- headers - > Thông tin về header
- config - > cấu hình của request đã yêu cầu để có response


Vì bài cũng là là dài nên mình xin được dừng tại đây, ở phần sau mình sẽ hướng dẫn các bạn tổ chức SPA với AngularJS. XIn cảm ơn!