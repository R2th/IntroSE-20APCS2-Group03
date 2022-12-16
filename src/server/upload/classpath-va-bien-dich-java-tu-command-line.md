Tìm hiểu về khái niệm Classpath trong Java. Hướng dẫn cách biên dịch code Java thành bytecode và chạy bytecode thông qua command line.
# 1. Sơ lược & chuẩn bị

## 1.1. `javac` và `java` command

Để chạy được chương trình Java, cần thực hiện hai bước biên dịch source code thành bytecode và thực thi bytecode đó. Với mỗi giai đoạn cần dùng command là `javac` và `java` tương ứng.

```bash
# Biên dịch Main.java thành Main.class
javac Main.java

# Chạy bytecode trong file Main.class
java Main
```

Với chương trình đơn giản như Hello World, việc biên dịch và chạy thực hiện bình thường mà không cần cấu hình classpath. Tuy nhiên, nếu chương trình có import nhiều file với nhau thì nên biết về classpath để cấu hình cho đúng.

## 1.2. Code ví dụ

Chương trình demo classpath sẽ gồm 3 file như sau.

```Main.java
import toyota.Car;

public class Main {
    public static void main(String[] args) {
        System.out.println("Bike: " + Bike.WHEEL_COUNT);
        System.out.println("Car: " + Car.WHEEL_COUNT);
    }
}
```

File `Bike.java` cùng thư mục với `Main.java`.

```Bike.java
public class Bike {
    public static int WHEEL_COUNT = 2;
}
```

File `Car.java` nằm trong một thư mục con `toyota` (dùng test package khi custom classpath).

```toyota/Car.java
package toyota;

public class Car {
    public static int WHEEL_COUNT = 4;
}
```

Thực hiện biên dịch và chạy `Main.java` như đã nêu ở phần trên. Quá trình biên dịch tạo ra 3 file `.class` tương ứng với vị trí file `.java`. Khi biên dịch, các class liên quan, được sử dụng trong `Main.java` sẽ được biên dịch theo (và ngược lại thì không biên dịch).

