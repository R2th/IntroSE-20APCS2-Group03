### I) Sơ lược về dependency
* Khi một class cần một class hoặc một interface để thực hiện một hành động nào đó thì class đó có một sự phụ thuộc (dependency). Lúc này có thể hiểu class đó phụ thuộc vào class hoặc interface kia

    ```
    public class Soldier {

            private Gun mGun = new Gun();
    }
    ```

* Ví dụ trên class Soldier sẽ phụ thuộc vào class Gun.

* Trong một vài trường hợp nếu một class khởi tạo các instance của class khác bên trong nó thông qua toán tử new, khi mà số lượng dependency trở nên quá nhiều sẽ gây khó khăn trong việc testing, giảm khả năng tái sử dụng do các class có sự kết dính với nhau, khó maintain khi project mở rộng => hard dependency.

### II) Dependency Injection

- Dependency injection được xây dựng dựa trên khái niệm IoC, là một kỹ thuật mà trong đó một class sẽ nhận các phụ thuộc (dependency) của nó từ bên ngoài. Có nghĩa là class nó sẽ không khởi tạo instance của class khác bên trong nó, thay vào đó nó sẽ nhận instance của class khác từ bên ngoài thông qua injector (constructor, method, interface) vv.
  - Một **dependency** (Service) là một đối tượng có thể được sử dụng bởi client.
  - Một **dependant** (Client) là một đối tượng sử dụng các dependency khác.
  - Một **injection** có nghĩa là chúng ta đưa một thằng Service đến client.
  
  ```
      public class MainActivity extends AppCompatActivity {


        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);

            Gun gun = new Gun();
            Knife knife = new Knife();

            Soldier soldier = new Soldier(gun, knife);
            soldier.action();

        }
    }
  ```
  
- Ví dụ ở đây class Soldier sẽ nhận các phụ thuộc gun, knife từ bên ngoài thông qua constructor.
- Tuy nhiên trong một số trường hợp, dự án được mở rộng, số lượng class tăng thêm, mỗi class lại cần thêm các dependency khác để mở rộng công việc, việc khởi tạo, sửa đổi  và viết mọi thứ cùng nhau sẽ yêu cầu rất nhiều code có thể dẫn đến rối, khó nhìn, khó quản lý.

### III) Dagger 2
- Nó là một DI Framework tự động generate các phụ thuộc cho chúng ta bằng việc sử dụng **annotation processor**.
- **Anotation processor**: Nó dùng để đọc các file đã được compiled trong khoảng thời gian build ứng dụng mục đích là để generate các source code để chúng ta sử dụng trong project.
- **@Inject**: Nó yêu cầu các dependency(service)  cần thiết để đưa đến cho thằng dependant( client).
-  **@Module**: Nơi chúng ta tạo ra các module cung cấp các  phụ thuộc (dependency)  để inject đến thằng cần phụ thuộc đó( dependent).
-  **@Provider**: Nằm bên trong module, anotation được chú thích với method để định nghĩa ra các dependency.
-  **@Component**: Là một interface kết nối mọi thứ lại với nhau, cụ thể trong thằng này chúng ta sẽ xác định module hoặc component nào chúng ta cần để lấy các phụ thuộc, đồng thời cũng là nơi chúng ta xác định các graph dependency nào có thể được inject. Có thể hiểu thằng này là cầu nối giữa @Module và @Inject, interface này thường chứa 2 loại method:
  
     + Method trả về một object nhưng không có param truyền vào.
     +  Method trả về void (hoặc chính Object đó) nhưng có 1 đối số truyền vào.
        
- **@Scope**: được sử dụng dùng để tạo singleton và định nghĩa vòng đời tồn tại của Object graph.

