To run the Road Damage Detection System, Clone the repository and follow these instructions for each component:

1. **Web Application:**
   - Navigate to the `website` directory and install dependencies using `npm install`.
   - Set up Firebase for authentication and storage. Create a Firebase project, enable Firebase Authentication and Cloud Storage, and obtain your Firebase configuration details.
   - Update the Firebase configuration in the project's code.. `we have provided our keys as of now, for ease of reproduction of outputs.`
   - Run the web application using `npm start`.
   - Access the web application through a web browser at the specified port(3000).

2. **Mobile Application:**
   - Navigate to the `app` directory and install dependencies using `npm install`.
   - Set up Firebase for authentication and storage. Use the same Firebase project created for the web application and update the Firebase configuration in the mobile app code. `we have provided our keys as of now, for ease of reproduction of outputs.`
   - Run the mobile application on an emulator or a physical device connected via usb or wireless debugging using `npx react-native run-android`, or use `npm run android`.
   - The simplest method is to install `expo go` app, and run the app on it, using `npm start`.
   - The mobile application will launch on the emulator/device, allowing users to sign up, log in, and upload photos of damaged roads.

3. **Admin Dashboard (Web Interface):**
   - The initial steps are the same as `1. Web Application`.
   - Access the admin dashboard through a web browser at the specified URL, by logging in as admin. use `srujanlanderi@gmail.com` and `srujan12345` as email and password for logging in as admin.
   - Access the dashboard features, including road data management and map visualization.

3. **Object Detection Model:**
   - Navigate to the `backend` directory and install dependencies using `pip install -r yolov5/requirements.txt`.
   - use python `app.py` to run the model.

NOTE: The backend urls might have to be changed due to change in ip addresses. Some fields have been left empty for convineience.

**Extent of Completion**
The mobile app,the user website and the admin dashboard are ready for usage. The YOLO model is also working with good accuracy, and can be used to detect damaged roads.
As of now, we weren't able to make a pipeline to send the results from the Model to the admin dashboard, due to time constraints. But the images displayed on admin dashboard are authentic, and were detected by the model. Due to the scarcity of road images with geo-location data, we had to randomize the location data for the given images to create a prototype or a MVP (Minimum Viable Product).

We sincerely thank you for your attention, and hope that our work will prove to be useful in one way or another.
Thank You.
