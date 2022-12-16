> Cypress can test anything that runs in a browser.

Đây sẽ là chuỗi bài viết về cypress từ cơ bản đến nâng cao (maybe). :joy: Nếu có gì không hiểu, sai sót, đừng ngần ngại comment phản hồi nhé. <3

# Vấn đề đăng nhập
Có lẽ một trong những bài test đầu tiên mà khó nhất chính là test màn đăng nhập (login). 

Test màn này sẽ rất dễ bị miss case khi mà chúng ta phải kiểm tra tính đúng đắn của rất nhiều input từ người dùng. Hơn nữa, hầu như mọi chức năng của một hệ thống nào đó luôn yêu cầu xác thực người dùng. Cho nên, việc phải thực hiện login ở các file test chức năng là điều tiên quyết. Vậy nếu chúng ta viết đoạn xử lý này không tối ưu thì nó sẽ làm chậm khâu test chức năng một cách đáng kể.

Vì thế có thể follow theo những tip sau nhé.
## Test hoàn chỉnh chức năng login trong một lần chạy duy nhất
Vì đây luôn là chức năng vô cùng quan trọng trong các hệ thống, vậy hãy test nó một cách thực tế nhất. Thực tế nhất ở đây là làm sao cho giống người dùng nhất. Vì vậy khi mong muốn test **hoàn chỉnh** chức năng login hay signup thì hãy test bằng cách tương tác với UI (login bằng UI) giống y hệt với người dùng. Ví dụ:
```js
describe('The Login Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec('npm run db:reset && npm run db:seed')

    // seed a user in the DB that we can control from our tests
    // assuming it generates a random password for us
    cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
      .its('body')
      .as('currentUser')
  })

  it('sets auth cookie when logging in via form submission', function () {
    // destructuring assignment of the this.currentUser object
    const { username, password } = this.currentUser

    cy.visit('/login')

    cy.get('input[name=username]').type(username)

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${password}{enter}`)

    // we should be redirected to /dashboard
    cy.url().should('include', '/dashboard')

    // our auth cookie should be present
    cy.getCookie('your-session-cookie').should('exist')

    // UI should reflect this user being logged in
    cy.get('h1').should('contain', 'jane.lane')
  })
})
```

`beforeEach()`: chứa các xử lý sẽ luôn được chạy trước khi bắt đầu test. Tương tự với `afterEach()`

`cy.exec()`: run các command hệ thống, terminal

Chúng ta thấy rằng trong test case sẽ lần lượt có các action tương ứng nhập dữ liệu vào trường  username và password. Dễ thấy chúng ta đang mô tả hành động y hệt như cách người dùng thực hiện.

Từ đó chúng ta có thể viết tất cả các test case để test hoàn chỉnh chức năng này, ví dụ test các trường hợp như:
* Invalid username / password
* Tài khoản đã bị khóa hay xóa
* ...

Cypress sẽ có những chiến lược test cho những chức năng thông thường, và phổ biến tại [đây](https://docs.cypress.io/examples/examples/recipes.html#Fundamentals).
## Bỏ qua việc Test trên UI trong một số trường hợp nhất định
Nếu như ở một chức năng cần đăng nhập, thì việc chúng ta chạy lại quy trình đăng nhập và test, rồi mới đến test chức năng đó, được coi là không tối ưu và không cần thiết. Chúng ta cần tối giản các công đoạn authentication bởi vì đã test hoàn chỉnh trước đó rồi. Một trong những cách tối giản ở đây là tránh việc thực hiện thao tác login trên UI, thay vào đó, ta sử dụng API.

Vì thế, hãy lưu ý **2 điều sau**.
> Khi bạn đang viết test cho một chức năng cụ thể, bạn nên test trên UI.

> Nhưng khi bạn test chức năng nào đó của hệ thống mà phụ thuộc vào trạng thái từ chức năng trên thì không được sử dụng UI để thiết lập trạng thái này.

Hãy xem ví dụ login thông qua API sử dụng `cy.request()`
```js
describe('The Dashboard Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec('npm run db:reset && npm run db:seed')

    // seed a user in the DB that we can control from our tests
    // assuming it generates a random password for us
    cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
      .its('body')
      .as('currentUser')
  })

  it('logs in programmatically without using the UI', function () {
    // destructuring assignment of the this.currentUser object
    const { username, password } = this.currentUser

    // programmatically log us in without needing the UI
    cy.request('POST', '/login', {
      username,
      password
    })

    // now that we're logged in, we can visit
    // any kind of restricted route!
    cy.visit('/dashboard')

    // our auth cookie should be present
    cy.getCookie('your-session-cookie').should('exist')

    // UI should reflect this user being logged in
    cy.get('h1').should('contain', 'jane.lane')
  })
})
```

Rõ ràng là chúng ta tiết kiệm được thời gian cho thao tác và test của login khi nó chỉ điều kiện tiên quyết của chức năng chính chúng ta cần test. Vậy thì, chỉ cần login qua API và thao thác, test trên chức năng chính đang cần.
# Tham khảo thêm
* [Recipes](https://docs.cypress.io/examples/examples/recipes.html#Fundamentals) - các chiến lược test được buid sẵn cho các chức năng phổ biến.
* [Best Practices](https://docs.cypress.io/guides/references/best-practices.html) - đây là những bài thực hành đi kèm với những tips viết test cần thiết.