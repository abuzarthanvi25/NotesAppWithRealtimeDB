var dateOfToday = document.getElementById('dateOfToday');
var dayOfToday = document.getElementById('dayOfToday');
var currentMonth = document.getElementById('currentMonth');
var currentYear = document.getElementById('currentYear');

function dateAndTime(){
    var currentdate = new Date();
    var date = currentdate.getDate()
    dateOfToday.innerHTML = date;
    // console.log(date)
    var day = currentdate.getDay();
    var day
        if(day == 0){
          day = 'Sunday';
        }
        else if(day == 1){
          day = 'Monday';
        }
        else if(day == 2){
          day = 'Tuesday'
        }
        else if(day == 3){
          day = 'Wednesday'
        }
        else if(day == 4){
          day = 'Thursday'
        }
        else if(day == 5){
          day = 'Friday'
        }
        else if(day == 6){
          day = 'Saturday'
        }
        dayOfToday.innerHTML = day
        // console.log(day)
  
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  
        const d = new Date();
        let name = month[d.getMonth()];
        currentMonth.innerHTML = name
  
        const yr = currentdate.getFullYear()
        currentYear.innerHTML = yr
  }
  
  dateAndTime()
  