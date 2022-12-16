Sao cùng 1 dòng code nhưng có lúc chạy nó click được có lúc nó lại đứng yên vậy?

Test case này lúc nãy tôi vừa mới chạy pass xong mà, sao chưa đầy 1 phút chạy lại thì fail rồi???

Tôi cá rằng nếu bạn đã từng viết automation thì sẽ không ít lần bạn đã gặp phải những trường hợp trên, nếu muốn test manual 1 trang web buộc chúng ta phải đợi cho page đó load xong, thì với automation test muốn chạy được phải để cho element được enable, tức là nó phải ở trong trạng thái sẵn sàng để chương trình có thể thực hiện action lên nó. 

Vậy làm sao để chương trình test của chúng ta hiểu được element này đã sẵn sàng hay chưa? 

Trong bài này tôi sẽ hướng dẫn các bạn sử dụng những câu lệnh Wait trong selenium để giải quyết bài toán trên nhé!

# 1.  ElementToBeClickable
 Đối với những element  có thể click, ví dụ như button, link, dropdown,.... thì chúng ta hãy sử dụng câu lệnh sau: 
 
```
WebDriverWait wait = new WebDriverWait(driver,20); //20 seconds
wait.until(ExpectedConditions.elementToBeClickable(element));
driver.findElement(element).click(); 
```

>> Lúc này chương trình sẽ chờ tối đa 20 giây để đợi element enable , sau đó action click mới được thực hiện. Nếu chỉ sau 3s element đã enable thì sau 3s thao tác click sẽ được thực hiện

# 2. VisibilityOf
Đối với những element chỉ display, chỉ cần chờ nó hiển thị, ví dụ như: text, label, image,.. thì hãy sử dụng lệnh sau: 
```
WebDriverWait wait = new WebDriverWait(driver, 20); //20 seconds
wait.until(ExpectedConditions.visibilityOf(element));
```

>> Chương trình sẽ đợi tối đa 20s cho tới khi element được hiển thị 
# 3. VisibilityOfAllElements
Tương tự với visibilityOf thì **visibilityOfAllElements** được dùng để wait cho 1 list element, lúc này giá trị element truyền vào phải là 1 list 
```
WebDriverWait wait = new WebDriverWait(driver, 20); //20 seconds
wait.until(ExpectedConditions.visibilityOfAllElements(listElement));
```
>> Chương trình sẽ đợi tối đa 20s cho tới khi toàn bộ list element được hiển thị 
# 3. Sleep
Thực ra trong automation rất hạn chế dùng sleep, nó mang tính khá cố định
```
Thread.sleep(10000) //10000 milisecond
driver.findElement(element).click(); 
```
Nếu sử dụng câu lệnh trên thì chương trình sẽ cố định chờ 10s mới thực hiện action click, nếu sau 3s element đã được enable nhưng vẫn phải chờ tới 10s nó mới được click, việc này làm cho chương trình không được linh động nên hãy hạn chế sử dụng sleep một cách tối thiểu nhất. 

Tuy nhiên automation nhiều lúc rất nhanh, đôi lúc sử dụng **elementToBeClickable** , **visibilityOf** ,... nhưng do chương trình chạy quá nhanh nó vẫn bị fail, buộc bạn phải kết hợp vừa **sleep** vừa **elementToBeClickable** để có thể tối ưu được cách sử dụng wait, hãy dùng sleep khoảng 500 milisecond ở phía trước lệnh visibilityOf thì sẽ làm cho chương trình ổn định hơn.

```
Thread.sleep(500) 
WebDriverWait wait = new WebDriverWait(driver,20); //20 seconds
wait.until(ExpectedConditions.elementToBeClickable(element));
driver.findElement(element).click();
```