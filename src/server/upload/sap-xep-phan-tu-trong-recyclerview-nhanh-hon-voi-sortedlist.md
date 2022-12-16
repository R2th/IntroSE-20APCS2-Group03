Tôi biết rằng các bạn biết cách làm thế nào để sắp xếp (sort) các phần tử trong list. Việc sắp xếp một list là điều thường xuyên thấy trong lập trình ứng dụng di động, ví dụ như sắp xếp các tin nhắn trong một cuộc trò chuyện theo thời gian mới nhất tới cũ hơn chẳng hạn.

Tiếp nữa, là một lập trình viên android tốt thì đừng bao giờ sử dụng notifyDataSetChanged(), nó thực sự tiêu tốn rất nhiều hiệu năng của người dùng. 

Tôi sẽ không nói về cách làm thế nào để tối ưu nó, các bạn có thể tìm đọc tài liệu với từ khoá

*` How to notify your recyclerview adapter in a performant way`*

Trong bài viết này, Tôi sẽ chỉ các bạn một thứ hay ho hơn: **SortedList**

Nhưng tôi đang nói về việc bạn không cần phải sắp xếp list của bạn mà vẫn giữ được các phần tử theo thứ tự. Bạn không còn phải tốn thời gian xử lý mấy đoạn mã dùng để sort một list nữa, hãy dành thời gian rảnh để làm việc khác, như lướt Viblo chẳng hạn ^.^. 

SortedList là một list đã được sort sẵn các phần tử bên trong nó và có thể trả về các sự kiện theo sự thay đổi vị trí các phần tử trong list, chúng ta có thể lợi dụng điều này để gắn vào RecyclerView.Adapter.

Chúng ta không cần bận tâm về việc phải notify lại dữ liệu trong adapter nữa, tất cả hãy để SortedListAdapterCallback lo 


Cùng code nhé

**activity_main.xml**
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <android.support.v7.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center">

        <Button
            android:onClick="add"
            android:layout_width="wrap_content"
            android:text="add"
            android:layout_height="wrap_content" />


        <Button
            android:onClick="remove"
            android:text="remove"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content" />
    </LinearLayout>
</LinearLayout>
```
**item_team.xml**
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    xmlns:tools="http://schemas.android.com/tools"
    android:orientation="vertical">

    <TextView
        android:id="@+id/txtId"
        android:layout_width="match_parent"
        tools:text="ID"
        android:padding="3dp"
        android:layout_height="wrap_content" />

    <TextView
        android:id="@+id/txtName"
        android:layout_width="match_parent"
        tools:text="name"
        android:padding="3dp"
        android:layout_height="wrap_content" />

    <TextView
        android:id="@+id/txtScore"
        android:layout_width="match_parent"
        tools:text="score"
        android:padding="3dp"
        android:layout_height="wrap_content" />
</LinearLayout>
```
**TeamAdapter.java**
```java
public class TeamAdapter extends RecyclerView.Adapter<TeamAdapter.VH> {

    private SortedList<Team> mSortedList;
    private SortedListAdapterCallback<Team> mTeamSortedListAdapterCallback;

    public TeamAdapter() {
        mTeamSortedListAdapterCallback = new SortedListAdapterCallback<Team>(TeamAdapter.this) {
            @Override
            public int compare(Team team1, Team team2) {
                return team2.score - team1.score;
            }

            @Override
            public boolean areContentsTheSame(Team team1, Team team2) {
                return team2.name.equals(team1.name);
            }

            @Override
            public boolean areItemsTheSame(Team team1, Team team2) {
                return team1.equals(team2.id);
            }
        };
        mSortedList = new SortedList<Team>(Team.class, mTeamSortedListAdapterCallback);
    }

    public void addTeam(Team team) {
        mSortedList.add(team);
    }

    public void removeTeam(int index) {
        mSortedList.removeItemAt(index);
    }

    public SortedList<Team> getSortedList() {
        return mSortedList;
    }

    @NonNull
    @Override
    public TeamAdapter.VH onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.item_team, viewGroup, false);
        return new TeamAdapter.VH(view);
    }

    @Override
    public void onBindViewHolder(@NonNull VH vh, int i) {
        vh.bindData(mSortedList.get(i));
    }


    @Override
    public int getItemCount() {
        return mSortedList.size();
    }

    public class VH extends RecyclerView.ViewHolder {
        private TextView  txtName, txtScore;

        public VH(@NonNull View itemView) {
            super(itemView);

            txtName = itemView.findViewById(R.id.txtName);
            txtScore = itemView.findViewById(R.id.txtScore);
        }

        public void bindData(Team team) {
            txtName.setText("Name: "+team.name);
            txtScore.setText("Score: "+String.valueOf(team.score));
        }
    }
}
```

**MainActivity.java**
```java
public class MainActivity extends AppCompatActivity {
    private HashMap<Integer, String> mTeamNameHashMap = new HashMap<>();
    private RecyclerView mRecyclerView;
    private TeamAdapter mTeamAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        fakeData();
        mRecyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
        mTeamAdapter = new TeamAdapter();
        mRecyclerView.addItemDecoration(new DividerItemDecoration(getApplicationContext(), LinearLayout.VERTICAL));
        mRecyclerView.setAdapter(mTeamAdapter);

    }

    /**
     * Thêm một team vào
     *
     * @param view
     */
    public void add(View view) {
        mTeamAdapter.addTeam(getRamdomTeam());
    }

    /**
     * Xoá ngẫu nhiên 1 team trong adapter
     *
     * @param view
     */
    public void remove(View view) {
        if (mTeamAdapter.getSortedList().size() > 0) {
            int pos = new Random().nextInt((mTeamAdapter.getSortedList().size() - 1) + 1);
            mTeamAdapter.removeTeam(pos);
        }
    }

    /**
     * @return trả về ngẫu nhiên 1 team và số điểm trong dữ liệu
     */
    private Team getRamdomTeam() {
        int pos = new Random().nextInt(10);
        Team team = new Team();
        team.id = pos;
        team.name = mTeamNameHashMap.get(pos);
        team.score = new Random().nextInt(20);
        return team;
    }

    private void fakeData() {
        mTeamNameHashMap.put(0, "VietNam");
        mTeamNameHashMap.put(1, "Russia");
        mTeamNameHashMap.put(2, "Egypt");
        mTeamNameHashMap.put(3, "Russia");
        mTeamNameHashMap.put(4, "Uruguay");
        mTeamNameHashMap.put(5, "Morocco");
        mTeamNameHashMap.put(6, "Portugal");
        mTeamNameHashMap.put(7, "Spain");
        mTeamNameHashMap.put(8, "Australia");
        mTeamNameHashMap.put(9, "Denmark");
        mTeamNameHashMap.put(10, "France");
    }

}
```

Kết quả:

![](https://images.viblo.asia/81917a9b-6d73-4b5d-80e3-d6dfe4e1ad54.gif)
Tham khảo thêm tại

Google Developer: https://developer.android.com/reference/android/support/v7/util/SortedList

Medium: https://medium.com/bakedroid/android-sortedlist-explained-2def504e46d7