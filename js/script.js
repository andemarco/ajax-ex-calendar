// DEFINISCO IL MOMENTO
$(document).ready(function(){
  var month = 1;
  var month_days = moment('2018-(month)', "YYYY-MM").daysInMonth();


// CREO CICLO PER INSERIRE GIORNI
  for (var i = 1; i <= month_days; i++) {
    var day = '2018' + ' - ' + addZero(month) +  ' - ' + addZero(i);
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var context = {
      day: day};
      console.log(context.day);
    var html = template(context);
    $('.month_days').append(html);
  }
});

// CHIAMO AJAX PER FESTIVITA'
$.ajax({
  url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
  method: "GET",
  success: function (data, stato) {
    var response = data.response;
        console.log(response);
  },
  error: function (richiesta, stato, errori) {
  alert("E' avvenuto un errore. " + errore);
  }
});


// ADDZERO
function addZero(num) {
  if (num < 10) {
    return "0"+num
  }
  else {
    return num
  }
}
