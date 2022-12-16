### Giới thiệu

Mình không phải là một dân iOS, mình học Swift vì thích phong cách của nó. Có một số vấn đề mà mình không thật sự thích cách giải quyết của các thư viện chuẩn của Swift. Do đó mình tìm một hướng tiếp cận khác, đó là gọi các hàm từ C/C++ và Python để xử lý các vấn đề đó. Bài viết này nói về các gọi các hàm C/C++ từ Swift bằng cách build từ command line.

### UnsafeMutablePointer trong Swift

`UnsafeMutablePointer` của Swift cũng giống như con trỏ bên `C/C++`. Nó có các lệnh dễ sử dụng hơn là `UnsafeMutableRawPointer` nên mình sẽ sử dụng ở bài này.

Để khởi tạo một `UnsafeMutablePointer`, ta dùng:

```
let/var ptr = UnsafeMutablePointer<Type>.allocate(capacity: n)
```
Lệnh này tương đương với:
```
Type* const/Type* ptr = new Type[n];
```
Cũng như C/C++, sau khi sử dụng chúng ta phải giải phóng vùng nhớ mà con trỏ trỏ tới. Ta sẽ dùng:
```
ptr.deallocate()
```
Để thuận tiện, sau khi khai báo, ta dùng `defer` để giải phóng con trỏ lúc kết thúc:
```
let/var ptr = UnsafeMutablePointer<Type>.allocate(capacity: n)
defer {
    ptr.deallocate()
}
```
Để truy cập phần tử, ta có hai cách:
```
// Cách 1
ptr[0]
ptr[i]
// Cách 2
ptr.pointee
ptr.advanced(by: i).pointee
```

Để trỏ đến một mảng:
```
var array: Type = [...]
let ptr = UnsafeMutablePointer<Type>(&array)
```

Mảng từ con trỏ:
```
let ptr: UnsafeMutablePointer<Type>
...
let array = Array(UnsafeBufferPointer(start: ptr, count: ...))
```

### Gọi hàm C từ Swift

Ta sẽ viết một file C:
```
// module.c
double sumArray(double* seq, int size) {
    double result = 0;
    for (int i = 0; i < size; i++)
        result += seq[i];
    return result;
}
```
Và file header để khai báo nguyên mẫu hàm:
```
// bridge.h
double sumArray(double* seq, int size);
```

File Swift chính:
```
// main.swift
var seq: [Double] = [1, 2, 3, 4, 5]
print("Sum = \(sumArray(&seq, CInt(seq.count)))")
```
hoặc:
```
// main.swift
let seq = UnsafeMutablePointer<Double>.allocate(capacity: 5)
defer {
    seq.deallocate()
}
for i in 0..<5 {seq[i] = Double(i + 1)}
print("Sum = \(sumArray(seq, 5))")
```

Mở Terminal và đi đến thư mục chứa 3 file trên. Đầu tiên ta sẽ build file `module.c` qua Object file:
```
$ gcc -c module.c -o module.o 
```
$ Tiếp theo ta sẽ compile file `main.swift` qua file nhị phân để chạy:
```
$ swiftc -o main main.swift module.o -import-objc-header bridge.h
```
Và run file nhị phân vừa build:
```
$ ./main
Sum = 15.0
```

### Gọi hàm C++ từ Swift

Ta sẽ viết một chương trình swift đơn giản để đọc một file ảnh và xuất ra `result.jpg` là ảnh đã được làm mờ. Ta sẽ sử dụng thư viện opencv của `C++` và sử dụng `cv::filter2D` để xử lý ảnh.

Để chạy được code `C++` trong swift, ta phải wrap vào `C` và build thư viện động.

File C++
```
// module.cpp
#include <opencv2/opencv.hpp>

using namespace cv;

extern "C" {
    void blurImage(const char* path) {
        Mat image = imread(path);
        Mat result;
        Mat kernel = Mat::ones(5, 5, CV_32F)/25.0;
        filter2D(image, result, -1, kernel);
        imwrite("result.jpg", result);
    }
}
```
File header khai báo nguyên mẫu:
```
// bridge.h
void blurImage(const char* path);
```
File Swift chính
```
// main.swift
blurImage("input.jpg")
```
Đầu tiên ta build thư viện động cho file `module.cpp`:
```
$ g++ -o module.so -shared -fPIC module.cpp `pkg-config --libs opencv`
```
Cuối cùng ta build file nhị phân từ file Swift:
```
$ swiftc -o main main.swift module.so -import-objc-header bridge.h
```
Đặt một file ảnh tên là `input.jpg` vào thư mục của file nhị phân và file thư viện động vừa build,  chạy `$ ./main` và hưởng thành quả.

Tương tự ta có thể viết một hàm để đọc ảnh grayscale:
```
#include <opencv2/opencv.hpp>

using namespace cv;

extern "C" {
    int** readGrayScaleImage(const char* path) {
        Mat image = imread(path, 0);
        int** result = new int*[image.rows];
        for (int i = 0; i < image.rows; i++) {
            result[i] = new int[image.cols];
            for (int j= 0; j < image.cols; j++)
                result[i][j] = int(image.at<uchar>(i, j));
        }
        return result;
    }
}
```
Khi qua Swift, hàm này sẽ trả về kiểu `UnsafeMutablePointer<UnsafeMutablePointer<CInt>?>?` nên nhớ unwrap và tất nhiên là nhớ giải phóng vùng nhớ của nó trỏ đến.

### Kết luận

Việc gọi hàm C/C++ từ Swift rất dễ dàng, nhờ đó chúng ta có thể sử dụng lại các thư viện của C/C++ chỉ thông qua một vài bước làm. Mong rằng bài viết này bổ ích, giúp các bạn hiểu hơn về Swift.