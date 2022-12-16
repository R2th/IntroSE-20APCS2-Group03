> Cypress can test anything that runs in a browser.

Đây sẽ là chuỗi bài viết về Core Concepts của cypress. :joy: Mình sẽ tóm tắt lại những ý quan trọng và ví dụ (nếu có). Để nghiên cứu chi tiết các bạn đọc thêm tại [đây](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html). Nếu có gì không hiểu, sai sót, đừng ngần ngại comment phản hồi nhé. <3

# Assertions
## List of Assertions
Cypress cũng đóng gói sẵn các ngôn ngữ viết assertion như [`Chai`](https://docs.cypress.io/guides/references/bundled-tools.html#Chai), [`Chai-jQuery`](https://docs.cypress.io/guides/references/bundled-tools.html#Chai-jQuery) và [`Sinon-Chai`](https://docs.cypress.io/guides/references/bundled-tools.html#Sinon-Chai).
## Writing Assertions
Sẽ có hai cách để viết assertion (phép khẳng định)  
1. Viết các assertion lên các subject ngầm định, sử dụng [`.should()`](https://docs.cypress.io/api/commands/should.html) hoặc [`.and()`](https://docs.cypress.io/api/commands/and.html). Tức là, những subject được yield ở câu lệnh phía trước sẽ được ngầm định là subject cho [`.should()`](https://docs.cypress.io/api/commands/should.html) hoặc [`.and()`](https://docs.cypress.io/api/commands/and.html).
2. Viết các assertion lên các subject được chỉ rõ, sử dụng `expect`. Tức là, bạn sẽ chỉ định rõ subject nào được assert.
## Implicit Subjects
Đây là cách viết assertion được khuyên dùng trong Cypress. [`.should()`](https://docs.cypress.io/api/commands/should.html) hoặc [`.and()`](https://docs.cypress.io/api/commands/and.html) là các câu lệnh điển hình của Cypress, chúng áp dụng cho subject đang được gọi lên trong chuỗi lệnh.
```js
// the implicit subject here is the first <tr>
// Chủ đề ngầm định ở đây là thẻ <tr> đầu tiên được tìm thấy
// this asserts that the <tr> has an .active class
cy.get('tbody tr:first').should('have.class', 'active')
```
Bạn có thể xâu chuỗi các assertion với nhau bằng cách sử dụng [`.and()`](https://docs.cypress.io/api/commands/and.html) - một alias của [`.should()`](https://docs.cypress.io/api/commands/should.html). Nhằm đảm bảo một trong những đặc điểm của Cypress: "Mọi thứ đều dễ đọc thuận miệng"
```js
cy.get('#header a')
  .should('have.class', 'active')
  .and('have.attr', 'href', '/users')
```
Có thể xâu chuỗi các assertion bằng cách viết thứ 2 - cách viết dài hơn.
```js
cy.get('tbody tr:first').should(($tr) => {
  expect($tr).to.have.class('active')
  expect($tr).to.have.attr('href', '/users')
})
```
Cách viết thứ 1 sẽ ngắn hơn. Vậy thì chúng ta sẽ sử dụng cách viết thứ 2 khi nào, hãy đọc phần dưới nhé.
## Explicit Subjects
Sử dụng `expect` cho phép bạn truyền vào một chủ đề cụ thể và thực hiện assert lên chúng. Đây có thể là cách khá quen thuộc trong unit test.
```js
// the explicit subject here is the boolean: true
expect(true).to.be.true
```
> Có thể viết Unit Test trong cypress. Tham khảo recipe: [unit testing](https://docs.cypress.io/examples/examples/recipes.html) và [unit testing React components](https://docs.cypress.io/examples/examples/recipes.html#Unit-Testing).

Như đã đề cập ở trên, khi nào thì nên sử dụng cách viết này:
* Khi bạn muốn thực hiện một số xử lý logic trước khi thực hiện assert.
* Thực hiện nhiều assert trên cùng một chủ đề, hoặc các phần tử con của chủ đề.
```js
cy
  .get('p')
  .should(($p) => {
    // massage our subject from a DOM element
    // into an array of texts from all of the p's
    // thực hiện các xử lý logic trước khi thực hiện assert
    let texts = $p.map((el, i) => {
      return Cypress.$(el).text()
    })

    // jQuery map returns jQuery object
    // and .get() converts this to an array
    texts = texts.get()

    // Thực hiện nhiều assert trên cùng một chủ đề,
    // array should have length of 3
    expect(texts).to.have.length(3)

    // with this specific content
    // hay trên các phần tử con của chủ đề.
    expect(texts).to.deep.eq([
      'Some text from first p',
      'More text from second p',
      'And even more text from third p'
    ])
  })
```
Câu lệnh [`.should()`](https://docs.cypress.io/api/commands/should.html) cho phép truyền vào callback function với tham số đầu tiên là chủ đề đã gọi lên. Hàm này hoạt động tương tự [`.then()`](https://docs.cypress.io/api/commands/then.html).
# Timeouts
Hầu như các câu lệnh trong cypress đều có thể hết thời gian chờ theo một cách nhất định nào đó. Các câu lệnh cũng sẽ có các assertion của riêng chúng và cùng với các assertion do bạn viết. Các assertion cũng đều sẽ có thời gian timeout giống nhau.
## Applying Timeouts
Bạn có thể thay đổi thời gian chờ của câu lệnh. Sự thay đổi này sẽ áp dụng lên cả các assertion mặc định của câu lệnh cũng như là các assertion mà bạn thêm vào. 

**Lưu ý:** Sự thay đổi này được viết trong nội dung của câu lệnh, không phải trong nội dung của các assertion.

### Example #1: Default Assertion - Câu lệnh có assertion mặc định
```js
// because .get() has a default assertion
// that this element exists, it can time out and fail
cy.get('.mobile-nav')
```
* Xử lý dưới nền của cypress: Querry phần tử `.mobile-nav` và đợi max 4 giây xem nó có tồn tại trong DOM không.
### Example #2: Additional Assertions - Câu lệnh thêm các assertion của bạn
```js
// we've added 2 assertions to our test
cy
  .get('.mobile-nav')
  .should('be.visible')
  .and('contain', 'Home')
```
* Xử lý dưới nền của cypress: Querry phần tử `.mobile-nav` và đợi **max 4 giây** xem nó có tồn tại trong DOM không, xem nó có là `visible` hay không, xem nó có nội dung là "Home" hay không. 

Thời gian chờ ở mỗi assertion sẽ dựa theo thời gian chờ được set ở câu lệnh phía trước chúng.
### Example #3: Modifying Timeouts - Thay đổi thời gian chờ
```js
// we've modified the timeout which affects default + added assertions
cy
  .get('.mobile-nav', { timeout: 10000 })
  .should('be.visible')
  .and('contain', 'Home')
```
* Xử lý dưới nền của cypress: Querry phần tử `.mobile-nav` và đợi **max 10 giây** xem nó có tồn tại trong DOM không, xem nó có là `visible` hay không, xem nó có nội dung là "Home" hay không.

## Default Values
Cypress đưa ra một số giá trị thời gian chờ khác nhau dựa trên từng câu lệnh.
Ví dụ:
* [`cy.visit ()`](https://docs.cypress.io/api/commands/visit.html) tải một trang web và sẽ không hoàn thành cho đến khi tất cả các tài nguyên liên quan hoàn thành giai đoạn tải của chúng. Vì vậy thời gian chờ mặc định của nó được đặt thành **60000ms**.
* [`cy.exec ()`](https://docs.cypress.io/api/commands/exec.html) chạy một lệnh hệ thống chẳng hạn như seed database. Vì vậy thời gian chờ mặc định của nó được đặt thành **60000ms**.
* [`cy.wait ()`](https://docs.cypress.io/api/commands/wait.html#Timeouts) có hai giai đoạn thời gian chờ khác nhau. Khi chờ một "biến" định tuyến cụ thể - [routing alias](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Routes), thì thời gian chờ là **5000ms** để tìm kiếm request tương ứng  và sau đó chờ phản hồi của serve cho request đó trong **20000ms**.
* Các lệnh liên quan đến các phần tử DOM thường có thời gian chờ là **4000ms**.

Nguồn: https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html