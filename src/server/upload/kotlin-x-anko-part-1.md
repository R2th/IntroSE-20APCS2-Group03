# **Anko**
- Hi guys, hôm nay mình sẽ giới thiệu tới các bạn về một trong những thư viện nổi tiếng nhất của Android được viết bởi nhóm JetBrains. Nó được gọi là **Anko**.
## Tổng quan
- **Anko** là một thư viện Kotlin giúp phát triển ứng dụng Android nhanh hơn và dễ dàng hơn. Nó làm cho code của bạn được rõ ràng, dễ đọc và bạn không phải nhớ các cú pháp thô trong Android SDK cho Java.
- Chờ chút, **Anko** giúp code ngắn hơn, dễ dàng hơn, điều này **Kotlin**  cũng đã hỗ trợ cho chúng ta. Vậy ở **Anko** có điều gì thú vị hơn. Vâng, mặc dù **Kotlin** đã giúp code của chúng ta ngắn gọn hơn, dễ dàng hơn, nhưng **Anko** còn làm điều đó tuyệt vời hơn nữa (awesome).
- Khi phát triển ứng dụng, có rất nhiều cú pháp mà chúng ta thường xuyên sử dụng như: **Intent, Dialog, Toast, Layout...**. Với cách code thông thường thì chúng ta phải sử dụng 4-5 dòng code để triển khai nó (có vẻ hơn cồng kềnh). **Anko** sẽ giúp chúng ta giải quyết điều này.

