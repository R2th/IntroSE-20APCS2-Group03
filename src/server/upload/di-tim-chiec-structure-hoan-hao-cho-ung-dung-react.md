Cho đến thời điểm bây giờ, hầu hết những thứ mình cần đều đã được giải quyết, chỉ cần kế thừa lại là cũng đủ để xài rồi nên mình sẽ lười suy nghĩ để tìm hiểu một cái gì đó mới.

Khi bắt đầu tìm hiểu một công nghệ nào đó hay ho, việc tự tạo ra cho mình một kiến trúc ứng dụng tốt cho mình thật sự không dễ. Chỉ khi chúng ta bắt đầu chơi và hiểu công nghệ đó đủ lâu mới có khả năng sản xuất cho mình một chiếc structure ngon lành.

Hoàn hảo ở đây không có nghĩa là khi tìm ra một structure xịn xò, bạn có thể dùng nó để apply cho tất cả các project. Kiểu gì thì dự án của bạn cũng tèo..... vì bạn không hiểu mình sẽ đang làm và cần gì. Kiểu như xây nhà ở sài gòn mà có cái lò sưởi á🤪🤪🤪

Việc ra được một structure tốt cho ứng dụng đòi hỏi phải có nhiều yếu tố tác động vào:
*  Yêu cầu, tính chất của ứng dụng 
* Đặc điểm của framework/lib mà bạn lựa chọn ( Trong phạm vi bài viết mình sẽ phân tích ReactJS ) 
* Dựa vào những dự án đã từng làm, kinh nghiệm cá nhân
* Case study là những dự án tương tự
* Boilerplate của một team, anh dev đẹp trai nào đó trên mạng

Việc của bạn là gì, sử dụng nó như là nguyên liệu để  **xào nấu thành một món hợp vị nhất với tất cả mọi người**
* ở đây có nghĩa là setup 1 structure phù hợp nhất với dự án của bạn*

Tại sao mình lại nói là hợp vị nhất với tất cả mọi người? Nếu bạn làm việc một mình, bạn build project structure kiểu gì, bạn code kiểu gì thì cũng chẳng có ai ý kiến gì hết, miễn sao là bạn cảm thấy thoải mái và đi nhanh được.

Nhưng khi làm việc trong một team lớn, mỗi người đều có cá tính, phong cách code riêng, làm sao để giữ được tính quy hoạch của project mà vẫn giữ được phong cách code cá tính, cái hay của mỗi người. Sẽ rất là uổng nếu force mọi người code theo 1 cách chung, lúc này chúng ta sẽ chẳng còn cơ hội được học những cái hay ho của mọi người trong team nữa.
## Tại sao lại là ReactJS ?
Mình sẽ không có quá nhiều đất diễn nếu như sử dụng những framework khác như Vue hay Angular.

Mình không tôn thờ ReactJS, mình chọn React vì ...... không có gì là đúng, là hoàn hảo trong React cả.

Quan điểm này mình đã nói rất nhiều trong những blog trước. React là một javascript library dùng để xây dựng giao diện người dùng. Tường mình hơn nữa thì nó kiểu như compile của html/css/javascript nhưng mà ở dạng syntax khác (jsx) để chúng ta có thể dể đóng gói, tái sử dụng, split ra thành nhiều component và sau đó compile lại.

Để build được một ứng dụng sử dụng riêng ReactJS là không thể, chúng ta cần có sự hiểu biết về hệ sinh thái của ReactJS để có thể build được một ứng dụng web hoàn chỉnh bằng ReactJS.... Và chỉ có ReactJS mới cho bạn động lực để đi tìm kiếm thôi.

Nếu bạn sử dụng VueJS, Angular.... bản thân đây là những framework, khi bắt đầu init project sẽ có đầy đủ đồ chơi và được setup một cách chỉn chu để bạn có thể bắt đầu xây dựng, build, deploy ứng dụng.

