<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>
<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" language="C#" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.7.2.min.js"></script>

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link rel="stylesheet" href="../Scripts/rainbow/themes/blackboard.css"/>
  
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">

  
<div class="row">
    <div class="twelve columns">
        <h3 class="subheader">Welcome to the <strong>J</strong>ava<strong>S</strong>cript <strong>L</strong>anguage
            <strong>Q</strong>uery (JSLQ) SharePoint App.</h3>
    </div>
</div>

<div class="row">
    <div class="twelve columns">
        <div class="row">
            <div class="twelve columns">
                <div id="featuredContent">
                    <div>
                        <h4>You already convinced that REST is the way to go</h4>
                      <p>Good, but let's face it. <a href="http://www.odata.org/documentation/uri-conventions">URI conventions</a> via 
                        string concatenation is not the ideal method to deal with OData.
                      </p>
                        <p><pre><code data-language="javascript">
var serverurl = '../_vti_bin/listdata.svc/',
  odata_endpoint = 'projects',
  query = '?$filter=(Title%20eq%20%27Project%2010%27)' +
          '&$callback=parent.handleJSONP_1' +
          '&$format=json'

$.ajax({
  url: serverUrl + odata_endpoint + "/" + query,
  ...
});
</code></pre></p>
                <p>This app uses <a href="http://jaydata.org">JayData</a> to make real-time queries
                            against the local OData V2 <a href="../_vti_bin/listdata.svc">../_vti_bin/listdata.svc</a> data end point. 
                        <br />Figure out on your own if that makes your life easier.
                        </p>
                    </div>
                    <div>
                        <h4>TypeScript, RequireJS and JayData</h4>
                        <p>Your <span class="success label">DREAM TEAM</span> for SharePoint 2013 app development.</p>
                        <p><img src="../images/TypeScriptExample.jpg"/></p>
                    </div>
                    <div>
                        <h4>Before you start</h4>

                        <p>While Microsoft provides a new OData endpoint in SharePoint 2013
                          <code>sitename/_api</code> this app uses the samewhat older endpoint <code>sitename/_vti_bin/listdata.svc</code>.
                          There are two reasons to it:</p>
                        <ol>
                          <li>Whatever you see here, can be done in SharePoint 2010 as well.</li>
                          <li>OData V3 support in JayData is coming, but it's not fully there yet. But things are evolving fast, 
                            so make sure to check <a href="http://jaydata.org">http://jaydata.org</a> for the latest information.</li>
                        </ol>
                        <p>
                          About the lists layout: The first one is a simple project list and the second a time tracking list with a lookup to the project list. 
                          The setup is derived from Chris O'Brien's work. You should make yourself familiar with the setup at 
                          <a href="http://www.sharepointnutsandbolts.com/2012/08/create-lists-content-types-files-etc.html">Chris O'Brien's blog</a>.  
                        </p>
                    </div>
                    <div>
                        <h4>Run the examples</h4>
                        <p><span class="alert label">Important:</span> Make sure to open you favorite console to see what's going over the wire.
                               For your convinience you find links to both the project and the Time tracking SharePoint lists under each example.</p>
                        <p><img src="../images/ExploreTheResults.jpg"/></p>
                    </div>
                    <div>
                        <h4>Technology stack</h4>
                        <dl>
                          <dt><a href="http://www.typescriptlang.org/">TypeScript</a></dt>
                          <dd>TypeScript is a language for application-scale JavaScript development.</dd>
                          <dt><a href="http://www.requirejs.org/">RequireJS</a></dt>
                          <dd>RequireJS is a JavaScript file and module loader.</dd>
                          <dt><a href="http://jaydata.org/">JayData</a></dt>
                          <dd>The cross-platform HTML5 data-management library for JavaScript</dd>
                          <dt><a href="http://msdn.microsoft.com/en-US/office/apps/fp123627">Office Developer tools</a></dt>
                          <dd>Create rich, immersive apps for Office and SharePoint using the premiere tool for professional developers.</dd>
                          <dt><a href="http://visualstudiogallery.msdn.microsoft.com/07d54d12-7133-4e15-becb-6f451ea3bea6">Web Essentials 2012</a></dt>
                          <dd>Adds many useful features to Visual Studio for web developers</dd>
                          <dt><a href="http://foundation.zurb.com/">Zurb foundation</a></dt>
                          <dd>Everything you need to know to build for the future.</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <hr/>
    </div>


</div>

<div class="row">
    <div id="dynExamples" class="twelve columns"></div>
</div>


<hr/>
<div class="row">
    <div class="four columns">
        <p>Copyright &copy; 2012 <a href="http://rainerat.spirit.de">RainerAtSpirit</a></p>
    </div>
    <div class="eight columns">
        <ul class="link-list right">
            <li><a href="http://jaydata.org">JayData</a></li>
            <li><a href="http://jaydata.org/blog/javascript-language-query-jslq-101">JSLQ 101</a></li>
            <li><a href="http://jslq.spirit.de">JSLQ playground</a></li>
            <li><a href=".">Home</a></li>
        </ul>
    </div>
</div>


<!-- Included JS Files -->
<script src="../Scripts/jquery-1.7.2.min.js"></script>

<!-- Foundation Javascript, safe to override -->
<script src="../Scripts/foundation/jquery.foundation.orbit.js"></script>
<script src="../Scripts/foundation/app.js"></script>


<!-- Code highlighting -->
<script src="../Scripts/rainbow/rainbow.min.js"></script>
<script src="../Scripts/rainbow/language/generic.js"></script>
<script src="../Scripts/rainbow/language/javascript.js"></script>
<script src="../Scripts/rainbow/language/html.js"></script>

<!-- JayData -->
<script src="../Scripts/datajs-1.0.3.js"></script>
<script src="../Scripts/jaydata.js"></script>
<script src="../Scripts/jaydatamodules/deferred.js"></script>
<script src="../Scripts/jaydataproviders/oDataProvider.js"></script>
<script src="../App/DataService/ListDataSvcMetadata.js"></script>

<!-- Using require.js ONLY for own AMD modules -->
<script data-main="../App/main.js" src="../Scripts/require.js"></script>
  
  
</asp:Content>
