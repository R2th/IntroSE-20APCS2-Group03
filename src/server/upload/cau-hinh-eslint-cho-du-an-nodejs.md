Với những dự án Nodejs sự hiểu biết về các khái niệm và các quy tắc của Eslint khá hữu ích để làm cho code của bạn được clean hơn. Eslint là một mã nguồn mở được xây dựng bởi  Nicholas C. Zakas vào năm 2013 với mục đích cung cấp một tiện ích linting cho Javascript.
Linting là quá trình kiểm tra source code cho các lập trình giúp tối ưu code, tìm lỗi và các bug tìm năng. Điều này hữu ích khi xác định những lỗi phổ biến trong quá trình phát triển.

**Cài đặt Eslint trên dự án Nodejs**

Để cấu hình Eslint trên dự án Nodejs bạn cần cài đặt Eslint bản global trên máy tính bằng lệnh: `npm install eslint -g`

![](https://images.viblo.asia/aad6ae88-99dc-4a74-8353-e08c3ac532b3.png)

Cài đặt ESLint bản global cho phép chạy init để tiến hành cấu hình eslint cho project.
Trong root của project chạy lệnh `eslint --init` để tạo file config *.eslintrc*.  Eslint sử dụng file này để xác định những quy tắc được áp dụng trong quá trình phát triển code của bạn.
Trong quá trình khởi tạo, eslint sẽ hỏi một số câu hỏi để thiết lập tệp cấu hình.

* **Bạn sử dụng eslint như thế nào? (How would you like to use ESLint?)**

    ![](https://images.viblo.asia/7f8060d4-c544-4cfc-a9a0-a9a3a8377969.png)
    
    * **To check syntax only**: giúp bạn kiểm tra lỗi cú pháp phù hợp với các tiêu chuẩn được thiết lập.
    * **To check syntax and find problems**: giúp bạn kiểm tra tính chính xác của cú pháp và giúp tìm ra bất kỳ vấn đề nào trong source code mã của bạn.
    * **To check syntax, find problems, and enforce code style**: giúp bạn kiểm tra cú pháp, tìm các vấn đề và convince coding bạn phải tuân thủ một tiêu chuẩn mã hóa cụ thể như Airbnb, Google và kiểu mã hóa Tiêu chuẩn khác.

* **Module được sử dụng trong project ? (What type of modules does your project use?)**

    ![](https://images.viblo.asia/778aabf9-202b-4e57-a7c9-553c0a62475b.png)
  
    * **Javascript module (import/export)**: Nếu project của bạn sử dụng babel bạn nên chọn option này. Với những dự án Vuejs, Angular, React ... mặc định đã sử dụng babel.
    * **CommonJS (require/exports)**: Option này được sử dụng cho những dự án sử dụng CommonJs.

* **Framework được sử dụng trong project? (Which framework does your project use?)**

    ![](https://images.viblo.asia/f0e047ff-53f5-45af-9d03-54bb0c470e1b.png)

    * **React**: Nếu bạn sử dụng với React.
    * **Vue.js**: Nếu bạn sử dụng với Vuejs.
    * **None of these**: Khi bạn sử dụng những framework khác.
 
*  **Code của bạn được thực thi ở đâu? (Where does your code run?)**

    ![](https://images.viblo.asia/436285aa-461a-4348-b674-09ed5cdfaa0f.png)

    *  **Browser**: Nếu project của bạn chạy trên browse như React, Vuejs...,
    *  **Node**: Nếu project của bạn thực thi bằng Node.

* **Sử dụng style cho project? (How would you like to define a style for your project?)**

    ![](https://images.viblo.asia/02974470-c864-468d-b8f9-03a08cbe12c2.png)

    * **Use a popular style guide**: Cho phép bạn chọn một trong số các style phổ biến như Airbnb, Standard và Google style guide, nên chọn tùy chọn này.
    * **Answer questions about your style**: Tùy chỉnh style.
    * **Inspect your JavaScript file(s)**: Tùy chỉnh style.

* **Định dạng file config? (What format do you want your config file to be in?)**

    ![](https://images.viblo.asia/da0e1455-8d1e-4340-85dd-afad2d0aee81.png)
    
    * **Javascript**: Thông tin cấu hình trong file .js.
    * **YAML**: Thông tin cấu hình trong file .yaml.
    * **JSON**: Thông tin cấu hình tronng file .json.
   
   
 Sau khi lựa chọn các thông tin cấu hình, Eslint sẽ tạo file config *.eslintrc*.
 
   ![](https://images.viblo.asia/8735ddda-a95a-464a-82e1-27ebf0b2c713.png)
 
 **Với Vscode Editor ta có thể sử dụng thêm extension để kiểm tra lỗi Eslint**
 
 Cài đặt Eslint extension.
 
   ![](https://images.viblo.asia/40ef999e-3fd6-48d4-ad9f-c20a67f837b5.png)

Eslint extension sẽ cảnh báo lỗi trong quá trình phát triển.

   ![](https://images.viblo.asia/c9ce0785-c0ed-493e-a94e-ed450c4282d5.png)

Tham khảo: [dev.to](https://dev.to/iamdammak/setting-up-eslint-in-your-javascript-project-with-vs-code-2amf)