**Muốn đi nhanh hãy đi một mình, muốn đi xa hãy đi cùng nhau**. 

Chắc hẳn các bạn - những developer đang ngồi trước màn hình máy tính đọc bài viết xàm xí này của mình đều đã từng nghe qua câu nói kể trên. Trừ khi bạn là một kẻ độc cô cầu bại chuyên hành động một mình trong giới freelance, còn không thì dù bạn có đi làm ở đâu cũng đều sẽ có những đồng nghiệp, những team member làm chung một việc với bạn. Và điều đáng sợ nhất đối với lập trình viên khi làm việc chung có lẽ chính là **merge conflict** - xung đột khi kết hợp code.

Tại sao lại phải phòng tránh? Chắc các bạn nếu ai đã từng trải qua đều sẽ hiểu, quá trình **resolve conflict** là một quá trình không những rất mất thời gian mà còn rất dễ phát sinh lỗi ngoài ý muốn. Đã có không ít những lần "*feature của anh đã chạy ngon, phần code của tôi cũng hoàn thiện, vậy mà tới lúc ghép lại lại thành lỗi cả 2, vậy lỗi là do ai?*". Chính vì thế, làm sao để phòng tránh xung đột lẫn nhau là việc cần phải được xem xét ngay từ ban đầu.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/pawct0wdxf_9HUTt.png)

## First things first

Vậy thì người nông dân phải làm gì?

Trước tiên, hãy mở máy tính đọc ngay bài viết này của **Minh Monmen**. À mà đang đọc rồi, bỏ qua bỏ qua.

Bước 2, đọc xong, nếu thấy cái nào áp dụng được, thì nên áp dụng ngay. Từ những kinh nghiệm đau thương và xương máu của bản thân khi làm việc cùng với team **TNHH 1 thành viên** cũng như team **tập đoàn**, mình cho rằng bỏ 1 chút thời gian khi khởi đầu dự án để thống nhất và setup cho quá trình này sẽ giúp các bạn tránh được **unlimited** lần conflict về sau khi làm việc chung với nhau. Kể từ lúc mình áp dụng những quy tắc này, số lần **phá đảo** sản phẩm chỉ vì một commit bất cẩn đã giảm đáng kể, tới mức **gần như zero** luôn đó.

Okay, giờ bắt đầu nè.

## Những vấn đề về sự khác biệt 

Mình sẽ liệt kê ra một số xung đột thường gặp trong quá trình team phát triển phần mềm:

- Xung đột indent (tab hay space, 2 hay 4,...)
- Xung đột line-break (CRLF hay LF), cái này hay conflict giữa win (mặc định CRLF) và linux (LF)
- Xung đột formating (có giãn cách hay không, xuống dòng hay không,...)
- Xung đột file sinh ra trong quá trình runtime (log, data,...)
- Xung đột config 
- Xung đột liên quan tới **not production-ready code**

## Giải quyết sự khác biệt

Những biện pháp phòng tránh dưới đây của mình chỉ phòng tránh những xung đột liên quan tới code, còn những xung đột liên quan tới business như feature trùng lặp, hay bất khả kháng như feature trên cùng vị trí,... thì tự bạn phải giải quyết rồi.

### Bước 1: Thống nhất coding convention

**Coding convention**, hay các chuẩn viết code là những quy tắc chung khi làm việc với một ngôn ngữ hay framework nào đó. Việc cả team của bạn follow theo 1 quy tắc thống nhất tất nhiên là sẽ giúp code của các bạn dễ nhìn, dễ đọc, sáng sủa và dễ hiểu hơn với mọi người trong team. Tuy nhiên ở đây mình sẽ không đề cập sâu tới những quy tắc sâu xa của từng ngôn ngữ lập trình mà sẽ chỉ đề nghị các bạn thống nhất 1 số quy tắc cơ bản liên quan đến **coding style** để làm việc với nhau không bị conflict.

- Tab hay space? Đây là vấn đề tưởng là nhỏ mà lại hóa ra rất to. Bởi vì gần như **dòng code nào cũng có indent**, do vậy việc sử dụng indent thế nào có ảnh hưởng rất sâu rộng tới code base của bạn. Sửa indent nhiều khi có thể dẫn tới **toàn bộ code base thay đổi**. Mình hay để **toàn bộ là space**.
- Indent 2 hay 4 (hay thậm chí 8). Như đã nói ở trên. Nên nhớ indent size này bạn **không cần thiết** phải theo thằng nào cả, chỉ cần team bạn **thống nhất** 1 chuẩn dễ nhìn là được. Mình hay chọn 4.
- Quy tắc xuống hàng.
- Spacing giữa các biến, giá trị,...

