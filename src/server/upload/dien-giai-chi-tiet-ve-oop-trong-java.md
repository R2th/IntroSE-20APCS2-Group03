## **1. Lập trình hướng đối tượng (Oriented Object Programming - OOP) là gì?**
- Lập trình hướng đối tượng là một mô hình lập trình máy tính dựa trên khái niệm lớp và đối tượng.
- Lấy đối tượng làm nền tảng để xây dựng giải thuật, xây dựng chương trình và thực hiện xử lý dữ liệu với đối tượng đã định nghĩa đó.
- Nhằm tối ưu hóa việc quản lý mã nguồn (source code), tái sử dụng mã nguồn, tóm gọn các thủ tục đã biết trước tính chất thông qua việc sử dụng đối tượng.
- Một đối tượng có thể được định nghĩa là một trường dữ liệu có các thuộc tính và các hành động của riêng nó:<br>
*Ví dụ 1*
```java
// 1 ví dụ đơn giản về định nghĩa lớp đối tượng *phương trình bậc 2* ax^2 + bx + c = 0 trong java:
public class PTB2 {
    // Khai báo các thuộc tính của một phương trình bậc 2 gồm các hệ số thực a, b, c
    private double a, b, c;
    
    // Khai báo các phương thức hay hành động có thể làm của lớp đối tượng này
    // Tính delta
    public double delta() {
        return b * b - 4 * a * c;
    }
    
    // Tìm nghiệm trong tập số thực R và in ra màn hình
    public void timNo(){
        // Tính và lưu giá trị delta vào một biến
        double dt = delta();
        
        // Xét điều kiện ( bao gồm delta và hệ số a ) và tiến hành tìm nghiệm
        if(a == 0){
            /* Chúng ta chỉ xét nhập vào một phương trình bậc 2 và giải nghiệm chẳng hạn,
            nên khi người dùng nhập a = 0 chúng ta sẽ hiển thị thông báo như sau. ^^*/
            System.out.println("- Phương trình bậc 2 phải có hệ số a khác 0.");
        }
        else{
            if(dt < 0)
                 System.out.println("- Phương trình vô nghiệm.");
             else if(dt == 0){
                 System.out.printf("- Phương trình có nghiệm kép x1 = x2 = %.3f\n", -b / 2 * a);
             }
             else{
                 System.out.println("- Phương trình có 2 nghiệm phân biệt:");
                 System.out.printf("\tx1 = %.3f\n", (-b + sqrt(dt)) / 2 * a);
                 System.out.printf("\tx2 = %.3f\n", (-b - sqrt(dt)) / 2 * a);
             }
        }
        
        /* Cùng với đó là các hàm khởi tạo (constructor), hay các setter, getter
        hoặc chúng ta có thể tự định nghĩa thêm các hành động nhập xuất phù hợp 
        với bài toán yêu cầu*/
        public PTB2(double a, double b, double c) {
            this.a = a;
            this.b = b;
            this.c = c;
        }
   
        public double getA() {
            return a;
        }

        public void setA(double a) {
            this.a = a;
        }

        public double getB() {
            return b;
        }

        public void setB(double b) {
            this.b = b;
        }

        public double getC() {
            return c;
        }

        public void setC(double c) {
            this.c = c;
        }
        //...
    }
}
```
## **2. Các thành phần của OOP**
- Lớp (class): Là sự trừu tượng hóa của đối tượng. Là khuôn mẫu của một tập hợp các đối tượng có cùng thuộc tính (attributes) và hành vi (methods). Cấu trúc của 1 lớp gồm:
    + Phạm vi truy cập (access modifier): phạm vi truy cập của lớp, của thuộc tính và phương thức. (private, protected, default, public)
    + Tên lớp (class name): Mỗi lớp đều có một tên riêng biệt, để phân biệt với các lớp khác trong cùng một phạm vi.
    ```java
    <access modifier> class <class name>{}
    ```
    + Các thuộc tính (attributes): Mô tả các trường để lưu dữ liệu cho mỗi đối tượng mà lớp đang định nghĩa hay lưu các tham chiếu đến đối tượng của lớp khác.
    <br>*Ví dụ 2: ta có 2 lớp đối tượng A và B, giờ ta muốn tham chiếu 1 đối tượng x từ lớp B trong lớp đối tượng A chẳng hạn, và đây những gì được viết trong class A*<br>
    ```java
    public class A{
        // Các trường lưu dữ liệu cho mỗi đối tượng:
        private int y, z;
        
        // Tham chiếu đến đối tượng x từ lớp B
        private B x;
    }
    ```
    + Các phương thức (methods): mỗi phương thức của lớp thực chất là một hàm được viết riêng cho các đối tượng của lớp, và được gọi đến để tác động lên các đối tượng của lớp đó.
    <br>*ví dụ 3:*<br>
    ```java 
    // Lớp Err
    public class Err{
        // Các thuộc tính
        private String title;
        private String mess;
        
        // Phương thức
        public void inputData(String tt, String m){
            title = tt;
            mess = m;
        }
        
        public void output(){
            System.out.println("Err " + title + ": " + mess);
        }
    }
    
     // Hàm main
     public static void main(String args[]){
         // Khai báo, khởi tạo đối tượng
         Err x = new Err();
         
         // Tác động vào đối tượng
         x.input("Error 2001", "- Lỗi này tạm thời chưa có nội dung");
         x.output();
     }
     ```
