To know what Rx is one must first understand what Reactive programing is.

**Reactive Programming?**
Basically, Reactive Programming is asynchronous programming and is event-based . Why do one need reactive programming you ask? Well from a developer's perspective reactive programming enables one to easily oberserves data streams. This can be as simply as a boolean value waiting for changes or https calls or even storing data. Also because it is asynchronous by nature, it allows each code module to run on seperate thread thus executing multiple code blocks simultaneously. Also because Rx takes the asynchronous approach, your app can achieve smooth and seamless user experience without blocking main thread because the tasks will run seamlessly on the background threat and not the UI thread heance not freezing your app. 

In mobile app design, you can archeive a poweful and clean architecture by combining Rx with some design patterns such as MVP, MVC, MVVM and other design patterns. The Rx Extensions are available in multiple languages C# (Rx.NET), Kotlin (RxKotlin), Java (RxJava), Swift (RxSwift) and lot more but we are specifically interested in RxJava and RxAndroid as android is our focused area.

**Integrating Support Android Rx**

You can add the library in the gradle file by adding below dependency.

`implementation 'io.reactivex.rxjava2:rxandroid:Version'`

Before we proceed it is wise to know that Rx consist of 2 main components which are Observable and Observer. 

**Observable**

This is a data stream that carries out some work and emits data in return.

**Observer**

This receives the data emitted by Observable. One or more subscribers can be bonded to an Observable.

In addition to these, there are other components like Schedulers, Operators and Subscription.

**Subscription**

The connection between Observable and Observer is known as Subscription. There can be multiple Observers subscribed to a single Observable.

**Operator** 

Operators modifies the data emitted by Observable before an observer receives them.

**Schedulers**

Schedulers decides the thread on which Observable should emit the data and on which Observer should receives the data i.e background thread, main thread etc.

A simple example of how you can subscribe to an Observable can be seen below. Here i am simply emiting some list of Countries.

```
private void loadAndSubscribe() {
        Observable<String> countryObservable = Observable.just("Africa", "Belgium", "Canada", "Denmark", "France");
        Observer<String> animalsObserver = getCountriesObserver();
        countryObservable
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(animalsObserver);
    }

    private Observer<String> getCountriesObserver() {
        return new Observer<String>() {
            @Override
            public void onSubscribe(Disposable d) {
                Log.d(TAG, "onSubscribe");
            }

            @Override
            public void onNext(String s) {
                Log.d(TAG, "Country >>: " + s);
            }

            @Override
            public void onError(Throwable e) {
                Log.e(TAG, "onError: " + e.getMessage());
            }

            @Override
            public void onComplete() {
                Log.d(TAG, "All Countries are emitted!");
            }
        };
    }
```

If you run loadAndSubscribe() you will get the output below:

```
D/MainActivity: onSubscribe
D/MainActivity: Country >>: Africa
D/MainActivity: Country >>: Belgium
D/MainActivity: Country >>: Canada
D/MainActivity: Country >>: Denmark
D/MainActivity: Country >>: France
D/MainActivity: All Countries are emitted!
```

By calling loadAndSubscribe you can clearly see that firstly the onSubscribe method is called in our observer then each country is emited in the onNext and once all items are emitted, the onCompleted is called. Another exaple is when one is fetching data (Schools) from an Api perhaps using retrofit, you can ashynchronously fetch your data and pass to maybe an adapter or wherever it is needeed as demo below:

```
Observable<List<Model>> issueObservable = apiService.getModel();
issueObservable.subscribeOn(Schedulers.newThread())
        .observeOn(AndroidSchedulers.mainThread())
        .map(models -> models)    //get models and map to models which is a list
        .subscribe(new Subscriber<List<Model>>() {
            @Override
            public void onCompleted() {
                Log.i(TAG, "onCompleted: COMPLETED!");
            }

            @Override
            public void onError(Throwable e) {
                Log.e(TAG, "onError: ", e);
            }

            @Override
            public void onNext(List<Model> models) {
                //Here you may set your adapter or pass your model list as necessary
                modelsRecyclerView.setAdapter(..., models);
            }
        });
```

However this has a minor issues. What if the activty or fragment was destroyed before the data fetch is completed? A memory leak will occur. To resolve this we will now dive into another feature of Rx called Disposables/CompositeDisposables.

**Disposable**

This is used to dispose the subscription when an Observer no longer wants to listen to Observable. Additionally, disposable are very useful in avoiding memory leaks.

For example Let’s say you are making a long running network call and updating the UI as shown above. By the time network call completes its work, if the activity / fragment is already destroyed, as the Observer subscription is still alive, it tries to update already destroyed activity. In this case it can throw a memory leak. So using the Disposables, the un-subscription can be when the activity is destroyed. A more effecient way is shown below.

Note: CompositeDisposables allows you to have cleaner code by combining all your disposables into one object so you can subscribe and unsubscribe easily.

**Api**
```
public Single<List<Schools>> getSchools(int userId) {
  return ddApi.getUserInfo(userId).flapMap(user -> {
    return Api.getAvailableSchools(user.defaultAddress.lat, user.defaultAddress.lng);
  });
}
```


```
//I use composite because it is more efficient in managing your subscribtions. One can easily dispose multiple Disposables by using CompositeDisposables. Find more info [here>>](http://reactivex.io/RxJava/javadoc/io/reactivex/disposables/CompositeDisposable.html)
  private CompositeDisposables disposables = new CompositeDisposables();
  private SchoolDataSource schoolDataSource;
```
  
  ```
private void fetchSchools() {
    // subscribe to the Single returned by SchoolApi
    schoolDataSource
            .getSchools(userId)
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe(new SingleObserver<School>() {
                @Override
                public void onSubscribe(Disposable d) {
                    disposables.add(d);
                }

                @Override
                public void onSuccess(List<School> schoolList) {
                    // update the adapter with schoolList
                }

                @Override
                public void onError(Throwable e) {
                    // display an error message
                }
            });
}
```

Now you can unsubscribe your disposable in the appropraite method such as onDestroy or onStop()

**fragments**

```
override fun onDestroy() {
    super.onDestroy()
    disposables.dispose()
}
```

**activity**

```
override fun onStop() {
    super.onStop()
    disposables.dispose()
}
```

You can read further more on many more features of Rx Android [here>>](https://github.com/ReactiveX/RxAndroid/wiki)