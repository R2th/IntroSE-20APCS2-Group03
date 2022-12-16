Hi All.
Từ nay mình sẽ ko viết về .Net nữa mà sẽ chuyển qua viết về ReactJS.
Serie về .Net core hôm trước sẽ giúp các bạn thực hành cho phần ReactJs này.

# Cài đặt môi trường
Trước khi bắt đầu học chúng ta cần chuẩn bị môi trường trước nhé.

Để chuẩn bị cho môi trường code ReactJS chúng ta cần phải cài đặt theo danh sách sau:
 - NodeJS
 - Code Tool

## NodeJS
Một số chúng ta đang bị hiểu sai rằng để sử dụng Node thì chúng ta CẦN PHẢI cài đặt node, nhưng trên thực tế thì Chúng ta có thể sử dụng React mà không cần cài đặt Node. React là một thư viện viết bằng **javascript**, dùng để xây dựng **giao diện người dùng(User Interface – UI)**. Cho nên nói theo một cách nào đó thì chỉ cần cho chúng ta một browser là chúng ta có thể làm việc được với React rồi

> You don’t need Node to run a React project. You don’t even need a browser.

Vậy tại sao chúng ta lại cần cài đặt Node.

Bởi vì khi chúng ta xây dựng một Project thì một mình React là chưa đủ, mà nó đòi hỏi cần phải có nhiều thứ khác, và Node là một trong những yếu tố quan trọng để chúng ta có thể phát triển một project về React. Cụ thể Node sẽ đóng vai trò làm **Server side language**: để xử lý logic và lưu trữ dữ liệu trên server.


### Giới thiệu chút ít về Node
- Node là một trong những nền tảng để làm việc dễ dàng với React, nó là nền tảng để chạy Web Server mà ReatJS có thể chạy trên đó.
- Nếu bạn không sử dụng Node để host React thì còn có thể sử dụng các tool do node cung cấp để phát triển project:
    - Webpack Node: các bạn có thể để build project và compile JSX 

### Lợi thế khi phát triển Project React với Node.
- Hầu như tất cả các Demo về React đều được phát triển dựa trên nền tảng của node nên khi chúng ta có issue sẽ dễ dàng tìm được solution giải quyết vấn đề.
- Node là Javascript nên việc sử dụng chung với React là hợp lý vì không cần phải compile qua một ngôn ngữ nào khác.
- Ngoài ra với các bạn code Web App thì sẽ thấy việc debug ở tầng Frontend sẽ dễ dàng hơn so với các ngôn ngữ khác, khá là thuận tiện .


