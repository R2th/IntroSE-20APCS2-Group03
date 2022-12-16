<p>&nbsp;Thiết kế Website với ASP. NET Core rầm rộ, với nhiều lợi &iacute;ch được m&ocirc; tả ở đ&acirc;y:&nbsp;<a href="https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.1">https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.1</a></p>

<ul>
	<li>A unified story for building web UI and web APIs.</li>
	<li>Architected for&nbsp;<a href="https://docs.microsoft.com/en-us/aspnet/core/test/index?view=aspnetcore-2.1">testability</a>.</li>
	<li><a href="https://docs.microsoft.com/en-us/aspnet/core/razor-pages/index?view=aspnetcore-2.1">Razor Pages</a>&nbsp;makes coding page-focused scenarios easier and more productive.</li>
	<li>Ability to develope and run on Windows, macOS, and Linux.</li>
	<li>Open-source and&nbsp;<a href="https://live.asp.net/">community-focused</a>.</li>
	<li>Integration of&nbsp;<a href="https://docs.microsoft.com/en-us/aspnet/core/client-side/index?view=aspnetcore-2.1">modern, client-side frameworks</a>&nbsp;and development workflows.</li>
	<li>A cloud-ready, environment-based&nbsp;<a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/index?view=aspnetcore-2.1">configuration system</a>.</li>
	<li>Built-in&nbsp;<a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-2.1">dependency injection</a>.</li>
	<li>A lightweight,&nbsp;<a href="https://github.com/aspnet/benchmarks">high-performance</a>, and modular HTTP request pipeline.</li>
	<li>Ability to host on&nbsp;<a href="https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/index?view=aspnetcore-2.1">IIS</a>,&nbsp;<a href="https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-2.1">Nginx</a>,&nbsp;<a href="https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-apache?view=aspnetcore-2.1">Apache</a>,&nbsp;<a href="https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/index?view=aspnetcore-2.1">Docker</a>, or self-host in your own process.</li>
	<li>Side-by-side app versioning when targeting&nbsp;<a href="https://docs.microsoft.com/en-us/dotnet/articles/standard/choosing-core-framework-server">.NET Core</a>.</li>
	<li>Tooling that simplifies modern web development.</li>
</ul>

<p>Cụ thể Ng&acirc;n H&agrave;ng Vietcombank c&oacute; c&ocirc;ng bố Tỉ gi&aacute; hối đo&aacute;i dưới dạng XML tr&ecirc;n Website. Ch&uacute;ng ta c&oacute; thể r&uacute;t tr&iacute;ch dữ liệu từ đ&acirc;y về để phục vụ cho c&aacute;c vấn đề kh&aacute;c (tra cứu tỉ gi&aacute;, kết hợp du lịch)</p>

<p>Cụ thể c&aacute;c bạn v&agrave;o website của Ng&acirc;n H&agrave;ng:&nbsp;<a href="https://www.vietcombank.com.vn/">https://www.vietcombank.com.vn/</a></p>

<p>K&eacute;o xuống dưới c&ugrave;ng Website, nh&igrave;n v&agrave;o g&oacute;c phải thấy mục &ldquo;Xem th&ocirc;ng tin tỷ gi&aacute; c&aacute;c chi nh&aacute;nh tại đ&acirc;y&rdquo;</p>

<p>ta nhấn v&agrave;o n&uacute;t n&agrave;y, kết quả ta được dẫn tới trang&nbsp;<a href="http://www.vietcombank.com.vn/ExchangeRates/">http://www.vietcombank.com.vn/ExchangeRates/</a>:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-2/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-2.png?w=620" /></a></p>

<p>Nhấn v&agrave;o n&uacute;t XML ở tr&ecirc;n, ta tiếp tục được dẫn tới 1 link kh&aacute;c :&nbsp;<a href="http://www.vietcombank.com.vn/ExchangeRates/ExrateXML.aspx">http://www.vietcombank.com.vn/ExchangeRates/ExrateXML.aspx</a></p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-3/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-3.png?w=620" /></a></p>

<p>B&acirc;y giờ nhiệm vụ của ta l&agrave; x&acirc;y dựng 1 Website ASP .NET Core để truy suất v&agrave; hiển thị to&agrave;n bộ tỉ gi&aacute; trong n&agrave;y l&ecirc;n giao diện.</p>

