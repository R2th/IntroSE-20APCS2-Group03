## Visual Studio Code là cái gì ?
Visual Studio Code là 1 text editor khá mới nhưng free, chạy được trên nhiều hệ điều hành. Tuy chỉ là text editor nhưng ta vẫn có thể compile, run, debug code trên VS Code, không thua gì cái IDE xịn.

Vừa nhẹ, vừa free, lại mạnh mẽ, nên dân web developer như mình rất khoái dùng VS Code. Để bắt đầu, các bạn có thể vào đây để tải nha: code.visualstudio.com

![](https://images.viblo.asia/503191d9-2eb8-478b-86c5-8d6b24b67f1e.jpg)

## Cài đặt theme, font và icon cho ngầu
Sau khi đã cài xong VS Code, bạn bấm vào mục Extensions bên góc trái, bắt đầu gõ và tìm extension rồi cài thôi ha.

Đầu tiên cài theme, font, icon linh tinh trước.

Bạn nên cài thêm 1 số theme để nhìn cho dịu mắt. Nhiều người thích dùng [theme Dracula](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula), màu xanh xanh hường hường tím tím, nhìn lâu hoặc code buổi tối cũng không mỏi mắt.

![](https://images.viblo.asia/483b3ea3-0bad-43ad-9886-ebe7c70a9741.jpg)

Bên cạnh đó, bạn cũng nên tải thêm 1 số set-icon như vscode-icons, các icon này sẽ giúp bạn nhìn vào danh sách thư mục và dễ nhận biết đâu là folder, file nào là file gì...

![](https://images.viblo.asia/55522b2f-6308-4534-ad87-8f702b635c24.jpg)

Tiếp theo, bạn nên cài font thuận tiện cho việc viết code. Mình dùng Fira Code (github.com/tonsky/FiraCode).

![](https://images.viblo.asia/88bdad62-f65a-4b93-a5ad-9edc98287340.jpg)

Cài xong, bạn vào setting đổi font thành FiraCode, sau đó bật fontLigature lên luôn nha. Bật cái này lên sẽ giúp gom nhóm mấy cái như ==, != thành 1 kí tự, **giúp não bộ xử lý nhanh hơn, đọc code cũng nhanh hơn luôn.**

Một số extension nên dùng cho mọi dev
Sau khi cài đủ thứ, VSCode trông cũng khá đẹp rồi, giờ chúng ta cài thêm 1 số Plugin cho việc Code nào:

* [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens): VSCode đã hỗ trợ pull/push từ Git, nhưng GitLens bá đạo hơn nhiều. Nó giúp bạn biết từng dòng code do ai viết, viết vào lúc nào, nằm trong commit nào. Bạn cũng có thể …. ngược về quá khứ để xem file đã thay đổi như thế nào, rất tiện
* [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer): Tô màu các dấu ()[]{}, nhìn 1 phát là biết cái nào đi cặp với cái nào, không còn lẫn lộn, thừa thiếu dấu nữa
* [Bookmark](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks): Giúp bạn “bookmark” lại những dòng code hay đụng tới, cần đọc nhiều, sửa nhiều. Không còn phải search code mỗi lần cần tìm nữa.
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker): Rất rất nên cài. Trước kia, lâu lâu mình hay viết comment sai chính tả, đặt tên hàm, tên biến cũng sai chính tả luôn. Extension này sẽ highlight những đoạn sai chính tả để mình sửa nha.
* [Setting Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync): Giúp bạn đồng bộ setting (cài đặt, extension) giữa nhiều máy với nhau. Nhờ cài cái này, mình chỉ cần setup VS Code 1 lần. Những lần sau, khi đổi máy, mình chỉ cần chạy 1 phát là toàn bộ setting cũ đã được đồng bộ qua máy mới rồi!

## Những extension hay ho cho dân làm web
Tiếp theo, đây là những extension mà dân làm web tụi mình hay dùng. Đa phần những extension này giúp tiết kiệm thời gian, để mình code nhanh hơn, mượt mà hơn.

* [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer): Dựng 1 server chạy HTML/CSS/JS, tự động refresh trình duyệt mỗi khi bạn sửa code. Mấy bạn mới học front-end thì nên cài cái này, tiết kiệm thời gian F5 lắm luôn.

![](https://images.viblo.asia/a57c0373-a2f6-48db-899c-3a398f870927.gif)
*Dùng LiveServer để code web tĩnh sẽ tiết kiệm được rất nhiều thời gian refresh*

* [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport): Hỗ trợ mình Import thư viện JavaScript, component từ các file khác
* [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost): Tất nhiên, import nhiều thư viện thì sẽ đỡ tốn công viết code hơn, nhưng cũng làm cho ứng dụng nặng hơn, tải lâu hơn. Cài Import Cost, bạn sẽ biết những thư viện nào quá nặng, nên thay thế hoặc loại bỏ, hoặc import 1 phần nhỏ thôi
* [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) + [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag): Khi code HTML/JSX, mỗi khi tạo thêm tag mới, extension sẽ đóng tag để khỏi quên. Khi đổi tên tag, extension này sẽ đổi tên closing tag cho phù hợp luôn.
* [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense) + [ Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense): Gợi ý tên npm package, tên file trong thư mục khi mình cần import, giúp giảm lỗi khi import
* Bộ đôi [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): ESLint sẽ giúp bạn code đúng chuẩn, đúng format, tìm những lỗi linh tinh khi code. Prettier sẽ hỗ trợ bạn format code, sửa theo đúng chuẩn từ ESLint.
    * Cài 2 thằng này xong, chỉ cần code đại rồi Ctrl S để save 1 phát là code vừa đẹp vừa chuẩn ngay.
 
Ngoài ra, tuỳ vào ngôn ngữ/framework đang dùng mà các bạn có thể cài thêm Code Snippets hoặc VSCode Extension cho ngôn ngữ đó. Bản thân mình code React, Vue, đôi khi code makeup ( HTML, CSS, JS... ) nhưng với những Extension trên đây thì nó đủ để cân tất cả chúng.

![](https://images.viblo.asia/d21191b9-59db-4bd9-b331-1aa3e057f12c.jpg)
Dùng một mình VS Code nhưng chơi được 3-4 ngôn ngữ

Cảm ơn các bạn vì đã đọc, xin chào và hẹn gặp lại trong các bài viết sắp tới. Bài viết có tham khảo từ [nguồn](https://toidicodedao.com/2020/07/28/huong-dan-setup-visual-studio-code-nhung-extension-xin-xo-ma-dev-nao-cung-nen-dung/)