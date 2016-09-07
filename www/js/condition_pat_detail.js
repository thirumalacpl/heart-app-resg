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


	$(document).off('click', '#pate_enter_but').on('click', '#pate_enter_but', function() {
//alert('condition emergency but clcik');

 var pat_name = document.getElementById('pat_name').value;
 var age_nn = document.getElementById('age_n').value;
  var age_cm_h = document.getElementById('age_cm_h').value;
 var age_kg_w = document.getElementById('age_kg_w').value;
 var gender_d = $('input:radio[name=gender_de]:checked').val();
  var mob_no = document.getElementById('mob_no').value;



 
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
startGeoWatch();


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

function d(s) {
  console.log(s);
  //alert("status");
  $("#status").text(s);
}


function geoWin(pos) {
  d("geoWin(): "+pos.coords.latitude+", "+pos.coords.longitude);
        lat_hosp = pos.coords.latitude;
        long_hosp = pos.coords.longitude;

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

       function onSuccesspatid(data){
//alert('Submitted Successfully');
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

function geoFail(error) {
  d("geoFail(): "+error.code+": "+error.message);
}

function startGeoWatch() {
  d("startGeoWatch()");
  opt = {timeout: 1000, enableHighAccuracy: true};
  alert(opt+'opt errrrrrr       enable gps');
  watchGeo = navigator.geolocation.watchPosition(geoWin, geoFail, opt);
}

function stopGeoWatch() {
  d("stopGeoWatch()");
  navigator.geolocation.clearWatch(watchGeo);
}


function main() {
  document.addEventListener('deviceready', onDeviceReady, false);
  startGeoWatch();

}

// main & globals
var watchGeo=null;
main();

  }
     function onErrorqwe(data){
alert('errrrr');
     }


}
else{
  alert("Fill the empty fields" );
  $.mobile.changePage($('#cond_patient_details'), { transition: "none", changeHash: true, reverse: false });
}
});


});