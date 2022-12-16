JavaScript là một trong những ngôn ngữ quan trọng và thông dụng nhất đang sử dụng trên thế giới. Xuất hiện hơn 20 năm trước, JavaScript đã không ngừng phát triển. Từ một ngôn ngữ với rất nhiều lỗi, gây phiền phức cho người sử dụng như các popup JavaScript không mong muốn trên các trình duyệt, thì ngày nay ngôn ngữ JavaScript là sự chọn lựa cho lập trình web client-side. Các trình duyệt không những hỗ trợ JavaScript mà còn cung cấp các tính năng tìm lỗi, sửa code ở chế độ run-time. JavaScript ngày nay không chỉ xuất hiện trên các ứng dụng máy tính mà nó đang là nển tảng cho lập trình trên thiết bị cầm tay.

Tuy là một trong những ngôn ngữ mạnh nhất hiện nay nhưng lập trình bằng JavaScript lại thường gặp phải những vấn đề lớn về thời gian viết code, các file JavaScript dài dòng, khó đọc, khó quản lý. Đôi khi lập trình JavaScript cũng khá tự do, không theo một thiết kế hay kiến trúc nào nên dẫn đến khó kiểm tra, khó nâng cấp cũng như hạn chế khả năng tái sử dụng các code JavaScript. Một hạn chế rất lớn của JavaScript là Unit test. Viết Unit test cho VB.Net hay C# là rất dễ nhưng để viết Unit test cho Javascript là cực kỳ khó.


Để tăng hiệu quả của JavaScript, Google giới thiệu một JavaScript framework tên là AngularJS và nó nhanh chóng thu hút sự chú ý của cộng đồng lập trình. AngularJS là một framework nguồn mở được phát triển từ năm 2009 bởi Misko Hevery và Adam Abrons với một dự án tên là “GetAngular”.

Hevery đã thuyết phục được Google rằng khi sử dụng “GetAngular” thì số dòng code ban đầu từ 17.000 dòng giảm xuống còn 1.500 dòng. Ấn tượng với kết quả đó, Google đã đổi “GetAngular” thành dự án mới “AngularJS”. Thành công đâu tiên của AngularJS là khi Google sử dụng AngularJS viết lại một phần những ứng dụng của“DoubleClick”.

Từ thành công này, Google đã quyết định đầu tư thêm nhân sự cho AngularJS.

AngularJS cho người lập trình một phương pháp lập trình hoàn toàn mới nhằm đạt những mục đích khi xây dựng phần mềm như giảm thời gian viết code, thiết kế, tổ chức mã code rõ ràng. Tăng khả năng sử dụng lại các javascript component và thực thi Unit test dễ dàng.

Một câu hỏi là tại sao nó được gọi là AngularJS? Dấu cơ bản nhất trong HTML là “angle brackets”  “<” và “>”. Có thể đoán Angular xuất phát từ  “angle” bởi vì trong AnglarJS có một chức năng rất đặt biệt đó là khả năng mở rộng ngôn ngữ HTML.

# Những điểm nhấn trong lập trình AngularJS
## 1. Model –View – Controller
AngularJS đã đưa ra mô hình MVC vào thiết kết client side nhằm mục đích sắp xếp lại cấu trúc của ứng dụng cũng như giúp cho thiết kế, testing ứng dụng được hiệu quả hơn. Nhưng mô hình MVC trong AngularJS không hoàn toàn giống với mô hình MVC truyền thống mà nó hướng về mô hình MVVM (Model-View-ViewModel) hơn.
Ví dụ 1:

