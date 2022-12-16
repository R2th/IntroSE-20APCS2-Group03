Trong quá trình làm việc chắc chắn sẽ có lúc bạn phải đưa ra những lựa chọn khó khăn, những quyết định mang tính then chốt có khả năng ảnh hưởng lớn tới tương lai. Bài viết của mình ngày hôm nay rất tiếc không thể giúp ích các bạn trong những lựa chọn như thế, thay vào đó, bằng một số nhận định mang tính cá nhân về Npm và Yarn mình hi vọng sẽ phần nào giúp các bạn tiết kiệm được thời gian trong việc lựa chọn cho mình một Package Manager phù hợp, từ đó dành nhiều công sức hơn để giải quyết những vấn đề to tát =))

Npm và Yarn được coi như là 2 công cụ tạo và quản lý các thư viện lập trình Javascript cho Node.js phổ biến nhất. Nhìn sơ qua thì chúng ta có thể nhận thấy nhiều điểm chung giữa 2 công cụ này vì 2 em này thường xuyên lấy cảm hứng phát triển từ nhau (mặc dù Npm ra đời trước nhưng cũng không thể nói là Npm ko học tập gì từ Yarn). Tuy nhiên nếu giống nhau thì người ta đã chả tách riêng ra làm gì. Và chính những khác biệt nho nhỏ giữa chúng sẽ là thứ quyết định xem bạn thích em nào nhiều hơn.

Trong bài viết này mình sẽ đưa ra và so sánh từng yếu tố của 2 công cụ này. Tuy nhiên trước khi so đo xem em nào ngon hơn, chúng ta hãy cùng tìm hiểu một số thông tin cơ bản như gia cảnh, thành tích học tập của từng em nhé. 

### Npm là gì?

