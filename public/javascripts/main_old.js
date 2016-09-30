//load script once page is ready
$(document).ready(function(){
  //disable submit button
  // disableButton();

  // change list of teams depending on league selection
  $("#leagues").change(function() {
    if ($(this).data('options') == undefined) {
      $(this).data('options', $('#teams option').clone());
    }
    var id = $(this).val();
    var options = $(this).data('options').filter('[value=' + id + ']');
    $("#teams").html(options);

    //reveal team list
    var teamList = $("#secondary-info");
    if(teamList.attr("class") == 'hidden'){
      teamList.removeClass().animate( 1000 , "linear" );
    }
  });

  // allows routes to be changed dynamically by dropdown menu
  $('#teams').change(function(){
      //get the selected option
      var selected = $("#teams option:selected");
      //get the data
      var newaction = selected.data('value');
      //change old action to new action
      $('#form').prop("action", newaction);

      // enable button if disabled
      if($(".button").attr("disabled") == 'disabled'){
        enableButton();
      }
  });

});//end jquery


// helper functions

// dealing with buttons
var disableButton = function(){
  $(".button").attr("disabled", "disabled");
};

var enableButton = function(){
  $(".button").removeAttr("disabled");
};
