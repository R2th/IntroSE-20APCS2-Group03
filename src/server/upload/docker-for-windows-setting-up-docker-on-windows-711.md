Nếu bạn đang tìm kiếm việc triển khai phần mềm đơn giản và dễ dàng, Docker là công cụ phù hợp với bạn. Đây là nền tảng chứa tốt nhất và trong blog này về Docker cho Windows, chúng tôi sẽ đặc biệt tập trung vào cách Docker hoạt động trên Windows.

Tôi sẽ đề cập đến các chủ đề sau trong blog này:

1. Tại sao sử dụng Docker cho Windows?
1. Điều kiện tiên quyết của Docker dành cho Windows 
1. Các Components được cài đặt với Docker 
1. Docker là gì?
1. Các thuật ngữ Docker
1. Thực hành

### 1. Tại sao sử dụng Docker cho Windows?
![image.png](https://images.viblo.asia/713257a9-9ad7-4082-88e3-7a9a375e0760.png)

* **Tránh công việc trên máy của tôi nhưng không hoạt động trên production problem**: Sự cố này xảy ra do môi trường không nhất quán trong suốt quy trình phát triển phần mềm. Với Docker, bạn có thể chạy một ứng dụng trong vùng chứa chứa tất cả các phần phụ thuộc của ứng dụng và vùng chứa có thể chạy trong suốt chu trình phát triển phần mềm. Thực hành này cung cấp một môi trường nhất quán trong suốt vòng đời phát triển phần mềm
* **Cải thiện năng suất**: Bằng cách cài đặt Docker trên windows, chúng tôi đang chạy Docker nguyên bản. Nếu bạn đã theo dõi Docker một thời gian, bạn biết rằng Docker container ban đầu chỉ hỗ trợ hệ điều hành Linux. Nhưng nhờ vào bản phát hành gần đây, Docker hiện có thể chạy nguyên bản trên windows, có nghĩa là không cần hỗ trợ Linux, thay vào đó Docker container sẽ chạy trên chính windows kernel
* **Hỗ trợ mạng gốc:** Không chỉ Docker container, toàn bộ bộ công cụ Docker hiện tương thích với windows. Điều này bao gồm Docker CLI (máy khách), Docker compose, data volumes và tất cả các khối xây dựng khác cho Dockerizied infrastructure hiện tương thích với windows. Nhưng ưu điểm này như thế nào? Vì tất cả các thành phần Docker đều tương thích cục bộ với các windows, giờ đây chúng có thể chạy với chi phí tính toán tối thiểu.

### 2.  Điều kiện tiên quyết của Docker cho Windows
![image.png](https://images.viblo.asia/2f717e9c-747f-4eee-9417-56deb37c96bb.png)

Các yêu cầu sau cần được đáp ứng trước khi cài đặt Docker trên windows:

* Kiểm tra xem bạn đang sử dụng Windows 10, phiên bản chuyên nghiệp hay phiên bản doanh nghiệp, hệ thống 64-bit. Docker sẽ không chạy trên bất kỳ phiên bản windows nào khác. Vì vậy, nếu bạn đang chạy trên phiên bản windows cũ hơn, bạn có thể cài đặt hộp Docker toolbox để thay thế. 
* Docker cho windows yêu cầu một hypervisor Type-1 và trong trường hợp windows, nó được gọi là Hyper-V. Hyper-V về cơ bản là một giải pháp virtualization nhẹ được xây dựng trên khung hypervisor. Vì vậy, bạn không cần một virtual box, bạn chỉ cần kích hoạt hypervisor.
* Và bạn cũng cần bật virtualization trong BIOS. Bây giờ, khi bạn cài đặt Docker cho windows, tính năng này được bật theo mặc định. Nhưng trong trường hợp bạn gặp phải bất kỳ sự cố nào trong quá trình cài đặt, vui lòng kiểm tra xem Hyper-V và virtualization của bạn đã được bật chưa.

### 3. Các Components được cài đặt với Docker 

![image.png](https://images.viblo.asia/733831fe-6529-48c5-9aed-6b880e3d773a.png)

1. **Docker Engine**: Khi chúng tôi nói Docker, chúng tôi thực sự muốn nói đến Docker engine. Docker engine chứa Docker daemon, API REST để tương tác với Docker daemon và một ứng dụng khách giao diện dòng lệnh giao tiếp với daemon. Docker daemon chấp nhận các lệnh Docker như Docker run, Docker build, v.v., từ Docker client.
1. **Docker Compose**: Docker compose được sử dụng để chạy nhiều Docker container cùng lúc bằng cách sử dụng một lệnh duy nhất, đó là docker-compose.
1. **Docker Machine**: Docker machine được sử dụng để cài đặt Docker engine. Về cơ bản, nó là những gì bạn cài đặt trên hệ thống cục bộ của mình. Docker machine có ứng dụng khách CLI của riêng nó được gọi là Docker machine và Docker engine client được gọi là Docker.
1. **Kitematic**: Kitematic là một dự án mã nguồn mở được xây dựng để đơn giản hóa việc sử dụng Docker trên Windows. Nó giúp tự động hóa việc cài đặt Docker và nó cung cấp một giao diện người dùng rất tương tác để chạy các vùng chứa Docker.

### 4.  Docker là gì, các thuật ngữ Docker?
Để hiểu được Docker là gì và các thuật ngữ Docker, bạn hãy xem thêm tại blog [này](https://viblo.asia/p/what-is-docker-docker-container-a-deep-dive-into-docker-311-GrLZDJyB5k0) nhé.

### 5. Thực hành cài đặt Docker trên Windows:
1. Tải xuống trình cài đặt Docker cho Windows từ [trang web chính thức](https://docs.docker.com/docker-for-windows/install/)
1. Bấm đúp vào trình cài đặt để chạy nó
1. Đi qua Trình hướng dẫn cài đặt, chấp nhận giấy phép và tiến hành cài đặt
1. Sau khi cài đặt, hãy mở ứng dụng Docker cho Windows và đợi cho đến khi biểu tượng cá voi trên thanh trạng thái trở nên ổn định
1. Mở bất kỳ thiết bị đầu cuối nào như Windows PowerShell và bắt đầu chạy Docker

![image.png](https://images.viblo.asia/17f72ae6-1495-439a-8e57-8169c2bb16d4.png)

Lý thuyết là đủ rồi, chúng ta hãy bắt tay vào tạo một ứng dụng web Python đơn giản bằng cách sử dụng Docker Compose. Ứng dụng này sử dụng Flask framework và maintains bộ đếm lượt truy cập trên Redis.

Flask là một framework web, được viết bằng Python và Redis là một thành phần lưu trữ trong bộ nhớ, được sử dụng làm cơ sở dữ liệu. Bạn không cần phải cài đặt Python hoặc Redis, chúng tôi chỉ đơn giản sử dụng hình ảnh Docker cho Python và Redis.

Trong bản trình diễn này, chúng tôi sẽ sử dụng Docker soạn để chạy hai dịch vụ, cụ thể là:
1. Web service
1. Redis service.

Ứng dụng làm gì? Nó duy trì một bộ đếm lượt truy cập mỗi khi bạn truy cập một trang web. Vì vậy, mỗi khi bạn truy cập trang web, bộ đếm lượt truy cập sẽ tăng lên. Đó là logic đơn giản, chỉ cần tăng giá trị của bộ đếm lượt truy cập khi trang web được truy cập.

Đối với bản trình diễn này, bạn sẽ cần tạo bốn tệp:
1. Python file
1. Requirements.txt
1. Dockerfile
1. Docker compose file

Dưới đây là tệp Python (webapp.py) tạo ứng dụng bằng cách sử dụng Flask framework và nó duy trì bộ đếm lượt truy cập trên Redis. 
```python
import time
import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
    try:
        return cache.incr('hits')
    except redis.exceptions.ConnectionError as exc:
        if retries == 0:
        raise exc
    retries -= 1
    time.sleep(0.5)
    
@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.'.format(count)
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
```
Tệp `request.txt` có tên của hai phần phụ thuộc, tức là Flask và Redis mà chúng tôi sẽ cài đặt trong Dockerfile.
* flask
* redis

`Dockerfile` được sử dụng để tạo Docker image. Ở đây, tôi đang cài đặt python và các yêu cầu được đề cập trong tệp tin request.txt.
```Dockerfile
FROM python:3.4-alpine 
ADD . /code 
WORKDIR /code 
RUN pip install -r requirements.txt 
CMD ["python", "webapp.py"]
```
Tệp Docker compose hoặc tệp YAML chứa hai services:
* Web service: Builds Dockerfile trong thư mục hiện tại
* Redis service: Pulls Redis images từ DockerHub

```docker
version: '3'
services:
web:
build: .
ports:
- "5000:5000"
redis:
image: "redis:alpine"
```

Bây giờ bạn có thể chạy hai services hoặc container này bằng cách sử dụng lệnh sau:
> docker-compose up

Để xem đầu ra, bạn có thể sử dụng Kitematic. Để mở Kitematic, nhấp chuột phải vào biểu tượng cá voi trên thanh trạng thái.
![image.png](https://images.viblo.asia/5c6a15b7-6be0-46ef-a5f5-f04632feda36.png)

Ở góc trên cùng bên trái, bạn có thể thấy hai dịch vụ đang chạy. 
![image.png](https://images.viblo.asia/4380e5b1-f33e-41be-804e-8f66d4b303b5.png)

Đây là kết quả đầu ra trông như thế nào. Khi bạn làm mới trang, số lần truy cập sẽ tăng lên.  
![image.png](https://images.viblo.asia/c5bd337c-0071-4971-a93e-b0e7c6a5de68.png)

Với điều này, chúng ta đến phần cuối của blog này. Tôi hy vọng bạn đã hiểu rõ hơn về cách Docker hoạt động trên Windows. Hãy theo dõi để biết thêm blog về các công nghệ thịnh hành nhất.

Nguồn: [Edureka](https://www.edureka.co/blog/docker-for-windows/)