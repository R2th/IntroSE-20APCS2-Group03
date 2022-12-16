## Giới thiệu
Nếu bạn là một lập trình viên hoặc đang trên con muốn trở thành một lập trình viên thì Git là một công cụ song hành vô cùng quen thuộc và có thể nói là không thể thiếu khi phát triển ứng dụng, do đó biết sử dụng Git - ít nhất là ở mức cơ bản là những kỹ năng mà bắt buộc bạn phải có được. Vậy Git là gì và tại sao Git lại quan trọng đến vậy?!? Bài viết này sẽ phần nào giúp bạn giải đáp câu hỏi trên cũng như sẽ giúp bạn làm quen với một số khái niệm và kĩ thuật thường dùng trong Git.

## Git là gì?
* Git được định nghĩa như là một trong những Hệ thống quản lý phiên bản phân tán (viết tắt là VCS) hay có thể hiểu đơn giản là Git dùng để quản lý mã nguồn dự án của của bạn, vậy cho nhanh :grin:
* Git ban đầu được tạo ra dành cho việc phát triển nhân Linux, còn hiện nay Git đã trở thành công cụ quản lý mã nguồn phổ biến và ưu việt nhất. Git có khả năng chạy trên nhiều HĐH khác nhau như Linux, Windows, MacOS.

## Tại sao Git lại quan trọng đến vậy?
Chúng ta hãy cùng đặt ra các tình huống sau để tìm được đáp án cho câu hỏi này nhé:
* **Quản lý code và lịch sử thay đổi**
> Bạn chỉnh sửa code và "trót dại" làm ra một đống bug :scream: hay bạn bổ sung thêm một tính năng mới nhưng tính năng đó lại kéo theo những sai lầm tai hại. Bạn muốn quay lại trạng thái trước khi gây nên "tội lỗi"? Nếu không dùng Git, bạn sẽ phải đi tìm từng chỗ mà mình đã "phá hoại" và sửa lại cho đúng với ban đầu, điều này có thể sẽ gây ra những sai sót khác hay dễ thấy nhất đó là rất mất thời gian => Git sẽ giúp bạn "quay ngược thời gian" để sửa chữa lỗi lầm với một vài dòng lệnh :ok_hand:

> Giả sử bạn cẩn thận hơn, bạn sẽ copy source code ra một nơi nào đó để backup lỡ có sai sót rồi mới bắt đầu phát triển tính năng, cứ lặp đi lặp lại như thế cho mỗi lần phát triển tính năng mới => lại rất mất thời gian và phiền toái => Git sẽ giúp bạn không phải làm như vậy.

* **Làm việc nhóm**

> Project có từ 2 thành viên trở lên, mỗi member ở mỗi team khác nhau (vd frontend và backend) hay mỗi người phát triển một tính năng khác nhau, sau đó hoàn thành lại phải gửi toàn bộ source code hoặc chép từng module để gửi qua usb, Google Driver, mail, app chat,....để mọi member download về và ráp lại với nhau...Chỉ bấy nhiêu thôi nghĩ đến đã muốn đau hết cả đầu :confounded:, hàng tá rủi ro với cách làm này như là code có thể bị thiếu, copy paste đè lên nhau,...và lại mất thời gian kinh khủng => Với Git thì mọi việc sẽ trở nên đơn giản hơn rất nhiều.

Qua những ví dụ trên thì có lẽ bạn đã trả lời được tại sao Git lại quan trọng đến như vậy rồi chứ :sunglasses:

