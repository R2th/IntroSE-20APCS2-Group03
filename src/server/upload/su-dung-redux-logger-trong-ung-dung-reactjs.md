## Redux-logger là gì?
Khi bạn xây dựng 1 ứng dụng ReactJS, việc quản lý, xem xét các action, state của ứng dụng nhỏ thì khá là đơn giản, bạn chỉ việc log chúng ra màn hình bằng câu lệnh huyền thoại: **console.log()**. Nhưng, nếu ứng dụng lớn thì sao ạ, thử tưởng tượng bạn gọi 1 action mà lại không có kết quả như bạn mong muốn, và bạn muốn tìm lỗi ở đâu, rồi bạn đi theo data flow và mỗi chỗ bạn nghi ngờ là bạn lại log kết quả ra, kết quả là 1 đống console ra màn hình, nó vừa làm bạn mất thời gian lần theo dataflow lại có thể khiến bạn bối rối vì nhiều nội dung được in ra màn hình quá mà lại không rõ nội dung được in ra đó của action nào. Do đó hôm nay mình muốn giới thiệu với bạn 1 công cụ hữu ích để làm việc đó, đó là `redux-logger`.

**Redux-logger** là gì thì nó là 1 công cụ cho phép bạn xem lại nhật ký của các hoạt động, trạng thái trong redux, nó cho phép bạn xem lại các vấn đề xảy ra trong redux trên trình duyệt. Nói đơn giản là nó sẽ hiển thị lên trình duyệt các luồng sự kiện, data của ứng dụng, khi bạn thực thi 1 action nào đó. Để hiểu hơn về những gì nó làm, chúng ta cùng đi vào ví dụ cụ thể nhé.
## Cài đặt môi trường và server
1. Cài đặt môi trường:

    Ở bài  [trước](https://viblo.asia/p/cac-dependencies-can-thiet-va-cach-tao-project-ractjs-boilerplate-don-gian-3Q75waN7ZWb) mình có giới thiệu các bạn cách xây dựng ứng dụng reactjs đơn giản, ở bài này, mình tiếp tục sử dụng nó, cùng với react-saga middleware để xử lý các request API. API trong bài này chúng ta sẽ dùng, json-server library, đừng lo lắng, nó sẽ đơn giản lắm nhé.

Đây là file package.json:

![](https://images.viblo.asia/2733fc29-3bee-4d67-83bf-d7f05bd0bc0d.png)

Mình giới thiệu chút về những dependence và dev-dependence mà lần cài đặt trước ko có nhé:
* **axios**: là một HTTP client được viết dựa trên Promises được dùng để hỗ trợ cho việc xây dựng các ứng dụng API từ đơn giản đến phức tạp và có thể được sử dụng cả ở trình duyệt hay Node.js
* **@babel/plugin-proposal-class-properties**: là plugin để chuyển đổi các class property cũng như các properties khai báo với phương thức khởi tạo property. Nói đơn giản là bạn sẽ ko sử dụng được class property nếu bạn ko có plugin này, và bạn cũng sẽ ko sử dụng để khai báo component = arrow function đươc.
* **@babel/runtime** và **@babel/plugin-transform-runtime**: @babel/runtime là một gói chứa polyfill và nhiều thứ khác mà Babel có thể tham chiếu. Khi transpiling mã của bạn, Babel sẽ thực sự tiêm helper để mô phỏng các tính năng không được hỗ trợ bởi phiên bản ES bạn nhắm mục tiêu. Theo mặc định, những helper không được chia sẻ giữa các đơn vị biên dịch (các tệp). Nhóm Babel mặc dù có thể thú vị khi quyết định chúng ở một nơi, cho phép tiết kiệm không gian khi chúng được sử dụng nhiều lần.
Vấn đề này đã được giải quyết bằng cách tạo babel-plugin-transform-runtime plugin, giúp thay thế các trình trợ giúp tiêm theo yêu cầu thích hợp của babel-runtime mô-đun. Bằng cách đó, những người giúp đỡ được chia sẻ trên codebase và tránh trùng lặp.

Sau khi install các dependence và các dev dependence đó, chúng ta cấu hình webpack và babel như sau: 

![](https://images.viblo.asia/87e4fda7-086c-4687-9a42-dd485405e940.png)

![](https://images.viblo.asia/3c0c831b-1e85-49aa-8bb0-b0af617158b5.png)

Ngoài file “index.html" mình chuyển sang folder “public" thì mọi thứ vẫn như cũ nhé, bạn chạy npm start, và xem kết quả.

Dưới đây là file “index.js" 

![](https://images.viblo.asia/33e34f9c-6f88-475c-ad4c-8855519d2f60.png)

2. Xây dựng server đơn giản với json-server:
* Trước tiên bạn cài ***json-server*** global: `npm i -g json-server`
* Sau đó bạn thêm folder “server", trong đó có file db.json nội dung như sau:

![](https://images.viblo.asia/612a7130-637b-440b-8397-ea9edde3a491.png)

* Mở terminal ở folder “server", gõ lệnh: `json-server --watch db.json`, lệnh này sẽ chạy port **3000** các route: ***“posts", “comments", “profile"*** như ta định nghĩa trong file **“db.json"**. (Bạn có thể mở port 3000 này trên browser để xem kết quả nhé)

![](https://images.viblo.asia/3ff88063-8f7a-4ecd-8ffe-b12488e6c1d9.png)

Đến đây là xong phần cài đặt môi trường và simple server, chúng ta bắt đầu vào xây dựng ứng dụng nào.

## Cấu hình React App.
* Tạo folder **“constants"** trong **“src"**, trong đó thêm file **“index.js"** export ra 3 biến sẽ được dùng trong *actions* và *reducers* sau:

![](https://images.viblo.asia/abe20326-1ebd-46cc-bdd3-c4b86d3cbc5e.png)

* Tạo tiếp folder **“action"** với file **“index.js"** , các action này được dùng để thay đổi state app:

![](https://images.viblo.asia/a4ca67ac-c2b7-4a3e-97dc-e2265e835587.png)

* Sau actions sẽ là folder **“reducers"** với ***“payloadData”*** là reducer xử lý các action liên quan đến get data từ api, trong ví dụ này mình chỉ get *“posts"* từ API và ***“index"*** là nơi lưu trữ root reducer.

![](https://images.viblo.asia/a6c4fb19-aa51-4caf-a198-20f84b288e9a.png)

![](https://images.viblo.asia/dca3f25b-a0b7-4ec4-8e71-e4869d25e5c2.png)

* Cấu hình saga middleware trong file **“index"** ở thư mục **saga**, nơi thực hiện API request:

![](https://images.viblo.asia/9684d7e2-a350-4da3-b304-20374a207feb.png)

* Mình dùng **“Post”** component để hiển thị từng bài post trong posts list lấy từ API, ở đây mình chỉ dùng *title* và *author* để hiển thị:

![](https://images.viblo.asia/6f5c0673-0d41-4e48-99d3-d0e6f47e196c.png)

* Và **“App"** container để thực hiện action fetch data từ API:

![](https://images.viblo.asia/f21daa7a-0cd3-41a9-9fad-7a172e45ef69.png)

* Cuối cùng, quan trọng nhất là cấu hình middleware và sử dụng ***redux-logger*** trong app của bạn:

![](https://images.viblo.asia/02ba8c8f-e37e-4330-8813-743b10287a3e.png)

Oki. vậy là tất cả đã xong, mở trình duyệt ở ***“http://localhost:8080”*** xem kết quả nào, nhớ phải bật màn hình **console** lên nhé:

![](https://images.viblo.asia/567f1996-cd77-47a6-9d01-96e093fec205.png)

* Hãy quan sát thật kỹ khi nhấn nút “fetch" nhé

![](https://images.viblo.asia/78f8b4fc-f7f2-476d-83f9-3472926551ce.png)

Sau khi **“fetch"** dữ liệu của chúng ta nhận được từ server đã đổ sang thành 1 list data, và quan trọng hơn, các action mà app chúng ta đã gọi, dữ liệu trước và sau khi thực hiện action thay đổi như thế nào. 
Ví dụ, trước khi thực hiện action **“API_CALL_REQUEST”** giá trị ***“fetching"*** trong ***“pre state"*** có giá trị là ***“false”***, nhưng sau khi thực hiện action, giá trị của nó trong ***“next state"*** là ***“true"***. Hay trước khi thực hiện action ***“APICALLSUCCESS”***, giá trị của ***“posts”*** trong ***“pre state"*** là mảng rỗng, nhưng sau khi thực hiện action, giá trị của nó trong ***“next state"*** là mảng có 8 phần tử.

## Kết luận
Hy vọng bài này có ích cho các bạn. Hẹn gặp lại vào các bài sau nhé.

Tài liệu tham khảo: https://viblo.asia/p/redux-saga-gAm5yqLA5db