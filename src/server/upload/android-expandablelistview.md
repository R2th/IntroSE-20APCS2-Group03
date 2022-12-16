Chào mừng bạn đến với Hướng dẫn ví dụ về ExpandableListView của Android. 

Trong hướng dẫn này, chúng tôi sẽ triển khai ExpandableListView được sử dụng để nhóm dữ liệu danh sách theo danh mục. Đó là loại menu và menu phụ trong một ListView Android.

# Android ExpandableListView
**Android ExpandableListView** là View hiển thị các mục trong danh sách hai cấp cuộn theo chiều dọc. Nó khác với ListView là nó bao gồm **các nhóm con**(group item) có thể dễ dàng mở rộng và thu gọn bằng cách chạm vào để xem và các mục con tương ứng của chúng(child items).

**ExpandableListViewAdapter** trong Android được sử dụng để load dữ liệu vào cho các items của ExpandableListView. Và sau đây là một số method quan trong của class ExpandableListViewAdapter:
* getGroupView: Bản chất giống getView trong ListView. Nhưng getGroupView sẽ trả về View hiển thị Group Header.
* getChildView: Bản chất cũng giống như getView(). Nhưng ở đây getChildView trả về View để hiển thị view trong Header View.
* getGroupCount: Trả về số phần tử  của group.
* getChildrenCount: Trả về số phần tử con ứng với groupPosition.
* getGroup: Trả về object của header group. Có nghĩa là trả về phần tử  tại groupPosition trong danh sách header group.

Các sự kiện đáng chú ý của ExpandableListView được đưa ra dưới đây:
* OnChildClick: Được gọi khi click vào một *child item*.
* OnGroupClick: Được gọi khi click vào một *group item*.
* OnGroupCollapse: Được gọi khi một group được rút gọn.
* OnGroupExpand: Được gọi khi một group được mở rộng.

