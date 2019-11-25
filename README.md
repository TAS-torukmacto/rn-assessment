# rn-assessment


In order to start please fork this repo. `Scheduler.js` and `Solutions.txt` are the only files that needs to be modified in order to complete this assessment. Please provide the solutions to `1` and `2` by modifying `Solutions.txt` and use `Scheduler.js` for question `3`. <br><br>
&nbsp;&nbsp;&nbsp; Once you have completed these tasks, in order to submit your work please create a pull request to the branch `a1` to be reviewed.


1. Write a function that spawns 2 child node processes that send back "Hello world" after x milliseconds, the delay should be defined by an argument (e.g. `node child_process 100`). The function should return a promise that resolves with the results of all child processes.


2. Write a javascript function that takes in 2 two arguements: date('2019-10-10') as the first and time('13:15:00') as the second. The function should compare it to the current time and return 'true' if the datetime provided has already past or 'false' otherwise.


3. The file `Scheduler.js` is developed alongside expo. In order to complete this, you will need a development tool setup to run react-native app either `expo` or `Vanilla React Native`.<br><br>
&nbsp;&nbsp;&nbsp; The purpose of the `Scheduler` component is to display a list of activities scheduled over a week with an additional feature that allows user to move an activity to a different day. At the moment, the component just displays the activites for each day. Please make necessary modifications to the file in order to meet the following acceptance criteria:<br><br>
* At the moment, any activity onLongPressed displays a Modal at the bottom of the screen. The purpose of the modal is to allow users to choose a different day to move the selected activity. The modal needs to display all 5 days 'Mon-Fri'.<br>
* when an activity is selected, the day it belongs to should be highlighted on the modal by default with a green background. 
* When an alternative day is selected, it should be indicated with a green background and grey background for all unseleected days.<br>
* The `move` button should be disabled until an alternative day is selected and the `cancel` button when pressed should reset the modal state and hide it.<br>
* When the `move` button is pressed, the activity should be removed from its current day and moved to the selected day. The modal should be reset and hidden on finish.
