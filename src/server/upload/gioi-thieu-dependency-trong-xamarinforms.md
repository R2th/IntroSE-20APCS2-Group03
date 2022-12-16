# Giới Thiệu
Nghe đến Xamarin.Forms thì có lẽ các biết đều biết đến việc hỗ trợ đa nền tảng trên mobile. Điều này có nghĩa là chỉ cần code 1 lần là có thể chạy trên các nền tảng khác nhau. Nhưng mọi thứ không hề đơn giản như vậy. Dù đã hỗ trợ đa nền tảng trên hầu hết trên các chức năng. Nhưng vẫn còn những chức năng mà bắt buộc phải thực hiện ở phía Native. Chính vì điều này mà Xamarin có **DependencyService** để làm điều này.

![](https://images.viblo.asia/c6c3f756-49c0-4ca0-a06c-8ffc8bd98471.png)

**DependencyService** cho phép gọi tới các hàm được viết ở phía Native. Nhờ vậy mà Xamarin.Forms có thể làm bất cứ điều như mà Native có thể làm.

# Các Bước Thực Hiện
1. Tạo Interface ở phía Xamrin.Forms để khai báo các chức năng cần thực hiện ở phía Native.
2. Tạo các Class ở các tất cả các platform mà bạn muốn hỗ trợ và implement lại Interface được tạo ở bước 1.
3. Đăng ký thuộc tính metadata cho các Class đã tạo ở bước 2 để **DependencyService** có thể tìm được các Class tương ứng với mỗi platform.
4. Gọi các chức năng được implement ở Native thông qua Interface ở Xamarin.Forms.

# Ví Dụ
Để dễ dàng hình dung thì sẽ chúng ta cùng làm 1 sample đơn giản nhé.
- Tạo project Xamarin.Forms mới:

![](https://images.viblo.asia/92f7df0c-f2a0-4507-981f-1249791b8e62.png)

- Tạo 1 Interface trong Xamarin.Forms:

**IContacts.cs**
```
namespace XamarinFormscContacts
{
    public interface IContacts
    {
        Task<List<ContactLists>> GetDeviceContactsAsync();
    }
}
```

- Tạo 1 Model trong Xamarin.Forms:

**ContactLists.cs**
```
namespace XamarinFormscContacts
{
    public class ContactLists
    {
        public string DisplayName { get; set; }
        public string ContactNumber { get; set; }
    }
}
```

- Implement cho các Platform:
> Chú ý: Các Class ở implement sẽ nằm tại các platform tương ứng.

**ContactHelper.cs(Android)**
```
[assembly: Dependency(typeof(ContactHelper))]
namespace XamarinFormscContacts.Droid
{
    class ContactHelper : IContacts
    {
        public async Task<List<ContactLists>>  GetDeviceContactsAsync()
        {
            ContactLists selectedContact = new ContactLists();
            List<ContactLists> contactList = new List<ContactLists>();
            var uri =  ContactsContract.CommonDataKinds.Phone.ContentUri;
            string[] projection =  { ContactsContract.Contacts.InterfaceConsts.Id, ContactsContract.Contacts.InterfaceConsts.DisplayName, ContactsContract.CommonDataKinds.Phone.Number };
            var cursor =  Xamarin.Forms.Forms.Context.ContentResolver.Query(uri, projection, null, null, null);
            if (cursor.MoveToFirst())
            {
                do
                {
                    contactList.Add(new ContactLists()
                    {
                        DisplayName =  cursor.GetString(cursor.GetColumnIndex(projection[1]))
                    });
                } while (cursor.MoveToNext());
            }
            return contactList;
        }
        private object ManagedQuery(Android.Net.Uri uri, string[] projection, object p1, object p2, object p3)
        {
            throw new NotImplementedException();
        }
    }
}
```

**ContactHelper.cs(UWP)**
```
[assembly: Xamarin.Forms.Dependency(typeof(ContactHelper))]
namespace XamarinFormscContacts.UWP
{
    public class ContactHelper: IContacts
    {
        public async Task<List<ContactLists>> GetDeviceContactsAsync()
        {
            List<ContactLists> selectedContact = new List<ContactLists>();
            var contactPicker = new ContactPicker();
            contactPicker.DesiredFieldsWithContactFieldType.Add(ContactFieldType.PhoneNumber);
            Contact contact = await contactPicker.PickContactAsync();
            selectedContact.Add(new ContactLists() { DisplayName = contact.SortName, ContactNumber = contact.YomiDisplayName });
            return selectedContact;
        }
    }
}
```

- Cài đặt giao diện:

**MainPage.Xaml**
```
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://xamarin.com/schemas/2014/forms"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             xmlns:local="clr-namespace:XamarinFormscContacts"
             x:Class="XamarinFormscContacts.MainPage">
    <ContentPage.Content>
        <StackLayout>
            <Button x:Name="btnPick" Text="Pick Contact" Clicked="Button_Clicked"></Button>
            <ListView x:Name="listContact">
                <ListView.ItemTemplate>
                    <DataTemplate>
                        <ViewCell>
                            <StackLayout>
                                <Label Text="{Binding DisplayName}"></Label>
                            </StackLayout>
                        </ViewCell>
                    </DataTemplate>
                </ListView.ItemTemplate>
            </ListView>
        </StackLayout>
    </ContentPage.Content>
</ContentPage>
```

- Gọi hàm qua DependencyService:

**MainPage.Xaml.cs**
```
namespace XamarinFormscContacts
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }
        private async void Button_Clicked(object sender, EventArgs e)
        {
            switch (Device.RuntimePlatform)
            {
                case Device.UWP:
                    var selectContact = await DependencyService.Get<IContacts>().GetDeviceContactsAsync();
                    listContact.ItemsSource = selectContact;
                    break;
                case Device.Android:
                    var ContactList = await DependencyService.Get<IContacts>().GetDeviceContactsAsync();
                    listContact.ItemsSource = ContactList;
                    break;
                default:
                    break;
            }
        }
    }
}
```

- Cấp quyền để đọc địa chỉ liên lạc:

**Android**

![](https://images.viblo.asia/ad806b6c-4943-4cd9-8b1a-89be233e634e.png)

**Window**

![](https://images.viblo.asia/41b35af3-8e93-410d-904d-1bf841e37085.png)

- Kết quả:
 
![](https://images.viblo.asia/1b142bf4-6b5a-4034-a70c-8dc733505503.jpg)

# PHẦN KẾT
Mình xin kết thúc tại đây. Cảm ơn các bạn đã đọc bài viết. Chúc các bạn thực hiện thành công.