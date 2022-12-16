Lời nói đầu:
Có lẽ ngôn ngữa JavaScript đã quá quen thuộc với các developer trong thời đại web application đang rất thịnh hành.Hiện nay, ngôn ngữ JavaScript không chỉ phát triển mạnh mẽ ở UI UX ( Ví dụ: ReactJS, AngularJS,...) nó còn được phát triển mạnh mẽ ở phía server thông quan nền tảng NodeJS. Tóm lại, với thời kì công nghệ phát triển mạnh mẽ như ngày nay, ngôn ngữ JavaScript trở nên rất phổ biến và đã trải qua nhiều giai đoạn phát triển như:

* ES6 (ECMAScript 2015)	
* ES7 (ECMAScript 2016)	
* ES8 (ECMAScript 2017)	
* ES9 (ECMAScript 2018)	
* ES10 (ECMAScript 2019)	
* ES11 (ECMAScript 2020)	

Trong bài viết này, tôi sẽ chia sẻ về các điểm mới mẻ trong giai đoạn phát triển ES6 (ECMAScript 2015)	,tôi tin rằng là 1 developer ( đặc biệt các bạn thường xuyên làm việc với JavaScript thì việc nắm vững được những đặc điểm này sẽ hỗ trợ các bạn dễ hơn trong việc phát triển ứng dụng).

