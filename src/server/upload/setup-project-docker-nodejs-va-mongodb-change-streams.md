Thực ra bài viết này mình muốn viết về cách có thể setup nhanh một project gồm có các yêu cầu như sau .
* Ứng dụng cần hiển thị realtime cho người dùng ( app chat, sàn giao dịch ,...)
* Đảm bảo tính khả dụng 
* Có khả năng scale việc read


![](https://images.viblo.asia/3f21e252-20fb-455b-8f7c-c7e557995e99.jpeg)

# Chuẩn bị 
Vì đây là một blog về thực hành setup nên các bạn cũng nên chuẩn bị một chút kiến thức cũng như đã cài đặt Docker, Docker-compose, Nodejs, mongoDB

Ngoài ra nắm về khái niệm cốt lõi về Replica set trong Mongo : các bạn có thể đọc tại [đây](https://kipalog.com/posts/Replica-set-trong-MongoDB) 

## Mục tiêu 
Chúng ta sẽ làm một ứng dụng với kiến trúc replica set mongo như sau . Database sẽ gồm 3 cụm 1 **Primary** và 2 **Secondary** quá trình ghi sẽ đc ghi vào Primary và các Secondary sẽ sao chép lại Primary . Còn việc đọc có thể đọc ở đâu cũng được .
![](https://images.viblo.asia/518f3987-dccc-4563-9ead-80048bed4a2f.png)

**Với kiến trúc database như vậy có lợi ích gì  ?**

Đó chính là khi xảy ra vấn đề với primary thì các secondary sẽ bầu ra một primary mới và hệ thống không bị sập đảm bảo tính khả dụng đối với dữ liệu .

![](https://images.viblo.asia/5c9ebfd8-e474-427c-950a-32690c745bee.png)
# Demo
Hãy bắt đầu với việc setup một server node trước.

Bắt đầu với `npm init -y`
Sau đó cài các package sau 
```
yarn add express mongoose nodemon
```
Tạo file **index.js**
```js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// launch ======================================================================

app.listen(port);
console.log('The magic happens on port ' + port);
```

Tạo **Dockerfile**
```
FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

```

Tạo file **docker-compose.yaml**
```
version: '3'

services:
  node_server:
    build: ./
    working_dir: /usr/src/app
    volumes:
      - ./:/usr/src/app
    ports:
      - '3000:3000'
    networks:
      - app-network
    command: 'yarn start'

networks:
  app-network:
    driver: bridge   
```
Như vậy là chạy được node server rồi việc còn lại là setup database và connect tới nó .
## Setup database
Bổ xung thêm vào **docker-compose.yaml**
```
version: '3'

services:
  node_server:
    build: ./
    working_dir: /usr/src/app
    volumes:
      - ./:/usr/src/app
    ports:
      - '3000:3000'
    depends_on:
      - mongo1
      - mongo2
      - mongo3
    networks:
      - app-network
    command: 'yarn start'

  mongo1:
    hostname: mongo1
    container_name: mongo1
    image: mongo
    volumes:
      - ./data/data1/db:/data/db
      - ./data/data1/configdb:/data/configdb
    networks:
      - app-network
    expose:
      - 27017
    ports:
      - 30001:27017
    restart: always
    entrypoint: ['/usr/bin/mongod', '--bind_ip_all', '--replSet', 'devrs']

  mongo2:
    hostname: mongo2
    container_name: mongo2
    image: mongo
    volumes:
      - ./data/data2/db:/data/db
      - ./data/data2/configdb:/data/configdb
    networks:
      - app-network
    expose:
      - 27017
    ports:
      - 30002:27017
    restart: always
    entrypoint: ['/usr/bin/mongod', '--bind_ip_all', '--replSet', 'devrs']

  mongo3:
    hostname: mongo3
    container_name: mongo3
    image: mongo
    volumes:
      - ./data/data3/db:/data/db
      - ./data/data3/configdb:/data/configdb
    networks:
      - app-network
    expose:
      - 27017
    ports:
      - 30003:27017
    restart: always
    entrypoint: ['/usr/bin/mongod', '--bind_ip_all', '--replSet', 'devrs']

networks:
  app-network:
    driver: bridge

```
Hãy nhìn qua một chút những phần vừa bổ xung thêm : 
gồm 3 service mongo1, mongo2, mongo3 về cơ bản chúng giống nhau nên mình chỉ review qua một cái thôi .

Ví dụ **mongo1** 
```
  mongo1:
    hostname: mongo1
    container_name: mongo1
    image: mongo
    volumes:
      - ./data/data1/db:/data/db
      - ./data/data1/configdb:/data/configdb
    networks:
      - app-network
    expose:
      - 27017
    ports:
      - 30001:27017
    restart: always
    entrypoint: ['/usr/bin/mongod', '--bind_ip_all', '--replSet', 'devrs']
```
* **image:mongo** : khi build container sẽ sử dụng image bản mới nhất
* **volumes** : sẽ ánh xạ 2 file db và configdb ra ngoài và lưu như thế mỗi khi khởi động lại sẽ ko phải config lại hay sợ bị mất data
* **network** : chúng ta config các container cùng 1 mạng là app-network .
* **expose** :  các container sẽ mở cổng đấy bên trong để các container connect đc với nhau
* **ports** : map các cổng ra ngoài để xíu nữa sẽ dùng tool xem data bên trong cho nhanh
* **entrypoint** : chạy các lệnh 

## Mongoose connect
Tạo file **config/database.js**
```js
module.exports = {
  url: 'mongodb://mongo1:27017,mongo2:27017,mongo3:27017/' + 'test?replicaSet=rs0',
};
```

Chúng ta bổ xung thêm phần connect trong **index.js**
```js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const configDB = require('./config/database.js');

// configuration ===============================================================

const connectDB = async () => {
  await mongoose.connect(
    configDB.url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) console.log('error :', error);
      else console.log('Connect successfully');
    }
  );
  mongoose.set('useCreateIndex', true);
};

connectDB().catch((error) => console.error(error));
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
```
Như vậy vẫn chưa xong đâu bh chúng ta sẽ phải vào container mongo1 để config repical set
```
docker-compose exec mongo1 mongo
...
> rs.initiate()
{
        "info2" : "no configuration specified. Using a default configuration for the set",
        "me" : "mongo1:27017",
        "ok" : 1,
        "$clusterTime" : {
                "clusterTime" : Timestamp(1588404609, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        },
        "operationTime" : Timestamp(1588404609, 1)
}
devrs:SECONDARY> 
devrs:PRIMARY> rs.add('mongo2')
{
        "ok" : 1,
        "$clusterTime" : {
                "clusterTime" : Timestamp(1588404670, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        },
        "operationTime" : Timestamp(1588404670, 1)
}
devrs:PRIMARY> rs.add('mongo3')
{
        "ok" : 1,
        "$clusterTime" : {
                "clusterTime" : Timestamp(1588404681, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        },
        "operationTime" : Timestamp(1588404681, 1)
}
devrs:PRIMARY> 
```

Sau khi setup xong repical set chúng ta có thể check
```
devrs:PRIMARY> rs.printSlaveReplicationInfo()
source: mongo2:27017
        syncedTo: Sat May 02 2020 07:32:39 GMT+0000 (UTC)
        0 secs (0 hrs) behind the primary 
source: mongo3:27017
        syncedTo: Sat May 02 2020 07:32:39 GMT+0000 (UTC)
        0 secs (0 hrs) behind the primary 
```

Vậy là setup xong mongodb . Thử test một chút nào . Thêm vào function **connectDB** để test xem có ghi vào db không

```js
  // For this example, need to explicitly create a collection, otherwise
  // you get "MongoError: cannot open $changeStream for non-existent database: test"
  await mongoose.connection.createCollection('Person');

  // Create a new mongoose model
  const personSchema = new mongoose.Schema({
    name: String,
  });
  const Person = mongoose.model('Person', personSchema, 'Person');

  // Create a change stream. The 'change' event gets emitted when there's a
  // change in the database
  Person.watch().on('change', (data) => console.log(new Date(), data));

  // Insert a doc, will trigger the change stream handler above
  console.log(new Date(), 'Inserting doc');
  await Person.create({ name: 'Aladin' });
  console.log(new Date(), 'Inserted doc');
```
Mình sẽ sử dụng tool **NoSQLBosster for MongoDB** để xem . Hãy connect vào localhost:30001 mà mình vừa map ra ngoài .
![](https://images.viblo.asia/236a3a3d-0a86-44d3-a1d5-d8ca42ad4ab7.png)
## Change Streams
Change Streams là real time stream với bất kỳ thay đổi nào xảy ra trong cơ sở dữ liệu hoặc collection. Ví dụ: bất cứ khi nào xảy ra các thao tác cập nhật (Insert, Update hoặc Delete) trong một collection cụ thể nào đó, MongoDB sẽ kích hoạt một sự kiện thay đổi với data là tất cả data đã được sửa đổi đó. Các bạn có thể đọc thêm tại [đây ](https://docs.mongodb.com/manual/changeStreams/)

Đến đây sửa lại một chút cho chuyên nghiệp .Thêm frontend bằng Vue config lại docker-compose . Các bạn có thể xem trong github của mình 

file **models/User.js**
```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Need User name'],
  },
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
```

file **router/events.js**
```js
const router = require('express').Router();
const User = require('../models/User');

const changeStream = User.watch();

module.exports = function (io) {
  //Socket.IO
  io.on('connection', function (socket) {
    console.log('Socket Connection Established with ID :' + socket.id);
    //ON Events
    changeStream.on('change', (change) => {
      console.log(change); // You could parse out the needed info and send only that data.
      io.emit('changeData', change.fullDocument);
    });
    //End ON Events
  });
  return router;
};
```

Do bài viết đã khá dài rồi nên mình sẽ tạm dừng việc giới thiệu về Vue + Socket.io như thế nào . Chắc chắn mình sẽ đề cập đến nó trong một bài viết gần nhất . Hoặc các bạn có thể tham khảo qua github của mình . Mình rất mong nhận đc những ý kiến góp ý của mọi người .

github : https://github.com/vinhyenvodoi98/Mongodb-Cluster-Nodejs_socket.io

Reference
* https://kipalog.com/posts/Replica-set-trong-MongoDB
* https://blog.skbali.com/2019/05/mongodb-replica-set-using-docker-compose/
* https://thecodebarbarian.com/stock-price-notifications-with-mongoose-and-mongodb-change-streams.html
* https://medium.com/@msanathkumar/building-a-simple-real-time-chat-application-using-socket-io-express-and-vue-js-d263c08a4c59