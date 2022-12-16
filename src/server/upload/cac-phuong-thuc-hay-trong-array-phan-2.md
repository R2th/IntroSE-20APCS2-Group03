Array trong ruby có rất nhiều method hay , cách sử dụng cũng rất đa dạng , đội khi cũng rất dễ nhầm lẫn. 
Lần này , mình xin được phép tiếp tục chia sẻ một vài method cùng với chức năng của chúng . 
### 1- Take and drop 
Đây là các hàm dùng để lấy số phần tử nhất định trong mảng .
* **Array.take(n)*** → [] , Trả về mảng mới , lấy ra n phần từ đầu tiên của mảng ban đầu , giữ nguyên mảng đó.
   ```ruby
  a = [1,2,3,4,5,6]
  a.take(3)    #=> [1,2,3]
  a            #=> [1,2,3,4,5,6]    
    ```
    Tuy nhiên , nếu mảng ban đầu có số phần tử nhỏ hơn số phẩn tử  mà hàm take lấy ra thì nó sẽ trả về mảng mới với số phẩn tử bằng với mảng ban đầu.
   ```ruby
   b = [1,2]
   b.take(3)    #=> [1,2]   
   ```
 * **Array.take_while{|obj| block}*** → [] , Trả về mảng mới , lấy ra các phần từ đầu thỏa mãn điều kiện của block, giữ nguyên mảng ban đầu.
   ```ruby
   a = [1, 2, 3, 4, 5, 6]
   a.take_while{|i| i < 3}    #=> [1, 2]
   a                          #=> [1, 2, 3, 4, 5, 6]    
    ```  
 
* **Array.drop(n)** → [] , Trả về mảng mới , lấy ra n phần từ cuối cùng  của mảng ban đầu , giữ nguyên mảng đó. 
  ```ruby
   a = [1,2,3,4,5,6]
   a.drop(3)    #=> [4,5,6]
   a            #=> [1,2,3,4,5,6]    
  ```
  
###   2- Nhóm method thêm phần từ vào mảng : push, unshift, insert.
* **push(parameter)** → [] , Thêm phần tử vào cuối của mảng , thay đổi mảng ban đầu.
  ```ruby 
   a = [1, 2, 3, 4, 5, 6]
   a.push(0)        #=> [1, 2, 3, 4, 5, 6, 0]
   a                #=> [1, 2, 3, 4, 5, 6, 0] 
  ```
  Hoặc chúng ta có thể viết như sau 
  ```ruby 
   a = [1, 2, 3, 4, 5, 6]
   a << 0          #=> [1, 2, 3, 4, 5, 6, 0]
   a               #=> [1, 2, 3, 4, 5, 6, 0]
   a.append(-100)  #=> [1, 2, 3, 4, 5, 6, 0, -100]
  ```
* **unshift(paramter)** → [] , Thêm phẩn tử vào đầu mảng , trái ngược với push. 
  ```ruby 
   a = [1, 2, 3, 4, 5, 6]
   a.unshift(0)     #=> [0, 1, 2, 3, 4, 5, 6]
   a                #=> [0, 1, 2, 3, 4, 5, 6]
  ```
  Hoặc chúng ta có thể viết như sau 
  ```ruby 
   a = [1, 2, 3, 4, 5, 6]
   a.prepend(-100)  #=> [-100, 1, 2, 3, 4, 5, 6]
  ```
* **insert(index, parameter(s))** → [] , Thêm phẩn một hoặc nhiều phần tử sau vị trí của phần tử  có chỉ số index.
  ```ruby 
   a = [1, 2, 3, 4, 5, 6]
   a.insert(2, "three")                  #=> [1, 2, "three", 3, 4, 5, 6]
   a                                     #=> [1, 2, "three", 3, 4, 5, 6]
   a.insert(3, "four", "five", "six")    #=> [1, 2, "three", "four", "five", "six", 3, 4, 5, 6]
   a                                     #=> [1, 2, "three", "four", "five", "six", 3, 4, 5, 6]
  ```

    Array còn rất nhiều các method hay tiện lợi . Mình sẽ giới thiệu tiếp ở những phần tiếp theo nhé