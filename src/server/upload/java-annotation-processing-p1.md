Bài viết được tổng hợp từ các nguồn sau :

http://hannesdorfmann.com/annotation-processing/annotationprocessing101

https://medium.com/@iammert/annotation-processing-dont-repeat-yourself-generate-your-code-8425e60c6657

Ở bài viết này, mình sẽ giới thiệu và giải thích cách để viết được một Annotation Processor. Đầu tiên chúng ta cần phải biết được Annotation Processing là gì ? ta có thể và không thể làm gì khi sử dụng. Sau đó ta sẽ tìm hiểu cách để tạo một ví dụ đơn giản.

## Annotation Processing

Bài viết này sẽ không nói về phần tính toán các annotation bằng [reflection](https://www.oracle.com/technetwork/articles/java/javareflection-1536171.html) 
lúc runtime ( là lúc khi ứng dụng chạy ) mà chỉ bàn về việc xử lí annotation lúc compile time ( là lúc khi Java compiler biên dịch source code java của bạn )

Annotation Processing là một tool build trong javac giúp thực hiện việc quét và xử lý các annotation ở compile time và bạn có thể đăng ký annotation processor của mình. Nếu bạn chưa quen với khái niệm annotation là gì thì hãy tìm thêm thông tin ở [đây](https://docs.oracle.com/javase/tutorial/java/annotations/index.html) 
Annotation processing đã có từ java 5 nhưng bản API có thể sử dụng được bắt đầu xuất hiện ở java 6 (phát hành vào tháng 12/2006). Phải mất một thời gian dài chúng ta mới nhận ra được lợi ích từ annotation processing, vì vậy mà nó mới thực sự phổ biến vài năm gần đây.

Một Annotation Processor được chỉ định từ annotation sẽ lấy java code ( hoặc byte code đã được biên dịch ) như đầu vào và tạo ra các file ( thường là file .java ) làm đầu ra.  Điều đó có nghĩa là bạn có thể tạo ra được java code một cách tự động. Bạn sẽ không phải điều chỉnh các file java class hiện tại và thêm các method, variable nữa. Trên thực tế, ta vẫn phải viết các method riêng xử lí các logic đặc thù của dự án hay các tính toán phức tạp, viết generate code tự động này giúp ta không phải viết lại các đoạn code lặp lại thừa thãi và nhàm chán nữa. Java code được tạo ra từ annotation processing nằm trong mục generatedJava và được biên dịch bởi javac.

## Abstract Processor

Hãy cùng nhìn qua Processor API. Mọi Annotation Processor sẽ đều phải kế thừa AbstractProcessor và cần khai báo các method sau

```
package com.example;

public class MyProcessor extends AbstractProcessor {

	@Override
	public synchronized void init(ProcessingEnvironment env){ }

	@Override
	public boolean process(Set<? extends TypeElement> annoations, RoundEnvironment env) { }

	@Override
	public Set<String> getSupportedAnnotationTypes() { }

	@Override
	public SourceVersion getSupportedSourceVersion() { }

}
```
- **init(ProcessingEnvironment env):** Bất cứ Annotation Processor buộc phải có một constructor rỗng. Tuy nhiên, method đặc biệt init() được gọi bởi annotation processing tool cùng với param ProcessingEnviroment sẽ cung cấp nhưng util về class như Elements, Types và Filer. Ta sẽ bàn về cách sử dụng của các class này kĩ hơn trong ví dụ.

- **process(Set<? extends TypeElement> annotations, RoundElement env):** Đây được coi là method “main” của mọi processor. Trong method này ta sẽ viết code để thực hiện việc quét ( scanning ) các annotation được khai báo, tính toán việc xử lí và tạo ra class java từ các annotation này. Với parameter RoundElement ta có thể query đến các element ( là các class, method hay variable được annotation chỉ định ).

- **getSupportedAnnotationTypes():** hàm này sẽ chỉ ra các annotations nào sẽ được đăng ký, hàm trả về là một Set<String> chứa tên của các annotation mà bạn muốn xử lý ( thực hiện generate java code )

- **getSupportedSourceVersion() :** chỉ định phiên bản java được sử dụng để thực hiện processing. Thông thường ta hay trả về SourceVersion.lastetSupported(). Ngoài ra ta có thể chỉ định một phiên bản cụ thể qua các Constant như SourceVersion.RELEASE_6 tuy theo nhu cầu của bạn.

**Note** : Với Java 7, bạn có thể sử dụng annotations thay vì phải overriding 2 method **getSupportedAnnotationTypes()**  và **getSupportedSourceVersion()** như sau

```

@SupportedSourceVersion(SourceVersion.latestSupported())
@SupportedAnnotationTypes({
   // Set of full qullified annotation type names
 })
public class MyProcessor extends AbstractProcessor {

	@Override
	public synchronized void init(ProcessingEnvironment env){ }

	@Override
	public boolean process(Set<? extends TypeElement> annoations, RoundEnvironment env) { }
}

```
Tuy nhiên vì tính tương thích, đặc biệt là với Android thì mình khuyên nên override lại method thay vì sử dụng annotations

Một điều nữa bạn cần phải biết đó Annotation Processor chạy JVM của riêng nó. javac khởi chạy một jvm hoàn chỉnh để thực hiện việc tạo Annotation Processor. Điều đó có nghĩa là trong module processor ( hay java application ) nơi bạn tạo các Processor, bạn có thể sử dụng bất kì thự viện nào bạn muốn để hỗ trợ trong việc generate java code. Bạn có thể dùng Guava để sử dụng các dependency injection tools như Dagger … Nhưng tất nhiên đừng quá lạm dụng vì bất cử processor dù lớn hay nhỏ bạn cùng đều nên để ý đến hiệu năng, các thuật toán xử lí để có thể maintain được.

## Đăng ký Processor của bạn

Để đăng ký một Processor cho javac, bạn phải cung cấp 1 file .jar ( có thể đóng gói được từ project java ) hoặc đối với các project Android thì chỉ cần add module là các project java này vào và implementation project trong app ( thông qua tool annotationProcessor như các bạn hay thấy ở Dagger2, ButterKnife, Lombok …) và AS sẽ tự động gen file jar ra cho bạn. Trong project java này ngoài source code của các Processor xử lí mà bạn muốn đăng kí, để tool có thể nhận diện được bạn muốn đăng kí các Processor nào bạn cần thêm một file đặc biệt có tên là : javax.annotation.processing.Processor và phải nằm trong folder có dạng META-INF/services bên trong thư mục resources của file .jar. Sau đây là các nội dung cần có của một file .jar để có thể đăng ký processor:
```
MyProcessor.jar
	- com
		- example
			- MyProcessor.class
	- META-INF
		- services
			- javax.annotation.processing.Processor
```
Bên trong file : **javax.annotation.processing.Processor** sẽ là một list tên các class ( canonical name ) của các processor ứng với mỗi dòng như sau

```
com.example.MyProcessor
com.foo.OtherProcessor
net.blabla.SpecialProcessor
```

Khi đăng implement file jar của processor, thực hiện build / compile project để javac tự động tìm và đọc file **javax.annotation.processing.Processor** và đăng ký các processors.

**Note**: Nếu bạn ngại việc phải tạo file **javax.annotation.processing.Processor** và define các Processor bên trong, bạn có thể sử dụng thự viên Auto-Service của Google
 
Đơn giản bạn chi khi khai báo
 
```
@AutoService(Processor.class)
public BuilderProcessor extends AbstractProcessor {
     // …
}
```
 
trong class Processor bạn muốn đăng ký. Annotation này sẽ tự động xử lí việc đăng ký Processor này cho bạn. ( Lib sẽ tạo ra file **META-INF/services/javax.annotation.processing.Processor** và điền canonical name của BuilderProcessor cho bạn.

Ở phần này, mình đã giới thiệu qua một vài kiến thức cơ bản về Annotation Processing. Phần sau mình sẽ giới thiệu cách tạo một Processor thông qua một ví dụ đơn giản.