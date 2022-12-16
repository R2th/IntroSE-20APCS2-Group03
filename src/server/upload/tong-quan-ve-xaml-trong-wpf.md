**XAML là gì ?**

XAML là một ngôn ngữ đánh dấu khai báo. Khi được áp dụng cho mô hình lập trình .NET Core, XAML thì nó đơn giản hóa việc tạo UI cho ứng dụng .NET Core. Bạn có thể tạo các thành phần UI có thể nhìn thấy trong đánh dấu XAML khai báo, sau đó tách định nghĩa UI khỏi logic thời gian chạy bằng cách sử dụng  code-behind nối với đánh dấu (markup) thông qua các định nghĩa lớp một phần. XAML trực tiếp đại diện cho việc khởi tạo các đối tượng trong một tập hợp các kiểu sao lưu cụ thể được xác định trong các cụm. Điều này không giống như hầu hết các ngôn ngữ đánh dấu khác, thường là ngôn ngữ được dịch mà không có sự ràng buộc trực tiếp như vậy với hệ thống loại sao lưu. XAML cho phép một quy trình làm việc trong đó các bên riêng biệt có thể làm việc trên UI và logic của ứng dụng, sử dụng các công cụ có khả năng khác nhau.

**Các thành phần đới tượng trong XAML**

Một phần tử đối tượng thường khai báo một thể hiện của một loại. Loại đó được xác định trong các thành phần nắp ghép mà được tham chiếu bởi ngôn ngữ  XAML .  Một thành phần đối đối tượng trong  trong XAML luôn bắt đầu bằng dấu `<` và kết thúc bằng dấu `/>` hoặc là `<ten_object` và kết thúc bằng dấu `</ten_object>` . trong giữa dấu bắt đầu và kết thúc ta có thể khai báo tên đối tương, sử dụng các trường hay khai báo thêm các đối tượng con trong đó ... ví dụ đơn giản như dưới dddaya:
```
<StackPanel Name="stack_">
  <Button Content="Click Me"/>
</StackPanel>
```
trong ví dụ này thì đối tượng StackPanel và Button được ánh xạ vào các class mà được định nghĩa bởi WPF và chúng là một phần của tập WPF. 

**Cú pháp thuộc tính (Attribute syntax )**

Các thuộc tính của một đối tượng thường có thể được biểu thị như các thuộc tính của thành phần đối tượng. Cú pháp thuộc tính đặt tên thuộc tính đối tượng đang được đặt, theo sau là toán tử gán (=). Giá trị của một thuộc tính luôn được chỉ định là một chuỗi được chứa trong dấu ngoặc kép.

Cú pháp thuộc tính là cú pháp thiết lập thuộc tính được sắp xếp hợp lý nhất và là cú pháp trực quan nhất để sử dụng cho các nhà phát triển đã sử dụng ngôn ngữ đánh dấu trong quá khứ. Ví dụ: đánh dấu sau đây tạo một nút có văn bản màu đỏ và nền màu xanh bên cạnh việc hiển thị văn bản được chỉ định là Nội dung.

`<Button Background="Blue" Foreground="Red" Content="This is a button"/>`

**Cú pháp phần tử thuộc tính**

Đối với một số thuộc tính của một thành phần đối tượng, cú pháp thuộc tính là không thể, bởi vì đối tượng hoặc thông tin cần thiết để cung cấp giá trị thuộc tính không thể được thể hiện đầy đủ trong dấu ngoặc kép và giới hạn chuỗi của cú pháp thuộc tính. Đối với những trường hợp này, một cú pháp khác được gọi là cú pháp phần tử thuộc tính có thể được sử dụng.

Cú pháp cho thẻ bắt đầu phần tử thuộc tính là `<TypeName.PropertyName>`. Nói chung, nội dung của thẻ đó là một thành phần đối tượng của loại mà thuộc tính lấy làm giá trị của nó. Sau khi chỉ định nội dung, bạn phải đóng phần tử thuộc tính bằng thẻ kết thúc. Cú pháp cho thẻ kết thúc là </TypeName.PropertyName>.

