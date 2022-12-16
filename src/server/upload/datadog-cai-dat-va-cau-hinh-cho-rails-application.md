***Ở phần trước mình đã giới thiệu về những điều tuyệt vời từ DataDog mang lại. Sang phần tiếp theo này, mình sẽ hướng dẫn cài đặt agent của DataDog và config cho rails application***

### 1. Cài đặt Agent
Truy cập vào https://app.datadoghq.com/signup và đăng ký tài khoản theo các bước sau:
*Bước 1*: Đăng ký thông tin tài khoản
![](https://images.viblo.asia/2270169e-2579-41a9-b854-a7cd3bb3df61.png)
*Bước 2*: Cài đặt Agent
Trước bước này còn bước *Your Stack* thì các bạn có thể nhấn next luôn, không cần làm gì cả
![](https://images.viblo.asia/81bf8b9b-c29f-425d-a484-9636b9520f54.png)
Tại bước này, chọn Ubuntu (Tùy vào hệ điều hành các bạn đang sử dụng nhé) và chạy đoạn script nó cho
![](https://images.viblo.asia/38e249c2-dcca-4a76-9e2b-f2ef86801445.png)
Nếu muốn hiểu rõ hơn thực tế cái file script kia nó làm gì thì các bạn có thể chọn setup step-by-step. Sau khi cài đặt xong, đợi thêm 1-2 phút để Agent gửi report lên server DataDog là chúng ta có thể nhấn finish
![](https://images.viblo.asia/22c22967-1371-4224-8658-1d280bc43990.png)
Vậy là phần cài đặt Agent đã xong
P/S: để cài đặt thêm cho nhiều máy khác chọn tab *Intergration >> Agent* và cài đặt như bước 2. Để kiểm tra trạng thái của Agent có thể dùng lệnh sau:
```
sudo datadog-agent status
```
nếu nhận được những dòng sau thì bạn đã cài Agent thành công
```
Getting the status from the agent.

==============
Agent (v6.1.3)
==============

  Status date: 2018-05-02 15:10:31.617150 UTC
  Pid: 1373
  Python Version: 2.7.12
  Logs: 
  Check Runners: 1
  Log Level: info

  Paths
  =====
    Config File: /etc/datadog-agent/datadog.yaml
    conf.d: /etc/datadog-agent/conf.d
    checks.d: /etc/datadog-agent/checks.d

  Clocks
  ======
    NTP offset: 0.034679659 s
    System UTC time: 2018-05-02 15:10:31.617150 UTC

  Host Info
  =========
    bootTime: 2018-05-02 07:37:24.000000 UTC
    kernelVersion: 4.13.0-39-generic
    os: linux
    platform: ubuntu
    platformFamily: debian
    platformVersion: 16.04
    procs: 243
    uptime: 49
    virtualizationRole: host
    virtualizationSystem: kvm

  Hostnames
  =========
    hostname: quyetlq
    socket-fqdn: framgia0176-pc.framgia.com.
    socket-hostname: framgia0176-pc
....
````

### 2.  Cấu hình DataDog cho rails application
#### 1, Bật APM
Nếu là Ubuntu thì sửa file sau
```
sudo vim /etc/datadog-agent/datadog.yaml
```
![](https://images.viblo.asia/dc7cf5ed-6335-49b2-a316-7e052661afab.png)
sau đó restart lại Agent theo lệnh *sudo service datadog-agent restart*
Nếu là OSX thì follow theo đoạn script sau: https://github.com/DataDog/datadog-trace-agent#run-on-osx 

#### 2, Config DataDog cho rails application
Truy cập link sau: https://app.datadoghq.com/apm/install, chọn tab *Ruby*
![](https://images.viblo.asia/039c67e9-5210-498c-8431-58898a2c361f.png)
*Bước 1*: Add gem ddtrace vào Gemfile
```
gem 'ddtrace'
```
*Bước 2*: Tạo file *config/initializers/datadog-tracer.rb* và thêm vào đoạn mã sau
```
# config/initializers/datadog-tracer.rb

Datadog.configure do |c|
  c.use :rails, service_name: 'my-rails-app'
end
```
Sau đó truy cập vào ứng dụng rails của bạn và quay lại trang này https://app.datadoghq.com/apm/services?start=1525251365687&end=1525254965687&paused=false bạn sẽ thấy 
![](https://images.viblo.asia/a05833b0-366b-4413-b3b9-bdb29766c70e.png)

### 3. Kết luận
Mình đã hướng dẫn các bạn các cài đặt Agent và cấu hình cho rails application, chúc các bạn thành công.