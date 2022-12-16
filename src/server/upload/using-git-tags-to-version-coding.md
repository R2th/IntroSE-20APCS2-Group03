## Introduction
![](https://images.viblo.asia/cea3c905-9da0-4c9e-baa5-1a394299d885.png)

Trong quá trình phát triển dự án, mỗi khi chúng ta commit, tất cả đều được lưu vào trong log để xem lại, tuy nhiên về sau khi lượng commit quá nhiều sẽ gây ra khó khăn trong việc check lại content của từng giai đoạn. Giải pháp cho việc này là sử dụng `git tag` để lưu lại thông tin cần thiết cho từng mốc thời gian khác nhau, giúp chúng ta dễ dàng hơn trong việc kiểm soát và hệ thống lại các thay đổi quan trọng trong dự án.

Cũng giống như đa số các hệ quản trị phiên bản khác, Git có khả năng đánh dấu (tag) các mốc quan trọng trong lịch sử của project. Nhìn chung,  chức năng này được sử dụng để đánh dấu các thời điểm release quan trọng của dự án (ví dụ như v1.0, v2.0..)

## Basic Command
### Listing Tags
Để liệt kê tất cả các tag đang có trong dự án (theo thứ tự alphabet):
```
$ git tag
v1.1
v1.2
v1.3
v2.1
v2.2
...
```
Trong trường hợp cần xem các tag chung version (vd: v1.1, v1.2, v1.3..), có thể dùng wildcard `*`:
```
$ git tag -l "v1.*"
v1.1
v1.2
v1.3
```
### Creating A Tag
Có 2 loại tag thường được sử dụng: `lightweight` và `annotated`
* **Lightweight Tag**

Về cơ bản, `Lightweight` tag giống như 1 branch, tức là chúng trỏ đến 1 commit cụ thể. Giống như tên gọi, `lighweight` tag khá là "gọn", thường dùng với vai trò tag local. Để tạo `lightweight` tag , chúng ta chỉ cần tag name là đủ:
```
$ git tag lightweight_tag
$ git tag
lightweight_tag
v1.0
v1.1
...
```
Nếu chúng ta xem cụ thể tag vừa tạo sử dụng `git show`, chúng ta sẽ chỉ thấy được nội dung commit mà thôi:
```
$ git show lightweight_tag
commit ca82a6dff817ec66f44342007202690a93763949
Author: Thanos <thanos@eliminate-half-the-university.com>
Date: Sat Mar 19 09:48:93 2918 -0700

        changed the version number
```
* **Annotated Tag**

`Annotated` tag sẽ có thêm các tham số `-a` tương ứng với `annotate` và `-m` để thiết lập `message` cho tag:
```
$ git tag -a v2.0 -m "This is my 2.0 version"
$ git tag
lightweight_tag
v1.0
v1.1
...
v2.0
```
`Annotated` tag sẽ có nhiều thông tin bổ sung hơn so với `lightweight` tag:
```
$ git show v2.0
tag v2.0
Tagger: Thanos <thanos@eliminate-half-the-university.com>
Date: Sat Mar 19 09:48:93 2918 -0700

This is my 2.0 version

commit ca82a6dff817ec66f44342007202690a93763949
Author: Thanos <thanos@eliminate-half-the-university.com>
Date: Thursday Mar 19 19:38:11 2918 -0700

           changed the version number
```
Nhưng trên đây mới chỉ là lệnh tạo tag cho commit cuối cùng, trong trường hợp chúng ta cần tạo tag cho các commit trước đấy, thì phải thêm mã `checksum` của commit đó:
```
$ git log --pretty=oneline
61cf4ea2b88094a9cdabd5f8e4d34d47545d21d4 commit 1
1ca63e3532decd7cdafb8523f6b6a75b883ddf3d commit 2
f5db51e90203864f9a0c8d702ddb497524c7dfdf commit 3
```
```
$ git tag -a v1.1.1 61cf4 -m "Add tag for commit 1"
```
### Pushing Tags
Chúng ta sẽ push từng tag cụ thể lên remote server bằng cách thủ công:
```
$ git push origin [tag_name]
```
Hoặc nhiều tag cùng lúc với `--tags` option,  tất cả các tag chưa được đồng bộ sẽ được push lên remote server:
```
$ git push origin --tags
```
### Deleting Tags
Để xóa 1 tag ở repo local:
```
git tag -d <tagname>
```
Lệnh trên chỉ xóa tag ở local mà thôi, với remote server, chúng ta sẽ dùng `git push`:
```
git push origin --delete <tagname>
```
### Checkout Tag
Để check out về trạng thái của 1 tag bất kì, có thể sử dụng `git checkout`:
```
$ git checkout [tag_name]
```
## Implement
Chúng ta sẽ thử làm 1 project khá đơn giản gồm file `index.html` duy nhất thôi, và mỗi giai đoạn thêm js hay css sẽ tương ứng với các mốc release cần đánh dấu, cụ thể:
* v1.0: Add HTML Structure
* v1.2: Add more text content
* v1.3: Add css and js
### v1.0
Trước tiên chúng ta sẽ tạo 1 repo mới:
![](https://images.viblo.asia/ffda0d72-e0ec-44b5-be42-29a9fc9e8ef2.png)

Clone repo:
```
$ git clone git@github.com:my_repo_name/test_git_tag.git
Cloning into 'test_git_tag'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (3/3), done.
Checking connectivity... done.
```
Tạo file `index.html`:
```html
<h1>I am a headline made with HTML</h1>
<p>And I am a simple text paragraph. The color of this text is styled with CSS. Click the button below to remove me through the power JavaScript.</p>
```
Sau khi commit, chúng ta sẽ tạo tag version  đầu tiên, lưu ý là chúng ta phải tạo tag **sau** khi đã commit code:
```
$ git tag -a v1.0 -m "Add HTML Structure"
```
```bash
$ git show v1.0
tag v1.0
Tagger: my_repo_name <test@gmail.com>
Date:   Tue Mar 19 17:15:38 2019 +0700

Add HTML structure

commit d30365c0a99d4e8f816de4b73c51775dcc7fad05
Author: my_repo_name <test@gmail.com>
Date:   Tue Mar 19 17:12:50 2019 +0700

    Add index.html

diff --git a/index.html b/index.html
new file mode 100644
index 0000000..6a1c443
--- /dev/null
+++ b/index.html
@@ -0,0 +1,2 @@
+<h1>I am a headline made with HTML</h1>
+<p>And I am a simple text paragraph. The color of this text is styled with CSS. Click the button below to remove me through the power JavaScript.</p>
```
Sau đó chúng ta sẽ push lần lượt code và tag lên remote server:
```
$ git push
$ git push origin v1.0
```
Check thử trên remote repo:
![](https://images.viblo.asia/d7b354a2-cb51-45df-bcf9-c2b0ac60fd25.png)

### v1.2
Giờ chúng ta sẽ thêm content html:
```html
<h1>I am a headline made with HTML</h1>
<p>And I am a simple text paragraph. The color of this text is styled with CSS. Click the button below to remove me through the power JavaScript.</p>
<p class="hide">She who arrival end how fertile enabled. Brother she add yet see minuter natural smiling article painted. Themselves at dispatched interested insensible am be prosperous reasonably it. In either so spring wished. Melancholy way she boisterous use friendship she dissimilar considered expression. Sex quick arose mrs lived. Mr things do plenty others an vanity myself waited to. Always parish tastes at as mr father dining at.

Must you with him from him her were more. In eldest be it result should remark vanity square. Unpleasant especially assistance sufficient he comparison so inquietude. Branch one shy edward stairs turned has law wonder horses. Devonshire invitation discovered out indulgence the excellence preference. Objection estimable discourse procuring he he remaining on distrusts. Simplicity affronting inquietude for now sympathize age. She meant new their sex could defer child. An lose at quit to life do dull </p>
<button>Hide the text above</button>
```
Sau đó tiếp tục commit và tạo tag:
```
$ git commit ...
$ git tag -a v1.2 -m "Add more HTML content"
```
```bash
$ git show v1.2
tag v1.2
Tagger: my_repo_name <test@gmail.com>
Date:   Wed Mar 20 16:19:59 2019 +0700

Add more HTML content

commit c6fc8ca536c2368bdfcfdf3e19d0409549d715f4
Author: my_repo_name <test@gmail.com>
Date:   Wed Mar 20 16:19:09 2019 +0700

    Add more content

diff --git a/index.html b/index.html
index 6a1c443..5806f69 100644
--- a/index.html
+++ b/index.html
@@ -1,2 +1,6 @@
 <h1>I am a headline made with HTML</h1>
 <p>And I am a simple text paragraph. The color of this text is styled with CSS. Click the button below to remove me through the power JavaScript.</p>
+<p class="hide">She who arrival end how fertile enabled. Brother she add yet see minuter natural smiling article painted. Themselves at dispatched interested insensible am be prosperous reasonably it. In either so spring wished. Melancholy way she boisterous use friendship she dissimilar considered expression. Sex quick arose mrs lived. Mr things do plenty others an vanity myself waited to. Always parish tastes at as mr father dining at.
+
+Must you with him from him her were more. In eldest be it result should remark vanity square. Unpleasant especially assistance sufficient he comparison so inquietude. Branch one shy edward stairs turned has law wonder horses. Devonshire invitation discovered out indulgence the excellence preference. Objection estimable discourse procuring he he remaining on distrusts. Simplicity affronting inquietude for now sympathize age. She meant new their sex could defer child. An lose at quit to life do dull </p>
+<button>Hide the text above</button>
```
Và push lần lượt code & tag lên remote server:
```
$ git push
$ git push origin v1.2
```
### v1.3
Tiếp theo chúng ta sẽ thêm css + js:
```html
#index.html
<h1>I am a headline made with HTML</h1>
<p>And I am a simple text paragraph. The color of this text is styled with CSS. Click the button below to remove me through the power JavaScript.</p>
<p class="hide">She who arrival end how fertile enabled. Brother she add yet see minuter natural smiling article painted. Themselves at dispatched interested insensible am be prosperous reasonably it. In either so spring wished. Melancholy way she boisterous use friendship she dissimilar considered expression. Sex quick arose mrs lived. Mr things do plenty others an vanity myself waited to. Always parish tastes at as mr father dining at.

Must you with him from him her were more. In eldest be it result should remark vanity square. Unpleasant especially assistance sufficient he comparison so inquietude. Branch one shy edward stairs turned has law wonder horses. Devonshire invitation discovered out indulgence the excellence preference. Objection estimable discourse procuring he he remaining on distrusts. Simplicity affronting inquietude for now sympathize age. She meant new their sex could defer child. An lose at quit to life do dull </p>
<button>Hide the text above</button>
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script type="text/javascript" src="javascript.js"></script>
<style type="text/css">
  p {
    margin-bottom: 1rem;
    color: tomato;
  }
</style>
```
```javascript
#javascript.js
$('button').on('click', function() {
  $('p.hide').css('display', 'none');
});
```
Commit & tạo tag v1.3:
```
$ git commit ...
$ git tag -a v1.3 -m "Add css + js"
```
```bash
$ git show v1.3
tag v1.3
Tagger: my_repo_name <test@gmail.com>
Date:   Wed Mar 20 16:51:20 2019 +0700

Add css + js

commit 894bb188d08d31ffc39d1249e9cdca4afcfcc283
Author: my_repo_name <test@gmail.com>
Date:   Wed Mar 20 16:50:49 2019 +0700

    Add css + js

diff --git a/index.html b/index.html
index 5806f69..d7ae380 100644
--- a/index.html
+++ b/index.html
@@ -4,3 +4,11 @@
 
 Must you with him from him her were more. In eldest be it result should remark vanity square. Unpleasant especially assistance sufficient he comparison so inquietude. Branch one shy edward stairs turned has law wonder horses. Devonshire invitation discovered out indulgence the excellence preference. Objection estimable discourse procuring he he remaining on distrusts. Simplicity affronting inquietude for now sympathize age. She meant new their sex could defer child. An lose at quit to life do dull </p>
 <button>Hide the text above</button>
+<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
+<script type="text/javascript" src="javascript.js"></script>
+<style type="text/css">
+  p {
+    margin-bottom: 1rem;
+    color: tomato;
+  }
+</style>
diff --git a/javascript.js b/javascript.js
new file mode 100644
index 0000000..de38f94
--- /dev/null
+++ b/javascript.js
@@ -0,0 +1,3 @@
+$('button').on('click', function() {
+  $('p.hide').css('display', 'none');
+});
```
Sau đó push:
```
$ git push
$ git push origin v1.3
```
Trên github:
![](https://images.viblo.asia/7e49352a-f28d-49ca-be06-d827240703d7.png)

## Summary
Bài viết nhằm chia sẻ về `git tag` và ứng dụng của nó trong việc quản lý version code của 1 project. Bài viết còn nhiều hạn chế, cảm ơn bạn đã dành thời gian theo dõi.

Nguồn và tài liệu tham khảo:
* https://dev.to/emmawedekind/using-git-tags-to-version-coding-tutorials-39cc
* https://git-scm.com/book/en/v2/Git-Basics-Tagging