![](https://images.viblo.asia/5791e6e1-4bba-45bb-a860-7f20d1992bd2.png)
Trong mỗi máy tính phổ biến hiện nay , có 2 loại memory chính.

Loại đầu tiên đó là RAM (random access memory) được sử dụng để lưu trữ dữ liệu hay các chương trinh đang thực sự chạy trong máy tính . Thực tế thì các chương trình và dữ liệu không thể được sử dụng bởi máy tính trừ khi chúng được lưu trữ trong RAM . Dữ liệu trong RAM sẽ nhanh chóng mất đi khi chương trình hoặc dữ liệu không được sử dụng trong máy tính hoặc máy tính bị tắt .

Ổ cứng của chúng ta là nơi được sử dụng như là nơi lưu trữ chương trình và dữ liệu lâu dài . Dữ liệu ở đây không thể bị mất đi khi máy tính bị tắt (trừ khi bị ghi đè hoặc chỉ định xóa)  nhằm mục đích bảo toàn dữ liệu.  Tuy nhiên thật đáng tiếc là CPU  (central processing unit)  lại không thể truy cập trực tiếp chương trình hay dữ liệu từ ổ cứng. Chúng  phải được sao chép vào RAM trước và đó chính là nơi CPU truy cập chương trình hay đọc dữ liệu đó. Thực tế thì khi bạn đang chạy hiện tại, thì trước đó máy tính của bạn cũng tự động sao chép các chương trình OS của bạn vào RAM (Ubutu, Centos, ..v...v..) đó là nguyên do mà khi bạn check RAM (mình dùng Ubuntu check ram bằng lệnh `free -h`) thì lượng RAM bạn nhìn thấy không bao h đủ total với ram bạn thực sự có.

Loại memory thứ hai là `swap` .

## 1: Swap là gì ?
`Swap` thực tế là một loại kĩ thuật chuyển đổi 1 phần ổ cứng thành RAM khi hệ thống cần nhiều RAM hơn phần RAM vật lý hiện có . Nói cách khác bạn có thể hiểu `swap` chính là RAM ảo.

## 2: Tại sao phải dùng swap ?

Một trong những trường hợp quan trọng cần đến Swap là khi RAM đầy. Theo đó, Swap sẽ hạn chế các sự cố liên quan đến vấn đề bảo mật thông tin, nhất là trong hệ thống điều hành Linux.

Có thể hiểu một cách đơn giản là: bạn không bao giờ có thể lường trước được dung lượng bộ nhớ cho tất cả chương trình trên hệ điều hành. Vì vậy, khi sự cố xảy ra (đầy RAM), Swap sẽ làm nhiệm vụ duy trì tất cả các hoạt động bình thường dù tốc độ có phần chậm hơn thay vì dừng cả hệ thống khiến thông tin dễ bị rò rỉ.

Tuy nhiên khi nào bạn cần đến nó?

* Khi dùng một phần mềm yêu cầu hệ thống có hỗ trợ bộ nhớ Swap trong phần cài đặt 
* Khi hệ thôngs của bạn yêu cầu nhiều RAM hơn so với dung lượng RAM vật lý bạn có
* Khi muốn tăng cường sự ổn định hệ thông vì như đã nói ở trên bạn sẽ không bao giờ lường trước chính xác chương trình của bạn ngốn bao nhiêu RAM
* Giảm chi phí khi dùng server. Đương nhiên, khi bạn không có tiền, mà server cần thêm RAM để chạy. Swap là giải pháp duy nhất :D


## 3:  Có mấy loại Swap ?
Chúng ta có 2 loại swap :

* `swap partition` : Như tên của nó đã nói , đây là 1 phân vùng độc lập trên ổ đĩa cứng, chỉ có một mục đích duy nhất là `swapping` và không có bất kì file khác nằm trên nó .
* `swap file`: là một file riêng biệt nằm trên hệ thống của bản, nó có thể nằm ở bất cứ đâu trên ổ đĩa tùy vào sự config của bạn . (Bản thân mình thì thích dùng swap file hơn vì đỡ phải tìm phân vùng ổ cứng :D và muốn thay đổi dung lượng swap cũng đơn giản hơn )

Nếu máy của bạn đã cài đặt swap . Bạn có thể check xem swap của ban là loại nào bằng cach chạy lệnh sau :

```
swapon -s
```



| Filename | Type | Size  | Used | Priority
| -------- | -------- | -------- | -------- | -------- | -------- |
| /swapfile      |file    | 2097148    |11776     | -2     |
| /dev/sda9       | partition   | 1132540  |0     | -1     |

Mỗi dòng là một swap space tách biệt trên hệ thống của bạn. 

 *  Filename như bạn thấy là `sda9 (partition)` hoặc `swapfile`
 * Type chỉ ra rằng swap space là partition hay file.
 * Size là kích cỡ tính bằng KB của swap space
 * Used là lượng swap hiện đang được dùng.
 *  Priority chỉ ra swap nào sẽ được dùng trước (nếu bạn có nhiều swap)

## 4: Cấu hình swap như thế nào ?

### 4.1 : Swap partition.

* Xác định partition nào sẽ lấy làm swap

```
fdisk -l
```

==> Output :

```
/dev/sda9 swap swap defaults 0 0
```

* Tạo hệ thống file swap cho nó:
```
mkswap /dev/sda9
```

* Kích hoạt :

```
swapon /dev/sda9
```

* Update config để swap space tự động apply khi reboot hệ thống . Thêm 1 dòng tương tự như bên dưới vào file `/etc/fstab`.

```
/dev/sda9 swap swap defaults 0 0
```

### 4.2 : Swap file.
* Xem dung lượng của máy tính để phân bổ lượng swap hợp lý :

```
df -h
```

* Tạo hệ thống file swap file và chuyển quyền cho nó  :

```
sudo fallocate -l 512M /swapfile 
sudo chmod 600 /swapfile
ls -lh /swapfile
```

* Kích hoạt :

```
sudo mkswap /swapfile
sudo swapon /swapfile
```

* Update config để swap space tự động apply khi reboot hệ thống . Thêm 1 dòng tương tự như bên dưới vào file `/etc/fstab`.

```
/swapfile none swap sw 0 0
```


## 5: Những thông số cần quan tâm.
### 5.1: Swap bao nhiêu là đủ ?

Mặc du RAM rất quan trọng tuy nhiên điều đó không có ý nghĩa là chúng ta có thể tăng RAM ảo lên càng nhiều thì performance sẽ càng tốt . Từ rất lâu rồi người ta đã có nghiên cứu rằng dung lượng swap thì có thể sử dụng `2xRAM` là hợp lý.Tuy nhiên, các nghiên cứu đó tồn tại khi RAM mới chỉ tính bằng KB hay MB :D .  Với các thành tự cộng nghê máy tính càng ngày càng phát triên, lượng RAM trong máy tính cang ngày càng tăng. Với các dòng máy tính hiện đại thì RAM đang tiến nhanh đến 16G , 32G và thậm trí là 64G. Vì vậy thực sự thì con số `2xRAM` cũng chưa hẳn là hợp lý. Sau đây là bản khuyến nghị từ [Fedora Installation Guide](https://docs.fedoraproject.org/en-US/fedora/f28/install-guide/) về phân bổ Swap. Hãy tìm ra lượng swap thích hợp cho server của bạn nhé :


| Total RAM | Server | Hệ thống Desktop |
| -------- | -------- | -------- |
| < 2G     | 2xRAM     | 3xRAM     |
| 2G <  RAM  < 8G    | RAM     | 2xRAM     |
|8G <  RAM  < 64G    | 0.5xRAM     | 1.5xRAM     |
| 64G <  RAM      | < 0.5xRAM     | Không khuyến khích     |

 
### 5.2: Swappiness

Để xem được `Swappiness` chúng ta chỉ cần dùng command :

```
cat /proc/sys/vm/swappiness
```

Tham số `Swappiness` cho biết thời điểm hệ thống sẽ chuyển từ bộ nhớ vật lý (RAM) sang bộ nhớ tạm Swap. Giá trị của Swappiness dao động từ 0 đến 100 và mặc định là 60. Ví dụ :

* `Swappiness` = 0 ==> thì sẽ hệ thống sẽ không sử dụng Swap.
* `Swappiness` = 60 ==> thì sẽ hệ thống sẽ bắt đầu sử dụng Swap khi RAM bị đầy 40%
* `Swappiness` = 100 ==> thì sẽ hệ thống sẽ luôn luôn sử dụng swap song song với RAM

Để chỉnh sửa swap , ta chỉ cần thêm dòng sau đây vào file `/etc/sysctl.conf` :

```
vm.swappiness=giá_trị_swappiness_mong_muốn
```

Sau đó chỉ cần khởi động lại máy là ok.Còn nếu bạn chỉ muốn chỉnh time số này tạm thời thì chỉ cần sủ dụng command sau :

```
echo 50 > /proc/sys/vm/swappiness
```


### 5.3: vfs_cache_pressure
Để xem được `vfs_cache_pressure` chúng ta chỉ cần dùng command :

```
cat /proc/sys/vm/vfs_cache_pressure
```

Tham số `vfs_cache_pressure` là tham số ảnh hưởng trực tiếp đến việc lưu trữ các mục siêu dữ liệu của hệ thống  ( filesystem metadata ). Thực chất thì tham số này quyết định đến viêc Kernel lấy lại các memory đang được sử dụng cho VFS cache (Đoạn này mình không hiểu lắm nên ai biết chỉ mình nha). 

Theo như mình tìm hiểu thì default giá trị của tham số này là 100. Việc tăng giá trị này sẽ làm tăng tốc độ lấy lại bộ nhớ đệm VFS. Và đề swap hoạt động tốt nhất chúng ta nên để nó về giá trị 50.

Để chỉnh sửa swap , ta chỉ cần thêm dòng sau đây vào file `/etc/sysctl.conf` :

```
vm.vfs_cache_pressure=giá_trị_swappiness_mong_muốn
```

Sau đó chỉ cần khởi động lại máy là ok.Còn nếu bạn chỉ muốn chỉnh time số này tạm thời thì chỉ cần sủ dụng command sau :

```
echo 50 > /proc/sys/vm/vfs_cache_pressure
```

### 5.4:  Nhược điểm.

Điểm bất lợi chính của swap đó chính là tốc độ xử lý của nó . Trong khi RAM hoạt động với tốc độ tính bằng `nanoseconds` thì việc truy cập ổ đĩa cứng thì lại tính băng `milliseconds` đâu đó chậm hơn từ 10 -> 1000 lần. Tùy thuộc vào ổ đĩa của bạn. Chính vì thế bạn nên xem xét khi sử dụng Swap nhé. Nên dùng khi có ổ cứng có tốc độ đọc ghi nhanh. Nếu tốc độ đọc ghi chậm mà cố tình sử dụng `Swap` thì khéo khi còn tội tệ hơn

Điểm bất lợi khác cua Swap đó là việc chiếm dụng ổ cứng. Hiển nhiên rằng nếu bạn có ổ cứng 50G , Swap 10G thì bạn chỉ còn 40G lưu trữ dữ liệu thôi. Nên bạn hãy xem xét thêm về dung lượng ổ cứng khi setup Swap nhé .

#  Tài liệu tham khảo

[https://opensource.com/article/18/9/swap-space-linux-systems](https://opensource.com/article/18/9/swap-space-linux-systems)

[https://bbs.archlinux.org/viewtopic.php?id=184655](https://bbs.archlinux.org/viewtopic.php?id=184655)