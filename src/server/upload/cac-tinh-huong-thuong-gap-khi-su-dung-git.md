Để thông thạo Git, bạn ko chỉ cần học thuộc các Git commands, mà cần phải hiểu trong tình huống nào nên sử dụng câu lệnh nào cho hợp lý. Dưới đây là một số trường hợp mà chắc ai cũng từng gặp phải:

- *"Tôi commit nhầm rồi, phải làm sao đây?"*
- *"Lịch sử commit của tôi nhìn lộn xộn quá, nên dọn dẹp thế nào nhỉ?"*

[Aditya Sridhar](https://adityasridhar.com/) sẽ giúp chúng ta giải quyết những câu hỏi đó qua bài viết sau đây.

## Commit nhầm T_T

### Tình huống 1

Bạn vừa thực hiện 1 commit với rất nhiều files, và nhận ra commit message không rõ ràng lắm, giờ bạn muốn sửa nghe cho hay hơn. Bạn chỉ cần sử dụng `git commit --amend`

```
git commit --amend -m "Commit message mới"
```

### Tình huống 2

Bạn muốn commit 6 files, thế mà loay hoay thế nào lại quên mất 1 file. Liệu bạn có nên tạo 1 commit mới với mỗi file đó?

Thực ra lựa chọn như vậy cũng ko vấn đề gì, nhưng commit history của bạn sẽ ko gọn gàng tẹo nào. Bạn nên nhét file đó vào commit ngay từ đầu của bạn thì hay hơn.

```
git add file6
git commit --amend --no-edit
```

`--no-edit` nghĩa là không thay đổi commit message.

### Tình huống 3

Mỗi khi bạn thực hiện 1 commit, commit đó sẽ luôn có thông tin của tên và email người tạo. Bình thường thì khi setup Git lần đầu tiên, bạn sẽ khai báo tên và email của mình để khỏi phải lo lắng mỗi lần commit.

Sẽ có 1 dự án nào đó mà bạn muốn sử dụng email khác đi, lúc đó bạn cần dùng `git config`.

```
git config user.email "email của bạn"
```

Vấn đề xảy ra khi bạn đã thực hiện commit rồi mà quên chưa thay đổi email. Khi đấy, bạn có thể thay đổi các thông tin name hay email của người tạo bằng câu lệnh sau:

```
git commit --amend --author "AuthorName <Author Email>"
```

### Lưu ý

Chỉ sử dụng `amend` trong local repository của bạn. Việc sử dụng `amend` ở remote repository có thể làm mọi thứ trở nên lộn xộn.

## Commit history nhìn phát sợ T_T

Bây giờ, hãy tưởng tượng là bạn đang code 1 chức năng đòi hỏi 10 ngày mới có thể xong được. Trong lúc đó, rất nhiều devs khác cũng tiến hành commit code lên remote repository.

Để tránh conflicts lằng nhằng sau này, bạn quyết định sẽ update local repository thường xuyên, 2-3 ngày 1 lần với code trên remote repository.

Mỗi lần bạn pull code từ remote repository về local repository, 1 merge commit mới sẽ được tạo ra ở local repository của bạn. Điều đó đồng nghĩa với việc local commit history của bạn tràn ngập các merge commits, gây khó khăn cho người review.

![commit history](https://images.viblo.asia/83f21deb-2e02-42bf-961e-7c05207f9111.jpeg)

### Làm cách nào để commit history gọn gàng hơn?

Hãy sử dụng `rebase`.

![example](https://images.viblo.asia/a166ae33-b271-4b95-84e0-4780cf37e1bf.jpeg)

1. Nhánh Release có 3 commits: Rcommit1, Rcommit2 và Rcommit3.
2. Nhánh Feature được bạn tách ra từ nhánh Release lúc mới chỉ có Rcommit1.
3. Bạn đã tạo 2 commit trên nhánh Feature, đó là Fcommit1 và Fcommit2.
4. Mong muốn của bạn là đưa các commits từ nhánh Release sang nhánh Feature.
5. Bạn muốn sử dụng `rebase`.
6. Tên của nhánh Release là *release*, tên của nhánh Feature là *feature*.
7. Câu lệnh bạn sử dụng sẽ là:

```
git checkout feature
git rebase release
```

Rebase sẽ cố gắng thêm từng commit vào, và check conflict.

![rebasing](https://images.viblo.asia/65d6fe02-8266-49d5-9fe6-f5f6e8236c55.jpeg)

**Step 1**

1. Ngay khi bạn chạy lệnh `rebase`, nhánh Feature sẽ được trỏ đến đầu (head) của nhánh Release.
2. Có nghĩa là bây giờ nhánh Feature có 3 commits: Rcommit1, Rcommit2, Rcommit3.
3. Bạn đang tò mò không biết điều gì xảy ra với Fcommit1 và Fcommit2?
4. Yên tâm, 2 commits đó vẫn ở đây và được sử dụng cho các steps sau.

**Step 2**

1. Git cố gắng thêm Fcommit1 vào nhánh Feature.
2. Nếu ko có conflict nào, Fcommit1 sẽ được thêm vào sau Rcommit3.
3. Nếu có conflict, Git sẽ thông báo cho bạn, và bạn phải tự giải quyết vấn đề đó.

**Step 3**

1. Khi Fcommit1 đã được thêm vào, Git tiếp tục cố gắng thêm Fcommit2.
2. Nếu ko có conflict nào, Fcommit2 sẽ được thêm vào sau Fcommit1. Rebase thành công.
3. Nếu có conflict, Git sẽ thông báo cho bạn, và bạn phải tự giải quyết vấn đề đó.
4. Sau khi rebase hoàn thành, bạn sẽ nhận thấy Feature branch có Rcommit1, Rcommit2, Rcommit3, Fcommit1 và Fcommit2.

### Lưu ý

1. Cả `rebase` và `merge` đều hữu dụng, ko có cái nào thực sự tốt hơn cái còn lại.
2. Nếu bạn sử dụng `merge`, bạn sẽ có thêm 1 merge commit. Nếu bạn sử dụng `rebase`, bạn ko có thêm commit nào.
3. Hãy sử dụng `rebase` khi muốn update local repository với code mới nhất ở remote repository. Còn `merge` hãy sử dụng với pull requests khi muốn merge nhánh Feature lại nhánh Release hoặc nhánh Master.

---

*Source*: [How to become a Git expert](https://medium.freecodecamp.org/how-to-become-a-git-expert-e7c38bf54826)