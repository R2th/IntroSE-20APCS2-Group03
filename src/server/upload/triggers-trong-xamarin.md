## Triggers
Triggers cho phép bạn diễn tả các hành động được khai báo trong XAML mà nó dùng để thay đổi hiển thị của các control dựa trên các sự kiện (event) hay thuộc tính (property). Bạn có thể gán thuộc tính trực tiếp trong control hoặc thêm vào resource dictionary ở tầng page hay tầng app để apply cho nhiều control.
Trigger có 4 loại:
* **Property Trigger** - xảy ra khi 1 thuộc tính (propertype) của control được set 1 giá trị cụ thể.
* **Data Trigger** - dùng để binding data đến trigger dựa vào thuộc tính của 1 control khác.
* **Event Trigger** - xảy ra khi một sự kiện (event) xảy ra trên control.
* **Multi Trigger** - cho phép set nhiều điều kiện trigger trước khi xảy ra action

## Property Trigger
Một trigger đơn giản có thể được thể hiện thông qua XAML thuần, thêm 1 thành phần ***trigger*** vào collection triggers của control. Ở đây mình ví dụ trigger thay đổi background color của ***entry*** khi focus:

```
<Entry Placeholder="enter name">
	<Entry.Triggers>
		<Trigger TargetType="Entry"
             Property="IsFocused" Value="True">
            <Setter Property="BackgroundColor" Value="Yellow" />
        </Trigger>
	</Entry.Triggers>
</Entry>
```
Các thành phần quan trọng trong định nghĩa trigger là:
* **TargetType** - loại control mà trigger áp dụng.
* **Property** - thuộc tính được theo dõi trên control.
*  **Value** - giá trị mà khi thuộc tính được theo dõi nhận được, trigger sẽ được kích hoạt.
*   **Setter** - một collection của các thành phần ***Setter*** được thêm vào và tương thích với điều khiện trigger. Khi này, ***Property*** và ***Value*** phải được chỉ định.
*   **EnterActions và ExitActions** - được viết bằng code và có thể dùng trong điều khiện để (hoặc thay thế) các thành phần *Setter*.

### Áp dụng Trigger bằng cách sử dụng Style
Triggers cũng có thể được thêm vào ***Style*** định nghĩa trong control, trong page hoặc application ***ResourceDictionary***. Ví dụ sau định nghĩa một style ngầm (ko set ***Key***), có nghĩa là sẽ áp dụng đối với tất cả các ***Entry*** control trong page.

```
<ContentPage.Resources>
    <ResourceDictionary>
        <Style TargetType="Entry">
						<Style.Triggers>
                <Trigger TargetType="Entry"
                         Property="IsFocused" Value="True">
                    <Setter Property="BackgroundColor" Value="Yellow" />
                </Trigger>
            </Style.Triggers>
        </Style>
    </ResourceDictionary>
</ContentPage.Resources>
```

## Data Triggers
Data triggers dùng để binding data đến một control khác để giám sát, khiến ***Setter*** sẽ được gọi. Thay vì dùng thuộc tính ***Property*** trong property trigger, set thuộc tính ***Binding*** để giám sát một thuộc tính cụ thể.
Ví dụ sau sử dụng cú pháp binding ***{Binding Source={x:Reference entry}, Path=Text.Length}***, cho phép chúng ta trỏ đến một thuộc tính của control khác. Khi length của ***entry*** bằng 0, trigger sẽ được kích hoạt để disable button khi input là empty:

```
<!-- the x:Name is referenced below in DataTrigger-->
<!-- tip: make sure to set the Text="" (or some other default) -->
<Entry x:Name="entry"
       Text=""
       Placeholder="required field" />

<Button x:Name="button" Text="Save"
        FontSize="Large"
        HorizontalOptions="Center">
    <Button.Triggers>
        <DataTrigger TargetType="Button"
                     Binding="{Binding Source={x:Reference entry},
                                       Path=Text.Length}"
                     Value="0">
            <Setter Property="IsEnabled" Value="False" />
        </DataTrigger>
    </Button.Triggers>
</Button>
```

Tip: Khi định nghĩa ***Path=Text.Length*** luôn luôn cung cấp một giá trị mặc định cho property được chỉ định đến (ví dụ ***Tex=""***) vì nếu không, giá trị sẽ là ***null*** và trigger sẽ không hoạt động.

Phần sau mình sẽ giới thiệu đến các bạn **Event Triggers** và **Multi Triggers**. Cảm ơn các bạn đã đọc bài của mình :D