### Cài đặt Node
1. Với Windows:
Để download NodeJS bạn cần truy cập vào địa chỉ dưới đây:
- [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

![](https://images.viblo.asia/4adf44de-db7b-421c-a79d-679e0198fa13.png)

Sau khi tải Node JS về thì công việc còn lại khá là đơn giản, chỉ cần Next And Next là Xong.

Để check lại đã cài đặt thành công thì chúng ta check như sau:
 - Mở cmd
 - Gõ lệnh `node -v` và cho ra kết quả như sau.
 ![](https://images.viblo.asia/1bf4087f-fe69-4082-b98c-5aa639a16b8b.PNG)
 
 Ngoài ra khi cài đặt node thì mặc định phầm **NPM** sẽ được cài đặt mặc định vào máy bạn luôn. Các bạn cũng check version của **NPM** bằng lệnh:
 - Gõ lệnh `npm -v` và cho ra kết quả như sau.!
 
  [](https://images.viblo.asia/64b8f8aa-6774-4043-966e-14080dcc4544.PNG)
  
  Với bản thân mình thì mình thích sử dụng **YARN** hơn là **NPM**, các bạn có thể tìm hiểu YARN qua Google nhé.
2. Với Linux
Còn với Linux thì chúng ta cài đặt như sau, mình đang sử dụng **ubuntu 16.04 LTS**

- `sudo apt-get update` Update pakage để đảm bảo rằng ko có vấn đề gì phát sinh và tất cả các package đang sử dụng là mới nhất 
- `sudo apt-get install nodejs` Cài đặt NodeJS
- `sudo apt-get install npm` cài đặt NPM
- Fix lỗi “node no such file or directory” : `sudo ln -s "$(which nodejs)" /usr/bin/node`
- `node -v` Để check version của node
## Visual Studio Code (VSC):

Mình hiện tại đang sử dụng Visual code nên mình đưa vào bài viết luôn nhé, nếu các bạn quen sử dụng tool nào thì cứ sử dụng bình thường nha.
Sau đây mình xin giới thiệu một số ưu điểm của Visual Code đã thuyết phục mình sử dụng nó
1. UI: VSC có một giao diện khá là thân thiện, thể hiện rõ trong các action như quản lý file, folder, tìm kiếm và extension, giúp chúng ta không mất quá nhiều thời gian để làm quen với Tool
2. Command Palette: Nhấn Shift-Command-P để bật Command Palette, Nếu bạn đã làm việc quen với việc gõ lệnh thay vì các thao tác thì đây là một trong những chức năng khá là phù hợp với bạn.
3. Terminal: VSC đã tích hợp sẵn Terminal cho phép bạn có thể thực thi các lệnh command ngay trên VSC mà không cần phải mở **cmd(windows)** hay **Terminal(Linux)** 
4. Git: VSC có sẵn các chức năng của GIT, các bạn sẽ quản lý suorce ngay trên VSC luôn mà ko cần phải cài đặt gì thêm.
5. Đa trỏ chuột: Cho phép bạn sửa nhiều line cùng một lúc.
6. UserSetting: cho phép bạn có thể config các chức năng theo ý bạn mà ko cần quan tâm tới quá nhiều tới các cài đặt khác, khi không cần sử dụng setting đó nữa cũng dễ dàng tháo bỏ mà ko sợ ảnh hưởng tới các setting default của VSC
7. IntelliSense: Đó là một tính năng tự động hoàn tác được cải tiến, trợ lý cú pháp và hơn những gì bạn mong đợi về tính năng này. ví dụ: Di chuyển chuột lên trên CSS selector sẽ cung cấp cho bạn một ví dụ về cách bạn có thể sử dụng HTML tương ứng
8. Extension: link trực tiếp đến [marketplace](https://marketplace.visualstudio.com/VSCode), rất nhiều extension hỗ trợ cho VSC, các bạn có thể thoải mái tìm kiếm và lựa chọn.

## Cài đặt
1. Với windows:
- Visual Studio Code yêu cầu máy tính phải được cài đặt sẵn **.NET Framework 4.5.2.** Nên mọi người nhớ check xem máy mình đã cài **.NET Framework 4.5.2.** chưa nhé.
- Tải Visual Studio Code 1.12 theo đường dẫn: https://code.visualstudio.com/, Sau khi quá trình tải hoàn tất, chạy file cài đặt.
- Next Next and Next (nhưng nhớ dừng ở step như ảnh bên dưới, select tất cả các option và next tiếp nhé)
-![](https://images.viblo.asia/6ee31aca-0336-4992-87cc-c090486b4eec.png)

Làm xong các bước bên dưới là chúng ta đã cài đặt xong VSC cho windows rồi nhé mn.

3. Với Linux:
Trước tiên các bạn cần download phiên bản mới nhất của VSCode dưới dạng file deb về máy:
![](https://images.viblo.asia/0940d5c1-2f86-4463-b31a-9bd0c0f98195.jpg)

Để cài đặt VSCode các bạn chạy lần lượt các lệnh sau:
- `cd ~/Downloads`
- `sudo dpkg -i <file>.deb`
- `sudo apt-get -f install`

Như vậy là chúng ta đã chuẩn bị xong các công cụ để có thể bắt đầu học React rồi, buổi sau chúng ta sẽ cùng đi tìm hiểu vào React nhé.