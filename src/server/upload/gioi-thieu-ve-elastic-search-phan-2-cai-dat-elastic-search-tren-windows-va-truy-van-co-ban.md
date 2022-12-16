## 1. Lời Mở Đầu

chào các bạn, lại là mình đây, ở phần trước mình đã giới thiệu sơ qua về đặc điểm của elastic search cũng như cách cài đặt nó trên ubuntu, nếu các bạn chưa xem thì có thể nhấn link sau: [Phần 1](https://viblo.asia/p/1VgZvVNmZAw). Ở phần này, mình sẽ hướng dẫn cài đặt elastic trên windows cũng như thực hiện 1 vài truy vấn cơ bản   

## 2. Cài Đặt Elastic Search Trên Windows

### A. thông tin phiên bản
- Windows 10 Pro x64
- Elastic Search 7.12.1 
- Kibana 7.12.1

### B. Cài Java

cài java

các bạn có thể cài jdk 8 theo link sau: [JDK](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)

set up java home

vào mục enviroments variable->trong phần system variables thêm vào như sau
![](https://images.viblo.asia/21241ff1-8cca-47eb-97b3-cf7406e256bd.png)

tìm vào biến PATH thêm đường dẫn /bin
![](https://images.viblo.asia/72cf9b97-0d68-4173-be9f-90bb83407811.png)

các bạn có thể test xem cài được chưa bằng lệnh `java –-version`

### C. Cài ElasticSearch

vào thư mục elasticsearch->bin->elasticsearch.bat và  chờ khoảng 30 giây, nếu không có vấn đề gì thì khi bạn gõ lệnh `curl localhost:9200` nó sẽ hiện ra như sau

![](https://images.viblo.asia/394f336a-b492-47fd-af6b-22d9ed8a2be9.png)

### D. Cài Kibana

tương tự với elasticsearch các bạn vào thư mục kibana phần bin/kibana.bat để mở 
tuy nhiên mình đã thử và không thấy hiện, mình đã thử tắt kibana đồng thời sửa phần config giống như mình đã làm với linux ở phần 1, sau đó mình mở lại kibana.bat và sau khoảng gần 1 phút cuối cùng nó cũng đã chạy, nói chung các bạn chờ 5 phút mà không thấy nó hiện thì thử tắt firewall ( không lên nữa thì tải elastic và kibana 6 thôi, nhiều thằng có mấy cái bug khó chịu lắm :rofl:)

![](https://images.viblo.asia/d160bc19-6ef8-4247-b6da-a49b1efb9424.png)

mình có thử tra qua vấn đề này trên mạng thì có vẻ đây là bug hay firewall gì đấy nói chung trước khi chạy các bạn thử tắt firewall thử, link bugs: https://discuss.elastic.co/t/kibana-bat-shows-nothing-on-windows-10/163611, không có kibana thì ban đầu dùng postman cũng ổn mà

## 3. Cách Sử dụng API

lưu ý: nếu các bạn không thể khởi động kibana do port đã bị process khác chiếm dụng thì các bạn có thể đổi port trong thư mục config hoặc làm theo cách sau:
```
sudo netstat -lpn |grep :8080
```
tìm processId của nó và gắn vào câu lệnh sau
```
kill -p <processID>
```
ở đây mình sẽ không nói lại về định nghĩa API cũng như các phương thức của nó , các bạn có thể tham khảo thông qua link dưới đây:  [API](https://topdev.vn/blog/api-la-gi/)

### A. Linux

cách 1. Truy cập trực tiếp thông qua Elastic 
ở trên linux ta có thể dễ dàng sử dụng elastic thông qua câu lệnh `curl` : curl -X PHƯƠNG_THỨC http://localhost:9200
VD:
```
curl -X GET http://localhost:9200 
```
truy cập elasticsearch thông qua phương thức GET

tiếp theo ta sẽ gởi thông tin với dữ liệu JSON  khi cần gửi dữ liệu JSON đi kèm, cần chỉ định HEADER `Content-Type: application/json` để làm điều này cho vào tham số curl đoạn mã -H `Content-Type: application/json`, sau đó là nội dung JSON-d `{Nội dung JSON}`
ví dụ : để tạo mới 1 dữ liệu bằng phương thức PUT
```
curl -X PUT "localhost:9200/customer/_doc/1?pretty" -H 'Content-Type: appliation/json' -d' { "name": "John Doe", "age": "20" } 
```

cách 2. Tương tác với Elastic Thông qua Kibana

mở kibana thông qua port - 5601 : “localhost:5601“ hoặc “your-linux-machine-ip:5601“ nếu bạn dùng vmware

![Mở nó trong đây](https://images.viblo.asia/f6b1b59e-2545-403d-8a89-1ecfe3ff0a6b.png)

để chạy các dòng lệnh các bạn cần bôi đen chúng rồi nhấn vào biểu tượng play ở bên phải

![](https://images.viblo.asia/8bd56905-f51a-41b3-a561-6b1e558def44.png)

### B. Windows

đối với window ngoài việc sử dụng kibana, thì với bản chất là truy vấn API các bạn còn có thể sử dụng Postman 
![](https://images.viblo.asia/dcd42367-2925-4c1f-a684-2d5d967fea49.png)

## 4. Truy vấn cơ bản trong ElasticSearch

### A. Kiểm tra tình trạng của ElasticSearch

các bạn có thể thử sử dụng API bằng cách gọi API kiểm tra tình trạng của elastic: ```localhost:9200/_cat/health?v```

LINUX
![](https://images.viblo.asia/8715ae1e-38c0-4f30-81a7-19f3144a571c.png)

WINDOWS với postman
![](https://images.viblo.asia/5d266378-262f-4794-a442-deac9b7f93c7.PNG)

để ý cột status có 3 trạng thái chính
•	Green Mọi thứ OK, cluster có thể thực hiện đầy đủ chức năng
•	Yellow Dữ liệu ổn, nhưng có các bản backup replicas
•	Red dữ liệu có vấn đề

### B. xây dựng data bằng phương thức POST và PUT

ở đây mình sẽ sử dụng dev tools của kibana cho nhanh:hugs:

để thêm dữ liệu cho ElasticSearch đầu tiên ta tạo 1 index
```
PUT school
```
nếu tạo thành công nó sẽ trả về như sau:
```
{"acknowledged": true}
```
thêm vào index school 1 _doc có _id = 10
```
POST school/_doc/10
{
   "name":"Saint Paul School", "description":"ICSE Afiliation",
   "street":"Dawarka", "city":"Delhi", "state":"Delhi", "zip":"110075",
   "location":[28.5733056, 77.0122136], "fees":5000,
   "tags":["Good Faculty", "Great Sports"], "rating":"4.5"
}
```
![](https://images.viblo.asia/2125c21a-4c6f-42b3-8eb6-f9cb290a9dac.png)

như các bạn có thể thấy dữ liệu được thêm vào sẽ nằm trong phần source	


### C. Các phương thức hỗ trợ xóa và sửa

phương thức xóa

bạn có thể xóa 1 index thông qua phương thức DELETE

ở đây mình xóa 1 _doc có _id = 10
```
DELETE school/_doc/10  

nếu thành công bạn sẽ nhận được response sau:
{
   "found":true, "_index":"schools", "_type":"school", "_id":"10", "_version":2,
   "_shards":{"total":2, "successful":1, "failed":0
}
```
![](https://images.viblo.asia/1bc0cc56-dc7b-4b3c-8631-d9c3142c3f69.png)

phương thức sửa
tham khảo thêm: https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html
sửa _doc trong index school có _id = 10

- sửa 1 dòng 
ở đây mình muốn sửa dữ liệu bên trên sname thành “Viablo School”

```
POST school/_update/10
{
   "script" : {
	
      "source": "ctx._source.name = params.sname",  gán source name = sname bên trong params
      "lang": "painless",
      "params" : {
         "sname" : "Viablo School"
      }
   }
 }
```
![](https://images.viblo.asia/e3266a14-b368-4e1d-9a37-aaa4dc391191.png)

- sửa bên trong mảng
ở đây mình muốn sửa bên trong mảng tags bên trên thêm “cool”
```
POST school/_update/10
{
   "script" : {
	
      "source": " ctx._source.tags.add(params.tag)",
      "lang": "painless",
      "params" : {
         "tag" :”Cool"
      }
   }
 }
```
![](https://images.viblo.asia/3092bd6a-812d-4142-b22c-7b9114e9ee0a.png)

### D. Phương thức tìm kiếm cơ bản

#### 1. Tìm Kiếm Cơ Bản

- xem document thông qua 1 vài dòng
```
    GET schools/_doc/10?_source_includes=name,fees 
```
![](https://images.viblo.asia/df19c5b1-0a89-4fe8-8338-b5ae588bf43d.png)

- Chỉ xem thông tin của phần `_source`

như các bạn đã thấy ngoài phần source là thông tin chính mà chúng ta đã thêm vào còn rất nhiều thông tin không cần thiết, để dễ trong công việc sau này, ta phải loại bỏ chúng
```
GET schools/_doc/10?_source
``` 
![](https://images.viblo.asia/d088d3b4-a975-453a-bb5d-edbf2c7bffbf.png)

- Lấy thông  tin trên nhiều index
```
GET /index1,index2,index3/_search
```
<hình>

#### 2. Tham Số Tìm Kiếm
lưu ý : những thông tin được trả ra khi sử dụng `_search` sẽ được lưu trong trong  thuộc tính “hits” dưới dạng mảng , các bạn cần chú ý khi sử dụng sau này

- tham số “q”:
tìm kiếm thông tin trong 1 trường 
```
POST school/_search/?q=city:Delhi
```
![](https://images.viblo.asia/36b46641-504f-4904-be48-857c4910816c.png)

- tham số "fields":
Lấy thông tin từ trường được chỉ định sẵn
```
POST school/_search
{
  "fields": ["city"],
  "_source": false
}
```
![](https://images.viblo.asia/56f77f1c-d146-4cfb-939f-a1401ab002a6.png)

- Tham Số "from":
```
POST school/_search/?from=0
```
đây là điểm bắt đầu trong index
![](https://images.viblo.asia/b6947a2e-5047-4641-bfe5-88efb0210f43.png)

giả sử trong index của bạn chỉ có 1 docs nhưng bạn lại để giá trị from là 1 thì sẽ giá trị trả về là rỗng
![](https://images.viblo.asia/bb88c915-cb76-49b5-a93b-eff1a784bc1f.png)

- tham số "sort":
tham số này sẽ sort các cột theo giảm dần (desc) hoặc tăng dần (asc)
```
POST school/_search/?sort=fees:asc
```
![](https://images.viblo.asia/6d41dadc-f75b-465f-b97e-777efef5c9e6.png)

- tham số "size":
số lượng docs sẽ được trả về, mặc định là 10
```
POST school/_search/?size=20
```

![](https://images.viblo.asia/adf8fcd0-b4bd-49c0-8894-90aca6e36104.png)

## 4. Tổng Kết

Hello, cuối cùng đã kết thúc xong phần 2 của Series ElasticSearch, mình cũng vừa viết vừa học nên cũng không có nhiều kinh nghiệm lắm :stuck_out_tongue_winking_eye:, ở phần sau mình dự định sẽ làm về các truy vấn nâng cao cũng như mình sẽ đào sâu 1 chút vào kibana, mình cũng dự định sẽ tìm cách kết hợp ElasticSearch với một database nào đó (ai cũng bảo nói là search engine bên cạnh database chính mà , như các bạn đã thấy ở trên nó thực hiện các lệnh thêm, sửa, xóa hơi dỏm tí :grin:) thế nên mong các bạn đón xem

như thường lệ, nếu có vấn đề nào thắc mắc mong các bạn có thể comment để mình có thể support hết sức

LAST-EDIT: HÓNG MAY ~ FEST

## 5. Tham Khảo
 
 - Các lệnh trong elastic - https://www.tutorialspoint.com/elasticsearch/index.htm
 - Elastic cơ bản - https://xuanthulab.net/tao-va-cap-nhat-index-document-trong-elasticsearch.html
 - Elastic docs apis (hướng dẫn cực kì cụ thể) - https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html