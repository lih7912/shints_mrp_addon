const fs = require('fs');
const { MongoClient } = require('mongodb');

class CommLib {
    getCurrTime () {
      var tDate  = new Date();
      var mm : number = tDate.getMonth() + 1;
      var mm_str: string = '';
      if (mm > 9) mm_str = mm.toString();
      else  mm_str = '0' + mm.toString();

      var dd : number = tDate.getDate();
      var dd_str : string = '';
      if (dd > 9) dd_str = dd.toString();
      else  dd_str = '0' + dd.toString();

      var hours : number = tDate.getHours();
      var hours_str : string = '';
      if (hours > 9) hours_str = hours.toString();
      else  hours_str = '0' + hours.toString();

      var minutes : number = tDate.getMinutes();
      var minutes_str : string= '';
      if (minutes > 9) minutes_str = minutes.toString();
      else  minutes_str = '0' + minutes.toString();

      var seconds : number = tDate.getSeconds();
      var seconds_str : string = '';
      if (seconds > 9) seconds_str = seconds.toString();
      else  seconds_str = '0' + seconds.toString();

      var yyyy : number  = tDate.getFullYear();

      var m_sec : number = tDate.getMilliseconds();

      var tRetDate = yyyy.toString() + mm_str + dd_str + hours_str + minutes_str + seconds_str + m_sec.toString();
      return (tRetDate);
    }
    printF (argValue: number , argLength: number ) {
      var argZero :string = '';
      var tIdx : number = 0;
      for (tIdx = 0; tIdx < argLength; tIdx++) {
         argZero += '0';
      }

      var tRet: string = argZero.substring(0, argLength - String(argValue).length) + String(argValue);
      return (tRet);

    }
    getFloat (argValue: number  , argPoint:number ) {
     var b : number  = parseInt(String(argValue * (10 ** argPoint))) / (10 ** argPoint);
     return (b);
    }
    createTableSql (argTable:string, argValue:string) {
       var tKeys : string[] = Object.keys(argValue);
       var tIdx3 : number = 0;
       var tColumeStr : string = '';
       var tValueStr : string = '';
       for (tIdx3 = 0; tIdx3 < tKeys.length; tIdx3 ++) {
           var tKey : string = tKeys[tIdx3];
           var tValue : string = argValue[`${tKey}`];

           if (tValue === null) continue;

           if (tIdx3 === 0) {
              tColumeStr += tKey;
              tValueStr += `'${tValue}'`;
           } else {
              tColumeStr += ',' + tKey;
              tValueStr += ',' + `'${tValue}'`;
           }
       }
       var tRetSql: string = 'insert into ' + argTable + '(' + tColumeStr + ') values (' + tValueStr + ')';
       return (tRetSql);
    }
    updateTableSql (argTable:string, argValue:string) {
       var tKeys : string[] = Object.keys(argValue);
       var tIdx3 : number = 0;
       var tColumeStr : string = '';
       var tValueStr : string = '';
       for (tIdx3 = 0; tIdx3 < tKeys.length; tIdx3 ++) {
           var tKey : string = tKeys[tIdx3];
           var tValue : string = argValue[`${tKey}`];

           if (tValue === null) continue;

           if (tIdx3 === 0) {
              tColumeStr += tKey;
              tValueStr += `${tKey} = '${tValue}'`;
           } else {
              tColumeStr += ',' + tKey;
              tValueStr += ',' + `${tKey} = '${tValue}'`;
           }
       }
       var tRetSql : string = 'update ' + argTable + ' set ' + tValueStr + ' ';
       return (tRetSql);
    }
}

const AFLib = new CommLib();

export default AFLib;

