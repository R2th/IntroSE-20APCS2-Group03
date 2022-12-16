## Intro

![](https://images.viblo.asia/204c34e7-623b-48e5-8e41-96a6966fc315.png)

Khi làm việc, chắc chắn bạn sẽ có lúc cần phải ghi chép, quản lý thông tin và sau đó là xem lại, review những thông tin này. Hiện đã có rất nhiều các ứng dụng khác nhau từ đơn giản đến phức tạp đáp ứng được các nhu cầu này. Cá nhân mình thì cũng đã thử qua nhiều app khác nhau: bắt đầu với Google Keeps, cho những ghi chú đơn giản, sau đó là phức tạp hơn với [Boost Note](https://boostnote.io/), rồi thì [CherryTree](https://www.giuspen.com/cherrytree/), [Joplin](https://joplinapp.org/), dùng trên cloud với [Notion](https://www.notion.so/) và cuối cùng mình hiện đang chuyển hẳn sang dùng [Obsidian](https://obsidian.md/). Lúc này, mình cảm thấy app đã đáp ứng và vượt trên mong đợi của mình 😍. Trong bài này mình sẽ giới thiệu kinh nghiệm cá nhân của mình cũng như các tính năng của Obsidian, hi vọng sẽ hữu ích cho mọi người.

![Best Note Taking Apps to Use in 2020 | appsntips](https://www.appsntips.com/content/images/2020/09/Best-Note-Taking-Apps-to-Use.jpg)

## Requirement
 Cá nhân mình yêu cầu 1 ứng dụng take note cần có những chức năng "cơ bản" sau:
 
 1. Lưu trữ trên local và đồng bộ được trên nhiều thiết bị (máy cá nhân ở nhà, máy trên công ty, điện thoại). Mình prefer lưu trên local rồi đồng bộ vì đảm bảo tính an toàn và cơ bản thì không phải lúc nào ta cũng có thể truy cập internet.
2. Sử dụng cú pháp Markdown, vì đơn giản, mình xuất thân là dev 😀
3. Lưu trữ theo dạng cây thư mục, tiện cho việc sắp xếp
4. Tìm kiếm full text trong note và toàn bộ kho lưu trữ
5. Thao tác nhanh chóng bằng phím tắt
6. Có khả năng mở rộng
7. Định dạng lưu trữ mở
8. Free  và open source

Với những yêu cầu như trên, thì:
- Google Keeps: chỉ đạt yêu cầu 1, dùng để ghi chú đơn giản
- Boost Note, Cherrytree hoặc Joplin: đáp ứng được 1, 2, 3, 8 nhưng 4, 5, 6 còn rất hạn chế (đặc biệt là khả năng tìm kiếm và mở rộng, mặc dù đều là open source, CherryTree thì format lưu trữ phức tạp hơn)
- Notion: Nếu bạn có tiền, và có internet liên tục, đây là 1 lựa chọn tuyệt vời với đầy đủ chức năng và khả năng mở rộng (gần đây Notion cũng đã public API)

và sau một hồi tìm kiếm thì mình dừng lại ở Obsidian, nhưng

## Side notes 
Obsidian còn làm được nhiều hơn thế nữa. Obsidian được miêu tả như là một công cụ giúp chúng ta xây dựng "Second Brain", một bộ não thứ hai . App có cách tổ chức sắp xếp đặc biệt, được gợi cảm ứng từ các mà bộ não chúng ta hoạt động.

Để có thể thấy hết được các ưu điểm này, trước hết ta cần có 1 chút kiến thức nền:

### Building A Second Brain

![](https://i.ytimg.com/vi/SjZSy8s2VEE/maxresdefault.jpg)

- **Building A Second Brain** (xây dựng bộ não thứ hai): là một phương pháp lưu trữ và nhắc lại có hệ thống cho chúng ta về những ý tưởng, cảm hứng, thấu hiển và liên kết mà chúng ta có được thông qua kinh nghiệm sống. Nó cho phép chúng ta mở rộng trí nhớ và trí tuệ thông qua mạng lưới liên kết và các công cụ hiện đại.
- Phương pháp này không chỉ để lưu trữ và còn biến chúng thành thực tế, thông qua việc đưa ra những con đường rõ ràng, khả thi để tạo ra "bộ não thứ hai" một nơi nằm ngoài cơ thể người nhưng là nơi tập trung, là kho lưu trữ số những thứ bạn học, tài nguyên mà bạn thu nhặt được.
- Để hoạt động hiệu quả trong thế giới hiện đại, chúng ta cần phải quản lý rất nhiều thông tin: email, tin nhắn, văn bản, báo, tạp chí online, sách, webinar, ghi chú, vân vân và vân vân. Tất cả những thứ này đều có giá trị nhưng để ghi nhớ tất cả là việc không thực tế và quá sức con người. Thế nên, bằng các sử dụng app tổng hợp, liên kết các thông tin này một cách hiệu quả, bạn sẽ giúp phát triển được một luồng làm việc có giá trị, từ đó phát triển các dự án và tiến gần hơn đến mục tiêu đề ra.

### Personal Knowledge Management (PKM)

Như vậy việc take note cũng chính là một hình thức lưu trữ và quản lý thông tin và nếu có thể làm tốt việc này, ta có thể coi nó như là một bộ não thứ hai, tùy ý truy xuất và ghi nhớ như một phần cơ thể của mình.

Từ ý tưởng trên mới phát sinh ra rất nhiều các ứng dụng khác nhau cùng một mục tiêu trở thành PKM app. Không chỉ có lưu trữ note, các app còn mở rộng ra nhiều chức năng hơn nữa
- Quản lý mục tiêu cá nhân
- To-do list
- Quản lý workflow, tiến độ
- Nhắc nhở lịch
- Collab với những người dùng khác
- ...

![](https://nesslabs.com/wp-content/uploads/2020/10/knowledge-management-report-banner.jpg)

### Zettelkasten: networked note-taking for naturally networked thought
![index cars in drawer Zettelkasten](https://zenkit.com/wp-content/uploads/2021/04/maksym-kaharlytskyi-Q9y3LRuuxmg-unsplash-1024x681.jpg)

Từ Zettelkasten trong tiếng Đức có nghĩa là "slip box", nghĩ là chiếc hộp với rất nhiều các mẩu giấy nhỏ (giống như biên lai) ở bên trong. Mỗi hộp là thể hiện của một ý tưởng đơn giản, nhỏ nhất (atomic) mà có ý nghĩa. Ngoài ra nó cũng kết hợp được với những ý tưởng khác nữa.

**Phương pháp Zettelkasten** được biết đến rộng rãi nhất thông qua **Niklas Luhmann** (1927 - 1998), một nhà xã hội học người Đức, người đã xây dựng thư viện gồm 90,000 hộp và thẻ đã được đánh index theo cách phân nhánh, giúp ông liên kết các ý tưởng và giúp ông viết hơn 70 quyển sách và 400 bài báo khoa học.

![work filing cabinet Zettelkasten](https://zenkit.com/wp-content/uploads/2021/04/jan-antonin-kolar-lRoX0shwjUQ-unsplash-1024x711.jpg)

Zettelkasten giúp ông đạt được điều này vì nó mô phỏng các mà não bộ hoạt động. Khi chúng ta suy nghĩ về một vấn đề gì đó thì không chỉ một mà rất nhiều các tế bào não sẽ lóe sáng trên phim chụp khi có chất dẫn truyền thần kinh đi qua, thể hiện rằng nó là một mạng lưới liên kết, Khi hình thành một ý tưởng mới từ 2 ý tưởng riêng rẽ ban đầu cũng là lúc mà 2 mạng lưới này được kết hợp lại với nhau.

![Stop Taking Regular Notes; Use a Zettelkasten Instead](https://eugeneyan.com/assets/information-knowledge.png)

Tương tự như vậy, thông qua việc liên kết và đánh chỉ mục, Zettelkasten giúp Luhmann tham chiếu, liên kết các ý tưởng, vốn sống, kinh nghiệm có liên quan đến nhau, lấy thông tin ra nhanh hơn, từ đó suy nghĩ mạch lạc hơn cũng như phát hiện ra những liên kết, ý tưởng mới.

![Zettelkasten - Wikipedia](https://upload.wikimedia.org/wikipedia/commons/1/1a/Zettelkasten_paper_schematic.png)

Các note taking app, mà đi đầu là [RoamResearch](https://roamresearch.com/) đưa vào hình thức backlink hay connection, cho phép ta liên kết cách ghi chú lại với nhau (đến từ dòng, từng từ, từng đường link trong các ghi chú), tương tự như cách hoạt động của não bộ. Khi liên kết hết lại, và trực quan hóa lên, ta sẽ thấy giống như vậy:

![](https://cosmonaut-storage.s3.amazonaws.com/241280059877739_current-note-network.png)

Việc take note theo phương pháp này đã tạo ra một làn sóng phấn khích lớn trên Twitter, bạn có thể tìm kiếm với từ khóa RoamCult (tôn giáo RoamResearch).

![](https://images.viblo.asia/e6bdd027-8818-440b-aa61-3afb39f8ec8a.png)

Ngoài RoamResearch thì [RemNote](https://www.remnote.io/) cũng là một dịch vụ online tương tự.

![](https://images.viblo.asia/97c36ba7-6743-43f4-8d8c-6c2b955415ed.png)

Tuy nhiên, Obsidian cũng làm được tất cả các việc trên (tất nhiên là chưa đến mức tuyệt vời đc như RoamResearch), hơn nữa là trên local (RoamResearch đã từng trải qua một đợt mất dữ liệu khiến người dùng khá lo ngại), và không mất phí (save you 15$/month).

Cá nhân mình cũng vậy, trong lúc học tập và làm việc gặp rất nhiều thứ hay ho, tuy nhiên không phải lúc nào cũng có thể nhớ hết được, take note thì các note nếu không được xem lại và có liên kết thì cũng sẽ nhanh chóng bị quên lãng, mất giá trị. Có phương pháp như thế này thì quả thật là tuyệt phải không?

Dông dài như vậy đủ rồi, giờ mình sẽ đi vào một lượt các chức năng Obsidian. Các bạn có thể tải về ở: https://obsidian.md/

![](https://www.dmuth.org/wp-content/uploads/2021/03/obsidian-logo.png)

## Obsidian's Features

Các thông tin được lưu trữ trong các hầm (Vault) riêng, bạn có thể chia ra thành các kho cá nhân hay công việc. Obsidian cũng có tích hợp sẵn Help Vault, nơi bạn có thể đọc hướng dẫn cách dùng.

### Tree-style organization

![](https://images.viblo.asia/336df5dd-aecc-4a84-8770-e43ac1f3b391.png)

Giao diện phía trên bao gồm: từ trái sang phải là cây thư mục các file lưu trữ > khung soạn thảo markdown > khung preview > phía dưới là các tài liệu có link đến tài liệu này. Ngoài ra ta còn có thể sắp xếp theo tag nữa.

### Markdown

Tất cả các syntax markdown đều được hỗ trợ, file được lưu dưới dạng `.md` nghĩa là bạn có thể bê nguyên các file này import sang các app khác.

![](https://images.viblo.asia/4ab96f4a-bafb-44f3-83e1-d405431a901e.png)

Obisidian cũng hỗ trợ công thức toán Latex nữa.

### Diagram with Mermaid
Cho phép vẽ các biểu đồ từ đơn giản đến phức tạp thông qua thư viện: [Mermaid](https://mermaid-js.github.io/mermaid). Ví dụ từ markdown như thế này:

```
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

chuyển thành: 

![](https://images.viblo.asia/d5dc2a09-aa83-47e9-86b5-d3a83396d784.png)

### Graph View

![](https://images.viblo.asia/0a6256d0-d4a4-4b76-9241-a256f2484328.png)

Tính năng tuyệt vời giúp chúng ta visualize các mối liên kết giữa các link. Ngoài ra còn có thể zoom, filter một số link, bôi màu cho các cụm link khác nhau. Nhìn trông cũng ngầu nữa :joy:

![](https://images.viblo.asia/bb2587ab-33e6-438b-8426-3fd8e79da57b.png)

### Backlink

![](https://images.viblo.asia/8449a39c-26c8-4746-883b-e542ac916db4.png)

Mỗi dòng từ, tiêu đề trong Obsidian được gọi là một **block** (hoặc bullet-point trong RoamResearch). Bạn có thể click vào hình tam giác bên trái để fold/unfold các block này. Obsidian cho phép liên kết với các nội dung khác trong Vault thông qua cú pháp link: `[[Internal links]]` hoặc đến từng block. Ta cũng có thể hover qua để xem nhanh nội dung link, click để di chuyển đến link đó.

![](https://images.viblo.asia/6ac5105e-afb0-479f-8c57-8249bab11523.png)

### Command Pallete
 Bấm `Ctrl + P` hoặc `Cmd + P` sẽ bung ra cửa sổ lệnh trung tâm, liệt kê tất cả các tác vụ.
 
 Các lệnh đều có thể được gắn shortcut key giúp ta thao tác nhanh hơn nữa.
 
![](https://images.viblo.asia/81f73e7a-0c44-4a48-bfd2-1f16b4dc0e38.png)

### Search

![](https://images.viblo.asia/f3c275bb-d710-4f89-8a23-d53f6fa9b4ad.png)

Tìm kiếm dễ dàng trong note (`Ctrl + F`) toàn bộ Vault (`Ctrl + Shift + F`). Tìm kiếm nâng cao thông qua tag, cụ thể đến từng dòng, block.

### Embeded format

Tích hợp các file hình ảnh (chỉ cần paste và nó sẽ tự động tạo mới file ảnh `Pasted image XXXX.png`, âm thanh (record trực tiếp vào file lưu trữ), file PDF. Khi đổi tên hoặc di chuyển file, các note có link đến file này cũng sẽ được tự động cập nhật.

![](https://images.viblo.asia/6a878a35-304b-488d-8499-62aa4aa1ff8e.png)

### Themes

Thay đổi giao diện bằng themes có sẵn hoặc của community, ai muốn hard-core hơn thì có thể chỉnh thẳng CSS (vì Obisidian là app electron)

![](https://images.viblo.asia/30186e37-9dd6-43eb-8dcb-a53f9d309df1.png)

### Plugins

![](https://images.viblo.asia/88de03a5-d4cf-4cb9-b3d2-cefaf5e898d8.png)

Obsidian có sẵn các core plugin cho phép chúng ta mở rộng chức năng hơn nữa:

- **Outline**: Hiển thị tóm tắt đề mục bài viết, giúp ta dễ dàng theo dõi.

![](https://images.viblo.asia/834ef260-d2fb-493a-8176-09290b4b5ecf.png)

- **Daily notes**: Các note mới được tạo sẽ có tên là ngày tháng hôm đó
- **Random notes**: Ấn nút sẽ mở ngẫu nhiêu 1 note trong Vault, giúp chúng ta tìm kiếm ý tưởng mới
- **Zettelkasten prefix**: Các note được tạo sẽ có tên bắt đầu bằng 1 dãy số theo phương pháp Zettelkasten, dành cho những ai đang theo cách làm này.
- **Templates**: Tạo nhanh note mới từ template có sẵn
- **Slide**: Coi các note là slide, presentation trực tiếp từ bên trong Obsidian 😵

Ngoài ra còn có các third-party plugin do cộng đồng phát triển: Calendar,... Mình đang dùng 2 plugins:
- [Code block copy Obsidian Plugin](https://github.com/jdbrice/obsidian-code-block-copy#code-block-copy-obsidian-plugin)

![Screenshot](https://github.com/jdbrice/obsidian-code-block-copy/raw/main/screenshot.png)

- [Emoji Toolbar - Obsidian Plugin](https://github.com/oliveryh/obsidian-emoji-toolbar): mình mapping vào phím tắt `Ctrl + J` thao tác cho nhanh. Obsidian cho phép chèn emoji vào tên file nữa đó.

![Emoji Toolbar Plugin](https://raw.githubusercontent.com/oliveryh/obsidian-emoji-toolbar/main/demo/demo.gif)


### Publish
Nếu trả thêm một chút phí, bạn có thể publish kho note của mình lên trên mạng thành một trang web như thế [này](https://publish.obsidian.md/andymatuschak)

![](https://images.viblo.asia/818e6164-ae0f-4ab5-9cc4-475b51d7e0dd.png)

### Sync

Vì lưu trữ local nên việc đồng bộ như thế nào là phụ thuộc vào bạn: Dropbox, Google Drive, OneDrive,... hoặc bạn có thể trả phí để sử dụng tính năng Sync.



Và còn nhiều tính năng khác mình chưa dùng hết nữa 😄

## End

Tuy mới ra đời, phiên bản hiện tại là 0.12.3, và hiện đang có bản Beta mobile nhưng các lập trình viên và cộng đồng của Obsidian hoạt động rất tích cực, app cập nhật liên tục. Cá nhân mình dùng thì cũng chưa thấy gì phàn nàn cả. Bài viết này cũng đang được gõ trên Obsidian và sau đó mới copy sang Viblo (để lưu trữ cá nhân và tránh mất dữ liệu 😉) Hi vọng app sẽ ngày phát triển và có nhiều tính năng hữu ích hơn nữa, xứng đáng là đối thủ đáng gờm của RoamResearch.

## Refs
- https://obsidian.md/
- https://boostnote.io/
- https://www.giuspen.com/cherrytree/
- https://joplinapp.org/
- https://www.remnote.io/
- https://www.notion.so/
- https://roamresearch.com
- https://joshwin.imprint.to/post/how-i-use-obsidian-to-manage-my-goals-tasks-notes-and-software-development-knowledge-base
- https://medium.com/swlh/take-better-notes-with-this-free-note-taking-app-that-wants-to-be-your-second-brain-1a97909a677b
- https://theproductiveengineer.net/the-beginners-guide-to-obsidian-notes-step-by-step/
- https://www.sitepoint.com/obsidian-beginner-guide/
- https://wesleyfinck.medium.com/zettelkasten-networked-note-taking-for-naturally-networked-thought-1712809a35a0
- https://fortelabs.co/blog/basboverview/
- https://zenkit.com/en/blog/a-beginners-guide-to-the-zettelkasten-method/