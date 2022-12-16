Lần trước đã giới thiệu về cách lấy dữ liệu bằng method get và get_slice. 
Lần này này sẽ giới thiệu về ba method còn lại, get_range_slices, multiget_slice, get_count.

### Method get_range_slices ~ Get nhiều row

Lần trước đã thao tác cơ bản về search 1 row, lần này sẽ giới thiệu về cách get nhiều row. Để get được nhiều row người ta sử dụng method get_range_slices.
Trước tiên hãy xem code. List 1 là đoạn code dùng để search mã bưu điện (postal code), phiên âm (cách đọc) địa chỉ (addressYomi)

*List 1: Search mã bưu điện (postal code), phiên âm (cách đọc) địa chỉ (addressYomi)*

```
public class SimpleAddressSearchGetRangeSlices {

    public static final String KEYSPACE = "Keyspace1";

    public static final String COLUMN_FAMILY = "SimpleAddress";

    public static void main(String[] args) throws IOException {
        TSocket transport = new TSocket("localhost", 9160);
        TProtocol protocol = new TBinaryProtocol(transport);
        try {
            transport.open();
        } catch (TTransportException e) {
            throw new RuntimeException(e);
        }
        try {
            Cassandra.Client client = new Cassandra.Client(protocol);
            SlicePredicate predicate = new SlicePredicate();
            predicate.setColumn_names(Arrays.asList("postalCode".getBytes(),
                    "address".getBytes(), "addressYomi".getBytes()));

            KeyRange range = new KeyRange();
            range.setStart_key("");
            range.setEnd_key("");

            List<KeySlice> ret = client.get_range_slices(KEYSPACE,
                    new ColumnParent(COLUMN_FAMILY), predicate, range,
                    ConsistencyLevel.ONE);
            int i = 0;
            for (KeySlice keySlice : ret) {
                System.out.println((i++) + " key = " + keySlice.getKey());
                for (ColumnOrSuperColumn csc : keySlice.getColumns()) {
                    Column column = csc.getColumn();
                    String name = new String(column.getName());
                    String value = new String(column.getValue());
                    System.out.println("\t\t" + name + " -> " + value + "("
                            + column.getTimestamp() + ")");
                }
            }
        } catch (InvalidRequestException e) {
            throw new RuntimeException(e);
        } catch (UnavailableException e) {
            throw new RuntimeException(e);
        } catch (TimedOutException e) {
            throw new RuntimeException(e);
        } catch (TException e) {
            throw new RuntimeException(e);
        } finally {
            try {
                transport.flush();
            } catch (TTransportException e) {
                throw new RuntimeException(e);
            } finally {
                transport.close();
            }
        }
    }
}
```

Trong đoạn code này có xuất hiện 2 thuật ngữ mới là class KeyRange và KeySlice.

**KeyRange**

KeyRange là một class thể hiện phạm vi khi get nhiều row. 
Để làm được điều này bạn có thể thiết lập như sau, và kết quả tìm kiếm sẽ được trả lại theo điều đó.

* Phạm vi từ khi bắt đầu khi kết thúc của key
* Số lượng record tối đa để get
* Phạm vi dựa theo token

Trong code của phần List 1, khi không chỉ định bất kỳ phạm vi của key như sau:

```
KeyRange range = new KeyRange();
range.setStart_key("");
range.setEnd_key("");
```

Ở đây chỉ get 100 record mặc định. Vì vậy, nếu bạn muốn get được 1000 record thì cần làm như sau:

```
KeyRange range = new KeyRange(1000);
range.setStart_key("");
range.setEnd_key("");
```

Ngoài ra, khi chỉ định vị trí bắt đầu và vị trí kết thúc của key sẽ thực hiện như sau:

```
KeyRange range = new KeyRange(1000);
range.setStart_key("1760000");
range.setEnd_key("1760004");
```

Mặc dù có thể chỉ định phạm vi key theo cách này, nhưng có một số điều cần chú ý (chi tiết sẽ được mô tả sau).
Trước hết, chỉ cần biết rằng có thể chỉ định phạm get của key bằng KeyRange là được.

**KeySlice**

Tiếp theo là KeySlice. KeySlice là giá trị được trả về bởi get_range_slices, 
nó chứa một tập hợp key đã get và column được chỉ định. get_range_slices trả về một List của KeySlice này.
Code get ra được hiển thị nội dung từng cái một từ List của KeySlice như sau:

