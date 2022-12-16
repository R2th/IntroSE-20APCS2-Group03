Đối với ai đã từng làm việc với ReactJS thì chắc hẳn bạn sẽ có những lúc đau đầu vì không biết phải tổ chức code như nào cho hợp lý. Nhất là khi kết hợp với redux hoặc redux-saga thì project sẽ ngày càng phình to ra. Và đến 1 thời điểm nào đó khi bạn muốn maintain, nhìn lại toàn bộ thư mục Project lộn xộn thì có lẽ bạn sẽ chỉ muốn tắt luôn màn hình. Vậy để làm thế nào để có thể xây dựng và quản lý project 1 cách tốt nhất!? 

Nếu như lên trang chủ của reactJs thì bạn sẽ được hướng dẫn là sử dụng câu lệnh `create-react-app` để render 1 sample app có setup những package cần thiết cho app. Tuy nhiên thì đó cũng chỉ là sample app mà thôi, còn nếu muốn áp dụng được vào các dự án thực tế thì hôm nay mình sẽ giới thiệu với các bạn 1 best practice có thể gọi là Frame work giành cho ReactJS đó là **React-boilerplate**.
## **Giới thiệu về React-boilerplate**
React-boilerplate là 1 dự án open source, các bạn có thể truy cập vào [đây](https://github.com/react-boilerplate/react-boilerplate) để tìm hiểu về nó. Ngay trên cùng của trang ta có thể đọc được tiêu đề giới thiệu có nội dung là:

> A highly scalable, offline-first foundation with the best developer experience and a focus on performance and best practices.
> 
<br/>

Theo như lời quảng cáo thì đây là 1 "khuôn mẫu" có tính mở rộng cao, với nền tảng Offline-first, đề cao hiệu năng của ứng dụng và được sự support của những developer nhiều kinh nghiệm nhất trên thế giới. Chỉ nghe qua thôi là đã muốn lao vào để sử dụng nó ngay lập tức rồi.

Thật vậy, với việc sử dụng các module hỗ trợ việc bundle gần như là tốt nhất hiện nay như **Babel** hay **Webpack** thì việc nhiều người lựa chọn React-boilerplate cho dự án của mình cũng là điều dễ hiểu. 

Sau đây chúng ta hãy cùng lướt qua 1 lượt cấu trúc của React-boilerplate

## **Cài đặt môi trường**
Đầu tiên các bạn clone thằng React-boilerplate này về

` git clone https://github.com/react-boilerplate/react-boilerplate.git  `
 
 Sau đó vào trong folder  `react-boilerplate` và chạy lệnh `npm run setup` để nó tự động setup môi trường. Chú ý là phiên bản node của bạn là phải từ `8.15.1` trở lên thì mới cài được đầy đủ các package. Sau khi cài xong thì ta sẽ được 1 cây thư mục như này:
 
 ![](https://images.viblo.asia/c3994f96-50f0-4d75-ab75-ea61ea3b1696.png)
## **Modules**
Đầu tiên chúng ta cùng xem file `package.json` để xem ta sẽ làm việc với những package nào nhé!

![](https://images.viblo.asia/90890dbb-c83d-4ace-9754-65eb03fcd2a9.png)

Mình sẽ điểm qua những package mà mọi người cần phải chú ý tới:

- `Babel`, `react`, `redux`, `redux-saga`: Những cái này mọi người quá quen thuộc rồi nên chắc mình không cần phải nói tới nữa :D
- `connected-react-router` và `react-router-dom` : Đây chính là 2 thằng dùng để điều hướng các route trong app của chúng ta sau này
- `history`: 1 thư viện của JavaScript để quản lý lịch sử các session. Nó cung cấp cho ta 1 số method để cho việc điều hướng các router trở nên dễ dàng hơn
- `immer`: Thằng này thì khá là mới, trong những phiên bản React-boilerplate trước thì việc kiểm soát dữ liệu trong store sẽ do `ImmutableJS` đảm nhiệm, tuy nhiên thì do `ImmutableJS` không còn được phát triển nữa nên các developer bên Bp đã thay thế nó bằng `Immer`
- `intl`: Giống như I18n, React-boilerplate cũng hỗ trợ cho việc sử dụng đa ngôn ngữ trong app
- `prop-types`: Khai báo type của các Props mà bạn sử dụng
- `reselect`: reselect là một thư viện giúp cho việc lấy dữ liệu trở nên dễ dàng hơn. React-boilerplate sẽ lưu cache state và select state cho component rất nhanh.
- `styled-components`: React-boilerplate sử dụng styled component tối ưu hiệu năng tải css trong html, dễ dàng maintain và quản lý. Nôm na bạn có thể hiểu là nó sẽ sử dụng các thuộc tính css như là các Component vậy
- `jest`: Trong React-boilerplate chúng tra sẽ viết Unit test bằng Jest nhé
- `prettier`, `eslint`,`stylelint`: Các thư viện dùng để check convention code

Ngoài ra còn 1 số thư viện khác có trong project, các bạn cứ tìm hiểu dần cũng được, không cần phải vội đâu :D
## **App**
Tiếp theo ta sẽ vào trong thư mục, nơi chứa source code chính để xem họ tổ chức code như thế nào nhé.

![](https://images.viblo.asia/957a683a-ffbb-4a9a-b363-08ed9393057c.png)

Trong app thì chúng ta sẽ chú ý tới 2 folder chính đó là **Components** và **Containers**. Đúng như tên gọi thì Component là nơi chứa các component chỉ đơn giản với mục đích là hiển thị ra View, còn Container là nơi giao tiếp với Store nên trong mỗi folder con của Containers sẽ có thêm các file liên quan như là **actions**, **reducer**, **selector**. 

Với cách quản lý như này thì khi gặp 1 bug nào đó thì ta có thể nhanh chóng điều tra và khoanh vùng xem lỗi đó xảy ra trong folder nào, như vậy việc debug cũng sẽ trở nên dễ dàng và tốn ít thời gian hơn.

Một điều thú vị nữa là trong Bp họ cũng đã áp dụng React-hooks vào trong code của mình, cho nên sẽ là điều tuyệt với nếu như bạn đang muốn tìm hiểu về Functional Programming trong React.
## **Configs**
Về 1 số file config trong app như là: **webpack.base.babel.js, configureStore, babel.config.js, jest.config.js...** hay là các file config dùng để check convention code thì các bạn có thể tự edit lại tuỳ theo yêu cầu của mỗi dự án, không nhất thiết phải giữ nguyên theo thằng React-boilerplate.
## **Kết luận** <br/>
Ngoài những phần cơ bản mà mình đã giới thiệu ở trên thì React-boilerplate vẫn còn khá nhiều những tính năng khác khá là hay, mà mình nghĩ các bạn có thể tìm hiểu được khi tiếp xúc trực tiếp với nó.

Hy vọng qua bài viết này, các bạn có thể tận hưởng được những trải nghiệm tốt nhất khi áp dụng 'FrameWork' React-boilerplatevào dự án của mình.