### IV) Ví dụ

   ```
   public interface Weapon {

        void function();

    }
   ```
   
   ```
 public class Gun implements Weapon {

        @Inject
        public Gun() {

        }

        @Override
        public void function() {
            System.out.println("shoot");
        }

    }
   ```
   
 ```
   public class Knife implements Weapon {

        @Inject
        public Knife() {

        }

        @Override
        public void function() {
            System.out.println("stab");
        }
    }
 ```

- Ở đây chúng ta sẽ tạo 2 class Gun và Knife implement interface Weapon, mục đích là đưa 2 thằng dependency này đến cho thằng Soldier thông qua Constructor.


   ```
   public class Soldier {

        private Gun mGun;
        private Knife mKnife;

        @Inject
        public Soldier(Gun gun, Knife knife) {
            mGun = gun;
            mKnife = knife;
        }

        public void action() {
            mGun.function();
            mKnife.function();
        }
    }
   ```
- Để ý thấy ở mỗi constructor của class đều có anotation @Inject, điều này nói với **Dagger** là chúng ta sẽ tạo ra các instance của các class đó thông qua @inject constructor. Ngoài ra còn có @Provide mà cũng có chức năng như vậy nhưng chúng ta sẽ làm ở ví dụ khác.


  ```
   @Component
    public interface MainComponent {

        Soldier getSoldier();

    }

  ```
        
- Chúng ta dùng component này để expose ra các dependency( service) để đưa đến cho thằng dependant(Client). 
- Thằng interface này nó sẽ được implement bởi thằng Dagger 2 và sau đó thằng Dagger 2 này nó sẽ generate ra các dependency cho chúng ta.

     ```
     public class MainActivity extends AppCompatActivity {

            public Soldier mSoldier;

            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.activity_main);
                MainComponent mainComponent = DaggerMainComponent.builder().build();
                mSoldier = mainComponent.getSoldier();
                mSoldier.action();
            }
        }
     ```
     
  Kết quả: 
  
          System.out: shoot  stab
          
- Mặc định sau khi build lại ứng dụng, Dagger nó sẽ  tạo ra class được gọi là DaggerMainComponent, và thằng này nó sẽ giúp chúng ta inject ra các dependency cần thiết để sử dụng. 
- Ví dụ trên chúng ta muốn lấy ra đối tượng soldier thì chi việc gọi mainComponent.getSoldier().

***Tại sao Dagger lại làm được như vậy?***
- Chúng ta sẽ tiến hành đi sâu vào trong class DaggerMainComponent

     ```
     
      public final class DaggerMainComponent implements MainComponent {
          private Provider<Soldier> soldierProvider;

          private DaggerMainComponent(Builder builder) {
            assert builder != null;
            initialize(builder);
          }

          public static Builder builder() {
            return new Builder();
          }

          public static MainComponent create() {
            return builder().build();
          }

          @SuppressWarnings("unchecked")
          private void initialize(final Builder builder) {

            this.soldierProvider = Soldier_Factory.create(Gun_Factory.create(), Knife_Factory.create());
          }

          @Override
          public Soldier getSoldier() {
            return new Soldier(new Gun(), new Knife());
          }

          public static final class Builder {
            private Builder() {}

            public MainComponent build() {
              return new DaggerMainComponent(this);
            }
          }
        }

     ```

