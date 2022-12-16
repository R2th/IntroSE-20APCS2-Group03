# Introduction
Android has made it so much easy to implement a recyclerview and populate data. But what if as a developer you need to implement Search for your data? Follow this easy step to do so.
First and foremost we create a project and name it whatever we please. I am calling mine "SearchApp".

![](https://images.viblo.asia/7c1ec3df-fef9-443f-bc9c-16999006dc8a.png)

Select nect and name your Activity CountryActivity. Next we need to import our libraries, in this case for RecyclerView.

`build.gradle`
`implementation 'com.android.support:recyclerview-v7:26.1.0'`

## Step 1
**Create Layouts**
> activity_country.xml

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context="com.example.pane.searchapp.CountryActivity">

    <SearchView
        android:id="@+id/search_city"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>

    <android.support.v7.widget.RecyclerView
        android:id="@+id/cityList"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:longClickable="true" />

</LinearLayout>
```

> item_list_country.xml

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:padding="4dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <TextView
            android:id="@+id/countryName"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="5dp"
            android:padding="8dp"
            android:textAppearance="?android:attr/textAppearanceLarge"
            android:textStyle="bold"/>
    </LinearLayout>
</LinearLayout>
```

## Step 2
**Create Model and fake data**

> Country

```
package com.example.pane.searchapp;

public class Country {
    private String name;

    public Country(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

> CountryList

```
package com.example.pane.searchapp;

import java.util.ArrayList;

public class CountryList {
    private ArrayList<Country> mCountryArrayList = new ArrayList<>();

    CountryList() {
    }

    public void insertCountries() {
        Country city = new Country("America");
        Country city1 = new Country("Angola");
        Country city2 = new Country("Belgium");
        Country city3 = new Country("Brazil");
        Country city4 = new Country("China");
        Country city5 = new Country("Denmark");
        Country city6 = new Country("Egypt");
        mCountryArrayList.add(city);
        mCountryArrayList.add(city1);
        mCountryArrayList.add(city2);
        mCountryArrayList.add(city3);
        mCountryArrayList.add(city4);
        mCountryArrayList.add(city5);
        mCountryArrayList.add(city6);
    }

    public ArrayList getCountries() {
        return mCountryArrayList;
    }
}
```

## Step 3
**Create Adapter**

> CountriesAdapter

```
package com.example.pane.searchapp;
/**
 * Created by babatunde.sunday on 9/21/18.
 */
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

public class CountriesAdapter extends RecyclerView.Adapter<CountriesAdapter.MyViewHolder> {
    private List<Country> mCountryList;

    public CountriesAdapter(List<Country> CountryList) {
        this.mCountryList = CountryList;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
            .inflate(R.layout.item_list_country, parent, false);
        return new MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        Country Country = mCountryList.get(position);
        holder.title.setText(Country.getName());
    }

    @Override
    public int getItemCount() {
        return mCountryList.size();
    }

    public class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView title;

        public MyViewHolder(View view) {
            super(view);
            title = view.findViewById(R.id.countryName);
        }
    }
}
```

## Step 4

**Populate the data and add QueryListener to the Search View**
> CountryActivity

```
package com.example.pane.searchapp;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.widget.SearchView;

import java.util.ArrayList;

public class CountryActivity extends AppCompatActivity implements SearchView.OnQueryTextListener {
    private RecyclerView mRecyclerView;
    private CountriesAdapter mCountryListAdapter;
    private ArrayList<Country> mCountryArrayList;
    private SearchView mSearchView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_country);
        init();
        setupSearchView();
    }

    private void init() {
        mRecyclerView = findViewById(R.id.cityList);
        mSearchView = findViewById(R.id.search_city);
        loadCities();
        mCountryListAdapter = new CountriesAdapter(mCountryArrayList);
        RecyclerView.LayoutManager mLayoutManager =
            new LinearLayoutManager(getApplicationContext());
        mRecyclerView.setLayoutManager(mLayoutManager);
        mRecyclerView.setAdapter(mCountryListAdapter);
    }

    private void setupSearchView() {
        mSearchView.setIconifiedByDefault(false);
        mSearchView.setOnQueryTextListener(this);
        mSearchView.setSubmitButtonEnabled(true);
        mSearchView.setQueryHint("Search......");
    }

    public void loadCities() {
        mCountryArrayList = new ArrayList<>();
        CountryList dataBaseAdapter = new CountryList();
        dataBaseAdapter.insertCountries();
        mCountryArrayList = dataBaseAdapter.getCountries();
    }

    @Override
    public boolean onQueryTextChange(String newText) {
        ArrayList<Country> listOfCity = new ArrayList<>();
        if (TextUtils.isEmpty(newText)) {
            listOfCity = mCountryArrayList;
        } else {
            for (Country country : mCountryArrayList) {
                if (country.getName().trim().toLowerCase().contains(newText)) {
                    listOfCity.add(country);
                }
            }
        }
        mCountryListAdapter = new CountriesAdapter(listOfCity);
        mRecyclerView.setAdapter(mCountryListAdapter);
        return true;
    }

    @Override
    public boolean onQueryTextSubmit(String query) {
        return false;
    }
}
```

Run App and you can see the data and the search works as image below>>>>>

![](https://images.viblo.asia/6450fd16-bf18-42cb-b032-4ed6fe35e3ff.png)

**After Search>>**

![](https://images.viblo.asia/193cf587-0167-4725-b1a6-e26c3b0cd52a.png)

Thats it! If however you will be quering large data or lets say from an Api it is better to use an Handler to wait for the user search input. Happy Coding!!!