Xin chào các bạn, trong bài viết này mình sẽ chia sẻ cách làm thế nào để tạo 1 Expandable  trong android, với data được get từ sever format json.
Trước tiên, chúng ta sẽ tạo new project như bình thường.
## Add lib  Dependencies
trong file build.gradle của app , ta cần add các thư viện sau dưới dạng dependencies
```
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    androidTestCompile('com.android.support.test.espresso:espresso-core:2.2.2', {
        exclude group: 'com.android.support', module: 'support-annotations'
    })
    compile 'com.android.support:appcompat-v7:25.3.1'
    compile 'com.android.support.constraint:constraint-layout:1.0.2'
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:recyclerview-v7:25.3.1'
    compile 'com.android.support:cardview-v7:25.3.1'
    compile 'com.android.volley:volley:1.0.0'
    compile 'com.github.bumptech.glide:glide:4.0.0-RC1'
}
```

- Chúng ta sẽ sử dung volley để thực hiện các request đến sever 
- Sử dụng thư viện Glide để load ảnh từ internet về.
## Web Service
- Chúng ta sẽ lấy data từ sever sau: https://simplifiedcoding.net/demos/marvel/
 với định dạng như sau:
 ![](https://images.viblo.asia/fd876f2a-d336-4679-8fc5-821a38489829.png)
##  Data Model
```
package net.simplifiedlearning.expandablerecyclerview;
 
/**
 * Created by Belal on 7/15/2017.
 */
 
public class Hero {
 
    private String name, realName, team, firstAppearance, createdBy, publisher, imageUrl, bio;
 
    public Hero(String name, String realName, String team, String firstAppearance, String createdBy, String publisher, String imageUrl, String bio) {
        this.name = name;
        this.realName = realName;
        this.team = team;
        this.firstAppearance = firstAppearance;
        this.createdBy = createdBy;
        this.publisher = publisher;
        this.imageUrl = imageUrl;
        this.bio = bio;
    }
 
    public String getName() {
        return name;
    }
 
    public String getRealName() {
        return realName;
    }
 
    public String getTeam() {
        return team;
    }
 
    public String getFirstAppearance() {
        return firstAppearance;
    }
 
    public String getCreatedBy() {
        return createdBy;
    }
 
    public String getPublisher() {
        return publisher;
    }
 
    public String getImageUrl() {
        return imageUrl;
    }
 
    public String getBio() {
        return bio;
    }
}
```
## Adding RecyclerView
- Chúng ta cần add recyclerview vào layout XML, tương tự như sau:
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="net.simplifiedlearning.expandablerecyclerview.MainActivity">
 
 
    <android.support.v7.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
 
 
</RelativeLayout>
```
## Designing List Layout
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">
 
    <android.support.v7.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="match_parent">
 
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical">
 
            <TextView
                android:id="@+id/textViewName"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:background="#ff3847"
                android:padding="10dp"
                android:text="Iron Man"
                android:textAlignment="center"
                android:textAppearance="@style/Base.TextAppearance.AppCompat.Large.Inverse" />
 
            <LinearLayout
                android:animateLayoutChanges="true"
                android:id="@+id/linearLayout"
                android:visibility="gone"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical">
 
                <ImageView
                    android:id="@+id/imageView"
                    android:scaleType="fitXY"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content" />
 
                <TableLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:padding="15dp">
 
                    <TableRow>
 
                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="Real Name   " />
 
                        <TextView
                            android:id="@+id/textViewRealName"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="Tony Stark"
                            android:textStyle="bold" />
                    </TableRow>
 
                    <TableRow>
 
                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="Team   " />
 
                        <TextView
                            android:id="@+id/textViewTeam"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="Avengers"
                            android:textStyle="bold" />
                    </TableRow>
 
                    <TableRow>
 
                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="First Appearance   " />
 
                        <TextView
                            android:id="@+id/textViewFirstAppearance"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="1974"
                            android:textStyle="bold" />
                    </TableRow>
 
                    <TableRow>
 
                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="Created By   " />
 
                        <TextView
                            android:id="@+id/textViewCreatedBy"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="Stan Lee"
                            android:textStyle="bold" />
                    </TableRow>
 
                    <TableRow>
 
                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="Publisher   " />
 
                        <TextView
                            android:id="@+id/textViewPublisher"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="Marvel Comics"
                            android:textStyle="bold" />
                    </TableRow>
 
                    <TableRow>
 
                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="Bio   " />
 
                        <TextView
                            android:id="@+id/textViewBio"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:inputType="textMultiLine"
                            android:text="Steven Rogers was born in the Lower East Side of Manhattan, New York City, in 1925 to poor Irish immigrants, Sarah and Joseph Rogers.[54] Joseph died when Steve was a child, and Sarah died of pneumonia while Steve was a teen. By early 1940, before America's entry into World War II, Rogers is a tall, scrawny fine arts student specializing in illustration and a comic book writer and artist."
                            android:textStyle="bold" />
                    </TableRow>
 
                </TableLayout>
 
            </LinearLayout>
 
        </LinearLayout>
 
    </android.support.v7.widget.CardView>
</RelativeLayout>
```
Sẽ có dạng như ảnh bên dưới:
![](https://images.viblo.asia/079acb53-edca-434e-9ee4-7e39a71ef14d.png)

## Creating RecyclerView Adapter
```


package net.simplifiedlearning.expandablerecyclerview;
 
import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.transition.AutoTransition;
import android.transition.TransitionManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
 
import com.bumptech.glide.Glide;
 
import java.util.List;
 
/**
 * Created by Belal on 7/15/2017.
 */
 
public class HeroAdapter extends RecyclerView.Adapter<HeroAdapter.HeroViewHolder> {
 
 
    private List<Hero> heroList;
    private Context context;
 
    private static int currentPosition = 0;
 
    public HeroAdapter(List<Hero> heroList, Context context) {
        this.heroList = heroList;
        this.context = context;
    }
 
    @Override
    public HeroViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.list_layout_heroes, parent, false);
        return new HeroViewHolder(v);
    }
 
    @Override
    public void onBindViewHolder(final HeroViewHolder holder, final int position) {
        Hero hero = heroList.get(position);
        holder.textViewName.setText(hero.getName());
        holder.textViewRealName.setText(hero.getRealName());
        holder.textViewTeam.setText(hero.getTeam());
        holder.textViewFirstAppearance.setText(hero.getFirstAppearance());
        holder.textViewCreatedBy.setText(hero.getCreatedBy());
        holder.textViewPublisher.setText(hero.getPublisher());
        holder.textViewBio.setText(hero.getBio().trim());
 
        Glide.with(context).load(hero.getImageUrl()).into(holder.imageView);
        holder.linearLayout.setVisibility(View.GONE);
 
        //if the position is equals to the item position which is to be expanded
        if (currentPosition == position) {
            //creating an animation
            Animation slideDown = AnimationUtils.loadAnimation(context, R.anim.slide_down);
            
            //toggling visibility
            holder.linearLayout.setVisibility(View.VISIBLE);
            
            //adding sliding effect 
            holder.linearLayout.startAnimation(slideDown);
        }
 
        holder.textViewName.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                
                //getting the position of the item to expand it
                currentPosition = position;
                
                //reloding the list
                notifyDataSetChanged();
            }
        });
    }
 
    @Override
    public int getItemCount() {
        return heroList.size();
    }
 
    class HeroViewHolder extends RecyclerView.ViewHolder {
        TextView textViewName, textViewRealName, textViewTeam, textViewFirstAppearance,
                textViewCreatedBy, textViewPublisher, textViewBio;
        ImageView imageView;
        LinearLayout linearLayout;
 
        HeroViewHolder(View itemView) {
            super(itemView);
 
            textViewName = (TextView) itemView.findViewById(R.id.textViewName);
            textViewRealName = (TextView) itemView.findViewById(R.id.textViewRealName);
            textViewTeam = (TextView) itemView.findViewById(R.id.textViewTeam);
            textViewFirstAppearance = (TextView) itemView.findViewById(R.id.textViewFirstAppearance);
            textViewCreatedBy = (TextView) itemView.findViewById(R.id.textViewCreatedBy);
            textViewPublisher = (TextView) itemView.findViewById(R.id.textViewPublisher);
            textViewBio = (TextView) itemView.findViewById(R.id.textViewBio);
            imageView = (ImageView) itemView.findViewById(R.id.imageView);
 
            linearLayout = (LinearLayout) itemView.findViewById(R.id.linearLayout);
        }
    }
}
```
## MainActivity
```
package net.simplifiedlearning.expandablerecyclerview;
 
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
 
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
 
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
 
import java.util.ArrayList;
import java.util.List;
 
public class MainActivity extends AppCompatActivity {
 
    final String URL_GET_DATA = "https://simplifiedcoding.net/demos/marvel/";
    RecyclerView recyclerView;
    HeroAdapter adapter;
    List<Hero> heroList;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        recyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
 
        heroList = new ArrayList<>();
 
        loadHeroes();
    }
 
    private void loadHeroes() {
        StringRequest stringRequest = new StringRequest(Request.Method.GET, URL_GET_DATA,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONArray jsonArray = new JSONArray(response);
 
                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject obj = jsonArray.getJSONObject(i);
 
                                Hero hero = new Hero(
                                        obj.getString("name"),
                                        obj.getString("realname"),
                                        obj.getString("team"),
                                        obj.getString("firstappearance"),
                                        obj.getString("createdby"),
                                        obj.getString("publisher"),
                                        obj.getString("imageurl"),
                                        obj.getString("bio")
                                );
 
                                heroList.add(hero);
                            }
 
                            adapter = new HeroAdapter(heroList, getApplicationContext());
                            recyclerView.setAdapter(adapter);
 
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
 
                    }
                });
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        requestQueue.add(stringRequest);
    }
}
```
Kết quả ta được như hình:
![](https://images.viblo.asia/1e1cd23b-019f-43d0-9d08-9d0a59f285fa.png)

Bài viết được tham khảo từ: 
https://www.simplifiedcoding.net/expandable-recyclerview-android/
Rất mong nhận được sự góp ý của các bạn !
Các bạ có thể tham khảo source code tại đây:
https://github.com/chriselder/expandable-recycler-view