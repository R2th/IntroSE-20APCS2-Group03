Bài viết này mình muốn gửi tới các bạn một framework rất mạnh trong xây dựng một ChatBot. Mình sẽ giới thiệu tổng quan, cách cài đặt framework này, và hướng dẫn sơ lược build một Chatbot đơn giản dựa trên Rasa Core. Rất mong các bạn dành thời gian cho bài viết ^^!

# 1- Giới thiệu Rasa Core
   Rasa Core là một framework có mã nguồn mở để xử lý hội thoại theo ngữ cảnh (contextual conversations). Quản lý hội thoại nâng cao của Rasa-Core dựa trên Machine Learning và cho phép các cuộc hội thoại thông minh hơn và giúp nhân rộng dễ dàng hơn. Là framework duy nhất cho phép Bot đối thoại tinh vi hơn, có tương tác, được train dựa trên supervised machine learning (học có giám sát).

# 2- Tại sao lựa chọn Rasa Core?

- Khi không thể dựa vào API của bên thứ 3 thì Rasa xử lý tốt phần đó giúp bạn.
- Rasa Stack cho phép kiểm soát lại NLU. Nó rất dễ dàng để train và tùy chỉnh cho các trường hợp sử dụng. Bạn có thể sử dụng Rasa trực tiếp từ code Python, có thể tiết kiệm 200ms theo yêu cầu của người dùng.

# 3- Cài đặt Rasa Core 
- B1: Cài đặt **pip** sau đó chạy lệnh
```
       pip install rasa_core
```
       Nếu bạn muốn update bản mới nhất thì sẽ chạy lệnh sau
```
      pip install -U rasa_core
```
- B2: tải dữ liệu training từ github 
```
    git clone https://github.com/RasaHQ/rasa_core.git
    cd rasa_core
    pip install -r requirements.txt
    pip install -e .
```
- B3: Cài đặt NLU (Natural Language Understanding)
```
    pip install rasa_nlu[tensorflow]
```
# 4- Xây dựng Chatbot đơn giản
   Rasa-core tutorial đã chuẩn bị một gói khởi động Rasa Stack có tất cả các tệp bạn cần để xây dựng chatbot tùy chỉnh. Bao gồm một bộ dữ liệu huấn luyện đã sẵn sàng để bạn sử dụng. Dưới đây là github của pack này.
```
https://github.com/RasaHQ/starter-pack-rasa-stack
```
   Các bạn có thể vào xem đã có hướng dẫn rất cụ thể.

   Nếu bạn băn khoăn về việc dữ liệu quá nặng khi train bot, đừng lo, Rasa-core cung cấp tất cả các thành phần được update liên tục đóng trong Docker. Để nhanh chóng chạy Rasa Core với các thành phần khác, bạn có thể sử dụng tệp Docker được cung cấp. Điều này hữu ích cho thiết lập nhanh local hoặc nếu bạn muốn lưu trữ các thành phần Rasa trên các dịch vụ Cloud

### 4.1 Compose File Example
```
version: '3.0'

services:
  rasa_core:
    image: rasa/rasa_core:latest
    networks: ['rasa-network']
    ports:
    - "5005:5005"
    volumes:
    - "./rasa-app-data/models/current/dialogue:/app/model"
    - "./rasa-app-data/config:/app/config"
    - "./rasa-app-data/project:/app/project"
    command:
    - start
    - -d
    - ./model
    - -c
    - rest
    - -u
    - current/nlu
    - --endpoints
    - config/endpoints.yml

  action_server:
    image: rasa/rasa_core_sdk:latest
    networks: ['rasa-network']
    ports:
    - "5055:5055"
    volumes:
    - "./rasa-app-data/actions:/app/actions"

  rasa_nlu:
    image: rasa/rasa_nlu:latest-full
    networks: ['rasa-network']
    ports:
    - "5000:5000"
    volumes:
    - "./rasa-app-data/models/:/app/projects"
    - "./rasa-app-data/logs:/app/logs"

  duckling:
    image: rasa/duckling:latest
    networks: ['rasa-network']
    ports:
    - "8000:8000"

networks: {rasa-network: {}}
```
### 4.2 Run it
```
curl -XPOST \
    --header 'content-type: application/json' \
    --data '{"message": "Hi Bot"}' \
    http://localhost:5005/webhooks/rest/webhook

```

Nếu sử dụng Docker:
```
docker-compose run rasa_core train
```
### 4.3 Giải thích một số File quan trọng

**./rasa-app-data/models/current/dialogue:** Thư mục này chứa các mô hình Rasa Core được đào tạo. Bạn cũng có thể di chuyển các mô hình đã được đào tạo trước đó vào thư mục này để tải chúng trong Docker.

**./rasa-app-data/config**: Thư mục này dành cho cấu hình của Endpoints và Chat & Voice platforms khác nhau mà bạn có thể sử dụng Rasa Core.
Để kết nối các thành phần khác với Rasa Core, thư mục này phải chứa tệp endpoint.yml, chỉ định cách tiếp cận các thành phần này. Ví dụ với Docker, tệp sẽ trông như thế này:
```
action_endpoint:
    url: 'http://action_server:5055/webhook'
nlu:
    url: 'http://rasa_nlu:5000'
```
Nếu bạn sử dụng trình kết nối với nền tảng Chat & Voice, bạn phải định cấu hình thông tin đăng nhập cần thiết cho những thông tin này trong tệp credentials.yml. Sử dụng thông tin đăng nhập được cung cấp bằng cách thêm` --credentials <path to your credentials file>` vào lệnh chạy của Rasa Core.

**./rasa-app-data/project:**  Thư mục này chứa dự án Rasa của bạn và có thể được sử dụng để đào tạo một mô hình.

**./rasa-app-data/models/**:  Thư mục này chứa dự án NLU và các mô hình được đào tạo của nó. Bạn cũng có thể di chuyển các mô hình đã được đào tạo trước đó vào thư mục này để tải chúng trong Docker


## Cảm ơn các bạn đã theo dõi đến cuối bài viết ^^! Hẹn gặp lại ở bài Post tiếp theo

Link tham khảo: https://rasa.com/docs/core/installation/