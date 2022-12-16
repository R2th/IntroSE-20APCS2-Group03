# Git Cherry-pick
Đối với junior, khi bắt đầu với Git nâng cao thì có muôn vàn vấn đê cần gặp phải. Và cũng có nhiều khái niệm khi nghe lần đầu chúng ta đều thấy bỡ ngỡ.

Hôm nay mình xin giới thiệu về `git cherry-pick`. 
## Khái niệm:

```
git-cherry-pick - Apply the changes introduced by some existing commits
```
Hiểu một cách chi tiết, `cherry-pick` là một cách để checkout một commit tại branch nhất định về branch hiện tại.

## Cú pháp

```
git cherry-pick [--edit] [-n] [-m parent-number] [-s] [-x] [--ff]
		  [-S[<keyid>]] <commit>…​
git cherry-pick --continue
git cherry-pick --quit
git cherry-pick --abort
```

## Ví dụ
Yêu cầu: apply code từ commit F của nhánh dev về nhánh rel_2.3
![](https://images.viblo.asia/099e65eb-c8d6-4871-af82-a0b099dce187.png)
```
$ git checkout rel_2.3 # Đầu tiên ta checkout về nhánh rel_2.3
$ git cherry-pick dev~2
#Hoặc cũng có thể viết : 
$ git cherry-pick F # F ở đây là hash commit
```
Kết quả:

![](https://images.viblo.asia/83664572-df3b-42c1-bb99-72d1cd55b217.png)

Nhánh rel_2.3 đã được apply code từ commit F của nhánh dev.
Việc cần làm tiếp theo là sửa conflig như rebase và merge bình thường.
## Cherry-pick và Merge
- Ơ! Nếu thế thì tại sao ta lại không dùng `merge` trong trường hợp này nhỉ.
- Câu trả lời là: Merge sẽ lấy `commit cuối cùng` của nhánh `dev` tức `H` để áp dụng vào nhánh rel_2.3
Tức: ![](https://images.viblo.asia/ce3195a5-6a80-46c4-92aa-e2e91da9c7e5.png)

## Tài liệu tham khảo
https://git-scm.com/docs/git-cherry-pick

https://stackoverflow.com/questions/9339429/what-does-cherry-picking-a-commit-with-git-mean

https://nathanhoad.net/how-to-cherry-pick-changes-with-git