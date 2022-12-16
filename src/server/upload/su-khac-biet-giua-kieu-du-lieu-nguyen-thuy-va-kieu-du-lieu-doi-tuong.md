### Đầu tiên chúng ta sẽ nhắc lại về 2 loại kiểu dữ liệu này:
### 1. **Kiểu dữ liệu là gì**


-----

Có thể hiểu kiểu dữ liệu trong ngôn ngữ lập trình là các thuộc tính(biến) dùng để lưu trữ thông tin, giá trị mà khi chương trình biên dịch sinh ra.

### 2. **Kiểu dữ liệu nguyên thủy**


-----
Kiểu dữ liệu là kiểu dữ liệu được cung cấp sẵn trong các ngôn ngữ lập trình, nó dùng để lưu trữ các giá trị đơn giản.

Dưới đây là các nhóm của kiểu dữ liệu nguyên thủy
![](https://images.viblo.asia/d17c8953-c0fa-4d1c-9434-f8e18078a114.jpg)

**các bạn có thể thấy kiểu dữ liệu nguyên thủy được chia ra thành 4 nhóm chính đó là:**

* Kiểu logic(`boolean`): lưu giá trị logic nhận giá trị true hoặc false 
* Kiểu kí tự(`char`): lưu các thông tin là ký tự: ví dụ 'a', 'c', 'd' ...
* Kiểu số nguyên(`byte, short, int, long`): lưu các thông tin là kiểu số nguyên như 1,2,3,4,5,6,7,8...
* Kiểu số thực(`float, double`): lưu các thông tin là kiểu số thực như 1.4, 2.5, 2.6...

Cụ thể và chi tiết hơn về từng loại trong các nhóm nguyên thủy trên bạn có thể ở bảng dưới đây

|Kiểu	| Mô tả	|Mặc định	| Kích thước	| Ví dụ
| -------- | -------- | -------- |-------- |-------- |
|boolean|	true hoặc false|	false|	1 bit|	true, false
|byte|	Số nguyên từ -128 .. 127|	0|	8 bits	|123
|char|	Ký tự Unicode	|\u0000|	16 bits|	'a', '\u0041', '\101', '\\', '\'', '\n', 'ß'
|short|	Số nguyên giá trị từ -32768 .. 32767|	0|16 bits	|1000
|int|	Số nguyên -2,147,483,648 .. 2,147,483,647|	0|	32 bits	|-2, -1, 0, 1, 2
|long	|Số nguyên dài|	0	|64 bits	|-2L, -1L, 0L, 1L, 2L
|float	|Số thực	|0.0|	32 bits|	1.23e100f, -1.23e-100f, .3f, 3.14F
|double	|Số thực|	0.0	|64 bits|	1.23456e300d, -1.23456e-300d, 1e1d


### 3. Kiểu dữ liệu đối tượng


-----

Kiểu dữ liệu đối tượng được chia làm 2 loại:

+ Framwork định nghĩa: Những đối tượng này được tạo sẵn và công việc của chúng ta chỉ việc gọi lên và sử dụng chúng, ví dụ: File, String, Scanner...
+ Do người dùng định nghĩa: Chính là những class được chúng ta define từ những đối tượng trong bài toán OOP, ví dụ: Học Sinh, Nhân Viên, Giáo Viên, Lập Trình Viên...

**`(Rất nhiều bạn nhầm tường String là kiểu dữ liệu nguyên thủy nhưng thực chất String là kiểu dữ liệu đối tượng nhé)`**

### 4. Sự khác nhau giữa kiểu dữ liệu nguyên thủy và kiểu dữ liệu đối tượng


-----
Trước tiên chúng ta cần biết khi khai báo và khởi tạo 1 kiểu dữ liện(nguyên thủy và đối tượng) thì hệ thống sẽ cấp phát 1 địa chỉ ô nhớ để lưu trữ giá trị của thuộc tính đó

![](https://images.viblo.asia/58752582-afee-467f-946a-5b8f4c9fd741.jpg)
### Kiểu dữ liệu nguyên thủy

Là kiểu dữ liệu có tính chất tham trị:
```
int a = 3;
int b = a;
b = b + 1;
System.out.println(a); // 3
System.out.println(b); // 4
```
Trong ví dụ trên sẽ thực hiện như sau

- Khởi tạo ra 1 thuộc tính a = 3 khi này hệ thống sẽ cấp phát 1 địa chỉ ô nhớ để lưu trữ giá trị của 3 và địa chỉ ô nhớ này sẽ có giá trị là 3

![](https://images.viblo.asia/58752582-afee-467f-946a-5b8f4c9fd741.jpg)
- Dòng lệnh thứ 2 thực hiện phép gán b = a lúc này sẽ khởi tạo ra thuộc tính b và cũng có giá trị là 3 tuy nhiên địa chỉ ô nhớ của a và b lúc này là 2 địa chỉ ô nhớ khác nhau

![](https://images.viblo.asia/fdda4648-cb41-4e68-bce1-c70aa89bb5dd.jpg)
- Dòng lệnh thứ 3 thực hiện tăng b lên 1 đơn vị. Vì a và b đang ở 2 địa chỉ ô nhớ khác nhau nên khi giá trị của b thay đổi thì giá trị của a vẫn không bị ảnh hưởng

![](https://images.viblo.asia/2eb125b6-68eb-4369-9d9b-8fa35b3e2f61.jpg)

**> Từ ví dụ trên chúng ta có thể hiểu nôm na tính tham trị bản chất của nó chỉ là copy giá trị của 1 địa chỉ khác để tạo ra 1 địa chỉ ô nhớ mới có cùng giá trị với địa chỉ copy**
### Kiểu dữ liệu đối tượng

Là kiểu dữ liệu có tính tham chiếu:

Chúng ta có đối tượng Sinh viên như sau:
```
public class Student{
    private String name;
    public SinhVien(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
}
```
Và chúng ta thử tính tham chiếu với nó nhé
```
Student sv1 = new Student("Nguyen Van A");
Student sv2 = sv1;
```
Sau đó thử thay đổi giá trị của sv2 nào
```
sv2.setName("Nguyen Van B");
```
Cuối cùng thử in tên của 2 thằng sv1 và sv2
```
System.out.println("Student 1: " + sv1.getName());
System.out.println("Student 2: " + sv2.getName());
```
Khi compile chúng là sẽ thu được kết quả là:
```
Student 1: Nguyen Van B
Student 2: Nguyen Van B
```
Đến đây chắc bạn đã nhận ra sự khác biệt giữa kiểu dữ liệu đối tượng và kiểu dữ liệu nguyên thủy rồi chứ?

Các bạn nhìn vào câu lệnh `Student sv2 = sv1;` khi này chúng ta cũng tạo ra 1 thuộc tính kiểu đối tượng sv2 tuy nhiên hệ thống sẽ không cấp phát 1 địa chỉ mới để lưu trữ sv2 mà sẽ đưa sv2 trỏ đến địa chỉ ô nhớ của sv1. Tức là khi này sv1 và sv2 sẽ trỏ vào cùng 1 địa chỉ ô nhớ.

![](https://images.viblo.asia/9ee3243f-9c07-4c57-ad4a-955a584c5d47.jpg)

Khi ta thực hiện `sv2.setName("Nguyen Van B");` sẽ làm giá trị đang tại địa chỉ ô nhớ thay đổi và dĩ nhiên khi cả sv1 và sv2 cùng trỏ vào 1 địa chỉ thì cả 2 thằng này sẽ đều nhận được sự thay đổi giá trị của của ô nhớ đó.

### Kết luận


-----
Như vậy điểm khác biệt giữa 2 kiểu dữ liệu đối tượng và nguyên thủy đó là 1 thằng có tính tham chiếu và 1 thằng có tính tham trị và khi sử dụng chúng nó sẽ khác nhau về việc cấp phát địa chỉ ô nhớ và các refernces vào địa chỉ ô nhớ đó.