Nếu một cú pháp thuộc tính là có thể, sử dụng cú pháp thuộc tính thường thuận tiện hơn và cho phép đánh dấu nhỏ gọn hơn, nhưng đó thường chỉ là vấn đề về kiểu dáng, không phải là giới hạn kỹ thuật. Ví dụ sau đây cho thấy các thuộc tính tương tự được đặt như trong ví dụ cú pháp thuộc tính trước đó. Bây giờ bằng cách sử dụng cú pháp phần tử thuộc tính cho tất cả các thuộc tính của Button.
```
<Button>
  <Button.Background>
    <SolidColorBrush Color="Blue"/>
  </Button.Background>
  <Button.Foreground>
    <SolidColorBrush Color="Red"/>
  </Button.Foreground>
  <Button.Content>
    This is a button
  </Button.Content>
</Button>
```
**Cú pháp cho Collection**
Ngôn ngữ XAML bao gồm một số tối ưu hóa tạo ra đánh dấu dễ đọc hơn cho con người. Một tối ưu hóa như vậy là nếu một thuộc tính cụ thể  loại collection, thì các mục mà bạn khai báo trong đánh dấu là các phần tử con trong giá trị của thuộc tính đó trở thành một phần collection. Trong trường hợp này, một tập hợp các phần tử đối tượng con là giá trị được đặt thành thuộc tính của collection.

Ví dụ sau đây cho thấy cú pháp cho colleciton để thiết lập các giá trị của thuộc tính GradientStops.

```
<LinearGradientBrush>
  <LinearGradientBrush.GradientStops>
    <!-- no explicit new GradientStopCollection, parser knows how to find or create -->
    <GradientStop Offset="0.0" Color="Red" />
    <GradientStop Offset="1.0" Color="Blue" />
  </LinearGradientBrush.GradientStops>
</LinearGradientBrush>
```

**Thuộc tính content XAML**

XAML chỉ định một tính năng ngôn ngữ, theo đó một lớp có thể chỉ định chính xác một trong các thuộc tính của nó là thuộc tính nội dung XAML. Các phần tử con của phần tử đối tượng đó được sử dụng để đặt giá trị của thuộc tính nội dung đó. Nói cách khác, đối với thuộc tính nội dung duy nhất, bạn có thể bỏ qua phần tử thuộc tính khi đặt thuộc tính đó trong đánh dấu XAML và tạo ra một ẩn dụ cha / con rõ ràng hơn trong đánh dấu.

Ví dụ: Border chỉ định một thuộc tính nội dung của Child. Hai yếu tố Border sau đây được xử lý giống hệt nhau. Cái đầu tiên tận dụng cú pháp thuộc tính nội dung và bỏ qua phần tử thuộc tính Border.Child. Cái thứ hai hiển thị Border.Child một cách rõ ràng.

```
<Border>
  <TextBox Width="300"/>
</Border>
<!--explicit equivalent-->
<Border>
  <Border.Child>
    <TextBox Width="300"/>
  </Border.Child>
</Border>
```

Theo quy tắc của ngôn ngữ XAML, giá trị của thuộc tính nội dung XAML phải được cung cấp hoàn toàn trước hoặc hoàn toàn sau bất kỳ thành phần thuộc tính nào khác trên thành phần đối tượng đó. Ví dụ, đánh dấu sau không biên dịch.

```
<Button>I am a
  <Button.Background>Blue</Button.Background>
  blue button</Button>
```

**Cú pháp attribute events**

Cú pháp thuộc tính cũng có thể được sử dụng cho các thành viên là sự kiện chứ không phải thuộc tính. Trong trường hợp này, tên của thuộc tính là tên của sự kiện. Trong triển khai WPF các sự kiện cho XAML, giá trị của thuộc tính là tên của trình xử lý thực hiện ủy nhiệm của sự kiện đó. Ví dụ: đánh dấu sau chỉ định một trình xử lý cho sự kiện Click vào Nút được tạo trong đánh dấu:

```
<Page 
  xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
  xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
  x:Class="ExampleNamespace.ExamplePage">
  <Button Click="Button_Click" >Click Me!</Button>
</Page>
```

