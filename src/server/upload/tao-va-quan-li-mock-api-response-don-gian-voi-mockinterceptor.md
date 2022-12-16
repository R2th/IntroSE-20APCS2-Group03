Hầu hết khi phát triển ứng dụng Android chúng ta đều cần tới server back-end để cung cấp các API tương tác với dữ liệu và tính toán. Thế nhưng, đôi khi tình trạng phụ thuộc này dẫn tới thảm cảnh "ngồi không" của đội mobile vì phải đợi server làm xong API mới làm tiếp được. Rơi vào tình cảnh đó, anh em buộc phải tạo ra các mock response (dữ liệu giả) cho các API chưa tồn tại hoặc đang sửa chữa để tiếp tục công việc của mình. Cách phổ biến nhất chúng ta thường dùng đó là viết custom Interceptor cho OkHttpClient, nếu chúng ta đang sử dụng OkHttp để tương tác với Network. Phần code tạo ra Mock Interceptor này có thể tái sử dụng nhiều lần cho nhiều project khác nhau. Vì vậy mình đã tạo sẵn một module Mock Interceptor độc lập để import vào sử dụng khi cần, sau đây mình sẽ hướng dẫn các bạn sử dụng nó.

## Bước 1: Clone repository của MockInterceptor

Các bạn có thể vào repo [MockInterceptor](https://github.com/trunghq3101/MockInterceptor) để xem source code và clone về máy mình

## Bước 2: Import module *mockretrofitinterceptor* vào project của bạn

Trong project hiện tại của bạn, chọn File > New > Import module

![](https://images.viblo.asia/cfb75de8-0110-448a-b8cc-77d2e16de94a.png)

Tại đây các bạn chọn tới thư mục mockretrofitinterceptor bên trong repo MockInterceptor mà bạn vừa clone về

## Bước 3: Tạo implementation cho ResourceHelper

MockInterceptor sẽ đọc dữ liệu mock response từ File trên local của bạn. Các bạn cần thực hiện việc mở file dựa theo đường dẫn mà MockInterceptor cung cấp bằng cách override hàm **openFile(filePath: String)** . Ví dụ nếu bạn muốn lưu các file chứa mock response trong folder **assets** của project, vậy bạn sẽ viết class implementation như sau:

```
class AppResourceHelper(
    private val context: Context
) : ResourceHelper {

    override fun openFile(filePath: String): InputStream {
        return context.assets.open(filePath)
    }
}
```

## Bước 4: Tạo các file chứa mock response

Hiện tại MockInterceptor mới chỉ hỗ trợ đọc file JSON. Bạn cần tạo ra các file có tên đặt theo cấu trúc **METHOD_lastpath.json** và đặt trong folder tương ứng. Ví dụ:

Để tạo file mock response cho request sử dụng phương thức **GET** tới đường dẫn **"http://mock.com/api/something** , bạn sẽ tạo ra file có tên **GET_something.json** và đặt trong folder có cấu trúc **../mock.com/api**. Các bạn có thể tham khảo trong repository phía trên của mình đã có sẵn ví dụ rồi.

![](https://images.viblo.asia/527e7494-92ab-4f25-90be-07ba31d21acc.png)

![](https://images.viblo.asia/5c22e0d4-c3ff-45a6-8faa-0c8c7684699e.png)

## Bước 5: Add MockInterceptor vào OkHttpClient của bạn

Cuối cùng bạn chỉ cần tạo instance MockInteceptor và thêm vào OkHttpClient của bạn như các Interceptor bình thường khác

```
OkHttpClient.Builder()
                    .addInterceptor(
                        MockInterceptor(
                            AppResourceHelper(context)
                        )
                    )
                    .build()
```

Mọi truy cập tới API của bạn sẽ có response được lấy từ các file trong folder mà bạn vừa tạo ra phía trên. Các bạn lại tiếp tục coding phăm phăm những tính năng tuyệt vời cho con app của mình!