VIEW
```html
<tbody  ng-app="Online" ng-controller="OrderController"> 
  <tr ng-repeat="item in items ">     
    <td> {{item.name | uppercase}}</td>   
    <td> <input type=text ng-model="item.price" > </td>
    <td> <input type=text ng-model="item.quantity"> /td>
    <td>{{item.price * item.quantity |currency}}</td>
  </tr>   
  <tr>
    <td>Tong Cong</td> 
    <td>{{Sum() |currency}}</td>
  </tr>   
</tbody>
```
CONTROLLER
```javascript
angular.module('Online', []);
function OrderController($scope) {
  $scope.items = [
    { name: "TV", price: 1000, quantity: "1", 
      image: "\\Images\\tv.jpg" },
    { name: "Iphone 6", price: 1050, quantity: 
         "1", image: "\\Images\\Iphone.jpg" },
  $scope.Sum = function () {
     var total = 0; for (count = 0; count < 
         $scope.items.length; count++)
        { total += $scope.items[count].price *  
          $scope.items[count].quantity; }
          return total;}
 $scope.title = 'Online Shop';}
```
Từ ví dụ 1, chúng ta thấy rằng AngularJS đưa ra mô hình thiết kế rất rõ ràng:
* View: đơn thuần là một HTML template để hiển thị dữ liệu tới người sử dụng. Dữ liệu được lấy từ Model
* Model: là dữ liệu để hiển thị lên View, trong thí dụ 1, Model là “items”, “Sum”, “title”. Model chỉ là plain old JavaScript objects, không sử dụng setter/getter để truy cập dữ liệu. Điều này giúp cho người lập trình giảm đáng kể số lượng dòng code. Model được đóng gói trong controller.
* ViewMode: chính là “$scope” trong ví dụ 1. “$scope” là một JavaScript object rất quan trong trong mô hình MVC AngularJS bởi Controller và View là hoàn toàn độc lập nên “scope” là cầu nối, giữ liên kết giữa View và Controller. Nhiệm vụ của nó là phát hiện những thay đổi trong Model và thực thi các biểu thức liên quan đến những thay đổi này.
* Controller: nơi thực thi các business logic, được xem như là code behind của View, là nơi Model hoạt động.

AngularJS không những giúp cho thiết kế Javascript được rõ ràng mà nó còn giúp cho phân công nhân sự trong dự án hoàn toàn độc lập giữa người phát triển UI và người xử lý business logic bên dưới.

## 2. Two-Way Data Binding
Thông thường, một biến ở Model “items” gắn với một HTML element ở View. Nếu người sử dụng thay đổi giá trị ở View, như là nhập giá trị vào một text box đơn giá hay số lượng, thì người lập trình phải viết lệnh hay hàm cập nhật giá trị mới  của text box vào Model. Nhưng trong ví dụ 1, không có bất kỳ đoạn code nào xử lý sự kiện của 2 text box “Don Gia” và “So Luong”, nhưng khi giá trị các text box này thay đổi thì những nơi sử dụng hai text box này như biểu thức `{{item.DonGia * item.SoLuong |currency}}` hay `{{Sum() |currency}}` đều được tự động cấp nhật. Đó là kỹ thuật đồng bộ dữ liệu rất hay giữa  Model và View. Việc tự động đồng bộ dữ liệu giữa Model và View giúp người lập trình giảm đến hàng ngàn dòng code trong một dự án. Người lập trình chỉ cần định nghĩa mối quan hệ giữa Model và View, các event xử lý bên dưới sẽ do AngularJS quản lý. Nếu trước đây, mất bao nhiêu thời gian để đồng bộ dữ liệu giữa Model và View thì trong AngularJS, người lập trình chỉ cần tạo liên kết giữa Model và View thông qua “ng-model”. Việc định nghĩa mối quan hệ giữa Model và View cũng cực kỳ đơn giản, chỉ cần đặt các field của Model “item” vào HTML syntax như ví dụ 2 dưới đây:
VIEW
```html
<tr ng-repeat="item in items ">     
   <td>{{item.name | uppercase}}</td>   
   <td> <input type=text ng-model="item.price"></td>
   <td> <input type=text ng-model="item.quantity"></td>
   <td>{{item.DonGia * item.SoLuong |currency}}</td>
</tr>
```
## 3. Sự linh hoạt của Filter, Sort
AngularJS Filter được sử dụng để trích dữ liệu và định dạng dữ liệu. Người lập trình chỉ nói cho AngujarJS biết  tôi đang cần cái gì hơn là phải đi làm công việc đó. Ví dụ 1 có những từ đầy đủ ý nghĩa, dể hiểu, đi sau kí tự “|” như là “currency”, “uppercase” chính cách để AngularJS định dạng dữ liệu trên UI như kiểu tiền tệ `<td>{{item.price * item.quanlity |currency}}</td>`,  chữ  hoa `<td>{{item.name | uppercase}}</td>`. Khi nhìn vào code, chúng ta có thể hiểu ngay mục đích và ý nghĩa của câu lệnh. Ngoài những kiểu định dạng chuẩn như “lowercase”, “number”, AngularJS hỗ trợ người lập trình xây dựng riêng những kiểu định đạng kiểu dữ liệu khác như datetime, hay thay thế các ký tự đặt biệt…

