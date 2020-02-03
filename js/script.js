// DEFINISCO IL MOMENTO
$(document).ready(function(){
  var month = 0;
  var month_days = moment('2018-(mounth+1)', "YYYY-MM").daysInMonth();


// CREO CICLO PER INSERIRE GIORNI
  for (var i = 1; i <= month_days; i++) {
    var day = i;
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var context = {
      day: day};
      console.log(context.day);
    var html = template(context);
    $('.month_days').append(html);
  }
});
