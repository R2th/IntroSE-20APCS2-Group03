Chào các bạn,  
   
Sau 1 thời gian dài chuyển sang sử dụng **VSCode** - 1 trong những editor được ưa chuộn nhất bởi các developers hiện nay, chắc mình không cần PR gì thêm cho nó ha :D.  
Mình đã sử dụng và tổng hợp được 1 số tips, extensions cần thiết và hữu ích.  
Chúng hỗ trợ đắc lực cho công việc lập trình của các bạn, năng suất hơn, code nhanh hơn, hào hứng hơn và như kiểu bạn có 1 túi đồ nghề vắt bên hông vậy.

![](https://images.viblo.asia/3aec0074-507b-495d-b7c7-66b26909c6ec.png)

*Lưu ý:* những thủ thuật mình chia sẽ dưới dây sẽ nghiên nhiều về Frontend Development.

## I .Tập trung hơn 

### Zen Mode with Centered Layout,
Zen mode View là tính năng tích hợp sẵn của VSCode. Khi bật chế độ Zen mode, toàn bộ những gì trước mắt bạn sẽ chỉ còn lại những dòng code, không sidebar, bạn chỉ tập trung vào coding. Thích hợp khi bạn cần sự tập trung cao độ để giải quyết vấn đề khó, hay xây dựng 1 tính năng phức tạp, ....
![](https://images.viblo.asia/3a7cc4f1-56af-4d50-831a-eda578765ae5.png)

###  Exclude folders
Ẩn các folders không cần thiết trong cửa sổ editor. Mình thường ẩn node_modules để workspace nhìn sạch sẽ, rõ ràng hơn.

Hướng dẫn: 
Chọn menu Code > Preferences > Settings  ( window: File > Preferences > Settings )
Search files.exclude trong settings
Chọn  add pattern and nhập `**/nodemodules`
Xong.

## II. Hiển thị code đẹp hơn, rõ ràng hơn  

### Bracket Pair Colorizer ( [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer))
Đây là 1 extension giúp thêm màu sắc cho các cặp dấu ngoặc ( "{}"), bạn sẽ dễ dàng hơn trong việc xác định được các cặp dấu ngoặc ( "{}") bằng các màu sắc khác nhau.
![](https://images.viblo.asia/088e7be6-3c2b-49b5-a1f9-91ac21910b9d.png)

### Color Highlight  ( [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight))
Styles CSS color cho các giá trị color.
![](https://images.viblo.asia/2cbee111-c65b-4569-909d-2192f99c85e4.png)

### Breadcrumbs and Outlines

Breadcumbs nôm na là bạn sẽ thêm có 1 thanh điều hướng hiển thị rõ cây thư mục của file đang active. Cho phép bạn lựa chọn, điều hướng giữa các folder, symbols và files.
Kích hoạt :  bật nó lên ở  View > Toggle Breadcrumbs hoặc thêm *"breadcrumbs.enabled = true"* trong settings.json :  

![](https://images.viblo.asia/c8e80a8d-8f01-430f-a9b8-b4e9df7f9f11.png)

Outline View là 1 phần hiển thị nằm ở dưới File Explorer Tree. Bạn có thể kích hoạt tính năng này bằng cách expand cửa sổ outline:  
 
![](https://images.viblo.asia/8f9edf2f-96e5-478a-a2bf-3b4b406f657f.png) 

Bạn sẽ xem được cây thư mục các functions, levels, lớp cha , lớp con trong file code đang active. 
![](https://images.viblo.asia/af10a6eb-7a80-4a3f-b21a-f25d48a0f956.png)

Ngoài ra, Outline View còn có nhiều thiết lập optional như là tracking cursor - cây thư mục sẽ thay đổi item active theo con trỏ của bạn đang ở đâu. Nếu có lỗi và cảnh báo cũng sẽ được hiển thị trong Outline view, bạn sẽ dễ dàng xác định được chính xác nơi gặp các vấn đề, bugs.

### Pretier ( [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))

Prettier là 1 trong những extension mình rất thích, nó giúp mình tự động format lại đoạn code nhìn sao cho đẹp và rõ ràng nhất có thể. Nó đem lại sự đồng bộ , thống nhất phong cách code cho các member trong 1 team thông qua thiết lập các rules chung.   
  
*Hỗ trợ:*  
JavaScript · TypeScript · Flow · JSX · JSON - CSS · SCSS · Less  -  
HTML · Vue · Angular - GraphQL · Markdown · YAML 

![](https://images.viblo.asia/07e9e896-37ad-465a-9482-0b8e5b62415f.gif)

Mình chỉ giới thiệu sơ qua về sức mạnh của Pretier, bạn có thể tìm hiểu thêm các tuỳ chỉnh và tính năng khác của nó ở bài viết này :  
[Sử dụng Pretier để format code ](https://viblo.asia/p/su-dung-prettier-de-format-code-Az45bnOQ5xY.)

### Material Theme , Icons 
Bộ giao diện và icons theo phong cách Material. 
Top 1 theme trên VSCode extensions store. Thêm phần cảm hứng khi làm việc :D. 
 
![](https://images.viblo.asia/952d7c1a-dd80-42c1-8018-636638487a77.png)

## III. Code nhanh hơn  

###  Emmet

EMMET là bộ phím tắt, quy tắc và các phím tắt được tích hợp sẵn trong VSCode nhằm giảm tối thiểu thời gian của các developer trong quá trình coding.  
Để hình dung rõ hơn, ví dụ ta có đoạn code sau:  
**Thay vì :**
```
<div id="page">
 <div class="logo"></div>
 <ul id="navigation">
   <li><a href="">Item 1</a></li>
   <li><a href="">Item 2</a></li>
   <li><a href="">Item 3</a></li>
   <li><a href="">Item 4</a></li>
   <li><a href="">Item 5</a></li>
 </ul>
</div>
```
**Thì** khi sử dụng EMMET, ta chỉ cần nhập dòng lệnh sau trong code và gõ “Tab” là sẽ tự động chuyển đổi sang HTML đầy đủ như trên. 

```
#page>div.logo+ul#navigation>li*5>a{Item $}
```

Hãy sử dụng EMMET ngay, mình cá là các bạn sẽ thấy mình coding like a pro 😎và thú vị hơn nhiều đấy.  
**EMMET cheat-sheet:** https://docs.emmet.io/cheat-sheet/

###  Live server  ( [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer))

Tự động mở 1 server local với tính năng live reload các thay đổi ngay lập tức. 
Bật live server bằng cách click button "Go Live" : 
 ![](https://images.viblo.asia/a6d8fae3-e046-44d8-8206-9f19a57842fd.jpg)
 
Trình duyệt sẽ tự động open 1 tab của trình duyệt và truy cập đến server local đó.
 ![](https://images.viblo.asia/2c3a5890-0292-45f7-962a-3e162c1a19f0.gif)
 
 Mọi thay đổi khi bạn nhấn save thì sẽ thay đổi ngay lập tức mà không cần F5 load lại trang web.
 ![](https://images.viblo.asia/3e4c48b0-8bc5-43ce-b881-129cafcc4219.gif)

### IntelliSense for CSS class names in HTML
A Visual Studio Code extension that provides CSS class name completion for the HTML class attribute based on the definitions found in your workspace or external files referenced through the link element.
Extension này sẽ tự động lưu các class trong file css được nhúng link vào HTML và hiển thị gợi ý các class names trong lúc code HTML.  

**Hướng dẫn:** 

Click biểu tượng  ⚡️
![](https://images.viblo.asia/9c1cacf0-4bd0-4c9e-924f-728a2d577fa1.png)
Các file CSS nhúng vào HTML sẽ được scan các class name.
![](https://images.viblo.asia/528e223a-2ebd-43a5-be07-7dc978f8d34c.png)
 
**Ví dụ: **

 ![](https://images.viblo.asia/adc8a1c5-2a58-4fd6-a107-2adb654ccc67.png)
![](https://images.viblo.asia/5ca6e2cb-c75c-4e1f-86c8-42835ab0de39.png)

###  Multiple Cursors 

Multiple cursors là tính năng cho phép 1 lúc bạn có thể edit nhiều chỗ với nhiều con trỏ khác nhau. Nó thực sự hữu ích lúc bạn đổi tên 1 loạt các elements, hoặc edit nhiều vị trí với cùng 1 nội dung.
  
**Cách 1:** Tự động thêm con trỏ tiếp theo với nội dung đang được bôi đen.
Bôi đen phần trùng lặp và tổ hợp phím Cmd + D ( window: Ctrl + D). 

![](https://images.viblo.asia/8003f982-8eda-4991-bd3c-6b2fa5c7fd33.gif)

**Cách 2:** Nhấn giữ Shift + Option và click chọn vị trí thêm con trỏ thứ 2 theo ý muốn của bạn.

![](https://images.viblo.asia/5e71686c-a52e-4647-9d77-a57d547f12c1.gif)

### Auto Close Tag ( [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag))
Tự động thêm dấu đóng thẻ HTML/XML 
![](https://images.viblo.asia/3d31b186-b6e6-4a3d-a6d2-6009453391f6.gif)

### Auto Rename Tag ( [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag))
Tự động rename theo cặp tag ( open và close )  HTML/XML.
![](https://images.viblo.asia/29b6c2c3-8bd7-48b6-acb8-820bf4db7b31.gif)

### Turbo Console.log()  ( [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log))

Thay vì gõ những dòng console.log() nhàm chán thì với extension này bạn có thể tự động việc đó bằng phím tắt.   
Ngoài ra còn tự động thêm các tiêu đề có nghĩa cho các giá trị được log ra.

**2 bước:**  
Chọn giá trị bạn muốn in ra console.  
Nhấn tổ hợp phím CMD + ALT + L ( window: CTRL + ALT + L )   
"console.log()" được thêm vào kèm theo những comment hữu ích.  
**Ví dụ :** console.log("SelectedVariableEnclosingClassName -> SelectedVariableEnclosingFunctionName -> SelectedVariable", SelectedVariable)

![](https://images.viblo.asia/8b6a91be-035e-42db-8266-065f0119614e.gif)



### Toggle Sidebar Focus 

VSCode cũng hỗ trợ tính năng cho phép mở nhiều cửa sổ file cùng 1 lúc rất hữu ích như hình bên dưới ( 2 cửa sổ hiển thị song song ) :

![](https://images.viblo.asia/0acfd71f-fe20-45d5-a040-f71b157ffbe4.png)
  
Bạn có thể sử dụng tính năng này bằng cách chuột phải vào tab bạn muốn di chuyển sang cửa sổ mới.  

![](https://images.viblo.asia/143dd842-0571-4240-bf33-b76b243a4397.png)  

và chọn* split up,down,left,right.* 

Và Toogle Sidebar Focus là tính năng ẩn khá thú vị mà mình được biết. Bằng tổ hợp phím CMD ( window: CTRL ) + số thứ tự của Group ( xem hình bên dưới để rõ hơn) :  

![](https://images.viblo.asia/b41a9306-a20d-4499-83c0-ca25e7f1b55e.png)  

Ở cửa sổ góc trái bạn có thể thấy Group 1, Group 2, Group 3 tương ứng với các cửa sổ đang mở:   

![](https://images.viblo.asia/31aeecc7-b499-4c09-a491-f8da96085c3a.png)  

**Ví dụ :** Con trỏ chuột đang focus ở Group 1, chuyển sang Group 2 files bằng tổ hợp phím CMD + 2.

## IV. Extensions, tips khác  
Cực kì hữu ích cho frontend development .

### open in browser  ( [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser))
Tích hợp option mở nhanh một file .html bằng trình duyệt ở menu chuột phải. 
![](https://images.viblo.asia/e3484aca-0958-49ad-a388-cf6fc5626b59.jpg)

### AutoPrefixer ( [VSCode Extension]( https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-autoprefixer))

Tự động thêm prefix css   

**Cách dùng:**  Nhấn F1 -> chạy lệnh *"Autoprefixer CSS"*  

![](https://images.viblo.asia/900ccb04-9c06-42de-926d-81acba963374.gif)


Trên đây là những extensions, tips mình đang sử dụng để tối ưu hoá process làm việc của mình. Nếu các bạn có những extensions hay tips nào khác hữu ích thì comment bên dưới nhé.  

Hi vọng những thủ thật này sẽ giúp ích cho các bạn.   

Chúc các bạn 1 ngày làm việc năng suất và hiệu quả nhé. 💪🏻

  
    
    
    
*Nguồn tham khảo : *  

https://marketplace.visualstudio.com    

https://medium.freecodecamp.org/here-are-some-super-secret-vs-code-hacks-to-boost-your-productivity-20d30197ac76  

https://vscodecandothat.com/

https://blog.thebaodev.me/code-nhanh-va-hieu-qua-hon-voi-vscode-tips-tricks