### Chú ý timestamp khi update data
Update data trong Cassandra thực ra là sử dụng API giống như khi insert. 
Chỉ một điểm khác biệt đó là khi update thì timestamp là điều vô cùng quan trọng. 
Nếu timestamp không phải là thời gian sau thời gian nhập dữ liệu trước đó thì data sẽ không được update.
Hãy kiểm tra việc đó bằng đoạn code sau.

List 1　SimpleUpdate
```
Date oldDate = new SimpleDateFormat("yyyy/MM/dd").parse("1970/01/01");
long oldTimestamp = oldDate.getTime();
Cassandra.Client client = new Cassandra.Client(protocol);
try {
	final String key = "sample_update1";
	final String columnName = "update_hoge";
	String value = "original_value";
	long timestamp = System.currentTimeMillis();

	final ColumnPath columnPath = new ColumnPath(COLUMN_FAMILY);
	columnPath.setColumn(columnName.getBytes());
	// Insert 1 column
	client.insert(KEYSPACE, key, columnPath, value.getBytes(),
			timestamp, ConsistencyLevel.ONE);

	value = "update_value";
	timestamp = System.currentTimeMillis();
	// Chọn ngày tháng update column là thời gian sau đó, và update
	client.insert(KEYSPACE, key, columnPath, value.getBytes(),
			timestamp, ConsistencyLevel.ONE);

	value = "update2_value";
	timestamp = oldTimestamp;
	// Chọn ngày tháng update column là thời gian trước đó, và update
	client.insert(KEYSPACE, key, columnPath, value.getBytes(),
			timestamp, ConsistencyLevel.ONE);

} catch (InvalidRequestException e) {
    ...
```

Sử dụng Cassandra-cli để confirm.

```
cassandra> get Keyspace1.Standard1['sample_update1']
=> (column=7570646174655f686f6765, value=update_value, timestamp=1277138220269)
```

Returned 1 results.

Có thể thấy rằng dữ liệu được ghi đè là dữ liệu có thời gian sau ngày tháng update.
Cassandra sẽ không thể cập nhật dữ liệu trừ khi ngày update là sau thời gian nhập dữ liệu. Vì không có ngoại lệ, nên cần chú ý tới timestamp.

Ngay cả khi bạn sử dụng batch_mutate, việc cập nhật column cũng thực hiện tương tự như vậy.

### Nếu là 1 line thì remove, nếu là nhiều line thì xóa bằng batch_mutate
Xóa data có 2 phương pháp để xóa như sau:

•	Xóa bằng method remove

•	Xóa bằng batch_mutate bằng cách set object Deletion

Về xử lý xóa 1 line, thì không có vấn đề gì cả. Nhưng nếu muốn xóa nhiều cùng 1 lúc, 
thì nên sử dụng method batch_mutate với việc sử dụng object Deletion để thể hiện việc xóa sẽ tốt hơn. 
Cách này sẽ không call API Thrift để xóa từng line một nên có thể đạt hiệu suất rất tốt. 

### 3 lựa chọn cho trường hợp xóa bằng method remove
Trường hợp xóa bằng method remove, có thể chọn 3 cách như sau:

•	①　Xóa column trong row chỉ định bằng key

•	②　Xóa super column trong rơ chỉ định bằng key

•	③　Xóa theo từng row của key đó

Giống như insert dữ liệu,  tất cả đều được chỉ định bằng ColumnPath. 
Đối với ColumnPath, bắt buộc phải chỉ định column family, nhưng nếu không làm như vậy,
thì có thể thay đổi nội dung được thiết lập tùy theo các mục ①～ ③.

**① Xóa column trong row chỉ định bằng key**

Sau đây là một đoạn trích từ mã mẫu để xóa một cột cụ thể. Trong ví dụ này, chúng tôi đang cố gắng thêm một cột và xóa dữ liệu đó.
Có hai điều cần chú ý. 
Điểm đầu tiên là khi sử dụng ColumnPath, cần chỉ định Cột để xóa rõ ràng bằng setColumn.

Điều thứ hai là thử xóa bằng timestamp giống với thời gian khi update, điều đó sẽ không thực hiện được và dữ liệu sẽ không bị xóa.
Thử　truy xuất dữ liệu bị xóa bằng phương thức truy xuất sẽ thấy NotFoundException. 
Nếu set timestamp sau thời gian insert, dữ liệu sẽ được xóa đúng cách.

