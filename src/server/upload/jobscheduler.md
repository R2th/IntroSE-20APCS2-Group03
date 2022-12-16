# INTRODUCTION 

Every now and then Google realease newer and updated versions of Android. Along with this updates comes many improvement both for developers and user and as a developer one should embrace and learn to make the very best of this improvements as they will make development much easire and implementations smoother. One such update is and API called JobScheduler (Introduced in Lollipop). Not only is this API exciting for developers but end users should also be excited. This surprisingly easy to use API lets your app schedule a job to take place according to a number of parameters against the framework that will be executed in your application's own process. There are mainly 3 parts of the JobScheduler API and this includes JobInfo, JobService and finally JobSheduler.

### JobInfo
This is Container of data passed to the JobScheduler fully encapsulating the parameters required to schedule work against the calling application. These are constructed using the JobInfo.Builder. You must specify at least one sort of constraint on the JobInfo object that you are creating. The goal here is to provide the scheduler with high-level semantics about the work you want to accomplish. Doing otherwise with throw an exception in your app. These parameters includes:
* **setBackoffCriteria(long initialBackoffMillis, int backoffPolicy) :** Policy that is called when a job is completed and a retry is necessary. One can set the initial back-off time and if it is linear or exponential. The default is 30 sec .
* **setExtras(PersistableBundle extras) :** Lets one send specific data Extras to the Job. 
* **setMinimumLatency(long minLatencyMillis) :** A minimum amount of time the job has to be delayed.
* **setOverrideDeadline(long maxExecutionDelayMillis) :** A max amount of time to wait to execute the job. When this time is reached, the job will be executed immediately regardless of your other parameters. 
* **setPeriodic(long intervalMillis) :** Used when repeating of the job is required, you can specify the interval between repeats. You are guaranteed to be executed within an interval but not at what point during that interval. This can sometimes lead to jobs being run closely together.

Others include **setRequiredNetworkType(int networkType)** (Used to specify the network type required to have when the job is executed), **setPersisted(boolean isPersisted)** (Used to persist the job across boot. NOTE: This requires RECEIVE_BOOT_COMPLETED permission added to your manifest). Example of this a JobInfo with above parameters is demostrated below:

```
ComponentName serviceName = new ComponentName(context, MyJobService.class);
JobInfo myJobInfo = new JobInfo.Builder(JOB_ID, serviceName)
        .setRequiredNetworkType(JobInfo.NETWORK_TYPE_UNMETERED)
        .setRequiresDeviceIdle(true)
        .setRequiresCharging(true)
        .build();
```

### JobService
The JobService is the actual service that is going to run your job. This service has different methods to implement in comparission to normal regular services. The first method is onStartJob(JobParameters params). This method is what gets called when the JobScheduler decides to run your job based on its parameters. You can get the jobId from the JobParameters and you will have to hold on to these parameters to finish the job later. The next method is onStopJob(JobParameters params). This will get called when your parameters are no longer being met. In our previous example this would happen when the user switches off of wifi, unplugs or turns the screen on their device. This means that we want to stop our job as soon as we can; in this case we wouldn’t update any more apps.
Do note this 3 things when using JobService and they include:
1. You must finish your job when it is complete. The JobScheduler keeps a wake lock for your job. If you don’t call jobFinished(JobParameters params, boolean needsReschedule) with the JobParameters from onStartJob(JobParameters params) the JobScheduler will keep a wake lock for your app and burn the devices battery. Even worse is that the battery history will blame your app. Here at Two Toasters we call that type of bug a 1 star, uninstall.
2. You have to register your job service in the AndroidManifest. If you do not, the system will not be able to find your service as a component and it will not start your jobs. You’ll never even know as this does not produce an error.
```
<application
    .... stuff ....
    >

    <service
        android:name=".MyJobService"
        android:permission="android.permission.BIND_JOB_SERVICE"
        android:exported="true"/>
</application>
```

3. The JobService runs on the main thread. It is your responsibility to move your work off thread. If the user tries to open your app while a job is running on the main thread they might get an Android Not Responding error (ANR).

**Example**

```
public class MyJobService extends JobService {

    private UpdateAppsAsyncTask updateTask = new UpdateAppsAsyncTask();

    @Override
    public boolean onStartJob(JobParameters params) {
        // Note: this is preformed on the main thread.

        updateTask.execute(params);

        return true;
    }

    // Stopping jobs if our job requires change.

    @Override
    public boolean onStopJob(JobParameters params) {
        // Note: return true to reschedule this job.

        boolean shouldReschedule = updateTask.stopJob(params);

        return shouldReschedule;
    }

    private class UpdateAppsAsyncTask extends AsyncTask<JobParameters, Void, JobParameters[]> {


        @Override
        protected JobParameters[] doInBackground(JobParameters... params) {

          // Do updating and stopping logical here.
          return params;
        }

        @Override
        protected void onPostExecute(JobParameters[] result) {
            for (JobParameters params : result) {
                if (!hasJobBeenStopped(params)) {
                    jobFinished(params, false);
                }
            }
        }

        private boolean hasJobBeenStopped(JobParameters params) {
            // Logic for checking stop.
        }

        public boolean stopJob(JobParameters params) {
            // Logic for stopping a job. return true if job should be rescheduled.
        }

    }
}
```
Your off thread logic can be handled however u please but must remember to call jobFinished(JobParameters params, boolean needsReschedule) when done.

### JobSheduler
Now that the JobInfo and JobService has been created, we can now schedule the job as shown below.
```
JobScheduler scheduler = (JobScheduler) context.getSystemService(Context.JOB_SCHEDULER_SERVICE);
int result = scheduler.schedule(jobInfo);
if (result == JobScheduler.RESULT_SUCCESS) Log.d(TAG, "Job scheduled successfully!");
```

Please refere [here](https://developer.android.com/reference/android/app/job/JobInfo) for more Info on JobScheduler