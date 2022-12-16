# Lời nói đầu
Gần đây, mình mới bắt đầu nghiên cứu và sử dụng mongo db nên có chút kiến thức cơ bản về Mongo muốn share và note ra đây coi như để nhở (Biết đâu sẽ có ích cho ai đó). Những kiến thức ít ỏi này không toàn diện nhưng mình nghĩ là những điều cơ bản và cần thiết để có thể sử dụng cơ bản được mongodb . Vì đây chỉ là những kiến thức ít ỏi của bản thân nên nếu có gì sai mong các bạn gọp ý giúp mình. Let go !!!

[Mongo DB cho người mới bắt đầu ! (P1) ](#)

[Mongo DB cho người mới bắt đầu ! (P2) ](https://viblo.asia/p/mongo-db-cho-nguoi-moi-bat-dau-p2-gDVK2Bd0KLj)

# Nội dung
Thực tế thì đã có quá nhiều bài giới thiệu về khái niệm cũng như cấu trúc của Mongo hay Nosql rồi. Nên trong bài viết ngày hôm nay mình sẽ đi vào những thứ thực dụng hơn :D. Việc đầu tiên nào
## Setup
> Mình hiện tại sử dụng Ubuntu 18.04 nên trong bài viết này tất cả nhứng gì mình viết sẽ base trên OS này nhé 

### Install

**1: Import the public key**

Đầu tiên chungs ta cần add GPG key vào Ubuntu. Để làm điều này chúng ta mở terminal lên và chạy command sau :

```
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

Nếu hệ thống trả ra OK thì mọi việc đã ổn .
Trong trường hợp terminalbáo chưa cài đặt `gnupg` thì bạn chỉ cần cài đặt nó bằng lệnh 
```
sudo apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

**2 : Create a list file for MongoDB**

Với version Ubuntu 18.04 thì có thể sử dụng lệnh sau :

```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

**3: Reload local package database.**

Update lại Ubuntu thôi nào:

```
sudo apt-get update
```

**4: Install**

Đến đây chúng ta có thể cài đặt bản stable của Mongo bằng câu lệnh :

```
sudo apt-get install -y mongodb-org
```

Hoạc chỉ đinh version của Mongo theo ý muốn của bạn . Cụ thể như sau :

```
sudo apt-get install -y mongodb-org=4.4.3 mongodb-org-server=4.4.3 mongodb-org-shell=4.4.3 mongodb-org-mongos=4.4.3 mongodb-org-tools=4.4.3
```

> Cần chú ý răngf, mặc dù bạn chỉ định hay mặc định stable version khi cài đặt MongoDB thì `apt-get` sẽ luôn update version của MongoDB khi có version được avaiable. Để tránh việc update không mong muốn này thì bạn cần set selection package khi cài đặt thông qua các câu lệnh sau .

```
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

### Start service 
**1 : Start MongoDB**

Sau khi đã cài xong, chúng ta cần start service Mongo lên bằng command sau :

```
sudo service mongod start
```

**2 : Verify that MongoDB has started successfully**

Để đảm bảo MiongoDB đã khởi động thành công, chúng ta đơn giản chỉ cần check status của nó thôi . Cụ thể dư sau :

```
sudo service mongod status
```

Trong trường hợp có lỗi hoặc bạn không muốn dùng command để check thì chỉ cần xem file log của mongo. File này nằm ở `/var/log/mongodb/mongod.log`. Khi server mongo đang chạy thì chắc chắn răng bạn luôn luôn thấy một dòng như sau trong file log:

```
[initandlisten] waiting for connections on port 27017
```

**3 : Stop/Restart MongoDB**

Trong trường hợp cần tạm dừng Mongo. THì chỉ cần dùng lệnh sau để tắt :

```
sudo service mongod stop
```

Hoặc bạn cần khởi động lại mongo thì chỉ cần :

```
sudo service mongod restart
```

**4: Trước khi bắt đầu**

Nếu bạn sử dụng tốt terminal thì có thể dùng command :

```
mongo
```

Mặc đinh thì command này sẽ connect đến `localhost` , port `27017` và không có password . Còn nếu bạn có server mongo remote thì follow theo command sau :

```
mongo --username alice --password --authenticationDatabase admin --host mongodb0.examples.com --port 28015
```

Hoặc nếu bạn có connection string thì dùng như sau:

```
mongo "mongodb://alice@mongodb0.examples.com:28015/?authSource=admin"
```

Riêng bản thân mình thì mình sử dung [nosqlbooster](https://nosqlbooster.com/), tool này khá dễ sử dụng mọi người có thể tham kháo nhé (bow)
## Các truy vấn cơ bản

Để thực hiện bất kì 1 truy vấn nào chung ta cần kết nối với Mongo thông qua terminal hoặc tool ([nosqlbooster](https://nosqlbooster.com/)) như mình đã nói bên trên. Ok bắt đầu nào
### Insert
Đầu tiên để  insert 1 record vào collection thì ta chỉ cần chạy query sau :

```
db.users.insert([{
    "type": NumberInt(1), // Kiểu số nhé 
    "name": "Anh B Nguyen Viet 1", 
    "email": "nguyen.viet.anh-b+1@sun-asterisk.com",
    "createdAt": ISODate("2021-01-26T14:04:01.089+07:00"),  // Kiểu ngày tháng
    "updatedAt": ISODate("2021-01-26T14:04:01.106+07:00"), // Kiểu ngày tháng
}])
```

Với query trên, mình đã tạo thêm 1 documment vào `users` collection bạn nhé !

### Update
Với ví dụ bên trên , nếu ta cần update kiểu type ko phải là 1, mà là 2 thì ta sử dụng query update. Cụ thể như sau :

```
db.users.update({ _id: ObjectId("600fbee107b3a63c4ebf716d") }, { //  ObjectId("600fbee107b3a63c4ebf716d") ==> thằng này là ID của bản ghỉ đã insert bên trên nhé 
    $set: {
        "type": NumberInt(2),
    }
})
```
### Select 
Ok, sau khi đã insert/ update dữ liệu ta cần show dữ liệu theo yêu cầu. Mình sẽ diễn giải nhưng điều cơ bản giông giông cái bài toàn Mysql nhé .

**1: Where**

Query lấy toàn bộ các user có type = 1.

```
db.users.find({
    'type': 1
})
```

Với Mongo , cụm tự `find` sẽ tương tự như `where` trong Mysql . Trong find chúng ta sẽ có 1 object dạng json . Object này sẽ là các điều kiện để fillter nhé . 


**2: Select field**

Mặc đinh thì các query sẽ show all tất cả các field có trong collection . Tuy nhiên nếu bạn chỉ muốn show 1 vài field thì bạn cần query như sau:

```
db.users.find({})
   .projection({
       'type': 1,
       
   })
   .sort({_id:-1})
```

Query bên trên sẽ only show filed type (và khóa chính của collection thường là `_id`). Khá giống `find` , `projection` đảm nhiệm chức năng giống `select` bên mysql , dùng `projection` khi bạn chỉ muốn show 1 số field ra nhé 

**3: OrderBy**

Giông với mysql, mặc đinh thì Mongo order theo khóa chính và theo kiểu ASC . Và nếu bạn muốn order by theo field khác , bạn có thể làm như sau :

```
db.users.find({})
   .sort({_id:-1}) // Order by theo id và DESC , nếu giá trị là 1 thì là ASC
```


##  Kết luận

Đến đây, bài viết sơ sài của mình đã kết thúc. Nếu các bạn cảm thấy nó bổ ích thì upvote 1 cái giúp mình nhé . Ở bài viết sau mình sẽ đề cập đến nhiều query phức tạp hơn của select dữ liệu. Cám ơn các bạn đã đọc đến hết bài viết . Thank you !

# Tài liệu tham khảo.

[https://docs.mongodb.com/](https://docs.mongodb.com/)