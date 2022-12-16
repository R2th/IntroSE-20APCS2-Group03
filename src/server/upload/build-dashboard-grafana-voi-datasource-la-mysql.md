# Mở đầu
Yaaa chào mọi người, hôm nay mình sẽ viết bài tiếp về Grafana,ở phần trước [Monitoring System với Grafana Prometheus Cadvisor Node Exporter](https://viblo.asia/p/monitoring-system-voi-grafana-prometheus-cadvisor-node-exporter-maGK7v6b5j2) mình có chia sẻ về việc build các công cụ lại phục vụ cho việc monitor hệ thống với grafana dashboard. Với bài trước sử dụng prometheus thì bài này mình sẽ dùng datasoure là MySQL.

![image.png](https://images.viblo.asia/e30f6d26-d4be-4939-a110-73328742aba9.png)

# Dựng môi trường
 Chắc tới bài này mình cũng không cần giới thiệu gì nhiều nữa, bạn nào chưa rõ có thể quay về bài trên mình có note lại. Về các công cụ mình sử dụng trong demo này thì mình sẽ có các container sau 
 
 - Grafana: Chắc chắn rồi :D
 - MySQL
 - Phpmyadmin ( để mình tương tác với MySQL cho tiện :v )

Chúng ta tiến hành build docker nhé, bạn nào dùng docker command cũng được còn mình quen dùng docker-compose rồi nên mình sẽ dựng 1 file docker-compose.yml

```yaml
version: "3.4"
services:
  grafana:
    image: grafana/grafana
    container_name: grafana-container
    ports:
    - "4000:3000"
    volumes:
    - grafana-db:/var/lib/grafana
    restart: always
    user: "472"

  mysql:
    image: mysql:5.7
    container_name: grafana-mysql
    volumes:
      - mysql-db:/var/lib/mysql
    environment:
      - MYSQL_DATABASE=grafana-mysql
      - MYSQL_USER=grafana
      - MYSQL_PASSWORD=grafana
      - MYSQL_ROOT_PASSWORD=root
    ports:
      - "3306:3306"

  phpmyadmin:
    container_name: grafana-phpmyadmin
    image: phpmyadmin/phpmyadmin
    environment:
      - PMA_ARBITRARY=1
      - MYSQL_USER=grafana
      - MYSQL_PASSWORD=grafana
      - MYSQL_ROOT_PASSWORD=root
    ports:
        - "8083:80"
    links:
        - "mysql:mysql"

volumes:
  grafana-db:
  mysql-db:

```

- Ok rồi nhỉ chỉ cần <b>docker-compose up -d</b> xong các bạn vào localhost:4000 tiến hành setup user cho grafana là được
- Sau khi setup user grafana xong, chúng ta tiến hành generate data ở đây mình có 1 struct data như sau 

```sql
CREATE TABLE student (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(40) NULL,
    last_name VARCHAR(40) NULL,
    age INT NOT NULL,
    created TIMESTAMP
);
```

Khá dễ hiểu đúng không, về việc dummy dữ liệu các bạn có thể lên trang sau để dummy https://www.generatedata.com/ Ở đây mình đã dummy ra khoảng 100 bản ghi ( Phần age có vẻ mình để beetween từ 1 - 100 hơi sai sai haha :D )

![image.png](https://images.viblo.asia/b2d577f2-fe6e-4450-80c1-4343a1007d1b.png)

# Tạo datasource

- Ok phần dựng môi trường đã xong chúng ta bắt đầu các phần make dashboard nhé
- Đầu tiên các bạn cho cho mình "Add your first data source"

![image.png](https://images.viblo.asia/1fa084b7-26f1-4dce-836f-3cfe73c0efcf.png)

- Chọn tiếp vào MySQL

![image.png](https://images.viblo.asia/8995293b-9803-4558-98bf-db00798f6280.png)

- Các bạn nhập các thông số kết nối vào MySQL, ở phần Host do container mysql mình đang đặt tên là mysql nhé :D và container đó sẽ chạy port 3306 lưu ý là port inside nha

```yaml
mysql: # << Host Name
    image: mysql:5.7
    container_name: grafana-mysql
    volumes:
```

![image.png](https://images.viblo.asia/83681bf9-1765-4f94-aec1-6a690af09c99.png)

- OK Tiếp các bạn bấm "Save & test" hiện thông báo như này là được

![image.png](https://images.viblo.asia/3242ccbf-96c5-482a-bce1-068c9718e53b.png)

# Tạo Dashboard
- Sau khi kết nối datasource xong các bạn quay trở lại home và chọn "Create your first dashboard"

![image.png](https://images.viblo.asia/8ffd4ccf-3b62-43f1-9631-0f45f10996d3.png)

- Mình sẽ chọn "Add an empty panel" , thì với panel này của mình mình muốn show ra tuổi trung bình của students

![image.png](https://images.viblo.asia/e9a476d4-7376-4a95-818c-e07d097465b5.png)

- Sau khi chọn add empty panel thì bạn sẽ vào màn hình edit panel, tại đây bạn có thể thấy nó có sẵn 1 cái query, giờ chúng ta chọn "Edit SQL" ( Phần format as chọn giúp mình là "table" nhé :v ) . Lúc này bạn sẽ thấy trên panel chart của mình báo đỏ nhưng không sao mình sẽ format lại sau

![image.png](https://images.viblo.asia/9498a704-b154-4e51-951e-4524745c0175.png)

- Ok bạn tích vào chỗ "Time series" ở góc trên bên phải, chỗ này chúng ta sẽ chọn kiểu chart, ở đây mình chọn là "gauge"

![image.png](https://images.viblo.asia/09108abf-209a-4005-8935-7ddff39e158d.png)

![image.png](https://images.viblo.asia/572b69c0-8ff8-44db-8df0-367c8a2988e6.png)

- Ô Lúc này thì có số hiển thị rồi nè, nhưng từ từ đã nhé, bạn nhìn ở cột bên phải, sẽ thấy mục Value options nó đang tính toán dựa trên bản ghi cuối cùng, giờ mình muốn show trung bình thì các bạn chọn vào đó và chọn "Mean: Average value" giúp mình nhé :v

![image.png](https://images.viblo.asia/c4237484-4db6-4489-8689-325cb641d727.png) 

- Và đây là kết quả sau khi chọn Avg

![image.png](https://images.viblo.asia/f06b0254-d788-4ab1-b5d5-6887315b1d25.png)

- Ok mình đã hướng dẫn các bạn tạo kết nối và làm quen về panel, còn giờ tạo dashboard như thế nào, chúng ta muốn xem thông tin gì, hiển thị gì, chart như thế nào v....v đó là tùy tính sáng tạo của các bạn XD 

![image.png](https://images.viblo.asia/af468ecc-9ff4-4885-9812-cce151b26872.png)

- Ngoài ra các bạn có thể lên https://grafana.com/grafana/dashboards để kiếm cho mình 1 template dashboard ( nhớ chọn tag MySQL nha :v ) và tiến hành import.