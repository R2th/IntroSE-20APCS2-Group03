Trong Viblo đã có vài bài viết chi tiết về các khái niệm cơ bản trong UITest:

https://viblo.asia/p/gioi-thieu-ve-ui-testing-trong-ios-Az45bN0N5xY

Hoặc dùng thư viện KIF:

https://viblo.asia/p/automation-test-cho-ios-part-1-QpmleA3klrd

Bài này tôi tổng hợp nhanh một số case UI Test cơ bản hay dùng.

### 1. UITest với textField, button

Ví dụ chúng ta có view bao gồm:
- Ô textField nhập user name
- Ô textField nhập password
- Button Login

Để truy cập đến thành phần **UITextField**, cách phổ biến nhất là thông qua **Identifier**

![](https://images.viblo.asia/b9bb8d50-d288-4624-baeb-db3a6dc36fa4.png)

Hoặc trong file **xib/storyboard** chúng ta đã có sẵn text trong ô **Placeholder** thì có thể access qua key này:

```
    func testRegisterWithUserName() {
        let textField = app.textFields["input user name"]
        textField.tap()
        textField.typeText("user name")
        app.buttons[register].tap()
        XCTAssert(app.alerts.element.staticTexts["user is correct"].exists)
    }
```

Mục tiêu của đoạn code UI test trên là tự động input đoạn text vào ô text field, sau đó thực hiện tap vào button và check xem alert đc hiện thị có nội dung như mong muốn hay ko?
Để ví dụ, ta cho hiển thị pop-up alert nội dung đơn giản.

Đối với trường hợp **UITextField** có **content** **Type** là **passwod** thì phải sử dụng **XCUIElementQuery** khác, là **secureTextFields**:

```
    func testLoginWithEmptyUserNameAndPassword() {
        let secureTextFields = app.secureTextFields["input password"]
        secureTextFields.tap()
        secureTextFields.typeText("pass123")
        app.buttons["login"].tap()
        XCTAssert(app.alerts.element.staticTexts["pass is correct"].exists)
    }
```

Thêm một case cuối là nhập đầy đủ cả user name và password

```
    func testLoginWithPasswordAndUserName() {
        let textField = app.textFields["input user name"]
        textField.tap()
        textField.typeText("user name")
        let secureTextFields = app.secureTextFields[inputPassword]
        secureTextFields.tap()
        secureTextFields.typeText("pass123")
        app.buttons["login"].tap()
        XCTAssert(app.buttons["startTest"].isEnabled)
    }
```

Kết quả mong muốn là kiểm tra xem có button startTest được enable hay không?

### 2. UITest với di chuyển màn hình
Case test khác phổ biến là kiểm tra xem việc di chuyển màn hình khác có xảy ra như mong muốn hay ko?
Đơn giản là check title của navigationBar có tồn tại hay không?

```
func testMoveHomeScreen() {
        app.buttons[startTest].tap()
        XCTAssert(app.navigationBars["HomeScreen"].exists)
    }
```

### 3. UITest với tableView

Chẳng hạn chúng ta đang ở màn hình có phần tử UITableView.
Để truy xuất đến cell, chúng ta có thể dựa vào static text xuất hiện trong cell đó.
Ví dụ, tap vào 1 cell có static text là Flower, mong muốn là sẽ di chuyển đến màn hình khác:

```
func testMoveToFlowerSrceen() {
        app.tables.cells.staticTexts["Flower"].tap()
       XCTAssert(app.navigationBars["Flower Screen"].exists)
    }
```

Vậy trong trường hợp chúng ta  muốn truy xuất qua một button trong cell thì làm thế nào.
Đơn giản là sẽ lấy ra element của cell rồi lấy button ra:

```
    func testMoveToOtherScreen() {
        _ = tapOnButtonInCell(atPosition: 0)
        XCTAssert(app.navigationBars["Other Screen:"].exists)
    }
    func tapOnButtonInCell(atPosition: Int) -> XCUIElement {
        moveToChannelList()
        let cellQuerry = app.tables.cells.element(boundBy: atPosition)
        cellQuerry.buttons["buttonOther"].tap()
        return cellQuerry
    }
```

### 4. UITest với pickerView
Với pickerView, chẳng hạn như là chúng ta muốn picker tự động scrool đến giá trị mong muốn. 

Tương tự cách truy xuất đến cell của tableView, các phần tử UIControll đều có nguyên tắc chung như vậy:

```
app.pickerWheels.element(boundBy: 0).adjust(toPickerWheelValue: "17")
```

### 5. UITest với UIControl bất kỳ

Trong trường hợp chúng ta muốn truy xuất đến UIControl bất kỳ nào đó, chúng ta sẽ dùng đến XCUIElementQuery có key là otherElements, và truy xuất qua identifier đc khai báo giống như UITextField ở đầu bài viết

```
_ = app.otherElements["identifier_any_uicontroll"]
```

Thêm một idea hay dùng trong UI test là đôi khi chúng ta phải đợi một khoảng thời gian timeout để element chúng ta mong muốn xuất hiện.

Đơn giản thì hay dùng hàm waitForExistence.

Ví dụ:
```
let textField = app.textFields[""input user name"]
textField.tap()
textField.typeText("abc")
app.buttons["start"].tap()
let querry = app.otherElements["identifier_any_uicontroll"]
if querry.waitForExistence(timeout: timeOut) {
     //do something else 
}
```

Ý tưởng ở đây là, sau khi chúng ta tap vào button start, trong app sẽ thực hiện gọi API gì đó, và chúng ta đợi xem element chúng ta cần có xuất hiện hay không, nếu nó xuất hiện thì sẽ tiếp tục làm gì đó với phần tử đó.