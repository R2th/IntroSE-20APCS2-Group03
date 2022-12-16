## 1. Lập trình hướng đối tượng là gì?

- **Lập trình hướng đối tượng(OOP)**: **lập trình cho phép các nhà phát triển tổ chức(nhóm) các nhiệm vụ tương tự thành các lớp**. Việc lập trình hướng đối tượng là cách làm giúp cho mã nguồn có khả năng phát triển và tối ưu.
- **Lập trình hướng đối tượng** **cho phép phân tách một vấn đề thành một số thực thể được gọi là đối tượng và sau đó xây dựng dữ liệu và chức năng xung quanh đối tượng này.** Dữ liệu của đối tượng có thể được truy nhập bởi các hàm được liên kết với đối tượng đó. Hàm là 1 đối tượng, có thể truy cập các hàm của đối tượng khác.
    
## 2. Đặc điểm của lập trình hướng đối tượng 
Lập trình hướng đối tượng có 4 tính chất chính sau:
### 2.1 Tính kế thừa(Inheritance)
- Một trong những ưu điểm chính của OOP chính là khả năng giảm trùng lặp mã nguồn bằng cách kế thừa. `Tính kế thừa` **chính là cho phép ta viết mã nguồn 1 lần ở lớp cha và có thể sử dụng đoạn mã đấy ở cả lớp cha và lớp con.**
- Lớp con có thể sử dụng tất cả các **phương thức** và **thuộc tính** `non-private` mà nó kế thừa từ lớp cha. Sự kế thừa để sử dụng lại mã nguồn chỉ xảy ra 1 chiều vì lớp cha không thể sử dụng những thuộc tính, phương thức riêng của lớp con.
- Lớp con kế thừa tất cả các thành phần của lớp Cha, có thể mở rộng công năng các thành phần kế thừa cũng như bổ sung thêm các thành phần mới.
- Ví dụ: Ta có lớp smartPhone là lớp cha và lớp con là iPhone. Lớp iPhone kế thừa hết các đặc tính của lớp smartPhone.

   ![](https://images.viblo.asia/94206556-28e4-4d11-893b-9bee5a86a44c.png)
 
### 2.2 Tính đa hình(Polymorphism)
- **Người lập trình có thể định nghĩa một đặc tính (chẳng hạn thông qua tên của các phương thức) cho một loạt các đối tượng gần nhau nhưng khi thi hành thì dùng cùng một tên gọi mà sự thi hành của mỗi đối tượng sẽ tự động xảy ra tương ứng theo đặc tính của từng đối tượng mà không bị nhầm lẫn.**
- `Tính đa hình` `được thể hiện qua việc viết lại các method (hàm) từ class cha thông qua class kế thừa nó hoặc việc triển khai các interface`. Hoặc có thể được hiểu là Lớp Con sẽ viết lại những phương thức ở lớp cha (**overwrite**).
- `Tính đa hình` mô tả mô hình lập trình trong OOP trong đó các lớp có chức năng khác nhau chia sẻ cùng 1 `Interface`. Tính đa hình chỉ ra rằng mã nguồn làm việc bởi các lớp khác nhau không cần biết lớp nào đang sử dụng vì chúng đều được sử dụng cùng 1 cách.
- Ví dụ: Tính đa hình thể hiện trong việc nhấn nút. Ta chỉ cần biết nhấn nút còn việc nút làm như thế nào còn phụ thuộc vào ngữ cảnh mà nó sử dụng, tuy vậy, kết quả không ảnh hưởng đến cách nó sử dụng.
  
    ![](https://images.viblo.asia/6675885b-4d23-4b01-856e-2c36af28b91a.png)
    
- Kết quả:


    ![](https://images.viblo.asia/1aa5b9ec-242e-4475-96d2-82587f5ff0d3.png)
    

### 2.3 Tính đóng gói(Encapsulation)
- Đóng gói là cơ chế được sử dụng để an toàn dữ liệu hoặc thông tin trong 1 đối tượng. Nó không cho phép người sử dụng các đối tượng thay đổi trạng thái nội tại của đối tượng.
- Các dữ liệu và phương thức có liên quan với nhau được đóng gói thành các lớp để tiện cho việc quản lý và sử dụng.
- Đóng gói còn để che giấu một số thông tin và chi tiết cài đặt nội bộ để bên ngoài không thể nhìn thấy.
- Trong trường hợp một đối tượng thuộc lớp cần thực hiện một chức năng không nằm trong khả năng vì chức năng đó thuộc về một đối tượng thuộc lớp khác, thì nó sẽ yêu cầu đối tượng đó đảm nhận thực hiện công việc. Một đối tượng sẽ không được truy xuất trực tiếp vào thành phần dữ liệu của đối tượng khác cũng như không đưa thành phần dữ liệu của mình cho đối tượng khác một cách trực tiếp. Tất cả mọi thao tác truy xuất vào thành phần dữ liệu từ đối tượng này qua đối tượng khác phải được thực hiện bởi các phương thức (method) của chính đối tượng chứa dữ liệu.

**Các mức truy cập** (tác động lên các dữ liệu nội tại của 1 đối tượng theo cách nào là tùy thuộc vào người viết mã).

- ***Private***: Các phương thức, thuộc tính khai báo ở dạng `private` chỉ có thể sử dụng được trong class đó. Chỉ cho phép truy cập (hay thay đổi) giá trị của thuộc tính và phương thức ở phạm vi của đối tượng (hoặc lớp). Ngay cả các lớp kế thừa nó cũng không thể sử dụng các phương thức, thuộc tính này.
- ***Protected***: Các phương thức, thuộc tính khai báo ở dạng `protected` thì chúng được sử dụng trong class đó và cả class con kế thừa từ nó(hỗ trợ kế thừa). Chỉ cho phép truy cập (hay thay đổi) giá trị của thuộc tính và phương thức ở phạm vi của đối tượng con (hoặc lớp con).
- ***Public***: Với việc khai báo public thì đây là mức độ truy cập cao nhất trong OOP. Các phương thức, thuộc tính này có thể được tác động từ cả trong lẫn ngoài class và nó hỗ trợ kế thừa. Cho phép truy cập (và thay đổi giá trị) của thuộc tính và phương thức ở mọi phạm vi.

    ![](https://images.viblo.asia/f04e7fdf-668a-42eb-a884-23af03c34636.png)

### 2.4 Tính trừu tượng(Abstraction)
- Trừu tượng hóa cung cấp 1 cách nhìn tổng quát về các lớp hoặc đối tượng bằng cách cung cấp các thông tin liên quan. **Trừu tượng là quá trình ẩn đi cách làm việc của một đối tượng và hiển thị thông tin của đối tượng theo 1 cách dễ hiểu. **
- **Tính chất này giúp chúng ta tập trung vào những vấn đề cốt lõi cần thiết của đối tượng thay vì quan tâm đến cách nó thực hiện. Nó cũng làm tăng khả năng mở rộng khi sử dụng cùng với tính đa hình và kế thừa trong lập trình hướng đối tượng.**
- Định ra một quy định cơ bản, và yêu cầu bất kể một lớp nào, hoặc phương thức nào khi muốn làm việc với nó, thì buộc phải định nghĩa theo các quy tắc mà nó đã đặt ra. Tuy nhiên, vì lớp trừu tượng vẫn được xem là một lớp. Thế nên, ngoài chức năng quy định lớp trừu tượng ra, thì nó vẫn có thể khởi tạo các thuộc tính hoặc phương thức khác để phục vụ cho việc sử dụng của những phương thức kế thừa nó. Từ những đối tượng giống nhau, bạn có thể trừu tượng hóa thành một lớp. Tính trừu tượng cho phép bạn loại bỏ tính chất phức tạp của đối tượng bằng cách chỉ đưa ra các thuộc tính và phương thức cần thiết của đối tượng trong lập trình.

    ![](https://images.viblo.asia/a45d159e-ff17-4520-b91b-b247c20a6350.png)

 
- PHP có `abstract class` và `interface` để trừu tượng hóa các đối tượng. Ví dụ khi ta tạo một lớp (class) dùng đại diện cho các tài khoản tiền gửi ngân hàng của các khách hàng và đặt tên cho lớp này là BankAccount. Lớp này có hai thuộc tính là $balance và $interest dùng để lưu dữ liệu số tiền dư và lãi suất tiền gửi của tài khoản. Các phương thức gửi tiền deposit và rút tiền withdraw.


    ```

    class BankAccount 
    {
        public $balance; // số dư tài khoản
        public $interest; // lãi suất

        public function deposit ($amount) 
        {
            // TODO
        }

        public function withdraw ($amount) 
        {
            // TODO
        }
    }
    ```



=> Với `tính trừu tượng` (abstraction) thì toàn bộ sự phức tạp của việc xử lý quá trình gửi tiền và rút tiền sẽ được thực hiện trong 2 phương thức deposit và withdraw. Các lập trình viên không cần phải quan tâm tới sự phức tạp (hay nội dung chi tiết) của việc xử lý các công việc gửi tiền và rút tiền trên mà chỉ cần biết mục đích của từng phương thức là gì.

## 3. Phân biệt Abstract class và Interface
***Abstract Class ???***
*Một số đặc điểm của `Abstract Class` như sau:*
- Bạn **không** thể khởi tạo `Abstract Class`.
- **Bất kỳ** lớp nào có chứa ít nhất 1 phương thức trừu tượng thì chắc chắn nó phải là `Abstract Class`. 1 `Abstract Clas`s có thể chứa các phương thức trừu tượng hoặc không trừu tượng.
- Phương thức `abstract` của `Abstract Class` không được phép khai báo nội dung phương thức. Nó chỉ có thể định nghĩa tên cũng như các tham số đầu vào.
- Khi các lớp kế thừa từ một `Abstract Class` thì các phương thức được đánh dấu là `abstract` thì bắt buộc phải định nghĩa ở lớp con. Các phương thức ở `Abstract Class` được định nghĩa là bình thường thì ở lớp con vẫn có khả năng định nghĩa lại giống hoặc thấp hơn với mức giới hạn của phương thức (public, private, protected) và sẽ thực hiện nội dung ở lớp con.
- Không hỗ trợ đa kế thừa.

***Interface***
- `Interface` được định nghĩa để cung cấp một tên hàm chung để có thể triển khai. `Interface` được xem như là bộ xương để thực hiện. So với Abstract Class thì `Interface` cũng có một số điểm gần giống. Hãy xem thử một số đặc điểm sau đây:
- `Interface` cũng không thể khởi tạo. Nó là cấu trúc trong OOP cho phép các class khác có thể **implements**.
- Hơi khác với `Abstract Class` thì các phương thức trong `Interface` bắt buộc toàn bộ là các phương thức trừu tượng.
- Các phương thức trong `Interface` chỉ có thể được định nghĩa với khả năng là **public** và cũng không được định nghĩa nội dung.
- `Interface` có thể được **extends** với nhau.
- 1 **class** có thể **implements** nhiều `Interface`.
 
**Để có thể phân biệt được Abstract Class và Interface, trước tiên ta cần biết chúng là gì.**

- **Abstract (Lớp trừu tượng):** Chúng ta có thể hiểu đơn giản nó như một lớp cha cho tất cả các lớp con có cùng bản chất kế thừa nó. Mỗi lớp con chỉ có thể kế thừa từ một lớp cha và chúng ta cũng không thể tạo được các đối tượng trực tiếp từ lớp cha. Các lớp này sẽ chứa các phương thức trừu tượng, các lớp khác khi kế thừa sẽ phải định nghĩa các phương thức ấy. 
- **Interface:** được xem như một mặt nạ cho tất cả các **Class** cùng cách thức hoạt động nhưng có thể khác nhau về bản chất.
`Interface` là tạo ra 1 khuôn mẫu chung, 1 interface chung để cho việc giao tiếp giữa các đối tượng trong chương trình một cách thống nhất. Có thể hiểu nó như 1 chuẩn nào đó. Khi một class **implements** từ nó => instance của class đó đạt chuẩn => các đối tượng của class khác có thể sử dụng các tình năng của đối tượng chuẩn đó mà không lo lắng nó thiếu function này nọ vì đã đạt chuẩn là bắt buộc phải có đủ các phương thức của chuẩn đó


**Giống nhau:**
- `Abstract class` và `interface` đều không thể khởi tạo đối tượng bên trong được.
- `Abstract class` và `interface` đều có thể khai báo các phương thức nhưng không thực hiện chúng.
- `Abstract class` và `interface` đều bao gồm các phương thức abstract.
- `Abstract class` và `interface` đều được thực thi từ các class con hay còn gọi kế thừa, dẫn xuất.
- `Abstract class` và `interface` đều có thể kế thừa từ nhiều interface.

**Khác nhau:**
- Cả 2 đều là "*bản thiết kế*" cho các lớp dẫn xuất, do đó chúng chỉ chứa các khai báo **Properties** và **Method** mà không quan tâm bên trong thực hiện những gì. Nhưng cụ thể thì `Abstract Class` là "bản thiết kế" cho **Class** còn `Interface` là "bản thiết kế" cho **Method**. Tuy nhiên sẽ có những khác biệt được liệt kê dưới đây:
    
 ![](https://images.viblo.asia/d95f8796-6d9a-4590-9c5e-428a43f98913.png)

**So sánh interface và lớp dạng abstract:**

- Khi chúng ta tạo ra một `interface`, chúng ta về cơ bản tạo ra một tập các phương thức rỗng và những phương thức rỗng này sẽ được thực thi bởi những lớp nào thực thi `interface`. khi quan tâm vào chức năng, khuôn mẫu chung.
- Khi chúng ta tạo một `lớp trừu tượng`, chúng ta đang tạo ra một lớp cơ sở có thể có một hoặc nhiều phương thức hoàn chỉnh nhưng ít nhất một hoặc nhiều phương thức còn lại dở dang và khai báo **abstract**. Nếu tất cả các phương thức của một lớp dạng `abstract` là phương thức **abstract** thì nó là giống như một `interface` thôi. Mục đích của một `lớp trừu tượng` là cung cấp định nghĩa cơ sở cho các lớp dẫn xuất sẽ làm việc và sau đó.

**Khi nào nên dùng abstract:**
- Ví dụ xây dựng hệ thống Animals. Bạn nhận thấy chúng có nhiều điểm chung, như có tên, có tiếng "kêu"... Nhưng, những đặc điểm này chỉ xác định khi nó thuộc một đối tượng cụ thể ví dụ như con chó, con mèo, nhưng động vật chung thì không có tên, nó là một cái chung chung. Thế nên, Animal sẽ là abstract (một cái trừu tượng).


## 4. Tính đa hình: Phân biệt phương thức nạp chồng và ghi đè???
- `Tính đa hình` trong lập trình hướng đối tượng là sự đa hình của mỗi hành động cụ thể ở những đối tượng khác nhau. Ví dụ hành động ăn ở các loài động vật hoàn toàn khác nhau như: con gà ăn thóc, con hổ ăn thịt, con người thì ... ăn hết, còn đa hình trong lập trình thì được hiểu là Lớp Con sẽ viết lại những phương thức ở lớp cha . 

**Kỹ thuật tính đa hình dùng:**

***Nạp chồng (Overloading):*** **Việc khai báo trong một lớp có nhiều thuộc tính, nhiều phương thức có cùng tên nhưng với các tham số khác nhau (khác kiểu dữ liệu, khác số lượng tham số) gọi là khai báo `chồng phương thức`** (**overloading method**). Khi được gọi, dựa vào tham số truyền vào, phương thức tương ứng sẽ được thực hiện.
Hay ngắn gọn theo từng ý như phía dưới để các bạn dễ hiểu hơn.
- **Các phương thức nằm trong cùng 1 lớp , có cùng tên với nhau nhưng có danh sách đối số khác nhau được gọi là các phương thức nạp chồng.**
- Hàm tạo cũng có thể được nạp chồng.
- Tùy theo ta gọi đối số thế nào mà nó sẽ gọi hàm tương ứng.
- Nạp chồng là hình thức đa hình (polymorphism) trong quá trình biên dịch (compile time).

    - **VD1:** `Overloading method` dùng làm gì? Ta xét bài tập nhỏ: Tính diện tích hình vuông, tính diện tích hình hình chữ nhật, tính diện tích hình tam giác. 
    => Ta sẽ tạo ra 3 phương thức đều tên là dienTich sao cho, nếu như:
        + Có 1 tham số truyền vào, nó sẽ tự hiểu là cần tính diện tích hình vuông
        + Có 2 tham số truyền vào, nó tự hiểu là tính diện tích hình chữ nhật
        + Có 3 tham số truyền vào, nó tự hiểu là tính diện tích hình tam giác

    - **VD2:**

    ![](https://images.viblo.asia/f6ad3e39-8c69-4e8a-9d22-e1b1019ef365.png)
    

**Ghi đè (Overriding):** **Trong PHP, nếu như người lập trình tạo ra một phương thức trong lớp con có trùng tên, cùng tham số, cùng kiểu trả về với một phương thức đã được tạo ở lớp cha thì đó được gọi là ghi đè phương thức(Method Overriding).** 
Hoặc một cách dễ hiểu hơn như sau.
- Là Phương thức đã xuất hiện ở lớp cha và xuất hiện tiếp ở lớp con.
- Khi đối tượng thuộc lớp con gọi phương thức thì sẽ chọn lựa và chạy theo phương thức trong lớp con.    
- **Khi dùng `override`, lúc thực thi, nếu lớp Con không có phương thức riêng, phương thức của lớp Con được gọi. Nếu không có phương thức của lớp Cha sẽ được gọi.**
- Ghi đè là hình thức đa hình (polymorphism) trong quá trình thực thi (Runtime)
    - **VD1:**

        ![](https://images.viblo.asia/0a9814ad-5322-4d36-b644-64a275029c03.png)

    - **VD2:**

    ```
            <?php
            class testParent{
                public function f1(){
                    echo 1;
                }
                public function f2(){
                    echo 2;
                }
            }
            class testChild extends testParent{
                function f2($a) //Overriding function f2{
                    echo $a;
                }
            }
            $a = new testChild();
            $a->f2(“Hello You.”);//It will print Hello You
            ?>
   ```

   - **VD3:**

   ```
            public class Shape {
                public void show() {
                    System.out.println("Đây show() của lớp Shape");
                }
            }

            public class Rectangle extends Shape {
                public void show() {
                    System.out.println("Đây là show() của lớp Rectangle");
                }
            }

            public class Square extends Shape {
                public void show() {
                    System.out.println("Đây là show() của lớp Square");
                }
            }
  ```

=> Khi khởi tạo: tiến hành gọi 3 phương thức show() của 3 lớp này. Nếu làm như bình thường thì để gọi phương thức show() ứng với từng lớp thì chúng ta phải tạo một đối tượng của lớp tương ứng, nhưng đối với tính đa hình thì chúng ta không cần phải tạo ra 3 đối tượng của 3 lớp mà chúng ta sẽ chỉ cần khai báo đối tượng của lớp Shape. Đây chính là ý nghĩa của `tính đa hình`.
- Kết quả:
 	
  ```
            Shape shape = new Shape();
            shape.show();   // "Đây là show() của lớp Shape"

            shape = new Rectangle();
            shape.show();   // "Đây là show() của lớp Rectangle"

            shape = new Square();
            shape.show();   // "Đây là show() của lớp Square"
  ```



            
**Lúc nào thì sử dụng overload và override?**
- Sử dụng `overload` khi trong cùng một phương thức, chúng ta muốn làm thêm một công việc khác, ta sẽ dùng `Overload`.
- Sử dụng `override` khi  trong cùng phương thức , chúng ta lại muốn làm khác đi ta sẽ dùng `Override`. (Khác đi ở đây là khác phần thân của method, chúng ta có thể sử dụng logic…).

**Đầu tiên, nói về ví dụ hiểu về overload như thế nào:**

- Giả sử bạn có 1 method dùng để connect đến n database server, theo lẽ thông thường thì bạn sẽ viết ra n method phục vụ việc kết nối ví dụ như :
    + connectDBSQL
    + connectDBOracle
    + connectDBMySSQL
    + …

- Như các bạn thấy rằng, nếu có n db server thì chúng ta phải viết n method để connect. Làm như vậy sẽ có nhiều hạn chế, thay vì thế bạn sử dụng kỹ thuật overload để chỉ cần viết method có tên là connectDB với các tham số truyền vào tương ứng.
=> Điều này sẽ giúp phương thức của chúng ta tránh nhầm lẫn, có ý nghĩa và dễ nhớ.

**Override được hiểu và sử dụng trong trường hợp nào?**

- Giả sử như tôi có một bài toán như sau: Tính lương của công ty A, lương bằng số ngày * 300000.
 
 ![](https://images.viblo.asia/40655276-293a-4855-bf57-b353acf6065f.png)

- Qua đó các bạn thấy rằng, trong cùng một phương thức nhưng chúng ta muốn khác đi, với bài trên chúng ta đều có phương thức tính lương, nhưng mỗi công ty lại có cách tính riêng, nên chúng ta sẽ sử dụng override.
- Với các trường hợp ví dụ trên, Overload ,Override không có nghĩa là làm code ngắn hơn, nó chỉ làm cho tên hàm của chúng ta có ý nghĩa và rõ ràng hơn.

## 5. Phương thức static (tĩnh)
- `Static` trong lập trình hướng đối tượng là 1 thành phần tĩnh (thuộc tính hoặc phương thức).
- Phương thức `static` có thể truy cập mà không cần khởi tạo.
- Trong phương thức `static` không thể gọi phương thức hoặc thuộc tính `non-static`.
- Trong phương thức `non-static` có thể gọi phương thức hoặc thuộc tính `static`.
- Phương thức `static` có thể gọi ngay cả khi chưa khởi tạo đối tượng.
- Trong PHP có 2 từ khoá đặc biệt là `self` và `static` đóng vai trò quan trọng trong các lớp thừa kế các phương thức tĩnh hoặc biến thành viên. Nó gần giống với việc sử dụng **$this**. `self` và `static` có thể được sử dụng để truy cập các phương thức tĩnh và các biến từ bên trong 1 lớp xác định hoặc kế thừa chúng.
    + `self` đại diện cho cho chính đối tượng khai báo đến nó. Nếu class A thừa kế class B thì có nghĩa rằng `self` đại diện cho class B.
    + `static` thì lại đại diện cho chính đối tượng đang gọi đến nó.
    **VD**:
```
            <?php 
            class ConNguoi
            {
                private static $name = 'ConNguoi';
                public function getName()
                {
                    echo self::$name;
                    echo '<br >';
                    echo static::$name;
                }
            }

            ConNguoi::getName();
```


   - **Kết Quả:**
```
            ConNguoi
            ConNguoi
```

- Vậy liệu nó có cho ra các giá trị khác nhau khi chúng ta sử dụng tính kế thừa trong class? Để biết rõ hơn thì chúng ta sẽ tạ ra các ví dụ để so sánh nó.
Vẫn là class **ConNguoi** như trên nhưng chúng ta sẽ khai báo thêm một class **NguoiLon** kế thừa class ConNguoi và `override` lại thuộc tính **$$name** như sau:

```
            <?php 
            class ConNguoi
            {
                private static $name = 'ConNguoi';
                public function getName()
                {
                    echo self::$name;
                    echo '<br >';
                    echo static::$name;
                }
            }
            class NguoiLon extends ConNguoi
            {
                private static $name = 'NguoiLon';
            }

            NguoiLon::getName();
```
    
   - **Kết quả:**
```
            ConNguoi

            Fatal error: Cannot access private property NguoiLon::$name
 
```

- Ta thấy: Đối với `self` thì kết quả chạy như bình thường, còn với `static` thì sao nó lại báo là không thể truy cập vào thuộc tính **private** mà lại là NguoiLon::name, liệu có phải thằng `static` này đại diện cho đối tượng hiện tại nên không thể truy xuất được đến thuộc tính **name**. 
=> để chắc ăn hơn thì mình thử đổi **visibility** của biến **$name** thành **protected** xem sao?

```
            <?php 
            class ConNguoi
            {
                protected static $name = 'ConNguoi';
                public function getName()
                {
                    echo self::$name;
                    echo '<br>';
                    echo static::$name;

            }
            class NguoiLon extends ConNguoi
            {
                protected static $name = 'NguoiLon';
            }
            // NguoiLon::getName();
            $a = new NguoiLon();
            $a->getName();

```


   -  **Và đây là kết quả:**
```
            ConNguoi
            NguoiLon
 
```
   - Từ 2 ví dụ trên chúng ta tạm đưa ra  kết luận là static nó có nguyên tắc gần như $this, là đều truy xuất đến đối tượng hiện tại.
   
**Kết Luận**
    - `Self`: Truy xuất đến class khai báo nó. 
    - `Static`: Truy xuất đến đối tượng hiện tại.

    
## 6. Kết luận
- Qua bài viết, các bạn có thể đã hiểu được cơ bản về **hướng đối tượng** và **thể hiện của hướng đối tượng trong PHP**. Cách phân biệt một số khái niêm hay nhầm lẫn trong hướng đối tượng.
- **Các bạn hãy theo dõi phần tiếp theo nhé**!!!