### Chuẩn bị dữ liệu input

Để tìm kiếm trong Cassandra, sử dụng dữ liệu input là mã bưu điện dạng đơn giản. Trước tiên, lấy dữ liệu khu vực Tokyo từ URL bên dưới và giải nén rồi insert dữ liệu vào.

Download dữ liệu: 

http://www.post.japanpost.jp/zipcode/dl/kogaki/lzh/13tokyo.lzh

Dữ liệu được giả định là một cấu trúc dữ liệu đơn giản.

- Key là mã bưu điện (postal code)
- Dữ liệu bao gồm 3 loại mã bưu điện (postal code), địa chỉ (address), phiên âm (cách đọc) địa chỉ (addressYomi)
- Không sử dụng Super Column

Code để insert dữ liệu như sau:

List 1　SimpleAddressInsert.java
```
Cassandra.Client client = new Cassandra.Client(protocol);
long timestamp = System.currentTimeMillis();

Map<String, Map<String, List<Mutation>>> map = new HashMap<String, Map<String, List<Mutation>>>();

is = Thread.currentThread().getContextClassLoader()
		.getResourceAsStream("13TOKYO.CSV");
BufferedReader reader = new BufferedReader(new InputStreamReader(
		is, "MS932"));
String line = null;
while ((line = reader.readLine()) != null) {
	List mutations = new ArrayList();
	String[] lines = line.split(",");
	String postalCode = removeQuote(lines[2]);
	String addressYomi = buildAddressYomi(lines);
	String address = buildAddress(lines);
	System.out.println(postalCode + " " + addressYomi + " "
			+ address);
	{
		Mutation mutation = new Mutation();
		ColumnOrSuperColumn csc = new ColumnOrSuperColumn();
		csc.setColumn(new Column("postalCode".getBytes(),
				postalCode.getBytes(), timestamp));
		mutation.setColumn_or_supercolumn(csc);
		mutations.add(mutation);
	}
	{
		Mutation mutation = new Mutation();
		ColumnOrSuperColumn csc = new ColumnOrSuperColumn();
		csc.setColumn(new Column("address".getBytes(), address
				.getBytes(), timestamp));
		mutation.setColumn_or_supercolumn(csc);
		mutations.add(mutation);
	}
	{
		Mutation mutation = new Mutation();
		ColumnOrSuperColumn csc = new ColumnOrSuperColumn();
		csc.setColumn(new Column("addressYomi".getBytes(),
				addressYomi.getBytes(), timestamp));
		mutation.setColumn_or_supercolumn(csc);
		mutations.add(mutation);
	}
	Map<String, List<Mutation>> mutmap = new HashMap<String, List<Mutation>>();
	mutmap.put(COLUMN_FAMILY, mutations);
	map.put(new String(postalCode), mutmap);
	count++;
}
client.batch_mutate(KEYSPACE, map, ConsistencyLevel.ONE);
reader.close();
```


Trong file config (storage-conf.xml), chỉ định như sau: 

List 2　storage-conf.xml

`<ColumnFamily Name="SimpleAddress" CompareWith="UTF8Type" />`

Thực thi câu lệnh và insert dữ liệu. Nó sẽ như sau:

```
...
1002100 ﾄｳｷｮｳﾄ ｵｶﾞｻﾜﾗﾑﾗ  東京都 小笠原村 
1002101 ﾄｳｷｮｳﾄ ｵｶﾞｻﾜﾗﾑﾗ ﾁﾁｼﾞﾏ 東京都 小笠原村 父島
1002211 ﾄｳｷｮｳﾄ ｵｶﾞｻﾜﾗﾑﾗ ﾊﾊｼﾞﾏ 東京都 小笠原村 母島
finished insert 3654 records.
```

Sử dụng phương pháp tìm kiếm với các dữ liệu này làm mẫu.


### Cách lấy một single column

Hãy bắt đầu bằng cách tìm kiếm một record. Cassandra sử dụng phương thức get. Phương thức get có API sau:

`ColumnOrSuperColumn get(keyspace, key, ColumnPath, ConsistencyLevel)`

Code như sau: Trong ví dụ này, đang tìm kiếm địa chỉ có mã bưu điện là "⁠1006528".

List 3　SimpleAddressSearchOne.java
```
Cassandra.Client client = new Cassandra.Client(protocol);
ColumnPath path = new ColumnPath(COLUMN_FAMILY);
path.setColumn("address".getBytes());//Chỉ định tên cột tìm kiếm

ColumnOrSuperColumn csc = client.get(KEYSPACE, "1006528", path,
		ConsistencyLevel.ONE);
Column c = csc.getColumn();
String name = new String(c.getName());
String value = new String(c.getValue());

System.out.println(name + " -> " + value + "(" + c.getTimestamp()
		+ ")");
```

Kết quả như sau:

Các vị trí column và family column được chỉ định bởi ColumnPath. Trong ví dụ này, vì là một trường hợp column và family column, cần xác định tên cột tìm kiếm.

Nếu trường hợp của là super column, ngoài các nội dung trên, cần phải xác định tên super column như sau:

