Yarn là một JavaScript package manager xây dựng bởi Facebook, Google, Exponent và Tilde với mục đích nhằm giải quyết những vấn đề mà các team này gặp phải với npm, chẳng hạn như:
* Việc cài đặt các gói không nhanh và đồng bộ.
* Có vấn đề liên quan đến security khi mà npm cho phép các gói chạy code trong quá trình cài đặt.

Nhưng bạn đừng lầm tưởng rằng Yarn hoàn toàn thay thế npm. Yarn chỉ là một CLI client để down về các dependencies từ npm registry. Bản thân npm registry không có sự thay đổi gì.

Trong bài này, chúng ta sẽ so sánh npm và Yarn để xem thứ nào sẽ là tốt nhất cho bạn.

## Sự khác nhau về cách hoạt động
Thoạt đầu ta có cảm giác rằng npm và Yarn khá tương tự nhau. Nhưng tìm hiểu kĩ hơn, bạn sẽ thấy những điều làm nên sự khác biệt cho Yarn.

### File yarn.lock
Trong file package.json, nơi mà cả npm và Yarn lưu trữ thông tin về những dependencies của project, version của chúng không phải lúc nào cũng là duy nhất. Thay vào đó bạn define một range của version để cho phép npm cài đặt lastest version.

Trong trường hợp lý tưởng, sự thay đổi version của những dependencies này không làm cho app của bạn bị break, tuy nhiên điều đó không phải lúc nào cũng đúng. Cách quản lý của npm có thể dẫn đến việc cùng một file package.json, cài đặt module trên hai máy khác nhau lại cho ra hai version khác nhau của cùng một module, và điều này có khả năng dẫn tới bug.

Yarn sẽ giải quyết vấn đề này bằng việc lock chính xác duy nhất một version mà bạn đã cài vào file **yarn.lock**. Các máy khác khi cài đặt dependencies sẽ tự động dựa vào **yarn.lock** để cài lại chính xác version của module mà bạn đã cài trên máy bạn đồng thời vẫn cho phép  cài đặt module với range xác định trong package.json.
 
Thực ra, với npm bạn có thể dùng command **npm shrinkwrap** để tạo lockfile **npm-shrinkwrap.json** giống **yarn.lock** và **npm install** cũng sẽ đọc lock file đó trước khi đọc trong **package.json**. Điều quan trọng là Yarn luôn tạo và **update yarn.lock** trong khi npm mặc định không tạo lockfile và chỉ update lock file khi nó tồn tại.

### Cài đặt song song
Mỗi khi npm hay Yarn cài đặt một gói, các tool này đều thực hiện một chuỗi task. Với npm, những task này được chạy trên mỗi gói và theo thứ tự lần lượt, nghĩa là nó sẽ chờ cho mỗi gói được cài xong mới chuyển sang cài gói tiếp theo. Trong khi đó Yarn chạy các task này đồng thời trên các gói cùng lúc nên tiết kiệm thời gian.

Thử nghiệm cài gói **express** với cả npm và Yarn trong điều kiện không có lockfile và clean cache. Có tổng cộng 42 gói được cài đặt. Với npm ta mất 9 giây trong khi Yarn  chỉ mất 1.37 giây.

Khi cài đặt **gulp**, có 195 gói phụ thuộc thì npm mất 11 giây trong khi Yarn cần 1.81 giây. 
Cả hai thử nghiệm, Yarn đều nhanh hơn.

### Output sạch hơn
Output với npm thường chứa nhiều thông tin không thực sự cần thiết ví dụ npm install <package> sẽ list một cách recursive  tất cả những gói đã được cài đặt. Trong khi output của Yarn trên terminal gọn hơn, và nếu muốn hiển thị output chi tiết hơn, bạn có thể dùng comment khác. 

## Sự khác biệt về CLI
Ngoài khác biệt về cách hoạt động, Yarn cũng có bộ command khác với npm. Một số command cũ của npm được xóa đi, một số được modified, trong khi một số command mới được thêm vào.

**yarn global**

Khác với npm, sử dụng **-g** hoặc **--global** flag để thực hiện những command hướng global, Yarn prefix command với **global**. 

Prefix **global** chỉ hoạt động cùng với **yarn add**, **yarn bin**, **yarn ls** và **yarn remove**. Ngoại trừ **yarn add**, những command còn lại hoạt động tương tự command của npm.

**yarn install**

Command **npm install** sẽ cài đặt dependencies từ **package.json**  và cho phép bạn cài đặt thêm các gói mới với **npm install <package>**. Command **yarn install** chỉ cài đặt dependencies theo thứ tự trong **yarn.lock** hoặc** package.json**.

**yarn add [-dev]**

Command **yarn add <package>** cài đặt thêm dependency và tự động thêm version tham chiếu vào file **package.json** tương tự **npm install <package>** với flag **--save**. Khi Yarn add thêm flag **--dev** thì kết quả cũng tương tự khi npm install thêm flag **--save-dev**. 

**yarn upgrade [package]**

Command này sẽ upgrade các gói lên lastest version của chúng theo rule trong **package.json** tương tự **npm update** và tạo lại file **yarn.lock**.

### Độ ổn định và tin cậy
Những ngày đầu release, Yarn có khá nhiều issue tuy nhiên chúng cũng nhanh chóng được resolve sau đó. Điều đó cho thấy cộng đồng Yarn đang rất tích cực tìm và fix bugs. Yarn tỏ ra khá ổn định. 

## Kết luận
Xét một cách tổng quát, Yarn tỏ ra tốt hơn npm. Với Yarn, chúng ta có lockfile, cài đặt các gói nhanh hơn. Bạn có thể nên thử để cảm nhận những lợi ích mà nó mang lại.

## Tham khảo
[Yarn vs npm: Everything You Need to Know](https://www.sitepoint.com/yarn-vs-npm/)