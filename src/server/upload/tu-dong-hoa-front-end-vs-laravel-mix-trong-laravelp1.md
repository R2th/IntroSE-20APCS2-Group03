Mình chính xác là 1 coder lười, vì vậy mình muốn mọi thứ đều tự động hóa. Đặc biệt khi mà ngày nay có quá nhiều processor(SASS,LESS,STYLUS...) dành cho CSS, hay việc ES6 đã xuất hiện từ 2015 giúp việc code front-end của chúng ta trở nên uyển chuyển & chuyên nghiệp hơn rất nhiều. Nhưng điều đáng buồn là các trình duyệt hiện tại thì vẫn chưa hỗ trợ đọc trực tiếp những thứ này. Vì vậy sớm muộn gì sau khi code xong bạn cũng phải compile chúng ra thành CSS & ES5. Cái việc compile này thì có đến n cách , nhưng hôm nay mình sẽ hướng dẫn các bạn cách sử dụng **Laravel Mix**  để thực hiện chúng.  

# 1.Laravel Mix là gì?

Theo mình thấy thì **Laravel Mix** giống như ông chủ của **Webpack** vậy, nó đã tích hợp cho webpack cách thực hiện những công việc phổ biến, nó giúp chúng ta thông qua các config đơn giản trong **webpack.mix.js** để báo cho webpack rằng nó sẽ phải thực hiện những lệnh gì. Còn nếu bạn chưa biết webpack là gì thì xem thêm ở [đây](https://webpack.js.org/) nhé .
(Mà nếu bạn vẫn lo lắng là mình chưa biết gì về Webpack thì có nên làm theo bài viết này không thì hoàn toàn được nhé. Chúng ta đang làm việc vs Laravel Mix cơ mà )

# 2. Thành quả khi follow bài viết
Giờ thì mình sẽ khái quát qua thành quả sau khi mình sử dụng những config đơn giản nhất của Laravel-Mix. 
+, Tự động compile SASS => CSS
+, Tự động compile ES6 => ES5(Tích hợp Reactjs)
+, Auto reload trình duyệt sau mỗi lần lưu thay đổi(Ctrl+S)

Nó sẽ trông cool ngầu như thế này này .
https://drive.google.com/file/d/1SkoUExvKpbnGroDeZ9GxGdQy3hvh-XZo/view

# 3. Install

Trước tiên để cài đặt Laravel Mix thì bạn cần cài [Node js](https://nodejs.org/en/) & [NPM](https://nodejs.org/en/) trước. Bạn đừng thắc mắc là tại sao nó lại lằng nhằng đến thế. Nếu bạn xác định còn làm web coder thì sớm muộn gì cũng phải cài 2 cái này thôi. 

Ở bài này mình sẽ sử dụng source code của Laravel để demo vì vậy các bạn cần cài đặt thêm [Laravel](https://laravel.com/docs/5.6/installation) nữa.

Sau khi chắc chắn là đã cài 3 thằng ở trên trước rồi, thì giờ bạn mở gitbash(or cmd) ở thư mục chứa source code dự án Laravel của bạn ra và chạy lệnh sau cho mình.

**npm install**

![](https://images.viblo.asia/3f41bf40-7eb2-4c10-8a2c-a24a3cb6b87d.png)


Như vậy là bạn đã cài đặt xong Laravel Mix rồi đấy. Ở bài viết sau mình sẽ hướng dẫn bạn cách config và sử dụng nó.
Chào thân ái & hẹn gặp lại.
Các bạn theo dõi [phần 2](https://kipalog.com/posts/Tu-dong-hoa-front-end-vs-Laravel-Mix-trong-Laravel-P2) ở đây nhé !