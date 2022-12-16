# Lời nói đầu
Chào mọi người, con đường đi từ một sinh viên lập trình tới Coder thật khá dài khi có vô vàn thứ phải học. Chưa kể việc đi làm còn khác biệt rất nhiều so với việc học. Nhưng càng học lại càng thấy đam mê nhỉ :->

   Trong quá trình học, vì việc làm bài tập lớn hay đồ án đôi khi mọi người thường làm một mình hay nếu có làm nhóm thì cũng chỉ 2-3 người vì vậy việc quản lý source code đơn giản chỉ là copy vào một chiếc USB hay đưa lên Google Driver để làm chung. Tuy nhiên  làm như vậy sẽ rất khó cho việc quản lý khi không biết được file code này của người nào viết ra :roll_eyes: (cái này còn tiện để tìm ông nào code bug để còn lôi ra mà xử :detective: ) , hay đến khi có lỡ tay xóa code :scream: thì cũng không biết cách nào để khôi phục lại được, vân vân và mây mây vấn đề khác khi chúng ta không sử dụng công cụ quản lý source code. Và nguyên nhân chủ yếu là việc ngại sử dụng và cũng ngại tìm hiểu (cơ bản là ngại tiếng Anh) luôn :).
   
   Vì vậy mình viết bài này để chia sẻ với mọi nguời, những người vừa mới đi làm và tiếp cận git, các bạn sinh viên, để tiếp cận sớm và sử dụng thành thạo phục vụ cho việc đi làm sau này (thường thì các công ty đa số bây giờ việc sử dụng Git là bắt buộc). Dễ thôi, Git không có gì là khó cả, chúng ta cùng vào những thứ cơ bản nhất nào!  
   
