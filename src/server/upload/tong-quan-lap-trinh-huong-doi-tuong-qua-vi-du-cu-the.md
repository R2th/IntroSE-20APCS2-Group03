# 1) Lập trình hướng đối tượng là gì?
Người ta nói rằng đã là developer thì sớm muộn cũng phải đụng đến **lập trình hướng đối tượng**.<br>
Lập trình hướng đối tượng là mô hình lập trình **phổ biến nhất** và được coi cách viết code **tiêu chuẩn** cho hầu hết các lập trình viên. <br>
Lập trình hướng đối tượng hiện nay được sử dụng trong rất nhiều ngôn ngữ lập trình: Typescript, Dart, Python, Java, Ruby,...<br>
Vậy Lập trình hướng đối tượng có gì đặc biệt, hãy cùng bắt đầu với khái niệm nhé.<br>
> **Lập trình hướng đối tượng** (hay **OOP**) là một mô hình lập trình dựa trên khái niệm về **Class**  và **Object**.<br>
> Nó được sử dụng để tách một chương trình phần mềm thành các phần đơn giản, có thể tái sử dụng.<br>

<br>
Có nhiều ngôn ngữ lập trình hướng đối tượng như C ++, Java, Python,..<br>

# 2) Các khái niệm cơ bản
Các khái niệm cơ bản trong OOP bao gồm: <br>
* **Class**
* **Object**
* **Đóng gói (Encapsulation)**
* **Kế thừa (Inheritance)**
* **Đa hình (Polymorphism)**
* **Trừu tượng (Abstraction)**

<br>

Hiểu được 6 khái niệm này (kết hợp với thực hành) nghĩa là bạn đã nắm được **cơ bản** của lập trình hướng đối tượng.

