![](https://images.viblo.asia/3a9d26db-791d-48f4-8cf4-c36ae79ddc6e.jpg)

**Xin chào tất cả các bạn, mình là Quân, trong bài trước, mình đã hướng dẫn cho các bạn [viết một REST API sử dụng giao diện web console của AWS](https://trungquandev.com/xay-dung-mot-rest-api-voi-nodejs-lambda-va-api-gateway-su-dung-aws-web-console/), hôm nay chúng ta sẽ không dùng nhiều giao diện web nữa mà đi vào viết một ứng dụng CRUD API sử dụng Serverless Framework và DynamoDB nhé.**

**“Bài này thuộc bài số 03 trong loạt bài [Xây dựng các ứng dụng không máy chủ với Nodejs, AWS Lambda, API Gateway, Serverless Framework và DynamoDB](https://trungquandev.com/xay-dung-cac-ung-dung-khong-may-chu-voi-nodejs-aws-lambda-api-gateway-serverless-framework-va-dynamodb/)“**

**Source Github:** **[https://github.com/trungquan17/crud-cats-api](https://github.com/trungquan17/crud-cats-api)**

Nội dung bài viết:

1. Khởi tạo project Serverless Node.js

2. Cấu hình thông tin đăng nhập AWS vào máy local

3. Viết API tạo con mèo – Create Cat

4. API gọi con mèo – Get Cat

5. API chỉnh sửa thông tin mèo – Update Cat

6. API xóa con mèo – Delete Cat

-----

### 1. Khởi tạo project Serverless Node.js

**Serverless Framework là một CLI** (Command Line Interface) mã nguồn mở mà hỗ trợ cho chúng ta triển khai các ứng dụng không có máy chủ. Xem thêm ở bài dưới để hiểu hơn về ứng dụng **không máy chủ Serverless là gì?**

**[Xin chào Serverless, chúng ta làm quen với nhau nhé?](https://trungquandev.com/xin-chao-serverless-chung-ta-lam-quen-voi-nhau-nhe/)**

Trước tiên hãy đảm bảo máy bạn đã cài **serverless** ở **global** bằng lệnh:

`npm install -g serverless`

Sau khi cài xong thì các bạn có thể sử dụng **Serverless CLI** bằng lệnh `serverless` hoặc viết tắt là `sls`, ví dụ:

`serverless -v` hoặc `sls -v`

**Tạo một project serverless node.js bằng lệnh sau:**

`sls create --template aws-nodejs --path crud-cats --name crud-cats`

![](https://images.viblo.asia/8fdbcac4-8d80-4cdb-a300-45369f843f3a.png)

**Trong đó:**

**–template:** là tên của mẫu kiến trúc có sẵn, ở đây mình chọn node.js, còn rất nhiều mẫu khác tùy theo ngôn ngữ mà bạn sử dụng ở đây:

**[https://serverless.com/framework/docs/providers/aws/cli-reference/create/](https://serverless.com/framework/docs/providers/aws/cli-reference/create/)**

**–path:** tên đường dẫn đến thư mục source code

**–name:** tên của service trong file serverless.yml

Sau khi tạo thành công thì bạn sẽ có một thư mục chứa các file tương tự như thế này:

![](https://images.viblo.asia/e5867944-10ba-40c3-8e6a-53974a510a81.png)

**.gitignore:** khai báo cho git biết những tập tin bị bỏ qua, không được push lên server.

**handler.js:** Là nơi mà chúng ta sẽ định nghĩa các hàm lambda (Lambda Function).

**serverless.yml:** Là nơi chúng ta sẽ khai báo cấu hình cho ứng dụng, file này thông thường có 3 phần chính sau:

*Provider*: Sử dụng để công khai các cấu hình cụ thể cho nhà cung cấp dịch vụ Cloud, ví dụ như cấu hình tên nhà cung cấp, môi trường runtime, khu vực sử dụng…vv

*Functions*: Chúng ta sẽ chỉ định các Function logic chức năng tại đây.

*Resources*: Phần này sẽ khai báo các tài nguyên để cho các Functions của bạn sử dụng được. Tài nguyên sẽ được khai báo bởi một dịch vụ của AWS có tên là CloudFormation.

-----

### 2. Cấu hình thông tin đăng nhập AWS vào máy local

Để có thể deploy code lên AWS thì trước tiên phải cấu hình hai thông tin đăng nhập ở máy local của bạn, đó là **Aws Access key ID** và **Secret Access Key**

Có 2 cách để làm điều này, một là [**export chúng vào biến môi trường của dự án**, hai là **cấu hình sử dụng AWS Profile**](https://serverless.com/framework/docs/providers/aws/guide/credentials/). Trong bài này, mình sẽ làm theo cách thứ nhất.

Đầu tiên, cần lấy được 2 cái key ở trên, các bạn đăng nhập vào [Aws Console](https://console.aws.amazon.com/) bằng **tài khoản root**, tìm một **service** có tên là **IAM**, vào mục **Users**.

Chọn **Add User** để tạo một tài khoản con mới và **generate key** từ chính cái tài khoản con này chứ **không nên generate key từ tài khoản root.**

![](https://images.viblo.asia/1a831563-b36d-4708-90d9-f343e88f08f7.png)

**Có 5 bước trong quá trình add user:**

**Bước 1: Set user details**

Các bạn cấu hình như mình làm ở ảnh bên dưới để bật **access key ID, secret access key và password** cho tài khoản.

![](https://images.viblo.asia/e1d662f9-8dcb-47c5-924e-42b87ee8bf37.png)

**Bước 2: Phân quyền cho user (Set permissions)**

Mình sẽ chọn **Attach existing policies directly** và cấp cho user này có quyền **Administrator** luôn đỡ phải nghĩ nhiều, vì đang ví dụ mà :D

![](https://images.viblo.asia/93361224-98f5-40f0-8b81-527d54945ccd.png)

**Bước 3: Thêm các tag**

Phần tags để **mô tả users** như vị trí làm việc, email, chức vụ…vv, thì mình **bỏ qua** nhé.

![](https://images.viblo.asia/ab104e9a-fb5d-4813-832e-483c9f8586ca.png)

**Bước 4: Review lại một lượt các cài đặt**

Các bạn có thể xem lại mọi thứ làm ở 3 bước trên kia, nếu không còn vấn đề gì thì nhấn **create user**

![](https://images.viblo.asia/5cd7e8a3-96a3-48b0-9f24-223100bca3a9.png)

**Bước 5: Nhận các thông tin bảo mật và url đăng nhập aws**

**Quan trọng**: ở bước này, các bạn cần **copy Access key ID** và **Secret access key** rồi lưu lại về máy, cũng có thể chọn **Download file .csv**

Bởi vì cái **Secret access key** chỉ cấp cho chúng ta **duy nhất một lần**, lỡ mà không nhớ thì lại phải mất công tạo lại cái khác chứ không dùng được cái này nữa.

Ngoài ra **user** và **password** thì sử dụng để khi nào cần thì các bạn đăng nhập vào aws bằng tài khoản con thay vì đăng nhập bằng tài khoản root.

![](https://images.viblo.asia/4aceb0e2-e5e6-427f-ae52-e999966526d0.png)

– Xong rồi, bây giờ thêm hai cái **Aws Access key ID và Secret Access Key** vào biến môi trường của dự án bằng lệnh sau:

`export AWS_ACCESS_KEY_ID=<your-key-here>`

`export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>`

Và kiểm tra xem đã thêm thành công hay chưa:

`printenv | grep AWS`

![](https://images.viblo.asia/e5d7eab9-2b1e-4ad2-91a1-338b99e31668.png)

Các bạn chạy thử luôn lệnh `sls deploy`, nếu push code thành công như hình bên dưới có nghĩa là 2 cái key của bạn đã được cấu hình chính xác.

![](https://images.viblo.asia/fcf39e0c-df78-443d-8b17-3accf04955d0.png)

Và trên **AWS**, truy cập vào một dịch vụ của Amazon có tên là **S3**, code của chúng ta đang nằm ở đây:

![](https://images.viblo.asia/f4d65ba1-24c2-4f6d-9a52-df95a94c3304.png)

-----

### 3. Viết API tạo con mèo – Create Cat

Để bắt đầu cho ứng dụng **CRUD Cats** này, chúng ta sẽ đi vào viết **API tạo con mèo** đầu tiên.

Trong file **serverless.yml** các bạn xóa hết code ban đầu với lại comment đi, rồi code theo mình như thế này:

**Một vài lưu ý:**

**iamRoleStatements**: nơi set quyền cho tất cả các **function**, cụ thể ở đây là cấp các quyền thao tác với cơ sở dữ liệu **DynamoDB**

**functions**: mình có tạo một function mới tên là **createCat**, path url là **/create**, nội dung code logic của function **createCat** này nằm trong file **controllers/cat.js**

```yaml
# Created by trungquandev.com's author on 05/12/2018.
 
service: crud-cats
 
provider:
  name: aws
  runtime: nodejs8.10
  region: us-east-1
  environment:
    REGION: "${self:provider.region}"
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource: "arn:aws:dynamodb:us-east-1:*:*"
        
functions:
  createCat:
    handler: controllers/cat.createCat
    events:
      - http:
          path: create
          method: post
```

Tạo một thư mục có lên là **controllers**, sau đó **di chuyển file** **handler.js** vào thư mục này, **đổi tên nó thành** **cat.js**

Tạo một thư mục có tên là **models**, tạo một file **CatModel.js** bên trong nó.

Cấu trúc thư mục bây giờ sẽ thay đổi chút như sau:

![](https://images.viblo.asia/2e0971ee-b4bb-4936-bd5c-fafc38df7dba.png)

Các bạn **init nhanh project nodejs** đồng thời cài thêm hai gói module là **dynamodb** để làm việc với cơ sở dữ liệu **DynamoDB** và **Joi** để định nghĩa các **Object Schema**:

`npm init -y`

`npm install --save dynamodb`

`npm install --save joi`

Nội dung file **controllers/cat.js**:

```javascript
/**
 * Created by trungquandev.com's author on 05/12/2018.
 * controllers/cat.js
 */
'use strict';
 
let uuid = require("uuid");
let Cat = require("../models/CatModel");
 
module.exports = {
  createCat: (event, context, callback) => {
    let body = JSON.parse(event.body); // Lấy các dữ liệu truyền lên từ body
 
    if (typeof body.name !== "string" || typeof body.kind !== "string") {
      return callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: "The name & kind of cat must be string character.",
        })
      });
    }
 
    let catItem = {
      id: uuid.v1(),
      name: body.name,
      kind: body.kind,
    };
 
    // Lưu mèo vào database
    Cat.create(catItem, (err, catResult) => {
      if (err) {
        return callback(err);
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Create cat sucessfully.",
          cat: catResult.get()
        })
      });
    });
  }
};
```

Nội dung file **models/CatModel.js**:

Lưu ý dòng code **dynamo.define(…)**, tên database ở đây chúng ta sẽ để dạng tiếng anh số ít là **cat**, nó sẽ tự hiểu với tên database số nhiều **cats** trên AWS.

```javascript
/**
 * Created by trungquandev.com's author on 05/12/2018.
 * models/CatModel.js
 */
 
let Joi = require("joi");
let dynamo = require("dynamodb");
 
class Cat {
  constructor() {
    this.tableName = "cat";
    this.tableSchema = dynamo.define(this.tableName, {
      hashKey: "id",
      timestamps: false,
      schema: {
        id: Joi.string(),
        name: Joi.string(),
        kind: Joi.string(),
        createdAt: Joi.number().default(new Date().getTime()),
      }
    });
  }
 
  create(item, callback) {
    return this.tableSchema.create(item, callback);
  }
}
 
// export default new Cat();
module.exports = new Cat();

```

Tiếp theo các bạn **đăng nhập vào AWS**, tìm một service có tên là **DynamoDB**, chọn vào **Tables** ở menu bên phải và nhấn **Create Table**

**Lưu ý tên database** mình sẽ để ở dạng số nhiều trong tiếng anh: **cats**

![](https://images.viblo.asia/d68f2278-c388-4693-9bc9-a0006e04c772.png)

Quay lại thư mục dự án, chạy lệnh deploy:

`sls deploy`

Lần deploy này đã xuất hiện **url endpoint**, đây là url để chúng ta **thực thi api**, nó sẽ luôn cố định không bị thay đổi trừ khi nào các bạn **restart API Gateway.**

![](https://images.viblo.asia/02e3dd3d-f4de-4bd3-9130-7f95f33d19e2.png)

**Kết quả test API bằng Postman:**

![](https://images.viblo.asia/1c1ac7fe-d5b2-4618-9181-aa19254637d4.png)

Các bạn cũng có thể quay lại trang service **DynamoDB trên AWS**, vào mục **Items** của bảng **cats** để xem dữ liệu đã được ghi vào thành công hay chưa:

![](https://images.viblo.asia/03f82915-24c7-4817-80be-bfb75f187f6f.png)

-----

### 4. API gọi con mèo – Get Cat

May quá mấy cái phần dài dòng qua hết rồi, từ giờ chỉ có code ngắn gọn thôi =))

Trong file **serverless.yml**, định nghĩa thêm một function **getCatById**, method là **GET**, path là **cat/{id}**

```yaml
getCatById:
    handler: controllers/cat.getCatById
    events:
      - http:
          path: cat/{id}
          method: get
```

Trong **controllers/cat.js**, thêm function **getCatById**

```javascript
getCatById: (event, context, callback) => {
    // Lấy id truyền lên từ url
    let catId = event.pathParameters.id;
 
    // Gọi mèo từ database
    Cat.getById(catId, (err, catResult) => {
      if (err) {
        return callback(err);
      }
      if (!catResult) {
        return callback(null, {
          statusCode: 404,
          body: JSON.stringify({
            error: "Cat not found!",
          })
        });
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          cat: catResult.get()
        })
      });
    });
  }
```

Trong **models/CatModel.js** thêm function **getById**

```javascript
getById(id, callback) {
  return this.tableSchema.get(id, callback);
}
```

**Kết quả:**

![](https://images.viblo.asia/0801248f-f27b-474d-a76c-591bee7c72a0.png)

-----

### 5. API chỉnh sửa thông tin mèo – Update Cat

Trong file **serverless.yml**, định nghĩa thêm một function **updateCatById**, method là **PUT**, path là **cat/{id}/update**

```yaml
updateCatById:
    handler: controllers/cat.updateCatById
    events:
      - http:
          path: cat/{id}/update
          method: put
```

Trong **controllers/cat.js**, thêm function **updateCatById**

```javascript
updateCatById: (event, context, callback) => {
    let catId = event.pathParameters.id;
    let body = JSON.parse(event.body);
 
    let catItem = {
      id: catId,
      name: body.name,
      kind: body.kind,
    };
 
    // Trong dự án thực tế thì hãy tìm con mèo trước, nếu tồn tại thì mới cho update.
    Cat.update(catItem, (err, catResult) => {
      if (err) {
        return callback(err);
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Update cat sucessfully.",
          cat: catResult.get()
        })
      });
    });
  }
```

Trong **models/CatModel.js** thêm function **update**

```javascript
update(newItem, callback) {
    return this.tableSchema.update(newItem, callback);
}
```

**Kết quả: (các bạn cũng có thể kiểm tra trên AWS)**

![](https://images.viblo.asia/3265368a-9535-43d6-ba67-d85fbd9da7b6.png)

-----

### 6. API xóa con mèo – Delete Cat

Trong file **serverless.yml**, định nghĩa thêm một function **deleteCatById**, method là **DELETE**, path là **cat/{id}/delete**

```yaml
deleteCatById:
    handler: controllers/cat.deleteCatById
    events:
      - http:
          path: cat/{id}/delete
          method: delete
```

Trong **controllers/cat.js**, thêm function **deleteCatById**

```javascript
deleteCatById: (event, context, callback) => {
    let catId = event.pathParameters.id;
 
    // Trong dự án thực tế thì hãy tìm con mèo trước, nếu tồn tại thì mới cho delete.
    Cat.deleteById(catId, (err) => {
      if (err) {
        return callback(err);
      }
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Delete cat sucessfully."
        })
      });
    });
  }
```

Trong **models/CatModel.js** thêm function **deleteById**

```javascript
deleteById(id, callback) {
    return this.tableSchema.destroy(id, callback);
}
```

**Kết quả: (các bạn cũng có thể kiểm tra trên AWS)**

![](https://images.viblo.asia/b6404fd3-bdc3-45c6-a17c-2f5f019a93e7.png)

-----

Như vậy là mình đã hướng dẫn xong cho các bạn quá trình **[viết một CRUD API sử dụng Serverless framework, Node.js, DynamoDB và đẩy lên AWS](https://trungquandev.com/viet-mot-crud-api-su-dung-serverless-framework-dynamodb)**. Bài tiếp theo chúng ta sẽ đi tìm hiểu **CORS là gì** và **cấu hình CORS** cho ứng dụng **CRUD Cats** này.

Xin chào và hẹn gặp lại các bạn ở những bài viết tiếp theo.

**[Best Regards – Trung Quân – Green Cat](https://trungquandev.com/)**

-----

*Tham khảo kiến thức:*

https://github.com/baseprime/dynamodb

https://serverless.com/framework/docs/providers/aws/cli-reference/create/

“Thanks for awesome knowledges.”