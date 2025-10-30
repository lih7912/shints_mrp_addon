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

    var sql0_1 : string =  `
        select * from neoe.ma_codedtl
        where cd_sysdef = '10802'
    `;

    var sql0 : string =  `
        select cd_mngd, nm_mngd  from neoe.fi_mngd
        where cd_mng = '${argPuCd}'
    `;


    var obj0 : any[]  =  await prisma.$queryRaw(Prisma.raw(sql0));

    var tIdx :number = 0; 
    var tArray = [];
    for (tIdx = 0; tIdx < obj0.length; tIdx++) {
        var tOne : Object  = { ...obj0[tIdx] };

        var cd_mngd = tOne['cd_mngd'];
        var nm_mngd = tOne['nm_mngd'];

        console.log(`${cd_mngd}/${nm_mngd}`);
    }

}

var tPuCd = process.argv[2];
process1(tPuCd);

