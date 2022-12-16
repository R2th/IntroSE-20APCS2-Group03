## 1. Bạn thử tạo một user đăng nhập bằng password 

![image.png](https://images.viblo.asia/fef2d505-4933-4251-97bb-5b2a24a1918e.png)

Test xem đã login vào được chưa. 
![image.png](https://images.viblo.asia/64624405-f39c-42e5-a3d0-f34508739891.png)
## 2. Tạo public và private key
Đầu tiên thì ta phải chuyển qua user `ling` vừa tạo, và chạy dòng này. Sau đó bạn cứ enter để cho các trường đó mặc định.
```
ssh-keygen -t rsa
```
![image.png](https://images.viblo.asia/85fed3ee-5841-4e35-bf7c-95ed4ecdf0aa.png)

find the generated key on `/home/ling/.ssh` đổi tên `id_rsa.pub` thành `authorized_key`. vì ssh sẽ hiểu tên mặc định

```
mv id_rsa.pub authorized_keys
```

Change lại quyền cho file `authorized_keys` chỉ có chính user `ling` mới có quyền read và write

```
chmod 600 authorized_keys
```

Tiếp đến, copy private key về máy chúng ta và cất thật kỹ nhé, nếu người nào lấy được key này xem như xong đó.
Ở đây mình dùng WinSCP để lấy private key  `id_rsa ` về

![image.png](https://images.viblo.asia/01906364-f4d0-4597-aa86-893434541925.png)


Cuối cùng, hãy thử đăng nhập bằng Publickey & private key xem  có được không :)

![image.png](https://images.viblo.asia/bfa3d30e-23d4-4baf-a1b6-1df45d53b6f9.png)

> Nếu bạn muốn không cho phép user đăng nhập bằng password thì, vào config  file này `sshd_config`
> ```
> vi /etc/ssh/sshd_config
> ```
> Tìm `password`. bạn nhấn `Esc` +` /`  và tìm từ `password` . Thay `yes` qua `no`
> 
> ![image.png](https://images.viblo.asia/31bdb830-bae4-4a4d-854a-20aae79e22e2.png)
> 
> Và check xem, login bằng password có được ko.

Nếu bạn muốn cho phép toàn quyền cho user ling như là root thì bạn có thể config như sau
```
visudo
```
bạn tìm `root` trong bằng `vi`. oke, thêm một dùng như hình và lưu lại. và thử đăng nhập lại xem nó có quyền như root chưa nhé

![image.png](https://images.viblo.asia/ca0300cd-55b5-464b-99d7-970e6bdddb89.png)

**Cảm ơn các bạn đã đọc đến đây, bye! see you next time.**

REFERENCES

YOUTUBE
[TIN HOC THAT LA DON GIAN](https://www.youtube.com/watch?v=JcAqkYG24v0&list=PLjCpH2Qpki-sTjdlYXE8AifSKQFa8ZL23)