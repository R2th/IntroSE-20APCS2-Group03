# Tổng quan:
Tiếp theo trong series Data structures and Algorithms, hôm nay mình sẽ giới thiệu đến các bạn một loại Cấu trúc dữ liệu đơn giản và hay gặp nhất, đó là Array.

# Giới thiệu về Array
**Array** (hay còn gọi là **mảng**) là một trong những kiểu Cấu trúc dữ liệu đơn giản nhất, dùng để lưu trữ liền kề và có chỉ mục. Nếu bạn cần lưu dữ liệu có dạng lặp lại cùng một kiểu thì Array là một sự lựa chọn dành cho bạn.
Các giá trị trong array được gọi là một **element** (hay một **phần tử**)
# Stactic và dynamic
Sự khác biệt lớn nhất của **StaticArray** và **DynamicArray** là **StaticArray** có kích thước cố định, tức là bạn cần chỉ rõ số lượng phần tử của mảng khi khởi tạo còn **DynamicArray** thì không có kích thước cố định.
### StaticArray:
```
  // Khai báo một mảng với kích thước là 2
  final staticArr = List.filled(2, 0, growable: false);
```
Với mảng Static như thế này chúng ta chỉ có thể thay đổi được giá trị các phần tử trong mảng, còn không thể thay đổi kích thước của mảng.
```
void main() {
// Khai báo một mảng với kích thước là 2
final staticArr = List.filled(2, 0, growable: false);
staticArr.add(0);
}
```
Giả sử ta cố tình thêm một phần tử nữa cho mảng, khi chạy ta sẽ gặp lỗi
```
Unhandled exception:
Unsupported operation: Cannot add to a fixed-length list
```
Về cơ bản thì Dart support cả việc mảng có kích thước cố định có thể thêm mới phần tử hoặc không thể thêm mới. Nếu muốn thêm một phần tử vào mảng Static, ta sẽ đổi khai báo biến **growable:true**. Khi đó nếu ta thêm phần tử vào mảng tĩnh, nó sẽ copy toàn bộ mảng cũ sang một vùng nhớ mới với kích thước gấp đôi.

### Dynamic Array
Hiện nay, các ngôn ngữ mới đều support dynamic array, và việc quản lý bộ nhớ đều tự động cấp phát bộ nhớ theo sự gia tăng kích thước của mảng. Chúng ta không cần quan tâm và việc đó đã có máy móc xử lý.

Cách khai báo một mảng động
```
// Dart
final dynamicArr = [];
```

# Một số hàm cơ bản của Array
### Add
Thêm một phần tử vào cuối mảng:
```
dynamicArr.add(1); // O(1)
```
### Pop
Loại bỏ phần tử cuối cùng của mảng:
```
dynamicArr.removeLast(); // O(1)
```
### Delete
Xoá một phần tử ở vị trí bất kì
```
dynamicArr.removeAt(0); //O(n)
```

### Insert
```
dynamicArr.insert(1, 5); //O(n)
```

#### Implementation
```
class MyArray<T> {
  int length = 0;
  Map<int, T> data = {};

  T get(index) {
    if (data[index] == null) {
      throw Exception("");
    }
    return data[index]!;
  }

  int push(T item) {
    data[length] = item;
    return ++length;
  }

  T pop() {
    final lastItem = data[length - 1];
    data.remove(length - 1);
    length--;
    return lastItem!;
  }

  T delete(int index) {
    final item = data[index];
    if (item == null) {
      throw Exception("");
    }
    for (var i = index; i < length - 1; i++) {
      data[i] = data[i + 1]!;
    }
    data.remove(length - 1);
    length--;
    return item;
  }

  void reverse() {
    for (int i = 0; i < length / 2; i++) {
      final temp = data[i];
      data[i] = data[length - 1 - i]!;
      data[length - 1 - i] = temp!;
    }
  }

  @override
  String toString() {
    var result = "[";
    data.forEach((key, value) {
      result += "{${key}:${value}},";
    });
    result += "]";
    return result;
  }
}
```

Nhìn vào đoạn code phía trên, chúng ta có thể dễ dàng hiểu được vì sao việc Pop,Push của mảng thì rất nhanh, còn insert hay delete lại mất thời gian hơn.
# Tổng kết
### Ưu điểm:
1. Fast lookups
2. Fast push
3. Fast pop
4. Có thứ tự

### Nhược điểm
* Slow inserts
* Slow delete
* Fixed size* ( nếu dùng mảng tĩnh)

Mảng là một loại cấu trúc dữ liệu vô cùng tuyệt vời, cho phép chúng ta nhanh chóng thêm và xoá phần tử ở cuối mảng, đồng thời khi cần lấy một phần tử có chỉ số nhất định để xử lý.

Trong các bài tiếp theo, chúng ta sẽ tiếp tục tìm hiểu về các loại cấu trúc dữ liệu Hash table, và chúng ta sẽ có thêm những so sánh, đánh giá để có thể tuỳ biến trong các trường hợp khác nhau.

[Bài tiếp theo](https://viblo.asia/p/data-structures-hash-table-YWOZrGnRlQ0)

[Link Github](https://github.com/hieu-dd/data-structures-algorithms/tree/master/bin/datastructures)