```
ColumnPath path = new ColumnPath(COLUMN_FAMILY);
path.setSuper_column(LongUtil.toByteArray(1006528L));//Chỉ định super column
path.setColumn("address".getBytes());//Chỉ định tên column
```

Cách lấy dữ liệu trả về của ColumnOrSuperColumn sẽ khác nhau tùy vào column hoặc super column.

**Trường hợp là column**

→ Get column bằng ColumnOrSuperColumn#getColumn()

**Trường hợp là super column**

→ Get column trong super column bằng ColumnOrSuperColumn#getSuperColumn()#getColumns()

### Cách lấy multi column

Tiếp theo, lấy cùng một lúc nhiều cột bằng một key. Trong trường hợp này, sử dụng get_slice. API của get_slice như sau.

`List<ColumnOrSuperColumn> get_slice(keyspace, key, ColumnParent, SlicePredicate, ConsistencyLevel);`
    
Code thực tế như sau.

List 5　SimpleAddressSearchSlice1.java
```
Cassandra.Client client = new Cassandra.Client(protocol);
ColumnParent parent = new ColumnParent(COLUMN_FAMILY);
String key = "1006528";

// Chỉ định cột
SlicePredicate predicate = new SlicePredicate();
predicate.setColumn_names(Arrays.asList("postalCode".getBytes(),
		"address".getBytes()));

List<ColumnOrSuperColumn> ret = client.get_slice(KEYSPACE, key,
		parent, predicate, ConsistencyLevel.ONE);

// Hiển thị kết quả
for (ColumnOrSuperColumn csc : ret) {
	Column column = csc.getColumn();
	String name = new String(column.getName());
	String value = new String(column.getValue());

	System.out.println("\t" + name + " -> " + value + "("
			+ column.getTimestamp() + ")");
}
```

Kết quả như sau:

```
address -> 東京都 千代田区 丸の内新丸の内ビルディング（２８階）(1281276409219)
postalCode -> 1006528(1281276409219)
```

Sau đây là giải thích hai class không thông dụng được gọi là ColumnParent và SlicePredicate.

**ColumnParent**

ColumnParent là một class khái niệm rất giống với ColumnPath, nhưng có những điểm khác biệt sau đây:

- ColumnPath → Class để tìm single column
- ColumnParent → Class để tìm  multi column

ColumnParent có cấu trúc thư mục như là /../. Một dạng có thể tìm kiếm nhiều column theo các tầng cấu trúc thư mục với base là một single column nào đó.

ColumnParent có thể thực hiện bằng một trong hai cách sau:

- Trường hợp là column → Chỉ định column family
- Trường hợp là super column → Chỉ định column family và super column

**SlicePredicate**

SlicePredicate là một class chỉ định để filter việc tìm kiếm. Có hai cài đặt chính chủ yếu để filter:

① Chỉ định theo tên cột

② Chỉ định theo phạm vi tên cột


Trong code sample ở trên, tìm kiếm được thực hiện bằng cách chỉ định hai cột Mã bưu chính và Địa chỉ trong số ba cột (mã bưu điện, địa chỉ, phiên âm địa chỉ addressYomi) theo tên cột của ①. Tuy nhiên, nếu xem xét kỹ các kết quả, chúng không được sort theo thứ tự được chỉ định.

Các cột của Cassandra được sắp xếp theo thứ tự được viết trong storage-conf.xml. Nhưng nó không theo thứ tự được chỉ định trong cliend code. Xin lưu ý điểm này.

Vì UTF 8 được chỉ định trong file config bằng CompareWith, nên nó được sắp xếp theo thứ tự UTF 8. Do đó, kết quả có thể thu được theo thứ tự địa chỉ và mã bưu chính. 


### Cách filter các cột tìm kiếm

Các cột tìm kiếm cũng có thể được filter theo phạm vi của các tên cột trong ②. Trong trường hợp này, sử dụng class có tên SliceRange và chỉ định phạm vi như sau:

- Vị trí bắt đầu cột → Chỉ định bằng SliceRange#setStart

- Vị trí kết thúc cột → Chỉ định bằng SliceRange#setEnd

Điểm thuận tiện của SliceRange là rất hữu ích, ví dụ, trong một column family có chứa các cột với một số lượng lớn mà key là ngày tháng.

Trong Cassandra, có khả năng một lượng lớn dữ liệu có thể được ghi vào một key nhất định, chẳng hạn như chèn dữ liệu bằng cách sử dụng ngày làm khóa, hoặc ghi sửa  và thay đổi một item nhất định với số lượng lớn. Do đó, SliceRange có thể được sử dụng hiệu quả với điều kiện "Muốn đưa ra dữ liệu chỉ trong một phạm vi nhất định từ một cột với một số lượng lớn".

Thứ tự cột được xác định theo cài đặt CompareWith trong file lưu trữ-conf.xml. Do đó, cần phải quyết định bắt đầu và kết thúc. Trong trường hợp này, xin lưu ý là tên cột được sắp xếp theo thứ tự địa chỉ, phiên âm địa chỉ addressYomi, postalCode bởi vì nó là thứ tự sắp xếp của UTF8.

