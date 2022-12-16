Annotation processing được phát hành trong java 1.5. Thực tế nó là một API cũ nhưng có sức mạnh rất lớn. Chúng ta sẽ nói về cái gì là annotation processing, quá trình tự sinh mã nguồn và các thư viện sẵn có cái sử dụng để tùy biến annotation và tự sinh mã nguồn cho chúng ta.
## What is an annotation?
Thực tế tất cả chúng ta đã biết nó là cái gì. Sẵn có những annotation được định nghĩa trước trong API. Chúng ta sử dụng **@Override** annotation nhằm ghi đè các phương thức, **@Singleton** cho việc sử dụng singleton pattern, một dãy android annotation như **@NonNull**, **@StringRes**, **@IntRes**, .... Tôi sẽ không mô tả sâu về những annotation này. Tôi muốn tạo một cái mới.

## Code Generation ?
Bạn đã sử dụng **@BindView** cho quá trình injecting các view chưa? Hoặc bạn đã inject vào các classes của mình bằng cách sử dụng **@Inject**? Hoặc bạn đã sử dụng Dagger library cho quá trình dependency injection chưa? Chúng ta biết rằng Dagger 2 sử dụng những annotations như **@Component**, **@Module**, hoặc người dùng định nghĩa các scopes như **@Fragment**, **@Activity**,....
Butterknife, Dagger2, Lombok, DeepLinkDispatch và rất nhiều thư viện sinh ra mã nguồn cho chúng ta. Quá trình sinh mã nguồn đang xảy ra trong thời gian biên dịch. Và tất các các annotations được xây dựng trong javac(Java compiler) cho quá trình quét, xử lý trong thời gian biên dịch.

Để giải thích từng bước của quá trình annotation processing:
1. Quá trình build bắt đầu trong java compiler. (java compiler biết tất cả các processors, do đó nếu chúng ta muốn tạo một cái mới, chúng ta cần nói với compiler về điều đó).
2. Khởi chạy tất cả các Annotation Processors cái không được thực thi. (Mọi processor có quá trình thực thi của  riêng nó).
3. Lặp trên các yếu tố được chú thích(annotated elements) bên trong processor.
4. Tìm các lớp, phương thức, fields được chú thích(annotated classes, methods, fields).
5. Sinh ra một class mới với metadata(dữ liệu điều kiện) của các lớp, phương thức, fields được tìm thấy. (Đây là nơi mà mã nguồn của bạn được sinh ra).
6. Tạo một file mới và viết các chuỗi đã được sinh ra của bạn vào một lớp.
7. Compiler kiểm tra nếu tất cả các annotation processor đã được thực thi. Nếu không, bắt đầu vòng lặp tiếp theo.

Đó là một bức tranh hàng ngang từ. Và có thể hình dung như bên dưới:

<div align="center"><img src="https://images.viblo.asia/e1700a1f-5fbe-464e-a638-636d1863027f.png" /></div>

## How does ButteKnife Work?
1. Định nghĩa một view như là một biến toàn cục(Không nên là private, nó sẽ được giải thích sau).
2. Thêm annotation cho view với ID của nó.
3. Gắn lớp của bạn với Butterknife.

Khi bạn click vào build. Butterknife thực hiện tất cả các bước ở bên trên. Và tạo một thể hiện của lớp được sinh ra bởi reflection. Và load các views của bạn.

## Creating Custom Annotation in Android
Chúng ta sẽ tạo một annotation đơn giản cái sinh ra một lớp navigator và thêm các phương thức newIntent cho các lớp được sinh ra. Nó sẽ được gọi là "**Piri**", và đây không phải là một sản phẩm dạng library. Thực tế, nó không phải là một library, chỉ là một project thử nghiệm. Nhưng nó sẽ gửi tới bạn logic chính đằng sau quá trình annotation processing.

Đây là các bước trước khi đi sâu vào chi tiết của từng chủ đề. Nó được chuẩn bị để chúng ta có thể hiểu được. Chúng ta có 3 bước ở đây.
### 1. Create a new project
Đây là module ứng dụng của bạn.
### 2. Create an annotation module
Module này là một module java. Cái chỉ chứa các annotations.
### 3. Create a processor module
Module này cũng là một module java và phụ thuộc vào annotation module. Module này thực hiện tất cả các quá trình tính toán và sinh ra mã nguồn. Bạn có thể sử dụng hàng tá các thư viện ở đây, bạn có thể sử dụng **guava** hoặc một vài cái giống thế. Tại sao chúng ta nói đến điều đó? Bởi vì module này không được đóng gói cùng với ứng dụng của bạn. Ứng dụng của bạn không bị to với processor module và các phần phụ thuộc của nó. Module này làm tất cả các công việc tính toán và sinh mã nguồn rồi hoàn thành các công việc của nó. Chúng ta sẽ trình bày làm thế nào nó có thể sau đó.

