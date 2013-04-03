jQuery.Krobar.js
================
Ultimate jQuery Ajax Post plugin

HTML Form enhancement to encapsulate AJAX POST on input changes. ([See Demo](http://roberjo.github.com/jQuery-Krobar/))

## Usage

<pre>&lt;form id="form_id" >
  &lt;div class="row">
    &lt;label for="input_name" > Name </label>
    &lt;input id="input_id" name="input_name" type="text">&lt;/input>
  &lt;/div>
&lt;/form></pre>

<pre>&lt;script type="text/javascript">
  function callback_validate () {
    validate_form();
  }
&lt;/script>
</pre>

<pre>$('#form_id input').krobar('/path/to/update', callback_validate);</pre>