List 2　DeleteColumnWithRemove
```
Date oldDate = new SimpleDateFormat("yyyy/MM/dd").parse("1970/01/01");
long oldTimestamp = oldDate.getTime();
Cassandra.Client client = new Cassandra.Client(protocol);
try {
	final String key = "sample_delete1";
	final String columnName = "delete_hoge";
	String value = "Sample xóa";
	long timestamp = System.currentTimeMillis();

	final ColumnPath columnPath = new ColumnPath(COLUMN_FAMILY);
	columnPath.setColumn(columnName.getBytes());
	// Inser 1 column
	client.insert(KEYSPACE, key, columnPath, value.getBytes(),
			timestamp, ConsistencyLevel.ONE);

	// Xóa bằng timestamp cũ, không thể xóa. Không có exception
	client.remove(KEYSPACE, key, columnPath, oldTimestamp,
			ConsistencyLevel.ALL);

	// Confirm là không thể xóa
	ColumnOrSuperColumn ret = client.get(KEYSPACE, key, columnPath,
			ConsistencyLevel.ONE);
	Column retColumn = ret.getColumn();
	String retName = new String(retColumn.getName());
	String retValue = new String(retColumn.getValue());
	System.out.println("column key : " + retName);
	System.out.println("column value: " + retValue);
	System.out.println("timestamp: " + retColumn.getTimestamp());

	timestamp = System.currentTimeMillis();
	// Update timestamp và xóa
	client.remove(KEYSPACE, key, columnPath, timestamp,
			ConsistencyLevel.ALL);

	// Đã bị xóa, không có column nữa nên NotFoundException
	ret = client.get(KEYSPACE, key, columnPath, ConsistencyLevel.ONE);
```

**② Xóa super column trong row chỉ định bằng key**

Để xóa một super column, chỉ bằng setSuperColumn () trong ColumnPath.
Hơn nữa, chỉ có thể xóa một số cột nhất định trong super column. 
Trong ví dụ bên dưới, ColumnPath # setSuperColumn () và setColumn () được sử dụng cùng nhau để chỉ xóa các cột nhất định trong super column.

List 3　DeleteOneColumnOfSuperColumnWithRemove
```
final String superColumnName = "hogehoge1";
final String key = "delete_one_column";
long timestamp = System.currentTimeMillis();

// Insert super column
insertSuperColumn(superColumnName, key, client, timestamp);

// Confirm bằng method get xem data đã được insert chưa
ColumnPath columnPath = new ColumnPath(COLUMN_FAMILY);
columnPath.setSuper_column(superColumnName.getBytes());
ColumnOrSuperColumn ret = client.get(KEYSPACE, key, columnPath,
		ConsistencyLevel.QUORUM);
SuperColumn superColumn = ret.getSuper_column();
System.out.println("delete before");
for (Column c : superColumn.getColumns()) {
	String retName = new String(c.getName());
	String retValue = new String(c.getValue());
	System.out.printf("\t column key :\t%s\n", retName);
	System.out.printf("\t column value:\t%s\n", retValue);
	System.out.printf("\t timestamp:\t%s\n", c.getTimestamp());
}

timestamp = System.currentTimeMillis();

// Tạo ColumnPath dùng để xóa. Chỉ định tên column "fooKey" cho column muốn xóa trong super column
ColumnPath deletePath = new ColumnPath(COLUMN_FAMILY);
deletePath.setSuper_column(superColumnName.getBytes());
deletePath.setColumn("fooKey".getBytes());
client.remove(KEYSPACE, key, deletePath, timestamp,
		ConsistencyLevel.ALL);

// Confirm coi đã được xóa chưa. Trong case này thì thấy super column vẫn còn nhưng chỉ column "fooKey" bị mất.
ret = client
		.get(KEYSPACE, key, columnPath, ConsistencyLevel.QUORUM);
superColumn = ret.getSuper_column();
System.out.println("delete after");
for (Column c : superColumn.getColumns()) {
	String retName = new String(c.getName());
	String retValue = new String(c.getValue());
	System.out.printf("\t column key :\t%s\n", retName);
	System.out.printf("\t column value:\t%s\n", retValue);
	System.out.printf("\t timestamp:\t%s\n", c.getTimestamp());
}
```


**③ Xóa theo từng row của key đó**