```
for (KeySlice keySlice : ret) {
    System.out.println((i++) + " key = " + keySlice.getKey());
    for (ColumnOrSuperColumn csc : keySlice.getColumns()) {
        Column column = csc.getColumn();
        String name = new String(column.getName());
        String value = new String(column.getValue());
        System.out.println("\t\t" + name + " -> " + value + "("
                + column.getTimestamp() + ")");
    }
}
```

### Những điều cần chú ý trong method get_range_slices

Cassandra truy vấn phạm vi dễ dàng, nhưng có một số điểm cần lưu ý. Đó là vấn đề trình tự của các truy vấn phạm vi.

Cassandra sử dụng RandomPartitioner mặc định như một phương pháp phân phối dữ liệu giữa các node. 
Điều này gọi là một "phân vùng lớp" và phân phối ngẫu nhiên giá trị cho node bằng cách sử dụng giá trị băm của key.

Lợi ích lớn nhất của việc sử dụng điều này là dữ liệu luôn được phân bố đều nhau, nên gánh nặng cho mỗi node là bình đẳng, và hiệu quả tổng thể là rất tốt. 
Tuy nhiên, mặt khác, có một bất lợi là "thứ tự của truy vấn phạm vi không được đảm bảo".
Nói cách khác, thứ tự chèn dữ liệu không được đảm bảo và kết quả trả lại sẽ bị lộn xộn.

Sau đây là kết quả của việc thực hiện List 1. Giá trị luôn được trả về theo thứ tự của key:

```
0 key = 1680082
        address -> 東京都 杉並区 久我山(1281276409219)
        addressYomi -> ﾄｳｷｮｳﾄ ｽｷﾞﾅﾐｸ ｸｶﾞﾔﾏ(1281276409219)
        postalCode -> 1680082(1281276409219)
1 key = 1780062
        address -> 東京都 練馬区 大泉町(1281276409219)
        addressYomi -> ﾄｳｷｮｳﾄ ﾈﾘﾏｸ ｵｵｲｽﾞﾐﾏﾁ(1281276409219)
        postalCode -> 1780062(1281276409219)
2 key = 1750081
        address -> 東京都 板橋区 新河岸(1281276409219)
        addressYomi -> ﾄｳｷｮｳﾄ ｲﾀﾊﾞｼｸ ｼﾝｶﾞｼ(1281276409219)
        postalCode -> 1750081(1281276409219)
3 key = 1540003
        address -> 東京都 世田谷区 野沢(1281276409219)
        addressYomi -> ﾄｳｷｮｳﾄ ｾﾀｶﾞﾔｸ ﾉｻﾞﾜ(1281276409219)
        postalCode -> 1540003(1281276409219)
```

### Cách sử dụng Partitioner class (Lớp phân vùng)

Trên thực tế Cassandra đã chuẩn bị một phương pháp khác. Đó là cách sử dụng một trình phân vùng được gọi là OrderPreservingPartitioner. 
Bằng cách này, các truy vấn phạm vi sẽ hoạt động chính xác như mong đợi.

Tuy nhiên vẫn có những nhược điểm đằng sau ưu điểm. Sử dụng OrderPreservingPartitioner, 
Cassandra không phân phối dữ liệu đồng đều để đảm bảo thứ tự insert dữ liệu, nhưng nó đưa dữ liệu vào node theo thứ tự cố định.

Do đó, cần xem xét số lượng record trong một node, không có nhiều dữ liệu trong một node nhất định, 
vì vậy có nhiều điểm cần xem xét như tốc độ tìm kiếm truy vấn và cân bằng lại node bằng thao tác.

Khi được thực hiện, thứ tự được đảm bảo và hiển thị như mong đợi.

```
0 key = 1000000
        address -> 東京都 千代田区 (1281196753776)
        addressYomi -> ﾄｳｷｮｳﾄ ﾁﾖﾀﾞｸ (1281196753776)
        postalCode -> 1000000(1281196753776)
1 key = 1000001
        address -> 東京都 千代田区 千代田(1281196753776)
        addressYomi -> ﾄｳｷｮｳﾄ ﾁﾖﾀﾞｸ ﾁﾖﾀﾞ(1281196753776)
        postalCode -> 1000001(1281196753776)
2 key = 1000002
        address -> 東京都 千代田区 皇居外苑(1281196753776)
        addressYomi -> ﾄｳｷｮｳﾄ ﾁﾖﾀﾞｸ ｺｳｷｮｶﾞｲｴﾝ(1281196753776)
        postalCode -> 1000002(1281196753776)
3 key = 1000003
        address -> 東京都 千代田区 一ツ橋（１丁目）(1281196753776)
        addressYomi -> ﾄｳｷｮｳﾄ ﾁﾖﾀﾞｸ ﾋﾄﾂﾊﾞｼ(1ﾁｮｳﾒ)(1281196753776)
        postalCode -> 1000003(1281196753776)
```

