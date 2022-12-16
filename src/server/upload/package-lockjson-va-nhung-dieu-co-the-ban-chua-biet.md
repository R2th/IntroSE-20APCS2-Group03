# Giới thiệu
Với những lập trình viên nodejs nói riêng cũng như các lập trình viên web nói chung hẳn không còn lạ gì khi thấy trong một project tồn tại một file tên là **package.json**. Okay, có thể nói đơn giản thì **package.json** là một file chứa thông tin giúp bạn biết được để vận hành được project cần đến những modules nào. Có thể coi những modules chính là sức mạnh của nodejs với một bộ mã nguồn mở khổng  lồ cũng như cộng đồng lớn mạnh đến nỗi cứ vài phút lại có một module mới. Wait, thế còn package-lock.json thì sao ? Bài viết này mình sẽ chia sẻ những kiến thức nhỏ bé của mình về cái file mà mình tưởng chừng như vô dụng này =)) . Bài viết mình tham khảo chính được viết trên medium với 9.4k claps, các bạn có thể tham khảo tại đây: [Everything You Wanted To Know About package-lock.json But Were Too Afraid To Ask](https://medium.com/coinmonks/everything-you-wanted-to-know-about-package-lock-json-b81911aa8ab8)

![](https://images.viblo.asia/14377424-d94d-479b-b744-b6d3e852abe4.png)

# Tóm lược
Những phần chính để mọi người có thể overview qua về package-lock.json :

* **package-lock.json** sẽ tự động được tạo khi bạn sử dụng npm từ bản ^5.x.x
* Nên giữ lại file package-lock.json để đảm bảo tính tương thích giữa các dependencies
*  Nên **COMMIT** package-lock.json vào hệ thống quản lý code mà bạn sử dụng (Git, SVN,...)
*  Không được xóa package-lock.json chỉ để chạy **npm install** và generate lại nó 
*  Từ phiên bản ^5.1.x, package.json có quyền hạn cao hơn package-lock.json (source of truth)

# Kiến thức nên tảng
## Semantic Versioning (semver)

Các bạn có thể tạm hiểu đây chính là tập hợp các luật để quy định về cách đánh version cho một modules. Các bạn vẫn khai báo những dependencies  theo cách này :
![](https://images.viblo.asia/7a314ee0-20c0-41f8-84f8-f94113af8f0f.png)

Các bạn có thể thấy rõ rằng mỗi module đều được mô tả  phiên bản dưới dạng **X.Y.Z**, hay chính xác  hơn là **MAJOR.MINOR.PATCH** .Các bạn có thể đọc thêm chi tiết về phần này tại đây : https://semver.org/. Trong khuôn khổ bài viết mình chỉ giải thích cơ  bản để các bạn có thể hiểu về 3 chỉ số này có ý nghĩa gì với các module:

* MAJOR : Thay đổi (hay còn gọi là breaking changes) khi những API cũ không còn tương thích nữa . **VD** : gọi là 2.0.0 khi các api từ bản 1.0.0 không còn  dùng được nữa.
* MINOR: Thay đổi khi thêm những tính năng mới tuy nhiên những API từ phiên phản trước đó vẫn có thể dùng trong phiên bản này. **VD**:   Phiên bản 1.1.0 thêm một số tính năng tuy nhiên những API từ phiên bản 1.0.0 vẫn được giữ nguyên
* PATCH: Phiên bản thay đổi khi có những fix bug cho những phiên bản trước đó và API hoàn toàn vẫn tương thích với các phiên bản cũ.

## Quản lý các package

Các dev hẳn sẽ không lạ lẫm gì với trình quản lý các modules **npm** . Nhờ có npm việc quản lý các dependencies cho project dễ dàng hơn rất nhiều. Thử tưởng tượng một dự án của bạn có thể chứa đến hàng trăm các dependencies, trong những dependencies đó lại chứa tiếp các dependencies khác => dependencies hell => khá đau đầu. Nhưng nhờ có  các trình quản lý các gói module như **npm** thì chúng ta sẽ chỉ phải quẳng gánh lo đi mà sống: khai báo các dependencies vào **package.json** và **npm install**

Có một điều cần note lại khi **install** các package  có kí hiệu **^** thì trình quản lý dependencies sẽ tự động install phiên bản mới nhất cùng **MAJOR version**. VD với 
```json
"redux-thunk": "^2.3.0"
```
npm sẽ tự động tải xuống phiên bản **2.3.0** hoặc những phiên bản nâng cấp thay đổi **MINOR** hoặc **PATCH**

## Chia sẻ mã nguồn
Các mã nguồn chia sẻ trên nền tảng github (đặc biệt là các javascript project) các bạn có thể thấy thường có 1 file package.json để định nghĩa những dependencies cần thiết để có thể run được thành công project. Lý thuyết là vậy nhưng vẫn có những trường hợp ngoại lệ, dưới đây chính là một trong những trường hợp có thể xảy ra:

Trong project có định nghĩa một dependencies trong file package.json như sau :
```json
"redux-thunk": "^2.3.0"
```

Như giải thích ở trên, với tiền tố **^** , npm sẽ tự động install phiên bản mới nhất miễn là nó cùng **MAJOR version**. Một kịch bản có thể xảy ra ở đây là  : 
Owner của dự án đặt version của gói redux-thunk như trên, tuy nhiên khi bạn clone về và chạy **npm install** thì gói **redux-thunk** mới được cập nhật một bản vá và hiện tại đang ở **2.3.1** . Tất nhiên là ở phiên bản clone của bạn npm sẽ tự động tải xuống phiên bản mới nhất. Và biết sao được, chẳng may với bản và này lại gây xung đột với những chức năng đang sử dụng, và khi đó kết quả chạy của 2 phiên bản **2.3.1** và **2.3.0** sẽ khác nhau
# package-lock
## Mục đích
Mục đích của package-lock.json chính là việc ngăn chặn những tính huống được mô tả phía trên : Cài đặt các  dependencies từ cùng một file package.json nhưng lại dẫn đến 2 phiên bản cài đặt khác nhau
![](https://images.viblo.asia/a1b228c7-f7b5-4fa1-9ec9-8a84b167a78c.png)

## Định dạng

Mở package-lock.json lên các bạn có thể thấy nó có vẻ gì đó rất giống package.json nhưng dài dòng hơn nhiều. Dưới đây là một list các dependencies của express:
```json
"express": {
      "version": "4.15.4",
      "resolved": "https://registry.npmjs.org/express/-/express-4.15.4.tgz",
      "integrity": "sha1-Ay4iU0ic+PzgJma+yj0R7XotrtE=",
      "requires": {
        "accepts": "1.3.3",
        "array-flatten": "1.1.1",
        "content-disposition": "0.5.2",
        "content-type": "1.0.2",
        "cookie": "0.3.1",
        "cookie-signature": "1.0.6",
        "debug": "2.6.8",
        "depd": "1.1.1",
        "encodeurl": "1.0.1",
        "escape-html": "1.0.3",
        "etag": "1.8.0",
        "finalhandler": "1.0.4",
        "fresh": "0.5.0",
        "merge-descriptors": "1.0.1",
        "methods": "1.1.2",
        "on-finished": "2.3.0",
        "parseurl": "1.3.1",
        "path-to-regexp": "0.1.7",
        "proxy-addr": "1.1.5",
        "qs": "6.5.0",
        "range-parser": "1.2.0",
        "send": "0.15.4",
        "serve-static": "1.12.4",
        "setprototypeof": "1.0.3",
        "statuses": "1.3.1",
        "type-is": "1.6.15",
        "utils-merge": "1.0.0",
        "vary": "1.1.1"
      }
    },
```

Ý tưởng ở đây là sẽ sử dụng package-lock.json thay vì package.json để cài đặt các modules do package-lock.json đã chỉ định rõ phiên bản, location, mã băm toàn vẹn integrity cho mỗi module và từng dependencies của nó => Cài đặt của nó tạo ra sẽ luôn giống nhau cho dù bạn cài đặt vào lúc nào.

# Bàn luận

Từ những ý trên có thể thấy package-lock.json được cho là có thể giải quyết các vấn đề phổ biến tuy nhiên những tìm kiếm hàng đầu trên **Google** lại thường hỏi cách disabled nó cũng như hỏi về tác dụng của nó.

Trước phiên bản **npm 5.x.x**, package.json được coi là một "source of truth" cho dự án. Tất cả những gì được định nghĩa trong package.json sẽ được tự động install. Các dev tỏ ra khá hưởng ứng với mô hình này . Tuy nhiên khi package-lock.json được giới thiệu thì nó lại không hoạt động như sự kì vọng của nhiều người. Sự thay đổi trong **package.json** không được phản ánh trong **package-lock.json**. Trong 2 trường hợp dưới đây sẽ thể hiện rõ lí do khiến package-lock.json đã làm cho người dùng có chút thất vọng:

**Trường hợp 1:** Gói A có phiên bản 1.0.0 trong package.json và package-lock.json,  tuy nhiên trong package.json được chỉnh sửa thủ công lại thành phiên bản 1.1.0, khi đó nếu người dùng vẫn tin tưởng package.json là "source of truth" thì họ sẽ hi vọng phiên bản 1.1.0 được install tuy nhiên sự thật thì phiên bản 1.0.0 mới là thứ được instaall

**Trường hợp 2 :**   Một module không tồn tại trong package-lock.json, nhưng nó tồn tại trong package.json. Là một người dùng xem package.json là "source of truth", mong muốn module sẽ được cài đặt. Tuy nhiên, do module không có trong package-lock.json, nó không được cài đặt và code bị lỗi vì không thể tìm thấy module.

Do đó, những người sử dụng không hiểu tại sao những dependencies của mình không được cài đặt chính xác và do đó họ tìm cách xóa package-lock.json rồi cài đặt lại hoặc tìm cách disabled nó.

Tuy nhiên trong  [PR #17508](https://github.com/npm/npm/pull/17508), các maintainers  của Npm đã thêm một thay đổi khiến cho package.json ghi đè package-lock.json nếu package.json đã được cập nhật. Bây giờ trong cả hai trường hợp trên, các gói mà người dùng mong đợi được cài đặt sẽ được cài đặt chính xác. 


# Kết luận
Trên đây là những kiến thức mình đã tham khảo cũng như tìm hiểu về những thứ vẫn thường được dùng nhưng lại khá ít người biết tại sao lại dùng chúng. Trong bài này mình chủ yếu nói về trình quản lý gói **npm**, tuy nhiên về các ý tưởng hay concepts nó cũng khá tương đồng với các trình quản lý gói khác như **yarn**, **gem**, ... Hi vọng bài viết có thể giúp ích cho các bạn.