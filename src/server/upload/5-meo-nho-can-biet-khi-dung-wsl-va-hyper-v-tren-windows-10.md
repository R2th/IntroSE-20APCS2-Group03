Bài viết này không chứa nhiều hàm lượng kỹ thuật. Nó đơn giản chỉ là một vài mẹo nhỏ nhưng lại cực kỳ hữu ích mà bạn nên biết khi sử dụng WSL2 và HyperV trên Windows 10.

## 1. Tạo máy ảo Hyper-V cực nhanh từ vdisk

Nếu bạn đã đọc các bài viết về chủ đề Hyper-V của mình như cách cài máy ảo Ubuntu, Debian 10. Trong bài viết đó, bạn sẽ download file cài dạng ISO từ trang chủ của Ubuntu/Debian và tiến hành cài đặt. Sau khi cài đặt xong bạn có thể SSH vào và cài thêm phần mềm các kiểu. Lẽ nào mỗi lần muốn tạo một máy ảo, mình sẽ phải lặp lại các bước như vậy mãi hay sao?

Tất nhiên không phải vậy, chúng ta chỉ cần thực hiện một lần đầu tiên để tạo ra máy ảo cơ sở ban đầu - chứa các cấu hình mạng, cấu hình user, cài đặt các phần mềm/tools cần thiết: docker, ssh... Mỗi máy ảo Hyper-V sẽ có một file có đuôi `*.vhdx` - chính là virtual disk (tạm hiểu là cái ổ cứng ảo) của VM đó. Và chúng ta có thể dùng file này để nhân bản ra nhiều VM khác nhanh chóng mà không phải lặp lại các bước cài đặt như với VM đầu tiên.

![](https://images.viblo.asia/62e6bedc-caab-430e-aaf5-e3f39be19b80.png)

## 2. Sử dụng Tmux hoặc app tương tự

Khi sử dụng WSL2, chúng ta có nguyên một bản Ubuntu/Debian ngay trên Windows để sử dụng. Hãy dùng thêm các phần mềm Tmux, Terminator... để có thể giúp chúng ta chi nhỏ 1 màn hình terminal thành nhiều cái nhỏ hơn. VD với Tmux sẽ như bên dưới:

![](https://images.viblo.asia/785e347a-a956-4481-8e64-c84b28041dd3.png)

Ngoài ra, các phần mềm này cũng có rất nhiều tính năng hữu ích như session: giúp giữ các tab terminal vẫn hoạt động ngay cả khi cửa sổ bị đóng, khi bạn mở lại mọi thứ vẫn còn đó; Status bar giúp hiển thị thêm các thông tin bạn muốn: thời gian, thời lương pin.. Và hơn cả là một loạt các phím tắt tiện lợi.

## 3. Xử lý vấn đề Ubuntu WSL2 chiếm cả trăm GB ổ cứng

Sau một thời gian sử dụng Ubuntu WSL (chẳng hạn), bạn có thể sẽ thấy cái ứng dụng này chiếm cả 70GB, 90GB hoặc cả trăm GB ổ cứng. Dù bạn có xóa bỏ các nội dung trong Ubuntu WSL như nào thì dung lượng thật của ổ đĩa của bạn vẫn không giữ nguyên mà không giảm.

MÌnh cũng đã rơi vào tình cảnh cái distro Ubuntu WSL2 ngốn 60GB ổ cứng trong khi đó thực tế phân tích dữ liệu bằng tool `ncdu`:

```bash
sudo ncdu --exclude /mnt
```

thì chỉ hết khoảng 40GB.

Hyper-V có cung cấp lệnh [Optimize-VHD](https://docs.microsoft.com/en-us/powershell/module/hyper-v/optimize-vhd?view=windowsserver2019-ps), bạn có thể dùng nó để lấy lại dung lượng ổ cứng:

```bash
Optimize-VHD -Path <vdisk_file.vhdx> -Mode full
```

Đối với distro Ubuntu như trên máy mình thì file vdisk được lưu tại: `C:\Users\kimng\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu18.04onWindows_79rhkp1fndgsc\LocalState\ext4.vhdx`.

Nếu máy bạn không tồn tại lệnh `Optimize-VHD`, bạn có thể sử dụng diskpart để làm điều tương tự. Bằng cách mở CMD với quyền Administrator. Và thực hiện lệnh sau:

```bash
wsl --shutdown
diskpart
# open window Diskpart
select vdisk file="C:\WSL-Distros\…\ext4.vhdx"
attach vdisk readonly
compact vdisk
detach vdisk
exit
```

> Theo issue trên repo [microsoft/WSL](https://github.com/microsoft/WSL/issues/4699).

## 4. Hiển thị thêm tên Cluster/Docker đang xử dụng

Nếu bạn đang connect tới nhiều K8s cluster, nhiều Docker host. Bạn nên cấu hình thêm việc hiển thị tên cluster/docker host đang dùng trên status bar của Tmux chẳng hạn để tránh bị nhầm lẫn.

![](https://images.viblo.asia/9125092a-0d02-4317-aaba-df91c54d0c4c.png)

VD: `webee-local:default` là tên cluster và tên namespace đang sử dụng.

Với TMUX, mình đang sử dụng plugin này để làm điều đó: https://github.com/jonmosco/kube-tmux.

## 5. Duyệt file trong Ubuntu WSL bằng File Explorer

Trong Windows File Explorer, bạn có thể gõ path bắt đầu bằng `\\wsl$` để truy cập tới các folder nằm trong vdisk của các distro như Ubuntu, Debian... Bạn cũng có thể tạo pin các thư mục hay truy cập vào `Quick access` của File Explorer cho tiện truy cập.

![](https://images.viblo.asia/479d91f2-7c21-49f5-96a7-657ccacb4725.png)

Trên đây là 5 mẹo nhỏ của mình, nếu bạn có thể tips nào nữa, hãy comment phía dưới để mình cùng học hỏi nhé. Mời các bạn đọc thêm các bài viết khác của mình tại https://viblo.asia/u/huukimit. Đừng quên cho mình một upvote nhé! :wink:

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***