## Let’s start coding
### Packages

<div align="center"><img src="https://images.viblo.asia/bd958410-47ac-4e93-85a8-56cbf3b95a8a.png" /></div>

**piri-annotation** module không cần bất cứ phần phụ thuộc nào. So đó khoong có phần phụ thuộc trong file *piri-annotation/build.gradle* của nó.
**piri-processor** module cần **piri-annotation** module bởi vì processor sẽ tìm các lớp được chú thích và thực hiện một số tính toán. Như chúng ta đã thảo luận ở trước, bạn có thể sử dụng bất cứ thư viện nào trong processor module này. Module này sẽ được giữ ở bên ngoài khi các file package của ứng dụng được tạo ra. Do đó file *piri-processor/build.gradle* như thế này:

<div align="center"><img src="https://images.viblo.asia/595f46ed-e681-4dcc-9cb0-5aad9c566386.png" /></div>

**app** module cần **piri-annotation** và **piri-processor**. Nhưng chúng ta không muốn module *piri-processor* trong file .apk của mình. Đây là công cụ **annotationProcessor** sinh ra để trợ giúp. **annotationProcessor** nghĩa là khi đó chúng ta chỉ cần cái đó chỉ trong lúc biên dịch, không đẩy nó vào file APK của chúng ta.

<div align="center"><img src="https://images.viblo.asia/531d789b-cfd0-45ff-bbcc-80511b397a54.png" /></div>

### Annotation
```
@Retention(RetentionPolicy.SOURCE)
@Target(ElementType.TYPE)
public @interface NewIntent {
}
```

**@interface**: Annotation này nói với compiler đây là một annotation tùy biến. NewIntent là tên của custom annotation của chúng ta.
**@Target**: Target của chúng ta là cái gì? Cái bạn muốn chú thích thực hiện là cái gì? Lớp hay phương thức? Constructor hay fields? Có thể bạn muốn chú thích một annotation khác? Dưới đây là enum list cái bạn có thể sử dụng như là target. Nó có trong *java.lang.annotation* package.

```
public enum ElementType {
    TYPE, //If you want to annotate class, interface, enum..
    FIELD, //If you want to annotate field (includes enum constants)
    METHOD, //If you want to annotate method
    PARAMETER, //If you want to annotate parameter
    CONSTRUCTOR, //If you want to annotate constructor
    LOCAL_VARIABLE, //..
    ANNOTATION_TYPE, //..
    PACKAGE, //..
    TYPE_PARAMETER, //..(java 8)
    TYPE_USE; //..(java 8)

    private ElementType() {
    }
}
```

**@Retention**: annotation chỉ ra rằng làm thế nào custom annotation được lưu. Retention có 3 loại:
- SOURCE - phân tích bởi compiler và không bao giờ được lưu lại.
- CLASS - lưu trong class file và không được giữ lại lúc thực thi.
- RUNTIME - lưu trong class file và có thể sử dụng trong lúc thực thi(bởi reflection).

### Processor
Đây là nơi ảo thuật xuất hiện. Bạn tiêu tốn hầu hết thời gian ở đây nếu bạn cần thực hiện quá trình sinh code.

```
public class NewIntentProcessor extends AbstractProcessor {

    @Override
    public synchronized void init(ProcessingEnvironment processingEnv) {}

    @Override
    public boolean process(Set<? extends TypeElement> set, RoundEnvironment roundEnv) {}

    @Override
    public Set<String> getSupportedAnnotationTypes() {}

    @Override
    public SourceVersion getSupportedSourceVersion() {}
}
```

**init()**: đưa cho bạn cây chổi sơn để bạn bắt đầu sơn. File(để sinh ra file), Messager(debugging), Utility classes. Bạn có thể lấy những classes này trong môi trường xử lý.

**process()**: Bộ óc của processor của bạn. Bắt đầu lượn vòng và giử cho bạn các lớp, phương thức, fields, annotations,... đã được chú thích. Nó gửi đến bạn tất cả các yếu tố đã được chú thích ở đây. Và bạn bắt đầu quá trình thực hiện tất cả các tính toán và quá trình sinh ra các file cho lớp mới ở đây.

**getSupportedAnnotationTypes()**: Chúng ta chỉ trả về thiết lập cho custom annotation của mình trong phương thức này. Chúng ta có thể nói rằng giá trị được trả về của phương thức này sẽ được gửi cho chúng ta giống như là quá trình xử lý tham số đầu tiên của phương thức.

**getSupportedSourceVersion()**: Chúng ta luôn trả về phiên bản java muộn nhất.


