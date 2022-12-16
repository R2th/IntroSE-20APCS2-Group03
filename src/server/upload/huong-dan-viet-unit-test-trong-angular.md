Việc viết Unit test gần như là bắt buộc trong mỗi dự án, nhưng bạn đã thực sự hiểu hết những lợi ích của nó chưa? Trước khi bắt tay vào thực hành viết Unit test, chúng ta nói qua một chút về lợi ích của nó nhé!
## Lợi ích của Unit test
* **Cải thiện design**: Bắt tay vào code mà không để ý quá nhiều đến design là một lỗi phổ biến của các developer, việc viết unit test sẽ bắt buộc bạn phải suy nghĩ, thậm chí nghĩ đi nghĩ lại về design
* **Dễ dàng refactor**: bởi vì bạn đã có các case test đảm bảo code của bạn chạy đúng như mong đợi, bạn có thể dễ dàng refactor code mà không lo sẽ tạo ra những bug mới
* **Thêm tính năng mới mà không làm ảnh hưởng đến các tính năng cũ**: thêm code mới mà chạy test thấy đỏ là biết sai rồi nhé :v
* **Test là một tài liệu về spec**: nếu viết test chuẩn và đủ case, thì chỉ cần đọc test, ta cũng có thể hiểu rõ spec còn nhanh hơn cả đọc code
* **Việc viết test giúp developer tự tin hơn**

Bạn có thể cho rằng việc viết test quá tốn thời gian, nhất là viết test FE, có khi nó còn lâu hơn cả viết code nữa, nhưng mình nghĩ nó sẽ giúp tiết kiệm thời gian hơn khi bạn muốn refactor code hay phát triển tính năng mới, giảm thiểu được cả thời gian để fix bug so với việc không viết test.

Giờ chúng ta sẽ bắt tay vào một ví dụ nhỏ nhưng khá đầy đủ sử dụng Angular, Jasmine và Karma. Phần tiếp theo của bài viết sẽ đề cập đến những điều sau:
* Giải thích một chút về Karma và Jasmine
* Karma config
* Tạo một file test đơn giản
* Test angular form
* Test component với service

## Tạo project Angular với Jasmine và Karma
Install angular-cli và tạo project mới
```markdown
npm install -g @angular/cli
ng new angular-unit-testing
```
Giải thích 1 chút về Jasmine và Karma không lại bảo nãy giờ cứ nói hoài mà không biết là gì
- **Jasmine**: là một framework dùng để viết test, nó có các function có sẵn hỗ trợ viết các loại test khác nhau
- **Karma**: là một Javascript tool được sử dụng để load ứng dụng và thực thi test của bạn. Karma sẽ được thực thi bằng dòng lệnh và sẽ hiển thị kết quả cho bạn biết mỗi khi bạn chạy trình duyệt.

Để chạy thử chỉ cần gõ `ng test`. Lệnh này sẽ thực thi các case test, mở trình duyệt, hiển thị kết quả trên trình duyệt và trong console.