Có thể xóa từng hàng được chỉ định bằng key. 
Phương thức này là dễ nhất, nhưng hãy lưu ý rằng việc xóa setSuperColumn () mà không có setColumn () trong ColumnPath sẽ xóa chính hàng đó.

List 4　DeleteEntireRowWithRemove
```
final String superColumnName = "sample1";
final String key = "delete_entire_row";
long timestamp = System.currentTimeMillis();

// Insert super column
insertSuperColumn(superColumnName, key, client, timestamp);

ColumnPath columnPath = new ColumnPath(COLUMN_FAMILY);
columnPath.setSuper_column(superColumnName.getBytes());

// Confirm super column data
ColumnOrSuperColumn ret = client.get(KEYSPACE, key, columnPath,
		ConsistencyLevel.QUORUM);
SuperColumn superColumn = ret.getSuper_column();
for (Column c : superColumn.getColumns()) {
	String retName = new String(c.getName());
	String retValue = new String(c.getValue());
	System.out.println("column key : " + retName);
	System.out.println("column value: " + retValue);
	System.out.println("timestamp: " + c.getTimestamp());
}

timestamp = System.currentTimeMillis();

// Xóa từng row
client.remove(KEYSPACE, key, new ColumnPath(COLUMN_FAMILY),
		timestamp, ConsistencyLevel.ALL);

// Đã xóa từng row nên bị NotFoundException
client.get(KEYSPACE, key, columnPath, ConsistencyLevel.QUORUM);
```

### Xóa bằng method batch_mutate
Phương thức remove là đầy đủ chức năng, nhưng nếu bạn muốn xóa một số lượng lớn các super column, 
thì sẽ hiệu quả hơn khi sử dụng batch_mutate. Hai tùy chọn sau trong xóa batch_mutate rất hữu ích.

•	Setting super column và xóa

•	Setting SlicePredicate (Tập hợp các tên cột hoặc số phạm vi cố định) và xóa


List 5　SuperColumnDeleteWithDeletion
```
final String superColumnName = "sample1";
final String key = "super_sample1";
long timestamp = System.currentTimeMillis();

// Insert super data
insertSuperColumn(superColumnName, key, client, timestamp);

ColumnPath columnPath = new ColumnPath(COLUMN_FAMILY);
columnPath.setSuper_column(superColumnName.getBytes());

// Confirm data đã được insert
ColumnOrSuperColumn ret = client.get(KEYSPACE, key, columnPath,
		ConsistencyLevel.QUORUM);
SuperColumn superColumn = ret.getSuper_column();
for (Column c : superColumn.getColumns()) {
	String retName = new String(c.getName());
	String retValue = new String(c.getValue());
	System.out.printf("\t column key \t\t:%s\n", retName);
	System.out.printf("\t column value\t\t:%s\n", retValue);
	System.out.printf("\t timestamp\t:%s\n", c.getTimestamp());
}

timestamp = System.currentTimeMillis();

// Tạo cấu trúc batch_mutate, set Deletion
Map<String, Map<String, List<Mutation>>> mutationMap = new HashMap<String, Map<String, List<Mutation>>>();
Map<String, List<Mutation>> map = new HashMap<String, List<Mutation>>();
List<Mutation> list = new ArrayList<Mutation>();
Mutation mutation = new Mutation();
// Tạo Deletion, chỉ định tên theo super coulmn
Deletion deletion = new Deletion(timestamp);
deletion.setSuper_column(superColumnName.getBytes());
mutation.setDeletion(deletion);
list.add(mutation);
map.put(COLUMN_FAMILY, list);
mutationMap.put(key, map);

// Thực hiện xóa
client.batch_mutate(KEYSPACE, mutationMap, ConsistencyLevel.ALL);

// Confirm đã xóa. Nếu xóa rồi thì sẽ NotFoundException
client.get(KEYSPACE, key, columnPath, ConsistencyLevel.QUORUM);
```

Hầu hết code cũng giống như khi insert sử dụng phương thức batch_mutate trước đó, nhưng điểm khác biệt là sử dụng Deletion.

Đây là xử lý xóa bằng cách thiết lập đối tượng Deletion, rất tiện ích và tương đối dễ dàng. 
Nhưng nếu muốn thống nhất quy trình xóa với các thư viện, framework, v.v., thì nên sử dụng batch_mutate để đạt hiệu quả cao nhất.