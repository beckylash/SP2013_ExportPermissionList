# SP2013_ExportPermissionList
Small deployable project for SharePoint 2013 sandboxed solution that lists SharePoint groups and members of current site on an HTML page. The HTML page includes a link to export the list of groups and members to a .csv file.  Javascript modified from scripts at the following resources:<br>
https://msdn.microsoft.com/en-us/library/office/hh185012(v=office.14).aspx <br>
https://bl.ocks.org/kalebdf/ee7a5e7f44416b2116c0

Requires jQuery.

The solution works in both SharePoint 2010 and SharePoint 2013. 

The Web Part looks like the following picture. The picture also displays the .csv that can be saved to the desktop computer.

<kbd>
<img src="https://github.com/BeckyLash/SP2013_ExportPermissionList/blob/master/mdimages/permoverview.PNG">
</kbd>

Deploys html and .js files to ET.Permissions folder in Master Page gallery for the site collection. 

To implement:

1. At the root of the site collection, browse to the master page gallery. 

2. In ET.Permissions folder, edit the SitePermissions.html file in Notepad or SharePoint Designer. 

3. Add the correct path to the following lines:

 "http://mydomain/sites/mysite/_catalogs/masterpage/ET.permissions/css/permissionslist.css"
 
 "http://mydomain/sites/mysite/_catalogs/masterpage/ET.permissions/js/jquery-1.11.2.min" 
 

"http://mydomain/sites/mysite/_catalogs/masterpage/ET.permissions/js/SitePermissions.js" 

4. Add a Content Editor Web Part to a page and point to the SitePermissions.html file.

The solution can be placed on any page on any site in the site collection, as long as the Content Editor Web Part points to SitePermissions.html at the root of the site collection.
