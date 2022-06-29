window.onload = function() {
   
    var regOk = 0;

    //validacion nombre
     var nombre = document.getElementById('name');
 
     var nombreError = document.getElementById('nameError');
     
     nombre.addEventListener('blur', validateNombre);
     nombre.addEventListener('focus', clearNombreError);
 
     function clearNombreError(e) {
         nombreError.classList.add('hiddenError');
     } 
     
     function validateNombre(e) {
         var x = nombre.value;
         if(x.length < 3) {
             nombreError.classList.remove('hiddenError');
             error = true
         } else{
            regOk++;
         }
     }

     //validacion apellido
     var apellido = document.getElementById('ape');
 
     var apellidoError = document.getElementById('apeError');
     
     apellido.addEventListener('blur', validateApellido);
     apellido.addEventListener('focus', clearApellidoError);
 
     function clearApellidoError(e) {
         apellidoError.classList.add('hiddenError');
     }
 
     
     function validateApellido(e) {
         var x = apellido.value;
         if(x.length < 3) {
             apellidoError.classList.remove('hiddenError');
         } else{
            regOk++;
         }
     }

     //validacion domicilio
     var domicilio = document.getElementById('dire');
 
     var domicilioError = document.getElementById('direError');

     
     domicilio.addEventListener('blur', validateDomicilio);
     domicilio.addEventListener('focus', clearDomicilioError);
 
     function clearDomicilioError(e) {
         domicilioError.classList.add('hiddenError');
     }
 
     
     function validateDomicilio(e) {
        var letraDomi = /[a-zA-Z]/;
        var numDomi = /[0-9]/;
        var espacioDomi = /[\s]/;
        var x = domicilio.value;
        if(x.length < 5) {
             domicilioError.classList.remove('hiddenError');
         } else {
            if(!letraDomi.test(x)){
                domicilioError.classList.remove('hiddenError');
            }
          else {
            if(!numDomi.test(x)){
                domicilioError.classList.remove('hiddenError');
            } else{
                if(!espacioDomi.test(x)){
                    domicilioError.classList.remove('hiddenError');

                } else{
                    regOk++;
                 }
            }
         }
     }
 
 }

    // Validar TEL
 
    var telefono = document.getElementById('tel');
 
    var telefonoError = document.getElementById('telError');
    
    telefono.addEventListener('blur', validateTelefono);
    telefono.addEventListener('focus', clearTelefonoError);

    function clearTelefonoError(e) {
        telefonoError.classList.add('hiddenError');
    }

    
    function validateTelefono(e) {
        var x = telefono.value;
        var regexTel = /[ -()a-zA-Z]/
        if(x.length < 7) {
            telefonoError.classList.remove('hiddenError');
        } else {
            if(regexTel.test(x)) {
                telefonoError.classList.remove('hiddenError');
            } else{
                regOk++;
             }
        }
    }
 
         //validacion mail
         var mail = document.getElementById('mail');
 
         var mailError = document.getElementById('mailError');
         
         mail.addEventListener('blur', validateMail);
         mail.addEventListener('focus', clearMailError);
     
         function clearMailError(e) {
             mailError.classList.add('hiddenError');
         }
     
         
         function validateMail(e) {
             var x = mail.value;
             var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i ;
             
             if(!emailRegex.test(x)) {
                mailError.classList.remove('hiddenError');
            } else{
                regOk++;
             }
         }


         //validacion contraseña
     var password = document.getElementById('pass');
 
     var passwordError = document.getElementById('passError');
     
     password.addEventListener('blur', validatePass);
     password.addEventListener('focus', clearPassError);
 
     function clearPassError(e) {
         passwordError.classList.add('hiddenError');
     }
 
     
     function validatePass(e) {
         var num = /[0-9]/
         var letra = /[a-zA-Z]/
         var x = password.value;

         if(x.length < 8) {
             passwordError.classList.remove('hiddenError');
         } else {
            if (!num.test(x)) {
                passwordError.classList.remove('hiddenError');
                
            } else {
                if (!letra.test(x)) {
                    passwordError.classList.remove('hiddenError');
                } else{
                    regOk++;
                 }
        
        }
    }
}

// actividad 11
var btnEnviar = document.getElementById("btn");
var modal = document.getElementById("modal_ok");
var span = document.getElementsByClassName("close")[0];

var link = "";
var param = "";
var finalParam = "";

btnEnviar.addEventListener("click", verifValid);

    span.onclick = function() {
        modal.style.display = "none";
        }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function verifValid() {
        regOk = 0
        validateNombre();
        validateApellido();
        validateDomicilio();
        validateTelefono();
        validateMail();
        validatePass();
        if (regOk == 6) {
            enviaDatos();
        }
    }

    function enviaDatos () {
        link = "https://curso-dev-2021.herokuapp.com/newsletter?";
        param = "&name=" + nombre.value + "&surname=" + apellido.value + "&adress=" + domicilio.value + "&tel=" + telefono.value + "&email=" + mail.value + "&pass=" + password.value;
        finalParam = link + param;

        fetch (finalParam)
            .then(function(respuesta) {
                return respuesta.json();
            })
            .then(function(datos) {
                console.log(datos);
                document.getElementById("textoModal").innerHTML = JSON.stringify(datos, null, 2);
                openModal();
            })
            .catch(function(error) {
                alert("Error al enviar los datos");
            })

            function openModal () {
                modal.style.display = "block";
            }
        }

    }
