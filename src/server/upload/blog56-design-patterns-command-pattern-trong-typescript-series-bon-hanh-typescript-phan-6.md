![image.png](https://images.viblo.asia/e0f0c393-3d4a-4e01-93e6-612399303e6e.png)

Mình là TUẤN hiện đang là một Full-stack Web Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Chào mừng bạn đến với loạt bài **Design Patterns trong TypeScript**, tại đây mình giới thiệu một số Design Patterns hữu ích trong phát triển web bằng TypeScript.

Các Design Patterns rất quan trọng đối với các web developer và chúng ta có thể code tốt hơn bằng cách thành thạo chúng. Trong bài viết này, mình sẽ sử dụng **TypeScript** để giới thiệu **Command Pattern.**

Command Pattern tách rời Caller và Receiver. Cho phép bạn dễ dàng thêm các lệnh khác nhau để thêm các chức năng khác nhau.

Kịch bản sử dụng Pattern
----

Trên iOS và macOS, đã có chức năng **Shortcuts** được tích hợp sẵn. Với chức năng này, các bạn có thể thực hiện nhanh chóng thực hiện 1 hoặc nhiều tác vụ. Ví dụ: các tác vụ như gửi tin nhắn nhanh, dịch văn bản, rút ​​ngắn URL và Download tệp.

![image.png](https://images.viblo.asia/8e365536-3be3-43c0-bfb5-c7a93bb430ab.png)

Tiếp theo, hãy thực hiện một chức năng tương tự. Trong đoạn code sau, chúng ta định nghĩa một lớp `Shortcuts`, trong đó chúng ta tạo 5 hàm thành viên như `openUrl`, `shortenUrl`, `sendMessage`, v.v.

```javascript
class Shortcuts {
  openUrl(url: string) {
    console.log(`Open url: ${url}`);
  }
  shortenUrl(url: string) {
    console.log(`Shorten url: ${url}`);
  }
  sendMessage(msg: string) {
    console.log(`Send message: ${msg}`);
  }
  translateText(originText: string) {
    console.log(`Translate text: ${originText}`);
  }
  downloadFile(fileUrl: string) {
    console.log(`Download file: ${fileUrl}`);
  }
}
```

Sau đó chúng ta định nghĩa một class `UIEventHandler` chứa hàm `handleAction ` để xử lý các sự kiện của user.

```javascript
class UIEventHandler {
  constructor(public shortcuts: Shortcuts) {}

  handleAction(action: ShortcutsMethods, arg: string) {
    this.shortcuts[action](arg);
  }
}

// "openUrl" | "shortenUrl" | "sendMessage" | "translateText" | "downloadFile"
type ShortcutsMethods = Methods<Shortcuts>;

type Methods<T> = {
  [P in keyof T]: T[P] extends (...args: any) => void ? P : never;
}[keyof T];
```

Phương thức `handleAction` nhận 2 tham số là `action` và `arg`. Type của tham số `action` là `Shortcuts`, được tạo thông qua utility type `Methods`. [Nếu bạn muốn tìm hiểu thêm về các Mapped types, mình khuyên bạn nên tìm đọc một bài viết của mình về chủ đề này.](https://)

Với class `UIEventHandler`, chúng ta có thể sử dụng nó theo cách sau:

```javascript
const shortcuts = new Shortcuts();
const eventHandler = new UIEventHandler(shortcuts);

eventHandler.handleAction("openUrl", "https://medium.com/@bytefer");
eventHandler.handleAction("sendMessage", "Hello Bytefer!");
```

Đối với code trước đó, có vẻ như không có vấn đề gì. Nhưng sau khi phân tích cẩn thận, bạn sẽ thấy các vấn đề sau:

*   Khi gọi hàm `handleAction`, chúng ta cần đảm bảo rằng tên `action` đó phải phù hợp với tên của hàm trong lớp `Shortcuts`.
*   Với sự gia tăng liên tục của các chức năng, sẽ có ngày càng nhiều hàm tương ứng trong lớp `Shortcuts`. Kết quả là, chúng ta cần liên tục sửa đổi lớp `Shortcuts`.

Vậy chúng ta nên giải quyết vấn đề trên như thế nào? Đối với vấn đề này, chúng ta có thể sử dụng **Command Pattern**. 

Command Pattern
----

Trước tiên chúng ta hãy xem sơ đồ UML tương ứng:

![image.png](https://images.viblo.asia/6cae7730-ed5e-4ffe-ae9c-d9b44aa7dc76.png)

Trên thực tế, chúng ta có thể gói các tác vụ như gửi tin nhắn, dịch văn bản và rút ngắn URL thành các lệnh riêng lẻ.

```javascript
interface Command {
  name: string;
  execute(args: any): any;
}
```

Trong đoạn code trên, chúng ta sử dụng các keyword `interface` để xác định type `Command`. Trong kiểu `Command`, một hàm `execute` được định nghĩa để đóng gói logic mà mỗi lệnh cần thực hiện. Với Interface `Command`, hãy xác định các lệnh cụ thể.

```javascript
class OpenUrlCommand implements Command {
  name = "openUrl";
  execute(args: any) {
    console.log(`Open url: ${args[0]}`);
  }
}

class SendMessageCommand implements Command {
  name = "sendMessage";
  execute(args: any) {
    console.log(`Send message: ${args[0]}`);
  }
}
```

Trong đoạn code trên, chúng ta đã tạo các lớp `OpenUrlCommand` và `SendMessageCommand`. Trong tương lai, các lệnh của chúng ta sẽ tiếp tục tăng lên. Để thuận tiện cho việc quản lý các lớp lệnh khác nhau, chúng ta cần định nghĩa một lớp để quản lý các lệnh:

```javascript
class CommandManager {
  commands: Record<string, Command> = {};

  registerCommand(name: string, command: Command) {
    this.commands[name] = command;
  }

  executeCommand(command: string | Command, ...args: any) {
    if (typeof command === "string") {
      this.commands[command].execute(args);
    } else {
      command.execute(args);
    }
  }
}
```

Trong lớp `CommandManager`, hàm `registerCommand` được sử dụng để đăng ký lệnh. Và hàm `executeCommand` được sử dụng để thực thi một lệnh. Với lớp `CommandManager`, hãy cập nhật lớp `UIEventHandler` đã tạo trước đó.

```javascript
class UIEventHandler {
  constructor(public cmdManager: CommandManager) {}
  handleAction(command: string | Command, arg: string) {
    this.cmdManager.executeCommand(command, arg);
  }
}
```

Sau khi cập nhật lớp `UIEventHandler`, hãy khai báo chức năng tương ứng của nó.

```javascript
const commandManager = new CommandManager();
commandManager.registerCommand("openUrl", new OpenUrlCommand());
commandManager.registerCommand("msg", new SendMessageCommand());

const eventHandler = new UIEventHandler(commandManager);
eventHandler.handleAction("openUrl", "https://medium.com/@bytefer");
eventHandler.handleAction("msg", "Hello Medium!");
eventHandler.handleAction(new SendMessageCommand(), "Hello Bytefer!");
);
```

Trong đoạn code trên, trước tiên chúng ta tạo đối tượng `CommandManager` và đăng ký 2 lệnh. Sau đó, chúng ta tạo một đối tượng `UIEventHandler` và sử dụng hàm `handleAction` trên đối tượng để thực thi lệnh đã đăng ký. Sau khi đoạn code trên được thực thi thành công, Interface điều khiển sẽ xuất thông tin sau:

```javascript
Open url: https://medium.com/@bytefer
Send message: Hello Medium!
Send message: Hello Bytefer!
```

**Trong contexts của text editor và chức năng command-line, Command Pattern cũng thường được sử dụng.** Ví dụ: [CAC](https://github.com/cacjs/cac), thư viện của bên thứ ba để tạo chức năng dòng lệnh, cũng sử dụng Command Pattern. Nếu bạn quan tâm, bạn có thể đọc [source code tương ứng](https://github.com/cacjs/cac/blob/master/src/Command.ts).

Các kịch bản sử dụng của Command Pattern:

*   Khi cần trừu tượng hóa các hành động thực thi khác nhau, các tham số khác nhau được sử dụng để xác định hành động nào sẽ thực hiện.
*   Hệ thống cần tách rời Caller request và Receiver request để Caller và Receiver không tương tác trực tiếp. Caller request không cần biết sự tồn tại của Receiver, cũng không cần biết Receiver là ai và Receiver không cần quan tâm khi nào nó được gọi.

Roundup
----
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
----
* https://tuan200tokyo.blogspot.com/2022/12/blog56-design-patterns-command-pattern.html