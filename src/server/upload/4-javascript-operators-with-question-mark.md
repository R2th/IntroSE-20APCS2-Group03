## 1. `??` operator

Trong Javascript, `??` được biết đến như là một toán tử 'nullish coalescing'. Toán tử này sẽ trả về giá trị đầu tiên nếu nó không null hay undefined, mặt khác nó sẽ trả về giá trị thứ 2

```
null ?? 5 // => 5
3 ?? 5 // => 3
```

Khi gán giá trị mặc định cho một biến, Các nhà phát triển JavaScript thường dựa vào toán tử OR, như vậy.

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

Ở trên chúng ta đã tạo hàm `moneyAmount` phụ trách trả về số dư hiện tại của người dùng. Chúng ta đã sử dụng toán tử `||` để xác định người dùng không có tài khoản. Tuy nhiên, điều đó có nghĩa gì khi người dùng không có tài khoản? Sẽ chính xác hơn nếu coi không có tài khoản nào là null thay vì 0 vì tài khoản ngân hàng có thể tồn tại mà không có tiền (hoặc âm tiền). Trong ví dụ trên, toán tử `||` xem 0 là 1 giá trị falsy do đó không đăng ký rằng người dùng của chúng tra có 1 tài khoản với 0$. CHúng ta cùng sửa lại với toán tử `??`

```
var currMoney = 0
var noAccount = null

function moneyAmount(money) {
  return money ?? `You currently do not own an account in the bank`
}
 moneyAmount(currMoney) // => 0
 moneyAmount(noAccount) // => `You currently do not own an account in the bank`
```

Toán tử `??` cho phép chúng ta có thể gán giá trị mặc định trong khi đó loại bỏ giá trị falsy và chuỗi rỗng.

## 2. `??=` operator

Toán tử `??=` còn được gọi là toán tử 'logical nullish assignment' và nó có liên quan chặt chẽ tới những gì chúng ta đã học phía trước.

```
var x = null
var y = 5

console.log(x ??= y) // => 5
console.log(x = (x ?? y)) // => 5 
```

Toán tử gán sẽ chỉ gán một giá trị mới nếu như giá trị hiện tại là null/undefined. Ví dụ trên làm nổi bật cách toán tử này thể hiện cú pháp gán giá trị cho phép gán với nullish. 

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

Có một sự khác biệt đáng chú ý ở đây là cách mà các hàm phía trên xử lý giá trị null. Các tham số mặc định sẽ ghi đè giá trị mặc định với các đối số null, còn toán tử `??=` thì không. Cả hai tham số mặc định và Chỉ định nullish sẽ không ghi đè giá trị cho undefined

## 3. `?.` operator

Toán tử 'Optional chaining' `?.` cho phép các nhà phát triển có thể đọc các giá trị của thuộc tính được lồng saua trong 1 chuỗi các objects mà không cần phải xác thự rõ ràng từng thuộc tính trên dọc đường đi tới thuộc tính cần truy cập. Khi mà một tham chiếu là nullish, biểu thức sẽ ngừng lại và trả về một giá trị undefined.

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

Bây giờ, hãy kết hợp mọi thứ chúng ta đã học được cho đến nay và thêm Thứ Ba vào kế hoạch du lịch mới của chúng ta!

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

Bây giờ chúng ta đã tạo một hàm bổ sung các kế hoạch cho một đối tượng hiện không có thuộc tính lồng nhau của tuesday.location. Chúng tôi cũng đã sử dụng các toán tử nullish để cung cấp các giá trị mặc định. Hàm này sẽ chấp nhận các giá trị sai như ‘0’ làm tham số hợp lệ. Có nghĩa là ngân sách của chúng tôi có thể được đặt thành 0 mà không có bất kỳ lỗi nào.

## 4. `?` operator

Toán tử `?` có 3 toán hạng: 1 điều kiện, một biểu thức sẽ thực hiện nếu điều kiện là đúng, và một biểu thức sẽ thực hiện khi điều kiện là sai.

```
function checkCharge(charge) {
return (charge > 0) ? 'Ready for use' : 'Needs to charge' 
}

console.log(checkCharge(20)) // => 'Ready for use'
console.log(checkCharge(0)) // => 'Needs to charge'
```

Toán tử `?` cũng có thể sử dụng trong việc gán giá trị cho biến

```
var budget = 0
var transportion = (budget > 0) ? 'Train' : 'Walking' 
console.log(transportion) // => 'Walking'
```

Chúng ta cũng có thể sử dụng nó để tái tạo hành vi của phép gán nullish.

```
function nullishAssignment(x,y) {
  return (x == null || x == undefined) ? y : x   
}

var x = nullishAssignment(null, 8) // => 8
var y = nullishAssignment(4,8) // => 4
```

Chúng ta có thể dùng toán tử `?` để refactor lại ví dụ ở trên

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
  return
  ```