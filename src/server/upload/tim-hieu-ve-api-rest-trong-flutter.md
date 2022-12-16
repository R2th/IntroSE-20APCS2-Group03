Chúng ta sẽ tìm hiểu cách chúng ta có thể truy cập API REST trong ứng dụng Flutter. Ngày nay, hầu hết các ứng dụng sử dụng dữ liệu từ xa bằng API. Vì vậy, phần này sẽ là phần quan trọng cho những nhà phát triển muốn tạo nhà cung cấp dịch vụ của họ trong Flutter.
 
Flutter cung cấp gói http để sử dụng data http. Gói http sử dụng các tính năng await và async và cung cấp nhiều phương thức cấp cao như phương thức read, get, post, put, head, and delete và nhận dữ liệu từ các vị trí từ xa. Các phương pháp này đơn giản hóa việc phát triển các ứng dụng di động dựa trên REST.
Giải thích chi tiết về các phương thức cốt lõi của gói http như sau:
 
Read: Phương thức này được sử dụng để đọc hoặc truy xuất biểu diễn của các data. Nó yêu cầu url được chỉ định bằng cách sử dụng phương thức get và trả về response là Future <Chuỗi>.
 
Get: Phương thức này yêu cầu url được chỉ định từ phương thức get và trả về một response là Future <response>. Ở đây, response là một lớp, chứa thông tin response.
 
Post: Phương pháp này được sử dụng để gửi dữ liệu đến các data được chỉ định. Nó yêu cầu url được chỉ định bằng cách đăng dữ liệu đã cho và trả về response dưới dạng Future <response>.
 
Put: Phương pháp này được sử dụng cho khả năng cập nhật. Nó cập nhật tất cả các biểu diễn hiện tại của data đích với các payloads. Phương thức này yêu cầu url được chỉ định và trả về response là Future <response > .
 
Head: Nó tương tự như phương thức Get, nhưng không có phần thân response.
 
Delete: Phương pháp này được sử dụng để loại bỏ tất cả các data được chỉ định.
Gói http cũng cung cấp một lớp client http tiêu chuẩn hỗ trợ kết nối liên tục. Lớp này hữu ích khi có nhiều yêu cầu được thực hiện trên một máy chủ cụ thể. Nó phải được đóng đúng cách bằng cách sử dụng phương thức close(). Nếu không, nó hoạt động như một lớp http. 
Đoạn code sau đây giải thích rõ ràng hơn.

   ```
 var client = new http.Client();
     try {
    print(await client.get(“https://www.google.com/?hl=vi”));
    }
    finally{
     client.close();
    }
```
Để tìm nạp dữ liệu từ internet, bạn cần làm theo các bước cần thiết sau:
    
Bước 1: Cài đặt gói http mới nhất và thêm vào dự án.
Để cài đặt gói http, hãy mở tệp pubspec.yaml trong thư mục dự án của bạn và thêm gói http vào phần phụ thuộc . Bạn có thể tải gói http mới nhất tại đây và thêm nó như:
 
```
 dependencies: 
    http: <latest_version>
```
Bạn có thể nhập gói http dưới dạng:

   `import ‘package:http/http.dart’ as http;`
    
Bước 2: Tiếp theo, tạo kết nối gói http.
Trong bước này, bạn cần thực hiện kết nối bằng cách sử dụng phương thức http.get ()
```
Future<http.Response> fetchPost() {
    return http.get("https://jsonplaceholder.typicode.com/posts/1");
}
```
    
Trong đoạn code trên, Future hoạt động bất đồng bộ. http.Response chứa data khi call thành công.
 
Bước 3: Bây giờ, chuyển đổi response nhận được thành đối tượng Dart.
 
Đầu tiên, bạn cần tạo một lớp Post . Lớp Post đã nhận dữ liệu từ response và bao gồm một phương thức khởi tạo gốc, tạo ra Post từ JSON. Bạn có thể tạo một lớp Post như bên dưới: 
```
class Port{
final int userId;
final int id;
final String title;
final String description;
Post({this.userId, this.id, this.title, this.description});

Factory Post.fromJson(Ma<String, dynamic> json){
    return Post(
       userId: json[‘userId’],
       id: json[‘id’],
       title: json[‘title’],
       description: json[‘description’],
    );
  }
}
```

Bây giờ, bạn phải chuyển đổi http.response thành Post. Đoạn code sau cập nhật hàm fetchPost () để trả về một <Post> trong Future.
    
   ```
 Future<Post> fetchPost() async {  
      final response = await http.get( Give the link of JSON file');  

      if (response.statusCode == 200) {  
           return Post.fromJson(json.decode(response.body));  
      } else {  
         throw Exception('Failed to load post');  
      }  
    } 
```
Bước 4: Fetch dữ liệu
Gọi phương thức fetchPost() trong initState() hoặc trong didChangeDependencies().
Phương thức init chỉ gọi 1 lần duy nhất khi thành công, và không bao giờ gọi lại. Nếu bạn muốn gọi lại API thì có thể thêm vào phương thức didChangeDepenndencies().

```
class _MyAppState extends State<MyApp> {  
Future<Post> post;  

@override  
void initState() {  
super.initState();  
post = fetchPost();  
} 
    
```
Bước 5: Cuối cùng, hiển thị dữ liệu. Bạn có thể hiển thị dữ liệu bằng cách sử dụng widget FutureBuilder. Widget này có thể hoạt động dễ dàng với các nguồn dữ liệu không đồng bộ. 
    
```
FutureBuilder<Post>(  
    future: post,  
    builder: (context, abc) {  
    if (abc.hasData) {  
      return Text(abc.data.title);  
    } else if (abc.hasError) {  
      return Text("${abc.error}");  
    }  
      return CircularProgressIndicator();  
  },  
);
```