![](https://images.viblo.asia/9237366a-df29-4592-aef4-e17f07f3064d.jpg)

## 1. Giới thiệu về Stream trong Java 8
Stream là một lớp trừu tượng mới được giới thiệu trong Java 8. Sử dụng luồng, bạn có thể xử lý dữ liệu theo cách khai báo tương tự như các câu lệnh SQL.

SELECT max(salary), employee_id, employee_name FROM Employee

Biểu thức SQL ở trên tự động trả về các chi tiết của nhân viên được trả lương tối đa, mà không thực hiện bất kỳ phép tính nào trên đầu của nhà phát triển. Sử dụng khung bộ sưu tập trong Java, nhà phát triển phải sử dụng vòng lặp và kiểm tra lặp lại. Một mối quan tâm khác là hiệu quả, vì các bộ xử lý đa nhân có sẵn một cách dễ dàng, một nhà phát triển Java phải viết xử lý mã song song có thể dễ bị lỗi.

Stream (luồng) là một đối tượng mới của Java được giới thiệu từ phiên bản Java 8, giúp cho việc thao tác trên collection và array trở nên dễ dàng và tối ưu hơn.

Một Stream đại diện cho một chuỗi các phần tử hỗ trợ các hoạt động tổng hợp tuần tự (sequential) và song song (parallel).

Tất cả các class và interface của Stream API nằm trong gói java.util.stream. Bằng cách sử dụng các stream, chúng ta có thể thực hiện các phép toán tổng hợp khác nhau trên dữ liệu được trả về từ các collection, array, các hoạt động Input/Output. Trước khi chúng ta thấy cách Stream API có thể được sử dụng trong Java như thế nào, hãy xem ví dụ sau để hiểu cách sử dụng Stream:
```
package Collection;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class test {
	static List<Integer> numbers = Arrays.asList(8, 2, 0, 4, 6, 1);
	
	public static void main(String[] args) {
		List<Integer> listSort = numbers.stream().sorted().collect(Collectors.toList());
		System.out.println(listSort);
	}
}
```

> Kết quả: [0, 1, 2, 4, 6, 8]

Thực thi chương trình trên ta thấy kết quả trả về là một list được sắp xếp tăng dần. Sự khác biệt giữa việc sử dụng stream sẽ ngắn gọn hơn, hiệu suất sử dụng stream tốt hơn.

Với phương thức withoutStream(), chúng ta đang lặp lại toàn bộ danh sách để tìm sắp xếp các giá trị phần tử trong List. Không có xử lý song song trong phương thức này.

Với phương thức withStream(), phương thức stream() trả về một luồng của tất cả các number, phương thức sorted() trả về một stream các các số theo thứ tự tăng dần, phương thức Collectors.toList() trả về số List giá trị. Tất cả các hoạt động này đang xảy ra song song, có nghĩa là chúng ta có thể thực hiện song song code với sự trợ giúp của stream. Việc thực hiện song song các hoạt động sử dụng stream nhanh hơn thực thi tuần tự mà không cần sử dụng stream.

## 2. Một số phương thức của Stream
Trong Java 8, Collection interface được hỗ trợ 2 phương thức để tạo ra Stream bao gồm:

* stream() : trả về một stream sẽ được xử lý theo tuần tự.
* parallelStream() : trả về một Stream song song, các xử lý sau đó sẽ thực hiện song song.

## 3. Các đặc điểm của Java Stream
* Stream không lưu trữ các phần tử của collection hay array. Nó chỉ thực hiện các phép toán tổng hợp (chẳng hạn như filter(), sorted() và count() để có được stream dữ liệu mong muốn.
* Stream là immutable object. Các hoạt động tổng hợp mà chúng ta thực hiện trên Collection, Array hoặc bất kỳ nguồn dữ liệu nào khác không làm thay đổi dữ liệu của nguồn, chúng chỉ trả lại stream mới. Chúng ta đã thấy ở ví dụ trên là thực hiện sorted() các các số chẵn bằng cách sử dụng các hoạt động của stream nhưng nó không thay đổi các phần tử của List numbers.
* Tất cả các hoạt động stream là lazy (lười biếng), có nghĩa là chúng không được thực hiện cho đến khi cần thiết. Để làm được điều này, hầu hết các thao tác với Stream đều return lại một Stream mới, giúp tạo một mắc xích bao gồm một loạt các thao tác nhằm thực thi các thao tác đó một cách tối ưu nhất. Mắc xích này còn được gọi là pipeline.
* Các phần tử của luồng chỉ được truy cập một lần trong suốt vòng đời của Stream. Giống như một Iterator, một Stream mới phải được tạo ra để duyệt lại các phần tử của dữ liệu nguồn.
* Stream không dùng lại được, nghĩa là một khi đã sử dụng nó xong, chúng ta không thể gọi nó lại để sử dụng lần nữa.
* Chúng ta không thể dùng index để truy xuất các phần tử trong Stream.
* Stream hỗ trợ thao tác song song các phần tử trong Collection hay Array.

## 4. Cách làm việc với Stream trong Java
Như chúng ta đã thấy trong ví dụ trên, hoạt động của luồng có thể được giải thích theo ba giai đoạn:

* Tạo Stream.
* Thực hiện các thao tác trung gian (intermediate operations) trên stream ban đầu để chuyển đổi nó thành một stream khác và tiếp tục thực hiện các hoạt động trung gian khác. 
* Thực hiện thao tác đầu cuối (terminal operation) trên stream cuối cùng để nhận kết quả và sau đó bạn không thể sử dụng lại chúng.

## 5. Thực hành với Stream
### 5.1. Collectors.joining()
```
package Collection;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class test {

	public static void main(String[] args) {
		List<String> list = Arrays.asList("Java", "NodeJS", "C#", "C++");
		String result = list.stream().collect(Collectors.joining());
		System.out.println(result);
		result = list.stream().collect(Collectors.joining(","));
		System.out.println(result);
		result = list.stream().collect(Collectors.joining("-", "(", ")"));
		System.out.println(result);
	}
}
```

> Kết quả:
> JavaNodeJSC#C++
> Java,NodeJS,C#,C++
> (Java-NodeJS-C#-C++)

### 5.2. Sử dụng filter()
Stream filter() giúp tạo bộ lọc loại bỏ các phần tử dựa trên các điều kiện nhất định.
Thực hiện ví dụ tạo lọc các chữ số lẻ trong 1 List 
```
package Collection;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class test {
	static List<Integer> numbers = Arrays.asList(7, 2, 0, 4, 6, 1);
	
	public static void main(String[] args) {
		List<Integer> listSort = numbers.stream().filter(number -> number%2 != 0).collect(Collectors.toList());
		System.out.println(listSort);
	}
}
```

> Kết quả: [7, 1]

### 5.3. Sử dụng map()
Stream map() giúp ánh xạ các phần tử tới các kết quả tương ứng.
```
package Collection;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class test {
	
	public static void main(String[] args) {
		List<String> list = Arrays.asList("Java", "NodeJS", "C#", "C++");
		List<String> result = list.stream().map(String::toUpperCase).collect(Collectors.toList());
		System.out.println(result);
	}
}
```

> Kết quả: [JAVA, NODEJS, C#, C++]

### 5.4. Sử dụng summaryStatistics()
Các luồng của các kiểu nguyên thủy (IntStream, vv) cung cấp phương thức summaryStatistics () có thể được sử dụng để lấy nhiều thuộc tính thống kê của một luồng (giá trị tối thiểu, giá trị trung bình, v.v.).

Giả sử chúng ta có một danh sách người. Mục tiêu của chúng tôi là lấy tuổi tối thiểu và tối đa của những người trong danh sách bằng cách sử dụng luồng.

Vấn đề ở đây là việc tính toán các giá trị tối thiểu và tối đa là các hoạt động dòng đầu cuối. Vì vậy, chúng tôi cần phải đưa ra cách thực hiện giảm thiểu của riêng mình hoặc tạo luồng mới cho mỗi tính toán.
```
package Collection;

import java.util.ArrayList;
import java.util.List;

public class Person {
	private String name;
	private int age;

	public Person(String name, int age) {
		this.name = name;
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public int getAge() {
		return age;
	}

	public static List<Person> getList() {
		List<Person> list = new ArrayList<>();
		list.add(new Person("A", 5));
		list.add(new Person("B", 18));
		list.add(new Person("C", 12));
		list.add(new Person("D", 22));
		return list;
	}
}
```

```
package Collection;

import java.util.IntSummaryStatistics;
import java.util.List;

public class test {
	public static void main(String[] args) {
		List<Person> list = Person.getList();
		IntSummaryStatistics statistics = list.stream()
		        .mapToInt(Person::getAge)
		        .summaryStatistics();
		System.out.println("Age min: " +statistics.getMin());
		System.out.println("Age max: " +statistics.getMax());
	}
}
```

> Kết quả:
> Age min: 20
> Age max: 30

### 5.5. Sử dụng skip(), limit()
Phương pháp limit() được sử dụng để giảm kích thước của luồng, skip() được sử dụng để bỏ qua phần tử của luồng. Ví dụ sau ta thực hiện bỏ 2 phần tử đầu và lấy ra 2 phần tử tiếp theo
```
package Collection;

import java.util.Arrays;
import java.util.List;

public class test {
	public static void main(String[] args) {
		List<String> data = Arrays.asList("Java", "C#", "C++", "PHP", "Javascript");
		 
        data.stream().skip(2).limit(2) //
                .forEach(System.out::print); 
        
	}
}
```

> Kết quả: C++PHP

Tài liệu tham khảo:

[https://www.javatpoint.com/java-8-stream](https://www.javatpoint.com/java-8-stream)
[https://www.tutorialspoint.com/java8/java8_streams.htm](https://www.tutorialspoint.com/java8/java8_streams.htm)
[https://gpcoder.com/3923-gioi-thieu-ve-stream-api-trong-java-8/#So_sanh_Streams_voi_Collections](https://gpcoder.com/3923-gioi-thieu-ve-stream-api-trong-java-8/#So_sanh_Streams_voi_Collections)