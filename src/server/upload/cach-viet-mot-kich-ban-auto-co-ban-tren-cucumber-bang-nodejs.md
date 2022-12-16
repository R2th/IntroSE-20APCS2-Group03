## **I. Định nghĩa về cucumber**

### 1. Định nghĩa cucumber 
Cucumber là một công cụ , cái để hỗ trợ " Behaviour-Driven deverlopment (BDD) .  Cucumber là một công cụ hỗ trợ ngôn ngữ hành vi người dùng hay Behaviour-Driven Development(BDD) tên tiếng anh.
Cucumber đọc các thông số kỹ thuật thực thi được viết bằng văn bản thuần túy và xác nhận rằng phần mềm thực hiện những gì các thông số kỹ thuật . Các thông số kỹ thuật bao gồm nhiều ví dụ hoặc nhiều tình huống

>  Scenario: Login thành công vào hệ thống
>  
>  Given Đã mở trang login 
>  
>  When Nhập đúng email và password
>  
> Then Login vào trong hệ thống
>   

Mỗi kịch bản là một dánh sách các bước để Cucumber thực hiện. Cucumber xác minh rằng phần mềm phù hợp với những đặc điểm kĩ thuật và tạo ra một báo cáo chỉ ra rằng  thành công hoặc thất bài cho từng tình huống.

Để cho Cucumber hiểu được kịch bản, chúng cần tuân thủ một số luật cơ bản gọi đó là Gherkin


### 2. Định nghĩa Gherkin

Gherkin là một tập hợp các quy tắc ngữ pháp làm cho văn bản thuần túy có cấu trúc đủ để Cucumber hiểu. Kịch bản trên được viết bằng Gherkin.

Gherkin phục vụ cho nhiều mục đích :

Đặc tả thực thi rõ ràng

Kiểm tra tự động bằng Cucumber

Bộ văn bản ghi lại cách hệ thống hoạt động với hành vi thực 

Ngôn ngữ Cucumber tồn tại trong ngôn ngữ khác nhau để bạn có thể sự dụng những từ khóa bằng ngôn ngữ riêng bạn.

### 3. Định nghĩa Step Definitions

Step Definitions là bước kết nối với Ghenkin với ngôn ngữ lập trình. Các bước definition thực hiện các hành động cần được thực hiện theo bước. Vì vậy, definitions giúp củng cố đặc đểm kỹ thuật cho việc triển khai.

## II. Thành phần tạo kịch bản cho cucumber

Để viết một kịch bản cucumber tự động ta cần thực hiện các bước sau: 

1. Cài đặt cucumber 

2.  Viết đoạn kịch bản ( Scenario) ngôn ngữ người dùng Ghenkin 

3.  Chuyển đổi các bước người dùng bằng cách khai báo bằng các ngôn ngữ như Javascrips, Java , nodejs,..

4. Chạy test 

## III. Cách viết kịch bản bằng nodejs

1. Chuẩn bị trước khi viết kịch bản auto 

Tước khi bắt đầu bạn cần chuẩn bị 

Note.js: Link cài: https://nodejs.org/en/

1 bộ trình soạn thảo code như : Visual studio code

Mở 1 terminal để xác định rằng Node.js đã được cài đặt bằng câu lệnh : 

> node -v
> 
> npm -v

Tạo một dự án Cucumber rỗng 

Đầu tiên chúng ta sẽ tạo một thư mục mới và một Node.js projects mới 

+ Tạo 1 file --> mở teminal ( ví dụ git bash here ) --> nhập npm init --yes chúng ta đã cài được package.json của porject 

Thêm các phần phụ thuộc của Cucumber 

Lệnh 

> npm install --save-dev @cucumber/cucumber

Mở package-json trong phần soạn văn bản code và thay đổi "test" giống dưới đây:

> {
>   "name": "newproject",
>   "version": "1.0.0",
>   "description": "",
>   "main": "index.js",
>   "scripts": {
>     "test": "cucumber-js"
>   },
>   "author": "",
>   "license": "ISC",
>   "devDependencies": {
>     "@cucumber/cucumber": "^7.3.0"
>   }
> }

Chuẩn bị thư mục 

> mkdir features
> mkdir features/step_definitions
> 
Tạo một file cucumber.js tại root của project của bạn theo nội dung là :

> module.exports = {
>   default: `--format-options '{"snippetInterface": "synchronous"}'`
> }
> 
Do vậy, tạo 1 file gọi đến features/step_definitions/stepdefs.js với nội dung là 

> const assert = require('assert');
> const { Given, When, Then } = require('@cucumber/cucumber');
> 
Bây giờ bạn có một project nhỏ với Cucumber đã được cài đặt.

Để verify cucumber đã cài đặt bạn cần nhập lệnh sau để kiểm tra 

Để đàm bảo mọi thứ đã hoạt động bạn nhập 1 trong 2 câu lệnh này  

>   #Run via NPM 
>   
>   npm test
>   
>   #Run standalon 
>   
>   npx cucumber - js

Kết quả hiển thị là 

>  0 Scenarios
> 0 steps
> 0m00.000s

2. Ví dụ tiêu biểu viết 1 kịch bản test google 

Khi chúng ta làm BDD với Cucumber chúng ta có thể sự dụng một ví dụ để làm rõ vấn đề đó. Một Scenarios được viết trước khi thực hiện viết code. Họ bắt đầu giống như thực thi của người dùng thực thi một cách đặc biệt

Ví dụ kịch bản test cho google tìm tư khóa cucumber trong google 

a. Tạo file rỗng trong features/ test_search_cucumber_with_google

Feature: Test Google
description ahcjacja

Scenario: Test google search Cucumber
Given open google.com
When search Cucumber
Then Get results with Cucumber

Kiểm tra kịch bản lệnh mpn test 

kết quả hiển thị : 

0 scenarios
0 steps

b. Chuyển đổi bước của bạn sang code này 

const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
 const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
 require("chromedriver");

 // driver setup
 const capabilities = Capabilities.chrome();
 capabilities.set('chromeOptions', { "w3c": false });
 const driver = new Builder().withCapabilities(capabilities).build();

 Given('open google.com', async function () {
    await driver.get('https://www.google.com');
 });

 When('search Cucumber', async function () {
    const element = await driver.findElement(By.name('q'));
    await element.sendKeys('Cucumber')
    await element.sendKeys(Key.ENTER)
 })

 Then('Get results with Cucumber', async function () {
    const h3 = await driver.findElement(By.css('h3'))
    const title = await h3.getText()
    assert.strictEqual(title.startsWith('CUCUMBER'), true)
    await driver.quit()
 })

3. Chạy kịch bản auto

Nhập mpn test 

hiển thị hết quả 


![](https://images.viblo.asia/347910d2-1ce1-4240-ae78-e0fa0c8ac4ed.PNG)











```
```