<p>Ta khởi động Visual Studio (Tui d&ugrave;ng VS 2017 nha)-&gt; rồi v&agrave;o File / chọn New / chọn Project:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-4/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-4.png?w=620" /></a></p>

<p>L&uacute;c n&agrave;y m&agrave;n h&igrave;nh tạo Project hiển thị ra như dưới đ&acirc;y:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-5/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-5.png?w=620" /></a></p>

<p>Ta chọn ASP .NET Core Web Application</p>

<p>Đặt t&ecirc;n Project l&agrave; &ldquo;Vietcombank&rdquo;, nhớ lưu v&agrave;o đ&acirc;u đ&oacute; kh&aacute;c ổ C hay Desktop l&agrave; OK (Desktop l&agrave; ổ C đ&oacute; nha) rồi bấm OK:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-6/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-6.png?w=620" /></a></p>

<p>L&uacute;c n&agrave;y m&agrave;n h&igrave;nh tạo Project mới hiển thị ra, ta chọn Web Application (Model- View &ndash; Controllers), ph&iacute;a tr&ecirc;n chọn ASP .NET Core 2.1, nhớ bỏ tick Configure for HTTPs. sau đ&oacute; nhấn OK nha, Project sẽ được tạo ra như dưới đ&acirc;y:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-7/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-7.png?w=620" /></a></p>

<p>B&acirc;y giờ ta tiến h&agrave;nh tạo c&aacute;c&nbsp; lớp C# dạng POCO, cấu tr&uacute;c của n&oacute; giống như Ng&acirc;n H&agrave;ng Vietcombank cung cấp trong XML tỉ gi&aacute;:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-9/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-9.png?w=620" /></a></p>

<p>Như vậy dựa v&agrave;o cấu tr&uacute;c n&agrave;y th&igrave; ta phải tạo 2 Lớp C#. Đ&oacute; l&agrave; lớp&nbsp;<strong>Exrate</strong>&nbsp;v&agrave; lớp&nbsp;<strong>ExrateList</strong>.</p>