- Ở đây như đã nói ở trên, thằng class này nó sẽ implement interface **MainComponent** mà chúng ta đã định nghĩa và trong hàm getSoldier() nó sẽ tự động khởi tạo và trả về đối tượng solider cho chúng ta.
- Trường hợp nếu chúng ta bỏ đi **@Inject constructor** của các class chúng ta vừa định nghĩa thì sẽ như thế nào, ở đây mình sẽ bỏ đi @Inject ở class Gun.

    ```
     public class Gun implements Weapon {

            public Gun() {

            }

            @Override
            public void function() {
                System.out.println("shoot");
            }

        }
    ```
        
 - Sau khi build lại thì kết quả:
 
     ![](https://images.viblo.asia/cc5318ae-fb0c-430d-a078-a98330314ba5.png)

- Có thể dịch là method getSoldier() nó sẽ không làm việc bởi vì thằng class Gun nó không thể cung cấp instance cho thằng Soldier mà không có **@Inject constructor** hoặc **@Provider**.

- Tiếp theo cũng là ví dụ đó nhưng chúng ta tạm thời điều chỉnh lại một chút:

     ```
        @Module
        public class MainModule {

            @Provides
            public Soldier provideSoldier(Gun gun, Knife knife) {
                return new Soldier(gun, knife);
            }
        }

     ```

- Chúng ta sẽ tiến hành tạo thêm  một class module có tên MainModule, ở class này chúng ta  cũng sẽ định nghĩa ra các **dependency** cần thiết bên cạnh việc sử dụng **@Inject constructor.**
- Để ý 2 tham số truyền vào là gun và knife, chúng ta không cần định nghĩa lại 2 thằng này bởi vì chúng ta đã định nghĩa nó thông qua @Inject constructor. Ở đây chúng ta chỉ đơn giản định nghĩa lại thằng class Solider bên trong class MainModule thông qua **@Provides** như đã nói ở trước và xóa đi **@inject constructor** trong class Soldier.

    ```
       @Scope
       @Retention(RetentionPolicy.RUNTIME)
       public @interface ActivityScope {

       }
    ```
        
     ```
        @ActivityScope
        @Component(modules = MainModule.class)
        public interface MainComponent {

            Soldier getSoldier();

        }
     ```
- Ở đây chúng ta sẽ custom 1 Scope có tên là **ActivityScope** để hạn chế phạm vì tồn tại của các **Object Graph** chỉ tồn tại trong vòng đời của Activity, và thằng Scope này nó chỉ tạo cho chúng ta 1 **Single Instance** của các dependency mặc dù hàm **<DaggerComponent>.build() ** được gọi nhiều lần. Và tất nhiên "ActivityScope" chỉ là cái định danh mà chúng ta dùng để phân biệt với các Scope khác.
- Tiếp theo để lấy ra các phụ thuộc cần thiết như Soldier đã được định nghĩa trong module thì chúng ta phải bổ sung thêm module có tên là MainModule.class vào trong **@Component**.

    ```
      public class MainActivity extends AppCompatActivity {

            public Soldier mSoldier;

            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.activity_main);
                MainComponent mainComponent = DaggerMainComponent.builder().mainModule(new MainModule()).build();
                mSoldier = mainComponent.getSoldier();
                mSoldier.action();
            }
        }
    ```
    
 - Chúng ta cũng điều chỉnh lại một chút ở MainActivity bởi vì khi thêm một module thì chúng ta cần phải đưa module dependency đó đến cho thằng Dagger, kết quả vẫn bình thường khi chạy ứng dụng.

***Trong một số trường hợp: Nếu activity của chúng ta cần rất nhiều dependency, ví dụ 100 dependency thì ở interface MainComponent chúng ta cũng phải định nghĩa ra 100 method để get dependency đó, chưa hết chúng ta còn phải vào lại MainActivity và get ra từng dependency bằng cách gọi lần lượt từng hàm trong thằng mainComponent ở actitivy như trên => code nó trở nên dài với rối hơn***.

   ```
     @ActivityScope
     @Component(modules = MainModule.class)
      public interface MainComponent {

            void inject(MainActivity mainActivity);

        }
   ```

- Chúng ta sẽ điều chỉnh lại thằng component này bằng cách gỡ bỏ hết các method mà dùng để lấy ra các dependency và chỉ định nghĩa duy nhất một method trả về hàm void với input chính thằng class mà cần những phụ thuộc này, có thể hiểu ở đây chúng ta sẽ inject các dependency vào trong các field hoặc method của instance class mà chúng ta muốn inject cho nó.
- Chúng ta cũng điều chỉnh lại một chút ở module:

   ```
      @Module
      public class MainModule {

            @ActivityScope
            @Provides
            public Soldier provideSoldier(Gun gun, Knife knife) {
                return new Soldier(gun, knife);
            }
        }
   ```
    
 - Ở main activity chúng ta sẽ điều chỉnh lại như sau: 

    ```
      public class MainActivity extends AppCompatActivity {

            @Inject
            public Soldier mSoldier;

            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.activity_main);
                DaggerMainComponent.builder().mainModule(new MainModule()).build().inject(this);
                mSoldier.action();
            }
        }
    ```

- Khi build ứng dụng Dagger nó tìm thấy hàm void không trả về kiểu nào cả, nó biết rằng phải có thứ gì đó nó cần tìm trong class, và khi nó thấy các field được chú thích với **@Inject** thì nó sẽ tiến hành khởi tạo instance của các field đó. 
- Để hiểu kỹ hơn chúng ta sẽ tiến hành đi sâu vào thằng DaggerMainComponent.

    ```

    public final class DaggerMainComponent implements MainComponent {

            private Provider<Soldier> provideSoldierProvider;

            private MembersInjector<MainActivity> mainActivityMembersInjector;

            private DaggerMainComponent(Builder builder) {
                assert builder != null;
                initialize(builder);
            }

            public static Builder builder() {
                return new Builder();
            }

            public static MainComponent create() {
                return builder().build();
            }

            @SuppressWarnings("unchecked")
            private void initialize(final Builder builder) {

                this.provideSoldierProvider = DoubleCheck.provider(
                        MainModule_ProvideSoldierFactory.create(builder.mainModule, Gun_Factory.create(),
                                Knife_Factory.create()));

                this.mainActivityMembersInjector =
                        MainActivity_MembersInjector.create(provideSoldierProvider);
            }

            @Override
            public void inject(MainActivity mainActivity) {
                mainActivityMembersInjector.injectMembers(mainActivity);
            }

            public static final class Builder {
                private MainModule mainModule;

                private Builder() {
                }

                public MainComponent build() {
                    if (mainModule == null) {
                        this.mainModule = new MainModule();
                    }
                    return new DaggerMainComponent(this);
                }

                public Builder mainModule(MainModule mainModule) {
                    this.mainModule = Preconditions.checkNotNull(mainModule);
                    return this;
                }
            }
        }

    ```
    
 - Để ý kỹ ở phương thức inject có sự thay đổi khác với các phương thức mà chúng ta định nghĩa lúc trước,  các phương thức kia thường sẽ khởi tạo và trả về một instance nào đó nhưng mà thằng này nó lại khác, nó sẽ thông qua một thằng trung gian có tên là **MembersInjector**, có thể hiểu là sau khi chúng build lại ứng dụng thằng Dagger nó sẽ tạo ra cho chúng ta một class có tên là  **<Tên class>_MembersInjector** và thằng này có chức năng inject các dependency  cần thiết vào các field và các method của  instance của chúng ta ( cụ thể  instance ở đây là mainActivity)

   ```
      public final class MainActivity_MembersInjector implements MembersInjector<MainActivity> {
            private final Provider<Soldier> mSoldierProvider;

            public MainActivity_MembersInjector(Provider<Soldier> mSoldierProvider) {
                assert mSoldierProvider != null;
                this.mSoldierProvider = mSoldierProvider;
            }

            public static MembersInjector<MainActivity> create(Provider<Soldier> mSoldierProvider) {
                return new MainActivity_MembersInjector(mSoldierProvider);
            }

            @Override
            public void injectMembers(MainActivity instance) {
                if (instance == null) {
                    throw new NullPointerException("Cannot inject members into a null reference");
                }
                instance.mSoldier = mSoldierProvider.get();
            }
        }
   ```
    
- Và trong đây chính là những gì mà thằng MembersInjector thực hiện.
    
### V) Hạn chế của Dagger 2
- Nó không inject các field một cách tự động
- Nó không inject các private field