let name = prompt("İsminiz nedir ?");

let nameId = document.getElementById("name");

nameId.innerHTML = `${name}!`;

let time = document.getElementById("time");

function getTime() {
  let date = new Date().toLocaleString("tr-TR");
  let getDay = new Date().getDay();
  let day;
  switch (getDay) {
    case 1:
      day = "Pazartesi";
      break;
    case 2:
      day = "Salı";
      break;
    case 3:
      day = "Çarşamba";
      break;
    case 4:
      day = "Perşembe";
      break;
    case 5:
      day = "Cuma";
      break;
    case 6:
      day = "Cumartesi";
      break;
    case 7:
      day = "Pazar";
      break;
  }

  time.innerHTML = `${date} ${day}`;
}

setInterval(getTime, 1000);
