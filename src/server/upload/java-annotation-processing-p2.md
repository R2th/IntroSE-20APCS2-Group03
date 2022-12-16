Ở [phần 1](https://viblo.asia/p/java-annotation-processing-p1-yMnKMAeAK7P) chúng ta đã tìm hiểu qua về Annotation Processing, ở phần này chúng ta sẽ thực hành viết một ví dụ tạo một annotation đơn giản

Ta sẽ viết một annotation tạo một method di chuyển giữa các activity ( sử dụng intent ), ta define annotation cho class activity, annotation processor sẽ tự động tạo ra method di chuyển đến activity đó. Ta sẽ chia thành 3 bước nhỏ để hoàn thành được ví dụ này như sau

1. Tạo mới 1  project (yaoming) : Ta sẽ gọi là app module
2. Tạo annotation module : Đây sẽ là java module, chỉ chứa các khai báo annotation
3. Tạo processor module : Đây cũng là java module độc lập với annotation module. Module này sẽ đảm nhiệm mọi tính toán và sinh code, bạn có thể sử dụng bất kì thư viện ngoài nào đễ hỗ trợ cho việc này dù lớn hay nhỏ. Bạn hãy yên tâm là module này sẽ không được đóng gói trong app của bạn nên app sẽ không bị tăng dung lượng. Cộng việc của module này chỉ tính toán và sinh code cho bạn là nó đã hoàn thành nhiệm vụ rồi, còn việc làm cách nào module này sẽ không được đóng gói thì mình sẽ nói ở ngay phần sau.

# Let's practice

Hình ảnh dưới đây là cấu trúc các module trong project
![](https://images.viblo.asia/e341d08d-9d4d-44de-ab51-acc2b7502651.png)

**piri-annotation** : đây là annotation module, vì chỉ chứa các khai báo cho annotation nên sẽ không có dependencies nào
**piri-processor** : processor module này sẽ cần **piri-annotation** để tìm các class được annotated để thực hiện việc sinh code tương ứng. Như đã nói ở trên, ở module này bạn có thể import bất kì thư viện nào để phục vụ nhu cầu của bạn, module này sẽ được bỏ qua khi tạo file apk. Ở hình ảnh dưới đây, trong build.gradle của **piri-processor** mình thêm 2 lib và module annotation như sau
![](https://images.viblo.asia/d109f8e2-077e-469d-ac42-0b23e6918fb9.png)
piri-processor/build.gradle dependencies

app module sẽ cần **piri-annotation** và **piri-processor**. Nhưng ta không thực sự cần **piri-processor** trong file apk, ta sẽ sử dụng tool annotationProcessor trong build.gradle, khai báo này có nghĩa là ta chỉ sử dụng module này trong lúc compile chứ không đưa vào file apk
![](https://images.viblo.asia/cd8a0121-1e28-41b5-815a-9f63dd55a253.png)
app/build.gradle dependencies

### Annotation
Ta sẽ di chuyển đến module annotation, tại đây ta tạo 1 class như sau

```
@Retention(RetentionPolicy.SOURCE)
@Target(ElementType.TYPE)
public @interface NewIntent {
}
```

@interface: Annotation này báo cho compiler rằng đây là một custom annotation. NewIntent là tên của annotation đó.

@Target: Annotation này sẽ dụng cho cái gì ? Class hay là method ? Constructor hay là field ? Bạn thậm chỉ có thể annotate một annotation khác :v. Dưới đây là danh sách enum bạn sử trong target

```
public enum ElementType {
    TYPE, // Annotate class, interfacem, enum ...
    FIELD, // Annotate field (bao gồm enum constants)
    METHOD, // Annotate method
    PARAMETER, // Annotate parameter
    CONSTRUCTOR, //Annotate constructor
    LOCAL_VARIABLE, //..
    ANNOTATION_TYPE, //..
    PACKAGE, //..
    TYPE_PARAMETER, //..(java 8)
    TYPE_USE; //..(java 8)
    private ElementType() {
    }
}
```

@Retention: Đây là annotation chỉ định nơi mà custom annotation của bạn được lưu trữ gồm có 3 loại :

SOURCE — Sử dụng khi compile và không được lưu trữ

CLASS —  Lưu trong file class và không được sử dụng lúc runtime

RUNTIME —  Lưu trong file class và được sử dụng lúc runtime ( thông qua reflection )

### Processor

Đây là module chính của ví dụ này, là nơi bạn sẽ thực hiện việc sinh code

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

init(): method khởi tạo là nơi bạn chuẩn bị các utils class như Filer ( giúp generate file ), Messager ( Debugging )... Bạn gọi các utils class này từ ProcessingEnvironment 

process(): đây là "bộ não" của processor. Thực hiện tính toán qua các "round" và cho bạn các annotated class, method, field ... và sinh code ở đây

getSupportedAnnotationTypes(): Method này trả về một set các custom annotation

getSupportedSourceVersion(): Ta thường trả về version mới nhất của java

# Let's process

Mình sẽ trình bày các bước thực hiện trong method process()

### 1. Tìm tất cả annotated element

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

Đầu tiên ta cần tìm và kiểm tra annotation của ta có được sử dụng hay không. Nếu không thì ta sẽ in ra lỗi, ngược lại thì ta có thể an tâm cast element sang **TypeElement**. Đây là một sub-interface kế thừa từ **Element**, ta sử dụng **TypeElement** cho class hoặc các parameter method. Ngoài ra còn có thêm nhiều sub-interface khác kế thừa **Element** nhưng ta không sử dụng trong ví dụ này.

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

### 2. "Tạo" class và method

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

Trên đây là đoạn code giúp bạn thực hiện việc sinh code. Ở đây mình có sử dụng thư viện [Java Poet](https://github.com/square/javapoet) để giúp sinh code. Document và cách sử dụng của thư viện này rất dễ hiểu và ngắn gọn

### 3. Ghi vào source file

```
JavaFile.builder("com.annotationsample", navigatorClass.build())
  .build()
  .writeTo(filer);
```

Cuối cùng khi sinh được class hay method thì ta ghi chúng ra file. Các code sinh ra sẽ được nằm trong package **generatedJava** trong app module

Toàn bộ code thực hiện trong class processor như sau
```
public class NewIntentProcessor extends AbstractProcessor {

    private static final String METHOD_PREFIX = "start";
    private static final ClassName classIntent = ClassName.get("android.content", "Intent");
    private static final ClassName classContext = ClassName.get("android.content", "Context");

    private Filer filer;
    private Messager messager;
    private Elements elements;
    private Map<String, String> activitiesWithPackage;

    @Override
    public synchronized void init(ProcessingEnvironment processingEnvironment) {
        super.init(processingEnvironment);
        filer = processingEnvironment.getFiler();
        messager = processingEnvironment.getMessager();
        elements = processingEnvironment.getElementUtils();
        activitiesWithPackage = new HashMap<>();
    }

    @Override
    public boolean process(Set<? extends TypeElement> set, RoundEnvironment roundEnvironment) {

        try {
            /**
             * 1- Find all annotated element
             */
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


            /**
             * 2- Generate a class
             */
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


            /**
             * 3- Write generated class to a file
             */
            JavaFile.builder("com.annotationsample", navigatorClass.build()).build().writeTo(filer);


        } catch (IOException e) {
            e.printStackTrace();
        }

        return true;
    }

    @Override
    public Set<String> getSupportedAnnotationTypes() {
        return ImmutableSet.of(NewIntent.class.getCanonicalName());
    }

    @Override
    public SourceVersion getSupportedSourceVersion() {
        return SourceVersion.latestSupported();
    }
}
```

# Sử dụng annotation
Nếu bạn làm đúng như ví dụ phía trên thì **Processor** sẽ tạo cho ta một class với method như sau

public final class Navigator {
  public static Intent startMainActivity(Context context) {
    return new Intent(context, com.annotationsample.MainActivity.class);
  }
}

Trong app module, ta gọi đến annotation như sau

@NewIntent
public class MainActivity extends AppCompatActivity {}

Ta chỉ việc gọi đến method của class được sinh ra như sau để có thể di chuyển màn hình

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

Hy vọng qua ví dụ này sẽ cho bạn cái nhìn tổng quát và cách thức tạo một custom annotation :) Happy coding !