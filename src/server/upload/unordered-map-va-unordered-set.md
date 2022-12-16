## I. Unordered_map
### 1. Đặt vấn đề
Như chúng ta đã biết, $map$ dùng để lưu trữ dữ liệu dưới dạng key - value, và các dữ liệu của chúng ta được tự động sắp xếp theo thứ tự. Về cơ bản thì $map$ sử dụng cây nhị phân BST: red-black tree (cây tìm kiếm nhị phân tự cân bằng). Ngoài ra, nếu các bạn tìm hiểu sâu hơn về kiểu dữ liệu này sẽ phát hiện còn có thêm một kiểu dữ liệu với cái tên khá tương đồng: $unordered\_map$. Qua tên thì chúng ta cũng đoán được phần nào về kiểu dữ liệu này rồi nhỉ, có thể tạm hiểu là $map$ nhưng không thứ tự!
### 2. Unordered_map - Những điều có thể bạn chưa biết
Cải tiến hơn so với $map$, $unordered\_map$ lưu trữ dữ liệu thông qua một bảng $hash$ ($hash table$).

Về cơ bản, $hash$ chỉ một quá trình mã hóa theo một phương thức nào đó biến một bản rõ (plaintext) thành bản mã (ciphertext) với mong muốn không thể giải mã ngược lại. Mục đích để bảo mật thông tin một cách tốt hơn. Trong kiểu dữ liệu $unordered\_map$, thay vì lưu các biến dạng $string-string$, thì chúng ta sẽ lưu các biến về dạng $hashid-string$. Việc làm này có một ưu điểm lớn trong việc tìm kiếm các phần tử.

Ví dụ, trong $map$ bạn lưu các biến với $key$ là tên người và $value$ là món ăn yêu thích, như vậy mỗi khi cần tìm kiếm một người có món ăn yêu thích là gì chúng ta cần thực hiện với độ phức tạp $O(n)$. Tương ứng trong $unordered\_map$, chúng ta lưu dạng $key$ là $hashid$ của tên người, $value$ vẫn là tên món ăn, như vậy khi tìm kiếm, ta chỉ cần thêm một bước là $hashing$ tên người, sau đó tìm kiếm theo $key$ là $hashid$ tương ứng sẽ đưa độ phức tạp về $O(1)$.

### 3. So sánh giữa map và unordered_map
#### 3.1. Sự sắp xếp
Vì sử dụng Red-Black Tree nên các phần tử trong $map$ được săp xếp theo một thứ tự theo nhu cầu người sử dụng. Đối với kiểu dữ liệu $unordered\_map$ thì các phần tử không được sắp xếp.
#### 3.2. Thời gian thao tác với các phần tử
Do $map$ bản chất là một cây nhị phân, nên mỗi lần thực hiện thao tác với các phần tử, chẳng hạn insert hoặc delete chúng ta sẽ cần sử dụng một khoảng thời gian với độ lớn là $O(log(n))$ (sau đó $map$ cần thêm thao tác cân bằng lại cây). Đối với kiểu dữ liệu $unordered\_map$, chúng ta chỉ cần hash key ra và sau đó insert hoặc delete trực tiếp nên thời gian thực thi được đưa về lý tưởng là $O(1)$.

#### 3.3. Thời gian tìm kiếm phần tử
Trong kiểu dữ liệu $map$, vì phải tìm kiếm tuần tự, duyệt qua các phần tử nên thời gian tìm kiếm một phần tử tùy ý là $O(log(n))$. Đối với $unordered\_map$, chúng ta chỉ cần thêm một bước hashing sẽ có thể đưa thời gian tìm kiếm trở về $O(1)$.

#### 3.4. Bộ nhớ sử dụng
Đối với cây BST trong $map$, bộ nhớ tương ứng với số lượng phần tử lưu trữ. Đây là một ưu điểm so với không gian lưu trữ dạng $hash table$ vì có nhiều các chỗ trống không được lấp đầy.

### 4. Sự lựa chọn giữa map và unodered_map
Với các đặc điểm trên, chúng ta có thể thấy $map$ phù hợp trong các bài toán chú trọng về thứ tự các phần tử, còn đối với những bài toán với nhu cầu tìm kiếm cao hơn, chúng ta nên sử dụng $unordered\_map$. Tuy nhiên, việc sử dụng $unordered\_map$ sẽ cần thêm thao tác xây dựng hash table nên cần thận trọng, vì đối với những dữ liệu lớn, chúng ta cần phải quan tâm đến các yếu tố như thời gian thực thi hàm hash, rủi ro trùng kết quả hash, cũng như những kết quả hash đặc biệt (tuy khác nhau nhưng có thể bị hệ thống hiểu lầm thành cùng một dữ liệu), ...

## II. Unordered_set
### 1. Đặt vấn đề
Tương tự với $unordered\_map$, ta cũng có kiểu dữ liệu $unordered\_set$. Khác với việc tự sắp xếp thứ tự của $set$, $unordered\_set$ sử dụng một hàm $hash$, hình thành ánh xạ với các $key$ và sắp xếp chúng vào các nhóm khác nhau. Ví dụ:

* Đối với $set$:
Input: $1,8,2,5,3,9$
Output：$1,2,3,5,8,9$
* Đối với $unordered\_set$：
Input：$1,8,2,5,3,9$
Output：$9, 3, 1, 8, 2, 5$（thứ tự bị ảnh hưởng bởi hàm $hash$

### 2. So sánh giữa set và unordered_set
#### 2.1. Sự sắp xếp
Kiểu dữ liệu $set$ mặc định sẽ sắp xếp các phần tử theo thứ tự tăng dần hoặc theo thứ tự do người sử dụng quy định. Đối với $unordered\_set$, nó sẽ sắp xếp các phần tử theo hàm $hash$ (ánh xạ các phần tử vào các nhóm).
#### 2.2. Tìm kiếm phần tử
Độ phức tạp thời gian ở việc tìm kiếm một phần tử trong $set$ là $O(log(n))$. Trong khi ở $unordered\_set$, chúng ta có trường hợp tốt nhất là $O(1)$ và trường hợp xấu nhất là $O(n)$.
#### 2.3. Thời gian thao tác với các phần tử
Vì $map$ là kiểu dữ liệu tự sắp xếp phần tử, nên thời gian thao tác như insert hoặc delete phần tử bằng $log(n) + rebalance\_time$, bởi vì sau đó chúng ta cần cân bằng lại các phần tử theo thứ tự sắp xếp. Đối với $unordered\_set$ chúng ta cũng có trường hợp tốt nhất và xấu nhất giống như việc tiềm kiếm phần tử, lần lượt là $O(1)$ và $O(n)$
### 3. Sự lựa chọn giữa set và unordered_set
Đối với những bài toán cần chú ý yếu tố thứ tự của phần tử, thao tác phần tử theo thứ tự sắp xếp, hoặc cần để ý đến những phần tử liền kề (phần tử với giá trị lớn hơn phía sau, giá trị nhỏ hơn phía trước) thì chúng ta nên sử dụng kiểu dữ liệu $set$. Ngược lại, đối với những bài toán chưa yêu cầu sự sắp xếp, ưu tiên thao tác với phần tử mà không ảnh hưởng đến các phần tử khác thì chúng ta có thể sử dụng $unordered\_set$. Ngoài ra việc vận dụng linh hoạt hai kiểu dữ liệu trên có thể khiến lời giải trở nên gọn gàng và dễ hiểu.
## III. Tài liệu tham khảo
* [https://en.wikipedia.org/wiki/Unordered_map](https://en.wikipedia.org/wiki/Unordered_map)
* The C++ Programming Language.