Ví dụ 3 – tạo một custom filter thay thế ký tự đặc biệt trong chuỗi:
Filter.js
```javascript
var app = angular.module('Online', []);
app.filter('replaceSpecialCharacter', function () {
    return function (name) {
        return name.replace(/[^\w\s]/gi, '');
    };});
```
Filter.JS định nghĩa một hàm “’replaceSpecialCharacter’” dùng thay thế ký tự đặt biệt thành khoảng trắng. Bất kỳ dữ liệu nào trên UI cần thay thế các ký tự đặc biệt, chỉ cần đặt “’replaceSpecialCharacter’” sau chuỗi như `<td> {{item.name|’replaceSpecialCharacter’} </td>`. Các file filter chỉ là các POJO class, nên nó hoàn toàn có thể xây dựng thành thư viện cho các project sau.

Trích dữ liệu và sắp sếp dữ liệu trong  AngularJS cũng cực kỳ đơn giản và rất hiệu quả. Người lập trình cũng chỉ nói cho AngularJS biết tôi muốn trích dữ liệu gì và sắp sếp field nào, theo thứ tự tăng hay giảm. Từ ví dụ 1, giả sử cần có chức năng tìm kiếm và sắp sếp theo “price”, trong phần View chỉ cần thêm vài dòng code như thí dụ dưới đây:

Ví dụ 4 – Tìm kiếm và sắp sếp dữ liệu:
```html
<tr>         
   <td>Tim Kiem Ma Hang: <input ng-model="search"></td> 
</tr>
<tr> <td> Sap xep theo Gia: 
    <select ng-model="SortPrice">
        <option value="">-- Sap xep --</option>
        <option value="price">Tang</option>
        <option value="-price">Giam</option>
     </select>
</td></tr> 
<tr ng-repeat=" item in items  
               |filter:search|orderBy:SortPrice">     
    <td>{{item.name}}</td>  
…  
</tr>
```
Text box search `<input ng-model="search">` để nhập vào dữ liệu tìm kiếm và một comboo box sắp xếp theo “price” tăng/giảm dần `<select ng-model=”SortPrice”>`. Dòng lệnh `<tr ng-repeat=” item in items |filter:search|orderBy:SortPrice”>` có thêm hai lệnh “filter:search” và “orderBy:SortPrice”. Lệnh “filter:search” yêu cầu AngularJS tìm kiếm dữ liệu theo text box `<input ng-model=”search”>`. Ở đây, không nói rõ tìm kiếm theo field nào nên AngularJS sẽ tìm tất cả các field trong Model.  Nếu yêu cầu AngularJS tìm kiếm theo field “name”, chỉ cần thêm “name” vào sau Model “search”:  `<input ng-model=”search.name”>`. Hoàn toàn không có một đoạn code JavaScript nào ở View hay Controller. Nếu mỗi màn hình đều có yêu cầu chức năng tìm kiếm, chúng ta sẽ tiết kiệm một lượng lớn thời gian lập trình và test. Tương tự như tìm kiếm, sắp sếp dữ liệu cũng chỉ cần gọi lệnh “orderBy:SortPrice” trong đó “SortPrice” trên View là một combox `<ng-model=”SortPrice”>` chỉ đến Model “price”. Chú ý rằng khi muốn sắp sếp theo giảm dần, dấu ‘-‘ phải được thêm trước field `<option value=”-price”>Giam</option>`. Như vậy xem như tất cả các công việc tìm kiếm, sắp xếp dữ liệu trong Model đã được AngularJS hỗ trợ. Người lập trình chỉ yêu cầu AngularJS làm gì mà thôi. Tương tự như định dạng dữ liệu, người lập trình có thể viết riêng cho dự án các hàm sắp xếp hay tìm kiếm tùy theo yêu cầu từng dự án.
## 4. Directives (các chỉ thị)
Không thể bàn cãi về sức mạnh của ngôn ngữ HTML, nhưng HTML bó buộc người lập trình phải theo cú pháp của nó. Thí dụ như lệnh tạo button có cú pháp `<button id=”id” class=”Default”>` thì mỗi trang muốn tạo button đều phải tuân theo cú pháp này, các ứng dụng khác cũng phải như thế. Trang thứ hai không thể sử dụng lại button đã định nghĩa ở trang thứ nhất. Người lập trình không thể định nghĩa các syntax HTML element/ attribute mới như là  `<save-Order></save-Order>` ,`<print-Invoice></print-Invoice>`, `<div view-Order></div> `
đúng với mục đích, ngữ cảnh của mỗi button. Những vấn đề này được AngularJS giải quyết thông qua kỹ thuật gọi là Directives. Nói các khác, Directives cho phép người lập trình mở rộng ngôn ngữ HTML, chỉ cho HTML các cấu trúc mới của DOM. Nhìn vào các thí dụ trên chúng ta thấy rằng có nhiều attribute không thuộc HTML trước đây như là “ng-model”, “ng-repeat”, “ng-controller”. Đó chính là các Directive có sẵn và AngularJS hỗ trợ cho người lập trình tạo ra các Directives tương tự như thế. Bốn loại trong cấu trúc DOM mà người lập trình can thiệp vào đó là:  E = element , A = attribute, C = class, M = comment. Mỗi cách định nghĩa trên tương ứng với cách gọi trong HTML như là `<save-Order></save-Order><div save-Order></div>`, `<div class=”save-Order”></div>`, `<!– directive: save Order –>`. 