- Đối tượng (Object): trong lập trình hướng đối tượng, một thực thể được coi là đối tượng khi nó có các thuộc tính và các hành vi.
<br>*Ví dụ 4:*<br>
    ```java
    // Định nghĩa lớp đối tượng Person
    public class Person{
        // khai báo một vài thuộc tính (attributes)
        private String name;
        protected String age;
        double height;

        // Khai báo các hành vi (methods)
        public void moving(){
            // di chuyển
        }

        public void eating(){
            //ăn
        }

        public void drinking(){
            // uống
        }

        public void sleeping(){
            //ngủ
        }
        //...
    }

    // Hàm main
    public static void main(String args[]){
        // Khởi tạo một đối tượng thuộc lớp Person
        Person x = new Person();
        // ở đây x chính là 1 đối tượng, có đầy đủ các thuộc tính và hành vi trong lớp Person.
    }
    ```
## **3. Các phạm vi truy cập trong Java**
- OOP Java gồm 4 phạm vi truy cập cho lớp, thuộc tính, phương thức, gồm: private, protected, default, public.
- Phạm vi *private*: chỉ cho phép truy cập nội bộ trong class. Tại ví dụ 4, ta thấy rằng, thuộc tính name của class Person để phạm vi truy cập là *private*, điều này có nghĩa là thuộc tính đó của class Person chỉ truy cập được đến trong class Person mà thôi. 
- Phạm vi *protected*: là một loại phạm vi cho phép truy cập được từ trong hay cả ngoài package (gói), nếu là ngoài package thì phải thông qua tính kế thừa (inheritance). Cả phạm vi *private* và *protected* đều chỉ áp dụng bên trong class như thuộc tính, phương thức, ... Không thể áp dụng cho phạm vi truy cập của lớp hoặc interface. Ví dụ nho nhỏ cho *protected*.
    ```java
    // Định nghĩa lớp X trong gói a
    package a;
    public class X{
        protected int x1, x2;

        protected int plus(){
            return x1 + x2;
        }
    }

    // Định nghĩa lớp Y trong gói a
    package a;
    public class Y{
        public static main(String args[]){
           X c = new X();
           c.x1 = 1;
           c.x2 = 2;
           System.out.print(c.plus());
           // Ta có thể thấy rằng chúng ta hoàn toàn truy xuất được đến các thuộc tính hay phương thức có trong X
        }
    }

    // Định nghĩa lớp Z trong gói b
    package b;
    public class Z extends a.X {
        public static main(String args[]){
           Z c = new X();
           c.x1 = 1;
           c.x2 = 2;
           System.out.print(c.plus());
           // Khi này để truy xuất được đến các thuộc tính, phương thức trong X ta cần để Z kế thừa X.
        }
    }
    ```

