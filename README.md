#modmusic
A digital audio workstation with an open-source production feature. Build, create, and learn about music production at the cellular level.

Check out a walkthrough of our app here: https://www.youtube.com/watch?v=dZlovZchMQ8&feature=youtu.be

Our current deployed version is here: http://ablm-modmusic.herokuapp.com/

Feel free to fork and clone this repo to add any feature you'd like and contact us if you want to see it be incorporated into the app! We would love to hear from you.

###Features
1. The **home page** gives a brief description of the app, includes a GIF demo of a user building a project, and includes the creator's contact info.
2. Upon signing in/up, you'll land at the **build page**. It features on the top-left: playback controls, top-right: play-all, save, and a link to the profile page. Front and center is a grid that will be populated with instruments and notes. The instrument rack is expandable and features instruments and a drum rack. The instruments come with a two-octave synth and a chord wheel. The drum rack comes with a customizable rack as well as 606-909 TR drum machines samples.
3. Navigating to the **profile page**, you'll see your profile information as well as your projects. A navigation bar is included to search for your projects, add a new project, or access the discover page.
4. Lastly, going to the **discover page** will bring up other users of the app and different projects sorted by genre to allow users to discover other creations. Upon clicking on a project of another user, that project will load into the build page. You are free to remix or edit that project. Once you save it, it credits the original creator in the description, and is saved into your project repository.

###Technologies Used
1. **WebAudio API**: Used for playback and timing features
2. **SoundsJS**: Instrument samples
3. **Roland TR-series samples**: Drum rack samples
4. **Google Charts**: Used to render the chord wheel
5. This app uses **AngularJS** for dynamic front-end rendering as well as **Bootstrap** for the static part. To build our database, we used **PostgreSQL** and **Express** to query it.
