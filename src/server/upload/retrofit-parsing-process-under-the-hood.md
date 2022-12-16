![image.png](https://images.viblo.asia/35c10f29-0a06-4a0c-810f-355dd4701fe5.png)
> Cứ Android networking là 96.69% anh em sẽ nghĩ ngay đến Retrofit dù cho ngày nay có thêm nhiều thư viện mới và tiện lợi như FAN (Fast Android Networking), Ktor,...
Retrofit vẫn đang được yêu thương bởi lí do dễ sử dụng, tổ chức code tương đối clean, hiệu năng tốt,... (Không nghĩ được thêm thì cứ 3 chấm :v)

Tuy nhiên Retrofit quá tiện lợi, dẫn đến việc chúng ta không tìm hiểu đến cơ chế đằng sau cũng như tốn thời gian mò mẫm mỗi khi có vấn đề phát sinh. Vậy nên chúng ta sẽ cùng khái quát hoá quy trình call API - Parse result của Retrofit cũng như một số vấn đề liên quan đến việc sử dụng nó.

1. Trước khi call API thì Retrofit cần biết nó call đến đâu, sử dụng HTTP method nào, param là gì, kiểu trả về là gì,... để có thể tạo ra một network config tương ứng thông qua hàm loadServiceMethod()
```javascript
ServiceMethod<?> loadServiceMethod(Method method) {
    ServiceMethod<?> result = serviceMethodCache.get(method);
    if (result != null) return result;

    synchronized (serviceMethodCache) {
      result = serviceMethodCache.get(method);
      if (result == null) {
        result = ServiceMethod.parseAnnotations(this, method);
        serviceMethodCache.put(method, result);
      }
    }
    return result;
  }
```

Ở đây có thứ hay ho cho chúng ta khám phá. Có phải những HTTP method đều được chúng ta cài đặt thông qua những abstract function đặt tại interface đúng không nào ?
Những abstract function đó sẽ được Retrofit convert sang object Method nhờ cơ chế reflection. Tại đây nó sẽ kiểm tra trong một map có tên `serviceMethodCache` xem đã có config cho abstract method này hay chưa, nếu có rồi thì return luôn khỏi cần tìm thêm nữa. Còn nếu chưa có thì sẽ chạy quá trình lấy config thông qua hàm parseAnnotations() sau đó đặt config vào map với mục đích cache lại cho các lần sử dụng tiếp theo.

2. Tiếp đó Retrofit sẽ tiến hành parseAnnotations() cũng nhờ cơ chế refection để lấy được những config từ các @Annotation được cài đặt ở các abstract method.

```java
abstract class ServiceMethod<T> {
  static <T> ServiceMethod<T> parseAnnotations(Retrofit retrofit, Method method) {
    RequestFactory requestFactory = RequestFactory.parseAnnotations(retrofit, method);

    Type returnType = method.getGenericReturnType();
    if (Utils.hasUnresolvableType(returnType)) {
      throw methodError(
          method,
          "Method return type must not include a type variable or wildcard: %s",
          returnType);
    }
    if (returnType == void.class) {
      throw methodError(method, "Service methods cannot return void.");
    }

    return HttpServiceMethod.parseAnnotations(retrofit, method, requestFactory);
  }

  abstract @Nullable T invoke(Object[] args);
}
```

Tại đây kiểu trả về sẽ được kiểm tra có hợp lệ hay không: class có tồn tại và không phải kiểu `Void`. Nếu kiểu dữ liệu hợp lệ thì công việc parsing config tiếp tục được đẩy cho HttpServiceMethod.parseAnnotations() xử lí.

Tại docs của Retrofit cũng nói rằng cơ chế reflection có thể tốn kém nhưng cho đến hiện tại nó là cách tốt nhất để tạo các service method và tái sử dụng.
![image.png](https://images.viblo.asia/aa21349d-b4e0-4591-82c8-d43c4caea8ee.png)

Hàm này tương đối phức tạp, chúng ta chỉ cần chú ý vào một số điểm sau:
- Các annotation sẽ được sử dụng cho việc tạo CallAdapter (Object thực thi hàm call của Retrofit và convert HTTP response thành type object)
- ConverterFactory sẽ được tạo thông qua annotation class và object type của response. 

#### !Có một lưu ý mà mọi người cần nhớ để tránh gặp phải lỗi liên quan đến quá trình convert response
Retrofit cho phép sử dụng nhiều `converterFactory` thông qua `RetrofitBuilder.addConverterFactory()`. Tuy nhiên nếu sử dụng nhiều Converter.Factory cùng loại có thể khiến cho các custom adapter bị vô hiệu hoá. Xem ví dụ sau để hiểu và tránh mắc phải nhé:
> Tạo một common Retrofit.Builder với mục đích thiết lập các cài đặt chung, service nào muốn sử dụng thì inject vào và build ra instance sử dụng MoshiConverterFactory để convert HTTP response sang Object sử dụng cơ chế codegen của Moshi.
Tại service có nhu cầu sử dụng custom adapter thì sẽ inject instance Retrofit.Builder bên trên và add thêm một converterFactory có chứa moshi với custom adapter.

```java
@CommonRetrofitBuilder
 fun provideAnonymousRetrofitBuilder(): Retrofit.Builder {
      val moshi = Moshi.Builder().build()
       val converterFactory = MoshiConverterFactory.create(moshi).asLenient()
        return Retrofit.Builder()
            .client(okHttpClient)
            .baseUrl(BuildConfig.BASE_URL)
            .addConverterFactory(converterFactory)
    }

    fun provideSettingsApiService(
        @CommonRetrofitBuilder retrofitBuilder: Retrofit.Builder
    ): SettingsApiService {
        val moshi = Moshi.Builder().add(MyCustomAdapter()).build()
        val converterFactory = MoshiConverterFactory.create(moshi).asLenient()

        return retrofitBuilder
            .addConverterFactory(converterFactory)
            .build()
            .create(ApiService::class.java)
    }
```

Custom Adapter rõ ràng đã được thêm vào nhưng chương trình chạy báo lỗi do không thể mapping dữ liệu. Nguyên nhân là tại hàm parseAnnotations(), khi tạo responseBodyConverter thì retrofit sẽ chạy vòng lặp trên list các converterFactories hiện có, nếu như lấy được converter nào thì sẽ ngay lập tức dừng vòng lặp và return nó.
```java
 public <T> Converter<ResponseBody, T> nextResponseBodyConverter(
      @Nullable Converter.Factory skipPast, Type type, Annotation[] annotations) {
    Objects.requireNonNull(type, "type == null");
    Objects.requireNonNull(annotations, "annotations == null");

    int start = converterFactories.indexOf(skipPast) + 1;
    for (int i = start, count = converterFactories.size(); i < count; i++) {
      Converter<ResponseBody, ?> converter =
          converterFactories.get(i).responseBodyConverter(type, annotations, this);
      if (converter != null) {
        //noinspection unchecked
        return (Converter<ResponseBody, T>) converter;
      }
    }
```

Mặc định Retrofit sẽ có sẵn 2 converter: BuiltInConverters và OptionalConverterFactory + 2 MoshiConverterFactory (1 được add khi tạo Retrofit.Builder, 1 được add khi tạo instance cho api service).
Vòng lặp được chạy đúng theo thứ tự của các converterFactory cho nên MoshiConverterFactory ở Retrofit.Builder sẽ được duyệt trước. Và implement của MoshiConverterFactory luôn return một object không null cho nên vòng lặp bị dừng ngay tại đây, converterFactory chứa moshi với custom adapter bị bỏ qua.
```java
  public Converter<ResponseBody, ?> responseBodyConverter(
      Type type, Annotation[] annotations, Retrofit retrofit) {
    JsonAdapter<?> adapter = moshi.adapter(type, jsonAnnotations(annotations));
    if (lenient) {
      adapter = adapter.lenient();
    }
    if (failOnUnknown) {
      adapter = adapter.failOnUnknown();
    }
    if (serializeNulls) {
      adapter = adapter.serializeNulls();
    }
    return new MoshiResponseBodyConverter<>(adapter);
  }
```
Vậy nên hãy tránh việc inject Retrofit.Builder đã được config sẵn converter factory nhé.

3. Sau khi tiến hành parse annotation để tạo các service method thành công thì Retrofit sẽ build ra API service instance dưới dạng proxy instance.
![image.png](https://images.viblo.asia/c2d58b38-ae38-4d5c-a497-79d6088ceeba.png)