# Android ExpandableListView Project Structure
![](https://images.viblo.asia/d1d8694c-e8ec-407a-b648-be70316e82a9.png)

Project này bao gồm 3 class:
* MainActivity: Hiển thị một layout chính với một *ExpandableListView*.
* ExpandableListDataPump: Đại diện cho dữ liệu ngẫu nhiên trong Danh sách và ánh xạ dữ liệu mục con tới các tiêu đề nhóm tương ứng bằng cách sử dụng *HashMap*.
* CustomExpandableListAdapter: cung cấp dữ liệu từ *ExpandableListDataPump* cho *ExpandableListView* ở *MainActivity*
# Android ExpandableListView Code
***activity_main.xml***
```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    tools:context=".MainActivity">

    <ExpandableListView
        android:id="@+id/expandableListView"
        android:layout_height="match_parent"
        android:layout_width="match_parent"
        android:indicatorLeft="?android:attr/expandableListPreferredItemIndicatorLeft"
        android:divider="@android:color/darker_gray"
        android:dividerHeight="0.5dp" />

</RelativeLayout>
```
Lưu ý: Chúng ta không thể sử dụng giá trị wrap_content cho thuộc tính android: layout_height của ExpandableListView trong XML trừ khi kích thước của cha mẹ được set cứng.


-----


***list_group.xml***
```xml
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <TextView
        android:id="@+id/listTitle"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:paddingLeft="?android:attr/expandableListPreferredItemPaddingLeft"
        android:textColor="@android:color/black"
        android:paddingTop="10dp"
        android:paddingBottom="10dp" />
</LinearLayout>
```


-----

***list_item.xml***

```xml
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="wrap_content">
    <TextView
        android:id="@+id/expandedListItem"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:paddingLeft="?android:attr/expandableListPreferredChildPaddingLeft"
        android:paddingTop="10dp"
        android:paddingBottom="10dp" />
</LinearLayout>
```


-----

***ExpandableListDataPump.java***
```java
package com.journaldev.expandablelistview;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ExpandableListDataPump {
    public static HashMap<String, List<String>> getData() {
        HashMap<String, List<String>> expandableListDetail = new HashMap<String, List<String>>();

        List<String> cricket = new ArrayList<String>();
        cricket.add("India");
        cricket.add("Pakistan");
        cricket.add("Australia");
        cricket.add("England");
        cricket.add("South Africa");

        List<String> football = new ArrayList<String>();
        football.add("Brazil");
        football.add("Spain");
        football.add("Germany");
        football.add("Netherlands");
        football.add("Italy");

        List<String> basketball = new ArrayList<String>();
        basketball.add("United States");
        basketball.add("Spain");
        basketball.add("Argentina");
        basketball.add("France");
        basketball.add("Russia");

        expandableListDetail.put("CRICKET TEAMS", cricket);
        expandableListDetail.put("FOOTBALL TEAMS", football);
        expandableListDetail.put("BASKETBALL TEAMS", basketball);
        return expandableListDetail;
    }
}

```
Trong đoạn code trên, đối tượng *expandableListDetail* được sử dụng để ánh xạ các chuỗi tiêu đề nhóm cho các nhóm con tương ứng của chúng chứa trong các *ArrayList*.


-----

***CustomExpandableListAdapter.java***
```java
package com.journaldev.expandablelistview;

import java.util.HashMap;
import java.util.List;
import android.content.Context;
import android.graphics.Typeface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.TextView;

public class CustomExpandableListAdapter extends BaseExpandableListAdapter {

    private Context context;
    private List<String> expandableListTitle;
    private HashMap<String, List<String>> expandableListDetail;

    public CustomExpandableListAdapter(Context context, List<String> expandableListTitle,
                                       HashMap<String, List<String>> expandableListDetail) {
        this.context = context;
        this.expandableListTitle = expandableListTitle;
        this.expandableListDetail = expandableListDetail;
    }

    @Override
    public Object getChild(int listPosition, int expandedListPosition) {
        return this.expandableListDetail.get(this.expandableListTitle.get(listPosition))
                .get(expandedListPosition);
    }

    @Override
    public long getChildId(int listPosition, int expandedListPosition) {
        return expandedListPosition;
    }

    @Override
    public View getChildView(int listPosition, final int expandedListPosition,
                             boolean isLastChild, View convertView, ViewGroup parent) {
        final String expandedListText = (String) getChild(listPosition, expandedListPosition);
        if (convertView == null) {
            LayoutInflater layoutInflater = (LayoutInflater) this.context
                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = layoutInflater.inflate(R.layout.list_item, null);
        }
        TextView expandedListTextView = (TextView) convertView
                .findViewById(R.id.expandedListItem);
        expandedListTextView.setText(expandedListText);
        return convertView;
    }

    @Override
    public int getChildrenCount(int listPosition) {
        return this.expandableListDetail.get(this.expandableListTitle.get(listPosition))
                .size();
    }

    @Override
    public Object getGroup(int listPosition) {
        return this.expandableListTitle.get(listPosition);
    }

    @Override
    public int getGroupCount() {
        return this.expandableListTitle.size();
    }

    @Override
    public long getGroupId(int listPosition) {
        return listPosition;
    }

    @Override
    public View getGroupView(int listPosition, boolean isExpanded,
                             View convertView, ViewGroup parent) {
        String listTitle = (String) getGroup(listPosition);
        if (convertView == null) {
            LayoutInflater layoutInflater = (LayoutInflater) this.context.
                    getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = layoutInflater.inflate(R.layout.list_group, null);
        }
        TextView listTitleTextView = (TextView) convertView
                .findViewById(R.id.listTitle);
        listTitleTextView.setTypeface(null, Typeface.BOLD);
        listTitleTextView.setText(listTitle);
        return convertView;
    }

    @Override
    public boolean hasStableIds() {
        return false;
    }

    @Override
    public boolean isChildSelectable(int listPosition, int expandedListPosition) {
        return true;
    }
}

```


-----


***MainActivity.java***
```java
package com.journaldev.expandablelistview;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ExpandableListAdapter;
import android.widget.ExpandableListView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    ExpandableListView expandableListView;
    ExpandableListAdapter expandableListAdapter;
    List<String> expandableListTitle;
    HashMap<String, List<String>> expandableListDetail;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        expandableListView = (ExpandableListView) findViewById(R.id.expandableListView);
        expandableListDetail = ExpandableListDataPump.getData();
        expandableListTitle = new ArrayList<String>(expandableListDetail.keySet());
        expandableListAdapter = new CustomExpandableListAdapter(this, expandableListTitle, expandableListDetail);
        expandableListView.setAdapter(expandableListAdapter);
        expandableListView.setOnGroupExpandListener(new ExpandableListView.OnGroupExpandListener() {

            @Override
            public void onGroupExpand(int groupPosition) {
                Toast.makeText(getApplicationContext(),
                        expandableListTitle.get(groupPosition) + " List Expanded.",
                        Toast.LENGTH_SHORT).show();
            }
        });

        expandableListView.setOnGroupCollapseListener(new ExpandableListView.OnGroupCollapseListener() {

            @Override
            public void onGroupCollapse(int groupPosition) {
                Toast.makeText(getApplicationContext(),
                        expandableListTitle.get(groupPosition) + " List Collapsed.",
                        Toast.LENGTH_SHORT).show();

            }
        });

        expandableListView.setOnChildClickListener(new ExpandableListView.OnChildClickListener() {
            @Override
            public boolean onChildClick(ExpandableListView parent, View v,
                                        int groupPosition, int childPosition, long id) {
                Toast.makeText(
                        getApplicationContext(),
                        expandableListTitle.get(groupPosition)
                                + " -> "
                                + expandableListDetail.get(
                                expandableListTitle.get(groupPosition)).get(
                                childPosition), Toast.LENGTH_SHORT
                ).show();
                return false;
            }
        });
    }

}
```
Trong đoạn code trên, tôi đã triển khai tất cả các sự kiện đã nêu ở trên. Để đơn giản, tôi sẽ chỉ hiển thị một Toast với tên của mục hoặc trạng thái của nhóm cho mỗi nhấp chuột. Nhưng chúng có thể dễ dàng sửa đổi để thực hiện bất kỳ hoạt động nào khác.

-----
Và đây là thành quả của chúng ta: 
![](https://images.viblo.asia/8a939fa2-6b0e-4358-82aa-4b2b3fd0324f.gif)

Tham khảo thêm ở [đây](https://developer.android.com/reference/android/widget/ExpandableListView).

Cảm ơn vì đã đọc bài viết. Tôi sẽ tiếp tục chia sẻ các kiến thức cơ bản về Android trong các bài viết sau.