### Let’s Process
Chúng ta cần thực hiện 3 bước trong phương thức **process()**:
1. Tìm tất cả các Element(thành phần) được chú thích.
```
for (Element element : roundEnvironment.getElementsAnnotatedWith(NewIntent.class)) {

    if (element.getKind() != ElementKind.CLASS) {
        messager.printMessage(Diagnostic.Kind.ERROR, "Can be applied to class.");
        return true;
    }

    TypeElement typeElement = (TypeElement) element;
    activitiesWithPackage.put(
            typeElement.getSimpleName().toString(),
            elements.getPackageOf(typeElement).getQualifiedName().toString());
}
```

Element là giao diện cha cho tất cả các thành phần. Đầu tiên chúng ta kiểm tra nếu annotation của mình được sử dụng trong lớp hay không. Nếu nó không được chú thích ở trong lớp thì chúng ta in ra thông điệp lỗi và return. Nếu không có lỗi, điều này nghĩa là chúng ta có thể ép kiểu element thành TypeElement một cách an toàn. TypeElement là một subinterface cái được kế thừa từ Element. Và chúng ta sử dụng TypeElement cho các lớp, các tham số của phương thức. Có một vài subinterface khác cũng được kế thừa từ Element.

```
package com.example;	// PackageElement

public class Foo {		// TypeElement

	private int a;		// VariableElement
	private Foo other; 	// VariableElement

	public Foo () {} 	// ExecuteableElement

	public void setA ( 	// ExecuteableElement
	                 int newA	// TypeElement
	                 ) {}
}
```

2. Tạo class và những phương thức(Sử dụng thư viện [JavaPoet](https://github.com/square/javapoet))

```
TypeSpec.Builder navigatorClass = TypeSpec
        .classBuilder("Navigator")
        .addModifiers(Modifier.PUBLIC, Modifier.FINAL);

for (Map.Entry<String, String> element : activitiesWithPackage.entrySet()) {
    String activityName = element.getKey();
    String packageName = element.getValue();
    ClassName activityClass = ClassName.get(packageName, activityName);
    MethodSpec intentMethod = MethodSpec
            .methodBuilder(METHOD_PREFIX + activityName)
            .addModifiers(Modifier.PUBLIC, Modifier.STATIC)
            .returns(classIntent)
            .addParameter(classContext, "context")
            .addStatement("return new $T($L, $L)", classIntent, "context", activityClass + ".class")
            .build();
    navigatorClass.addMethod(intentMethod);
}
```

Bạn nên sử dụng JavaPoet nếu bạn muốn thực hiện quá trình sinh ra mã nguồn. Nó là cực dễ dàng để sinh ra các lớp, phương thức, và các tham số. Không phải giải thích nhiều, mọi thứ là rất rõ ràng trong [document](https://github.com/square/javapoet) của thư viện này.

3. Ghi nó vào một source file.

```
JavaFile.builder("com.annotationsample", navigatorClass.build())
  .build()
  .writeTo(filer);
```

Cuối cùng, viết ra một file. Hãy mang những đoạn mã nguồn lại với nhau giống như ở [đây](https://gist.github.com/iammert/c9da4150a5b5faa4b7bd8fe7915d6e6b).

Processor này sẽ sinh ra cho chúng ta lớp ở bên dưới.

```
public final class Navigator {
  public static Intent startMainActivity(Context context) {
    return new Intent(context, com.annotationsample.MainActivity.class);
  }
}
```

Hãy sử dụng annotation mới này trong app module của chúng ta.

```
@NewIntent
public class MainActivity extends AppCompatActivity {}
```

Và gọi lớp được sinh ra cũng như các phương thức của nó.

```
public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        Navigator.startMainActivity(this); //generated class, method
    }
}
```

Chúc mừng. Tất cả đã hoàn thành.

## Source
https://medium.com/@iammert/annotation-processing-dont-repeat-yourself-generate-your-code-8425e60c6657

## References

***[@Eliminate("Boilerplate")](https://news.realm.io/news/360andev-ryan-harter-eliminate-boilerplate/)*** <br/>
***[Square/javapoet](https://github.com/square/javapoet)*** <br/>
***[The 10-Steps Guide to Annotation Processing in Android Studio](http://blog.stablekernel.com/the-10-step-guide-to-annotation-processing-in-android-studio)*** <br/>
***[erdemtopak/simple-annotation-processor](https://github.com/erdemtopak/simple-annotation-processor)*** <br/>
***[Custom Annotations in Android](https://engineering.wework.com/custom-annotations-in-android-af43514f2f1b)*** <br/>
***[Writing your own Annotation Processors in Android](https://medium.com/androidiots/writing-your-own-annotation-processors-in-android-1fa0cd96ef11)***