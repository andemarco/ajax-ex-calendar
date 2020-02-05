$(document).ready(function(){
  var month = 1; //MESE GENNAIO
  stampDay(month); // STAMPO CALENDARIO GENNAIO
  ajaxCall (); //VERIFICO FESTIVITA GENNAIO

  $('.change_month .next_month').on('click', function() {
    month = month + 1;//SE CLICCO NEXT, MESE SUCCESSIVO
    if (month > 12) {
      alert('SOLO 2018/NO 2019');
    } else {
      $('.month_days li').remove();//PULISCO CALENDARIO
      stampDay(month);//STAMPO CALENDARIO MESE SUCCESSIVO
      ajaxCall ();//VERIFICO FESTIVITA MESE SUCCESSIVO
    }
    });

    $('.change_month .prev_month').on('click', function() {
      month = month - 1;
      if (month < 1) {
        alert('SOLO 2018/NO 2017');//SE CLICCO PREV, MESE PRECEDENTE
      } else {
        $('.month_days li').remove();//PULISCO CALENDARIO
        stampDay(month);//STAMPO CALENDARIO MESE PRECEDENTE
        ajaxCall ();//VERIFICO FESTIVITA MESE PRECEDENTE
      }
      });


// CREO FUNZIONE PER STAMPARE A SCHERMO
// QUI STAMPO IL MESE DI RIFERIMENTO
function stampDay(month) {
    var months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
    var months = months[month - 1];
    console.log(months);
    var month_days = moment("2018-"+(month), "YYYY-MM").daysInMonth();
    $('.month_name').text(months + ' 2018');

// QUI STAMPO I GIORNI DEL MESE
    for (var i = 1; i <= month_days; i++) {
      var day = '2018' + '-' + addZero(month) +  '-' + addZero(i);
      var dayStamp = addZero(i);
      var source = document.getElementById("entry-template").innerHTML;
      var template = Handlebars.compile(source);
      var context = {
        day: dayStamp,
        fest: day};
        console.log(context.day);
      var html = template(context);
      $('.month_days').append(html);
  }
}


// CHIAMO AJAX PER FESTIVITA'
function ajaxCall () {
  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month="+(month - 1),
    method: "GET",
    success: function (data, stato) {
      var holiday = data.response;
      console.log(holiday);
      for (var i = 0; i < holiday.length; i++) {
        console.log(holiday[i].date);
        $('li').each(function() {
          var dayHoli = $(this).attr('data-holi');
          if (dayHoli == holiday[i].date) {
            $(this).addClass('red');
            $(this).append(' ' + holiday[i].name)
          }
        });
      }
    },
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
    }
  });
}

  // ADDZERO
  function addZero(num) {
    if (num < 10) {
      return "0"+num
    }
    else {
      return num
    }
  }
});
