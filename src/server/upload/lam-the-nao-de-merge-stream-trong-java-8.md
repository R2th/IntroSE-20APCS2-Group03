Các bạn nếu đã làm việc với Java 8 thì hẳn đã quen thuộc với Stream. Tuy nhiên liệu các bạn đã từng tự hỏi làm sao để merge các Stream lại? Trong bài viết này chúng ta sẽ cùng tìm hiểu xem làm sao có thể thêm được 1 phần tử vào Stream và làm thế nào để merge các Stream :)

## Đầu tiên hãy cùng xem xét làm sao thêm được 1 phần tử đơn vào Stream?

Chúng ta có thể dễ dàng thêm một phần tử đã cho vào một Stream bằng cách gọi phương thức Stream.concat():

Trong ví dụ dưới, 1 phần tử được thêm vào đầu của 1 Stream cho sẵn.

```
package com.vuta.merge.stream;

import java.util.stream.Stream;

public class MergeStreamExample {

	public static void main(String[] args) {
		Stream<Integer> firstStream = Stream.of(11, 22, 33, 44, 55);
		 
	    Stream<Integer> secondStream = Stream.concat(Stream.of(99), firstStream);
	    
	    secondStream.forEach(System.out::println);
	}
}
```

> 99
> 
> 11
> 
> 22
> 
> 33
> 
> 44
> 
> 55


Tương tự như vậy, để thêm một phần tử vào cuối Stream, chúng ta chỉ cần đảo ngược các đối số.

```
package com.vuta.merge.stream;

import java.util.stream.Stream;

public class MergeStreamExample {

	public static void main(String[] args) {
		Stream<Integer> firstStream = Stream.of(11, 22, 33, 44, 55);
		 
	    Stream<Integer> secondStream = Stream.concat(firstStream, Stream.of(99));
	    
	    secondStream.forEach(System.out::println);
	}
}

```

> 11
> 
> 22
> 
> 33
> 
> 44
> 
> 55
> 
> 99

Vậy để thêm 1 phần tử vào Stream theo index thì ta phải làm thế nào?

Hoạt động này không được Stream API hỗ trợ đầy đủ bởi vì về cơ bản Stream không phải là tập hợp và không quan tâm đến khái niệm index.

Tuy nhiên trong thực tế nhiều khi phát sinh những việc như phải chèn phần tử mới vào Stream, trước khi thực hiện các thao tác khác với Stream. Vì vậy, để thực hiện việc này, chúng ta cần chuyển đổi Stream thành List, sau đó chèn phần tử và cuối cùng, nhận Stream từ List mới đó. :)

```
package com.vuta.merge.stream;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class MergeStreamExample {

	public static void main(String[] args) {
		Stream<Integer> firstStream = Stream.of(11, 22, 33, 44, 55);
		 
	    Stream<Integer> secondStream = insertIntoStream(firstStream, 99, 2);
	    
	    secondStream.forEach(System.out::println);
	}
	
	public static <T> Stream<T> insertIntoStream(Stream<T> stream, T element, int index) {
	    List<T> result = stream.collect(Collectors.toList());
	    result.add(index, element);
	    return result.stream();
	}
}

```

> 11
> 
> 22
> 
> 99
> 
> 33
> 
> 44
> 
> 55

## Merging nhiều Streams

Ta có thể dễ dàng merge 2 Stream bằng cách sử dụng Stream.concat() như ví dụ thêm 1 phần tử vào Stream ở trên.
Nhưng trong trường hợp phải merge 3 Stream thì sao? Code nhìn trông có vẻ loằng ngoằng hơn, như sau

```
package com.vuta.merge.stream;

import java.util.stream.Stream;

public class MergeStreamExample {

	public static void main(String[] args) {
		Stream<Integer> stream1 = Stream.of(1, 2, 3);
		Stream<Integer> stream2 = Stream.of(4, 5, 6);
		Stream<Integer> stream3 = Stream.of(7, 8, 9, 10);

		Stream<Integer> resultStream = Stream.concat(Stream.concat(stream1, stream2), stream3);
		
		resultStream.forEach(System.out::print);
	}
}

```

> 12345678910


Vậy giả sử như nếu ta phải merge nhiều hơn 3 Stream thì sao? :-? 

```
Stream<Integer> resultStream = Stream.concat(Stream.concat(Stream.concat(stream1, stream2), stream3), stream4);
```

và nếu nhiều hơn nữa =)) thì code sẽ trở nên quá xấu. Tuy nhiên chúng ta có thể dùng cách dưới đây để giải quyết.

* Đầu tiên hãy tạo 1 Stream chứa  4(hoặc nhiều hơn) Stream con, kiểu dữ liệu nó lưu trữ sẽ là  Stream<Stream<Integer>>
* Sau đó ta có thể dùng flatMap() để biến nó thành 1 Stream<Integer>

```
package com.vuta.merge.stream;

import java.util.stream.Stream;

public class MergeStreamExample {

	public static void main(String[] args) {
		Stream<Integer> stream1 = Stream.of(1, 2, 3);
		Stream<Integer> stream2 = Stream.of(4, 5, 6);
		Stream<Integer> stream3 = Stream.of(7, 8, 9, 10);
		Stream<Integer> stream4 = Stream.of(77, 88, 99);

		Stream<Integer> resultStream = Stream.of(stream1, stream2, stream3, stream4).flatMap(e -> e);

		resultStream.forEach(System.out::print);
	}
}

```

> 12345678910778899
 

Ngoài các cách ở trên, bạn cũng có thể dùng các thư viện để thực hiện được việc merge Stream:

1. [StreamEx](https://github.com/amaembo/streamex): là một thư viện mã nguồn mở của Java, nó extends Java 8 Streams và cung cấp StreamEx class như một sự mở rộng cho Stream interface của JDK.

```
...
Stream<Integer> stream1 = Stream.of(1, 2, 3);
		Stream<Integer> stream2 = Stream.of(4, 5, 6);
		Stream<Integer> stream3 = Stream.of(7, 8, 9, 10);
		Stream<Integer> stream4 = Stream.of(77, 88, 99);

		Stream<Integer> resultingStream = StreamEx.of(stream1)
			      .append(stream2)
			      .append(stream3)
			      .append(stream4);
...
```

2. [jOOλ](https://github.com/jOOQ/jOOL): cũng là 1 thư viện mở rộng cho JDK rất hữu dụng