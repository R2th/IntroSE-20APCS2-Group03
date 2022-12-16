# 1. HEAD, ORIG_HEAD, FETCH_HEAD
- **HEAD**:  **HEAD** luôn luôn trỏ tới commit hiện tại ở working tree. Đa số các lệnh git thay đổi working tree sẽ bắt đầu bằng cách thay đổi vị trí của **HEAD**. Ví dụ như reset, revert các commit
- Hiểu đơn giản: **HEAD** là tên hiển thị phần đầu của branch đang sử dụng hiện tại
- Chúng ta biết đến **HEAD** nhưng dường như lại không mấy ai để ý đến **ORIG_HEAD**. Commit trước khi reset có thể tham chiếu bằng tên **ORIG_HEAD**. Trường hợp đã reset nhầm chẳng hạn, nếu reset ở trong **ORIG_HEAD** thì có thể quay về trạng thái trước khi reset. :smiley::smiley::smiley:
```
$ git log --oneline
        * Second commit
        * First commit
        * Hello 2019
        * Init commit
$ git reset --hard HEAD~1
        * First commit
        * Hello 2019
        * Init commit
$ git reset --hard ORIG_HEAD
        * Second commit
        * First commit
        * Hello 2019
        * Init commit
```
* **FETCH_HEAD**: cái này tương tự như HEAD nhưng nó ở trên các branch fetch, mình sẽ đề cập sau
# 2. Fetching
Nếu bạn muốn lấy code từ remote repository, bạn sử dụng pull. Nhưng nếu bạn đang ở 1 nhánh khác mà bạn không muốn lấy code về hoặc cũng không muốn chuyển sang develop để pull code, bạn có thể suy nghĩ đến việc sử dụng fetch. Fetch được sử dụng khi bạn chỉ muốn **KIỂM TRA** nội dung remote repository mà không muốn merge :roll_eyes::roll_eyes::roll_eyes:

Khi thực hiện fetch sẽ lấy lịch sử mới nhất của remote repository về, các commit sẽ được đẩy vào 1 nhánh không tên. Tuy nhiên branch này có thể checkout bằng tên **FETCH_HEAD**

Để đơn giản hóa fetch, bạn hãy coi fetch như 1 nhánh thông thường với
```
head = FETCH_HEAD
branch name = remote_name/branch_name (ví dụ origin/develop)
```

Thực hành tí nhể:
```
$ git fetch --all (fetch toàn bộ code từ remote repo về để ở 1 nhánh tạm mà không merge vào branch đang làm việc)
$ git fetch framgia develop (fetch code từ remote framgia với nhánh develop)
$ git rebase framgia/develop (rebase với nhánh fetch về remote là framgia và branch develop)
```
Ta thấy điểm khác biệt khi dùng fetch là có thêm remote name thông thường nếu checkout sang `develop` và pull thì chỉ cần:
```
$ git rebase develop
```
Ngoài ra ta cũng có thể thực hiện các thao tác khác trên fetch như branch thông thường, khác mỗi cái thay vì thay đổi vị trí **HEAD** thì ta sẽ là thay đổi vị trí của **FETCH_HEAD** :D
```
$ git reset --hard FETCH_HEAD~1
$ git merge framgia/develop (thực chất đây là pull develop vào nhánh hiện tại đó :v)
```
Một tác vụ mà bạn có thể áp dụng nhiều với fetch đó là việc lấy code từ 1 pull request của người khác. Giả sử đồng nghiệp Alice của bạn và bạn làm cùng một chức năng X. Anh ta code gần xong, đã tạo pull, bạn cần lấy code mới nhất của anh ta về từ pull đó và code tiếp. Fetch có thể là một giải pháp :sunglasses::sunglasses::sunglasses:

