//Automatic episode change
var episodeList = [
  ['The Last Stand','ATLA Live Action',new Date("2014-12-19T00:00:00-05:00")]
];
var startDate = new Date("2022-03-26T09:00:00-05:00");
var today = Date.now();
var weeksPassed = 0; //Math.floor((today - Date.parse(startDate))/(24*3600*1000*7)); //comment out equation when on hiatus
var latestRelease = episodeList[weeksPassed][2];
var nextRelease = episodeList[weeksPassed][3];
document.getElementById("previousEpisode").innerHTML = episodeList[weeksPassed][0];
document.getElementById("nextEpisode").innerHTML = episodeList[weeksPassed][1];

var oneDay = 24*60*60*1000;
var mode = 0; //DD:HH:MM:SS mode is default
var lastHiatusMention = null;

function switchMode(){
  if(mode == 0){
    //switch to DD:HH:MM:SS mode
    mode = 1;
    document.getElementById("moreorless").innerHTML = "to return to normal.";
  }
  else if(mode == 1){
    //DD:HH:MM:SS mode
    mode = 0;
    document.getElementById("moreorless").innerHTML = "to count less precisely instead.";
  };
};

function timer(updown, zeroTime, id){
  if (!zeroTime) {
    return null;
  }

  var timeNow = new Date();
  if (updown == "up"){
    var diffDays = (timeNow.getTime() - zeroTime.getTime()) / oneDay;
  }
  else if (updown == "down"){
    var diffDays = (zeroTime.getTime() - timeNow.getTime()) / oneDay;
  }

  var diffHours = (diffDays - Math.floor(diffDays)) * 24;
  var diffMinutes = (diffHours - Math.floor(diffHours)) * 60;
  var diffSeconds = (diffMinutes - Math.floor(diffMinutes)) * 60;

  //Removes all decimal places in each portion
  diffDays = Math.floor(diffDays);
  diffHours = Math.floor(diffHours);
  diffMinutes = Math.floor(diffMinutes);
  diffSeconds = Math.floor(diffSeconds);

  if (mode == 0){
    document.getElementById(id).innerHTML =  diffDays + "d : " + diffHours + "h : " + diffMinutes + "m : " + diffSeconds + "s";
    document.getElementById(id).style.fontSize = "100%";
  }
  else if (mode == 1){
    if (diffDays == 1){
      document.getElementById(id).innerHTML =  diffDays + " Day";
    }
    else if (diffDays == 0){
      document.getElementById(id).innerHTML =  diffHours + " Hours";
    }
    else {
      document.getElementById(id).innerHTML =  diffDays + " Days";
    }
    document.getElementById(id).style.fontSize = "100%";
  }
  else if (mode == 2){
    var totalTime = diffSeconds + (diffMinutes * 60) + (diffHours * 3600) + (diffDays * 86400);
    document.getElementById(id).innerHTML = totalTime.toLocaleString() + " Seconds";
  };
  if (updown == "down" && diffDays < 0){
    document.getElementById(id).innerHTML =  "Time's Up!";
  }
  return diffDays
};

//The Grand Array of Hiatuses
var hiatusList = [
  ['Last Episode','Next Episode','Preceding Release','Following Release','Hiatus Length','Note'],
  ['The Blue Spirit','The Fortuneteller','Jun 17 2005','Sep 23 2005',98,''],
  ['The Siege of the North, Part 2','The Avatar State','Dec 2 2005','Mar 17 2006',105,''],
  ['The Desert',"The Serpent's Pass",'Jul 14 2006','Sep 15 2006',63,''],
  ['The Crossroads of Destiny','The Awakening','Dec 1 2006','Sep 21 2007',294,''],
  ['The Day of Black Sun, Part 2: The Eclipse','The Western Air Temple','Nov 30 2007','Jul 14 2008',227,''],
  ["Sozin's Comet, Part 4: Avatar Aang",'Welcome to Republic City','Jul 19 2008','Apr 14 2012',1365,'Hiatus between ATLA & TLOK'],
  ['Endgame','Rebel Spirit','Jun 23 2012','Sep 13 2013',447,''],
  ['Light in the Dark','A Breath of Fresh Air','Nov 22 2013','Jun 27 2014',217,''],
  ['The Terror Within','The Stakeout','Jul 25 2014','Oct 6 2014',73,''],
  ['Venom of the Red Lotus','After All These Years','Oct 9 2014','Nov 28 2014',50,''],
  ['The Last Stand','???','Dec 19 2014','???',,'']
];

//makes an HTML table from the array
function createTable(array) {
  var diffDays = timer("up", latestRelease, "count");
  array[array.length - 1][4] = diffDays + " days and counting"; //comment out when not on hiatus
  for(var i = 0; i < array.length ; i++){
    var row = document.createElement('tr');
    row.setAttribute("id", "myTr" + i);
    document.getElementById("hiatus").appendChild(row);
    for(var j = 0; j < 6; j++){
      var cell = document.createElement('td');
      var content = document.createTextNode(array[i][j]);
      cell.appendChild(content);
      document.getElementById("myTr" + i).appendChild(cell);
    };
  };
};

//does the ticking
window.setInterval(function(){
  timer("up", latestRelease, "count");
  timer("up", lastHiatusMention, "count3");
  timer("down", nextRelease, "count4");
}, 250);