Cho dù sử dụng RandomPartitioner hay OrderPreservingPartitioner vấn đề ở đây vẫn là sẽ gặp nhiều khó khăn khi sử dụng Cassandra vì không thể đáp ứng tất cả mọi yêu cầu được. Tuy nhiên, quan trọng là phải nắm bắt được sự khác biệt giữa hai cái này.

Ngoài ra, vì trình phân vùng cũng ảnh hưởng đến cấu trúc dữ liệu với các thiết lập global trong Cassandra, nên cũng phải setting tổng thể trong storage-conf.xml. Do đó cần sử dụng cái này, cần phải suy nghĩ cẩn thận về thiết kế phù hợp.

### Method multiget_slice ~ Get nhiều hàng theo key nhất định

Phương thức multiget_slice được sử dụng khi bạn muốn get tập hợp các key nhất định nào đó. Trước tiên hãy xem code sau:

*List 2: Get data tổng hợp theo key nhất định*

```
public class SimpleAddressSearchMultiGetSlice {

    public static final String KEYSPACE = "Keyspace1";

    public static final String COLUMN_FAMILY = "SimpleAddress";

    public static void main(String[] args) throws IOException {
        TSocket transport = new TSocket("localhost", 9160);
        TProtocol protocol = new TBinaryProtocol(transport);
        try {
            transport.open();
        } catch (TTransportException e) {
            throw new RuntimeException(e);
        }
        try {
            Cassandra.Client client = new Cassandra.Client(protocol);
            SlicePredicate predicate = new SlicePredicate();
            predicate.setColumn_names(Arrays.asList("postalCode".getBytes(),
                    "address".getBytes()));
            Map<String, List<ColumnOrSuperColumn>> ret = client.multiget_slice(
                    KEYSPACE, Arrays.asList("1080074", "1080075"),
                    new ColumnParent(COLUMN_FAMILY), predicate,
                    ConsistencyLevel.ONE);

            for (Map.Entry<String, List<ColumnOrSuperColumn>> e : ret
                    .entrySet()) {
                String key = e.getKey();
                System.out.println("key = " + key);
                for (ColumnOrSuperColumn csc : e.getValue()) {
                    Column c = csc.getColumn();
                    String name = new String(c.getName());
                    String value = new String(c.getValue());
                    System.out.println(name + " -> " + value + "("
                            + c.getTimestamp() + ")");
                }
                System.out.println();
            }
        } catch (InvalidRequestException e) {
            throw new RuntimeException(e);
        } catch (UnavailableException e) {
            throw new RuntimeException(e);
        } catch (TimedOutException e) {
            throw new RuntimeException(e);
        } catch (TException e) {
            throw new RuntimeException(e);
        } finally {
            try {
                transport.flush();
            } catch (TTransportException e) {
                throw new RuntimeException(e);
            } finally {
                transport.close();
            }
        }
    }
}
```

Trong ví dụ ở List 2 thực hiện những xử lý sau:
* Tìm kiếm các rowhàng với key là 1080074, 1080075
* Get ra column postal code và address trong đó

Có thể hiểu rằng đây là API thực hiện get_slice tương ứng với nhiều key".

### Method get_count ~ Get nhiều column　

Để có được số column, chúng ta sử dụng phương thức get_count. 
Sau đây là đoạn code thể hiện việc trả về đơn giản cho nội dung "có bao nhiêu column ở trong row tương ứng với key".

```
Cassandra.Client client = new Cassandra.Client(protocol);

int count = client.get_count(KEYSPACE, "1500002", new ColumnParent(
        COLUMN_FAMILY), ConsistencyLevel.ONE);
```

Trong phần này có thể dễ dàng nhận thấy cách sử dụng của 3 method get_range_slices，multiget_slice，get_count.
Quan trọng trong các phần này là get_range_slices, cái thể hiện phạm vi truy vấn. Đối với các hệ thống sử dụng các truy vấn mở rộng, sẽ cần phải thay đổi trình phân vùng của Cassandra.
Tuy nhiên khi đó có thể cần phải định kỳ cân bằng lại các node trong quá trình vận hành và maintain.