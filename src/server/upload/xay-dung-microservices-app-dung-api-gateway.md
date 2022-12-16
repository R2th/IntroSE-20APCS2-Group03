Trong mô hình microservices, client sẽ phải tương tác với rất nhiều services. Vậy làm sao mà client có thể biết được cần gọi endpoint nào để gọi ?
### API gateway là gì ?
![](https://cdn.wp.nginx.com/wp-content/uploads/2016/04/Richardson-microservices-part2-3_api-gateway.png)
API Gateway chịu trách nhiệm định tuyến các request, tổng hợp và chuyển đổi giao thức. Tất cả các request từ client sẽ đi qua API Gateway trước tiên. Sau đó nó định tuyến các request tới các microservice thích hợp. Nó giống như một tổng đài để điều phối các request đến từ trình duyệt (dạng HTTP REST request hay request đến URL một trang web). Nếu chúng ta không sử dụng API Gateway thì clients sẽ phải gử i request trực tiếp tới service cụ thể nào đó. Nó sẽ dẫn đến một số vấn đề rắc rối với client:
* Phần code phía client sẽ trở nên phức tạp vì phải tracking nhiều endpoint
* Sẽ tạo sự kết nối giữa client và backend. Client cần biết được các services đó đc phân chia như thế nào -> rất khó cho việc maitain của client và refactor service.
* Mỗi một service sẽ phải handle nhiều vấn đề liên quan như authentiaction, SSL hay client rate limiting
### Ưu và nhược điểm của API Gateway
**Ưu điểm** lớn nhất khi sử dụng API Gateway là nó che giấu đi cấu trúc bên trong của ứng dụng. Thay vì truy vấn đến các service cụ thể, client đơn giản sẽ chỉ cần call thông qua API Gateway (nó cung cấp API phù hợp với từng Client).

**Nhược điểm**: Nó sẽ trở thành nút thắt cổ chai khi phát triển hệ thống. Developer cần phải cập nhập API Gateway để cung cấp cho các endpoint của microservice. Quan trọng là phải làm cho quá trình cập nhật API Gateway càng nhẹ càng tốt.
### Gom API với API Gateway
Có nhiều lựa chọn để làm API Gateway chuyên dụng như: Kong API, Tik,... hay gần đây có [traefik](https://docs.traefik.io/). Nhiều quá chưa tìm hiểu được :cry: 

Nhưng mình sẽ sử dụng Nginx - một **Reverse proxy server** với load balancing, SSL,...
Đầu tiên tạo 2 services như sau: `mentor`, `mentee`. Về cơ bản thì services thứ nhất sẽ trả về  `mentee` và detail định nghĩa như sau:
```Javascript
const express = require('express');

const app = express();

app.get('/', (req,res) => {
  res.status(200).json({
    data: {
      id: '1',
      type: 'mentee',
      attributes: {
        name: 'NamDV',
      }
    }
  })
})

app.get('/namdv', (req,res) => {
  res.status(200).json({
    data: {
      id: '1',
      type: 'mentee',
      attributes: {
        name: 'NamDV',
        class: 'C13'
      }
    }
  })
})
app.listen(3000, () => {
  console.log('App is running at port 3000');
})
```
Và services còn lại sẽ trả về mentor định nghĩa như sau:
```Javascript
const express = require('express');

const app = express();

app.get('/', (req,res) => {
  res.status(200).json({
    data: {
      id: '1',
      type: 'mentor',
      attributes: {
        name: 'HaiDV',
      }
    }
  })
})

app.listen(3001, () => {
  console.log('App is running at port 3001');
})
```
Nhiệm vụ của chúng ta giờ phải deploy một API gateway để gom và điều phối request từ client. Chúng ta config nginx cơ bản như sau:
```Javascript
upstream app1_upstream {
  # app: docker-compose.yml/app
  server app1:3000;
}

upstream app2_upstream {
  # app: docker-compose.yml/app
  server app2:3001;
}

server {
    listen       80;
    server_name  uptodown.dev www.uptodown.dev;

    ...

    location /mentee {
      rewrite ^/mentee/(.*) /$1  break;
      proxy_pass http://app1_upstream/$1;
    }

    location /mentor {
      rewrite ^/mentor/(.*) /$1  break;
      proxy_pass http://app2_upstream/$1;
    }
}
```
`upstream` định nghĩa một pool của các server mà NGINX sẽ gửi các request tới và định nghĩa tên để tham chiếu sau này. Có thể hiểu là mỗi upstream là một load balancer.

Ở đây mọi người cần chú ý phần location. Nginx sẽ phân tích URI của request để tìm ra hướng xử lí của request dựa vào các block location. Với những request có URI là `/mentee` hoặc `/mentee/11` sẽ được sử lý trong location block đầu tiên và tương tự `/mentor` cũng vậy.
* `rewrite` option sẽ viết lại URI tới dựa trên một regular expression để  location block có thể xử lý nó. Ở đây ví dụ như request URI là `/mentee/namdv` sẽ được regex bắt lại và nginx rewrite thành `/namdv`
* `break` flag ở cuối có thể hiểu là nó sẽ dừng hẳn process sau khi thay đổi URI và URI đã write sẽ ko tới các location khác trong file config.
* `proxy_pass` sẽ gửi request tới một proxy server cụ thể. Ở đây là http://app1_upstream/namdv chẳng hạn (routes do service đầu tiên đã định nghĩa :smiley:).

Phần docker-compose thì mọi người xem chi tiết tại đây nhé [docker-compose.yml](https://github.com/kominam/microservices-app/blob/master/docker-compose.yml)

Ok giờ thì vào `/etc/hosts` để add host `uptodown.dev` vào. (add dòng này vào `127.0.0.1 uptodown.dev`)

Ngon. giờ thì đơn giản là `docker-compose up` và test thử với curl xem nào: `curl -i -H "Accept: application/json" "http://uptodown.dev/mentee"`
và kết quả là:
```
HTTP/1.1 200 OK
Server: nginx/1.15.3
Date: Tue, 30 Oct 2018 08:44:09 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 65
Connection: keep-alive
X-Powered-By: Express
ETag: W/"41-nwvW+TLNaBWfb8qt/rSw3zfD0fk"

{"data":{"id":"1","type":"mentee","attributes":{"name":"NamDV"}}}
```
Happy coding !
### References
Source code: https://github.com/kominam/microservices-app

https://www.nginx.com/blog/building-microservices-using-an-api-gateway/