## Thực hành
- Lan man lý thuyết như vậy có lẽ chúng ta đã có được cái nhìn tổng thể về **Anko** rồi nhỉ. Bây giờ chúng ta sẽ đi vào thực hành nhé. Trong bài viết lần này mình sẽ giới thiệu tới các bạn về **Anko Commons (Intent, Dialog and Toast, Logging, Resource and Dimension)**, còn lại mình sẽ nói nốt vào part2 nhé. Nào Let's go.
### Anko commons - Intent
1. Add Anko commons dependencies in your build.gradle
- Latest version: [tại đây](https://bintray.com/jetbrains/anko/anko/0.10.8)
![](https://images.viblo.asia/ee0d9828-bc1b-4902-b0d1-63eecc308f5f.PNG)

2. Tạo một Intent
- Không sử dụng Anko:
![](https://images.viblo.asia/7ed97136-7dff-4ead-a928-8b975ee89d3f.PNG)

- Sử dụng Anko:
![](https://images.viblo.asia/44ae3403-ffdf-4761-bd44-b6f3692f6183.PNG)

    + Nếu bạn muốn put nhiều params:
    ![](https://images.viblo.asia/d2682743-8084-4ce5-899f-6edbf0df3202.PNG)
    
### Anko commons - Logging
1. Vẫn sử dụng thư viện **Anko commons**
![](https://images.viblo.asia/ee0d9828-bc1b-4902-b0d1-63eecc308f5f.PNG)

3. Tạo Logging
- Mặc định Android SDK cung cấp gói **android.util.Log** để ghi nhật ký, cách sử dụng cũng khá đơn giản bạn chỉ cần truyền vào tham số **tag**. Với **Anko**, nó có thể giúp bạn bỏ qua tham số đó.
- 
![](https://images.viblo.asia/b811608e-905f-466d-8f2b-2ddee95fced8.PNG)

- Để sử dụng bạn chỉ cần implements  hoặc tạo đối tượng từ **AnkoLogger**. Ví dụ:
![](https://images.viblo.asia/f8a32679-251f-45a2-96bd-72e4e523d013.PNG)

### Anko commons - Misc
- Bạn có thể chỉ định giá trị dimension bằng thuộc tính **dip** hoặc **sp**. Sử dụng **px2dip or px2sp** để convert ngược lại.
1. Thêm thư viện **Anko commons**:

![](https://images.viblo.asia/ee0d9828-bc1b-4902-b0d1-63eecc308f5f.PNG)

2. Sử dụng **applyRecursively()** cho từng view con.

![](https://images.viblo.asia/afe058ba-34cc-49b7-a09d-4c56911323a4.PNG)

### Anko commons - Dialog
1. Thêm thư viện **Anko commons**:

![](https://images.viblo.asia/933b9f3b-2cc5-4730-9cbc-1904dee1307b.PNG)

3. Tạo một alert dialog.
- Ta có thể tạo một alert dialog đơn giản như sau:

![](https://images.viblo.asia/5306bbdd-935c-4dd0-a75b-2f98f4cec9f3.PNG)

- Ta cũng có thể custom một alert dialog. Như bạn nhìn thấy đoạn code phía dưới, tôi sử dụng **toast, logging, custom alert dialog**. Chú ý khi custom view tôi đã sử dụng **Anko layouts** và **Anko Coroutines**  (mình sẽ nói ở dưới sau nhé).

![](https://images.viblo.asia/e278efca-fa16-4de7-9836-fd532b0dced2.PNG)
- Tạo một dialog với danh sách items:

![](https://images.viblo.asia/f7b6d394-4b67-4648-95f1-0420fada377b.PNG)

### Anko Layouts
1. Thêm thư viện. 

![](https://images.viblo.asia/e5133381-4c20-4f8e-9245-1474001c4767.PNG)

3. Basics
- Trong Anko, bạn không cần phải kế thừa từ bất kỳ class đặc biệt nào, chỉ cần sử dụng Activity, Fragment, FragmentActivity hoặc bất cứ thứ gì bạn muốn.

![](https://images.viblo.asia/48af927e-2fb3-48f2-a4b8-6c261502ec76.PNG)

4. AnkoComponent
-  Việc tạo ra một class riêng biệt để xây dựng UI là rất thuận tiện.

![](https://images.viblo.asia/40b06fdf-9cf3-45fe-9d41-6b3224350849.PNG)

4. Themed blocks
- Anko cung cấp "themeable" để tạo ra các view với theme mong muốn

![](https://images.viblo.asia/86855b1f-bffa-4f74-ab6d-da10efba5476.PNG)

5. Layous and LayoutParams
- Vị trí của các widgets bên trong parent containers có thể được điều chỉnh bằng cách sử dụng LayoutParams:
+ Trong XML:

![](https://images.viblo.asia/db148035-ed79-4265-87d7-f980f6f733ff.PNG)

+ Trong Anko: sử dụng lparams()

![](https://images.viblo.asia/3e4673ee-1530-4146-8a50-bc56db25ec41.PNG)

- Nếu bạn sử dụng **lparams()** mà không chỉ định **width/ height**, thì giá trị mặc định sẽ là **wrapContent**.
- Một số thuộc tính:
    + horizontalMargin: Căn chỉnh cả lề trái và phải
    + verticalMargin: Căn chỉnh cả top và bottom
    + margin: căn chỉnh cả top, bottom, left, right
- Chú ý: **lparams()** khác nhau với các layout khác nhau, ví dụ:

![](https://images.viblo.asia/bfd5ba44-b1ef-47fc-b0e4-873e6d5273fc.PNG)

6. Listeners
- Trong Anko bạn có thể lắng nghe sự kiện click thông qua **Anko Coroutines** (mình sẽ nói ở phần 2)

![](https://images.viblo.asia/dff09e58-a907-4b9d-a1f6-3a39e6b6b79a.PNG)

## Tổng kết
- Trong phần 1 này, mình đã giới thiệu tới các bạn **Anko Commons, Anko Layouts**, các bạn hãy thử để giúp code của mình ngắn gọn hơn nhé.
- Thật tuyệt vời phải không các bạn, Phần 2 mình sẽ giới thiệu phần còn lại của thư viện này, hãy theo dõi nhé các bạn.

## Tài liệu tham khảo
- [Anko](https://github.com/Kotlin/anko)
- [Making Kotlin easier](https://android.jlelse.eu/making-kotlin-easier-android-development-fb9fc2d4d2ce)
- [Code sample](https://github.com/hoangbn-1772/AnkoSample)