### 1. Bắt đầu <br>
Stack cũng giống như mảng, nhưng nó bị hạn chế về chức năng so với mảng. Stack chỉ có thể push ( thêm ) phần tử ở đầu, pop (lấy ra) để xóa phần tử ở đầu stack và peek để lấy phần tử ở đầu mà không xóa nó khỏi Stack. <br>
Tại sao phải dùng đến Stack? Trong nhiều thuật toán, bạn muốn thêm đối tượng vào một danh sách tại một thời điểm nào đó và lấy nó ra khỏi danh sách trong một thời điểm khác. Thông thường, thứ tự bạn thêm và loại bỏ các phần tử rất là quan trọng.<br>
Một Stack cho bạn một quy chế LIFO hay tức là theo thứ tự vào sau ra trước. Phần tử được thêm vào cuối cũng sẽ được lấy ra đầu tiên của ngăn xếp.<br>
![](https://images.viblo.asia/da7f3bf6-93fc-46a9-bb90-1d8349c3ab75.png) <br>
### 2. Cách hoạt động của Stack<br>
Stack có một phạm vi chức năng nhỏ. Chúng ta có thể lấy ví dụ về 1 chồng sách để hiểu rõ về cách họat động của Stack. Sau đây là những gì mà Stack có thể làm được: <br> 
### * Push <br>
Khi bạn muốn thêm một phần tử vào ngăn xếp, bạn dùng **push** để đưa nó vào Stack. Điều này cũng tương tự như đặt một cuốn sách lên đầu của 1 chồng sách vậy! <br>
![](https://images.viblo.asia/898bbe6e-ac34-4fca-bf80-d49f997bae58.png)<br>
### * Peek <br>
Theo như thiết kế  Stack không cho phép bạn duyệt các phần tử ngoại trừ phần tử đầu tiên. Phương thức **peek** cho phép bạn biết được phần tử đầu của Stack là gì . <br>
### * Pop<br>
Khi muốn xóa một phần tử của Stack ta dùng phương thức  **pop**. Có thể hiểu một cách đơn giản về pop là lấy ra cuốn sách đầu tiên của chồng sách. <br>
![](https://images.viblo.asia/e1f6450f-0663-4a9e-9d2c-9c9b3fccd53a.png)<br>
### 3. Thực thi Stack trong Swift <br>
Đầu tiên bạn hãy mở một playground  để tiến hành thực hiện Stack trong Swift. <br> Để bắt đầu, hãy viết đoạn mã code sau vào playground <br>
![](https://images.viblo.asia/455e5ba5-4ae9-47ab-9ca6-21c7894f686e.png <br> 
Tại đây bạn đã khai báo xong 1 Stack với một thuộc tính là một mảng. Chúng ta sẽ tương tác với mảng này để thực hiện các phương thức **push, pop **và peek <br>
### Push<br>
Việc thêm một phần tử vào trong Stack khá là đơn giản. Phương thức thêm vào Stack: <br> 
![](https://images.viblo.asia/cd2d6779-ef4e-43fe-9a70-d0c1e6228d1a.png)<br>
1. Phương thức push có một tham số truyền vào. element được thêm vào Stack. <br>
2. Lưu ý rằng các phần tử mới được them vào sẽ được đưa vào cuối của mảng. Việc chèn dữ liệu vào đầu của mảng làm cho độ phức tạp của thuật toán tăng lên rất nhiều o(n), bởi vì nó yêu cầu tất cả các phần tử của mảng cần được đưa vào bộ nhớ. Còn khi thêm vào cuối mảng thì mọi thứ trở nên dễ dàng hơn, độ phức tạp chỉ là  O(1). <br>
### Pop <br>
Xóa một phần tử của Stack cũng rất dễ dàng. Thêm đoạn code sau vào trong struct Stack <br>
![](https://images.viblo.asia/b4d1b862-66f5-4816-a877-099fd360faf1.png)<br>
1. Phưương thức Pop trả về một optinal String. Giá trị trả về là optinal để  xử lý trường hợp ngăn xếp rỗng. Nếu như bạn cố gắng pop một stack rỗng thì nó sẽ trả về giá trị nil<br>
2. Mảng trong Swift có một phương thức rất hữu ích giúp viêc loại bỏ phần tử cuối của mảng, đó là phương thức popLast <br>
### Peek<br>
Phương thức peek để kiểm tra phần tử đầu tiên của Stack. Nó tương đối là đơn giản. Mảng trong Swift có thuộc tính “last” để lấy được phần tử cuối của mảng. Hãy thử vòa code của bạn <br>
![](https://images.viblo.asia/1702daff-5c98-4fd5-ba13-e40b375c97ab.png)
Phương thức peek tương đối giống so với pop. Sự khác nhau duy nhất ở đây là peek tránh được sự biến đổi của mảng, vì thế không cần thiết sử dụng mutating trong trường hợp này <br>
### Demo <br>
Tại thời điểm này, Stack của bạn đã sẵn sàng cho một số thử nghiệm.  Thêm đoạn code sau vào cuối file playground của bạn: <br>
![](https://images.viblo.asia/aa909a7c-f82d-474d-89b0-07f32877d24d.png)<br>
Bên phía tay phải của playground bạn sẽ thấy kết quả trả về của từng dòng: <br>
1. Bạn đã khai báo một thuộc tính rwBookStack và khởi tạo nó bằng Stack. rwBookStack cần phải là một biến chứ không phải là một hằng vì bạn cần biến đổi các nội dung của ngăn xếp.<br>
2.  Bạn thêm một String vào trong Stack .<br>
3. Phương thức peek được thực hiên, nó sẽ hiển thị ra “3D Games by Tutorials”. Đây chính là phần tử cuối cùng được đưa vào Stack <br>
4. Xóa một phần tử trong Stack. <br>
5. Sẽ trả về giá trị nil, vì trước đó không còn phần tử nào trong Stack<br>
### CustomStringConvertible<br>
Hiện tại khá là khó để xác định được các phần tử có trong ngăn xếp. May mắn rằng Swift xây dựng 1 protocol có tên là CustomStringConvertible cho phép bạn xác định cách bạn muốn đại diện cho một đối tượng như một chuỗi.  Bây giờ bạn thêm đoạn code sau vào phần dưới của phần thực thi Stack.  <br>
![](https://images.viblo.asia/908c3bad-9196-4fbb-8d2c-dfe1588c4fa2.png)<br>>
Điều này tương đối đơn giản: <br>
1. Để sử dụng CustomStringConvertible , bạn tạo 1 extension và thực thi protocol CustomStringConvertible <br>
2. Thực hiện tạo giá trị cho thuộc tính description <br>
3. Để tiện cho việc quan sát, chúng ta tạo ra 2 phân tách dòng . <br>
4. Để hiển thị các phần tử trong ngăn xếp, bạn sẽ xếp chồng lên các phần tử trong mảng đó. Vì bạn đã nối các phần tử vào phía sau của mảng, trước tiên bạn cần phải đảo ngược mảng. Sau đó phương thức joined(separator:) lấy các phần tử trong mảng và nối chúng lại với 1 khoảng phân cách giữa mỗi phần tử. <br>
5. Cuối cùng bạn cho stackElements vào giữa 2 khoảng ngăn cách và trả về kết quả. <br>
![](https://images.viblo.asia/2bd66068-2046-4c08-a5f4-85873a14aec1.png)<br>
Kết quả thu được <br>
![](https://images.viblo.asia/c91d176f-f23f-49c1-8d98-75cc2f40bf92.png)<br>
### Generic<br>
Hiện tại, stack của bạn chỉ có thể lưu trữ chuỗi. Nếu bạn muốn tạo ra một ngăn xếp để lưu trữ số nguyên, bạn sẽ phải thực hiện một ngăn xếp hoàn toàn mới với kiểu số nguyên.
Thật may vì swift sẽ hỗ trợ bạn việc đó.Đầu tiên, cần sửa lại phần khai báo như sau <br>
![](https://images.viblo.asia/34253618-e29b-43de-9a16-590751b1a0f9.png)<br>
Dấu ngoặc nhọn được dùng để khai báo kiểu generic, cho phép sử dụng Stack này với mọi kiểu dữ liệu của Swift.Tiếp theo, tìm và cập nhật tất cả các trường hợp của bạn đã viết “String” và thay thế nó bằng "Element". Stack của bạn nên như thế này: <br>
![](https://images.viblo.asia/95eaa405-52d9-40a6-a0f1-44acabba9a08.png)<br>
Cuối cùng, bạn sẽ phải cập nhật thuộc tính description. Chỉ có một thay đổi mới xảy ra. Cập nhật dòng sau để phù hợp : <br>
![](https://images.viblo.asia/017e9e53-ca15-4162-862a-6b1275925938.png)<br>
Ý tưởng ở đây là để biến đổi các phần tử trong mảng thành String trước khi kết hợp chúng với nhau. Vì stack của bạn là generic, bạn không thể chắc chắn rằng các giá trị bạn đang tham gia là các chuỗi.<br>
![](https://images.viblo.asia/23424377-e7f3-47e2-b292-aa4dd03befaa.png)<br>
Cuối cùng, tìm dòng nơi bạn đã khởi tạo ngăn xếp của mình và chỉ định stack để gõ String:<br>
Bây giờ stack của bạn có thể được chuyên biệt cho tất cả các loại, cho dù đó là Chuỗi, Int, hoặc thậm chí tùy chỉnh các loại bạn tạo ra, chẳng hạn như các đối tượng Person!<br>
### Tổng kết<br>
Có hai thuộc tính khác thường đi kèm với ngăn xếp. Thông thường, bạn muốn biết liệu ngăn xếp có rỗng hay không, và có bao nhiêu phần tử hiện đang nằm trong ngăn xếp. Thêm thuộc tính đã được tính toán sau trong Stack<br> 
![](https://images.viblo.asia/1e020c3e-e4fc-40fe-a658-7cf8b640f8ab.png)<br>
Nguồn : https://www.raywenderlich.com/149213/swift-algorithm-club-swift-stack-data-structure