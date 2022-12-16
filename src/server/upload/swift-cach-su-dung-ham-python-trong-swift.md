### Cài đặt

Tất nhiên đầu tiên ta phải có `python` và `libpython-dev`. Sau đó vào trang [này](https://github.com/tensorflow/swift/blob/master/Installation.md#pre-built-packages) để cài đặt `Toolchain`. Sau đó mở Terminal và dùng lệnh:
```
$ export PATH="/Library/Developer/Toolchains/swift-latest/usr/bin/:$PATH"
```
Kiểm tra:
```
$ which swift
/Library/Developer/Toolchains/swift-latest/usr/bin//swift
```
Thế là ta đã cài đặt thành công `Toolchain` rồi!

### Sử dụng

Để sử dụng `Python` trong `Swift`, ta cần phải `import Python`. Để sử dụng một module của `Python` ta dùng:
```
import Python

let module = Python.import("module_name")
```
Ví dụ:
```
import Python

let np = Python.import("numpy")
let Image = Python.import("PIL.Image")
let cv2 = Python.import("cv2")
let MongoClient = Python.import("pymongo.MongoClient")
```
Để an toàn hơn ta sẽ dùng `Python.attemptImport`:
```
let module = try? Python.attemptImport("module_name")
```
Nếu `module_name` không tồn tại thì `module` sẽ trả về `nil`. Theo mình thì chức năng này dành cho những người không nhớ họ đã cài thư viện gì trong máy.
### PythonObject
Một đối tượng của `Python` sẽ được khai báo như sau:
```
let/var pythonElement: PythonObject = ...
```
Ví dụ:
```
let pythonInt: PythonObject = 1
let pythonFloat: PythonObject = 3.0
let pythonString: PythonObject = "Hello Python!"
let pythonRange: PythonObject = PythonObject(5..<10)
let pythonArray: PythonObject = [1, 2, 3, 4]
let pythonDict: PythonObject = ["foo": [0], "bar": [1, 2, 3]]
```
Để chuyển từ `PythonObject` về các kiểu dữ liệu `Swift`, ta sử dụng ép kiểu tường minh:
```
let int = Int(pythonInt)!
let float = Float(pythonFloat)!
let string = String(pythonString)!
let range = Range<Int>(pythonRange)!
let array: [Int] = Array(pythonArray)!
let dict: [String: [Int]] = Dictionary(pythonDict)!
```
### Cách sử dụng các hàm của Python
Cách sử dụng cũng như là viết `Python`, các toán tử so sánh, cộng trừ,... cũng như trong `Python`. Ví dụ:
```
let one: PythonObject = 1
one == one // true
one < one // false
one + one // 2
Python.type(1) // <class 'int'>
Python.len([1, 2, 3]) // 3
Python.sum([1, 2, 3]) // 6
```
Duyệt mảng cũng như là trong `Python`:
```
let array: PythonObject = [1, 2, 3]
for (i, x) in array.enumerated() {
    print(i, x)
}
```
### Các thư viện của Python
**Numpy**

`numpy` là một module gồm các `API` của `C`, là một bộ thư viện rộng lớn các hàm về đại số tuyến tính,  các biến đổi Fourier, ....  Các hàm của `numpy` có một đặc điểm đặc biệt đó là khi ánh xạ vào một mảng `n` chiều, nó sẽ ánh xạ từng phần tử và trả về một `numpy.ndarray`. Tuy nhiên thời gian khởi tạo một `numpy.ndarray` là rất lớn, nên trừ khi đã tính toán ra `numpy.ndarray` hoặc trừ khi có một lượng lớn phần tử, cần tính toán trên hàm đặc thù của `numpy`, ngoài ra ta thì nên dùng `Array` cho việc khởi tạo hơn là `numpy.ndarray`.

```
// Nên
let x = [1, 2, 3, 4, 5]
let sin_x = np.sin(x)
// Không nên
let x = np.array([1, 2, 3, 4, 5])
let sin_x = np.sin(x)

// Nên
let x = np.array(Array<Int>(0...10000000))
let sin_x = np.sin(x)
// Không nên
let x = Array<Int>(0...10000000)
let sin_x = np.sin(x)

// Nên
let x = np.array([[1, 2], [3, 4]])
let det_x = np.linalg.det(x)
// Không nên
let x = [[1, 2], [3, 4]]
let det_x = np.det(x)
```

**Matplotlib**

Ta hoàn toàn có thể cài đặt `Jupyter Notebook` cho `Swift` để chạy `matplotplib inline`. 
Ở `MacOS`, nếu muốn chạy trên `Command Line`, ta phải có một bước chọn `backend` cho `matplotlib`:
```
import Python

let backend = "TkAgg" // Hoặc "WebAgg"
let matplotlib = Python.import("matplotlib")
matplotlib.use(backend)
let plt = Python.import("matplotlib.pyplot")
```

**TensorFlow**

Ta hoàn toàn sử dụng được các hàm tính toán của `TensorFlow` và tạo các model `Machine Learning` qua thư viện `TensorFlow` bằng cách `import` thư viện đó:
```
import TensorFlow
```
Lưu ý là ta không thể sử dụng `Python.import("tensorflow")` để sử dụng `TensorFlow`.

### Tài liệu tham khảo

[1. Install Swift for TensorFlow](https://github.com/tensorflow/swift/blob/master/Installation.md#pre-built-packages)

[2. Python interoperability](https://colab.research.google.com/github/tensorflow/swift/blob/master/docs/site/tutorials/python_interoperability.ipynb)