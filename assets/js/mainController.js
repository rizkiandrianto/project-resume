(function() {
	var app = angular.module('main',[]);
})();

// ================ Main Function on Formulir ===================
$(document).ready(function(){
    $('.dob').datepicker();
    $('#startEducation').datepicker();
    $('#endEducation').datepicker();
    $('.simpleTextEditor').wysiwyg();

    $('#rating-input').on('rating.change', function() {
            alert($('#rating-input').val());
        });

        $('#addjob, #addedu, #addskill').click(function(){
          $(this).parents(".tab-pane").find('.accordion .group:first-child').clone(true, true).find('input').val("").end().appendTo($(this).parents(".tab-pane").find('.accordion'));
        });

        $('.addSkillSign').click(function(){
          var thisParents = $(this).parents(".skillRow");
          thisParents.clone(true, true).find('input').val("").end().find('.rating').rating('clear').end().appendTo(".groupskillRow");

        });

        $('.removeSkillSign').click(function(){
          $(this).parents(".skillRow").remove();
        });

        $('.saveAddSection').click(function(){
          var listVal = $('#groupListName').val();
          var listHTML = $('<li><a href="#d" data-toggle="tab"><i class="fa fa-ellipsis-v icon"></i>' + listVal + '</a></li>');
          listHTML.insertBefore($('.nav.nav-tabs li:last-child'));
          $('.modal').modal('hide');
          $('#groupListName').val('');
        });

        $('.removeAccGroup').click(function(){
          $(this).parents('.group').remove();
        });
});
// ====== END of Main Function on Formulir

// ================ Material Design Button -->
  $(function(){
  var ink, d, x, y;
  $(".btn").click(function(e){
    if($(this).find(".ink").length === 0){
        $(this).prepend("<span class='ink'></span>");
    }
         
    ink = $(this).find(".ink");
    ink.removeClass("animate");
     
    if(!ink.height() && !ink.width()){
        d = Math.max($(this).outerWidth(), $(this).outerHeight());
        ink.css({height: d, width: d});
    }
     
    x = e.pageX - $(this).offset().left - ink.width()/2;
    y = e.pageY - $(this).offset().top - ink.height()/2;
     
    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
});
});
// ============ END of Material Design Button -->

// ================================== Accordion & Sortable ==============================
  $(function() {
    var active = false,
        sorting = false;
    
    $( ".accordion" )
    .accordion({
        header: "> div > h3",
        collapsible: true,
        heightStyle: "content",
        activate: function( event, ui){
            //this fixes any problems with sorting if panel was open (remove to see what I am talking about)
            if(sorting)
                $(this).sortable("refresh");   
        },
        collapsible:true,

      beforeActivate: function(event, ui) {
           // The accordion believes a panel is being opened
          if (ui.newHeader[0]) {
              var currHeader  = ui.newHeader;
              var currContent = currHeader.next('.ui-accordion-content');
           // The accordion believes a panel is being closed
          } else {
              var currHeader  = ui.oldHeader;
              var currContent = currHeader.next('.ui-accordion-content');
          }
           // Since we've changed the default behavior, this detects the actual status
          var isPanelSelected = currHeader.attr('aria-selected') == 'true';

           // Toggle the panel's header
          currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));

          // Toggle the panel's icon
          currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);

           // Toggle the panel's content
          currContent.toggleClass('accordion-content-active',!isPanelSelected)    
          if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }

          return false; // Cancels the default action
      }
    })
    .sortable({
        handle: "h3",
        placeholder: "ui-state-highlight",
        start: function( event, ui ){
            //change bool to true
            sorting=true;
            
            //find what tab is open, false if none
            active = $(this).accordion( "option", "active" ); 
            
            //possibly change animation here
            $(this).accordion( "option", "animate", { easing: 'swing', duration: 1 } );
            
            //close tab
            $(this).accordion({ active:false });
        },
        stop: function( event, ui ) {
            ui.item.children( "h3" ).triggerHandler( "focusout" );
            
            //possibly change animation here; { } is default value
            $(this).accordion( "option", "animate", { } );
            
            //open previously active panel
            $(this).accordion( "option", "active", active );
            
            //change bool to false
            sorting=false;
        }
    });
});
// ============= END of Accordion & Sortable

/* ============================================ Editor ================================== */
$(function(){
    function initToolbarBootstrapBindings() {
      var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
            'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
            'Times New Roman', 'Verdana'],
            fontTarget = $('[title=Font]').siblings('.dropdown-menu');
      $.each(fonts, function (idx, fontName) {
          fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
      });
      $('a[title]').tooltip({container:'body'});
      $('.dropdown-menu input').click(function() {return false;})
        .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
        .keydown('esc', function () {this.value='';$(this).change();});

      $('[data-role=magic-overlay]').each(function () { 
        var overlay = $(this), target = $(overlay.data('target')); 
        //backup script overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
        overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width('100%').height('100%');
      });
      if ("onwebkitspeechchange"  in document.createElement("input")) {
        var editorOffset = $('#editor').offset();
        $('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('#editor').innerWidth()-35});
      } else {
        $('#voiceBtn').hide();
      }
  };
  function showErrorAlert (reason, detail) {
    var msg='';
    if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
    else {
      //console.log("error uploading file", reason, detail);
      alert("error uploading file", reason, detail);
    }
    $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
     '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
  };
    initToolbarBootstrapBindings();  
  $('#editor').wysiwyg({ fileUploadError: showErrorAlert} );
    window.prettyPrint && prettyPrint();
  });
/* ================ END of editor ====================== */