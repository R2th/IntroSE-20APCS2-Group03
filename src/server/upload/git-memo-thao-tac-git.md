Dưới đây sẽ memo lại các thao tác khi sử dụng Git

### Thác tác thông thường
1. **Di chuyển đến folder dự án**
```
cd [project path]
```

2. **Tạo branch mới**
 ```
git checkout -b [branch name]
```

Tạo branch test và di chuyển đến branch test

3. **Kiểm tra có file thay đổi không**
```
git status
```

4. **Kiểm tra những phần thay đổi**
```
git status
```

5. **Commit phần thay đổi**
```
git add [ファイル名]
```

・git commit
```
git commit -m "[comment]"
```

6. **Phản ánh những nội ndung mới nhất từ master**
Di chuyển sang branch master
```
git checkout master
```

7. **Pull code mới nhất**
```
git pull origin master
```

8. **Di chuyển về branch làm việc**
```
git checkout [branch name]
```

9. **Phản ánh code mới nhất vào branch làm việc**
```
git merge master
```

10. **Phản ánh nội dung thay đổi**
```
git push origin [branch name]
```

11. **Merge phần thay đổi vào master**
Mở gitlab và approve request merge sẽ kết thúc