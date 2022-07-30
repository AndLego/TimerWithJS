setInterval(() => {
  let hours = document.getElementById("hours");
  let minutes = document.getElementById("minutes");
  let seconds = document.getElementById("seconds");

  let hh = document.getElementById("hh");
  let mm = document.getElementById("mm");
  let ss = document.getElementById("ss");

  let hr_dot = document.querySelector(".hr_dot");
  let min_dot = document.querySelector(".min_dot");
  let sec_dot = document.querySelector(".sec_dot");

  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  hours.innerHTML = h + "<br><span>Hours</span>";
  minutes.innerHTML = m + "<br><span>Minutes</span>";
  seconds.innerHTML = s + "<br><span>Seconds</span>";

  hh.style.strokeDashoffset = 300 - (300 * h) / 12;
  //12 de horas del reloj
  mm.style.strokeDashoffset = 300 - (300 * m) / 60;
  //60 minutes
  ss.style.strokeDashoffset = 300 - (300 * s) / 60;
  //60 seconds

  hr_dot.style.transform = `rotate(${h * 30}deg)`;
  //360 / 12 = 30
  min_dot.style.transform = `rotate(${m * 6}deg)`;
  //360 / 60 = 6
  sec_dot.style.transform = `rotate(${s * 6}deg)`;
  //360 / 60 = 6
});
