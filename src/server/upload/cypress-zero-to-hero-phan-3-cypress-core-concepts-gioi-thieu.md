> Cypress can test anything that runs in a browser.

Đây sẽ là chuỗi bài viết về Core Concepts của cypress. :joy: Mình sẽ tóm tắt lại những ý quan trọng và ví dụ (nếu có). Để nghiên cứu chi tiết các bạn đọc thêm tại [đây](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html). Nếu có gì không hiểu, sai sót, đừng ngần ngại comment phản hồi nhé. <3

# Querying Elements - Lấy ra các phần tử DOM
## Cypress is Like jQuery
Nếu bạn đã quen thuộc với những cú pháp của jQuery thì bạn hoàn toàn có thể sử dụng chúng trong cypress. 
> [Bundle Library Utilities](https://docs.cypress.io/guides/references/bundled-tools.html#Other-Library-Utilities) - Cypress có đóng gói - tích hợp một số thư viện và có thể sử dụng thông qua đối tượng `Cypress`.
Vì thế các bạn có thể sử dụng các syntax của jQuerry thông qua [Cypress.$](https://docs.cypress.io/api/utilities/$.html).
Tuy nhiên kết quả lấy phần tử DOM sẽ có sự khác nhau khi sử dụng giữa cypress và jQuerry.
```js
// This is fine, jQuery returns the element synchronously.
const $jqElement = Cypress.$('.element')

// This will not work! Cypress does not return the element synchronously.
const $cyElement = cy.get('.element')
```
## Cypress is Not Like jQuery
Khi không tìm thấy phần tử DOM 

**Trong jQuerry:**
```js
// $() returns immediately with an empty collection.
const $myElement = Cypress.$('.element').first()

// Leads to ugly conditional checks
// and worse - flaky tests!
if ($myElement.length) {
  doSomething($myElement)
}
```
Mặc dù không tìm thấy nhưng `Cypress.$('.element').first()` vẫn trả về một jQuery collection rỗng. Thành ra phía dưới chúng ta vẫn phải có những check điều kiện hơi thừa một chút, rồi mới đến xử lý chính.

**Trong cypress:**
Cypress sẽ retry lại việc get phần tử cho đến khi **tìm thấy phần tử** hoặc **quá thời gian timeout**.

Với cách hoạt động trên, cypress có thể cover được nhiều trường hợp hơn, có thể báo lỗi và ngừng thực hiện các xử lý ở sau.

Ví dụ: Nếu do tốc độ mạng khiến phần tử chưa load kịp, song,  nếu trong thời gian timeout mà load xong thì command vẫn lấy thành công phần tử. Hay nếu quá timeout mà vẫn không tìm được thì sẽ báo lỗi và ngừng chạy.

Vậy nếu muốn sử dụng các xử lý đồng bộ truyền thống thì các bạn có thể sử dụng [Cypress.$](https://docs.cypress.io/api/utilities/$.html).
## Querying by Text Content
Đây là một cách lấy phần tử dựa trên nội dung hiển thị. Vì thế, nó là một cách lấy khá gần giống với hành động của người dùng. 

Ví dụ: Người dùng sẽ truy tìm khu vực có chứa nội dung là "New Post" thì cũng sẽ tương ứng với việc cypress tìm phần tử có chứa nội dung hiển thị là "New Post" thông qua câu lệnh `cy.contains('New Post')` .

Tuy nhiên cách này sẽ có hạn chế với những trang web sử dụng đa ngôn ngữ.
Mình thì cũng không recommend cách này cho lắm.
## When Elements Are Missing
Cypress là bất đồng bộ và sẽ dựa theo timeout để biết khi nào cần đợi ứng dụng load dữ liệu mong muốn. Timeout mặc định là 4 giây. Timeout có thể được config global thông qua trường [`defaultCommandTimeout`](https://docs.cypress.io/guides/references/configuration.html#Timeouts) trong file [config](https://docs.cypress.io/guides/references/configuration.html#Timeouts) hoặc ở từng câu lệnh. 
```js
// Give this element 10 seconds to appear
cy.get('.my-slow-selector', { timeout: 10000 })
```
# Chains of Commands - Nối các câu lệnh
## Interacting With Elements
Sau khi lấy được phần tử, chúng ta có thể tương tác với phần tử đó thông qua các câu lệnh thực hiện hành động-action. Ví dụ như:
```js
cy.get('textarea.post-body')
  .type('This is an excellent post.')
```
Ngoài ra còn có một số các action command như [`click()`](https://docs.cypress.io/api/commands/click.html),[`check()`](https://docs.cypress.io/api/commands/check.html),[`uncheck()`](https://docs.cypress.io/api/commands/uncheck.html),...  

Vẫn theo cơ chế timeout giới thiệu ở trên. Các câu lệnh này sẽ luôn đảm bảo là phần tử này có thể tương tác với hành động tương ứng của câu lệnh, và wait cho đến khi phần tử đó có thể tương tác hoặc quá timeout.

Ví dụ: ô input đang bị disable sẽ được wait cho đến khi hết disable hay quá timeout.

Nếu không muốn wait thì có thể sử dụng option `force`.
## Subject Management
Có 2 thuật ngữ mà mình cũng không biết dịch là gì. 😞 Đó là "subject" và "yield". Có thể hiểu đơn giản là subject là các chủ đề, những nội dung được yield - được gọi ra, gọi lên.

cy có thể nối chuỗi các lệnh command với nhau `cy.[command]` với những ràng buộc nhất định. Ở thời điểm command đó yield-gọi lên subject-chủ đề nào thì sẽ quyết định những command có thể chain-nối tiếp vào chuỗi lệnh.
 
 Ví dụ 1: `cy.get()` và `cy.contains()` sẽ gọi lên một phần tử DOM, thì sẽ chain-nối tiếp được với những câu lệnh expect-mong đợi xử lý trên phần tử DOM như `click(), type()`.

 Ví dụ 2: `cy.clearCookies()` sẽ gọi lên giá trị `null` thì nó sẽ không thể chain-nối tiếp với một command nào khác nữa.
 
 Để biết các command yield cái gì thì có thể đọc ở từng comand ở mục yield hay requirement. Ví dụ: [`type()`](https://docs.cypress.io/api/commands/type.html#Yields), [`cy.clearCookie()`](https://docs.cypress.io/api/commands/clearcookie.html#Yields)
##  Using [`.then()`](https://docs.cypress.io/api/commands/then.html#Syntax) To Act On A Subject
Khi bạn muốn chèn xử lý của mình chuỗi lệnh thì có thể dùng command `then()`. Command này sẽ gọi tới callback function mà bạn truyền vào.  Callback function sẽ nhận subject được yield ở command trước làm tham số đầu tiên. 

Để tiếp tục chuỗi command trong callback function, bạn phải đặc tả subject để yield thông qua câu lệnh `return`. 

Ví dụ:
```js
cy
  // Find the el with id 'some-link'
  .get('#some-link')

  .then(($myElement) => {
    // ...massage the subject with some arbitrary code

    // grab its href property
    const href = $myElement.prop('href')

    // strip out the 'hash' character and everything after it
    return href.replace(/(#.*)/, '')
  })
  .then((href) => {
    // href is now the new subject
    // which we can work with now
  })
```
### Using Aliases to Refer to Previous Subjects
Cypress cung cấp một số cách xử lý để có thể nhanh chóng tham chiếu lại tới subject vừa được gọi lên. Mọi người có thể đọc thêm về [Alias](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Return-Values).
Ví dụ:
```js
cy
  .get('.my-selector')
  .as('myElement') // sets the alias
  .click()

/* many more actions */

cy
  .get('@myElement') // re-queries the DOM as before (only if necessary)
  .click()
```
## Commands Are Asynchronous
Các câu lệnh trong cypress sẽ không được thực thi ngay lập tức khi thời điểm con trỏ lệnh gọi tới nó. Thay vào đó, các câu lệnh sẽ được lần lượt cho vào hàng đợi, và thực thi về sau. Tức là các câu lệnh trong cypress là bất đồng bộ. 
### Mixing Async and Sync code
Nếu như bạn muốn sử dụng các code đồng bộ trong cypress thì dưới đây là các cách triển khai khuyên dùng và đảm bảo tính đúng đắn. Bởi vì những câu lệnh đồng bộ sẽ được chạy luôn mà không đợi các câu lệnh cypress được chạy.
```js
it('does not work as we expect', () => {
  cy.visit('/my/resource/path')    // Nothing happens yet

  cy.get('.awesome-selector')      // Still nothing happening
    .click()                       // Nope, nothing
    .then(() => {
      // placing this code inside the .then() ensures
      // it runs after the cypress commands 'execute'
      let el = Cypress.$('.new-el') // evaluates after .then()

      if (el.length) {
        cy.get('.another-selector')
      } else {
        cy.get('.optional-selector')
      }
    })
})

// Ok, the test function has finished executing...
// We've queued all of these commands and now
// Cypress will begin running them in order!
```
Những xử lý đồng bộ thì nên thêm vào callback function được truyền vào câu lệnh `then()`. Khi đó các phần tử DOM cũng đã được get và các câu lệnh đồng bộ sẽ có dữ liệu mong muốn để xử lý.
## Commands Run Serially
Mặc dù các câu lệnh của cypress là bất đồng bộ, tuy vậy chúng lại sẽ không được thực thi song song. Thay vào đó sẽ lần lượt sẽ được thêm vào hàng đợi, đồng nghĩa với việc khi thực thi thì các câu lệnh cũng được lần lượt lấy ra khỏi hàng đợi.

Hơn nữa các câu lệnh của cypress khi chạy, ngoài những xử lý mà chúng ta biết sẽ được thực thi (ví dụ `cy.get('.awesome-selector').click()` là get DOM và click) thì cypress cũng sẽ thực hiện thêm các xử lý phía sau ở từng câu lệnh. 

Thông thường, các xử lý đó là `wait` hay `retry`. Ví dụ `cy.visit()` sẽ wait load đủ dữ liệu rồi mới thực hiện những câu lệnh tiếp theo. Hay `cy.get('.awesome-selector')` cũng sẽ retry việc lấy DOM trong khoảng thời gian **timeout** (đã đề cập ở trên).

Các xử lý `wait` hoặc `retry`  để đảm bảo các câu lệnh được thực thi thành công - tức gọi lên được kết quả mà chúng ta mong muốn, trước khi câu lệnh tiếp theo được thực thi. Nếu không hoàn thành thành công trước khi quá timeout, thì quá trình kiểm tra sẽ $\textcolor{red}{fail}$.
## Commands Are Promises
Cypress được xây dựng bằng việc sử dụng Promises của [Bluebird](http://bluebirdjs.com/). Tuy nhiên, các câu lệnh cypress sẽ không trả về instance của Promise, mà trả về một `Chainer`, bao lại instance của Promise.
Ví dụ nếu các xử lý viết theo Promise.
```js
it('changes the URL when "awesome" is clicked', () => {
  // THIS IS NOT VALID CODE.
  // THIS IS JUST FOR DEMONSTRATION.
  return cy.visit('/my/resource/path')
  .then(() => {
    return cy.get('.awesome-selector')
  })
  .then(($element) => {
    // not analogous
    return cy.click($element)
  })
  })
```
Ta thấy các instance của promise được trả về rồi lại tiếp tục được truyền vào những xử lý tiếp sau.
Ví dụ viết đúng trong cypress:
```js
it('changes the URL when "awesome" is clicked', () => {
  cy.visit('/my/resource/path')

  cy.get('.awesome-selector')
    .click()
    })
```
Cypress sẽ "gói gém" những đoạn code xử lý lồng nhau, khó hiểu đấy lại và ẩn đi, và đưa chúng ta một cách sử dụng dễ dùng và dễ hiểu hơn.
## Commands Are Not Promises
Cypress cũng sẽ không implement hoàn toàn giống hệt Promises. Sau đây là một số điểm khác.
1. Không thể chạy nhiều câu lệnh trong cùng một đơn vị thời gian (khôn song song). Giống như việc người dùng thao tác từng bước trên ứng dụng của chúng ta vậy, mọi thứ sẽ được chạy tuần tự.
2. Bạn sẽ không thể vô tình quên return hay nối các câu lệnh. Vì trong cypress cũng không cần phải làm điều đó.
3. Bạn sẽ không thể bắt các lỗi để xử lý nếu như câu lệnh ấy chạy fail. Trong cypress, một khi có câu lệnh $\textcolor{red}{fail}$ toàn bộ file test đó $\textcolor{red}{fail}$ và dừng chạy. Nếu bạn muốn test theo các luồng điều khiển - luồng điều kiện thì có thể tham khảo [conditional testing](https://docs.cypress.io/guides/core-concepts/conditional-testing.html). 
# Assertions - Phép khẳng định
Mình hay thường dịch thuật ngữ này là "phép khẳng định".
> Assertions describe the desired state of your elements, your objects, and your application.
> Assertion sẽ mô tả trạng thái dữ liệu mà mình mong muốn ở các phần tử, đối tượng, ứng dụng của bạn. 

Mình gọi là "phép khẳng định" bởi khi mô tả như vậy, song, nó cũng sẽ như một câu hỏi "Liệu hiện tại có đúng như mô tả như vậy không?" và phép này sẽ trả về kết quả $\textcolor{green}{pass}$ hay $\textcolor{red}{fail}$. 

Ví dụ:
```js
cy.get('button').click().should('have.class', 'active')
```
Chuỗi lệnh sẽ get DOM có HTML tag là `button`, sau đó có một phép khẳng định là liệu button đó có đúng như mô tả là: "Button này sẽ có class là active" hay không?

Ngoài ra, các câu lệnh phép khẳng định này cũng có cơ chế `retry` và `wait`, trong khoảng thời gian timeout luôn mong muốn phép khẳng định này trả về kết quả đúng.

Các câu lệnh thông thường như `get()`, `contains()` ,... bản thân bên trong cũng có các phép khẳng định xử lý bên trong. Được gọi là [Default Assertions](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Default-Assertions).
## Default Assertions
Nhiều câu lệnh cypress có phép khẳng định mặc định, được tích hợp sẵn. Bạn sẽ không phải viết thêm phép khẳng định tính đúng đắn cho nó nữa.

Ví dụ: [`cy.contains()`](https://docs.cypress.io/api/commands/contains.html) sẽ đi kèm với phép khẳng định tồn tại, nếu như nó không lấy được DOM hợp lệ, kết quả câu lệnh cũng chuyển thành $\textcolor{red}{fail}$.

Một số câu lệnh có những yêu cầu đặc biệt mà nó sẽ $\textcolor{red}{fail}$ ngay mà không có `retry` như [cy.request()](https://docs.cypress.io/api/commands/request.html).

Các câu lệnh tương tác trên các DOM được gọi lên sẽ `retry` và `wait` trong timeout.

Các câu lệnh hành động sẽ `wait` các phần tử chuyển sang trạng thái có thể tương tác được.

### Negative DOM assertions
Nếu như bạn nối một phép khẳng định phủ định (positive assertion) như .should('not.have.class') mà không tìm được DOM đó thì phép khẳng định đó vẫn $\textcolor{green}{pass}$ (do phép khẳng định mặc định trong nó).
Ví dụ:
```js
cy.get('.does-not-exist').should('not.be.visible')         // passes
cy.get('.does-not-exist').should('not.have.descendants')   // passes
```
Các bạn có thể bỏ qua phép khẳng định mặc định này bằng cách thêm option `{force: true}`.
### Reversing the Default Assertion
Nếu như bạn không muốn đảo ngược phép khẳng định mặc định **tồn tại** thì bạn có thể sử dụng phép khẳng định `should('not.exist')`.
Ví dụ:
```js
// now Cypress will wait until this
// <button> is not in the DOM after the click
cy.get('button.close').click().should('not.exist')

// and now make sure this #modal does not exist in the DOM
// and automatically wait until it's gone!
cy.get('#modal').should('not.exist')
```

# Tham khảo thêm
Best practices trong việc lấy các phần tử trong DOM [Read here](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements).

Nguồn: https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html