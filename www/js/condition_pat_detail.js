$(document).on('pageshow', '#cond_patient_details', function(){ 

//alert('ASD');

condition_emer =  JSON.parse(sessionStorage.getItem("emergency")); 

if(condition_emer == null){
    $.mobile.changePage($('#pageone'), { transition: "none", changeHash: true, reverse: false });
 return false;
}

  $(document).off('click', '#ypageion').on('click', '#ypageion', function() {
 $.mobile.changePage($('#pageone'), { transition: "none", changeHash: true, reverse: false });
 return false;
  });

  $(document).off('click', '#oktoquestio').on('click', '#oktoquestio', function() {
 $.mobile.changePage($('#question_li'), { transition: "none", changeHash: true, reverse: false });
 return false;
  });
//alert(condition_emer+'condition');
//$( document ).on( "click", ".show-page-loading-msg", function() {






	$(document).off('click', '#pate_enter_but').on('click', '#pate_enter_but', function() {
//alert('condition emergency but clcik');

 var pat_name = document.getElementById('pat_name').value;
 var age_nn = document.getElementById('age_n').value;
  var age_cm_h = document.getElementById('age_cm_h').value;
 var age_kg_w = document.getElementById('age_kg_w').value;
 var gender_d = $('input:radio[name=gender_de]:checked').val();
  var mob_no = document.getElementById('mob_no').value;
 
 var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });



/*  $.mobile.loading().hide();
        $(".ui-icon-loading").hide();*/

 
/*alert(lat_hosp+'lat_hosp');
alert(long_hosp+'long_hosp');*/


   //alert(pat_name+'pat_name');
/*
 alert(pat_name+'pat_name');
  alert(age_nn+'age_nn');
  alert(gender_d+'gender_d');
  alert(mob_no+'mob_no');*/
if(pat_name != ""){

  $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
  options.async = true;
});

var formData = $("#callAjaxForm").serialize();

  $.ajax({
  type: "POST",
  url: "http://staging.eimpressive.com/slim/slim-heart-mergedb/pat_detai_inser.php?pat_name="+pat_name+"&age_nn="+age_nn+"&gender_d="+gender_d+"&mob_no="+mob_no+"&condition_emer="+condition_emer+"&age_cm_h="+age_cm_h+"&age_kg_w="+age_kg_w,
  data: formData,
  success: onSuccessfg,
  async: 'true',
  crossDomain: true,
  dataType: 'json',
  error: onErrorqwe

});
    function onSuccessfg(data){
//alert('onSuccessfg       ggggggg');

//sessionStorage.setItem("patient_detaias_array",JSON.stringify(result[0]));
sessionStorage.setItem("patient_detaias_array",JSON.stringify(data));
patient_detaias_array =  JSON.parse(sessionStorage.getItem("patient_detaias_array"));

for(a=0;a<patient_detaias_array.length;a++){
  var pat_id = patient_detaias_array[a];
  var pat_id_last = pat_id.patient_id;
}
//alert(pat_id_last+'pat_id_last');

//alert('asdkjfgksdafjidkaisf');
//alert(navigator.geolocation+'navigator.geolocation');


   navigator.geolocation.getCurrentPosition(onSuccess, onError);  

      function onSuccess(position) {

        lat_hosp = position.coords.latitude;
        long_hosp = position.coords.longitude;

//alert(lat_hosp+'lat_hosp t');
//alert(long_hosp+'long_hosp t');

/*var lat_hosp ='89';
var long_hosp ='234';*/


  $.ajax({
  type: "POST",
  url: "http://staging.eimpressive.com/slim/slim-heart-mergedb/pat_detai_lat_long.php?pat_id_last="+pat_id_last+"&lat_hosp="+lat_hosp+"&long_hosp="+long_hosp,
  data: formData,
  success: onSuccesspatid,
  async: 'true',
  crossDomain: true,
  dataType: 'json',
  error: onErrorasdfa
});

      }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
        alert("Enable gps in your Device")
          $.mobile.loading( "hide" );
    }

/*startGeoWatch();
function onDeviceReady() {
  alert('s');
  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);
  startGeoWatch();
}

function geoWin(pos) {
  //d("geoWin(): "+pos.coords.latitude+", "+pos.coords.longitude);
  alert("geoWin(): "+pos.coords.latitude+", "+pos.coords.longitude)
}

function geoFail(error) {
  //d("geoFail(): "+error.code+": "+error.message);
  alert("geoFail(): "+error.code+":" +error.message);
}

function startGeoWatch() {

  opt = {timeout: 1000, enableHighAccuracy: true};

  watchGeo = navigator.geolocation.watchPosition(geoWin, geoFail, opt);
}*/


  function onSuccesspatid(data){
//alert('Submitted Successfully');
  $.mobile.loading( "hide" );
$("#myPopup1d").popup("open");
sessionStorage.setItem("twokm",JSON.stringify(data));
twokm =  JSON.parse(sessionStorage.getItem("twokm"));
document.getElementById('pat_name').value = '';
      document.getElementById('mob_no').value = '';
      document.getElementById('age_n').value='';
//alert(twokm+'twokm')
//alert('ssssssswsssssss   okkkkkkkkkkkk');
var pat_id_lasta = pat_id_last;

sessionStorage.setItem("pat_id_lasts",JSON.stringify(pat_id_lasta));
 // $.mobile.changePage($('#question_li'), { transition: "none", changeHash: true, reverse: false });

     return false;
     }
          function onErrorasdfa(data){
alert('errrrr drttttttttttttttttt');
     }

  }
     function onErrorqwe(data){
alert('errrrr');
     }


}
else{
  alert("Fill the empty fields" );
  $.mobile.loading( "hide" );
  $.mobile.changePage($('#cond_patient_details'), { transition: "none", changeHash: true, reverse: false });
}
});


});