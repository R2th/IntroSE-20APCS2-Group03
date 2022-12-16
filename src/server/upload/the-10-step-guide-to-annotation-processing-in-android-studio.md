## Introduction
Trong khi làm việc với một thư viện kiểm thử trong thời gian rảnh rỗi, tôi nghĩ rằng Annotations sẽ hữu ích nhằm tạo ra một đồ thị cấu trúc(graph structure) tương tự như cách thức mà Dagger thực hiện cho những đối tượng dependency của mình, nhưng tôi chỉ có kinh nghiệm về việc viết các annotations cái mà được tham chiếu lúc thực thi.

Do đó, tôi đã lướt web để kiếm các hướng dẫn, bài viết trên các blogs và các videos về annotation processing. Tôi đã có thể tìm thấy đầy đủ thông tin để thiết lập các annotation processor của riêng mình, nhưng không có bất cứ một hướng dẫn hoàn thiện nào về việc làm thế nào để thiết lập nó cho Android. Bởi vì annotation processing là thuần java, tất cả các hướng dẫn đã trình bày về processor trong project của chính nó, nhưng tôi cần processor của riêng mình trong một project giống nhưì ứng dụng Android của tôi do đó một lời gọi nhằm build project cũng có thể gây ra một quá trình build cho annotation processor, sau tất cả, tôi cần điều này để đáp ứng các kiểm thử tôi đã tạo ra. Do đó, khi tôi được hỏi bài viết đầu tiên của mình trên blog là gì, tôi đã có sẵn câu trả lời.

**Annotation** là một lớp  metadata(siêu dữ liệu) cái có thể được liên kết với các lớp, methods, fields, và ngay cả với các annotations khác. Siêu dữ liệu này có thể truy cập lúc thực thi thông qua reflection, nhưng bạn cũng có thể truy cập siêu dữ liệu này lúc build thông qua các annotation processors. Annotations processors là một interface hữu ích được thêm vào trong Java 6 cái thực hiện việc tìm kiếm toàn diện dựa trên tất cả các annotations tại thời điểm build và cho phép bạn truy cập thông tin reflection liên quan tới thành phần cái được chú thích cũng như là bất cứ các siêu dữ liệu nào được lưu trong annotation tương ứng.
Annotations và processors đã không được giải thích sâu bởi các nhà phát triển chính thống cho tới thời điểm hiện tại.
**Jake Wharton** đã đóng góp một sự trình bày chuyên sâu về annotation processing, lịch sử của nó và nó được sử dụng như thế nào trong Dagger/Dagger2.
**Hannes Dorfman** đóng góp một bài trình bày tuyệt vời khái quát những khái niệm về annotation processing làm việc như thế nào.

Trước khi bắt đầu, hãy chú tâm vào việc chúng ta sẽ sử dụng annotation processing ở mức độ cao như thế nào.
Khi bạn build và run mã nguồn này, điều đầu tiên xảy ra đó là mã nguồn annotation processor được biên dịch thành một jar thông qua một quá trình build trước của gradle task do đó nó có thể tự động thêm vào và sử dụng trong Android project của chúng ta(Annotation process là các modules thuần Java kể từ bản phát hành Java 8 và sẽ không phải truy cập từ Android API). Tiếp theo, build process sẽ bắt đầu thực thi tất cả các annotattions trong Android Project của chúng ta, bao gồm cả cái tùy biến mà chúng ta sẽ viết. Annotations processor của chúng ta sẽ tạo ra một lớp đối tượng được sinh ra cái có thể được sử dụng bên trong mã nguồn Android tại thời điểm thực thi. Trong quá trình thực hiện đó chúng ta sẽ phải chứng minh về quá trình sinh ra mã nguồn từ annotations tại thời điểm build và sử dụng mã nguồn được sinh ra trong suốt quá trình thực thi.

Cấu trúc package là rất quan trọng và việc cố gắng thay đổi tên hoặc di chuyển các packages nhằm sửa một lỗi luôn luôn không bao giờ làm việc đúng theo dự định, do đó làm cho chúng đúng ngay lần đầu tiên tạo cho cuộc sống trở nên dễ dàng hơn. Quy ước đặt tên tiêu biểu giống như hai packages dưới đây:

```
<base>              => com.stablekernel.annotationprocessor
<base>.processor    => com.stablekernel.annotationprocessor.processor
```

Đối với bài hướng dẫn này, chúng ta sẽ bắt đầu với một Empty Activity trong ứng dụng mặc định "Hello, world!" được tạo ra thông qua Android Studio và chúng ta sẽ phải thiết lập khung cho project của mình.

## 1. Creating the processor module
Bởi vì chúng ta đang bắt đầu từ một ứng dụng đã có, đầu tiên chúng ta cần tạo một annotation processor trong module của nó bằng cách click chuột phải vào project folder và chọn **New -> New Module** hoặc bằng cách đi qua **File -> New -> New Module**

<div align="center"><img src="https://images.viblo.asia/ff2ecdf1-dc76-438f-b8ca-8a8009e14aa9.png"></div>

Bởi vì đây không phải là tính năng thuần Android nên bạn sẽ cần tạo một Java Library module, không phải Android.

<div align="center"><img src="https://images.viblo.asia/0f92df59-fb5b-4244-8807-d5e1d5f0fd4b.png"></div><br/>
<div align="center"><img src="https://images.viblo.asia/a7808b5c-96cf-4e6c-ad08-20c506323bbe.png"></div>

Đối với hướng dẫn này, module sẽ được đặt tên là processor.
Đảm bảo rằng package name của bạn là chính xác theo quy tắc: **<base>.processor**.
Class name là file đơn giản đầu tiên được sinh ra trong thư viện, chúng ta chọn để đặt tên cho annotation processor của nó cái chúng ta sẽ tạo ra. 

## 2. Setting the source compatibility

Trong file **build.gradle** tại đường dẫn app của project, thiết lập android compile options:

<div align="center"><img src="https://images.viblo.asia/816d91ea-108e-43f5-8278-cd57c82b9688.png"></div><br />
Đối với hướng dẫn này các tùy chọn compile là:
<br />

```
compileOptions {
   sourceCompatibility JavaVersion.VERSION_1_7
   targetCompatibility JavaVersion.VERSION_1_7
}
```

<br />
<div align="center"><img src="https://images.viblo.asia/b9780218-4e4f-415a-99a9-a04743b0b959.png"></div><br />
Và trong file **build.gradle** của processor module:
<div align="center"><img src="https://images.viblo.asia/7bc64d40-34e3-4dc8-ad8a-e89126c87cfd.png"></div><br />
Thêm vào compatibility options:

```
sourceCompatibility = 1.7
targetCompatibility = 1.7
```

<div align="center"><img src="https://images.viblo.asia/5e949c43-2e1a-4737-bfc7-c48293aa0291.png"></div><br />
Chú ý rằng trong khi file gradle chỉ ra rầng các tham số này là không được sử dụng, chúng là cần thiết trong suốt quá trình build.

## 3. Creating the annotation

Trước khi chúng ta tạo ra processor, hãy tạo **CustomAnnotation.class** của mình giống như là một annotation trong module mới này.

<div align="center"><img src="https://images.viblo.asia/a79ac96d-94d6-429c-b097-9d654964298f.png"></div><br />
<div align="center"><img src="https://images.viblo.asia/332c6690-bb0d-40cd-9215-b9926161334d.png"></div><br />
Bây giờ, chúng ta sẽ rời khỏi auto-generated annotation trống bởi vì chúng ta chỉ quan tâm đến các thành phần mà đã được chú thích trong hướng dẫn này.
<div align="center"><img src="https://images.viblo.asia/dc06f187-26e9-4316-833a-4fd888879f70.png"></div><br />

## 4. Creating the processor
Lớp processor nên được kế thừa từ lớp **AbstractProcessor** và được chú thích với các đường dẫn đầy đủ của các loại annotation cái được kì vọng để được xử lý (đối với hướng dẫn này chỉ có một cái) như là phiên bản source của Java. Đối với hướng dẫn này, source version là Java 7 nhưng nếu project của bạn đang sử dụng Java 6 bạn nên sử dụng **RELEASE_6**.