- Phạm vi *default*: là phạm vi mặc định, khi khai báo không cần ghi gì cả ( thuộc tính height trong ví dụ 4), đối với phạm vi *default* này, thì phạm vi truy cập cho phép chỉ trong cùng package (gói).
- Phạm vi *public*: là phạm vi rộng nhất, bất cứ chỗ nào trong project đều có thể truy cập đến được. ( trong ví dụ 4, class Person để phạm vi truy cập là public, vì thế bất kỳ nơi nào trong project đều có thể gọi đến class Person).

## **4. Các tính chất trong OOP Java**
- OOP Java có 4 tính chất, gồm: tính trừu tượng (abstract), tính kế thừa (inheritance), tính đóng gói (encapsulation), tính đa hình (polymorphism).
- Tính *trừu tượng (abstract)*: abstract có nghĩa là chúng ta đi tổng quát hóa một cái gì đó mà không cần đi vào chi tiết quá vào nó, nhưng người nghe vẫn hiểu được nó là cái gì. Trong OOP thì tính trừu tượng tức là ta đi lựa chọn các thuộc tính và các phương thức cần thiết của đối tượng để giải quyết bài toán. Bởi trong thực tế, một đối tượng có thể có rất nhiều thuộc tính và phương thức, nhưng không liên quan và không cần sử dụng trong bài toán đề ra.
<br>*Ví dụ 5*: trong bài toán quản lý mèo, chẳng hạn đối tượng mèo chúng ta chỉ cần khái quát nó thành 1 lớp kiểu:<br>
    ```java
    public class cat{
        // Các thuộc tính
        private int ID;
        private String species; // chủng loại
        private String origin; // Xuất xứ
        private double weight; // cân nặng

        // Các phương thức
        public void input(){
        }

        public void output(){
        }
    }
    ```
    Chúng ta không cần thiết phải nhảy vào chi tiết thuộc tính kiểu: số lông, số chân, số ngón chân trên mỗi bàn chân, số tai, số mắt, ... hay các phương thức kiểu: ăn, di chuyển, ... Nhưng người nghe vẫn hiểu được nó là con mèo là đủ và quan trọng hơn, các thuộc tính phương thức mà chúng ta tạo ra đều có thể được sử dụng đến để giải quyết bài toán quản lý mèo.
- Tính *kế thừa (inheritance)*:  Chỉ đơn giản là chúng ta tái sử dụng lại các thuộc tính, phương thức ở class khác mà không cần phải xây dựng lại từ đầu.
<br>*Ví dụ 6:*<br>
    ```java
    // Định nghĩa lớp TaiKhoan
    public class TaiKhoan{
        protected String ID;
        protected String name;
        protected String userName;
        protected String passWord;
        
        protected void input(){
            // Triển khai nhập dữ liệu
        }
        
        protected void output(){
            // Xuất dữ liệu
        }
    }
    
    // Định nghĩa lớp tài khoản giáo viên kế thừa lớp tài khoản
    public class TKGiaoVien extends TaiKhoan {
        private String specialized; // Chuyên ngành 
        private String qualification; // trình độ chuyên môn
        
        // Tái sử dụng phương thức đã có sẵn trong class TaiKhoan
        @Override
        public void input(){
            super.input();
            // Triển khai tiếp nhập dữ liệu cho các thuộc tính trong class TKGiaoVien
        }
        
        @Override
        public void output(){
            super.ouput();
            // Triển khai tiếp xuất dữ liệu cho các thuộc tính trong class TKGiaoVien
        }
    }
    
    // Định nghĩa tiếp lớp tài quản trị viên kế thừa lớp tài khoản cho thấy sức mạnh kế thừa
    public class TKQTV extends TaiKhoan {
        private String permission;
        
        // Tái sử dụng phương thức đã có sẵn trong class TaiKhoan
        @Override
        public void input(){
            super.input();
            // Triển khai tiếp nhập dữ liệu cho các thuộc tính trong class TKQTV
        }
        
        @Override
        public void output(){
            super.ouput();
            // Triển khai tiếp xuất dữ liệu cho các thuộc tính trong class TKQTV
        }
    }
    ```
    Qua ví dụ trên chúng ta có thể thấy 2 lớp đối tượng TKGiaoVien và TKQTV không cần phải xây dựng lại từ đầu nhưng vẫn chứa đầy đủ các thuộc tính cũng như phương thức cần thiết nhờ vào tính kế thừa.
    
