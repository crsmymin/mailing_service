(function ($) {

    //    "use strict";


	 /*  Data Table
    -------------*/

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = yyyy+''+mm+''+dd;
    $('#bootstrap-data-table').DataTable({
        lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "All"]],
        "order": [[ 0, "desc" ]],
        "scrollX": true,
        "pagingType": "full_numbers"
    });



    $('#bootstrap-data-table-export').DataTable({
        dom: 'lBfrtip',
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "order": [[ 0, "desc" ]],
        "pagingType": "full_numbers",
        "pageLength": 10,
        buttons: [
        	{
				extend: 'excelHtml5',
				title: today+'_'+document.title
          }
        ],
    });
    $('#bootstrap-data-table-export-searchfalse').DataTable({
        dom: 'lBfrtip',
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "order": [[ 0, "desc" ]],
        "pagingType": "full_numbers",
        "pageLength": 10,
        "searching": false,
        buttons: [
        	{
				extend: 'excelHtml5',
				title: today+'_'+document.title
          }
        ],
    });
    $('#bootstrap-data-table-bill').DataTable({
        dom: 'lBfrtip',
        
        "order": [[ 0, "desc" ]],
        "searching": false,
        "scrollY": 400
    });
    
    $('.dataTables_length').addClass('bs-select');
    
	$('#row-select').DataTable( {
			initComplete: function () {
				this.api().columns().every( function () {
					var column = this;
					var select = $('<select class="form-control"><option value=""></option></select>')
						.appendTo( $(column.footer()).empty() )
						.on( 'change', function () {
							var val = $.fn.dataTable.util.escapeRegex(
								$(this).val()
							);
	 
							column
								.search( val ? '^'+val+'$' : '', true, false )
								.draw();
						} );
	 
					column.data().unique().sort().each( function ( d, j ) {
						select.append( '<option value="'+d+'">'+d+'</option>' )
					} );
				} );
			}
		} );






})(jQuery);