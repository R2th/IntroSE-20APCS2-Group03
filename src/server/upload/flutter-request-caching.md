Chào các bạn! Trong bài viết hôm nay mình xin chia sẻ về việc caching request trong một ứng dụng Flutter. Trước khi bắt đầu ta cùng tìm hiểu một số khái niệm :arrow_right:
# Caching là gì?
Hiểu một các nôm na thì  cache là nơi chứa dữ liệu, nhằm giúp tăng tốc độ truy xuất dữ liệu ở những lần sau.  Dữ liệu được chứa trong cache có thể là kết quả của tính toán, xử lý trước đó, hoặc là sự trùng lặp dữ liệu được lưu trữ ở một nơi khác. Có rất nhiều loại dữ liệu mà ta có thể cache. Tuy nhiên trong bài viết này ta sẽ tập trung vào việc caching data từ các API request mà app gọi.

## Vậy lợi ích của việc caching là gì ?
- Giúp cho ứng dụng request data nhanh hơn. Vì dữ liệu được load ra từ cache được lưu ở local.
- Giảm các kết nối api tới server. Điều này sẽ giúp giảm các kết nối và làm tăng performance của server.
- Giảm băng thông sử dụng
- Backup dữ liệu khi không may server có lỗi.
## Cache được lưu ở đâu ?
Cache có thể được lưu ở 2 nơi:
* Trên RAM - Memory cache: Dữ liệu cache được lưu trữ trong bộ nhớ khi đang chạy của ứng dụng. Nếu bạn tắt ứng dụng đi thì nó sẽ mất.
* Disk cache: Dữ liệu cache sẽ được lưu trên ổ đĩa dưới các dạng như file, database, share-preference. Do lưu trên disk nên nó sẽ tồn tại cả khi ứng dụng bị tắt đi.

**Cơ chế hoạt động của cache cơ bản sẽ như sau:**
![](https://images.viblo.asia/14b2f4b7-daad-402c-b4a9-1eeac1b0aea2.png)

Chuẩn bị xong rồi.. Bây giờ bình sẽ trình bày việc caching api request trong một ứng dụng Flutter.

# Caching API request trong Flutter
Trong flutter thư viện được sử dụng nhiều cho việc cache là [flutter_cache_manager](https://pub.dev/packages/flutter_cache_manager) . Tuy nhiên trong ứng dụng demo sau ta request api bằng [dio](https://pub.dev/packages/dio) nên sẽ sử dụng thư viện [dio-http-cache](https://pub.dev/packages/dio_http_cache) được lây cảm hứng từ lib flutter_cache_manager trên.

Dio-http-cache sử dụng sqlite cho disk cache, và LRU(least recently used) cho memory cache.

Cách sử dụng:
```dart
class Network {
  int _timeOut = 10000; //10 s
  Dio _dio;
  DioCacheManager _dioCacheManager;

  DioCacheManager get dioCacheManager {
    _dioCacheManager ??= DioCacheManager(CacheConfig(baseUrl: ApiConst.BASE_URL));
    return _dioCacheManager;
  }

  Network() {
    BaseOptions options = BaseOptions(connectTimeout: _timeOut, receiveTimeout: _timeOut);
    options.baseUrl = ApiConst.BASE_URL;
    _dio = Dio(options);
    _dio.interceptors.add(LogInterceptor(requestBody: true, responseBody: true));
    _dio.interceptors.add(dioCacheManager.interceptor);
  }

  Future<Response> get({String url, Map<String, dynamic> params, Options options}) async {
    try {
      params ??= {};
      options ??= buildCacheOptions(Duration(seconds: 60));

      params["api_key"] = ApiConst.API_KEY;
      return await _dio.get(url, queryParameters: params, options: options);
    } on DioError catch (e) {
      print("DioError: ${e.toString()}");
    }
  }
}
```

Một số tham số mà bạn có thể cấu hình cho **buildCacheOptions**:
1. **primaryKey**: Theo mặc định `host + path` sẽ được sử dụng làm primaryKey.
2. **subKey**: mặc định là các query (data hoặc queryParameters)
3. **maxAge**: thời gian tồn tại của cache. nếu không được set hoặc null. nó sẽ cố gắng lấy max-aga và max-stale từ Cache-Control từ respose headers của api.
4. **maxStale**: thời gian mà cache được coi là cũ. Khi xảy ra lỗi (như 500, 404) trước maxStale, lib sẽ thử trả về data từ cache.

```dart
buildCacheOptions(Duration(days: 7), maxStale: Duration(days: 10))
```
6. **forceRefresh** : mặc định là false.
```dart
buildCacheOptions(Duration(days: 7), forceRefresh: true)
```
* Lấy dữ liệu từ mạng trước.
* Nếu nhận dữ liệu từ mạng thành công, store hoặc refresh cache. 
* Nếu việc lấy dữ liệu từ mạng không thành công hoặc không có mạng, thử lấy data từ cache thay cho một error.


**Một số function khác:**
- Xóa cache hết hạn: Việc này được thực hiện một cách tự động nhưng nếu bạn muốn thì có thể gọi: `DioCacheManager.clearExpired();`
- Xóa hết tất cả các cache (hết hạn hoặc không): `_dioCacheManager.clearAll();`
- Xóa cache khi bạn biết primaryKey và subkey: `_dioCacheManager.delete(primaryKey,{subKey});`

### Ví dụ về maxAge và maxStale:
```dart
buildCacheOptions(
  		Duration(days: 3), 
  		maxStale: Duration(days: 7), 
	)
```
1. 0 ~ 3 ngày: Trả data từ cache.
2. 3 ~7 ngày: 

    * Đầu tiên lấy dữ liệu từ mạng.
    * Nếu succeeds, refresh cache.
    * Nếu lỗi hoặc không có mạng, thử trả data từ cach thay vì 1 lỗi.
3. sau 7 ngày: không sử dụng cache nữa, cache sẽ bị xóa.

Và đây là kết quả đạt được :grin:

![](https://images.viblo.asia/0704c497-74f3-45e1-a316-2d0274f77e3b.gif)


Note: Ngoài ra trong ứng dụng trên mình có cache image bẳng thư viện  cached_network_image, bạn có thể đọc thêm ở [đây](https://github.com/Baseflow/flutter_cached_network_image) .

Link của ứng dụng demo: [demo-cache](https://github.com/trantan97/moviesdb_flutter/tree/flutter_bloc)

Cảm ơn các bạn đã theo dõi !