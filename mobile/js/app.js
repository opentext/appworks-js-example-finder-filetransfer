var shared = true;

/**********************************************************
* Function to download a hardcoded file for demo purposes *
**********************************************************/
function download() {
  // Create an instance of AWFileTransfer
  var fileTransfer = new Appworks.AWFileTransfer(
    function(file) {
      // Success callback
      out(file);
    }, function(error){
      // error callback
      out(error);
    }
  );

  // Add a progress handler
  fileTransfer.progressHandler(
    function (progress) {
      console.log(progress);
    });

  // Call the AWFileTransfer.download function
  // Pass in the base URL, the filename, options
  fileTransfer.download('http://thecatapi.com/api/images/get', 'file.jpg', null, shared);
}

function list() {
  var finder = new Appworks.Finder(
    function(files) {
      fileOutputTable(files);
    }, function(error){
      out(error);
    }
  );

  finder.list("/");
}

function openFile(filename) {
  var finder = new Appworks.Finder(showContents, showContents);

  function showContents(data) {
      out(data);
  }

  finder.open('/', filename);
}

function fileOutputTable(array) {
  var table = "<table class='file-table'>";
  table += "<tr class='file-table-header'>";
  table += "<td>Name</td>";
  table += "<td>Size</td>";
  table += "</tr>";

  for(var i=0; i < array.length; i++) {
    if(array[i].type == "file") {
      table += "<tr class='file-table-row' onclick=\""+clickEventForRow(array[i].filename)+"\">"

      // filename
      table += "<td>";
      table += array[i].filename;
      table += "</td>";

      // filesize
      table += "<td>";
      table += bytesToSize(array[i].filesize);
      table += "</td>";

      table += "</tr>";
    }
  }
  table += "</table>";
  out(table);
}

function clickEventForRow(filename) {
  var string = "openFile('";
  string += filename;
  string += "')";
  return string
}

function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

function out(message) {
  console.log(message);
  if(typeof(message) == "object") {
    getObject("result").innerHTML = JSON.stringify(message);
  } else {
    getObject("result").innerHTML = message;
  }
}

function getObject(name) {
  return document.getElementById(name);
}
