Chào các bạn,
Đến hẹn lại lên. Trong bài viết trước, mình đã hướng dẫn các bạn những step cơ bản để làm quen với một nền tảng deploy ứng dụng khá mới mẻ của Google là Google App Engine(GAE). Và cũng đã hướng dẫn các bạn những bước cơ bản để deploy một ứng dụng Ruby lên GAE bằng tool editor của GAE là CloudShell.

Hôm nay, mình sẽ hướng dẫn các bạn cách cài đặt SDK để có thể thực hiện các câu lệnh của Google trên máy Linux local của bạn.

Bắt đầu nhé!

Bài viết này mình dự đoán là khá ngắn, vì những step để thực hiện công việc này khá đơn giản. Mình sẽ cố gắng đưa những lưu ý cần thiết vào đây. Và ở bài viết sau, mình sẽ hướng dẫn các bạn cách cấu hình SSL cho domain và hoàn thiện sản phẩm trên con server này

# Cài đặt SDK
Xém quên :D-Điều kiện cần thiết để thực hành ở đây là bạn phải dùng hệ điều hành Ubuntu nhé, đã tạo App Engine trên Google Cloud và đã clone repo dự án về mày local :v: 

**Ở trong foder dự án:**

- Step1:

Bạn phải add Cloud SDK distribution URI  vào package dự án bằng command line:
```
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

```

- Step2:

Import public key của Google cloud flatform vào luôn

```
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

```

- Step3:

Update mớ package đó lên và cài đặt SDK

```
sudo apt-get update && sudo apt-get install google-cloud-sdk

```

Thường google nó có dự phòng một vài trường hợp cài đặt lỗi ở đây, bạn có thể tham khảo

- TH1: Bạn không thể truy cập được những phiên bản mới nhất của mớ linh tinh vừa mới cài vào, bạn có thể truy cập vào [đây nè](https://cloud.google.com/compute/docs/troubleshooting/known-issues#keyexpired) để lấy cái đống đó ra với tệp apt-get.gpg

- TH2: Nếu lệnh apt-key phân phối của bạn không hỗ trợ đối số --keyring, hãy chạy các lệnh sau:

```
echo "deb http://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
```

```
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
```

```
sudo apt-get update && sudo apt-get install google-cloud-sdk
```

Vậy là mớ linh tinh đã được cài xong. Bây giờ mình bắt đầu thao tác trực tiếp với SDK

- Step4:

```
gcloud init
```

Command line này để bắt đầu install SDK vào PC local của bạn và connect trực tiếp nó đến account GAE bạn đang truy cập. Follow những step bên dưới nữa là okie :D

Sau khi chạy lệnh, console terminal của bạn sẽ tiến hành confirm những step khác, bắt đầu là

```
To continue, you must log in. Would you like to log in (Y/n)? Y
```

Bạn chọn Y(Yes)

Nó đang confirm việc đăng nhập GAE trên trình duyệt và cho phép install SDK dư lày.

Sau đấy nó lại confirm bạn chọn app engine cụ thể dư lày:

```
Pick cloud project to use:
 [1] [my-project-1]
 [2] [my-project-2]
 ...
 Please enter your numeric choice:
```

Ở step này, bạn chỉ cần chọn số thứ tự của con engine mà bạn sẽ deploy ứng dụng.

Tiếp tục là chọn computer zone :D

```
Which compute zone would you like to use as project default?
 [1] [asia-east1-a]
 [2] [asia-east1-b]
 ...
 [14] Do not use default zone
 Please enter your numeric choice:
```

Cái này mình méo biết bạn ở đâu nên bạn tự tìm hiểu mà chọn nha :v 

Sau đấy thì nó xác nhận bạn thành công, console dư lày:

```
gcloud has now been configured!
You can use [gcloud config] to change more gcloud settings.

Your active configuration is: [default]
```

Về cơ bản, đến đây thì bạn đã install thành công SDK. Để kiểm tra, bạn có thể chạy những lệnh đơn giản như `gcloud info, gcoud help...`

Việc còn lại để deploy chính là bạn cần cấu hình các thứ liên quan secret key, env...
Chắc đoạn này mình sẽ nói luôn ở bài cuối: Deploy và SSL cho Domain. Còn phạm vi bài này về install SDK mình nghĩ đã okie rồi. Thong thả :D

Cảm ơn mấy bạn đã xem bài nha. Mình tổng hợp tài liệu từ trang gốc và các tài liệu fake khác nên xin phép thôi ghi nguồn ạ.