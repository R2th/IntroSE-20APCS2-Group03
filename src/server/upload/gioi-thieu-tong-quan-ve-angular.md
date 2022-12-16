# Giới thiệu Angular 
## 1. Tổng quan về Angular
Angular là một javascript framework do google phát triển để xây dựng các Single Page Application (SPA) bằng JavaScript , HTML và TypeScript . Angular cung cấp các tính năng tích hợp cho animation , http service và có các tính năng như auto-complete , navigation , toolbar , menus ,… Code được viết bằng TypeScript , biên dịch thành JavaScript và hiển thị tương tự trong trình duyệt. 

Để học được angular thì bạn cần biết các kiển thức cơ bản sau:

* HTML
* CSS
* JavaScript
* TypeScript
* Document Object Model (DOM)
### 1.1.Các phiên bản của Angular

**Angular js :** Phiên bản đầu tiền của angular là AngularJS được bắt đầu từ năm 2009 và đc ra mắt vào    20/10/2010,   do lập trình viên Misko Hevery tại Google viết ra như là một dự án kiểu “viết cho   vui”. Lúc đó angular js   được viết theo mô hình MVC (Model-View-Controller) trong đó :

* Model là thành phần trung tâm thể hiện hành vi của ứng dụng và quản lí dữ liệu.
* View được tạo ra dựa trên thông tin của Model .
* Controller đóng vai trò trung gian giữa Model và View và để xử lý logic .

**Angular 2 :**
* Sau phiên bản angular js thì vào tháng 3 năm 2015 phiên bản bản angular 2 ra đời nhằm thay thế Angular Js với các khái niệm mới nhằm đơn giản hóa và tối ưu cho quá trình phát triển sử dụng framework này. Angular 2 thay đổi hoàn toàn so với angular js bằng việc thay Controllers và $scope ( Angular js ) bằng components và directives . Components = directives + template , tạo nên view của ứng dụng và xử lí các logic trên view. Angular 2 hoàn toàn được viết bằng Typescript. Angular 2 nhanh hơn angular js ,hỗ trợ đa nền tảng đa trình duyệt, cấu trúc cdoe được tổ chức đơn giản và dễ sử dụng hơn.

**Angular 4 :**
*  Ra mắt vào tháng 3/2017 đây là một phiên bản nâng cấp từ Angular 2 nên kiến trúc   không thay đổi nhiều ngoài việc giảm thiểu code được tạo ra từ đó giảm kích thước tệp   được đóng gói xuống 60%, đẩy nhanh quá trình phát triển ứng dụng.

**Angular 5 :**
* Đã được phát hành vào ngày 1 tháng 11 năm 2017 với mục tiêu thay đổi về tốc độ và kích thước nên nó nhanh hơn và nhỏ hơn angular 4. Các tính năng mới so với angular 4:
* Sử dụng HTTPClient thay vì sử dụng HTTP : bởi vì nó nhanh, an toàn và hiệu quả hơn.
* Với phiên bản Angular 5 mặc định sử dụng RxJs 5.5
* Multiple export aliases : Một component có thể được xuất bằng nhiều bí danh (aliases) để giảm bớt quá trình di chuyển.
* Internationalized Pipes for Number, Date, and Currency: Các pipe mới được giới thiệu để tiêu chuẩn hóa tốt hơn.
* Tối ưu hóa build production bằng việc sử dụng công cụ build optimizer được tích hợp sẵn vào trong CLI. Công cụ này tối ưu tree shark và loại bỏ code dư thừa.
* Cải thiện tốc độ biên dịch bằng việc dùng TypeScript transforms, giờ đây khi build sẽ sử dụng lệnh “ng serve –aot”. AOT sẽ cải thiện performace khi load page và nó được dùng để deploy app lên production

**Angular 6:**
* Cập nhật CLI, command line interface: thêm 1 số lệnh mới như ng-update để chuyển từ version trước sang version hiện tại; ng-add để thêm các tính năng của ứng dụng để trở thành một ứng dụng web tiến bộ.
* Angular Element: Cho phép các component của Angular được triển khai dưới dạng component web, sau đó có thể được sử dụng trong bất kỳ trang HTML nào một cách dễ dàng.
* Multiple Validators: cho phép nhiều Validators được áp dụng trên form builder.
* Tree-shakeable providers: giúp loại bỏ mã code chết.
* Sử dụng RxJS 6 với syntax thay đổi.

