# 1. Git là gì

Git quản lý và theo dõi các thay đổi trên các nhánh khác nhau. So sánh các thay đổi giữa mỗi loại. Mục đích của git là quản lý mã nguồn.
Cách thức hoạt động của git gồm 3 phần:
- Repository.
- Staging index.
- Local branch (working branch).

Người dùng có thể clone repository  -> Tạo new working branch -> Sau khi một số thay đổi đã được thực hiện, người dùng thêm những thay đổi mới vào staging index -> Commit / Push thay đổi vào repository.
![](https://images.viblo.asia/4f363436-cc05-42a5-b6e2-da8e0c1c5f01.png)

# 2. Clone GIthub repository
- Để clone 1 repository có sẵn ở trên máy cục bộ, bạn hãy sử dụng dòng lệnh sau:
``` 
git clone /đường-dẫn-đến/repository/ 
```

- Nếu repository đó ở máy chủ khác thì bạn hãy gõ dòng lệnh sau:
``` 
git clone tênusername@địachỉmáychủ:/đường-dẫn-đến/repository
```

# 3. Create new local branch
- Để tạo new local branch thì chúng ta cần dùng lệnh sau:
```
git branch <NAME_OF_YOUR_NEW_BRANCH>
```

# 4. Delete branch
- Để xóa local branch
```
git branch -d <NAME_OF_THE_BRANCH>
```
- Để remote branch
```
git push origin --delete <NAME_OF_THE_BRANCH> 
```

# 5. Push change to a branch
![](https://images.viblo.asia/4187d72d-9fa1-40b2-8851-afb2cb95f592.jpeg)

-  Nếu bạn muốn check status branch của bạn đã thay đổi những file nào thì dùng lệnh:
```
git status
```

- Nếu muốn Add tất cả các file đến staging index thì dùng lệnh:
```
git add .
```

- Nếu chỉ muốn Add 1 file đến staging index thì dùng lệnh:
```
git add YOUR_FILE
```

- Nếu bạn muốn commit code thì dùng lệnh:
```
git commit -m ”YOUR_MESSAGE”
```

# 6. Where Am I
- Nếu muốn biết mình đang ở nhánh nào
```
git branch
```

# 7. Switch to another branch
- Nếu muốn chuyển nhánh thì ta dùng lệnh sau:
```
git checkout <NAME_OF_OTHER_BRANCH>
```

# 8. Log
- Muốn xem những thay đổi mà mọi người đã committed.
```
git log
```
- Muốn hiển thị các commited từ ngày đó đến hôm nay.
```
git log --since=2018-12-14
```
- Muốn hiển thị các commited đến ngày đó.
```
git log --until=2018-12-14
```
- Muốn hiển thị các committed từ  `SOME_USER`
```
git log --author="SOME_USER"
```

# 9. Additional
- Trong trường hợp bạn làm sai điều gì đó, bạn có thể thay đổi bằng lệnh sau:
```
git checkout -- <tên-tập-tin>
```
- Nếu bạn muốn hủy tất cả thay đổi, lấy về (fetch) lịch sử gần đây nhất từ máy chủ và trỏ nhánh master local vào nó như sau
```
git fetch origin
```
```
git reset --hard origin/master
```

# 10. Vậy lợi ích của Git là gì
- Sắp xếp công việc tốt hơn nghĩa là bạn có thể làm việc ở bất cứ đâu vì chỉ cần clone mã nguồn từ kho chứa hoặc clone một phiên bản thay đổi nào đó từ kho chứa, hoặc một nhánh nào đó từ kho chứa.
- Linh hoạt hơn khi phải làm cùng lúc nhiều task, bởi vì bạn có thể cấu trúc công việc dể dàng.

**Nguồn tham khảo:**
- https://git-scm.com/book/en/v2
- https://medium.com/@stiipe/git-commands-that-every-software-tester-should-know-59c74cfd736f
- https://www.infoq.com/news/2017/07/github-testers