### Intro
Following the previous tutorial where I created the Homescreen to the movie db app and fetch the movies from the api, thid next part will focus mainly on the details screen.

### Creating the DetailsScreen
First and foremost lets add and bind the movie selected when the user touhes any of the movie on the list using the "SelectedItem" property on the `MoviesPage.xaml`. Add to the CollectionView tag.

**MoviesPage.xaml**

`SelectionMode="Single" SelectedItem="{Binding SelectedMovie}"`

**NOTE:** To enable select item you must set SelectMode in the CollectionView as shown above.

Add the Movie and Movie details format to the constant class.

**Constant.cs**

```
public const string MOVIE = "MOVIE";
```

Next the viewmodel for MovieDetails "MoviesPageViewModel.cs". We will add SelectedMovie as binded in the xaml and also the OpenMovieDetail method which will pass the movie object to the MovieDetailScreen (It better to make another call to the api to fecth this data but in this case i wont).

**MoviesPageViewModel.cs**

```
public Movie _selectedMovie;
public Movie SelectedMovie
{
    get { return _selectedMovie; }
    set
    {
        _selectedMovie = value;
        OpenMovieDetail();
    }
}

public void OpenMovieDetail()
{
    var par = new NavigationParameters();
    par.Add(Constant.MOVIE, _selectedMovie);
    _navigationService.NavigateAsync(nameof(MovieDetailsPage), par);
}
```

So now whenever you click on a movie from the list it will take you to the MovieDetailsPage. Using the NavigationParameter (used to pass object or data to the NavigationService). It is possible to simply pass the Movie object as a parameter and use it to populate the MovieDetailsScreen .

Now that we have passed the movie object lets open the MovieDetailsPageViewModel and recieve the movie by extending INavigationAware.

**MovieDetailsPageViewModel**

```
using MovieApp.Common.Constants;
using MovieApp.Common.Models;
using Prism.Mvvm;
using Prism.Navigation;

namespace MovieApp.Common.Viewmodels
{
    class MovieDetailsPageViewModel : BindableBase, INavigationAware
    {
        private INavigationService _navigationService;
        public Movie movies;
        public Movie Movies
        {
            get => movies;
            set => SetProperty(ref movies, value);
        }

        private bool isLoadingData;

        public bool IsLoadingData
        {
            get => isLoadingData;
            set => SetProperty(ref isLoadingData, value);
        }
        public MovieDetailsPageViewModel(INavigationService navigationService)
        {
            _navigationService = navigationService;
            
        }

        public void OnNavigatedFrom(INavigationParameters parameters)
        {
            
        }

        public void OnNavigatedTo(INavigationParameters parameters)
        {
            Movie movie = parameters[Constant.MOVIE] as Movie;
            Movies = movie;
        }
    }
}
```

Data passed can be recieved from the OnNavigatedTo. Now we will design the MovieDetailsPage screen.

**MovieDetailsPage.xaml**

```
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://xamarin.com/schemas/2014/forms"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml" 
             xmlns:ffimageloading="clr-namespace:FFImageLoading.Forms;assembly=FFImageLoading.Forms"
             x:Class="MovieApp.Common.Views.MovieDetailsPage"
             Title="{Binding Movies.title}">
    <Grid Margin="10,10,10,0">
        <Grid.RowDefinitions>
            <RowDefinition Height="*"/>
            <RowDefinition Height="50"/>
            <RowDefinition Height="50"/>
            <RowDefinition Height="40"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>
        
        <ffimageloading:CachedImage Grid.Row="0"
                       Source="{Binding Movies.poster_path, StringFormat= 'http://image.tmdb.org/t/p/w500/{0}'}"
                       LoadingPlaceholder = "default_poster.jpg"
	                   ErrorPlaceholder = "default_poster.jpg"
                       Aspect="AspectFit"
                       HeightRequest="400"
                       WidthRequest="150" />

        <Grid Grid.Row="1" VerticalOptions="Start" HorizontalOptions="CenterAndExpand">
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="2*"/>
                <ColumnDefinition Width="2*"/>
            </Grid.ColumnDefinitions>

            <Label Text="{Binding Movies.title, StringFormat='Title: {0}'}" FontSize="Small" Grid.Row="1" Grid.Column="0" 
                TextColor="Black" HorizontalTextAlignment="Start" VerticalTextAlignment="Start" />
            <Label Text="{Binding Movies.release_date, StringFormat='Release: {0}'}" FontSize="Small" Grid.Row="1" Grid.Column="1"
               TextColor="Black" HorizontalOptions="Start" HorizontalTextAlignment="Start" />
        </Grid>

        <Label Text="{Binding Movies.vote_average, StringFormat='Average Vote: {0}'}" FontSize="Small" Grid.Row="2"
                HorizontalOptions="Center" TextColor="Black" HorizontalTextAlignment="Start" VerticalTextAlignment="Start" />

        <Label Text="Description" HorizontalOptions="Center" VerticalOptions="Start" FontSize="Small" Grid.Row="3" TextColor="Black"/>

        <ScrollView Grid.Row="4">
            <StackLayout>

                <Label Text="{Binding Movies.overview}" FontSize="Small" Grid.Column="1"
                HorizontalOptions="End" HorizontalTextAlignment="Start" />
            </StackLayout>
        </ScrollView>

        <ActivityIndicator IsRunning="{Binding IsLoadingData}"
                           HeightRequest="30"
                           HorizontalOptions="Center"
                           VerticalOptions="Center"
                           WidthRequest="30"/>
    </Grid>
</ContentPage>
```

Now that i have the Movie object i can set all my labels and image source by binding the respective values to the components. This is a simple design which will be improved on later on.

Run the App and checkout the Details screen.

![](https://images.viblo.asia/0c7bb84e-fa5b-43db-b769-a092baf4fd1c.jpg)

And thats it. In the next tutorial ill add menu to the HomeScreen and a database for local storage. Happy Coding!