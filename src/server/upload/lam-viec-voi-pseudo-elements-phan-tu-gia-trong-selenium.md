![](https://images.viblo.asia/1d1eb4b8-7e06-4a53-9d57-9adeebeedee8.png)

## Pseudo-element là gì

 Có đôi lần, trong khi viết các bài kiểm thử tự động trên web UI, bạn sẽ bắt gặp một số element giống  như thế này:
 
 ![](https://images.viblo.asia/77d03e10-c201-4d3e-b6c8-a421f9389ea4.png)

Chúng được gọi là phần tử pseudo (phần tử giả) và chúng là các từ khóa CSS được thêm vào bộ chọn của phần tử, cho phép bạn tạo kiểu cho các phần cụ thể của phần tử đó. 
nó có thể được sử dụng để:

- Style cho chữ cái đầu tiên, hoặc dòng đầu tiên của phần tử.

- Chèn nội dung trước hoặc sau nội dung của phần tử.

Các pseudo-elements  khác mà bạn có thể gặp phải là:

* before, hoạt động tương tự như after, ngoại trừ nó áp dụng cho đoạn text được thêm vào trước phần tử
* first-line, áp dụng kiểu cho dòng đầu tiên trong phần tử (thường là phần tử đoạn văn)
* placeholder, có nghĩa là đoạn text được giữ chỗ trong phần tử input hoặc textarea 
* selection, được áp dụng cho phần văn bản đang được người dùng bôi đen

 Tham khảo thêm pseudo-element là gì các bạn có thể truy cập link này : 
 https://viblo.asia/p/tim-hieu-ve-pseudo-elements-trong-css-gAm5ypp8ldb

## Vậy làm thế nào để làm việc với những phần tử pseudo trong selenium ?

Bây giờ đến phần khó rồi. Nếu chúng ta cần tương tác với một phần tử pseudo, Selenium WebDriver không cung cấp cho chúng ta tùy chọn để làm như vậy


Giả sử chúng ta có một phần tử với HTML này:

```
<button type="submit" class="okButton">
  "Submit"
</button>
```

Và CSS

```
.okButton:after {
  content: 'Content displayed after the button.';
}
```

và yêu cầu kiểm thử của chúng ta là xác minh nội dung được hiển thị trong khối :: after. Vì đây không phải là một phần tử thông thường, chúng ta không thể xác định nó bằng cách sử dụng các bộ định vị Selenium thông thường

 Ví dụ : nếu chúng ta viết như thế này :
   
```
WebElement element = driver.FindElement(By.CssSelector(".okButton"));
System.out.prirntln(element.Text);
```

Selenium sẽ không trả về cho chúng ta đoạn text bên trong css phần tử pseudo

Hãy thử với các phần tử pseudo khác như “.okButton::after” hoặc “.okButton:after bạn vẫn sẽ nhận được thông báo lỗi NoSuchElementException..

Vậy hướng giải quyết là gì ? đó là Javascript bởi vì javascript là một ngôn ngữ lập trình front-ent nó cho phép chúng ta tìm hiểu sâu hơn về mã HTML và CSS và cho phép chúng ta lấy nội dung từ các phần tử giả trong Selenium. 

Vì vậy, code chúng ta cần sẽ là:

```
String script = "return window.getComputedStyle(document.querySelector('.okButton'),':after').getPropertyValue('content')";
IJavaScriptExecutor js = (IJavaScriptExecutor)_driver;
String content = (String) js.ExecuteScript(script);
Assert.assertEqual("Content displayed after the button.", content);
```

Trình JavaScript executor  sẽ chạy một tập lệnh lấy nội dung bên trong ::after phần tử giả. sau đó, chúng ta có thể lưu nội dung này vào một biến chuỗi và so sánh nó với giá trị mong đợi  khác 

###  Kết luận: 
 
 Mặc dù bản thân Selenium không cho phép tương tác với các phần tử giả, chúng ta có thể sử dụng trình thực thi JavaScript trong code của mình và lấy các giá trị mà chúng ta cần đưa vào các bài kiểm thử của mình.
 
Link tham khảo : https://blog.testproject.io/2021/04/06/working-with-pseudo-elements-in-selenium/