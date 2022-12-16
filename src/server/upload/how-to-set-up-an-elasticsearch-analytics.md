Khi hệ thống của bạn chạy với một lượng dữ liệu lớn thì việc tích hợp các hệ thống giám sát vào các services mà bạn sử dụng là rất cần thiết. Giúp bạn tracking những thay đổi của từng request hay biết được những lúc nào CPU, RAM của các servers đang ở mức emergency(>80%). Có một vài service mà mình biết trong việc monitoring ví dụ như:
    - Datadog : hệ thống thu thập log tập trung, hệ thống lại log của app, log server, log ES, ...
    - NewRelic: cũng giống với Datadog, nhưng mỗi cái sẽ có ưu nhược điểm riêng. Newrelic monitoring về mảng Infrastructure rất chi tiết và chính xác, nhưng cách tính cost của nó khiến mình mệt :v. Và theo nhiều ý kiến thì việc sử dụng Newrelic cũng đắt đỏ hơn là Datadog
    - Zabbix, Monit, ...
   
Bên trên chỉ là giới thiệu thôi chứ trong bài này mình muốn tìm hiểu về monitor ES(Elasticsearch) bằng một service khác :)).
Trước hết để có thể tạo dựng một hệ thống giám sát cũng như phân tích ES thì phải biết ES nó là cái gì cái đã :3.

## 1. What is Elasticsearch
Elasticsearch là một công cụ phân tích và tìm kiếm. Nói ngắn gọn, nó lưu dữ liệu với `timestamps` và theo dõi indexes cũng như các từ khóa quan trọng để giúp việc tìm kiếm thông qua dữ liệu đó trở nên dễ dàng hơn. 

ES thực chất là 1 web server riêng biệt và đồng thời giao tiếp qua RESTful, nên nó không phụ thuộc vào client viết bằng gì hay hệ thống của bạn được viết bằng ngôn ngữ nào. Nên việc tích hợp vào hệ thống của bạn rất dễ dàng.

ES thậm chí cũng  có trở thành DB những sẽ chẳng ai làm thế cả vì cái gì cũng có nhiệm vụ riêng của nó, rõ ràng ES mang đến cho ta phương thức flexible hơn :v

OK vậy giờ tìm hiểu đến Kibana - một công cụ hỗ trợ monitor ES rất hiệu quả. 
- Ơ nhưng mà bên trên có nói Datadog cũng có thể monitor ES bằng việc tracking log của ES rồi mà, sao còn phải tìm đến một service khác làm gì?
- Thì xem thằng Kibana nó có những ưu điểm gì đã nhé :))
![](https://images.viblo.asia/c09f4abc-9738-4ab7-ab84-375f89e4b78b.jpeg)

Kibana là một bảng điều khiển trực quan cho ES và cũng hoạt động như một web-based GUI chung cho việc quản lý phiên bản ES bạn đang sử dụng. Nó đụng sử dụng để tạo dashboards và các biểu đồ, đồ thì từ dữ liệu thu thập được, nõ sẽ giúp bạn hiểu được thông tin của hàng triệu logs trong một biểu đồ.

Bắt đầu set up để dễ hiểu hơn nhé!
## 2. Install Elasticsearch
Thực hiện các bước sau để bắt đầu cài đặt ES nào

Một vài requires trước khi cài đặt:
```
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
sudo apt-get install apt-transport-https
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-7.x.list
```

install ES:
```
sudo apt-get update && sudo apt-get install elasticsearch
```

Bạn cũng có thể kiểm tra version ES hiện tại bằng cách curl đến port 9200:
```
curl http://localhost:9200
```

Nếu bạn không thể sử dụng command này thì hãy thử restart lại ES nhé có lẽ mới cài nên hơi bị quắng tí :))
```
 sudo service elasticsearch restart
```

Mặc định thì Elasticsearch sẽ chạy trên port 9200 và public :). Trừ khi bạn set up user authentication and authorization, nếu không thì bạn nên đóng cổng này trên server của bạn hoặc sử dụng cổng khác.

