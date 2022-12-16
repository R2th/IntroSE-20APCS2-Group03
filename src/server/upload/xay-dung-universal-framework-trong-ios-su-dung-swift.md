Ngắn gọn thôi, tôi có cơ hội làm việc với Universal Framework trong iOS. Ban đầu có đôi chút khó khăn trong việc xây dựng Framework này. Nhưng qua tìm kiếm và đọc các tài liệu, cuối cùng tôi cũng đã xây dựng một Universal framework. Tôi muốn chia sẻ cách xây dựng nó một cách dễ dàng.
# Tạo dự án Framework
Mở Xcode, *File* → *New* → *Project*. Trong tab iOS, Chọn *Framework & Library* và chọn *Cocoa Touch Framework* nhấn "*Next*".

![](https://images.viblo.asia/fb62c398-37be-43fe-b9d8-dc3bf2359ffb.png)

Nhập tên framework của bạn và nhấn "*Next*".

![](https://images.viblo.asia/c4066604-487e-4e22-bb1d-0e80b103d8a0.png)

Chọn vị trí lưu project của bạn và tạo nó.

Trong project của bạn, chọn *Target* → *Project Name* → chọn tab *Build Settings* và luôn luôn gán "*Enable Bitcode*" thành "*Yes*" trước khi build Framework.

Tôi không nói quá nhiều về những tính năng và chức năng trong framework mà bạn sẽ xây dựng. Bạn có thể thêm vào các file .storyboard hoặc .xib vì nó project framework này cũng khá giống với project bình thường.

# Sử dụng Cocoapods

Nhưng đợi đã, nếu dự án của bạn sử dụng một số thư viện bên thứ ba khác thông qua Cocoapods thì sao nhỉ?. Ồ! nó sẽ tạo file .xcworkspace trong dự án. Nhưng đừng lo, bạn vẫn có thể sử dụng Cocoapods khi xây dựng một framework.

Trong trường hợp này tôi có sử dụng thư việc AlamofireImage. Chúng ta tạo một "Podfile" và thực hiện "pod install" để cài đặt pods. Sau đó chúng ta có file .xcworkspace, mở nó ra và thao tác với project một cách bình thường.
> Chú ý: Khi bạn sử dụng thư viện nào từ Cocoapods, thì bạn hãy chắc chắn rằng thư viện đó sẽ có trong project sử dụng Universal framework mà bạn tạo ra.

# Tạo một Universal Framework

Bây giờ, chúng ta tạo một Universal Framework. Thêm mới một Target "*Aggregate*" và đặt tên nó là <FrameworkName>-Universal.
    
![](https://images.viblo.asia/21f2279a-db24-409e-b770-c15cbeea7f6e.png)
    
Trong Target mới thêm, tạo mới môt "*Run script*" trong tab "*Build Phases*".

![](https://images.viblo.asia/635984b4-6acc-4d35-94cc-f5f1f8eb41e5.png)

Sau đó copy và paste nội dung dưới đây vào Run script mới tạo.
{@gist: https://gist.github.com/nguyentuanh/c8615937df2e945e39ebc0842909b11f}

Trong đoạn mã bên trên, bạn có thể tìm thấy phần mã này:

```
“xcodebuild -workspace ${PROJECT_NAME}.xcworkspace -scheme ${PROJECT_NAME}
-sdk iphonesimulator -configuration ${CONFIGURATION} clean build
CONFIGURATION_BUILD_DIR=${BUILD_DIR}/${CONFIGURATION}-iphonesimulator”
```

Nó được gọi hai lần, một cho "*Simulator*" và một cho "*Device*". Và chúng ta dùng lệnh "xcodebuild" để build Project. 

> Nếu project của bạn không có file **.xcworkspace** bạn hãy thay thế đoạn code trên thành đoạn code sau đây:

```
“xcodebuild -xcodeproj ${PROJECT_NAME}.xcodeproj -scheme ${PROJECT_NAME}
-sdk iphonesimulator -configuration ${CONFIGURATION} clean build
CONFIGURATION_BUILD_DIR=${BUILD_DIR}/${CONFIGURATION}-iphonesimulator”
```


Project được build hai lần và hai file .framework này được đặt ở hai thư mục khác nhau. Vì thế chúng ta cần dung lệnh "*lipo*" để nhóm chúng thành một file. Và đó là file chúng ta cần:
```
lipo “${SIMULATOR_LIBRARY_PATH}/${FRAMEWORK_NAME}” 
“${DEVICE_LIBRARY_PATH}/${FRAMEWORK_NAME}” -create -output 
“${FRAMEWORK}/${FRAMEWORK_NAME}”
```

Trong khi bạn build, bạn có thể gặp thông báo lỗi rằng xcodebuild không tìm thấy schemes. Sửa nó bằng cách, vào xCode menu "*Product*" → "*Schemes*" → "*Manager schemes*", tích vào schemes mà bạn muốn chia sẻ.

![](https://images.viblo.asia/9a87a63d-543a-4e10-9982-1d3eeb12feab.png)

Và cuối cùng, bạn chọn schemes <FrameworkName>-Universal và build "*Command + B*". Bạn sẽ tìm thấy file .framework vừa build trong thư mục với đường dẫn "<ProjectDir>/Output/directory" (nơi chứa file này bạn cũng có thể thay đổi nó).
    
![](https://images.viblo.asia/7ca58f71-f67e-4d54-a358-ba6b75dac89f.png)

Đã xong, bạn có thể lấy nó ra và sử dụng. Đây cũng là cách một số thư viện được buid như: Mixpanel, Fabric etc.

# Một vài vấn đề và giải pháp
Có một vài vấn đề có thể xảy ra trong quá trình bạn tích hợp thư việc vào một project khác, bạn có thể tìm thấy [ở đây](https://medium.com/@syshen/create-an-ios-universal-framework-148eb130a46c).
# Kết thúc
Trên đây là cách tôi tạo một Universal framework, đơn giản phải không. Hi vọng xẽ giúp ích chút it cho các bạn.

[Sample project](https://github.com/oNguyenTuAnh/UniversalFrameworkDemo)

[Nguồn tham khảo.](https://medium.com/@syshen/create-an-ios-universal-framework-148eb130a46c)

Thank! :)