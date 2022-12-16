Trở lại với loạt bài "API Testing bằng Postman", chúng ta đã biết được cách làm thế nào để có thể tạo được một request trên Postman, viết các test script cho test case và cuối cùng là thêm chúng collection để tạo thành các test suite
Hôm nay chúng ta sẽ lại tiếp tục với việc làm thế nào để chạy Postman như một tool automation test với công cụ Collection Runner và Newman

### 1. Làm thế nào để tạo được Collection Runner

Có hai cách để chạy một Postman collection là Collection Runner và Newman, hãy bắt đầu chạy một collection bằng Collection Runner

**Bước 1)** Click vào button Runner trên góc trên cùng bên trái bên cạnh nút Import

![](https://images.viblo.asia/ed18857f-f1d0-4839-accb-2ef1530e39c2.png)

**Bước 2)** Trang Collection Runner sẽ xuất hiện như bên dưới

![](https://images.viblo.asia/1065b27d-dfec-4b24-87d3-bbc3718f7e75.png)

Mô tả các trường:
1. Chọn các collection ở đây. Nếu có sub-folders bạn sẽ cần phải chọn subfolder đó
2. Đừng quên chọn environment nếu bạn có một environment đặt biệt
3. Chọn số lần bạn muốn lặp lại
4. Chọn khoản thời gian chờ để tránh lỗi xảy ra
5. Trạng thái log các response
6. Nếu bạn sử dụng data file, hãy chọn ở đây

**Bước 3)** Chạy User Test Collection bằng cách setup như sau

- Chọn User Test Collection - Chọn lặp lại 3 lần
- Chọn thời gian chờ là 2500ms
- Click Run User Test Collection

![](https://images.viblo.asia/38d3f2a3-4045-4550-a7fb-b6a2ee1fe4bb.png)

**Bước 4)** Chạy và Results page sẽ hiển thị sau khi bạn click Run button. Lệ thuộc vào thời gian chờ, bạn sẽ thấy các test case chạy

1. Mỗi test case hoàn thành, bạn sẽ thấy test status là Passed hay Failed và kết quả của mỗi lần lặp lại
2. Bạn thấy Pass status cho Get Requests
3. Vì chúng ta chưa viết test case cho Post Request, nên sẽ có messege rằng "This request does not have any tests"

![](https://images.viblo.asia/87c88626-1ebb-45bd-95a9-8d6f15b65743.png)

Ở đây, bạn có thể thấy được test trong request của bạn, có thể check xem HTTP request có thành công hay không và data đã được tạo hay trả về chưa.

### 2. Làm thế để chạy Collection bằng Newman

Có một cách khác để chạy collection là thông qua Newman. Điểm khác biệt giữa Newman và Collection Runner là:

1. Newman là một add-on của Postman. Bạn sẽ cần phải cài đặt riêng từ Native App
2. Newman sử dụng command line trong khi Collection Runner có GUI
3. Newman có thể sử dụng cho continuous integration

Để cài đặt Newman và chạy collection của bạn từ đó, làm theo hướng dẫn sau:

**Bước 1)** Cài đặt nodejs với link sau: [](http://nodejs.org/download/)

**Bước 2)** Mở command line và nhập

```
npm install -g newman 
```

Newman sẽ được cài đặt vào máy tính cả bạn như sau

![](https://images.viblo.asia/90647930-d164-4efa-8447-022a4f4633b4.png)

**Bước 3)** Khi nào Newman đã được cài đặt, hay trở lại Postman workspace. Trong Collections box, click vào dấu "...". Một popup sẽ xuất hiện. Chọn Export

![](https://images.viblo.asia/c44f8d92-3c0b-4ed7-9128-492464ef5c71.png)

**Bước 4)** Chọn Export Collection như Collection v2.1 (recommended) tiếp theo click Export

![](https://images.viblo.asia/da6e2ea5-5257-41c8-961c-f11b69b5e11b.png)

**Bước 5)** Chọn nơi mà bạn muốn lưu và click Save. Sẽ có một lời khuyên là tạo 1 folder đặt biệt cho Postman test case. Một collection sẽ được export nếu bạn chọn 1 folder

**Bước 6)** Chúng ta sẽ cần export environment. Click vào biểu tượng mắt bện cạnh environment dropdown trong Global, chọn Download as JSON. Chọn nơi lưu và click Save.

![](https://images.viblo.asia/696b20f6-2e89-4ab9-823c-f691d6f3c2a1.png)

![](https://images.viblo.asia/95d9a877-fe38-4ff3-a6f8-d646d3a5d401.png)

**Bước 7)** Environment nên được export cùng folder với Collection

**Bước 8)** Bây giờ trở lại với command line và đổi sang folder nơi mà bạn đã lưu collection và environment

```
cd Downloads/
```

**Bước 9)** Chạy collection của bạn bằng câu lệnh sau

```
newman run Use\ Test\ Collection.postman_collection.json -e Demo.postman_globals.json
```

Kết quả sau khi chạy sẽ xuất hiện như bên dưới

![](https://images.viblo.asia/6f47ea4b-c599-407c-9ff9-dfde8d96f286.png)

Tham chiếu một số câu lệnh cơ bản của Newman

-  **Chạy một collection** Câu lệnh này sử dụng nếu không có environment hay test data lệ thuộc

```
newman run <collection man>
```

-  **Chạy một collection và environment** thêm tham số -e

```
newman run <collection name> -e <environment name> 
```

-  Chạy một collection với số lần lặp lại

```
newman run <collection name> -n <no.of iterations>
```

-  Chạy với file data

```
newman run <collection name> --data <file name>  -n <no.of iterations> -e <environment name> 
```

- **Chạy với thời gian chờ.** Điều này quan trọng trong test có thể fail nếu chạy không có thời gian chờ giữa các request

```
newman run <collection name> -d <delay time>
```

### 3. Tổng kết

- Postman là một tool phổ biến nhất hiện nay dùng cho API Testing
- Khả năng linh hoạt, sử dụng collection, cộng tác, Continuous Integration, là những tính năng hay nhất khi tìm hiểu về Postman
- Khuyến khích việc vào Postman account và collection của bạn sẽ được đẩy lên cloud
- Bạn có thể tham số hóa request trong Postman
- Bạn có thể tạo testcase để verify request
- Collection có thể chạy bằng Newman hoặc Collection Runner

**Tham khảo**

- [Postman Tutorial for Beginners with API Testing Example](https://www.guru99.com/postman-tutorial.html)