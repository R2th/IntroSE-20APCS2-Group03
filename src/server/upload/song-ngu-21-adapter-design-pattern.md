The **Adapter**(bộ chuyển đổi) design pattern is a **structural**(cấu trúc) pattern which allows **incompatible**(không tương thích) interfaces to work together. **By doing so**(bằng cách làm như vậy), we allow objects from different interfaces to **exchange**(trao đổi) data.

In this **article**(bài viết), we are going to learn how to **implement**(triển khai) the Adapter pattern into our project and when should we use it.

*Adapter design patterm là một patterm cấu trúc cho phép các interface không tương thích làm việc với nhau. Bằng cách làm như vậy, chúng ta cho phép các đối tượng từ các interface khác nhau trao đổi dữ liệu.*

*Trong bài viết này, chúng ta sẽ học cách triển khai Adapter patterm vào dự án và khi nào thì nên sử dụng nó.*

# **Initial Project**

Let’s **imagine**(tưởng tượng) that we have **functionality**(chức năng) in which we convert the list of car **manufacturers**(nhà sản xuất) into JSON **format**(định dạng) and write it to the screen. But **instead**(thay thế) of a list, we have been **provided**(cung cấp) with an API that provides us with all the manufacturers in the XML format.

*Bắt đầu tưởng tượng rằng, chúng ta có một chức năng là chuyển đổi danh sách nhà sản xuất ô tô vào định dạng JSON và hiển thị nó lên màn hình. Nhưng thay vì là một danh sách, chúng ta được cung cấp một API mà API đó cung cấp tất cả nhà sản xuất theo định dạng XML.*

Let’s say we can’t **modify**(sữa đổi) the **existing**(hiện có) API functionality (because of the **technical** **restrictions**(công nghệ hạn chế) **such as being**(chẳng hạn như) **imported**(nhập vào) into our project from another solution that we mustn’t modify or as a NuGet package) so we have to find a way around it.

*Hãy nói chúng tôi không thể sữa đổi chức năng API hiện có (bởi vì công nghệ hạn chế, chẳng hạn như  được nhập vào trong dự án của chúng ta từ một solution mà chúng ta không thể sửa đổi hoặc từ gói tin NuGet) nhưng chúng ta phải tìm cách đi quanh nó.*

And the **proper**(thích hợp) way to do it is to implement the Adapter pattern to **solve**(giải quyết) this problem.

*Và cách thích hợp cho nó là triển khai Adapter patterm để giải quyết vấn đề này.*

Let’s start with the creation of the Manufacturer model and a simple object to XML converter

*Bắt đầu tạo một model Manufacturer và một đối tượng đơn giản để chuyển đổi XML*

 **example**:

```csharp
public class Manufacturer
{
    public string Name { get; set; }
    public string City { get; set; }
    public int Year { get; set; }
}
```

```csharp
public static class ManufacturerDataProvider
{
    public List<Manufacturer> GetData() =>
    new List<Manufacturer>
        {
        new Manufacturer { City = "Italy", Name = "Alfa Romeo", Year = 2016 },
        new Manufacturer { City = "UK", Name = "Aston Martin", Year = 2018 },
        new Manufacturer { City = "USA", Name = "Dodge", Year = 2017 },
        new Manufacturer { City = "Japan", Name = "Subaru", Year = 2016 },
        new Manufacturer { City = "Germany", Name = "BMW", Year = 2015 }
        };
}
```

C#

```csharp
public class XmlConverter
{
    public XDocument GetXML()
    {
        var xDocument = new XDocument();
        var xElement = new XElement("Manufacturers");
        var xAttributes = ManufacturerDataProvider.GetData()
            .Select(m => new XElement("Manufacturer", 
                                new XAttribute("City", m.City),
                                new XAttribute("Name", m.Name),
                                new XAttribute("Year", m.Year)));
 
        xElement.Add(xAttributes);
        xDocument.Add(xElement);
 
        Console.WriteLine(xDocument);
 
        return xDocument;
    }
}
```
As we can see, this is a pretty **straightforward**(đơn giản) code. We are **collecting**(thu gom) manufacturer data, creating a root Manufacturers **element**(thành phần) and all the Manufacturer **sub-elements**(thành phần phụ) with its **attributes**(thuộc tính).

*Như chúng ta có thể thấy, đó là một đoạn code đơn giản. Chúng ta lấy dự liệu các nhà sản xuất, tạo ra một gốc thành phần Manufactures và tất cả các thành phần phụ Manufactures với thuộc tính của nó.*

After that, we are printing results to the console window to show how the final XML looks like.

*Sau đó, chúng ta in kết quả ra cửa sổ console, cuối cùng XML sẽ nhìn như thế này*

This is how the xDocument should look like:
 
Now let’s implement a JsonConverter class:

C#
*Bây giờ triển khai lớp JsonConverter:*


```csharp
public class JsonConverter
{
    private IEnumerable<Manufacturer> _manufacturers;
 
    public JsonConverter(IEnumerable<Manufacturer> manufacturers)
    {
        _manufacturers = manufacturers;
    }
 
    public void ConvertToJson()
    {
        var jsonManufacturers = JsonConvert.SerializeObject(_manufacturers, Formatting.Indented);
 
        Console.WriteLine("\nPrinting JSON list\n");
        Console.WriteLine(jsonManufacturers);
    }
} 
```
This code is even **simpler**(thậm chí đơn giản hơn) because we only **serialize**(tuần tự hóa) our manufacturer list into a JSON format.

