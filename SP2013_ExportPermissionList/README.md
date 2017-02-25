# SP2013_ExportPermissionList
Draft project: Small deployable project for SharePoint 2013 sandboxed solution that lists SharePoint groups and members of current site on an HTML page. 
The HTML page includes a link to export the list of groups and members to a .csv file. Javascript copied and slightly modified from scripts at the 
following resources:<br>
https://msdn.microsoft.com/en-us/library/office/hh185012(v=office.14).aspx <br>
https://bl.ocks.org/kalebdf/ee7a5e7f44416b2116c0

Requires jQuery.

Deploys html and .js files to AMC.Permissions folder in Master Page gallery for the site collection. 

To implement:

1. At the root of the site collection, browse to the master page gallery. 

2. In AMC.Permissions folder, edit the SitePermissions.html file in Notepad or SharePoint Designer. 

3. Add the correct path to the following lines:

<link rel="stylesheet" type="text/css" href="http://mydomain/sites/mysite/_catalogs/masterpage/AMC.permissions/css/permissionslist.css">
<script language="javascript" src="http://mydomain/sites/mysite/_catalogs/masterpage/AMC.permissions/js/SitePermissions.js" type="text/javascript"></script>
<script language="javascript" src="http://mydomain/sites/mysite/_catalogs/masterpage/AMC.permissions/js/jquery-1.11.2.min" type="text/javascript"></script>

Add a Content Editor Web Part to a page and point to the SitePermissions.html file.

The solution can be placed on any page on any site in the site collection, as long as the Content Editor Web Part points to SitePermissions.html at the root of the site collection.
