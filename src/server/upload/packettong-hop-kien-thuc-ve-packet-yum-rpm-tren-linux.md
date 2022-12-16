Bài gốc: https://qiita.com/sksmnagisa/items/05a6f8a707010b8bea56

Bối cảnh
Dự định up svn 1.6 lên 1.8 trong môi trường CentOS6.5
Trong hoàn cảnh đó, tôi đã từng thêm repository của rpmforge bằng command rpm, cho nên cũng lấy rpm dùng cho svn từ WANdisco như thế rồi thêm vào bằng rpm- Uvh.

Tôi đã thử lệnh yum update subversion nhưng vẫn ở 1.6 .

Khi đó tôi xem thử /etc/yum.repos.d/ rồi, nhưng vẫn khác với khi rpmfroge và chưa có tăng thêm file repo 

Tuy nhiên, tôi hoàn toàn không hiểu tại sao với rpm -qa | grep subversion,
thì hiển thị là subversion-1.8.9 và không ổn ở chỗ nào.

Tuy biết là rpm là thứ dùng để thêm repository, nhưng mà khi thử qua rồi thì tôi vẫn chưa giải thích rõ được mục đích của nó.

Tôi muốn hiểu rõ tất cả nên đã học lại từ đầu.
Và bài viết này sẽ nêu ra các khái niệm mà tôi đã học đuọc

Package
Khái quát

Có vẻ như rpm command sẽ install/ uninstall package của RPM
Vậy Package là gì?

Chẳng hạn như bạn muốn dùng application nào đó.
Vì ngày xưa chỉ được cung cấp source code thôi, cho nên cần compile.
Tuy nhiên, chỉ như thế thì không đủ, nên cần phải cung cấp cả code binary đã compile lại và nhóm những file liên quan.


Chúng ta gọi nhóm file đã tập hợp lại là Package.

Sẽ thật không tốt nếu chúng ta nghĩ package là thứ gì đó giống như zip.
Chúng taa không giải nén package rồi tự mình bố trí nó. Chúng ta có thể tiến hành install/ uninstall package bằng application có thể xử lý nó

Trong CentOS thì chúng ta xử lý package bằng command là rpm.


RPM Package 
Hình thức của package sẽ khác nhau dựa trên distribution của Linux

Dựa theo Wikipedia:

RPM : Nhóm Red Hat (CentOS chẳng hạn)
deb : Dùng cho Debian (Có cả Ubuntu )
ports : FreeDSB
pkg : Solaris

Như pkg thì installer của Mac sẽ nhận thấy đây là pkg nhưng có phải là cùng 1 thứ không thì không phán đoán rõ ràng được.

Cho nên nói về RMP package thì tạm thời chỉ nói về cái mà tôi đang dùng là CentOS nên sẽ là Package dành cho CentOS
Đuôi là [*.rpm] (* là chuỗi kí tự tùy ý)

Ngoài ra, package có quy tắc đặt tên. Có vẻ là [ Tên OS - CPU - số bit ]

Package của format source code ？

Như đã nói ở trên, rpm là file binary của applicaation và các loại file cần cho việc chạy file binary đó.

Cho nên tôi cũng không hiểu rõ ý nghĩa của cụm từ [ package của hình thức source code]
nhưng khi đọc giải thích về nó thì tôi thấy khái niệm  [SPRM(Source package)] trong phần giải thích đó.

Extension là 「*.src.rpm」

Chúng ta có thể hiểu cái này là 1 khái niệm khác so với RPM package.
SPRM tức là source dùng cho việc tạo RPM package, thông qua việc build SPRM mà có thể tạo RPM package.

Tóm lại

・Package là file gồm binary của application và những thứ cần để chạy nó
・Package của Linux thuộc nhóm Red Hat thì chủ yếu là được bố trí như là [RPM Package] 
・RPM Package thì có thể install/ uninstall bằng rpm command 
・SRPM là source code để chế tạo RPM package 


Về quản lý package
Khái quát
Tiếp theo tôi sẽ giải thích về package mà Linux Distribution thuộc nhóm Red Hat.
Tôi cũng sẽ tổng hợp về command rpm dùng để xử lý RPM package 

rpm là viết tắt của RedHat Package Manager。

「Quản lý package」tức là sao?

command rpm sẽ quản lý cái package đã install

Và quản lý như thế nào?