# **I. ES6 và JavaScript nâng cao**
## 1. ES
ECMAScript 2015 (hay gọi tắt là ES6) là phiên bản Thứ Sáu của ECMAScript. Nó xác định tiêu chuẩn cho việc triển khai JavaScript (Hiện là ECMAScript 2020)![ảnh.png](https://images.viblo.asia/23715f56-e16c-403e-b5a2-4fad0f57e1d5.png)

ES6 đã mang lại những thay đổi rất đáng kể cho ngôn ngữ JavaScript. Nó giới thiệu một số tính năng mới như, các biến phạm vi khối, vòng lặp mới để lặp qua các mảng và đối tượng và nhiều cải tiến khác để giúp lập trình JavaScript dễ dàng và thú vị hơn. Đặc biệt, các thư viện / framework hiện đại của JavaScript như React.js, Angular, Vue rất hay sử dụng các tính năng mới này.
### 1.1. ES6 (ECMAScript 2015)
**1.1.1. ES6 variable**

* ES6 có thể cách khai báo giá trị cho một biến bằng cách sử dụng: var, let, const. Tùy vào điều kiện cụ thể mà sử dụng cách khai báo cho phù hợp.
    * var đã có từ các phiên bản Javascript trước đây, khai báo có 2 dạng toàn cục - global (ảnh hưởng mọi nơi) và địa phương - local (chỉ ảnh hưởng bên trong function).
        *  Khai báo toàn cục:
     
        ![ảnh.png](https://images.viblo.asia/b8da1211-71da-4a07-8ac1-829c207e4135.png)
         *  Khai báo địa phương:
         
         ![ảnh.png](https://images.viblo.asia/4d33ba75-95de-4bb2-8493-ef0205871b9c.png)
         *  *let* có từ phiên bản ES6, sử dụng như var, tuy nhiên có tác dụng phạm vi bên trong một khối (như bên trong câu điều kiện if, vòng lặp for, ...).
        
         ![ảnh.png](https://images.viblo.asia/d99c25de-1b5e-4358-8bc0-38527d72fc2b.png)
         *  *const* sử dụng như let, tuy nhiên const có giá trị không đổi trong suốt ứng dụng.
      
         ![ảnh.png](https://images.viblo.asia/69184c5f-bbb5-46db-bdd6-bb8133efe416.png)
         
**1.1.2. ES6 vòng lặp For Of**

Vòng lặp for of mới được thiết kế cho phép chúng ta lặp qua mảng hoặc lặp qua đối tượng có thể lặp khác rất dễ dàng.

Ví dụ:

![ảnh.png](https://images.viblo.asia/ecaf2d76-9963-4489-aec6-698601f1f683.png)

Kết quả:

![ảnh.png](https://images.viblo.asia/705e7a3c-f3ce-4b58-a857-d1278204828e.png)

Vòng lặp for of không hoạt động với các đối tượng thông thường vì chúng không thể lặp lại.
Nếu bạn muốn lặp qua các thuộc tính của một đối tượng, bạn có thể sử dụng vòng lặp for in.

**1.1.3. ES6 Template Literals**

*Template literals* giúp chúng ta dễ dàng và rõ ràng để tạo chuỗi nhiều dòng và thực hiện nội suy chuỗi.

Nó giúp chúng ta có thể nhúng các biến hoặc biểu thức vào một chuỗi tại bất kỳ vị trí nào mà không gặp bất kỳ rắc rối nào.

Các Template literals được tạo bằng cách sử dụng ký tự ` ` (Gần nút ESC đó) thay vì các dấu nháy kép " " hoặc nháy đơn ' ' thông thường.

Các biến hoặc biểu thức có thể được đặt bên trong chuỗi bằng cú pháp ${...}.

**ES5**:

![ảnh.png](https://images.viblo.asia/419349ac-0645-47ef-b5fa-5821426ccea2.png)

**ES6**:


![ảnh.png](https://images.viblo.asia/1c1f0ccc-5de1-44a3-8a52-4886d0648371.png)

**1.1.4. ES6 Default Parameters**

Bây giờ, trong ES6, bạn có thể chỉ định các giá trị mặc định cho các tham số hàm.
Điều này có nghĩa là nếu không có đối số nào được cung cấp cho hàm khi nó được gọi thì các giá trị tham số mặc định này sẽ được sử dụng. Đây là một trong những tính năng từng được mong đợi nhất trong JavaScript.
Trước đây:

![ảnh.png](https://images.viblo.asia/b86f3546-bd72-4257-ac22-2873f71182e9.png)

**ES6:**

![ảnh.png](https://images.viblo.asia/2ee54dad-b04a-4acb-aa27-75f8cd33f8f3.png)

**1.1.5. ES6 Arrow Function**

*Arrow Function* là một tính năng thú vị khác trong ES6. Nó cung cấp cú pháp ngắn gọn hơn để viết biểu thức hàm bằng cách bỏ đi từ khóa function và return.

Các Arrow Function được định nghĩa bằng cú pháp mới, ký hiệu suy ra =>.

Hãy xem ví dụ:

![ảnh.png](https://images.viblo.asia/1ae6abcb-6d6c-4c10-94a3-92c766a2f017.png)

Như bạn thấy trong arrow function ở trên, không có từ khóa function và từ khóa return trong khai báo hàm.

Bạn cũng có thể bỏ luôn dấu ngoặc đơn () trong trường hợp có chính xác một tham số.

![ảnh.png](https://images.viblo.asia/75242148-2312-4a8c-a2d0-a492ddccf0cf.png)

Nhưng bạn sẽ luôn cần sử dụng nó khi bạn có 0 hoặc nhiều hơn một tham số.

Nếu có nhiều hơn một biểu thức trong thân hàm, bạn cần đặt nó trong dấu ngoặc nhọn { }.

Trong trường hợp này, bạn cũng cần sử dụng câu lệnh return để trả về một giá trị.

Có một số biến thể về cách bạn có thể viết các Arrow Function. Và dưới đây là những cách thường được sử dụng nhất:

![ảnh.png](https://images.viblo.asia/6069d944-5e7c-42ae-8bca-234f90ac6990.png)

Có một sự khác biệt quan trọng giữa các hàm thông thường và Arrow Function.

Không giống như một hàm bình thường, Arrow Function không có this của riêng nó, nó lấy this từ hàm bên ngoài (bao quanh nó) nơi nó được định nghĩa (Trong JavaScript, this là ngữ cảnh thực thi hiện tại của một hàm).

Để hiểu rõ điều này, hãy xem các ví dụ sau:

![ảnh.png](https://images.viblo.asia/06187b09-ff92-4dc5-a10f-fc53bafc45e1.png)

Như ta thấy, p.getInfo() đang có bối cảnh thực thi hiện tại ở ngoài (Window) nên this lúc này đề cập đến Window.

Viết lại cùng một ví dụ bằng cách sử dụng các Template literals và Arrow Function của ES6:

![ảnh.png](https://images.viblo.asia/ef363636-4659-41cd-b0b0-b3e56abd4b3c.png)

![ảnh.png](https://images.viblo.asia/b7a5de81-82e4-4e50-afa5-b8c39212b70e.png)

Như bạn có thể thấy rõ, từ khóa this trong ví dụ trên đề cập đến ngữ cảnh của hàm bao quanh Arrow Function là đối tượng Person, không giống như ví dụ trước đề cập đến đối tượng toàn cục Window.

**1.1.6. ES6 Classes**

Trong ES5 trở về trước, các class chưa bao giờ tồn tại trong JavaScript.

Các class được giới thiệu trong ES6 trông tương tự như các class trong các ngôn ngữ hướng đối tượng khác, chẳng hạn như Java, PHP ... tuy nhiên chúng không hoạt động giống hệt nhau.

Các class trong ES6 giúp tạo các đối tượng, thực hiện kế thừa dễ dàng hơn bằng cách sử dụng từ khóa extends và tái sử dụng code.

Trong ES6, bạn có thể khai báo một class bằng cách sử dụng từ khóa class mới theo sau là **tên class**.

Theo quy ước, tên class được viết bằng **PascalCase** (tức là viết HOA chữ cái đầu tiên của mỗi từ).

Hãy xem ví dụ bên dưới đây:

![ảnh.png](https://images.viblo.asia/d8330a1d-cdec-4933-8109-acc00f144bc7.png)

Ở trên, chúng ta tạo ra một class với constructor và một phương thức tính diện tích.

Constructor để khởi tạo giá trị ban đầu cho đối tượng. Nếu bạn không tạo rõ ràng thì JavaScript cũng tự thêm một constructor rỗng.

Bây giờ, ta thực hiện kế thừa class như sau:

![ảnh.png](https://images.viblo.asia/c0255f1a-767e-4449-b512-7a1b869952e4.png)

Bây giờ, ta thử khởi tạo đối tượng của class Rectangle và tính diện tích hình chữ nhật.

![ảnh.png](https://images.viblo.asia/d66ce281-5c04-45fd-a930-a5754e990b8f.png)

Tiếp theo, thử tạo đối tượng từ class Square và sử dụng phương thức của nó xem nhé:

![ảnh.png](https://images.viblo.asia/25a8a2f4-c27c-48a1-ba69-1e91661fe330.png)

Và vì Square kế thừa Rectangle nên nó cũng có thể sử dụng phương thức getArea() của Rectangle

![ảnh.png](https://images.viblo.asia/9be366d4-3b3d-4db2-b5b9-e950f1e17213.png)

Để chắc chắn, thử kiểm tra kiểu của các đối tượng xem thế nào nhé.

![ảnh.png](https://images.viblo.asia/5528f2a3-7cd7-4262-92a5-4afa305e621c.png)

Như vậy, trong ví dụ trên, class Square đã kế thừa từ Rectangle bằng cách sử dụng từ khóa extends.

Các class kế thừa từ các class khác được gọi là derived classes (lớp dẫn xuất) hoặc child classes (lớp con).

Ngoài ra, bạn phải gọi super() trong constructor của class con trước khi truy cập ngữ cảnh (this).

Ví dụ: Nếu bạn bỏ qua super() và gọi phương thức getArea() trên đối tượng hình square, nó sẽ dẫn đến lỗi, vì phương thức getArea() yêu cầu quyền truy cập vào từ khóa this.

***Lưu ý: Không giống như khai báo hàm, khai báo lớp không được hoisting. Khai báo lớp nằm trong vùng chết tạm thời (TDZ) tương tự như khai báo let và const. Do đó, bạn cần khai báo lớp của mình trước khi truy cập nó, nếu không sẽ xảy ra ReferenceError.***

**1.1.7. ES6 Modules**

Trước ES6, không có hỗ trợ riêng cho các module trong JavaScript.

Mọi thứ bên trong một ứng dụng JavaScript, ví dụ như các biến trên các tệp JavaScript khác nhau, đều có chung một phạm vi.

ES6 giới thiệu tệp dựa trên module, trong đó mỗi module được biểu diễn bằng một tệp .js riêng biệt. Bây giờ, bạn có thể sử dụng câu lệnh export hoặc import trong một module để xuất hoặc nhập các biến, hàm, class hoặc bất kỳ thực thể nào khác đến / từ các module hoặc tệp khác.

Hãy thử tạo một module, tức là một tệp JavaScript main.js và viết vào đó chương trình sau:

![ảnh.png](https://images.viblo.asia/33e8fb9b-381b-42c9-a25f-f3830f435257.png)

Bây giờ, hãy tạo một tệp JavaScript khác app.js và viết code như sau:

![ảnh.png](https://images.viblo.asia/f51e7509-d3ab-42df-b9aa-06c0b4738a73.png)

Cuối cùng, tạo tệp HTML test.html và với đoạn code sau và mở tệp HTML này trong trình duyệt của bạn.
***Lưu ý: Để chương trình hoạt động đúng, bạn cần khai báo type = 'module' trên thẻ <script>.***

![ảnh.png](https://images.viblo.asia/3da90a96-c166-4585-bf53-b048456b0e4e.png)
    
**1.1.8. ES6 Rest Parameters**
    
ES6 giới thiệu Rest Parameters cho phép chúng ta truyền một số tham số tùy ý cho một hàm dưới dạng một mảng.
    
> Bạn cũng có thể gọi Rest Parameters là Rest Operator (Toán tử Rest)
    
Tham số này đặc biệt hữu ích trong các tình huống khi bạn muốn truyền các tham số cho một hàm nhưng bạn không biết chính xác mình sẽ cần bao nhiêu tham số.
    
Tham số nghỉ được chỉ định bằng cách thêm tiền tố tham số được đặt tên với toán tử nghỉ ... (ba dấu chấm).
    
Tham số Rest chỉ có thể là tham số cuối cùng trong danh sách các tham số và chỉ có thể có một tham số Rest.
    
Hãy xem ví dụ sau để xem tham số Rest hoạt động như thế nào:
![ảnh.png](https://images.viblo.asia/cb96c8fe-2802-4bb9-aa0c-b1bc1f361a8b.png)
    
Khi tham số Rest là tham số duy nhất trong một hàm, nó sẽ nhận tất cả các đối số được truyền cho hàm.
    
Nếu không, nó sẽ nhận phần còn lại của các đối số vượt quá số tham số được đặt tên, ví dụ như sau:
 ![ảnh.png](https://images.viblo.asia/d22e9147-e0e4-483b-a2d9-ce2f04b79413.png)
> Lưu ý: Đừng nhầm lẫn giữa các tham số Rest với REST (REpresentational State Transfer). Rest không liên quan gì đến RESTful web services.
    
**1.1.9. ES6 Spread Operator**
    
Toán tử *Spread*, được ký hiệu là ..., thực hiện chức năng hoàn toàn ngược lại với toán tử Rest.
    
Toán tử Spread (tức là chia nhỏ) một mảng và chuyển các giá trị vào hàm được chỉ định, như được hiển thị trong ví dụ sau:
    
![ảnh.png](https://images.viblo.asia/4b3251cd-eb29-498f-9df5-7d2bfde7b4a5.png)
    
Toán tử spread cũng có thể được sử dụng để chèn các phần tử của một mảng vào một mảng khác mà không cần sử dụng các phương thức mảng như push(), unshift() hay concat(), ...
    
![ảnh.png](https://images.viblo.asia/8780ffe5-acad-4187-8423-4475a8e48a0f.png)
    
Như bạn thấy đó, bạn có thể dễ dàng nhét một mảng vào một mảng khác chỉ với toán tử Spread.

**1.1.10. ES6 Destructuring Assignment**
    
Phép gán hủy cấu trúc là một biểu thức giúp dễ dàng trích xuất các giá trị từ mảng hoặc thuộc tính từ các đối tượng, thành các biến riêng biệt bằng cách cung cấp một cú pháp ngắn hơn.
    
Có hai loại phép gán hủy cấu trúc:
* Phép gán hủy cấu trúc mảng
* Phép gán hủy cấu trúc đối tượng.
Hãy xem cách hoạt động chính xác của từng loại trong ví dụ sau:
    
**a. Phép gán phá hủy cấu trúc mảng**
    
Trước ES6, để nhận một giá trị riêng lẻ của một mảng, chúng ta cần viết code như thế này:

![ảnh.png](https://images.viblo.asia/fbff0e1f-65d3-432f-8fb1-790234001945.png)
    
Trong ES6, chúng ta có thể làm điều tương tự chỉ trong một dòng bằng cách sử dụng phép gán hủy cấu trúc mảng như sau:
 
![ảnh.png](https://images.viblo.asia/d8fb92d1-c32f-4945-9c93-3be027869033.png)
    
Bạn cũng có thể sử dụng toán tử rest trong phép gán hủy cấu trúc mảng, như được hiển thị ở đây:
    
![ảnh.png](https://images.viblo.asia/dd8608b7-af66-47a5-94ee-aab2d26bd181.png)
    
Như bạn thấy đó, *r* bây giờ đại diện cho mảng các phần tử trừ phần từ đầu tiên.
    
**b. Phép gán phá hủy cấu đối tượng **
    
Trong ES5 để trích xuất các giá trị thuộc tính của một đối tượng, chúng ta cần code như thế này:
    
![ảnh.png](https://images.viblo.asia/9ce6ce44-00c0-4b0c-bdaf-19aa640e4795.png)
    
Nhưng trong ES6, bạn có thể trích xuất các giá trị thuộc tính của đối tượng và gán chúng cho các biến một cách dễ dàng như sau:
  
![ảnh.png](https://images.viblo.asia/27e91556-7849-4875-b762-ac19f2bd074e.png)
    
Hầu hết các tính năng mà chúng ta đã cùng tìm hiểu ở trên đều được hỗ trợ trong phiên bản mới nhất của các trình duyệt web chính như Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, v.v.
    
Ngoài ra, bạn có thể sử dụng các tool chuyển đổi code miễn phí như Babel để chuyển code ES6 hiện tại của bạn sang ES5 để tương thích tốt hơn các trình duyệt khác (hoặc các phiên bản thấp hơn) mà vẫn tận dụng được lợi thế của ES6 mang lại khi viết code JavaScrpt.

Đây là 10 sự thay đổi mạnh mẽ của JavaScript. Cảm ơn các bạn đã theo dõi