Nguồn: https://www.raywenderlich.com/10212963-xcode-test-plans-for-ios-getting-started

Ngày hôm nay chúng ta sẽ đến với phần triển khai test tự động thuộc về development process. Đây là một phần rất quan trọng trong quá trình phát triển. Và may mắn là Xcode đã cung cấp các tool để làm việc này dễ dàng hơn với người dùng.

Hôm nay chúng ta sẽ học về:
* Làm sao để tạo kế hoạch test trên Xcode
* Tại sao bạn nên tạo nhiều test plan trong app
* Làm sao để test với nhiều localizations
* Làm sao để sử dụng phân tích code và quản lý memory trong kế hoạch test

# Getting Started/Bắt đầu
Project bạn sẽ làm việc cùng là một app được viết bởi SwiftUI.

Hãy download thư mục project trong link nguồn để bắt đầu.
![](https://images.viblo.asia/5cb678f5-5de7-452e-92cc-893896a90843.gif)

# Testing the Tests/Kiểm tra phần Tests
Giờ trở lại project và hãy kiểm tra test class, `AccountsViewModelUnitTest` và `AccountsViewUITest`:

Chạy test bằng cách ấn Cmd+U. Mở Test navigator để kiểm tra kết quả:
![](https://images.viblo.asia/32cb5916-7a9c-4537-8342-be6d773fb3db.png)

# Unit Tests and UI Tests
Unite test sẽ kiểm tra xem liệu mỗi thành phần trong code, ví dụ như class hay function, có thực hiện đúng kết quả mong muốn hay không. Unit test chạy độc lập, không phụ thuộc vào các module hay component khác. Vì vậy nên nó tốn ít thời gian và tài nguyên. Bạn không nên do dự khi viết thêm nhiều unit test!
![](https://images.viblo.asia/db557081-1ebb-4514-8b67-4903ad1ff415.gif)
End-to-end test sẽ kiểm tra app của bạn từ khi chạy cho đến khi kết thúc. Một trong số các công cụ bạn có thể sử dụng cho end-to-end test là UI test, cái sẽ tương tác với app như các user sẽ thao tác với nó. UI test sẽ chậm hơn và tốn nhiều thời gian hơn unit test.
Bạn nên tránh viết UI test khi bạn có thể thực hiện được nó chỉ với một số unit test đơn giản.
Như bạn thấy ở kết quả test bên trên, mỗi lần bạn chạy test case, bạn chạy cả UI và unit test. Điều này rất thuận tiện cho quá trình phát triển.
Ví dụ, bạn có thể xem xét thực hiện unit test cho mỗi branch riêng mà bạn đã push lên, và chạy end-to-end test trước khi merge branch của bạn vào branch phát triển chính.

# Creating Your First Test Plans/Tạo kế hoạch test đầu tiên
Tạo kế hoach test cho phép bạn điều khiển test  vào sẽ được chạy ở thời điểm nào. Trong phần này, bạn sẽ tạo 2 kế hoạch test: một cho unit test và một cho cả unit và UI test.

## Creating a Unit Test Plan/Tạo kế hoạch unit test
Đầu tiên bạn sẽ chỉ làm kế hoạch unit test. Làm theo các bước dưới đây để cấu hình kế hoạch test:

1. Click vào tên scheme, **BudgetKeeper** và chọn **Edit scheme**
2. Trong mục **Test** chọn **Convert to use Test Plans**

![](https://images.viblo.asia/c0b544f6-e9ce-4d45-aaaa-8e29f001b659.png)
3. Trong popup xuất hiện, chọn** Create empty test plan** và click **Convert**
4. Đặt tên nó là **UnitTests.xctestplan** và click **Save**. Đóng scheme editor lại bằng cách click vào **Close**.
5. Giờ bạn đã có **UnitTests.xctestplan** file trong forlder project gốc. Chọn nó và click vào **Add Test Target**, sử dụng dấu + nhỏ ở dưới.
6. Chọn **BudgetKeeperTests** và click vào **Add**

Giờ, bấn Cmd+U và kiểm tra **Test navigator**:
![](https://images.viblo.asia/a5b9b3b4-f40d-4529-a177-3128dd6cb332.png)
Bạn sẽ thấy kết quả như trên với kế hoạch test của  bạn, chỉ có phần  unit test được thực hiện.

## Creating a Full Test Plan/Tạo kế hoạch test hoàn chỉnh
Tạo một kế hoạch test bằng cách lặp lại các bước ở trên. Đặt tên nó là **FullTests.xctestplan**. Chọn cả **BudgetKeeperTests** và **BudgetKeeperUITests** như là target. Nếu bạn làm đúng, bạn sẽ thấy như hình:
![](https://images.viblo.asia/6c6378e3-ccd5-4230-812c-56068eedcb12.png)
Đặt **FullTests.xctestplan** làm kế hoạch mặc định. Close nó lại.

# Testing Multiple Localizations/Test với nhiều ngôn ngữ
Có một số file localization trong project:
![](https://images.viblo.asia/ff3c49c3-700c-4592-96cb-7b0efb56c2b9.png)
Vậy là app của bạn đã hỗ trợ 2 ngôn ngữ, tiếng Anh và tiếng Đức.

## Setting up Configurations/Cài đặt cấu hình
Nếu app của bạn phụ thuộc và khu vực của user hoặc ngôn ngữ, nó sẽ rất có ý nghĩa khi chạy UI test cho một vài ngôn ngữ và khu vực.

Hãy cài đặt kế hoạch **FullTests** của bạn để thực hiện UI test cho cả tiếng Anh và tiếng Đức bằng cách tạo 2 cấu hình riêng biệt:
1. Chọn **FullTests.xctestplan**. Trong **Configurations** tab, đổi thên **Configuration 1** thành **German** bằng cách ấn **Enter** và thay thế các đoạn text đang tồn tại.
2. Trong cài đặt cấu hình, đặt **Application Language** thành **German**. Đặt **Application Region** thành **Germany**:

![](https://images.viblo.asia/2bf8c206-6548-4bec-a739-662113aad04d.png)
3. Vẫn ở **Configurations** tab, click vào dấu + và thêm cấu hình mới
4. Chọn cấu hình mới tạo và ấn **Enter** để đổi thành **English**
5. Trong cấu hình  **English**, đặt **Application Language** thành English. Đặt **Application Region** thành **United States**

## Running the Localization Tests
Đi đến **AccountsViewUITest** và chọn **Run in All Configurations**. Làm việc này bằng cách click chuột phải vào nút **Play** bên trái của `AccountsViewUITest`:
![](https://images.viblo.asia/6cc6b62d-aa35-4e38-adda-03bd3d8deb60.png)
Sau đó, trong cùng menu, chọn **Jump to Report** để xem lại kết quả:
![](https://images.viblo.asia/19fb645e-61de-4f27-b1cc-8fa9e546bf2d.png)
Lần này nó failed! Làm thế nào để fix nó?
Bắt đầu bằng việc kiểm tra `testUpdateBalance()`. Mở rộng báo cáo cho cấu hình **German** để tìm nguyên nhân lỗi:
![](https://images.viblo.asia/87584208-4fff-4f10-961c-d0b786417887.png)
Click vào **Eye** icon ở gần chữ **Automatic Screenshot**:
![](https://images.viblo.asia/1623cb91-6519-491d-80db-5ec5171dfde5.jpeg)
Bạn sẽ thấy ký tự tiền tệ bị sai, khu vực đang là Germany. Nhưng tiền tệ đang là dollar chứ không phải euro!

## Adapting the Code for Locale-Dependent Tests/Thêm code cho các test phụ thuộc vào địa phương
Đi đến `AccountView.swift` để sửa vấn đề này. Bạn sẽ tìm thấy thuộc tính `balanceString` ở đó:
```
private var balanceString: String {
  let amount = AmountFormatter.string(from: abs(account.balance)) ?? ""
  let balance = "$" + amount
  return account.balance < 0 ? "-" + balance : balance
}
```
Ký tự dollar sẽ được hard-code! Như bạn biết hard code là hiếm, và không có ngoại lệ.

Hãy sửa lại code:
```
private var balanceString: String {
  // 3
  let amount = AmountFormatter.string(from: abs(account.balance)) ?? ""
  let balance = currencySymbol + amount
  return account.balance < 0 ? "-" + balance : balance
}

// 1
private var currencySymbol: String {
  // 2
  return Locale.current.currencySymbol ?? ""
}
```
Đây là những điều bạn sẽ làm:
1. Bạn khai báo một thuộc tính mới `currencySymbol`
2. Bạn lấy ký tự tiền tệ từ khư vực hiện tại của user. Bằng các này ký tự sẽ là € cho Germany và $ cho United States
3. Cuối cùng, bạn sử dụng thuộc tính mới khai báo trong `balanceString` thay vì hard code

Chạy UI test lần nữa, xem kết quả test:
![](https://images.viblo.asia/d2b8d489-da23-4081-be6d-9e7dba4e1b51.png)
Vẫn còn `testAddAccount()`  fails!

Có vẻ có cái gì đó đã sai khi biên dịch tiêu đề của các thanh điều hướng. Hãy kiểm trong trong **Localizable.strings (German)** và bạn sẽ thất có một đoạn dịch cho **New Account**
```
"BudgetKeeper" = "BudgetKeeper";
"New Account" = "Neues Konto";
"Update Balance" = "Kontostand updaten";
"OK" = "OK";
"Save" = "Speichern";
"Enter the name" = "Gib den Namen ein";
```
Cái gì có thể đã bị sai nữa? Đi đến **CreateAccountView.swift** để điều tra.

Bạn set tiêu đề bằng cách gọi `navigationBarTitle(_:)`. Nhìn vẫn ổn.
Nhưng key đang bị sai! Nó nên là **New Account**, chứ không phải **New account**. **Account** có một chữ A lớn, không phải a nhỏ. Sửa nó:
```
.navigationBarTitle("New Account")
```
Chạy lại đoạn test để kiểm tra kết quả:
![](https://images.viblo.asia/2f49604d-23e4-481b-96ef-5bc7acc3a4d8.png)
Mọi thứ đã ổn hơn!

Vậy là bạn đã được thử nghiệm cách sử dụng Unit Test trên Xcode. Hãy thử áp dụng vào dự án của mình nhé!