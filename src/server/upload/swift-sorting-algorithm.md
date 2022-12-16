1 bài viết của tác giả Dejan đã viết một bài viết về sự sắp xếp các thuật toán [an amazing article](https://agostini.tech/2017/01/10/implementing-common-sorting-algorithms-in-swift/), ông đã so sánh các thuật toán sắp xếp phổ biến với thuật toán sắp xếp của ngôn ngữ swift. Kết luận của ông là thuật toán sắp xếp của swift nhanh hơn rất nhiều so với bất kỳ thuật toán sort đồng thời nào khác. Bây giờ swift là mã nguồn mở, chúng ta thực sự có thể kiểm tra từ mã nguồn mà thuật toán thực sự được sử dụng bởi swift array.

<br>

> Một bài toán: Hãy giả sử rằng chúng ta có một danh sách các đối tượng đến từ networking layer  đã được sắp xếp, người dùng chỉnh sửa một phần tử và chúng ta phải sắp xếp lại mảng. Có hiệu quả để làm điều đó bằng cách sử dụng swift sort?
> 
<br>

Tôi đã thấy nhiều lần việc sử dụng sort() trên main thread giống như nó là quyền truy cập vào một biến. Thực tế đó không phải là code mà chúng ta trực tiếp sở hữu, thường khiến chúng ta quên rằng có rất nhiều tính toán đằng sau sự sắp xếp đó.

### Which is the ideal sorting algorithm?

Rất khó để tìm kiếm một thuật toán hoàn hảo. Mỗi thuật toán sắp xếp mà ta đã biết có thể có một ứng dụng thực tế dựa trên tình huống bạn tìm thấy trong ứng dụng của mình.

<br>
Vẫn có một danh sách các yêu cầu mà thuật toán sắp xếp phải kiểm tra để được coi là hoàn hảo:

* **It must be stable**: Các yếu tố bằng nhau phải duy trì cùng một thứ tự.
* **It must be in-place**: sử dụng thêm không gian O(1).
* **Its worst case**: phải có độ phức tạp  O( n log(n) )
* **It must be adaptive**: có nghĩa là trên các bộ sưu tập đã được sắp xếp độ phức tạp thời gian phải có xu hướng O(n)

### IntroSort
**IntroSort** là thuật toán được sử dụng bởi swift để sắp xếp một collection. Introsort là một thuật toán lai được phát minh bởi David Musser vào năm 1993 với mục đích đưa ra một thuật toán sắp xếp chung cho thư viện chuẩn C ++. Việc triển khai cổ điển của introsort mong đợi Quicksort đệ quy với dự phòng cho Heapsort trong trường hợp mức độ sâu đệ quy đạt đến mức tối đa nhất định. Tối đa phụ thuộc vào số lượng phần tử trong bộ sưu tập và nó thường là 2 * log (n). Lý do đằng sau sự cố này, vì nếu Quicksort không thể có được giải pháp sau khi thu hồi 2 * log (n), có lẽ nó đã gặp phải trường hợp xấu nhất và nó đang xuống cấp độ phức tạp O(n2). Để tối ưu hóa hơn nữa thuật toán này, để thực hiện nhanh chóng, có thêm một bước trong mỗi lần đệ quy trong đó phân vùng được sắp xếp bằng InsertsSort nếu số lượng phân vùng nhỏ hơn 20.

<br>

Số 20 là số thực nghiệm thu được khi quan sát hành vi của InsertsSort với các danh sách có kích thước này. Về cơ bản, có thể thống kê rằng InsertsSort có xu hướng O (n) với các bộ sưu tập nhỏ.

<br>

pseudocode của introSort sẽ có dạng như thế này:

```
procedure sort(A : array):
    let maxdepth = ⌊log(length(A))⌋ × 2
    introSort(A, maxdepth)

procedure introsort(A, maxdepth):
    n ← length(A)
    if n < 20:
        insertionsort(A)
    else if maxdepth = 0:
        heapsort(A)
    else:
        p ← partition(A)  // the pivot is selected using median of 3
        introsort(A[0:p], maxdepth - 1)
        introsort(A[p+1:n], maxdepth - 1)
```

### Comparison

Đây là 1 một [project](https://github.com/gringoireDM/IntroSortCompare) để so sánh hiệu suất của introsort với các thuật toán sắp xếp nổi tiếng khác. Project này tạo ra ba mảng random 100.000 số với kiểu UInt64 . Ba mảng này giống hệt nhau. Sự khác biệt là trong cách chúng ta lưu trữ các con số.

1. Đầu tiên là một mảng [UInt64] trống.

2. Thứ hai là một mảng **MyUInt64** là một cấu trúc có chứa giá trị biến là UInt64. Mảng này được tạo ra để quan sát hành vi của mảng với các phần tử không tuân theo Comparable
3. Thứ ba là một mảng **MyUInt64Object** là một NSObject chứa giá trị biến là UInt64. Mảng này có mục đích quan sát hành vi của mảng với các phần tử là NSObjects.

<br>

Kết quả khá thú vị. Run project, chúng ta quan sát ngay một sự khác biệt lớn giữa việc sử dụng *sort()* so với *sorted(by: )*

> `comparableArray.sorted(by: <)`
> 
> 🔸 Swift sort:  1,9 * 10 -2 ± 0,2 * 10 -2
> 
> `comparableArray.sorted()`
>
>🔶 No predicate:  7,2 * 10 -3 ± 0,6 * 10 -3  | 2.7 times faster than swift sort with a predicate
>

<br>


Không có một vị từ rõ ràng, thuật toán swift tương tự nhanh hơn gần 3 lần so với phiên bản có closure để ước tính thứ tự của các phần tử trong mảng.

<br>

Nếu chúng ta xem mã nguồn trong project GitHub, chúng ta có thể thấy rằng việc triển khai là template. Về cơ bản, mã cho sort() được sao chép để triển khai sorted(by: ) với sự khác biệt trong trường hợp thứ hai, phép so sánh được thực hiện thông qua closure được truyền trong tham số, trong khi phiên bản đầu tiên chỉ so sánh hai phần tử bằng cách sử dụng < operator. Việc truy cập vào việc closure làm chậm đáng kể hiệu suất sắp xếp.

<br>

Một sự khác biệt quan trọng khác là so sánh kết quả của mảng **MyUInt64Object** với hai loại kia. Sắp xếp một mảng **NSObjects** luôn chậm hơn thuật toán sắp xếp tương tự được sử dụng trên một collection của **Structs**.

<br>

Đây là kết quả nghiên cứu của Giuseppe Lanza :

<br>

![](https://images.viblo.asia/1795953f-d662-41bb-83a8-933cab0209f1.png)

**Please note**: Mergesort luôn chậm hơn so với in-place concurrents. Lý do là nó không tồn tại một triển khai thực sự hiệu quả của thuật toán này. Việc triển khai sắp xếp hợp nhất của chúng ta dựa trên các mảng và cấu trúc dữ liệu mảng swift không phải là cấu trúc dữ liệu mảng c lý tưởng.

* Truy cập bất kỳ giá trị nào tại một chỉ mục cụ thể trong một mảng là kém nhất O(log n), nhưng thường phải là O(1)
* Chèn hoặc xóa một đối tượng là kém nhất O(n log (n)) nhưng thường sẽ là O(1).

Bài viết được dịch theo [bài viết](https://agostini.tech/2017/12/18/swift-sorting-algorithm/) cùng tên của tác giả Giuseppe Lanza