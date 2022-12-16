1. **Giới thiệu về replica set trong MongoDB**

    Replica set trong MongoDB là một group các mongod processes để duy trì cùng một cơ sở dữ liệu. Replica set cung cấp khả năng dự phòng và tính sẵn sàng cao.

    **Tính dự phòng và sẵn sàng cao**
    
      - Replication cung cấp tính dự phòng và nâng cao tính khả dụng của mongoDB. Với nhiều bản sao chép trên nhiều database server khác nhau, replication nâng cao mức độ chịu lỗi chống lại việc mất dữ liệu trên signle database.
      - Trong một số trường hợp, replication có thể cải thiện khả năng đọc dữ liệu vì client có thể đọc dữ liệu trên nhiều database server khác nhau. Duy trì các bản sao dữ liệu làm tăng tính cục bộ và khả dụng của dữ liệu.
      - Các replica cũng có thể duy trì cho các mục đích như khôi phục dữ liệu, sao lưu.

    **Replication trong MongoDB**

     ![](https://images.viblo.asia/5d104f9b-77bd-4a80-adcd-117b14be0dbf.png)
     
      - Replica set là một group các mongod instances để duy trì cùng một bộ cơ sở dữ liệu. Trong replica set bao gồm một số node mang dữ liệu, trong các nút này chỉ duy nhất một nút là nút chính để ghi dữ liệu trong khi các nút còn lại là các nút phụ được sao chép dữ liệu từ nút chính. Nếu nút chính bị lỗi một trong những nút phụ sẽ được thay thế thành một nút chính mới.
       
      ![](https://images.viblo.asia/40cfa4a1-f221-46d4-9342-6292573103cc.png)
       
2. **Cấu hình replica trong MongoDB trên môi trường ubuntu**
* Cài đặt MongoDB:  [reference](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
* Set up replica set với 3 node (1primary và 2 slave)
    - đầu tiền cần tạo 3 thư mục cho 3 node của replica. Ở đây mình sẽ chạy 3 node trên 3 port 27017, 27018, 27019 nên mình tạo 3 thư mục tương ứng.

![](https://images.viblo.asia/e2817b41-8e1a-4075-bd3d-181198a2367d.png)

  - Lần lượt run 3 node bằng lệnh:
  
      `sudo mongod --dbpath mongo27017 --port 27017  --replSet "rs0"`

      `sudo mongod --dbpath mongo27018 --port 27018  --replSet "rs0"`

      `sudo mongod --dbpath mongo27019 --port 27019  --replSet "rs0"`
  
    Trong đó:
      + `--dbpath` là đường dẫn đến thư mục vừa tạo.
      + `--port` là port để run node của của mongo.
      + `--replSet` là tên của replication.
  - Access vào mongo để config replica bằng lệnh `mongo --port 27017`

      ![](https://images.viblo.asia/d0d753ee-ab03-4507-8c6a-195e8f43c20e.png)
      
   - Run lệnh: `rs.initiate()`
  
  ![](https://images.viblo.asia/0fd6c8e0-d565-4db0-9e46-d826d02bfa05.png)
  
   - Add lần lượt các node còn lại vào replica set:
  
      `rs.addArb('127.0.0.1:27018')`

      `rs.add('127.0.0.1:27019')`
      + rs.addArb: để add 1 node làm trọng tài.
      + rs.add: để add 1 member vào replica.
   
  ![](https://images.viblo.asia/904e9a07-9418-4e36-91ec-8ca1b221913c.png)
  
   - Xem lại cấu hình của replica ta thấy lần có 3 node với 3 port 27017, 27018, 27019.

   ![](https://images.viblo.asia/a3ccdf65-98df-4033-b50d-73e88511fec3.png)
  
  - Access vào các node còn lại và run `rs.slaveOk()` để hoàn thành cấu hình replica set.
 
* Set up replica với authentication.
    
    - Tạo file key để authen giữa các node trong replica.
  
      `openssl rand -base64 756 > mongodb.key`
      
      `chmod 400 mongodb.key`
    - Access primary node để tạo mới user.
    - run:
       `use admin`
       `db.createUser({
            user: "admin", 
            pwd:"admin",
            roles: ["userAdminAnyDatabase"]
          })`
    ở đây mình tạo mới user admin với full quyền trên tất cả db.
- Restart lại 3 node với `--keyFile` để yêu cầu authen.

    `sudo mongod --dbpath mongo27017 --keyFile mongodb.key --port 27017  --replSet "rs0"`
    
    `sudo mongod --dbpath mongo27018 --keyFile mongodb.key --port 27018  --replSet "rs0"`
    
    `sudo mongod --dbpath mongo27019 --keyFile mongodb.key --port 27019  --replSet "rs0"`

reference [replica](https://docs.mongodb.com/manual/replication/)