## Getting Started
Trong công nghệ phần mềm, một trong những nguyên tắc chìa khoá nhằm tối đa hoá hiệu năng đó là **never repeat yourself**(Không lặp lại chính mình hay không thực hiện các thao tác lặp đi lặp lại). Nhằm phát triển nhanh chóng và hiệu quả, bạn nên tự động hoá các công việc lặp đi lặp lại. Hình dung rằng bạn phải viết các **getters/setters** cho mỗi model trong project của mình với hàng trăm models, phân tách JSON bằng tay hoặc viết một bản sao cho mỗi lớp. Cái được xem như là thật sự tồi tệ. Như vậy, hãy bước vào thế giới của code generation.

Code Generation cho các models của Flutter giúp bạn thực hiện các công việc buồn chán một các tự động, do đó bạn có thể tập trung vào những thứ quan trọng hơn. Tất cả bạn phải làm là viết các đoạn mã nguồn mẫu(cái phải viết lặp lại) chỉ một lần, và tạo một generator, cái sẽ sinh ra các files với mã nguồn dựa trên đoạn mã nguồn mẫu mà bạn đã định nghĩa.

Trong hướng dẫn này, bạn sẽ xây dựng một code generator cái tìm kiếm tất cả các biến của một lớp, lưu giữ chúng trong một map và sinh ra các **getters/setters** cho tất cả các biến có trong map. Bạn cũng sẽ học được những thứ bên dưới như:
* Khi nào sử dụng code generation.
* Làm thế nào để định nghĩa và sử dụng các annotations.
* Làm thế là để viết mã nguồn cho generator.
* Sử dụng **ElementVisitor** cho cái gì?
* Cấu hình **Builder** với **build.yaml**.
* Sinh ra các models trong một Flutter Project.