Ví dụ dưới đây tạo ra một Directive button:

Ví dụ 5: Directive hiển thị giỏ hàng

Directives.JS
```javascript
// Directive cartItems: hiển thị giỏ hàng
directive('cartItems', function () {
    return {
        replace: true, restrict: 'EA',
        templateUrl: 'SelectedCart.html'
    };});
```
Cách gọi Directive trên View
```html
<body ng-controller="OrderController">
   <div id="main">
      <div><cart_Items></cart_Items></div>
   </div>
</body>
```
SelectedCart.html
```html
<div><img src="..\\Images/cart.png" alt="Items: "/>                 
 <span>( {{selectedItems.length}} )</span></div>
```
Trong file Directives.JS, định nghĩa một directive mới “cartItems” với từ khóa “restrict: ‘EA’” nên nó vừa là Element vừa là Attribute. “templateUrl” chỉ đến file HTML template là nội dung của Directive. Mục đích của directive này là hiển thị hình giỏ xe hàng và số lượng hàng hóa đang được chọn nên  nội dung của template ‘SelectedCart.html’ là các syntax hiển thị hình ảnh và số lượng item được chọn. View chỉ gọi tên directive này `<div><cart_Items></cart_Items></div>` để hiển thị giỏ hàng. Directive rất hay bởi vì ngoài cách viết code theo kiểu khai báo làm cho mã code rất dễ đọc, nó còn cho phép người thiết kế có thể thiết kế các trang web mà không cần phải biết code và quan trọng là các directive này hoàn toàn độc lập nên có thể sử dụng lại cho dự án khác hay chia sẽ cho cộng đồng. Khi xây dựng Directive cần chú ý là không nên sử dụng tiếp đầu ngữ là “ng-” đặt tên cho custom Directive mới gì nó sẽ gây nhầm lẫn với các Directive của AngularJS và cách đặt tên phải theo chuẩn camel-cased. Thí dụ Directive “cartItems”, trong HTML, chúng ta phải thêm ký tự “-“ vào  thành “cart_Items”.
## 5. HTML Template
Trong thí dụ 5, AngularJS sử dụng một html template ‘SelectedCart.html’ để hiển thị nôi dung trên View. Html template giúp cho người lập trình giải quyết những yêu cầu về UI “động” rất nhanh như trên cùng một tập dữ liệu, nếu là nhà quản lý, thì dữ liệu sẽ hiển thị đầy đủ nhưng nếu nhân viên thì dữ liệu hiển thị sẽ ít hơn. Hay cũng trên 1 tập dữ liệu, nếu mặt hàng là TV  thì phải hiển thị cột “Mô tả” là một file video, nhưng các hàng khác chỉ hiển thị là text. Cách đơn giản nhất có lẽ là sử dụng 3 Directive “ng-repeat”, “ng-switch on” và “ng-switch-when” có cấu trúc như là vòng lập “for … switch .. case” để gọi đúng template ứng với giá tri của Model.

Ví dụ 6 – dynamic template:
```html
<div ng-repeat="item in items">
    <div ng-switch on="item.name">
         <div ng-switch-when="TV" >
             <div template_Video div>
         </div>
         <div ng-switch-when="Laptop">
             <div template_Text</div>
</div></div></div>
```
## 6. Dependency Injection (DI)
Đây có lẽ là kỹ thuật hay nhất của AngularJS. DI là một design pattern, có thể hiểu đơn giản cách làm giảm sự phụ thuộc giữa các object khi xây ứng dụng. Nếu thiết kế một object A phụ thuộc vào nhiều object khác thì dẫn tới object A sẽ khó được quản lý cũng như khó Unit test. Thường mỗi dòng lệnh có thể phụ thuộc vào một object hay một library. Giả sử Object A sử dụng Object B thì Object B có thể khai báo là global, hay sử dụng “new” trong Object A để tạo new instance của Object B. Như thế, giữ Object A và Object B luôn luôn có sự liên kết lẫn nhau. Cách thứ 3 là gắn (inject) Object B tới Object A ở khi cần thiết ở run time. Đó là cách mà  AngularJS hướng tới để giải quyết vấn đề giảm sự phụ thuộc giữa các Object. Xem thí dụ đơn giản dưới đây để hiểu về AngularJS.

