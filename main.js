/*globals $:true*/

var exifParser = require('exif-parser');
var $ = require('jquery-browserify');

var doc = document.documentElement;

doc.ondragover = function () {
  return false;
};

doc.ondragend = function () {
  return false;
};

doc.ondrop = function (event) {
  event.preventDefault();

  this.className = '';

  var files = event.dataTransfer.files;

  var reader = new FileReader();

  reader.onloadend = function (e) {
    var parser = exifParser.create(e.target.result);

    parser.enableReturnTags(true);

    var result = parser.parse();

    Object.keys(result.tags).forEach(function (key) {
      $('#tags').append('<dt>' + key + '</dt>' +
                        '<dd>' + result.tags[key] + '</dd>');
    });
  };

  reader.readAsArrayBuffer(files[0]);

  return false;
};

$('body').append('<p>Drag a JPEG to this page.</p>');
$('body').append('<dl id="tags"></dl>');
