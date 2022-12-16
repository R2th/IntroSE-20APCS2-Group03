## Introduction
Writing UI test can be a challenge if one doesnt have a proper guide and experience. In the tutorial ill show you how you can write a simple UI test for your recyclerview (I assume you already have one implemented and attached an adapter to it). This tutorial is going to be straight, short and direct. At the end of this guide you will know how to test scrolling, visibility and touch an item in your recyclerview.

### Anatomy of UI Test
- Find the View
- Perform the action
- Observe the Output/Result

Espresso provides you means of finding your views and interacting with them to perform various actions while monitoring the results on the console. To add Espresso continue below: 

Firstly add test and expreso to the dependencies in graddle file.

**build.graddle**

```
androidTestImplementation 'androidx.test.espresso:espresso-core:3.1.0'
androidTestImplementation 'androidx.test:runner:1.1.0'
androidTestImplementation 'androidx.test:rules:1.1.0'
```

Next add this line to the same build.gradle file but in android.defaultConfig

`testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"`

Now that we have that done lets have a brief intro into our project packages and get familiar with where UI test is performed and where Unit testing is placed. To perfomr UI tests with Android Studio, you have to create your test code in a separate Android test folder  `src/androidTest/java` It is here that your automated UI codes will be put. Now lets try to make some UI test for our RecyclerView (Note: I assumed you have a RecyclerView already populated with data and adapter of such).

Say for example you have an Activity/Fragment that show a list of Movies, you will create a class MovieListScreenUITestCases in the directory specified above.

**MovieListScreenUITestCases.kt**

```
@get:Rule
var activityRule = ActivityTestRule(MainActivity::class.java)
```

ActivityTestRule provides functional testing of a single activity and in this case I have a singleActivity application and multiple fragments but i digress. In simpler terms we need this to access an instance of the MainClass.

Now lets run a simple UI test to check if our RecyclerView is visible when app is launched.

### Test for Visibility

```
@Test
@Throws(InterruptedException::class)
fun testVisibilityRecyclerView() {
    Thread.sleep(1000)
    Espresso.onView(ViewMatchers.withId(R.id.rvMovies))
        .inRoot(
            RootMatchers.withDecorView(
                Matchers.`is`(
                    activityRule.activity.window.decorView
                )
            )
        )
        .check(ViewAssertions.matches(ViewMatchers.isDisplayed()))
}
```

Here we used the Espresso.onView() and passing the id of the recyclerview `R.id.rvMovies` we are able to locate the view and test its visibility with `ViewAssertions.mathces()`. ViewAssertions had many properties like isFocus, isClickable and so on so you can use them as you prefer. Run the test (Ctrl+Shift+F10 or right click on the test class and select run) to view the result. If all goes well you will see the passed message in the console. Below are other Automated test example for scrolling and itemViews. 

### Test for Scrolling

```
@Test
@Throws(InterruptedException::class)
fun testCaseForRecyclerScroll() {
    Thread.sleep(1000)
    val recyclerView =
        activityRule.activity.findViewById<RecyclerView>(R.id.rvMovies)
    val itemCount =
        Objects.requireNonNull(recyclerView.adapter!!).itemCount
    Espresso.onView(ViewMatchers.withId(R.id.rvMovies))
        .inRoot(
            RootMatchers.withDecorView(
                Matchers.`is`(
                    activityRule.activity.window.decorView
                )
            )
        )
        .perform(RecyclerViewActions.scrollToPosition<RecyclerView.ViewHolder>(itemCount - 1))
}
```

### Test for RecyclerView Click

```
@Test
@Throws(InterruptedException::class)
fun testCaseForRecyclerClick() {
    Thread.sleep(1000)
    Espresso.onView(ViewMatchers.withId(R.id.rvMovies))
        .inRoot(
            RootMatchers.withDecorView(
                Matchers.`is`(
                    activityRule.activity.window.decorView
                )
            )
        )
        .perform(
            RecyclerViewActions.actionOnItemAtPosition<RecyclerView.ViewHolder>(
                0,
                ViewActions.click()
            )
        )
}
```

### Test for Recycler ItemView

```
@Test
@Throws(InterruptedException::class)
fun testCaseForRecyclerItemView() {
    Thread.sleep(1000)
    Espresso.onView(ViewMatchers.withId(R.id.rvMovies))
        .inRoot(
            RootMatchers.withDecorView(
                Matchers.`is`(
                    activityRule.activity.window.decorView
                )
            )
        )
        .check(
            ViewAssertions.matches(
                withViewAtPosition(
                    1, Matchers.allOf(
                        ViewMatchers.withId(R.id.layoutMovies), ViewMatchers.isDisplayed()
                    )
                )
            )
        )
}
```

```
private fun withViewAtPosition(
    position: Int,
    itemMatcher: Matcher<View?>
): Matcher<View?>? {
    return object : BoundedMatcher<View?, RecyclerView>(RecyclerView::class.java) {
        override fun describeTo(description: Description) {
            itemMatcher.describeTo(description)
        }

        override fun matchesSafely(recyclerView: RecyclerView): Boolean {
            val viewHolder =
                recyclerView.findViewHolderForAdapterPosition(position)
            return viewHolder != null && itemMatcher.matches(viewHolder.itemView)
        }
    }
}
```