Ví dụ, sẽ không có vấn đề gì n bắt đầu là addressYomi và kết thúc là postalCode. Tuy nhiên, nếu không theo thứ tự sắp xếp của cột, ví dụ như sau, thì sẽ bắn ra InvalidRequestException.

- Bắt đầu → postalCode

- Kết thúc → addressYomi

Code sample sử dụng SliceRange như sau: Để giúp so sánh kết quả dễ dàng hơn, sẽ đưa ra 2 cách filter và không filter cột bằng SliceRange.

List 6　SimpleAddressSearchSlice2.java
```
Cassandra.Client client = new Cassandra.Client(protocol);
ColumnParent parent = new ColumnParent(COLUMN_FAMILY);

String key = "1006528";

SlicePredicate predicate = new SlicePredicate();

// Extract item đã có trong range từ addressYomi đến postalCode trong các item
SliceRange range = new SliceRange();
range.setStart("addressYomi".getBytes());
range.setFinish("postalCode".getBytes());
predicate.setSlice_range(range);

List<ColumnOrSuperColumn> ret = client.get_slice(KEYSPACE, key,
		parent, predicate, ConsistencyLevel.ONE);

System.out.println("Trường hợp filter bằng "SliceRange");
for (ColumnOrSuperColumn csc : ret) {
	Column column = csc.getColumn();
	String name = new String(column.getName());
	String value = new String(column.getValue());

	System.out.println("\t" + name + " -> " + value + "("
			+ column.getTimestamp() + ")");
}

System.out.println("Trường hợp không filter bằng "SliceRange");
SliceRange rangeAll = new SliceRange();
rangeAll.setStart("".getBytes());
rangeAll.setFinish("".getBytes());
predicate.setSlice_range(rangeAll);

ret = client.get_slice(KEYSPACE, key, parent, predicate,
		ConsistencyLevel.ONE);

for (ColumnOrSuperColumn csc : ret) {
	Column column = csc.getColumn();
	String name = new String(column.getName());
	String value = new String(column.getValue());

	System.out.println("\t" + name + " -> " + value + "("
			+ column.getTimestamp() + ")");
}
```
Kết quả như sau:

Khi filter các cột bằng SliceRange
```
addressYomi -> ﾄｳｷｮｳﾄ ﾁﾖﾀﾞｸ ﾏﾙﾉｳﾁｼﾝﾏﾙﾉｳﾁﾋﾞﾙﾃﾞｨﾝｸﾞ(28ｶｲ)(1281276409219)
postalCode -> 1006528(1281276409219)
```

Khi không filter các cột bằng SliceRange
```
address -> 東京都 千代田区 丸の内新丸の内ビルディング（２８階）(1281276409219)
addressYomi -> ﾄｳｷｮｳﾄ ﾁﾖﾀﾞｸ ﾏﾙﾉｳﾁｼﾝﾏﾙﾉｳﾁﾋﾞﾙﾃﾞｨﾝｸﾞ(28ｶｲ)(1281276409219)
postalCode -> 1006528(1281276409219)
```

### Control thứ tự tăng dần/giảm dần

Khi tên cột là dữ liệu số và dữ liệu ngày cần kiểm soát theo trình tự tăng dần/giảm dần.

Vì vậy, SliceRange có một phương thức gọi là SliceRange#setReversed, cho phép bạn kiểm soát thứ tự tăng dần/ iảm dần.

Hãy thử giảm dần trong đoạn code trước. Code như sau:

List 7　SimpleAddressSearchSlice3_Reversed.java
```
SliceRange range = new SliceRange();
range.setStart("postalCode".getBytes());
range.setFinish("addressYomi".getBytes());
range.setReversed(true);
```

Kết quả như sau:

Khi filter các cột bằng SliceRange
```
postalCode -> 1006528(1281276409219)
addressYomi -> ﾄｳｷｮｳﾄ ﾁﾖﾀﾞｸ ﾏﾙﾉｳﾁｼﾝﾏﾙﾉｳﾁﾋﾞﾙﾃﾞｨﾝｸﾞ(28ｶｲ)(1281276409219)
```

Khi không filter các cột bằng SliceRange
```
postalCode -> 1006528(1281276409219)
addressYomi -> ﾄｳｷｮｳﾄ ﾁﾖﾀﾞｸ ﾏﾙﾉｳﾁｼﾝﾏﾙﾉｳﾁﾋﾞﾙﾃﾞｨﾝｸﾞ(28ｶｲ)(1281276409219)
address -> 東京都 千代田区 丸の内新丸の内ビルディング（２８階）(12812764092
```

Trong phần này chỉ giải thích phương thức get và get_slice.
Phương pháp tìm kiếm của Cassandra rất đặc biệt và cần phải tạo thành thói quen. Chỉ cần dùng đúng cách thì sẽ không có gì khó khăn.
Ở phần sau sẽ giới thiệu về get_range_slices, multiget_slice, get_count. Đặc biệt tập trung vào việc get_range_slices và sequence.