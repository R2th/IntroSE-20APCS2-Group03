![](https://images.viblo.asia/17248075-1842-48b9-9a47-25d35e3ae0c5.jpeg)

### Hãy cùng mình tìm hiểu một số toán tử JS mới!

Các bạn đã bao giờ dành nhiều thời gian để đọc qua các tài liệu Mozilla chưa? Nếu rồi thì bạn cũng biết rằng có rất nhiều thông tin về JavaScript trên mạng. Điều này khiến bạn dễ dàng bỏ qua các toán tử JavaScript thông thường.

Tuy nhiên, chỉ vì những toán tử này không phổ biến không có nghĩa là chúng không mạnh! Mỗi chúng trông giống nhau về mặt cú pháp, nhưng hãy nhớ đọc về từng thứ vì chúng hoạt động theo những cách khác nhau.

Cùng mình tìm hiểu nhé!

### 1. Toán tử ??
Trong JavaScript, **toán tử ??** được gọi là toán tử liên kết **nullish**. **Toán tử** này sẽ trả về đối số đầu tiên nếu nó không phải là **null / undefined**, ngược lại, nó sẽ trả về đối số thứ hai. 
Hãy xem một ví dụ.

```
    null ?? 5 // => 5
    3 ?? 5 // => 3
```

Khi gán giá trị mặc định cho một **biến**, các nhà phát triển JavaScript thường dựa vào **toán tử** logic OR , giống như vậy.

```
    var prevMoney = 1
    var currMoney = 0
    var noAccount = null
    var futureMoney = -1

    function moneyAmount(money) {
      return money || `You currently do not own an account in the bank`
    }

    console.log(moneyAmount(prevMoney)) // => 1
    console.log(moneyAmount(currMoney)) // => `You currently do not own an account in the bank`
    console.log(moneyAmount(noAccount)) // => `You currently do not own an account in the bank`
    console.log(moneyAmount(futureMoney))//  => -1
```

Ở trên mình đã tạo một hàm **moneyAmount** có nhiệm vụ trả về số dư hiện tại của người dùng. **Toán tử** || được sử dụng để xác định người dùng không có tài khoản.
Tuy nhiên, điều đó có nghĩa là gì khi người dùng không có tài khoản?  Sẽ chính xác hơn nếu coi không có tài khoản nào là null thay vì 0 vì tài khoản ngân hàng có thể tồn tại mà không có tiền (hoặc âm).
Trong ví dụ trên, **toán tử** || xem 0 là một giá trị lỗi và do đó không đăng ký rằng người dùng của chúng tôi có tài khoản 0 đô la. Hãy sửa lỗi này bằng cách sử dụng toán tử kết hợp nullish.

```
    var currMoney = 0
    var noAccount = null

    function moneyAmount(money) {
      return money ?? `You currently do not own an account in the bank`
    }
     moneyAmount(currMoney) // => 0
     moneyAmount(noAccount) // => `You currently do not own an account in the bank`
```

Để tóm tắt, **toán tử** ?? cho phép chúng tôi chỉ định các giá trị mặc định trong khi bỏ qua các giá trị giả như 0 và các chuỗi rỗng.

### 2. Toán tử ??=

??= còn được gọi là toán tử gán nullish logic và có liên quan chặt chẽ với những gì chúng ta đã được học trước đây. Hãy xem cách chúng gắn kết với nhau.

```
    var x = null
    var y = 5

    console.log(x ??= y) // => 5
    console.log(x = (x ?? y)) // => 5 
```

Toán tử gán này sẽ chỉ gán một giá trị mới nếu giá trị hiện tại là null hoặc không xác định. Ví dụ trên làm nổi bật cách toán tử này về cơ bản là đường cú pháp để gán nullish. Tiếp theo, hãy xem toán tử này khác với các tham số mặc định như thế nào.

```
    function gameSettingsWithNullish(options) {
      options.gameSpeed ??= 1
      options.gameDiff ??= 'easy' 
      return options
    }

    function gameSettingsWithDefaultParams(gameSpeed=1, gameDiff='easy') {
      return {gameSpeed, gameDiff}
      }

    gameSettingsWithNullish({gameSpeed: null, gameDiff: null}) // => { gameSpeed: 1, gameDiff: 'easy' }
    gameSettingsWithDefaultParams(null, null) // => { gameSpeed: null, gameDiff: null }
```

### 3. Toán tử ?. 
Toán tử chuỗi tùy chọn ?. cho phép các nhà phát triển đọc các giá trị của các thuộc tính được lồng sâu trong một chuỗi các đối tượng mà không cần phải xác thực rõ ràng từng tham chiếu trong quá trình thực hiện. Khi một tham chiếu là rỗng, biểu thức ngừng đánh giá và trả về giá trị không xác định. Hãy xem một ví dụ.

```
     var travelPlans  = {
      destination: 'DC',
      monday: {
        location: 'National Mall',
        budget: 200
      }
    };


    const tuesdayPlans = travelPlans.tuesday?.location;
    console.log(tuesdayPlans) // => undefined
```

Xem ví dụ tiếp theo.
```
    function addPlansWhenUndefined(plans, location, budget) {
      if (plans.tuesday?.location == undefined) {
        var newPlans = {
          plans,
          tuesday: { location: location ?? "Park", budget: budget ?? 200 },
        };
      } else {
        newPlans ??= plans; //will only override if newPlans is undefined
        console.log("Plans have already been added!");
      }
      return newPlans;
    }

    var newPlans = addPlansWhenUndefined(travelPlans, "Ford Theatre", null);
    console.log(newPlans) // => { plans: 
                      //{ destination: 'DC',
                      // monday: { location: 'National Mall', budget: 200 } },
                      // tuesday: { location: 'Ford Theatre', budget: 200 } }

    newPlans = addPlansWhenUndefined(newPlans, null, null) // logs => Plans have already been added! 
                                                          // returns => newPlans object
```

Ví dụ trên kết hợp tất cả các toán tử mà chúng ta đã học cho đến nay.
Bây giờ chúng ta đã tạo một hàm để thêm kế hoạch. Mình cũng đã sử dụng các toán tử nullish để cung cấp các giá trị mặc định. Hàm này sẽ chấp nhận các giá trị sai như '0' làm tham số hợp lệ. Có nghĩa là ngân sách của chúng tôi có thể được đặt thành 0 mà không có bất kỳ lỗi nào.

### 4. Toán tử ?
Toán tử bậc ba ?nhận ba toán hạng: một điều kiện, một biểu thức để thực thi nếu điều kiện là đúng và một biểu thức để thực thi nếu điều kiện sai. Hãy xem ví dụ sau:

```
    function checkCharge(charge) {
    return (charge > 0) ? 'Ready for use' : 'Needs to charge' 
    }

    console.log(checkCharge(20)) // => 'Ready for use'
    console.log(checkCharge(0)) // => 'Needs to charge'
```

Nếu các bạn đã dành thời gian tìm hiểu JavaScript, các bạn có thể đã thấy toán tử bậc ba trước đây. Tuy nhiên, các bạn có biết rằng toán tử bậc ba có thể được sử dụng để gán biến không?

Chúng ta thậm chí có thể sử dụng nó để gán giá trị nullish.
```
    var x = 6
    var x = (x !== null || x !== undefined) ? x : 3
    console.log(x) // => 6
```

Hãy xem ví dụ tiếp theo:
```
    function nullishAssignment(x,y) {
      return (x == null || x == undefined) ? y : x   
    }

    var x = nullishAssignment(null, 8) // => 8
    var y = nullishAssignment(4,8) // => 4
```

Trước khi kết thúc, hãy sử dụng toán tử bậc ba để cấu trúc lại hàm từ ví dụ trước.
```
    function addPlansWhenUndefined(plans, location, budget) {
      var newPlans =
        plans.tuesday?.location == undefined
          ? {
              plans,
              tuesday: { location: location ?? "Park", budget: budget ?? 200 },
            }
          : console.log("Plans have already been added!");
      newPlans ??= plans;
      return newPlans;
    }
```
### 5. Tài liệu tham khảo
1. https://medium.com/javascript-in-plain-english/4-powerful-javascript-operators-youve-never-heard-of-487df37114ad
2. https://developer.mozilla.org/vi/docs/Web/JavaScript/Guide/Expressions_and_Operators