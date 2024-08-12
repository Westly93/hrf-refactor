
$(document).ready(function(){
  $("#myadverts").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#mycard").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
