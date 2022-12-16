Chào mọi người,

Với các bạn developer sử dụng Javascript thường xuyên như mình - 1 Frontend Dev thì chắc hẳn **ESLint** là 1 trong số các code analysis tools rất phổ biến và được sử dụng rộng rãi trong việc tối ưu code styles và giữ source code của bạn clean và giữ chúng trong phạm vi của bạn với các rules bạn có thể toàn quyền customize. Tiếp theo, chúng ta có thêm 1 tool nữa cũng giúp bạn tự động format code đó là **Prettier** dưới 1 số config bạn setup sẵn.

Các bạn có thể tìm hiểu sơ qua 2 công cụ và cách cài đặt nó ở các bài viết hay phía dưới trước khi tiếp tục với mình nhé.
* [Sử dụng Prettier để format code](https://viblo.asia/p/su-dung-prettier-de-format-code-Az45bnOQ5xY)
* [Hãy sử dụng ESLint cho dự án của bạn!](https://viblo.asia/p/hay-su-dung-eslint-cho-du-an-cua-ban-bJzKm07O59N)


**Tóm lại :**

Sau khi cài đặt xong 2 tools trên chúng ta có Prettier giúp ta phần code formarting, ESLint quản lí việc coding styles. Bạn có thể config prettier để format code tự động khi lưu file và chúng ta sẽ không còn cần để ý tới code format nữa, hãy để prettier thực hiện điều đó. Mặt khác ESlint không giống Prettier, nó không tự động fix code styles, nó chỉ warning chúng ta về các coding styles ví dụ bạn import 1 object hay component gì đó từ file khác mà bạn không sử dụng, đặt tên biến sai rules. ESLint có đặc tính "highly configurable" - tuỳ biến cao, bởi vì nó không đi kèm theo các pre-configured rules như Prettier - "highly opinionated". Sau khi cài đặt ESLint thì bạn có thể tự mình config các rules hoặc sử dụng 1 số pre-configured phổ biến như Airbnb style guide,... và bớt thêm một nỗi lo lắng lúc coding :D.


Hôm nay mình sẽ chia sẽ cách để mình kết hợp 2 tools trên lại với nhau.

## Kết hợp ESLint và Prettier 

* Đầu tiên là cài đặt 2 tools với `npm install -g prettier eslint` vào project của bạn. 
> Các bạn có thể cài đặt globally để sử dụng trong tất cả project của bạn, các bạn có thể đọc thêm 2 bài viết trên.

* Tiếp theo , cài đặt Prettier và Eslint extensions/plugin cho editor của bạn. Với mình thì mình dùng VSCode, Prettier và ESLint extension có thể được cài đặt dễ dàng từ marketplace của VSCode. Các editor khác cũng tương tự, bạn tìm tên extensions + tên editor của bạn thì sẽ có hướng dẫn.

* Cài thêm 2 packages nữa cho việc kết hợp chúng với nhau: `npm install --save-dev eslint-config-prettier eslint-plugin-prettier`.
    * *eslint-config-prettier* :  Tắt các Eslint rules mà conflict với Prettier 
    * *eslint-plugin-prettier* : Tích hợp Prettier rules với Eslint rules 
* Cuối cùng, set Prettier rules trong ESLint configuration. Tạo file `.eslintrc.json` ở root và thêm nội dung sau:
    ```
    {
      "extends": ["prettier"],
      "plugins": ["prettier"],
      "rules": {
        "prettier/prettier": ["error"]
      },
    }
    ```

Done :D, bây giờ prettier và ESLint setup đã sẵn sàng cho bạn sử dụng. 2 packages trên đã giúp chúng ta xử lý các công đoạn conflicts 1 cách dễ dàng. Bạn đã có thể tiết kiệm được vài tiếng refactor source để làm ly cafe nóng hổi :D 

Nhớ like bài viết nếu thấy hữu ích nha.
Cám ơn các bạn,
Hẹn các bạn ở các bài viết sắp tới.