**Angular 7 :**
* Được phát hành vào 18 tháng 10 năm 2018 với những thay đổi như :
* ScrollingModule : Để scroll load dữ liệu.
* Drag and Drop: Chúng ta có thể dễ dàng thêm tính năng kéo và thả vào một mục
* Angular 7.0 đã cập nhật  RxJS 6.3 

**Angular 8 :**

* Ra mắt 28 tháng 5 năm 2019 với CLI workflow improvements, Dynamic imports for lazy routes ….

**Angular 9 :**

* Ra mắt mới đây 6 tháng 2 năm 2020,Angular 9
di chuyển tất cả các ứng dụng để sử dụng trình biên dịch Ivy và thời gian chạy theo mặc định. Angular đã được cập nhật để hoạt động với TypeScript 3.6 và 3.7 
## 2.Giới thiệu về Angular
### 2.1: Component

Components là một khối code trong app Angular. Nó là sự kết hợp của bộ template html và nhúng kèm code TypeScript (hoặc Javascript). Các components là độc lập với nhau và độc lập với hệ thống. Nó có thể được cài vào hoặc tháo ra khỏi hệ thống dễ dàng. Một component có thể hiểu như một control trên màn hình hiển thị, gồm giao diện html và code logic xử lý sự kiện đi kèm control đó. Một component cũng có thể to lớn như là cả 1 màn hình chứa nhiều control hoặc một nhóm nhiều màn hình. Tức là là một component cũng có thể chứa và gọi được nhiều component khác nối vào

Cấu trúc của Component:

