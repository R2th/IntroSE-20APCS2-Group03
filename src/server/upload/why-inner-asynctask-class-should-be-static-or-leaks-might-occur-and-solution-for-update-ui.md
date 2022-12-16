### The reason is
- When `Activity` is destroyed, `AsyncTask` (both static or non-static) still running
- If inner class is non-static (`AsyncTask`) class, it will have reference to the outer class (`Activity`).
- If a object has no references point to it, `Garbage Collected` will release it. If a object is unused and `Garbage Collected` can not release it => leak memory

=> If `AsyncTask` is non-static, `Activity` won't release event it is destroyed => leak

### Solution for update UI after make AsyncTask as static class without leak
1) Use `WeakReference` like
```
public class NoLeakAsyncTaskActivity extends AppCompatActivity {
    private ExampleAsyncTask asyncTask;

    @Override 
    protected void onCreate(Bundle savedInstanceState) {
        ...

        // START AsyncTask
        asyncTask = new ExampleAsyncTask();
        asyncTask.execute();
    }

    static class ExampleAsyncTask extends AsyncTask<Void, Void, Integer> {
        private WeakReference<NoLeakAsyncTaskActivity> activityReference;
        
        ExampleAsyncTask(NoLeakAsyncTaskActivity context) {
            activityReference = new WeakReference<>(context);
        }
        
        @Override
        protected Integer doInBackground(Void... voids) {
            ...
            return null;
        }

        @Override
        protected void onPostExecute(Integer value) {
            ...
            NoLeakAsyncTaskActivity activity = activityReference.get();
            if (activity == null || activity.isFinishing()) return;

            // modify the activity's UI
            TextView textView = activity.findViewById(R.id.textview);
            textView.setText(result);
        }
    }
}
```
2) Send and remove the  `Activity` reference
```
public class NoLeakAsyncTaskActivity extends AppCompatActivity {
    private ExampleAsyncTask asyncTask;

    @Override 
    protected void onCreate(Bundle savedInstanceState) {
        ...

        // START AsyncTask
        asyncTask = new ExampleAsyncTask();
        asyncTask.setListener(new ExampleAsyncTask.ExampleAsyncTaskListener() {
            @Override
            public void onExampleAsyncTaskFinished(Integer value) {
                // update UI in Activity here
            }
        });
        asyncTask.execute();
    }

    @Override
    protected void onDestroy() {
        asyncTask.setListener(null); // PREVENT LEAK AFTER ACTIVITY DESTROYED
        super.onDestroy();
    }

    static class ExampleAsyncTask extends AsyncTask<Void, Void, Integer> {
        private ExampleAsyncTaskListener listener;

        @Override
        protected Integer doInBackground(Void... voids) {
            ...
            return null;
        }

        @Override
        protected void onPostExecute(Integer value) {
            super.onPostExecute(value);
            if (listener != null) {
                listener.onExampleAsyncTaskFinished(value);
            }
        }

        public void setListener(ExampleAsyncTaskListener listener) {
            this.listener = listener;
        }

        public interface ExampleAsyncTaskListener {
            void onExampleAsyncTaskFinished(Integer value);
        }
    }
}
```