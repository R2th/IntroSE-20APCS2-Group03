Xin chào, trong bài post này, mình sẽ giới thiệu đến mọi người một game đoán từ, có thể dùng học từ vựng tiếng Anh, là **Hangman**.

Game [Hangman](https://en.wikipedia.org/wiki/Hangman_(game)) hay còn gọi là trò chơi **“Người treo cổ”**  là một trò chơi với giấy và bút theo kiểu đoán từ dựa vào số ký tự của từ đó, nó tương tự với đoán ô chữ vậy á. 

### **Luật chơi:**

Thông thường trò này gồm hai người chơi, một người sẽ nghĩ ra từ gì đó rồi đưa ra số ký tự của từ để người còn lại đoán. Người thứ hai sẽ lần lượt đoán các chữ có mặt trong từ, mỗi lần đoán đúng thì các gạch ngang sẽ thay bằng các ký tự đó, còn đoán sai thì giá treo cổ sẽ bị vẽ thêm một nét của “người treo cổ”. 

Và cuộc chơi kết thúc khi người thứ hai đoán đúng từ hoặc hình người treo cổ bị(hình này gồm 6 nét: đầu, cổ, hai tay, hai chân) vẽ hoàn tất.

([tham khảo video luật chơi ở đây](https://www.youtube.com/watch?v=leW9ZotUVYo))

Bạn có thể học tiếng Anh với trò này được mô phỏng ở trang [hangmanwordgame](https://hangmanwordgame.com/).

## Hangman demo với Python

Còn bây giờ, tụi mình sẽ cùng nhau làm game Hangman này, một phiên bản khá đơn giản có thể chơi trực tiếp trên terminal khi chương trình Python chạy. 

Mời bạn xem qua demo dưới đây:

– người chơi thắng

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/10/win-demo.gif?fit=878%2C694&ssl=1)

– người chơi thua:

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/10/demo.gif?fit=878%2C694&ssl=1)

Bạn cũng có thể chơi thử ở [đây](https://replit.com/@diemthanhthanh/Hangman-Demo) nè. 

Thú vị quá phải không 🥳   Giờ thì bắt tay vào làm game này thôi  👉

## Bước 1: Phân tích và vẽ sơ đồ game

Đầu tiên, bạn cần đọc lại để hiểu nguyên tắc của trò chơi và vẽ được sơ đồ logic của game nhé. 

[draw.io](https://www.draw.io/) là một công cụ khá hữu ích có thể giúp tụi mình làm việc này, hãy dùng một khối chữ nhật “**Bắt đầu**” và một khối “**Kết thúc**” và vẽ logic bên trong ấy vào.

Bạn có thể tham khảo một sơ đồ logic như dưới đây để có thể bắt tay vào vẽ một sơ đồ tương tự cho game của bạn trước khi xem sơ đồ mình vẽ nhé 🥺.

### Sơ đồ mẫu

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/10/Screen-Shot-2021-10-05-at-22.24.08.png?w=702&ssl=1)

### Mô tả logic game

Ở phiên bản game đơn giản này, bạn có thể thấy logic có thể được mô tả là:

– một từ ngẫu nhiên đã được chọn, số ký tự của từ sẽ xuất hiện với dấu “_”. 

  Ví dụ từ được chọn là “happy” thì màn hình sẽ in ra là _ _ _ _ _

– người chơi được yêu cầu đoán chữ đầu tiên

– nếu đoán đúng:

   – chữ đó sẽ hiện thay thế cho dấu _. Ví dụ đoán chữ a, thì từ sẽ hiện là _ a _ _ _ 

   – trong trường hợp đã đoán đủ ký tự trong từ thì trò chơi kết thúc với người chơi thắng.

– nếu đoán sai: 

  – một nét sẽ được vẽ vào người treo cổ, tương đương với bạn mất một mạng. Tổng số mạng bạn có là số nét vẽ của người treo cổ, 6 nét.

  – nếu không còn mạng nào thì trò chơi kết thúc, người chơi thua.

  – nếu còn mạng thì tiếp tục cho đoán tiếp chữ khác

🌹 Dựa vào logic này bạn thử vẽ sơ đồ cho riêng mình nếu chưa tự làm nha.  

### Sơ đồ game

Còn đây là sơ đồ mình vẽ:

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/10/Screen-Shot-2021-10-05-at-22.44.48.png?w=750&ssl=1)

## Bước 2: Làm phiên bản đơn giản

Ở phiên bản này, mình sẽ cùng nhau code Python sao cho cái flow game ở trên được thể hiện. 

Tại đây sẽ có một vài lưu ý để giúp chương trình đơn giản hơn, ví dụ như vài gợi ý từ mình là:

1. Bạn có thể chọn từ gì đó ngẫu nhiên từ một danh sách có sẵn, ví dụ như [“apple”, “orange”, “pepper”]

2. In cái từ này ra để mình dễ so sánh các chữ được đoán có nằm trong đó không

3. Không cần hiển thị cầu kỳ, chỉ cần đúng logic của game trước


#### Các bước nhỏ bao gồm:

– Chọn từ, yêu cầu đoán một chữ và thay chữ đúng vào dấu _

– Giả sử đoán tất cả chữ đều đúng, người chơi thắng

– Giả sử đoán sai cả 6 lượt, người chơi thua

### Bước 2.1: Chọn từ, đoán chữ và thay thế chữ đúng vào dấu _

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/10/demo-step-1.gif?fit=1110%2C600&ssl=1)

Ở đoạn code trên mình đã sử dụng hàm **random.choice()** để chọn một phần tử từ một sequence(đó có thể là danh sách, set, …), dùng một danh sách để chứa các dấu **_** và sẽ thay thế nó bởi vị trí của ký tự được đoán nằm trong từ.


### Bước 2.2: Giả sử đoán tất cả chữ đều đúng, người chơi thắng

Để chương trình chạy liên tục với số lần chưa xác định, mình sẽ dùng while với điều kiện dừng là một biến **end_game** có giá trị ban đầu là **False**. 

Khi nào không còn ký tự **_** nào trong danh sách display của mình nữa mình sẽ thay đổi biến **end_game** thành **True** để thoát khỏi vòng lặp.

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/10/demo-step-2.gif?fit=1140%2C662&ssl=1)

