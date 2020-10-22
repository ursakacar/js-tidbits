var startTotal = document.getElementById("start-total"),
  resetTotal = document.getElementById("reset-total"),
  stopwatchTotal = document.getElementById("stopwatch-total"),
  startLap = document.getElementById("start-lap"),
  resetLap = document.getElementById("reset-lap"),
  stopwatchLap = document.getElementById("stopwatch-lap");

var isTotalRunning = false;
var isLapRunning = false;

startTotal.addEventListener("click", function () {
  if (isTotalRunning) {
    stopwatch("stop-total");
  } else {
    stopwatch("start-total");
  }
});

startLap.addEventListener("click", function () {
  if (isLapRunning) {
    stopwatch("stop-lap");
  } else {
    stopwatch("start-lap");
  }
});

resetTotal.addEventListener("click", function () {
  stopwatch("reset-total");
});

resetLap.addEventListener("click", function () {
  stopwatch("reset-lap");
});

timerTotal = null;
timerLap = null;

var minutesTotal = 0,
  secondsTotal = 0,
  minutesLap = 0,
  secondsLap = 0,
  display;

function stopwatch(button) {
  function makeTwoDigits(number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }

  if (button === "start-total") {
    startTotal.value = "Stop";
    timerTotal = setInterval(function () {
      secondsTotal++;
      if (secondsTotal === 60) {
        secondsTotal = 0;
        minutesTotal++;
      }
      display = makeTwoDigits(minutesTotal) + ":" + makeTwoDigits(secondsTotal);
      stopwatchTotal.innerHTML = display;
    }, 1000);
    isTotalRunning = true;
  } else if (button === "start-lap") {
    startLap.value = "Stop";
    timerLap = setInterval(function () {
      secondsLap++;
      if (secondsLap === 60) {
        secondsLap = 0;
        minutesLap++;
      }
      display = makeTwoDigits(minutesLap) + ":" + makeTwoDigits(secondsLap);
      stopwatchLap.innerHTML = display;
    }, 1000);
    isLapRunning = true;
  } else if (button === "stop-total" || button === "reset-total") {
    startTotal.value = "Start";
    isTotalRunning = false;
    clearInterval(timerTotal);
    if (button === "reset-total") {
      minutesTotal = 0;
      secondsTotal = 0;
      display = makeTwoDigits(minutesTotal) + ":" + makeTwoDigits(secondsTotal);
      stopwatchTotal.innerHTML = display;
    }
  } else if (button === "stop-lap" || button === "reset-lap") {
    startLap.value = "Start";
    isLapRunning = false;
    clearInterval(timerLap);
    if (button === "reset-lap") {
      minutesLap = 0;
      secondsLap = 0;
      display = makeTwoDigits(minutesLap) + ":" + makeTwoDigits(secondsLap);
      stopwatchLap.innerHTML = display;
    }
  }
}
