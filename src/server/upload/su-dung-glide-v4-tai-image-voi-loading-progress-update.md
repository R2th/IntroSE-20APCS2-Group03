## 1. Mở đầu
Nếu ứng dụng của bạn muốn tải nhiều hình ảnh hoặc hình ảnh có kích thước lớn, để nâng cao trải nghiệm người dùng bạn nên cung cấp cho người dùng biết tiến độ tải ảnh.

Trong bài viết này mình sẽ giới thiệu cách kết hợp Glide với OkHttp để đạt được mục đích trên.

Chỉ cần làm theo 3 bước mình trình bày dưới đây, bạn sẽ có tính năng hiển thị tiến độ tải hình ảnh.
![](https://images.viblo.asia/062682e0-f4bc-4178-9700-67acd88c9795.gif)
## 2. Ý tưởng
Bước 1: Sử dụng OkHttp để nắm bắt tiến trình truyền internet.

Bước 2: Đăng ký một callback để cập nhật tiến trình. 

Bước 3: Xử lý vòng đời Glide v4 từ khi bắt đầu, tải, kết thúc.

![](https://images.viblo.asia/8f4f342e-a338-42fb-832f-37c3b2f22e56.jpeg)
### OkHttpClinet compnent
> Đăng ký Glide OkHttpClient với OkHttpProgressResponseBody 

Glide v4 cung cấp các tùy chọn để sử dụng thư viện tích hợp như OkHttp hoặc Volley thay vì cài đặt mặc định. Trong bài viết này, mình sử dụng OkHttp, để có thể lấy được tiến độ tải hình ảnh :

```java
private Source source(Source source) {
        return new ForwardingSource(source) {
            long totalBytesRead = 0L;

            @Override
            public long read(Buffer sink, long byteCount) 
            throws IOException 
            {
                long bytesRead = super.read(sink, byteCount);
                long fullLength = responseBody.contentLength();
                if (bytesRead == -1) { // this source is exhausted
                    totalBytesRead = fullLength;
                } else {
                    totalBytesRead += bytesRead;
                }
               // update listener callback
               progressListener.update(url, 
                                       totalBytesRead, 
                                       fullLength);
                return bytesRead;
            }
        };
    }
```
Đăng ký OkHttp Client như một Glide v4 network library:
```java
 OkHttpClient client = new OkHttpClient.Builder()
                          .addNetworkInterceptor(new Interceptor() {
  @Override
  public Response intercept(Chain chain) throws IOException {
    Request request = chain.request();
    Response response = chain.proceed(request);
    // initial listener
    ResponseProgressListener listener = new    
                                    DispatchingProgressListener();
    // replace with our customize OkhttpBody
    return response.newBuilder()
           .body(new OkHttpProgressResponseBody(request.url(), 
                                                response.body(),
                                                listener))
                                                .build();
  }
}).build();
```
### DispatchingProgressListener
> Phản hồi để xử lý add / delete  URL listener và kích hoạt cập nhật ProgressView.

```java
//responses for HTTP progress update
private interface ResponseProgressListener {
    void update(HttpUrl url, long bytesRead, long contentLength);
}
//response for UI View progress handle
public interface UIonProgressListener {
    void onProgress(long bytesRead, long expectedLength);

    float getGranualityPercentage();
}
```
Các public method để add/remove URL listener
```java
// remove URL listener when finished or failed
public static void forget(String url) {
    DispatchingProgressListener.forget(url);
}
// add URL listener
public static void expect(String url, 
                          UIonProgressListener listener) {
    DispatchingProgressListener.expect(url, listener);
}
```
Gửi đi tiến trình
```java
    @Override
    public void update(HttpUrl url, 
                       final long bytesRead, 
                       final long contentLength) {

        String key = url.toString();
        //Find listener via Key(URL)
        final UIonProgressListener listener = LISTENERS.get(key);
        if (listener == null) {
            return;
        }
        if (contentLength <= bytesRead) {
            forget(key);
        }
        if (needsDispatch(key, bytesRead, contentLength, listener.getGranualityPercentage())) {
            handler.post(new Runnable() {
                @Override
                public void run() {
                    listener.onProgress(bytesRead, contentLength);
                }
            });
        }
    }
```
URL listener này chỉ cập nhật view khi tiến trình chưa đạt 100% và đã thêm URL listener trước đó
```java
private boolean needsDispatch(String key, 
                              long current, 
                              long total, float granularity) {
        if (granularity == 0 || current == 0 || total == current) {
            return true;
        }
        float percent = 100f * current / total;
        long currentProgress = (long) (percent / granularity);
        Long lastProgress = PROGRESSES.get(key);
        if (lastProgress == null || currentProgress != lastProgress)     
        {
            PROGRESSES.put(key, currentProgress);
            return true;
        } else {
            return false;
        }
    }
```

**GlideImageLoader flow : **

![](https://images.viblo.asia/f08f4fa9-372e-4987-a5fe-9d135ff769d9.jpeg)

1. onConnecting : hiển thị progress view
2. Set UIonProgressListener : thêm URL listener callback
3. Use Glide with options : Bạn có thể thay đổi bất kỳ  Glide options nào bạn muốn
4. Hưởng thụ thành quả thôi :)

Code hoàn chỉnh của ProgressAppGlideModule :
```java
@GlideModule
public class ProgressAppGlideModule extends AppGlideModule {

    @Override
    public void registerComponents(Context context, Glide glide, Registry registry) {
        super.registerComponents(context, glide, registry);
        OkHttpClient client = new OkHttpClient.Builder()
                .addNetworkInterceptor(new Interceptor() {
                    @Override
                    public Response intercept(Chain chain) throws IOException {
                        Request request = chain.request();
                        Response response = chain.proceed(request);
                        ResponseProgressListener listener = new DispatchingProgressListener();
                        return response.newBuilder()
                                .body(new OkHttpProgressResponseBody(request.url(), response.body(), listener))
                                .build();
                    }
                })
                .build();
        registry.replace(GlideUrl.class, InputStream.class, new OkHttpUrlLoader.Factory(client));
    }

    public static void forget(String url) {
        ProgressAppGlideModule.DispatchingProgressListener.forget(url);
    }
    public static void expect(String url, ProgressAppGlideModule.UIonProgressListener listener) {
        ProgressAppGlideModule.DispatchingProgressListener.expect(url, listener);
    }

    private interface ResponseProgressListener {
        void update(HttpUrl url, long bytesRead, long contentLength);
    }

    public interface UIonProgressListener {
        void onProgress(long bytesRead, long expectedLength);
        /**
         * Control how often the listener needs an update. 0% and 100% will always be dispatched.
         * @return in percentage (0.2 = call {@link #onProgress} around every 0.2 percent of progress)
         */
        float getGranualityPercentage();
    }

    private static class DispatchingProgressListener implements ProgressAppGlideModule.ResponseProgressListener {
        private static final WeakHashMap<String, UIonProgressListener> LISTENERS = new WeakHashMap<>();
        private static final WeakHashMap<String, Long> PROGRESSES = new WeakHashMap<>();

        private final Handler handler;

        DispatchingProgressListener() {
            this.handler = new Handler(Looper.getMainLooper());
        }

        static void forget(String url) {
            LISTENERS.remove(url);
            PROGRESSES.remove(url);
        }

        static void expect(String url, UIonProgressListener listener) {
            LISTENERS.put(url, listener);
        }

        @Override
        public void update(HttpUrl url, final long bytesRead, final long contentLength) {
            //System.out.printf("%s: %d/%d = %.2f%%%n", url, bytesRead, contentLength, (100f * bytesRead) / contentLength);
            String key = url.toString();
            final UIonProgressListener listener = LISTENERS.get(key);
            if (listener == null) {
                return;
            }
            if (contentLength <= bytesRead) {
                forget(key);
            }
            if (needsDispatch(key, bytesRead, contentLength, listener.getGranualityPercentage())) {
                handler.post(new Runnable() {
                    @Override
                    public void run() {
                        listener.onProgress(bytesRead, contentLength);
                    }
                });
            }
        }

        private boolean needsDispatch(String key, long current, long total, float granularity) {
            if (granularity == 0 || current == 0 || total == current) {
                return true;
            }
            float percent = 100f * current / total;
            long currentProgress = (long) (percent / granularity);
            Long lastProgress = PROGRESSES.get(key);
            if (lastProgress == null || currentProgress != lastProgress) {
                PROGRESSES.put(key, currentProgress);
                return true;
            } else {
                return false;
            }
        }
    }

    private static class OkHttpProgressResponseBody extends ResponseBody {
        private final HttpUrl url;
        private final ResponseBody responseBody;
        private final ResponseProgressListener progressListener;
        private BufferedSource bufferedSource;

        OkHttpProgressResponseBody(HttpUrl url, ResponseBody responseBody,
                                   ResponseProgressListener progressListener) {
            this.url = url;
            this.responseBody = responseBody;
            this.progressListener = progressListener;
        }

        @Override
        public MediaType contentType() {
            return responseBody.contentType();
        }

        @Override
        public long contentLength() {
            return responseBody.contentLength();
        }

        @Override
        public BufferedSource source() {
            if (bufferedSource == null) {
                bufferedSource = Okio.buffer(source(responseBody.source()));
            }
            return bufferedSource;
        }

        private Source source(Source source) {
            return new ForwardingSource(source) {
                long totalBytesRead = 0L;

                @Override
                public long read(Buffer sink, long byteCount) throws IOException {
                    long bytesRead = super.read(sink, byteCount);
                    long fullLength = responseBody.contentLength();
                    if (bytesRead == -1) { // this source is exhausted
                        totalBytesRead = fullLength;
                    } else {
                        totalBytesRead += bytesRead;
                    }
                    progressListener.update(url, totalBytesRead, fullLength);
                    return bytesRead;
                }
            };
        }
    }
}
```
Giờ thì viết một Glide Loader để dùng thôi:
```java
public class GlideImageLoader {

    private ImageView mImageView;
    private ProgressBar mProgressBar;

    public GlideImageLoader(ImageView imageView, ProgressBar progressBar) {
        mImageView = imageView;
        mProgressBar = progressBar;
    }

    public void load(final String url, RequestOptions options) {
        if (url == null || options == null) return;

        onConnecting();

        //set Listener & start
        ProgressAppGlideModule.expect(url, new ProgressAppGlideModule.UIonProgressListener() {
            @Override
            public void onProgress(long bytesRead, long expectedLength) {
                if (mProgressBar != null) {
                    mProgressBar.setProgress((int) (100 * bytesRead / expectedLength));
                }
            }

            @Override
            public float getGranualityPercentage() {
                return 1.0f;
            }
        });
        //Get Image
        Glide.with(mImageView.getContext())
                .load(url)
                .transition(withCrossFade())
                .apply(options.skipMemoryCache(true))
                .listener(new RequestListener<Drawable>() {
                    @Override
                    public boolean onLoadFailed(@Nullable GlideException e, Object model, Target<Drawable> target, boolean isFirstResource) {
                        ProgressAppGlideModule.forget(url);
                        onFinished();
                        return false;
                    }

                    @Override
                    public boolean onResourceReady(Drawable resource, Object model, Target<Drawable> target, DataSource dataSource, boolean isFirstResource) {
                        ProgressAppGlideModule.forget(url);
                        onFinished();
                        return false;
                    }
                })
                .into(mImageView);
    }


    private void onConnecting() {
        if (mProgressBar != null) mProgressBar.setVisibility(View.VISIBLE);
    }

    private void onFinished() {
        if (mProgressBar != null && mImageView != null) {
            mProgressBar.setVisibility(View.GONE);
            mImageView.setVisibility(View.VISIBLE);
        }
    }
}
```
## Tổng kết
Tóm lại bạn chỉ cần :
1. Thêm các dòng sau vào Build.gradle
```java
//Glide
implementation 'com.github.bumptech.glide:glide:4.4.0'
annotationProcessor 'com.github.bumptech.glide:compiler:4.4.0'
implementation 'com.github.bumptech.glide:okhttp3-integration:4.4.0'
```
2. Coppy hai file GlideImageLoader.java & ProgressAppGlideModule.java vào project của mình.
3. Sử dụng nó 
```java
RequestOptions options = new RequestOptions()
                    .centerCrop()
                    .placeholder(R.drawable.placeholder)
                    .error(R.drawable.ic_pic_error)
                    .priority(Priority.HIGH);

new GlideImageLoader(YOUR.imageView,  
                     YOUR.progressBar).load(url,options);
```
Đấy chỉ thế thôi !!!

**Tài liệu tham khảo**
1. bumptech.github.io/glide/
2. http://square.github.io/okhttp/
3. https://github.com/bumptech/glide/issues/232
4. https://gist.github.com/TWiStErRob/08d5807e396740e52c90