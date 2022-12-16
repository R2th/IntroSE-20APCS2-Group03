## Giới thiệu

Angular là quả thực là 1 framework đáng tự hào khi có một hệ sinh thái vô cùng phong phú - với công cụ được xây dựng không chỉ từ đội ngũ nòng cốt mà còn từ cộng đồng.

Trong bài này, mình sẽ liệt kê một số tool hữu ích khi làm việc với Angular.

Mình sẽ chia danh sách thành 3 mục

* Development Tools
* Libraries
* Testing

Let’s start!

## Development Tools

### 1. [Angular State Inspector](https://chrome.google.com/webstore/detail/angular-state-inspector/nelkodgfpddgpdbcjinaaalphkfffbem?hl=en)

So với [Augury](https://augury.rangle.io/)(nổi tiếng hơn), tool này thực hiện một điều và nó làm rất tốt: nó cho phép kiểm tra trạng thái trên phạm vi của từng thành phần DOM.

Bằng cách nhấp chuột phải vào một phương thức hoặc một thuộc tính, bạn có thể lưu trữ nó vào console dưới dạng một biến toàn cục, cho phép bạn truy cập theo chương trình vào bất kỳ thành phần nào ngay từ console của bạn.

Nó tích hợp với Chrome Dev Tools, nó nhanh và nhẹ. Nếu bạn cần một cái gì đó đầy đủ tính năng hơn, bạn có thể thích Augury, nhưng hãy nhớ rằng nó sẽ là một trải nghiệm chậm hơn nhiều.

![](https://images.viblo.asia/f7701157-dae0-4f40-8863-0e8c728fb306.png)

### 2. [Bit](https://bit.dev/)

Bit (Github) là một công cụ CLI và một component hub cho phép bạn đẩy các component có thể tái sử dụng trực tiếp từ bất kỳ dự án Angular nào đến một bộ sưu tập được chia sẻ trong bit.dev.

Bit đặc biệt hữu ích như một cách để xây dựng một thư viện component, dần dần và hợp tác. Nó cho phép bạn xuất các component có thể tái sử dụng sang một bộ sưu tập được chia sẻ. Không cần thêm repo hoặc cấu hình vô tận.

Các component có thể được xem trực tiếp trên Bit, được cài đặt bằng NPM / Yarn hoặc collaborated, bit import.

![](https://images.viblo.asia/64168c1b-0118-4eee-9d29-d01a7c61c37e.gif)

Bit rất đơn giản để sử dụng. Không cần nhiều hơn một vài lệnh đơn giản để xuất một hoặc nhiều component từ bất kỳ cơ sở mã nào sang bộ sưu tập trong [bit.dev](https://bit.dev/).

Ví dụ:

**Set up a Bit workspace và log in:**


```
// cài đặt Bit globally
$ npm i bit-bin -g

// cài đặt Bit workspace cho project của bạn
$ bit init

// đăng nhập tài khoản
$ bit login 
```

**Cài đặt cấu hình trình biên dịch, theo dõi các thành phần và để Bit build và test từng phần tử trong một môi trường cô lập (để đảm bảo chúng có thể tái sử dụng thực sự):**

```
// install an Angular compiler
$ bit import bit.envs/compilers/angular --compiler

// add your component and set an entry point
$ bit add src/app/my-comp  --main src/app/my-comp/my-comp.module.ts

// tag all components (test, build & lock version)
$ bit tag --all 1.0.0
```

### 3. [Stackblitz](https://stackblitz.com/)

![](https://images.viblo.asia/63a6e3c4-3095-4a4b-8df9-e009985d6e59.png)

Stackblitz đã trở thành công cụ thực tế cho các Angular developer để viết các đoạn code (hoặc thậm chí các ứng dụng toàn diện) hoàn toàn trong một trình soạn thảo dựa trên trình duyệt.

Nếu bạn muốn nhanh chóng kiểm tra ý tưởng, chia sẻ các bản demo và đoạn trích hoặc viết code trong khi bạn rời khỏi máy của mình, Stackblitz cho phép bạn xây dựng các ứng dụng đầy đủ trong trình duyệt của mình.

## Libraries

### 4. [Angular CDK / Material](https://material.angular.io/)

![](https://images.viblo.asia/503823dc-83ea-47f5-9f60-b9a4a4edfed5.png)

Có lẽ nó không cần giới thiệu, nhưng trong trường hợp bạn không biết, thì Angular Material có lẽ là thư viện component tốt nhất hiện có.

Mặc dù danh sách các component không cao lắm, nhưng mỗi component được chế tạo tỉ mỉ đến từng chi tiết nhỏ nhất: rất nhiều điểm nhấn đã được đưa vào để làm cho các component có thể truy cập cao và có thể sử dụng được - đó là điều mà không phải tất cả các thư viện component thực sự phục vụ.

Nếu bạn không cần thư viện component, chúng ta cũng có thể sử dụng CDK một cách độc lập: nếu bạn cần kéo và thả, cuộn, quản lý tiêu điểm và nhiều tiện ích khác, CDK là giải pháp hoàn hảo.

Nó được sử dụng nội bộ bởi Angular Material nhưng đã được trích xuất vào dự án riêng của mình để có thể dễ dàng sử dụng lại nếu bạn đã có thư viện của riêng mình, điều này làm cho nó trở thành một người bạn đồng hành hoàn hảo.

### 5. [FlexLayout](https://github.com/angular/flex-layout)

FlexLayout cũng là một thư viện được hỗ trợ chính thức giúp tạo ra các ứng dụng phản ứng nhanh nhờ vào khai báo API.

Nếu tên không rõ ràng, FlexLayout sẽ chuyển đổi các chỉ thị thành Flexbox properties. Flexbox không phải là hệ thống dễ làm việc nhất, nhưng FlexLayout làm cho nó hoạt động với nó là một niềm vui thực sự.

FlexLayout cung cấp một danh sách các chỉ thị cấp cao chuyển đổi thành các quy tắc CSS nội tuyến. Về cơ bản, bạn có thể xây dựng toàn bộ ứng dụng mà không cần phải sử dụng bất kỳ CSS nào!

### 6. [Ngx-Bootstrap](https://valor-software.com/ngx-bootstrap/#/)

Nếu công ty hoặc khách hàng của bạn sử dụng hệ thống thiết kế dựa trên Bootstrap, rất có khả năng bạn sẽ sử dụng thư viện này được tạo bởi [Valor Software](https://valor-software.com/).

Thư viện cung cấp một lượng lớn các thành phần native Angular cho phép bạn sử dụng Bootstrap mà không cần dựa vào thư viện jQuery đồng hành.

### 7. [Transloco](https://github.com/ngneat/transloco)

Với [ngx-translate](https://github.com/ngx-translate/core) không được làm sáng tỏ và Angular i18n cốt lõi cung cấp các giải pháp hạn chế (ít nhất là tại thời điểm viết), Transloco đã trở thành công cụ yêu thích của mình để thêm các khả năng i18n vào các ứng dụng.

Ngoài các tính năng tiêu chuẩn mà chúng ta mong đợi (tệp dịch JSON, chỉ thị cấu trúc, pipe và dịch vụ), Transloco cũng bổ sung hỗ trợ cho L10N, nhận xét cho người dịch, sử dụng nhiều ngôn ngữ cùng lúc, hỗ trợ SSR và trình quản lý khóa.

Nhờ tích hợp với Angular CLI, chỉ cần 1 lệnh để bắt đầu. Tại thời điểm này thật khó để không giới thiệu!

### 8. [NgRx](https://ngrx.io/) / [Akita](https://github.com/datorama/akita) / [NgXs](https://github.com/ngxs/store)

Chọn thư viện quản lý state cho Angular không phải là một nhiệm vụ dễ dàng cho bài viết này.

Mặc dù mình chủ yếu làm việc với NgRx, mình nghĩ rằng ba thư viện này đều có giá trị như nhau - và cuối cùng, tùy thuộc vào từng ý kiến cá nhân mà bạn nên chọn. Sẽ là không công bằng nếu bỏ đi bất kỳ thư viện nào trong số chúng. Đề nghị của mình là hãy thử tất cả chúng và xem cái nào phù hợp với phong cách của bạn hơn.

Nếu ứng dụng của bạn khá phức tạp và bạn nghĩ rằng nó có thể cần một lớp quản lý trạng thái, thì bất kỳ thư viện hỗ trợ Rx nào cũng sẽ giúp bạn làm quen trạng thái ứng dụng của bạn.

## Testing

### 9. [Spectator](https://github.com/ngneat/spectator)

Test Angular đôi khi dài dòng và đòi hỏi nhiều công cụ soạn thảo: Spectator cho phép bạn bỏ qua rất nhiều mã lặp lại bằng cách cung cấp một bộ tiện ích giúp tăng tốc nhiệm vụ viết test đơn vị theo cấp số nhân.

Không chỉ Spectator sẽ làm cho các bài test viết nhanh hơn nhiều, mà nhờ tính clear của API, code cũng sẽ cực kỳ dễ đọc, với tất cả các API kiểm tra đơn vị (đôi khi hơi khó hiểu) ẩn sau thư viện.

### 10. [Angular Testing Library](https://testing-library.com/docs/angular-testing-library/intro)

Được lấy cảm hứng từ phương pháp của [React Testing Library](https://github.com/testing-library/react-testing-library), thư viện thử nghiệm đơn vị này có một cách tiếp cận khác với các phương pháp khác hiện có.

Thư viện này không khuyến khích kiểm tra chi tiết việc triển khai từ các component của bạn càng nhiều càng tốt: thay vì tập trung vào chính cá thể component và cho phép tương tác với component theo lập trình, thư viện này giúp bạn làm việc với DOM dễ dàng nhất có thể.

Nó cung cấp các phím tắt để kết xuất các component và API rộng lớn để tương tác với các nút DOM thay vì các phần bên trong của một component. Do đó, nếu việc triển khai của bạn thay đổi nhưng hành vi được giữ nguyên, các thử nghiệm của bạn sẽ tiếp tục hoạt động trơn tru.

### 11. [Angular Benchpress](https://github.com/angular/angular/tree/master/packages/benchpress)

Sâu bên trong kho Angular là công cụ tuyệt vời này được xây dựng để thực hiện kiểm tra hiệu năng tự động trên framework Angular.

Nếu hiệu suất là một phần quan trọng trong công việc kinh doanh của bạn, thì kiểm tra tự động nhờ Angular Benchpress chắc chắn có thể là một công cụ tuyệt vời trong ngăn xếp công nghệ của bạn, đặc biệt nếu các bài kiểm tra E2E của bạn được viết bằng Protractor.

Chỉ cần chạy thử nghiệm Protractor, có thể tạo ra các kịch bản mà công cụ sẽ lặp lại trong một số lần và sẽ báo cáo các số liệu hiệu suất từ động cơ V8 ở định dạng có thể đọc được.

Ngay cả khi nó chỉ đơn giản là điểm chuẩn cho các thư viện của bạn hoặc nếu bạn tò mò muốn biết chiến lược nào hiệu quả hơn, công cụ này chắc chắn có thể khá hữu ích.

![](https://images.viblo.asia/a92381c5-c2b8-4f78-a760-4baedfc71e82.png)

nguồn: [https://blog.bitsrc.io/](https://blog.bitsrc.io/)