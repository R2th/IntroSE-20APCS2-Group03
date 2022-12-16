## 1. Introduction to Docker Compose
Đối với tôi, việc chứa một ứng dụng service đơn lẻ thật dễ dàng. Nhưng khi tôi phải chứa nhiều services  trong các container riêng biệt, tôi đã gặp phải rào cản. Yêu cầu của tôi là chứa và lưu trữ một ứng dụng ngăn xếp MEAN. 

Yup, bạn đọc nó đúng. Một ứng dụng ngăn xếp đầy đủ. Ban đầu, tôi nghĩ rằng điều đó là không thể. Nhưng sau khi tôi nghe nói về Docker Compose, tôi biết rằng mọi vấn đề của tôi sẽ được giải quyết.

Docker Compose có thể được sử dụng để tạo các container riêng biệt (và lưu trữ chúng) cho từng ngăn xếp trong ứng dụng ngăn xếp MEAN. MEAN là từ viết tắt của MongoDB Express Angular & NodeJs. Bản demo mà tôi sẽ hiển thị trong blog này cũng thuộc chủ đề tương tự.

Bằng cách sử dụng Docker Compose, chúng tôi có thể lưu trữ từng công nghệ này trong các container riêng biệt trên cùng một máy chủ và giúp chúng giao tiếp với nhau. Mỗi container sẽ hiển thị một cổng để giao tiếp với các container khác.

Giao tiếp và thời gian hoạt động của các container này sẽ được Docker Compose duy trì.

Vì vậy, bạn có thể hỏi, làm thế nào để thiết lập toàn bộ cơ sở hạ tầng này? Vậy thì, hãy để tôi giải thích chi tiết hơn cho bạn.
## 2. Dockerfile
Tương tự như cách chúng ta quay bất kỳ container ứng dụng đơn nào bằng cách viết tệp dockerfile, chúng ta sẽ phải viết tệp tệp tin riêng để xây dựng từng ứng dụng container đơn. Ngoài ra, chúng tôi cũng sẽ phải viết Docker Compose File để thực hiện công việc thực tế. Docker Compose File sẽ thực thi các tập tin dockerfiles khác nhau để tạo các containers khác nhau và cho phép chúng tương tác với nhau.

Trong trường hợp của chúng tôi, chúng tôi có một ứng dụng ngăn xếp đầy đủ bao gồm MongoDB, ExpressJS, Angular và NodeJS. MongoDB quản lý cơ sở dữ liệu phía sau, NodeJS và ExpressJS dành cho kết xuất phía máy chủ và Angular dành cho giao diện người dùng.
![image.png](https://images.viblo.asia/f8fecc93-3c50-4be6-9c8d-197056a04dfc.png)

Vì có ba components, chúng ta phải quay các containers  cho từng components. Chúng ta phải quay các containers theo cách sau:

* Container 1 - Góc
* Container 2 - NodeJS và ExpressJS
* Container 3 - MongoDB

## 3. Creating Docker Containers
Là bước đầu tiên để làm dày thêm ứng dụng trung bình, chúng ta hãy viết tệp dockerfile để xây dựng từng thành phần, bắt đầu từ container của Angular. Dockerfile này sẽ phải có trong thư mục dự án cùng với tệp 'package.json'. 'Package.json' chứa thông tin chi tiết về phiên bản phụ thuộc nào cần được sử dụng bởi 'NPM' để xây dựng ứng dụng góc cạnh.

**1. Dockerfile For Front End**

```docker
FROM node:6
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm cache clean
RUN npm install
COPY . /usr/src/app
EXPOSE 4200
CMD ["npm","start"]
```

Như mọi khi, lệnh đầu tiên của chúng tôi là kéo một base image và chúng tôi đang kéo một base image `node: 6`.

Hai lệnh tiếp theo là về việc tạo một thư mục mới `/usr/src/app` bên trong Docker Container để lưu trữ các mã Angular và biến nó thành thư mục làm việc bên trong Container.

Sau đó, chúng tôi đang sao chép tệp `package.json` từ thư mục dự án của chúng tôi vào bên trong vùng chứa.

Sau đó, chúng tôi chạy lệnh `npm cache clean` để làm sạch bộ nhớ cache npm.

Sau đó, chúng tôi chạy lệnh `npm install` để bắt đầu tải xuống các boiler plates cần thiết để lưu trữ ứng dụng Angular. Nó bắt đầu tải xuống các boiler plates dựa trên các phiên bản của các phụ thuộc được chỉ định trong 'package.json'.

Lần chạy lệnh `RUN` tiếp theo là sao chép tất cả các mã, thư mục hiện diện từ thư mục dự án vào bên trong vùng chứa.

Lệnh trên yêu cầu container hiển thị số cổng `4200` để giao tiếp với máy chủ phụ để gửi các yêu cầu do người dùng truy cập máy khách giao diện người dùng thực hiện qua giao diện người dùng Web.

Cuối cùng, lệnh cuối cùng là, lệnh `RUN` để bắt đầu `npm`. Điều này bắt đầu thực thi các mã để xây dựng ứng dụng Angular của chúng tôi.

Ứng dụng Angular hiện đã sẵn sàng, nhưng nó sẽ không được lưu trữ đúng cách vì phụ thuộc vào máy chủ back end và cơ sở dữ liệu. Vì vậy, chúng ta hãy đi xa hơn và viết một tệp dockerfile để chứa máy chủ back end.

**2. Dockerfile For Back End**

Ngay cả dockerfile này cũng sẽ hiện diện trong một thư mục dự án. Thư mục này cũng sẽ chứa tệp `package.json` để xác định các phụ thuộc của máy chủ Express và các yêu cầu khác của NodeJS. Nhưng quan trọng nhất, nó chứa mã dự án để hỗ trợ máy chủ back end.

```docker
FROM node:6
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm cache clean
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
CMD ["npm","start"]
```

Như bạn có thể thấy, có rất nhiều điểm tương đồng giữa hai tệp dockerfiles. Chúng tôi sử dụng cùng một `node: 6` làm lớp hình ảnh cơ sở, tạo một thư mục mới bên trong vùng chứa, đặt nó làm thư mục làm việc và chạy lệnh 'npm install' trong số những người khác. Nhưng sự khác biệt duy nhất là số cổng được hiển thị cho giao tiếp. Trong trường hợp này, số cổng 3000 được xác định. Đây là nơi máy chủ sẽ được lưu trữ và sẽ tìm kiếm các yêu cầu từ máy khách.

**3. Database**

Bạn có thể thắc mắc tại sao tôi không đề cập đến `dockerfile For Database` trong tiêu đề. Lý do là, chúng tôi thực sự không có bất kỳ nhu cầu tùy chỉnh nào. Chúng ta có thể lấy ngay một hình ảnh cơ sở `MongoDB` để lưu trữ dữ liệu của mình và chỉ cần hiển thị số cổng mà nó có thể được truy cập.

Bây giờ câu hỏi trong đầu bạn sẽ là, tôi sẽ làm điều đó ở đâu? Chúng ta có thể làm điều đó trong Docker Compose File.

## 3. Docker Compose File
Docker Compose File là một tệp YAML chứa thông tin chi tiết về các dịch vụ, mạng và khối lượng để thiết lập ứng dụng Docker.

Chạy lệnh dưới đây để tìm phiên bản Docker Engine của bạn.
> docker -v

## 4. Install Docker Compose
Để tải xuống Soạn thư, hãy chạy bộ lệnh dưới đây.
```
sudo curl -L <a href="https://github.com/docker/compose/releases/download/1.16.1/docker-compose-">https://github.com/docker/compose/releases/download/1.16.1/docker-compose-</a>`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Lưu ý rằng số phiên bản trong lệnh sẽ thay đổi dựa trên phiên bản Docker Engine bạn đang chạy.

Dưới đây là các lệnh nằm trong Tệp Soạn Docker của tôi.

```docker
version: '3.0' # specify docker-compose version
 
# Define the services/ containers to be run
services:
 angular: # name of the first service
  build: angular-app # specify the directory of the Dockerfile
  ports:
  - "4200:4200" # specify port mapping
 
 express: # name of the second service
  build: express-server # specify the directory of the Dockerfile
  ports:
  - "3000:3000" #specify ports mapping
  links:
  - database # link this service to the database service
 
 database: # name of the third service
  image: mongo # specify image to build container from
  ports:
  - "27017:27017" # specify port forwarding
```

Tôi khá chắc chắn rằng các lệnh trong tệp trên không có ý nghĩa gì đối với bạn. Vì vậy, chúng ta hãy giải quyết vấn đề đó.

Trong dòng mã đầu tiên, tôi đã xác định phiên bản Docker Compose mà tôi đang sử dụng. Đây là bước rất quan trọng nếu bạn muốn Compose hoạt động bình thường mà không gặp bất kỳ lỗi nào. Đảm bảo tải xuống phiên bản Docker Compose theo phiên bản Docker Engine của bạn.

Sau đó, tôi xác định ba containers bằng cách sử dụng từ khóa `services`. Các dịch vụ này đề cập đến ba thành phần: frontend, backend và database. Vì vậy, trong trường hợp này, tên của các container của tôi sẽ là tên của các dịch vụ của tôi, tức là  `angular`, `express` và `database`.

Từ khóa `build` được sử dụng để chỉ ra rằng dockerfile để quay container đó có trong thư mục đó. Chờ đã, bạn có bối rối không? 

Nó đơn giản. Đường dẫn cần được chỉ định sau `build:`. Trong trường hợp của chúng tôi, `angle-app` và `express-server` là các đường dẫn đến hai thư mục có thể được truy cập từ thư mục có Docker Compose File. Đối với container cơ sở dữ liệu của chúng tôi, tôi đã nói đơn giản là sử dụng cơ sở `image: mongo` thay vì một đường dẫn đến dockerfile.

Đối với mỗi dịch vụ này, tôi cũng đã chỉ định số cổng có thể được sử dụng để receive/ send request từ các thùng chứa (dịch vụ) khác. 4200 trong trường hợp angular, 3000 trong trường hợp express  và 27017 trong trường hợp mongo.

Ngoài ra, container express có `link:` tới container cơ sở dữ liệu, cho biết rằng bất kỳ dữ liệu nào nhận được ở phía máy chủ sẽ được gửi đến cơ sở dữ liệu nơi nó sẽ được lưu trữ.

Bây giờ cuối cùng, chúng ta đã hoàn thành việc thiết lập Compose. Để bắt đầu một Docker Compose và quay ba containers với ba services, chúng ta chỉ cần thực hiện hai lệnh dưới đây từ thư mục có tệp Docker Compose (tệp YAML):
```
docker-compose build 
docker-compose up 
```
Lệnh `docker-compile build` được sử dụng để build/rebuild các sẻvices trong khi lệnh `docker-compile up` được sử dụng để create/ start các container. Tiến lên! Hãy thử nó cho chính mình.

Dưới đây là ảnh chụp màn hình của các Docker Image đang được xây dựng và sau đó được thực thi. Bạn có thể nhận thấy rằng image Angular đang được xây dựng và sau đó được gắn thẻ với tên là `angular:latest`.

![image.png](https://images.viblo.asia/94d7ff7b-7fba-4844-b6f6-1d2386c6817e.png)

Ngoài ra, một hình ảnh cho Express được xây dựng với tên và thẻ là `express:latest`.

![image.png](https://images.viblo.asia/b2df9067-88aa-48b6-8ea0-56995e8823ac.png)

Bây giờ hình ảnh đã được build, hãy thử chạy nó và do đó quay một container trong quá trình này. Dưới đây là ảnh chụp màn hình đó. 

![image.png](https://images.viblo.asia/36a378e7-bead-4e90-9508-7530e24a84e3.png)

Dưới đây là ảnh chụp màn hình có nội dung `webpack: compiled successfully` có nghĩa là ba services được Docker chứa thành công.

![image.png](https://images.viblo.asia/8928d331-8971-4255-8979-6718aa1a4028.png)

Bây giờ các container đã được lưu trữ, bạn có thể thấy các service đang hoạt động trên các cổng tương ứng của chúng. Hãy nhập các số cổng sau vào trình duyệt web của bạn để tương tác với GUI của ứng dụng MEAN.
```
localhost:4200 – Angular App (Front-end)
localhost:3000 – Express Server & NodeJS (Back-end/ Server-side)
localhost:27017 – MongoDB (Database)
```
Ấn tượng chưa? Chờ đã, vì Docker vẫn chưa hoàn thành! Chúng ta có thể sử dụng lệnh `docker-compan scale = 'x'` để dễ dàng up/down số lượng deployments. Nói cách khác, chúng ta có thể tạo nhiều vùng chứa cho một dịch vụ. Dưới đây là toàn bộ lệnh để chia tỷ lệ một service cho  5 containers:
> docker-compose scale=5

Mở rộng quy mô các service một cách dễ dàng, đóng gói và chứa chúng theo cách hiệu quả về chi phí là những gì làm cho Docker trở thành một trong những công cụ triển khai tốt nhất và yêu thích của cá nhân tôi.

Nguồn: [Edureka](https://www.edureka.co/blog/docker-compose-containerizing-mean-stack-application/)