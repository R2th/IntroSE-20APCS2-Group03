Mình đang lập trình bằng máy MacBook, ở cứng có 128GB. Trong khi đó để lập trình thì cần cài khá nhiều phần mềm chiếm dung lượng lớn, như Xcode, Docker, VMWare. Vì vậy, mình thường xuyên nhận được thông báo về Disk Storage trên hệ thống và phải đi xoá những file cũ không dùng nữa. 
Mình muốn chia sẻ với các bạn một số câu lệnh đơn giản để tăng dung lượng trống cho ở cứng.

Xoá images và containers của docker
```bash
docker system prune -f 
```

Xoá node_modules mà không có update trong vòng 30 ngày

```bash
### Cleanup old node_modules
echo "Cleaning node_modules in projects older than 30 days"
find . -name "node_modules" -type d -mtime +30 | xargs rm -rf
echo "Done cleaning node_modules"
```

Làm sạch homebrew

```bash
# Clean up homebrew
echo "Clean homebrew"
brew update && brew upgrade && brew cleanup
echo "Done cleaning homebrew"
```

Xoá gem đã outdate
```bash
# Clean up outdated gems
gem cleanup
```

Nếu các bạn là lập trình viên ios, thì nên xoá pod caches và các files mà Xcode đã tạo ra trong quá trình build:
```bash
# Clean up pod caches
rm -rf "${HOME}/Library/Caches/CocoaPods"
```

```bash
# Delete old XCode simulators
xcrun simctl delete unavailable
```

```bash
# Clean up xcode junk
rm -rf ~/Library/Developer/Xcode/Archives
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf ~/Library/Developer/Xcode/iOS Device Logs/
```

Happy Coding!