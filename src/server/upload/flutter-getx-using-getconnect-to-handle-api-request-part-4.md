# Giới thiệu
Xin chào các bạn, lại là mình với series về GetX và Flutter. Ở phần trước của GetX mình đã hướng dẫn các bạn sử dụng GetX để implement multiple language cho ứng dụng mobile. GetX thực sự là một plugin tuyệt vời cho những lập trình viên đang và sẽ tiếp cận với Flutter, với GetX việc lập trình trở nên đơn giản hết khi plugin này đã tích hợp hầu như mọi thứ cơ bản nhất bạn cần trong một dự án Flutter. Hôm nay mình sẽ giới thiệu một component khác của GetX cũng hữu dụng không kém, đó là GetConnect. GetConnect sẽ cung cấp cho bạn giải pháp handle api mà không cần phải dùng đến một plugin nào khác nữa


Đọc thêm về GetX:

- [-Get - Make Flutter easy (Part 1)](https://viblo.asia/p/get-make-flutter-easy-part-1-eW65G1wJZDO)
 
- [Get - Make Flutter easy (Part 2)](https://viblo.asia/p/get-make-flutter-easy-part-2-4P856np15Y3)

- [GetX - Flutter - Multiple language support with GetX (Part 3)](https://viblo.asia/p/getx-flutter-multiple-language-support-with-getx-part-3-GrLZDDqBZk0)

# Tiến hành
Để có thể handle api chúng ta sẽ tạo một class extends từ class GetConnect. Class này mặt định sẽ chứa các component từ GetConnect để phục vụ cho việc call api. Ở đây mình sẽ tạo class UserProvider 
```
class UserProvider extends GetConnect {
  // Get request
  Future<Response> getUser(int id) => get('http://youapi/users/$id');
  // Post request
  Future<Response> postUser(Map data) => post('http://youapi/users', body: data);
  // Post request with File
  Future<Response<CasesModel>> postCases(List<int> image) {
    final form = FormData({
      'file': MultipartFile(image, filename: 'avatar.png'),
      'otherFile': MultipartFile(image, filename: 'cover.png'),
    });
    return post('http://youapi/users/upload', form);
  }

  GetSocket userMessages() {
    return socket('https://yourapi/users/socket');
  }
}
```
Trên đây là cách thao tác đơn giản nhất

Việc của bạn chỉ đơn giản là extends class GetConnect và thêm các method để giao tiếp với rest api: Get connect cung cấp đầy đủ các phương thức  GET / POST / PUT / DELETE, thậm chí là cả SOCKET để giao tiếp với websockets của bạn. 

Ngoài ra, GetConnect cùng cung cấp nhiều config hơn nữa để bạn có thể sử dụng nó một cách hoàn hảo nhất mà không gặp bất cứ trở ngại nào

Để config base URL cho tất cả giao tiếp api bạn chỉ việc  set nó trong hàm init()
```
httpClient.baseUrl = 'https://api.covid19api.com'
```

Để add một key bất kỳ vào header của request chỉ việc đơn giản như sau
```
httpClient.addRequestModifier((request) {
      request.headers['apikey'] = '12345678';
      return request;
    });
```

Để add Authenticator với các request
```
 httpClient.addAuthenticator((request) async {
      final response = await get("http://yourapi/token");
      final token = response.body['token'];
      // Set the header
      request.headers['Authorization'] = "$token";
      return request;
    });
```

Example đầy đủ như sau

```
class HomeProvider extends GetConnect {
  @override
  void onInit() {
    // All request will pass to jsonEncode so CasesModel.fromJson()
    httpClient.defaultDecoder = CasesModel.fromJson;
    httpClient.baseUrl = 'https://api.covid19api.com';
    // baseUrl = 'https://api.covid19api.com'; // It define baseUrl to
    // Http and websockets if used with no [httpClient] instance

    // It's will attach 'apikey' property on header from all requests
    httpClient.addRequestModifier((request) {
      request.headers['apikey'] = '12345678';
      return request;
    });

    // Even if the server sends data from the country "Brazil",
    // it will never be displayed to users, because you remove
    // that data from the response, even before the response is delivered
    httpClient.addResponseModifier<CasesModel>((request, response) {
      CasesModel model = response.body;
      if (model.countries.contains('Brazil')) {
        model.countries.remove('Brazilll');
      }
    });

    httpClient.addAuthenticator((request) async {
      final response = await get("http://yourapi/token");
      final token = response.body['token'];
      // Set the header
      request.headers['Authorization'] = "$token";
      return request;
    });

    //Autenticator will be called 3 times if HttpStatus is
    //HttpStatus.unauthorized
    httpClient.maxAuthRetries = 3;
  }
  }

  @override
  Future<Response<CasesModel>> getCases(String path) => get(path);
}
```

Ngoài ra còn rấ nhiều config khác nữa, nhưng mình chỉ đưa ra những config basic nhất hầu như luôn có ở các dự án. Các bạn có thể tìm hiểu sâu hơn ở các link sau nhé
https://pub.dev/packages/get#getresponsiveview

Repo: https://github.com/jonataslaw/getx/tree/master/example/lib/pages/home