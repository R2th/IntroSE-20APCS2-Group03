Link bài viết gốc: https://gpcoder.com/2645-hashmap-trong-java-hoat-dong-nhu-the-nao/
# Cấu trúc dữ liệu bên trong HashMap
HashMap lưu trữ dữ liệu ở dạng các cặp key-value (khóa-giá trị). Mỗi cặp key-value được lưu trữ trong một đối tượng của lớp Entry<K, V>. Lớp học bên trong này có bốn trường: key (khóa), value (giá trị), next (phần tử kế tiếp) và hash (giá trị băm).

* key: lưu khóa của một phần tử và giá trị khóa này là final.
* value: lưu giá trị của phần tử.
* next: lưu giữ con trỏ tới cặp khóa-giá trị tiếp theo. Thuộc tính này làm cho các cặp khóa-giá trị được lưu trữ dưới dạng một danh sách liên kết.
* hash: lưu giữ mã băm (hashcode) của khóa.

![](https://images.viblo.asia/14c2020c-6006-43e0-9b65-ff6a3399c9d4.png)

Lớp HashMap trong Java sử dụng một hashtable để cài đặt (implements) Map Interface. Cấu trúc lưu trữ bên trong của HashMap như sau:
![](https://images.viblo.asia/b19b27c2-f9ae-4918-bba0-4dca720d4dc1.png)

Hình ảnh trên cho thấy cách HashMap lưu trữ các phần tử của nó. Bên trong HashMap sử dụng một mảng Entry<K, V> được gọi là table[] để lưu trữ các cặp khóa-giá trị.

HashMap không chèn các đối tượng khi bạn đặt (put) chúng vào phần tử HashMap ngay. Thay vào đó, nó sử dụng mã băm (hashcode) của khóa để quyết định chỉ mục (index) cho cặp giá trị-cặp cụ thể. Nó được gọi là Hashing.

# Hashing là gì?
Toàn bộ cấu trúc dữ liệu HashMap dựa trên nguyên tắc Hashing. Hashing là chức năng hoặc thuật toán hoặc phương pháp mà khi áp dụng cho bất kỳ đối tượng / biến trả về một giá trị số nguyên duy nhất đại diện cho rằng đối tượng / biến. Giá trị số nguyên duy nhất này được gọi là mã băm (hash code).

Hàm Hash được gọi là tốt nếu nó trả về cùng một mã băm mỗi khi nó được gọi trên cùng một đối tượng. Hai đối tượng có thể có cùng một mã băm (hash code).

Bất cứ khi nào bạn chèn cặp khóa-giá trị mới bằng cách sử dụng phương thức put(), HashMap không chèn lập tức vào table[]. Thay vào đó, nó sẽ gọi hàm băm trên khoá (key). HashMap có hàm băm riêng để tính toán mã băm của khoá (key).

## Phương thức hashCode() và equals()
HashMap sử dụng phương thức hashCode và equals để thêm vào (put) và lấy lại (get) phần từ một tập hợp tương ứng. Khi hàm put() đuợc gọi, HashMap tính toán giá trị hash (giá trị băm) của khoá và lưu trữ cặp giá trị (key-value) đuợc đánh chỉ mục (index) thích hợp vào tập hợp. Nếu khoá đã tồn tại, giá trị của nó đuợc cập nhật (update) bằng giá trị mới.

Nếu 2 hàm này không đuợc cài đặt (implement) chính xác, như 2 khoá khác nhau lại cho ra hash code (giá trị đã băm) giống nhau và vì vậy chúng sẽ đuợc xem như là bằng nhau trong tập hợp. Hai hàm này còn sử dụng để phát hiện trùng lặp. Nên việc cài đặt 2 hàm là yếu tốt then chốt để kiểm tra tính đúng đắn của HashMap.

# Phương thức put() hoạt động như thế nào?
Dưới đây là cách thực hiện mã của phương thức put() trong lớp HashMap:
![](https://images.viblo.asia/85310e43-563f-44c9-900a-a09c9e125f0e.png)

Hãy xem đoạn mã này hoạt động như thế nào:

Bước 1: Kiểm tra đầu tiên liệu khóa có giá trị hay không. Nếu khóa là null, nó gọi phương thức putForNullKey(). table[0] luôn luôn được dành riêng cho khóa rỗng. Bởi vì, mã băm của null là 0.

Bước 2: Nếu khóa không phải là null, thì nó sẽ tính toán mã băm (hash code) của khóa bằng cách gọi phương thức hash().

Bước 3: Gọi lệnh indexFor() bằng cách truyền mã băm được tính trong bước 2 và chiều dài của mảng table[]. Phương thức này trả về chỉ mục trong mảng table[] cho cặp cặp khóa-giá trị được chỉ định.

Bước 4: Sau khi nhận được chỉ mục, nó sẽ kiểm tra tất cả các khóa có trong danh sách liên kết (linked list) tại chỉ mục đó. Nếu khóa đã có trong danh sách liên kết, nó sẽ thay thế giá trị cũ bằng giá trị mới.

Bước 5: Nếu khoá không có trong danh sách được liên kết, nó sẽ nối thêm cặp khóa-giá trị được xác định ở cuối danh sách liên kết.

![](https://images.viblo.asia/f7e9d226-4f80-42ca-96ff-5d6016d2380c.png)

# Phương thức get() hoạt động như thế nào?
Dưới đây là cách thực hiện mã của phương thức get() trong lớp HashMap:
![](https://images.viblo.asia/53a2808d-bc7b-4594-bd9b-23d01a3b3f22.png)

Hãy xem đoạn mã này hoạt động như thế nào:

Bước 1: Kiểm tra đầu tiên liệu khóa có giá trị hay không. Nếu khóa là null, nó gọi phương thức getForNullKey().

Bước 2: Nếu khóa không phải là null, mã băm (hash code) của khoá được chỉ định sẽ được tính.

Bước 3: indexFor() phương pháp được sử dụng để tìm ra các chỉ số của các khóa quy định trong mảng table[].

Bước 4: Sau khi nhận được chỉ mục, nó sẽ lặp mặc dù danh sách liên kết (linked list) ở vị trí đó và kiểm tra phương pháp sử dụng bằng phương thức equals(). Nếu tìm thấy khóa, nó trả về giá trị liên kết với nó. nếu không trả về null.

# Ví dụ hoạt động của HashMap
![](https://images.viblo.asia/a86a7d7e-78b2-4617-97e1-a02302d9d43e.png)
Kết quả thực thi chương trình trên:

hashCode for key: vishal = 118
hashCode for key: sachin = 115
hashCode for key: vaibhav = 118
 
hashCode for key: sachin = 115
Value for key sachin: 30
hashCode for key: vaibhav = 118
Value for key vaibhav: 40
### Giải thích hoạt động của chương trình trên:

**line 1: Khởi tạo hashMap rỗng: bảng tính hashmap được kích thước là 16**

`Map<Key, Integer> map = new HashMap<>(); // line 1`

![](https://images.viblo.asia/fce6dfe3-ebf4-4d13-a57b-d0f84c976744.png)

**line 2: Chèn cặp khóa-giá trị: Đặt một cặp khóa-giá trị ở trên HashMap**

map.put(new Key("vishal"), 20); // line 2

Các bước:
* Tính mã băm (hash code) của khóa {“vishal”}. Nó sẽ được tạo ra là 118.
* Tính chỉ số (index) bằng cách sử dụng phương pháp chỉ số sẽ là 6.

Tạo một đối tượng node như sau:
```
{

int hash = 118

Key key = {“vishal”}

Integer value = 20

Node next = null

}
```

Đặt đối tượng này ở chỉ số 6, nếu không có đối tượng nào khác được trình bày ở đó.
Bây giờ HashMap trở thành:

![](https://images.viblo.asia/1c0a6c2e-71ec-4bb8-8c6a-a64bcda62231.png)

**line 3: Chèn cặp khóa-giá trị: Đặt một cặp khóa-giá trị khác ở trên HashMap**

`map.put(new Key("sachin"), 30); // line 3`

Các bước:

Tính mã băm (hash code) của khóa {“sachin”}. Nó sẽ được tạo ra là 115.
Tính chỉ số (index) bằng cách sử dụng phương pháp chỉ số sẽ là 3.
Tạo một đối tượng node như sau:
```
{

int hash = 115

Key key = {“sachin”}

Integer value = 30

Node next = null

}
```

Đặt đối tượng này ở chỉ số 3, nếu không có đối tượng nào khác được trình bày ở đó.
Bây giờ HashMap trở thành:

![](https://images.viblo.asia/d101ce8c-ee26-4155-a976-1af3d0bde181.png)

**line 4: Chèn cặp khóa-giá trị: Đặt một cặp khóa-giá trị khác ở trên HashMap**

`map.put(new Key("vaibhav"), 40); // line 4`

Các bước:

* Tính mã băm (hash code) của khóa {“vaibhav”}. Nó sẽ được tạo ra là 118.
* Tính chỉ số (index) bằng cách sử dụng phương pháp chỉ số sẽ là 6.
Tạo một đối tượng node như sau:
```
{

int hash = 118

Key key = {“vaibhav”}

Integer value = 40

Node next = null

}
```

Đặt đối tượng này ở chỉ số 6, nếu không có đối tượng nào khác được đặt ở đó.
Trong trường hợp này, một đối tượng nút được tìm thấy tại chỉ số 6. Do đó, cần kiểm tra qua phương thức hashCode() và equals() nếu cả hai khóa đều giống nhau.
Nếu các khóa (key) giống nhau, hãy thay giá trị (value) bằng giá trị hiện tại.
Nếu không thì thêm phần tử vào cuối danh sách liên kết (linked list) và cả hai đều được lưu trữ tại chỉ mục 6.

Bây giờ HashMap trở thành:

![](https://images.viblo.asia/6e6f3977-1727-41f2-9e7d-2bf3e48733a6.png)

**line 5:Tìm dữ liệu cho key “sachin”:**

`map.get(new Key("sachin"); // line 5`

Các bước:

* Tính mã băm (hashcode) của Key {“sachin”}. Nó sẽ được tạo ra là 115.
* Tính chỉ số (index) bằng cách sử dụng phương thức index sẽ là 3.
* Đi tới chỉ số 3 của mảng và so sánh phần tử của phần tử đầu tiên với khóa đã cho. Nếu cả hai đều bằng (equal) thì trả lại giá trị, nếu không thì kiểm tra các phần tử tiếp theo nếu có.
* Trong trường hợp này, nó được tìm thấy như là phần tử đầu tiên và giá trị trả về là 30.

**line 6: Tìm dữ liệu cho key “sachin”:**

`map.get(new Key("vaibhav"); // line 6`

Các bước:

* Tính mã băm (hashcode) của Key {“vaibhav”}. Nó sẽ được tạo ra là 118.
* Tính chỉ số (index) bằng cách sử dụng phương thức index sẽ là 6.
* Đi tới chỉ số 6 của mảng và so sánh phần tử của phần tử đầu tiên với khóa đã cho. Nếu cả hai đều bằng (equal) thì trả lại giá trị, nếu không thì kiểm tra các phần tử tiếp theo nếu có.
* Trong trường hợp này, nó được tìm thấy ở phần tử đầu tiên và giá trị trả về là 30.
* Trong trường hợp này, nó không được tìm thấy ở phần tử đầu tiên và giá trị tiếp theo của đối tượng nút (node) không phải là null.
    * Nếu tiếp theo của nút (node) thì trả về null.
    * Nếu nút (node) kế tiếp không phải là null thì đi qua phần tử thứ hai và lặp lại bước 3 cho đến khi không tìm thấy khóa hoặc tiếp theo không phải là null.
    
Nguồn: https://gpcoder.com/2645-hashmap-trong-java-hoat-dong-nhu-the-nao/