```
@SupportedAnnotationTypes(“<fully qualified annotation path>”)
@SupportedSourceVersion(SourceVersion.RELEASE_7)
```

<div align="center"><img src="https://images.viblo.asia/78de0ec7-e910-4a08-a785-bf21781747bd.png"></div><br />
Các thức dễ nhất để lấy được đầu đủ đường dẫn của các loại annotation được hỗ trợ là copy nó và sử dụng khung project của Android Studio.
<div align="center"><img src="https://images.viblo.asia/23280730-e668-4d3f-bc84-59b5623e92f5.png"></div><br />
Nó là quan trọng cái bạn sử dụng một tên dường dẫn chính xác và đầy đủ nếu bạn thay đổi lớp sau đó, cái mà bạn cập nhập cho annotation này nếu không thi quá trình build sẽ gặp lỗi và quá trình truy tìm dấu vết của lỗi là không đơn giản.

<div align="center"><img src="https://images.viblo.asia/f9c33bf4-fca1-4a30-9248-deca2a084827.png"></div><br />
Android Studio bây giờ nên thông báo với bạn rằng bạn cần thực hiện phương thức **process**, do đó hãy thực hiện điều đó trước khi chuyển qua phần khác.

<div align="center"><img src="https://images.viblo.asia/8779f663-39ed-4727-aecc-50854986a1c8.png"></div><br />

Rồi thay phương thức **process** giống như bên dưới:

```
@Override
public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
   StringBuilder builder = new StringBuilder()
           .append("package com.stablekernel.annotationprocessor.generated;nn")
           .append("public class GeneratedClass {nn") // open class
           .append("tpublic String getMessage() {n") // open method
           .append("ttreturn "");


   // for each javax.lang.model.element.Element annotated with the CustomAnnotation
   for (Element element : roundEnv.getElementsAnnotatedWith(CustomAnnotation.class)) {
       String objectType = element.getSimpleName().toString();



       // this is appending to the return statement
       builder.append(objectType).append(" says hello!\n");
   }


   builder.append("";n") // end return
           .append("t}n") // close method
           .append("}n"); // close class



   try { // write the file
       JavaFileObject source = processingEnv.getFiler().createSourceFile("com.stablekernel.annotationprocessor.generated.GeneratedClass");


       Writer writer = source.openWriter();
       writer.write(builder.toString());
       writer.flush();
       writer.close();
   } catch (IOException e) {
       // Note: calling e.printStackTrace() will print IO errors
       // that occur from the file already existing after its first run, this is normal
   }


   return true;
}
```

<br />

Để đưa ra một ý tưởng khái niệm về cái gì xảy ra ở đây, **StringBuilder** đang được tạo ra một file Java với package name trong namespace được sinh ra. File này được nhận một phương thức đơn, **getMessage** cái sẽ trả về một chuỗi. Giá trị được trả về đó được sinh ra bởi quá trình tìm kiếm mỗi một annotations được hỗ trợ và quá trình tìm kiếm tên của thành phần liên quan tới annotation. Trong trường hợp của hướng dẫn này nó sẽ là **MainActivity* và **onCreate** như là hai phần tử đã được chú thích, do đó file được sinh ra sẽ trông như này:

<div align="center"><img src="https://images.viblo.asia/7881760f-acb7-47c3-8fb1-5f29a2a14231.png"></div><br />

Chú ý rằng file được sinh ra này nó được tạo trong quá trình xử lý build do đó bạn sẽ không có khả năng xem nó trừ khi sau đó project được build thành công. Đối với tham chiếu bạn sẽ tìm thấy file sau một quá trình build thành công trong đưởng dẫn:

```
app/build/generated/source/apt/debug/<package>/GeneratedClass.java
```

