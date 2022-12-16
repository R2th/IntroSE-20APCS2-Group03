## 1. Giới thiệu
Xin chào các bạn, lâu quá rùi chúng ta chưa tương tác với nhau nhỉ? :stuck_out_tongue_closed_eyes: Như mỗi lần trước thì mình có chia sẻ các bạn về lĩnh vực code frontend cũng như backend. Mình chia sẻ đến với các bạn rất mong giúp ích được nhiều người, cũng mong mọi người đóng góp ý kiến để mình hoàn thiện hơn, biết được nhũng thiếu sót :100:. Ngày hôm nay mình lại nói về công cụ để các bạn lập trình, nó là yếu tố quan trọng để hỗ trợ trong khi các bạn lập trình nhé. 

Bạn viết code bằng gì ? Sublime Text, PHPStorm , ZendStudio, NeatBeats... Tùy thuộc vào từng dự án mà chúng ta sử dụng các công cụ phù hợp hỗ trợ trong khi lập trình. Khi chúng ta sử dụng một công cụ nào đó thì thường có extension hỗ trợ, vậy extension là gì? Extension là các tiện ích mở rộng ngôn ngữ nó giúp cho chúng ta lập trình dễ dàng hơn.

Mình hiện tại đang sử dụng Visusal Studio Code và mình thấy nó là một công cụ tuyệt vời để lập trình. Đối với công cụ này nó có rất nhiều các extension hỗ trợ trong lập trình như là Snippets, GitLens, VSCode Icons, Auto Rename Tag, HTML Snippets
.... Các bạn chỉ cần kích vào thanh menu bên trái thanh công cụ biểu tượng extension là chúng ta có thể tìm kiếm các extension phù hợp để cài đặt.

