![](https://images.viblo.asia/33c872af-2c0c-46f4-b88f-d87d0a3a5988.png)

# Giới thiệu
Hầu hết các developer đều ít nhiều sử dụng git trong công việc hàng ngày. Khi bắt đầu với git, chúng ta đều được học các câu lệnh quên thuộc như `git add .`, `git commit -m '[Feat] Hello world'`. Có bao giờ bạn thắc mắc, hệ thống git bên trong hoạt động như thế nào chưa. Trong bài viết này, mình và các bạn cùng tìm hiểu điều đó nhé.

# Blob objects
Git là một hệ thống tập tin theo dạng `content-addressable`( Mình để nguyên tên tiếng Anh do không tìm được từ phù hợp hoặc nghe sát nghĩa trong Tiếng Việt) . Vậy điều này có nghĩa là gì ? Nó có nghĩa là phần cốt lõi của Git là một kho dữ liệu theo dạng key-value. Bạn chèn bất kì nội dung nào một repo Git, Git sẽ trả lại bạn một key độc nhất cái mà bạn sau này dùng nó để lấy ra được nội dung đó. 

Bây giờ chúng ta hãy xem xét câu lệnh `git hash-object`, cái sẽ lấy  dữ liệu và lưu trữ nó trong thư mục `.git/objects` và trả lại bạn key độc nhất để đề cập đến đối tượng dữ liệu đó. 

Đầu tiên bạn hãy khới tạo một repo Git mới, và xác nhận rằng không có thứ gì trong thư mục `objects`:

```bash
$ git init test
Initialized empty Git repository in /tmp/test/.git/
$ cd test
$ find .git/objects
.git/objects
.git/objects/info
.git/objects/pack
$ find .git/objects -type f
```

Git đã khởi tạo thư mục `objects` và tạo các thư mục con `pack` và `info` trong đó. Bây giờ chúng ta sẽ dùng `git hash-object` để tạo  một đối tượng dữ liệu mới, và lưu nó bằng tay trong cơ sở dữ liệu Git: 

```bash
$ echo 'test content' | git hash-object -w --stdin
d670460b4b4aece5915caf5c68d12f560a9fe3e4
```

Theo cách hiểu đơn giản nhất, `git hash-object` sẽ lấy nội dung bạn đưa cho nó và đơn thuần khóa độc nhất cái sẽ dùng để lưu nội dung đó trong cơ sở dữ liệu Git. Option `-w` dùng để ghi object tới database, không đơn thuần việc chỉ trả lại giá trị key.

Đầu ra của câu lệnh trên là một đoạn hash 40 kí tự. Đây là kiểu hash `SHA-1`, một checksum của nội dung bạn lưu trữ. Bây giờ bạn có thể nhìn cách Git lưu trữ dữ liệu của bạn: 

```bash
$ find .git/objects -type f
.git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4
```

Bạn có thể thấy trong thư mục `objects`, nó đã có một file cho nội dung chúng ta mới tạo. Đây là cách Git lưu trữ nội dung, mỗi file mỗi mảnh dữ liệu, được đặt tên với mã SHA-1 checksum của nội dung và tiêu đề. Tên thư mục con là 2 kí tự đầu tiên của mã SHA-1, tên file là 38 kí tự còn lại.

Bây giờ bạn có thể xem nội dung file với câu lệnh `git cat-file`. Câu lệnh này dùng cho việc giám sát các Git objects. 

```bash
$ git cat-file -p d670460b4b4aece5915caf5c68d12f560a9fe3e4
test content
```

Bây giờ chúng ta hãy thử tạo mới một file và lưu trữ chúng trong cơ sở dữ liệu Git. 
```bash
$ echo 'version 1' > test.txt
$ git hash-object -w test.txt
83baae61804e65cc73a7201a7252750c76066a30
```
Sau đó ghi thêm nội dung mới tới file đó, và lưu nó lại lần nữa:
```bash
$ echo 'version 2' > test.txt
$ git hash-object -w test.txt
1f7a7a472abf3dd9643fd615f6da379c4acb3e3a
```

Cơ sở dữ liệu đối tượng của bạn bây giờ sẽ bao gổm cả 2 phiên bản của file mới này ( cũng như nội dung bạn đã lưu trữ )

```bash
$ find .git/objects -type f
.git/objects/1f/7a7a472abf3dd9643fd615f6da379c4acb3e3a
.git/objects/83/baae61804e65cc73a7201a7252750c76066a30
.git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4
```

Bây giờ bạn có thể xóa file `test.txt`, sau đó dùng Git để lấy lại từ cơ sở dữ liệu đối tượng. Đầu tiên là version đầu tiên:

```bash
$ git cat-file -p 83baae61804e65cc73a7201a7252750c76066a30 > test.txt
$ cat test.txt
version 1
```

hoặc version thứ hai: 

```bash
$ git cat-file -p 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a > test.txt
$ cat test.txt
version 2
```

# Tree objects
Kiểu Git object chúng ta sẽ xem xét sau đây là **tree** , cái giải quyết vấn đề về việc lưu trữ tên tệp, và cho phep bạn lưu trữ các tệp thành các nhóm. Git lưu trữ nội dung trong một phương thức tương tự với hệ thống tệp tin của UNIX, nhưng theo một cách đơn giản hơn. Tất cả nội dung đều lưu trữ nhiều các tree và blob objects. Một cây đơn bao gồm một hoặc nhiều lối vào, mỗi trong số chúng là một mã SHA-1 của blob, hoặc cây con cùng với mã truy cập. Ví dụ :

```bash
$ git cat-file -p master^{tree}
100644 blob a906cb2a4a904a152e80877d4088654daad0c859      README
100644 blob 8f94139338f9404f26296befa88755fc2598c289      Rakefile
040000 tree 99f1a6d12cb4b6f19c8655fca46c3ecf317074e0      lib
```

Chúng ta thấy được thư mục con `lib` không phải là một blob object, nó trỏ vào 1 tree objects. 

```bash
$ git cat-file -p 99f1a6d12cb4b6f19c8655fca46c3ecf317074e0
100644 blob 47c6340d6459e05787f644c2447d2595f5d3a54b      simplegit.rb
```

Về mặt khái niệm, dữ liệu đang lưu trữ như sau: 
![](https://images.viblo.asia/3dfee483-7f7e-4695-9719-ddbbb64325f9.png)

Bạn có thể dễ dàng tạo riêng cây của bạn. Git thông thường tạo một tree băng cách lấy trạng thái hiện tại của vùng staging và viết một loạt cây từ đó. Để tạo một index với đầu vào đơn, phiên bản đầu của file `test.txt`, bạn có thể sử dụng câu lệnh `git update-index`. Bạn dùng câu lệnh này để thêm file `test.txt` vào vùng staging. 

```bash
$ git update-index --add --cacheinfo 100644 \
  83baae61804e65cc73a7201a7252750c76066a30 test.txt
```
Trong trường hợp này bạn bạn chỉ ra mode `100644`, điều này có nghĩa đó là 1 file bình thường. Các lựa chọn khác đó là `100755`, file có thể thực thi, `120000`, symbolic link. 
Bây giờ bạn có thể sử dụng `git write-tree` để ghi vùng staging tới tree objects

```bash
$ git write-tree
d8329fc1cc938780ffdd9f94e0d364e0ea74f579
$ git cat-file -p d8329fc1cc938780ffdd9f94e0d364e0ea74f579
100644 blob 83baae61804e65cc73a7201a7252750c76066a30      test.txt
```
Bạn có thể verify đó là một tree bằng cách sử dụng `git cat-file`:
```bash
$ git cat-file -t d8329fc1cc938780ffdd9f94e0d364e0ea74f579
tree
```

Bây giở bạn sẽ tạo một tree mới với phiên bản thứ hai của `test.txt` cũng như một file mới :
```bash
$ echo 'new file' > new.txt
$ git update-index --add --cacheinfo 100644 \
  1f7a7a472abf3dd9643fd615f6da379c4acb3e3a test.txt
$ git update-index --add new.txt
```

Vùng staging của bạn bây giờ có phiên bản mới của `test.txt` cũng như file `new.txt`. 

```bash
$ git write-tree
0155eb4229851634a0f03eb265b69f5a2d56f341
$ git cat-file -p 0155eb4229851634a0f03eb265b69f5a2d56f341
100644 blob fa49b077972391ad58037050f2a75f74e3671e92      new.txt
100644 blob 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a      test.txt
```
Trong trường hợp này bạn có thể đọc một trê đã có vào vùng staging: 

```bash
$ git read-tree --prefix=bak d8329fc1cc938780ffdd9f94e0d364e0ea74f579
$ git write-tree
3c4e9cd789d88d8d89c1073707c3585e41b0e614
$ git cat-file -p 3c4e9cd789d88d8d89c1073707c3585e41b0e614
040000 tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579      bak
100644 blob fa49b077972391ad58037050f2a75f74e3671e92      new.txt
100644 blob 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a      test.txt
```

Nếu bạn tạo ra một working directory từ cây bạn vừa ghi,bạn sẽ thấy 2 files ở phía trên, và 1 thư mục con `bak` . Git sẽ lưu trữ cấu trúc như sau: 
![](https://images.viblo.asia/be39f614-cc9c-4ecf-80fb-05573598c599.png)
Bây giờ bạn sẽ 3 cây để đại diện cho các bản snapshot của thư mục của bạn. Nhưng vân đề là chúng ta phải ghi nhớ cả 3 mã SHA-1 để gọi lại bản snapshot. Bạn cũng không có thông tin gì về việc ai đã lưu nó. Bạn sẽ cần một loại object nữa đó là commit objects

# Commit objects
Để tạo một commit objects, ta sẽ dùng câu lệnh `commit-tree`, và chỉ ra mã SHA-1
```bash
$ echo 'First commit' | git commit-tree d8329f
861599522e1202127d2a60603f6a941f6dd1a3aa
```

Bây giờ chúng ta hãy xem có gì bên trong commit object với `git cat-file`:

```bash
git cat-file -p 8615995
tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579
author bui.nhat.duy <bui.nhat.duy@sun-asterisk.com> 1608524648 +0700
committer bui.nhat.duy <bui.nhat.duy@sun-asterisk.com> 1608524648 +0700

First commit
```

Cấu trúc của commit-object khá đơn giản, nó chỉ ra top-level tree của bản snapshot của project. Thông tin người commit( sử dụng `user.name` và `user.email` trong file config) và commit message. 
Tiếp theo bạn tạo ra 2 commit objects, mỗi cái sẽ trỏ đến commit ở phía trước nó:
```bash
 echo 'Second commit' | git commit-tree 0155eb -p 8615995
cb7991ef1875c9fc4e54178e8205498a707e2523
echo 'Third commit'  | git commit-tree 3c4e9c -p cb7991e
02307660f033eac36ef7c0ca82dff9f4faf6a29f
```

Mỗi commit objects sẽ trỏ đến 1 trong 3 bản snapshot bạn tạo trước đó. Bây giờ bạn đã có một lịch sử Git commit thật sự, và có thể nhìn nó thông qua câu lệnh quen thuộc `git log`, 
```bash
it log --stat 023076
commit 02307660f033eac36ef7c0ca82dff9f4faf6a29f
Author: bui.nhat.duy <bui.nhat.duy@sun-asterisk.com>
Date:   Mon Dec 21 11:31:48 2020 +0700

    Third commit

 bak/test.txt | 1 +
 1 file changed, 1 insertion(+)

commit cb7991ef1875c9fc4e54178e8205498a707e2523
Author: bui.nhat.duy <bui.nhat.duy@sun-asterisk.com>
Date:   Mon Dec 21 11:30:52 2020 +0700

    Second commit

 new.txt  | 1 +
 test.txt | 2 +-
 2 files changed, 2 insertions(+), 1 deletion(-)

commit 861599522e1202127d2a60603f6a941f6dd1a3aa
Author: bui.nhat.duy <bui.nhat.duy@sun-asterisk.com>
Date:   Mon Dec 21 11:24:08 2020 +0700

    First commit

 test.txt | 1 +
 1 file changed, 1 insertion(+)
```
Thật thú vị phải không, bạn vừa sử dụng các phương thức ở mức low-level để tạo ra lịch sử commit Git. Đó là bản chất của `git add` và `git commit` - nó tạo ra blob objects cho các file thay đổi, update lại index, ghi lên cây, và ghi các commit objects để trỏ đến các top-level tree. Có 3 loại Git object chính đó là blob, tree, và commit. Đây là tất cả các object ở thời điểm hiện tại :
```bash
$ find .git/objects -type f
.git/objects/86/1599522e1202127d2a60603f6a941f6dd1a3aa
.git/objects/01/55eb4229851634a0f03eb265b69f5a2d56f341
.git/objects/83/baae61804e65cc73a7201a7252750c76066a30
.git/objects/fa/49b077972391ad58037050f2a75f74e3671e92
.git/objects/02/307660f033eac36ef7c0ca82dff9f4faf6a29f
.git/objects/3c/4e9cd789d88d8d89c1073707c3585e41b0e614
.git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4
.git/objects/d8/329fc1cc938780ffdd9f94e0d364e0ea74f579
.git/objects/cb/7991ef1875c9fc4e54178e8205498a707e2523
.git/objects/1f/7a7a472abf3dd9643fd615f6da379c4acb3e3a
```

# Object Storage
Như mình đã đề cập trước đó, sẽ có 1 header với mỗi object bạn commit tới Git object. Vậy chúng ta cùng tìm hiểu xem cách Git lưu trữ các objects của nó. Bạn sẽ thấy cách để lưu một blob object - trong trường hợp này là đoạn string 'Hello World'. Chúng ta sẽ dùng Irb để khám phá :

```bash
$ irb
> content = "Hello World"
=> "Hello World" 
```

Git đầu tiên khởi tạo một header để xác định loại object- trong trường hợp này một blob. Để làm điều dó, Git thêm một khoảng trống  theo sau đó là kích cỡ byte của `content`, và cuối cùng là 1 byte null. 
```bash
> header = "blob #{content.bytesize}\0"
 => "blob 11\u0000" 
```

Git nối phần header trên với nội dung ban đầu, sau đó tính toán SHA-1 checksym của nội dung mới đó. 
```bash
> store = header + content
=> "blob 11\u0000Hello World" 
> require 'digest/sha1'
=> true 
sha1 = Digest::SHA1.hexdigest(store)
=> "5e1c309dae7f45e0f39b1bf3ac3cd9db12e7d689" 
```

Giờ chúng ta hãy so sánh với đầu ra của `git hash-object`. 

```bash
echo -n "Hello World" | git hash-object --stdin
5e1c309dae7f45e0f39b1bf3ac3cd9db12e7d689
```

Git sẽ nén nội dung mới với zlib, cái bạn có thể làm với thư viện zlib trong Ruby:
```bash
>  require 'zlib'
 => true 
> zlib_content = Zlib::Deflate.deflate(store)
 => "x\x9CK\xCA\xC9OR04d\xF0H\xCD\xC9\xC9W\b\xCF/\xCAI\x01\x00;{\x06>" 
```
Cuối cùng bạn ghi nội dung của đoạn zlib tới 1 object trên đĩa. Bạn sẽ xác định đường dẫn của object bạn cần ghi ( 2 kí tự đầu là tên thư mục con, 38 kí tự còn lại là tên tệp ). Hãy làm nốt nó với Ruby  nào :

```bash
> path = '.git/objects/' + sha1[0,2] + '/' + sha1[2,38]
 => ".git/objects/5e/1c309dae7f45e0f39b1bf3ac3cd9db12e7d689" 
>  require 'fileutils'
 => true 
> FileUtils.mkdir_p(File.dirname(path))
 => [".git/objects/5e"] 
>  File.open(path, 'w') { |f| f.write zlib_content }
=> 27
```

Bây giờ chúng ta hãy so sánh với nội dung của object sử dụng `git cat-file`
```bash
$ git cat-file -p 5e1c3f39b1bf3ac3cd9db12e7d689
Hello World
```
Chính là nó, bạn vừa tạo ra một Git object hợp lệ. 

# Kết luận
Trong bài viết này mình đã giới thiệu về cách những câu lệnh hàng ngày `git add`, `git commit` hoạt động. Hi vọng sau bài viết này các bạn có thể hiểu thêm về Git objects, cách Git hoạt động bên trong. 

# Link tham khảo
https://medium.com/mindorks/what-is-git-object-model-6009c271ca66
https://aboullaite.me/deep-dive-into-git/