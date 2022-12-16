# A. Tìm hiểu về SCSS
## 1. SASS - SCSS
SASS SCSS là một CSS Prepocessor, là để giúp chúng ta viết ra những đoạn mã CSS nhanh hơn và có cấu trúc rõ ràng hơn. Nhìn chung 2 cái trên mình đề cập đều giúp cho chúng ta viết những đoạn mã CSS một cách dễ dàng hơn. Nhưng có đôi chỗ khác biệt giữa chúng


| SASS | SCSS |
| -------- | -------- |
| Syntactically Awesome Style Sheets | Sassy Css |
| Original language, shoter syntax | Newer syntax , closer to css, defactor standard |
|   ![](https://images.viblo.asia/b6c02e42-f31f-4de2-a5de-619d22d80176.png) | ![](https://images.viblo.asia/ba065315-f2f9-4889-8af3-6eb03bad6e17.png) |
| Indextation | Curly braces & semi-colons |
| Strict rules for whitespace | Ignores whitespace |
| =my-mixin | @mixin my-mixin |
| +my-mixin | @include my-mixin |
| @import foo | @import foo |
| @extend foo | @extend foo |

## 2. Một số tính năng
### 2.1. Variables
Chúng ta có thể khai báo biến để có thể dùng cho nhiều chỗ khác nhau trong file .scss. Ví dụ:

![](https://images.viblo.asia/ca8753af-d7b9-4011-a499-a736c0cc27e9.png)

Khi project của chúng ta viết rất nhiều các đoạn CSS mà cần dùng nhiều đến màu mà đặc điểm là chúng ta sẽ phải dùng đi dùng lại những mà concept quy định. Chúng ta sẽ tách hẳn ra 1 file có thể đặt tên là \_colors.scss - nơi khai báo các màu chung của project của chúng ta dùng chung.

Khi muốn sử dụng những biến có giá trị màu này chúng ta có thể import file \_color.scss này vào và sử dụng các biến đó bình thường.

Ví dụ, ta tạo 1 file \_colors.scss như sau:

![](https://images.viblo.asia/327ad33f-910b-4010-b6df-613b0d4513df.png)

Và khi cần dùng ban chỉ chần import vào và dũng như bình thường

![](https://images.viblo.asia/7ac31404-fa77-45bf-bb30-96283f331a6a.png)

### 2.2. Mixin
Mixin là một tiện ích ,biết áp dụng cái này vào viết css thì rất là nhàn. Hiểu nó như là một function, có thể sử dụng ở khắp mọi nơi nếu bạn include nó vào file mà chúng ta cần sử dụng, và chúng ta có thể truyền tham số để tùy biến cho nó.

Mixin có 2 loại: truyền tham số và không truyền tham số.
1.  **Không truyền tham số**

![](https://images.viblo.asia/e5b6f776-21e0-4179-b99a-9ca5da95180e.png)

2.  **Khi truyền tham số**

![](https://images.viblo.asia/76db0738-bd23-491f-9b2b-37e623abf7cc.png)

Và khi chúng ta muốn sử dụng mixin ở trong file main.scss thì chúng ta phải import file \_mixins.scss vào trong file main.scss để dùng, và dùng @include tên-mixin-trong-file-\_mixins.scss

![](https://images.viblo.asia/eb70f67f-5473-4b23-bd18-d38023e2f6b9.png)

![](https://images.viblo.asia/56ba4282-d8d8-4bc8-920d-120890946c7c.png)

### 2.3. Import
Như các ví dụ ở trên là đã có dùng import luôn rồi

![](https://images.viblo.asia/b8c37611-4c97-4201-bb93-11173f702d4b.png)

### 2.4. Function
Trong scss chúng ta có thể định nghĩa ra các funtcion và sử dụng chúng một cách bình thường giống như các ngôn ngữ lập trình. Thì ở đây ta có 2 loại function : built-in và function mà chúng ta tự định nghĩa:
1. Built-in

Đó là những function có sẵn mà sass hỗ trợ , chúng ta chỉ việc gọi tên và truyền các biến tương ứng với các hàm đó yêu cầu vào và sử dụng bình thường. Ta có thể tham khảo những hàm có sẵn mà sass nó hỗ trợ ở: https://sass-lang.com/documentation/modules/color#darken

2. Hàm tự mình định nghĩa

Chúng ta có thể tự tạo 1 file , nơi mà bạn sẽ định nghĩa ra tất cả các function mà bạn định nghỉ để sử dụng. Ví dụ, mình định nghĩa 1 file \_functions.scss như sau:

![](https://images.viblo.asia/b324f222-a8af-4b38-ae2d-9810709d54fc.png)

Sau đó mình sẽ import vào file main.scss để sử dụng function em trong body

![](https://images.viblo.asia/f90fa766-1c54-44cb-94e9-038326c547cc.png)

### 2.5. Inheritance with extend
Đây là một tính năng quan trọng mà chúng ta sử dụng rất nhiều. Tính năng nó sẽ kế thừa tất cả các thuộc tính của một class hoặc một cái gì mã chúng ta đã khai báo sẵn. Ví dụ

![](https://images.viblo.asia/53c6b2d9-4d92-4c4f-acc0-d7442c81c21f.png)

Đoạn mã trên khi viết css sẽ được viết thành

![](https://images.viblo.asia/e59b0852-df60-4f3f-997e-7286c64c9ef9.png)

Như ta có thể thấy ở trên, chúng ta sẽ sử dụng từ khóa @extend để chúng ta sử dụng được hết tất cả các thuộc tính của class error trong class critical-error. Điều độ tiện ích cho chúng ta đỡ phải lặp lại những đoạn mã CSS giống nhau trong khi viết CSS, trông đoạn mã CSS sẽ rất clear hơn rất nhiều đó

### 2.6. Conditional Directives
Một tiện ích mà chúng ta phải kể đến đó chính là if else trong Scss, chúng ta sẽ sử được phép sử dụng bình thường như những câu lệnh điều kiện trong các ngôn ngữ lập trình khác. Ví dụ :

![](https://images.viblo.asia/0184e7ff-b24b-4c35-ae3b-a3044c0a8771.png)

### 2.7. Loops
Nếu như trong file .scss chúng ta giả dụ mà định nghĩa nhiều class như thế này

![](https://images.viblo.asia/db81cfaf-dbdc-45bc-b5d1-7d4096d98a98.png)

thì thay vì chúng ta phải code quá nhiều như trên ta chỉ cần viết với cú pháp vòng lặp trong Scss

![](https://images.viblo.asia/ad021d10-173e-4faf-94a0-c39488d7a45e.png)

Tiếp theo đó chính là vòng lặp @each

![](https://images.viblo.asia/b4c951f3-74f7-438e-8e5f-0201fac2a2e4.png)

Kết quả thu được sẽ là

![](https://images.viblo.asia/da3e6e03-7563-4ae3-aafe-2bd18e77975a.png)

# B. Tìm hiểu về BEM
## 1. BEM là gì ?
* Là một quy ước đặt tên cho các class trong HTML và CSS
* BEM là viết tắt của từ Block, Element, Modifier.
* BEM được tạo bởi team của Yandex

## 2. Quy ước đặt tên
![](https://images.viblo.asia/bbe77599-3d74-45e9-9988-c6b09dc5150b.png)

* **.block** Thành phần cấp to nhất của abstraction hoặc component.
* **.blockelement** Thành phần con bên trong của block 
* **.block--modifier** Là 1 phiên bản # của block. Hay những thay đổi style khác so với style ban đầu

## 3. Ví dụ
### 3.1. Modifier
![](https://images.viblo.asia/0fc33134-b4de-4234-9621-455e518ed9cc.png)

Ở đây btn là block .btn---green là modifier. Style của chúng ta như sau

![](https://images.viblo.asia/dfabec23-8c30-43cb-ac66-e1ffc26c4fa7.png)

Modifirer: Hiểu như là những thay đổi về style của .btn có 1 số điểm style khác so với .btn ban đầu. Ở đây btn--green thay đổi background từ màu xám sang màu xanh. Các bạn có thể thay đổi màu background, font-size, padding .... Tùy vào cách đặt

### 3.2. Element
![](https://images.viblo.asia/e938565d-9872-4b27-8dcb-91a6bb9616d0.png)

Ở đây info__title, info__description là thành phần con bên trong info.

![](https://images.viblo.asia/2865fe69-2f6d-4de7-9867-fcbbde1de05a.png)

## 4. Tại sao sử dụng BEM
* Các bạn có bao giờ đau đầu suy nghĩ với việc nên đặt class html ra sao không? BEM là giải pháp giúp các bạn dễ dàng trong việc đặt class
* Giúp code viêt đơn giản, dễ hiểu hơn, dễ sửa chữa. Đôi khi bạn style xong bạn còn chả biết nó nằm ở đâu muốn sửa thì làm sao, nhưng với cách viết BEM bạn sẽ biết vị trí các thành phần HTML nằm đâu thông qua của nó rồi sửa. Với cách viết thông thường bạn sửa lại sợ ảnh hưởng đến chỗ khác.

# C. Tìm hiểu về Typescript
## 1. Typescript là gì ?
* TypeScript là một dự án mã nguồn mở được phát triển bởi Microsoft. Nó có thể được coi là một phiên bản nâng cao của Javascript bởi việc bổ sung tùy chọn kiểu tĩnh và lớp hướng đối tượng mà điều này không có ở Javascript.
* TypeScript có thể sử dụng để phát triển các ứng dụng chạy ở client-side (Angular) và server-side (NodeJS).
* TypeScript sử dụng tất cả các tính năng của của ECMAScript 2015 (ES6) như classes, modules.
* Trưởng nhóm dự án này là Anders Hejlsberg, người đã đóng góp cũng như tạo ra các ngôn ngữ khác C#, Turbo Pascal và Delphi.
* TypeScript không phải ra đời đầu tiên mà trước đây cũng có một số thư viện như CoffeScript và Dart được phát triển bởi Google, tuy nhiên điểm yếu là hai thư viện này sư dụng cú pháp mới hoàn toàn, điều này khác hoàn toàn với TypeScript, vì vậy tuy ra đời sau nhưng TypeScript vẫn đang nhận được sự đón nhận từ các lập trình viên.

## 2. Tại sao nên sử dụng Typescript ?
* Dễ phát triển dự án lớn: Với việc sử dụng các kỹ thuật mới nhất và lập trình hướng đối tượng nên TypeScript giúp chúng ta phát triển các dự án lớn một cách dễ dàng.
* Nhiều Framework lựa chọn: Hiện nay các Javascript Framework đã dần khuyến khích nên sử dụng TypeScript để phát triển, ví dụ như AngularJS 2.0 và Ionic 2.0.
* Hô trợ các tính năng của Javascript phiên bản mới nhất: TypeScript luôn đảm bảo việc sử dụng đầy đủ các kỹ thuật mới nhất của Javascript, ví dụ như version hiện tại là ECMAScript 2015 (ES6).
* Là mã nguồn mở: TypeScript là một mã nguồn mở nên bạn hoàn toàn có thể sử dụng mà không mất phí, bên cạnh đó còn được cộng đồng hỗ trợ.
* TypeScript là Javascript: Bản chất của TypeScript là biên dịch tạo ra các đoạn mã javascript nên ban có thê chạy bất kì ở đâu miễn ở đó có hỗ trợ biên dịch Javascript. Ngoài ra bạn có thể sử dụng trộn lẫn cú pháp của Javascript vào bên trong TypeScript, điều này giúp các lập trình viên tiếp cận TypeScript dễ dàng hơn.

## 3. Các kiến thức cơ bản về Typescript
### 3.1. Kiểu dữ liệu và khai báo biến
* Về bản chất của Typescript vẫn là Javascript nên các kiểu dữ liệu cơ bản của java script thì Typescript đều có ngoài ra Typescript còn có một số kiểu dữ liệu khác như là enum, tuple, any, void ...
* Còn về mặt cú pháp khai báo biến trong Typescript hơi khác một chút đó là khi khai báo chúng ta cần khai báo thêm cho nó xem là thuộc kiểu dữ liệu nào.

![](https://images.viblo.asia/c51bc66b-fb92-4aeb-a5b1-3434d1416c3b.png)

Ở trên là một số kiểu dữ liệu cơ bản trong Typescript thì có một số kiểu dữ liệu khác so với Javascript:
* Enum là từ khoá dùng để khai báo một kiểu liệt kê (Enumeration). Kiểu liệt kê là một tập hợp các hằng số do người dùng tự định nghĩa.
* Tuple là một mảng hỗn tạp nhưng đã được khai báo số phần tử.

### 3.2. Function trong TypeScript
* Trong typescript các hàm đều trả về một kết quả, kết quả đó sẽ thuộc về một kiểu dữ liệu nào đó (vd: number, string, void, …).
* Ta phải chỉ định luôn kiểu dữ liệu trả về cho hàm ngay từ đầu.

Ví dụ :
![](https://images.viblo.asia/2ca58766-e88d-4b85-b8e8-6ad3fe7d9a1a.png)

Ngoài ra còn có một số cú pháp khai báo function như:
![](https://images.viblo.asia/0e2e7b1c-169a-423f-93d9-d20fc268c9ec.png)

### 3.3. Hướng đối tượng trong Typescript
Trong Typescript hỗ trợ chúng ta các tính chất về hướng đối tượng như:

1. **Class**

![](https://images.viblo.asia/af620269-1c74-42cf-9f49-bfcd50cd7636.png)

2. **Access Modifier**
Phạm vi truy cập trong class: private, protected, public. Mặc định khi không khai báo thì là public

3. **Tính kế thừa** 

![](https://images.viblo.asia/0e066023-36a8-402a-b8d3-6df7495d5d93.png)

4. **Interface**

![](https://images.viblo.asia/c1b4ceb7-aac1-4fc9-967e-618849b0b914.png)

5. **Namespace**

![](https://images.viblo.asia/c7cf4c3d-9abf-4caf-b6ba-081a36c62454.png)

6. **Generic**
Generic Hiểu một cách đơn giản là khai báo nhưng mà không cần chỉ ra kiểu dữ liệu mà khi nào sử dụng thì mới định nghĩa kiểu dữ liệu.

![](https://images.viblo.asia/7bc5f4a8-06d1-4f53-9fe4-370d958b4cc7.png)

Qua ví dụ ta thấy khi hàm xem1(), xem2(), xem3() giống nhau về các xử lý chỉ khác kiểu dữ liệu trả về và kiểu dữ liệu params thay vì phải định nghĩa 3 hàm ta chỉ cần viết một hàm xem4() có thể dùng chung được cho cả trường hợp trên.

Một ví dụ khác:

![](https://images.viblo.asia/dfbc28f9-9867-453b-a906-03628bf9625d.png)

Ở ví dụ trên hàm XemThongTin() có tham số truyền vào là một mảng có kiểu dữ liệu là generic. Khi ta gọi hàm XemThongTin() ta phải chỉ ra kiểu dữ liệu T là gì trong trường hợp này là string thì khi ta truyền tham số vào cũng phải mà một mảng string nếu chương trình sẽ bị lỗi. Như đôi khi bạn muốn kiểu dữ liệu T kia không phải là string mà thay vào đó là một kiểu dữ liệu nào đó như any chẳng hạn chả nhẽ lúc này bạn lại phải viết thêm một hàm mới trong khi code xử lý như nhau, nhìn vào ví dụ ta thấy nhờ có generic thì mọi chuyện dễ dàng hơn bạn chỉ cần định nghĩa nó là kiểu any và tham số truyền vào là một mảng kiểu any là được.

# Tổng kết
Bài viết của mình đến đây là kết thúc. Hy vọng nó sẽ hữu ích phần nào đó cho các bạn trong quá trình học tập cũng như làm việc. Bài viết cũng khó tránh khỏi những sai xót, mong mọi người thông cảm, và rất mong những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn.