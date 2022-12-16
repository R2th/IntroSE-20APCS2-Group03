Nếu bạn từng là mobile developer thì có lẽ bạn sẽ thấy rất quen thuộc với khái niệm SQLite. Trong flutter cũng có rất nhiều plugin hỗ trợ quản lý local database như là floor, moor, sqlcool, sqflite,... Về khái niệm database, cũng như ưu nhược điểm của từng loại database trong flutter thì mình sẽ không trình bày ở bài viết này.

Ở bài viết này mình sẽ tập trung nói về **`sqflite` plugin**. Và ví dụ CRUD đơn giản khi thao tác với **`sqflite`**.

### 1. Implement
Chi tiết về việc implement cũng như version của plugin các bạn tham khảo ở đây nhé [sqflite](https://pub.dev/packages/sqflite)

SQLite là plugin dành cho Flutter. Supports iOS, Android và MacOS.

- Support transactions and batches
- Automatic version managment during open
- Helpers for insert/query/update/delete queries
- DB operation executed in a background thread on iOS and Android

Để sử dụng plugin, trong flutter project, các bạn add dependencies như bên dưới:

```kotlin
dependencies:
  ...
  sqflite: ^version_of_plugin
```

### 2. Example
Ở đây mình sẽ trình bày cách thao tác với `sqflite` bằng các CRUD operations đơn giản ở bài toán: Thêm, sửa, xóa danh sách Employee khỏi list. Source code example thì các bạn xem tại [sqflite_flutter](https://github.com/canhtv-0838/sqflite_flutter)

#### Add Dependency
Trước tiên, cần add dependency để có thể sử dụng thư viện. Các bạn vào file **`pubspec.yaml`**
```kotlin
dependencies:
  ...
  sqflite: any
```
sau đó bấm **Pub get**

#### Create model class: `employee.dart`
Class model để hiển thị dữ liệu. Ở đây chỉ cần hiển thị tên thôi nhé cho đơn giản.
```kotlin
class Employee {
  int id;
  String name;
 
  Employee(this.id, this.name);
 
  Map<String, dynamic> toMap() {
    var map = <String, dynamic>{
      'id': id,
      'name': name,
    };
    return map;
  }
 
  Employee.fromMap(Map<String, dynamic> map) {
    id = map['id'];
    name = map['name'];
  }
}
```

#### Create database utils: `DBHelper.dart`
Nếu như ở trong Android, SQLite có lớp helper thì ở Flutter cũng có tương tự:
```kotlin
import 'dart:async';
import 'dart:io' as io;
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path_provider/path_provider.dart';
import 'employee.dart';
 
class DBHelper {
  static Database _db;
  static const String ID = 'id';
  static const String NAME = 'name';
  static const String TABLE = 'Employee';
  static const String DB_NAME = 'employee1.db';
 
  Future<Database> get db async {
    if (_db != null) {
      return _db;
    }
    _db = await initDb();
    return _db;
  }
 
  initDb() async {  //init db
    io.Directory documentsDirectory = await getApplicationDocumentsDirectory();
    String path = join(documentsDirectory.path, DB_NAME);
    var db = await openDatabase(path, version: 1, onCreate: _onCreate);
    return db;
  }
 
  _onCreate(Database db, int version) async { //tạo database
    await db
        .execute("CREATE TABLE $TABLE ($ID INTEGER PRIMARY KEY, $NAME TEXT)");
  }
 
  Future<Employee> save(Employee employee) async {  // insert employee vào bảng đơn giản
    var dbClient = await db;
    employee.id = await dbClient.insert(TABLE, employee.toMap());
    return employee;
    /*
    await dbClient.transaction((txn) async {
      var query = "INSERT INTO $TABLE ($NAME) VALUES ('" + employee.name + "')";
      return await txn.rawInsert(query); //các bạn có thể sử dụng rawQuery nếu truy vẫn phức tạp để thay thế cho các phước thức có sẵn của lớp Database.
    });
    */
  }
 
  Future<List<Employee>> getEmployees() async {  //get list employees đơn giản
    var dbClient = await db;
    List<Map> maps = await dbClient.query(TABLE, columns: [ID, NAME]);
    //List<Map> maps = await dbClient.rawQuery("SELECT * FROM $TABLE");
    List<Employee> employees = [];
    if (maps.length > 0) {
      for (int i = 0; i < maps.length; i++) {
        employees.add(Employee.fromMap(maps[i]));
      }
    }
    return employees;
  }
 
  Future<int> delete(int id) async { // xóa employee
    var dbClient = await db;
    return await dbClient.delete(TABLE, where: '$ID = ?', whereArgs: [id]); //where - xóa tại ID nào, whereArgs - argument là gì?
  }
 
  Future<int> update(Employee employee) async { 
    var dbClient = await db;
    return await dbClient.update(TABLE, employee.toMap(),
        where: '$ID = ?', whereArgs: [employee.id]);
  }
 
  Future close() async { //close khi không sử dụng 
    var dbClient = await db;
    dbClient.close();
  }
}
```
Sau khi đọc hết lớp helper, các bạn thấy nó cũng chả khác gì cái sqlite ở Android nhỉ.
#### Implementation Widget
Sau khi có lớp helper, việc cuối cùng của chúng ta là implement và sử dụng các util được viết ở trong lớp helper đó thôi.
Về bố trí view như nào thì các bạn có thể tự bố trí theo ý muốn. Cơ bản khi hiểu được lớp helper hoạt động như nào là chúng ta đã hiểu được cách sử dụng sqflite rồi.
Ở đây chúng ta sẽ tạo 1 screen trông như sau:
- ADD: Add name vào danh sách
- CANCEL: clear text
- Column Name: tên được add
- Column Delete: action delete được add

![](https://images.viblo.asia/a0bc1804-b194-434c-bde6-0e47a2880ac1.png)

**`db_page.dart`**
```kotlin
import 'package:flutter/material.dart';
import 'employee.dart';
import 'dart:async';
import 'db_helper.dart';
 
class DBTestPage extends StatefulWidget {
  final String title;
 
  DBTestPage({Key key, this.title}) : super(key: key);
 
  @override
  State<StatefulWidget> createState() {
    return _DBTestPageState();
  }
}
 
class _DBTestPageState extends State<DBTestPage> {
  //
  Future<List<Employee>> employees;
  TextEditingController controller = TextEditingController();
  String name;
  int curUserId;
 
  final formKey = new GlobalKey<FormState>();
  var dbHelper; //Khai báo object dbHelper để sử dụng
  bool isUpdating;
 
  @override
  void initState() {
    super.initState();
    dbHelper = DBHelper();  //Nhớ gán giá trị đã nhé :v và sau khi gán xong thì quẩy thôi.
    isUpdating = false;
    refreshList();
  }
 
  refreshList() {
    setState(() {
      employees = dbHelper.getEmployees();
    });
  }
 
  clearName() {
    controller.text = '';
  }
 
  validate() {
    if (formKey.currentState.validate()) {
      formKey.currentState.save();
      if (isUpdating) {
        Employee e = Employee(curUserId, name);
        dbHelper.update(e);
        setState(() {
          isUpdating = false;
        });
      } else {
        Employee e = Employee(null, name);
        dbHelper.save(e);
      }
      clearName();
      refreshList();
    }
  }
 
  form() {
    return Form(
      key: formKey,
      child: Padding(
        padding: EdgeInsets.all(15.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          verticalDirection: VerticalDirection.down,
          children: <Widget>[
            TextFormField(
              controller: controller,
              keyboardType: TextInputType.text,
              decoration: InputDecoration(labelText: 'Name'),
              validator: (val) => val.length == 0 ? 'Enter Name' : null,
              onSaved: (val) => name = val,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                FlatButton(
                  onPressed: validate,
                  child: Text(isUpdating ? 'UPDATE' : 'ADD'),
                ),
                FlatButton(
                  onPressed: () {
                    setState(() {
                      isUpdating = false;
                    });
                    clearName();
                  },
                  child: Text('CANCEL'),
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
 
  SingleChildScrollView dataTable(List<Employee> employees) {
    return SingleChildScrollView(
      scrollDirection: Axis.vertical,
      child: DataTable(
        columns: [
          DataColumn(
            label: Text('NAME'),
          ),
          DataColumn(
            label: Text('DELETE'),
          )
        ],
        rows: employees
            .map(
              (employee) => DataRow(cells: [
                    DataCell(
                      Text(employee.name),
                      onTap: () {
                        setState(() {
                          isUpdating = true;
                          curUserId = employee.id;
                        });
                        controller.text = employee.name;
                      },
                    ),
                    DataCell(IconButton(
                      icon: Icon(Icons.delete),
                      onPressed: () {
                        dbHelper.delete(employee.id);
                        refreshList();
                      },
                    )),
                  ]),
            )
            .toList(),
      ),
    );
  }
 
  list() {
    return Expanded(
      child: FutureBuilder(
        future: employees,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return dataTable(snapshot.data);
          }
 
          if (null == snapshot.data || snapshot.data.length == 0) {
            return Text("No Data Found");
          }
 
          return CircularProgressIndicator();
        },
      ),
    );
  }
 
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Flutter SQLITE CRUD DEMO'),
      ),
      body: new Container(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          verticalDirection: VerticalDirection.down,
          children: <Widget>[
            form(),
            list(),
          ],
        ),
      ),
    );
  }
}
```

**`main.dart`**
```kotlin
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: DBTestPage(title: 'Flutter Demo DBTestPage'),
    );
  }
}
```

Và cuối cùng là thành quả. Tại máy ảo sida không quay gif được nên mình để quả ảnh minh họa là nó chạy đc thôi :D

![](https://images.viblo.asia/272dd718-bab8-4b6c-b523-69cce8e18486.png)