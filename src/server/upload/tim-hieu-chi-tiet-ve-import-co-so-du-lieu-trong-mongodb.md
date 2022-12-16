Việc import và Export cơ sở dữ liệu luôn là việc làm cơ bản của bất kì ai tham gia vào công việc làm, phát triển website. Nó rất quan trọng và phải được thực hiện thường xuyên để đảm bảo tính an toàn dữ liệu, tránh khỏi các nguy cơ mất mát không lường trước được và hơn hết trong quá trình phát triển bạn luôn cần nó để hỗ trợ công việc lập trình dưới local. Bạn có thể export database để tạo các bản lưu trữ, import database khi muốn di chuyển website tới nhà cung cấp hosting khác hay import dữ liệu trong quá trình làm việc. Tất cả các thao tác ấy mình sẽ hướng dẫn mọi người.
Hôm nay mình tìm hiểu về lệnh mongoimport trước nhé.
## Import cơ sở dữ liệu 
Để nhập dữ liệu vào Database mongo ta có thể đưa dữ liệu vào từ file Json, CSV hay TSV. Những file này là đầu ra của mongo export hoặc có thể từ bên thứ ba nào khác. <br>
** Chú ý : ta chạy lệnh mongoimport từ command line của hệ thống (terminal của linux, MacOS hoặc command line của window), nhưng không thể chạy ở mongo shell.<br>
Các hệ điều hành được hỗ trợ. (thông tin lấy từ document của mongoDB)

