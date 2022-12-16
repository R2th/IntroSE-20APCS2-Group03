# I. Dẫn nhập
* Như chúng ta đã biết thì gần đây Facebook đã thay đổi license của nhiều thư viện chính chủ từ [BSD-3]( https://en.wikipedia.org/wiki/BSD_licenses) sang [MIT](https://opensource.org/licenses/MIT) và điều này mang rất nhiều ý nghĩa quan trọng. Về bản chất thì các license có gì khác nhau? Các sử dụng chúng như thế nào? Trong khuôn khổ bài viết này chúng ta sẽ có những cái nhìn tổng quan về các loại license phổ biến và cũng như cách áp dụng chúng cho các dự án open-source trên Github. Nội dung tiếng Anh của bài viết được tham khảo tại [đây]( https://www.freecodecamp.org/news/how-open-source-licenses-work-and-how-to-add-them-to-your-projects-34310c3cf94/)

# II. Nội dung chính
## 1. Quyền quản lý

* Các license phổ biến đều có một đặc điểm chung quan trọng đó là đều được phê duyệt bởi Open Source Initiative ([OSI](https://opensource.org/)). OSI được thành lập vào năm 1998 với mục tiêu thúc đẩy sự phát triển của phần mềm mã nguồn mở. OSI đã tạo ra Open Source Definition ([OSD](https://opensource.org/osd)) để định nghĩa mã nguồn mở là gì.
* Dưới đây cách OSI nói về chính họ:
> Open Source Initiative (OSI) là một công ty phi lợi nhuận với phạm vi toàn cầu được thành lập để phổ biến và ủng hộ các lợi ích của mã nguồn mở, góp phần xây dựng cầu nối giữa các thành phần trong cộng đồng mã nguồn mở.
## 2. License
* Hầu hết các license mã nguồn mở đều bao gồm các phát biểu sau:
1. Phần mềm có thể được sửa đổi, sử dụng thương mại và phân phối.
2. Phần mềm có thể được sửa đổi và sử dụng với quyền riêng tư.
3. Phần mềm phải bao gồm license và thông tin bản quyền.
4. Tác giả phần mềm không cấp sự đảm bảo và không phải chịu trách nhiệm cho bất cứ điều gì.

* Chúng ta tìm hiểu các license phổ biến nhất theo thứ tự từ hạn chế nhất đến dễ dãi nhất (theo quan điểm của người dùng)
### a. GNU General Public License v3 ([GPLv3](https://www.gnu.org/licenses/gpl-3.0.html))
* GPLv3 là một trong những license hạn chế nhất. Nó tạo ra để bảo vệ với mức độ cao cho tác giả của phần mềm.
1. Mã nguồn phải được công khai bất cứ khi nào phần mềm được phân phối.
2. Các sửa đổi của phần mềm phải được phát hành với chung một license.
3. Những thay đổi được thực hiện cho mã nguồn phải được ghi lại.
4. Nếu tài liệu được cấp bằng sáng chế đã được sử dụng trong việc tạo ra phần mềm thì nó cấp quyền cho người sử dụng nó. Nếu người dùng kiện bất ký ai về việc sử dụng tài liệu được cấp bằng sáng chế thì họ sẽ mất quyền sử dụng phần mềm.
* [GPLv2](https://www.gnu.org/licenses/gpl-2.0.html) cũng rất phổ biến. Sự khác biệt so với GPLv3 là điều khoản về cấp bằng sáng chế. [Điều khoản này](http://www.nytimes.com/2006/11/22/technology/22soft.html) đã được thêm vào phiên bản 3 để ngăn chặn các công ty tính phí với người dùng sử dụng bằng sáng chế của họ.
* Các dự án sử dụng GPLv3 tiêu biểu có [Bash](https://www.gnu.org/software/bash/) và [GIMP](https://www.gimp.org/), [Linux](https://github.com/torvalds/linux) sử dụng GPLv2.
* [Ezequiel Foncubierta](https://medium.com/@ezequiel) đã chỉ ra một điều quan trọng đối với GPL license:
> License của mã nguồn bạn tạo ra phải tương thích với license của mã nguồn mở mà bạn đang liên kết. Ví du: Nếu mã nguồn của bạn là độc quyền thì bạn sẽ không được phép sử dụng thư viện theo GPL license. Đây là sai lầm mà mọi người hay mắc phải.
### b. Apache License 2.0
* [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) cũng cấp nhiều sự linh hoạt hơn cho người dùng.
1. Mã nguồn không cần công khai khi phần mềm được phân phối.
2. Các chỉnh sửa của phần mềm có thể được phát hành dưới bất kỳ license nào.
3. Những thay đổi của mã nguồn phải được ghi lại.
4. Cung cấp cách bảo vệ sử dụng bằng sáng chế giống như GPLv3.
5. Cấm sử dụng tên thương hiệu được tìm thấy trong dự án.
* Các dự án phổ biến sử dụng Apache License 2.0 là [Android](https://github.com/aosp-mirror/platform_system_core/blob/master/NOTICE), [Apache](https://httpd.apache.org/) và [Swift](https://github.com/apple/swift)
### c. Berkeley Software Distribution (BSD)
* BSD có hai phiên bản chính: [2-clause](https://opensource.org/licenses/BSD-2-Clause) và [3-clause](https://opensource.org/licenses/BSD-3-Clause). Cả hai đều cung cấp sự linh hoạt hơn cho người dùng so với Apache License 2.0
1. Mã nguồn không cần công khai khi phần mềm được phân phối.
2. Các chỉnh sửa của phần mềm có thể được phát hành dưới bất kỳ license nào.
3. Những thay đổi của mã nguồn có thể không được ghi lại.
4. Không cung cấp vị trí rõ ràng về việc sử dụng bằng sáng chế.
5. License và thông tin bản quyền phải được đưa vào tài liệu của phiên bản đã được biên dịch của mã nguồn (khác với chỉ có trong mã nguồn).
6. BSD 3-clause nói rằng tên của tác giả và những người đóng góp không thể được sử dụng để quảng bá các sản phần có nguồn gốc từ phần mềm mà không được phép.
* Các dự án phổ biến sử dụng BSD license là [Go](https://github.com/golang/go) (3-clause), [Pure.css](https://github.com/yahoo/pure) (3-clause) và [Sentry](https://github.com/getsentry/sentry) (3-clause).
### d. MIT License
* [MIT](https://mit-license.org/) là một trong những license dễ chịu nhất. Nó cũng là một trong những license phổ biến nhất. MIT cung cấp sự bảo vệ rất thấp cho tác giả của phần mềm.
1. Mã nguồn không cần công khai khi phần mềm được phân phối.2
2. Các sửa đổi của phần mềm có thể được phát hành theo bất kỳ license nào.
3. Những thay đổi của mã nguồn có thể không được ghi lại.
4. Không cung cấp vị trí rõ ràng về việc sử dụng bằng sáng chế.
* Các dự án phổ biến sử dụng MIT là [Angular.js](https://github.com/angular/angular.js), [jQuery](https://github.com/jquery/jquery), [Rails](https://github.com/rails/rails), [Bootstrap](https://github.com/twbs/bootstrap) và nhiều dự án khác.
* [React.js](https://github.com/facebook/react) của Facebook đã có license BSD-3 cho đến ngày 25/09/2017. Nó đã kết hợp BSD-3 license với một điều khoản bổ sung về việc sử dụng bằng sáng chế. Tóm lại, nếu chúng ta kiện Facebook hoặc bất kỳ công ty con nào của nó trong khoảng thời gian này thì chúng ta sẽ mất quyển sử dụng React (hoặc bất kỳ phần mềm nào khác trong cùng một license). Tuy nhiên, hiện tại React đã được MIT cấp phép, nên chúng ta có thể kiện Facebook mà vẫn được sử dụng React!
## 3. Cách sử dụng license trong dự án mã nguồn mở.
* Chúng ta sẽ thêm file LICENSE, LICENSE.txt hoặc LICENSE.md trong thư mục gốc của repository. Với Github thì mọi chuyện càng dễ dàng hơn:
1. Mở Github repository cần tạo license.
2. Trong thư mục gốc, chọn Create new file
3. Đặt tên cho file LICENSE
4. Chọn Choose a license template
5. Chọn license phù hợp
6. Sau đó chọn Review and submit
7. Commit file!
# 4. Kết
1. Một trong những license hạn chế nhất là GPL.
2. Một trong những license dễ dãi nhất là MIT.
3. Các license phổ biến khác là Apache License 2.0 và BSD.
4. Để sử dụng license cho dự án GitHub của chũng ta, chỉ cần tạo file LICENSE bằng các mẫu của Github.