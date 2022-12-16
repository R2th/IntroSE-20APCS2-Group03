Những Git repo khổng lồ với kích thước lên đến vài GB hay vài chục GB cũng không phải là chuyện hiếm gặp.
Nhất là với những dự án có nhiều file binary lớn như video game chẳng hạn. Bạn sẽ có vài chục GB asset và mỗi commit
có thể dễ dàng lên đến vài chục MB. Hoặc có thể đó là một monorepo với vài chục dự án và vài trăm thư viện dùng chung.

Ví dụ như cái này [https://github.com/chromium/chromium](https://github.com/chromium/chromium).

![git-clone-chromium.png](https://images.viblo.asia/2ee721c1-b64d-4a8c-987e-d7fc8645b770.png)

Dù đã clone với option `--depth=1` nghĩa là chỉ download 1 commit gần nhất thì dung lượng phải tải về đã lên đến hơn 1GB
và mất khoảng 3 phút để tải về với tốc độ khoảng 12MB/s. Kích thước của repo sẽ vào khoảng 4GB.

Tât nhiên nếu cả ngày bạn chỉ pull có một lần thì thôi cũng tạm chấp nhận được, trong lúc chờ đợi đi làm ly cafe luôn.
Nhưng nếu dự án của bạn sử dụng hệ thống CI nào đó mà mỗi lần build lại phải tải mấy chục GB về thì đúng là dành cả
thanh xuân chỉ để pull code 😀.

Hơn nữa đây là một monorepo với cả app desktop, iOS, Android và rất nhiều thứ nữa. Khá chắc là khi làm việc bạn sẽ không
sử dụng hết cả 4GB code đấy mà chỉ dùng 1 phần thôi.

Những phiên bản gần đây của Git đã có thêm vài tính năng mới để bạn chỉ chọn dowload những phần bạn muốn thay vì toàn
bộ mấy chục GB.

## Partial clone và sparse checkout

Để sử dụng tính năng partial clone, mình sẽ thêm option `--filter=blob:none`. Ngoài ra mình sẽ thêm cả `--no-checkout`
để chỉ clone folder `.git` mà không checkout file.

```bash
git clone --filter=blob:none --no-checkout --depth=1 https://github.com/chromium/chromium.git
```

Vì chỉ cần clone 1 commit và không tải file nào cả nên mình chỉ cần tải 11MB và xong trong nháy mắt.

![](https://images.viblo.asia/091aa889-638d-4279-b8f0-41858d1fc3a3.png)

Xong bước này thì repo mình clone về mới chỉ có mỗi folder `.git` và chưa có file nào cả.
Mình cần checkout để tải file về nữa. Nhưng không phải là toàn bộ 4GB file như ở trên mà chỉ những file mình muốn thôi.
Ví dụ mình chỉ làm phần iOS app nên mình chỉ cần folder `ios` chẳng hạn.

Mình sẽ dùng một tính năng khác của Git là *sparse checkout* như thế này.

```bash
git config core.sparseCheckout true
echo ios > .git/info/sparse-checkout
git read-tree -mu HEAD
```

2 dòng đầu là để config *sparse-checkout*. Nếu bạn có phiên bản Git mới (khoảng 2.22.0) thì bạn có thể dùng syntax mới
tiện lợi hơn như này.

```bash
git sparse-checkout init --cone
git sparse-checkout set ios
```

Checkout cũng xong trong nháy mắt. Mình chỉ cần tải về khoảng hơn 100MB.

![](https://images.viblo.asia/17ec72b7-6c88-4f9d-9cbf-bf5c75c19c1d.png)

Chỉ có folder iOS và những thứ liên quan được checkout thay vì toàn bộ repo.

![](https://images.viblo.asia/9c1203ee-bd0d-4b90-add6-906f6e56b9c7.png)

## Áp dụng cho Submodule

Việc sử dụng package hoặc thư viện của bên thứ ba trong quá trình phát triển phần mềm thì quá là bình thường rồi.
Hầu hết các ngôn ngữ lập trình đều cung cấp một kiểu package manager nào đó để người dùng có thể dễ dàng tải các package
hoặc chia sẻ package với mọi người. Tuy nhiên có những lúc bạn không thể sử dụng package manager mặc dù source code
của package có thể dễ dàng tìm thấy trên Github, Gitlab. Có thể là bạn muốn build package với option khác
(với biến SCSS khác chẳng hạn) với bản được cung cấp thông qua package manager.
Hoặc đơn giả là tác giả không publish package đấy lên package manager nào cả.
Giải pháp là đưa repo chứa package kia vào trong repo của bạn dưới dạng một *submodule*.

Với những package đơn giản nằm ở riêng một repo thì đơn giản rồi. Tuy nhiên có những package nằm trong một monorepo khác
lớn hơn và cũng tương tự như trên, bạn chỉ quan tâm đến package bạn muốn thôi.

Cách làm cũng tương tự, thêm một chút submodule thôi. Ở đây mình sẽ cần init submodule một cách thủ công thay vì để
git clone hộ mình, vì nó sẽ lại tải mấy chục GB về mất.

```bash
git submodule init chromium
cd chromium
git init
# Dùng `git config` để lấy submodule clone URL
git remote add origin $(git -C .. config submodule.chromium.url)
```

Tiếp theo sẽ là dùng git fetch để fetch commit tương ứng với submodule hiện tại.
Ở đây hơi khác phần trên một chút, mình không thể dùng git clone vì nó sẽ clone commit mới nhất của branch, và với
`--depth=1` thì sẽ không có history nên sẽ không có cách nào để quay về commit mình muốn.

```bash
# Set config này để dùng được `--filter=blob:none` với git fetch
git config extensions.partialClone origin
# Fetch commit tương ứng với submodule
git fetch --filter=blob:none --depth=1 origin $(git -C .. ls-tree -r HEAD chromium | awk '{print $3}')
```

Phần tiếp theo thì giống như trên rồi, nếu bạn có git version mới thì bạn cũng có thể dùng syntax mới.
Chỗ checkout mình sẽ dùng SHA của commit tương ứng với submodule thay vì `HEAD`.

```bash
git config core.sparseCheckout true
echo ios > .git/info/sparse-checkout
git read-tree -mu $(git -C .. ls-tree -r HEAD chromium | awk '{print $3}')
```

Cuối cùng thì move folder `.git` của submodule vào trong `.git/modules` của repo chính, giống với behavior của `git submodule`.

```bash
git -C .. submodule absorbgitdirs
```

Đây là toàn bộ script, bạn nên lưu lại thành một file để chạy mỗi lần clone repo.

```bash
git submodule init chromium
cd chromium
git init
git remote add origin $(git -C .. config submodule.chromium.url)
git config extensions.partialClone origin
git fetch --filter=blob:none --depth=1 origin $(git -C .. ls-tree -r HEAD chromium | awk '{print $3}')
git config core.sparseCheckout true
echo ios > .git/info/sparse-checkout
git read-tree -mu $(git -C .. ls-tree -r HEAD chromium | awk '{print $3}')
git -C .. submodule absorbgitdirs
```