![](https://images.viblo.asia/e79488f6-0657-4ffc-bd2a-8bf7138badef.png)

## 2. Các bước tạo extension(plugin)
Tại sao chúng ta nên xây dựng các extension:
> Tự tạo cho riêng bản thân một extension giúp ích cho công việc của mình.
> 
> Các gói mở rộng chia sẻ dễ dàng đến với cộng đồng nhà phát triển khác, giúp mọi người có thể khám phá ta các công cụ  mới. Và thật tuyệt vời nếu bạn có thể đóng góp chia sẻ một điều gì có ích cho mọi người đúng ko nào?

Nào chúng ta cùng xây dựng một extension cho riêng mình nào: Let go :rocket:

Trong bài chia sẻ này mình sẽ hướng dẫn các bạn bao gồm những bước sau đây:
- Xây dựng một dự án extension.
- Viết code tạo ra extension.

### 1. Xây dựng dự án
Chúng ta cần cài đặt một dự án, các bạn gõ 2 lệnh bên dưới:
```
npm install -g yo generator-code

yo code
```

Khi đó chúng ta phải nhập các lựa chọn để tạo ra dự án:

What type of extension do you want to create? `New Code Snippets`
- Bạn muốn loại tiện ích mở rộng nào? Ở đây mình chọn new Code Snippetes.

Folder name for import or none for new: 
- Tên thư mục bao bọc dự án? ở đây mình không cần nhé có thể để trống và nhấn Enter.

What's the name of your extension? `extension-name`
- Tên của extension?

 What's the identifier of your extension? `extension-name`
 - Định danh của extension?

 What's the description of your extension? `this will contain snipptets for TypeScript`
 - Mô tả về extension?
 
Language id:` typescript`
- Tùy chỉnh định dạng file của bạn ví dụ nó chỉ áp dụng cho dạng file javscript, php, ruby,...

Khi bạn hoàn thành qua trình nhập trên terminal kết quả như hình dưới đây:

![](https://images.viblo.asia/cf4289ba-2ac5-4c5b-aec1-5dd2432dd0c4.png)

Sau khi chúng ta nhập xong các lựa chọn, dự án extension đã được tạo và liệt kê các file trong terminal như trong hình.
![](https://images.viblo.asia/4a5c5ecd-1110-4deb-a9b1-6969dd4d554d.png)
Ok việc bây giờ của chúng ta là cd vào thư mục vừa tạo được và tiến hành code để tạo ra 1 extension cho riêng bản thân mình nào.


Chúng ta đã tạo thành công dự án extension. Ở đây chúng ta cùng xem cấu trúc của dự án có những gì nhé!

![](https://images.viblo.asia/31869796-6c3c-470a-be20-d84b52535a09.png)

Dự án bao gồm các phần:
- `/snippets/snippets.json`:  File này là là nơi chúng ta tạo ra các đoạn code, và chúng ta tập chung phần lớn thời gian thao tác ở đây.
- `README.md`: Nơi đây chứa thông tin của dự án của bạn. Ở đây bạn cần điền thông tin về version, các phím tắt, nhà xuất bản... để dự án có thể xuất bản extension trên Visual Studio Marketplace thì người dùng có thể hiểu được cách sử dụng.
- `package.json`: Chứa 1 số thông tin về dự án như tên extension, version, tên nhà xuất bản, mô tả. Quan trọng nhất là version của extension này qua mỗi lần bạn cập nhật và xuất bản lại dự án extension theo thời gian.

Ô sờ kê đến đây là các bạn đã hiểu cơ bản về dự án tạo ra extension rùi nhé bắt đầu vào việc lập trình tạo ra một extension cho riêng bản thân mình nào.

Các thư mục mà chúng ta cần thao tác để tạo ra extension:

- Trong file `snippets.json`  mình lập trình phần lớn ở file này nhé. Tùy vào các bạn muốn tạo ra một extension như nào để phục vụ cho việc code của mình nhé. Ở dưới thì mình có code thử một đoạn phím tắt tạo ra class Character có contructor :

```
{
  "Class": {
    "prefix": "cc",
    "body": [
      "enum CharacterType { Warrior, Mage, Healer };",
      "",
      "class Character {",
      "  contructor(",
      "    private name: string,",
      "    private age: number,",
      "    private type: CharacterType",
      "  )",
      "}"
    ],
    "description": "This will create a class with a contructor"
  }
}

```
- Ở trong file `package.json` dự án thì  bạn thêm dòng `"publisher": "ten-nha-xuat-ban"` vào nhé. Vì ở đây extension cần có thông tin của người tạo ra nó.
- Trong file `README.md` các bạn nhớ là điền các thông tin của extension để khi mình public extension lên Visual Studio Marketplace, cho người dùng hoặc bản thân mình đọc thông tin và hướng dẫn các thao tác sử dụng extension nhé:

 Xong đoạn code của mình đó, bây giờ chúng ta cùng kiểm tra chạy thử nó và cài đặt extension này thử vào Visual Studio Code nhé.
Mình bắt đầu chạy lện trong terminal, muốn chạy được package thì chúng ta phải cài `vsce` để nó thực hiện chạy lệnh package và publish.

Các bạn copy đoạn lệnh dưới và chạy:
```
npm install -g vsce
```
Ok giờ chúng ta chỉ cần chạy lệnh để tạo ra tệp extension có đuôi `.vsix` để chúng ta cài đặt vào Visual Studio Code.
```
vsce package
```
Nếu terminal của bạn thông báo như dưới là chúng ta thực thi thành công chạy package nhé.
![](https://images.viblo.asia/5ef0b101-74ac-41f2-ab88-b95c6f11bd91.png)

Bây giờ chúng ta chỉ còn cài đặt extension vào Visual Studio Code:
Các bạn vào View -> Command Palette -> chọn đường dẫn tới file có đuôi `.vsix `mà chúng ta vừa tạo ở bên trên nhé.

![](https://images.viblo.asia/fb37f2ac-f9fe-48bf-817d-d3cdbbe116f5.png)

Đến đây là chúng ta thử trải nghiệm extension khi chúng ta cài đặt nào. Mình tạo 1 file `app.ts` và tiến hành gõ `cc` là `prefix` mà mình vừa định nghĩa ở file  `snippets.json` .

![](https://images.viblo.asia/80030234-a7cc-4a34-a550-7818c41c9a99.png)

Và thành quả sau khi chúng ta ấn Enter là như hình bên dưới:

![](https://images.viblo.asia/75ff63ca-5422-4d95-b17c-5d904acf186f.png)

Thật tuyệt vời phải không nào, chúng ta có thể vừa lập trình ngôn ngữ cũng như lập trình tạo ra các extension hỗ trợ trong khi chúng ta làm việc. 

## 3. Kết luận
Thật dễ dàng để tạo một extension cho riêng bản thân mình sử dụng phải không nào. Các bạn cũng có thể tạo để public để mọi người cùng sử dụng đóng góp chung cho cộng đồng. 

Đến đây bài chia sẻ của mình xin kết thúc hẹn các bạn vào lần chia sẻ kế tiếp là sang năm mới 2020 nhé! Nếu thấy hay hãy  like và shared giúp mình nhé!  

![](https://images.viblo.asia/d15dd450-bfae-44eb-92bf-61668fe6b9ee.jpg)

Bài viết có tham khảo từ trang:
+ https://www.software.com/src/how-to-create-an-extension-pack-for-visual-studio-code
+ https://dev.to/itnext/how-you-can-build-and-publish-your-own-extension-to-vs-code-marketplace-2pjl