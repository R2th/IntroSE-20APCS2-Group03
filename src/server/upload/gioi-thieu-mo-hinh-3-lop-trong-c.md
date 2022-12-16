![](https://images.viblo.asia/3458da6b-a96f-4ec7-876a-5cd687c4ee0f.jpg)
# 1. Giới thiệu
Gồm 3 lớp, đó là: 
+ GUI Layer: Lớp này là lớp hiển thị giao diện và các chức năng để người dùng cuối sử dụng.
+ Business (BUS) Layer: Đây là lớp nhận các yêu cầu từ lớp GUI và truy xuất lên lớp Data để lấy thông tin và trả về GUI.
+ Data Access Layer: Lớp này là lớp để truy xuất với CSDL, chỉ duy nhất lớp này được làm việc với database.
+ (Ko cần thiết) DTO Layer: Lớp này chỉ là phụ thôi, đây là lớp định nghĩa các table trong database của bạn, định nghĩa cột của nó cũng như để ta gán data khi query lấy dữ liệu. Các bạn có thể hiểu nôm na là 1 dạng cơ bản ORM (Object Relation Mapping).
Đây là cách hoạt động của mô hình 3 lớp:

![](https://images.viblo.asia/aac10848-b168-432a-b85d-a700c9e1d741.png)

Nhìn sơ qua thì nó khá là giống MVC bên web nhỉ? Business như là Controller :D, GUI là View và Data Access là Model.
# 2. Lợi thế của mô hình 3 lớp
+ Việc phân chia thành từng lớp giúp cho code được tường minh hơn. Nhờ vào việc chia ra từng lớp đảm nhận các chức năng khác nhau và riêng biệt như giao diện, xử lý, truy vấn thay vì để tất cả lại một chỗ. Nhằm giảm sự kết dính.
+ Dễ bảo trì khi được phân chia, thì một thành phần của hệ thống sẽ dễ thay đổi. Việc thay đổi này có thể được cô lập trong 1 lớp, hoặc ảnh hưởng đến lớp gần nhất mà không ảnh hưởng đến cả chương trình.
+ Dễ phát triển, tái sử dụng: khi chúng ta muốn thêm một chức năng nào đó thì việc lập trình theo một mô hình sẽ dễ dàng hơn vì chúng ta đã có chuẩn để tuân theo. Và việc sử dụng lại  khi có sự thay đổi giữa hai môi trường ( Winform sang Webfrom ) thì chỉ việc thay đổi lại lớp GUI.
+ Dễ bàn giao. Nếu mọi người đều theo một quy chuẩn đã được định sẵn, thì công việc bàn giao, tương tác với nhau sẽ dễ dàng hơn và tiết kiệm được nhiều thời gian.
+ Dễ phân phối khối lượng công việc. Mỗi một nhóm, một bộ phận sẽ nhận một nhiệm vụ trong mô hình 3 lớp. Việc phân chia rõ ràng như thế sẽ giúp các lập trình viên kiểm soát được khối lượng công việc của mình.
# 3. Chi tiết về 3 lớp
## 3.1 Presentation Layer (GUI)
![](https://images.viblo.asia/ea0c0bf5-ab3e-4e16-909f-2f9ca1f33ad7.png)
Có hai thành phần chính sau đây với những tác vụ cụ thể :

+ UI Components : gồm các thành phần tạo nên giao diện của ứng dụng (GUI). Chúng chịu trách nhiệm thu nhận và hiển thị dữ liệu cho người dùng… Ví dụ : textbox, button, combobox, …
+ UI Process Components : là thành phần chịu trách nhiệm quản lý các quá trình chuyển đổi giữa các UI… Ví dụ : Sắp xếp quá trình kiểm tra thông tin khách hàng:

  1. Hiển thị màn hình tra cứu ID
 
  2. Hiển thị màn hình thông tin chi tiết khách hàng tương ứng
  
  3. Hiển thị màn hình liên lạc với khách hàng.
## 3.2 Bussiness Layer (BLL)
![](https://images.viblo.asia/ad265121-e026-47d1-bede-80e0efd890f8.png)
Lớp này gồm 4 thành phần:

+ Service Interface : là thành phần giao diện lập trình mà lớp này cung cấp cho lớp Presentation sử dụng.
+ Bussiness Workflows : chịu trách nhiệm xác định và điều phối các quy trình nghiệp vụ gồm nhiều bước và kéo dài. Những quy trình này phải được sắp xếp và thực hiện theo một thứ tự chính xác.
+ Ví dụ : Thực hiện mua một đơn hàng trên tiki qua nhiều bước : kiểm tra gói hàng còn không?, tính tổng chi phí, cho phép giao dịch và sắp xếp việc giao hàng.
Bussiness Components : chịu trách nhiệm kiểm tra các quy tắc nghiệp vụ, ràng buộc logic và thực hiện các công việc . Các thành phần này cũng thực hiện các dịch vụ mà Service Interface cung cấp và Business Workflows sẽ sử dụng nó.
+ Ví dụ : Tiếp tục ví dụ ở trên. Bạn sẽ cần một Bussiness Component để kiểm tra gói hàng có khả dụng không ? hay một component để tính tổng chi phí,…
+ Bussiness Entities: thường được sử dụng như Data Transfer Objects ( DTO ). Bạn có thể sử dụng để truyền dữ liệu giữa các lớp (Presentation và Data Layer). Chúng thường là cấu trúc dữ liệu ( DataSets, XML,… ) hay các lớp đối tượng đã được tùy chỉnh.
+ Ví dụ : tạo 1 class Student lưu trữ các dữ liệu về tên, ngày sinh, ID, lớp.
## 3.3 Data Layer (DAL)
![](https://images.viblo.asia/82d65c06-bce3-4c1f-a3ba-6b3ddbfbb4c5.png)
+ Data Access Logic Components : chịu trách nhiệm chính lưu trữ và truy xuất dữ liệu từ các nguồn dữ liệu (Data Sources) như XML, file system,… Hơn nữa còn tạo thuận lợi cho việc dễ cấu hình và bảo trì.
+ Service Agents : giúp bạn gọi và tương tác với các dịch vụ từ bên ngoài một cách dễ dàng và đơn giản.
# 4. Ví dụ
Để hiểu rõ hơn về cấu trúc và cách xây dựng của mô hình 3 lớp, chúng ta cùng tham khảo một ví dụ về mô hình quản lí công nhân

gồm các lớp BUS, DAO, GUI. (Các đoạn code sẽ bị lược bỏ bớt )

![](https://images.viblo.asia/2071710c-45a5-416d-bcd4-026b7093171a.png)

Đầu tiên là GUI gồm các button insert, update, reset ,delete ,exit. Người dùng sẽ giao tiếp với màn hình giao diện này
![](https://images.viblo.asia/cda5ad1f-9c20-4dba-aacb-931bbe114ccb.png)

Lớp DTO, đây không phải là layer, đây chỉ là 1 gói dữ liệu đươc trao đổi giữa các lớp. Gói dữ liệu này được xây dựng dưới dạng lớp đối tượng. Mỗi một công nhân sẽ mang những thuộc tính sau:
```ruby
namespace DTO
{
    public class EmployeeDTO
    {
        #region Atrributes
        private String _employeeID;
        private String _name;
        private String _email;
        private float _salary;
        private int _employeeStyle;
        #endregion
        //.....
     }
 }
```
Các nghiệp vụ xử lý chính sẽ được đặt ở lớp BUS (hay là BLL)  gồm các nghiệp vụ insert, update, delete, retrieve

```ruby
namespace BUS
{
    public class EmployeeBUS
    {
        #region 1. Inserting
        public static bool InsertEmployee(EmployeeDTO emp)
        {
            if (EmployeeDAO.CheckEmployeeByID(emp.EmployeeID)==true
                &amp;&amp;EmployeeStyleDAO.CheckEmployeeStyleByID(emp.EmployeeStyle)==false)
            {
                return false;               
            }
            return EmployeeDAO.InsertEmployee(emp);
        }
        #endregionhttps://techtalk.vn/wp-admin/post-new.php#
        //2. Updating
        //3. Deleting
        //4. Retrieving
    }
}
```
Và cuối cùng là lớp DAO ( hay là DAL ). Truy  vấn đến cơ sở dữ liệu
```ruby
namespace DAO
{
    public class EmployeeDAO
    {
        #region 1. Inserting
        public static bool InsertEmployee(EmployeeDTO emp)
        {
            bool result=false;
            try
            {
                // Create List Sql Parameter
                List sqlParams = new List();
                sqlParams.Add(new SqlParameter("@EmployeeID", emp.EmployeeID));
                sqlParams.Add(new SqlParameter("@Name", emp.Name));
                sqlParams.Add(new SqlParameter("@Email", emp.Email));
                sqlParams.Add(new SqlParameter("@Salary", emp.Salary));
                sqlParams.Add(new SqlParameter("@EmployeeStyle", emp.EmployeeStyle));
                // Call Store Procedure
                int n = SqlDataAccessHelper.ExecuteNoneQuery("spInsertEmployee", sqlParams);
                if (n == 1)
                    result = true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }
#endregion
        // 2. Updating
        // 3. Deleting
        // 4. Retrieving
    }
}
```
Chúc các bạn thành công!
# Tham khảo
https://www.codeproject.com/Articles/36847/Three-Layer-Architecture-in-C-NET
https://docs.microsoft.com/en-us/previous-versions/msp-n-p/ff648105(v=pandp.10)