Từ trước đến nay, ở nhiều dự án luôn có một sự xích mình ngầm giữa dev và QA. Vì sao? Có một người anh đã từng nói với tôi, mindset của dev là phát triển và cải thiện hệ thống, còn QA sẽ là phá hệ thống. Well, phá ở đây đừng hiểu là họ muốn dự án hỏng mà là muốn một sản phẩm hoàn hảo nhất trước khi đến tay người dùng thôi. Nhìn chung thì dev và QA đều có trách nhiệm và tình yêu với sản phẩm của mình, chỉ là mỗi bên yêu nó theo một cách riêng thôi. Và QA cũng có những lúc cực kì vất vả chứ. Khi bạn phải test một màn hình với tá chức năng lớn nhỏ trong đó, và tới một ngày đẹp trời, có một chút thay đổi, và bạn lại phải đi test lại cả màn hình đó. Chưa kể những lần breaking change khiến phải test lại n màn khác nhau. Nghĩ đến đây cũng trầm cảm phết nhỉ? Vòng vo xàm xí một hồi thì trọng tâm là hôm nay mình muốn giới thiếu với các bạn một tool test mang tên cypress :D Theo ý kiến của mình, thì cypress nôm na chính là một user được chúng ta lập trình sẵn những tác và có tốc độ thao tác siêu nhanh. Với những khó khăn mình nêu ở trên, cypress sẽ giúp bạn khắc phục được, nó sẽ giảm bớt việc re-test các chức năng. Các bạn có thể tìm hiểu chi tiết trên[ trang chủ của cypress](https://docs.cypress.io/guides/overview/why-cypress.html)

**Ưu điểm**:

* Cypress có thể giúp bạn thực hiện nhiều loại test như: End-to-end test,  Integration test, Unit test.
* Cách cài đặt, sử dụng khá là đơn giản
* Có thể chạy trên nhiều loại trình duyệt 
* Debug dễ dàng ngay trong quá trình chạy test ([chi tiết](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Debugging))


**Nhược điểm**
* Thời gian chạy khá lâu
* Tiêu tôn tài nguyên của server, nếu chạy toàn hệ thống thì sẽ có thể dẫn tới full ram, full CPU khiến các service nằm trên server không sử dụng được nữa (vậy nên test env và production env nằm trên một server thì chạy cypress sẽ khá sai lầm)

# Yêu cầu
Để chạy được cypress thì các bạn cần phải đáp ứng đủ những điều kiện sau

* Hệ điều hành: MacOS >= 10.9 (64bit), Linux Ubuntu >= 12.04, Fedora 21 và Debian8 (64 bit), Window >= 7
* NodeJS >= 10, nếu bản đang ở bản Nodejs thấp và không thể nâng cấp được vì có package cũ không chạy được trên node cao hơn thì có thể tải bản cypress cũ nhé.
* Spec, requirement của dự án phải đầy đủ và chi tiết

# Cài đặt
Di chuyển vào thư mục của dự án

Npm:
```
npm install cypress --save-dev
```

Yarn:
```
yarn add cypress --dev
```

Hoặc bạn có thể download trực tiếp tại [đây](https://download.cypress.io/desktop)

# Chạy Cypress
Sau khi cài đặt cypress, bạn sẽ thấy có một folder được tạo ra `cypress` và file `cypress.json` (chứa config) đươc tạo ra

![](https://images.viblo.asia/d08229c1-09a0-4122-889e-59c9f2e42cce.png)

Giải thích qua chút về cấu trúc thư mục:

* `fixtues`: Đây là folder chứa những dữ liệu tĩnh để sử dụng trong quá trình chạy test.
* `integration`: Folder chứa file test. Test file có thể sẽ là file dạng: `.js`, `.jsx`, `.coffee`, `.cjsx`.
* `plugins`: Với mỗi lần chạy file spec, thì plugins trong `plugins/index.js` sẽ được chạy. Bạn sẽ không phải import vào tất cả những file spec test của mình
* `support`:  Về cách chạy thì nó cũng nhưng plugins, nhưng mục đích sử dụng thì khác nhau. Những file support sẽ chứa những thao tác lặp đi lặp lại như command.

Đó là những folder mặc định mà cypress tự generate cho chúng ta, nếu bạn không thích chúng thì có thể sửa lại trong [config](https://docs.cypress.io/guides/references/configuration.html#Folders-Files)

Để chạy cypress bạn có thể làm theo một trong những cách sau

**Chạy trực tiếp từ node_modules:**
```
./node_modules/.bin/cypress open
```

**npm bin**
```
$(npm bin)/cypress open
```

**npx**
```
npx cypress open
```

**yarn**
```
yarn run cypress open
```

Hoặc trong `package.json` bạn có thể thêm một script

```
{
  "scripts": {
    "cyo": "cypress open"
  }
}
```
```
yarn run cyo
```

Mặc định cypress sẽ có một file sample cho bạn chạy thử, đương nhiên là nó sẽ không test gì cả rồi :v

# Let's write some tests
Như mình nói ở trên thì yêu cầu cần có spec, requirement đầy đủ. Vì nếu không thì bạn sẽ dựa theo tiêu chí nào để test, phải không nào? Và khi đã có đủ yêu cầu thì bước tiếp theo không phải ngồi viết code luôn mà sẽ là xây dựng test case - một công việc không mấy quen thuộc với dev phải không nào. Lúc này thì phải chạy sang QA đấm lưng bóp vai để xin test case hoặc nhờ chỉ để tự viết test case thôi (biết thêm cả test thì cũng đâu có thiệt cho chúng ta phải không nào :v)

Sau khi đã có đủ nhưng thứ trên thì giờ mới là code. Mình muốn dùng code trong dự án của bản thân hơn nhưng vì lí do bảo mật nên mình sẽ dùng tạm đoạn code trên trang chủ cypress nhé. Bạn có thể sự dụng command sau để tạo ra file test:
```
touch cypress/integration/sample_spec.js
```

```javascript
describe('My First Test', () => {
    it('Visits the Kitchen Sink', () => {
        cy.visit('https://example.cypress.io');
    });
});
```

Ở đây thì mình đang yêu cầu cypress kiểm tra việc truy cập qua link https://example.cypress.io

![](https://images.viblo.asia/0f412312-7350-4d33-9cb9-acd61bd8d6dc.gif)

Giờ mình sẽ kiểm tra thêm xem có chứa chuỗi `Querying` không
```javascript
describe('My First Test', () => {
    it('Visits the Kitchen Sink', () => {
        cy.visit('https://example.cypress.io');

        cy.contains('Querying');
    });
});
```

Và đây là kết quả:
![](https://images.viblo.asia/84d21410-0b56-453e-bd1e-1775bce0c244.png)

Thử đổi lại thành `Queries` để nó báo lỗi nhé

![](https://images.viblo.asia/a20eaf67-57a1-46ec-a695-b7703835cf1d.png)

Nhưng bản thân mình thì mình sẽ không thích cái `contains` này lắm, `contains` sẽ chỉ kiểm tra có tồn tại chuỗi hoặc element bạn truyền vào hay không, còn nếu muốn kiểm tra một cách chính xác thì mình sẽ dùng cách sau:

```javascript
describe('My First Test', () => {
    it('Visits the Kitchen Sink', () => {
        cy.visit('https://example.cypress.io');

        cy.get('.home-list>li').first().find('a').first().should('have.text', 'Querying');
    });
});
```

Như bạn thấy nó đã kiểm tra chính xác được rằng ở đoạn mình muốn có chuỗi là `Querying` không. Nhưng mà tất nhiên viết thể này sẽ không ổn. Thứ nhất nó quá dài. Thứ hai là chúng ta đang truy vấn theo những thứ như tên class, thẻ - đó là những thứ dễ bị thay đổi. Vậy thì lời khuyên ở đây là gì, là chúng ta hãy thêm một attribute cho những thứ chúng ta phải test, ví dụ ở đoạn kia code trên trang cypress đang là như này:

```
<a href="/commands/querying">Querying</a>
```

Thì bạn hãy đổi thanh như này:
```
<a data-cy='title' href="/commands/querying">Querying</a>
```

Lúc này thì câu lệnh của chúng ta sẽ chỉ còn là:
```javascript
 cy.get('[data-cy=title]').should('have.text', 'Querying');
```

Thử thêm một đoạn click vào element chúng ta get nhé
```javascript
describe('My First Test', () => {
    it('Visits the Kitchen Sink', () => {
        cy.visit('https://example.cypress.io');

        cy.get('.home-list>li').first().find('a').first().should('have.text', 'Querying').click();
    });
});
```
Hãy thử và xem kết quả nhé :D

Về những action thì bạn có thể đọc tại đây: https://example.cypress.io/

Còn ở trên bạn thấy mình dùng `should` - đó là một assertion, bạn có thể đọc tại đây: https://docs.cypress.io/guides/references/assertions.html#BDD-Assertions

![](https://images.viblo.asia/f01317e0-9c2f-44b6-9ce4-ae088d45c57e.gif)

Bài viết hôm nay của mình đến đây thôi, cũng chưa phải toàn bộ mọi thứ, nên các bạn nhớ vào docs tìm hiểu thêm nhé

Link docs: https://docs.cypress.io/guides/overview/why-cypress.html

Và nhớ đọc cả Best practices nhé:
https://docs.cypress.io/guides/references/best-practices.html