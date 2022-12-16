Trong bài viết này mình sẽ hướng dẫn nhanh các nội dung sau:
* Cài đặt Cucumber
* Viết Test Scenario theo format Gherkin
* Tạo step definition bằng JavaScript
* Chạy Cucumber
* Tìm hiểu nhanh về Behaviour-Driven Development (BDD)

Cụ thể, chúng ta sẽ sử dụng Cucumber để phát triển 1 thư viện nhỏ để check xem ngày hôm nay có phải là thứ 6 hay không.

Trước tiên, bạn sẽ cần cài đặt **Node.js** (quá trình cài đặt *Node.js* sẽ tự động cài thêm **npm**). Check kết quả sau khi cài xong:
```
node -v
npm -v
```
-----

# Tạo một project Cucumber
1. Tạo thư mục của project `hellocucumber`
```
mkdir hellocucumber
cd hellocucumber
```
2. Khởi tạo một project trống:
```
npm init --yes
```
3. Thêm Cucumber như là một development dependency:
```
npm install cucumber --save-dev
```
4. Mở file package.json trong thư mục `hellocucumber` và sửa dòng:
```
"test": "echo \"Error: no test specified\" && exit 1"
```
thành:
```
"test": "cucumber-js"
```
5. Tạo thêm các thư mục để lưu trữ file sau này:
```
mkdir features
mkdir features/step_definitions
```
6. Tạo file `cucumber.js` trong thư mục `hellocucumber` với nội dung:
```
module.exports = {
  default: `--format-options '{"snippetInterface": "synchronous"}'`
}
```
7. Tạo file ```stepdefs.js``` trong thư mục ```features/stepdefinitions ```với nội dung sau:
```
const assert = require('assert');
const { Given, When, Then } = require('cucumber');
```
Vậy là bạn đã tạo xong một project đơn giản bằng Cucumber.

# Kiểm tra việc cài đặt Cucumber
Chạy Cucumber
```
# Run bằng NPM
npm test

# Run standalone
./node_modules/.bin/cucumber-js
```
Kết quả cho thấy không có Scenarios nào để run cả:
```
0 Scenarios
0 steps
0m00.000s
```
# Viết Scenario
Khi làm **Behaviour-Driven Development (BDD)** cho Cucumber thì cần xác định rõ chúng ta muốn Cucumber làm những công việc gì. Các Scenarios có thể được coi như 1 dạng living spec\requirement hay kịch bản để làm automation test sau này.

Trong Cucumber, mỗi test case được gọi là một **Scenario**. Các scenarios sẽ được define trong file `.feature` tại thư mục `features` .

Ví dụ về một test case : *Sunday isn’t Friday.*

Tạo file `check-friday.feature` trong thư mục `features` với nội dung:
```
Feature: Check Friday
  This feature is to check when it's Friday
  
    Scenario: Sunday isn't Friday
    Given today is Sunday
    When I ask whether it's Friday yet
    Then I should be told "Nope"
```

Trong đó:
* Dòng thứ nhất bắt đầu bằng từ khóa `Feature:`  Chức năng cần test là gì (nên đặt giống tên file)
* Dòng thứ 2: Mô tả ngắn gọn về cái feature này, Cucumber sẽ ko execute dòng này, chỉ là để giải thích thôi.
* Dòng thứ 3: Để trống
* Dòng thứ 4: Bắt đầu bằng từ khóa `Scenario:` Đây được gọi là một scenario (một testcase).
* 3 dòng tiếp theo bắt đầu bằng `Given`,`When` và `Then` được coi như các steps của testcase. Cucumber sẽ execute các dòng này.
# Lỗi scenario: undefined
Sau khi viết xong scenario, chúng ta có thể cho Cucumber execute scenario đó luôn.
```
nmp test
```
Cucumber trả về kết quả có 1 scenario và  3 steps bị undefined và nó cũng gợi ý luôn các snippets để define các steps này:
```
UUU

Warnings:

1) Scenario: Sunday isn't Friday # features/check-friday.feature:4
   ? Given today is Sunday
       Undefined. Implement with the following snippet:

         Given('today is Sunday', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
       
   ? When I ask whether it's Friday yet
       Undefined. Implement with the following snippet:

         When('I ask whether it\'s Friday yet', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
       
   ? Then I should be told "Nope"
       Undefined. Implement with the following snippet:

         Then('I should be told {string}', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
       

1 scenario (1 undefined)
3 steps (3 undefined)
0m00.000s
npm ERR! Test failed.  See above for more details.
```

