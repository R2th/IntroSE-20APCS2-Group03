## Cài đặt VSCode cho vuejs
Bạn là người mới tiếp cận với vuejs, bạn chưa biết nên dùng trình biên soạn code nào hay cài đặt ra sao? Hôm nay mình sẽ hướng dẫn các bạn cách setting cho visual studio code để code vue tiện lợi hơn.
## welcome to Vue
Đầu tiên nếu bạn chưa rõ làm thế nào để cài vuejs thì có thể tham khảo doc của vuejs tại đây: 
Ở đây mình sẽ sử dụng Vue CLI nhé, để cài đặt ( Hảy chắc chắn rằng bạn đã có npm nhé)
npm install -g @vue/cli
- Tạo ứng dụng đầu tiên :
```
vue create my-app
cd my-app
npm run serve
```
Và bây giờ ứng dụng của bạn đã chạy ở port 8080,truy cập vào http://localhost:8080 bạn có thể thấy   "Welcome to your Vue.js App" 

![](https://images.viblo.asia/b59eb855-eff3-494f-a65b-bfc87601f644.png)
Một trong những điều mà mình thích ở VSCODE là tiện lợi, để mở app vừa tạo của bạn, bạn chỉ việc:
```
cd my-app
code .
```
 VScode đã mở và bạn có thể bắt đầu biên soạn code của mình
# Một số extension không thể thiếu
Bạn đã cài đặt thành công vuejs bây giờ mình sẽ giới thiệu một số extension cho VSCode phổ biến
Vetur extension
Vetur là 1 trong những extension phổ biến nhất không thể thiếu cho vuejs
Vetur hỗ trợ:
Syntax-highlighting
Snippet
Linting / Error Checking
Formatting
Auto Completion
Debugging
![](https://images.viblo.asia/31ff97ba-1658-46eb-b7ba-c0d87135b08c.png)

Sau khi cài đặt hoàn tất mở lại các file vuejs của bạn có thể thấy 1 số chức năng như làm nổi bật syntax, kiểm tra đóng ngoặc, hoặc trỏ vào 1 dòng code bạn có thể xem mô tả về nó...
![](https://images.viblo.asia/471e9043-74e7-4982-9200-8375ddfdb824.png)
## Vue VSCode Snippets
Vue VSCode Snippets đây là 1 extension rất phổ biến với hơn 450.000 lượt download
Bạn có thể xem chức năng của nó dưới đây
![](https://images.viblo.asia/219d956e-d3d0-40bb-bb00-c84d4dc9c61f.gif)
## Tổng kết
Ngoài 2 extension mình giới thiệu ở trên còn có rất nhiều tiện ích khác tùy vào mục đích sử dụng cũng như yêu cầu của bạn: 
Bạn có thể tím hiểu thêm 1 số extension khác như:
- [Import Cost ](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [Color Info](https://marketplace.visualstudio.com/items?itemName=bierner.color-info)
-[ Todo Highlighter](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- Còn có rất nhiều extension hữu ích khác mà có thể mình liệt kê chưa hết, các bạn có thể comment chia sẽ thêm cho mọi người nhé