![](https://images.viblo.asia/23bf5bda-e735-49b1-b766-79909766b677.png)

Từ khóa **@Component** sẽ giúp định nghĩa bộ khung html cho nó. Và bên dưới là một class CategoryListComponent dùng để viết code logic. Trong định nghĩa bộ khung html, chúng ta có một số thuộc tính cần chú ý sau đây:

* **selector** : Là tên được đặt để gọi một component trong code html. Ở ví dụ vừa rồi, từ khóa hello-ng-world được đặt tên cho component này. Khi cần gọi component này ra ở màn hình html cha, ta sẽ gọi bằng html tag <app-category-list></app-category-list>. Gọi như vậy thì component con sẽ được render ra component cha.**
* **template** : Là tự định nghĩa khung html cho component .
* **templateUrl** : Là đường dẫn url tới file html bên ngoài để load file đó vào làm khung html cho component này.
* **styles** : Là viết style css luôn vào file component này. Cách này chỉ dùng cho component đơn giản.
* **styleUrls** : Là đường dẫn url đến file style css độc lập cho component này. 

### 2.2:Binding

Angular có cách code Binding (kết nối giữa html và data) dữ liệu theo kiểu 2 chiều, nghĩa là html input thay đổi thì biến javascript sẽ ngay lập tức nhận được giá trị trả về và ngược lại, giá trị trong js thay đổi thì ngay lập tức màn hình html thay đổi theo.Để bind một chuỗi ra ngoài màn hình html thì rất đơn giản sử dụng 2 dấu ngoặc nhọn {{TenBien}} Ví dụ chúng ta có một Component đơn giản như sau:

![](https://images.viblo.asia/94c32fe6-884e-4a1f-9817-c62692a4d7bc.png)

![](https://images.viblo.asia/0959a4c9-ca65-43f0-90fd-0835db00b59d.png)


### 2.2:To-way binding

![](https://images.viblo.asia/40f4d53b-c4a6-40d2-9feb-a4b38172c481.png)

Từ khóa **ngModel** lúc này không phải là thuộc tính html mà nó là từ khóa của Angular. Khi chúng ta viết **[(ngModel)]** chúng ta sẽ gắn chặt giá trị của input html với biến **title**.Dẫn đến người dùng gõ vào ô input thì thẻ h1 sẽ nhận giá trị tương ứng của **title**.


## 3.Xử lý sự kiện
Để gắn 1 sự kiện của control html với  một hàm javascript, ta viết như sau:

![](https://images.viblo.asia/15862f45-85cb-4a9e-b36a-349c1060aa42.png)

Khi chúng ta muốn (click) tức là muốn bind sự kiện click chuột của người dùng ở control này gọi là goBack().

## 4.ngModule

Module là một khái niệm rộng nhất của Angular. Một module có thể bao gồm chứa các components, directives, pipes, v.v.

Module có thể được biên dịch (compile) dưới dạng ahead-of-time (AoT). Nghĩa là biên dịch ra mã thực thi để hiện ra luôn trên trình duyệt không cần vẽ vời gì từ đầu. Hãy tưởng tượng component có html và js viết riêng, khi load trang thì 2 thứ này mới nhào nặn chung để hiển thị html+data lên màn hình. AoT là thứ html+data đã nhào sẵn.

Module cũng có thể gọi module con và bắt tay được với các module khác.

Ví dụ về module chúng ta có thể bắt gặp ngay ở trong category.module.ts


![](https://images.viblo.asia/eab0fc07-d59c-4c32-8704-cf58dd120e1b.png)

Các thuộc tính của module được định nghĩa như sau:

* imports: Định nghĩa sự phụ thuộc (Dependency) của module này, module phụ thuộc sẽ được load trước rồi module này mới load.
* declarations: Định nghĩa tất cả các component sẽ được dùng trong module này. Nếu chưa định nghĩa thì các component trong module sẽ không thể gọi nhau vì không tìm thấy nhao.
* bootstrap: Mỗi ứng dụng Angular đều cần một module gốc, module này sẽ có một component gốc chứa layout gốc sẽ được render ra ở file index.html.

## 6.Service

Để tạo ra một service thì chúng ta cần import và mô tả một class với từ khóa **@injectable** lấy từ **@angular/core** module.

![](https://images.viblo.asia/2fdacf65-db53-412e-ad2c-c06c0564750a.png)

Nếu muốn dùng chung service mà không muốn khao báo nhiều lần,component nào cũng phải tiêm nó vào.Thì lúc này có thể khai báo service ở phần **providers** của component hoặc module

![](https://images.viblo.asia/f71b9254-8248-4714-abad-e7fe84fb10b5.png)

## 7.Router
### 7.1. Router Outlet
Mỗi một Router sẽ có một URL để load component. Và để biết được là component sẽ render ra chỗ nào thì chúng ta viết đoạn code sau vào khung html cần chèn:

![](https://images.viblo.asia/2c04a65c-30c7-436f-973d-89f924ec495c.png)

### 7.2. Cài đặt Route cho ứng dụng Angular

Để cài đặt toàn bộ Router cho một ứng dụng Angular thì chúng ta cần tạo ra một đối tượng JSON chứa các thuộc tính như sau:

* > path: Đường dẫn URL của component hiện tại.
* > component: Ứng với đường dẫn bên trên thì load component nào.
* > redirectTo: Chuyển hướng đến URL này nếu URL ở path không trùng. Ví dụ, khi người dùng gõ URL linh tinh, chúng ta muốn chuyển hướng và load trang Home hoặc trang báo lỗi 404 thì cần ghi rõ URL trang Home hoặc 404 vào redirectTo.
* > pathMatch: Cài đặt xem chế độ kiểm tra url là như thế nào. khi giá trị là full thì nghĩa là toàn bộ url từ đầu đến cuối sẽ phải chính xác như trong bộ JSON Router. Còn khi giá trị là prefix thì chuỗi đầu tiên của url (dấu sược đầu tiên) sẽ được kiểm tra. Mặc định nếu không nói gì thì prefix sẽ được chọn.
Hãy xem đoạn code ví dụ về Router bên dưới:

![](https://images.viblo.asia/6b9d0119-e2e5-4ef0-b193-df805b1df0c2.png)


**Lời kết**:Trong bài này, mình đã giới thiệu tổng quan đến các bạn vì sao chọn Angular và các version của Angular . Đây là một bài giới thiệu tổng quan, mong bài viết sẽ giúp bạn hiểu hơn về Angular.