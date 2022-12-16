Trong bài viết này, mình sẽ trình bày về Override, overload và sự khác nhau cơ bản giữa chúng.
# **1. Override**

### 1.1 Khái niệm và ví dụ:
* Override là một tính năng cho phép một lớp con cung cấp một triển khai cụ thể của  phương thức đã được cung cấp bởi một trong các lớp cha của nó. Nói dễ hiểu hơn, nếu lớp con có một hoặc nhiều phương thức giống với một trong các lớp cha của nó, thì đó là ghi đè phương thức.
* Override được sử dụng để thu được tính đa hình tại runtime.
* Ví dụ về sử dụng Override
    * Ta sẽ xây dựng 1 cây kế thừa cho các loài động vật như hình dưới, các loài động vật này đều có chung các đặc điểm và phương thức như:
        * picture – tên file ảnh đại diện cho con vật này
        * food – loại thức ăn mà con vật thích. Hiện giờ, biến này chỉ có hai giá trị: cỏ (grass) hoặc thịt (meat).
        * hunger – một biến int biểu diễn mức độ đói của con vật. Biến này thay đổi tùy theo khi nào con vật ăn và nó ăn bao nhiêu.
        * boundaries – các giá trị biểu diễn chiều dọc và chiều ngang (ví dụ 640 x 480) của khu vực mà các con vật sẽ đi lại hoạt động trong đó.
        * location – các tọa độ X và Y của con vật trong khu vực của nó.
        * makeNoise() – hành vi khi con vật phát ra tiếng kêu.
        * eat() – hành vi khi con vật gặp nguồn thức ăn ưa thích, thịt hoặc cỏ.
        * sleep() – hành vi khi con vật được coi là đang ngủ.
        * roam() – hành vi khi con vật không phải đang ăn hay đang ngủ, có thể chỉ đi lang thang đợi gặp món gì ăn được hoặc gặp biên giới lãnh địa.
        
    ![](https://images.viblo.asia/0a9ea4dc-0356-449a-b4f5-d06d90e90074.PNG)
    * Tuy nhiên các loài động vật trên lại có thức ăn và âm thanh phát ra khác nhau, vậy nên ta nên để eat() và makeNoise() được cài đè tại từng lớp con: 
    ![](https://images.viblo.asia/fa375bf0-03de-43a7-8d9b-b3996989c35c.PNG)
    
    * Ta sẽ tiếp tục phân nhóm mịn hơn cây kế thừa trên. Chó sói và chó có họ hàng gần, cùng thuộc họ Chó (canine), chúng thường di chuyển theo bầy đàn nên có thể dùng chung phương thức roam(). Mèo, hổ, sư tử cùng thuộc họ Mèo (feline) khi di chuyển chúng thường tránh đồng loại nên có thể dùng chung phương thức roam(). Hà mã sẽ tiếp tục dùng phương thức roam() từ animal.
    ![](https://images.viblo.asia/8a87f31a-2a31-47b0-97f9-759f6cd9f53f.PNG)
    * Vậy khi cài đè, phương thức nào được gọi?
        * Trong cây kế thừa xảy ra cài đè, cái gì ở thấp nhất sẽ được gọi.
        * Lấy ví dụ ở hình trên, lớp Wolf có bốn phương thức: sleep() được thừa kế từ Animal, roam() được thừa kế từ Canine (thực ra là phiên bản đè bản của Animal), và hai phương thức mà Wolf cài đè bản của Animal - makeNoise() và eat(). Các phương thức sẽ được gọi như sau: 
        
    ![](https://images.viblo.asia/37404c2f-c44b-4a57-8861-1b9bd50de32a.PNG)

### 1.2 Gọi phiên bản phương thức của lớp cha
* Có nhiều trường hợp khi cài đè 1 hành vi của lớp cha, nhưng ta lại không muốn thay thế hoàn toàn mà chỉ muốn bổ sung một số chi tiết.
    * Ví dụ: Chẳng hạn, lớp Account đại diện cho tài khoản ngân hàng chung chung. Nó cung cấp phương thức withdraw(double) với chức năng rút tiền, phương thức này thực hiện quy trình rút tiền cơ bản: trừ số tiền rút khỏi số dư tài khoản (balance). FeeBasedAccount là loại tài khoản ngân hàng thu phí đối với mỗi lần rút tiền, nghĩa là bên cạnh quy trình rút tiền cơ bản, nó còn làm thêm một việc là trừ phí rút tiền khỏi số dư tài khoản. Như vậy, FeeBasedAccount có cần đến nội dung của bản withdraw() được Account cung cấp sẵn, nhưng vẫn phải cài đè vì nội dung đó không đủ dùng. Ta cũng không muốn chép nội dung bản withdraw() của Account vào bản của FeeBasedAccount. Thay vào đó, ta muốn có cách gọi phương thức withdraw() của Account từ trong phiên bản cài đè tại FeeBasedAccount.
    * Cách giải quyết:  từ trong phiên bản cài đè tại lớp con, ta muốn gọi đến chính phương thức đó của lớp cha, từ khóa super cho phép gọi đến cách thành viên được thừa kế.
```    
        public class Account {
            private double balance = 0;

            public void deposit(double money) {
                balance += money;
            }

            public void wirhDraw(double money) {
                balance -= money;
            }

            public class FeeBasedAcount extends Account {
                private double fee = 10;

                public void withdraw(double money) {
                    super.wirhDraw(money);
                    balance -= fee;
                }
            }
        }
```

### 1.3 Các quy tắc cho việc cài đè
* Danh sách tham số phải trùng nhau, kiểu giá trị trả về phải tương thích.
* Phương thức đè không được giảm quyền truy nhập so với phiên bản của lớp cha.
    * Nói cách khác, quyền truy nhập mà phiên bản của lớp con cho phép phải bằng hoặc rộng hơn phiên bản của lớp cha. Ta không thể cài đè một phương thức public bằng một phiên bản private. Nếu không, tình huống xảy ra là một lời gọi phương thức đã được trình biên dịch chấp nhận vì tưởng là phương thức public nhưng đến khi nó chạy lại bị máy ảo từ chối vì phiên bản được gọi lại là private.
* Phải là quan hệ IS-A (kế thừa).
* Các phương thức **final**, **static**, **private** không thể cài đè.

# 2. Overload
### 2.1 Khái niệm và ví dụ
* Nạp chồng phương thức đơn giản là có vài phương thức trùng tên nhưng khác nhau về đối số trong cùng 1 class. Cài chồng phương thức cho phép ta tạo nhiều phiên bản của một phương thức, mỗi phiên bản chấp nhận một danh sách đối số khác nhau, nhằm tạo thuận lợi cho việc gọi phương thức.
* Nạp chồng phương thức được sử dụng để thu được tinh đa hình tại compile time.
* Ví dụ:
```
     class Calculation {
            void sum(int a, int b) {
                System.out.println(a + b);
            }

            void sum(int a, int b, int c) {
                System.out.println(a + b + c);
            }
        }
```

### 2.2 Các cách nạp chồng
**2.2.1 Thay đổi số lượng tham số**
* Ví dụ: 
```
         class Sum {
            void sum(int a, int b) {
                System.out.println(a + b);
            }

            void sum(int a, int b, int c) {
                System.out.println(a + b + c);
            }
        }
```
     
**2.2.2 Thay đổi kiểu trả về của tham số**
* Ví dụ:
```
        class Sum {
            void sum(int a, int b) {
                System.out.println(a + b);
            }

            void sum(int a, double b) {
                System.out.println(a + b);
            }
        }
```
    
### 2.3 Tự động ép kiểu trong nạp chồng
* Kiểu dữ liệu của đối số truyền vào được thay đổi sang kiểu dữ liệu khác (tự động ép kiểu) nếu giá trị của đối số đó không phù hợp với kiểu dữ liệu của tham số đã được đinh nghĩa. 
    * Ví dụ phương thức sum(int x, double y) ở ví dụ trên khi được truyền tham số như sau sum(10, 20) thì giá trị tham số thứ 2 được truyền vào là int sẽ được tự động ép kiểu sang kiểu double. 
* Quy tắc ép kiểu: Được tự động ép về kiểu dữ liệu lớn hơn và ưu tiên gần nhất kiểu dữ liệu được ép theo thứ tự hình sau:
        ![](https://images.viblo.asia/84c41a0a-ca1c-40a7-a992-98022e8c92a0.PNG)
* Theo hình trên thì kiểu byte có thể ép sang các kiểu lớn hơn nó như short, int, float, long, double nhưng nó sẽ ưu tiên kiểu short. Hoặc kiểu int có thể ép sang kiểu float, long, double nhưng nó sẽ ưu tiên ép sang kiểu long vì long gần nó hơn so với 2 kiểu còn lại. Ví dụ:
    
```
        class Sum {
            void sum(float a, float b) {
                System.out.println("First method will be call");
            }

            void sum(long a, long b) {
                System.out.println("Second method will be call");
            }

            public static void main(String[] args) {
                Sum s = new Sum();
                s.sum(10, 20);
            }
        }
```
    
    
* Kết quả in ra sẽ là "Second method will be call" tức là hàm sum thứ 2 sẽ được gọi vì tham số truyền vào là kiểu int, nó sẽ ưu tiên ép sang kiểu lớn hơn nó và có giá trị gần nhất nó, ở đây là kiểu long.
* Từ đó ta có ta có thể suy ra là kiểu double không thể tự động ép kiểu.


### 2.4 Nạp chồng phương thức khởi tạo
* Xét trường hợp ta có các hàm khởi tạo chồng với hoạt động khởi tạo giống nhau và chỉ khác nhau ở phần xử lý các kiểu đối số. Ta sẽ không muốn chép đi chép lại phần mã khởi tạo mà các hàm khởi tạo đều có.
* Cách giải quyết: ta sẽ đặt toàn bộ phần mã đó vào chỉ một trong các hàm khởi tạo. Và ta muốn rằng hàm khởi tạo nào cũng đều gọi đến hàm khởi tạo kia để nó hoàn thành công việc khởi tạo. Để làm việc đó, ta dùng this() để gọi một hàm khởi tạo từ bên trong một hàm khởi tạo khác của cùng một lớp. Ví dụ:

 ```
        public class Student {
            int id;
            String name;

            Student() {
                System.out.println("gọi Constructor mặc định");
            }

            Student(int id, String name) {
                this(); // nó được sử dụng để gọi Constructor của lớp hiện tại
                this.id = id;
                this.name = name;
            }

            void display() {
                System.out.println(id + " " + name);
            }

            public static void main(String args[]) {
                Student e1 = new Student(111, "Viet");
                Student e2 = new Student(222, "Nam");
                e1.display();
                e2.display();
            }
        }
```
     
* Kết quả in ra sẽ là: 
    * gọi Contructor mặc định
    * gọi Contructor mặc định
    * 111 Việt
    * 222 Nam

### 2.5 Các quy tắc nạp chồng
* Các phương thức overloaded phải cùng tên nhưng khác nhau ở các tham số.
* Chúng có thể được định nghĩa cùng hoặc khác kiểu dữ liệu trả về.
* Chúng có thể được định nghĩa cùng hoặc khác access modifier.
* Các phương thức không được gọi là overloaded nếu chúng chỉ khác nhau ở kiểu dữ liệu trả về hoặc access modifier.
# 
# 3. Sự khác nhau giữa overload và override

                       

|  | Override | Overload |
| -------- | -------- | -------- |
| Hành vi     | Thay đổi hành vi hiện tại của phương thức.     | Thêm hoặc mở rộng cho hành vi của phương thức.     |
| Đa hình     | Thể hiện tính đa hình tại run time.    | Thể hiện tính đa hình tại compile time.     |
| Danh sách tham số     | Danh sách tham số phải giống nhau.     | Danh sách tham số có thể khác nhau.     |
| Quyền truy cập     | Phương thức ghi đè ở lớp con phải có quyền truy cập bằng hoặc lớn hơn phương thức được ghi đè ở lớp cha.     | Các phương thức nạp chồng có thể có quyền truy cập khác nhau.     |
| Giá trị trả về     | Kiểu trả về bắt buộc phải giống nhau.    | Kiểu trả về có thể khác nhau.     |
| Phạm vi     | Xảy ra giữa 2 class có quan hệ kế thừa     | Xảy ra trong phạm vi cùng 1 class.     |

# 4. Tổng kết
Bài viết trên mình đã giới thiệu về override, overload và sự khác biệt giữa chúng, hi vọng sẽ giúp ích ít nhiều cho các bạn đọc bài viết này. Bài viết trên nếu có thiếu xót gì mong các bạn góp ý cho mình dưới phần comment, mình sẽ sửa lại để bài viết có nội dung tốt hơn. Cảm ơn các bạn đã đọc bài viết!