Copy các snippets này và paste vào file `stepdefs.js` trong thư mục `features/step_definitions`
# Lỗi scenario: pending
Tiếp tục run lại Cucumber lần thứ 2, cùng check kết quả
```
P--

Warnings:

1) Scenario: Sunday isn't Friday # features/check-friday.feature:4
   ? Given today is Sunday # features/step_definitions/stepdefs.js:4
       Pending
   - When I ask whether it's Friday yet # features/step_definitions/stepdefs.js:9
   - Then I should be told "Nope" # features/step_definitions/stepdefs.js:14

1 scenario (1 pending)
3 steps (1 pending, 2 skipped)
0m00.002s
npm ERR! Test failed.  See above for more details.
```
Kết quả như này có nghĩa là Cucumber đã tìm thấy các step definitions và execute chúng (gán status là Pending), tuy nhiên chúng ta vẫn cần cải thiện thêm các step defenitions này.
# Lỗi scenario: failed
Sửa lại file step definition thành:
```
const assert = require('assert');
const { Given, When, Then } = require('cucumber');

function isItFriday(today) {
  // Tạm thời để trống phần này
}

Given('today is Sunday', function () {
  this.today = 'Sunday';
});

When('I ask whether it\'s Friday yet', function () {
  this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer) {
  assert.equal(this.actualAnswer, expectedAnswer);
});
```
Run lại Cucumber lần nữa:
```
..F

Failures:

1) Scenario: Sunday isn't Friday # features/check-friday.feature:4
   ✔ Given today is Sunday # features/step_definitions/stepdefs.js:8
   ✔ When I ask whether it's Friday yet # features/step_definitions/stepdefs.js:12
   ✖ Then I should be told "Nope" # features/step_definitions/stepdefs.js:16
       AssertionError [ERR_ASSERTION]: undefined == 'Nope'
           at World.<anonymous> (/home/nguyen.minh.sang/projects/hellocucumber/features/step_definitions/stepdefs.js:17:10)

1 scenario (1 failed)
3 steps (1 failed, 2 passed)
0m00.002s
npm ERR! Test failed.  See above for more details.
```
Yay, đã có chút tiến triển, 2 steps đầu tiên đã passed, giờ chỉ còn fail step cuối thôi.
# Scenario: passed
Giải pháp đơn giản nhất chính là để cho function của chúng ta return giá trị `Nope` là xong.
```
function isItFriday(today) {
  return 'Nope';
}
```
Cùng run lại Cucumber phát nữa:
```
...

1 scenario (1 passed)
3 steps (3 passed)
0m00.001s
```
Xongggg!!! Testcase đã Passed :D
# Add thêm scenario 
Bước tiếp theo chúng ta cần làm đó là cho biết kết quả chính xác khi nào thì đúng là Friday.
Tiếp tục thêm 1 scenario vào file `check-friday.feature`:
```
Feature: Check Friday
  This feature is to check when it's Friday

  Scenario: Sunday isn't Friday
    Given today is Sunday
    When I ask whether it's Friday yet
    Then I should be told "Nope"

  Scenario: Friday is Friday
    Given today is Friday
    When I ask whether it's Friday yet
    Then I should be told "TGIF"
```
Đừng quên thêm cả step definition nữa
```
Given('today is Friday', function () {
  this.today = 'Friday';
});
```
Rồi run lại Cucumber và kết quả là fail :(
```
.....F

Failures:

1) Scenario: Friday is Friday # features/check-friday.feature:9
   ✔ Given today is Friday # features/step_definitions/stepdefs.js:20
   ✔ When I ask whether it's Friday yet # features/step_definitions/stepdefs.js:12
   ✖ Then I should be told "TGIF" # features/step_definitions/stepdefs.js:16
       AssertionError [ERR_ASSERTION]: 'Nope' == 'TGIF'
           + expected - actual

           -Nope
           +TGIF
       
           at World.<anonymous> (/home/nguyen.minh.sang/projects/hellocucumber/features/step_definitions/stepdefs.js:17:10)

2 scenarios (1 failed, 1 passed)
6 steps (1 failed, 5 passed)
0m00.003s
npm ERR! Test failed.  See above for more details.
```
Đó là do chúng ta chưa implement logic.

Tiếp tục update lại phần step definition
```
function isItFriday(today) {
  if (today === "Friday") {
    return "TGIF"; 
  } else {
    return "Nope";
  }
}
```
Run lại Cucumber:
```
......

2 scenarios (2 passed)
6 steps (6 passed)
0m00.000s
```
# Sử dụng các variables và examples:
Một tuần không chỉ có mỗi Friday và Sunday, vậy nên chúng ta sẽ cần sử dụng tới variables và examples để cover được tất cả các ngày.

Hãy update lại file `check-friday.feature`, chú ý là đổi keyword `Scenario` thành `Scenario Outline` khi sử dụng nhiều examples:
```
Feature: Check Friday
  This feature is to check when it's Friday

  Scenario Outline: Today is or is not Friday
    Given today is "<day>"
    When I ask whether it's Friday yet
    Then I should be told "<answer>"

  Examples:
    | day | answer |
    | Friday | TGIF |
    | Sunday | Nope |
    | anything else! | Nope |
```
Sau đó sửa lại cả file step definition, sử dụng biến <day> như một String
```
const assert = require('assert');
const { Given, When, Then } = require('cucumber');

function isItFriday(today) {
  if (today === "Friday") {
    return "TGIF";
  } else {
    return "Nope";
  }
}

Given('today is {string}', function (givenDay) {
  this.today = givenDay;
});

When('I ask whether it\'s Friday yet', function () {
  this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer) {
  assert.equal(this.actualAnswer, expectedAnswer);
});
```

Run lại Cucumber:
```
.........

3 scenarios (3 passed)
9 steps (9 passed)
0m00.002s
```
# Refactoring
* Các bạn nên để các function (ví dụ: isItFriday) vào 1 file .js riêng và để step definition vào 1 file riêng để tiện quản lý.
* Ngoài ra còn có thể export các function này ra để sử dụng ở nhiều nơi

# Tổng kết
Trong bài tutorial siêu ngắn này thì mình đã giới thiệu qua về cách cài đặt Cucumber, cách làm việc theo BDD process để viết một function siêu đơn giản có thể check được 1 vài scenarios.
Chúc các bạn thành công!

Link tham khảo: https://docs.cucumber.io/guides/10-minute-tutorial/