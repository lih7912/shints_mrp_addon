const path = require('path');
const fs = require('fs');

var request_sync = require('sync-request');
var rp = require('request-promise');
const multiparty = require('multiparty');
var amqp = require('amqplib/callback_api');
var iconv = require('iconv-lite');

import { Prisma } from "@prisma/client";
import prisma from "./db";  //PrismaClient 사용하기 위해 불러오기
import AFLib from "./commlib";  //PrismaClient 사용하기 위해 불러오기

const process1 = async(argPuCd:string) => {

    var tRetDate: string = AFLib.getCurrTime();
    var tRetDate1: string = tRetDate.substring(0, 8);

    var sql0 : string =  `
        select cd_acct, count(*) as c_cnt from neoe.fi_adocu
        where dt_acct >= '20240601' and dt_acct <= '20241231'
        group by cd_acct
        order by c_cnt
    `;

    var sql1 : string =  `
        select row_id, row_no, cd_acct , amt, nm_note  
        from neoe.fi_adocu
        where row_id in 
        (
        select distinct row_id 
        from neoe.fi_adocu
        where dt_acct >= '20240601' and dt_acct <= '20241231'
        and  cd_acct = '${argPuCd}'
        )
        order by row_id, row_no
    `;

    var obj0 : any[]  =  await prisma.$queryRaw(Prisma.raw(sql1));

    var tIdx :number = 0; 
    var tArray = [];
    for (tIdx = 0; tIdx < obj0.length; tIdx++) {
        var tOne : Object  = { ...obj0[tIdx] };

        var row_id  = tOne['row_id'];
        var row_no  = tOne['row_no'];
        var cd_acct  = tOne['cd_acct'];
        var amt  = tOne['amt'];
        var nm_note  = tOne['nm_note'];

        console.log(`${row_id}/${row_no}/${cd_acct}/${amt}/${nm_note}`);

         /*
        var cd_acct = tOne['cd_acct']; 
        var cnt =  tOne['c_cnt']; 
        console.log(`${cd_acct}/${cnt}`);
         */

    }

}

var tPuCd = process.argv[2];
process1(tPuCd);

