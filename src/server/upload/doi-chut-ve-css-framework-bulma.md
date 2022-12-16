# 1. Giới thiệu
- Bulma là một css framework, được viết bằng sass dựa vào **flexbox**, sử dụng **css-grid** for **responsive** và được thiết kế cho **mobile first**. Nó là một modular css fw, có nghĩa bạn có thể sử dụng đơn lẻ các chức năng của nó như columns, button, form…

# 2. Cài đặt
- Sử dụng npm (khuyên dùng)
    - `npm install bulma`
- Sử dụng CDN
    - `https://cdnjs.com/libraries/bulma`
  
# 3. Tổng quan
- **Modularity**: Bulma chứa **39 file .sass**, chúng ta có thể import trực tiếp **module** nào cần thiết cho dự án của mình. Xem ví dụ bên dưới:
    - `@import "bulma/sass/utilities/_all"`
    - `@import "bulma/sass/grid/columns"`
    - `@import "bulma/sass/elements/button.sass"`
- **Responsiveness**
    - **Vertical by default**: Tất cả element trong Bulma là **mobile first** và được tối ưu hóa cho việc đọc theo **chiều dọc**. Tuy nhiên, bạn có thể bố cục theo **chiều ngang** cho **columns** hoặc **nav** bằng **modifier** `is-mobile`.
    - **Breakpoints**: 
        - Bulma có **5 breakpoint**, là các giá trị mà Bulma dựa vào để detect cho responsive:
            - **mobile**: up to **768px**
            - **tablet**: from **769px**
            - **desktop**: from **1024px**
            - **widescreen**: from **1216px**
            - **fullhd**: from **1408px**

          ![](https://images.viblo.asia/4070c670-d294-41c2-a3a2-98c0086218ff.png)
         - Và có **9 reponsive mixins**: Chúng ta có thể xem hình minh họa bên dưới.

             ![](https://images.viblo.asia/91444376-6859-4c08-934d-b35803a99a25.png)

 - **Colors**: Bulma hỗ trợ danh sách các màu mặc định, được sử dụng hiện tại cho các **elements** và **components**. Chúng ta có thể sử dụng với format như sau `.is-$color` như là **is-primary**, **is-dark**, **is-success**…
      ```
        // Import danh sách biến khởi tạo mặc định
        @import "../node_modules/bulma/sass/utilities/initial-variables";

        // Định nghĩa màu xanh
        $blue: #72d0eb;

        // Update lại color của primary
        $primary: $pink;

- **Functions**: Bulma sử dụng 3 functions để định nghĩa giá trị và tính toán màu sắc động `colors dynamically`.
    - `powerNumber($number, $exp)`
    - `colorLuminance($color)`
    - `findColorInvert($color)`


    -----

    Để hiểu rõ 3 function trên hoạt động như thế nào các bạn có thể tìm hiểu thêm tại https://bulma.io/documentation/overview/functions/


# 4. Tham khảo

-----


- https://bulma.io/documentation/