### 1. Glide là gì?
Đặt vấn đề:
Bất kì một Android Developer nào khi làm việc với hình ảnh có thể liệt kê ra danh sách các vấn đề vốn có trong việc truy cập, tải và hiển thị hình ảnh trong ứng dụng: 
- Kích thước hình ảnh lớn đòi hỏi nhiều bộ nhớ để xử lý, điều này có thể gây ra lỗi Out of memory và app bị crash.
- Hình ảnh cần hiển thị quá trình có thể chậm và gây "lag" đối với người dụng. Và hầu hết người dùng không có nhiều kiên nhẫn chờ đợi.
- Việc xử lý hình ảnh để hiển thị nó nhỏ hơn so với kích thước gốc cũng làm cho CPU hoạt động nhiều và có chu kỳ tính toán. Việc này cũng làm ứng dụng bị chậm hoặc đứng luôn.
- Tùy thuộc vào việc thuật toán sử dụng, các hình ảnh xử lý có thể thay đổi màu sắc, độ sắc nét, độ sáng và tương phản khác xa so với ảnh gốc, đó có thể là điều không mong muốn.
...
Tóm lại việc xử lý hình ảnh rất quan trọng trong một ứng dụng Android. Nên các Develops đã xây nhưng các thư viện để giải quyết vấn đề này.
![](https://images.viblo.asia/bf34dbbd-d0c8-4c95-8356-6f9b3010ca31.png)

Trong hội nghị dành cho các Google Developer ở Thái Lan, Google đã giới thiệu một thư viện load ảnh dành cho Android, được phát triển bởi bumptech, được Google đề xuất. Thư viện này có tên là Glide.
Glide là một thư viện load ảnh nhanh và hiệu quả dành cho Android, nó tập trung vào việc scrolling ảnh một cách mượt mà.
Glide cung cấp một API dễ sử dụng, cung cấp một tầng trình diễn, một cách giả mã resource có thể mở rộng được, một tập hợp resource động.

### 2.  Tại sao lại dùng Glide
- Cách sử dụng: Sử dụng Glide rất đơn giản, cho phép người dùng thực hiện hầu hết các yêu cầu trong một dòng.
- Tùy biến: 

-> Tùy vào mục đích sử dụng mà Android Developers có thể lựa chọn tập các phương thức của Gilde.

-> Focus chính của Glide là làm cho việc cuộn bất kỳ danh sách hình ảnh nào mượt mà và nhanh nhất có thể. Nhưng Glide cũng có hiệu quả trong hầu hết mọi trường hợp cần fetch, resize và hiển thị hình ảnh từ xa.
- Những dữ liệu có thể load : Glide hỗ trợ fetching, decoding và hiển thị ảnh tĩnh lẫn ảnh động.
- Hiệu năng: Glide là một trong những thư viện load ảnh tốt nhất hiện tại.
### 3.  Hiệu năng của Glide.
Glide tính đến hai khía cạnh chính của hiệu suất tải hình ảnh trên Android.
- Tốc độ hình ảnh có thể được decoded
- Số lượng jank phát sinh khi trong khi decoding hình ảnh.
Để người dùng có trải nghiệm tuyệt vời với ứng dụng, hình ảnh không chỉ xuất hiện nhanh mà còn phải gây ra nhiều jank và lặp từ Main Thread hoặc gây ra nhiều rác quá mức.
Glide thực hiện một số bước để đảm bảo tải hình ảnh nhanh và mượt mà nhất có thể trên Android:
- Tự động downsampling và giảm thiểu chi phí lưu trữ cộng với thời gian decode.
- Tích cực tái sử dụng resource như mảng byte và bitmap giảm thiểu garbage collections và phân mảnh heap.
- Tích hợp sâu vào vòng đời và đảm bảo chỉ yêu cầu đối với Activity và Fragment được ưu tiên, và các ứng dụng giải phóng tài nguyên khi cần thiết
### 4.  Glide dùng như thế nào?
- Download:
Bạn có thể download file jar từ Gitbub: https://github.com/bumptech/glide/releases
Hoặc bạn có thể sử dụng Gradle:
```java
repositories {
  mavenCentral()
  google()
}

dependencies {
  implementation 'com.github.bumptech.glide:glide:4.8.0'
  annotationProcessor 'com.github.bumptech.glide:compiler:4.8.0'
}
```
Hay Maven:
```java
<dependency>
  <groupId>com.github.bumptech.glide</groupId>
  <artifactId>glide</artifactId>
  <version>4.8.0</version>
</dependency>
<dependency>
  <groupId>com.github.bumptech.glide</groupId>
  <artifactId>compiler</artifactId>
  <version>4.8.0</version>
  <optional>true</optional>
</dependency>
```
Cách mình thường sử dụng là Gradle.
- Sử dụng:
Các trường hợp sử dụng Glide với API thường sẽ giống như thế này.
+ Cho một View đơn giản:
```java
@Override public void onCreate(Bundle savedInstanceState) {
  ...
  ImageView imageView = (ImageView) findViewById(R.id.my_image_view);

  GlideApp.with(this).load("http://goo.gl/gEgYUd").into(imageView);
}
```
+ Cho một danh sách View đơn giản:
```java
@Override public View getView(int position, View recycled, ViewGroup container) {
  final ImageView myImageView;
  if (recycled == null) {
    myImageView = (ImageView) inflater.inflate(R.layout.my_image_view, container, false);
  } else {
    myImageView = (ImageView) recycled;
  }

  String url = myUrls.get(position);

  GlideApp
    .with(myFragment)
    .load(url)
    .centerCrop()
    .placeholder(R.drawable.loading_spinner)
    .into(myImageView);

  return myImageView;
}
```

Để biết thêm chi tiết các bạn có thể tìm hiểu ở https://bumptech.github.io/glide/

### 5.  Bản chất của Glide.
- Theo mặc định thì Glide sử dụng một ngăn xếp được tạo bởi HttpUrlConnection custom. Nếu cần nó cũng có thể bao gồm các thư viện tiện ích là Volley của Google hoặc OkHttp của Square thay thế HttpUrlConnection.
- OkHttp là một thư viện mạng level thấp hơn Cronet và Volley, mặc dù nó cũng hỗ trợ cho SPDY. OkHttp có hiệu suất hợp lý với Glide và thường tạo ra ít rác hơn Volley khi tải hình ảnh.
OkHttp là lựa chọn hợp lý cho các ứng dụng muốn có API đẹp hơn API được cung cấp bởi HttpUrlConnection của Android, hoặc muốn đảm bảo nhất quán mã networking với các phiên bản hệ điều hành Android mà ứng dụng được cài đặt. Cũng như các thư viện mạng khác, một lý do tốt nữa để sử dụng OkHttp là ở nơi khác trong ứng dụng của bạn cũng sử dụng OkHttp.
- Volley là một Java networking queue hỗ trợ cho việc xếp hàng và ưu tiên các công việc mạng. Volley không đặc biệt hiệu quả khi tải hình ảnh bởi vì nó sao chép tất cả dữ liệu mà nó nhận vào các mảng byte. Mặc dù Volley cố gắng tái sử dụng các mảng byte này, nhưng tỉ lệ tái sử dụng các ảnh trung bình và lớn là tương đối kém. Kết quả là Volley gây ra một lượng lớn bộ nhớ khi sử dụng Glide để load ảnh. Volley vẫn là lựa chọn phù hợp nếu ứng dụng đã sử dụng trọng ứng dụng, bởi vì nó cho phép ưu tiên trên cả tải hình ảnh và siêu dữ liệu RPC. Đối với đường truyền mạng kém thì Volley có thể tốt hơn thư viện mặc định của Glide vì nó hỗ trợ việc thử lại.
Thông thường bạn sẽ muốn vô hiệu hóa disk cache của Volley hoặc của Glide khi sử dụng thư viện này. Nếu bạn không làm như vậy thì dữ liệu giống nhau có thể lưu trong cả disk cache của Volley và Glide cùng một lúc.
### 6. Caching
***6.1 Caching trong Glide***

The mặc định Glide kiểm tra nhiều lớp cache trước khi bắt đầu yêu cầu mới cho một hình ảnh:
1. Active resources - Hình ảnh hiện tại có đang được sử dụng không?
2. Memory cache - Hình ảnh này mới được tải và còn trong bộ nhớ không?
3. Resource - Hình ảnh này đã được decoded, transformed, hay ghi vào disk cache trước đó chưa?
4. Data - Dữ liệu này đã thu được từ ghi vào disk cache trước đó?
Hai bước đầu tiên kiểm tra xem tài nguyên có nằm trong bộ nhớ máy hay không và nếu có, nó trả lại hình ảnh ngay lập tức.
Hai bước tiếp theo kiểm tra xem hình ảnh có trong disk hay không, nếu có sẽ trả về một cách nhanh chóng.
Nếu tất cả bốn bước không tìm thấy hình ảnh, thì Glide sẽ quay lại nguồn ban đầu để truy xuất dữ liệu (File, Url, Uri, ...)

***6.2 Cache Keys***

Trong Glide 4, tất cả các cache key chứa ít nhất hai phần tử:
- Model để load được yêu cầu cho File, Uri, Url
- Một chữ ký tùy chọn.
Trong thực tế, các cache keys cho các bước 1, 2 và 3 ở trên cũng bao gồm một số phần khác của dữ liệu, bao gồm:
+ Chiều rộng và chiều cao.
+ Tùy chọn transformation
+ Mọi tùy chọn đã được add
+ Loại dữ liệu được yêu cầu (Bitmap, GIF, ...)
Các khóa cache được sử dụng cho Active resource và Memory cache cũng khác so với các khóa trong Resource disk cache, thường là trong các Options
Để tạo ra các key này, các phần tử riêng lẻ của các khóa được băm để tạo ra một khóa String duy nhất, sau đó nó được sử dụng làm tên tệp trong disk cache.

***6.3 Cache Configuration***

Glide cung cấp một số tùy chọn cho phép bạn chọn cách load ảnh sẽ tương tác với bộ nhớ cache của Glide theo yêu cầu.
- 6.3.1 DiskCacheStrategy

DiskCacheStrategy có thể được áp dụng với phương thức diskCacheStrategy cho một yêu cầu riêng lẻ.
Các strategies có sẵn cho phép bạn ngăn chặn việc load của bạn khi đang sử dụng hoặc đang ghi ảnh lên disk cache hoặc chọn chỉ lưu dữ liệu gốc chưa được sửa đổi, hoặc chỉ nhận hình ảnh đã được chuyển đổi hoặc cả hai.
Strategy mặc định là AUTOMATIC, cố gắng tối ưu khi sử dụng hình ảnh ở local và remote. AUTOMATIC sẽ chỉ lưu trữ dữ liệu chưa được sửa đổi khi bạn load ảnh từ remote bởi tải dữ liệu từ xa rất tốn kém so với việc thay đổi kích thước dữ liệu đã có. Đối với dữ liệu ở local thì AUTOMATIC sẽ chỉ lưu trữ hình thu nhỏ được transformed bởi vì truy xuất dữ liệu local thì thấp, và ta không cần lưu giữ một bản nguyên xi của nó.
Áp dụng DiskCacheStrategy:
```java
GlideApp.with(fragment)
  .load(url)
  .diskCacheStrategy(DiskCacheStrategy.ALL)
  .into(imageView);
```

- 6.3.2 Loading only from cache - chỉ load hình ảnh từ bộ nhớ cache

Trong một số trường hợp bạn chỉ muốn lấy hình ảnh  trong bộ nhớ cache. Tất nhiên nếu trong cache không có thì sẽ thất bại.
```java
GlideApp.with(fragment)
  .load(url)
  .onlyRetrieveFromCache(true)
  .into(imageView);
```
- 6.3.3 Skipping the cache - bỏ qua bộ nhớ cache

Nếu bạn muốn đảm bảo yêu cầu cụ thể bỏ qua disk cache hoặc memory cache hoặc cả hai, Glide cung cấp một vài lựa chọn.
Để chỉ bỏ qua Memory Cache, ta sử dụng skipMemoryCache()
```java
GlideApp.with(fragment)
  .load(url)
  .skipMemoryCache(true)
  .into(view);
Để chỉ bỏ qua Disk cache, ta sử dụng DiskCacheStrategy.NONE
GlideApp.with(fragment)
  .load(url)
  .diskCacheStrategy(DiskCacheStrategy.NONE)
  .into(view);
Các tùy chọn trên có thể được sử dụng cùng nhau:
GlideApp.with(fragment)
  .load(url)
  .diskCacheStrategy(DiskCacheStrategy.NONE)
  .skipMemoryCache(true)
  .into(view);
```

- 6.3.4 Implementation.

Nếu các tùy chọn có sẵn không đủ cho nhu cầu của bạn, bạn cũng có thể viết triển khai DiskCache của riêng mình. Glide cho phép bạn làm điều đó.
Ngoài ra các bạn có thể tham khảo Cache Invalidation (cách vô hiệu hóa cache) và  Resource Management (cách quản lý Resource) của Glide
### 7. Tổng kết.
Qua bài Phần 1 này mình đã chia sẻ những hiểu biết cơ bản của mình về thư viện load ảnh Glide trong Android. Ở bài viết Phần 2 tiếp theo mình sẽ cố gắng so sánh các loại thư viện load ảnh với nhau. Cám ơn các bạn đã theo dõi bài viết.
### 8. Tài liệu tham khảo.
https://github.com/bumptech/glide

https://bumptech.github.io/glide/