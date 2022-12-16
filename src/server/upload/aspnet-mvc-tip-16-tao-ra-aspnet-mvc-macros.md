Trong mẹo này, tôi chỉ cho bạn cách có thể tạo macro Visual Studio 2008 để tạo controller MVC mới, thư mục view và ontroller unit test bằng một lệnh duy nhất.

Đừng hiểu lầm tôi. Tôi thích các công cụ thiết kế Visual Studio 2008. Tôi thích kéo và thả các mục từ hộp công cụ. Tôi đã ghi nhớ nhiều phím tắt hữu ích của Visual Studio. Nhưng, vào cuối ngày, không có gì nhanh hơn bắn ra một lệnh nhanh từ cửa sổ Command.

Trong mẹo này, tôi giải thích làm thế nào bạn có thể tận dụng lợi thế của Visual Studio macro và Visual Studio Command window để tạo ra các tập tin và mã cho một dự án ASP.NET MVC. Đặc biệt, tôi giải thích làm thế nào bạn có thể tạo ra một macro mà tạo ra một controller MVC mới, MVC view, và controller unit test MVC.

## Tạo macro Visual Studio

Có hai cách tiếp cận mà bạn có thể thực hiện để tạo các macro Visual Studio mới. Trước tiên, bạn có thể ghi lại các hành động của mình khi tương tác với Visual Studio. Để thực hiện việc này, hãy chọn tùy chọn menu Công cụ, Macro, Record TemporaryMacro. Một bảng điều khiển giống VCR xuất hiện. Sau khi bạn kết thúc ghi, bạn có thể nhấp vào nút Dừng và bạn sẽ có macro mới mà bạn có thể lưu và phát lại trong tương lai.

Cách tiếp cận khác là viết macro từ đầu. Tôi đã tiếp cận cách thứ hai này khi tạo các macro MVC của tôi. Tôi đã buộc phải sử dụng phương pháp thứ hai này vì tôi cần phải viết các hàm chung sẽ làm việc với bất kỳ dự án MVC nào.

Visual Studio macro phải được viết bằng ngôn ngữ lập trình Visual Basic.NET. Phần lớn mã macro của bạn gọi đến Visual Studio Automation Object Model. Macro MVC của tôi đã tận dụng các đối tượng Automation sau đây:

· DTE - Đối tượng cấp cao nhất trong Visual Studio Automation Model. Đối tượng này có một thuộc tính Solution đại diện cho Visual Studio Solution của bạn. Bạn có thể sử dụng thuộc tính Solution để truy cập vào các dự án riêng lẻ trong Solution của bạn.

· Project - Thể hiện một dự án riêng lẻ trong solution của bạn như một dự án MVC hoặc một dự án Test. Sử dụng thuộc tính ProjectItems để đến từng mục dự án riêng lẻ như tệp và folder dự án.

· CodeModel - Thể hiện mã trong một dự án. Bạn có thể sử dụng CodeModel để thêm các lớp mới vào một dự án.

Bạn tạo một dự án Visual Studio Macro mới bằng cách chọn tùy chọn menu Tools, Macros, New Macro Project. Chọn menu này sẽ mở New Macro Project Dialog Box (xem Hình 1).

Figure 1 – New Macro Project Dialog Box
	![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NETMVCTip16CreateASP.NETMVCMacros_FCB7/clip_image002_thumb.jpg)

Sau khi bạn tạo một dự án Macro mới, cửa sổ Macro Explorer sẽ mở ra ở vị trí thường bị chiếm bởi cửa sổ Solution Explorer (xem Hình 2). Bạn có thể bấm đúp vào bất kỳ macro nào trong cửa sổ Macro Explorer để chạy macro. Bạn cũng có thể nhấp chuột phải vào macro trong Macro Explorer và chọn menu Edit để sửa đổi macro.

Figure 2 – Macro Explorer Window
![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NETMVCTip16CreateASP.NETMVCMacros_FCB7/clip_image004_thumb.jpg)

Khi bạn chỉnh sửa macro, Macro IDE xuất hiện. Macro IDE trông giống như một thể hiện khác của Visual Studio 2008. Tuy nhiên, nó là một môi trường phát triển hạn chế hơn được thiết kế đặc biệt để phát triển các macro.

Bạn tạo một tập các macro bằng cách tạo mô-đun Visual Basic .NET. Mỗi chương trình con public mà bạn xác định trong mô-đun được hiển thị dưới dạng macro riêng biệt. Ví dụ, mã trong Liệt kê 1 một macro siêu đơn giản chỉ hiển thị một hộp thông điệp với thông báo “Hello World!”.

Listing 1 – Test.vb

```
Imports System
Imports EnvDTE
Imports EnvDTE80
Imports EnvDTE90
Imports System.Diagnostics
 
Public Module Test
 
    Sub SayHello()
        MsgBox("Hello World!")
    End Sub
 
End Module
```

