# 1.Development Before Jenkins

Trước khi khái niệm tích hợp liên tục (Continuous Integration - CI) ra đời, có một quy tắc mà các developer phải luôn nhớ là “Don’t break the nightly build!”. Trước kia, hầu hết việc deploy một sản phẩm phần mềm đều dựa theo một quy trình gọi là "Nightly build"-người tiền nhiệm của Continuous Integration. Cụ thể về quy trình này là mỗi đêm hệ thống sẽ pull code của tất cả các developer đã viết trong ngày hôm đó về và build để có thể deploy phiên bản mới nhất cuart sản phầm cho các tester vào ngày tiếp theo. Tuy nhiên quy trình này có một rủi ro là nếu có bất kỳ một đoạn code lỗi nào thì quá trình build sẽ trở thành công cốc và để tìm được đoạn code lỗi đó nằm ở commit nào để sửa cũng rất đau đầu, vì thế, để đảm bảo quá trình build trơn tru thì các anh chàng developer phải build và test thật kỹ trước khi đẩy code của mình lên. Nhưng không điều gì có thể chắc chắc rằng cục code to đùng tích hợp bởi hàng trăm commit kia có thể luôn build thành công mỗi đêm được.

# 2.Jenkins và Continuous Integration

Vào năm 2004 sau công nguyên, một anh chàng developer ở Sun là Kohsuke Kawaguchi, vì quá đau đầu và mệt mỏi bởi những cái build bị tèo không rõ nguyên nhân, anh đã mày mò để tìm cách để có thể biết được code có build thành công hay không trước khi deploy lên server. Vì thế anh đã viết một tool bằng java để thực hiện điều đó, tại thời điểm đó tool này có tên là Hudson. Hudson dần trở nên phổ biến ở Sun và lan ra cả các công ty khác. 

Đến năm 2011, sự tranh chấp giữa Oracle (đã mua lại Sun) và cộng đồng Hudson đã dẫn đến họ phải đổi tên tool này thành Jenkins. Sau đó, hai phiên bản Hudson và Jenkins vẫn tồn tại nhưng Jenkins được sử dụng nhiều hơn còn website của Hudson đã đóng vào ngày 31 tháng 1 năm 2020.

Là một tool tích hợp liên tục, Jenkins cho phép phép phát triển, thử nghiệm và triển khai liên tục, các đoạn code mới. Tích hợp liên tục là một quá trình trong đó các developer commit thay đổi mã nguồn từ kho lưu trữ được chia sẻ và tất cả các thay đổi đối với mã nguồn được build liên tục. Điều này có thể xảy ra nhiều lần mỗi ngày. Mỗi commit được CI Server theo dõi liên tục, làm tăng hiệu quả của việc xây dựng và xác minh code. Điều này giúp loại bỏ gánh nặng của testers, cho phép tích hợp nhanh hơn và ít lãng phí tài nguyên hơn.

# 3.Các tính năng của Jenkins

Jenkins cung cấp nhiều tính năng hấp dẫn cho các developers:

- **Dễ dàng cài đặt**
  Jenkins is a platform-agnostic, self-contained Java-based program, ready to run with packages for Windows, Mac OS, and Unix-like operating systems.
- **Dễ dàng cấu hình**
  Jenkins is easily set up and configured using its web interface, featuring error checks and a built-in help function.
- **Các plugins dồi dào**
  Có hàng trăm plugin có sẵn trong update center, mỗi plugin có thể cung cấp hoặc hỗ trợ cho một tính năng náo đó, tích hợp với mọi công cụ trong chuỗi công cụ CI và CD.
- **Extensible**
  Jenkins có thể được mở rộng bằng kiến trúc plugin của nó, cung cấp khả năng gần như vô tận cho những gì nó có thể làm.
- **Dễ dàng phân phối**
  Jenkins có thể dễ dàng phân phối công việc trên nhiều máy để xây dựng, kiểm tra và triển khai nhanh hơn trên nhiều nền tảng.
- **Mã nguồn mở**
  Jenkins là một công cụ mã nguồn mở, vì là mã nguồn mở nên dĩ nhiên nó miễn phí cộng với một cộng đồng hỗ trợ hùng hậu.