<br>![](https://images.viblo.asia/613e3fc1-0ba9-46da-879a-ddd7959b8492.png)
<br><br>
Trong các ví dụ bên dưới, tôi sử dụng ngôn ngữ Java.
## 2.1) Class
Ta hiểu **Class** là một **kiểu dữ liệu** do người dùng định nghĩa. Trong Class có các **thuộc tính** (attribute) và **phương thức** (method)
<br>
```
public class Nguoi {

	// THUỘC TÍNH:
	String hoVaTen; // họ và tên
	int tuoi; // tuổi
	String gioiTinh; // giới tính
	String diaChi; // địa chỉ
	boolean giau; // có giàu không

	// PHƯƠNG THỨC:
	void an() {
		// code
		//
	}

	void ngu() {
		// ...
	}

	void xemTV() {
		// ...
	}
}
```
## 2.2) Object
Nếu **Class** là một **khuôn mẫu** thì **Object** chính là **thể hiện** của khuôn mẫu đó.
<br>
Từ class `Nguoi` bên trên, làm sao ta tạo ra một anh bạn Will Smith, 20 tuổi, nhà giàu?<br>
```
Nguoi nguoi1 = new Nguoi(); // khởi tạo Object
nguoi1.hoVaTen = "Will Smith"; // set giá trị cho thuộc tính hoVaTen
nguoi1.tuoi = 20; // set giá trị ...
nguoi1.gioiTinh = "Nam"; // ...
nguoi1.diaChi = "Mĩ";
nguoi1.giau = true;
```
> Để dễ nhớ, tôi thường coi **Class** là một **bản vẽ** của ngôi nhà, còn **Object** là những ngôi nhà **cụ thể**, được xây thực sự.
## 2.3) Đóng gói
Một trong những điểm đáng chú ý về tính **đóng gói** đó là các thuộc tính sẽ có thuộc tính phạm vi (hay access modifier) là `private` và ta cần tạo **getter**, **setter** cho các thuộc tính đó:
```
public class Nguoi {

	private String hoVaTen; 
	private int tuoi; 
	private String gioiTinh; 
	private String diaChi; 
	private boolean giau; 

	public String getHoVaTen() {
		return hoVaTen;
	}

	public void setHoVaTen(String hoVaTen) {
		this.hoVaTen = hoVaTen;
	}

	public int getTuoi() {
		return tuoi;
	}

	public void setTuoi(int tuoi) {
		this.tuoi = tuoi;
	}

	public String getGioiTinh() {
		return gioiTinh;
	}

	public void setGioiTinh(String gioiTinh) {
		this.gioiTinh = gioiTinh;
	}

	public String getDiaChi() {
		return diaChi;
	}

	public void setDiaChi(String diaChi) {
		this.diaChi = diaChi;
	}

	public boolean isGiau() {
		return giau;
	}

	public void setGiau(boolean giau) {
		this.giau = giau;
	}
	
	// CÁC PHƯƠNG THỨC ...
}
```

> **Setter** dùng để set giá trị cho thuộc tính, **getter** dùng để lấy ra giá trị của thuộc tính.

<br>Vì vậy khi gán giá trị cho các thuộc tính của Object, code có sự thay đổi:
```
Nguoi nguoi1 = new Nguoi(); // khởi tạo Object
nguoi1.hoVaTen = "Will Smith"; // sẽ báo lỗi vì không thể truy cập thuộc tính private
nguoi1.setHoVaTen("Will Smith"); // không lỗi
```
> Các từ khoá private, protected, public được gọi là các **access modifier**. Thường thì với thuộc tính ta sẽ để access modifier là `private`, còn với phương thức sẽ để `public`.
## 2.4) Kế thừa
Giống như cha có cái gì thì con có cái đó, kế thừa giúp **class con** có được những thuộc tính, phương thức của **class cha**.
```
public class LapTrinhVien extends Nguoi {
	private String chucVu; // chức vụ
	private float luong; // lương hàng tháng
	private boolean biTri; // bị trĩ hay chưa
	
	// getter, setter ...
}
```
Lúc này, các thuộc tính trong Class `Nguoi` phải thay đổi access modifier từ `private` sang `protected` thì Class `LapTrinhVien` mới được thừa hưởng các thuộc tính đó:
```
public class Nguoi {

	protected String hoVaTen; 
	protected int tuoi; 
	protected String gioiTinh; 
	protected String diaChi; 
	protected boolean giau; 
	
	// getter, setter, ...
}
```
Lúc này, Class `LapTrinhVien` sẽ có dạng:
```
public class LapTrinhVien extends Nguoi {
	protected String hoVaTen; 
	protected int tuoi; 
	protected String gioiTinh; 
	protected String diaChi; 
	protected boolean giau; 
	
	private String chucVu; // chức vụ
	private float luong; // lương hàng tháng
	private boolean biTri; // bị trĩ hay chưa
	
	// các phương thức từ class Nguoi ...
	
	// getter, setter ...
}
```
Nói chung là class cha có thuộc tính và phương thức gì, thì class con có cái đấy.
## 2.5) Đa hình
Chó, mèo, vịt đều có phương thức `kêu`, nhưng mèo kêu "meo meo", chó kêu "gâu gâu", vịt kêu "quạc quạc". <br>
![](https://images.viblo.asia/1c030aa7-f0bd-4a38-8a81-3d74c0f8f66e.gif)
<br><br>
> **Một hành động được thực hiện theo những cách khác nhau tuỳ vào hoàn cảnh**, đó gọi là **Đa hình**.

<br>Ta có thể đạt được đa hình theo kiểu **ghi đè phương thức** (Method Overriding),  hoặc **nạp chồng phương thức** (Method Overloading).
<br>
<br>
Sau đây là ví dụ về **ghi đè phương thức**:
```
class DongVat{
	public void keu() {
		System.out.println("Kêu");
	}
}

class Cho extends DongVat {
	@Override
	public void keu() {
		System.out.println("Gâu gâu");
	}
}

class Meo extends DongVat {
	@Override
	public void keu() {
		System.out.println("Meo meo");
	}
}

class Vit extends DongVat {
	@Override
	public void keu() {
		System.out.println("Quạc quạc");
	}
}
```

<br>Còn đây là ví dụ về **nạp chồng phương thức**:
```
class Nguoi {
	public void chao() {
		System.out.println("Xin chào");
	}
	
	public void chao(String hoTen) {
		System.out.println("Xin chào, " + hoTen);
	}
	
	public void chao(String hoTen1, String hoTen2) {
		System.out.println("Xin chào, " + hoTen1 + " va " + hoTen2);
	}
}
```
Và khi gọi Object, ta có thể gọi 3 phương thức cùng tên với các loại tham số khác nhau, và kết quả cũng khác nhau:
```
Nguoi nguoi = new Nguoi();
nguoi.chao();
nguoi.chao("Will Smith");
nguoi.chao("Will Smith", "Chris Rock");
```
Kết quả:
<br>![image.png](https://images.viblo.asia/3e02d5bb-0d8d-4987-976b-ba800dde7954.png)

## 2.6) Trừu tượng
Ta có thể lấy ví dụ về tính trừu tượng như sau: khi bạn dùng điều khiển TV, bạn chỉ cần biết bấm nút thì nó sẽ chuyển kênh cho bạn chứ bạn không cần phải hiểu đằng sau chiếc điều khiển đó những gì xảy ra.<br>
Một ví dụ khác, với chiếc xe ô tô, khi bạn nhấn phanh, bạn chỉ cần biết là khi nhấn phanh thì xe sẽ dừng chứ bạn không cần quan tâm nguyên lý hoạt động đằng sau tính năng phanh đó ra sao.<br>
Nói cách khác, ta chỉ quan tâm đến **"What it does**" chứ không cần quan tâm "**How it does**".<br>
Trong Java, ta có thể đạt được Trừu tượng theo 2 cách: `abstract class` và `interface`.

Với `abstract class`, các phương thức sẽ không có phần thân, mà chỉ có phần khai báo. Những class nào kế thừa từ nó sẽ triển khai phần thân của phương thức.
```
abstract class Vehicle{
    abstract void start () ;
    abstract void stop ();
    abstract void accelerate ();
    abstract void brake ();
}
     
class Car extends Vehicle{
    void start () { //code here…}
    void stop () { //code here…}
    void accelerate () { //code here…}
    void brake () { 
        System.out.println("Car braked");
    }
}
class Bike extends Vehicle{
    void start () { //code here…}
    void stop () { //code here…}
    void accelerate () { //code here…}
    void brake () { //code here…}
}
class Scooter extends Vehicle{
    void start () { //code here…}
    void stop () { //code here…}
    void accelerate () { //code here…}
    void brake () { //code here…}
}
```

<br>Khi sử dụng, ta có thể khởi tạo Object dạng như sau: 
```
Vehicle car = new Car();
car.brake();
```
Kết quả:<br>
<br>![image.png](https://images.viblo.asia/2d123bb7-1a27-4b68-b764-aab34db951c3.png)
<br>
Class `Bike` và `Scooter` cũng có thể làm tương tự.
<br>
## 2.7) Một số khái niệm khác
* **Constructor**
* **Interface**
* **Toán tử this**
* **Toán tử super**
* **Thuộc tính phạm vi**
* **Quan hệ IS-A**
* **Quan hệ HAS-A**

# 3) Kết
Hi vọng bài viết đã giúp bạn có được cái nhìn tổng quan và những khái niệm cơ bản của **lập trình hướng đối tượng**.<br>
Với những bạn mới học lập trình hướng đối tượng, lời khuyên của tôi là không cần đọc quá nhiều lý thuyết, hãy code **thật nhiều**. Sau đó quay lại với các khái niệm, bạn sẽ vỡ ra nhiều thứ hơn, hiểu sâu hơn.<br>
Lập trình hướng đối tượng hiện nay được dùng rất nhiều trong các công nghệ và ngôn ngữ lập trình: Angular sử dụng Typescript, Flutter sử dụng Dart, Python, Java ,... Vì vậy rất đáng để bạn đầu từ thời gian và công sức.
# 4) Tham khảo
* https://www.geeksforgeeks.org/benefits-advantages-of-oop/
* https://www.educative.io/blog/object-oriented-programming/
* https://www.javatpoint.com/java-oops-concepts/
* https://www.softwaretestinghelp.com/what-is-abstraction-in-java/