![](https://images.viblo.asia/9a1fdc25-9293-4925-b636-4550a9b57cca.png)

# 1. Git Introduce
> Git is a free and open source distributed version control system designed tohandle everything
> from small to very large projects with speed and efficiency.
> 
> (git-scm.com)


Theo trang chủ, Git là một hệ thống quản lý phiên bản phân tán (DVCS) mã nguồn mở, miễn phí :100:. được thiết kế để quản lý mọi dự án tử nhỏ đến lớn, hay rất lớn và với tốc độ và hiệu quả cho người dùng.  

Hệ thống quản lý phiên bản thì chắc ai cũng hiểu được nó là gì, vậy còn hệ thống quản lý phiên bản phân tán là như thế nào nhỉ? À nó chính là một hệ thống mà giúp quản lý nhiều phiên bản khác nhau của một source code được nhân bản ra các máy tính khác của những người làm việc chung team từ một nơi chứa mã nguồn đó.  Hay đơn giản khi làm việc nhóm, chúng ta có thể xem lại các phiên bản thay đổi khác nhau của mình hoặc từ đồng nghiệp và cũng có thể backup về phiên bản đấy hoặc gộp chúng lại với nhau và đẩy  code lên nơi lưu trữ chung mà ở Git gọi là Repository của nhóm mà không cần tới việc copy hay paste chay. Thông qua sử dụng Git khiến mọi thứ dễ dàng và thuận tiện hơn.

(DVCS: Distributed Version Control System)

**Ưu điểm khi sử dụng Git:**
- Là hệ thống quản lý phiên bản phân tán (DVCS) vì vậy việc phân tán và tạo ra các bản sao lưu sang các máy khác giúp tránh trường hợp mất dữ liệu so với việc quản lý tập trung vào một kho lưu trữ.
- Đảm bảo an toàn dữ liệu : Khi quản lý Git sẽ quản lý bằng các **commit** tránh việc ghi đè như các công cụ quản lý khác. Ở các công cụ khác, khi 2 người làm chung cùng sửa một file và đẩy code lên thì việc người sau cùng sẽ ghi đè code người trước là điều sẽ xảy ra. Tuy nhiên khi làm việc với Git, Git ghi lại lịch sử, cũng như những thay đổi của cả 2 người và tạo ra 2 bản ghi với **commit** khác nhau để phân biệt và so sánh với file trước khi sửa. (**commit** ở đây mọi người tạm thời hiểu nó là những đánh dấu cho một thay đổi dữ liệu hay một phiên bản dữ liệu) Từ đó sẽ giúp team lead hay mọi người cùng nhau phân tích và chọn phiên bản phù hợp và tiến hành gộp vào kho chứa.
- Git đảm bảo an toàn cho các kho lưu trữ.

# 2. Một số kiến thức quan trọng:
### 2.1. Repository
Mỗi repository là một kho chứa trong Git. Bao gồm 2 loại chính: 
- Remote Repository
- Local Repository

![](https://images.viblo.asia/9e9b9ab5-cf3a-4e8f-98e9-6e103fca6491.png)


Nhìn phía trên ảnh chúng ta có thể thấy **Remote Repository** là những kho lưu trữ được lưu trên server của các hệ thống kho lưu trữ sử dụng git (như GitHub). Chúng ta sử dụng **Remote Repository** để lưu source code của mình và share cho mọi người hay nhận source code từ kho lưu trữ (repo) của người khác. 

**Local Repository** chính là kho lưu trữ ngay trên máy tính của chúng ta. Và kho lưu trữ này có thể quản lý code ở trên máy tính cục bộ và trước khi đưa lên remote Repository thì chúng ta không thể chia sẻ code với người khác.
### 2.2. Commit
Mỗi một commit chính là một điểm mốc được đánh dấu cho sự thay đổi và sẽ được gắn một mã độc nhất để phân biệt với các commit khác.
Khi tạo mới một commit đồng thời sẽ được gắn HEAD, tức là repo lúc này đang trỏ vào commit mới nhất.

Với commit, việc backup lại những thay đổi thật dễ dàng hơn. Khi chúng ta có thể quay lại được tới những commit để restore code về thời điểm đó.
![](https://images.viblo.asia/123fa593-a135-4e8d-8b95-975a7520f29f.png)

### 2.3. Branch  

![](https://images.viblo.asia/6a8a8620-7206-44d8-ace8-97559d57a687.png)

- Branch (nhánh) là một tính năng được Git đưa vào phần nổi bật của tài liệu. Cũng đúng vậy, bởi vì branch rất hữu ích khi việc phân chia thành các branch khác nhau giúp khi chúng ta muốn tạo ra những ý tưởng hay chức năng khác nhau và sau đấy là việc quyết định có gộp tất cả các branch lại hay không để tạo thành một project hoàn chỉnh. Nếu không ưng ý , chúng ta có thể xóa branch ấy đi và không gộp vào dự án.
- Trong git được khuyến khích rằng mỗi chức năng chúng ta sẽ tạo ra một branch và khi phát triển chức năng đấy sẽ quay lại dùng nó để phát triển tiếp. 
- Một Repository mặc định sẽ có nhánh master , chính là nhánh để gộp tất cả những nhánh chức năng lại và để release ứng dụng.
### 2.4. Staging Area


Staging Area cũng được ghi chép trong phần quan trọng nhất của trang chủ Git. Nó chính là nơi lưu trữ tạm thời của Git trước khi được commit vào kho lưu trữ. Ở đấy  Staging Area sẽ đưa ra tất cả các thay đổi bằng cách hiển thị tất cả thay đổi so với commit trước đó. Giúp người làm việc có thể xem lại những thử chúng ta vừa làm và quyết định xem có tiếp tục đưa thay đổi vào kho lưu trữ hay sửa lại những thay đổi đó trước khi đưa vào kho lưu trữ cục bộ. 
### 2.5. Luồng hoạt động của Git

 ![](https://images.viblo.asia/aaaf11e4-ad8d-4bfc-a235-0c458ca7ae05.png)

Với các khái niệm  Repository, Staging Area, Commit chúng ta có thể nhìn vào hình và biết được luồng hoạt động của Git khi quản lý ở local là : 
- Khi tạo mới 1 file , sẽ ở vùng working directory (nơi đang làm việc). Khi này git vẫn chưa quản lý file đó. 
- Tiếp theo khi chúng ta muốn quản lý file đó, thì sử dụng lệnh ```git add``` để đưa nó vào Staging Area, ở Staging Area .
- Cuối cùng chúng ta sẽ commit để ghi lại thay đổi của file đó vào repository.

Dưới đây là trạng thái của một file, các trang thái này sẽ được mô tả ngay trong CMD  trong Window hay terminal trong Linux


   ![](https://images.viblo.asia/d40be0f7-9e7b-4848-bb99-7dc025be5f57.png)

- **Untracked**: tương ứng việc file mới bắt đầu trong Working Directory. 
- **Unmodified**: Khi file đã được commit vào Repository và chưa có sự thay đổi gì. Khi có sự thay đổi sẽ chuyển sang trạng thái tiếp theo:
- **Modified**: File đã được thay đổi tuy nhiên chưa đưa vào Staging Area. Vì vậy chúng ta cần add lại trước khi commit để chuyển về trạng thái Unmodified.
- **Staged**: File đã trong Staging Area.

### Những câu lệnh quan trọng:
Config email và username để đồng bộ với server git: 

```
$ git config --global user.name "User Name"
$ git config --global user.email "username@gmail.com"
//--global dùng cho tất cả các repo có ở máy tính. nếu chỉ muốn config cho 1 repo thì không cần thêm --global
```
Tạo mới một Repo ở phía local:

```
$ git init 
```

Khi sao chép một repo trên Remote Repository thông qua url thì chúng ta không cần sử dụng ```git init```

```
$ git clone <url>
``` 

Add một remote để làm việc : 

```
$ git remote add <url> 
```

 Add một file vào Staging Area: 

```
$ git add <path_to_file>
```

Commit để ghi nhận tất cả các thay đổi vào Repo đang làm việc :

```
$ git commit -m "message"
```

Để quay lại commit chỉ định và không xóa file thay đổi:

```
$ git reset --soft <commit>
```

Để quay lại commit chỉ định và  xóa file thay đổi:

```
$ git reset --hard <commit> 
```

Sửa một commit: 
```
$ git commit --amend
```
Trường hợp muốn gộp các commit lại với nhau : 

```
$ git rebase -i HEAD~n (với n là số commit gần nhất)
```

Để loại bỏ file khỏi Staging Area: 

```
$ git reset <path_to_file> 
``` 

Để xem lại trạng thái của các file thay đổi : 

```
$ git status 
```

Để xem lại lịch sử của những commit đã tạo : 

```
$ git commit 
```

Để xem tất cả các branch đang có trong repo : 

```
$ git branch
$ git branch -b <name_branch> // tạo mới một branch và chuyển qua branch đó
```

Chuyển qua một branch khác để làm việc : 

```
$ git checkout <branch> 
```

Để xem nội dung thay đổi : 

 ```
 $ git diff 
 ```

Đưa file về commit trước đó : 
```
$ git checkout -- <file>
```

Push thay đổi lên Remote Repository: 
```
$ git push <repo_name> <branch>
```

Kéo những thay đổi mới nhất về Local Repository: 

```
$ git pull <repo_name> <branch>
```

Xem những remote hiện có : 

```
$ git remote -v 
```
... updating
# 3. Tổng kết 
Bài hôm này mình đã chia sẻ một số kiến thức quan trọng và cơ bản nhất trong Git giúp newbie (người mới) vào làm việc có thể quen với việt sử dụng Git, và cũng mong rằng các bạn sinh viên hay các bạn chuẩn bị bước vào làm việc đọc bài này có thể tìm hiểu đôi chút về một công cụ tuyệt vời này nhé. Vào bài tiếp theo mình sẽ hướng dẫn mọi người thực hành cơ bản với GitHub và phân biệt giữa Git và GitHub. Cảm ơn mợi người đã theo dõi bài viết!. Có bất kỳ câu hỏi nào về Git mọi người hãy để lại comment phía dưới phần bình luận nhé. :grin: