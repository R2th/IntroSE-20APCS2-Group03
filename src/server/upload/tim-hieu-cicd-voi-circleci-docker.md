:grinning: Hé lô mọi người, lại là Thanh đây. Ở bài trước chúng ta đã tìm hiểu về [VPS Google Cloud và các thao tác cơ bản với VM](https://viblo.asia/p/tao-vps-free-tren-google-cloud-platform-6J3Zgd8glmB) . Ở bài này chúng ta sẽ cùng tìm hiểu về quá trình để tự động deploy hệ thống hoàn chỉnh nhé. Hình bên dưới là những gì chúng ta sẽ học trong bài post này. Nào! các bạn có cảm thấy thích thú không? **let's go!!**
 ![image.png](https://images.viblo.asia/0a3b37e6-52e4-48a7-b107-f3a33a8863f5.png)

-----

##  **CI/CD là gì?**
Khái niệm CI/CD cõ lẽ không xa lạ gì với chúng ta, chỉ cần lên google CI/CD là hàng tá câu trả lời, ở đây mình chỉ giải thích ngắn gọn thôi nhé.
* **CI (Continuous Integration)** nó là 1 phương pháp phát triển phần mềm giúp chúng ta giám sát repository của mình khi có sự thay đổi trong các lần commit của dev. Khi có sự thay đổi CI sẽ thực hiện các jobs để kiểm tra như unit test và integration test nhờ đó PR của chúng ta luôn đảm bảo pass test trước khi merge
* **CD (Continuous Delivery)** nếu như CI nhận nhiệm vụ xây dựng giám sát một cách tự động thì CD là có nhiệm vụ cao hơn là kiểm tra tất cả những thay đổi về code đã được build trong môi trường kiểm thử. CD cho phép tự động hóa phần mềm testing, kiểm tra phần mềm qua nhiều thước đo trước khi triển khai một cách tự động.
* Từ 2 khái niệm trên ta có thể hiểu đơn giản thì CI/CD chính là quá trình làm việc liên tục và tự động hóa phần mềm. 
##  **Quy trình CI/CD**
![image.png](https://images.viblo.asia/b8b5d0dd-094d-45ba-b742-ee5f895c815f.png)

##  **Thực hành**
### 1. Tạo react app demo
- Ở bước này chúng ta chỉ cần [init 1 project reactjs](https://reactjs.org/docs/create-a-new-react-app.html) đơn giản thôi. 
```
npx create-react-app my-app
cd my-app
npm start
```
Như vậy là đủ rồi các bạn ạ, tất nhiên là các bạn phải đẩy project này lên repo git của mình nhé. Đây là repo của mình [bathanh/reactApp](https://github.com/thanhtb-2411/ReactCICD)

### 2. Thêm Dockerfile
* Nếu bạn nào chưa biết về docker thì vào [docker docs](https://docs.docker.com/get-started/) xem trước nhé. Mình cũng chỉ biết mấy cái cơ bản thôi. 

```
FROM node:13.12.0-alpine AS myapp

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install react-scripts@3.4.1 -g --silent 

COPY . ./

RUN npm run build

FROM nginx:latest
COPY --from=myapp /usr/src/app/build /usr/share/nginx/html
```
* Ở đây chúng ta sẽ sử dụng version node 13.12.0 để build project và chạy project trên nginx nhé. 
* Đến bước này thì chúng ta thử build và run docker ở local xem ổn chưa nhé. 
```
sudo docker build -t my-app:latest .
sudo docker run --name myapp -td -p 8080:80 my-app
```
Rồi bạn vào đường dẫn http://localhost:8080/ mà thấy logo của react là thành công rồi đấy.
### 3. Cấu hình CircleCI
####   Init CircleCI
 [CircleCI doc](https://circleci.com/docs/) cho bạn nào cần. 
* Chúng ta login vào circelCI bằng github --> chọn project --> chọn setup project. Khi đó circleCI sẽ tạo 1 commit setup CI như thế này. 

![image.png](https://images.viblo.asia/6faff511-6a2c-4396-8caa-cad1f7b4fc3a.png)

* Ở trong file này sẽ config để project sử dụng CI/CD. Chúng ta thử commit xem CircleCi nó chạy chưa đã nhé. 

 ![image.png](https://images.viblo.asia/d63e9560-e1db-4862-b97c-03645a488421.png)
* OK nó đã chạy thành công. Cái failed là do mình chưa merged vào  nhánh config circleCI đấy. 
####  Kết nối circleCI với Docker
* Bạn nào chưa có thì tạo tài khoản docker hub với user và password nhé.
* Tiếp theo bạn vào project setting --> vào Environment Variables để tạo biến môi trường cho tài khoản docker `DOCKER_USER` và `DOCKER_PASSWORD` chút mình sẽ sử dụng trong file config.
* Chúng ta sẽ sử dụng orbs [circleci/docker@1.6.0](https://circleci.com/developer/orbs/orb/circleci/docker)  để làm việc với docker trong circleCI.
* Tạo 1 jobs build-and-push như bên dưới để build docker thì git và push lên docker hub của mình. Phần này docs phía trên rất đầy đủ nên mình không giải thích thêm nhé
{@embed: https://gist.github.com/thanhtb-2411/c5a8b90016a52a76cd45e316bc4d9939}
####  Kết nối VM với circleCI bằng SSH
* SSH thì không xa lạ gì với chúng ta rồi vì circleCI không hỗ trợ gen SSH nên ta sẽ tạo SSH bên VM rồi copy file ***private ssh*** (không có đuôi .pub) qua circleCI để tạo SSH_KEY_FINGERPRINT (Nó sẽ được lưu trong biến môi trường để sử dụng trong file config.
* Câu lệnh gen SSH cho bạn nào cần. `ssh-keygen -t ed25519 -C "your_email@example.com"`

* Chúng ta vào project congif --> SSH key rồi điền địa chỉ host và private key vào nó sẽ tự động tạo 1 SSH_KEY_FINGERPRINT. Sau đó ta lưu SSH_KEY_FINGERPRINT vào biến môi trước nhé.
* Ngoài ra cần phải có biến môi trường DEPLOYED_SERVER VÀ DEPLOYED_USER lần lượt là địa chỉ và username login vào VM
![image.png](https://images.viblo.asia/9fe39d42-56b1-407c-bd78-039adca3650f.png)
* Để deploy được ta cũng sẽ tạo  job connect đến VM thông qua ssh để chạy lệnh `./deploy.sh` ( file script này viết ở phần 4 nhé)
```
  deploy:
    executor: docker/docker
    steps:
      - add_ssh_keys:
          fingerprints:
            - $SSH_KEY_FINGERPRINT
      - run: ssh -oStrictHostKeyChecking=no $DEPLOYED_USER@$DEPLOYED_SERVER './deploy.sh'
```
####  File Config CircleCi
* Sau khi có 2 jobs thực hiện việc build -push và deploy thì ta sẽ có file đầu đủ với workflows như sau.
1.  Chúng ta sẽ run test với tất cả các branch trong repo 
2.  Chỉ build-push với điều kiện pass test và thuộc branch master.
3.  Chỉ deploy khi build-push thành công

{@embed: https://gist.github.com/thanhtb-2411/d676a286b8d8e020c4e149a934bbdb86}
* Đến đây các bạn có thể thử push thứ gì đó lên master xem có build push vào được trong docker hub không nhé
* Và đây là thành quả của mình, các bạn có thể pull về thử: `docker push thanhtb/myapp:latest`
 ![image.png](https://images.viblo.asia/7de4217c-3f17-446b-9ae9-e2b33ade08e3.png)

####  Kết nối docker với VM bằng Token
( Phần này chỉ áp dụng cho các bạn muốn private image của mình thôi nhé)
* Vào repo trong docker hub bạn tạo [token](https://hub.docker.com/settings/security) để login trong VM
* Sử dụng: `sudo docker login -u <username>` rồi nhập password là token là được
### 4. Tạo file deploy script + docker-compose
1. File docker-compose tạo 1 service mywebsite để pull docker image về rồi chạy trên cổng 8080.
```
version: "3.3"
services:
  mywebsite:
    image: thanhtb2411/myapp:latest
    ports:
      - "8080:80"
```
 2. File ./deploy.sh
 * Bạn cần phải xóa image cũ rồi mới pull image mới về nhé
 ```
 #!/bin/bash
docker-compose stop
docker-compose rm -f
docker-compose pull
docker-compose up -d
 ```
 
 * Bạn dùng lênh `scp` để copy 2 file này lên server bằng ssh. 
 * Truy cập root và cấp quyền `+x` cho 2 file này như sau: `chmod +x docker-compose.yml deploy.sh`
 * Lưu ý: Bạn cần cài [docker](https://docs.docker.com/engine/install/ubuntu/) và [docker-compose]
 (https://docs.docker.com/compose/install/) trước nhé.

### 5. Kết quả
Sau khi bạn hoàn thành 4 bước trong phần thực hành thì hãy tạo 1 [PR](https://github.com/thanhtb-2411/ReactCICD/compare/task/test_deploy?expand=1) vào nhánh master để xem sự thay đổi nhé.

![image.png](https://images.viblo.asia/eb85d64b-1f73-45e9-915d-ded926a5ade0.png)

* Khi dev code 1 chức năng đẩy lên bracnh mới (task/test_deploy) thì CircleCi sẽ chỉ chạy test, còn khi PR được merged master( có sự thay đổi trên branch master) thì CircleCi sẽ build image rồi push lên dockerhub và SSH vào server để pull image về rồi run, quá trình này sẽ lặp đi lặp lại một cách tự động gọi là CI/CD
* Và đây là sản phẩm cuối cùng của mình. http://34.146.32.28:8080/
![image.png](https://images.viblo.asia/a5325679-4855-426b-9919-03352b62e0e8.png)

##  Tổng kết
Vậy là chúng ta đã tìm hiểu và thực hành ngon lành CI/CD với circleCi + docker rồi. Ở phần tiếp theo chúng ta sẽ tiếp tục tìm hiểu về CI/CD nhưng nó sẽ sử dụng git actions trực tiếp trên gít luôn nhé.
##  Tài liệu tham khảo
* Document docker: https://docs.docker.com/get-started/
* Document circleCi: https://circleci.com/docs/
* Orb circleci-docker: https://circleci.com/developer/orbs/orb/circleci/docker