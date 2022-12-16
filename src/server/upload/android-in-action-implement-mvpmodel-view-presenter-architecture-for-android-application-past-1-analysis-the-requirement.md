### Overview
Let''s discuss the way implementation Android MVP Architecture in practical case.
1. Part1: Overview MVP Architecture and Login function''s requirement
1. Part 2: Implement source code by Kotlin in Android Application

_______________________________________________________________________________________________________________________________________			
### We''ll design MVP Architecture like as below
1. View layer:  
    * UI :display data -> configure activity/fragment layout, binding data, binding action -> with context of application
    * The adapter: transformation data if necessary (usually using with recycle view,...)
1. Model layer: 
    * network and DAO: handle the way how to get/load data (from cache, from REST API,...)
    * entity: just informations which functions need. (It can be store in Room database,...)
1. Presenter layer:
    * presenter: extend ViewModel()/AndroidViewModel()
        * kepp data variable of layout for binding data
        * has state -> decides the View's behavior (implement by LiveData)
        * keep entity references to hold data for View
        * keep DAO/network references to get/load data
        * optional: keep/refer other business/validate references for owner business
    * other business, validate,...
_______________________________________________________________________________________________________________________________________			
### Requirement: 
User want to build a function called Login. It has:
- GUI: display data and keep interacting with user.
- data: store user's data to use for login business.
- login manual: main business.
- single sign on: auto login when user has author before.
- validate: validate data.
- show message: info and error messages.
_______________________________________________________________________________________________________________________________________			
### Let's analysis user's business 
we have a Login function specs as below:
1. Display screen
1. sso (auto login) by cache
    * sso -> false: user must to login manually
    * sso -> true: auto redirect to home screen
1. Login manual
    * handle user's input: both (username, passwork)are fill -> enable login button, else disable
    * validate: (disable login button when user's input invalid else enable.)
        * username is not empty
        * username's length is between 6-8 characters
        * password is not empty
        * password's length is between 6-10 characters
        * both username and password can not contains space character
    * login action
        * call RESTfull API to execute login with params: username, password by JSON format
        * Success: 
            * Update cache login state for login next time
            * Redirect home screen
        * False: show error from server