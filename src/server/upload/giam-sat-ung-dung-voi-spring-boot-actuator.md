Trong bài viết này, mình sẽ giới thiệu về Spring Boot Actuator. Là một công cụ trong framwork Spring, cho phép chúng ta giám sát ứng dụng của mình trên môi trường sản xuất mà không cần phải viết code. Nó cung cấp thông tin về ứng dụng, trạng thái của ứng dụng, các dữ liệu liên quan đến ứng dụng.

Đầu tiên, mình sẽ tạo một dự án Spring Boot với cấu trúc như sau:
![](https://images.viblo.asia/097b5c2f-aa1a-4bb6-be45-eec558108852.png)

Thêm Actuator dependency:
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```
Toàn bộ file pom.xml của project như sau:
{@embed: https://gist.github.com/tungpv98/fb1475f356c8b0a3f4d7ac95376e433c}

Start ứng dụng lên, truy cập vào API http://localhost:8080/actuator , chúng ta nhận được kết quả sau:

```
{
    "_links": {
        "self": {
            "href": "http://localhost:8080/actuator",
            "templated": false
        },
        "health": {
            "href": "http://localhost:8080/actuator/health",
            "templated": false
        },
        "health-path": {
            "href": "http://localhost:8080/actuator/health/{*path}",
            "templated": true
        }
    }
}
```
Như đã thấy, mặc dù chưa làm gì nhưng ứng dụng example của mình đã có sẵn một số API có endpoint bắt đầu bằng /actuator, những API này cho phép lấy thông tin về ứng dụng của mình.

Vì lý do bảo mật, nên ở phiên bản 2.x của Spring, theo mặc định, chỉ có một số API được enable, để enable hết tất cả các API mà Spring Boot Actuator cung cấp, chúng ta có thể thêm config trong file cấu hình như sau:

Đối với file .properties
```
management.endpoints.web.exposure.include=*
```
Đối với file .yaml
```
management:
  endpoints:
    web:
      exposure:
        include: *
```
Khi đấy gọi API http://localhost:8080/actuator sẽ thu được kết quả như sau:
```
{
    "_links": {
        "self": {
            "href": "http://localhost:8080/actuator",
            "templated": false
        },
        "beans": {
            "href": "http://localhost:8080/actuator/beans",
            "templated": false
        },
        "caches-cache": {
            "href": "http://localhost:8080/actuator/caches/{cache}",
            "templated": true
        },
        "caches": {
            "href": "http://localhost:8080/actuator/caches",
            "templated": false
        },
        "health-path": {
            "href": "http://localhost:8080/actuator/health/{*path}",
            "templated": true
        },
        "health": {
            "href": "http://localhost:8080/actuator/health",
            "templated": false
        },
        "info": {
            "href": "http://localhost:8080/actuator/info",
            "templated": false
        },
        "conditions": {
            "href": "http://localhost:8080/actuator/conditions",
            "templated": false
        },
        "configprops": {
            "href": "http://localhost:8080/actuator/configprops",
            "templated": false
        },
        "configprops-prefix": {
            "href": "http://localhost:8080/actuator/configprops/{prefix}",
            "templated": true
        },
        "env": {
            "href": "http://localhost:8080/actuator/env",
            "templated": false
        },
        "env-toMatch": {
            "href": "http://localhost:8080/actuator/env/{toMatch}",
            "templated": true
        },
        "loggers": {
            "href": "http://localhost:8080/actuator/loggers",
            "templated": false
        },
        "loggers-name": {
            "href": "http://localhost:8080/actuator/loggers/{name}",
            "templated": true
        },
        "heapdump": {
            "href": "http://localhost:8080/actuator/heapdump",
            "templated": false
        },
        "threaddump": {
            "href": "http://localhost:8080/actuator/threaddump",
            "templated": false
        },
        "metrics-requiredMetricName": {
            "href": "http://localhost:8080/actuator/metrics/{requiredMetricName}",
            "templated": true
        },
        "metrics": {
            "href": "http://localhost:8080/actuator/metrics",
            "templated": false
        },
        "scheduledtasks": {
            "href": "http://localhost:8080/actuator/scheduledtasks",
            "templated": false
        },
        "mappings": {
            "href": "http://localhost:8080/actuator/mappings",
            "templated": false
        }
    }
}
```
Sau đây mình xin giới thiệu một số API chính của Spring Boot Actuator

### API “/health” 

API này được sử dụng để cho phép các ứng dụng khác kiểm tra trạng thái ứng dụng xem có hoạt động bình thường không hay đã dừng. Điều này có ý nghĩa lớn trong các hệ thống microservice, khi các serivce liên lạc với nhau.
```
curl --location --request GET 'http://localhost:8080/actuator/health'
```
Lệnh trên là để kiểm tra sức khỏe của ứng dụng:
```
{
    "status": "UP"
}
```
Nếu ứng dụng hoạt động bình thường chúng ta sẽ nhận được kết quả là status=UP như trên.
Ngoài việc kiểm tra sức khỏe tổng quan của ứng dụng, API này còn có thể kiểm tra chi tiết các thành phần của ứng dụng:
Để API cung cấp đầy đủ thông tin các thành phần của ứng dụng, tiến hành thêm config sau:
```
management.endpoint.health.show-details=always
```
hoặc:
```
management:
  endpoint:
    health:
      show-details: always
```
Khi đó kết quả chúng ta nhận được là:
```
{
    "status": "UP",
    "components": {
        "diskSpace": {
            "status": "UP",
            "details": {
                "total": 160537354240,
                "free": 46472056832,
                "threshold": 10485760,
                "exists": true
            }
        },
        "ping": {
            "status": "UP"
        }
    }
}
```
Việc có thông tin chi tiết về các thành phần trong ứng dụng rất có ích khi có thể ngay lập tức biết được ứng dụng đang gặp phải vấn đề gì.
Để lấy ví dụ mình sẽ thêm Session Redis vào ứng dụng trên, và việc connect đến Redis thành công hay thất bại đều được phản ánh đến API health một cách chi tiết:

Thêm dependencies:
```
<dependency>
        <groupId>org.springframework.session</groupId>
        <artifactId>spring-session-data-redis</artifactId>
</dependency>
<dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```
Và cài đặt thêm database Redis vào:
![](https://images.viblo.asia/dc23b543-7e1b-4159-a271-76387ba6f81f.png)
Khi chạy lại ứng dụng và gọi API health kết quả nhận được như sau:
```
{
    "status": "UP",
    "components": {
        "diskSpace": {
            "status": "UP",
            "details": {
                "total": 160537354240,
                "free": 46390509568,
                "threshold": 10485760,
                "exists": true
            }
        },
        "ping": {
            "status": "UP"
        },
        "redis": {
            "status": "UP",
            "details": {
                "version": "6.2.3"
            }
        }
    }
}
```
Thể hiện trạng thái của các thành phần trong ứng dụng, ví dụ như Redis hoạt động bình thường.

Tiếp theo, mình tiến hành stop service Redis database và kiểm tra lại sức khỏe của ứng dụng thì nhận được kết quả sau:
```
{
    "status": "DOWN",
    "components": {
        "diskSpace": {
            "status": "UP",
            "details": {
                "total": 160537354240,
                "free": 46391427072,
                "threshold": 10485760,
                "exists": true
            }
        },
        "ping": {
            "status": "UP"
        },
        "redis": {
            "status": "DOWN",
            "details": {
                "error": "org.springframework.dao.QueryTimeoutException: Redis command timed out; nested exception is io.lettuce.core.RedisCommandTimeoutException: Command timed out after 1 minute(s)"
            }
        }
    }
}
```
Ở phần Redis hiển thị trạng thái DOWN và details message là `org.springframework.dao.QueryTimeoutException: Redis command timed out; nested exception is io.lettuce.core.RedisCommandTimeoutException: Command timed out after 1 minute(s)`
Tức là việc kết nối đến database Redis đang gặp sự cố. Dẫn đến tổng thể ứng dụng cũng có trạng thái `DOWN`

### API "/info"
Theo mặc định, nếu không khai báo bất kỳ thông tin gì về ứng dụng bằng các thuộc tính như info.app.nam, info.app.description, info.app.version thì khi truy cập API này, sẽ không có thông tin nào được trả về.
Nếu ta đặt cấu hình cho ứng dụng như sau:
```
curl --location --request GET 'http://localhost:8080/actuator/info'
```
Kết quả:
```
{
    "app": {
        "name": "Spring Boot Actuator",
        "description": "An explanation about Spring Boot Actuator",
        "version": "1.0.0"
    }
}
```
Vậy qua bài viết này mình đã giới thiệu qua về module Spring Boot Actuator, cung cấp cho chúng ta một loại API để giám sát hoạt động của ứng dụng Spring của chúng ta. Một module rất hữu ích cho các lập trình viên Java.

Mã nguồn: https://github.com/tungpv98/spring-boot-actuator-example.git