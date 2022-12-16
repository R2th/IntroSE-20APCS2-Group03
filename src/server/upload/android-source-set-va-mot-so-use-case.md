# Giới thiệu

Trước đây mình đã từng giới thiệu sơ qua về [Configure your build in Android]( https://viblo.asia/p/configure-your-build-in-android-GrLZDQoVlk0) và một bài về [Config build variants trong android và các use cases](https://viblo.asia/p/config-build-variants-trong-android-va-cac-use-cases-maGK733BKj2), tiếp nối các nội dung liên quan đến build này thì hôm nay mình sẽ giới thiệu cho các bạn một vấn đề cũng liên quan đến build là **Source Set** và các use cases liên quan nó nhé.

Tại sao lại cần source set? Nếu bạn có nhiều phiên bản khác nhau của cùng một ứng dụng thì tôi nghĩ rằng bạn sẽ thấy chúng giống nhau đến 90% và phần khác nhau là rất ít, bạn có thể xử lý việc khác nhau đó bằng cách if else /when case với các build variant của mình, tuy nhiên nếu quá nhiều chỗ cần when như vậy thì code sẽ bị phụ thuộc, khó maintain về sau. Vậy có cách nào hay hơn không? Lúc này thì bạn nên sử dụng source set là hợp lý nhé.

DÙng source set thì phần khácn hau của các build variant sẽ tách biệt, dev + maintain dễ dàng hơn.

# Source set

![](https://images.viblo.asia/63f9881c-9518-4f9d-a2f8-cd8496567cb4.png)

Một project có thể có nhiều module, một module có thể có nhiều sourceSet theo build type, product flavor hay là build variant. ẢNh bên trên là cấu trúc của một project đơn giản nhất chỉ có một module và một source set

Theo doc định nghĩa thì Android Studio cấu trúc code và resources của từng module thành các source set. 

Một module có source set `main` chứa code và resources dùng bởi tất cả các variant trong  module đó

Các source set khác là tuỳ chọn, có thể thêm khi bạn tạo build variant

Đặc điểm các source set trong doc đã ghi chi tiết nên mình xin phép trích dẫn lại thôi

> - src/main/
> 
> This source set includes code and resources common to all build variants.
>
> - src/**buildType**/
> 
> Create this source set to include code and resources only for a specific build type.
>
> - src/**productFlavor**/
> 
> Create this source set to include code and resources only for a specific product flavor.
> 
> Note: If you configure your build to combine multiple product flavors, you can create source set directories for each combination of product flavors between the flavor dimensions: src/productFlavor1ProductFlavor2/
>
> - src/**productFlavorBuildType**/
> 
> Create this source set to include code and resources only for a specific build variant.
> 
> For example, to generate the "fullDebug" version of your app, the build system merges code, settings, and resources from following source sets:
> 
> - src/fullDebug/ (the build variant source set)
> 
> - src/debug/ (the build type source set)
> 
> - src/full/ (the product flavor source set)
> 
> - src/main/ (the main source set)

Một lưu ý nữa về thứ tự khi mà các source set có các version khác nhau của cùng một file, bên trái ưu tiên hơn bên phải

> **build variant > build type > product flavor > main source set > library dependencies**

Giờ thì chúng ta bàn tới các use case nhé

# Use cases

## Đổi app icon, app name cho từng build variant

Với case này nhiều bạn có thể config trong `build.gradle` luôn hoặc là bạn có thể config file resource theo source set cho tường minh

- Để đổi app icon thì tạo file icon mới cùng tên cùng folder trong source set tương ứng thì lúc build sẽ được
- Tương tự với app name thì các bạn có thể tạo file strings.xml trong folter tương ứng và đặt trong source set

## Đổi layout, string, color cho từng build variant

Như bên trên, chúng ta tạo các file cùng tên cùng folder cha, nhưng khác source set là có thể thực hiện.

## Nhiều logic code cho từng build variant

Do là code nên chúng ta sẽ dễ dàng thấy if else hay when ở đâu đó, hoặc là sử dụng một cách khác là source set và logic ủa từng build variant sẽ được tách biệt mà ko biết tới nhau.

## Sửa code/ resource trong các lib

Nhiều lúc bạn sẽ muốn sửa đoạn code, sửa layout, sửa mã màu, string, dimen của thư viện thì dựa trên thứ tự ưu tiên của source set, chúng ta định nghĩa code/ resource có tên tương tự để override lại code/ resource trong lib

# Đọc thêm

https://developer.android.com/studio/build#sourcesets