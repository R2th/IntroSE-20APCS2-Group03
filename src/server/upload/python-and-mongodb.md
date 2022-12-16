# Lời nói đầu.
Xin chào mọi người  đã quay trở lại seria bài viết về python của mình :D . Ai cần đọc về bài viết về python phần 1, 2 và 3 của mình thì click vào link bên dưới nhé :D
- [Getting started Python - P1](https://viblo.asia/p/getting-started-python-V3m5WBWWlO7)
-  [Getting started Python - P2](https://viblo.asia/p/getting-started-python-p2-3Q75wkz25Wb)
-  [Getting started Python - P3](https://viblo.asia/p/getting-started-python-p3-maGK7mOAlj2)
-  [Getting started Python - Handle File](https://viblo.asia/p/getting-started-python-handle-file-1VgZvo2rlAw)
- [Python vs MySQL](https://viblo.asia/p/python-vs-mysql-RQqKLEn4Z7z)

Ở bài viết lần trước mình có trình bày với các bạn cách làm việc của Mysql và Python với nhau rồi. Ngày hôm nay mình xin nói về python và 1 cơ sở dữ liệu khác đó là `MongoDB`

# Nội dung.
## I : Install MongoDB Driver

Đâu tiên , để có thể truy cập tời MongoDB   thì Python cần một MongoDB Driver để kết nối. Trong bài viết này , mình sẽ giời thiệu cho các bạn sử dung `PyMongo`

 `PyMongo` là một driver được nhiều người sử dụng khi dung Python và làm việc với MongoDB. Nào hay cài đặt package này bằng cách chạy câu lệnh này nhé :
 ```
python -m pip install pymongo
```

Ok, khi bạn đã cài đặt xong package thì thử kết nối đến database xem sao nhé . 

```
import pymongo
```
 
Nếu đoạn mã trên được thực thi không có lỗi, "pymongo" đã được cài đặt thành công và sẵn sàng để sử dụng.

## II : Các thao tác căn bản 

### 1 : Create Database.
Để tạo 1 Mongo database , đầu tiên chúng ta cần tạo một object MongoClient . Sau đó , ta cần cung cấp một URL với địa chỉ IP chính xác và tên database mà bạn muốn tạo.

MongoDB sẽ tạo ra database mà bạn muốn . Tuy nhiên nếu database đã tồn tại thì Python sẽ tạo ra 1 connection vơi database được chỉ định :

```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["mydatabase"]
```

> Note : Trong MongoDB , một Database không được khởi tạo cho đến khi nó có nội dung .

MongoDB sẽ chờ cho đến khi bạn tạo ra 1 collection (Table) nào đó , với ít nhất một document ( record)  ... trước khi nó thực sự tạo ra một cơ sở dữ liệu.


Nếu bạn muốn check xem database có tồn tại hay không thì bạn có thể check băng cách list toàn bộ các database trong CSDL . Bằng cách sau :

```
print(myclient.list_database_names())
```

Hoặc chỉ định ra rõ ràng tên Database :
```
dblist = myclient.list_database_names()
if "mydatabase" in dblist:
  print("The database exists.")
```

> Remember : Trong MongoDB , một cơ sở dữ liệu chỉ được tạo khi nó có nội dung (document) bên trong. Vì vậy lần đầu tiên bạn thực hiện tạo cơ sở dữ liệu cần phải thực hiện 2 bước sau (Tạo collection và Tạo Document) trước khi bạn muốn check xem database có tồn tại không.

### 2 : Creating a Collection

Để tạo một collection trong MongoDB , bạn cần sử dùng database objeect và chỉ định ra tên của collection mà bạn muốn tạo. MongoDB sẽ tạo ra collection nếu nó không tồn tại :

```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]

mycol = mydb["customers"]
```


> Note : Trong MongoDB , một colection không được khởi tạo cho đến khi nó có nội dung (document).

Trong trường hợp bạn muốn check xem collection có tồn tại hay không thì có thể dùng cách sau :

```
collist = mydb.list_collection_names()
if "customers" in collist:
  print("The collection exists.")
```

> Remember : Cũng như cơ sở dữ liệu, Collection chỉ được tạo  khi nó có nội dung (document) bên trong. Vì vậy lần đầu tiên bạn thực hiện tạo Collection cần phải thực hiện tạo Document trước khi bạn muốn check xem Collection có tồn tại không.


### 3 : Insert  / Update  .

**3.1 : Insert** 

Để tạo một record / document bạn cần kết nôí đến một collection trong database . Và sử dụng hàm `insert_one()` .

Hàm `insert_one()` chấp nhập một object có name(s) và value(s) cho mỗi field trong document mà bạn muốn insert . Cụ thể như sau :

   ```
    import pymongo

    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["mydatabase"]
    mycol = mydb["customers"]

    mydict = { "name": "John", "address": "Highway 37" }

    x = mycol.insert_one(mydict)
   ```
   
  Hàm `insert_one()` sẽ trả ra một object InsertOneResult . Object đó có thuộc tính `inserted_id` . Nó chính là id của document vừa mới insert vào :
  
  ```
  mydict = { "name": "Peter", "address": "Lowstreet 27" }

 x = mycol.insert_one(mydict)

print(x.inserted_id)
  ```
  
>   Note : Nếu bạn không xác định  field `_id` và MongoDB sẽ tạo cho bạn một unique id cho mỗi document 



Để insert nhiều document cùng một lúc vào MongoDB , chúng ta có thể sử dụng method `insert_many()`    .

Hàm `insert_many()` chấp nhập một list  objects có name(s) và value(s) cho mỗi field trong document mà bạn muốn insert . Cụ thể như sau :

```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

mylist = [
  { "name": "Amy", "address": "Apple st 652"},
  { "name": "Hannah", "address": "Mountain 21"},
  { "name": "Michael", "address": "Valley 345"},
  { "name": "Sandy", "address": "Ocean blvd 2"},
  { "name": "Betty", "address": "Green Grass 1"},
  { "name": "Richard", "address": "Sky st 331"},
  { "name": "Susan", "address": "One way 98"},
  { "name": "Vicky", "address": "Yellow Garden 2"},
  { "name": "Ben", "address": "Park Lane 38"},
  { "name": "William", "address": "Central st 954"},
  { "name": "Chuck", "address": "Main Road 989"},
  { "name": "Viola", "address": "Sideway 1633"}
]

x = mycol.insert_many(mylist)

#print list of the _id values of the inserted documents:
print(x.inserted_ids)
```

  Hàm `insert_many()` sẽ trả ra một object InsertManyResult . Object đó có thuộc tính `inserted_ids` . Nó chính là id của các document vừa mới insert vào .
  
  Trong trường hợp bạn không muốn sử dụng unique id do Mongo tạo. Khi create bạn có thể thêm field `_id` vào document muốn insert. Và phải nhớ rằng các `_id` là duy nhất. 2 document giống nhau `_id` sẽ không thể insert được.
  
  ```
  import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

mylist = [
  { "_id": 1, "name": "John", "address": "Highway 37"},
  { "_id": 2, "name": "Peter", "address": "Lowstreet 27"}
]

x = mycol.insert_many(mylist)

#print list of the _id values of the inserted documents:
print(x.inserted_ids)
```

**3.2 : Update**
   
   ***3.2.1 : Update once***
   
Để update  trong python, chúng ta có thê sử dụng `update_one()` method. 
* Đối số đầu tiên của hàm này là một truy vấn định nghĩa băng object dữ liệu
* Đối số thứ 2 của hàm này là là một object dữ liệu mới ... thể hiện trạng thái mới của document.

Cụ thể như sau :

```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

myquery = { "address": "Valley 345" }
newvalues = { "$set": { "address": "Canyon 123" } }

mycol.update_one(myquery, newvalues)

#print "customers" after the update:
for x in mycol.find():
  print(x)
```
   
>    Note : Nếu query tìm được nhiều hơn 1 kết quả thì chi kết quả đầu tiên được update .

   ***3.2.2 : Update many***
   
   Để update  nhiều record trong python, chúng ta có thê sử dụng `update_many()` method. 
   
   ```
   import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

myquery = { "address": { "$regex": "^S" } }
newvalues = { "$set": { "name": "Minnie" } }

x = mycol.update_many(myquery, newvalues)

print(x.modified_count, "documents updated.")
```

   **3.3 : Delete**
   
  ***3.3.1 : Delete once***
  
Để delete 1 record  trong python, chúng ta có thê sử dụng `delete_one()` method. 
* Đối số đầu tiên của hàm này là một truy vấn định nghĩa băng object dữ liệu

Cụ thể như sau :

```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

myquery = { "address": "Mountain 21" }

mycol.delete_one(myquery)
```
   
>    Note : Nếu query tìm được nhiều hơn 1 kết quả thì chi kết quả đầu tiên được xóa .


      
 ***3.3.2 : Delete many***
 
  Để delete nhiều record trong python, chúng ta có thê sử dụng `delete_many()` method. 
   
   ```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

myquery = { "address": {"$regex": "^S"} }

x = mycol.delete_many(myquery)

print(x.deleted_count, " documents deleted.")
```

 ***3.2.3 : Delete All Documents in a Collection***
 
 Trong trường hợp bạn muốn xóa cả collection thì có thể dùng cách sau:
 ```
 import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

x = mycol.delete_many({})

print(x.deleted_count, " documents deleted.")
 ```
   
   
   ### 4 : Select data
 **4.1 : Find One**
 
 Đê select dữ liệu từ collection trong MongoDB , chúng ta có thể `find_one()` method .  Với method này chúng ta sẽ có được phần tử đầu tiên được tìm ra trong collection.
 
 ```
 import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

x = mycol.find_one()

print(x)
 ```
 
  **4.2 : Find All**
  
Đôi khi chúng ta không chỉ muốn tìm duy nhân 1 bản ghi mà muốn nhận được cả 1 list danh sách các document thỏa mãn các điều kiên. Vì vậy chúng ta có `find()` method .

* Đối số đầu tiên trong method `find()` là 1 query object . Trong các ví dụ mình sẽ ko sử dung object này 
* Đối số thứ 2 trong method `find()` là 1 object giúp chúng ta xác nhận được các field mà chúng ta muốn lấy 

```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

for x in mycol.find(): // ko query điều kiện nào và lấy tất cả các field 
  print(x)
```

ok, trong trường hợp bạn chỉ muốn lấy 1 vài field  trong câu querry thì có thể làm như sau :
```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

for x in mycol.find({},{ "_id": 0, "name": 1, "address": 1 }):
  print(x)
```

Query bên trên có nghĩa là bạn  chỉ select ra 2 field `name` vs `address`  và field `id` sẽ không được show ra . 

> Nếu trong 1 query bạn không set đầy đủ field có trong record thì mặc định sẽ set là 1 và nếu bạn ko có thông tin liên quan gì đến field đó thì nó sẽ mặc định được show ra 


```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

for x in mycol.find({},{ "address": 0 }): // chỉ hide đi field address
  print(x)
```

**4.3 : Filter**
Như đã nói ở trên , khi bạn select 1 record ra, bạn có 1 object đối số thể hiện các điều kiện mà bạn muốn tìm kiếm. Cụ thể như sau :

```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

myquery = { "address": "Park Lane 38" } // tìm recode có field address = "Park Lane 38"

mydoc = mycol.find(myquery)

for x in mydoc:
  print(x)
```

Và nếu bạn muốn tạo 1 câu query nâng cao hơn thì sao . Dưới đây là ví dụ về 1 query mà field `address` bắt đầu bằng kí tự `S` hoặc các kí tự sau `s` trong bảng chữ cái alphabe. Cụ thể như sau :

```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

myquery = { "address": { "$gt": "S" } }

mydoc = mycol.find(myquery)

for x in mydoc:
  print(x)
```

Hoặc ta cũng có thể sử dụng Regex để tạo ra 1 câu query. Dưới đây là 1 ví dụ về query lấy các document có field `address` bắt đầu băng chứ `S`. Cụ thể như sau :

```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

myquery = { "address": { "$regex": "^S" } }

mydoc = mycol.find(myquery)

for x in mydoc:
  print(x)
```

**4.4 : Sort**

Khi bạn muốn sort các bản ghi lấy ra thì chúng ta có method `sort()`. Cụ thể như sau :

```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

mydoc = mycol.find().sort("name") // sort theo field name ASC (mặc định)

for x in mydoc:
  print(x)
```

> sort("name", 1) #ASC
> 
> sort("name", -1) #DESC

**4.5 : Limit**

Và cuối cùng tất nhiên rồi =)) để limit 1 list các dữ liệu , chúng ta có thể sử dụng `limit()` method. Cụ thể như sau :

```
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

myresult = mycol.find().limit(5)

#print the result:
for x in myresult:
  print(x)
```


Ok, vậy là mình đã nói xong về các công việc cơ bản để kết nối cũng như sử dụng Mysql với python . Cám ơn các bạn đã theo dõi.  :D
# Tài liệu tham khảo
[https://www.w3schools.com/python/default.asp](https://www.w3schools.com/python/default.asp)