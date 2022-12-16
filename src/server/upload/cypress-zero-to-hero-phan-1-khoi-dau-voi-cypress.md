> Cypress can test anything that runs in a browser.

Đây sẽ là chuỗi bài viết về cypress từ cơ bản đến nâng cao (maybe). :joy: Nếu có gì không hiểu, sai sót, đừng ngần ngại comment phản hồi nhé. <3

Cypress là một công cụ test trên frontend cho web. Đây là công cụ thuộc thế hệ tiếp theo sau [Selenium](https://www.selenium.dev/), hỗ trợ mạnh mẽ và khắc phục những khó khăn QA, dev đang gặp phải.

Trên Cypress, bạn có thể viết các loại test như:
* End-to-end test
* Integration test
* Unit test

Cypress có thể:
* Set up test (cài đặt chạy test) dễ dàng, đơn giản: Chúng ta không cần phải cấu hình bất cứ máy chủ, driver, thư viện phụ thuộc nào để sử dụng cypress, hay chạy test. Chỉ cần cài đúng cypress là bạn có thể viết chạy test ngay sau đó.
* Writing test (viết test): Viết test trên cypress vô cùng dễ dàng, và dễ đọc, dễ hiểu. Bởi vì cách đặt tên các API, các ngôn ngữ viết test mà cypress hỗ trợ đều được đặt tên dễ hiểu. Đọc các file test này như một đoạn văn diễn dịch gần gũi với ngôn ngữ con người vậy. :nerd_face:
* Running test (chạy test): Cypress có thể chạy test bất cứ lúc nào bạn muốn và bạn sẽ có thể theo dõi việc chạy thực tế như nào trên trình duyệt.
* Debugging test: Khi theo dõi chạy test của cypress trên trình duyệt, thì bạn cũng dễ dàng tìm hiểu về bug khi nó bị phát hiện. Cypress cung cấp một giao diện rất trực quan cho việc debug này.

## Cài đặt cypress
Có nhiều cách để cài đặt cypress và tùy biến nó. Các bạn có thể tham khảo tại [đây](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements).
Một số cách cài đặt phổ biến như:
```
npm install cypress --save-dev
```
```
yarn add cypress --dev
```
## Khởi động cypress
```
npx cypress open
```
hoặc
```
yarn run cypress open
```
Các bạn có thể rút ngắn câu lệnh chạy cypress bằng cách tùy biến lại câu lệnh mình mong muốn trong trường `script` trong `package.json` như sau.
```json:package.json
{
  "scripts": {
    "cypress:o": "cypress open"
  }
}
```
Sau đó các bạn có thể khởi chạy như sau:
```
npm run cypress:o
```
```
yarn run cypress:o
```
## Viết file test đầu tiên
Khi chạy câu lệnh mở cypress lần đầu thì cypress cũng đồng thời khởi tạo thư mục `cypress` ở ngay trong thư mục dự án của bạn. 

![](https://images.viblo.asia/a5fddfc1-3ce8-4243-846a-4dd62a60cde2.png)

Chúng ta sẽ đề cập tới cấu trúc thư mục của cypress ở các bài viết sau. Đầu tiên, hãy cứ hiểu các file test của chúng ta sẽ được viết trong thư mục `cypress/integration`

### Tạo file test
Hãy tạo một file test bằng câu lệnh.
```
touch {your_project}/cypress/integration/sample_spec.js
```
Kiểm tra lại cửa sổ ứng dụng cypress xem đã tự động cập nhật file test đó chưa. Nếu các bạn đã mở cửa sổ cypress trước đó bằng câu lệnh ở phần **Khởi động cypress**, thì cửa sổ này sẽ luôn tự động cập nhật tất cả các thay đổi trong thư mục `cypress/` như việc thêm mới file test, sửa file test,...

Hãy click chạy thử file test `sample_spec.js` và xem kết quả.
![](https://images.viblo.asia/a1e25540-f085-4d0c-8397-0d7d8615807d.png)

Một cửa sổ chrome sẽ được mở lên với giao diện debug test của cypress vô cùng trực quan. Và thông báo ở đây cũng vô cùng dễ hiểu, ` No tests found in your file` có thể hiểu đơn giản là `Chưa có test case nào được đặc tả trong file test này`. Giờ hãy close tab đó lại thử chuyển sang trình duyệt khác và chạy. Bạn có thể lựa chọn trình duyệt mong muốn chạy test ở cửa sổ cypress.
![](https://images.viblo.asia/862b1da0-4b17-4c5f-8991-93bca66bc120.png)
Số lượng trình duyệt  khả dụng sẽ phụ thuộc vào máy bạn đang cài các trình duyệt nào.
### Viết những dòng test đầu tiên
#### Viết một test case hợp lệ
```js:cypress/integration/sample_spec.js
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})
```
Thông thường một file test này sẽ test một chức năng cụ thể với vô vàn test case. Trong các file này, chúng ta cũng sẽ triển khai với cấu trúc cơ bản như sau.
* `describe()`: Có thể hiểu là bạn đang mô tả một `"suite"`. Đây là một thuật ngữ mà không biết dịch là gì 😞. Tạm thời hiểu đơn giản `"suite"` là tập các test case.
* `it()`: Sẽ chính là để chúng ta mô tả testcase đó sẽ làm gì và tạo ra các assertion (xác thực tính đúng đắn của dữ liệu)
* Và cặp `describe()` và `it()` là chúng tra đang viết theo hướng thiết kế test là Behaviour Driven Development (BDD). Các bạn có thể đọc thêm về TDD và BDD tại [đây](https://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/). Trong trường hợp trên, behaviour ở đây là nội dung chức năng chúng ta sẽ test.
* Các method sử dụng trong file test cũng vô cùng dễ hiểu `expect(true).to.equal(true)` mong muốn giá trị `true` sẽ bằng với giá trị `true`.

Save file và chạy file test, ta sẽ được kết quả.
![](https://docs.cypress.io/img/guides/first-test.88031830.png)
#### Viết một test case không hợp lệ
```js:cypress/integration/sample_spec.js
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(false)
  })
})
```
Kết quả chạy test.
![](https://docs.cypress.io/img/guides/failing-test.971461e3.png)

Trong các phần code trên, chúng ta thấy có thể sử dụng các hàm của các framwork test như `describe` và  `it` của [Mocha](https://mochajs.org/) và `expect` của [Chai](http://www.chaijs.com/). Cypress sẽ tối ưu hóa ưu điểm từ các thư viện trên và tích hợp chúng, các bạn có thể xem thêm các method sử dụng được, hay được cải biên như thế nào tại [đây](https://docs.cypress.io/guides/references/bundled-tools.html#Mocha).
### Thực hành viết file test kiểm tra cái gì đó thực sự
Thông thường một test case cơ bản sẽ bao gồm các phase (chặng) sau:

* P1: Khởi tạo các trạng thái (state) ban đầu hay thiết lập các dữ liệu ban đầu (dữ liệu input) để sử dụng test.  
    * Ví dụ: Việc bạn tiến hành truy cập một trang web ReactJS thì cũng đã tương ứng với việc khởi tạo state ban đầu rồi đấy.
* P2: Thực hiện tương tác (mô phỏng thao tác của người dùng thực tế)
* P3: Confirm xem dữ liệu bằng các [assertion](https://docs.cypress.io/guides/references/assertions.html#Chai) (phép khẳng định) như `expect, should,...` và các chainer.

Tóm lại, ban đầu chúng ta sẽ thiết lập ứng dụng web của mình ở trạng thái (dữ liệu) nào đó. Sau đó thực hiện các tương tác mà gây thay đổi trạng thái (dữ liệu) của web. Cuối cùng là **thực hiện** kiểm tra xem kết quả của trạng thái (dữ liệu) có y như mong muốn hay không.

Bây giờ bắt tay vào thực hành ngay nào, các bước thực tế khi viết cypress:
* Bước 1: (P1) Truy cập trang web.
* Bước 2: (P2) Lấy được một element trên trang web đó.
* Bước 3: (P2) Tương tác với element đó.
* Bước 4: (P3) Tiến hành kiểm tra nội dung thay đổi.

Các bạn có thể test trên dự án mình đang làm hoặc có thể test trên trang web [Kitchen Sink](https://example.cypress.io/) do cypress tạo ra để chúng ta thực hành trên đó.
#### :earth_asia: Bước 1: Truy cập trang web
Đây là đoạn code tương ứng và chúng ta thấy nó hoàn toàn dễ đọc nhỉ.
```js:cypress/integration/sample_spec.js
describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')
  })
})
```
Sau khi save, chạy file test. Ta sẽ thấy khung log bên trái sẽ hiện hành động `VISIT`, bên phải khung preview page cũng đã thay đổi cùng với đường dẫn tương ứng. Mọi thứ sau khi load xong, nếu không có vấn đề gì, thì sẽ $\textcolor{green}{pass}$ - màu hy vọng :joy:. 
#### :mag: Bước 2: Lấy element trên trang web
```js:cypress/integration/sample_spec.js
describe('My First Test', () => {
  it('finds the content "type"', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type')
  })
})
```

`contains('text')`: là method của cypress sẽ lấy DOM element có chứa nội dung `'text'`. Method này sẽ luôn trả về kết quả hợp lệ **đầu tiên** mà nó thấy.

Save và kiểm tra thì khung log đã có thêm action `CONTAINS`. Mọi thứ vẫn $\textcolor{green}{pass}$.

Hãy thử đổi `'type'` thành 'hype' và kiểm tra. 
![](https://images.viblo.asia/d68cddec-5efe-4b3b-9750-d154ed00a215.gif)

Các bạn sẽ thấy rằng các action của cy khi chạy xong sẽ hiển thị $\textcolor{green}{pass}$ nếu như không có vấn đề gì. Tức là test case đúng mặc dù chúng ta tiến hành kiểm chứng điều gì. Tuy nhiên bản chất các method này đều có **[Default Assertion](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Default-Assertions)**, thực hiện xử lý và tiến hành kiểm chứng. Hơn nữa, nếu trường hợp thực hiện action có vấn đề, thông báo $\textcolor{red}{fail}$ sẽ không được trả về ngay. Cypress sẽ cố gắng đợi, tìm kiếm, hay xử lý cái chúng ta muốn. Sau một thời gian mặc định thì mới thông báo lỗi. 

Ví dụ trong method `contains('text')` sẽ để thời gian timeout là 4s. Tức sau 4s, ta sẽ nhận được $\textcolor{red}{fail}$. Hãy xem qua hình ảnh, lưu ý 0,83s đầu là của action `VISIT`. 
#### :arrow_upper_left: Bước 3: Tương tác với element (Click)
```js:cypress/integration/sample_spec.js
describe('My First Test', () => {
  it('clicks the link "type"', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()
  })
})
```
Các bạn thấy là đọc code như một câu chuyện vô cùng dễ hiểu (truy cập rồi di chuột tìm kiếm rồi bấm). Mọi thứ cứ theo định hướng từ trên xuống dưới, từ trái sang phải mà đọc. Rất "đưa miệng" 🙂. Cy gọi đây là **"chaining"**-"kết nối", các câu lệnh, methods có thể **"chain"**-"xâu" lại với nhau. Những action như `click()` hay assertion `equal()` được gọi là **"chainer"**. `contains()` thì là method có thể **"chainable"**.
#### :white_check_mark: Bước 4: Tiến hành kiểm tra - Tạo thử một kiểm chứng
Chúng ta có thể kiểm tra xem link sau khi click có đúng như mong muốn không.
```js:cypress/integration/sample_spec.js
describe('My First Test', () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions')
  })
})
```

Thông thường trong một test case chúng ta sẽ phải thực hiện rất nhiều action và assertion. Ví dụ:
```js:cypress/integration/sample_spec.js
describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it and verify that the value has been updated
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})
```
`get()` là method sẽ lấy các DOM element dựa theo CSS selector. 

Save và kiểm tra kết quả nhé.
![](https://images.viblo.asia/1bac57e5-b198-44f9-b770-367cb24cfedf.png)

Ngoài ra, một số template giúp bạn tư duy, diễn giải test case như [Given-When-Then](https://www.agilealliance.org/glossary/gwt/#q=~(infinite~false~filters~(postType~(~'page~'post~'aa_book~'aa_event_session~'aa_experience_report~'aa_glossary~'aa_research_paper~'aa_video)~tags~(~'given*20when*20then))~searchTerm~'~sort~false~sortDirection~'asc~page~1)) (BDD) và [Arrange-Act-Assert](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/) (TDD).
Ví dụ với Given-When-Then:
> 1. Given a user visits https://example.cypress.io
> 2. When they click the link labeled `type`
> 3. And they type “fake@email.com“ into the `.action-email` input
> 4. Then the URL should include `/commands/actions`
> 5. And the `.action-email` input has “fake@email.com“ as its value

## Debug trong cypress 
Như vừa rồi viết code và kiểm tra ta thấy là cửa sổ test file của cy có thông tin trực quan và có thể thực hiện được các thao tác debug rất hiệu quả. 
Cửa sổ test file này có thể:
* Du hành thời gian, quay về bất kì comand và xem preview của chúng.
* Theo dõi các `page_events` (những events quan trọng được tiến hành không phải bởi cy như load trang từ server, hay nhận được thông tin từ API)đã xảy ra. 
![](https://docs.cypress.io/img/guides/first-test-page-load.d18d2ed9.png)
* In ra thêm thông tin ở console
* Xem trạng thái trước sau của một số action như `TYPE`
* Pause command và bấm chạy từng command

Sau khi chạy test xong, các hình ảnh bên khung preview được gọi là DOM snapshot.
### Time travel - Du hành thời gian
![](https://docs.cypress.io/img/guides/first-test-hover-contains.e4eb41f5.png)
Khi hover vào action `CONTAINS` preview đồng thời cũng thay đổi, và kết quả cũng được highlight lên, link cũng thay đổi.
Cy sẽ trở về thời điểm mà command này được thực thi.
### Snapshots
![](https://docs.cypress.io/img/guides/first-test-click-revert.d78f90f9.png)
1. Pinned snapshot: chúng ta sẽ ghim command đó để ngâm cứu. Lúc này hover các command khác thì khung preview cũng sẽ không thay đổi.
2. Event hitbox: dấu đỏ miêu tả cho action `CLICK`
3. Snapshot menu panel: Với các action thay đổi nội dung hiển thị trên web như `TYPE` thì có thể xem trạng thái trước và sau của command tương ứng. 
### cy.pause()
`cy.pause()` sẽ giúp chúng ta pause từ command nào, và tự bấm chạy thủ công từng command.
```js:cypress/integration/sample_spec.js
describe('My First Test', () => {
  it('clicking "type" shows the right headings', () => {
    cy.visit('https://example.cypress.io')

    cy.pause()

    cy.contains('type').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it and verify that the value has been updated
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})
```

![](https://images.viblo.asia/eb834de6-935c-4da0-b16e-0b161549cad3.gif)

## Config cypress
Cypress sẽ có các option config mà chúng ta có thể tận dụng. Các option này sẽ được đặt trong file `cypress.json` ở thư mục root của project các bạn.

Ví dụ ứng dụng tiêu biểu nhất là khai báo tên miền website để sau không phải gõ lại nữa.
```js:cypress.json
{
  "baseUrl": "http://localhost:8080"
}
```

Với nội dung code trên, thay vì phải `cy.visit('http://localhost:8080/login')` thì chúng ta chỉ cần viết `cy.visit('/login')`

Ngoài ra có thể là thay đổi thời gian timeout mặc định, env,...

## Tham khảo thêm
* [Intelligent Code Completion](https://docs.cypress.io/guides/tooling/IDE-integration.html#Intelligent-Code-Completion) như là `/// <reference types="Cypress" />`
* Nếu như web bạn visit đến để test có basic auth thì khi `cy.visit()` bạn cần thêm các option về auth.
```js
cy.visit('http://localhost:8080', {
    auth: {
        username: 'your_username',
        password: 'your_password'
    }
})
```
* Nguồn: https://docs.cypress.io/guides/overview/why-cypress.html