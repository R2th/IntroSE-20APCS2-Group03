Chắc hẳn khi viết test nhiều bạn sẽ chỉ cho test chạy và đôi khi không biết lỗi bắn ra ở đâu. Bài viết này mình sẽ hướng dẫn các bạn debug trong quá trình testing
Ở đây mình sẽ sử dụng ngôn ngữ là nodejs và thực hiện test với thư viện mocha, chai và supertest
# 1. Chuẩn bị
- Các bạn cần cài đặt framework **ExpressJS**: Express js là một Framework nhỏ, nhưng linh hoạt được xây dựng trên nền tảng của Nodejs. Nó cung cấp các tính năng mạnh mẽ để phát triển web hoặc mobile
- Các thư viện hỗ trợ việc testing: `mocha, chai, supertest`
- Để cài đặt các bạn thực hiện câu lệnh sau trong terminal của thư mục làm việc hiện tại
    ```
    npm i express mocha chai supertest
    ```
- Cấu trúc thư mục của mình như sau
![](https://images.viblo.asia/a4f80a44-ef25-4af9-a298-36f4324394f7.png)

- File index.js là đầu vào của chương trình, chạy ở port 3000. Khi truy cập ở địa chỉ `localhost:3000` sẽ trả về kết quả ở định dạng json là `{msg: 'Hello World'}` 
- Thư mục test có chứa file `example.test.js` là file thực hiện các công việc test
- Nội dung file example.test
    ```js
    const expect = require('chai').expect
    const request = require('supertest')

    const app = require('../index')

    describe('Testing at localhost', () => {
      it('testing route localhost:3000', done => {
        request(app)
          .get('/')
          .then(res => {
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('object')
            done()
          })
          .catch(err => done(err))
      })
    })

    ```
- Nội dung chính của file test sẽ là kiểm tra khi mà request đến đường dẫn localhost thì kết quả trả về có **http status code** là 200 và nội dung trả về có định dạng là **json**
# 2. Config cho debug
- Để thực hiện debug trên visual code các bạn có thể theo dõi bài viết trước của mình [tại đây.](https://viblo.asia/p/debug-nodejs-app-using-visual-code-07LKXQbrZV4)
- File cấu hình cho việc debug là `launch.json` của mình như sau
```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug mocha",
      "type": "node",
      "request": "launch",
      "program": "${workspaceRoot}/node_modules/mocha/bin/_mocha",
	    "stopOnEntry": false,
	    "args": ["test/*.test.js", "--no-timeouts"],
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": null,
      "env": { "NODE_ENV": "test"},
      "internalConsoleOptions": "openOnSessionStart",
      "skipFiles": [
        "<node_internals>/**"
      ]
    },
  ]
}
```
- Một số thông tin quan trọng
    - name: tên cho luồng debug, ở đây mình đặt là Debug mocha cho dễ hiểu
    - type: node -> môi trường chạy sẽ là trên môi trường nodejs
    - program: trỏ đến thư mục chứa thư viện mocha
        - args: trỏ đến thư mục chứa file test là `test/*.test.js`
# 3. Thực hiện debug
## a. Chọn breakpoint
![](https://images.viblo.asia/b3b3b88a-a7e7-47a4-99fe-f339df5fa487.png)
- Ở đây mình sẽ chọn breakpoint tại dòng 11 để xem kết quả trả về như thế nào
- Chọn luồng debug là Debug mocha

![](https://images.viblo.asia/1d700009-62d1-4774-9c1a-965946c613d5.png)

- Sau đó mình truy cập vào địa chỉ `localhost:3000`. Sẽ thấy chương trình dừng tại điểm breakpoint
- Ở khung variable bên cạnh chúng ta có thể thấy được các biến local.
    - `body: {msg: 'Hello World'}`
    - `status: 200`
    
    ![](https://images.viblo.asia/39f9f053-b58b-497d-91ad-f92e2c83532c.png)
    ![](https://images.viblo.asia/346ad2db-01d3-4b45-b584-724ead5e9344.png)


###  Đến đây thì chúng ta đã thực hiện xong việc debug testing trên visual code. Chúc các bạn thành công =))