## Một số khái niệm về Git
![](https://images.viblo.asia/a84ec7b5-fffe-4e22-9925-e3b37360e328.png)

### 1. Repository
Hãy hiểu đơn giản Repository là kho lưu trữ, gần như nghĩa tiếng việt của nó vậy :sweat_smile: là nơi lưu trữ tất cả những thông tin cần thiết để duy trì và quản lý các sửa đổi và lịch sử của dự án (nơi trữ source code và các thay đổi trên đống source code này)

**Có hai loại repository:**

**Local Repository:** là repository nằm trên chính máy tính của chúng ta, repository này sẽ đồng bộ hóa với remote repository bằng các lệnh của git.

**Remote Repository:** là repository được cài đặt trên server chuyên dụng. Ví dụ: GitHub, GitLab, Bitbucket,...

Khi tự khởi tạo một repository, chúng ta gõ lệnh `$ git init`, lệnh này sẽ tạo ra một thư mục `.git` và đây chính là repository còn phần code nằm cùng với thư mục `.git` được gọi là `Working Directory`

Sau khi gõ lệnh git init, nếu nhận được thông báo như sau thì việc thực hiện tạo repository đã thành công
```
Initialized empty Git repository in path_to_folder/.git/
```
![](https://images.viblo.asia/2f8a8179-5c5a-4f90-9665-7cbf850e399a.png)


### 2. Clone
Sao chép một repository có sẵn về local.

`git clone /đường-dẫn-đến-repository/`

![](https://images.viblo.asia/faccfa21-86ea-4fff-9313-d7f2b8407eb2.png)

Vd muốn lấy source code của dự án **example-project** từ remote repository đặt trên Github
```
$ git clone git@github.com:username/example-project.git
```

Nếu repository nằm ở máy chủ khác thì bạn dùng lệnh sau:
```
git clone tênusername@địachỉmáychủ:/đường-dẫn-đến-repository
```
Trong thư mục chứa source code vừa clone sẽ có file .git và lúc này chúng ta cũng đã có một **local repository**

### 3. Branch và Checkout
![](https://images.viblo.asia/161b7de0-1242-4a19-95d2-4d09a75d8ae4.jpeg)

Branch là nhánh, checkout một branch nghĩa là tạo một nhánh mới từ một nhánh nào đó. Tóm lại đây là khái niệm khi dùng để phân nhánh và những thao tác sẽ được lưu trữ trên nhánh hiện tại, không làm ảnh hưởng đến nhánh cũ, như đã nói ở trên về vấn đề khi bạn muốn phát triển một tính năng mới mà đảm bảo vẫn có thể dễ dàng khôi phục lại trạng thái trước đó thì một trong những cách có thể áp dụng là tạo một branch mới và thao tác trên đó như sau:
```
$ git branch <bran-name>
```
sau đó checkout sang branch vừa tạo hoặc dùng lệnh sau để tạo branch mới và đồng checkout sang branch vừa tạo
```
$ git checkout -b <branch-name>
```

Mỗi repository có thể tạo nhiều nhánh khác nhau, và chúng độc lập với nhau nên khi bạn thực hiện các thao tác thêm xóa, cập nhật với project trên nhánh này sẽ không ảnh hưởng đến các nhánh khác. Branch mới được tạo ra sẽ chứa toàn bộ trạng thái đã thực hiện trên project ngay thời điểm trước khi được tạo.

Branch mặc định là **master**

Có hai loại branch:

**Local branch:** nhánh nằm trên máy tính của bạn

**Remote branch:** nhánh nằm trên máy chủ từ xa

### 4. Commit
Là thao tác để lưu lại trạng thái hiện tại trên hệ thống, ghi nhận lại lịch sử các xử lý: thêm, xóa, cập nhật các file hay thư mục trên repository

Khi thực hiện, repository sẽ ghi lại sự khác biệt giữa lần commit trước so với hiện tại. Chúng được ghi nối tiếp nhau theo thứ tự thời gian. Do đó, bạn có thể xem lại lịch sử thay đổi trong quá khứ dựa theo các commit trước đó

![](https://images.viblo.asia/1ecc6126-6bed-4f8f-8698-2b18e1e30ccc.jpg)

Để thực hiện một commit, bạn sử dụng lệnh sau:
`$ git add .` nếu muốn lưu lại tất cả những file đã thay đổi, thêm, xóa,... hoặc `$ git add path_to_file1 path_to_file2` để lưu lại thay đổi chỉ những files mà bạn muốn

Tiếp theo chạy lệnh `$ git commit -m "Nội dung muốn commit"` để commit các thay đổi đã lưu lại ở trên.

### 5. Pull
Là hành động cập nhật các thay đổi xuống local repo.

Ví dụ: Trong khi bạn đang code trên một file thì một người bạn trong nhóm của bạn cũng code trên một file khác cùng branch, người bạn đó hoàn thành công việc, commit và push lên remote repo. Lúc này bạn muốn lấy những thay đổi mà người bạn của bạn đã thực hiện thì bạn sẽ thực hiện hành động Pull xuống.

Vd: Cập nhật code ở branch `feature_new` ở local với từ remote thì bạn dùng lệnh sau: `$ git pull origin feature_new`. 'origin' ở đây có thể được thay thế bởi tên của remote repository

### 6. Push
Là hành động đưa những thay đổi đã commit lên một branch nào đó ở remote repository hoặc một branch mới hoàn toàn lên remote repository. Sau khi push lên thì các thành viên của team có thể thấy và đồng bộ code xuống máy local.

Ví dụ: push một branch có tên là `new_feature` sau khi hoàn thành một feature (dĩ nhiên là đã commit) lên origin remote thì sẽ sử dụng lệnh sau: `$ git push origin new_feature`

### 7. Merge và Rebase
Là việc hợp nhất một nhánh phát triển hoặc hợp nhất lịch sử thay đổi vào nhánh khác.

Ví dụ bạn phát triển xong 1 tính năng, đã test/kiểm tra các kiểu và thấy nó hoàn chỉnh, có thể tích hợp vào phần mềm thì bạn sẽ tiến hành merge code. Dĩ nhiên trong thực tế thì bạn đôi khi cần phải mất một vài thao tác khác như commit, push,... để có thể merge được code.

Khi muốn tiến hành gộp 2 branch lại với nhau, ta có thể sử dụng git merge hoặc git rebase:
```
$ git merge <branch-name>
```
hoặc
```
$ git rebase <branch-name>
```
Tuy có cùng chức năng là gộp nhánh nhưng cách hoạt động của merge và rebase lại khác với nhau, ta có thể so sánh để thấy sự khác biệt cơ bản đó qua mô tả bên dưới:

Giả sử có 2 branchs cần merge như sau

![](https://images.viblo.asia/7cdf5cf3-9f16-43cc-8a75-14d6e6890f4d.png)

Sử dụng `merge` sẽ có kết quả như thế này

![](https://images.viblo.asia/0410ca07-7d24-4dcf-bfdd-fa5dc6872a29.png)

Sử dụng rebase tạo ra một commit mới là kết hợp từ 2 commit cuối cùng của 2 nhánh cần gộp vào với nhau, log commit sẽ không bị thay đổi và thứ tự các commit sẽ được sắp xếp theo dòng thời gian tạo commit.

Sử dụng `rebase` sẽ ra kết quả như thế này

![](https://images.viblo.asia/3fcffa25-937f-4271-8918-62618dbd7a58.png)

Ta thấy rebase sẽ đưa toàn bộ commit của feature branch lên đầu, đồng nghĩa với việc sẽ làm thay đổi thời gian của lịch sử commit

Vậy kết luận khác biệt rõ ràng dễ thấy nhất là rebase sẽ đưa commit lên đầu branch sau khi gộp còn merge sẽ giữ lại lịch sử commit theo dòng thời gian.

Rebase là một kĩ thuật nâng cao hơn, khó hiểu cũng như khó sử dụng hơn với những bạn mới lần đầu sử dụng Git. Bài viết này chỉ trình bày kiến thức cơ bản, còn rất nhiều kĩ thuật liên quan đến rebase để bạn có thể thuần thục được tính năng này.

### 8. Conflict
Là trường hợp có nhiều sự thay đổi trong cùng 1 dòng code khi merge và máy không thể tự quyết định cái nào là đúng. Lúc này bạn phải tự quyết định giữ lại dòng code nào. Công việc xử lý conflict nếu phức tạp thì nên được thực hiện bằng GUI thay vì command-line sẽ giúp bạn xử lý conflict tốt hơn vì sẽ trực quan hơn.

### 9. Fork
![](https://images.viblo.asia/5380bfc7-d666-43a9-9842-c8cccf0677f0.png)

Khái niệm này trên Github, là hành động tạo một bản sao của repository gốc thành một repository của bạn. Việc fork một repository cho phép bạn dễ dàng chỉnh sửa, thay đổi source code mà không ảnh hưởng tới source gốc.

![](https://images.viblo.asia/d86a5f7a-d606-4be8-9cbb-f9781824d475.png)

Nếu muốn thay đổi, bổ sung gì ở repository gốc thì bạn sẽ phải commit và push lên repository của bạn, sau đó tạo pull request để được merge vào repo chính.

**Một ví dụ về việc sử dụng fork, là khi bạn muốn fix bug source code trên repository của một ai đó, khi đó bạn cần thực hiện theo quy trình sau:**
1. Fork repository đó về tài khoản Github của mình
1. Thực hiện fix bug
1. Gửi một Pull Request tới repository gốc
1. Chủ sở hữu của repository nơi bạn fork sẽ review chỉnh sửa của bạn và tiến hành merge nội dung chỉnh sửa vào source gốc.

*Hẹn một bài viết khác mình sẽ hướng dẫn chi tiết về việc fork một repository để các bạn mới làm quen với Git sẽ nắm rõ hơn về khái niệm này.*

### 10. Pull request hay Merge request
*Thú thật là hồi ngày đầu mới đi làm, còn lơ ngơ về Git cùng mớ hỗn độn về các khái niệm của nó, mình có đôi chút bối rối với khái niệm này(tất nhiên là còn những bối rối khó đỡ khác với Git nữa :joy::joy:), ở đây mình nói đến Pull Request, mình mặc định pull là kéo code về, mà kéo code về thì chỉ local của mình mới cần làm việc đó thôi chứ ở trên Git thì cần gì @@ Thế nên khi anh leader bảo mình tạo Pull Request (PR đầu tiên trong đời :sweatsmile:) đi mình chẳng hiểu gì cả, suy nghĩ tại sao là phải pull request nhỉ, push branch của mình lên Git rồi thì ảnh thích làm gì thì làm chứ Pull Request là cái quái gì nhỉ :thinking: :thinking: =)) nói ra thật là ngại quá :sweatsmile: nhưng thôi không sao, để lỡ ai đã từng như mình thì cũng sẽ cảm thấy là "à vẫn có người "gà" giống mình" =)). Pull request bạn hãy hiểu đơn giản giống như rằng bạn là chủ nhân repository gốc, mình làm gì đó(thêm, xóa, sửa code, file) xong và yêu bạn pull code mới của mình về thì đứng ở góc độ của mình gọi là Pull Request thôi.*

Câu chuyện hơi dài dòng nhỉ, tóm lại, khi bạn tham gia phát triển ứng dụng và đã phát triển xong một tính năng, bạn muốn team leader (hoặc chủ của ứng dụng hoặc ai có đủ quyền trong dự án) merge tính năng của bạn vào ứng dụng thì lúc này bạn sẽ gửi một Pull request (PR) hay Merge request (MR) để họ review và chọn chấp nhận merge hay không.

Có hai case khi tạo pull request:
Một là tạo Pull Request từ forked repository (Một bản sao của code gốc).
Hai là Pull Request từ nhánh bên trong repository.

### 11. GitHub và Gitlab
Github là một máy chủ để mình có thể lưu source code lên đó. Github là cộng đồng nổi tiếng nhất trong thế giới Git, ở đây có thể tìm được source code đủ thể loại phần mềm. Một số công ty lớn như Microsoft cũng thường mở mã nguồn phần mềm của họ trên đây. Ở đây cũng có thể tìm được cả source code của hệ điều hành Linux và các dự án lớn khác. Ngoài GitHub ra còn có rất nhiều server khác như gitlab.com, bitbucket.org,...

GitLab cũng là một máy chủ khác để lưu source code, ra đời sau GitHub và được phát triển dạng mã nguồn mở. Trước đây điểm khác biệt và cũng là ưu điểm của GitLab là cho phép tạo các dự án private, còn bây giờ thì Github cũng đã cho phép tạo dự án private. Về cơ bản cách sử dụng GitLab và GitHub là hoàn toàn giống nhau, nếu nắm vững Git và đã biết dùng GitHub thì khi chuyển qua GitLab sẽ làm quen một cách nhanh chóng.

## Kết thúc
Bài viết này chủ yếu giúp các bạn mới làm quen với Git nắm được một số khái niệm thường dùng nhất trong khi sử dụng Git. Phần tiếp theo của bài viết này mình sẽ viết về Các kĩ thuật thường dùng trong Git nhé. Nếu các bạn có gì cần bổ sung thêm cho bài viết này thì để lại bình luận bên dưới và mình sẽ update lại nhé! Cảm ơn các bạn đã đọc!