## Karma config
Giờ hãy nhìn vào file Karma config được sinh ra từ angular-cli
![](https://images.viblo.asia/5a152163-d0a9-4132-950a-a02be600036e.png)
Chắc bạn cũng đoán được các config này dùng để làm gì, nhưng hãy lướt qua một chút nhé
* **frameworks**: đây là nơi jasmine được set là framework để testing, nếu bạn muốn dùng 1 framework khác thì có thể điền vào đây.
* **autoWatch**: nếu nó được set là true, test sẽ chạy chế độ watch mode, có nghĩa là mỗi khi bạn thay đổi bất cứ dòng code nào trong file test và lưu lại, nó sẽ tự động build lại và chạy lại.
* **browsers**: đây là nơi để set trình duyệt và test sẽ chạy, mặc định sẽ là Chrome, nhưng bạn có thể sử dụng trình duyệt khác bằng cách khai báo ở đây.
## Bắt đầu với một file test đơn giản
Giờ bắt đầu viết test với `app.component.ts` nhé! Component này chỉ có 1 thuộc tính text với nội dung "Angular Unit Testing" được đặt trong thẻ `<h1>`. Giờ hãy tạo 1 file test để kiểm tra component có thực sự chứa thuộc tính đó không, cũng như nội dung hiển thị trong HTML có đúng không.

![](https://images.viblo.asia/f3e0d5bb-05fa-4cd3-a594-0294f6814dea.png)

Lướt qua 1 chút thì ở đây chúng ta đã
- import các thư viện angular testing mà chúng ta sẽ sử dụng
- Import các component phụ thuộc
- Sử dụng `describe` để bắt đầu phần viết test với title trùng với tên component test.
- Sử dụng `async` trước mỗi case test, mục đích là để các phần code không đồng bộ có thể kết thúc trước khi tiếp tục, nó tương tự với cách dùng async lúc viết code ý.

Trước khi chạy bất cứ case test nào trong Angular, bạn cần phải config Angular testbed. Nó giúp tạo 1 môi trường cho component đang được test. Bất cứ module, component, service nào mà component bạn đang test cần, thì đều phải được đưa vào trong testbed. Cuối cùng, sau khi config xong, bạn sẽ gọi đến hàm `compileComponents()`.

Tiếp theo, chúng ta có 2 case test. Mình sẽ giải thích từng case một:

Case đầu tiên, chúng ta sẽ kiểm tra xem component có thực sự chứa text chúng ta kì vọng trong phần title hay không. Đầu tiên, chúng ta cần 1 instance của app.component, vì vậy chúng ta sử dụng hàm `createComponent()`, tạo 1 đối tượng fixture, cho phép chúng ta tạo 1 instance của component. Sau khi đã có instance của app.component, chúng ta có thể kiểm tra giá trị của thuộc tính title có giống với text chúng ta kì vọng hay không bằng hàm `toEqual()`.

Ở case thứ hai, cũng tương tự case đầu tiên, ta sẽ kiểm tra xem thẻ `<h1>` có chứa text chúng ta kì vọng không. Đầu tiên cũng thực hiện giống phần trên, sau đó gọi đến hàm `detectChanges()`, hàm này sẽ áp dụng các thay đổi mới nhất vào HTML. Sau đó lấy ra các phần tử của HTML và kiểm tra xem thẻ `<h1>` có chứa đúng text không.

## Test angular form
Bắt đầu với 1 file HTML contact.component.html có chứa form

![](https://images.viblo.asia/89cdfd0d-95c6-433b-b1e7-17699956ca36.png)

Form này khá đơn giản nên không cần giải thích gì nhiều. Nút submit sẽ bị disabled nếu form invalid.

Tiếp theo đến contact.component.ts

![](https://images.viblo.asia/9d1f50d4-5c1b-41a4-87d4-f219457d2f74.png)

File này cũng đơn giản nhé, hàm `onSubmit()` thay đổi biến `submited` thành true, form có 3 controls với validate.

Giờ đến file test

![](https://images.viblo.asia/067a50ce-a663-42dc-974c-01939e748f4d.png)

Trông phức tạp hơn nhiều so với file test trên nhỉ, đừng lo, mình sẽ giải thích cụ thể từng phần đây :smiley: 

Đầu tiên vẫn là phần import, không có gì khác lắm, ngoại trừ import thêm `By` để chọn element từ DOM.

Trong `beforeEach()`, ta dùng `promise` cho hàm `compileComponent()`, khi `promise` được resolved, chúng ta sẽ tạo instance của component trong này luôn, để đỡ phải viết lại trong mỗi case test.

Case đầu tiên chỉ đơn giản là kiểm tra giá trị thuộc tính `text` của component.

Case thứ 2 kiểm tra giá trị của biến `submitted`là true khi hàm `onSubmit()` được gọi đến.

Ở case thứ 3, ta sẽ apply trạng thái của HTML bằng cách sử dụng hàm `detectChanges()`, sau đó lấy submit button từ DOM, và thực hiện sự kiện click. Trước tất cả, ta cần tạo một `spy` cho hàm `onSubmit()` của component. Sau cùng, ta kì vọng hàm `onSubmit()` không được thực thi, vì button Submit sẽ bị disabled khi form ở trạng thái invalid.

Case thứ 4 kiểm tra khi truyền vào những giá trị invalid, thuộc tính valid của form sẽ là false.

Cuối cùng, case thứ 5 ngược lại với case thứ 4, khi truyền vào những giá trị valid, thuộc tính valid của form sẽ là true.

Trước khi kết thúc bài viết, chúng ta sẽ đến với phần cuối cùng, là làm sao xử lý service khi component cần test sử dụng chúng.

## Test component với service

Khi test component có sử dụng service, ta phải thêm nó vào phần provider trong `beforeEach()`. Phần lớn trường hợp thì bạn sẽ không cần dùng đến service thực tế, cùng xem làm thế nào để mockup nó nhé

Ví dụ một component sử dụng service

![](https://images.viblo.asia/f353efc9-cbe5-446f-8368-1b11450603fa.png)

Component này sẽ gọi sang service để lấy danh sách users, lúc viết test thì việc lấy users từ đâu cũng ko quan trọng, nên ta có thể tạo component mocking cho service này.

![](https://images.viblo.asia/501ff7fe-a732-433f-889b-8ea8bde7171a.png)

Về cơ bản thì cũng giống mấy ví dụ trên, chỉ khác ở chỗ khi `UserService` được gọi đến, nó sẽ thay bằng `UserServiceMock`. `UserServiceMock` là một dummy service để trả về dummy data để chạy test.  Vậy thôi, đó là cách bạn nên dùng để mock service cho component. 

Nguồn: https://medium.com/swlh/angular-unit-testing-jasmine-karma-step-by-step-e3376d110ab4