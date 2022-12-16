Trước khi nói về khía cạnh tư duy Lập Trình Hướng Đối Tượng `Object-Oriented Programming`, chúng ta hãy cùng nhìn lại một chút về hai bài viết trước.

Đầu tiên thì chúng ta làm quen với khái niệm Tuần Tự `Imperative` và Định Nghĩa `Declarative` chủ điểm nói về hai khía cạnh tư duy bổ trợ lẫn nhau ở Cấp Độ Cú Pháp `syntax level` để biểu thị logic hoạt động của code.  Nếu trọng tâm của `Imperative` là để biểu thị `tuần tự` các bước cần thực hiện, thì trọng tâm của `Declarative` là để biểu thị `định nghĩa` tương quan giữa các yếu tố trong code.

Sau đó thì chúng ta tiếp tục quan sát code ở cấp độ thiết kế và quản lý các chương trình bổ trợ `sub-program` với hai mô hình lập trình liên quan là Thủ Tục `Procedural` và Hàm `Functional`. Nếu trọng tâm của `Procedural` là thiết kế và biểu thị các `sub-program` tạo ra tác động khách quan trên nguồn dữ liệu `data` hay trạng thái `state` nào đó; Thì trọng tâm của `Functional` là thiết kế và biểu thị mối tương quan giữa các `sub-program` không tạo ra tác động khách quan trên các nguồn nhập `input` như trên.

Và bây giờ thì chúng ta lại tiếp tục thay đổi góc quan sát code ở cấp độ mới, bao hàm cả các `sub-program` và cả các nguồn dữ liệu `data` hay trạng thái `state`. Tuy nhiên, xuất phát điểm tư duy của Lập Trình Hướng Đối Tượng `Object-Oriented` lại không hẳn xuất phát từ quan điểm kĩ thuật, mà thay vào đó thì như chúng ta đã biết - `OOP` lại xuất phát từ một trong những chiều kích trí tuệ mà chúng ta được ban cho.

## Điểm khởi đầu

