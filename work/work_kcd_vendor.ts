const { MongoClient } = require('mongodb');
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
        select isnull(REG_NO, '') as REG_NO, isnull(VENDOR_CD, '') as VENDOR_CD  
        from kcd_vendor
    `;
    var obj0 : any[]  =  await prisma.$queryRaw(Prisma.raw(sql0));

    var tIdx :number = 0; 
    var tArray = [];
    for (tIdx = 0; tIdx < obj0.length; tIdx++) {
        var tOne : Object  = { ...obj0[tIdx] };

        var tRegNo  = tOne['REG_NO'];
        var tVendorCd  = tOne['VENDOR_CD'];

        var tVal = tRegNo.replace(/-/gi, '');
        tVal = tVal.replace(/_/gi, '');
        tVal = tVal.replace(/ /gi, '');

        var sql1 : string =  `
            update kcd_vendor set chk_reg_no = '${tVal}' where vendor_cd = '${tVendorCd}'
        `;
        var obj1 : any[]  =  await prisma.$queryRaw(Prisma.raw(sql1));
    }

}

var tPuCd = process.argv[2];
process1(tPuCd);

