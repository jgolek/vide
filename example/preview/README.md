Widget Preview Tool
============================
Should help you to preview, test and debug a widgets library. 


Example
-----------------------------
List of widgets: 
<host>/widgets

Select one widget
<host>/widget/<WidgetName>

Run
-----------------------------

	coffee app.coffee <path to widgets directory>



Widgets Directory
-----------------------------

   widgets
      <widgetname>
      	view.html ( optional )
      	viewmodel.js or viewmodel.coffee


Widgets Viewmodel Definition (viewmodel.js)
----------------------------- 

/**
 * <Widget Name >
 *
 * @param {String} model.name
 *
 */
 function ViewModel(model){

 }

