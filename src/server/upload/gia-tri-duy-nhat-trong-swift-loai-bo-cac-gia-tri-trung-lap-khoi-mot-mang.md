## Loại bỏ các phần tử trùng lặp khỏi một mảng 

> Loại bỏ các phần tử trùng lặp để có được các giá trị duy nhất trong một mảng là một nhiệm vụ khá phổ biến. Các ngôn ngữ khác như Ruby có các methods tích hợp sẵn như `uniq`  nhưng trong swift thì chúng ta phải tự tạo ra các phương thức như vậy. Thư viện tiêu chuẩn thì không cung cấp một phương thức dễ dàng để làm điều này.
> 
> Có rất nhiều cách để đạt được kết quả tương tự và mỗi cách đều có ưu và nhược điểm riêng. Hãy cùng lướt qua chúng và xem phương pháp nào hoạt động tốt nhất cho trường hợp sử dụng của bạn.

### 1. Sử dụng Set để xóa các phần tử trùng lặp theo mặc định

Trước khi chúng ta bắt đầu đi sâu vào các tiện ích mở rộng để loại bỏ các trùng lặp khỏi một mảng, thật tốt khi nhìn vào **Set** trong swift. **Set** theo mặc định chỉ chứa các giá trị duy nhất và có thể đạt được kết quả mà bạn hướng tới.

Thiết lập **Set** nếu:

* Không quan trọng thứ tự 
* Bạn muốn có các phần tử duy nhất theo mặc định 

```
let array: [Int] = [1, 1, 1, 2, 2, 2, 3, 3, 3]
let set: Set<Int> = [1, 1, 1, 2, 2, 2, 3, 3, 3]

print(array) // prints: [1, 1, 1, 2, 2, 2, 3, 3, 3]
print(set)   // prints: [2, 3, 1]
```

Đây là một quyết định thiết kế code nhiều hơn, khi bạn quyết định làm việc với **Set** so với **Array**. **Set** có lợi ích của việc trở nên hiệu quả hơn cũng là điều khiến chúng trở thành một ứng cử viên sáng giá để giải quyết vấn đề. 
Không cần đi sâu vào chi tiết về sự khác biệt giữa **Set** và **Array**, thật tốt khi biết rằng **Set** không sắp xếp thứ tự. Nếu việc giữ thứ tự là quan trọng trong trường hợp của bạn, bạn có thể không cần làm việc với **Set** . Bạn có thể sử dụng `NSOrderedset` nhưng lớp này không cung cấp cho bạn kiểu hoàn thành và bạn sẽ phải làm việc với `Any` instances.

### 2. Loại bỏ các phần tử trùng lặp khỏi một mảng với phần mở rộng

Khi thứ tự của các phần tử là cần thiết, chúng ta có thể tiếp tục làm việc với một **Array** và nhận các giá trị duy nhất bằng cách sử dụng tiện ích mở rộng tùy chỉnh.

Thiết lập **Array** nếu:

*  Quan trọng thứ tự 
*  Bạn không thể dễ dàng chuyển sang **Set**

Chúng ta phải tạo một tiện ích mở rộng để cho phép chúng ta lọc ra các phần tử trùng lặp. Điều quan trọng là phải ghi nhớ hiệu suất khi tạo tiện ích mở rộng đó vì chúng ta có thể dễ dàng tăng độ phức tạp lên **o(N²)**. Nói tóm lại, điều này có nghĩa là bạn càng có nhiều phần tử, hiệu suất sẽ càng giảm dần.

Đoạn code sau dựa vào giao thức **Hashable** để khớp các phần tử và có độ phức tạp là **o (N)**. Điều này có nghĩa là 3 phần tử yêu cầu 3 lần lặp, 10 phần tử yêu cầu 10 lần lặp, v.v.

```
extension Sequence where Iterator.Element: Hashable {
    func unique() -> [Iterator.Element] {
        var seen: Set<Iterator.Element> = []
        return filter { seen.insert($0).inserted }
    }
}

print(array.unique()) // prints: [1, 2, 3]
```

Hãy cùng tìm hiểu method `unique() ` này :

*  Chúng ta tạo một **Set** để theo dõi các object nhìn thấy 
*  Một bộ lọc được sử dụng để lặp lại trên tất cả các đối tượng
*  phương thức `insert (_ :) `trả về một **tuple** bao gồm một kiểu **boolean** được chèn và được thiết lập là `true` nếu object được chèn và là `false` nếu không
*  Giá trị boolean chèn vào được sử dụng để lọc các phần tử trùng lặp ra khỏi mảng của chúng ta

Kết quả cuối cùng là một mảng có cùng thứ tự nhưng không có các phần tử trùng lặp. Nhược điểm duy nhất là các phần tử của bạn cần tuân thủ giao thức **Hashable** nhưng điều này không phải là vấn đề lớn. Trong thực tế, nhiều loại trong thư viện chuẩn đã tuân thủ giao thức, như **String**, **Int** và giá trị **Boolean**. Giao thức **Hashable** được sử dụng để xác định xem một phần tử có bằng với một object hiện có hay không và do đó bắt buộc phải có các giá trị duy nhất.

### 3. Kết luận 

Khi bạn muốn lấy các phần tử duy nhất của bộ sưu tập, bạn có thể tìm đến **Set** hoặc tiện ích mở rộng trên **Array**.

* Nếu không quan trọng thứ tự , hãy tìm đến **Set**
* Nếu muốn giữ thứ tự và tìm nạp các phần tử duy nhất thì hãy làm việc với phần mở rộng trên một **Array** 

Vậy là bài viết của mình đến đây là hết 😁. Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn.

Cảm ơn các bạn đã theo dõi bài viết. 😃