Cũng như, chúng ta đang viết một file nguồn ở đây thông qua **Writer** cái đảm bảo mục đích của chúng ta cho hiện tại nhưng quá trình ghi file sẽ phức tạp hơn bởi vì project của bạn được phát triển có thể được tạo ra dễ dàng bởi các thư viện của bên thứ 2 như [JavaPoet](https://github.com/square/javapoet).

## 5. Create the resource
Giờ đây chúng ta đã tạo processor của mình, chúng ta sẽ cần nói với Java để sử dụng nó bằng cách tạo một file javax processor, điều này là cái mà compiler nhìn thấy để biết rằng làm thế nào để xử lý các annotations. Các bước là các mảnh nhỏ tẻ nhạt, nhưng điều này là bởi vì processor mong đợi một cấu trúc cụ thể được đặt vào đúng chỗ.
<br />
**1. Từ đường dẫn chính của processor module, tạo một đường dẫn gọi là resources***<br />
**2. Với đường dẫn được tạo này, tạo một đường dẫn gọi là META-INF**<br />
**3. Với đường dẫn được tạo tạo một đường dẫn gọi là services**<br />
**4. Với đường dẫn được tạo tạo một file mới gọi là javax.annotation.processing.Processor**<br />

<div align="center"><img src="https://images.viblo.asia/3d13952e-e929-47a6-87b3-3ca888df480b.png"></div><br />
Bên trong file này, bạn sẽ đẩy vào tên đầy đủ của mỗi processors của bạn, được phân cách với nhau bởi một dòng mới. Chúng nên được tự hoàn thiện và trong thể hiện này, chúng ta chỉ có một do đó file của chúng ta sẽ trông như thế này.

<div align="center"><img src="https://images.viblo.asia/e6345510-59d6-4682-beea-128c071b2d57.png"></div><br />


## 6. Add android-apt
Tiếp theo, áp dụng **android-apt** plugin bằng cách cập nhật file **build.gradle** trước tiên trong project của bạn.

<div align="center"><img src="https://images.viblo.asia/477a7766-9e2e-40f8-9206-84c4d3e2e55a.png"></div><br />
Và thêm dependency vào buildscript:

```
 classpath 'com.neenbedankt.gradle.plugins:android-apt:1.8'
```

<div align="center"><img src="https://images.viblo.asia/edbb554d-1b7e-45f6-ba6a-3efcb5b003db.png"></div><br />

Sau đó là trong file **build.gradle** thuộc đường dẫn **app/**:

<div align="center"><img src="https://images.viblo.asia/a365fc81-e0f5-4001-b5cd-a573b0c36eb5.png"></div><br />

```
 apply plugin: 'com.neenbedankt.android-apt'
```

<div align="center"><img src="https://images.viblo.asia/81507b9b-356a-4024-9e30-b5c3acc52b56.png"></div><br />


## 7. Set build dependencies

Khái niệm chính của phần này đó là chúng ta cần biên dịch processor và annotation thành một jar và rồi đẩy file jar đó vào module app của mình cũng như làm cho tham chiếu tới nó được sẵn sàng. Nhưng điều này cần được thực hiện xong trước khi ứng dụng được build. Đầu tiên, chúng ta sẽ cập nhật các dependencies cho jar file giống như bên dưới:

```
dependencies {
   compile files('libs/processor.jar')
   testCompile 'junit:junit:4.12'
   compile 'com.android.support:appcompat-v7:23.1.1'
}
```

Rồi chúng ta sẽ tạo một gradle task cái sẽ di chuyển file jả vào thư mục **libs** của project:

```
task processorTask(type: Exec) {
   commandLine 'cp', '../processor/build/libs/processor.jar', 'libs/'
}
```

Cuối cùng, chusta thiết lập theo thứ tự của các dependecies, do đó, **:app:preBuild** phụ thuộc vào **processorTask** mới của chúng ta, cái phụ thuộc vào **:processor:build**.

```
processorTask.dependsOn(':processor:build')
preBuild.dependsOn(processorTask)
```

<div align="center"><img src="https://images.viblo.asia/74d76ad3-d767-4c0e-8d4f-5d3b43e93fc0.png"></div><br />

Do đó, thứ tự build sẽ là:

**1. :processor:build** sẽ sinh ra jar file với annotation của chúng ta và processor của nó.
**2. processTask** sẽ copy file jar tới thư mục **app/libs**.
**3. :app** module giờ đây sẽ có tham chiếu với jar file mới.

Nhằm thông báo rằng tất cả những điều xảy ra được thực hiện đúng như kì vọng: clean project đồng thời rebuild nó.
Hoặc trong termial có thể run lênh:

```
./gradlew :app:clean :app:build
```

và bạn sẽ thấy build process chạy một cách chính xác theo đúng trình tự và hoàn thành với một file **processor.jar** trong thư mục **app/libs** của project.

<div align="center"><img src="https://images.viblo.asia/ccbd6c33-0bc8-48f4-b605-a5a34263c712.png"></div><br />


## 8. Apply annotations
Giờ đây, file jar đó chứa đựng annotation và annotation processor trong ứng dụng android, chúng ta có thể tham chiếu tới **CustomAnnotation** và có thể ứng dụng nó với lớp được định nghĩa **MainActivity** và phương thức **onCreate**.

<div align="center"><img src="https://images.viblo.asia/6d8fa8e6-d30d-43df-971a-60464dc0388d.png"></div><br />


## 9. Verify annotations are working
Theo trình tự, để xác mình rằng các annotations đã được xử lý, chúng ta sẽ chạy một alert dialog bằng cách thêm vào mã nguồn cho **MainActivity.java** và gọi nó từ phương thức **onCreate**.

```
private void showAnnotationMessage() {
GeneratedClass generatedClass = new GeneratedClass();
String message = generatedClass.getMessage();
            // android.support.v7.app.AlertDialog
new AlertDialog.Builder(this)
.setPositiveButton("Ok", null)
.setTitle("Annotation Processor Messages")
.setMessage(message)
```

Nhưng chỉ áp dụng những annotations này sẽ không tạo ra các lớp tự dinh cái mà annotation processor hỗ trợ nhằm tạo, để thực hiện điều đó, chúng ta sẽ cần rebuild lại bằng cách **Build -> Rebuild** hoặc thực thi câu lệnh:

```
./gradlew :app:clean :app:build
```

và giờ đây, các file được sinh ra sẽ được nhìn thấy tại vị trí:

```
 app/build/generated/source/apt/debug/<package>/GeneratedClass.java
```

<div align="center"><img src="https://images.viblo.asia/14c0def2-b0bb-4849-82f4-8636f603ebbc.png"></div><br />
<div align="center"><img src="https://images.viblo.asia/64af026d-40d3-4a78-b849-757257817393.png"></div><br />


## 10. Running the build
Build và run trên thiết bị bạn sẽ thấy kết quả như sau:

<div align="center"><img src="https://images.viblo.asia/e4f0cc94-599b-41e2-b004-321ff2be3389.png"></div><br />

Đây là cơ bản về annotation processing: bằng cách áp dụng **@CustomAnnotation** chúng ta có thể chặn nó ở thời điểm build, tạo một file tự sinh, rồi tại lúc thực thi file tự sinh này có khả năng được sử dụng.

## Source
https://stablekernel.com/the-10-step-guide-to-annotation-processing-in-android-studio/
## Reference
***[Annotation Processing : Don’t Repeat Yourself, Generate Your Code.](https://viblo.asia/posts/RnB5pBw6ZPG)*** <br/>
***[@Eliminate("Boilerplate")](https://news.realm.io/news/360andev-ryan-harter-eliminate-boilerplate/)*** <br/>
***[Square/javapoet](https://github.com/square/javapoet)*** <br/>
***[The 10-Steps Guide to Annotation Processing in Android Studio](http://blog.stablekernel.com/the-10-step-guide-to-annotation-processing-in-android-studio)*** <br/>
***[erdemtopak/simple-annotation-processor](https://github.com/erdemtopak/simple-annotation-processor)*** <br/>
***[Custom Annotations in Android](https://engineering.wework.com/custom-annotations-in-android-af43514f2f1b)*** <br/>
***[Writing your own Annotation Processors in Android](https://medium.com/androidiots/writing-your-own-annotation-processors-in-android-1fa0cd96ef11)***