- Tính *đóng gói (encapsulation)*: đóng gói ở đây có nghĩa là đóng gói attributes, methods thành class, đóng gói các class thành package, ... Nhằm che giấu thông tin và đảm bảo sự toàn vẹn của dữ liệu.
<br>*Ví dụ 7:*<br>
    ```java
    // Định nghĩa lớp Money
    public class Money{
        /* Toàn bộ các thuộc tính để phạm vi truy cập là private, điều này có nghĩa là
        các thuộc tính này không thể truy cập được bởi các lớp bên ngoài*/
        private String donVi;
        private String menhGia;
        private String seri;
        
        
        // Khi này để tương tác với các thuộc tính trên, chúng ta sử dụng các hàm setter, getter,
        
        public String getDonVi() {
            return donVi;
        }

        public void setDonVi(String donVi) {
            this.donVi = donVi;
        }

        public String getMenhGia() {
            return menhGia;
        }

        public void setMenhGia(String menhGia) {
            this.menhGia = menhGia;
        }

        public String getSeri() {
            return seri;
        }

        public void setSeri(String seri) {
            this.seri = seri;
        }
    }
    ```
    Một vài lợi ích nữa trong việc đóng gói là:
    + Chúng ta có thể kiểm soát chỉ đọc hoặc chỉ ghi, hoặc cả ghi cả đọc cho các thuộc tính, tức là chỉ có setters hoặc getters, hoặc có cả setters, getters.
    + Người sử dụng của class không biết được cách các class lưu trữ dữ liệu hay được gọi là sự kiểm soát dữ liệu.
    + Một class có thể thay đổi kiểu dữ liệu của một thuộc tính và người dùng class không cần sự thay đổi trong code.
    
- Tính *đa hình (polymorphism)*:  chỉ sự đa hình thái, chẳng hạn cùng có một phương thức giống nhau nhưng tùy vào tham số truyền vào hay sự cài đặt của lớp con mà nó thực hiện các công việc khác nhau. Tính đa hình liên quan tới 2 khái niệm là: overriding (ghi đè) và overloading (nạp chồng).
    + overriding (ghi đè) là đi viết lại, định nghĩa lại phương thức mà nó kế thừa từ lớp cha.
<br>*Ví dụ 8:*<br>
    ```java
    // Định nghĩa lớp Animal
    public class Animal{
        public void output(){
            System.out.println("- Đây là lớp động vật.");
        }
    }
    
    // Định nghĩa lớp Cat kế thừa lớp Animal
    public class Cat{
        /* Class Cat kế thừa phương thức output() từ lớp Animal, nhưng phương thức output() trong lớp Cat
        lại khác so với phương thức output() trong Animal, ta gọi nó là overriding (ghi đè).*/
        @Override
        public void output(){
            System.out.println("- Đây là lớp mòe :D.");
        }
    }
    ```
    + overloading (nạp chồng) sử dụng các phương thức có cùng tên nhưng tham số đầu vào lại khác nhau.