<p><strong>Exrate</strong>&nbsp;c&oacute; c&aacute;c thuộc t&iacute;nh: CurrencyCode, CurrencyName, Buy, Transfer, Sell. Tất cả ch&uacute;ng đề c&oacute; kiểu chuỗi l&agrave; Ok (c&oacute; thể Buy, Transfer, Sell ta để kiểu double cũng ngon l&agrave;nh (nhưng v&igrave; chả t&iacute;nh to&aacute;n g&igrave; cả, ta phang lu&ocirc;n kiểu string)</p>

<p><strong>ExrateList</strong>&nbsp;C&oacute; c&aacute;c thuộc t&iacute;nh: DateTime, List&lt;Exrate&gt;, Source.</p>

<p>B&acirc;y giờ ta lần lượt tạo c&aacute;c lớp:</p>

<p>Đầu ti&ecirc;n l&agrave; Lớp Exrate, ta bấm chuột phải v&agrave;o Models/ chọn Add/ Chọn Class:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-10/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-10.png?w=620" /></a></p>

<p>m&agrave;n h&igrave;nh Tạo lớp hiển thị ra như dưới đ&acirc;y:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-11/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-11.png?w=620" /></a></p>

<p>Ta chọn Class, Name đặt l&agrave; Exrate.cs rồi bấm Add:</p>

<p>Coding cho lớp Exrate n&agrave;y mapping với c&aacute;c thuộc t&iacute;nh, tag được định nghĩa trong XML của Ng&acirc;n h&agrave;ng Vietcombank:</p>

```
using System.Xml.Serialization;

namespace VCB.Models
{
    public class Exrate
    {
        [XmlAttribute(AttributeName = "CurrencyCode")]
        public string CurrencyCode { get; set; }
        [XmlAttribute(AttributeName = "CurrencyName")]
        public string CurrencyName { get; set; }
        [XmlAttribute(AttributeName = "Buy")]
        public string Buy { get; set; }
        [XmlAttribute(AttributeName = "Transfer")]
        public string Transfer { get; set; }
        [XmlAttribute(AttributeName = "Sell")]
        public string Sell { get; set; }
    }
}
```

<p>&nbsp;</p>

<p>Ở tr&ecirc;n thấy Tui using System.Xml.Serialization, đ&acirc;y l&agrave; thư vi&ecirc;n li&ecirc;n quan XML, cho ph&eacute;p chuyển h&oacute;a từ XML -&gt; C# class</p>

<p>C&ograve;n c&aacute;c [XmlAttribute(AttributeName = &ldquo;CurrencyCode&rdquo;)] để n&oacute;i cho C# hiểu n&oacute; cần mapping đ&uacute;ng thuộc t&iacute;nh n&agrave;o trong tag XML. T&ecirc;n Property của C# c&oacute; thể viết lung tung, nhưng trong XmlAttribute phải viết ch&iacute;nh x&aacute;c những g&igrave; Ng&acirc;n H&agrave;ng Vietcombank cung cấp.</p>

<p>Tiếp tục lặp lại thao t&aacute;c th&ecirc;m lớp mới cho&nbsp;<strong>ExrateList</strong>:</p>

<pre>
```
<code class="language-cs">using System.Collections.Generic;
using System.Xml.Serialization;

namespace VCB.Models
{
    [XmlRoot(ElementName = "ExrateList")]
    public class ExrateList
    {
        [XmlElement(ElementName = "DateTime")]
        public string DateTime { get; set; }
        [XmlElement(ElementName = "Exrate")]
        public List&lt;Exrate&gt; Exrates { get; set; }
        [XmlElement(ElementName = "Source")]
        public string Source { get; set; }
    }
}
```
</code></pre>

<p>Bước tiếp theo l&agrave; tạo 1 Controller t&ecirc;n l&agrave; TiGiaController để r&uacute;t tr&iacute;ch dữ liệu Tỉ gi&aacute; của Ng&acirc;n h&agrave;ng đồng thời chuyển h&oacute;a n&oacute; qua C# class để hiển thị l&ecirc;n Website ri&ecirc;ng của m&igrave;nh:</p>

<p>Bấm chuột phải v&agrave;o Controllers/ chọn Add/ chọn Controller&hellip;:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-12/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-12.png?w=620" /></a></p>

<p>m&agrave;n h&igrave;nh lựa chọn Controller xuất hiện:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-13/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-13.png?w=620" /></a></p>

<p>Ta chọn MVC Controller Empty rồi bấm Add, m&agrave;n h&igrave;nh y&ecirc;u cầu đặt t&ecirc;n cho Controller xuất hiện:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-14/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-14.png?w=620" /></a></p>

<p>ta đổi Default th&agrave;nh TiGia rồi bấm Add, kết quả:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-15/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-15.png?w=620" /></a></p>

<p>L&uacute;c n&agrave;y h&agrave;m Index hiển thị ra, ta bấm chuột phải v&agrave;o Index để tạo View bằng c&aacute;ch chọn Add View&hellip; (giao diện Website cho n&oacute;):</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-16/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-16.png?w=620" /></a></p>

<p>L&uacute;c n&agrave;y m&agrave;n hinh tạo View hiển thị ra:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-17/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-17.png?w=620" /></a></p>

<p>Phần Template: Chọn List (hiển thị danh s&aacute;ch, trong View n&oacute; l&agrave; Table đ&oacute;)</p>

<p>Phần Model calss: Chọn Exrate -&gt; để hiển thị danh s&aacute;ch Exrate trong lớp ExrateList</p>

<p>c&aacute;c th&ocirc;ng số kh&aacute;c để vậy nha, giờ bấm ADD:</p>

<p>Kết quả View hiển thị ra như dưới đ&acirc;y:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-18/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-18.png?w=620" /></a></p>

<p>Coding HTML đầy đủ của Tigia/Index.cshtml</p>


```
<code class="language-html">

@model IEnumerable&lt;VCB.Models.Exrate&gt;

@{
    ViewData["Title"] = "Index";
}

&lt;h2&gt;Index&lt;/h2&gt;

&lt;p&gt;
    &lt;a asp-action="Create"&gt;Create New&lt;/a&gt;
&lt;/p&gt;
&lt;table class="table"&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;
                @Html.DisplayNameFor(model =&gt; model.CurrencyCode)
            &lt;/th&gt;
            &lt;th&gt;
                @Html.DisplayNameFor(model =&gt; model.CurrencyName)
            &lt;/th&gt;
            &lt;th&gt;
                @Html.DisplayNameFor(model =&gt; model.Buy)
            &lt;/th&gt;
            &lt;th&gt;
                @Html.DisplayNameFor(model =&gt; model.Transfer)
            &lt;/th&gt;
            &lt;th&gt;
                @Html.DisplayNameFor(model =&gt; model.Sell)
            &lt;/th&gt;
            &lt;th&gt;&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        @foreach (var item in Model)
        {
            &lt;tr&gt;
                &lt;td&gt;
                    @Html.DisplayFor(modelItem =&gt; item.CurrencyCode)
                &lt;/td&gt;
                &lt;td&gt;
                    @Html.DisplayFor(modelItem =&gt; item.CurrencyName)
                &lt;/td&gt;
                &lt;td&gt;
                    @Html.DisplayFor(modelItem =&gt; item.Buy)
                &lt;/td&gt;
                &lt;td&gt;
                    @Html.DisplayFor(modelItem =&gt; item.Transfer)
                &lt;/td&gt;
                &lt;td&gt;
                    @Html.DisplayFor(modelItem =&gt; item.Sell)
                &lt;/td&gt;
                &lt;td&gt;
                    @Html.ActionLink("Edit", "Edit", new { /* id=item.PrimaryKey */ }) |
                    @Html.ActionLink("Details", "Details", new { /* id=item.PrimaryKey */ }) |
                    @Html.ActionLink("Delete", "Delete", new { /* id=item.PrimaryKey */ })
                &lt;/td&gt;
            &lt;/tr&gt;
        }
    &lt;/tbody&gt;
&lt;/table&gt;
```
</code>

<p>Giờ quay lại Controller: TiGiaController, tiến h&agrave;nh chỉnh sửa coding:</p>



```
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net;
using System.Xml.Serialization;
using VCB.Models;
namespace VCB.Controllers
{
    public class TiGiaController : Controller
    {
        public IActionResult Index()
        {
            string siteContent = string.Empty;
            // link XML của Vietcombank
            string url = "https://www.vietcombank.com.vn/exchangerates/ExrateXML.aspx";
            //dùng HTTPWebRequest
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.AutomaticDecompression = DecompressionMethods.GZip;
            //lấy đối tượng Response
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            //gọi hàm GetResponseStream() để trả về đối tượng Stream
            Stream responseStream = response.GetResponseStream();
            //convert từ XML qua C# model:
            XmlSerializer serializer = new XmlSerializer(typeof(ExrateList));
            ExrateList exrateList = (ExrateList)serializer.Deserialize(responseStream);
            //lấy danh sách Extrates truyền qua cho View
            return View(exrateList.Exrates);
        }
       
    }
}
```



<p>Nhấn F5 chạy l&ecirc;n, ta c&oacute; kết quả Website như mong muốn:</p>

<p><a href="https://duythanhcse.wordpress.com/2018/10/15/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp-net-core/asp-netcore-19/"><img alt="" src="https://duythanhcse.files.wordpress.com/2018/10/asp-netcore-19.png?w=620" /></a></p>

<p>Như vậy Tui đ&atilde; tr&igrave;nh b&agrave;y xong c&aacute;ch d&ugrave;ng ASP .NET Core để truy suất dữ liệu Tỉ gi&aacute; của ng&acirc;n h&agrave;ng Vietcombank, c&aacute;ch thức chuyển h&oacute;a từ XML th&agrave;nh C# class, cũng như hướng dẫn c&aacute;ch l&agrave;m với Model &ndash; View &ndash; Controller trong ASP .NET Core.</p>

<p>Đ&acirc;y l&agrave; source code của Project:&nbsp;<a href="https://www.mediafire.com/file/yzbbe9fecn1rqw4/Vietcombank.rar/file" target="_blank">Tải tại đ&acirc;y</a></p>

<p>Ch&uacute;c c&aacute;c bạn th&agrave;nh c&ocirc;ng!</p>

<p>Xem chi tiết:[](https://devcode.top/View/61/rut-trich-du-lieu-ti-gia-hoi-doai-cua-ngan-hang-vietcombank-bang-asp.net-core.html) </p>

<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; DevCode.Top via &nbsp;TechTalk</p>