### Bước 2.3: Giả sử đoán sai cả 6 lượt, người chơi thua

Gọi một biến tên **lives** có giá trị ban đầu là 6. Mỗi lần người chơi đoán sai thì **lives** sẽ bị trừ đi **1**. Và người chơi sẽ thua khi lives về **0**.

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/10/demo-step-3.gif?fit=1190%2C836&ssl=1)
Vậy là mình đã cùng nhau hoàn thành logic cơ bản của trò chơi rồi. 

## Bước 3: Nâng cấp trò chơi

Tiếp theo hãy cũng nâng cấp trò chơi này với một danh sách từ thật dài để tha hồ mà chọn kèm với trang trí trò chơi với “người treo cổ” bằng ascii nha.

### Bước 3.1: Lưu danh sách từ dài ở mô-đun
Hãy chọn một danh sách các từ tiếng Anh bạn muốn học và lưu vào một file tên là **words.py** với biến **word_list**. Khi đó, bạn có thể nạp danh sách này vào file main chương trình chính.

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/10/demo-step-4.gif?fit=1192%2C536&ssl=1)

### Bước 3.2: Chọn ascii trang trí cho trò chơi

Bạn có thể dùng Google để tìm kiếm với từ khóa “**hangman ascii**” thì sẽ có kết quả như là đây. Sau đó hãy tạo một file **art.py** để lưu các nội dung trang trí này. 

Mình sẽ có biến **stages** là danh sách các trạng thái của người treo cổ, theo thứ tự ngược từ đầy đủ đến chỉ có mỗi cái giá treo. Thứ tự này có thể giúp mình chọn đúng hình tương ứng với biến lives. Ví dụ lives ban đầu là 6 thì *stages[6]* sẽ là hình cái giá treo thôi.

Bên cạnh đó mình cũng bỏ một biến logo của trò chơi này.
Cuối cùng là mình sử dụng hàm **clear** của replit để có thể xóa các hình in ra ở những lần đoán trước để chương trình mượt hơn.

Cùng xem kết quả cuối cùng nhé! 

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/10/demo-step-5.gif?fit=1242%2C658&ssl=1)

---
Vậy là tụi mình đã cùng nhau làm một game Hangman đơn giản với các kiến thức Python vô cùng cơ bản rồi. 

Và [bài gốc của nội dung này](https://beautyoncode.com/lam-game-hangman-voi-python/) nằm trên blog cá nhân của mình nhé!

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!