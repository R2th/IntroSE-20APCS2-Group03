### 1. Định nghĩa
- **SOLID** là nguyên tắc thiết kế, phát triển phần mềm. Mục đích giúp cho lập trình viên viết code tốt hơn, dễ đọc, dễ bảo trì.
![image.png](https://images.viblo.asia/fa9b80a1-9398-44ae-b50a-71e665b63ab5.png)

- **SOLID** được ghép lại từ 5 chữ viết tắt đầu tiên của 5 nguyên tắc này:

    - **S** is single responsibility principle (SRP)
    - **O** stands for open closed principle (OCP)
    - **L** Liskov substitution principle (LSP)
    - **I** interface segregation principle (ISP)
    - **D** Dependency injection principle (DIP)

### 2.1 . Single responsibility principle (SRP)
- Một class chỉ nên giữ 1 trách nhiệm duy nhất (Chỉ có thể sửa đổi class với 1 lý do duy nhất)
- Mục đích là để dễ đọc, dễ quản lý. Thử tưởng tượng bạn có một class làm quá nhiều việc, khi đó bạn nhìn vào sẽ rất rối và việc sửa đổi cũng tốn nhiều công sức => thiết kế tồi nhét tất cả mọi thứ vào một class.

- Ví dụ thực tế nếu bạn thiết kế một dụng cụ vừa là búa vừa là cờ lê thì rất khó sử dụng => thiết kế tồi. Tốt hơn là nên chia ra riêng. Một dụng cụ búa, một dụng cụ là cờ lê.

![image.png](https://images.viblo.asia/7ae08c24-26d9-447a-b460-4a23f8c85cf0.png)

```csharp
 public class Employee
    {
        public int Employee_Id { get; set; }
        public string Employee_Name { get; set; }

        /// <summary>
        /// This method used to insert into employee table
        /// </summary>
        /// <param name="em">Employee object</param>
        /// <returns>Successfully inserted or not</returns>
        public bool InsertIntoEmployeeTable(Employee em)
        {
            // Insert into employee table.
            return true;
        }
        /// <summary>
        /// Method to generate report
        /// </summary>
        /// <param name="em"></param>
        public void GenerateReport(Employee em)
        {
            // Report generation with employee data using crystal report.
        }
    }
```

- **Phân tích:** Class ‘Employee’ có 2 trách nhiệm, một là trách nhiệm thao tác với cơ sở dữ liệu và cái kia là tạo ra báo cáo. Lớp Employee không nên đảm nhận việc tạo ra báo cáo vì giả sử đến một ngày khách hàng yêu cầu phải tạo ra báo cáo trong Excel hoặc bất cứ định dạng nào khác, class này lại phải thay đổi cho phù hợp => Điều này là không tốt.

- **Giải pháp:** Chúng ta nên viết sang một class khác cho việc tạo báo cáo, vậy khi có bất cứ sự thay đổi nào với việc tạo báo cáo, sẽ không ảnh hưởng đến class Employee.

```csharp
public class ReportGeneration
{
     /// <summary>
     /// Method to generate report
     /// </summary>
     /// <param name="em"></param>
     public void GenerateReport(Employee em)
     {
         // Report reneration with employee data.
     }
}
```
###  2.2 Open closed principle (OCP)
- Nguyên lý thứ hai, tương ứng với chữ O trong SOLID. Nội dung nguyên lý:
> Có thể  mở rộng 1 class, nhưng không được sửa đổi bên trong class đó

```csharp
public class ReportGeneration
{
    /// <summary>
    /// Report type
    /// </summary>
    public string ReportType { get; set; }

    /// <summary>
    /// Method to generate report
    /// </summary>
    /// <param name="em"></param>
    public void GenerateReport(Employee em)
    {
        if (ReportType == "CRS")
        {
             // Report generation with employee data in Crystal Report.
        }
        if (ReportType == "PDF")
        {
            // Report generation with employee data in PDF.
        }
     }
 }
```

- **Phân tích:** Vấn đề xảy ra khi bạn muốn thêm nhiều loại export như xls, word, xlsx,... lúc này bạn phải sửa class cũ ReportGeneration và thêm vào nhiều if bên trong phương thức GenerateReport.
=> Việc chỉnh sửa class này không được khuyến khích, ta sẽ tìm giải pháp khác để mở rộng class ban đầu.

- **Giải pháp:** Ta sẽ sử dụng một interface để trừu tượng hóa chức năng tạo report. Khi có thêm loại report ta chỉ cần tạo class cụ thể và sử dụng interface này.
```csharp
public interface IReportGeneration
    {
        public void GenerateReport(Employee em);
    }
    /// <summary>
    /// Class to generate Crystal report
    /// </summary>
    public class CrystalReportGeneraion : IReportGeneration
    {
        public void GenerateReport(Employee em)
        {
            // Generate crystal report.
        }
    }
    /// <summary>
    /// Class to generate PDF report
    /// </summary>
    public class PDFReportGeneraion : IReportGeneration
    {
        public void GenerateReport(Employee em)
        {
            // Generate PDF report.
        }
    }
```

### 2.3 Liskov substitution principle (LSP)
-  Class con không nên phá vỡ các định nghĩa và hành vi của class cha.

- Ví dụ:  Employee là lớp cha của  Developer và BotDeveloper. Hai class này kết thừa từ Employee.
```csharp
public abstract class Employee
{
    public string Empcode {get;set;}
    
    public string FristName {get;set;}
    
    public string LastName {get;set;}
    
    public virtual string GetFullname()
    {
        return $"{FirstName} {LastName}";
    }
}

public class Developer : Employee
{
    public override string GetFullname()
    {
        return $"Developer - {FirstName} {LastName}";
    }
}

public class BotDeveloper: Employee{
        public override string GetFullname()
        {
             throw new NotImplementedException();
        }
}

List<Employee> employeeList = new List<Employee>();
employeeList.Add(new Developer());
employeeList.Add(new BotDeveloper());
foreach (Employee e in employeeList)
{
    e.GetFullname();
}
```

- **Vấn đề:** class nhân viên máy móc đã phá vỡ các định nghĩa và hành vi của class cha là class nhân viên - một nhân viên là con người.

- **Giải pháp:** BotDeveloper không được kế thừa Employee và nên được tách riêng ra 1 class mới.

### 2.4 Interface segregation principle (ISP)
- Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với các mục đích khác nhau.

```csharp
  public interface IExportReport
    {
        void ExportExcelReport();

         void ExportPdfReport();
    }
```

- **Vấn đề:** có những nhân viên chỉ cần chức năng export excel, có nhân viên cần cả 2 chức năng. Lúc này nếu gom chung lại thì ta phải implement lại tất cả phương thức.
- **Giải pháp:** Tách nhỏ mỗi loại export ra thành các interface nhỏ.

```csharp
    public interface IExportPdfFile
    {
        void ExportPdfReport();
    }

    public interface IExportExcelReport
    {
        void ExportExcelReport();
    }
```

### 2. 5  Dependency inversion principle (DIP)

- Không nên viết code gắn chặt với nhau bởi vì sẽ là cơn ác mộng cho việc bảo trì khi ứn dụng trở lên lớn dần. Nếu một class phụ thuộc một class khác, bạn sẽ cần phải thay đổi class đó nếu một trong những class phụ thuộc phải thay đổi. Chúng ta nên cố gắng viết các class ít phụ thuộc nhất có thể.

![image.png](https://images.viblo.asia/4aee2561-bfb6-4813-afc5-61bfe4a8bd3a.png)

- Giảm sự phụ thuộc bằng cách inject (tiêm) các class phụ thuộc vào class dùng class đó.

**Tham khảo:**
- https://tedu.com.vn/design-pattern/nguyen-tac-solid-va-vi-du-trong-c-49.html
- https://viblo.asia/p/tim-hieu-ve-nguyen-ly-solid-bJzKm7mYl9N