*Code này thậm chí còn đơn giản hơn vì chúng ta chỉ tuần tự hóa danh sách nhà sản xuất vào một định dạng JSON.*

Of course, for the serialization to work we need to install the **Newtonsoft.Json** library, so don’t forget to do that.

*Dĩ nhiên, để tuần tự hóa có thể làm việc thì chúng ta cần cài đặt thư viện Newtonsoft.Json, đừng quên điều đó.*

Excellent, we have our JSON functionality and the provided XML interface. But now, we need to solve a real problem. How to **combine**(phối hợp) those two interfaces to **accomplish**(hoàn thành) our task, which is converting manufacturers from XML to JSON format.

*Tuyệt vời, chúng ta có chức năng JSON và cung cấp giao diện XML(không sát nghĩa). Nhưng bây giờ, chúng ta cần giải quyết một vấn đề thực sự. Làm sao để phối hợp hai interface để hoàn thành nhiệm vụ, là chuyển đổi các nhà sản xuất từ định dạng XML sang JSON.*

# Adapter Implementation

As we can see, there is no way to pass an xDocument to the JsonConverter class and there shouldn’t be one, so we need to create the adapter class which will make these two interfaces work together.

*Như chúng ta đã thấy, không có cách nào để vượt qua lớp xDocumnet từ lớp JsonConverter và chúng không nên là một, vậy nên chúng ta cần tạo ra một lớp chuyển đổi mà sẽ khiến cho hai interfaces làm việc cùng nhau.*

To do this, we are going to start with the IXmlToJson interface to **define**(định nghĩa) the **behavior**(hành vi) of our adapter class:

*Để làm điều này, chúng ta sẽ bắt đầu với interface IXmlToJson để định nghĩa hành vi của class Adapter.*

C#
```csharp
public interface IXmlToJson
{
    void ConvertXmlToJson();
}
```

Then, let’s continue with the XmlToJsonAdapter class which is going to implement the IXmlToJsoninterface:

C#
```csharp
public class XmlToJsonAdapter : IXmlToJson
{
    private readonly XmlConverter _xmlConverter;
 
    public XmlToJsonAdapter(XmlConverter xmlConverter)
    {
        _xmlConverter = xmlConverter;
    }
 
    public void ConvertXmlToJson()
    {
        var manufacturers = _xmlConverter.GetXML()
                .Element("Manufacturers")
                .Elements("Manufacturer")
                .Select(m => new Manufacturer
                             {
                                City = m.Attribute("City").Value,
                                Name = m.Attribute("Name").Value,
                                Year = Convert.ToInt32(m.Attribute("Year").Value)
                             });
 
        new JsonConverter(manufacturers)
            .ConvertToJson();
    }
}
```
Excellent. We have created our adapter class which converts the Xml document object into the list of manufacturers and provides that list to the JsonConverter class.

*Tuyệt vời, chúng ta đã tạo ra class adapter chuyển đổi đối tượng tài liệu XML từ danh sách các nhà sản xuất và cung cấp một danh sách class JsonConverter.*

So, as you can see, we have **enabled**(cho phép) **collaboration**(hợp tác) between two completely different interfaces by just introducing an adapter class to our project.

*Nhưng, bạn có thể thấy, chúng ta  cho phép hợp tác giữa hai interfaces khác nhau bằng cách giới thiệu class adapter.*

Now, we can make a call to this adapter class from our **client**(người dùng) class:

C#
```csharp
class Program
{
   static void Main(string[] args)
    {
        var xmlConverter = new XmlConverter();
        var adapter = new XmlToJsonAdapter(xmlConverter);
        adapter.ConvertXmlToJson();
    }
}
```
Once we start our application, we are going to see the following result:
 
Great job. We have finished our implementation.
# When to Use Adapter

We should use the Adapter class whenever we want to work with the existing class but its interface is not compatible with the rest of our code. **Basically**(về cơ bản), the Adapter pattern is a **middle-layer**(lớp trung gian) which **serves**(phục vụ) as a translator between the code implemented in our project and some third party class or any other class with a different interface.

Furthermore, we should use the Adapter when we want to reuse existing classes from our project but they lack a common functionality. By using the Adapter pattern in this case, we don’t need to extend each class separately and create a redundant code.

*Chúng ta có thể sử dụng class adapter bất  cứ khi nào chúng ta muốn làm việc với các class nhưng chúng không tương thích với code của bạn. Về cơ bản Adapter patterm là một lớp trung gian phục vụ như một người dịch giữa code của bạn và một bên thứ ba với một class bất kì có interface khác với interface của bạn.*

# Conclusion(phần kết luận)

The Adapter pattern is pretty **common**(khá phổ biến) in the C# world and it is quite used when we have to adapt some existing classes to a new interface. It can **increase**(tăng) a code **complexity**(phức tạp) by adding **additional**(bổ sung) **classes** (adapters) but it is **worth**(giá trị) an effort for sure.

*Adapter patterm khá phổ biến trong C# và nó khá hữu ích khi chúng ta phải tạo sự tương thích giữ các class đang có với một class mới. Nó có thể tăng tính phức tạp khi bổ sung các class adapter nhưng nó vẫn có giá trị và hiệu quả. *

If you have enjoyed reading this article and if you would like to receive the notifications about the freshly published .NET Core content we encourage you to subscribe to our blog.

*Nếu bạn cảm thấy thích thú khi đọc bài viết này, và bạn muốn nhận được thông báo về nội dung mới nhất được cập nhật. Tôi khuyến khích bạn nên theo dõi blog. 
Source: https://code-maze.com/adapter/*