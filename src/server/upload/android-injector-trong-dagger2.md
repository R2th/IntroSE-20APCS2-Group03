Nếu đã từng làm việc với Dagger trong dự án Android, chắc hẳn các bạn đều nhận ra 1 điều: ở mỗi class muốn Inject đổi tượng đều cần phải gọi tới hàm inject của nó trong Component, như vậy khá là bất tiện. Tính năng mới của Dagger, Android Injector giúp chúng ta phòng tránh được điều đó.

Trước hết hãy nhìn qua về biểu đồ hoạt động của nó:

![](https://images.viblo.asia/3bba94f9-1b37-4d56-9d7f-6f0278d0a879.png)

Để sử dụng Dagger 2 Android Injector, chúng ta cần các khai báo sau trong dependencies:

```java
compile "com.google.dagger:dagger:2.11"
annotationProcessor "com.google.dagger:dagger-compiler:2.11"
annotationProcessor "com.google.dagger:dagger-android-processor:2.11"
compile "com.google.dagger:dagger-android-support:2.11"
```

Trước tiên, cần tạo AppModule. Nó sẽ cung cấp các phụ thuộc cần thiết chung cho toàn bộ application.

```java
@Module
public class AppModule {

    @Provides
    @Singleton
    Context provideContext(Application application) {
        return application;
    }
   
    @Provides
    @Singleton
    ApiService provideApiService() {
        return new ApiService();
    }
    @Provides
    @Singleton
    DBService provideDBService(Context context) {
        return new DBService(context);
    }
    ... // for brevity
}
```

Sau đó, tạo ActivityBuilder. Ở đây, chúng ta phải sử dụng một khai báo mới  ContributesAndroidInjector:

```java
@Module
public abstract class ActivityBuilder {

    @ContributesAndroidInjector(modules = MainActivityModule.class)
    abstract MainActivity bindMainActivity();

}
```

Sau đó, tạo MainActivityModule. Ở đây, chúng ta sẽ cung cấp các phụ thuộc xác định cho MainActivity:

```java
@Module
public class MainActivityModule {

    @Provides
    MainViewModel provideMainViewModel(DBService service) {
        return new MainViewModel(service);
    }

}
```

Sau đó, tạo AppComponent. Nó cho phép các module được chọn và được sử dụng để thực hiện dependency injection.

```java
@Singleton
@Component(modules = {AndroidInjectionModule.class, AppModule.class, ActivityBuilder.class})
public interface AppComponent {

    @Component.Builder
    interface Builder {

        @BindsInstance
        Builder application(Application application);

        AppComponent build();

    }

    void inject(MvvmApp app);

}
```

Sau đó, khi bạn build project, nó sẽ generate file DaggerAppComponent.

Sau đó, bạn phải implement interface HasActivityInjector trong class Application và và inject như sau:

```java
public class MvvmApp extends Application implements HasActivityInjector {

    @Inject
    DispatchingAndroidInjector<Activity> activityDispatchingAndroidInjector;

    @Override
    public void onCreate() {
        super.onCreate();

        DaggerAppComponent.builder()
                .application(this)
                .build()
                .inject(this);
        
    }

    @Override
    public DispatchingAndroidInjector<Activity> activityInjector() {
        return activityDispatchingAndroidInjector;
    }

}
```

Sau đó, trong class inject, chúng ta cần gọi tới AndroidInjection.inject(this):

```java
public class MainActivity extends BaseActivity {

    @Inject
    MainViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AndroidInjection.inject(this);
        super.onCreate(savedInstanceState);
    }

}
```

Nguồn: https://medium.com/mindorks/the-new-dagger-2-android-injector-cbe7d55afa6a