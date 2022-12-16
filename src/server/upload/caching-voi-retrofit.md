## 1. Lợi ích của caching

* Giảm tiêu thụ băng thông.
* Tiết kiệm thời gian chờ đợi server phản hồi response.
* Tiết kiệm cho server khỏi gánh nặng của lưu lượng truy cập.
* Nếu cần truy cập lại cùng một tài nguyên mạng sau khi đã truy cập vào tài nguyên đó gần đây, thiết bị sẽ không cần thực hiện request tới server; thay vào đó, nó sẽ cache response được lưu trong bộ nhớ cache.

## 2. Làm sao để caching với Retrofit

Đầu tiên hãy add Gson vào trong instance Retrofit:
```java
val retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
```

Vấn đề ở đây, mặc định nó dùng OkHttpClient để excute request. Và như vậy thì k thân thiện với cache cho lắm.

Chúng ta cần tạo 1 instance của OkHttpClient mà enable cache và có thể sử lý các fetching data hiệu quả.

## 3. TẠo một cache-frindly OkHttpClient

Bước 1: Định nghĩa 1 method để check internet connection.

```java
fun hasNetwork(context: Context): Boolean? {
        var isConnected: Boolean? = false // Initial Value
        val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val activeNetwork: NetworkInfo? = connectivityManager.activeNetworkInfo
        if (activeNetwork != null && activeNetwork.isConnected)
            isConnected = true
        return isConnected
    }
```

Bước 2: Định nghĩa size của cache

Ví dụ, chúng ta sẽ xác định code với size là 5MB, chú ý, giá trị cần phải là Long:
```java
val cacheSize = (5 x 1024 x 1024).toLong()
```

Bước 3: Tạo 1 giá trị Cache

Để tạo 1 giá trị Cache, chúng ta cần pass các giá trị cache directory và cache size như là các parameter. Và cũng cần chú ý là nó cần 1 context.

```java
val myCache = Cache(context.cacheDir, cacheSize)
```

Bước 4: Tạo 1 instance của OkHttpClient với một Interceptor

Chúng ta cần add 1 Interceptor - đại diện cho quan sát và sửa đổi request đầu ra và reponse trả về tương ứng

```java
val okHttpClient = OkHttpClient.Builder()
                // Specify the cache we created earlier.
                .cache(myCache)
                // Add an Interceptor to the OkHttpClient.
                .addInterceptor { chain ->
                                 
                    // Get the request from the chain.
                    var request = chain.request()
                                 
                    /* 
                    *  Leveraging the advantage of using Kotlin,
                    *  we initialize the request and change its header depending on whether 
                    *  the device is connected to Internet or not.
                    */ 
                    request = if (hasNetwork(context)!!)
                        /* 
                        *  If there is Internet, get the cache that was stored 5 seconds ago.
                        *  If the cache is older than 5 seconds, then discard it,
                        *  and indicate an error in fetching the response.
                        *  The 'max-age' attribute is responsible for this behavior.
                        */
                        request.newBuilder().header("Cache-Control", "public, max-age=" + 5).build()
                    else
                        /*
                        *  If there is no Internet, get the cache that was stored 7 days ago.
                        *  If the cache is older than 7 days, then discard it,
                        *  and indicate an error in fetching the response.
                        *  The 'max-stale' attribute is responsible for this behavior.
                        *  The 'only-if-cached' attribute indicates to not retrieve new data; fetch the cache only instead.
                        */
                        request.newBuilder().header("Cache-Control", "public, only-if-cached, max-stale=" + 60 * 60 * 24 * 7).build()
                   // End of if-else statement

                   // Add the modified request to the chain.            
                   chain.proceed(request)
                }
                .build()
```

## 4. Gắn kết chúng lại

Bây giờ, chúng ta sẽ add OkHttpClient mới tạo ra vào trong instance của Retrofit.

```java
val retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                // Adding our OkHttpClient
                .client(okHttpClient)
                .build()
```

Và đây là code hoàn chỉnh của việc khởi tạo Retrofit với cache.

```java
val cacheSize = (5 x 1024 x 1024).toLong()
val myCache = Cache(context.cacheDir, cacheSize)

val okHttpClient = OkHttpClient.Builder()
                .cache(myCache)
                .addInterceptor { chain ->
                    var request = chain.request()
                    request = if (hasNetwork(context)!!)
                        request.newBuilder().header("Cache-Control", "public, max-age=" + 5).build()
                    else
                        request.newBuilder().header("Cache-Control", "public, only-if-cached, max-stale=" + 60 * 60 * 24 * 7).build()
                    chain.proceed(request)
                }
                .build()

val retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .client(okHttpClient)
                .build()
```        

Nguồn: https://medium.com/mindorks/caching-with-retrofit-store-responses-offline-71439ed32fda