**XAML root elements và XAML namespaces**

Tệp XAML phải và  chỉ có một phần tử root, để vừa là tệp XML được định dạng tốt vừa là tệp XAML hợp lệ. Đối với các kịch bản WPF điển hình, bạn sử dụng một yếu tố gốc có ý nghĩa nổi bật trong mô hình ứng dụng WPF (ví dụ: Window hoặc Page  cho một trang, ResourceDictionary  cho một từ điển bên ngoài hoặc Application  cho định nghĩa ứng dụng). Ví dụ sau đây cho thấy phần tử gốc của tệp XAML điển hình cho trang WPF, với phần root của  Page.

```
<Page
  xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
  xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
  </Page>
```

**Tiền tố tùy chỉnh và loại tùy chỉnh trong XAML**

Đối với các tùy chỉnh assemblies của riêng bạn hoặc cho các tâp hợp  bên ngoài lõi WPF của PresentationCore, PresentationFramework và WindowsBase, bạn có thể chỉ định assemblies là một phần của ánh xạ xmlns tùy chỉnh. Sau đó, bạn có thể tham chiếu các loại từ cụm đó trong XAML của mình, miễn là loại đó được triển khai chính xác để hỗ trợ các cách sử dụng XAML mà bạn đang cố gắng.

Sau đây là một ví dụ cơ bản về cách các tiền tố tùy chỉnh hoạt động trong đánh dấu XAML. Tùy chỉnh tiền tố được xác định trong thẻ phần tử gốc và được ánh xạ tới một cụm cụ thể được đóng gói và có sẵn với ứng dụng. Tập hợp này chứa một kiểu NumericUpDown, được triển khai để hỗ trợ sử dụng XAML chung cũng như sử dụng một kế thừa lớp cho phép chèn nó tại điểm đặc biệt này trong mô hình nội dung WPF XAML. Một phiên bản của điều khiển NumericUpDown này được khai báo là một phần tử đối tượng, sử dụng tiền tố để trình phân tích cú pháp XAML,  namespace XAML nào chứa kiểu và do đó, cụm sao lưu có chứa định nghĩa kiểu.

```
<Page
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:custom="clr-namespace:NumericUpDownCustomControl;assembly=CustomLibrary"
    >
  <StackPanel Name="LayoutRoot">
    <custom:NumericUpDown Name="numericCtrl1" Width="100" Height="60"/>
...
  </StackPanel>
</Page>
```

**Events và XAML code-behind**

Hầu hết các ứng dụng WPF bao gồm cả đánh dấu XAML và code-behind. Trong một dự án, XAML được viết dưới dạng tệp .xaml và ngôn ngữ CLR như Microsoft Visual Basic hoặc C # được sử dụng để viết tệp code-behind. Khi tệp XAML được đánh dấu được biên dịch như một phần của mô hình ứng dụng và lập trình WPF, vị trí của tệp mã phía sau XAML cho tệp XAML được xác định bằng cách chỉ định một namespace và lớp là thuộc tính x: Class của phần tử gốc của XAML.

Trong các ví dụ cho đến nay, bạn đã thấy một số button, nhưng chưa có button nào trong số này có bất kỳ hành vi logic nào liên quan đến chúng. Cơ chế cấp ứng dụng chính để thêm một hành vi cho một phần tử đối tượng là sử dụng một sự kiện hiện có của lớp phần tử và để viết một trình xử lý cụ thể cho sự kiện đó được gọi khi sự kiện đó được đưa ra trong thời gian chạy. Tên sự kiện và tên của trình xử lý sẽ sử dụng được chỉ định trong đánh dấu, trong khi mã thực hiện trình xử lý của bạn được xác định ở code-behind.

```
<Page 
  xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
  xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
  x:Class="ExampleNamespace.ExamplePage">
  <Button Click="Button_Click" >Click Me!</Button>
</Page>
```

```
namespace ExampleNamespace
{
  public partial class ExamplePage
  {
    void Button_Click(object sender, RoutedEventArgs e)
    {
      Button b = e.Source as Button;
      b.Foreground = Brushes.Red;
    }
  }
}
```