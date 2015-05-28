'use strict';
/////////////////////Preparacion del documento y definicion de variables///////////
 $(document).ready(function () {
       var clinicas;
       var miTabla;
       var docOriginal;
       var php='';
       var validaciones = $('#Editar').validate({
           rules: {
               nombre: {
                   required: true,
                   lettersonly: true
               },
               numcolegiado: {
                   digits: true                   
               },
               clinicas: {
                   required: true,
                   minlength: '1'
               }
           },
           messages:{
                nombre:{
                  required: 'Debes introducir el nombre del doctor',
                  lettersonlywithspaces: 'Introduce solo caracteres'
                },
                colegiado:{
                  digits: 'Introduce solo digitos'
                },
                clinica:{
                  required: 'Debes marcar al menos una clinica'
                }
              },
              submitHandler:function(){}
       });
$.validator.addMethod('lettersonly', function (value, element) {
           return this.optional(element) || /^[a-z ñáéíóú]+$/i.test(value);
       }, 'Introduce solo letras.');
       // Añadimos al Validate el idioma en español.
       $.extend($.validator.messages, {
           required: 'Este campo es obligatorio.',
           digits: 'Por favor, escribe sólo dígitos.',
           minlength: $.validator.format('Por favor, no escribas menos de {0} caracteres.'),
       });

////////////////////CARGA INICIAL DE LA CLINICAS PARA SU POSTERIOR USO//////////////////
 clinicas = $.ajax({
        
        url: 'php/clinicas.php',
        type: 'GET',
        dataType: 'json'

    })
        .done(function(data) {
            $.each(data, function(index) {
                $('#inputClinicas').append('<option class="option" value="'+data[index].idclinica+'" >' + data[index].nombre + '</option>');
            });
        })
        .fail(function() {
            console.log('error al cargar la lista de clinicas');
        })
        .always(function() {
            console.log('complete');
        });
/////////////////////carga de los datos de la tabla/////////////////////////////////////////
  miTabla=$('#miTabla').DataTable({
    	   'processing': true,
           'serverSide': true,
           'ajax': 'php/cargar.php',           
           'language': {
               'sProcessing': 'Procesando...',
               'sLengthMenu': 'Mostrar _MENU_ registros',
               'sZeroRecords': 'No se encontraron resultados',
               'sEmptyTable': 'Ningún dato disponible en esta tabla',
               'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
               'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
               'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
               'sInfoPostFix': '',
               'sSearch': 'Buscar:',
               'sUrl': '',
               'sInfoThousands': ',',
               'sLoadingRecords': 'Cargando...',
               'oPaginate': {
                   'sFirst': 'Primero',
                   'sLast': 'Último',
                   'sNext': 'Siguiente',
                   'sPrevious': 'Anterior'
               },
               'oAria': {
                   'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
                   'sSortDescending': ': Activar para ordenar la columna de manera descendente'
               }
           },
           'columns': 
           [
            {
              'data': 'nombredoctor',
              'render':function(data){
                return '<a href="#"  class="editar" >'+ data +'</a>';
               }
           }, 
           {
              'data': 'numcolegiado'
           },
           {
              'data': 'nombreclinica'
           },
           {
              'data': 'iddoctor',
               'render': function(data) {
                   return '<button class="editar btn btn-primary" >Editar</button>';
               }
           },
           {
              'data': 'iddoctor',
               'render': function(data) {
                   return '<button class="borrar btn btn-warning">Borrar</button>';
               }
           }
           ]
       });
////////////// Modal ///////////////////////
//////////////borrar doctor//////////////////////7
$('#miTabla').on('click','.borrar',function (e){
  e.preventDefault();
 var nRow = $(this).parents('tr')[0];
 var aData = miTabla.row(nRow).data();
 var doctor = aData.iddoctor;
  $('#forBorrar').modal('show');
  $('#forBorrar').off('click' , '#borrarDoctor').on('click','#borrarDoctor', function(e){
    e.preventDefault();
    $.ajax({
        data:{
          doctor:doctor
        },
        url: 'php/borrar.php',
        type: 'POST',
        dataType: 'json',
      
        error :function(){
          alert('error en el ajax');
          $.growl.error({message:'Error en la llamada de ajax'});
        },
        success:function(data){
         
          $('#forBorrar').modal('hide');
          var mensaje=data[0].mensaje;
          if(data[0].estado === 0){
            $.growl.error({message:mensaje});
          }
          else{
           $.growl.notice({message:mensaje});
           miTabla.draw();
         }

        }
    });
  });
});
//////////////////Nuevo Doctor////////////////////
$('#botones').on('click','.nuevo',function(e){
  e.preventDefault();
  $('#forEditar').modal('show');
  document.getElementById('Editar').reset();
  $('#Editar').off('click','#ConfirmarGuardar').on('click','#ConfirmarGuardar',function(d){
    d.preventDefault();
    if (validaciones.form){
    var doctor = $('#inputNombre').val();
    var numcolegiado = $('#numcolegiado').val();
    var clinicas = $('#inputClinicas').val();
    var promesa = $.ajax({
               data: {
                   docO: docOriginal,
                   doctor: doctor,
                   numcolegiado: numcolegiado,
                   clinicas: clinicas
               },
               dataType: 'json',
               type: 'POST',
               url: 'php/nuevo.php'
           });
           promesa.done(function(data){
            var men = data[0]['mensaje'];
               if (data[0]['estado'] === 0) {
                   $.growl({
                       message: men,
                       style: 'error',
                       title: 'Error !!!',
                       message:men
                   });
                  
               } else {
                   $.growl({
                       style: 'notice',
                       title: 'OK !!!',
                       message: men
                    });
                   miTabla.draw();
                   $('#forEditar').modal('hide');
                    miTabla.draw();
               }
           });
           promesa.fail(function () {
               $.growl.error({
                   message: 'Fallo en la consulta.'
               });
           });
           }
  });
});
//////////////EDITAR////////////////////////
$('#miTabla').on('click','.editar',function(e){
  e.preventDefault();
  var nRow = $(this).parents('tr')[0];
  var aData = miTabla.row(nRow).data();
  var doctor = aData.iddoctor;
  var nombre=aData.nombredoctor;
  var numero=aData.numcolegiado;
  var clin=aData.nombreclinica.split('</li>,<li>');
  $('#inputNombre').val(nombre);
  $('#numcolegiado').val(numero);
  clin.forEach(function(entrada){
  console.log(entrada);  
  var clin2=entrada;
  $('#inputClinicas').find('option').each(function()
  {
    var clin3=$(this);
    if(clin2===clin3.text()){
      clin3.atrr('selected',true);
    }
    });
  });
  $('#forEditar').modal('show');
  $('#Editar').off('click','#ConfirmarGuardar').on('click','#ConfirmarGuardar',function(d){
    d.preventDefault();
    if(validaciones.form){
    var nombre = $('#inputNombre').val();
    var numcolegiado = $('#numcolegiado').val();
    var clinicas = $('#inputClinicas').val();
    var promesa = $.ajax({
               data: {
                   docO: nombre,
                   doctor: doctor,
                   numcolegiado: numcolegiado,
                   clinicas: clinicas
               },
               dataType: 'json',
               type: 'POST',
               url: 'php/editar.php'
           });
           promesa.done(function(data){
            var men = data[0]['mensaje'];
               if (data[0]['estado'] === 0) {
                   $.growl({
                       message: men,
                       style: 'error',
                       title: 'Error !!!',
                       message:men
                   });
                  
               } else {
                   $.growl({
                       style: 'notice',
                       title: 'OK !!!',
                       message: men
                    });
                     $('#forEditar').modal('hide');
                    miTabla.draw();
               }
           });
           promesa.fail(function () {
               $.growl.error({
                   message: 'Fallo en la consulta.'
               });
           });
}//fin del if
});
});//fin modal editar
});//fin ready