Dù gì thì bạn cũng sẽ muốn chắc chắn rằng nó không được mở public ở bên ngoài internet. Điều này thực sự là một vấn đề đối với ES và những người dùng nó, bởi vì nó chẳng có chút tính năng bảo mật nào cả, và nếu port 9200 or bảng điều khiển Kibana được mở public bên ngoài internet, thì bất cứ ai cũng có thể đọc logs của bạn - khá toang nhỉ. Và cũng đã có một vụ việc liên quan đến ông lớn Microsoft, một lỗi lớn trên [Bing's Elasticsearch server](https://www.zdnet.com/article/microsoft-secures-backend-server-that-leaked-bing-data/), lộ 6.5 TB kết quả search bằng công cụ này.

Và cách đơn giản nhất để bảo mật ES đó là giữ cho cái port 9200 đó `closed` và set up basic authentication cho bảng điều khiển của Kibana bằng cách sử dụng `NGINX proxy`. Hay nếu bạn cần quản lý nhiều users, bạn sẽ muốn tìm hiểu thêm 
[User Authentication](https://www.elastic.co/guide/en/elasticsearch/reference/current/setting-up-authentication.html) and [User Authorization](https://www.elastic.co/guide/en/elasticsearch/reference/current/authorization.html). :)

## 3. Set up and securing Kibana
Install Kibana:
```
sudo apt-get update && sudo apt-get install kibana
```

enable Ki:
```
sudo /bin/systemctl daemon-reload
sudo /bin/systemctl enable kibana.service
```

Kibana mặc định chạy trên port 5601(lạ nhỉ :v), nếu không thích port này thì bạn có thể edit trong file `/etc/kibana/kibana.yml`

Bạn rất nên closed cái port này lại nhé, vì nó không có authent nào đâu. Cơ mà có một cách hay hơn đó là list địa chỉ IP mà bạn muốn access đến port này, ví dụ cái IP của máy bạn đó:
```
sudo ufw allow from x.x.x.x to any port 5601
```

Bạn có cũng có thể chắc chắn thêm bước basci authentication bằng NGNIX nữa [Basic Authentication](https://www.cloudsavvyit.com/1355/how-to-setup-basic-http-authentication-on-nginx/). Như vậy những IP ngoài range IP mà bạn đã setup trong whitelist sẽ bắt buộc phải nhập password.

Nếu bạn chưa cài NGINX hãy tham khảo ở đây https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04. Sau đó bạn sẽ cần cài thêm apache2-utils, nó sẽ giúp bạn tạo một password.
```
sudo apt-get install apache2-utils
sudo htpasswd -c /etc/nginx/.htpasswd admin
```

Sau đó thì config

```
sudo touch /etc/nginx/sites-enalbed/kibana
###
upstream elasticsearch {
    server 127.0.0.1:9200;
    keepalive 15;
  }

  upstream kibana {
    server 127.0.0.1:5601;
    keepalive 15;
  }

  server {
    listen 9201;
    server_name elastic.example.com;

    location / {
      auth_basic "Restricted Access";
      auth_basic_user_file /etc/nginx/.htpasswd;


      proxy_pass http://elasticsearch;
      proxy_redirect off;
      proxy_buffering off;

      proxy_http_version 1.1;
      proxy_set_header Connection "Keep-Alive";
      proxy_set_header Proxy-Connection "Keep-Alive";
    }

  }

  server {
    listen 6969;
    server_name elastic.example.com;

    location / {
      auth_basic "Restricted Access";
      auth_basic_user_file /etc/nginx/.htpasswd;

      proxy_pass http://kibana;
      proxy_redirect off;
      proxy_buffering off;

      proxy_http_version 1.1;
      proxy_set_header Connection "Keep-Alive";
      proxy_set_header Proxy-Connection "Keep-Alive";
    }
  }
```

Giờ đây Kibana sẽ listen port 6969 or bất kì port nào bạn set up và restart NGINX
```
sudo service nginx restart
```

Và thành quả sẽ là màn hình dashboard của Kibana
![](https://images.viblo.asia/eef85ade-03b1-459e-ae8b-0836f17ebad9.jpeg)

Trong bài viết này mình chỉ tạm giới thiệu, setup, authen với Kibana. Bài tiếp tới mình sẽ tìm hiểu về cách sử dụng cũng như phân tích kĩ hơn về Kibana, cùng đón đọc nhé!

## Source
https://www.youtube.com/watch?v=gQ1c1uILyKI&ab_channel=edureka%21
https://www.elastic.co/guide/en/elasticsearch/reference/current/authorization.html