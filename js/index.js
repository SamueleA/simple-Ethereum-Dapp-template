$(document).ready(function(){
var loadScrollbar = false;

  web3.version.getNetwork((err, netId) => {
    if (netId != "1") {
      $(".warnings").show();
      $("#networkWarning").show();
    }
  });
  if (web3.eth.accounts.length == 0) {
    $(".warnings").show();
    $("#noWeb3AccountWarning").show();
  }

  var vueInstance = new Vue({
    el:'#mainVue',
    data:{
      events: [],
      userAddress: 0,
      userBalance: 0
    },
    updated: function() {
      $('[data-toggle="popover"]')
        .on('click',function(e){
          e.preventDefault();
          return true;
        })
        .popover();
    }
  });



  resize();
  $(window).resize(resize());
  function resize(){
    if (!window.matchMedia("(max-width: 700px)").matches) {
      //main scrollbars
      $('body').mCustomScrollbar({
        scrollButtons: {
          enable:true
        },
        theme:"inset-dark",
        scrollInertia:150,
        autoHideScrollbar:false
      });
    }
  }


  window.addEventListener("contracts_loaded", () =>{
    //user info
    vueInstance.userAddress = web3.eth.accounts[0];
    web3.eth.getBalance(vueInstance.userAddress , (err, res) =>{
      vueInstance.userBalance = res;
    });

    ///fetching the events
    var eventPromiseArray =[];
    for(var i=0; i<window.loadedContracts.length; i++){
      var eventPromise = new Promise((resolve, reject)=>{
        loadedContracts[i].getAllEvents().then((events) =>{
          events.forEach((element)=> {
          vueInstance.events.push(element);
          });
          resolve();
        });
      });
      eventPromiseArray.push(eventPromise);
    }
    Promise.all(eventPromiseArray).then(function() {
      //once all events are loaded we can sort the events by timestamp
      //and load the scrollbar
      vueInstance.events.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });
      loadEventsScrollbar();
    });
  });
});

//scrollbar for the events is loaded once all events are loaded
function loadEventsScrollbar() {
  //scrollbar
  $('.scrollBar').mCustomScrollbar({
    scrollButtons: {
      enable:true
    },
    theme:"inset-dark",
    scrollInertia:150,
    autoHideScrollbar:true,
  });
}