Để hiểu được concept của ReactJS mình khuyên các bạn nên đọc qua bài viết [Thinking in React](https://reactjs.org/docs/thinking-in-react.html) và [React File Structure](https://reactjs.org/docs/faq-structure.html) trước khi đọc tiếp blog nha.
## Thử với React Create App
Để giúp cho việc build React app dễ dàng hơn thì React Team đã cung cấp một chiếc package CRA để generate ra một app structure đơn giản bao gồm cả phần configs, scripts để có thể start và bundle app.

Init project có tên my-app và start app lên:
```npm
npx create-react-app my-app
```

Structure mà CRA generate ra như sau:
![CRA app structure](https://cdn.nextlint.com/post/59e8095b-0d60-4e2a-bf24-83566d10d5c0/VpIqxf-zPHkG-1pFT5.png)

Một structure khá đơn giản, chỉ có 2 folder 

- **public**:  Chứa các asset.

- **src**: chứa app code. 

Ngoài ra còn một folder chứa các config,script để start,build app được CRA ẩn đi đó là scripts, và CRA cũng cũng cấp 1 lệnh để eject folder này đó là yarn **eject** 
Sau khi eject thì folder structure sẽ có thêm folder:

- **scripts**: chứa các script start, build app

- **config**: chứa config để transpile + bundler React app.

![Eject CRA](https://cdn.nextlint.com/post/59e8095b-0d60-4e2a-bf24-83566d10d5c0/2wAKJC-xqB5V-oE9hm.png)

### Ngoài lề chút xíu về Config để transpile + bundle React app:
Làm sao mà một ứng dụng React viết bằng (js|jsx) syntax có thể chạy được trên browser.

Yah, đây là lúc chúng ta cần một compiler để transpile (js|jsx) syntax thành javascript syntax mà browser có thể đọc được. Babel, Typescript là 2 (js|ts) compiler phổ biến hiện nay. 

Ngoài ra một ứng dụng không chỉ có js code không, mà còn có css,html, font,image.... thì js compile thôi là chưa đủ. Chúng ta cần 1 module bundle, app bundle như Webpack, Parcel. Đó là lý do vì sao config và scripts chắc chắn sẽ là 2 folder cần thiết và nên có trong app.

Trong phạm vi bài viết này mình sẽ không đi chi tiết vào, mình chỉ cho các bạn biết được là lúc này structure app của cũng ta sẽ chắc chắc có 1 folder/files chứa các config này.

-----

Với structure mà CRA generate ra cho bạn kết hợp với một số thư viện trong hệ sinh thái như redux, react-router-dom ... là có thể build một SPA hoàn chỉnh. Việc còn lại là tổ chức logic code của chúng ta sao cho hợp lý.

Mình sẽ lấy một usecase hay sử dụng nhất đó là dùng react-router-dom để quản lý các navigate giữa các trang. Thì mình sẽ gom code logic của features nằm trong folder tương ứng trong structure.

Giả sử trang trang Home của mình sẽ render ra toàn bộ các feed, thì code xử lý việc render feed sẽ nằm đâu đó dưới thư mục
**pages/Home...**
> Kể từ bây giờ mọi code logic của app đều nằm dưới folder src.

Cũng với cấu trúc thư mục của CRA, mình sẽ thêm một folder pages/ để gom phản lý code giữa các trang như sau:
![pages](https://cdn.nextlint.com/post/59e8095b-0d60-4e2a-bf24-83566d10d5c0/7YlW21-JJmkM-DGn7U.png)

File **pages/routes.js** sẽ có nhiệm vụ đi gom code của mỗi page, ở đây là Feed, Home. Tổng hợp lại, có thể validate để cho ra một Array các routes hợp lệ, sau đó export kết quả ra, việc render và config Route sẽ thực hiện ở components **App.js**.

![routes.js](https://cdn.nextlint.com/post/59e8095b-0d60-4e2a-bf24-83566d10d5c0/ls6AlA-50ncG-wgrkJ.png)

File **routes.js** sẽ là file cơ sở để react-router-dom quản lý navigate trên dứng dụng. Mình sẽ implement lại file App.js lại chút xíu:
![](https://cdn.nextlint.com/post/59e8095b-0d60-4e2a-bf24-83566d10d5c0/h2OJvz-tViro-ouDqR.png)

Với cách quản lý trên, mỗi lần thêm một routes mới, chỉ cần tạo một folder tại **src/pages/[NewFolder]** sau đó define trong file **src/pages/routes.js**, việc loop và render sẽ delegate cho hàm **src/App.js**.

Giả sử mình thêm page mới src/pages/Profile thì file routes.js lúc này app structure sẽ như này:
![](https://cdn.nextlint.com/post/59e8095b-0d60-4e2a-bf24-83566d10d5c0/eeaLOd-ouY0U-ihzQ2.png)

Tại vì mình đã có một kiến trúc khá rõ ràng và thống nhất, nên thay vì tạo mới, mình chỉ cần copy lại những cái đã có trước đó và đổi tên file.

Nâng cao hơn nữa thì structure này là cơ sở để mình viết snippet, CLI (command line interface) để generate ra folder có structure tương tự nhau.

Để optimize quá trình làm việc, mình sẽ tổ chức lại structure chút xíu để apply auto load routes.
![](https://cdn.nextlint.com/post/59e8095b-0d60-4e2a-bf24-83566d10d5c0/FJZTOG-G72HF-Mqjg4.png)

**pages/Feed/index.js (1):**

Đây sẽ là entry point của page Feed, tất cả các code sẽ được tổ chức ở đây.

**pages/Feed/route.js (2):**

Là file định nghĩa route của page Feed, import component, thêm một số config của page.

**pages/routes.js (3)**

Mình sẽ loop qua tất cả các folder ở trong **pages/*** và đọc xem có folder nào có file route.js không. Nếu có thì sẽ import object định nghĩa routes trong đó và kết trả quả được export ra cho component **App.js** render ra các pages

**src/App.js (4)**

Sử dụng routes import từ pages/routes và render ra list các routes. Visualize thì nó sẽ như này:
![](https://cdn.nextlint.com/post/59e8095b-0d60-4e2a-bf24-83566d10d5c0/ZBR4MM-X6xlB-SEkcs.png)

Với kiến trúc này khi thêm một routes mới, chỉ cần copy một pages được định nghĩa trước đó, là bắt đầu code feature được, việc này sẽ giúp đẩy nhanh quá trình làm việc và giảm sai sốt trong quá trình thêm mới.
> Với structure này, mình nghĩ có thể lấy nó để làm tiền đề để xây dựng cho mình một con CLI để generate code, đẩy nhanh hơn nữa quá trình làm việc.
> ví dụ: nextlint add --page Profile  Cool phải không nào 😋😋😋

Ngoài ra, có những folder khác cùng cấp với src/pages như:

* src/utils: chứa func *share nhau giữa các pages*
* src/config: chứa các config *share nhau giữa các pages*
* src/components: chứa components *share giữa các pages*

Các bạn để ý **pages sẽ là nơi implement feature của ứng dụng, việc tạo ra các folder trên để ngầm tự define ra một rule cho mình là  tất cả các code,components share nhau giữa các pages sẽ được group thành một folder cùng cấp với nó.**

> Hầu như trước giờ những kiến thức mình có được chỉ là kế thừa, lúc mới bắt đầu làm React mình cũng đọc được một article nói về việc chia theo container, smart, dump component gì tè le. Hồi xưa cũng chưa biết gì nên apply theo thôi, đồng ý là lúc đầu code nhanh thiệt, vì hầu như tất cả các code được group với nhau theo mục đích sử dụng, việc này sẽ làm code của bạn phình theo chiều dọc rất là nhanh. Code một thời gian bạn sẽ quay như chong chóng, đang code tại container này, nhảy lên folder action tìm action tương ứng, rồi lại nhảy vào component để implement..... Trong khi càng ngày cái cây thư mục càng to ra, nhảy một hồi chóng mặt muốn mửa luôn. Rõ ràng là khi bắt đầu, mình chấp nhận việc người ta tiêm vào đầu bạn ý tưởng là container phải như này, smart, dump component phải như này, mà không cho phép mình tìm và đặt cho mình một rule phù hợp với mình để nhớ.

Với idea như vậy khi các component trong pages cũng có thể tự define cho mình các utils, config, components riêng.

Structure của thư mục src:
![](https://cdn.nextlint.com/post/59e8095b-0d60-4e2a-bf24-83566d10d5c0/InUHz1-DHEQr-w7gsP.png)

Structure của một pages:
![](https://cdn.nextlint.com/post/59e8095b-0d60-4e2a-bf24-83566d10d5c0/6yXrXz-8paEA-dBtSn.png)

Các bạn để ý Feed ở đây chỉ là một bản structure con của thư mục src. 

Việc quyết định thiết kế một structure như thế nào tuỳ vào việc các bạn quyết định, đừng suy nghĩ quá về việc struct như thế nào cho hợp lý nếu như bạn chưa có đủ knowleadge về nó.
> Dont overthink it it If you’re just starting a project, don’t spend more than five minutes on choosing a file structure. Pick any of the above approaches (or come up with your own) and start writing code! You’ll likely want to rethink it anyway after you’ve written some real code. Source: https://reactjs.org/docs/faq-structure.html#dont-overthink-it

### Tại sao mình lại chia structure như vậy??
Trong quá trình đắp thêm tính năng vô, nỗi đau lớn nhất không phải vì độ khó của feature, cái khó ở đây là mở đống code lên, mình quải chè mà không phải biết nhét feature vô đâu.

Hoặc có những ngày bugs được ùa về như được mùa, vào nhìn đống code không muốn fix luôn, đỉnh điểm nhất chắc là một ai đó được kế thừa lại đống code đó 🤪

Việc có một structure ngon lành cành đào sẽ giúp team code được nhanh, delivery muợt mà, không bị conflict feature với nhau. Nói thì dễ vậy chứ không phải chỉ dựa vào tính chất của dự án không đâu, còn phải dựa vào tình hình team mình mạnh như thế nào nữa. Nếu mà team toàn senior các thứ không thì tự bàn nhau build ra cái framework làm cho sướng 😂

Không nên kế thừa những boilerplate, structure có sẵn, chỉ nên tham khảo. Mà nếu tham khảo xong thấy hợp thì bê 100% không ai cấm, không thì vặn óc lên suy nghĩ để cho ra một chiếc structure hoàn hảo nha 😋

## Kết bài
Đây chỉ là hành trình mình đi tìm và xây dựng cho mình một structure để phù hợp với dự án của mình đang làm, có thể dự án của bạn khác, nhưng cũng phải trải qua giai đoạn đau thương về việc phải tổ chức structure như thế nào, hay conflict với những người trong team về việc chọn một structure như thế nào cho hợp lý.

Đây là con đường đi tìm chiếc structure của mình, còn bạn thì sao, có gì hay ho thì đừng ngại chia sẻ nha 😊 
## Nguồn:
https://nextlint.com/@lythanhnhan27294/di-tim-chiec-structure-hoan-hao-cho-ung-dung-react-eHHLqvVXxUzFy48phJMspf

Phần 2: https://nextlint.com/@lythanhnhan27294/hanh-trinh-cua-minh-di-tim-chiec-structure-hoan-hao-cho-react-phan-2-C7k235L64BWzKNQ9Rzt2PU