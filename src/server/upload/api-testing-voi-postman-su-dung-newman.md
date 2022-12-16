## 1. Sử dụng newman cli
### 1.1. Giới thiệu

Newman là 1 tool của Postman, chuyên dùng run collection bằng command-line (cli). Nó sẽ phù hợp cho các trường hợp mà sử dụng các CI tools như Jenkins, TeamCity, hay TravisCI…

Chốt lại: Newman giúp run collection mà không cần phải mở chức năng Runner ở postman. Newman có 2 cách sử dụng chính:

- Sử dụng dòng lệnh
- Sử dụng như 1 thư viện của Nodejs

### 1.2. Cách cài đặt

a. Cài đặt Nodejs

Download: https://nodejs.org/en/
![](https://images.viblo.asia/984086a5-8456-41c0-a34b-6d475fed0e50.png)

* Setup như các phần mềm khác
* Verify

![](https://images.viblo.asia/1ef499c0-ac7f-43f7-aace-71a23014ea0f.png)

b. Cài đặt Newman

`npm install -g newman`

![](https://images.viblo.asia/cfea3250-aefc-4d7a-9f15-f7dfbbd0e44d.png)

### 1.3. Sử dụng

Để chạy được các lệnh của newman, thì bạn phải export postman collection trước.

![](https://images.viblo.asia/7a552904-e70b-4870-9db0-d1d1188a31a5.png)

`newman run examples/sample-collection.json`

Ngoài ra để run thêm các thứ khác, ví dụ:
```
-e <source>, --environment <source>
//E.g: -e .\postman-script.postman_environment.json
```
Run kèm Environment (đã được export từ postman)

```
-n <number>, --iteration-count <number>
// E.g: -n 5 
```
Số lần lặp lại khi run collection

Full-list option [ở đây](https://www.npmjs.com/package/newman#command-line-options)

Ngoài ra, nếu bạn muốn có 1 cái report đẹp đẽ bằng HTML, thì nên sử dụng newman-reporter-htmlextra

`npm install -g newman-reporter-htmlextra`

HTML report sẽ được tạo ra ở folder ./newman

## 2. Sử dụng newman như library

### 2.1. Setup môi trường

a. Cài đặt Nodejs và Visual studio 

- Cài đặt Nodejs như ở phần 1 
- Cài đặt Visual studio 

Download: https://code.visualstudio.com/download 

![](https://images.viblo.asia/820b7047-7808-409d-a1ce-e184c97bc79b.PNG)

Chọn phiên bản phù hợp với máy tính của bạn rồi cài đặt như bình thường

![](https://images.viblo.asia/fe7ecbc5-30f6-4f92-b8a6-5c3f82ab1f02.PNG)

Cài đặt plugin “Prettier - Code formatter”

![](https://images.viblo.asia/2b6e3cae-4bd5-4f28-92c1-cefb1eef7731.PNG)

![](https://images.viblo.asia/53c0b6a7-7537-4527-a4a6-c1ea958e83ac.PNG)

![](https://images.viblo.asia/b7e1e417-97d6-4481-a410-7e5815e82941.PNG)

Cài đặt plugin “JavaScript (ES6) code snippets”

![](https://images.viblo.asia/d30fe20a-f501-478c-a70e-c347e3dc0933.PNG)

Cài đặt plugin “Live Server”

![](https://images.viblo.asia/dcd39c7d-3e18-4f39-9df0-af34cb13419f.PNG)

b. Tạo project 

* Tạo 1 folder mới: ví dụ: D:\newman
* Mở folder trên bằng VS code
* Mở terminal trên VS code

![](https://images.viblo.asia/7db68891-904e-4c51-ab03-e09e4ae05a9f.png)

* Gõ dòng lệnh

`npm init -y`

Cài đặt newman và htmlextra report: (gõ tiếp vào terminal đang mở)

```
// cài đặt newman
npm install newman --save

// cài đặt htmlextra report
npm install newman-reporter-htmlextra --save
```

### 2.2. Cách run test 

Tương tự như phần I

Viết code:

```
const newman = require("newman");
 
newman.run({
    collection: require("./postman-script.postman_collection.json"),
    reporters: ["cli", "htmlextra"]
});
```

Cách run test:

`node .\newman-test.js`

----------------------------

Tham khảo: 
- Newman: https://www.npmjs.com/package/newman
- HTML extra: https://www.npmjs.com/package/newman-reporter-htmlextra