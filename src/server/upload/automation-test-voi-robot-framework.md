![](https://images.viblo.asia/8b28fc11-f7e8-408f-b101-120002ca6605.png)

Trong thực tế khi làm dự án, chúng ta phải đối mặt với những tình huống cần kiểm thử theo nhiều dạng khác nhau. Đôi khi có những tình huống không chỉ Tester hoặc Developer nghĩ ra mà còn từ cả phía Khách Hàng, vậy làm sao để chúng ta có thể kiểm thử một cách dễ dàng và hiệu quả hơn. Hãy thử tìm hiểu về Robot Framework.

## **I. Cài đặt**
Robot Framework được viết bằng Python nên nó hỗ trợ trên chạy trên cả Jython (JVM), IronPython (.NET) and PyPy. Để đơn giản ta cài đặt:
* Python:
[https://www.python.org/downloads](https://www.python.org/downloads)
* pip: [https://pip.pypa.io/en/stable/installing](https://pip.pypa.io/en/stable/installing)

Sau đó gõ lệnh dưới để cài:
```
pip install robotframework
```
## **II. Cấu trúc**
Thành phần cơ bản của một file kịch bản của Robot Framework gồm 3 phần chính: **Settings**, **Test Cases** và **Keywords.**

### 1. Settings
Phần ***Settings*** sẽ định nghĩa các thành thiết lập khởi đầu cho kịch bản, như là mô tả xem nó sẽ làm gì, dùng thư viện nào.
```
*** Settings ***
Documentation     A test suite containing tests related to invalid login.
...
...               These tests are data-driven by their nature. They use a single
...               keyword, specified with Test Template setting, that is called
...               with different arguments to cover different scenarios.
...
...               This suite also demonstrates using setups and teardowns in
...               different levels.

Suite Setup       Open Browser To Login Page
Suite Teardown    Close Browser

Test Setup        Go To Login Page
Test Template     Login With Invalid Credentials Should Fail

Library           Selenium2Library
Resource          resource.robot
```
Như VD ở trên ta có thể thấy gồm các thành phần:

* **Documentation**: Mô tả khái quát về nội dung test.

* **Suite Setup/Teardown**: Gọi đến các Keywords để khi bắt đầu/kết thúc chạy test.

* **Resource**: Import các file khác để tái sử dụng lại các Keywords.

* **Library**: Import các thư viện hỗ trợ test.

### 2. Test Cases
Phần ***Test Cases*** là phần chính bao gồm các trường hợp cần test, trong phần này ta chỉ cần gọi các Keywords để chúng chạy và kiểm tra xem Output có đúng với Expected không.

Normal Syntax:
```
*** Test Cases ***
Valid Login
    Open Browser To Login Page
    Input Username    demo
    Input Password    mode
    Submit Credentials
    Welcome Page Should Be Open
    [Teardown]    Close Browser
```
Đặc biệt với phần Gherkin bên dưới, cách viết rất gần với ngôn ngữ tự nhiên nên hoàn toàn có thể để Khách Hàng viết Test Case trước, sau đó chúng ta sẽ implement sau đó, rất dễ dàng và hiệu quả.

Gherkin Syntax:
```
*** Test Cases ***
Valid Login
    Given browser is opened to login page
    When user "demo" logs in with password "mode"
    Then welcome page should be open
```
Data-driven Syntax:
```
*** Test Cases ***               USER NAME        PASSWORD
Invalid Username                 invalid          ${VALID PASSWORD}
Invalid Password                 ${VALID USER}    invalid
Invalid Username And Password    invalid          whatever
Empty Username                   ${EMPTY}         ${VALID PASSWORD}
Empty Password                   ${VALID USER}    ${EMPTY}
Empty Username And Password      ${EMPTY}         ${EMPTY}
```
### 3. Keywords
***Keywords*** là các step từ chuẩn bị cho đến việc kiểm tra kết quả, Robot là thế giới của các keywords. Trong keywords chúng ta cũng gọi đến những keywords khác để thực hiện các xử lý.
```
*** Keywords ***
Login With Invalid Credentials Should Fail
    [Arguments]    ${username}    ${password}
    Input Username    ${username}
    Input Password    ${password}
    Submit Credentials
    Login Should Have Failed

Login Should Have Failed
    Location Should Be    ${ERROR URL}
    Title Should Be    Error Page
```
Bản thân các Keywords có thể nhận các đối số để sử dụng trong các trường hợp tương tự nhau, ví dụ như nhập Input Text, Submit Form,... Ngoài ra các keywords hoàn toàn có thể định nghĩa tự do bằng bất cứ ngôn ngữ nào, chỉ cần phần *Test Cases* gọi đúng như vậy là được.
## III. Các thành phần khác
### 1. Variables
Tích hợp biến vào giúp việc code cũng như maintain test dễ dàng hơn nhiều. Thích hợp nhất cho Data-driven Test.
```
*** Variables ***
${SERVER}         localhost:7272
${BROWSER}        Firefox
${DELAY}          0
${VALID USER}     demo
${VALID PASSWORD}    mode
${LOGIN URL}      http://${SERVER}/
${WELCOME URL}    http://${SERVER}/welcome.html
${ERROR URL}      http://${SERVER}/error.html
```
### 2. Tags
***Tags*** giúp cho việc chạy test hiệu quả hơn, cụ thể hơn và tránh lặp lại toàn bộ quy trình khi ta cần test một phần cụ thể.
```
*** Test Cases ***
With own tags
    [Documentation]    This test has tags not_ready, owner-mrx and req-42.
    [Tags]    owner-mrx    not_ready
    No Operation

Own tags with variables
    [Documentation]    This test has tags host-10.0.1.42 and req-42.
    [Tags]    host-${HOST}
    No Operation

Empty own tags
    [Documentation]    This test has only tag req-42.
    [Tags]
    No Operation

Set Tags and Remove Tags Keywords
    [Documentation]    This test has tags mytag and owner-john.
    Set Tags    mytag
    Remove Tags    smoke    req-*
```
## IV. Libraries
Robot Framework cũng có rất nhiều thư viện hỗ trợ, đối với các thư viện đã có sẽ cũng cấp các tài liệu về cách sử dụng các keywords phục vụ cho việc test. Các thư viện hầu hết được cũng cấp trên pip và bạn chỉ cần gõ lệnh để cài.

Ví dụ nếu ta muốn cài thư viện Selenium2Library thì chỉ cần gõ:
```
pip install robotframework-selenium2library
```
Ngoài ra chúng ta có thể tự viết thư viện riêng với Python hoặc Java, phần này mình sẽ nói cụ thể hơn ở bài viết tiếp theo.
## Tham khảo
* Tài liệu: [http://robotframework.org/#documentation](http://robotframework.org/#documentation)
* Thư viện: [http://robotframework.org/#libraries](http://robotframework.org/#libraries)