![image.png](https://images.viblo.asia/5a9b6292-5341-4675-978d-e3711cb04d10.png)

Nếu muốn các file `.class` nằm riêng trong một thư mục nào đó, chỉ định thêm flag `-d` như sau. Cấu trúc thư mục `target/` lúc này tương ứng với cấu trúc source code.

```bash
javac -d ./target Main.java
```

Có thể dùng dấu wildcard `*` để biên dịch toàn bộ file `.java` trong một thư mục cụ thể (không tính các thư mục con).

```bash
javac ./toyota/*.java
```

# 2. Khái niệm Classpath

## 2.1. Classpath khi compile

Chương trình ở phần trên biên dịch và chạy bình thường, do mặc định classpath sẽ là thư mục hiện tại. Vô tình classpath này lại khớp với các package.

Tuy nhiên, thử thay đổi một chút bằng cách di chuyển ra ngoài thư mục gốc (thư mục chứa `Main.java`) và thực hiện compile lại. Kết quả như hình sau.

![image.png](https://images.viblo.asia/856382a5-b7d8-452b-b1bd-76e2acc3beff.png)

Java Compiler lúc này không thể tìm thấy các class liên quan (`Bike` và `Car`) khi biên dịch `Main` class. Nguyên nhân do sự không phù hợp giữa khai báo package và classpath.

> Khi biên dịch một class, compiler sẽ tìm các class khác liên quan. Tên class sẽ gồm package (dựa theo import) và tên class, ví dụ `toyota.Car`, `Bike` (default package).
>
> Compler dùng classpath và tên class ở trên để suy ra vị trí tìm file `.class`. Ví dụ classpath là `.`, tên class cần tìm là `toyota.Car` thì suy ra vị trí là `./toyota/Car.class`.
>
> Nếu class chưa có thì compiler sẽ biên dịch file `.java` (biên dịch toàn bộ class trong file). Nếu file `.java` không chứa class cần tìm thì sẽ báo lỗi.
>
> Ví dụ cần tìm class `toyota.Car`, nhưng khai báo package trong `Car.java` là `yamaha`, nên class là `yamaha.Car`, không phải class cần tìm.

Lưu ý nếu dùng `import *` để import cả package, nhưng khi biên dịch chỉ biên dịch những class nào được sử dụng thôi.

Quay lại chương trình trên, do classpath chưa đúng nên compiler không thể tìm được các file `.java` liên quan để biên dịch. Vì vậy, cần chỉ định classpath khi biên dịch bằng flag `-cp` hoặc `-classpath` như sau.

```bash
javac -cp ./test-classpath ./test-classpath/Main.java
```

Ví dụ tìm class `Bike`, lúc trước classpath là `.`, nối với package của class `Bike` là rỗng (default package), nên file `Bike.java` sẽ nằm ở `./Bike.java`. Biên dịch bị lỗi vì không tìm thấy file ở đường dẫn trên.

Khi chỉnh lại classpath thành `./test-classpath`, lúc này file `Bike.java` nằm tại `./test-classpath/Bike.java`. Java Compiler tìm được và biên dịch bình thường.

Tóm lại, classpath chỉ là một đường dẫn để `javac` và `java` tìm được đâu là gốc của package, dựa vào đó để tìm các file `.java` khác.

## 2.2. Classpath ở runtime

Đúng ra thì khi biên dịch với `javac` phải dùng `-sourcepath` mới đúng. Cơ bản thì sourcepath với classpath chỉ khác nhau là một cái dùng khi compile, một cái dùng khi chạy bytecode. Mà classpath thì dùng được ở cả 2 trường hợp luôn, nên mình prefer hơn.

Như phần trên, command `java` được dùng để thực thi bytecode đã biên dịch. Lúc này cũng cần chú ý đến classpath nếu không muốn bị `ClassNotFoundException`.

![image.png](https://images.viblo.asia/58ccb28f-799a-46bd-8774-7098625d0feb.png)

Ở đây mình biên dịch vào thư mục `./target`, nên classpath sẽ là thư mục này.

```bash
# Biên dịch trước
javac -d ./target -cp ./test-classpath ./test-classpath/Main.java

# Chạy class Main
java -cp ./target Main
```

Chú ý thư mục `./target` lúc này chỉ chứa các file `.class` được biên dịch từ `.java`. Các file `.class` có sẵn trong classpath khi compile sẽ không được copy ra. Do đó, nên chú ý include cả những thư mục chứa file `.class` có sẵn.

Phần chạy bytecode hơi khác một tí, cần chỉ định tên class cần chạy gồm package và class name như sau. Tất nhiên class phải có `public static void main` thì mới chạy được.

![image.png](https://images.viblo.asia/50c9ef12-4a31-412d-a9bf-f7301a230182.png)

# 3. Các khía cạnh khác

## 3.1. Chỉ định nhiều classpath

Sẽ có lúc cần chỉ định nhiều classpath cùng lúc, như khi dùng các file `.class` từ thư viện khác (nhưng được để ở thư mục riêng). Lúc này cần chỉnh lại flag `-cp` gồm nhiều thư mục phân tách với nhau:

- Dùng dấu `;` trên Windows
- Dùng dấu `:` trên Linux

Ví dụ trường hợp class `Car` và `Main`, tuy nằm ở các thư mục khác nhau (cha và con) nhưng có thể đưa chúng về cùng một package. Tiến hành sửa code lại như sau.

```toyota/Car.java
// Class Car sẽ cùng default package với Main
// package toyota;

public class Car {
    public static int WHEEL_COUNT = 4;
}
```

```Main.java
// Không cần import do default package
// import toyota.Car;

public class Main {
	public static void main(String[] args) {
		System.out.println("Bike: " + Bike.WHEEL_COUNT);
		System.out.println("Car: " + Car.WHEEL_COUNT);
	}
}
```

Và khi biên dịch cần chỉ định 2 classpath tương ứng 2 thư mục chứa `Main.java` và `Car.java`.

```bash
# Biên dịch
javac -cp "./test-classpath:./test-classpath/toyota" ./test-classpath/Main.java

# Chạy bytecode
java -cp "./test-classpath:./test-classpath/toyota" Main
```

Chương trình chạy ra không có lỗi, do compiler tìm class trong tất cả classpath. Và đặc biệt, dòng khai báo package trong `Car.java` dù có hay không đều được, do compiler tìm thấy ở 2 classpath khác nhau. Tuy nhiên khi biên dịch ra thư mục thì vị trí file `.class` sẽ khác.

Ngoài ra, với chương trình có sử dụng JAR bên ngoài thì cần chỉ định nhiều classpath như ở phần sau.

## 3.2. Classpath với file JAR

Hầu như các thư viện Java được đóng gói dưới dạng file JAR (Java Archive). Nếu muốn biên dịch và chạy chương trình gồm file JAR qua command line thì làm thế nào?

Demo mình dùng thư viện Apache Common Lang. Chỉ cần download về, giải nén và copy file `.jar` vào thư mục nào đó là được.

https://commons.apache.org/proper/commons-lang/download_lang.cgi

File `.jar` có thể xem như một thư mục chứa các file `.class` (thử mở bằng WinRAR xem). Như vậy, việc sử dụng JAR chỉ đơn giản là thêm một classpath thôi. Khi biên dịch, compiler tìm được file `.class` rồi sẽ không cần file `.java` để biên dịch nữa.

![image.png](https://images.viblo.asia/b9c75598-17fa-4277-9a32-3f33c642bcc1.png)

Ngoài ra, có thể sử dụng wildcard `*` như sau để tìm và load toàn bộ JAR trong thư mục như sau. Chú ý phần `*` chỉ đứng một mình (dạng `/*.jar` hay `/**/*` là không đúng) và chỉ load đúng một thư mục được chỉ định (không tính các thư mục con).

![image.png](https://images.viblo.asia/0760538e-aa1b-4af7-acf3-538889dba341.png)