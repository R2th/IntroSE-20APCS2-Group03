# **1.Lời nói đầu**
Elasticsearch là công cụ tìm kiếm và lưu trữ toàn văn bản, có khả năng mở rộng cao. Nó cho phép chúng ta lưu trữ, tìm kiếm và phân tích với dữ liệu rất lớn. Elastic thường được sử dụng như một công cụ hỗ trợ cho những app có chức năng search hoặc yêu cầu phức tạp. Nhưng đi kèm với nó thì việc biết cách sao lưu (backup or snapshot), phục hồi (restore), đánh lại chỉ mục (re-index) cũng hết sức cần thiết đối với anh em dân code chúng ta. Hôm nay mình sẽ giới thiệu đến các bạn 1 công cụ để xử  lý các tác vụ trên.
# **2.Cài đặt**
```
npm install elasticdump

```

Nếu sau khi cài đặt hiển thị như sau thì việc cài đặt đã thành công.

```
+ elasticdump@4.1.1
added 84 packages from 136 contributors and audited 110 packages in 41.59s
found 0 vulnerabilities

```
# **3.Tạo index**

1. Tạo index

    `curl -X PUT "localhost:9200/twitter" -H 'Content-Type: application/json' -d'
{}
'`
2. Tạo Mappings

    `curl -X PUT "localhost:9200/twitter/_mapping/_doc" -H 'Content-Type: application/json' -d'
{
  "properties": {
    "name": {
      "type": "keyword"
    }
  }
}
'`
3. Tạo data

    `curl -X PUT "localhost:9200/twitter/_doc/1" -H 'Content-Type: application/json' -d'
{
    "name" : "Jame"
}
'`
# **4.Sao lưu và phục hồi**
1. Bước 1

    `cd ~/node_modules/elasticdump`
    
2. Bước 2

    Chạy câu lệnh sau để export ra file json dữ liệu từ 1 index (twitter)    .  
    ```
    $ ./bin/elasticdump --input=http://127.0.0.1:9200/twitter --output=
    ```

    ![](https://images.viblo.asia/100bdbb9-837a-49af-a45c-3b6882168f2c.png)

3. Bước 3
 
     Xóa index đã backup dữ liệu
     
     `curl -X DELETE "localhost:9200/twitter"`
 
 4. Bước 4
 
     Tạo lại index và mappings như phần hướng dẫn ở trên.
     
  5. Bước 5
  
      Phục hồi dữ liệu đã sao lưu
      
      `./bin/elasticdump --input=~ Dowloads/twitter_bk.json --output=http://127.0.0.1:9200/twitter`
      
      ![](https://images.viblo.asia/e67b0dfd-0e1c-458d-a4a6-5abd042ac625.png)