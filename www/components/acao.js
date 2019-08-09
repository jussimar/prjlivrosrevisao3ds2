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


$(document).on("click","#listar",function(){
    $(location).attr("href","lista.html");
});

function preencherLista(){
  var itemlista = "";
  $.ajax({
        type:"post", //como enviar
        url:"https://appmobile3i2.000webhostapp.com/listar.php",//para onde enviar
        dataType:'json',//o que enviar
        //se der certo
        success: function(data){
            $.each(data.livros, function(i, dados){
              itemlista+="<option value='"+dados.codigo+"'>"+dados.titulo+"</option>";
            });
            $("#listalivros").html(itemlista);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
}

$(document).on("change","#listalivros",function(){
  var parametro ={
    "codigo":$("option:selected",("#listalivros")).val()
  }
  
  $.ajax({
        type:"post", //como enviar
        url:"https://appmobile3i2.000webhostapp.com/listarUm.php",//para onde enviar
        data:parametro,
        dataType:'json',//o que enviar
        //se der certo
        success: function(data){
           $("#codigo").val(data.livro.codigo);
           $("#titulo").val(data.livro.titulo);
           $("#autor").val(data.livro.autor);
           $("#ano").val(data.livro.ano);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });
});

$(document).on("click","#deletar",function(){
  var parametro ={
    "codigo":$("#codigo").val()
    
  }
 
  $.ajax({
        type:"post", //como enviar
        url:"https://appmobile3i2.000webhostapp.com/deletar.php",//para onde enviar
        data:parametro,
        //se der certo
        success: function(data){
           location.reload();
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });
});

$(document).on("click","#salvarAlt",function(){
    var parametros = {
      "livro":$("#titulo").val(),
      "autor":$("#autor").val(),
      "ano":$("#ano").val(),
      "codigo":$("#codigo").val()
    }
    // url:"https://dominioappsjussa.000webhostapp.com/cadastra.php",//para onde enviar
    $.ajax({
        type:"post", //como enviar
        url:"https://appmobile3i2.000webhostapp.com/editar.php",//para onde enviar
        data:parametros,//o que enviar
        //se der certo
        success: function(data){
            navigator.notification.alert("msg:"+data);
           location.reload();
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
});

$(document).on("click","#editar",function(){
  habilita();
});

$(document).on("click","#cancelarEdit",function(){
  desabilita();
});