Một chương trình con macro có thể nhận các tham số. Tuy nhiên, tất cả các tham số phải là tham số Optional - sử dụng từ khóa Optional của Visual Basic. Nếu bạn không tạo các tham số tùy chọn, thì chương trình con sẽ không xuất hiện trong cửa sổ Macro Explorer.

## Thực thi Visual Studio Macro
Sau khi bạn tạo macro, có một số cách để thực thi macro:

· Từ cửa sổ Macro Explorer

· Từ cửa sổ Command

· Từ hộp Find input

Cách dễ nhất để thực hiện macro là bấm đúp vào macro trong cửa sổ Macro Explorer. Tuy nhiên, điều đó đánh bại mục đích của mẹo này. Mục tiêu của mẹo này là giải thích cách bạn có thể nhanh chóng sửa đổi dự án ASP.NET MVC bằng cách gõ lệnh.

Tùy chọn thứ hai là thực hiện một macro từ cửa sổ Command. Bạn có thể mở cửa sổ Command bằng cách chọn tùy chọn menu View, Other Windows, Command Window (hoặc tốt hơn, sử dụng tổ hợp phím Ctrl-Alt-A). Sau khi cửa sổ Command mở ra, bạn có thể tắt macro bằng cách nhập *Macros.Macro Name*. Ví dụ, bạn có thể thực thi macro mà chúng ta đã tạo trong phần trước bằng cách gõ lệnh sau vào cửa sổ Lệnh:

Macros.MVC.Test.SayHello

Bạn nhận được câu lệnh đầy đủ khi nhập tên macro (xem Hình 3). Vì vậy, bạn thực sự chỉ cần nhập chữ “m” và mũi tên xuống macro mà bạn muốn thực thi.

Figure 3 – Command window statement completion
![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NETMVCTip16CreateASP.NETMVCMacros_FCB7/clip_image006_thumb.jpg)

Tôi đã khám phá ra phương pháp cuối cùng để thực hiện một macro từ blog của Sara Ford tại:

http://blogs.msdn.com/SaraFord/

Bạn có thể thực hiện một macro từ hộp Find input xuất hiện trong thanh công cụ Visual Studio (xem Hình 4). Nhập một ">" theo sau là tên của macro để thực thi macro. Bạn có thể điều hướng nhanh đến hộp Find input từ bàn phím bằng cách sử dụng tổ hợp phím Ctrl + / (Nhấn phím Ctl và bấm dấu gạch chéo trước).

Hình 4 - Thực hiện một macro từ Find input
![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NETMVCTip16CreateASP.NETMVCMacros_FCB7/clip_image008_thumb.jpg)

## Tạo Macro Aliases
Nếu bạn thực sự muốn giảm số lượng nhập cần thiết để thực thi macro thì bạn có thể tạo Macro Aliases. Chỉ cần sử dụng lệnh **alias** như thế này:

`alias h Macros.MVC.Test.SayHello`

Sau khi bạn thực hiện lệnh này từ cửa sổ Command, bạn có thể thực thi macro SayHello chỉ bằng cách nhập chữ cái đơn h.

Bạn xóa bí danh bằng nút chuyển / xóa như sau:

`Alias h /delete`

Bằng cách tận dụng các alias, bạn có thể thực hiện các tác vụ ASP.NET MVC phổ biến với mức tối thiểu là gõ.

## Tạo một Macro MVC ASP.NET
Các macro MVC được chứa trong Liệt kê 2. Tệp trong Liệt kê 2 chứa một mô-đun có tên Generate có chứa bốn hàm public có tên là All, Controller, View và ControllerTest.

Listing 2 – Generate.vb

