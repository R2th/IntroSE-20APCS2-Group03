![](https://images.viblo.asia/572d775a-15ea-40b8-8344-7ced25393fde.png)

# Git LFS là gì ?
Git là hệ thống quản lý phiên bản được phân tán, điều đó có nghĩa là toàn bộ lịch sử của repo được chuyển cho client trong suốt quá trình clone. Với những project chứa những tệp lớn, đặc biệt là những tệp thường chỉnh sửa một cách thường xuyên, bước clone ban đầu có thể mất thời gian, bởi vì mỗi phiên bản đều phải được tải về bởi người dùng. Git LFS(Large File Storage) là một tiện ích của Git được phát triển bới Github, Atlassian và một vài người đóng góp mã nguồn mở khác. Nó làm giảm sự ảnh hưởng của các tệp lớn trong repo của bạn bằng cách tải về phiên bản liên quan của tệp đó. Đặc biệt, các tệp lớn được tải về trong quá trình checkout hơn là trong quá trình clone hoặc fetching. 

Git LFS làm điều này bằng cách thay thế các tệp lớn trong repo của bạn bằng một con trỏ nhỏ. Trong suốt quá trình sử dụng, bạn sẽ không bao giờ thấy những tệp con trỏ bởi vi chúng được xử lí tự động bằng Git LFS:

1. Khi bạn thêm tệp vào trong repo của bạn, Git LFS thay thế nội dung của tệp đó với một con trỏ, và lưu trữ nội dung tệp đó trong Git LFS cache.

![](https://images.viblo.asia/58838baf-58e2-40f6-813d-59dc5701d850.png)

2. Khi bạn push một commit mới lên server, bất kì tệp Git LFS nào được tham chiếu bời commit vừa mới được push sẽ được chuyển từ Git LFS cache ở local tới Git LFS store được gắn với repo của bạn. 

![](https://images.viblo.asia/6d54e590-4615-4633-b80d-e11b31f09974.png)

3. Khi bạn checkout một commit có chứa con trỏ Git LFS, chúng sẽ được thay thế với tệp từ Git LFS cache của bạn hoặc từ Git LFS store.
![](https://images.viblo.asia/aa1437b4-6587-4471-9ef0-67d96ffb6824.png)


Git LFS rất uyển chuyển : khi bạn làm việc bạn chỉ thấy nội dung tệp. Điều đó có nghĩa bạn có thể sử dụng Git LFS mà không làm thay đổi Git flow hiện tại trong project. Bạn đơn giản `git add` `git commit` như bình thường. `git clone` , `git pull` sẽ nhanh hơn đáng kể bởi vì bạn chỉ tải về phiên bản của tệp được tham chiếu bởi commit. 


# Cách dùng Git LFS
## Cài đặt
1. Có 3 cách dễ dàng để cài Git LFS đó là :
* Cài nó thông qua các bộ quản lý package. 
* Tải về và cài từ từ trang chủ
* Cài thông qua bên thứ 3

2. Khi git-lfs đã được cài trên máy của bạn, chạy git lfs install để khởi tạo Git LFS. 
```
$ git lfs install Git LFS initialized.
```
Bạn chỉ cần chạy `git lfs install` một lần. Một khi đã được khởi tạo, Git LFS tự khởi động mỗi khi bạn clone 1 repo có chứa nội dung Git LFS.

## Tạo một Git LFS repo mới
Để tạo mới một Git LFS repo , bạn cần chạy git lfs install sau khi tạo repo: 
```
# initialize Git $ mkdir Atlasteroids $ cd Atlasteroids $ git init Initialized empty Git repository in /Users/tpettersen/Atlasteroids/.git/ # initialize Git LFS $ git lfs install Updated pre-push hook. Git LFS initialized. 
```
## Clone 1 repo Git LFS
Khi Git LFS đã được cài đặt bạn có thể clone Git LFS repo như bình thường khi sử dụng `git clone` trong lúc cuối quá trình clone Git sẽ checkout nhánh mặc định thường là master, và bất kì tệp Git LFS nào sẽ được tự động tải về để hoàn tất quá trình clone cho bạn.

```
$ git clone git@bitbucket.org:tpettersen/Atlasteroids.git Cloning into 'Atlasteroids'... remote: Counting objects: 156, done. remote: Compressing objects: 100% (154/154), done. remote: Total 156 (delta 87), reused 0 (delta 0) Receiving objects: 100% (156/156), 54.04 KiB | 31.00 KiB/s, done. Resolving deltas: 100% (87/87), done. Checking connectivity... done. Downloading Assets/Sprites/projectiles-spritesheet.png (21.14 KB) Downloading Assets/Sprites/productlogos_cmyk-spritesheet.png (301.96 KB) Downloading Assets/Sprites/shuttle2.png (1.62 KB) Downloading Assets/Sprites/space1.png (1.11 MB) Checking out files: 100% (81/81), done. 
```
Có  4 tệp PNG trong repo này được theo dõi bởi Git LFS. Khi bạn clone, Git LFS sẽ tải về các tệp đó một lần

## Tăng tốc clone
Nếu bạn đang clone 1 repo có nhiều tệp Git LFS, `git lfs clone` sẽ tạo ra performance tốt hơn nhiều :

```
$ git lfs clone git@bitbucket.org:tpettersen/Atlasteroids.git Cloning into 'Atlasteroids'... remote: Counting objects: 156, done. remote: Compressing objects: 100% (154/154), done. remote: Total 156 (delta 87), reused 0 (delta 0) Receiving objects: 100% (156/156), 54.04 KiB | 0 bytes/s, done. Resolving deltas: 100% (87/87), done. Checking connectivity... done. Git LFS: (4 of 4 files) 1.14 MB / 1.15 MB 
```

Không tải về tệp Git LFS một lần tại một thời điểm, `git lfs clone` sẽ đợi khi toàn bộ quá trình checkout kết thúc và download các tệp Git LFS như một batch. Điều này sẽ tận dụng khả nẳng tải về song song, và giảm đáng kể số lượng HTTP request và các process được sinh ra.

## Pull và checkout

Giống như quá trình clone, bạn có thể pull từ Git LFS repo sử dụng `git pull`. Bất kì tệp Git LFS cần thiết sẽ được tải về như một phần của quá trình checkout tự động 

```
$ git pull Updating 4784e9d..7039f0a Downloading Assets/Sprites/powerup.png (21.14 KB) Fast-forward Assets/Sprites/powerup.png | 3 + Assets/Sprites/powerup.png.meta | 4133 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 2 files changed, 4136 insertions(+) create mode 100644 Assets/Sprites/projectiles-spritesheet.png create mode 100644 Assets/Sprites/projectiles-spritesheet.png.meta 
```


## Tăng tốc pull

Tương tự `git lfs clone`, `git lfs pull` sẽ tải các tệp Git LFS về như là một batch.

## Fetch nhiều lịch sử Git LFS
Git LFS thực sự chỉ tải về các file cần thiết cho commit. Nhưng bạn có thể bắt Git LFS tải về nhiều nội dung hơn cho các branch được thay đổi gần đây sử dụng git lfs --recent.

```
$ git lfs fetch --recent Fetching master Git LFS: (0 of 0 files, 14 skipped) 0 B / 0 B, 2.83 MB skipped Fetching recent branches within 7 days Fetching origin/power-ups Git LFS: (8 of 8 files, 4 skipped) 408.42 KB / 408.42 KB, 2.81 MB skipped Fetching origin/more-music Git LFS: (1 of 1 files, 14 skipped) 1.68 MB / 1.68 MB, 2.83 MB skipped 
```

Điều này rất hữu ích khi bạn tải về theo batch các nội dung Git LFS trong khi đang bận. 
Git LFS sẽ cho các nhánh hoặc tag chứa các commit trong vài 7 ngày gần đây là các **recent**. Con số này bạn cũng có thể config lại bằng cách thay đổi setting lfs.fetchrecentrefsdays

```
# download Git LFS content for branches or tags updated in the last 10 days $ git config lfs.fetchrecentrefsdays 10 
```

Mặc định, `git lfs fetch --recent` sẽ chỉ tải về các nội dung Git LFS commit ở đầu các nhánh gần đây hoặc tag gần đây.
![](https://images.viblo.asia/2f84fad5-442f-4b90-bff1-b59e712f0acd.png)

Tuy nhiên bạn cũng có thể cấu hình để Git LFS tải về các nội dung của các commit sớm hơn.

```
# download the latest 3 days of Git LFS content for each recent branch or tag $ git config lfs.fetchrecentcommitsdays 3 
```

![](https://images.viblo.asia/78b087b2-9bb6-4a11-9880-c016367fd3a1.png)


Bạn cũng có thẻ tải về toàn bộ nội dung Git LFS bằng cách sử dụng `git lfs fetch --all`

## Xóa các tệp Git LFS local

Bạn có thể xóa các tệp Git LFS ở Git LFS cache trong local bằng cách sử dụng `git lfs prune`.

Nó sẽ xóa tất cả các tệp Git LFS được cho là cũ. Một tệp cũ là tệp không được tham chiếu bởi :

* Commit đang được checkout
* Commit chưa được push
* Commit gần đây

Mặc định thì commit gần đây là commit được tạo trong vòng 10 ngày trở lại đây. GIá trị này bằng tổng của :
* Giá trị của lfs.fetchrecentrefsdays ( mặc định là 7)
* Giá trị lfs.pruneoffsetdays ( mặc định là 3)

![](https://images.viblo.asia/b8d747ab-f4e5-47d5-bf73-2ace1a495985.png)

Bạn cũng có thể config cho 1 khoảng thời gian lâu hơn :

```
# don't prune commits younger than four weeks (7 + 21) $ git config lfs.pruneoffsetdays 21 
```

Không giống như hệ thống garbage collection có sẵn trong Git, nội dung Git LFS không được xóa một cách tự động, do đó việc chạy `git lfs prune` là ý tưởng cơ bản để giữ size code giảm nhỏ.

## Giới hạn tệp Git LFS
Trong một vài tình huống bạn muốn chỉ tải về một tệp con của các nội dung Git LFS cho một commit cụ thể. Bạn có thể sử dụng câu lệnh sau 
```
$ git lfs fetch -X "Assets/**" 
```

hoặc chỉ 1 số file nhất định

```
$ git lfs fetch -I "*.ogg,*.wav" 
```

hoặc kết hợp cả 2

```
$ git lfs fetch -I "Assets/**" -X "*.gif" 
```

# Kết luận
Git LFS là một công cụ extension rất hay khi làm việc Git và các tệp lớn. Hi vọng bài viết này đã giúp các bạn hiểu cơ bản về Git LFS, cách thức hoạt động cũng như một sổ chỉ dẫn cơ bản. Hẹn gặp lại các bạn.

# Tham khảo
https://medium.com/swlh/learning-about-git-large-file-system-lfs-72e0c86cfbaf
https://medium.com/junior-dev/how-to-use-git-lfs-large-file-storage-to-push-large-files-to-github-41c8db1e2d65
https://www.atlassian.com/git/tutorials/git-lfs