Những quy tắc này giờ hầu hết đã được chuẩn hóa đối với từng ngôn ngữ, và quan trọng hơn là các IDE cũng hỗ trợ **auto-formating** theo các chuẩn này. Việc các bạn thống nhất được coding convention sẽ giúp việc dev dễ dàng hơn, tránh được việc dù không sửa code vẫn tính commit mới vì xuống dòng hay warning chi chít.

### Bước 2: Định nghĩa file `.editorconfig`

Sau khi các bạn thống nhất coding convention cho project của mình. Bước tiếp theo là setup môi trường để IDE của mọi người trong team có thể follow chung cái chuẩn đó, tránh code máy người này đẹp sang máy người kia format lại loạn xì ngầu.

[Editorconfig](https://editorconfig.org/) là một định nghĩa về coding style được nhiều IDE chấp nhận. Nó cho phép các IDE trên các máy khác nhau (hoặc IDE khác nhau luôn) có thể nhận ra được những style rule ở mức độ **project**. Các bạn có thể  đọc thêm trên trang chủ của nó để biết IDE của mình có support sẵn không hay cần cài thêm plugin.

Editorconfig sẽ làm nhiệm vụ báo cho IDE biết project của bạn dùng indent gì, khoảng cách bao nhiêu, xuống dòng bằng gì,... Bên dưới là 1 file `.editorconfig` mẫu mình đặt trong project root:

```python:ini
# editorconfig.org
root = true

[*]
indent_style = space
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

> File này mình định nghĩa về indent, linebreak và charset cho các file trong project. Ngoài ra có thêm phần về loại bỏ khoảng trống thừa và dòng trống cuối file.

### Bước 3: Auto format/linting code

Sau khi các bạn đã setup thành công các rule cho IDE, bước này là setup các plugin của IDE liên quan tới việc lint code / auto format code. 

**Chú ý**: Đây là một con dao 2 lưỡi. Một mặt nó giúp code của các bạn đạt được sự thống nhất cao và dễ đọc, sạch sẽ hơn. Mặt khác lại có thể khiến cho vấn đề conflict trở nên trầm trọng hơn nếu setup không chuẩn.

Tại sao lại như vậy? Bởi vì việc setup lint code và format code chuẩn sẽ giúp bạn phòng tránh được 99.99% lỗi liên quan tới syntax code khi mà IDE đã tự phân tích code và nhận ra những đoạn syntax có vấn đề. Thêm vào đó, việc auto format code còn giúp team làm việc cùng nhau tránh được các vấn đề về khoảng cách hay code khó đọc nữa.

Tuy nhiên, việc auto format lại phụ thuộc kha khá vào IDE. Do vậy nếu team của bạn dùng cùng 1 IDE thì việc setup auto format giống nhau sẽ phát huy được hiệu quả tốt nhất, khi mà việc auto format của mọi người không gây ảnh hưởng lẫn nhau. Còn nếu mọi người sử dụng IDE khác nhau thì hãy cẩn thận với tính năng này và xem xét kỹ khi sử dụng nhé.

Nếu như không muốn setup auto format code, thì các bạn có thể chỉ sử dụng các công cụ lint code như `eslint` (với JS) hay `PHP code sniffer` (với PHP),... cũng được. Những công cụ này giúp đưa ra các cảnh báo về coding convention đối với code của các bạn. Qua đó giúp các bạn sửa chữa và thống nhất cả team dễ dàng hơn.

Các tool format code JS hay PHP: **prettier**, **phpfmt**,...

### Bước 4: Thống nhất quy trình làm việc với Git

Một điều tối quan trọng nhưng thường được các team nhỏ và vừa bỏ qua đó chính là quy trình làm việc với Git. Dù chắc ai cũng hiểu được git hoạt động thế nào, commit code ra sao, push pull như nào nhưng mọi người lại ít khi để ý tới việc làm việc với git thế nào cho đúng.

Một quy trình làm việc mẫu với git mà mình thấy khá hợp lý đó chính là **Git flow**. Các bạn có thể đọc thêm [bài viết này](https://nvie.com/posts/a-successful-git-branching-model/) để hiểu hơn về cách hoạt động của Git Flow. Hoặc một bài viết Tiếng Việt dễ hiểu và trực quan hơn [tại đây](https://danielkummer.github.io/git-flow-cheatsheet/index.vi_VN.html)

Đây là quy trình cho phép các bạn phát triển các tính năng của sản phẩm một cách đồng thời, tránh lỗi và rất hiện đại. Mình thấy đây là quy trình rất phù hợp với các bạn làm app, mobile hay những thứ release theo phiên bản, còn với các hệ thống web - thay đổi nhanh và liên tục, việc quản lý phiên bản chưa mang ý nghĩa nhiều thì chỉ nên follow theo 1 số quy tắc của **Git flow** thôi. Các bạn có thể tham khảo thêm [bài viết này](https://blogs.technet.microsoft.com/devops/2016/06/21/a-git-workflow-for-continuous-delivery/) về flow liên quan tới short-lived branch.

Ví dụ nhé: project của các bạn chỉ nên có **1 điểm xuất phát**, tức là mọi tính năng đều xuất phát từ bản **stable** (master) và sẽ kết thúc tại master. Trong quá trình phát triển này sẽ được merge tới các branch **unstable** như dev, staging,... và phải update code từ master trước khi push hay tạo merge request.

Việc project của các bạn có luồng update code xác định như vậy sẽ giúp tránh được conflict khi phát triển, không những là giữa các member trong team mà còn giữa chính các feature nữa.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/3jpw9tfwf7_ghflow-1024x449.png)

### Bước 5: Thiết kế file `.gitignore` thật cẩn thận

Đây là một sai lầm cực kỳ phổ biến của các bạn mới ra trường hay thậm chí là những developer lâu năm khi không viết file `.gitignore` một cách cẩn thận. 

> `.gitignore` là file chứa những đường dẫn, thư mục, file được git **bỏ qua**. Những file này sẽ không được commit vào git repo mà chỉ tồn tại trên từng môi trường chạy.

Sau đây là những file **rất rất hay gây ra conflict** do setup không chuẩn `.gitignore`:

- Log file (error, info log,...)
- Config file (database config, url config,...)
- IDE file (project file)
- Runtime data file (upload, temp file,...)
- Dist file (app file sau khi build)

Những file này nếu không được để ý cẩn thận sẽ có thể gây ra không những là confict code giữa member trong team mà còn có thể gây lỗi cả hệ thống production. Vậy nên hãy đặc biệt chú ý tới `.gitignore` khi khởi tạo project nhé. 

Một tool tạo file `.gitignore` rất mạnh và đầy đủ đó là [gitignore.io](https://www.gitignore.io/). Hoặc các bạn cũng có thể tham khảo những file `.gitignore` mẫu tại repo này: [github/gitignore](https://github.com/github/gitignore)

Đây là một ví dụ về  `.gitignore` với project của mình

```bash
# Use yarn.lock instead
package-lock.json

# Environment variables
.env

# Logs
logs
*.log
npm-debug.log*

# Documentation
docs

# Runtime data
pids
*.pid
*.seed

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules
jspm_packages

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Dist folder
dist

# Project file
*.sublime-project
*.sublime-workspace
.idea
```

## Kết luận

Tóm tắt lại bài viết, mình đã cung cấp cho các bạn một số guideline để các bạn có thể tham khảo học tập và cải thiện hiệu suất làm việc với team. Đây chỉ là một số phương pháp phòng tránh conflict phát sinh từ lý do con người. Còn những conflict liên quan tới business hay chức năng thì là nhiệm vụ của các bạn phải giải quyết rồi. 

Mình vẫn thường chia sẻ với mọi người rằng: "Đóng góp lớn nhất của mình với công ty cũ XXX không phải là sản phẩm YYY, mà chính là quy trình làm việc nhóm được mình đúc kết từ cái giá phải trả là thời gian và những lần phá đảo". Hy vọng rằng qua bài viết này của mình, các bạn cũng sẽ tiết kiệm được 1 lượng không nhỏ thời gian và công sức cho những lần conflict ngớ ngẩn với team nhé.