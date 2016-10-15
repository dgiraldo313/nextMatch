
// form control feature
  // handles all user interaction with form
var formControl = {

    // main selectors in DOM
    "config" : {
      "leagueList" : $("#leagues"),
      "teamList"   : $("#teams"),
      "form"       : $("form"),
      "button"     : $(".button"),
      "leagueSection": $("#primary-list"),
      "teamSection": $("#secondary-list")
    },
    "init" : function(){
      // all of the main actions for the form control
      // update list of teams depending on which league user selects
      selectors.leagueList.change(function(){
        formControl.updateTeamList()

      });

      //disable animation on mouse over for submit button
      selectors.button.mouseover(function(){
        formControl.disableAnimation($(this));
      }).mouseleave(function(){
        formControl.enableAnimation($(this) ,"leftRight");
      });

      // action handler
      selectors.teamList.change(function(){
        // update action depending on user selection of team
        formControl.updateAction();
        selectors.button.show();

      });


    },
    "updateTeamList" : function(){
      var sel = selectors.leagueList;
      if (sel.data("options") == undefined) {
        sel.data("options", $("#teams option").clone());
      }
      // get id of league selected
      var id = sel.val();
      // get all options that match the league id selected by user
      var options = sel.data("options").filter("[value=" + id + "]");
      // show items in secondary list
      selectors.teamList.html(options);
      // reveal secondary content once user selects league
      console.log(selectors.teamSection.attr("class"));
      if(selectors.teamSection.hasClass("hidden")){
        formControl.showContent();
      }
    },
    "updateAction" : function(){
      //change action depending on user selected
      var newAction = $("#teams option:selected").data("value");
      console.log(newAction);
      // update action
      selectors.form.prop("action" , newAction);
      //enable button once a team selection is made
      if(selectors.button.attr("disabled") == "disabled"){
        formControl.enableButton();
        }
    },
    "disableAnimation" : function(selector){
      // console.log(selector.stop());
      selector.css({"animation-name": "none"});
    },
    "enableAnimation" : function(selector, animationName){
      selector.css({"animation-name": animationName});
    },
    "enableButton" : function(){
      // enable submit button when a selection is made
      selectors.button.removeAttr("disabled");
    },
    "showContent" : function(){
      selectors.teamSection.removeClass().animate( 1000 , "linear" );
    }
};
// get all config selectors
var selectors = formControl.config;


//load features once DOM loads
$(document).ready(function() {
  formControl.init();
});
