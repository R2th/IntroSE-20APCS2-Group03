## Cách 1: Sử dụng apt-get
Thông thường, một Broken Packages sau khi được cài đặt có thể tương đối dễ sửa, nhờ vào một công cụ tích hợp bên trong apt-get. Thực hiện các lệnh sau đây:
```
sudo apt-get update --fix-missing
sudo apt-get install -f
```

Hãy đợi khoảng 1-2 trước khi sử dụng ` sudo apt-get install -f` để server có thể xử lí hoàn toàn lỗi. Nếu cách trên không được, hãy thử cách 2

## Sử dụng dpkg và apt-get
Chạy các lệnh dưới
 ```
 sudo dpkg --configure -a

sudo apt-get clean

sudo apt-get update
```
Hãy kiểm tra các Broken Packages đã sử dụng được chưa, nếu chưa hãy thử xóa các file Lock bằng cách:
```
sudo rm /var/lib/apt/lists/lock
```
Sau đó hãy thử lại 3 lệnh trên một lần nữa

Nguồn: [fornoob](https://fornoob.com)