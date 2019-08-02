// This is a JavaScript file
$(document).on("click","#salvar",function(){
    var parametros = {
      "livro":$("#titulo").val(),
      "autor":$("#autor").val(),
      "ano":$("#ano").val()
    }
    // url:"https://dominioappsjussa.000webhostapp.com/cadastra.php",//para onde enviar
    $.ajax({
        type:"post", //como enviar
        url:"https://appmobile3i2.000webhostapp.com/cadastra.php",//para onde enviar
        data:parametros,//o que enviar
        //se der certo
        success: function(data){
            navigator.notification.alert("msg:"+data);
           $("#titulo").val(""),
           $("#autor").val(""),
           $("#ano").val("")
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
});

function habilita(){
  $("#titulo").prop("readonly",false);
  $("#autor").prop("readonly",false);
  $("#ano").prop("readonly",false);
}

function desabilita(){
  $("#titulo").prop("readonly",true);
  $("#autor").prop("readonly",true);
  $("#ano").prop("readonly",true);
}

$(document).on("click","#novo",function(){
  habilita();
});

$(document).on("click","#cancelar",function(){
  desabilita();
});
