Trong bài hướng dẫn này, chúng ta sẽ làm một app React + node cơ bản và deploy nó tới Heroku.


Có rất nhiều bài hướng dẫn đã nói về việc này và đa phần chúng đều sử dụng commnad line, tuy nhiên, để tạo sự khác biết, ta sẽ làm và hoàn thiện mà không dùng tới command line. :D.

Ngoại trừ việc tạo ra React + Express apps, chúng ta sẽ không có lựa chọn nào khác ngoài command line. Còn với những phần còn lại, chúng ta sẽ dùng GUI.

ta sẽ coi như bạn đã có một Github và Heroku account. Còn nếu không có thì hãy vào đăng kí :v vì cả hai tài khoản này đều free :D

Sample Project:

[https://github.com/iqbal125/react-express-sample](https://github.com/iqbal125/react-express-sample)

# React and Express Setup

Đầu tiên, hãy bắt đầu bằng việc tạo 2 thư mục với tên **Server** và **Client**

![1](https://images.viblo.asia/1f9dd6a1-acba-4765-b6b9-2e8c461161dc.png)

Thư mục **Client** sẽ chứa contents của **create-react-app** command, và **Server** sẽ giữ contents của **express**. Thư viện này sẽ tự động tạo ra cho chúng ta một simple Express app, tương tự như **crate-react-app**. Nó cần được cài đặt global, bạn có thể làm điều đó bằng câu lệnh sau:

**npm install -g express-generator**

Sau đó, chỉ cần chạy các lệnh này trong mỗi thư mục tương ứng để cài đặt bạn đầu cho dự án:

**npx create-react-app app1** trong thư mục **Client**

**express** trong thư mục **Server** 

Thay đổi thư mục **app1** được tạo bởi tạo-Reac-app và chạy:

**npm run build**

Điều này sẽ tạo ra một phiên production build của project  và được tối ưu hóa cho môi trường production nó sẽ xóa error handling code và white space trong file bundle.

*Note*: Trong một development environment, bạn sẽ sử dụng một proxy tới:             [http://localhost:5000](http://localhost:5000) để liên lạc từ React app tới Express serve của bạn. Tuy nhiên, ở đây, React app và Express server chỉ là một project. Express server sẽ phục vụ React.

Tiếp theo, cut và paste toàn bộ thư mục **build** vào thư mục **Server**. Cấu trúc project của bạn sẽ trông như dưới đây:

![2](https://images.viblo.asia/7e614638-bbb2-4d62-8d03-03709230c687.png)

Bây giờ, chúng ta có thể thêm vào vài dòng code để Express server biết và sẽ phục vụ React project của chúng ta:

```javaScript
....

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

....
```

Dòng mã đầu tiên phục vụ tất cả các static file của chúng ta từ thư mục **build**

Đoạn mã thứ hai là giữ routing functional cho client side. Mã này về cơ bản phục vụ tệp **index.html** trên  unknown routes bất kỳ. Nếu không, chúng ta sẽ cần phải viết lại toàn bộ routing để làm việc với Express server.

Để kiểm tra ứng dụng của bạn, chỉ cần chạy **npm start** trong thư mục **Server** và truy cập [http: // localhost 3000](http: // localhost 3000) trong trình duyệt. Sau đó, bạn sẽ thấy ứng dụng React đang chạy của mình.

Bây giờ chúng ta đã sẵn sàng để upload project này lên GitHub.


# GitHub

Thay vì sử dụng command để tải lên GitHub, chúng ta sẽ thực hiện việc này với GUI.
Đầu tiên, hãy truy cập trang chủ GitHub và tạo một kho lưu trữ mới. Đặt một tên bất kì, nhưng hãy đảm bảo có tick vào **Initialize this Repository with a README**:

![3](https://images.viblo.asia/7001e7d4-1516-419a-89e8-fdbd378031d3.png)

Tiếp theo, upload tất cả các project file mà không có thư mục **node_modules** (đã được thêm trong .gitignore).

![4](https://images.viblo.asia/6bc5289f-dcb9-4f4e-88cc-a35ee0a0f4c6.png)

Click  vào commit và chúng ta đã hoàn tất. Các project file đã tải lên của bạn sẽ xuất hiện trên GitHub như sau:

![5](https://images.viblo.asia/7fe5d353-ec76-4344-99de-a4b8ccaf6985.png)

Bây giờ chúng ta có thể chuyển sang thiết lập Heroku.

# Heroku

Hãy đến Heroku dashboard, tạo một ứng dụng mới và đặt tên bất kì.

Tiếp theo, đi tới Deploy tab và chọn GitHub trong phương thức Deployment:

![6](https://images.viblo.asia/f2802666-0247-434c-ae03-8c7379c4d829.png)

Nếu bạn chưa kết nối tài khoản GitHub của bạn với tài khoản Heroku , bạn sẽ được nhắc thông qua GitHub Auth flow.

Sau đó, tìm kiếm dự án của bạn trên GitHub và kết nối với nó:

![7](https://images.viblo.asia/46ae0f10-a464-460f-88a8-d3a625a47ffa.png)

Cuối cùng, chúng ta có thể deploy ứng dụng của mình bằng cách nhấp vào nút Deploy Branch:

![8](https://images.viblo.asia/0bd1e103-3748-47dc-8cf9-a94d5d7eb6c7.png)

Heroku sẽ tự động cài đặt tất cả các Node modules cho bạn. Bạn có thể xem project của mình bằng cách nhấp vào nút View.

Và thế là chúng ta đã hoàn thành xong! 

# Tổng kết

Cảm ơn các bạn đã đọc bài hướng dẫn của tôi, hi vọng sẽ giúp các bạn một chút gì đó.

[Bài tham khảo](https://www.freecodecamp.org/news/deploy-a-react-node-app-to/?fbclid=IwAR2EXiPUjtizjAkKJ8TB2xEaVoLlyETXXHWNxduMXC2Db7Cqp5UawI4xgfs)