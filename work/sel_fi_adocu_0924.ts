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
        select cd_acct, row_id  from neoe.fi_adocu
        where dt_acct >= '20250101' and dt_acct <= '20251231'
        and   left(row_id, 2) = 'IM' 
        and   row_no = '1'
    `;
    var obj0 : any[]  =  await prisma.$queryRaw(Prisma.raw(sql0));

    var tIdx :number = 0; 
    var tArray = [];
    for (tIdx = 0; tIdx < obj0.length; tIdx++) {
        var tOne : Object  = { ...obj0[tIdx] };

        var cd_acct  = tOne['cd_acct'];
        var row_id  = tOne['row_id'];

        console.log(`${cd_acct}/${row_id}`);

         /*
        var cd_acct = tOne['cd_acct']; 
        var cnt =  tOne['c_cnt']; 
        console.log(`${cd_acct}/${cnt}`);
         */

    }

}

var tPuCd = process.argv[2];
process1(tPuCd);

