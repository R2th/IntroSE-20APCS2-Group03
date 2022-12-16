## 1. Issue
Cho đoạn code sau:

```
public class Charge {
    private int units;
    private double rate;

    public Charge(int units, double rate) {
        this.units = units;
        this.rate = rate;
    }

    public int getUnits() {
        return units;
    }

    public void setUnits(int units) {
        this.units = units;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public Money getAmount() {
        return Money.usd(units * rate);
    }
}
```
    
Bạn có thể thấy, tất cả các fields đều được đánh dấu là private modifier với getter/setter đấy đủ, tuy nhiên ở phần dưới method `getAmount()` đã phá vỡ nguyên tắc `Encapsulation` trong lập trình hướng đối tượng bằng việc truy cập trực tiếp vào các fields. Hơn nữa việc hard-code như thế này làm cho method thiếu đi sự linh hoạt cần thiết trong trường hợp chúng ta muốn override method `getAmount()`, lazy initialization hay validation.

## 2. Solution
Mình sẽ thay đổi đoạn code trên một chút ở method `getAmount()`:
```
public Money getAmount() {
		return Money.usd(this.getUnits() * this.getRate());
}
```

Mọi thứ đã trở nên dễ dàng hơn ngay cả với việc mở rộng class:
```
static class CustomCharge extends Charge {
		
    public CustomCharge(int units, double rate) {
        super(units, rate);
    }

    @Override
    public int getUnits() {
        return super.getUnits() * 2;
    }
}
```

## 3. Final Thought
Không phải bao giờ việc self-encapsulation field cũng cần thiết ngoài trừ phần lớn những trường hợp sau:
- Inheritance
- Lazy initialization
- Validation

Cảm ơn mọi người đã đọc bài. Happy Coding! 😆😆

#### References:
- https://dzone.com/articles/when-is-self-encapsulation-worth-it
- https://refactoring.guru/self-encapsulate-field