```
Imports System
Imports EnvDTE
Imports EnvDTE80
Imports EnvDTE90
Imports System.Diagnostics
Imports System.IO
 
Public Module Generate
 
    Sub All(Optional ByVal name As String = "NewThing")
        ' Generate Controller
        Controller(name)
 
        ' Generate View
        View(name)
 
        ' Generate Controller Test
        ControllerTest(name)
    End Sub
 
    Sub Controller(Optional ByVal name As String = "NewThing")
        ' Get MVC project
        Dim mvcProj = GetMVCProject()
        If Not IsNothing(mvcProj) Then
            BuildControllerClass(mvcProj, name)
        End If
    End Sub
 
    Sub View(Optional ByVal name As String = "NewThing")
        ' Get MVC project
        Dim mvcProj = GetMVCProject()
        If Not IsNothing(mvcProj) Then
            BuildView(mvcProj, name)
        End If
    End Sub
 
    Sub ControllerTest(Optional ByVal name As String = "NewThing")
        ' Get Test project
        Dim testProj = GetTestProject()
        If Not IsNothing(testProj) Then
            BuildControllerTestClass(testProj, name)
        End If
    End Sub
 
    Private Sub BuildControllerClass(ByVal project As Project, ByVal name As String)
        Dim controllerName As String = name & "Controller.cs"
        Dim controllerPath = Path.Combine(Path.GetDirectoryName(project.FileName), Path.Combine("Controllers", controllerName))
        Dim newController As CodeClass = project.CodeModel.AddClass(Path.GetFileNameWithoutExtension(controllerName), controllerPath, 0, "System.Web.Mvc.Controller", Nothing, vsCMAccess.vsCMAccessPublic)
 
        ' Add Index Function
        Dim func As CodeFunction2 = newController.AddFunction("Index", vsCMFunction.vsCMFunctionFunction, "System.Web.Mvc.ActionResult")
        func.Access = vsCMAccess.vsCMAccessPublic
    End Sub
 
    Private Sub BuildView(ByVal project As Project, ByVal name As String)
        Dim viewsFolder As ProjectItem = GetViewsFolder(project)
        If Not IsNothing(viewsFolder) Then
            viewsFolder.ProjectItems.AddFolder(name)
        End If
    End Sub
 
    Private Sub BuildControllerTestClass(ByVal project As Project, ByVal name As String)
        Dim controllerName As String = name & "ControllerTests.cs"
        Dim controllerPath = Path.Combine(Path.GetDirectoryName(project.FileName), Path.Combine("Controllers", controllerName))
        Dim newControllerTest As CodeClass = project.CodeModel.AddClass(Path.GetFileNameWithoutExtension(controllerName), controllerPath, 0, Nothing, Nothing, vsCMAccess.vsCMAccessPublic)
        newControllerTest.AddAttribute("Microsoft.VisualStudio.TestTools.UnitTesting.TestClass", String.Empty)
 
        ' Add Test Function
        Dim func As CodeFunction2 = newControllerTest.AddFunction("IndexTest", vsCMFunction.vsCMFunctionSub, "void")
        func.AddAttribute("Microsoft.VisualStudio.TestTools.UnitTesting.TestMethod", String.Empty)
        func.Access = vsCMAccess.vsCMAccessPublic
    End Sub
 
    ' Gets MVC project based on NO Tests suffix
    Private Function GetMVCProject() As Project
        For Each proj As Project In DTE.Solution.Projects
            If Not proj.Name.EndsWith("tests", StringComparison.InvariantCultureIgnoreCase) Then
                Return proj
            End If
        Next
        Return Nothing
    End Function
 
    ' Gets test project based on Tests suffix
    Private Function GetTestProject() As EnvDTE.Project
        For Each proj As EnvDTE.Project In DTE.Solution.Projects
            If proj.Name.EndsWith("tests", StringComparison.InvariantCultureIgnoreCase) Then
                Return proj
            End If
        Next
        Return Nothing
    End Function
 
    Private Function GetViewsFolder(ByVal project As Project)
        For Each item As ProjectItem In project.ProjectItems
            If String.Compare(item.Name, "Views") = 0 Then
                Return item
            End If
        Next
        Return Nothing
    End Function
End Module
```

Bạn có thể tạo một controller mới, thư mục view và kiểm tra controller bằng cách thực hiện lệnh sau từ cửa sổ Command hoặc Find input:

`Macros.MVC.Generate.All Product`

Việc thực hiện lệnh này tạo ra một controller mới có tên ProductController, một thư mục view mới có tên là Product và một unit test mới có tên ProductControllerTests.

Nếu bạn muốn giảm số lượng nhập mà bạn cần thực thi các lệnh này, thì bạn có thể tạo một alias macro như sau:

`alias gen Macros.MVC.Generate.All`

Lệnh này tạo ra một alias name gen thể hiện cho macro MVC.Generate.All. Sau khi bạn tạo alias, bạn có thể tạo một controller mới, thư mục view và lớp unit test như sau:

`gen Customer`

Đây là cách tiếp cận cuối cùng để tạo các mục dự án MVC theo cách nhanh nhất và lười nhất có thể! Sau khi thực hiện lệnh này, Solution của bạn sẽ chứa các tệp trong Hình 5.

Figure 5 -- Tạo một khách hàng
![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NETMVCTip16CreateASP.NETMVCMacros_FCB7/image_thumb_2.png)

## Tóm lược
Mục tiêu của tôi với mẹo này là để cho thấy rằng có thể xây dựng các lệnh có thể được thực hiện từ bên trong Visual Studio IDE cho phép bạn nhanh chóng tạo ra các mục trong dự án ASP.NET MVC. Bằng cách tận dụng đầy đủ các Automation Model hóa mạnh mẽ trong Visual Studio 2008, bạn có thể (về mặt lý thuyết) xây dựng toàn bộ Ứng dụng ASP.NET MVC mà không cần mở một hộp thoại hoặc chọn một mục menu đơn.

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-16-create-asp-net-mvc-macros