var connection = require("../config/connection.js"); // MAKE SURE FILE PATH IS CORRECT

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

  // Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

// CONFIG SET UP - INSERT METHODS THAT WILL EXECUTE MYSQL COMMANDS
var orm = {

// selecetAll()
selectAll: function(table, cb) {
    var queryString = 'SELECT * FROM ' + table + ";";
    connection.query(queryString, function(err, result) {
        if(err) {
            throw err;
        }
        cb(result);
    });
},

// insertOne()
insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
        if(err) {
            throw err;
        }
        cb(result);
    });
},

// updateOne()
updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;
    console.log(queryString);

    connection.query(queryString, function(err, result) {
        if(err) {
            throw err;
        }
        cb(result);
    });
},
// DeleteOne
deleteOne: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;
    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }

};
// Export the orm object for the model 
module.exports = orm;