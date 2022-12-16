# Giới thiệu
Hash Table là một cấu trúc dữ liệu vô cùng quan trọng có ở  hầu hết các ngôn ngữ, là một tronng nhữg nền tảng của Cấu trúc dữ liệu và thuật toán.<br>
Hash table là một cấu trúc dữ liệu lưu dữ liệu theo một cặp **key - value**, nó sử dụng một hàm Hash để tính toán vị trí lưu dữ liệu, nơi đó sẽ lưu một bucket để ta có thể tìm dữ liệu.
# Giải thích
Có thể giải thích tương tự như việc cất sách và tìm sách trong thư viện, mỗi quyển sách sẽ khi được nhận về sẽ được đánh giá vào một thể loại riêng (tương tự như hàm Hash). Sau khi biết được thể loại của sách, chúng ta sẽ để nó vào khu vực của loại sách đó. Do đó mỗi một vị trí để sách sẽ có nhiều quyển sách cùng loại (tương tự như **Hash Collisions** chúng ta sẽ tìm hiểu ở bước tiếp theo) <br>
Khi đó, mỗi khi có một người tìm một quyển sách, nhân viên thư viện có thể tra cứu và biết được quyển sách đó thuộc thể loại gì ở khu vực nào và đến khu vực đó để tìm sách<br>
# Hash function
Là một giải thuật nhằm sinh ra một giá trị với mỗi khối dữ liệu (có thể là String hay một đối tượng trong lập trình hướng đối tượng). Với mỗi một đầu vào giống nhau, hàm băm phải luôn sinh ra cùng một giá trị.<br>
Hash function dễ dàng có thể implement nhất là dựa trên mã ACSII của kí tự<br>
Giả sử ta có bộ nhớ cho Hash là 1000
Ví dụ như dựa trên công thức: 
Giả sử ta 
```
(s.charAt(0) * n + s.charAt(1) * (n-1) + ... + s.charAt(n-1)) % 1000
```
Thì với chuỗi "ABC" khi hash ta sẽ có
```
"ABC" = ('A' * 3 + 'B' * 2 + 'C') % 1000 = 394
```
Như vậy ABC sẽ có địa chỉ **394**<br>
**Như vậy khi tìm dữ liệu với key là "ABC", ta sẽ tìm value ở địa chỉ 394**

# Hash Collision
Như ví dụ trên về Hash Function, chúng ta có thể thấy sẽ có những trường hợp mà khác đầu vào nhưng hàm Hash cũng sẽ trả ra cùng giá trị. Vấn đề xảy ra khi hàm Hash không đủ tôt, và cũng sẽ không có thuật toán nào hoàn hảo nếu dữ liệu đầu vào quá lớn, do đó chúng ta cần giải quyết vấn đề Hash Collision này.<br>
Để giải quyết vấn đề này, chúng ta có thể dùng hàm Hash để hash ra địa chỉ, rồi lưu cả cặp key-value vào địa chỉ với một mảng hoặc một Linked-List. Rồi khi tìm kiếm, chúng ta sẽ dùng hàm Hash để lấy địa chỉ, sau đó tìm kiếm giá trị trong mảng hoặc linked-list đó với key thật. Tương tự như việc đi đến khu vực của thể loại sách ở thư viện rồi chúng ta tìm sách.

# Các hàm cơ bản của Hash Table
Hash Table có hai hàm cơ bản đó là Set và Get
### Set
```
 myHash.set("ABC", 12345); // O(1) 
```
Hàm set nhận vào một cặp Key-Value
### Get
```
 myHash.get("ABC"); // O(1) average và O(n) worst
```
Hàm get sẽ nhận vào một key và trả về một giá trị.
# Implement
Sau đây mình sẽ implement một Hash table để các bạn có thể hiểu thêm và dễ hình dung:
```
class MyHashTable {
  final int size;

  late final List<List<KeyValue>?> _data;

  MyHashTable(this.size) {
    _data = List.filled(size, null);
  }

  int _hash(dynamic key) {
    var hash = 0;
    key.toString().runes.forEach((element) {
      hash += element;
    });
    return hash % size;
  }

  void set(key, value) {
    final address = _hash(key);
    if (_data[address] == null) {
      _data[address] = [];
    }
    _data[address]!.add(KeyValue(key.toString(), value));
  }

  dynamic get(key) {
    final address = _hash(key);
    final bucket = _data[address];
    try {
      return bucket?.firstWhere((element) => element.hasKey(key)).value;
    } catch (error) {
      return null;
    }
  }

  List<dynamic> keys() {
    return _data
        .toList()
        .expand(
            (element) => ((element ?? <KeyValue>[]).map((e) => e.key).toList()))
        .toList();
  }

  @override
  String toString() {
    return _data.toString();
  }
}

class KeyValue {
  final String key;
  final dynamic value;

  KeyValue(this.key, this.value);

  bool hasKey(dynamic key) => this.key == key.toString();

  @override
  String toString() {
    return "{key:$key,value:$value}";
  }
}
```

Qua ví dụ trên, các bạn có thể dễ hình dung hơn về việc **Set** hay **Get** data của Hash Table, cũng như cách giải quyết **Collision** của Hash.<br>
Các bạn cũng có thể hiểu vì sao trong trường hợp bình thường, việc Get data của Hash table là **O(1)** nhưng trong trường hợp số lượng dữ liệu đầu vào quá lớn so với kích thước địa chỉ của hàm Hash thì việc get Data lại là **O(n)**

# Tổng kết
### Ưu điểm
* Fast lookups* (Cần cách giải quyết Collision tốt)
* Fast inserts
* Flexible keys

### Nhược điểm
* Không có thự tự
* Lấy phần tử chậm nếu giải quyết Collision không tốt

# So sánh với Array
Array mạnh hơn HashTable trong trường hợp cần lưu dữ liệu cùng loại, có tính lặp lại, ít insert, delete, thường xuyên truy cập phần tử.<br>
HashTable mạnh hơn trong trường hợp thường xuyên insert, delete, không cần dữ liệu có thứ tự.

Hi vọng qua bài viết này, chúng ta sẽ hiểu thêm về Hash Table và cách sử dụng của nó.

[Bài trước](https://viblo.asia/p/data-structures-arrays-RnB5pOJYlPG)

[Bài tiếp theo](https://viblo.asia/p/singly-linked-list-924lJBzWlPM)

[Link Github](https://github.com/hieu-dd/data-structures-algorithms/tree/master/bin/datastructures)
### Goodluck