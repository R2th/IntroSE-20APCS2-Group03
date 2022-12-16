Sau kì 1 tạo first App và tìm hiểu Page Navigation, kì này chúng ta sẽ tiếp tục cùng nhau tìm hiểu cách thao tác data với Xamarin, qua 1 sample Note nhé. :grinning: 
***
 **Tạo class data và database object**  
Trước tiên mình add Nuget Package Sqlite vào solution (Vào Tools -> Nuget Package Manager -> tìm từ khoá "sqlite-net-pcl" -> Install).  
Kế tiếp mình tạo class Note.cs với các field NoteID (set là PrimaryKey, AutoIncrement).  
```
    public class Note
    {
        [PrimaryKey,AutoIncrement]
        public int NoteID { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
    }
```
Sau đó tạo Class thao tác database (mình đặt tên là NoteDatabase), khai báo các hàm thao tác Note: Get tất cả Note, Get Note theo ID, Save Note (insert/update), Delete Note...  
```
SQLiteAsyncConnection _database;
        public NoteDatabase(string dbPath)
        {
            _database = new SQLiteAsyncConnection(dbPath);
            _database.CreateTableAsync<Note>().Wait();
        }

        public Task<List<Note>> GetNotesAsync()
        {
            return _database.Table<Note>().ToListAsync();
        }

        public Task<Note> GetNoteAsync(int noteId)
        {
            return _database.Table<Note>().Where(i => i.NoteID == noteId).FirstOrDefaultAsync();
        }
```
***
**Tạo page thao tác item**  
Tạo Main page để hiển thị list Note, và Item page để thao tác (Add new, Update Note).  
Dưới đây là MainPage.xaml. Chúng ta cho hiển thị title và date của Note như trong thẻ <DataTemplate>   
```
<StackLayout>
        <!-- Place new controls here -->
        <Label Text="Welcome to Xamarin.Forms!" 
           HorizontalOptions="Center"
           VerticalOptions="CenterAndExpand" />
        <ListView x:Name="listNotes" SelectionMode="Single" 
                  ItemSelected="OnSelectedItem" 
                  SelectedItem="{Binding SelectedItem}">
            <ListView.ItemTemplate>
                <DataTemplate>
                    <TextCell Text="{Binding Title}" Detail="{Binding Date}"/>
                </DataTemplate>
            </ListView.ItemTemplate>
        </ListView>
        <Button Text="add new item" 
            VerticalOptions="CenterAndExpand"
            HorizontalOptions="Center"
            Clicked="OnAddNewClicked" />
    </StackLayout>
```
Ở phần code behind MainPage.xaml.cs thì chúng ta get data như sau:  
```
        protected async override void OnAppearing()
        {
            base.OnAppearing();

            //Get All Notes
            var noteList = await App.Database.GetNotesAsync();
            if (noteList != null)
            {
                listNotes.ItemsSource = noteList;
            }
        }

        async void OnSelectedItem(object sender, SelectedItemChangedEventArgs args)
        {
            var selectedItem = (Note)args.SelectedItem;
            var ItemPage = new ItemPage(selectedItem.NoteID, true);
            await Navigation.PushAsync(ItemPage);
        }
```
Khi chạy thì source sẽ hiển thị list Note đã nhập, và khi select 1 Note thì sẽ truyền NoteID vào Page Item để tiến hành Update Note đó.  
***
**Submit Note**  
Chúng ta submit để update/add Note. Khi update thành công thì hiển thị message và back về trang Main.
 ```
async void OnSubmitClicked(Object sender, EventArgs e)
        {
            var note = new Note()
            {
                Title = Title.Text,
                Text = Text.Text,
                Date = DateTime.Now
            };            
            await App.Database.SaveNoteAsync(note);
            await DisplayAlert("Success", "Note added Successfully", "OK");
            await Navigation.PopAsync();
        }
```
***
**Thử chạy Android Emulator và run source**  
![](https://images.viblo.asia/acc280ef-edae-4b5e-bca4-abb4be9113e7.png)

***
**Tạm kết**  
 Trên đây là 1 sample Note với Xamarin, có thao tác data. Lần tới chúng ta sẽ cùng nhau tiếp tục tìm hiểu thêm những ví dụ khác.  
 Nếu các bạn có hứng thú thì hãy đồng hành cùng mình khám phá nhé. :roller_coaster::roller_coaster::roller_coaster:
***
Link tham khảo:  
https://docs.microsoft.com/en-us/xamarin/xamarin-forms/  
https://xamarinmonkeys.blogspot.com/2019/02/xamarinforms-sqlite-database-crud.html