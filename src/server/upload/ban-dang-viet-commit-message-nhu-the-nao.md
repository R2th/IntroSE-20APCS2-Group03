![](https://images.viblo.asia/bfe4b34c-140b-4a67-b2d6-28ac2c84bbc6.png)

Ngày hôm nay mình sẽ viết lách một chút với một topic không mấy liên quan tới code nhưng lại khá thực tiễn trong công việc lập trình đó là việc ***Viết git commit message như nào cho đúng?*** - Một trong số những thứ mà chúng ta không được dạy khi còn trên ghế nhà trường.

Thực ra là *không có* cách viết nào là đúng và cũng *không có* cách viết nào là sai cả :D. Tuy nhiên, nếu trong một project mỗi người viết commit message một kiểu thì khi nhìn vào commit history nó cũng không trông đẹp mắt mấy? Chưa kể khi cần chúng ta cần tìm kiếm và xem lại commit trong đống commit của vài tháng trước đó thông qua các commit message mà không có bất cứ quy tắc nào. Đây sẽ là vấn đề khi mình giả định:
- Đọc commit message mà không phán đoán được commit đấy sinh ra với mục đích gì.
- Cần tóm lược các thay đổi trong source code khi release sau một khoảng thời gian phát triển
- Lựa chọn version mới phù hợp v1.0.0, v1.0.1, v1.1.0 hay v2.0.0...? Chả nhè phải đau đầu khi phải nhìn lại một lùi commit??
- Dễ dàng để tìm kiếm thuận tiện hơn thông qua regex

Có lẽ, trong số các độc giả đang đọc bài này, bạn cũng đã thực hiện một số *quy tắc đóng* nào đó trong dự án của mình để giúp giải quyết một trong số vấn đề trên. Tại sao mình lại nói là quy tắc đóng? Đó là bởi vì nó mang tính cục bộ của riêng dự án của bạn mà thôi. Vậy liệu đã có những quy tắc nào chung cho tất cả chúng ta?

## Conventional Commits

**Conventional Commits** là một bộ quy tắc viết commit message sinh ra mục đích để cả `người và máy` đều có thể đọc được. Máy ở đây có thể hiểu như là các tools phục vụ cho việc versioning một cách tự động chẳng hạn.

Bộ quy tắc này tương khớp với SemVer (Semantic Version) bởi cách nó mô tả các feature, fix bugs hay là refactor code. Hiện tại, ở thời điểm viết bài này thì bộ quy tắc `Conventional Commits` này đang ở version `1.0.0-beta.4` và có thể có các bổ sung trong tương lai.

Git conventional commits được áp dụng rất nhiều trong repository, đặc biệt là những project open source khi có sự đóng góp của hàng nghìn contributors. Bạn có thể tham khảo việc thực hiện conventional commits trong một số project open trên github. Điển hình như là repository to của Electron [tại đây](https://github.com/electron/electron) hay ngay trên cả repository của Viblo như [viblo-asia/survey-results](https://github.com/viblo-asia/survey-results). :laughing:

### Cấu trúc commit message

Cấu trúc chung của một commit message theo conventional có dạng:

```html
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

**Trong đó:**
- Các thành phần `type`, `description` là bắt buộc cần có trong commit message, `optional` là tùy chọn, có hoặc không có cũng được.
- `type`: từ khóa để phân loại commit là feature, fix bug, refactor.. Chú ý ngay sau `type` có dấu `:` nữa nhé.
- `scope`: cùng được dùng để phân loại commit, nhưng trả lời câu hỏi: commit này refactor|fix cái gì? được đặt trong cặp ngoặc đơn ngay sau `type`. VD: `feat(authentication): `, `fix(parser): `.
- `description`: là mô tả ngắn về những gì sẽ bị sửa đổi trong commit đấy.
- `body`: là mô tả dài và chi tiết hơn, cần thiết khi description chưa thể nói rõ hết được.
- `footer`: một số thông tin mở rộng như số ID của pull request, issue.. được quy định theo conventional.

Như vậy, mình có thể lấy một số ví dụ cho một commit message ngắn như sau:

```bash
# ex1:
feat: implement multi-languages

# ex2:
fix: homepage's bug

# ex3 with scope:
fix(player): uiza player can not initialize
```

### Semantic Versioning

Conventional Commit tương khớp với **SemVer** thông qua `type` trong commit message. Các tool automate versioning cũng dựa vào nó để quyết định version mới cho source code. Với quy ước như sau:
- `fix`: một commit thuộc loại fix bug sẽ thay đổi [PATCH](http://semver.org/#summary) trong version (theo semantic version).
- `feat`: một commit thuộc loại thêm feature sẽ thay đổi [MINOR](http://semver.org/#summary) trong version theo (semantic version).
- Ngoài ra, một chút ý với từ khóa `BREAKING CHANGE` trong phần `body` của commit message thì sẽ ám chỉ là commit này có phần sửa đổi khiến code sẽ không còn tương thích với version trước đó. Như việc thay đổi cấu trúc response của một API, tất nhiên phần handle response theo cấu trúc trước đó sẽ không còn chính xác và lúc này chúng ta cần tạo một version mới hoàn toàn với việc thay đổi [MAJOR](http://semver.org/#summary) trong version.


### Một số type phổ biến

Một số `type` phổ biến được khuyên sử dụng bao gồm:
- `feat`: thêm một feature
- `fix`: fix bug cho hệ thống
- `refactor`: sửa code nhưng không fix bug cũng không thêm feature hoặc đôi khi bug cũng được fix từ việc refactor.
- `docs`: thêm/thay đổi document
- `chore`: những sửa đổi nhỏ nhặt không liên quan tới code
- `style`: những thay đổi không làm thay đổi ý nghĩa của code như thay đổi css/ui chẳng hạn.
- `perf`: code cải tiến về mặt hiệu năng xử lý
- `vendor`: cập nhật version cho các dependencies, packages.

> Ngoài feat, fix mà bắt buộc để tuân thủ Semantic Versioning thì chúng ta vẫn có thể sử dụng `type` là các danh từ mà chúng ta tự định nghĩa nhé.

### Tóm tắt các quy tắc

Các quy tắc cũng khá đơn giản và dễ nhớ. Khi viết commit theo cấu trúc bên trên là chúng ta đã tuân thủ gần hết bộ quy tắc này rồi, điểm qua bao gồm:
- Commit message phải có prefix là một type (dạng danh từ) như `feat`, `fix`.. Theo ngay sau là scoped (nếu có) và một dấu hai chấm và khoảng trắng như chúng ta vừa đề cập ở trên. VD: `feat: `, `fix: `.
- `feat` type này thì bắt buộc phải sử dụng khi thêm một feature
- `fix` type này bắt buộc phải sử dụng khi fix bug
- Nếu có scope, scope phải là một danh từ mô tả về vùng code thay đổi và phải đặt ngay sau `type`. VD: `feat(authentication)`.
- Một `description` phải là mô tả ngắn về các thay đổi trong commit và phải ở sau một khoảng trắng sau type/scope.
- Một commit dài thì có thể có phần body ngay sau description, cung cấp ngữ cảnh về các thay đổi. Phải có một dòng trắng giữa description và body.
- Phần `footer` có thể được đặt ngay sau body, phải có một dòng trắng giữa body và footer. Footer phải chứ các thông tin mở rộng về commit như các pull request liên quan, các người review, breaking changes. Mỗi thông tin trên một dòng.
- Các type khác feat và fix có thể được sử dụng trong commit message.

Nhìn chung mấy cái bên trên này chúng ta không phải nhớ nhiều vì khi viết commit theo cấu trúc ở phần một là nó đã đúng hết luôn rồi. :D Ngoài ra còn một vài quy tắc khác như:

- Commit breaking changes thì phải chỉ rõ ngay khi bắt đầu `body` hoặc footer với từ khóa `BREAKING CHANGE` viết hoa. Theo sau là dấu hai chấm và một khoảng trắng. VD:
    ```markdown
    feat(oauth): add scopes for oauth apps
    
    BREAKING CHANGE: environment variables now take precedence over config files.
    ```
- Một description nữa phải được cung cấp ngay sau BREAKING CHANGE, mô tả những thay đổi của API. VD: 
    ```
    BREAKING CHANGE: environment variables now take precedence over config files.
    ```
- Một dấu chấm than `!` có thể thêm vào trước dấu `:` trong type/scope để gây chú ý và nhấn mạnh rằng commit này là breaking change.

## Tổng kết lại

Như trong bài viết đã trình bày, các quy tắc trong **Conventional Commits** quả thật là rất đơn giản và dễ áp dụng phải không nào? Nhớ lại ngày xưa, khi release mình hay dùng lệnh git logs để lấy ra commit message làm `CHANGE LOGS`.

```bash
git log v1.0.0...HEAD --pretty="format:%e- %s"
```

Và bây giờ, sau khi dự án áp dụng Conventional Commits thì rõ ràng chúng ta có thể:
- Sử dụng [Semantic Release](https://github.com/semantic-release/semantic-release) để automate versioning. Tự động tạo `CHANGE LOGS` cho dự án với plugins của semantic-release.
- Sử dụng [Commit Lint](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) để check commit message theo Conventional Commits.
- Việc tìm kiếm lại commit history cũng đơn giản hơn khi có thể sử dụng regex để lọc commit qua type/scope.

Trên đây là chia sẻ về cách để viết commit message trở lên chuyên nghiệp và hiệu quả. Nếu bạn thấy bài viết này hữu ích, đừng quên nhấn nút **Share** để chia sẻ tới các bạn bè của mình nhé. Cảm ơn các bạn đã đọc bài viết của mình!

## Một số link hữu ích
- https://www.conventionalcommits.org/en/v1.0.0-beta.4/#specification
- https://electronjs.org/docs/development/pull-requests#commit-message-guidelines
- https://github.com/viblo-asia/survey-results
- https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
- https://github.com/semantic-release/semantic-release

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***