* Bước 1: Fetch code về đã
```
$ git fetch framgia pull/ID/head:BRANCHNAME
```
* Bước 2: Chuyển đổi nhánh dựa vào pull request này
```
$ git checkout BRANCHNAME
```
Ví dụ: 2 người cùng code chức năng init model ở pull số 12
```
$ git fetch framgia pull/12/head:InitModel
$ git checkout InitModel
```
Đã lấy được code của Alice, làm tiếp thôi :sweat_smile::sweat_smile::sweat_smile:
# 3. Git blame
Blame, đúng như nghĩa của nó, đây là một lệnh hữu dụng để bạn "khiển trách" đồng đội. Câu lệnh này đơn hiển thị bản sửa đổi và tác giả sửa đổi lần cuối mỗi dòng của một tệp. :grinning::grinning::grinning:

Câu lệnh:
```
$ git blame file
```
Các tùy chọn bạn có thể xem tại https://git-scm.com/docs/git-blame

Thôi khỏi nhớ tùy chọn, vì đơn giản câu lệnh này mình chủ yếu dùng xem ai viết để đi ***abcxyz*** :rofl::rofl::rofl:. Nếu vậy một số package hỗ trợ trong các IDE có thể giúp bạn điều đó
* Với Sublime text bạn có thể cài package [**git blame**](https://packagecontrol.io/packages/Git%20blame)
* Với PHPStorm, nó đã được tích hợp sẵn, việc của bạn là chỉ việc dùng (Click chuột phải vào file, Chọn **Git >** **Annotate**)

Chém gió thế thôi chứ chúng ta không nên "khiển trách" đồng đội làm gì. Đơn giản chúng ta là một team chiến thắng :v. Câu lệnh này sẽ hữu ích hơn khi bạn tìm ra người viết để trao đổi, cùng nhau giải quyết các vấn đề một cách tốt nhất để tạo ra các sản phẩm awesome :money_mouth_face::money_mouth_face::money_mouth_face:
# 4. Một số tham số config 
* Alias: Bạn có thấy ngồi gõ cả câu lệnh git
```
$ git status
$ git log --oneline
$ git checkout branch_name
$ git commit --amend --no-edit
...
```
Hơi dài dài xíu không. Thay vì thế, bạn có thể cấu hình trong config vào `alias` để gõ ít đi 
```
 $ git config alias.st status
 $ git config alias.co checkout
 $ git config alias.br branch
 $ git config alias.lol "log --oneline"
 $ git config alias.loll "log --oneline -2019"
```
 Như vậy bạn chỉ cần `$ git st` hay` $ git br Task/2019` hay` $ git loll `là có thể làm được các tác vụ như trên. Thật tiện dụng hơn 1 chút chút xíu phải không nào :upside_down_face::upside_down_face::upside_down_face:
 
 Nếu bạn sử dụng theme với .zsh, hãy học thuộc chỗ git alias này nhé
 https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/git/git.plugin.zsh
 
 * Config bằng` push -u`

Mỗi lần push bạn lại phải điền đầy đủ cả tên remote repo và branch, như vậy có thể hơi dài nhể. Thay vào đó lần đầu bạn thêm tùy chọn `-u` vào câu lệnh push
```
 $ git push -u origin Task/1102
 ```
 Và từ lần sau chỉnh sửa, chỉ cần `$ git push` là được, nó sẽ tự động nhận remote repo và branch cho bạn dựa vào config.
 
#  Tài liệu tham khảo
*  https://backlog.com/git-tutorial/vn/
*  https://packagecontrol.io/packages/Git%20blame
*  https://git-scm.com/
*  [Git config](https://viblo.asia/p/nhung-van-de-thoi-su-khi-len-div-va-lam-du-an-Az45bWXzKxY#_tren-day-la-mot-vai-chia-se-cho-cac-ban-new-bie-thoi-ban-cung-co-the-chia-se-them-nhung-dieu-ban-thay-can-thet-giup-cac-em-moi-len-div-cai-thien-them-skill-de-lam-viec-tu-tin-hon-bang-cac-comment-cam-on-cac-ban-da-doc-bai-3)