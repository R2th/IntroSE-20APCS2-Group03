# Giới thiệu
Có lẽ mọi người đã không còn xa lạ gì với SQLite trong lập trinh mobile, đây là công cụ hữu ích đễ caching data hoặc lưu trữ dưới local. Ở android thì chúng la đã quá quen với thư viện Room, đây là thư viện mạnh mẽ cung cấp cáp phương thức để khai thác hết sức mạnh của SQLite một cách dễ dàng nhất. Trên Flutter chúng ta cũng có rất nhiều plugin để thao tác với SQLite một cách dễ dàng tiêu biểu như là : **sqlcool**, **sqflite**, **floor**.... Chi tiết về các plugin các bạn có thể tìm kiếm trên pub.dev nhé. Ở đây mình sẽ sử dụng plugin **floor** vì nó có nhiều nét tương đồng với thư viện Room ở trên android và thật tuyệt vời khi plugin này support cả android và ios

![](https://images.viblo.asia/b7fa7a8f-89ea-4c73-8423-f1cb3d80fe5c.png)

# Floor
Floor là một thư viện cung cấp lightweight SQLite abstraction  với việc tự động mapping giữa in-memory object và database rows trong  khi vẫn cung cấp toàn quyền kiểm soát cơ sở dữ liệu với việc sử dụng SQL

Phiên bản hiện tại của floor là 0.9.0 

## Sử dụng
1. Add dependencies cần thiết vào file pubspec.yaml

```
 dependencies:
   flutter:
     sdk: flutter
   floor: ^0.9.0

 dev_dependencies:
   floor_generator: ^0.9.0
   build_runner: ^1.7.1
```

* build_runner: công cụ để gen ra các file cần thiết

2. Create a Entity
Mỗi Entity sẽ đại diện cho một table trong database của chúng ta

```
import 'package:floor/floor.dart';

 @entity
 class Person {
   @primaryKey
   final int id;
   
   @ColumnInfo(name: 'custom_name', nullable: false)
   final String name;

   Person(this.id, this.name);
 }
```

* Từ khóa @entity:  đáng dấu đây là một table
* Từ khóa @primaryKey: đáng dấu thuộc tính này là khóa chính của bảng. Thuộc tính này là bắt buộc. có thể đặt nhhiều field làm Primarykey khi đó sử dụng @Entity(primaryKeys: ['id', 'name'])
* Từ khóa @ColumnInfo: để thay đổi thông tin của field như tên, notnull

3. Create a DAO

Class DAO là thành phần chịu trách nhiệm quản lý quyền truy cập vào database . abstract class chứa các phương thức truy vấn database  
```
import 'package:floor/floor.dart';
 @dao
 abstract class PersonDao {
   @Query('SELECT * FROM Person')
   Future<List<Person>> findAllPersons();

   @Query('SELECT * FROM Person WHERE id = :id')
   Future<Person> findPersonById(int id);

   @insert
   Future<void> insertPerson(Person person);
   
   @transaction
   Future<void> replaceUsers(List<Person> users) async {
       await deleteAllUsers();
       await insertUsers(users);
   }  
 }
```

* @Query : annotation đánh dấu các phương thức queries (select, delete)
* @insert:  annotation đánh dấu phương thức insert data
* @delete: annotation đánh dấu phương thức delete data
* @transaction: đánh dấu phương thức là một tập transaction bao gôm một hoặc nhiều các transaction khác nhau

4. Create Database

```
 import 'dart:async';
 import 'package:floor/floor.dart';
 import 'package:path/path.dart';
 import 'package:sqflite/sqflite.dart' as sqflite;   

 import 'dao/person_dao.dart';
 import 'model/person.dart';   

 part 'database.g.dart'; // the generated code will be there

 @Database(version: 1, entities: [Person])
 abstract class AppDatabase extends FloorDatabase {
   PersonDao get personDao;
 }
```

Tạo một abstract class enxtend từ **FloorDatabase**. Anotation @Database để đánh dấu version của database cũng như các entities cần thiết lưu trữ.

5.  Đảm bảo rằng bạn đã add **part 'database.g.dart';** file này sẽ được gen tự động khi chúng ta chạy build_runner
6.  Chạy dòng lệnh **flutter packages pub run build_runner build** trong terminal để gen các file cần thiết. Hoặc bạn có thể chạy lệnh **flutter packages pub run build_runner watch** để tự động gen khi có sự thay đổi về database hay các entities.
7.  Sử dụng generated code. Để get được instance của database hãy sử dụng **$FloorAppDatabase** class đã được tạo tự động

```
final database = await $FloorAppDatabase.databaseBuilder('app_database.db').build();

 final person = await database.findPersonById(1);
 await database.insertPerson(person);****
```
app_database.db: Là tên database bạn muốn đặt

## Architecture

![](https://images.viblo.asia/db05b295-08ac-48fa-b241-00be0c8b3480.png)

## Querying
Các phương thức query được đánh dấu bằng annotation @Query(). Khi sử dụng query cần đảm bảo tính chính xác của lệnh truy vấn. Câu lệnh query có thể trả về kiểu Future, Stream của một Entity hoặc Void. Vài ví dụ về truy vấn query

```
@Query('SELECT * FROM Person WHERE id = :id')
Future<Person> findPersonById(int id);

@Query('SELECT * FROM Person WHERE id = :id AND name = :name')
Future<Person> findPersonByIdAndName(int id, String name);

@Query('SELECT * FROM Person')
Future<List<Person>> findAllPersons(); // select multiple items

@Query('SELECT * FROM Person')
Stream<List<Person>> findAllPersonsAsStream(); // stream return

@Query('DELETE FROM Person')
Future<void> deleteAllPersons(); // query without returning an entity

@Query('SELECT * FROM Person WHERE id IN (:ids)')
Future<List<Person>> findPersonsWithIds(List<int> ids); //

@Query('SELECT * FROM Person WHERE name LIKE :name')
Future<List<City>> findPersonsWithNamesLike(String name);
```

## Migrations
 Qua cá version của app việc thay đổi cấu trúc database thường xuyên sảy ra nên việc migrations databse là việc bắt buộc để đảm bảo tính toàn vẹn của data.
```
// update entity with new 'nickname' field
@Entity(tableName: 'person')
class Person {
  @PrimaryKey(autoGenerate: true)
  final int id;

  @ColumnInfo(name: 'custom_name', nullable: false)
  final String name;
  
  final String nickname;

  Person(this.id, this.name, this.nickname);
}

// bump up database version
@Database(version: 2)
abstract class AppDatabase extends FloorDatabase {
  PersonDao get personDao;
}

// create migration
final migration1to2 = Migration(1, 2, (database) {
  database.execute('ALTER TABLE person ADD COLUMN nickname TEXT');
});

final database = await $FloorAppDatabase
    .databaseBuilder('app_database.db')
    .addMigrations([migration1to2])
    .build();
```
 
 Sau khi có thay đổi về cấu trúc database tiến hàng nâng version của database. Sau đó định nghĩa các thay đổi bằng các hàm thực thi  như migration1to2.... Cuối cùng sử dụng addMigrations()  khi build database.
 
## Callback
```
final callback = Callback(
   onCreate: (database, version) { /* database has been created */ },
   onOpen: (database) { /* database has been opened */},
   onUpgrade: (database, startVersion, endVersion) { /* database has been upgraded */ },
);

final database = await $FloorAppDatabase
    .databaseBuilder('app_database.db')
    .addCallback(callback)
    .build();
```

Nguồn: https://pub.dev/packages/floor#persisting-data-changes