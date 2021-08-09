import $ from "jquery"

export const postData = entrevista => {

    console.log(entrevista);

    /*const options = {
        headers: {'Content-Type': 'application/json'}
     };
     return (
         
 
         axios.post("https://localhost:5001/Entrevista",entrevista,options)
             .then(({data}) => {
                 console.log(data);
             })
             .catch(error => "ERROR")
 
     )*/


    /* await fetch("https://localhost:5001/Entrevista", {
  
         method: 'POST',
         body: entrevista,
     }).then(data => {
         data.json().then(response => {
             console.log(response);
         });
     });*/


    let ajaxLogin = $.ajax({
        type: "post",
        url: "https://localhost:5001/Entrevista",
        dataType: "json",
        data: entrevista,
        async: true
      });
      ajaxLogin.done(function (response) {
    
        console.log(response);
    
      });

}

export default postData;