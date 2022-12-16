Chào các bạn .

Như mọi người thấy  Visual Studio Code IDE đã và đang được lựa chọn là ưu tiên hàng đầu để làm về React/React Native .
Bên cạnh đó cũng có rất các extension đi cùng với IDE này để tăng tốc độ phát triển cũng như cho dev có cái nhìn trực quan nhất .

Dưới đây tôi xin được list ra một số extension hữu ích trong Visual Studio Code . 

Để giúp bạn dễ dàng cài đặt danh sách Extension này, tôi đã  đã tạo VSCode Extension Pack , [RN Full Pack](https://marketplace.visualstudio.com/items?itemName=kelset.rn-full-pack).

Pack này đã bào gồm tất cả các extension mà tôi sẽ giới thiệu bên dưới đây .

###  Phần 1 : Fundamentals
Những extension này  liên quan đến việc giúp tôi viết code nhanh hơn  và trông có vẻ  dễ đọc :

1. [React Native Tools](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native)
2. [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
3. [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
   
   Tại sao bạn cần một static type-checker ? Để biết thêm chi tiết bạn có thể đọc[ tại đây ](https://www.lullabot.com/articles/flow-for-static-type-checking-javascript)
   
4. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 
   
   Làm thế nào để có thể viết code tốt hơn bằng cách dùng linter  . Bạn có thể tham khảo [tại đây ](https://restishistory.net/blog/how-to-write-better-code-by-using-a-linter.html)
5. [ Prettier — JavaScript formatter ](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)


Các extension này bản thân cách đặt tên của chúng đã nói lên được chức năng của chúng nhưng tôi  khuyên bạn nên đọc kỹ các README trong mỗi extension để thiết lập chúng một cách chính xác.

Nếu bạn gặp khó khăn trong việc thiết lập chúng hoạt động đúng cách, tôi đã thực hiện hầu hết công việc cho bạn trong repo [ở đây](https://github.com/kelset/react-native-starting-point), được gọi là *react-native-starting-point*. Điều này sẽ giúp bạn thiết lập và chạy nhanh chóng với các tính năng chính này . 
Bạn có thể kiểm tra những file cài đặt trong đó và sao chép vào file cài đặt của bạn .

### Phần 2 : Các Extension  bổ sung 

Các extension dưới cung cấp thêm một vài tính năng nhỏ mà tôi thấy hữu ích .

1. [ Atom Keymap](https://marketplace.visualstudio.com/items?itemName=ms-vscode.atom-keybindings)

    Nếu bạn là tin đồ của Atom IDE , đây là cách dễ nhất để bạn  giữ các keybindings mà bạn đã quen thuộc khi dùng Atom IDE

2. [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
3. [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag)

4. [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

   3 extensions trên để đơn giản hóa việc quản lý tags 
5. [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
    
    Khi viết màu trong hệ HEX, chỉ cần sai 1 ký tự là màu có thể thay đổi hoàn toàn  , extension  này  cho phép bạn có thể xem trước nó tại nơi bạn viết code .
6.  [Git Blame](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame)
 
    Một extension hỗ trợ cho việc quản lý suorce code Git
7. [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
Các đường dẫn  import  components/containers/image sẽ rất khó nhớ và khó viết , chỉ cần sai 1 ký tự là cả 1 thư viện bạn import vào sẽ không thể hoạt động  . Extension sẽ giúp bạn làm điều đó một cách tự động 
8.  [Rainbow Brackets](https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets)

     Trong RN, bạn gặp dấu ngoặc ở khắp mọi nơi , Extension này cung cấp một cách trực quan  để biết cái nào chứa cái nào . Sẽ giúp bạn dễ quản lý code hơn .
9.  [SVG Viewer](https://marketplace.visualstudio.com/items?itemName=cssho.vscode-svgviewer)

    Các file SVG được thêm rất nhiều vào trong 1 dự án RN .Extension này giúp bạn có một cái nhìn trực quan hơn . Điều này có nghĩa là ảnh SVG như thế này  💯 sẽ được hiện diện trong chính code của bạn .
10. [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)

    Việc để các note là TODO/FIX THIS là thường xuyên trong mỗi dự án . Extension này sẽ Highlight những đoạn note đó lên , giúp bạn dễ nhìn hơn . 
11.  [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

     Việc sai chính tả cũng như ngữ pháp trong code là rất phổ biến . Extension này sẽ Highlight những chỗ sai đó lên giúp bạn nhận ra được lỗi đó  (Tiện thể học tiếng anh luôn  )
npm & npm intellisense

### Phần 3 :  Theming

Có rất nhiều  chủ đề khác nhau trong VS code , và khi tôi lần đầu tiên viết bài này, tôi đã thiết lập VS code  sử dụng chủ đề  [Ayu](https://marketplace.visualstudio.com/items?itemName=teabyii.ayu);  hai chủ đề hay khác mà tôi cảm thấy tôi có thể gợi ý là [Darktooth](https://marketplace.visualstudio.com/items?itemName=Poorchop.theme-darktooth) và[ One Dark (Sublime Babel)](https://marketplace.visualstudio.com/items?itemName=joshpeng.theme-onedark-sublime) .

Để cũng có thể custom lại chủ đề theo ý mình . Vào **User settings** vào chỉnh sửa lại nội dung setting như vd dưới đây : 

```
“editor.renderWhitespace”: “boundary”,
“editor.rulers”: [100],
“editor.cursorBlinking”: “solid”`
```


Hy vọng với bài viết này có thể giúp các bạn sự dụng VS code một cách tốt hơn 


Bài viết được dịch từ : https://medium.com/react-native-training/vscode-for-react-native-526ec4a368ce