Máy tính có thể coi là chiếc cần câu cơm của 1 dev, trong cái thời buổi "công nghiệp 4.0" có cả tỉ công cụ phục vụ cho dev code nhàn hơn, các công cụ thì ngày càng ngon ngày càng nhiều và theo đó những gì dev sử dụng khi code cũng phình to ra và cái "cần câu cơm" cũng cần được nâng cấp, nếu làm việc trong một công ty với những quy định về bảo mật thì bạn k thể tự tiện lắp thêm phần cứng để nâng cấp cho chiếc "cần câu cơm" của mình. Chính mình đã từng gặp vấn đề về cấu hình thiết bị, với chiếc PC 8gb **RAM** chỉ để code backend nghe có vẻ khá ổn, đúng nó khá ổn trong một thời gian, nhưng r một ngày sau khi đã chinh chiến qua nhiều project con máy bắt đầu gặp vấn đề thường xuyên đầy **RAM** và mỗi lần như thế nó lại "đơ" ra phải hard reset mới sống lại, tốn cả đống thời gian với nó vì khi khởi động lại là lại bắt đầu mở lại các công cụ từ đầu => cay cú. dù đã thử tắt bớt các process đang chạy nhưng cũng k giải quyết đc vấn đề (có thể do bật nhiều tab chrome quá =)) ). phương án cuối cùng và khả thi là thêm **RAM**, cơ mà máy ở công ty để xin thêm **RAM** hay lắp thêm cái gì cũng thế cần qua nhiều khâu rối rắm  :P cách khả thi nhất lúc này là **Swap RAM**.

**SWAP (RAM ảo) là gì?**

Swap là **RAM** (bộ nhớ đệm) được lấy đổi từ ổ cứng. Nó được sử dụng khi RAM vật lý đã được sử dụng hết (hoặc hỗ trợ sử dụng song song) nhằm tăng dung lượng bộ nhớ đệm. Thực tế việc tạo phân vùng SWAP luôn được suggest mỗi khi cài đặt  Ubuntu hay Linux trên máy tính (thường là x2 dung lượng **Ram** vật lý). Đặc biệt cài đặt SWAP trên cũng sẽ làm tăng độ an toàn của máy chủ vật lý (hoặc VPS) phòng tránh được những trường hợp đầy RAM.

### How to add Swap File
Thực hiện theo các bước sau để thêm 1GB SWAP vào máy của bạn. Nếu bạn muốn thêm x GB thay vì 1 GB, hãy thay thế 1G bằng xG.
1. Tạo một tập tin sẽ được sử dụng để SWAP
    ```
    sudo fallocate -l 1G /swapfile
    ```

    Nếu ***faillocate*** không được cài đặt hoặc nếu bạn nhận được thông báo lỗi ***fallocate failed: Operation not supported*** thì bạn có thể sử dụng lệnh sau để tạo SWAP file:

    ```
    sudo dd if=/dev/zero of=/swapfile bs=1024 count=1048576
    ```

2. Set permissions

    Chỉ người dùng root mới có thể viết và đọc SWAP file. Để Set permissions:
    ```
    sudo chmod 600 /swapfile
    ```
3. thiết lập phân vùng SWAP

    Sử dụng mkswap để thiết lập phân vùng SWAP:
    ```
    sudo mkswap /swapfile
    ```
4. Enable swap

    Kích hoạt SWAP file bằng lệnh sau:
    ```
    sudo swapon /swapfile
    ```

    Để thay đổi vĩnh viễn, hãy mở /etc/fstabtệp và nối dòng sau:
    ```
    /swapfile swap swap defaults 0 0
    ```

5. Xác nhận trạng thái SWAP

    Để kiểm tra xem SWAP đang hoạt động, chúng ta có thể sử dụng lệnh swapon như dưới đây:
    
    ```
    sudo swapon --show
    ```

    ```
    NAME      TYPE  SIZE   USED PRIO
    /swapfile file 1024M 507.4M   -1
    ```
### Cách điều chỉnh giá trị swappiness
Mặc định các Ubuntu, Centos… đều để mặc định thông số Swappiness là 60 tức là khi RAM thật của sử dụng khoảng 60% thì SWAP sẽ được sử dụng. Vì tốc độ I/O của RAm lớn hơn ở cứng nhiều nền nếu để thông số này cao sẽ làm giảm hiệu suất máy của bạn. ví dụ để đặt giá trị swappiness thành 10, hãy nhập:
```
sudo sysctl vm.swappiness=10
```

Để làm cho tham số này liên tục trên các lần khởi động lại, hãy nối dòng sau vào file /etc/sysctl.conf :
```
vm.swappiness=10
```
 Bạn nên điều chỉnh tham số này theo từng bước nhỏ để tìm giá trị tối ưu.
 
###  Cách xóa SWAP file

Nếu vì bất kỳ lý do nào bạn muốn hủy kích hoạt và xóa SWAP file, hãy làm theo các bước sau:
1. Đầu tiên, hủy kích hoạt SWAP bằng cách gõ:
    ```
    sudo swapoff -v /swapfile
    ```
    
2. Loại bỏ các mục đã nhập SWAP file ***/swapfile swap swap defaults 0 0*** từ các file /etc/fstab 
3. Cuối cùng xóa SWAP file bằng lệnh:
    ```
    sudo rm /swapfile
    ```
    
Nguồn tham khảo: https://linuxize.com/post/create-a-linux-swap-file/