<br>*Ví dụ 9:*<br>
    ```java
    // Định nghĩa lớp Animal
    public class Animal{
    
        // tạo các phương thức cùng tên nhưng các tham số đầu vào khác nhau
        public void output(){
            System.out.println("- Đây là lớp động vật ăn thịt.");
        }
        
        public void output(int i){
            System.out.println("- Đây là lớp động vật ăn cỏ.");
        }
        
        public void output(int i, int j){
            System.out.println("- Đây là lớp động vật ăn chay???");
        }
    }
    
    // triển khai trong hàm main
    public static void main(String args[]){
        Animal x = new Animal();
        x.output(); // kết quả: - Đây là lớp động vật ăn thịt.
        x.output(1); // kết quả: - Đây là lớp động vật ăn cỏ.
        x.output(1, 2); // kết quả: - Đây là lớp động vật ăn chay???.
    }
    ```
## **5. Ưu điểm, nhược điểm**
### **5.1. Ưu điểm**
- Nâng cao hiệu năng phát triển phần mềm, liên quan tới 3 yếu tố trong OOP:
    + Tính Mô - đun: Tách biệt các nhiệm vụ trong quá trình phát triển phần mềm dựa trên các đối tượng cụ thể, hay mỗi đối tượng có một nhiệm vụ riêng.
    + Tính mở rộng: Các đối tượng có thể mở rộng thêm các thuộc tính mới, các hành vi mới trong tương lai.
    + Tính tái sử dụng: Các đối tượng có thể tái sử dụng một ứng dụng hoặc nhiều ứng dụng khác nhau.
    Nhờ vào các yếu tố trên mà OOP giúp tăng hiệu năng phát triển phần mềm so với lập trình hướng thủ tục truyền thống.
- Nâng cao khả năng bảo trì phần mềm: Chính nhờ các yếu tố kể trên mà việc bảo trì cũng trở nên dễ dàng hơn, vì thiết kế theo mô-đun nên việc thay đổi một phần của chương trình có thể không làm ảnh hưởng đến những phần còn lại, rất phù hợp với những dự án lớn, đòi việc phải bảo trì và thay đổi nhiều.
- Phát triển phần mềm nhanh hơn: Nhờ vào tính tái sử dụng mà các phần mềm được phát triển nhanh hơn, OOP thường có thư viện đối tượng phong phú, hay những đối tượng do chính bạn tự định nghĩa, các đoạn code được tối ưu hóa đều có thể được tái sử dụng trong tương lai. => giảm thiểu chi phí phát triển.
### **5.2. Nhược điểm**
- Khá phức tạp, có thể khó nhằn cho beginner, bởi nó đòi hỏi sự tư duy dựa trên sự tương tác giữa các đối tượng, do đó chúng ta cần nắm được bản chất: lớp, đối tượng, thuộc tính, phương thức; nắm được 4 tính chất của hướng đối tượng gồm: tính trừu tượng (abstract), tính kế thừa (inheritance), tính đóng gói (encapsulation),  tính đa hình (polymorphism).
- Chương trình có thể chậm và kích thước lớn hơn so với các chương trình lập trình hướng thủ tục. Do các phần mềm này thường yêu cầu nhiều câu lệnh hơn để thực thi, người lập trình cần viết ra nhiều dòng mã hơn để đảm bảo các thuộc tính, phương thức của đối tượng => kích thước chương trình lớn theo.
- Lập trình hướng đối tượng không phải là chìa khóa vạn năng cho nhiều vấn đề. Theo em, mỗi một phương pháp lập trình đều có sự phù hợp với mỗi bài toán thực tế nhất định. Chẳng hạn giải phương trình bậc 2, thay vì phải ngồi viết ra đối tượng phương trình bậc 2 (theo OOP), cài đặt các thuộc tính và các phương thức cho nó, trong lập trình hướng chức năng trong 1 file duy nhất, ta chỉ cần viết mỗi một hàm con có chức năng tìm nghiệm nhờ vào việc truyền vào 3 tham số giá trị và cho in nghiệm là xong.

## **6. Kết thúc**
- Đây là toàn bộ sự hiểu biết mình về OOP. Hi vọng có thể giúp ích cho mọi người hoặc nếu phần nào chưa ok mong mọi người đóng góp ý kiến mạnh tay.  Xin chân thành cảm ơn.