Trích đoạn bài viết [[JavaScript] Bài 4 - Object & Everything](https://viblo.asia/p/LzD5dRD0ZjY)

> Một trong những chiều kích quan trọng nhất của trí thông minh mà con người chúng ta được ban tặng, đó là `intellect` - tạm dịch là trí tuệ nhị nguyên. Với `intellect` thì mọi thứ xung quanh cuộc sống của chúng ta dường như có thể được tách rời riêng biệt và có thể được định nghĩa với một đường viền bao quanh. Dường như bất cứ thứ gì cũng có thể được định nghĩa bởi một vài thuộc tính và khả năng. Ví dụ như một cái cây có thể được xem là một đối tượng hay object độc lập với các thuộc tính như: chiều cao, màu sắc, tuổi tác; và khả năng tạo ra thế hệ tiếp theo.

> Để phản ánh chiều kích này của trí thông minh mà chúng ta sở hữu vào trong môi trường lập trình, những lập trình viên đầu tiên của thế giới đã quyết định cho phép mô tả các đối tượng hay `object` trong code. Điều này khiến cho công việc lập trình trở nên thân thiện hơn và đem đến cho mọi người nhiều khả năng hơn để chuyển tải các ý tưởng vào phần mềm.

```object.js
var theTree = {
   name : 'Divine' ,
   age  : 1001     ,

   produce() {
      return '108 seeds';
   }
}; // theTree

console.log( theTree.name );      // 'Divine' 
console.log( theTree.age );       // 1001
console.log( theTree.produce() ); // '108 seeds'
```

## Một chương trình

Một chương trình, hiển nhiên cũng có thể được `intellect` vẽ một đường viền bao quanh để định nghĩa. Chúng ta có thể nhìn nhận bất kỳ chương trình nào dù lớn hay nhỏ cũng sẽ bao gồm các yếu tố căn bản là:

- Nguồn dữ liệu `data` hay trạng thái `state` cần thay đổi
- Các chương trình con `sub-program` giúp biểu thị logic hoạt động đa dạng

Và thật tình cờ thì ở đây chúng ta đang có nguồn dữ liệu `data` hay trạng thái `state` lại có vị trí rất tương đồng với các thuộc tính `property` của một `object`; Còn các `sub-program` thì lại có vị trí tương đồng với các phương thức `method` của một `object`.

Hiển nhiên, cũng giống như trong tất cả các chiều kích khác của sự sống, các `object` trong môi trường phần mềm cũng có thể tạo ra các tác động qua lại lẫn nhau. Và khi chúng ta luôn hướng đến việc nhìn nhận và thiết kế một chương trình bằng các `object` có khả năng tương tác qua lại thì đó chính là khía cạnh tư duy Hướng Đối Tượng `Object-Oriented`, đôi khi cũng được gọi là `Objective` - tạm hiểu là lối tư duy khách quan đứng bên ngoài chủ thể là chương trình và cách thành phần kiến trúc của chương trình đó.

Liên kết tham khảo: [`Objective-C`](https://en.wikipedia.org/wiki/Objective-C)

## Các Công Cụ

Tư duy Hướng Đối Tượng có thể được áp dụng trên bất kỳ ngôn ngữ lập trình bậc cao nào, bao gồm cả những ngôn ngữ không có cú pháp hỗ trợ `OOP` để tạo ra các `object` đóng gói các `property` và `method`; Ví dụ như [C](https://www.tutorialspoint.com/cprogramming/c_structures.htm), [Ada](https://learn.adacore.com/courses/intro-to-ada/chapters/object_oriented_programming.html), [Haskell](https://www.haskell.org/), v.v... 

Lối cấu trúc đơn giản nhất là khi chúng ta cố gắng sử dụng một kiểu dữ liệu tổ hợp để mô tả tập trung các thuộc tính `property` của các object; Và khi thiết kế một `sub-program` có tên gọi và cú pháp sử dụng dạng `A_doSomethingTo_B(objectA, objectB)` thì có thể hiểu là một phương thức `method` của `objectA` tạo ra tác động lên `objectB`.

Còn đối với các ngôn ngữ có hỗ trợ `OOP` phổ biến thì chúng ta sẽ có một dạng cú pháp nhất định để đóng gói các `property` và `method` vào trong cùng một tên định danh để mô tả một `object` đơn thuần hay còn được gọi là `literal object`. Ngoài cú pháp để khởi tạo các `literal object`, thì người ta thường sẽ cung cấp thêm ít nhất một dạng cú pháp định nghĩa bản mẫu có các từ khóa thường sử dụng là: lớp `class`, kiểu `type`, bản mẫu `prototype`, hay hàm khởi tạo `function`.

Trích đoạn bài viết [[JavaScript] Bài 4 - Object & Everything](https://viblo.asia/p/LzD5dRD0ZjY)

```Thing.js
class Thing {
   constructor(givenColor, givenAge) {
      this.color = givenColor;
      this.age = givenAge;
   }
  
   whisper() {
      console.log(this.age + " years ago...");
      console.log(this.color + "...");
   }
} // class Thing

// tạo ra 2 object từ bản mẫu
var water = new Thing("blue", 1001);
var grass = new Thing("green", 10);

water.whisper();
// "1001 years ago..."
// "blue..."

grass.whisper();
// "10 years ago"
// "green..."
```

![](https://images.viblo.asia/a1954663-0477-4034-9e80-0f85fa9d504b.png)

Bên cạnh cú pháp định nghĩa bản mẫu cho các `object` có cùng dạng thức mô tả thì các ngôn ngữ hỗ trợ `OOP` phổ biến còn cung cấp thêm các công cụ khác nữa về mặt cú pháp để hỗ trợ cho các chức năng mang tính kiến trúc của chương trình. Điển hình là bộ tứ có tên gọi lần lượt như sau:

- `Inheritance` - Kế Thừa và Mở Rộng một dạng thức mô tả `object` để tạo thành một dạng thức mới có nhiều yếu tố hơn cả về `property` và `method`.
- `Encapsulation` - Đóng Gói và Ẩn Đi những yếu tố mang tính chất nội bộ không để code bên ngoài có thể trực tiếp tạo tác động lên các yếu tố này.
- `Polymorphism` - Đa Hình và Đặc Tả những yếu tố chi tiết trong mỗi bản mẫu được sử dụng trực tiếp để tạo ra các `object`.
- `Abstraction` - Trừu Tượng và Khái Quát những yếu tố căn bản bắt buộc phải có để tạo thành một dạng thức mô tả các `object`.

Trên thực tế thì trong cả những ngôn ngữ lập trình không hỗ trợ trực tiếp các cú pháp `OOP` - ví dụ như Ada (Procedural), hay Haskell (Functional) - thì những chức năng trên cũng được hỗ trợ rất mạnh mẽ bởi các công cụ định kiểu `type` và tạo ràng buộc `contract`.

Và như đã nói trong bài viết trước thì chúng ta quyết định là sẽ tìm hiểu về các công cụ hỗ trợ biểu thị các chức năng trên trong code `OOP`; Vì vậy nên trong các bài viết tiếp theo, chúng ta sẽ lần lượt điểm danh bộ tứ đã được liệt kê trong danh sách trên và cách thức để áp dụng những chức năng này trong JavaScript.

[**[JavaScript] Bài 26 - Inheritance in OOP**](https://viblo.asia/p/n1j4l3YaVwl)