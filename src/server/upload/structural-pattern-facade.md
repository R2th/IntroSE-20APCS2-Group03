Facade là 1 parttern thuộc **Structural Pattern**, nó cung cấp 1 interface cho chung cho thay cho 1 nhóm interface có trong hệ thống con(subsystem), facade cung cấp interface ở mức độ cao hơn để người dùng có thể dễ dàng giao tiếp với 1 interface duy nhất, che dấu các xử lý phức tạp trong nó.

Việc sử dụng facade pattern có lợi ích sau:
- Giúp cho thư viện của bạn trở nên đơn giản hơn trong việc hiểu nó, vì mỗi facade sẽ đại diện cho 1 task vụ chung
- Giúp code dễ đọc hơn
- Gỉam việc phục thuộc code bên ngoài với hệ thống
- Đóng gói nhiều api thành 1 api được thiết kế tốt hơn
- Che đi phần phức tạp của subsystem với bên ngoài

Dưới đây là mô hình cấu trúc facade
![](https://images.viblo.asia/3d361b33-a2af-4a95-9b63-4d8e366ebbbd.png)

Sau đây là ví dụ về việc sử dụng facade
Trong bài toán người lùn đi đào vàng, ở phía client thông qua facade chỉ biết được các hành action như là: startNewDay, digOutGold, endDay, nhưng ko biết được
- startDay thì có những ai phải làm gì...
- Khi đào vàng thì phải chuẩn bị hay làm những gì...
- Khi kết thúc ngày làm việc thì phải chuẩn bị làm gì...

![](https://images.viblo.asia/86f3327e-fe22-4f84-8c99-1d04383763bf.png)

# Java implementation
Đầu tiên là tạo subsystems DwarvenMineWorker
```
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * DwarvenMineWorker is one of the goldmine subsystems.
 *
 */
public abstract class DwarvenMineWorker {

  private static final Logger LOGGER = LoggerFactory.getLogger(DwarvenMineWorker.class);

  public void goToSleep() {
    LOGGER.info("{} goes to sleep.", name());
  }

  public void wakeUp() {
    LOGGER.info("{} wakes up.", name());
  }

  public void goHome() {
    LOGGER.info("{} goes home.", name());
  }

  public void goToMine() {
    LOGGER.info("{} goes to the mine.", name());
  }

  private void action(Action action) {
    switch (action) {
      case GO_TO_SLEEP:
        goToSleep();
        break;
      case WAKE_UP:
        wakeUp();
        break;
      case GO_HOME:
        goHome();
        break;
      case GO_TO_MINE:
        goToMine();
        break;
      case WORK:
        work();
        break;
      default:
        LOGGER.info("Undefined action");
        break;
    }
  }

  /**
   * Perform actions
   */
  public void action(Action... actions) {
    for (Action action : actions) {
      action(action);
    }
  }

  public abstract void work();

  public abstract String name();

  static enum Action {
    GO_TO_SLEEP, WAKE_UP, GO_HOME, GO_TO_MINE, WORK
  }
}
```

Tạo subsystem điều cho những worker thực hiện đào đường hầm
**DwarvenTunnelDigger**
```
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * DwarvenTunnelDigger is one of the goldmine subsystems.
 *
 */
public class DwarvenTunnelDigger extends DwarvenMineWorker {

  private static final Logger LOGGER = LoggerFactory.getLogger(DwarvenTunnelDigger.class);

  @Override
  public void work() {
    LOGGER.info("{} creates another promising tunnel.", name());
  }

  @Override
  public String name() {
    return "Dwarven tunnel digger";
  }
}
```

Tạo subsystem điều cho những worker thực hiện vận chuyển 
**DwarvenCartOperator**

```
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * DwarvenCartOperator is one of the goldmine subsystems.
 *
 */
public class DwarvenCartOperator extends DwarvenMineWorker {

  private static final Logger LOGGER = LoggerFactory.getLogger(DwarvenCartOperator.class);

  @Override
  public void work() {
    LOGGER.info("{} moves gold chunks out of the mine.", name());
  }

  @Override
  public String name() {
    return "Dwarf cart operator";
  }
}
```

Tạo subsystem để điều khiển những chú lùn thực hiện đào **DwarvenGoldDigger**

```
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * DwarvenGoldDigger is one of the goldmine subsystems.
 *
 */
public class DwarvenGoldDigger extends DwarvenMineWorker {

  private static final Logger LOGGER = LoggerFactory.getLogger(DwarvenGoldDigger.class);

  @Override
  public void work() {
    LOGGER.info("{} digs for gold.", name());
  }

  @Override
  public String name() {
    return "Dwarf gold digger";
  }
}
```

## Tạo facade DwarvenGoldmineFacade

```
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * 
 * DwarvenGoldmineFacade provides a single interface through which users can operate the subsystems.
 * 
 * This makes the goldmine easier to operate and cuts the dependencies from the goldmine user to the
 * subsystems.
 *
 */
public class DwarvenGoldmineFacade {

  private final List<DwarvenMineWorker> workers;

  /**
   * Constructor
   */
  public DwarvenGoldmineFacade() {
    workers = new ArrayList<>();
    workers.add(new DwarvenGoldDigger());
    workers.add(new DwarvenCartOperator());
    workers.add(new DwarvenTunnelDigger());
  }

  public void startNewDay() {
    makeActions(workers, DwarvenMineWorker.Action.WAKE_UP, DwarvenMineWorker.Action.GO_TO_MINE);
  }

  public void digOutGold() {
    makeActions(workers, DwarvenMineWorker.Action.WORK);
  }

  public void endDay() {
    makeActions(workers, DwarvenMineWorker.Action.GO_HOME, DwarvenMineWorker.Action.GO_TO_SLEEP);
  }

  private static void makeActions(Collection<DwarvenMineWorker> workers,
      DwarvenMineWorker.Action... actions) {
    for (DwarvenMineWorker worker : workers) {
      worker.action(actions);
    }
  }
}
```

## Tạo client thực hiện điều khiển đào vàng
```
public class App {

  /**
   * Program entry point
   * 
   * @param args command line args
   */
  public static void main(String[] args) {
    DwarvenGoldmineFacade facade = new DwarvenGoldmineFacade();
    facade.startNewDay();
    facade.digOutGold();
    facade.endDay();
  }
}
```

Run it.

![](https://images.viblo.asia/6bd3a8ea-478d-42d8-859b-e8c911af75ce.png)
Việc sử dụng facade về mặt phía client chỉ có 1 đầu mối duy nhất, toàn bộ các subsystem sẽ là trong suốt với clients.

# Reference
Souce code tham khảo: https://github.com/ngodinhngoc/java-design-pattern/tree/master/facade

Tham khảo: https://github.com/iluwatar/java-design-patterns