**Note**: Bài viết này đòi hỏi bạn có hiểu biết cơ bản về Flutter. Nếu bạn mới làm quen với Flutter, hãy tham khảo các cuốn sách hướng dẫn như **[Flutter Apprentice](https://www.raywenderlich.com/books/flutter-apprentice/)** hoặc **[Getting Started with Flutter](https://www.raywenderlich.com/4529993-getting-started-with-flutter)**

Vậy, không trì hoãn thêm nữa, hãy bắt đầu nào!

Đầu tiên, hãy tải starter project bằng cách click vào Download Materials trong phần link mở rộng. Một khi đã tải xuống, mở project với IDE của bạn và khám phá nó.

Xem xét folder structure - Nó là cần thiết cho project của bạn. Bạn sẽ xem xét một cách kĩ lưỡng cấu trúc này trong các phần tiếp theo, nhưng trước tiên, bạn nên tìm hiểu sâu hơn một chút về các khái niệm.

## Why Code Generation?
Code Generation có một vài ưu điểm trong một số tình huống nhất định. Đây là một vài lợi ích đó:
* **Data classes**: Các classes(lớp) loại này là khá đơn giản và bạn thường xuyên cần tạo nó với khối lượng lớn. Do đó, nó là ý tưởng tốt nhằm sinh ra chúng thay vì viết từng cái bằng tay.
* **Architecture boilerplate**: Hầu hết mỗi giải pháp kiến trúc sẽ bắt đầu với một vài đoạn code mẫu. Viết nó hết lần này qua lần khác là một công việc khá đau đầu. Điều này bạn có thể hạn chế, một phần lớp bằng quá trình sinh tự động các mã nguồn. [MobX](https://github.com/mobxjs/mobx.dart) là một ví dụ tuyệt vời cho điều này.
* **Common features/functions**: Hầu hết mọi lớp model sử dụng các phương thức xác định như **fromMap**, **toMap**, và **copyWith**. Với code generation, các lớp này có thể nhận được các functions bằng một câu lệnh duy nhất.

Code generation không chỉ tiết kiệm thời gian, nỗ lực mà còn tăng cường chất lượng mã nguồn về khía cạnh nhất quán và giảm thiểu lỗi. Bạn có thể mở bất cứ file được sinh ra nào theo nghĩa đen với một sự đảm bảo rằng nó sẽ hoạt động một cách hoàn hảo.

## Setting up Your Initial Project
Cấu trúc thư mục của dự án bao gồm 3 cấp: **annotations**, **generators** và **example**. Bạn có thể xem qua từng cái.

### The Annotations folder
Bên trong **annotations** là một thư mục **lib**, cái sẽ chứa các Dart files cho thư viện **annotations**. Thư mục **src** của nó sẽ chứa các files cái khai báo các annotations cho generators sử dụng. Cuối cùng **pubspec.yaml** định nghĩ các siêu dữ liệu(metadata) cho thư viện **annotations**. Nó là rất đơn giản, với **test: 1.3.4** chỉ là phần phụ thuộc mà nó cần.

### The Generators folder
Thư mục **lib** chứa đựng thư mục con **src** nhằm tổ chức một cách tốt hơn cho các files trong **builder**, **model_visitor** và **generator**.
Chi tiết về những thứ này sẽ được mô tả trong các phần sau.

Xem xét một chút **pubspec.yaml**:

```
name: generators
description: Getters and setters to save variables to and from Map
version: 1.0.0

environment:
  sdk: ">=2.7.0 <3.0.0"

dependencies:
  # 1
  build: 
  # 2
  source_gen:
  # 3
  annotations:
    path: ../annotations/

dev_dependencies:
  # 4
  build_runner:
  # 5
  build_test:
  test: ^1.0.0
```

Đây là những thứ đang xảy ra từ mã nguồn bên trên:
1. **build**: Một gói cái cho phép bạn theo dõi các lớp. Nó cho phép bạn truy cập tới các thành phần khác nhau của một lớp như biến, phương thức, và các phương thức khởi tạo. Bạn sẽ sử dụng cái này nhằm lấy được các tên biến cho quá trình sinh ra các getters/setters cho dự án của mình.
2. **source_gen**: Một API cung cấp đa dạng các tiện ích giúp cho việc sinh mã nguồn mà không cần tương tác với các gói ở mức thấp như **build** hay **analyzer**. Cái này sẽ giúp cho cuộc sống của bạn trở nên dễ dàng hơn rất nhiều.
3. **annotations**: thư viện bạn sẽ tạo sớm thôi. Các generators sử dụng nó cho việc nhận biết các lớp cần xử lý.
4. **build_runner**: Cho phép sinh ra các files từ mã nguồn Dart. Cái này là một **dev_dependency**; bạn sẽ chỉ sử dụng nó trong quá trình phát triển.
5. **build_test** và **test**: Cho quá trình kiểm thử các **generators**. Bạn không sử dụng chúng trong hướng dẫn này.

**Build.yaml**
Có một file khác cần lưu ý là **build.yaml**. Nó sẽ trông như thế này:

```
targets:
  $default:
    builders:
      generators|annotations:
        enabled: true

builders:
  generators:
    target: ":generators"
    # 1
    import: "package:generators/builder.dart"
    # 2
    builder_factories: ["generateSubclass", "generateExtension"]
    # 3
    build_extensions: { ".dart": [".g.dart"] }
    auto_apply: dependents
    build_to: cache
    applies_builders: ["source_gen|combining_builder"]
```

Đây là cấu hình mà **build_runner** cần để tìm kiếm các generators. Đây là một số thứ quan trọng cần chú ý:
1. **import** là đường dẫn tới **build.dart**, cái bạn sẽ tạo trong phần sau.
2. **builder_factories** chứa các tên phương thức cho các global functions cái trả về các generators. Bạn sẽ định nghĩa chúng sau.
3. Trong **build_extensions**, bạn chỉ định phần mở rộng của file được sinh ra - trong trường hợp này là "**.g.dart**".

**Note**: Nếu bạn cần tìm hiểu về **build.yaml**, tham khả thêm bài viết **[build.yaml format](https://github.com/dart-lang/build/blob/master/docs/build_yaml_format.md#targetbuilderconfig)** từ Dart team.

### The example folder
**example** là Flutter project cái bạn sẽ sử dụng các generators. Giờ đây, hãy bỏ qua nó và tập trong vào hai folders khác.

## Creating the Necessary Annotations
Annotations là các lớp dữ liệu cái chỉ ra các thông tin mở rộng về một thành phần mã nguồn. Họ cung cấp một cách thức nhằm thêm vào các siêu dữ liệu(metadata) cho các thành phần mã nguồn như là một class, method, hay variable.

Để ví dụ, **@override** annotation, cái bạn sử dụng khi triển khai một phương thức tư lớp cha trong một lớp con. Bằng cách sử dụng nó, bạn đang chỉ ra một cách rõ ràng rằng phương thức này là từ lớp cha.

**Note**: Các annotations luôn bắt đầu bằng kí tự **@**.

### Creating the Annotation Classes
Đi tới đường dẫn **annotations/lib/src** và tạo một file mới với tên là **subclass_method.dart**.
Tiếp theo, thêm vào đoạn mã nguồn bên dưới:

```
class SubclassAnnotation {
  const SubclassAnnotation();
}

const generateSubclass = SubclassAnnotation();
```

Lớp này là rỗng bởi vì trong trường hợp với project của chúng ta, chúng ta không cần bất cứ dữ liệu mở rộng nào trong annotation. Biến toàn cục **generateSubclass** là tên của annotation. Bạn sẽ sử dụng tên này để đánh dấu một lớp cho một generator. Bạn có thể tạo các annotations từ bất cứ lớp nào cái có một **const** constructor.

Tương tự, tạo một file khác với tên là **extension_method.dart** trong cùng thư mục và thêm vào đoạn code bên dưới:

```
class ExtensionAnnotation {
  const ExtensionAnnotation();
}

const generateExtension = ExtensionAnnotation();
```

Ở thời điểm này, bạn đã viết đồng thời các annotations, nhưng bạn đã thiếu một bước cuối cùng.
Tạo file **annotations.dart** trong thư mục **lib** với mã nguồn bên dưới:

```
library annotations;

export 'src/subclass_method.dart';
export 'src/extension_method.dart';
```

Trong mã nguồn bên trên, bạn xuất ra hai file của gói.

Tuyệt vời! Thư viện **annotations** đã hoàn thành. Tiếp theo, bạn sẽ di chuyển tới phần tạo các generators.

## Creating the Generators
Đây là nơi ma thuật xảy ra. Thư viện **generators** sẽ chứa tất cả các chi tiết triển khai cho quá trình sinh ra mã nguồn. Cái này tồn tại 4 files. Tiếp theo bạn sẽ đi qua từng cái một.

### Finding Annotated Classes with ModelVisitor
Trong thư mục **lib/src**, tạo **model_visitor.dart** với các imports bên dưới:

```
import 'package:analyzer/dart/element/visitor.dart';
import 'package:analyzer/dart/element/element.dart';
```

Ở đây, bạn thêm vào **visitor** và **element** từ **analyzer**. **visitor** cung cấp **SimpleElementVisitor**, cái cho phép bạn giám sát các lớp.
**element** cung cấp một API để truy cập vào các thành phần khác của lớp như **FieldElement** và **MethodElement**.

**Note**: Nếu bạn vẫn chưa lấy được các dependencies thì đây là thời gian làm điều đó. Chạy **flutter pub get** trong thư mục **generators**.

Bên dưới các imports thêm vào mã nguồn bên dưới:

```
// 1
class ModelVisitor extends SimpleElementVisitor<void> {
  // 2
  String className;
  final fields = <String, dynamic>{};

  // 3
  @override
  void visitConstructorElement(ConstructorElement element) {
    final elementReturnType = element.type.returnType.toString();
    // 4
    className = elementReturnType.replaceFirst('*', '');
  }

  // 5
  @override
  void visitFieldElement(FieldElement element) {
    final elementType = element.type.toString();
    // 7
    fields[element.name] = elementType.replaceFirst('*', '');
  }
}
```

Đây là những gì bạn thực hiện trong mã nguồn bên trên:
1. Bạn tạo lớp, **ModelVisitor**, cái kế thừa **SimpleElementVisitor**. **SimpleVisitor** có hầu hết các phương thức bạn cần, cái đã được triển khai.
2. Đối với dự án này, bạn cần truy cập tới tên lớp và tất cả các biến, do đó bạn thêm vào các biến này cho class. **fields** là một map chứa các thuộc tính liên quan tới biến như tên là **key** và loại dữ liệu của nó là **value**. Bạn sẽ cần cả hai cho quá trình sinh ra getters/setters.
3. Bạn ghi đè **visiConstructorElement** nhằm có được **className** bằng cách truy cập vào **type.returnType** đối với mỗi constructor được tìm thấy.
4. **elementReturnType** kết thúc với **&#42;**, cái bạn cần loại bỏ khỏi mã nguồn được sinh ra một cách chính xác.
5. **visitFieldElement** làm đầy các **fields** với các tên và loại dữ liệu của tất cả các biến được tìm thấy trong các lớp mục tiêu.
6. Một lần nữa **elementType** kết thúc với **&#42;**, cái bạn cần loại bỏ.

Tuyệt! Giờ đây bạn đã có các nguyên liệu, bạn có thể bắt đầu chế biến nó. :D

### Implementing a Generator for a Subclass
Generator đầu tiên bạn xây dựng nhằm sinh ra một subclass(lớp con) cái triển khai tất cả getters/setters. Tạo **subclass_generator.dart** trong thư mục **lib/src** và luôn luôn bắt đầu bằng việc thêm vào các phần phụ thuộc.

```
import 'package:build/src/builder/build_step.dart';
import 'package:analyzer/dart/element/element.dart';
import 'package:source_gen/source_gen.dart';

import 'package:annotations/annotations.dart';

import 'model_visitor.dart';
```

Tiếp theo, tạo **SubclassGenerator** kế thừa **GeneratorForAnnotation**.

```
class SubclassGenerator extends GeneratorForAnnotation<SubclassAnnotation> {}
```

**GeneratorForAnnotation** lấy các tham số generic type **SubclassAnnotation** cái từ thư viện **annotations** bạn đã tạo trước đó.
Về cơ bản, đây là nơi ánh xạ các generator tương ứng với annotation.

Để sinh ra mã nguồn từ một lớp, triển khai phương thức bên dưới cho lớp:

```
// 1
@override
String generateForAnnotatedElement(
    Element element, ConstantReader annotation, BuildStep buildStep) {

  // 2
  final visitor = ModelVisitor();
  element.visitChildren(visitor); // Visits all the children of element in no particular order.

  // 3
  final className = '${visitor.className}Gen'; // EX: 'ModelGen' for 'Model'.

  // 4
  final classBuffer = StringBuffer();

  // 5
  classBuffer.writeln('class $className extends ${visitor.className} {');

  // 6
  classBuffer.writeln('Map<String, dynamic> variables = {};');

  // 7
  classBuffer.writeln('$className() {');

  // 8
  for (final field in visitor.fields.keys) {
    // remove '_' from private variables
    final variable =
        field.startsWith('_') ? field.replaceFirst('_', '') : field;

    classBuffer.writeln("variables['${variable}'] = super.$field;");
    // EX: variables['name'] = super._name;
  }

  // 9
  classBuffer.writeln('}');

  // 10
  generateGettersAndSetters(visitor, classBuffer);

  // 11
  classBuffer.writeln('}');

  // 12
  return classBuffer.toString();
}
```

Đây là cái sẽ hoạt động từ mã nguồn bên trên:
1. Bạn ghi đè **generateForAnnotatedElement**, cái lấy một **element**. Trong trường hợp này, **element** đó là một class. Bạn không cần các tham số khác trong trường hợp đơn giản này. **String** trả về chứa trong mã nguồn được sinh ra.
2. Bắt đầu bằng các ghé thăm con của lớp.
3. Rồi, tạo **classname** cho mỗi lớp được sinh ra.
4. Bởi vì bạn cần làm việc với rất nhiều **String**, sử dụng **StringBuffer** là một lựa chọn tốt.
5. Đây là điểm nơi mà bạn bắt đàu viết các dòng lệnh sinh ra mã nguồn. Tạo lớp cái kế thừa một lớp mục tiêu.
6. Tiếp theo, tạo một map **variables** cái sẽ lưu tất cả các biến của lớp.
7. Thêm vào constructor cho lớp.
8. Gán các biến của lớp vào map. **field** đại diện cho tên của biến.
9. Kết thúc phần thân của constructor.
10. gọi **generateGetterAndSetters** - tốt, nhằm sinh ra các getters/setters cho tất cả các biến.
11. đóng constructor.
12. trả về mã nguồn được sinh ra như là một chuỗi duy nhất.

Bên dưới, thêm vào quá trình định nghĩa:

```
void generateGettersAndSetters(
      ModelVisitor visitor, StringBuffer classBuffer) {

// 1
for (final field in visitor.fields.keys) {
  
  // 2
  final variable =
      field.startsWith('_') ? field.replaceFirst('_', '') : field;

  // 3
  classBuffer.writeln(
      "${visitor.fields[field]} get $variable => variables['$variable'];");
  // EX: String get name => variables['name'];

  // 4
  classBuffer
      .writeln('set $variable(${visitor.fields[field]} $variable) {');
  classBuffer.writeln('super.$field = $variable;');
  classBuffer.writeln("variables['$variable'] = $variable;");
  classBuffer.writeln('}');

  // EX: set name(String name) {
  //       super._name = name;
  //       variables['name'] = name;
  //     }
  }
}
```

Đây là những gì bạn đã thực hiện trong mã nguồn bên trên:
1. Bạn lặp lại cho tất cả các tên biến.
2. Ở đây, bạn xoá bỏ **&#95;** cho các biến cục bộ(private variables) của lớp cơ sở.
3. cái này viết mã nguồn getter. **visitor.fields[field]** đại diện cho loại dữ liệu của biến.
4. Cái này viết mã nguồn setter.

Xong! Generator đầu tiên đã sẵn sàng, do đó hãy chuyển tới cái thứ hai.

### Implementing a Generator for an Extension
Thời điểm này, bạn sẽ sinh ra các getters/setters cho mỗi biến như là các phương thức của một phần mở rộng. Mặc dù có một cách thức khác với cái bạn sử dụng bên trên mà vẫn đạt được mục đích tương tự, vậy thì hầu hết mã nguồn sẽ là tương tự như trong **SubclassGenerator**.
Tạo **extension_generator.dart** trong thư mục **lib/src** và nhập vào mã nguồn bên dưới:

```
// 1
import 'package:build/src/builder/build_step.dart';
import 'package:analyzer/dart/element/element.dart';
import 'package:source_gen/source_gen.dart';

import 'package:annotations/annotations.dart';

import 'model_visitor.dart';

// 2
class ExtensionGenerator extends GeneratorForAnnotation<ExtensionAnnotation> {

  // 3
  @override
  String generateForAnnotatedElement(
      Element element, ConstantReader annotation, BuildStep buildStep) {

  // 4
  final visitor = ModelVisitor();
  element.visitChildren(visitor);

  final classBuffer = StringBuffer();

  // 5
  classBuffer.writeln('extension GeneratedModel on ${visitor.className} {');
  // EX: extension GeneratedModel on Model {

  // 6
  classBuffer.writeln('Map<String, dynamic> get variables => {');

  // 7
  for (final field in visitor.fields.keys) {
    final variable =
        field.startsWith('_') ? field.replaceFirst('_', '') : field;

    classBuffer.writeln("'$variable': $field,"); // EX: 'name': _name,
  }

  // 8
  classBuffer.writeln('};');
  
  // 9
  generateGettersAndSetters(visitor, classBuffer);

  // 10
  classBuffer.writeln('}');

  // 11
  return classBuffer.toString();
  }
}
```

Trong mã nguồn bên trên bạn đã:
1. Thêm vào các gói cần thiết.
2. Tạo lớp với **ExtensionAnnotation** như là một tham số generic type.
3. Triển khai phương thức tương tự như bạn đã làm với **SubclassGenerator**.
4. Ghé qua lớp con vào khởi tạo **StringBuffer**.
5. Ở đây bắt đầu có khác biệt. Bắt đầu mở rộng **GeneratedModel**.
6. Bắt đầu cho getter cho **variables** map.
7. Thêm phần tử vào **variables** map.
8. Một lần nữa gọi **generatedGettersAndSetters**.
9. Trả về mã nguồn được sinh ra.

Như với phương thức thứ hai của lớp, thêm vào mã nguồn bên dưới:

```
void generateGettersAndSetters(
      ModelVisitor visitor, StringBuffer classBuffer) {
// 1
for (final field in visitor.fields.keys) {
  // 2
  final variable =
      field.startsWith('_') ? field.replaceFirst('_', '') : field;

  // 3 getter
  classBuffer.writeln(
      "${visitor.fields[field]} get $variable => variables['$variable'];");
  // EX: String get name => variables['name'];

  // 4 setter
  classBuffer.writeln(
      'set $variable(${visitor.fields[field]} $variable)');
  classBuffer.writeln('=> $field = $variable;');
  // EX: set name(String name) => _name = name;
  }
}
```

Mã nguồn bên trên viết các phương thức mở rộng cho getters/setters.
1. Một lần nữa, lặp lại với tất cả các tên biến.
2. Ở đây, bạn xoá bỏ **&#95;** cho các biến cục bộ(private variables).
3. Chỗ này viết mã nguồn getters.
4. Chỗ này viết mã nguồn setters.

Đây chỉ là cách thay thế nhằm sinh ra model. Thử nhiều cách thức khác nhau để giải quyết vấn đề sẽ giúp bạn hiểu hơn các khái niệm cũng như điểm mạnh, yếu của các giải pháp.
Giờ đây các generators đã hoàn thiện, giờ là thời điểm tạo các builders từ chúng.

### Making Builders from Generators
Trong **build.yaml** bạn cấu hình **build_runner** nhằm tìm kiếm **builder.dart**. Như vậy, tương tự với bước cuối cùng, tạo **builder.dart** trong thư mục **lib** và thêm vào mã nguồn bên dưới:

```
// 1  
import 'package:build/build.dart';
// 2
import 'package:source_gen/source_gen.dart';

// 3
import 'src/extension_generator.dart';
import 'src/subclass_generator.dart';

// 4
Builder generateExtension(BuilderOptions options) =>
    SharedPartBuilder([ExtensionGenerator()], 'extension_generator');
Builder generateSubclass(BuilderOptions options) =>
    SharedPartBuilder([SubclassGenerator()], 'subclass_generator');
```

Đây là những gì mà mã nguồn trên thực hiện:
1. Bạn thêm vào **build** nhằm truy cậpt tới **Builder**. Lớp cơ sở này chịu trách nhiệm cho việc sinh ra các files từ một cái đã tồn tại.
2. **source_gen** cung cấp một số buidlers được triển khai sẵn cái xử lý các trường hợp thông thường trong quá trình sinh mã nguồn. Trong trường hợp này, bạn cần **SharedPartBuilder**, cái biểu diễn **part of** files.
3. Ở đây, bạn thêm vào(import) các generators bạn đã tạo ở bên trên.
4. Các functions này trả về **Builder** cho mỗi hai generators. **SharedPartBuilder** lấy một danh sách các generators như là các tham số nhằm sinh ra mã nguồn. Để tạo cho mỗi builder là duy nhất, bạn cũng cần cung cấp một định danh(identifier). Các functions này đơn giản và phù hợp với trường hợp này, nhưng bạn luôn có năng lực nhằm cấu hình **Builder** nhiều hơn thông quan **BuilderOptions**.

**Note**: **part of** là một chỉ thị của dart cái cho phép bạn truy cập vào các biến hoặc phương thức cục bộ(private variables or private methods) từ một file khác.

Vậy là chúng ta đã hoàn toàn hoàn thiện các generators và builders. Giờ là lúc kiểm thử chúng.

## Testing Generators
Như đã đề cập từ trước, bạn sẽ sử dụng **example** project nhằm kiểm thử mã nguồn được sinh ra.
Ở nó với IDE ưu thích của bạn và xem xét các dependencies trong **pubspec.yaml** của dự án.

```
dependencies:
  annotations:
    path: ../annotations/

dev_dependencies:
  build_runner:
  generators:
    path: ../generators/
```

File trong dự án ban đầu đã thêm vào các **annotations** và **generators** của bạn cũng như **build_runner**.
**annotations** là phần phụ thuộc bạn sẽ sử dụng trong quá trình biên dịch dự án.
**build_runner** và **generators** là **dev_dependencies** bởi vì bạn chỉ sử dụng nó trong suốt quá trình phát triển.

Lấy về các dependencies bằng các nhấn vào **Get Packages** button trên AS, hoặc thực hiện điều tương tự trên IDE của mình.

Giờ đây, tạo model bạn muốn sinh ra getters/setters cho nó. Hướng tới thư mục **lib** và tạo **profile_model.dart**, giống như thế này:

```
// 1
import 'package:annotations/annotations.dart';

// 2
part 'profile_model.g.dart';

// 3
@generateSubclass
class ProfileModel { 
  // 4
  String _name = 'Aachman';
  int _age = 20;
  bool _codes = true;
}
```

Mã nguồn ở đây thực hiện những gì:
1. Đầu tiên, bạn thêm vào annotations package.
2. Bạn thêm **part 'profile_model.g.dart';** nhằm thêm vào file được sinh ra như là một phần của file gốc.
3. Sử dụng **@generateSubclass** annotation, bạn thông báo cho **SubclassGenerator** nhằm sinh ra mã nguồn.
4. Chú ý tất cả các trường đều là cục bộ(private). Mã nguồn được sinh ra sẽ làm cho chúng trở thành toàn cục(public).

Bạn có thể bỏ qua thông báo lỗi: **Target of URI hasn't been generated: 'profile_model.g.dart'**. Đây là một thông báo lỗi tượng trưng khi sử dụng generated code cái bạn vẫn chưa sinh ra(Chưa chạy lệnh build của build_runner).

## Generating the Code
Bây giờ, là lúc bạn đã chờ đợi xem có gì xảy ra. Đó là là thời điểm chúng ta tiến hành sinh mã nguồn.

Chạy câu lệnh này trong terminal:

```
flutter pub run build_runner build
```

Bạn sẽ thấy cái gì đó giống như thế này trong terminal console log:

```
[INFO] Generating build script...
[INFO] Generating build script completed, took 474ms

[INFO] Creating build script snapshot......
[INFO] Creating build script snapshot... completed, took 13.8s

[INFO] Initializing inputs
[INFO] Building new asset graph...
[INFO] Building new asset graph completed, took 793ms

[INFO] Checking for unexpected pre-existing outputs....
[INFO] Checking for unexpected pre-existing outputs. completed, took 1ms

[INFO] Running build...
[INFO] Generating SDK summary...
[INFO] 4.3s elapsed, 0/2 actions completed.
[INFO] Generating SDK summary completed, took 4.3s

[INFO] Running build completed, took 5.0s

[INFO] Caching finalized dependency graph...
[INFO] Caching finalized dependency graph completed, took 51ms

[INFO] Succeeded after 5.0s with 2 outputs (7 actions)
```

Chúc mừng! Bạn sẽ thấy một file mới với tên là: **profile_model.g.dart** được sinh ra trong thư mục **lib**.
Kiểm tra lại xem nó có giống như thế này không?

```
// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'profile_model.dart';

// **************************************************************************
// SubclassGenerator
// **************************************************************************

class ProfileModelGen extends ProfileModel {
  Map<String, dynamic> variables = {};
  ProfileModelGen() {
    variables['name'] = super._name;
    variables['age'] = super._age;
    variables['codes'] = super._codes;
  }
  String get name => variables['name'];
  set name(String name) {
    super._name = name;
    variables['name'] = name;
  }

  int get age => variables['age'];
  set age(int age) {
    super._age = age;
    variables['age'] = age;
  }

  bool get codes => variables['codes'];
  set codes(bool codes) {
    super._codes = codes;
    variables['codes'] = codes;
  }
}
```

OK. Giờ đây ở file: **main.dart** và kiểm tra mã nguồn được sinh ra của chúng ta. Đầu tiên, import model của bạn:

```
  import 'profile_model.dart'; 
```

Sau đó, bên phải **&#95;ProfilePageState**, thêm một dòng như thế này:

```
class _ProfilePageState extends State<ProfilePage> {
  ProfileModelGen profile = ProfileModelGen();
  ...
}
```

Ở đây, bạn tạo một thể hiện của **ProfileModelGen** cái mà bạn muốn kiểm thử.
Tìm kiếm cho chuỗi **?** trong một **Text** widget và thay đổi như thế này:

```
    child: Text(profile.name.substring(0, 1), 
```

Ở đây, bạn sử dụng getter được sinh ra cho biến **name** thay cho **?**.

Ở đây cũng có một kiểm thử khác bạn có thể chạy: Kiểm tra nếu **variables** map chứa tất cả các biến của model. Tìm đoạn có comment: **//TODO Display the values in the map** và thay nó như thế này:

```
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [ // TODO Display the values in the map
    // 1
    for (String key in profile.variables.keys.toList())
      RichText(
        text: TextSpan(children: [
          TextSpan(
            // 2
            text: '$key: '.toUpperCase(),
            style: TextStyle(
              fontSize: 24,
              color: Colors.grey[600],
            ),
          ),
          TextSpan(
            // 3
            text: '${profile.variables[key]}',
            style: TextStyle(
              fontSize: 36,
              color: Colors.green[200],
              fontWeight: FontWeight.bold,
              fontStyle: FontStyle.italic,
            ),
          ),
        ]),
      )
  ],
)
```

Mã nguồn bên trên thực hiện như thế này:
1. **for loop** lặp lại tất cả các **keys** của **variables** map của profile.
2. Phần đầu tiên của **RichText** hiển thị key, cái là tên của biến.
3. Phần thứ hai hiển thị giá trị lưu trữ của biến.

Biên dịch và chạy ứng dụng. Ứng dụng sẽ trông như thế này:

<div align="center"><img src="https://images.viblo.asia/92660687-ee80-4b81-bc73-e61a4e2bbc5f.png" /></div><br />

Điều đó có nghĩa là **SubclassGenerator** làm việc hoàn hảo.

Để kiểm thử cho generator thứ hai, chỉ cần thay đổi annotation thành **@generateExtension**:

```
@generateExtension
class ProfileModel {
  String _name = 'Aachman';
  int _age = 20;
  bool _codes = true;
}
```

Bạn cần chạy lại câu lệnh sinh ra file. Tuy nhiên, bởi vì một file đã được sinh ra, bạn cần xoá nó đi trước. Không cần phải làm việc này bằng tay, thay vào đó thêm vào câu lệnh **--delete-conflicting-outputs**.

```
flutter pub run build_runner build --delete-conflicting-outputs
```

Console output của terminal sẽ khá giống với **SubclassGenerator**, nhưng file mới sẽ được sinh ra giống như thế này:

```
// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'profile_model.dart';

// **************************************************************************
// ExtensionGenerator
// **************************************************************************

extension GeneratedModel on ProfileModel {
  Map<String, dynamic> get variables => {
        'name': _name,
        'age': _age,
        'codes': _codes,
      };
  String get name => variables['name'];
  set name(String name) => _name = name;
  int get age => variables['age'];
  set age(int age) => _age = age;
  bool get codes => variables['codes'];
  set codes(bool codes) => _codes = codes;
}
```

Trong file **main.dart**, thay **ProfileModelGen** với **ProfileModel**:

```
ProfileModel profile = ProfileModel();
```

Biên dịch và chạy! Mọi thứ vẫn làm việc tương tự.

Như vậy là bạn đã thực hiện xong. Bạn đã xây dựng thư viện sinh mã nguồn cho riêng mình.
Hãy tự do khám phá các API khác được cung cấp bởi **source_gen** và **build** nhằm tạo thêm sức mạnh cho công cụ sinh mã nguồn của mình.

## Where to Go from Here?
Bạn có thể tải về các file hoàn thiện của dự án theo link này(Download Materials).

Nếu bạn muốn tìm hiểu thêm vào code generation, đây là một vài tài nguyên hữu ích:
* **[Source Generation and Writing Your Own Package](https://youtu.be/mYDFOdl-aWM)**
* **[How to speed up code generation with build runner in Dart & Flutter](https://codewithandrea.com/tips/speed-up-code-generation-build-runner-dart-flutter/)**
* **[The freezed code generator](https://pub.dev/packages/freezed)**
* **[build_runner package](https://pub.dev/packages/build_runner)**
* **[source_gen package](https://pub.dev/packages/source_gen)**

## Source
https://www.raywenderlich.com/22180993-flutter-code-generation-getting-started

## Reference


## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))