Giữa các package có mối quan hệ phụ thuộc vào nhau.
Ví nhữ như có 2 package là Package A và Package B

Để dùng Package A thì cần Package B

Khi dùng Command rpm để install [Package A]
mà package B ko tồn tại thì sẽ ko install đc.

Ngược lại, khi cả A và B đã được install đã được install, nếu dùng command rpm để uninstall B,
thì theo quan hệ phụ thuộc package A cũng sẽ ko chạy được. Khi uninstall sẽ có error [Package A đang sử dụng  nên ko uninstall được]

Việc quản lý mối quan hệ phụ thuộc tức là quản lý những thông tin nhằm tiến hành những thao tác như trên.
Thông tin về quan hệ phụ thuộc của những package mà rpm đã install thì có lưu trong database của RPM nên khi uninstall sẽ xác nhận.

yum
Khái quát

Tôi có cảm giác là khi nói về install hay uninstall thì yum là phổ biến nhất.
yum cũng là 1 command quản lý package, có chung mục đích với rpm.

Vấn đề của rpm

Ví dụ như install 1 package nào đó cần đến 10 package khác.
Rồi thì mỗi package lại cần 10 package khác nữa (tóm lại là có khoản 100 cái package cần install)

Rồi 100 cái package đó lại cần thêm một số lượng package khác.

Khi đó thì rpm không thể  giải quyết được 

yum có thể giải quyết vấn đề của rpm

Điểm tuyệt vời của yum là nó sẽ tự động giải quyết vấn đề của rpm đã ghi ở trên.
Với yum thì khi bạn install 1 package nào đó, nó sẽ tự động download package liên quan, và tra cứu quan hệ phụ thuộc để install cho chính xác.

yum có xung đột với rpm không?
Tôi lo lắng về việc yum và rpm xung đột với nhau, 
tuy nhiên yum sử dụng rpm nên là ko vấn đề gì cả.

Cho nên dùng cả 2 lệnh này để install thì cũng không gây hỏng database quan hệ phụ thuộc.

Repository

Khi install application mà yum đã chỉ định, sẽ tự động download những package cần thiết.
Tóm lại là có 1 địa chỉ để download. Và địa chỉ này chính là repository.

Repository mà yum tham chiếu  là :
/etc/yum.repos.d/

Khi install thì thường là sẽ nhìn vào CentOS-Base.repo, thứ mà đã tồn tại sẵn rồi 

Dựa trên đặc tả này, yum sẽ [không lấy xuống những pacakage không phụ thuộc có trong repository]

Tưc là [Nếu trong repository ko có package bản mới nhất thì sẽ không thể install được]

Khi tham chiếu repository khác.

Ví dụ như trong ngày mà tôi viết bài, khi tôi nhìn vào repository default và install subversion thì có 1.6.
Tuy nhiên, bản mới nhất của subversion là 1.8.9. Thực ra tôi muốn dùng cái này. Nhưng trong repository lại ko có nên ko install đc.

Khi đó có 2 cách 
1 cách là lấy package RPM bản mới nhất ở site chính thức, rồi trực tiếp install bằng rpm command. 
Còn 1 cách là thêm repository có package của svn bản mới nhất (1.8.9)

Thực tế thì ở repository dùng cho yum thì có nhiều thứ khác nhau.

Cho đến nay tôi chỉ mới dùng epel, remi, rpmforge.

Cái nào tốt thì phải phân tích từng case một, nhưng tôi muốn nói ở đây là việc có thể ADD thêm repository để yum tham chiếu.
Sau đó mới đến việc repository có nhiều thứ hay ho trong đó.

Ngoài ra, khi tham chiếu nhiều repository thì có vẻ như sẽ xảy ra nhiều vấn đề.
Tuy nhiên về việc này thì xin trình bày trong bài khác.


Đối ứng với vấn đề đã nêu ra trong phần[Bối cảnh]

Khi tôi thu thập các thông tin để viết bài này tôi đã tìm ra cách giải quyết vấn đề

Khi muốn update từ svn1.6 -> 1.8 thì không tồn tại ở yum.
Tôi cảm thấy rằng việc thêm một repository có chứa package  svn1.8 là hơi quá mức.

Cho nên tôi download RPM package từ official site của subversion

$ rpm -i subversion-1.8

Khi làm thử thì đã thành công.