Ví dụ 7 -custom DI:

Service.JS
```javascript
module.service('OrderService', function () {
    var Orders = [{
        id: 0,'name': 'TV','price': 1000,        
        'quantity': '1', image: "\\Images\\tv.jpg"
    }];
    //save new order
    this.save = function (order) {}
    }});
```
Controller
```javascript
var module = angular.module('Online', []);
module.controller('OrderController', function ($scope, OrderService) {
    // Save Order
    $scope.saveOrder = function () {
        OrderService.save($scope.newOrder);
    }})
```
File “OrderService” bao gồm các hàm business logic “save”, “delete”… Controller “OrderController” sử dụng “OrderService” nhưng không có bất cứ biến toàn cục hay từ khóa “new” ở “OrderController” . Khi UI gọi hàm “SaveOrder” của “OrderController”, AngularJS sẽ tự động gắn “OrderService” vào “OrderController”. Do AngularJS quản lý theo tên, nên gì một lý do nào đó, controller không sử dụng “OrderService” mà chuyển sang một service khác, thì người lập trình chỉ đổi tên mà thôi. Giả sử ứng dụng đang trên Production bị lỗi một hàm nào đó, người lập trình viết một service mới cho mục đích  tìm lỗi. Khi tìm lỗi hoàn tất, chúng ta trả đúng lại tên cũ. Ưu điểm của DI là khi thiết kế, người lập trình chia nhỏ các business logic từ phức tạp thành nhiều phần đơn giản. Càng chia nhỏ, code càng dể quản lý và  sẽ giúp cho việc thự hiện Unit test trở nên thuận lợi hơn rất nhiều.
## 7. Unit Test
Unit test JavaScript là công việc vô cùng phức tạp và mất nhiều thời gian. Nếu các hàm JavaScript phụ thuộc lẫn nhau càng nhiều thì việc Unit test càng khó. AngularJS xây dựng trên ý tưởng DI và làm giảm sự phụ thuộc giữa các component, tách riêng logic và view cho nên thực hiện unit test rất thuận lợi. Tất cả ví dụ trên về filter, directives, controller, DI là những file riêng biệt cho nên người lập trình dễ dàng viết các Unit test cho từng loại như là NUnit của .Net. Hiện nay Jasmine là một công cụ rất hay để thực hiện unit test JavaScript. Sử dụng Jasmine rất đơn giản, chỉ cần download jasmine package và viết test script như thí dụ 8 dưới đây:

Ví dụ 8 – unit test filter ví dụ 3:

index.html.spec
```javascript
describe('Testing', function() {
    var specialCharacterFilter;
     beforeEach(module('app'));
     beforeEach(inject(function($filter) {
        specialCharacterFilter= $filter('replaceSpecialCharacter');
    }));
    it('should remove special character', function() {
        var name= 'TV%^/';
        var nameExpected = 'TV';
         expect(specialCharacterFilter(name)).toBe(nameExpected);
    });});
```
Unit test cho trường hợp ĐÚNG: giá trị đầu vào là “ name= ‘TV%^/’” và giá trị mong muốn sau khi thực thi hàm là nameExpected = ‘TV’, khi chạy unit test kết quả ĐÚNG.



Unit test cho trường hợp SAI: Thay thế giá trị mong muốn thành nameExpected = ‘TV123’ khi chạy unit test kết quả SAI.

# Kết luận
Hiện nay, có nhiều JavaScript framework như Backbone, Ember, AngularJS giúp người lập trình có thể tiết kiệm rất nhiều thời gian viết code. Không công bằng khi nói một framework tốt hơn những cái còn lại.

Tất cả đều có ưu, khuyết điểm riêng, quan trọng là những chức năng của framework được chọn đáp ứng nhu cầu của dự án. Nhưng AngularJS có những tính năng rất đặc biệt như dependency injection giúp việc Unit test được dễ dàng hay Directives giúp cho người lập trình có thể chia nhỏ JavaScript vào các template. Do AngularJS tập trung vào khả năng test và chất lượng code cho nên việc có một thiết kế phù hợp cho dự án từ ban đầu là rất cần thiết. Hy vọng rằng sau những cải tiến tiếp theo thì AngularJS sẽ là một trong những framework mà người lập trình sẽ chọn lựa cho các ứng dụng web.