# 4.Kiến trúc Jenkins

Here's how Jenkins elements are put together and interact:
Sau đây là một ví dụ về quy trình làm việc với Jenkins:

- Các developer commit code thay đổi lên shared repository.

- Máy chủ Jenkins CI đều đặn kiểm tra repository đều đặn và lấy bất kỳ code mới nào được thêm vào.

- Build Server xây dựng mã thành một tệp thực thi. Trong trường hợp build thất bại, phản hồi được gửi đến các đội dev.

- Jenkins deploy ứng dụng đã được build lên máy chủ test. Nếu test thất bại, phản hồi được gửi đến các đội dev.

- Nếu code không có lỗi, ứng dụng đã được test sẽ được deploy trên máy chủ production.

Cac file có thể chứa nhiều sự thay đổi code và các thanh đổi này có thể rất lớn, yêu cầu nhiều lần build. Khi đó một server sẽ khó có thể đáp ứng được.Trong trường hợp này ta có thể xây dựng Jenkins thành một hệ phân tán để có thể giải quyết bài toán này. Phần này mình sẽ đi sâu hơn vào các phần tiếp theo.

# 5.Set up Jenkins

Oke nãy giờ lý thuyết nhiều thì cũng chán, giờ ta sẽ tiến hành cài đặt và chạy thử. Ở đây mình sẽ sử dụng docker để tạo một con server ảo với OS là ubuntu 16.04.

Nếu chưa cài docker có thể cài bằng lệnh sau (ubuntu)
```
sudo apt-get install -y docker.io
```

Tạo một container giả lập một deploy server
```
sudo docker run -it --name jenkins_deploy_server ubuntu:16.04
```

Ta sẽ được attach vào container với quyền root. Với mục đích test nên mình sẽ sự dụng luôn user root.
Vì Jenkins viết bằng java nên để chạy được trường tiên mình phải cài đặt java.
```
apt-get update
apt-get install default-jre
apt-get install default-jdk
```

Cài đặt Jenkins
```
apt-get install wget
wget -q -O - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | apt-key add -
sh -c 'echo deb http://pkg.jenkins-ci.org/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
apt-get update
apt-get install jenkins
```

Khởi động jenkins
```
service jenkins start
```
![](https://images.viblo.asia/2b4bd117-1687-4ae3-b968-6755b06fdc09.png)

Bây giờ chúng ta sẽ test Jenkins đã hoạt động hay chưa, mở một terminal khác lên để xem ip của docker container đang chạy:
```
docker exec jenkins_deploy_server | grep IPAddress
```
![](https://images.viblo.asia/9e4dd0d1-430f-43cf-948e-066718b99df3.png)

Mở trình duyệt lên và truy cập vào ip tìm được ở trên và port 8080
![](https://images.viblo.asia/3cb75eae-7f7d-4d1f-8f0f-a9f77285f05a.png)

lấy mật khẩu mặt định bằng lệnh trong terminal của docker và nhập vào textbox
```
cat /var/lib/jenkins/secrets/initialAdminPassword
```
Sau đó chọn các suggeted plugin
![](https://images.viblo.asia/7eca0adf-bef0-450b-afde-1b10f2161200.png)
và đợi quá trình cài đặt hoàn tất
![](https://images.viblo.asia/d5838adb-9234-437a-919d-53c9391fe642.png)
Tạo tài khoản để truy cập vào Jenkins
![](https://images.viblo.asia/401477f5-5916-4059-a4bd-46b0e0960b0c.png)
Và xong
![](https://images.viblo.asia/60c4cca8-e30b-4847-970a-b59de3c85f93.png)
![](https://images.viblo.asia/27eca077-488b-4e8a-a9a5-f5871c0cf3a0.png)

# 6.Kết
Trên đây là các khải niệm cũng như cách cài đặt Jenkins, ở bài sau mình sẽ tiến hành đeploy một project sử dụng jenkins. Cám ơn các bạn đã theo dõi, happy coding :D

Nguồn:
- https://www.simplilearn.com/tutorials/jenkins-tutorial/what-is-jenkins
- https://www.infoworld.com/article/3239666/what-is-jenkins-the-ci-server-explained.html