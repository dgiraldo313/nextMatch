
var reminder = {

    // main selectors in DOM
    "config" : {
      'reminderSection' : $('#reminder-section'),
      'reminderButton'  : $('#reminder-button'),
      'reminderForm'    : $('#reminder-form'),
      'reminderCloseButton' : $('#close-button'),
      'submitButton'    : $('#submit'),
      'unformattedDate' : $('#unformattedDate').html(),
      'homeTeam'        : $('#home-team').html(),
      'awayTeam'        : $('#away-team').html()

    },

    "init" : function(){
      reminder.toggleReminderForm();
      selectors.submitButton.click(function(event){
        reminder.submitReminder();
        event.preventDefault();
      });

    },

    "toggleReminderForm" : function(){
      var button      = selectors.reminderButton;
      var closeButton = selectors.reminderCloseButton;
      var form        = selectors.reminderForm;
      // show form
      button.click(function(){
        button.slideUp(50, function(){
          form.slideDown(400);
        });
      });
      //hide form
      closeButton.click(function(){

        form.slideUp(200, function(){
          button.slideDown(100);
        });
      });

    },
    "submitReminder" : function(){
      // get phone number
      var phoneNumber = $('#phoneNumber').val();
      // get alert time
      var alertTime =   $('#alertTime').val();

      console.log(alertTime);
      // ajax call to send POST request to submit reminder to DB
      if(phoneNumber.length === 10){
        // set up data for AJAX Call
        var data = {
                    phoneNumber : phoneNumber,
                    homeTeam    : selectors.homeTeam,
                    awayTeam    : selectors.awayTeam,
                    date        : selectors.unformattedDate,
                    alertTime   : alertTime
                  }

        $.ajax({
          type: "POST",
          url: '/reminder/new',
          data: data,
          success: function(res){
            reminder.addSuccessMessage(res);
          },
          dataType: 'json'
        });
      }else if(phoneNumber.length < 10){
        alert('Phone Number incomplete!')
      }else{
        alert('That is too many numbers!')
      }

    },
    'addSuccessMessage' : function(message){
      selectors.reminderSection.html(message);
    }
};
// get all config selectors
var selectors = reminder.config;


//load features once DOM loads
$(document).ready(function() {
  reminder.init();
});
