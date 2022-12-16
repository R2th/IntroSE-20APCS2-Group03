Ở bài viết lần trước https://viblo.asia/p/triggers-trong-xamarin-gGJ59gppZX2 mình đã giới thiệu với các bạn về 2 loại Triggers trong Xamarin Forms:  Property Triggers và Data Triggers. Ở bài viết này mình sẽ giới thiệu  **Event Triggers** và **Multi Triggers** :D

## Event Triggers
**Event Triggers** chỉ yêu cầu một thuộc tính **Event**, ví dụ như **"Clicked"** trong ví dụ dưới đây:

```
<EventTrigger Event="Clicked">
	<local:NumericValidationTriggerAction />
</EventTrigger>
```

Cần chú ý là không có thành phần **Setter** mà là tham chiếu đến một class được định nghĩa bởi **local:NumericValidationTriggerAction** và yêu cầu **xmlns:local** phải được định nghĩa trong XAML:

```
<ContentPage xmlns="http://xamarin.com/schemas/2014/forms"
			 xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
			 xmlns:local="clr-namespace:WorkingWithTriggers;assembly=WorkingWithTriggers"
```

Class implement **TriggerAction** sẽ override phương thức **Invoke**, phương thức này sẽ được gọi bất kì lúc nào khi trigger event xảy ra.

Một trigger implement action nên có:
* Implement class **TriggerAction<T>** chung, với tham số tương ứng chung cùng loại control mà trigger sẽ áp dụng vào. Có thể sử dụng các superclass như **VisualElement** để viết trigger hoạt động đa dạng với nhiều loại control hoặc một control cụ thể như **Entry**
* Override phương thức **Invoke** - Phương thức này được gọi bất kì lúc nào khi điều kiện trigger đúng.
* Tuỳ chọn có thể hiển thị thuộc tính set vào XAML khi trigger được khai báo (ví dụ như **Anchor**, **Scale**, **Length** trong ví dụ dưới đây)

```
public class NumericValidationTriggerAction : TriggerAction<Entry>
{
	protected override void Invoke (Entry entry)
	{
		double result;
		bool isValid = Double.TryParse (entry.Text, out result);
		entry.TextColor = isValid ? Color.Default : Color.Red;
	}
}
```

Thuộc tính được lộ ra bởi trigger có thể được đặt trong file XAML nhé sau: 

```
<EventTrigger Event="TextChanged">
    <local:NumericValidationTriggerAction />
</EventTrigger>
```

Tuy nhiên, bạn cần cẩn thận khi chia sẻ triggers trong **ResourceDictionary**, một instance có thể được chia sẻ giữa các control vì vậy nên bất kì trạng thái nào được định nghĩa sẽ áp dụng cho tất cả.
Chú ý rằng event triggers không support **EnterActions** và **ExitActions**

## Multi Triggers

Một **MultiTrigger** cũng gần giống với **Trigger** hay **DataTrigger** ngoại trừ nó có thể có nhiều hơn một điều kiện. Tất cả các điều kiện phải true trước khi **Setter** được kích hoạt.
Dưới đây là một ví dụ của trigger cho một button được bind vào 2 input khác nhau (**email** và **phone**):

```
<MultiTrigger TargetType="Button">
	<MultiTrigger.Conditions>
		<BindingCondition Binding="{Binding Source={x:Reference email},
                                   Path=Text.Length}"
                               Value="0" />
		<BindingCondition Binding="{Binding Source={x:Reference phone},
                                   Path=Text.Length}"
                               Value="0" />
	</MultiTrigger.Conditions>

  <Setter Property="IsEnabled" Value="False" />
	<!-- multiple Setter elements are allowed -->
</MultiTrigger>
```

Tập điều kiện **Condition** cũng có thể bao gồm **PropertyCondition** giống như này:

```
<PropertyCondition Property="Text" Value="OK" />
```

### Xây dựng một multi trigger "bao gồm tất cả"

Một multi trigger chỉ update các control của nó khi tất cả các điều kiện là true. Thử nghiệm với "tất cả các trường đều rỗng" (ví dụ như trang đăng nhập - tất cả các input đều phải điền) là khôn ngoan vì bạn muốn điều kiện "where Text.Length >" nhưng không thể thể hiện bằng XAML.
Điều này có thể làm được với **IvalueConverter**. Đoạn code converter bên dưới sẽ biến đổi **Text.Length** binding vào **bool**, nó sẽ cho biết các trường đã được điền đầy đủ hay chưa:

```
public class MultiTriggerConverter : IValueConverter
{
	public object Convert(object value, Type targetType,
		object parameter, CultureInfo culture)
	{
		if ((int)value > 0) // length > 0 ?
			return true;			// some data has been entered
		else
			return false;			// input is empty
	}

	public object ConvertBack(object value, Type targetType,
		object parameter, CultureInfo culture)
	{
		throw new NotSupportedException ();
	}
}
```

Để sử dụng converter này trong multi trigger, đầu tiên ta thêm vào trong resource dictionary của trang (cùng với custom **xmlns:local** namespace):

```
<ResourceDictionary>
   <local:MultiTriggerConverter x:Key="dataHasBeenEntered" />
</ResourceDictionary>
```

XAML như dưới đây. Chú ý rằng những thứ dưới đây khác với ví dụ multi trigger đầu tiên:
* Button **IsEnabled="false"** được set mặc định.
* Điều kiện multi trigger dùng trong converter để biến đổi **Text.Length** thành biến boolean.
* Khi tất cả các điều kiện là **true**, setter sẽ làm thuộc tính **IsEnabled** thành **true**.

```
<Entry x:Name="user" Text="" Placeholder="user name" />

<Entry x:Name="pwd" Text="" Placeholder="password" />

<Button x:Name="loginButton" Text="Login"
        FontSize="Large"
        HorizontalOptions="Center"
        IsEnabled="false">
  <Button.Triggers>
    <MultiTrigger TargetType="Button">
      <MultiTrigger.Conditions>
        <BindingCondition Binding="{Binding Source={x:Reference user},
                              Path=Text.Length,
                              Converter={StaticResource dataHasBeenEntered}}"
                          Value="true" />
        <BindingCondition Binding="{Binding Source={x:Reference pwd},
                              Path=Text.Length,
                              Converter={StaticResource dataHasBeenEntered}}"
                          Value="true" />
      </MultiTrigger.Conditions>
      <Setter Property="IsEnabled" Value="True" />
    </MultiTrigger>
  </Button.Triggers>
</Button>
```

Screenshot dưới đây cho thấy sự khác nhau giữa 2 ví dụ multi trigger trên. Phần bên trên của màn hình, text input chỉ trong 1 **Entry** là đủ để enable button **Save**. Trong khi đó, ở phần dưới, button **Login** sẽ không active cho đến khi cả 2 trường được điền đẩy đủ.

![](https://images.viblo.asia/6c68c807-0f4d-4c26-851b-87629eb007aa.png)

Bài viết của mình đến đây là hết. Cảm ơn các bạn đã đọc bài của mình :D