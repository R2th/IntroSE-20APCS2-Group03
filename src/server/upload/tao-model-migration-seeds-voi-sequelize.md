# sequelize là gì 
 Sequelize là một ORM Node.js  hỗ trợ liên kết với các database như  Postgres, MySQL, MariaDB, SQLite và  Microsoft SQL Server. Trong bài viết này mình sẽ cùng các bạn tạo model, migrations và seed với sequelize-cli. Bắt đầu thôi nào :D 
 # Cài đặt 
 trước hết chúng ta cần phải cài đặt sequelize, mình dùng yarn để cài sequelize nếu bạn nào chưa cài yarn thì có thể xem ở đây https://classic.yarnpkg.com/en/docs/install/#debian-stable. 
                 
  1 Cài đặt sequelize:
              
              yarn add sequelize
2 Cài hệ quản trị cở sở dữ liệu: 
        
                yarn add mysql
ở đây mình sử dụng mysql, các bạn có thể sử dụng các hệ quản trị cơ sở dữ liệu khác như sau :


                yarn add mariadb
                 yarn add sqlite3
                 yarn add tedious 
                 
  3 Cài sequelize-cli:
  
                 yarn global add sequelize-cli
                 
 Tiếp theo chúng ta sẽ tạo Project với lệnh 
 
                 npx sequelize-cli init
 Chạy lệnh trên sẽ tạo ra 4 folders như sau :
 ![](https://images.viblo.asia/910744e3-d770-422d-90dc-12432b04137c.png)

   - config: chứa file cấu hình cho CLI biết cách kết nối với cơ sở dữ liệu.
   - migrations: chứa tất cả các file migration.
   - models: chứa tất cả các model của project
   - seeder: chứa tất cả các file seeds
   
   Trước khi tạo model chúng ta cần phải cấu hình lại một chút để CLI biết cách kết nối với cơ sở dữ liệu, bằng cách mở  file:     `config.js/config`
   
   ![](https://images.viblo.asia/e23e5c0c-db19-4eda-a49e-a08e796f5f48.png)
     
Bạn cần thay đổi `username` với `password` sao cho đúng với username password trong hệ quản trị cơ sở dữ liệu của bạn. Một số lưu ý nhỏ là `diaclect` Sequelize CLI mặc định là mysql vì thế khi bạn sử dụng hệ cơ sở dữ liệu khác bạn cần phải đổi lại cho phù hợp, nếu bạn chưa tạo cơ sở dữ liệu thì bạn cần chạy thêm lệnh `sequelize db:create` để tạo cơ sở dữ liệu được chỉ định trong file `config.js`. Được rồi bây giờ chúng ta sẽ bắt đầu tạo migration luôn nhé :)
# Tạo Model (và Migration)

Chúng ta chỉ cần chạy lệnh: 

      npx sequelize-cli model:generate --name Contact --attributes realName:string,address:string 
      
   Ở đây chúng ta chỉ cần chú ý đến :
   - name: tên của model
   - attributes: danh sách các thuộc tính 
   
   Ở trên sau khi chạy lệnh sẽ tạo ra 1 model có tên là `Contact` với thuộc tính là `realName`, `address` trong thư mục `model`, và một file `20200305015249-create-contact.js` trong thư mục `migration`
 Đây là file contact.js: 
```php

const createModel = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    eventId: DataTypes.INTEGER,
    realName: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    birthday: DataTypes.DATE,
  }, {})
  Contact.associate = function (models) {
    Contact.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' })
  }
  return Contact
}
export default createModel


```

Ở đây tôi có thêm các attributes như là `phone`,`brithhday`...

   Tương tự tôi cũng tạo thêm một model nữa có tên là Event. Ở đây tôi xác định mối quan hệ giữa `Event` và `Contact` là `1-n` vì thế chúng ta cần khai báo trong phần  `Contact.associate` tôi phải xét quan hệ cho nó với `Event` là `belongTo` với khóa ngoại là `eventId`. Tương tự bên `Event` tôi cũng có : 
```php

 Event.associate = function (models) {
    Event.hasMany(models.Contact, { foreignKey: 'eventId', as: 'contact' })
  }

```

   Tiếp theo là chạy migration: 
   # Chạy Migration
  Chạy migration với lệnh :
                    
                    
                    npx sequelize-cli db:migrate
                    
   Lệnh này sẽ thực thi các bước :
  
   - Gọi đến bảng SequelizeMeta trong cơ sở dữ liệu, bảng này có nhiêm vụ lưu lại những migration đã chạy trên cơ sở dữ liệu hiện tại
   - Tiếp theo là tìm kiếm các file trong mucj migration nào chưa được chạy nhờ vào bảng  SequelizeMeta ở trên và chạy chúng
   - Cuối cùng là  tạo ra một bảng có tên và các thuộc tính như  trong file migration 

# Tạo seed
Để tạo seed chúng ta chạy câu lệnh :
    
            npx sequelize-cli seed:generate --name seed-event
 ở lệnh trên tôi đã tạo ra một seed có tên là seed-event  vào bảng Event. bây giờ hãy vào thư mục seeders để chỉnh sửa nó nhé :))) 
```php
export default {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        'Events',
        [
          {
            title: 'year end party',  
            numberOfSubscribers: 814,
            numberOfParticipants: 670,
            startTime: new Date('2020-05-01T00:00:00.000Z'),
            endTime: new Date('2020-06-01T00:00:00.000Z'),
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ], {})
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('People', null, {})
    }
  }
  ```
Đây là file seed sau khi đã chỉnh sửa. việc còn lại là chạy nó lên thôi :))))
# chạy seed
Để chạy seed chúng ta chỉ cần thực hiện lệnh 

            npx sequelize-cli db:seed:all
            
 Lệnh này sẽ thực thi tất cả các seed. Có một lưu ý nhỏ đó là  seeder không giống migration đó là lịch sử thực hiện của nó không được lưu lại vì thế bạn muốn thay đổi seed thì chỉ cần vào file chỉnh sửa rồi chạy lại là được còn đối với migration khi bạn muốn thực hiện thay đổi thì bạn cần phải tạo một file migration mới.
 # kết luận
 Vậy là mình đã cùng các bạn thực hiện cài đặt sequelize và tạo model, migration, với seed , ở bài biết này mình mới chỉ thực hiện tạo mà chưa sử dụng các lệnh undo, và tạo seed bằng tay chưa sử dụng facker, tạo nhiều record cho một bảng. vì thế các bạn hãy ủng hộ mình để mình có thêm động lực ra phần tiếp theo nhé ;). Bài viết còn nhiều thiếu xót rất mong được sự đóng góp của mọi người, mọi thắc mắc các bạn vui lòng comments bên dưới để mình và mọi người cùng giải đáp nhé. Cảm ơn các bạn đã đón đọc.
 
 Tài liệu tham khảo : 
 
 https://sequelize.org/master/manual/migrations.html