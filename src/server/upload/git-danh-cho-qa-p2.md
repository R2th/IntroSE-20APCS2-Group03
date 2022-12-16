# 4. Một số lệnh Git thường dùng khác
a. Để trỏ resource của bạn sang commit nào đó thì thực hiện các bước sau:

**Bước 1**: Xem tất cả các commit bằng câu lệnh `git log` .  Màn hình hiển thị kết quả như sau:

```
commit 6c244e5d472a34d7ed1af275a5545c22d459e0d8
Merge: 65b112f a902d74
Author: Giang Tran <giang-tran@Giangs-MacBook-Pro-2.local>
Date:   Fri Nov 16 09:45:34 2018 +0700

    Fix conflict

commit 65b112f9e2a740fb9944febd5006cc330da7e98b
Author: Giang Tran <giang-tran@Giangs-MacBook-Pro-2.local>
Date:   Fri Nov 16 09:44:17 2018 +0700

    Remove log debug
```

**Bước 2**: Chuyển sang commit mong muốn, ví dụ commit 65b112f9e2a740fb9944febd5006cc330da7e98b, dùng câu lệnh:

```
git checkout 65b112f9e2a740fb9944febd5006cc330da7e98b
```

b.  Dùng câu lệnh `git diff` để kiểm tra sự khác nhau. 

Theo mặc định,  nếu gõ `git diff` thì nó sẽ kiểm tra sự khác nhau giữa  2 commit gần nhất. 
Mở rộng ra, có thể so sánh sự khác nhau giữa 2 branch, 2 tag. 
Ví dụ bạn có 2 branch là test1 và test2 và bạn muốn kiểm tra sự khác nhau giữa 2 branch này thì dùng: 

```
git diff test1 test2
```

c. Xóa branch

Để xóa branch, bạn chỉ cần chỉ định lựa chọn -d trong lệnh branch rồi thực hiện.

```
git branch -d <branchname>
```

- Ví dụ để xóa branch test1, hãy thực hiện lệnh sau.

```
git branch -d test1
Deleted branch test1 (was b2b23c4).
```

- Kiểm tra lại các branch đang có, dùng: 

```
git branch
* master
* stable/4.2.x
```

d. Trong quá trình làm việc, có những lúc bạn muốn khôi phục một file hoặc tất cả các file mà bạn đã thay đổi về trạng thái gần nhất trước khi sửa.

- Ví dụ bạn muốn khôi phục về 1 file bất kỳ, chẳng hạn file có đường dẫn là `d:/data/mytest.robot` thì dùng câu lệnh sau:

```
git checkout d:/data/mytest.robot
```

Câu lệnh này sẽ trả về file `mytest.robot` ở trạng thái trước khi bạn thay đổi. 

- Ví dụ bạn muốn khôi phục về tất cả các file về trạng thái trước khi sửa, thì dùng câu lệnh sau:

```
git reset --hard
```

Với câu lệnh này nó sẽ loại bỏ tất cả các thay đổi gần đây, và đưa về trạng thái trước khi sửa.

e. Khi bạn hoàn thành kiểm tra code và muốn release bản code này, thông thường mình sẽ tạo 1 bản để đánh dấu version hoàn thiện. Lúc này mình sẽ dùng `git tag` để làm điều đó.

Ví dụ khi bạn viết hoàn chỉnh phần code cho 3 tính năng đăng nhập, đăng xuất và tạo tài khoản, và muốn đánh dấu bản này để release, chẳng hạn version 1.0.0-RELEASE, thì dùng câu lệnh git như sau:

```
git tag 1.0.0-RELEASE
git push origin 1.0.0-RELEASE
```

f. Tương tự nếu chẳng may bạn muốn xóa tag do sai xót khi release, bạn dùng câu lệnh sau:

```
git tag -d 1.0.0-RELEASE
git push origin :refs/tags/1.0.0-RELEASE
```
..............................................................

**Tài liệu tham khảo:** 

* Phần 1: https://viblo.asia/p/git-danh-cho-qa-p1-WAyK8LOpKxX
* https://git-scm.com/book/en/v1/Git-Basics