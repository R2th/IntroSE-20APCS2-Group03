Kibana là một công cụ hữu ích cung cấp cho ta một giao diện giúp cho ta có thể thử nghiệm và kiểm tra hoạt động của elastcisearch một cách cụ thể mà không cần tới console.Bở vì việc dùng console đôi khi bất tiện và tốn thời gian nên Kibana là một lựa chọn tốt cho bạn khi sử dụng elasticsearch.

### Cài đặt
Kibana cần được config để chạy với Elasticsearch node với cùng 1 phiên bản.Khi bạn cài đặt version Kibana không phù hợp với bản Elasticsearch trên máy của bạn thì Kibana sẽ có thông báo cụ thể cho bạn về  trường hợp lỗi trên giao diện của nó trên cổng mặc định: `http://localhost:5601`
Tìm hiểu thêm [tại đây](https://www.elastic.co/guide/en/kibana/5.5/setup.html)

Chúng ta có một vài cách cài đặt mà elastic docs cung cấp [ở đây](https://www.elastic.co/guide/en/kibana/5.5/install.html)

Sau đây, mình giới thiệu chi tiết hơn về cách sử dụng file `.tar.gz` bản `5.5.3`
Get Kibana về:
```
wget https://artifacts.elastic.co/downloads/kibana/kibana-5.5.3-linux-x86_64.tar.gz
```

So sánh SHA được tạo ra bởi sha1sum hoặc shasum với [SHA đã publish](https://artifacts.elastic.co/downloads/kibana/kibana-5.5.3-linux-x86_64.tar.gz.sha1).
Tiếp theo
```
tar -xzf kibana-5.5.3-linux-x86_64.tar.gz
```
```
cd kibana/
```
Thư mục ta vừa truy cập sẽ được biết tới như `$KIBANA_HOME`.

Kibana có thể khởi động từ command line như sau:
```
./bin/kibana
```

Kibana sẽ được config từ file `$KIBANA_HOME/config/kibana.yml`, chúng ta có thể thay đổi cài đặt mặc định của nó bằng cách chỉnh sửa file ấy, hãy tham khảo cách config tại [link sau](https://www.elastic.co/guide/en/kibana/5.5/settings.html)
Trong đó có 1 số config đáng quan tâm (bạn có thể cần thay đổi) như:
- `server.port:` mặc định sẽ là port `5601`
- `server.host`: mặc định là `localhost`
- `elasticsearch.url` : mặc định là `http://localhost:9200`
- `elasticsearch.username` và `elasticsearch.password` nếu như có setting basic authentication cho Elasticsearch.

### Sử dụng giao diện console của Kibana
Đã cài đặt, sau đây chúng ta có thể bắt đầu sử dụng Kibana (quan trọng nhất chính là Dev tool), giao diện của nó trông như sau:

![](https://images.viblo.asia/2aa9bc50-b949-4755-b70c-1d240b0b811d.png)

Như ảnh trên, ta có thể thấy Kibana có thể lưu giữ nhiều câu , dòng lệnh khác nhau, chứ không nhất thiết phải xóa đi khi ta cần thực hiện 1 dòng lênh mới, điều này rất tiện cho chúng ta để chỉ cần gõ 1 lần và dùng nhiều lần sau nếu cần.Bên cạnh đó, Kibana cũng có thể gợi ý cho ta các câu lệnh cụ thể như cú pháp query, hay url để thực hiện việc truy vấn chẳng hạn.

Với 1 đoạn lệnh như thế này:
```
GET /_search
{
  "query": {
    "match_all": {}
  }
}
```

nó sẽ tương đương với việc ta truy xuất bằng CURL như sau:

```
curl -XGET "http://localhost:9200/_search" -d'
{
  "query": {
    "match_all": {}
  }
}'
```

dòng lệnh càng nhiều thì ta lại càng tiết kiệm được thời gian và công sức so với việc sử dụng trực tiếp CURL.
![](https://images.viblo.asia/97c7ae33-142d-4ee6-88fa-65ebb85edb8f.png)

Phía trên là ảnh cho ta thấy việc support nhiều request của Kibana.
Kibana cũng có thể tự động format những gì ta nhập vào.

### Một vài lệnh gõ  ữu ích khi sử dụng Kibana.

- `Ctrl/Cmd + I` : tự động thụt lề ở request hiện tại.
- `Ctrl + Space` : tự động hoàn tất (ngay cả khi không nhập gì)
-  `Ctrl/Cmd + Enter` : submit request
-  `Ctrl/Cmd + Up/Down` : nhảy tới request phía trước/sau
- `Ctrl/Cmd + Alt + L` : thu gọn, mở rộng phạm vi hiện tại
-  `Ctrl/Cmd + Option + 0` : Thu gọn tất cả các phạm vi trừ phạm vi hiện tại.

Khi chế độ auto-complete được bật:
- `Down arrow` (mũi tên xuống): chuyển focus vào menu auto-complete, sử dụng các mũi tên để chọn thêm 1 số mục khác.
- `Enter/Tab`: Chọn mục được chọn hiện tại hoặc mục phổ biến nhất trong menu auto-complete.
- `Esc`: đóng menu auto-complete.

### Lịch sử
Console có thể lưu giữ được 500 request gần nhất, ta có thể lựa chọn tab history trên giao diện và xem lại các request trước đó:
![](https://images.viblo.asia/63566c54-adc3-4f7a-a0de-42e3d0c2e4ba.png)

![](https://images.viblo.asia/c47b7b8d-a53c-4b83-9ae1-a0279dc674e7.png)

### Cài đặt cho console

Chúng ta có thể setting rất nhiều thứ cho console tại tab Settings trong giao diện console:
![](https://images.viblo.asia/7f910510-52cb-4553-9a19-4d39e9959c8b.png)

### Plugin
Kibana có rất nhiều plugin hỗ trợ, bạn có thể xem chi tiết [tại đây](https://www.elastic.co/guide/en/kibana/5.5/known-plugins.html)

Chúng ta có thể sử dụng những dạng lệnh sau để cài đặt plugin:
```
bin/kibana-plugin install <package name or URL>
```
```
bin/kibana-plugin install x-pack
```

Qua 1 URL tùy ý:
```
bin/kibana-plugin install https://artifacts.elastic.co/downloads/packs/x-pack/x-pack-6.1.4.zip
```

Cài đặt plugin vào 1 thư mục tùy ý:
```
bin/kibana-plugin install file:///some/local/path/my-plugin.zip -d path/to/directory
```
Cài đặt plugin với Linux packages:
```
sudo -u kibana bin/kibana-plugin install x-pack
```

```
chown -R kibana:kibana /path/to/kibana/optimize
```

### Tham khảo
https://www.elastic.co/products/kibana