![](https://images.viblo.asia/28cca2fe-39a5-4790-bf62-1b04ef3a3da9.png)

### Import cơ sở dữ liệu từ file json
Câu lệnh cơ bản sử dụng để import file có tên là contacts.json

```mongoimport --db=testlocal --collection=ten_colection --file=ten_file_import.json```

Các thông số:<br>
--db: tên database cần import.<br>
--collection: tên collection cần import.<br>
--file: tên của file json mà chúng ta muốn nhập dữ liệu từ nó.<br>

- Thay thế dữ liệu đã có bằng dữ liệu mới ở file cần nhập. Việc thay thế ở mông được diễn ra trên cơ sở đồng nhất ở trường \_id 

Trong collection users đã có dữ liệu.
```
{
   "_id" : ObjectId("360101f4ga893943d393e829"),
   "name" : "Nguyen The Vinh",
   "phone" : "0345678989",
   "email" : "vinhtdtdtd@gmail.com",
   "address: "Ca Mau"
}
```
Với --mode upsert dữ liệu mới ở collection users trong file update.json có \_id trùng với dữ liệu có sẵn trong DB thì sẽ được thay thế bằng dữ liệu mới. Nếu \_id chưa tồn tại trong dữ liệu có sẵn thì sẽ được update như bình thường.
```
{
   "_id" : ObjectId("360101f4ga893943d393e829"),
   "name" : "Nguyen The Vinh A",
   "phone" : "0000000000",
   "email" : "vinhtdtdtd@gmail.com",
   "address: "TPHCM",
   "likes" : [ "running", "pandas", "music" ]
}
```
Input : ```mongoimport -c=users -d=testlocal --mode=upsert --file=update.json```<br>

Output: Sau khi chạy lệnh ta vào collection users để xem dữ liệu thì ở thông tin \_id = "360101f4ga893943d393e829" đã được update.
```
{
   "_id" : ObjectId("360101f4ga893943d393e829"),
   "name" : "Nguyen The Vinh A",
   "phone" : "0000000000",
   "email" : "vinhtdtdtd@gmail.com",
   "address: "TPHCM",
   "likes" : [ "running", "pandas", "music" ]
}
```
- Merge dữ liệu đã có sẵn trong DB và dữ liệu mới trong file update.json

Với --mode merge hợp nhất giữa dữ liệu có sẵn trong 1 collection với dữ liệu mới trong file update.json được thực hiện trên cơ sở đồng nhất trường \_id và nếu \_id chưa tồn tại sẵn trong cơ sở dữ liệu thì sẽ insert bình thường. Với trường những trường khác trùng nhau nhưng khác giá trị thì sẽ được update giá trị trong file update.json

Trong collection users có sẵn dữ liệu 

```
{
   "_id" : ObjectId("360101f4ga893943d393e829"),
   "name" : "Nguyen The Vinh",
   "phone" : "0345678989",
   "email" : "vinhtdtdtd@gmail.com",
   "region" : "VietNam",
   "address: "Ca Mau"
}
```

Dữ liệu với ObjectId("360101f4ga893943d393e829") trong file update.json

```
{
   "_id" : ObjectId("360101f4ga893943d393e829"),
   "name" : "Nguyen The Vinh A",
   "phone" : "0000000000",
   "email" : "vinhtdtdtd@gmail.com",
   "likes" : [ "running", "pandas", "music" ]
}
```

Input: ```mongoimport -c=users -d=testlocal --mode=merge --file=update.json```

Output: Kiểm tra dữ liệu trong collection users:

```
{
   "_id" : ObjectId("360101f4ga893943d393e829"),
   "name" : "Nguyen The Vinh A",
   "phone" : "0000000000",
   "email" : "vinhtdtdtd@gmail.com",
   "region" : "VietNam",
   "address: "Ca Mau",
   "likes" : [ "running", "pandas", "music" ]
}
```

- Xóa dữ liệu đã có trong collection<br>
Với --mode delete sẽ xóa dữ liệu có \_id trùng với dữ liệu trong file update.json, nếu \_id nào không tồn tại trong file import thì sẽ được bỏ qua.
Tương tự như --mode upsert ta có câu lệnh input như sau: <br>

```mongoimport -c=users -d=testlocal --mode=delete --file=update.json```

- Import dữ liệu vào host (từ xa )

```mongoimport --host=testmongo.example.net --port=37017 --username=root --collection=users --db=testlocal --file=/opt/backups/mdb1-update.json```

Các thông số:<br>
--host: tên host của bạn cần kết nối<br>
--port: thông số port bạn cần kết nối<br>
--username: tên host bạn cần kết nối <br>
--db: tên database cần import.<br>
--collection: tên collection cần import.<br>
--file: tên của file json mà chúng ta muốn nhập dữ liệu từ nó.<br>

### Import cơ sở dữ liệu từ file CSV 
- Import từ file CSV xác định tên các collection bằng cách sử dụng tên ở dòng đầu tiên (headerline) trong file CSV

Cú pháp thực hiện 

```mongoimport --db=testlocal --collection=users --type=csv --headerline --file=/PC/Admin/backups/update.csv```

## Import cơ sở dữ liệu và các lựa chọn
Trong trường hợp tổng quát bạn có các tùy chọn (option) để import liệt kê trong bảng dưới đây:

| Option | Meaning| 
|---|---|
|--help	| produce help message| 
| -v [ --verbose ]	| be more verbose (include multiple times for more verbosity e.g. -vvvvv)|  
| -h [ --host ] arg | mongo host to connect to ("left,right" for pairs)|  
| --port arg | server port. (Can also use --host hostname:port)| 
| --ipv | enable IPv6 support (disabled by default) | 
| -d [ --db ] arg | database to use| 
| -c [ --collection ] arg | collection to use (some commands) | 	 
| -u [ --username ] arg| username	 |  
| -p [ --password ] arg | 	password | 
| --dbpath arg	 | directly access mongod data files in the given path,instead of connecting to a mongod instance - needs to lock the data directory, so cannot be used if a mongod is currently accessing the same path | 
| --directoryperdb | 	if dbpath specified, each db is in a separate directory	 | 
| -f [ --fields ] arg	 | comma seperated list of field names e.g. -f name,age | 
| --fieldFile arg	 | file with fields names - 1 per line	| 
| --ignoreBlanks	 | if given, empty fields in csv and tsv will be ignored |  
| --type arg	 | type of file to import.  default: json (json,csv,tsv) | 
| --file arg	 | file to import from; if not specified stdin is used	| 
| --drop	 | drop collection first| 
| --headerline	 | CSV,TSV only - use first line as headers	| 
| --upsert	 | insert or update objects that already exist | 
| --upsertFields arg | comma-separated fields for the query part of the upsert. You should make sure this is indexed.	  | 
| --stopOnError	 | stop importing at the first error rather  than continuing| 	 
| --jsonArray  | load a json array, not one item per line. Currently limited to 4MB.| 

<br><br>Trên đây là những gì mình tìm hiểu được về lệnh mongoimport trong mongoDB<br>
Nếu có gì sai sót mình mong nhận được sự đóng góp từ mọi người.<br>
Xin chân thành cám ơn !

Tài liệu tham khảo :
- https://docs.mongodb.com/database-tools/mongoimport/#bin.mongoimport
- https://o7planning.org/vi/10279/import-va-export-co-so-du-lieu-mongodb#a69830