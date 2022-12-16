As a developer there are certain things that are expected of you. Can say some skills but however what level of developer you might be, below are some examples of practises that might be wise to adopt to imrove your overall approach and development skills.

**Start using the officail IDE (Android Studio)**

By moving layouts or even some elements properties to seperate layout this will not only make your code re-usablilty better but also saves you a lot of headache when the need to chnage some of this properties arrises. Imagine having hundreds of layout all consisting of either a button or field that is common and then at a later time you need to change all properties of this common element. You will have to edit each and everyone of the layout individually and that is a nightmare. Moving the layout/properties to sepate layout will save you this hassle. The <Include> tag can be used to import a layout, the style can be used for element properties and so on.
    
**Learn to create seperate layouts for elements that will be re-used**
    
Hard coding should be avoided at all cost. Do not pass string directly into your xml but instead move to the String.xml file. This also applies to values, colors and so on.
    
**Always put launcher icons in the mipmap folder**
    
 When building separate apks for different densities, drawable folders for other densities get stripped. This will make the icons appear blurry in devices that use launcher icons of higher density. Since, mipmap folders do not get stripped, it’s always best to use them for including the launcher icons.

**Unless completely necessary, avoid using images but instead use shapes and selectors**
    
Basic shapes/gradients can easily be drawn using the <shape /> tag without any use of images (Remember images can take more spaces also). The resulting shapes that are drawn are always sharp and do not need to be created for multiple densities. A basic blue button can be created in the following way and saved as bg_blue.xml in the drawables folder rather than using background image for your layout or button.
    
 **bg_blue.xml**
    
```
 <?xml version="1.0" encoding="UTF-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:id="@+id/listview_background_shape">

    <padding android:left="@dimen/dp_4"
        android:top="@dimen/dp_2"
        android:right="@dimen/dp_2"
        android:bottom="@dimen/dp_2" />
    <corners android:radius="@dimen/dp_40" />
    <solid android:color="@color/profile_btn_blue" />
</shape>
```

 **Avoid deep levels in layouts**
Having deep levels in your layout can slow app interface and even worse its harder to manage. Below is an example of how one can avoid unnecessary levels. 
    
 **Bad**
    
```
 <LinearLayout
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="horizontal">

    <ImageView
        android:layout_width="wrap_content" 
        android:layout_height="wrap_content"
        android:src="@drawable/ic_search" />

        <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="vertical">

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="top text" />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="bottom text" />
    </LinearLayout>
</LinearLayout>
```

 **Good**
    
```
 <RelativeLayout
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">

    <ImageView
        android:id="@+id/image"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@drawable/ic_search" />

    <TextView
        android:id="@+id/top_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_toRightOf="@id/image"
        android:text="top text" />

    <TextView
        android:id="@+id/bottom_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/top_text"
        android:layout_toRightOf="@id/image"
        android:text="bottom text" />
</RelativeLayout>
```

 **Use libraries such as Retrofit, Volley and other libraries that speeds up develoment**
    
Using libraries can not only speed up your app development but can also offer variety of advantages. For example you may decide to use Ormlite or Room for your database rather than using the default (SqlLite). Using this libraries makes it very much easier for you to create and implement many functions in less code and stress. Android have come a long way, there are many libraries out there that can make life as a developer much more easier.

**Use the Parcelable class instead of Serializable when passing data in Intents/Bundles**
    
Serialization of an object that implements the Parcelable interface is much faster than using Java’s default serialization. A class the implements the Serializable interface is marked as serializable and Java serializes it using reflection (which makes it slow). When using the Parcelable interface, the whole object doesn’t get serialized automatically. Rather, we can selectively add data from the object to a Parcel using which the object is later deserialized.

**Finally**
    
Dont forget to keep improving yourself. Reasearch and adapt. There are always many ways to solve a problem, the only thing that seperates a good developer and a great developer is finding the best solution to the presented problem. Read journals and follow android communities in order to improve your skills and experience. Doesnt matter what problem you are facing, there is definitely someone somwhere who has faced the same problem and solved it so dont just sit there. There many more practices that might not have been covered here so go out there and explore........Happy codding.