PIp là trình quản lý các package được sử dụng rộng rãi nhất của python. Được cài đặt mặc định cho các versions của python. Nó cũng tương tự như npm của node, gem của ruby on rails nếu những ai đã từng sử dụng qua.
1. Cài đặt packages

    Để cài đặt version mới nhất của một package:
    ```
    pip install somepackage
    ```
    Để install một version nhất định ta dùng cú pháp:
    ```
    pip install SomePackage==1.x.x
    ```
    Hoặc chỉ rõ phiên bản tối thiểu muốn cài đặt:
    ```
    pip install SomePackage>=1.0.4
    ```
    Nếu xuất hiện lỗi permission denied thì ta sử dụng lệnh sudo để cài đặt chúng.
    
    Trong node có file package.json để lưu lại các package cũng với version mà chúng ta đã cài đặt. Rồi sau đó nếu bê đi nơi khác thì chỉ cần dùng lệnh 
    ```
    npm install
    ```
    Là sẽ tự động cài đặt hết mọi thứ trong file package.json. Tương tự vậy, trong python chúng ta có thể tạo file requirements.txt. File này cũng tương tự như file package.json.
   Sử dụng pip cài đặt qua file requirements.txt:
   ```
   pip install -r requirements.txt
   ```
   Để tạo ra file requirements.txt chúng  ta thực hiện:
   ```
   pip freeze > requirements.txt 
   ```
   Create requirements.txt ở trong hiện tại virtualenv:
   ```
   pip freeze --local > requirements.txt
   ```
2. Liệt kê tất cả các package đã cài sử dụng `pip`
    Để liệt kê tất cả những package đã cài (đã tồn tại trong file requirements.txt hoặc chưa):
    ```
    pip list
    ```
    ![](https://images.viblo.asia/8a795ec0-4af1-4cb5-8221-3de5f0658e13.png)
    
    List all những package outdate và show ra version mới nhất của những package đó.
    ```
    pip list --outdated
    ```
    ![](https://images.viblo.asia/fd9d64d3-1bb2-4115-8bf1-ffd9472e6622.png)
    Ở trên là những package mình cài trong chính máy cùa mình.

3. Upgrade packages
    
    Để update package:
    ```
    pip install --upgrade SomePackage
    ```
    Nhiều lúc chúng ta sẽ nhận được thông báo rằng `pip` của chúng ta đang sử dụng version không phải là mới nhất. 
    ```
    pip install --upgrade pip
    ```
    Lệnh này sẽ upgrade `pip` lên version mới nhất hiện tại (Hình như hiện tại là 19.0.3).
    Chúng  ta có thể xem version của `pip`
    ```
    pip -V
    pip --version
    ```
    
4. Uninstall Packages
    ```
    pip uninstall SomePackage
    ```

5. Sử dụng một phiên bản python nhất định với `pip`

    Nếu hệ thống của bạn sử dụng cả python2, python3 và mặc định là python2.
    Thông thường khi dùng:
    ```
    pip install [package]
    ```
    Nó sẽ hiểu bạn đang sử dụng để cài đặt vào cho python2. 
    Nó tương tự với lệnh:
    ```
    pip2 install [package]
    ```
    Nếu bạn muốn cài nó trên python3:
    ```
    pip3 install [package]
    ```
    Bạn cũng có thể setup mặc định python của bạn là python 3. 
    Như vậy lúc đó 
    ```
    pip install [package]
    ```
    sẽ mặc định cài vào python3.

    Recommend:

    Nếu sử dụng nhiều version của python thì tốt nhất là nên sử dụng virtuarlenv. Nó sẽ tách biệt các version của python và các gói cài đặt cho từng version.

6. Conclusion

    Trên đây là giới thiệu về pip. Cái mà có lẽ khi bắt đầu với python ai cũng cần phải biết.
    Hi vọng bài viết sẽ có ích với các bạn. 
    Cảm ơn đã đọc bài.
    
Nguồn: Python Notes for Professionals