[Npm](https://www.npmjs.com/) (tên đầy đủ là Node Package Manager) sinh ra vào năm 2010, là một công cụ quản lý cực kỳ phổ biến đối với các lập trình viên JavaScrip. Em này được cài đặt tự động luôn ngay khi bạn cài đặt Node.js lên hệ thống của bạn. 

Npm cung cấp cho ta 2 chức năng chính:
* Là kho lưu trữ trực tuyến cho các package/module. Chúng ta có thể tìm kiếm các package [tại đây](https://nodejs.org/en/).
* Quản lý các module javascript và phiên bản của chúng trong các dự án của chúng ta một cách đơn giản, dễ dàng, giúp tiết kiệm thời gian.

### Thế còn Yarn?

[Yarn](https://classic.yarnpkg.com/en/) được ông bố đại gia Facebook cho ra đời vào năm 2016. Mục đích của Facebook khi tạo ra Yarn đó là giải quyết một số thiếu sót về hiệu suất và bảo mật của Npm (tại thời điểm đó)

Kể từ đó, Npm đã tiến hành một số cải tiến để khắc phục những điểm yếu kém về hiệu quả của nó. Kết quả là, Yarn và Npm đã đặt chân vào một cuộc đua cạnh tanh khốc liệt xem ai đựoc các anh em lập trình Javácript yêu mến hơn.

Trong những nỗ lực để nâng Yarn lên tầm cao mới, đội ngũ phát triển đã phát hành Yarn 2 vào tháng 1/2020. Sau khi ra mắt, Yarn 2 đã phải nhận sự chi trích mạnh mẽ từ các lập trình viên bấy giờ, thậm chí cả những kỹ sư Facebook cũng đã công khai không còn liên quan gì tới nó nữa. Do đó phần sau của bài viết chúng ta sẽ chỉ thảo luận về Yarn 1 và gọi ngắn gọn là Yarn.

### 1. Độ phổ biến

Một công nghệ đựợc phổ biến rộng rãi đồng nghĩa với việc nó có một cộng đồng lớn và những khúc mắc của bạn trong quá trình sử dụng sẽ được giải quyết một cách nhanh chóng hơn. Tuy răng sinh sau đẻ muộn nhưng Yarn đã dần đuổi kịp Npm trong cuộc đua về độ nổi tiếng này. 

Dưới đây là thống kê về số lượt download trong 5 năm có thể thấy Npm đang dẫn đầu nhưng khoảng cách ko còn quá xa

![](https://images.viblo.asia/edcfcede-70f4-4b58-8d85-7d6f0a2cc931.png)

Mặt khác nếu chúng ta so sánh thông quá các chỉ số trên github của cả 2 thì lại có một sự khác biệt giật mình, Yarn hoàn toàn lấn lướt với số stars gần gấp 8 lần và số forks gấp hơn 2 lần Npm (số liệu đưa ra vào thời điểm viết bài )

[Npm](https://github.com/npm/cli)

![](https://images.viblo.asia/df9cf235-6da6-42dd-9592-0ee607dcb32f.png)

[Yarn](https://github.com/yarnpkg/yarn)

![](https://images.viblo.asia/d997b2f1-c36a-42c6-86e0-0bb885094d21.png)



### 2. Cài đặt

Việc cài đặt Npm chắc chắn là dễ dàng hơn so với Yarn vì nó đã đựoc cài sẵn kèm theo với Node.js rồi. Tuy nhiên nói vậy cũng không phải ám chỉ việc cài Yarn là khó khăn, rắc rối hay gì hết, vì chỉ với cú pháp sau thì Yarn đã sẵn sàng phục vụ các bạn:

```
npm install yarn
```

### 3. Quản lý dependencies

Tuy nhiên, team phát triển Yarn lại không khuyến khích các bạn cài đạt thông qua Npm (cũng đúng, ai lại khuyến khích người dùng cài đặt con cưng của mình thông qua chính công cụ đối thủ), thay vào đó, với mỗi cấu hình hệ thống khác nhau, bạn sẽ tìm được cho mình những tùy chọn cài đặt khác nhau [tại đây](https://classic.yarnpkg.com/en/docs/install#windows-stable).

Yarn và Npm có cách quản lý dependencies tuơng đối giống nhau. Cả hai đều cung cấ pcho người dùng file **package.json** nằm ngay trong thư mục gốc của dự án. File này lưu trữ tất cả các metadata có liên quan đến dự án. Nó hỗ trợ quản lý phiên bản của các dependencies trong dự án, các script và nhiều thứ nữa. Cả 2 cũng đều lưu trữ folder file của các dependencies trong thư mục **node_modules**. 

Hơn nữa cả Yarn và Npm đều cung cấp một file lock được sinh ra tự động ghi lại chính xác phiên bản của các dependencies đang đựoc sử dụng trong dự án. Trong Yarn nó có tên là **yarn.lock** còn với Npm thì file đó sẽ là **package-lock.json**. Đúng như tên gọi, file này sẽ khóa phiên bản của các dependencies trong quá trình cài đặt sau khi phiên bản được thiết lập trong file **package.json**. Khi cài đặt dependencies, file lock giúp đảm bảo cấp trúc file trong **node_modules** được duy trì trên tất cả các môi trường. 

Trong khi Yarn đưa tính năng file lock này vào ngay phiên bản đầu tiên của mình thì mãi tới tận tháng 5/2015 tại phiên bản 5 tính năng này mới được Npm giới thiệu.

Tuy cả 2 có cùng một cách quản lý nhưng bạn cũng chớ vìu thế mà sử dụng cả 2 cùng lúc nhé. Vì rất có thể nó sẽ tạo ra xung đột giữa các file lock. Tốt nhất là nên chung thủy với một em thôi.

Tuy vậy, gần đây, Yarn đã công bố một [tính năng mới](https://classic.yarnpkg.com/blog/2018/06/04/yarn-import-package-lock/) giúp các lập trình viên dễ dàng chuyển đổi từ Npm qua Yarn một cách thuận lời mà không lo xung đột. Tính năng này cho phép ta nhập và cài đặt dependencies từ chính tệp **package-lock.json** của Npm. Đây thực sự là một cải tiến hữu ích đặc biệt với những ai đang dùng chung Npm/Yarn hoặc là có ý định chuyển hẳn từ Npm qua Yarn.

Để sử dụng tính năng này, chỉ cần chạy lệnh sau trong thư mục chứa file **package-lock.json**

``` yarn import```  

Để đáp trả, Npm cũng nghiên cứu và cho ra mắt tính năng tương tự trong phiên bản 7 (https://blog.npmjs.org/post/186983646370/npm-cli-roadmap-summer-2019) giúp người dùng có thể xử lý file **yarn.lock**. 

### 4. Hiệu suất

Đây ắt hản là phần mà các bạn mong đợi, hiệu suất có thể nói là thước đo quan trọng nhất cho các công cụ quản lý package. Việc code đã đau đầu lắm rồi, ắt hản các bạn sẽ chẳng bao giờ muốn sử dụng một công cụ mất cả chục phút hay thậm chí nửa tiếng chỉ để cài đặt các thư viện cần dùng.

Như đã đề cập ở trên, Yarn ra đời để giải quyết các vấn đề về hiệu suất mà Npm gặp phải. Do đó có thể coi bước đầu Yarn đã dành được một lợi thế nhỏ về mặt hiệu suất. Tuy nhiên trong thời gian gần đây nhất là ở phiên bản v5 và v6 trở đi, Npm đã thu hẹp khoảng cách đáng kể so với Yarn.

Một số bài test đã được thực hiện để so sánh tốc độ của cả 2. Ví dụ sau tổng kết lại kết quả của [một thử nghiệm](https://shift.infinite.red/yarn-1-vs-yarn-2-vs-npm-a69ccf0229cd?gi=6b2013a87e39) só sánh tốc độ cài đặt một số dependencies  đơn giản dưới các điều kiện khác nhau:

![](https://images.viblo.asia/1900b24f-6592-4d9b-911b-4d87c02905f4.png)

Như bạn thấy, Yarn rõ ràng vượt trội hơn hẳn Npm về tốc độ. Trong quá trình cài đặt, Yarn sẽ cài đặt nhiều gói cùng lúc chứ không cài đặt lần lựot như Npm.

Việc cài lại cũng rất nhanh khi sử dụng Yarn, đó là vì tính năng offline mode của Yarn sử dụng cơ chế lưu vào các bộ nhớ đệm để cho phép tải nhanh xuống các packages đã tải trước đó. Mặc dù Npm cũng được hỗ trợ tính năng cache nhưng có vẻ như tính năng này của Yarn vẫn tốt hơn nhiều.

### 5. Bảo mật

Bảo mật cũng là một khía cạnh quan trọng khác mà các bạn nên quan tâm và đồng thời cũng gây tranh cái rất nhiều trong các lần Ỷn và Npm được so sánh với nhau. Trong khi Yarn ban đầu được coi là an toàn hơn thì Npm đã giới thiệu những cải tiến đáng kể về bảo mật trong các phiên bản sau.

Với Npm v6, tính năng bảo mật được tính hợp sẵn. Nếu bạn thử cài một đoạn code có thể gây hại cho bảo mật thì Npm sẽ ngay lập tức warning cho bạn. Ngoài ra một command mới là [**npm audit**](https://www.whitesourcesoftware.com/free-developer-tools/blog/npm-audit/) đã được giới thiêụ để hỗ trợ bạn đánh giá các điểm bất thường trong cấu trúc của các dependency.

Mặt khác Yarn cũng có một số tính năng bảo mật thú vị như sử dụng checksum để xác minh tính toàn vẹn của mọi package và kiểm tra licenses của những package mà bạn đã cài đặt.

### 6. Cập nhật

Việc thực hiện cập nhật phiên bản mới nhất của package của cả 2 là tuơng tự nhau dù có đôi chút khác biệt về CLI

Đối với Yarn thì là:

```
yarn upgrade

yarn upgrade [package-name]
```

Còn với Npm thì là:

```
npm update

npm update [package-name]
```

Ở cả 2 công cụ, nếu bạn không đề cập đến package-name thì tất cả các dependencies sẽ được update lên phiên bản mới nhất với phạm vi phiên bản được xác định trong file **package.json**. Mặt khác nếu bạn chỉ ra tên một package xác định thì tất nhiên, sẽ chỉ mình package này được cập nhật mà thôi.

### 7. CLI commands

Các lập trình viên chúng ta sẽ dành rất nhiều thời gian để thao tác trên terminal. Do đó một điểm quan trọng khác để so sanh là CLI. Sau đây là 1 số lệnh CLI chung cho cả 2:

![](https://images.viblo.asia/f9e71f3b-151f-46b2-8211-fd0f2f36011c.png)

Bây giờ hãy xem xét một số commands khác nhau nào:

![](https://images.viblo.asia/6bf1226e-c99d-48bc-9fea-71311863d192.png)

Cuối cùng hãy xem xét đến những command có ở công cụ này nhưng lại không có ở bên đối diện:

![](https://images.viblo.asia/29770776-5531-42e5-9a36-61f907ec2995.png)

Về output của các lệnh CLI, Yarn cung cấp cho chung ta output rõ ràng hơn (kèm theo đó là cả emojis trừ khi bạn đang xài window - quả là một sự phân biệt đối xử nặng nề). Ví dụ sau là ảnh chụp màn hình lệnh install đơn giản của cả 2.

Yarn: 

![](https://images.viblo.asia/ea854e2c-2750-4687-ba54-57b9b9a6f034.png)

Npm:

![](https://images.viblo.asia/7bdb1f53-d20a-4f1f-bd9c-d167b0f248ce.png)


Như bạn có thể thấy, Npm tạo ra rất nhiều warning theo mặc định. Trong khi đó output của Yarn lại rất sạch sẽ và ít dòng hơn.

### 8. Tổng kết

Cả Yarn và Npm đều là những trợ thủ đắc lực cho chúng ta trong việc đmar bảo các dependencies luôn trong tầm kiểm soát. Trong khi Npm ra đời trước, thì Yarn tuy sinh sau đẻ muộn nhưng vẫn chiếm được cảm tình rất lớn trong thế giới JavaScript.

Yarn đã lấy nhiều cảm hứng phát triển từ Npm, đặc biệt là cách sử dụng những thiếu sót của nó để tạo ra một công cụ đựoc các lập trình viên yêu mến. Tương tự như vậy, Npm đã liên tục khắc phục với mỗi phiên bản mới, cập nhật các tính năng để đáp ứng nhu cầu của chúng ta. Vì vậy hiện tại ta có thể thấy cả 2 công cụ này gần như ngang bằng nhau về mọi mặt. Tuy vây jddaau đó sẽ vẫn có những điểm nho nhỏ khiến bạn thích cái này hơn cái kia. Cuối cùng thì sự lựa chọn của bạn chắc hẳn sẽ phụ thuộc phần lớn vào yêu cầu, sở thích và thi hiếu cá nhân của bạn. Hi vọng bài viết của mình sẽ giúp được các bạn phần nào.

Xin chào và hẹn gặp lại!

[Source](https://www.whitesourcesoftware.com/free-developer-tools/blog/npm-vs-yarn-which-should-you-choose/)