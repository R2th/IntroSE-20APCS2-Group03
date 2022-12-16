##                                                Con trỏ: UNIQUE_PTR


#### - Smart pointer (Con trỏ thông minh):
   - Con trỏ tự động xóa vùng nhớ khi không sử dụng.
   - Con trỏ cũng có thể tự động xóa vùng nhớ khi chương trình chạy có lỗi và dừng lại đột ngột.
   - Con trỏ thông minh có thể quản lý vùng nhớ một cách tự động thay vì phải tự quản lý nếu sử dụng con trỏ bình thường.


#### - Đặc điểm
  - Đặc điểm quan trọng nhất của một smart pointer là “Quyền sở hữu” . Vì thế việc đầu tiên cần phải quan tâm của khi sử dụng smart pointer là “Quyền sở hữu” để thực hiện tự động quản lý bộ nhớ.
  - Unique_ptr là loại smart pointer đại diện cho “Quyền sở hữu duy nhất”. Có nghĩa là tài nguyên mà unique_prt trỏ  tới chỉ có thể được sở hữu duy nhất bởi đối tượng đó mà không con trỏ nào khác được phép trỏ tới. Nếu muốn sử dụng tài nguyên mà con trỏ này trỏ tới chỉ có thể tạo một con trỏ A trỏ tới con trỏ unique_ptr và sử dụng tài nguyên gián tiếp thông qua con trỏ unique_ptr.
  - Các unique_ptr có khả nắng chiếm quyền sở hữu của một đối tượng: khi nắm quyền sở hữu, Chúng nắm quyền quản lý các đối tượng chọn bằng cách chịu trách nhiệm trực tiếp về việc quản lý bộ nhớ và việc xóa nó ở một thời điểm thích hợp.


#### - Unique_ptr thường được sử dụng để quản lý các đối tượng:
  - Cung cấp cơ chế xử lý an toàn cho các lớp và các hàm xử lý các đối tượng có tuổi thọ động, bằng các đảm bảo việc xóa con trỏ một cách hợp lý.
  - Chuyển quyền sở hữu các đối tượng thuộc sở hữu duy nhất với tuổi thọ động vào các chức năng.
  - Là loại phần tử trong các vùng chứa nhận biết di chuyển, chẳng hạn như vector, giữ con trỏ đến các đối tượng được phân bổ động (vd: nếu hành vi đa hình được mong muốn).


#### - Đối tượng unique_ptr có 2 thành phần:

  - Con trỏ lưu trữ: Con trỏ trỏ đến đối tượng mà nó quản lý. Điều này được thiếp lập trên xây dựng, có thể được thay đổi bởi một hoạt động chuyển nhượng hoặc bằng cách gọi thành viên thiết lập lại, và có thể được truy cập riêng để đọc bằng cách sử dụng các thành viên có được hoặc phát hành.
  - Delete con trỏ được lưu trữ: một đối tượng có thể gọi mà lấy một đối số cùng loại với con trỏ được lưu trữ và được gọi để xóa đối tượng được quản lý. Nó được thiếp lập trên xây dựng, có thể được thay đổi bởi một hoạt động gán, và có thể được quy cập riêng bằng cách sử dụng get_deleter của thành viên.


#### Chi phí sử dụng:

  - Unique_ptr được sử dụng rất thường xuyên trong chương trình, do đó, chi phí (overhead) của nó là một điều ta cần phải quan tâm đầu tiên, vì dù nó chỉ gây tốn một lượng chi phí nhỏ, nhưng cũng có thể đủ để làm chậm đáng kể performance của chương trình.
  - Thực tế, vì unique_ptr chỉ quản lý các tài nguyên “Sở hữ duy nhất” nên việc định nghĩa rất dễ dàng, và hầu như nó hoàn toàn không tốn thêm bất kì chi phí nào so với khi sử dụng raw pointer (con trỏ thông thường). Bên trong unique_ptr chỉ chứa duy nhất một con trỏ để trỏ tới tài nguyên mà nó quản lý (Trừ trường hợp bạn sử dụng thêm deleter cho unique_ptr) nêu hầu như kích thước của unique_ptr cũng bằng kích thước của một raw pointer. Do vậy có thể sử dụng unique_ptr để thay thế hoàn toàn cho các raw pointer đối với các tài nguyên duy nhất.

#### Vd
// std::unique_ptr<int> up = new int; ERROR!!!

std::unique_ptr<int> up(new int);
int *sp = up.release();

string *sp = new string("hello");
std::unique_ptr<string> up1(sp);
std::unique_ptr<string> up2(sp);
std::unique_ptr<string> up3(std::move(up1));

std::unique_ptr<string> up4;
up4 = up1; 

std::unique_ptr<ClassA> ptr;
ptr = new ClassA;

ptr = std::unique_ptr<ClassA>(new ClassA);
up = nullptr;