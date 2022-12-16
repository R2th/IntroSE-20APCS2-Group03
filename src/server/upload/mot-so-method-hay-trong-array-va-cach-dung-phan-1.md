Array trong ruby có rất nhiều method hay , cách sử dụng cũng rất đa dạng , đội khi cũng rất dễ nhầm lẫn. 
Hôm nay, mình xin được phép chia sẻ một vài method cùng với chức năng của chúng . 
### 1- Count 
Đây là hàm dùng để đếm phần tử trong mảng, còn đếm như thế nào, đếm ra sao thì chúng ta cùng xem một vài ví dụ nhé
* **count** → int  *trả về số phần tử trong mảng , cái này khá là quen thuộc rồi nhỉ .* 
   ```ruby
  [1, "abc", [1,2], {one: 1}, false].count          #=> 5 
   ```
* **count(parameter)** → int,  *trả về số phần tử có giá trị bằng với tham số truyền vào *
  ```ruby
  [1, 2, 3, 4, 5, 4, 5, 2, 4].count(4)  #=> 3
  ```
* **count {|item| block}** → int , trả về số phần tử thỏa mãn điều kiện trong block*
  ```ruby 
  [1, 3, 4 ,5, 6, 10].count{|item| item % 2 == 0 }    #=> 3
  ```
  
###   2- Nhóm method delete 
* **delete(parameter)** →Trả về giá trị của tham số hoặc nil nếu không tìm thấy phần tử  .  Xóa phần tử có giá trị bằng tham số truyền vào , tạo  mảng mới 
  ```ruby 
   a = [1, 2, 3, 4]
   a.delete(1)      #=> 1
   a                #=> [2, 3, 4]
   a.delete(10)     #=> nil 
  ```
* **delete(paramter) {block}** → tương tự như trên , nhưng nếu không có phần tử nào có giá trị bằng tham số truyền vào thì trả về khối lệnh trong block 
  ```ruby 
   a = [1, 2, 3, 4]
   a.delete(100) {"not found"}   #=> "not found"
  ```
* **delete_at(index)** →  trả về giá trị của phần tử có chỉ số index trong mảng , tạo mảng mới hoặc nil khi chỉ số nằm ngoài phạm vi 
  ```ruby 
   a = [1, 2, 3, 4]
   a.delete_at(2)        #=> 2 
   a                     #=> [1, 3. 4]
  ```
  ```ruby 
   a = [1, 2, 3, 4]
   a.delete_at(100)     #=> nil 
  ```
*  **delete_if { |item| block }** xóa phần tử thỏa mãn block và trả về mảng mới 
      ```ruby 
       a.delete_if {|x| x > 2}    #=> [1,2] 
      ```
  
### 3- Compact và compact!
*  **compact** loại bỏ phần tử nil trong mảng và trả về một mảng copy của mảng ban đầu (mảng ban đầu vẫn giữ nguyên) và không chứa nil 
      ```ruby 
       a = [1, 2, 3, 4, nil]
       a.compact           #=> [1, 2, 3, 4]
       a                   #=> [1, 2, 3, 4, nil]
      ```
*   **compact!** cũng loại bỏ phần từ nil trong mảng , nếu có phần tử nil thì sẽ trả về mảng mới , nếu không có thì trả về nil 
    ```ruby 
     a = [1, 2, 3, 4, nil]
     a.compact!           #=> [1, 2, 3, 4]
     a                    #=> [1, 2 ,3, 4]
     
     b = [1, 2 ,3, 4]
     b.compact!           #=> nil
    ```

    Array còn rất nhiều các method hay tiện lợi . Mình sẽ giới thiệu tiếp ở những phần tiếp theo nhé