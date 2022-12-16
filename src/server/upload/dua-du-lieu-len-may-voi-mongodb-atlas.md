Với những tín đồ của NoSQL thì MongoDB là một sự lựa chọn tuyệt vời, và trong thời đại mà ai ai cũng đòi *đi đua đưa* thì chẳng lý do gì mà chúng ta không thử get high đưa dữ liệu lên mây :hugs:

**MongoDB Atlas** là **cloud database** của MongoDB được ra mắt vào năm 2016 chạy trên AWS, Microsoft Azure và Google Cloud Platform.

Dữ liệu trong mỗi Cluster ở Atlas được lưu trữ theo cơ chế [Replication](https://docs.mongodb.com/manual/replication/), với 3 nodes: 1 master (primary) và 2 slaves (secondary)

## 1. Get Started

Để bắt đầu sử dụng **Atlas** các bạn hay truy cập [vào đây](https://www.mongodb.com/cloud/atlas) và nhấn ngay nút **Start Free** nhé :wink:

Cứ mạnh dạn mà đăng ký và yên tâm rằng với bản free thì Atlas sẽ không yêu cầu thẻ tín dụng để nhăm nhe trừ tiền mỗi khi bạn sơ suất như AWS đâu :joy:

Ngay sau khi đăng ký thành công bạn có thể chọn lựa chọn dịch vụ, và coder nghèo như mình thì hiển nhiên chọn option free :tired_face:

![](https://images.viblo.asia/7a8e9fa2-7133-4fe0-ae9e-6cfb677115c8.png)

Tiếp đến là lựa chọn nơi đặt database của bạn cũng như các option kèm theo. Người ta bảo của rẻ là của ôi nên nếu không muốn mất đồng nào thì bạn chỉ được xài **512MB Storage, Shared RAM, 100 max connections và Low network performance** :roll_eyes:

![](https://images.viblo.asia/387330a1-1700-41a4-8646-b013bdf07b67.png)

Lựa chọn **Create Cluster** bạn sẽ được chuyển đến giao diện quản lý, điều mình thích ở Atlas là giao diện của nó cực kỳ thân thiện chứ không rối mắt như thằng AWS :hankey:

## 2. Database Access

Bấm vào Database Access bạn sẽ đi đến màn hình quản lý user. Tại đây bạn có thể tạo ra user với các quyền là: **Admin, Read and Write, Only Read** và bạn có thể tạo ra Custom Role như quyền write hoặc read một Database cụ thể.

![](https://images.viblo.asia/8fcd889b-484a-45a7-b420-9fc8e43de481.png)

Có hai các để đăng nhập là sử dụng **Password** và **Certificate**

## 3. Network Access

Click vào Network Access bạn sẽ đi đến màn hình quản lý Network.
![](https://images.viblo.asia/b8475736-6c59-4ec1-851b-816886757956.png)

Tại đây bạn có thể quản lý những IP được phép connect đến Database của bạn. Bấm vào **ADD IP ADDRESS** để thực hiện thêm địa chỉ IP. 

Nếu bạn muốn access tất cả các địa chỉ IP thì có thể click vào **ALLOW ACCESS FROM ANYWHERE**

![](https://images.viblo.asia/97c69af8-089e-43e7-990c-240e18ef1774.png)

## 4. Connect

Click vào **Clusters** để quản lý các clusters của bạn. Tại đây sẽ có đầy đủ report về Cluster của bạn kể cả biểu đồ Read, Write, Connect,...
![](https://images.viblo.asia/430e6da3-7c43-4b5a-ad0a-2c0633b584a7.png)

Click vào **Connect** để lấy url connect cũng như  đọc hướng dẫn.

Bạn có thể connect đến MongoAtlas bằng cách:
- SSH qua MongoDB Shell
```
mongo "mongodb+srv://<url>/<db-name>"  --username <username>
```

- Connect bằng code trên application của bạn hoặc MongoDB Compass
```
mongodb+srv://<username>:<password>@<url>/<db-name>?retryWrites=true&w=majority
```

- Connect đến ứng dụng bên thứ 3 như Robo3T: với cách này bạn cần chọn connect đến ReplicaSet thay vì Direct

## 5. Triggers

Nếu bạn đã làm việc với SQL thì chắc hẳn đã nghe đến tính năng này.
Nó là tính tăng chạy một số câu lệnh mỗi khi có sự thay đổi về mặt dữ liệu, có thể là before hoặc after (insert, update, delete).

Thực ra ban đầu MongoDB không có hỗ trợ cho Triggers, người ta phải lắng nghe một thứ gọi là **Replica Set Oplog**, khi bạn chạy MongoDB trong Replica Set, tất cả các hành động của MongoDB được ghi vào nhật ký hoạt động (được gọi là oplog).

Tuy nhiên từ phiên bản 3.6, MongoDB có một tính năng gọi là **Change Streams** hỗ trợ bạn stream các thay đổi. Tuy nhiên mình sẽ nói đến tính năng này trong một bài viết khác.

Ở bài viết này, mình sẽ nói về **Triggers** mà Atlas hỗ trợ. Nó được viết dựa trên **Change Streams** của MongoDB.

Click vào **Triggers** trên màn hình Altas của bạn để có thể quản lý các Triggers. Với MongoDB bạn có thể thực hiện Trigger với các Event: **Insert, Update, Delete, Replace.**

Có hai cách để thực hiện Trigger:
- **Function**: là dạng một hàm được Trigger, tại đây bạn có thể thao tác với Database, gọi một function mà bạn define trong Mongo hoặc call API.
- **EventBridge**: Bạn có thể connect đến AWS EventBridge để Trigger các serverless trên AWS Lambda.

Ở bài viết này mình sẽ nói chi tiết về function.

#### changeEvent:

Database Trigger sẽ được call với một [changeEvent](https://docs.mongodb.com/manual/reference/change-events) parameter.

```
exports = function(changeEvent) {
  // Access the _id of the changed document:
  const docId = changeEvent.documentKey._id;

  // Access the latest version of the changed document
  // (with Full Document enabled for Insert, Update, and Replace operations):
  const fullDocument = changeEvent.fullDocument;

  const updateDescription = changeEvent.updateDescription;

  // See which fields were changed (if any):
  if (updateDescription) {
    const updatedFields = updateDescription.updatedFields; // A document containing updated fields
  }

  // See which fields were removed (if any):
  if (updateDescription) {
    const removedFields = updateDescription.removedFields; // An array of removed fields
  }
}
```

#### Thao tác với MongoDB Data:

```
exports = function(changeEvent) {
  // Access a mongodb service:
  const collection = context.services.get(<SERVICE_NAME>).db("db_name").collection("coll_name");
  const doc = collection.findOne({ name: "mongodb" });
  // Note: In Atlas Triggers, the service name is defaulted to the cluster name.
}
```

#### Call function:

```
exports = function(changeEvent) {
  Call other named functions if they are defined in your application:
  const result = context.functions.execute("function_name", arg1, arg2);
}
```

#### Call http service:

```
exports = function(changeEvent) {
  // Access the default http client and execute a GET request:
  const response = context.http.get({ url: <URL> })
}
```

Bạn có thể tìm hiểu thêm về **context** [ở đây](https://docs.mongodb.com/stitch/functions/context/#context-http).

## 6. Kết luận

Bài viết trên mình đã hướng dẫn các bạn để có thể bắt đầu với MongoDB Atlas, chúng khá đơn giản nếu bạn đã làm quen với MongoDB. Hi vọng với bài viết này các bạn sẽ có thêm một lựa chọn trong tech stack của mình. :relaxed::blush: