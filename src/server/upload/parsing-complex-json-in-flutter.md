Khi mới bắt đầu làm việc với các API trong Flutter, việc phân tích cú pháp JSON thực sự đã khiến tôi phải vật lộn rất nhiều. Và tôi chắc chắn, nó làm rất nhiều bạn mới bắt đầu cũng rơi vào hoàn cảnh như vậy. Ở bài viết này, tôi sẽ giới thiệu cho các bạn một số cách làm việc với json trong Flutter.
Ở đây tôi sẽ sử dụng thư viện dart: convert. Đây là phương pháp phân tích cú pháp cơ bản nhất và nó chỉ được khuyến nghị nếu bạn đang bắt đầu với Flutter hoặc bạn đang xây dựng một dự án nhỏ. Tuy nhiên, biết những điều cơ bản về phân tích cú pháp JSON trong Flutter là khá quan trọng. Khi bạn giỏi việc này hoặc nếu bạn cần làm việc với một dự án lớn hơn, hãy xem xét các thư viện tạo mã như json_serializable, v.v. Nếu có thể, tôi sẽ khám phá chúng trong các bài viết sau.

# JSON structure #1 : Simple map
Ở đây, tối có một chuỗi json gọi là student.json
```
{
  "id":"487349",
  "name":"Pooja Bhaumik",
  "score" : 1000
}
```
**- Quy tắc số 1: Xác định cấu trúc. Chuỗi json sẽ có là một Map (cặp khóa-giá trị) hoặc một List<'Map'>**
**- Quy tắc số 2: Bắt đầu bằng dấu ngoặc nhọn? Đó là một bản đồ. Bắt đầu bằng dấu ngoặc vuông? Đó là Danh sách các bản đồ. **

Hãy tạo file một lớp thế hiện cho cấu trúc json này. Ở đây tôi đặt tên cho nó là student_model.dart.
```
class Student{
  String studentId;
  String studentName;
  int studentScores;

  Student({
    this.studentId,
    this.studentName,
    this.studentScores
 });
}
```
Nếu để ý thì các bạn sẽ thấy không có ánh xạ nào giữa các chuỗi json và tệp PODO này. Ngay cả tên thực thể cũng không khớp. Vì vậy chúng ta phải thực hiện công việc ánh xạ các thành viên lớp này với đối tượng json. Để làm được điều đó, chúng ta cần tạo một phương thức **factory**. Theo tài liệu của Dart, chúng tôi sử dụng từ khóa factory khi triển khai một hàm tạo không phải lúc nào cũng tạo một phiên bản mới của lớp và đó là những gì chúng tôi cần ngay bây giờ. 

```
factory Student.fromJson(Map<String, dynamic> parsedJson){
    return Student(
      studentId: parsedJson['id'],
      studentName : parsedJson['name'],
      studentScores : parsedJson ['score']
    );
  }
```
Ở đây, chúng tôi đang tạo một phương thức gốc có tên là Student.fromJson có mục tiêu là giải mã json của bạn một cách đơn giản. 
Ngoài ra phải để ý tham số trong phương thức fromJson. Nó là một Map <String, dynamic> Nó có nghĩa là nó ánh xạ một khóa Chuỗi với một giá trị động. Đó chính xác là lý do tại sao chúng ta cần xác định cấu trúc. Nếu cấu trúc json này là một List<**Map**>, thì tham số này sẽ khác. 
# 2. Truy cập đối tượng 
Tạo file t student_services.dart để gọi tới Student.fromJson và truy xuất các giá trị từ đối tượng Student. 
## 2.1 Thêm phụ thuộc
```
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;
import 'dart:convert';
import 'package:flutter_json/student_model.dart';
```
## 2.1 Lấy dữ liệu
```
Future<String> _loadAStudentAsset() async {
  return await rootBundle.loadString('assets/student.json');
}
```
Trong ví dụ này, chúng tôi có các tệp json được để trong thư mục  asset.  Vì vậy chúng tôi phải tải json theo cách này. Nhưng nếu bạn có tệp json của mình trên đám mây, bạn có thể thực hiện cuộc gọi mạng. Các cuộc gọi mạng nằm ngoài phạm vi của bài viết này. 

## 2.3 Đọc kết quả trả về
```
Future loadStudent() async {
  String jsonString = await _loadAStudentAsset();
  final jsonResponse = json.decode(jsonString);
  Student student = new Student.fromJson(jsonResponse);
  print(student.studentScores);
}
```
Trong phương thức loadStudent () này,
Dòng 1: tải Chuỗi json thô từ nội dung.
Dòng 2: Giải mã chuỗi json thô này mà chúng tôi nhận được.
Dòng 3: Và bây giờ chúng ta đang giải mã phản hồi json đã giải mã bằng cách gọi phương thức Student.fromJson để bây giờ chúng ta có thể sử dụng đối tượng Student để truy cập các thực thể của chúng ta.
Dòng 4: Giống như chúng tôi đã làm ở đây, nơi chúng tôi in StudentScores từ lớp Student.
Kiểm tra bảng điều khiển Flutter của bạn để xem tất cả các giá trị in của bạn. (Trong Android Studio, trong tab Run của nó)
Lưu ý: Hãy nhớ 3 đoạn mã ở đây, chúng tôi sẽ sử dụng đoạn mã đó cho bộ phân tích cú pháp json tiếp theo (chỉ thay đổi tên tệp và tên phương thức) và tôi sẽ không lặp lại mã ở đây. 
# 3. Structure với arrays
Bây giờ chúng ta chinh phục một cấu trúc json tương tự như cấu trúc ở trên, nhưng thay vì chỉ có các giá trị đơn lẻ, nó cũng có thể có một mảng giá trị. 
```
{
  "city": "Mumbai",
  "streets": [
    "address1",
    "address2"
  ]
}
```
Ở đây. chúng tôi có một chuỗi json với address là một mảng  giá trị. Ở đây tôi sẽ tạo một file là address_model.dart để mô tả cấu trúc của đối tượng Address.
```
class Address {
  final String city;
  final List<String> streets;

  Address({
    this.city,
    this.streets
  });
}
```
Tiếp theo là đến function factory
```
factory Address.fromJson(Map<String, dynamic> parsedJson) {
  
  return new Address(
      city: parsedJson['city'],
      streets: parsedJson['streets'],
  );
}
```

Bây giờ, hãy xây dựng address_services.dart bằng cách thêm 3 đoạn mã mà chúng tôi đã đề cập ở trên. Phải nhớ đặt tên tệp và tên phương thức thích hợp. Dự án mẫu đã có address_services.dart được xây dựng cho bạn.
Bây giờ khi bạn chạy nó, bạn sẽ gặp một lỗi nhỏ. : / 
```
type 'List<dynamic>' is not a subtype of type 'List<String>'
```
Tôi cho bạn biết, những lỗi này đã đến trong hầu hết mọi bước phát triển của tôi với Dart. Và có thể bạn cũng sẽ gặp phải chúng. Vì vậy, hãy để tôi giải thích điều này có nghĩa là gì. Chúng tôi đang yêu cầu một List<**String**> nhưng chúng tôi nhận được một List<**dynamic**> vì ứng dụng của chúng tôi chưa thể xác định loại của chúng.
Vì vậy, chúng tôi phải chuyển đổi rõ ràng điều này thành một List <**String**> 
```
var streetsFromJson = parsedJson['streets'];
List<String> streetsList = new List<String>.from(streetsFromJson);
```
Ở đây, đầu tiên chúng ta đang ánh xạ các đường phố biến FromJson của chúng ta với Street object. Street.FromJson vẫn là một `List <dynamic>`. Bây giờ chúng ta tạo một `List <String>`  mới một cách rõ ràng chứa tất cả các phần tử từ Street.FromJson.
# 4. List of maps
Ở đây, tôi có một  chuỗi json là photo.json
```
[
  {
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "http://placehold.it/600/92c952",
    "thumbnailUrl": "http://placehold.it/150/92c952"
  },
  {
    "albumId": 1,
    "id": 2,
    "title": "reprehenderit est deserunt velit ipsam",
    "url": "http://placehold.it/600/771796",
    "thumbnailUrl": "http://placehold.it/150/771796"
  },
  {
    "albumId": 1,
    "id": 3,
    "title": "officia porro iure quia iusto qui ipsa ut modi",
    "url": "http://placehold.it/600/24f355",
    "thumbnailUrl": "http://placehold.it/150/24f355"
  }
]
```
Tiếp theo là class photo
```
class Photo{
  final String id;
  final String title;
  final String url;

  Photo({
    this.id,
    this.url,
    this.title
}) ;

  factory Photo.fromJson(Map<String, dynamic> json){
    return new Photo(
      id: json['id'].toString(),
      title: json['title'],
      url: json['json'],
    );
  }
}
```

Nhưng nó là `List<Photo>`, vì vậy điều này có nghĩa là bạn phải xây dựng một lớp có chứa `List<Photo>`
Vâng, tôi sẽ đề nghị điều đó. 
```
class PhotosList {
  final List<Photo> photos;

  PhotosList({
    this.photos,
  });
}
```
Cũng lưu ý, chuỗi json này là một `List<Map>`. Vì vậy, trong phương pháp gốc của chúng tôi, chúng tôi sẽ không có thông số Map <String, dynamic>, vì nó là một List. Và đó chính là lý do tại sao điều quan trọng là phải xác định cấu trúc trước tiên. Vì vậy, tham số mới của chúng tôi sẽ là một` List<dynamic>`. 
```
factory PhotosList.fromJson(List<dynamic> parsedJson) {

    List<Photo> photos = new List<Photo>();

    return new PhotosList(
       photos: photos,
    );
  }
```
Và bạn sẽ nhận được lỗi: `Invalid value: Valid value range is empty: 0`
Này, bởi vì chúng tôi không bao giờ có thể sử dụng phương pháp Photo.fromJson.
Điều gì sẽ xảy ra nếu chúng ta thêm dòng mã này sau khi khởi tạo danh sách? 
```
photos = parsedJson.map((i)=>Photo.fromJson(i)).toList();
```
Cùng một khái niệm như trước đó, chúng ta không cần phải ánh xạ điều này với bất kỳ khóa nào từ chuỗi json, bởi vì nó là một List,