# Mở đầu

Format code luôn là một nỗi đau nhức nhối với dev, nhất là khi làm việc theo nhóm, việc nhìn code của một người không có format thật là gây đau mắt. Thật tuyệt là ngày nay có không ít tool giúp việc này đơn giản hơn rất nhiều. Nếu bạn đang làm việc với JS, [Prettier](https://prettier.io/) là một extension tuyệt vời cho bạn, à đó là nếu như bạn đang sử dụng VS Code.


# Ví dụ code đau mắt

Đây là đoạn code sai format mà chúng ta sẽ sử dụng trong bài viết này, một số lỗi xuất hiện bao gồm:

- Sử dụng lẫn lộn cả nháy đơn và nháy kép
- Ngoặc đóng của const person phải nằm trên cùng 1 dòng với nó trong trường hợp này
- console.log trong function phải được thụt vào
- Bạn có thể không thích dấu ngoặc quanh tham số của function trong trường hợp này, đối với funtion chỉ có 1 tham số, ta có thể bỏ đi dấu ngoặc

![](https://images.viblo.asia/067307da-eb32-4f49-9e97-bde2a3a2a29a.png)


# Cài đặt Prettier

Bắt tay vào cài đặt nào.

Để làm việc với Prettier trên VS Code, bạn sẽ cần phải install extension Prettier. Tìm  [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) trên VS Code, bạn có thể thấy giao diện extension như dưới. Nếu bạn install lần đầu tiên, bạn sẽ thấy nút "install", chỉ việc click và việc cài đặt sẽ nhanh chóng hoàn thành

![](https://images.viblo.asia/4a83176d-8cb9-4a19-8909-692e02e2e2fc.png)

# Format Command

Sau khi cài đặt xong Prettier, chúng ta có thể sử dụng nó để format code ngay lập tức. Chúng ta sẽ config nó cụ thể ở phần sau, nhưng để bắt đầu, chúng ta sẽ thử sử dụng Format Command.

Để mở bảng command, bạn có thể sử dụng **Command + Shift + P** trên Mac hoặc **Ctrl + Shift + P** trên Windows. Trong bảng command, tìm **format** rồi lựa chọn **Format Document**.

![](https://images.viblo.asia/a3952b28-ee24-4e21-97ad-b18b7d7d7ad1.png)

Bạn có thể sẽ được hỏi lựa chọn formatter nào được sử dụng, trong trường hợp đó, hãy ấn vào nút **Configure**.

![](https://images.viblo.asia/10d4b688-92e7-42ae-b0c4-196c11482e81.png)


Sau đó lựa chọn **Prettier - Code Formatter**.

![](https://images.viblo.asia/286e0a34-255e-4718-a431-db14267fb13c.png)


Và thế là xong! Code của bạn đã được format và nhìn thật dễ đọc. Cùng điểm qua một số khác biệt:

- Điều chỉnh lại space
- Điều chỉnh ngoặc bao {}
- Điều chỉnh dấu ngoặc kép thành ngoặc đơn

![](https://images.viblo.asia/121756d7-5a0b-41db-a200-6a666f46fed7.png)


> Prettier cũng hoạt động với file CSS

Từ Code này:

![](https://images.viblo.asia/6a70b07c-427c-4492-91ce-3d21ffcd0ff0.png)


Thành thế này:

![](https://images.viblo.asia/4b188425-4627-4fa9-9329-049a0e9e668f.png)


# Tự động format khi Save
Bên trên chúng ta đã chạy command thủ công để format code. Giờ, chúng ta có thể sử dụng setting của VS Code để tự động format code của bạn mỗi lần Save, bạn sẽ không cần phải lo việc format code bất kì lần nào nữa, VS Code sẽ tự động làm việc đó cho bạn.

Để thay đổi setting, sử dụng **Command + ,** trên Mac hoặc **Ctrl + ,** trên Windows để mở menu setting. Sau đó tìm **Editor: Format on Save** và đảm bảo nó đã được check.

![](https://images.viblo.asia/d5ed3453-a5f0-4b87-8856-5eb282290dd2.png)


Sau khi đã bật Format on Save, bạn có thể thoải mái viết code cẩu thả, và VS Code sẽ lo việc tự động format nó lại cho bạn.


# Config Prettier trong VS Code setting

Prettier làm được rất nhiều thứ mặc định, tuy nhiện bạn có thể custom lại setting của nó. Một số thứ thông dụng có thể setting như:
- Nháy đơn - Bạn có thể lựa chọn giữa nháy đơn và nháy kép
- Dấu chấm phẩy - Lựa chọn thêm hoặc không thêm dấu chấm phẩy ở cuối dòng.
- Tab - Config một tab sẽ bao gồm bao nhiêu space

Mở bảng menu setting sau đó tìm kiếm **Prettier**. Tất cả setting sẽ được mở ra trên editor.

![](https://images.viblo.asia/744c6d58-0013-4950-b123-cf4f1b3c3828.png)


Mình sẽ để dành những setting trong đây để các bạn tự khám phá.

# Tạo file config Prettier

Nhược điểm của sử dụng setting trong menu cài đặt VS Code là nó không đảm bảo tính nhất quán giữa các developer trong team. Nếu bạn thay đổi setting trong VS Code của bạn, người khác cũng có thể sẽ có setting khác trong VS Code của họ. Điều này làm cho việc thống nhất format trong team rất khó khăn.

Để giải quyết vấn đề này, bạn có thể tạo một file config Prettier dùng chung trong dự án. Nó phải được đặt tên là **.prettierrc.(ext)** trong đó phần đuôi mở rộng **(ext)**  là một trong những loại sau đây:
- yml, yaml, or json
- js
- toml
- hoặc những đuôi được include trong package.json (tùy chọn)

Đây là một ví dụ về file config đơn giản:

![](https://images.viblo.asia/26667484-1188-40b5-957a-dfe5530b7cd1.png)


Để xem thêm các config cụ thể, bạn có thể check tại [Prettier Docs](https://prettier.io/docs/en/configuration.html). Sau khi đã tạo file config chung, bạn có thể đảm bảo mọi thành viên đều tuân theo format rule giống nhau.


# Tổng kết

Bạn đã quá chán nản với việc phải chỉnh sửa convention khi code, hoặc đơn giản bạn chỉ là một người quá lười, Prettier sẽ giúp bạn tiết kiệm thời gian coding của mình. Hi vọng bài viết này sẽ giúp bạn một chút trên con đường trở thành một dev có tâm và có tầm.