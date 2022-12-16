## I. Introduction.
Networking Module là một phần không thể thiếu của hầu hết các ứng dụng mobile nói chung cũng như ứng dụng Flutter nói riêng.
Hôm nay mình sẽ trình bày cách xây dựng một network module cho ứng dụng flutter để đáp ứng một số trường hợp sử dụng cơ bản như: parse json sử dụng Freezed, change base url lúc runtime, mock data, refresh token, xử lý base response,...

## II. Build the network module.
Phần xây dựng network module này dựa trên ý tưởng xây dựng Clean Network Layer các bạn có thể tham khảo chi tiết ở [đây](https://ercangp.medium.com/clean-network-layer-in-flutter-dio-freezed-json-annotation-f5f2c41ac240).
Về cơ bản phần networking này được xây dựng thành 4 lớp khác nhau bao gồm:
* **Network connectivity**: Kiểm tra kết nối internet sử dụng [connectivity_plus](https://pub.dev/packages/connectivity_plus).
* **Network Creator**: Tạo request sử dụng Dio.
* **Network Decoding**: Phân tách dữ liệu trả về sử dụng [Freezed](https://pub.dev/packages/freezed), [json_annotation](https://pub.dev/packages/json_annotation), [json_serializable](https://pub.dev/packages/json_serializable).
* **Result Wrapping**: Xử lý dữ liệu thô.

Về cơ bản, phần network module này vẫn được mình xây dựng dựa trên ý tưởng của bài viết gốc: [Clean Network Layer](), tuy nhiên, mình có chỉnh sửa một chút phần về base response + cơ chế decode json từ kết quả trả về.
Việc chỉnh sửa và thêm vào một số thư viện cũng nhằm xử lý một số use cases thường gặp với một network module như: thay đổi url lúc runtime, mock response,....

### 1. Network Executor
Đây là network layer đầu tiện thực hiện nhiệm vụ thực thi một http request từ client. Lớp này thực hiện tất cả tiến trình của chúng ta. Đầu tiên, nó kiểm tra kết nối internet, nếu có kết nối, nó sẽ gọi đến network creator để toạ ra một request và thực hiện lời gọi tới server.
Dữ liệu từ server trả về được chuyển đổi thành các response model tương ứng với các trường hợp gọi API thành công hoặc lỗi.

```
class NetworkExecuter{

  static bool debugMode = true;

  static Future<Result<K,NetworkError>> execute<T extends BaseNetworkModel, K>({required BaseClientGenerator route,required T responseType,NetworkOptions? options}) async {
    if(debugMode) print(route);

    // Check Network Connectivity
    if (await NetworkConnectivity.status) {

      try {
        var response = await NetworkCreator.shared.request(route: route,options: options);
        var data = NetworkDecoder.shared.decode<T, K>(response: response, responseType: responseType);
        return Result.success(data);

        // NETWORK ERROR
      } on DioError catch (diorError) {
        if(debugMode) print("$route => ${NetworkError.request(error: diorError)}");
        return Result.failure(NetworkError.request(error: diorError));

        // TYPE ERROR
      } on TypeError catch (e) {
        if(debugMode) print("$route => ${NetworkError.type(error: e.toString())}"); 
        return Result.failure(NetworkError.type(error: e.toString()));
      }

      // No Internet Connection
    } else {
      if(debugMode) print(NetworkError.connectivity(message: 'No Internet Connection'));
      return Result.failure(NetworkError.connectivity(message: 'No Internet Connection'));
    }
  }
}
```

Nhìn vào mã nguồn, các bạn có thể thấy, ở đây dữ liệu trả về được đóng gói vào đối tượng gọi là **Result**.

```
import 'package:freezed_annotation/freezed_annotation.dart';
part 'result.freezed.dart';

@freezed
class Result<T,E extends Exception> with _$Result<T,E>{
  const factory Result.success(T data) = _Success;
  const factory Result.failure(E error) = _Failure;
}
```

Trong đối tượng này, chúng ta định nghĩa 2 factory methods tương ứng nhằm đóng gói kết quả trả về input là 2 đối tượng T(Generic type khi dữ liệu trả về là thành công) và E(Generic type đối với trường hợp gặp lỗi).
T là response model, một subclass của BaseNetworkModel, còn E là network error được định nghĩa với các trường hợp tương ứng như sau:

```
@freezed
class NetworkError with _$NetworkError implements Exception{

  const NetworkError._() : super();

  const factory NetworkError.request({required DioError error}) = _ResponseError;
  const factory NetworkError.type({String? error}) = _DecodingError;
  const factory NetworkError.connectivity({String? message}) = _Connectivity;

  // Localize the error message.
  String? get localizedErrorMessage {
    return this.when<String?>(
      type: (error) => error,
      connectivity: (message) => message,
      request: (DioError error) => error.message,
    );
  }

}
```

Ở đây chúng ta định nghĩa 3 loại lỗi là:
**1. Request Error**: Là các lỗi liên quan tới http request như connection timeout, http errors, respone bị huỷ,...
**2. Type Error**: Chứa các lỗi liên quan tới phân tách dữ liệu trả về(parse json), ép kiểu các loại dữ liệu,.... Loại lỗi này chúng ta cũng có thể sử dụng cho các trường hợp gặp lỗi của riêng mình theo bussiness đặc thù của ứng dụng. Cái này mình sẽ trình bày kĩ hơn ở phần sau.
**3. Connectivity Error**: Những lỗi liên quan tới không có kết nối.

### 2. Network Connectivity
Lớp này sử dụng thư viện [connectivity_plus](https://pub.dev/packages/connectivity_plus) một plugin cho phép ứng dụng Flutter kiểm trả kết nối của thiết bị.

```
class NetworkConnectivity {
  static Future<bool> get status async {
    var connectivityResult = await (Connectivity().checkConnectivity());
    if (connectivityResult == ConnectivityResult.none) {
      return false;
    } else {
      return true;
    }
  }
}
```

### 3. Network Creator
Lớp này sử dụng Dio để tạo ra các request từ các tham số truyền vào thông qua routes và network options.

```
class NetworkCreator {
  static var shared = NetworkCreator();
  Dio _client = Dio();

  Future<Response> request({required BaseClientGenerator route,NetworkOptions? options}) {
      return _client.fetch(RequestOptions(
        baseUrl: route.baseURL,
        method: route.method,
        path: route.path,
        queryParameters: route.queryParameters,
        data: route.body,
        sendTimeout: route.sendTimeout,
        receiveTimeout: route.sendTimeout,
        onReceiveProgress: options?.onReceiveProgress,
        validateStatus: (statusCode) => (statusCode! >= HttpStatus.ok && statusCode <= HttpStatus.multipleChoices)
      ));
  }
}
```

Các bạn có thể thấy, ở đây chúng ta sử dụng phương thức fetch của Dio cho tất cả các requests, điều này giúp cho chúng ta có thể dễ dàng thay đổi các tham số nhằm đáp ứng tất cả các http request types sau này, cũng như linh hoạt thay đổi các thông số thông qua các clients được tạo ra bằng việc kế thừa lớp **BaseClientGenerator**

```
abstract class BaseClientGenerator{
  const BaseClientGenerator();
  String get path;
  String get method;
  String get baseURL;
  dynamic get body;
  Map<String,dynamic>? get queryParameters;
  Map<String,dynamic> get header;
  int? get sendTimeout => 30000;
  int? get receiveTimeOut => 30000;
}
```

### 4. Network Decoder
Đây là network layer nhằm phân tách dữ liệu trả về(dạng json).

```
class NetworkDecoder {
  static var shared = NetworkDecoder();
  K decode<T extends BaseNetworkModel, K>({required Response<dynamic> response, required T responseType}) {
    try {
      if (response.data is List) {
        var list = response.data as List;
        var dataList = List<T>.from(list.map((item) => responseType.fromJson(item)).toList()) as K;
        return dataList;
      } else {
        var data = responseType.fromJson(response.data) as K;
        return data;
      }
    } on TypeError catch (e) {
      throw e;
    }
  }
}
```

Nhìn qua source code, các bạn cũng có thể thấy ở đây chúng ta có hàm decode với input là một Generic Object T là một subclass của **BaseNetowrkModel** cái cung cấp cho chúng ta một abstract method là **fromJson** với source code như sau:

```
abstract class BaseNetworkModel<T> {
  T fromJson(Map<String, dynamic> json);
}
```

Nếu như các bạn đã từng sử dụng [Freezed](https://pub.dev/packages/freezed) thì sẽ biết được rằng nó không hỗ trợ việc kế thừa, do đó một object được gắn annotation @freezed sẽ không thế kế thừa từ một class khác.
Nên ở đây bạn không thể sử dụng Freezed cho các response của mình. Từ đó sẽ không nhận được những tiện ích tuyệt vời mà nó mang lại như: Tự động sinh các hàm **fromJson**, **toJson**, các hàm tiện ích khác như: **toString**, **equal**, **copyWith**,... cùng với quá trình chỉnh sửa model(Thêm, bớt, thay đổi các fields) một cách dễ dàng mà Freezed mang lại.
Đặc biệt sẽ có rất nhiều rắc rối trong việc override lại phương thức **fromJson** của **BaseNetworkModel**.
Đây chính là điểm yếu của Freezed mà chúng ta sẽ phải tìm cách để xử lý, đặc biệt khi chúng ta cần dựa vào base response để xử lý một số trường hợp chung như: meta data phục vụ cho quá trình phân trang, một số status, message đặc biệt từ server,...

Tuy nhiên, ở phần tiếp theo, mình sẽ chỉ các bạn một số cách để xử lý những trường hợp như thế này. Mặc dù nó hơi lòng vòng một xíu, cơ mà vẫn giúp các bạn giữ lại những điều tuyệt vời mà Freezed mang lại.

## III. Use Cases.

### 1. Apply freezed to the base model.
Như mình đã trình bày ở trước, Freezed không hỗ trợ kế thừa, điều này gây ra khá nhiều rắc rối. Đặc biệt trong việc override lại một số phương thức, cái mà Freezed hỗ trợ như **toJson**, **fromJson**,...
Chính vì vậy chúng ta sẽ phải modify một xíu cho BaseNetworkModel và NetworkDecoder để decode được json tái sử dụng được Freezed cho response model của mình.

Đầu tiên, bạn phải viết một extension function cho việc decode json, tránh việc phải override lại phương thức **toJson**. Khi đó **BaseNetworkModel** sẽ trông giống như thế này:

```
abstract class BaseResponseObject<T> {}

extension NetworkResponseConverter on BaseResponseObject {
  BaseResponseObject? decodeJson(Map<String, dynamic> json) {
    if (this is BlockChain) return BlockChain.fromJson(json);
    Fimber.e('You need to implement the decodeJson method');
    return null;
  }

  Map<String, dynamic>? encodeJson() {
    if (this is BlockChain) return (this as BlockChain).toJson();
    Fimber.e('You need to implement the encodeJson method');
    return null;
  }
}
```

Và rồi **NetworkDecoder** layer sẽ phải modify như sau:

```
class NetworkDecoder {
  static var shared = NetworkDecoder();

  K decode<T extends BaseResponseObject, K>(
      {required Response<dynamic> response, required T responseType}) {
    try {
      if (response.data is List) {
        var list = response.data as List;
        var dataList = List<T>.from(
            list.map((item) => responseType.decodeJson(item)).toList()) as K;
        return dataList;
      } else {
        var data = responseType.decodeJson(response.data) as K;
        return data;
      }
    } on TypeError catch (e) {
      Fimber.e(e.stackTrace.toString());
      rethrow;
    }
  }
}
```

Rõ ràng là hơi lòng vòng hơn đúng không? Tuy nhiên đó là cái giá phải trả nếu chúng ta muốn sài Freezed cho response model của mình. Cũng như bạn hoàn toàn có thể linh hoạt thay đổi nhiều loại base response khác nhau trong quá trình phân tách dữ liệu trả về(Có nhiều base response khác nhau).

### 2. Wrap to the base response.
Có một trường hợp nữa mà mình đã đề cập trong issues của Freezed đó là cần có một base response model trong khi Freezed không cho kế thừa.
Ví dụ server có trả về dữ liệu json cái chứa status, message cho những trường hợp logics đặc biệt, hoặc dữ liệu phân trang chung như bên dưới.

```
{
  "status": 1,
  "message": "success",
  "meta": {
    "totalCountIsEstimate": true,
    "count": 100,
    "pageCount": 115,
    "totalCount": 11421,
    "next": "/delegates/gym/blocks?page=2&limit=100&transform=true",
    "previous": null,
    "self": "/delegates/gym/blocks?page=1&limit=100&transform=true",
    "first": "/delegates/gym/blocks?page=1&limit=100&transform=true",
    "last": "/delegates/gym/blocks?page=115&limit=100&transform=true"
  },
  "data": [
    {
      "id": "cba516aaa51dcd347704f0f809957bba9fca",
      "version": 0,
      "height": 635598,
      "previous": "5e7f76b419bc6298bfd02569ead619c7d0"
    }
  ]
}
```

Tức là ngoài data(list hoặc object) là response trả về, chúng ta sẽ có thêm status, message và meta data(phục vụ phân trang).

Khi đó chúng ta sẽ tạo một base model như sau:

```
part 'base_response_object.g.dart';

@JsonSerializable(genericArgumentFactories: true)
class BaseResponseObject<T> extends Equatable {
  final String? status;
  final String? message;
  final meta? Meta;
  final T? data;

  const BaseResponseObject({this.status, this.message, this.meta, this.data});

  factory BaseResponseObject.fromJson(
    Map<String, dynamic> json,
    T Function(Object? json) fromJsonT,
  ) {
    return _$BaseResponseObjectFromJson<T>(json, fromJsonT);
  }

  Map<String, dynamic> toJson(
    Map<String, dynamic> Function(T value) toJsonT,
  ) {
    return _$BaseResponseObjectToJson<T>(this, toJsonT);
  }

  @override
  List<Object?> get props => [status, message, meta, data];
}
```

Do thay đổi cấu trúc dữ liệu trả về mà phương thức decode json của chúng ta cũng sẽ phải thay đổi.

```
extension NetworkResponseConverter on BaseResponseObject {
  BaseResponseObject? decodeJson(Map<String, dynamic> json) {
    if (this is BaseResponseObject<List<CoinPriceResponse>>) {
      return BaseResponseObject<List<CoinPriceResponse>>.fromJson(
          json, CoinPriceResponse.createListFromJsonObject);
    }
    if (this is BaseResponseObject<RefreshTokenResponse>) {
      return BaseResponseObject<RefreshTokenResponse>.fromJson(
          json, RefreshTokenResponse.fromJsonObject);
    }
    Fimber.e('You need to implement the decodeJson method');
    return null;
  }

  Map<String, dynamic>? encodeJson() {
    if (this is CoinPriceResponse) {
      return (this as BaseResponseObject<CoinPriceResponse>?)
          ?.toJson((value) => value.toJson());
    }
    if (this is RefreshTokenResponse) {
      return (this as BaseResponseObject<RefreshTokenResponse>?)
          ?.toJson((value) => value.toJson());
    }
    Fimber.e('You need to implement the encodeJson method');
    return null;
  }
}
```

Đối với trường hợp list, ở đây chúng ta phải tạo một function để parse json tương ứng cho T. Các bạn có thể xem thêm trong **CoinPriceResponse** object. Trong trường hợp của mình là một static method có tên là **createListFromJsonObject**.

```
import 'package:freezed_annotation/freezed_annotation.dart';

part 'coin_price_response.freezed.dart';

part 'coin_price_response.g.dart';

@freezed
class CoinPriceResponse with _$CoinPriceResponse {
  factory CoinPriceResponse({
    String? symbol,
    String? price,
  }) = _CoinPriceResponse;

  factory CoinPriceResponse.fromJson(Map<String, dynamic> json) =>
      _$CoinPriceResponseFromJson(json);

  factory CoinPriceResponse.fromJsonObject(Object? json) =>
      _$CoinPriceResponseFromJson(json as Map<String, dynamic>);

  static List<CoinPriceResponse> createListFromJsonObject(Object? json) =>
      List<Object>.from(json as List)
          .map((e) => CoinPriceResponse.fromJson(e as Map<String, dynamic>))
          .toList();
}
```

Để xem kĩ hơn phần này cũng như chạy thử demo, các bạn có thể xem toàn bộ source code trên [github repo của mình](https://github.com/DanhDue/getx_sample/tree/http-base-response).

### 3. Change base url at runtime.
Đây là một trường hợp thỉnh thoảng cũng có thể xảy ra. Ví dụ như bạn cần gọi một API cấu hình cho ứng dụng. Trong đó có chứa base url trỏ tới các server khác nhau, cái có thể bị thay đổi và được remote từ server. Tất nhiên, để xử lý được vấn đề này bạn hoàn toàn có thể sử dụng một giải pháp khác như Firebse Remote Configuration chẳng hạn, tuy vậy thì nó vẫn là trường hợp hoàn toàn có thể xảy ra. Biết đâu được đúng không?

Do trong **network_creator** chúng ta sử dụng phương thức fetch của dio, do đó việc thay đổi base url này được xử lý hết sức đơn giản. Các bạn có thể xem ở đây:

```
    return _client.fetch(RequestOptions(
        baseUrl: _appConfigs?.baseUrl ?? route.baseURL,
        method: route.method,
        path: route.path,
        queryParameters: route.queryParameters,
        data: route.body,
        sendTimeout: route.sendTimeout,
        receiveTimeout: route.sendTimeout,
        onReceiveProgress: options?.onReceiveProgress,
        validateStatus: (statusCode) => (statusCode! >= HttpStatus.ok &&
            statusCode <= HttpStatus.multipleChoices)));
```

Ở đây, chúng ta chỉ đơn giản lấy base url trong app configuration, cái bạn lưu ở local chẳng hạn. Trong **network_creator**, mình sử dụng Hive để lưu nó phía local.

 ### 4. Mock http response.
 Một vấn đề nữa cũng hay xảy ra đó là HTTP APIs và ứng dụng được phát triển song song, do đó các APIs cần được định nghĩa trước và mock cho quá trình phát triển phía mobile app.
 Ở đây mình có sử dụng một package bên thứ ba là [http_mock_adapter](https://pub.dev/packages/http_mock_adapter). Mã nguồn chi tiết các bạn có thể xem thêm trong file **[network_creator.dart](https://github.com/DanhDue/getx_sample/blob/c1c31c1be21b6a22711cdd880e83a475c04ba665/lib/data/remote/layers/network_creator.dart#L48)** nhé.

## IV. Conclusion.
Như vậy chúng ta có thể thấy: Việc phân tách network module thành các layers theo ý tưởng từ [Clean Network Layers](https://ercangp.medium.com/clean-network-layer-in-flutter-dio-freezed-json-annotation-f5f2c41ac240) cho Flutter là một giải pháp linh hoạt có thể giải quyết được rất nhiều bài toán thực tế.
Cùng với việc viết thêm một lớp converter, chúng ta có thể linh hoạt thay đổi cách thức phân tách dữ liệu json từ response trả về.

Bên trên, mình đã trình bày một số ý tưởng tuỳ chỉnh network module dựa trên [Clean Network Layers](https://ercangp.medium.com/clean-network-layer-in-flutter-dio-freezed-json-annotation-f5f2c41ac240) nhằm tận dụng tối đa sức mạnh của một số thư viện bên thứ 3(Freezed, json_serializable,...) giúp đơn giản hoá quá trình phát triển cũng như dễ dàng tuỳ biến theo những use cases thực tế về sau.

Tất nhiên vẫn còn nhiều cách thức xây dựng network module khác hoặc sử dụng thư viện bên thứ 3 như retrofit nhưng mình vẫn hy vọng các bạn có thể tìm thấy một vài ý tưởng cho việc xây dựng network module đáp ứng được yêu cầu cho ứng dụng Flutter của mình.

Mã nguồn tham khảo các bạn có thể tìm thấy [ở đây](https://github.com/DanhDue/getx_sample/blob/develop/lib/data/remote/interfaces/base_response_object.dart).

## V. Reference.

**[GetX_Sample](https://github.com/DanhDue/getx_sample)**. <br />
**[Clean Network Layers](https://ercangp.medium.com/clean-network-layer-in-flutter-dio-freezed-json-annotation-f5f2c41ac240)**. <br />
**[How to Parse JSON in Dart/Flutter with Code Generation using Freezed](https://viblo.asia/p/how-to-parse-json-in-dartflutter-with-code-generation-using-freezed-3Q75wv02lWb)**. <br />
**[Freezed](https://pub.dev/packages/freezed)**. <br />
**[json_serializable](https://pub.dev/packages/json_serializable)**. <br />
**[json_annotation](https://pub.dev/packages/json_annotation)**. <br />
**[http_mock_adapter](https://pub.dev/packages/http_mock_adapter)**. <br />
**[connectivity_plus](https://pub.dev/packages/connectivity_plus)**. <br />