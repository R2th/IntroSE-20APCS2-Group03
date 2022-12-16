This tutorial will be a 2 part tutorial. We will build a movie app based on MVVM architecture, it will consume the moviedb api and we will use Prism to decouple the app for easy testing. In this first part i will create the homescreen where we will fetch our data and populate it to a CollectionView. All using databinding and if there is enough time we will have an endless scrolling, pull to refresh and arrange the movies in poster like design. Gonna be awesome!!! Let's begin.

By the end of this part we will have an app that displays the movies as shown below:

![](https://images.viblo.asia/dbd56a53-5172-4969-ba6d-fd231f628378.jpg)


First add all the libraries needed (Prism, FFImageLoading and NewtonsoftJson) to the project (Remember to select all project when installing i.e Android and iOS alike)

![](https://images.viblo.asia/cfe1816a-9c98-48c1-a692-1093acbd7fa8.png)

We will use prism for our Navigation (If you are unfarmiliar with prism please refer my previous tutorial [here](https://viblo.asia/p/setting-up-prism-for-navigation-in-xamarin-forms-mvvm-XL6lA00rZek))

I will also be using [FFImageLoading](https://github.com/luberda-molinet/FFImageLoading/wiki/Xamarin.Forms-API) library to load images as it is faster and easy to integrate in the application supporting both Android and iOS.

I assume you are already farmiliar with Xamarin Forms so if you are a beginner level i suggest you study the beginner tutrials on Xamarin Forms before proceeding. However i will try my best to keep things simple and easy to follow. 

Create a new project called MovieApp and add the above libraries. Next we will set up the project directories (If u created a Prism Application this will be auto generated but as we are starting from scratch we will have to manually do it)

So right click on the MovieApp solution and add these directories. Most of the App's code will be shared code.

![](https://images.viblo.asia/99140b79-fab3-487c-8c1c-0d1e9ace10d1.png)


Add directory Common and inside it add this other directories >> Models, Repository, Constants, ViewModels and Views. If you are already used to Mvvm this will be farmilair to you. 

Before we continue you will need an API key so head over to [moviedb](https://www.themoviedb.org/) website and create an account then get your api key. We will use it to make api calls. After you create and account you can request and access your api key from your profile > [Api tab](https://www.themoviedb.org/settings/api) 

Once you have you api key you can make a request right from the moviedb website and copy the json to auto generate a model class. An example of a movie list request can be seen below:

```
{
  "page": 1,
  "results": [
    {
      "poster_path": "/1SWIUZp4Gi2B6VxajpPWKhkbTMF.jpg",
      "adult": false,
      "overview": "The legendary Roberto Duran and his equally legendary trainer Ray Arcel change each other's lives.",
      "release_date": "2016-08-26",
      "genre_ids": [
        18
      ],
      "id": 184341,
      "original_title": "Hands of Stone",
      "original_language": "en",
      "title": "Hands of Stone",
      "backdrop_path": "/pqRJD5RE5DgRQ1Mq4kSZHmMjozn.jpg",
      "popularity": 3.474028,
      "vote_count": 16,
      "video": false,
      "vote_average": 3.75
    }
  ],
  "dates": {
    "maximum": "2016-09-01",
    "minimum": "2016-07-21"
  },
  "total_pages": 33,
  "total_results": 649
}
```

Now we will add 2 classes Movie and MovieResponse. You can always generate a class based on json response from [here](https://json2csharp.com/json-to-pojo)

**Movie.cs**
```
using System;
using System.Collections.Generic;
using System.Text;

namespace MovieApp.Common.Models
{
    public class Movie
    {
        public string poster_path { get; set; }
        public bool adult { get; set; }
        public string overview { get; set; }
        public string release_date { get; set; }
        public List<int> genre_ids { get; set; }
        public int id { get; set; }
        public string original_title { get; set; }
        public string original_language { get; set; }
        public string title { get; set; }
        public string backdrop_path { get; set; }
        public double popularity { get; set; }
        public int vote_count { get; set; }
        public bool video { get; set; }
        public double vote_average { get; set; }
    }
}
```

**MovieResponse.cs**

```
using System.Collections.ObjectModel;

namespace MovieApp.Common.Models
{
    class MovieResponse
    {
        public int page { get; set; }
        public ObservableCollection<Movie> results { get; set; }
        public int total_pages { get; set; }
        public int total_results { get; set; }
        public string status_message { get; set; }
    }
}
```

One more model class we will add is **MovieCall**. It will be used for our custom queries we will need for api calls.

**MovieCall.cs**

```
using System;

namespace MovieApp.Common.Models
{
    public class MovieCall
    {
        public string Type { set; get; }
        public int Page { set; get; }

        public MovieCall(string type, int page)
        {
            Type = type;
            Page = page;
        }
    }
}
```

We can add more parameters later on but for now this should do. Next lets create 2 classes **Constant** and **ApiKeys** in the Constants folder to hold our constants and api keys.

**Constant**

```
namespace MovieApp.Common.Constants
{
    class Constant
    {
        public const string API_FORMAT = "{0}{1}?api_key={2}&page={3}";
    }
}
```

**ApiKeys**

```
namespace MovieApp.Common.Constants
{
    class ApiKeys
    {
        public const string BASE_URL = "https://api.themoviedb.org/3/movie/";
        public const string API_KEY = "bb4a8f3243d4c0015221df83096fd63a";
        public const string IMAGE_URL = "http://image.tmdb.org/t/p/w500";
        public const string NOW_PLAYING = "now_playing";
        public const string POPULAR = "popular";
    }
}
```

Remember to add your api key to the constraint key API_KEY above.

Next lets setup the movie repository. Add an interface **IMovieRepository** and a class **MovieRepository** to repository directory.

**IMovieRepository.cs**

```
using MovieApp.Common.Models;
using System.Collections.ObjectModel;
using System.Threading.Tasks;

namespace MovieApp.Common.Repository
{
    public interface IMovieRepository
    {
        Task<ObservableCollection<Movie>> GetMovies(MovieCall movieCall);
    }
}
```

**MovieRepository.cs**

```
using MovieApp.Common.Models;
using MovieApp.Common.Constants;
using Newtonsoft.Json;
using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Threading.Tasks;

namespace MovieApp.Common.Repository
{
    class MovieRepository : IMovieRepository
    {
        public async Task<ObservableCollection<Movie>> GetMovies(MovieCall movieCall)
        {
            string url = string.Format(Constant.API_FORMAT, ApiKeys.BASE_URL, movieCall.Type, ApiKeys.API_KEY, movieCall.Page);
            HttpClient clientCabinets = new HttpClient();
            try
            {
                HttpResponseMessage response = await clientCabinets.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();
                    MovieResponse movieResponse = JsonConvert.DeserializeObject<MovieResponse>(result);
                    return movieResponse.results;
                }
            }
            catch (Exception)
            {
            }
            return null;
        }
    }
}
```

The MovieRepository is used for our api calls. Using HttpClient we pass the base url along with the movie type (Could be nowplaying, popular or others) and page as an argument. This will return an ObservableCollection containing movie list which we will get later on in the associated viewmodel.

Next lets setup the screens. Add 2 new ContentPage **MoviesPage** and **MovieDetailsPage** to the **Views** directory. The MoviesPage will be the homescreen where the list of movies will be displayed. We focus on this screen alone in the part i.e Fetch data then populate it to the CollectionView.

After adding these pages add 2 new classes **MoviesPageViewModel** and **MovieDetailsPageViewModel** to the ViewModels folder.

Since we are using prism in this project we can setup and bind the pages to their respective viewmodel from the App.xaml.cs class. If you dont understand this part please refer my previous tutorial [here](https://viblo.asia/p/setting-up-prism-for-navigation-in-xamarin-forms-mvvm-XL6lA00rZek) about prism navigation.

**App.xaml**

```
<?xml version="1.0" encoding="utf-8" ?>
<prism:PrismApplication  xmlns:prism="clr-namespace:Prism.Unity;assembly=Prism.Unity.Forms"
                         xmlns="http://xamarin.com/schemas/2014/forms"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MovieApp.App">
    <Application.Resources>

    </Application.Resources>
</prism:PrismApplication>
```

**App.xaml.cs**

```
using MovieApp.Common.Repository;
using MovieApp.Common.Viewmodels;
using MovieApp.Common.Views;
using Prism;
using Prism.Ioc;
using Prism.Unity;
using System;
using Xamarin.Forms;

namespace MovieApp
{
    public partial class App : PrismApplication
    {
        public App(IPlatformInitializer initializer = null) : base(initializer) { }

        protected async override void OnInitialized()
        {
            InitializeComponent();
            DependencyService.Register<IMovieRepository, MovieRepository>();
            try
            {
                await NavigationService.NavigateAsync("NavigationPage/MoviesPage");
            }
            catch (Exception) { }
        }

        protected override void RegisterTypes(IContainerRegistry containerRegistry)
        {
            containerRegistry.RegisterForNavigation<NavigationPage>();
            containerRegistry.RegisterForNavigation<MoviesPage, MoviesPageViewModel>();
            containerRegistry.RegisterForNavigation<MovieDetailsPage, MovieDetailsPageViewModel>();
        }
    }
}
```

A quick overview. I registered the pages and the viewmodels. Also set MoviesPage to be the launch screen. Only thing needed to get this running is adding the IPlatformInitializer to AppDelegate (For iOS) and MainActivity (For Android).

**AppDelegate.cs**

```
using FFImageLoading.Forms.Platform;
using Foundation;
using Prism;
using Prism.Ioc;
using UIKit;

namespace MovieApp.iOS
{
    [Register("AppDelegate")]
    public partial class AppDelegate : global::Xamarin.Forms.Platform.iOS.FormsApplicationDelegate
    {
        public override bool FinishedLaunching(UIApplication app, NSDictionary options)
        {
            global::Xamarin.Forms.Forms.Init();
            LoadApplication(new App(new iOSInitializer()));
            CachedImageRenderer.Init();
            CachedImageRenderer.InitImageSourceHandler();
            return base.FinishedLaunching(app, options);
        }
    }

    public class iOSInitializer : IPlatformInitializer
    {
        public void RegisterTypes(IContainerRegistry containerRegistry)
        {

        }
    }
}
```

All except the initialization of the FFImageLoading is same as we discussed from the prism tutorial. Only difference is this line:
```
CachedImageRenderer.Init();
CachedImageRenderer.InitImageSourceHandler();
```
which will also be initialized on the Android's side.

**MainActivity.cs**

```
using Android.App;
using Android.Content.PM;
using Android.Runtime;
using Android.OS;
using Prism;
using Prism.Ioc;
using FFImageLoading.Forms.Platform;

namespace MovieApp.Droid
{
    [Activity(Label = "MovieApp", Icon = "@mipmap/icon", Theme = "@style/MainTheme", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation | ConfigChanges.UiMode | ConfigChanges.ScreenLayout | ConfigChanges.SmallestScreenSize)]
    public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsAppCompatActivity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            CachedImageRenderer.Init(enableFastRenderer:true);
            CachedImageRenderer.InitImageViewHandler();
            Xamarin.Essentials.Platform.Init(this, savedInstanceState);
            global::Xamarin.Forms.Forms.Init(this, savedInstanceState);
            LoadApplication(new App(new AndroidInitializer()));
        }
        public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Android.Content.PM.Permission[] grantResults)
        {
            Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);

            base.OnRequestPermissionsResult(requestCode, permissions, grantResults);
        }
    }

    public class AndroidInitializer : IPlatformInitializer
    {
        public void RegisterTypes(IContainerRegistry containerRegistry)
        {

        }
    }
}
```

Just as we did on the iOS, here we have also added the initializer for the FFImageLoader on Android side.

```
CachedImageRenderer.Init(enableFastRenderer:true);
CachedImageRenderer.InitImageViewHandler();
```

We are now set.....mostly. But app can run and open MoviesPage though nothing but a text is shown. Next step is to open the MoviesPageViewModel.cs class. This class will extend Prism.Mvvm **BindableBase** this way we wont need to call RaisePropertyChanged whenever an update occurs in the viewmodel class variables.

**MoviesPageViewModel.cs**

```
using MovieApp.Common.Models;
using MovieApp.Common.Repository;
using MovieApp.Common.Constants;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace MovieApp.Common.Viewmodels
{
    class MoviesPageViewModel : BindableBase
    {
        private int page = 1;
        private INavigationService _navigationService;
        private ObservableCollection<Movie> listMovies = new ObservableCollection<Movie>();
        IMovieRepository repository = DependencyService.Get<IMovieRepository>();
        public Command RefreshMoviesCommand { get; set; }
        public Command MovieTresholdReachedCommand { get; set; }

        private int _movieTreshold;
        public int MovieTreshold
        {
            get => _movieTreshold;
            set => SetProperty(ref _movieTreshold, value);
        }

        private bool _isRefreshing;

        public bool IsRefreshing
        {
            get => _isRefreshing;
            set => SetProperty(ref _isRefreshing, value);
        }

        public ObservableCollection<Movie> allMovies { get; set; }

        private bool isLoadingData;


        public bool IsLoadingData
        {
            get => isLoadingData;
            set => SetProperty(ref isLoadingData, value);
        }

        public MoviesPageViewModel(INavigationService navigationService)
        {
            _navigationService = navigationService;
            allMovies = new ObservableCollection<Movie>();
            MovieTreshold = 1;
            FetchMoviesAsync();
            MovieTresholdReachedCommand = new Command(async () => await MoviesTresholdReached());
            RefreshMoviesCommand = new Command(async () =>
            {
                await FetchMoviesAsync();
                IsRefreshing = false;
            });
        }

        public async Task FetchMoviesAsync()
        {
            if (IsLoadingData)
            {
                return;
            }
            IsLoadingData = true;
            try
            {
                MovieTreshold = 1;
                page = 1;
                listMovies.Clear();
                allMovies.Clear();
                listMovies = await repository.GetMovies(new MovieCall(ApiKeys.NOW_PLAYING, page));
                if (listMovies != null)
                {
                    foreach (Movie movie in listMovies)
                    {
                        if (movie != null && !allMovies.Contains(movie))
                        {
                            allMovies.Add(movie);
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
            finally
            {
                IsLoadingData = false;
            }
        }

        private async Task MoviesTresholdReached()
        {
            if (IsLoadingData)
            {
                return;
            }
            page++;
            IsLoadingData = true;
            try
            {
                listMovies = await repository.GetMovies(new MovieCall(ApiKeys.NOW_PLAYING, page));
                foreach (Movie movie in listMovies)
                {
                    if (movie != null && !allMovies.Contains(movie))
                    {
                        allMovies.Add(movie);
                    }
                }
                if (listMovies.Count() == 0)
                {
                    MovieTreshold = -1;
                    return;
                }
            }
            catch (Exception)
            {
            }
            finally
            {
                IsLoadingData = false;
            }
        }
    }
}
```

I will now summarize what we did here :)

**page**: default is set to 1. Unless we are loading more pages by which page will be incremented by +1 the the initial call to the api will pass 1 as page. Once we scroll down to the bottom of the movie list then we will increment page and load more movies as shown in MoviesTresholdReached. Note that page will be reset whenever we pull down to refresh and it will be set back to 1.

**_navigationService**: Using Dependency Injection we now have this to use for navigationg. We will use it later on in part to fire an event taking us to MovieDetails page.

**listMovies and allMovies**: ObservableCollection containing movies. When page is 1 or when calling api first time we clear this lists and when load more we simply add more items to it. allmovies is used to sort and pass to the CollectionView in the xaml file.

**repository**: Used for making api calls. Derived from IMovieRepository.

**RefreshMoviesCommand**: Triggers the FetchMoviesAsync() which inturn resets the page to 1 and clear all the list then fetches the now_playing movies from the api. It is called when user pulls down to refresh.

**MovieTresholdReachedCommand**: Calls the MoviesTresholdReached() which is triggered when user scrolls to the bottom of the movie lists then page is incremented (If last page was 2 then next api call will be page 3 and so on) more movies are loaded. It will also be binded to the xaml layout using the built in **RemainingItemsThresholdReachedCommand** available in CollectionView along with **RemainingItemsThreshold**. You can refer [here](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/collectionview/populate-data#load-data-incrementally) for more on CollectionView.

**IsLoadingData**: A bool val used for showing or hiding the ActivityIndicator (loading spinner). It will be binded to the **IsRunning** property in the xaml layout.

Now open the MoviesPage.xaml and add a RefreshView, a CollectionView and set the ItemSource then finally a ActivityIndicator.

**MoviesPage.xaml**

```
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://xamarin.com/schemas/2014/forms"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MovieApp.Common.Views.MoviesPage"
             xmlns:ffimageloading="clr-namespace:FFImageLoading.Forms;assembly=FFImageLoading.Forms"
             Title="Movies Box">

    <Grid>
        <RefreshView Command="{Binding RefreshMoviesCommand}"
                     IsRefreshing="{Binding IsRefreshing}">
            <CollectionView ItemsSource="{Binding allMovies}" RemainingItemsThreshold="{Binding MovieTreshold}" RemainingItemsThresholdReachedCommand="{Binding MovieTresholdReachedCommand}"
                ItemsLayout="VerticalGrid, 2">
                <CollectionView.ItemTemplate>
                    <DataTemplate>
                        <Grid Padding="0">
                            <Grid.RowDefinitions>
                                <RowDefinition Height="*" />
                                <RowDefinition Height="30" />
                                <RowDefinition Height="1" />
                            </Grid.RowDefinitions>

                            <ffimageloading:CachedImage Grid.Row="0" Margin="2"
                       Source="{Binding poster_path, StringFormat= 'http://image.tmdb.org/t/p/w500/{0}'}"
                       Aspect="AspectFill"
                       HeightRequest="360"
                       WidthRequest="100" />

                            <Label Grid.Row="1" HorizontalTextAlignment="Center" VerticalTextAlignment="Center"
                       Text="{Binding title}" TextColor="Black" FontSize="14"
                       LineBreakMode="TailTruncation" />

                            <StackLayout Background="Black" Grid.Row="2" 
                       BackgroundColor="Black" />

                        </Grid>
                    </DataTemplate>
                </CollectionView.ItemTemplate>
            </CollectionView>
        </RefreshView>

        <ActivityIndicator IsRunning="{Binding IsLoadingData}"
                           HeightRequest="30"
                           HorizontalOptions="Center"
                           VerticalOptions="Center"
                           WidthRequest="30"/>
    </Grid>
</ContentPage>
```

Because i want a poster like layout i have set the ItemsLayout to have 2 columns here:

` ItemsLayout="VerticalGrid, 2"`

Because the images are loaded from another url i have formatted the image source to include the default url combined with the image url unique extension as shown below:

`Source="{Binding poster_path, StringFormat= 'http://image.tmdb.org/t/p/w500/{0}'}"`

If you would like to set default/error image using ffimageloading, follow below guide.

Add this to `ffimageloading` tag. Download an image you would like to use as error or default for the poster and rename it to default_poster (.png or jpg. I use a jpg image)
```
LoadingPlaceholder = "default_poster.jpg"
ErrorPlaceholder = "default_poster.jpg"
```

This default image will now be added to the project. Open drawable folder in the Resources foler in MovieApp.Android and add the image.

Next open MovieApp.iOS and expand Asset Catalogs then double click on Assets. Click + icon to add new asset on the left tab. Select Add Image Set. Click on 1x (Image will be universal) and find the downloaded image "default_poster.jpg". Save and close.

Now that everything is all set. Run the app!

Demo Video [Here>>](https://drive.google.com/file/d/16Qf_eSukT2Xd_VletpD-Xdbx5NYbuewQ/view?usp=sharing)

In the next part we will create the Movie Details page, add some other features like sharing and maybe even save to local database. Happy Coding