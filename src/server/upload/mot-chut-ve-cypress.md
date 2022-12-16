## Cypress là gì?
 Cypress là tool kiểm thử giao diện cho web, được viết bằng JS và rất dễ sử dụng, nó có thể chạy End to End test, intergation test và unit test.
 
##  Cài đặt Cypress
* Cần phải cài đặt `npm` trên máy tính của bạn để có thể cài đặt Cypress. `npm` là trình quản lý gói cho JavaScript và đăng ký phần mềm lớn nhất thế giới.
* Sau đó chạy `npm install cypress --save-dev`. 

Hãy chắc chắn rằng bạn đã chạy npm init hoặc có một thư mục node_modules hoặc tệp package.json trong thư mục gốc của dự án để đảm bảo Cypress được cài đặt trong thư mục chính xác.

## Chương trình đầu tiên
#### Tạo một file test
1. Tạo một file sample_spec.js trong thư mục cypress/integration
2. Sau đó chạy lệnh `npx cypress open`. Nếu màn hình hiển thị danh sách các file test có file vừa tạo là thành công

#### Viết một chương trình đầu tiên
Bây giờ là lúc để viết thử nghiệm đầu tiên. Nào let's go:
```
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})
```
Thêm đoạn code sau vào file sample_spec.js kết quả sẽ ra như sau:
![](https://images.viblo.asia/c51ea3fa-5123-4c64-85ea-ad2779e88ebd.png)

Đây là một demo nhẹ nhàng quá nhỉ :D vậy chúng ta thử bắt đầu với một chương trình thực sự nào.
#### Bắt đầu một chương trình thực sự
##### Truy cập vào một trang web
Chúng ta có thể sử dụng `cy.visit()` để truy cập đến một url thực tế. Bây giờ hãy xem đoạn code sau:
```
describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')
  })
})
```
Sau đó chạy ứng dụng. Chúng ta sẽ nhận thấy là ứng dụng pass và chạy tới trang `https://example.cypress.io`.
##### Truy vấn đến một phần tử
Để tìm kiếm một phần tử trong nội dung chúng ta dùng lệnh `cy.contains`:
```
describe('My First Test', () => {
  it('finds the content "type"', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type')
  })
})
```
##### Tiếp theo là click vào một phần tử
Ok, bây giờ chúng ta muốn nhấp vào liên kết chúng tôi đã tìm thấy. Làm sao chúng ta làm việc đó bây giờ? Thêm một `.click()` lệnh vào cuối lệnh trước đó, như sau:
```
describe('My First Test', () => {
  it('clicks the link "type"', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()
  })
})
```
##### Cuối cùng như chúng ta biết khi viết test cần có một khẳng định cuối cùng
```
describe('My First Test', () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions')
  })
})
```
## Kết luận
Như vậy chúng ta đã cùng nhau đi qua một lượt về cypress. Chúng ta có thể làm nhiều lệnh hơn. Chi tiết mời các bạn xem tại đây [Cypress](https://docs.cypress.io/). Cảm ơn các bạn đã thao dõi.