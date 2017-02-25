//reference: https://msdn.microsoft.com/en-us/library/office/hh185012(v=office.14).aspx    
   
jQuery(document).ready(function () {
    var collGroup;
        ExecuteOrDelayUntilScriptLoaded(retrieveAllUsersAllGroups, "sp.js");

    //from https://bl.ocks.org/kalebdf/ee7a5e7f44416b2116c0
        console.log("HELLO")
        function exportTableToCSV($table, filename) {
            var $headers = $table.find('tr:has(th)')
                , $rows = $table.find('tr:has(td)')

                // Temporary delimiter characters unlikely to be typed by keyboard
                // This is to avoid accidentally splitting the actual contents
                , tmpColDelim = String.fromCharCode(11) // vertical tab character
                , tmpRowDelim = String.fromCharCode(0) // null character

                // actual delimiter characters for CSV format
                , colDelim = '","'
                , rowDelim = '"\r\n"';

            // Grab text from table into CSV formatted string
            var csv = '"';
            csv += formatRows($headers.map(grabRow));
            csv += rowDelim;
            csv += formatRows($rows.map(grabRow)) + '"';

            // Data URI
            var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

            // For IE (tested 10+)
            if (window.navigator.msSaveOrOpenBlob) {
                var blob = new Blob([decodeURIComponent(encodeURI(csv))], {
                    type: "text/csv;charset=utf-8;"
                });
                navigator.msSaveBlob(blob, filename);
            } else {
                $(this)
                    .attr({
                        'download': filename
                        , 'href': csvData
                        //,'target' : '_blank' //if you want it to open in a new window
                    });
            }

            //------------------------------------------------------------
            // Helper Functions
            //------------------------------------------------------------
            // Format the output so it has the appropriate delimiters
            function formatRows(rows) {
                return rows.get().join(tmpRowDelim)
                    .split(tmpRowDelim).join(rowDelim)
                    .split(tmpColDelim).join(colDelim);
            }
            // Grab and format a row from the table
            function grabRow(i, row) {

                var $row = $(row);
                //for some reason $cols = $row.find('td') || $row.find('th') won't work...
                var $cols = $row.find('td');
                if (!$cols.length) $cols = $row.find('th');

                return $cols.map(grabCol)
                            .get().join(tmpColDelim);
            }
            // Grab and format a column from the table
            function grabCol(j, col) {
                var $col = $(col),
                    $text = $col.text();

                return $text.replace('"', '""'); // escape double quotes

            }
        }


    // This must be a hyperlink
        $("#export").click(function (event) {
            // var outputFile = 'export'
            var outputFile = window.prompt("What do you want to name your output file (Note: This won't have any effect on Safari)") || 'export';
            outputFile = outputFile.replace('.csv', '') + '.csv'

            // CSV
            exportTableToCSV.apply(this, [$('#dvData > table'), outputFile]);

            // IF CSV, don't do event.preventDefault() or return false
            // We actually need this to be a typical hyperlink
        });







});

    function retrieveAllUsersAllGroups() {
  
        var clientContext = new SP.ClientContext();
  
    this.collGroup = clientContext.get_web().get_siteGroups();
    clientContext.load(collGroup);
    clientContext.load(collGroup, 'Include(Users)');
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
    }

function onQuerySucceeded() {
    var userInfo = '<tr>';
    var grouname = '<tr>';
    var text = "<div class='container'>           <div id='dvData'><table id='groups'><tr><th>GroupName</th><th>GroupMembers</th></tr>";


  
    var groupEnumerator = collGroup.getEnumerator();
    while (groupEnumerator.moveNext()) {

        var oGroup = groupEnumerator.get_current();
        var collUser = oGroup.get_users();
        var userEnumerator = collUser.getEnumerator();
        while (userEnumerator.moveNext()) {
            var oUser = userEnumerator.get_current();

           
            grouname = grouname + "<td>" + oGroup.get_title() + "</td>" + "<td>" + oUser.get_title() + "</td></tr>";
        }
    }
    document.getElementById("groups").innerHTML = text + grouname + "</table></div></div>";
}
function onQueryFailed(sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

 $(document).ready(function () {
           
        });