## 1. Change Streams là gì?

Khi bạn làm việc với những RDBMS như MySQL hay SQL Server chắc hẳn bạn đã nghe đến [Trigger](https://dev.mysql.com/doc/refman/8.0/en/trigger-syntax.html). Và khi bạn lần mò MongoDB, liệu đã bao giờ bạn tự hỏi, Trigger trong MongoDB như thế nào?

MongoDB không có cơ chế để bạn cài đặt sẵn Trigger lên DB như MySQL. Tuy nhiên, nếu chúng ta có thể stream được các thay đổi trong Database thì chúng ta hoàn toàn có thể làm những tính năng tương tự như Trigger từ phía app-server và thậm chí là nhiều hơn thế!

Trong MongoDB, bắt đầu từ version 3.6, có một tính năng để bạn có thể thực hiện điều đó gọi là **Change Streams**.  Change streams hoạt động dựa trên việc lắng nghe [**oplog**](https://docs.mongodb.com/manual/core/replica-set-oplog/) - thứ mà bạn có thể hiểu đơn giản là log của MongoDB phục vụ cho tính năng [replication](https://docs.mongodb.com/manual/replication/). Chúng ghi lại tất cả các sửa đổi dữ liệu trong Database của bạn. 

Chính vì thế, bạn có thể sử dụng change streams để subscribe các thay đổi trên một collection, hoặc database và thậm chí là deployment.

## 2. Stream A Collection/Database/Deployment

Để thực hiện change streams, database của bạn phải thực hiện cung cấp `changeStream` và `find` actions, cụ thể như sau:

```
{ resource: { db: <dbname>, collection: <collection> }, actions: [ "find", "changeStream" ] }
```

#### a. Tạo con trỏ cho stream Collection/Database/Deployment

- Bạn có thể thực hiện cho một collection bất kỳ (trừ các **system** collections, hoặc các collections nằm trong **admin**, **local** và **config** databases). Thực hiện câu lệnh [`db.collection.watch()`](https://docs.mongodb.com/manual/reference/method/db.collection.watch/#db.collection.watch) để bắt đầu.
- Đối với Database, bạn có thể thực hiện với database bất kỳ ngoại trừ **admin**, **local** và **config** databases. Câu lệnh: [`db.watch()`](https://docs.mongodb.com/manual/reference/method/db.watch/#db.watch)
- Đối với Deployment, bạn có thể theo dõi sự thay đổi liên quan đến deployment đối với tất cả các databases, collections ngoại trừ **admin**, **local** và **config** databases. Câu lệnh: [`Mongo.watch()`](https://docs.mongodb.com/manual/reference/method/Mongo.watch/#Mongo.watch)

#### b. Tạo change stream

Sau khi tạo con trỏ cho stream, bạn có thể mở một change stream để stream data trong mongoDB:
```
const collection = db.collection('test');
const changeStream = collection.watch(); // có thể là Mongo.watch() hoặc db.watch()
changeStream.on('change', changeEvent => {
  // process next document
});
```

Bạn cũng có thể viết iterator như sau:
```
const collection = db.collection('test');
const changeStreamIterator = collection.watch();
const next = await changeStreamIterator.next();
```

#### c. changeEvent object

Nhìn đoạn code bên trên chắc hẳn bạn sẽ tò mò cái object `changeEvent` bên trên là gì đúng không?
Nó là một object có dạng:
```
{
   _id : { <BSON Object> },
   "operationType" : "<operation>",
   "fullDocument" : { <document> },
   "ns" : {
      "db" : "<database>",
      "coll" : "<collection"
   },
   "to" : {
      "db" : "<database>",
      "coll" : "<collection"
   },
   "documentKey" : { "_id" : <value> },
   "updateDescription" : {
      "updatedFields" : { <document> },
      "removedFields" : [ "<field>", ... ]
   }
   "clusterTime" : <Timestamp>,
   "txnNumber" : <NumberLong>,
   "lsid" : {
      "id" : <UUID>,
      "uid" : <BinData>
   }
}
```
Trong đó:
- `operationType` là type của event vừa xảy ra gồm: **`insert`**, **`update`**, **`replace`**, **`delete`**, **`drop`** ,**`rename`**, **`dropDatabase`**, **`invalidate`**.
- `fullDocument` là thông tin của `document` vừa được thực hiện CRUD (`insert`, `update`, `replace`, `delete`), đối với `delete` field này được bỏ qua vì document không còn tồn tại. Đối với `update`, field này tồn tại nếu bạn set `fullDocument: 'updateLookup'` cho stream:
```
const changeStreamIterator = collection.watch({ fullDocument: 'updateLookup' });
```
-  `ns`: database và collection name bị ảnh hưởng bởi event.
-  `to`: khi bạn thực hiện đổi tên `database`, `collection` thì nó hiển thị tên mới của `ns`.
-  `documentKey`: chứa `_id` của `document` được thực hiện thay đổi.
- `updateDescription`: chứa thông tin các `fields` được cập nhật hoặc xoá bởi hoạt động `update`.
- `clusterTime`: thời gian thực hiện event ở trên `oplog`.


Bạn có thể tham khảo chi tiết hơn về nó [ở đây](https://docs.mongodb.com/manual/reference/change-events/#change-stream-output) nhé :laughing:

## 3. Resume a Change Stream

Ví dụ có hàng loạt change streams liên tiếp xảy ra, vì một lý do nào đó, bạn dừng lại ở một change stream, giả sử connect đến database server bị die, hoặc bạn cần disconnect với database server -> bạn không thể handle được events xảy ra ngay sau đó.

MongoDB có một cơ chế để bạn có thể giải quyết vấn đề này, bằng cách bạn lưu trữ lại `token` của một `change stream` và sau đó bạn có thể `resume` lại việc lắng nghe các event bắt đầu từ `change stream` đó.

```
const collection = db.collection('test');
const changeStream = collection.watch();

let newChangeStream;
changeStream.once('change', next => {
  const resumeToken = changeStream.resumeToken;
  changeStream.close();

  newChangeStream = collection.watch({ resumeAfter: resumeToken });
  newChangeStream.on('change', changeEvent => {
    // process next document
  });
});
```
Như bạn thấy, chúng ta close `change stream` ngay sau khi lấy ra `resumeToken` và bạn có thể tiếp tục lại từ `change stream` này với option: `{ resumeAfter: resumeToken }`

Lưu ý:
- resumeAfter có nghĩa là tiếp tục stream từ `resumeToken` nên nếu stream đó là một [`invalidate`](https://docs.mongodb.com/manual/reference/change-events/#change-event-invalidate) event thì nó sẽ close change streams.
- Từ phiên bản `4.2` bạn có thể sử dụng `startAfter` thay thế cho `resumeAfter`, nó sẽ tạo ra một streams mới từ sau `resumeToken` chứ không phải tiếp tục streams cũ. Nên nó sẽ không bị close nếu đó là  [`invalidate`](https://docs.mongodb.com/manual/reference/change-events/#change-event-invalidate) event.


## 4. Kết luận

Change streams là một tính năng khá hữu ích và không khó để handle. Chúng ta có thể dùng nó để lắng nghe các events ở database một cách realtime. Hi vọng bài viết sẽ giúp ích cho các bạn khi làm việc với MongoDB. :wink: