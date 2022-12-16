## Đặt vấn đề

Hôm trước trong khi code một project Android, mình chợt thấy Android Studio gợi ý mình nên chuyển từ HashMap sang SparseArray. Ban đầu mình không hiểu vì sao lại phải chuyển và chuyển như vậy có ích gì. Vì thế mình quyết định lên StackOverFlow tìm kiếm câu trả lời. Sau đó mình đọc được một topic của một bạn cũng đang thắc mắc giống như mình. Vì vậy mình chia sẻ lại để anh em cùng đọc để hiểu hơn nhé.

## Câu hỏi

Tôi có thể kể ra vài lý do giúp các `HashMap` với key có kiểu `Integer` sẽ tốt hơn nhiều so với các `SparseArray` :
1. Tài liệu Android cho `SparseArray` nói rằng "Nó thường chậm hơn `HashMap` truyền thống".
2. Nếu bạn viết code bằng `HashMap` chứ không phải `SparseArray`, mã của bạn sẽ hoạt động với các triển khai khác của `Map` và bạn sẽ có thể sử dụng tất cả các API Java được thiết kế cho `Map`.
3. Nếu bạn viết code bằng `HashMap` chứ không phải `SparseArray`, code của bạn sẽ hoạt động trong cả các dự án không phải là Android.
4. `Map` override các phương thức `equals()` và `hashCode()` trong khi `SparseArray` thì không.
 
Tuy nhiên, bất cứ khi nào tôi cố gắng sử dụng `HashMap` với các key có kiểu `Integer` trong một dự án Android, IntelliJ luôn nói với tôi rằng tôi nên sử dụng `SparseArray` thay thế. Tôi thấy điều này thực sự khó hiểu. Có ai biết bất kỳ lý do thuyết phục nào cho việc sử dụng `SparseArray` không ?

## Câu trả lời

`SparseArray` có thể được dùng để thay thế cho `HashMap` khi khoá là kiểu dữ liệu nguyên thuỷ. Có một vài biến thể cho những kiểu key/value khác, mặc dù không phải tất cả chúng đều có sẵn một cách công khai.


### Lợi ích và hạn chế của SparseArray

Lợi ích của chúng là:
- Cấp phát tự do
- Không phải boxing

*(\*) Boxing hiểu đơn giản là việc đưa một giá trị vào bên trong một đối tượng (int -> Integer, long -> Long...)*

Các hạn chế là:
- Thường sẽ chậm hơn, không dùng tốt cho các collection lớn
- Chúng không hoạt động trong các dự án ngoài Android.

### Các SparseArray thay thế cho HashMap

`HashMap` có thể được thay thế bởi `SparseArray` như dưới đây:

| HashMap | SparseArray |
| -------- | -------- |
| HashMap<Integer, Object>     | SparseArray     |
| HashMap<Integer, Boolean>     | SparseBooleanArray     |
| HashMap<Integer, Integer>     | SparseIntArray     |
| HashMap<Integer, Long>     | SparseLongArray     |
| HashMap<Long, Object>     | LongSparseArray     |
| HashMap<Long, Long>     | LongSparseLongArray     |

*(\*) LongSparseLongArray được ẩn nhưng ta có thể đọc được [source code](https://android.googlesource.com/platform/frameworks/base.git/+/master/core/java/android/util/LongSparseLongArray.java).*

### So sánh kích thước SparseArray với HashMap

Về mặt bộ nhớ, đây là một ví dụ về `SparseArray` so với `HashMap<Integer, Integer>` cho 1000 phần tử:

#### SparseArray
```Java
class SparseIntArray {
    int[] keys;
    int[] values;
    int size;
}
```

- Kích thước Class = 12 + 3 * 4 = 24 bytes
- Kích thước Array = 20 + 1000 * 4 = 4024 bytes (có 2 mảng)
- Tổng cộng = **8,072 bytes**

#### HashMap
```Java
class HashMap<K, V> {
    Entry<K, V>[] table;
    Entry<K, V> forNull;
    int size;
    int modCount;
    int threshold;
    Set<K> keys
    Set<Entry<K, V>> entries;
    Collection<V> values;
}
```
- Kích thước Class = 12 + 8 * 4 = 48 bytes
- Kích thước Entry = 32 + 16 + 16 = 64 bytes
- Kích thước Array = 20 + 1000 * 64 = 64024 bytes
- Tổng cộng = **64,136 bytes**

-----

Các số ở trên là dung lượng bộ nhớ (tính bằng byte) được phân bổ trên Heap bởi JVM. Chúng có thể thay đổi tùy thuộc vào JVM cụ thể được sử dụng. Từ so sánh trên, ta dễ dàng thấy được `SparseArray` đã giúp ta tiết kiệm gấp 8 lần bộ nhớ so với `HashMap`.

Gói `java.lang.instrument` chứa một số phương thức hữu ích cho các phép toán nâng cao như kiểm tra kích thước của một đối tượng bằng `getObjectSize(Object objectToSize)`.

### Cách tính kích thước bộ nhớ
* Kích thước Class = 12 bytes + (số lượng các biến thể hiện) * 4 bytes
* Kích thước Array = 20 bytes + (số lượng phần tử) * (kích thước mỗi phần tử)
* Kích thước Entry = 32 bytes + (kích thước phần tử đầu tiên) + (kích thước phần tử thứ 2)

## Tổng kết
Đối với đa số trường hợp phải lưu một đối tượng chứa các ánh xạ mà kích thước không quá lớn trong Android, ta nên ưu tiên sử dụng SparseArray để tiết kiệm bộ nhớ. Hy vọng bài viết này sẽ hữu ích đối với các bạn.

Source: https://stackoverflow.com/a/31413003/10499006