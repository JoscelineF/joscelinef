
$(document).ready(function() {

  var entry = '';
  var answer = '';
  var current = '';
  var log = '';
  var decimal = true;
  var reset = '';

  // round function 
  function round(val) {
    val = val.toString().split('');
    if (val.indexOf('.') !== -1) {
      var valTest = val.slice(val.indexOf('.') + 1, val.length);
      val = val.slice(0, val.indexOf('.') + 1);
      var i = 0;
      while (valTest[i] < 1) {
        i++
      }
      valTest = valTest.join('').slice(0, i + 2);
      if (valTest[valTest.length-1] === '0') {
        valTest = valTest.slice(0, -1);
      }
      return val.join('') + valTest;
    } else {
      return val.join('');
    }
  }

  $('button').click(function() {

    entry = $(this).attr("value");
    console.log('entry: ' + entry);

    //reset log
    if (reset) {
      if (entry === '/' || entry === '*' || entry === '-' || entry === '+') {
        log = answer;
      } else {
        answer = '';
      }
    }
    reset = false;

    // clear
    if (entry === 'ac' || entry === 'ce' && current === 'noChange') {
      answer = '';
      current = '';
      entry = '';
      log = '';
      $('#history').html('0');
      $('#answer').html('0');
      decimal = true;
    } else if (entry === 'ce') {
      $('#history').html(log.slice(0, -current.length));
      log = log.slice(0, -current.length);
      answer = answer.slice(0, -current.length);
      current = answer;
      if (log.length === 0 || log === ' ') {
        $('#history').html('0');
      }
      $('#answer').html('0');
      entry = '';
      decimal = true;
    }

    // prevent more than one deciminal in a number
    if (entry === '.' || entry === '0.') {
      if (!decimal) {
        entry = '';
      }
    }

    // prevent improper use of first digit
    if (answer.length === 0 && isNaN(entry) && entry !== '.' || answer.length === 0 && entry === '0') {
      entry = '';
      answer = '';
    }

    // prevent extra operators
    if (current !== 'noChange') {
      if (current === '' && isNaN(entry) && entry !== '.' || isNaN(current) && isNaN(entry) && entry !== '.') {
        entry = '';
      }
    }

    // digit string concatenation
    while (Number(entry) || entry === '0' || current === '.') {

      if (isNaN(current) && entry === '0' && current !== '.') {
        entry = '';
      } else if (isNaN(current) && Number(entry) && current !== '.') {
        current = '';
      }
      if (entry === '.') {
        decimal = false;
      }
      if (current === '0.' && isNaN(entry)) {
        entry = '';
      } else {
        if (current[current.length - 1] === '.') {
          current = current.concat(entry);
        } else {
          current += entry;
        }
        answer += entry;
        $('#answer').html(current);
        log += entry;
        $('#history').html(log);
        entry = '';
      }
    }

    // Operations

    if (entry === '.') {
      if (current === '' || isNaN(current[current.length - 1])) {
        current = '0.';
        answer += entry;
        $('#answer').html('0.');
        log += current;
        $('#history').html(log);

      } else {
        current = current.concat('.');
        answer = answer.concat('.');
        log = answer;
        $('#history').html(answer);
        $('#answer').html(current);
      }
      entry = '';
      decimal = false;

    } else if (entry === '/') {
      current = '/';
      answer = round(eval(answer)) + current;
      log += current;
      $('#history').html(log);
      $('#answer').html('/');
      entry = '';
      decimal = true;

    } else if (entry === '*') {
      current = '*';
      answer = round(eval(answer)) + current;
      log += 'x';
      $('#history').html(log);
      $('#answer').html('x');
      entry = '';
      decimal = true;

    } else if (entry === '-') {
      current = '-';
      answer = round(eval(answer)) + current;
      log += current;
      $('#history').html(log);
      $('#answer').html('-');
      entry = '';
      decimal = true;

    } else if (entry === '+') {
      current = '+';
      answer = round(eval(answer)) + current;
      log += current;
      $('#history').html(log);
      $('#answer').html('+');
      entry = '';
      decimal = true;

    }else if (entry === '=') {
      if (current[current.length - 1] === '.') {
        entry = '';
      } else {
        current = eval(answer).toString();
        $('#answer').html(round(eval(answer)));
        answer = round(eval(answer));
        log += entry + answer;
        $('#history').html(log);
        log = answer;
        entry = '';
        reset = true;
        decimal = true;
      }
      current = 'noChange';
    }
    entry = '';

    if (reset) {
      log = '';
    }

    // limit number of digits
    if ($('#entry').children().text().length > 18 || $('#history').text().length > 22) {
      $('#answer').html('0');
      $('#history').html('Digit Limit Met');
      current = '';
      answer = '';
      log = '';
      decimal = true;
    }

    //console.log('decimal: ' + decimal);
    //console.log('current: ' + current);
    //console.log('answer: ' + answer);
    //console.log($('#history').text().length);
  });
});