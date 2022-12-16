Xin chào, trong bài viết này mình sẽ viết E2E (end-to-end) testing cho ứng dụng ReactJS sử dụng Cypress
## 1. Cấu hình Cypress cho ứng dụng ReactJS
Mục đích chính của bài viết này là về [Cypress](https://www.cypress.io/) và [E2E testing](https://katalon.com/resources-center/blog/end-to-end-e2e-testing), do đó mình đã chuẩn bị sẵn 1 ứng dụng ReactJS.<br>
Ứng dụng gồm 2 page: /home và /products. Trong đó page products hiển thị 1 list các sản phẩm và có thể thêm, xoá sản phẩm.<br>
Repository: [https://github.com/khuongitptit/demo-cypress](https://github.com/khuongitptit/demo-cypress). <br>
Branch start là project khi bắt đầu, còn branch end là project đã có các file e2e test mình viết để mọi người tham khảo.<br>
Sau khi clone về, chạy **yarn install**, sau đó **yarn dev** để chạy ứng dụng.<br>
Để cài cypress, chạy:<br>
`yarn add cypress --save`
Để bắt đầu sử dụng, chạy `npx cypress open`, cypress sẽ được tự động mở lên. <br>
Tại cửa sổ bật lên, chọn **E2E testing**:<br>
![Screen Shot 2022-08-29 at 17.06.02.png](https://images.viblo.asia/e83b46a6-9af1-4a1b-bbb0-386b135d7bee.png)
Các file config hiện ra, chọn **Continue**:<br>
![Screen Shot 2022-08-29 at 17.06.59.png](https://images.viblo.asia/1d68d2f5-8e15-47f4-9d25-27dd24f905ce.png)
Đợi 1 chút và các file config sẽ tự động generate trong code của project. Ở cửa số Cypress, chọn **Start E2E Testing in Chrome**. Cửa sổ Chrome sẽ được tự động bật lên:<br>
![Screen Shot 2022-08-29 at 17.10.45.png](https://images.viblo.asia/cc3c819b-4f27-4bb4-a2ba-41e8796dc57c.png)
Các test sẽ hiện ở tab **Specs**, tuy nhiên ở đây mình chưa viết test nào. Có thể tạo file test trực tiếp trên giao diện cửa sổ Chrome của Cypress hoặc tự tạo trong code. Ở đây mình sẽ tạo luôn trên giao diện:<br>
![Screen Shot 2022-08-30 at 11.20.44.png](https://images.viblo.asia/130f3fa5-4407-4c66-b329-3e4ed6221346.png)
**Scaffold example specs** sẽ tạo ra 1 loạt file mẫu, tuy nhiên ở ứng dụng của mình thì sẽ hơi thừa, do đó mình sẽ tạo file trống:<br>
Chọn **Create new empty spec**, nhập `cypress/e2e/home.spec.cy.ts` (file này mình sẽ dùng để test cho page /home). Chọn **Create Spec**.<br>
Một file test sẽ được tự tạo ra trong code với nội dung:<br>
```
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
```
Chọn **Create another spec** để tạo thêm 1 file để test cho page /products. Thao tác tương tự như trên, nhập tên `cypress/e2e/products.spec.cy.ts`<br>
Sau đó chọn **Okay, run the spec**, file test mình vừa tạo sẽ được chạy:<br>
![Screen Shot 2022-08-30 at 11.31.08.png](https://images.viblo.asia/d07f8f3b-6ee7-4621-8a52-19e72fbbe611.png)
Như vậy là mình đã cấu hình xong Cypress để sẵn sàng viết các test<br>
## 2. Viết test
Ở phần 1 mình đã 2 file test `home.spec.cy.ts` và `products.spec.cy.ts`.<br>
Page home của ứng dụng đơn giản là gồm 1 navbar và 1 dòng text *"Hello from Cypress"*:<br>
![Screen Shot 2022-08-30 at 11.37.22.png](https://images.viblo.asia/8704b481-6e97-4a18-a79f-9c04b3688f7a.png)
Mình sẽ tiến hành viết test cho page **home** trước. Sửa file `home.spec.cy.ts` như sau:<br>
```
//cypress/e2e/home.spec.cy.ts
describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('render', () => {
    cy.get("nav ul").should("be.visible").within(() => {
      cy.get("li a").should("have.length", 2)
    })
    cy.get("div").contains("Hello from Cypress").should("be.visible")
  })
  it('change page', () => {
    const linkToProductsPage = cy.get("a").contains("Products")
    linkToProductsPage.should("be.visible")
    linkToProductsPage.click()
    cy.url().should("include", "/products")
  })
})
```
Trong file test này, mình định nghĩa 1 hàm `beforeEach`. Hàm này sẽ chạy trước khi mỗi **it (individual test)** chạy.<br>
Ở đây, trước mỗi test, mình sẽ truy cập vào trang home của ứng dụng: `cy.visit('http://localhost:3000')`<br>
Mình chia thành 2  **it**. <br>
* it đầu tiên sẽ test phần navbar có hiển thị hay không, có đủ 2 thẻ link không và test dòng chữ *Hello from Cypress* có hiển thị không<br>
* it thứ hai sẽ test sau khi click vào link **products** thì ứng dụng có chuyển hướng sang page **products** không<br>
Để chạy test, ở tab **Specs**, click vào **home.spec**:<br>
![Screen Shot 2022-08-30 at 16.10.53.png](https://images.viblo.asia/384521d5-cdd1-4208-bab6-6b8c4cc0ae5b.png)
Cypress sẽ chạy theo kịch bản mà mình đã viết ở trên có kèm theo giao diện ứng dụng khi thực hiện theo kịch bản đó.<br>
Chỉ cần chỉ chuột vào bước ở menu bên trái là có thể xem trạng thái của ứng dụng ở bước đó.<br>
![Screen Shot 2022-08-30 at 16.17.15.png](https://images.viblo.asia/bb3f63fd-c5e2-44e0-9918-1966a72b23d1.png)
Màu xanh lá tức là tất cả các test đã passed.<br>
Như vậy là mình đã viết xong test cho màn home, màn này tương đối đơn giản<br>
Tiếp theo minh sẽ viết test cho page **products**, sẽ phức tạp hơn một chút.<br>
Giao diện page trông như thế này:<br>
![Screen Shot 2022-08-31 at 08.52.31.png](https://images.viblo.asia/3d61c288-b915-4c15-91a7-8f6f4f5e32e5.png)
Do phần navbar giống hệt page home nên mình sẽ không test lại.<br>
File `products.spec.cy.ts` như sau:<br>
```
//cypress/e2e/products.spec.cy.ts
describe('Product page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/products')
    cy.intercept({
      method: "POST",
      url: Cypress.env("REACT_APP_BASE_API_URL") + "/products",
    }).as("addProductAPI");
    cy.intercept({
      method: "DELETE",
      url: Cypress.env("REACT_APP_BASE_API_URL") + "/products/**",
    }).as("deleteProductAPI");
    cy.intercept({
      method: "GET",
      url: Cypress.env("REACT_APP_BASE_API_URL") + "/products",
    }).as("getListProductAPI");
    cy.wait(1000)
  })

  it('add product', () => {
    cy.get("h6").contains("Add product").should("be.visible")
    cy.get("input[name='name']").should("be.visible")
    cy.get("input[name='price']").should("be.visible")
    cy.get("button").contains("Add").should("be.visible")
    const testName = "test product " + (Date.now()/1000)
    cy.get("input[name='name']").type(testName)
    cy.get("input[name='price']").type("10000")
    cy.get("button").contains("Add").click()
    cy.wait("@addProductAPI").then(({ response }) => {
      expect(response?.statusCode).to.eq(201);
      cy.wait("@getListProductAPI").then(() => {
        cy.wait(1000)
        cy.get("tr").last().within(() => {
          cy.get("td").first().should("contain.text", testName)
        })
      })
    });
  })

  it('delete product', () => {
    let productNameToDelete
    cy.get("tr").last().within(() => {
      cy.get("td").first().invoke("text").then(text => productNameToDelete = text)
      cy.get("button").contains("Delete").click()
    })
    cy.wait("@deleteProductAPI").then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
      cy.wait("@getListProductAPI").then(() => {
        cy.get("tr").last().within(() => {
          cy.get("td").first().should("not.contain.text", productNameToDelete)
        })
      })
    });
  })

})
```
Trong file này có 1 hàm beforeEach, trong đó sẽ truy cập trang **products** và định nghĩa các API *get list product*, *add product* và *delete products*.<br>
2 **it** cho 2 chức năng **add product** và **delete product**<br>
1. add product<br>
**it** này test dòng chữ **Add product** và các input nhập *tên product*, *giá product*, và *nút Add* có được hiển thị không<br>
Tiếp theo mình nhập tên và giá của product và click nút Add.<br>
Để kiểm tra xem product vừa add đã được hiển thị trong list chưa, mình muốn tên product phải unique để dễ phân biệt, do đó mình gán vào tên product 1 dãy số là *UNIX timestamp* ở thời điểm chạy test (mình gán vào biếtn `testName`). Như vậy thì mỗi lần mình chạy test, tên product được add sẽ khác nhau.<br>
Sau khi click vào nút Add, mình wait API `@addProductAPI` chạy xong, sau đó test *statusCode* của API trả về có bằng **201** hay không. <br>
Sau đó mình tiếp tục wait API `@getListProductAPI`, sau đó test xem product cuối cùng trong danh sách hiển thị có tên đúng bằng `testName` hay không.<br>
2. delete product<br>
**it** này mình sẽ xoá product ở cuối danh sách bằng cách click nút Delete. <br>
Trước đó mình lưu tên product sẽ bị xoá vào biến `productNameToDelete`<br>
Sau khi click nút Delete, mình wait API `@deleteProductAPI`, sau đó test *statusCode* của API trả về có bằng **200** hay không (tương tự như **it** add product).<br>
Tiếp theo mình wait API `@getListProductAPI` chạy xong, sau đó test xem product cuối cùng của danh sách có tên khác với `productNameToDelete`.<br>
Nếu khác tức là product đã bị xoá và test passed.<br>
## 3. Kết luận
Trên đây mình đã trình bày cách viết E2E testing cho 2 page đơn giản của ứng dụng ReactJS. <br>
Có thể thấy Cypress là 1 framework khá dễ sử dụng vì cú pháp code gần giống ngôn ngữ tự nhiên, config đơn giản mà không cần động vào code, có giao diện trực quan để xem từng bước thực hiện thao thác trên ứng dụng.<br>
Chi tiết mọi người có thể xem thêm trên trang chủ của [Cypress](https://www.cypress.io/)<br><br>
**Cảm ơn mọi người đã đọc bài viết!**