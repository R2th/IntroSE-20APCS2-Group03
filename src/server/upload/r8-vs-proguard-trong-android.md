# Giới thiệu
Xin chào 500 ae, đến hẹn lại lên, cùng tìm hiểu 1 thứ gì đó nhé :)), mình cũng mới biết về R8 này thôi, nên cũng muốn tìm hiểu và chia sẻ một chút cho ae. Hi vọng bài viết này của mình sẽ giúp ích cho các bạn

Proguard là từ khóa khá là quen thuộc với tất cả các dev Android. Chúng ta sử dụng nó để giảm kích thước, cải thiện hiệu suất của ứng dụng bằng cách thu nhỏ các tài nguyên không sử dụng.

Google đã phát hành R8 để thay thế Proguard để giúp các nhà phát triển thu nhỏ mã với đầu ra được tạo tốt hơn (APK). Chúng được coi là nhanh hơn nhiều so với Proguard.

Trong blog này, chúng ta sẽ tìm hiểu về

R8 là gì?
R8 co lại hoạt động như thế nào?
So sánh R8 với Proguard

Nguồn: https://blog.mindorks.com/r8-vs-proguard-in-android

![](https://images.viblo.asia/41416b5a-1174-42c4-8f1e-eba864e0a2dc.png)


# R8 là gì?
R8 là một công cụ chuyển đổi mã byte java của chúng ta thành mã dex được tối ưu hóa. Nó iterates toàn bộ ứng dụng và sau đó nó tối ưu hóa như loại bỏ các lớp, phương thức không sử dụng, v.v. Nó chạy trong thời gian compile. Nó giúp chúng ta giảm kích thước của bản build và làm cho ứng dụng của chúng ta an toàn hơn. R8 sử dụng các quy tắc Proguard để sửa đổi hành vi mặc định của nó.

# R8 shrinking hoạt động như thế nào?
Trong khi tối ưu hóa code, R8 giảm code ứng dụng của chúng ta và sau đó kích thước APK sẽ giảm.

Để giảm kích thước APK, R8 có ba kỹ thuật khác nhau:

1. **Shrinking or Tree Shaking:** Thu nhỏ là quá trình xóa mã không thể truy cập khỏi dự án Android của chúng ta. R8 thực hiện một số phân tích tĩnh để loại bỏ mã không thể truy cập và loại bỏ đối tượng không có thông tin.
2. **Optimization:** Được sử dụng để tối ưu hóa code cho kích thước. Nó liên quan đến việc loại bỏ mã chết, loại bỏ đối số không sử dụng, nội tuyến chọn lọc, hợp nhất lớp, v.v.
3. **Identifier Renaming:** Trong quá trình này, chúng ta xáo trộn tên lớp và các tên biến khác. Ví dụ: nếu tên của lớp là "**MainActivity**", thì nó sẽ bị xáo trộn thành "**a**" hoặc một cái gì đó khác nhưng có kích thước nhỏ hơn.

## Kích hoạt R8 Shrinking trong app của bạn?
Theo mặc định, R8 hiện diện trong ứng dụng của chúng ta nhưng để cho phép R8 trong ứng dụng của chúng ta, hãy đặt **`minifyEnabled`** thành **`true`** trong tệp `build.gradle` chính của ứng dụng.

```kotlin
android {
    ...
    buildTypes {
        release {
            minifyEnabled true
        }
    }
}
```

# R8's so sánh với Proguard
Bây giờ chúng ta hãy so sánh R8 và Proguard xem!

* Với ứng dụng Android sử dụng plugin Gradle trên 3.4.0 trở lên, project sử dụng **R8** theo mặc định và không còn sử dụng **Proguard** để thực hiện tối ưu hóa. Tuy nhiên, nó chỉ sử dụng các quy tắc Proguard.
* R8 nội tuyến hiệu quả các lớp vùng chứa và loại bỏ lớp, trường và phương thức không sử dụng. Proguard giảm 8,5% kích thước ứng dụng còn với R8 giảm 10%.
* R8 có nhiều hỗ trợ Kotlin hơn so với Proguard.
* R8 cho kết quả đầu ra tốt hơn Proguard và làm như vậy nhanh hơn Proguard, do đó giảm thời gian build tổng thể.

Vì vậy, bây giờ chúng ta hãy so sánh cách cả Proguard và R8 hoạt động.

## Proguard

![](https://images.viblo.asia/320c5c90-b25c-448c-875f-25df47dfb72e.jpg)

Khi sử dụng Proguard, code Ứng dụng được trình biên dịch Java chuyển đổi thành mã bytecode của Java. Sau khi chuyển đổi, nó sẽ được tối ưu hóa bởi Proguard bằng cách sử dụng các quy tắc mà chúng ta đã viết. Sau đó dex chuyển nó thành mã byte Dalvik được tối ưu hóa.

Đây gần như là một quy trình 4 bước để chuyển đổi nó thành Dalvik bytecode.

## R8.

![](https://images.viblo.asia/b5c0ea75-8b23-414f-a781-609817037696.jpg)

Trong khi sử dụng R8, đầu tiên mã của ứng dụng được trình biên dịch java chuyển đổi sang mã byte Java và sau đó sử dụng trực tiếp R8, nó sẽ chuyển đổi mã byte java trong mã byte Dalvik.

Bằng cách sử dụng R8, nó trực tiếp giảm các bước chuyển đổi Java bytecode sang Dalvik Bytecode từ 2 xuống 1.

* Proguard áp dụng 520 tối ưu hóa lỗ hổng so với R8 là rất ít. Tối ưu hóa lỗ hổng là những tối ưu hóa được thực hiện trên một tập hợp mã do trình biên dịch tạo ra để cải thiện hiệu suất của mã bằng cách làm cho mã ngắn hơn và nhanh hơn.
* Trong cả Proguard và R8, chúng ta phải xử lý phản chiếu bằng cách viết cấu hình tùy chỉnh.
* R8 nhanh hơn so với Proguard trong việc thực hiện chuyển đổi mã.

## So sánh tối ưu hóa giữa Proguard và R8.
Hãy thảo luận về một vài tính năng được hỗ trợ bởi cả Proguard và R8.

Ví dụ: Proguard và R8 đều đặt các phương thức ở chế độ riêng tư trong mã. Cả hai đều loại bỏ lớp, trường hoặc thậm chí các phương thức không được sử dụng trong dự án mà không được sử dụng. Cả hai đều hỗ trợ việc đơn giản hóa các loại Enum. Cả hai phương pháp nội tuyến, mã hợp nhất, v.v.

Proguard cũng làm cho các lớp cuối cùng trong khi R8 không thể làm điều đó. Nhưng so sánh R8 được hỗ trợ bởi Kotlin, tối ưu hóa cấu trúc Kotlin mà Proguard không thể thực hiện được.

Bây giờ, nếu bạn cũng muốn bật tính năng tối ưu hóa tích cực trong R8 và giảm kích thước nhiều hơn, hãy bật tính năng sau trong **`gradle.properties`**,
```kotlin
android.enableR8.fullMode=true
```

# Kết luận 

Với việc R8 trở thành trình tối ưu hóa thời gian biên dịch mặc định, nó làm giảm kích thước của ứng dụng.