Chào các bạn, hôm nay mình sẽ hướng dẫn các bạn làm một ứng dụng tương tự ứng dụng FaceRig đang được rất nhiều người quan tâm và sử dụng, tất nhiên là sẽ làm bằng Unity nhé ;)

![](https://images.viblo.asia/d4b7a1f7-8b52-41b1-9544-194a219b50b8.jpg)

Không lôi thôi luyên thuyên nữa, chúng ta sẽ vào việc luôn cho nóng nhé ^_^

Các bước thực hiện dư án như sau.
1. Tạo dự án mới.
2. Tải OpenCV for Unity về.
3. Tải DlibFaceLandmarkDetector về.
4. Tải Live2D Cubism SDK for Unity về.
5. Code một vài dòng cho nó chạy :yum: 

## Bước 1: Tạo dự án mới:
- Các bạn tạo dự án như bình thường.

![](https://images.viblo.asia/ef9dbe59-1691-4abb-973e-5913cb447272.PNG)

## Bước 2: Tải OpenCV for Unity về:
- Link : https://assetstore.unity.com/packages/tools/integration/opencv-for-unity-21088
- Import vào project.

![](https://images.viblo.asia/8a41e77b-2efc-40bc-a3b8-7af3c5c5e36b.PNG)

- Thiết lập OpenCV cho Unity bằng cách chọn Tools -> OpenCV for Unity -> Set Plugin Import Settings
- Copy thư mục StreamingAssets trong Assets -> OpenCVForUnity -> StreamingAssets ra thư mục Assets.

## Bước 3: Tải DlibFaceLandmarkDetector về:
- Link : https://assetstore.unity.com/packages/tools/integration/dlib-facelandmark-detector-64314
- Import vào project.
- Import DlibFaceLandmarkDetectorWithOpenCVExample vào project.

![](https://images.viblo.asia/a0deb7ff-aee0-49f2-9547-147f4e3f44ef.PNG)

- Thiết lập DlibFaceLandmarkDetector trong Unity bằng cách chọn Tools -> Dlib FaceLandmark Detector -> Set Plugin Import Settings
- Copy toàn bộ nội dung trong thư mục Assets -> DlibFaceLandmarkDetector -> StreamingAssets vào thư mục Assets -> StreamingAssets.

## Bước 4: Tải Live2D Cubism SDK for Unity về:
- Link: https://www.live2d.com/ja/products/cubism_sdk
- Giải nén ra rồi copy thư mục framework, lib vào dự án.

![](https://images.viblo.asia/c85b32a6-63ff-4dea-b691-17941355add6.PNG)

- Copy một nhân vật trong thư mục sample mà bạn muốn dùng vào StreamingAssets: sample/SampleApp1/Assets/Resources/live2d/shizuku.

## Bước 5: Code một vài dòng cho nó chạy:
Tạo 3 File có nội dung như sau:
### + Live2DModel:

```
using UnityEngine;
using System;
using System.Collections;
using live2d;
using live2d.framework;

namespace DlibFaceLandmarkDetectorWithLive2DSample
{
    [ExecuteInEditMode]
    public class Live2DModel : MonoBehaviour
    {
        public TextAsset mocFile;
        public TextAsset physicsFile;
        public TextAsset poseFile;
        public Texture2D[] textureFiles;

        public Vector3 PARAM_ANGLE;
        [Range(-1.0f, 2.0f)]
        public float PARAM_EYE_L_OPEN;
        [Range(-1.0f, 2.0f)]
        public float PARAM_EYE_R_OPEN;

        [Range(-1.0f, 1.0f)]
        public float PARAM_EYE_BALL_X;
        [Range(-1.0f, 1.0f)]
        public float PARAM_EYE_BALL_Y;

        [Range(-1.0f, 1.0f)]
        public float PARAM_BROW_L_Y;
        [Range(-1.0f, 1.0f)]
        public float PARAM_BROW_R_Y;

        [Range(0.0f, 2.0f)]
        public float PARAM_MOUTH_OPEN_Y;

        [Range(-1.0f, 1.0f)]
        public float PARAM_MOUTH_SIZE;


        private Live2DModelUnity live2DModel;
        private L2DPhysics physics;
        private L2DPose pose;
        private Matrix4x4 live2DCanvasPos;

        void Start()
        {
            Live2D.init();

            load();
        }


        public void load()
        {
            if(mocFile != null)
            {
                live2DModel = Live2DModelUnity.loadModel(mocFile.bytes);

                for (int i = 0; i < textureFiles.Length; i++)
                {
                    if(textureFiles[i] != null)
                        live2DModel.setTexture(i, textureFiles[i]);
                }

                float modelWidth = live2DModel.getCanvasWidth();
                live2DCanvasPos = Matrix4x4.Ortho(0, modelWidth, modelWidth, 0, -50.0f, 50.0f);
            }

            if (physicsFile != null)
                physics = L2DPhysics.load(physicsFile.bytes);

            if(poseFile != null)
                pose = L2DPose.load(poseFile.bytes);
        }

        public void setMocFileFromBytes(byte[] bytes){
            if(bytes.Length == 0) return;
            live2DModel = Live2DModelUnity.loadModel(bytes);

            for (int i = 0; i < textureFiles.Length; i++)
            {
                if(textureFiles[i] != null)
                    live2DModel.setTexture(i, textureFiles[i]);
            }

            float modelWidth = live2DModel.getCanvasWidth();
            live2DCanvasPos = Matrix4x4.Ortho(0, modelWidth, modelWidth, 0, -50.0f, 50.0f);
        }

        public void setPhysicsFileFromBytes(byte[] bytes){
            if(bytes.Length != 0)
                physics = L2DPhysics.load(bytes);
        }

        public void setPoseFileFromBytes(byte[] bytes){
            if(bytes.Length != 0)
                pose = L2DPose.load(bytes);
        }

        void Update()
        {
            //if (live2DModel == null) load();
            if (live2DModel == null) return;
            live2DModel.setMatrix(transform.localToWorldMatrix * live2DCanvasPos);
            if (!Application.isPlaying)
            {
                live2DModel.update();
                return;
            }

            double timeSec = UtSystem.getUserTimeMSec() / 1000.0;
            double t = timeSec * 2 * Math.PI;
            live2DModel.setParamFloat("PARAM_BREATH", (float)(0.5f + 0.5f * Math.Sin(t / 3.0)));

            //
            live2DModel.setParamFloat("PARAM_ANGLE_X", PARAM_ANGLE.x);
            live2DModel.setParamFloat("PARAM_ANGLE_Y", PARAM_ANGLE.y);
            live2DModel.setParamFloat("PARAM_ANGLE_Z", PARAM_ANGLE.z);
            live2DModel.setParamFloat("PARAM_EYE_L_OPEN", PARAM_EYE_L_OPEN);
            live2DModel.setParamFloat("PARAM_EYE_R_OPEN", PARAM_EYE_R_OPEN);
            live2DModel.setParamFloat("PARAM_EYE_BALL_X", PARAM_EYE_BALL_X);
            live2DModel.setParamFloat("PARAM_EYE_BALL_Y", PARAM_EYE_BALL_Y);
            live2DModel.setParamFloat("PARAM_BROW_L_Y", PARAM_BROW_L_Y);
            live2DModel.setParamFloat("PARAM_BROW_R_Y", PARAM_BROW_R_Y);
            live2DModel.setParamFloat("PARAM_MOUTH_OPEN_Y", PARAM_MOUTH_OPEN_Y);
            live2DModel.setParamFloat("PARAM_MOUTH_SIZE", PARAM_MOUTH_SIZE);

            live2DModel.setParamFloat("PARAM_MOUTH_FORM", 0.0f);
            //

            if (physics != null) physics.updateParam(live2DModel);

            if (pose != null) pose.updateParam(live2DModel);


            live2DModel.update();
        }


        void OnRenderObject()
        {
            //if (live2DModel == null) load();
            if (live2DModel == null) return;
            if (live2DModel.getRenderMode() == Live2D.L2D_RENDER_DRAW_MESH_NOW) live2DModel.draw();
        }
    }
}
```

### + WebCamTextureLive2DSample:

```
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;
using System.Runtime.InteropServices;
using System.IO;

#if UNITY_5_3 || UNITY_5_3_OR_NEWER
using UnityEngine.SceneManagement;
#endif
using OpenCVForUnity;
using DlibFaceLandmarkDetector;
using DlibFaceLandmarkDetectorWithLive2DSample;
using OpenCVForUnity.UnityUtils.Helper;
using OpenCVForUnity.CoreModule;
using OpenCVForUnity.ImgprocModule;

namespace DlibFaceLandmarkDetectorWithLive2DSample
{
    /// <summary>
    /// WebCamTexture sample using Dlib face landmark detection and Live2D SDK.
    /// </summary>
    [RequireComponent (typeof(WebCamTextureToMatHelper))]
    public class WebCamTextureLive2DSample : MonoBehaviour
    {
	
        /// <summary>
        /// The colors.
        /// </summary>
        Color32[] colors;

        /// <summary>
        /// The texture.
        /// </summary>
        Texture2D texture;

        /// <summary>
        /// The web cam texture to mat helper.
        /// </summary>
        WebCamTextureToMatHelper webCamTextureToMatHelper;

        /// <summary>
        /// The face landmark detector.
        /// </summary>
        FaceLandmarkDetector faceLandmarkDetector;

        /// <summary>
        /// The live2DModel.
        /// </summary>
        public Live2DModel live2DModel;

        /// <summary>
        /// The frontal face parameter.
        /// </summary>
        FrontalFaceParam frontalFaceParam;

        private List<Vector2> currentFacePoints;
        private bool isHideCameraImage = false;

        /// <summary>
        /// The shape_predictor_68_face_landmarks_dat_filepath.
        /// </summary>
        private string shape_predictor_68_face_landmarks_dat_filepath;

        private string shizuku_moc_filepath;
        private string shizuku_physics_filepath;
        private string shizuku_pose_filepath;
        private string[] texture_filepath = new string[6];


        // Use this for initialization
        void Start ()
        {
            webCamTextureToMatHelper = gameObject.GetComponent<WebCamTextureToMatHelper> ();

            #if UNITY_WEBGL && !UNITY_EDITOR
            webCamTextureToMatHelper.flipHorizontal = true;
            StartCoroutine(getFilePathCoroutine());
            #else
            shape_predictor_68_face_landmarks_dat_filepath = DlibFaceLandmarkDetector.UnityUtils.Utils.getFilePath ("shape_predictor_68_face_landmarks.dat");
            shizuku_moc_filepath = OpenCVForUnity.UnityUtils.Utils.getFilePath ("shizuku/shizuku.moc.bytes");
            shizuku_physics_filepath = OpenCVForUnity.UnityUtils.Utils.getFilePath ("shizuku/shizuku.physics.json");
            shizuku_pose_filepath = OpenCVForUnity.UnityUtils.Utils.getFilePath ("shizuku/shizuku.pose.json");
            for (int i = 0; i < texture_filepath.Length; i++) {
                texture_filepath [i] = OpenCVForUnity.UnityUtils.Utils.getFilePath ("shizuku/shizuku.1024/texture_0" + i + ".png");
            }
            Run ();
            #endif
        }

        private IEnumerator getFilePathCoroutine ()
        {
            var getFilePathAsync_shape_predictor_68_face_landmarks_dat_filepath_Coroutine = StartCoroutine (DlibFaceLandmarkDetector.UnityUtils.Utils.getFilePathAsync ("shape_predictor_68_face_landmarks.dat", (result) => {
                shape_predictor_68_face_landmarks_dat_filepath = result;
            }));
            var getFilePathAsync_shizuku_moc_filepath_Coroutine = StartCoroutine (OpenCVForUnity.UnityUtils.Utils.getFilePathAsync ("shizuku/shizuku.moc.bytes", (result) => {
                shizuku_moc_filepath = result;
            }));
            var getFilePathAsync_shizuku_physics_filepath_Coroutine = StartCoroutine (OpenCVForUnity.UnityUtils.Utils.getFilePathAsync ("shizuku/shizuku.physics.json", (result) => {
                shizuku_physics_filepath = result;
            }));
            var getFilePathAsync_shizuku_pose_filepath_Coroutine = StartCoroutine (OpenCVForUnity.UnityUtils.Utils.getFilePathAsync ("shizuku/shizuku.pose.json", (result) => {
                shizuku_pose_filepath = result;
            }));

            yield return getFilePathAsync_shape_predictor_68_face_landmarks_dat_filepath_Coroutine;
            yield return getFilePathAsync_shizuku_moc_filepath_Coroutine;
            yield return getFilePathAsync_shizuku_physics_filepath_Coroutine;
            yield return getFilePathAsync_shizuku_pose_filepath_Coroutine;

            for (int i = 0; i < texture_filepath.Length; i++) {
                Debug.Log ("tex");
                yield return StartCoroutine (OpenCVForUnity.UnityUtils.Utils.getFilePathAsync ("shizuku/shizuku.1024/texture_0" + i + ".png", (result) => {
                    texture_filepath [i] = result;
                }));
            }

            Run ();
        }

        private void Run ()
        {
            Debug.Log ("Run");
            live2DModel.textureFiles = new Texture2D[texture_filepath.Length];
            for (int i = 0; i < texture_filepath.Length; i++) {
                if (string.IsNullOrEmpty (texture_filepath [i]))
                    continue;

                Texture2D tex = new Texture2D (2, 2);
                tex.LoadImage (File.ReadAllBytes (texture_filepath [i]));
                live2DModel.textureFiles [i] = tex;
            }
            if (!string.IsNullOrEmpty (shizuku_moc_filepath))
                live2DModel.setMocFileFromBytes (File.ReadAllBytes (shizuku_moc_filepath));
            if (!string.IsNullOrEmpty (shizuku_physics_filepath))
                live2DModel.setPhysicsFileFromBytes (File.ReadAllBytes (shizuku_physics_filepath));
            if (!string.IsNullOrEmpty (shizuku_pose_filepath))
                live2DModel.setPoseFileFromBytes (File.ReadAllBytes (shizuku_pose_filepath));
            

            faceLandmarkDetector = new FaceLandmarkDetector (shape_predictor_68_face_landmarks_dat_filepath);
            frontalFaceParam = new FrontalFaceParam ();

            webCamTextureToMatHelper.Initialize ();
        }

        /// <summary>
        /// Raises the web cam texture to mat helper inited event.
        /// </summary>
        public void OnWebCamTextureToMatHelperInited ()
        {
            Debug.Log ("OnWebCamTextureToMatHelperInited");

            Mat webCamTextureMat = webCamTextureToMatHelper.GetMat ();

            colors = new Color32[webCamTextureMat.cols () * webCamTextureMat.rows ()];
            texture = new Texture2D (webCamTextureMat.cols (), webCamTextureMat.rows (), TextureFormat.RGBA32, false);


            gameObject.transform.localScale = new Vector3 (webCamTextureMat.cols (), webCamTextureMat.rows (), 1);
            Debug.Log ("Screen.width " + Screen.width + " Screen.height " + Screen.height + " Screen.orientation " + Screen.orientation);

            float width = gameObject.transform.localScale.x;
            float height = gameObject.transform.localScale.y;

            float widthScale = (float)Screen.width / width;
            float heightScale = (float)Screen.height / height;
            if (widthScale < heightScale) {
                Camera.main.orthographicSize = (width * (float)Screen.height / (float)Screen.width) / 2;
            } else {
                Camera.main.orthographicSize = height / 2;
            }

            if (live2DModel != null) {
                live2DModel.transform.localScale = new Vector3 (Camera.main.orthographicSize, Camera.main.orthographicSize, 1);
            }

            gameObject.GetComponent<Renderer> ().material.mainTexture = texture;

        }

        /// <summary>
        /// Raises the web cam texture to mat helper disposed event.
        /// </summary>
        public void OnWebCamTextureToMatHelperDisposed ()
        {
            Debug.Log ("OnWebCamTextureToMatHelperDisposed");

        }

        /// <summary>
        /// Raises the web cam texture to mat helper error occurred event.
        /// </summary>
        public void OnWebCamTextureToMatHelperErrorOccurred ()
        {
        }

        // Update is called once per frame
        void Update ()
        {

            if (webCamTextureToMatHelper.IsPlaying () && webCamTextureToMatHelper.DidUpdateThisFrame ()) {

                Mat rgbaMat = webCamTextureToMatHelper.GetMat ();

                OpenCVForUnityUtils.SetImage (faceLandmarkDetector, rgbaMat);

                List<UnityEngine.Rect> detectResult = faceLandmarkDetector.Detect ();

                foreach (var rect in detectResult) {

                    OpenCVForUnityUtils.DrawFaceRect (rgbaMat, rect, new Scalar (255, 0, 0, 255), 2);

                    List<Vector2> points = faceLandmarkDetector.DetectLandmark (rect);

                    if (points.Count > 0) {

                        live2DModelUpdate (points);

                        currentFacePoints = points;

                        break;
                    }
                }



                if (isHideCameraImage)
                    Imgproc.rectangle (rgbaMat, new Point (0, 0), new Point (rgbaMat.width (), rgbaMat.height ()), new Scalar (0, 0, 0, 255), -1);

                if (currentFacePoints != null)
                    OpenCVForUnityUtils.DrawFaceLandmark (rgbaMat, currentFacePoints, new Scalar (0, 255, 0, 255), 2);


                Imgproc.putText (rgbaMat, "W:" + rgbaMat.width () + " H:" + rgbaMat.height () + " SO:" + Screen.orientation, new Point (5, rgbaMat.rows () - 10), Imgproc.FONT_HERSHEY_SIMPLEX, 0.5, new Scalar (255, 255, 255, 255), 1, Imgproc.LINE_AA, false);

                OpenCVForUnity.UnityUtils.Utils.matToTexture2D (rgbaMat, texture, colors);
            }

        }

        private void live2DModelUpdate (List<Vector2> points)
        {

            if (live2DModel != null) {

                //angle
                Vector3 angles = frontalFaceParam.getFrontalFaceAngle (points);
                float rotateX = (angles.x > 180) ? angles.x - 360 : angles.x;
                float rotateY = (angles.y > 180) ? angles.y - 360 : angles.y;
                float rotateZ = (angles.z > 180) ? angles.z - 360 : angles.z;
                live2DModel.PARAM_ANGLE.Set (-rotateY, rotateX, -rotateZ);//座標系を変換して渡す


                //eye_open_L
                float eyeOpen_L = getRaitoOfEyeOpen_L (points);
                if (eyeOpen_L > 0.8f && eyeOpen_L < 1.1f)
                    eyeOpen_L = 1;
                if (eyeOpen_L >= 1.1f)
                    eyeOpen_L = 2;
                if (eyeOpen_L < 0.7f)
                    eyeOpen_L = 0;
                live2DModel.PARAM_EYE_L_OPEN = eyeOpen_L;
                
                //eye_open_R
                float eyeOpen_R = getRaitoOfEyeOpen_R (points);
                if (eyeOpen_R > 0.8f && eyeOpen_R < 1.1f)
                    eyeOpen_R = 1;
                if (eyeOpen_R >= 1.1f)
                    eyeOpen_R = 2;
                if (eyeOpen_R < 0.7f)
                    eyeOpen_R = 0;
                live2DModel.PARAM_EYE_R_OPEN = eyeOpen_R;

                //eye_ball_X
                live2DModel.PARAM_EYE_BALL_X = rotateY / 60f;//視線が必ずカメラ方向を向くようにする
                //eye_ball_Y
                live2DModel.PARAM_EYE_BALL_Y = -rotateX / 60f - 0.25f;//視線が必ずカメラ方向を向くようにする

                //brow_L_Y
                float brow_L_Y = getRaitoOfBROW_L_Y (points);
                live2DModel.PARAM_BROW_L_Y = brow_L_Y;

                //brow_R_Y
                float brow_R_Y = getRaitoOfBROW_R_Y (points);
                live2DModel.PARAM_BROW_R_Y = brow_R_Y;

                //mouth_open
                float mouthOpen = getRaitoOfMouthOpen_Y (points) * 2f;
                if (mouthOpen < 0.3f)
                    mouthOpen = 0;
                live2DModel.PARAM_MOUTH_OPEN_Y = mouthOpen;

                //mouth_size
                float mouthSize = getRaitoOfMouthSize (points);
                live2DModel.PARAM_MOUTH_SIZE = mouthSize;

            }
        }

        private float getRaitoOfEyeOpen_L (List<Vector2> points)
        {
            if (points.Count != 68)
                throw new ArgumentNullException ("Invalid landmark_points.");

            return Mathf.Clamp (Mathf.Abs (points [43].y - points [47].y) / (Mathf.Abs (points [43].x - points [44].x) * 0.75f), -0.1f, 2.0f);
        }

        private float getRaitoOfEyeOpen_R (List<Vector2> points)
        {
            if (points.Count != 68)
                throw new ArgumentNullException ("Invalid landmark_points.");

            return Mathf.Clamp (Mathf.Abs (points [38].y - points [40].y) / (Mathf.Abs (points [37].x - points [38].x) * 0.75f), -0.1f, 2.0f);
        }

        private float getRaitoOfBROW_L_Y (List<Vector2> points)
        {
            if (points.Count != 68)
                throw new ArgumentNullException ("Invalid landmark_points.");

            float y = Mathf.Abs (points [24].y - points [27].y) / Mathf.Abs (points [27].y - points [29].y);
            y -= 1;
            y *= 4f;

            return Mathf.Clamp (y, -1.0f, 1.0f);
        }

        private float getRaitoOfBROW_R_Y (List<Vector2> points)
        {
            if (points.Count != 68)
                throw new ArgumentNullException ("Invalid landmark_points.");

            float y = Mathf.Abs (points [19].y - points [27].y) / Mathf.Abs (points [27].y - points [29].y);
            y -= 1;
            y *= 4f;

            return Mathf.Clamp (y, -1.0f, 1.0f);
        }

        private float getRaitoOfMouthOpen_Y (List<Vector2> points)
        {
            if (points.Count != 68)
                throw new ArgumentNullException ("Invalid landmark_points.");

            return Mathf.Clamp01 (Mathf.Abs (points [62].y - points [66].y) / (Mathf.Abs (points [51].y - points [62].y) + Mathf.Abs (points [66].y - points [57].y)));
        }

        private float getRaitoOfMouthSize (List<Vector2> points)
        {
            if (points.Count != 68)
                throw new ArgumentNullException ("Invalid landmark_points.");

            float size = Mathf.Abs (points [48].x - points [54].x) / (Mathf.Abs (points [31].x - points [35].x) * 1.8f);
            size -= 1;
            size *= 4f;

            return Mathf.Clamp (size, -1.0f, 1.0f);
        }

        /// <summary>
        /// Raises the disable event.
        /// </summary>
        void OnDisable ()
        {
            if(webCamTextureToMatHelper != null) webCamTextureToMatHelper.Dispose ();

            if(faceLandmarkDetector != null) faceLandmarkDetector.Dispose ();

            if(frontalFaceParam != null) frontalFaceParam.Dispose ();
        }

        /// <summary>
        /// Raises the back button event.
        /// </summary>
        public void OnBackButton ()
        {
            #if UNITY_5_3 || UNITY_5_3_OR_NEWER
            SceneManager.LoadScene ("DlibFaceLandmarkDetectorWithLive2DSample");
            #else
            Application.LoadLevel("DlibFaceLandmarkDetectorWithLive2DSample");
            #endif
        }

        /// <summary>
        /// Raises the play button event.
        /// </summary>
        public void OnPlayButton ()
        {
            webCamTextureToMatHelper.Play ();
        }

        /// <summary>
        /// Raises the pause button event.
        /// </summary>
        public void OnPauseButton ()
        {
            webCamTextureToMatHelper.Pause ();
        }

        /// <summary>
        /// Raises the stop button event.
        /// </summary>
        public void OnStopButton ()
        {
            webCamTextureToMatHelper.Stop ();
        }

        /// <summary>
        /// Raises the change camera button event.
        /// </summary>
        public void OnChangeCameraButton ()
        {
            webCamTextureToMatHelper.Initialize (null, webCamTextureToMatHelper.requestedWidth, webCamTextureToMatHelper.requestedHeight, !webCamTextureToMatHelper.requestedIsFrontFacing);
        }

        /// <summary>
        /// Raises the hide camera image toggle event.
        /// </summary>
        public void OnHideCameraImageToggle ()
        {
            if (isHideCameraImage) {
                isHideCameraImage = false;
            } else {
                isHideCameraImage = true;
            }
        }
    }
}
```

### + FrontalFaceParam:

```
using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;
using DlibFaceLandmarkDetector;
using OpenCVForUnity;
using OpenCVForUnity.CoreModule;
using OpenCVForUnity.Calib3dModule;

namespace DlibFaceLandmarkDetectorWithLive2DSample
{
    public class FrontalFaceParam : IDisposable
    {

        //Calib3d.solvePnP
        Matrix4x4 transformationM = new Matrix4x4 ();
        MatOfPoint3f objectPoints;
        MatOfPoint2f imagePoints;
        Mat rvec;
        Mat tvec;
        Mat rotM;
        Mat camMatrix;
        MatOfDouble distCoeffs;
        Matrix4x4 invertYM;
        Matrix4x4 invertZM;
        Matrix4x4 ARM;

        //normalize
        float normWidth = 200;
        float normHeight = 200;
        List<Vector2> normPoints;

        public FrontalFaceParam ()
        {
            invertYM = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, new Vector3 (1, -1, 1));
            //Debug.Log ("invertYM " + invertYM.ToString ());

            invertZM = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, new Vector3 (1, 1, -1));
            //Debug.Log ("invertZM " + invertZM.ToString ());

            //set 3d face object points.
            objectPoints = new MatOfPoint3f (
                new Point3 (-31, 72, 86),//l eye
                new Point3 (31, 72, 86),//r eye
                new Point3 (0, 40, 114),//nose
                new Point3 (-20, 15, 90),//l mouth //new Point3(-22, 17, 90),//l mouth
                new Point3 (20, 15, 90),//r mouth //new Point3(22, 17, 90),//r mouth
                new Point3 (-69, 76, -2),//l ear
                new Point3 (69, 76, -2)//r ear
            );
            imagePoints = new MatOfPoint2f ();
            rvec = new Mat ();
            tvec = new Mat ();
            rotM = new Mat (3, 3, CvType.CV_64FC1);


            float max_d = Mathf.Max (normHeight, normWidth);
            camMatrix = new Mat (3, 3, CvType.CV_64FC1);
            camMatrix.put (0, 0, max_d);
            camMatrix.put (0, 1, 0);
            camMatrix.put (0, 2, normWidth / 2.0f);
            camMatrix.put (1, 0, 0);
            camMatrix.put (1, 1, max_d);
            camMatrix.put (1, 2, normHeight / 2.0f);
            camMatrix.put (2, 0, 0);
            camMatrix.put (2, 1, 0);
            camMatrix.put (2, 2, 1.0f);

            distCoeffs = new MatOfDouble (0, 0, 0, 0);
            //Debug.Log("distCoeffs " + distCoeffs.dump());


            normPoints = new List<Vector2> (68);
            for (int i = 0; i < 68; i++) {
                normPoints.Add (new Vector2 (0, 0));
            }
        }

        public void Dispose ()
        {
            objectPoints.Dispose ();
            imagePoints.Dispose ();
            rvec.Dispose ();
            tvec.Dispose ();
            rotM.Dispose ();
            camMatrix.Dispose ();
            distCoeffs.Dispose ();
        }

        /// <summary>
        /// Gets the frontal face angle.
        /// </summary>
        /// <returns>The frontal face angle.</returns>
        /// <param name="points">Points.</param>
        public Vector3 getFrontalFaceAngle (List<Vector2> points)
        {
            if (points.Count != 68)
                throw new ArgumentNullException ("Invalid landmark_points.");

            if (camMatrix == null)
                throw new ArgumentNullException ("Invalid camMatrix.");

            //normalize

            float normScale = Math.Abs (points [30].y - points [8].y) / (normHeight / 2);
            Vector2 normDiff = points [30] * normScale - new Vector2 (normWidth / 2, normHeight / 2);

            for (int i = 0; i < points.Count; i++) {
                normPoints [i] = points [i] * normScale - normDiff;
            }
            //Debug.Log ("points[30] " + points[30]);
            //Debug.Log ("normPoints[30] " + normPoints[30]);
            //Debug.Log ("normScale " + normScale);
            //Debug.Log ("normDiff " + normDiff);

            imagePoints.fromArray (
                new Point ((normPoints [38].x + normPoints [41].x) / 2, (normPoints [38].y + normPoints [41].y) / 2),//l eye
                new Point ((normPoints [43].x + normPoints [46].x) / 2, (normPoints [43].y + normPoints [46].y) / 2),//r eye
                new Point (normPoints [33].x, normPoints [33].y),//nose
                new Point (normPoints [48].x, normPoints [48].y),//l mouth
                new Point (normPoints [54].x, normPoints [54].y), //r mouth                         ,
                new Point (normPoints [0].x, normPoints [0].y),//l ear
                new Point (normPoints [16].x, normPoints [16].y)//r ear
            );


            Calib3d.solvePnP (objectPoints, imagePoints, camMatrix, distCoeffs, rvec, tvec);

            Calib3d.Rodrigues (rvec, rotM);

            transformationM.SetRow (0, new Vector4 ((float)rotM.get (0, 0) [0], (float)rotM.get (0, 1) [0], (float)rotM.get (0, 2) [0], (float)tvec.get (0, 0) [0]));
            transformationM.SetRow (1, new Vector4 ((float)rotM.get (1, 0) [0], (float)rotM.get (1, 1) [0], (float)rotM.get (1, 2) [0], (float)tvec.get (1, 0) [0]));
            transformationM.SetRow (2, new Vector4 ((float)rotM.get (2, 0) [0], (float)rotM.get (2, 1) [0], (float)rotM.get (2, 2) [0], (float)tvec.get (2, 0) [0]));
            transformationM.SetRow (3, new Vector4 (0, 0, 0, 1));

            ARM = invertYM * transformationM * invertZM;

            return ExtractRotationFromMatrix (ref ARM).eulerAngles;
        }

        /// <summary>
        /// Gets the frontal face rate.
        /// </summary>
        /// <returns>The frontal face rate.</returns>
        /// <param name="points">Points.</param>
        public float getFrontalFaceRate (List<Vector2> points)
        {

            Vector3 angles = getFrontalFaceAngle (points);
            float rotateX = (angles.x > 180) ? angles.x - 360 : angles.x;
            float rotateY = (angles.y > 180) ? angles.y - 360 : angles.y;

            //Debug.Log ("angles " + angles);
            //Debug.Log ("ratio " + (1.0f - (Mathf.Max (Mathf.Abs (rotateX), Mathf.Abs (rotateY)) / 90)));

            return 1.0f - (Mathf.Max (Mathf.Abs (rotateX), Mathf.Abs (rotateY)) / 90);
        }

        /// <summary>
        /// Extract translation from transform matrix.
        /// </summary>
        /// <param name="matrix">Transform matrix. This parameter is passed by reference
        /// to improve performance; no changes will be made to it.</param>
        /// <returns>
        /// Translation offset.
        /// </returns>
        public static Vector3 ExtractTranslationFromMatrix (ref Matrix4x4 matrix)
        {
            Vector3 translate;
            translate.x = matrix.m03;
            translate.y = matrix.m13;
            translate.z = matrix.m23;
            return translate;
        }

        /// <summary>
        /// Extract rotation quaternion from transform matrix.
        /// </summary>
        /// <param name="matrix">Transform matrix. This parameter is passed by reference
        /// to improve performance; no changes will be made to it.</param>
        /// <returns>
        /// Quaternion representation of rotation transform.
        /// </returns>
        public static Quaternion ExtractRotationFromMatrix (ref Matrix4x4 matrix)
        {
            Vector3 forward;
            forward.x = matrix.m02;
            forward.y = matrix.m12;
            forward.z = matrix.m22;

            Vector3 upwards;
            upwards.x = matrix.m01;
            upwards.y = matrix.m11;
            upwards.z = matrix.m21;

            return Quaternion.LookRotation (forward, upwards);
        }

        /// <summary>
        /// Extract scale from transform matrix.
        /// </summary>
        /// <param name="matrix">Transform matrix. This parameter is passed by reference
        /// to improve performance; no changes will be made to it.</param>
        /// <returns>
        /// Scale vector.
        /// </returns>
        public static Vector3 ExtractScaleFromMatrix (ref Matrix4x4 matrix)
        {
            Vector3 scale;
            scale.x = new Vector4 (matrix.m00, matrix.m10, matrix.m20, matrix.m30).magnitude;
            scale.y = new Vector4 (matrix.m01, matrix.m11, matrix.m21, matrix.m31).magnitude;
            scale.z = new Vector4 (matrix.m02, matrix.m12, matrix.m22, matrix.m32).magnitude;
            return scale;
        }

        /// <summary>
        /// Extract position, rotation and scale from TRS matrix.
        /// </summary>
        /// <param name="matrix">Transform matrix. This parameter is passed by reference
        /// to improve performance; no changes will be made to it.</param>
        /// <param name="localPosition">Output position.</param>
        /// <param name="localRotation">Output rotation.</param>
        /// <param name="localScale">Output scale.</param>
        public static void DecomposeMatrix (ref Matrix4x4 matrix, out Vector3 localPosition, out Quaternion localRotation, out Vector3 localScale)
        {
            localPosition = ExtractTranslationFromMatrix (ref matrix);
            localRotation = ExtractRotationFromMatrix (ref matrix);
            localScale = ExtractScaleFromMatrix (ref matrix);
        }

        /// <summary>
        /// Set transform component from TRS matrix.
        /// </summary>
        /// <param name="transform">Transform component.</param>
        /// <param name="matrix">Transform matrix. This parameter is passed by reference
        /// to improve performance; no changes will be made to it.</param>
        public static void SetTransformFromMatrix (Transform transform, ref Matrix4x4 matrix)
        {
            transform.localPosition = ExtractTranslationFromMatrix (ref matrix);
            transform.localRotation = ExtractRotationFromMatrix (ref matrix);
            transform.localScale = ExtractScaleFromMatrix (ref matrix);
        }
    }
}

```

## Bước 6: Tạo Scene:
- Tạo một GameObject đặt tên Live2DModel rồi add script Live2DModel.cs
- Tạo một Quad rồi add script WebCamTextureLive2DSample.cs và WebCamTextureToMatHelper.cs
- Kéo GameObject Live2DModel vừa tạo ở trên vào field Live 2D Model của script WebCamTextureLive2DSample vừa add thêm.

## Bước 7: Build And Run:
- Việc còn lại các bạn có thể build ra Windows, Android, Ios để test.

![](https://images.viblo.asia/8c95c6de-232d-4d92-86f4-a9f24f9105a7.gif)

Tada, các bạn thấy thành quả của mình thế nào? rất thú vị khi có một nhân vật hoạt hình rất dễ thương đang làm những cử chỉ đầu và mắt, miếng giống mình đúng không nào? đây cũng chính là tiền đề cho những Vtuber hiện nay đó các ạ ^_^
Chúc các bạn thành công nhé ^_^

Bài viết được tham khảo theo link sau: https://qiita.com/utibenkei/items/15925db826721f6bb00c