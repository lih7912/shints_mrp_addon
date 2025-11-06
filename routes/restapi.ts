const Joi = require('joi');
const sharp = require('sharp');
const Guid = require('guid');
const router = require('express').Router;
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
var request_sync = require('sync-request');
var rp = require('request-promise');
const multiparty = require('multiparty');
var amqp = require('amqplib/callback_api');
var iconv = require('iconv-lite');

import {
    Prisma
} from "@prisma/client";
import prisma from "../src/db";

const restApi = router();

restApi.all('/fileupload/:kind/:filename', async (req, res) => {

    const tKind = req.params.kind;
    const tFileName = req.params.filename;


    const tCols = __dirname.split('/');
    var tPath = '';
    var tIdx = 0;
    for (tIdx = 0; tIdx < tCols.length - 1; tIdx++) {
        tPath += tCols[tIdx] + '/';
    }

    // const file = `${__dirname}/${tKind}/${tFileName}`;
    const file = `${tPath}upload/${tKind}/${tFileName}`;

    try {

        if (!req.files) {
            console.log("fileupload(no file):===>" + tKind + "," + tFileName + "," + file);
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let in_doc = req.files.account_doc;
            // let in_doc = req.files.file;
            // console.log(JSON.stringify(in_doc));
            if (in_doc.name.includes(".pdf")) file += ".pdf";
            else if (in_doc.name.includes("jpg")) file += ".jpg";
            else if (in_doc.name.includes("png")) file += ".png";

            in_doc.mv(file);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: in_doc.name,
                    mimetype: in_doc.mimetype,
                    size: in_doc.size
                }
            });
        }


    } catch (err) {
        res.status(500).send(err);
    }

});


restApi.all('/fileupload/:kind/:kind2/:filename', async (req, res) => {

    const tKind = req.params.kind;
    const tKind2 = req.params.kind2;
    const tFileName = req.params.filename;

    const tCols = __dirname.split('/');
    var tPath = '';
    var tIdx = 0;
    for (tIdx = 0; tIdx < tCols.length - 1; tIdx++) {
        tPath += tCols[tIdx] + '/';
    }

    // const file = `${__dirname}/${tKind}/${tFileName}`;
    const file = `${tPath}upload/${tKind}/${tKind2}/${tFileName}`;

    try {

        if (!req.files) {
            console.log("fileupload(no file):===>" + tKind + "," + tFileName + "," + file);
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let in_doc = '';
            if (tKind2 === 'file1') in_doc = req.files.file1_doc;
            if (tKind2 === 'file2') in_doc = req.files.file2_doc;
            if (tKind2 === 'file3') in_doc = req.files.file3_doc;
            // let in_doc = req.files.file;
            // console.log(JSON.stringify(in_doc));
            if (in_doc.name.includes(".pdf")) file += ".pdf";
            else if (in_doc.name.includes("jpg")) file += ".jpg";
            else if (in_doc.name.includes("png")) file += ".png";

            in_doc.mv(file);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: in_doc.name,
                    mimetype: in_doc.mimetype,
                    size: in_doc.size
                }
            });
        }


    } catch (err) {
        res.status(500).send(err);
    }

});

restApi.all('/filedown/:kind/:filename', async (req, res) => {

    const tKind = req.params.kind;
    const tFileName = req.params.filename;

    const tCols = __dirname.split('/');
    var tPath = '/';
    var tIdx = 0;
    for (tIdx = 0; tIdx < tCols.length - 1; tIdx++) {
        tPath += tCols[tIdx] + '/';
    }

    // const file = `${__dirname}/${tKind}/${tFileName}`;
    const file = `${tPath}upload/${tKind}/${tFileName}`;

    res.download(file); // Set disposition and send it.
});

restApi.all('/filedown/:kind/:kind2/:filename', async (req, res) => {

    const tKind = req.params.kind;
    const tKind2 = req.params.kind2;
    const tFileName = req.params.filename;

    const tCols = __dirname.split('/');
    var tPath = '/';
    var tIdx = 0;
    for (tIdx = 0; tIdx < tCols.length - 1; tIdx++) {
        tPath += tCols[tIdx] + '/';
    }

    // const file = `${__dirname}/${tKind}/${tKind2}/${tFileName}`;
    const file = `${tPath}upload/${tKind}/${tKind2}/${tFileName}`;

    res.download(file); // Set disposition and send it.
});


restApi.all('/test', async (req, res) => {

    let sqlStr = `
select nm_mngd, cd_mngd
from neoe.fi_mngd
where cd_mng = 'a23' and cd_company = '1000'
order by cd_mngd
         `;
    var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

    // var tRet = await prisma.KCD_CODE.findMany();
    console.log(JSON.stringify(tRet));
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })
    // res.status(200);
    res.end(JSON.stringify(tRet));


    /*
	res.status (200); // OK
  var retObj = {};
  retObj.status = '200';
  retObj.message = 'TEST';
  res.end (JSON.stringify(retObj));
  */

});

restApi.all('/get_docuseq/:curr_date', async (req, res) => {

    const tCurrDate = req.params.curr_date;

    let sqlStr = ` 
    select isnull(max(no_docu),'00000')
      from neoe.fi_adocu 
      where no_docu like 'DM${tCurrDate}%' 
         `;
    /*
      let sqlStr = ` 
        select top 1 *
          from neoe.fi_adocu 
          where no_docu like 'DM%' 
          order by dt_acct desc
             `;
    */
    var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));

    // var tRet = await prisma.KCD_CODE.findMany();
    console.log(JSON.stringify(tRet, null, 4));
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })
    // res.status(200);
    res.end(JSON.stringify(tRet));


    /*
	res.status (200); // OK
  var retObj = {};
  retObj.status = '200';
  retObj.message = 'TEST';
  res.end (JSON.stringify(retObj));
  */

});

restApi.all('/del_docuseq/:docu_no', async (req, res) => {
    const tDocuNo = req.params.docu_no;
    let sqlStr = ` 
    select top 1 tp_docu 
      from neoe.fi_adocu 
      where no_docu = '${tDocuNo}' 
      `;
    var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr));
    var tTpDocu = '';
    if (tRet.length > 0) {
        tTpDocu = tRet[0].tp_docu;
    }

    var tRetArray = [];
    try {
        if (tTpDocu === 'Y') {
            var tObj = {};
            tObj.MESSAGE = 'ERROR:이미 더존회계 처리된 전표는 취소할수 없습니다';
            tObj.DOCU_NO = tDocuNo;
            tRetArray.push(tObj);
        } else {
            let sqlStr1 = ` 
             delete from neoe.fi_adocu  
             where no_docu = '${tDocuNo}' 
          `;
            var tRet = await prisma.$queryRaw(Prisma.raw(sqlStr1));
            var tObj = {};
            tObj.MESSAGE = 'SUCCESS:전표를 삭제했습니다';
            tObj.DOCU_NO = tDocuNo;
            tRetArray.push(tObj);
        }
    } catch (e) {
        var tObj = {};
        tObj.MESSAGE = `ERROR:전표삭제중 에러(${e.message})`;
        tObj.DOCU_NO = tDocuNo;
        tRetArray.push(tObj);
    }

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })
    res.end(JSON.stringify(tRetArray));

});

restApi.all('/insert_docu_oversea_product/:user_id', async (req, res) => {
    var tInData = [...req.body];
    console.log(tInData);
    console.log(tInData.length);

    var tRetArray = [];
    var tIdx = 0;
    for (tIdx = 0; tIdx < tInData.length; tIdx++) {
        var col = {
            ...tInData[tIdx].DATA1
        };
        var col2 = {
            ...tInData[tIdx].DATA2
        };
        var col3 = {
            ...tInData[tIdx].DATA3
        };

        let sql0 = `
             select cd_sysdef
             from neoe.ma_codedtl
             where cd_field='MA_B000005'
             and cd_company = '1000'
             and nm_sysdef = '${col.nm_mngd4}'
              `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        var strNeoeCurrCd = '';
        if (tRet0.length > 0) strNeoeCurrCd = tRet0[0].cd_sysdef;
        col.cd_exch = strNeoeCurrCd;
        console.log(strNeoeCurrCd);

        let sql1 = `
             select rate_base
             from neoe.ma_exchange
             where curr_sour = '${strNeoeCurrCd}'
             and   yymmdd = '${col.dt_acct}'
              `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        var strRateBase = '1';
        if (tRet1.length > 0) strRateBase = tRet1[0].rate_base;
        col.rt_exch = strRateBase;
        console.log(strRateBase);

        let sql6 = `
              select nm_mngd
              from neoe.fi_mngd
              where cd_mngd = '${col.AF_A23_CODE}'
              and cd_mng='a23'
              and cd_company='1000'
              `;
        var tRet6 = await prisma.$queryRaw(Prisma.raw(sql6));
        var strA23Name = '';
        if (tRet6.length > 0) strA23Name = tRet6[0].nm_mngd;
        col2.nm_mngd3 = strA23Name;
        console.log(strA23Name);

        let sql7 = `
              select isnull(max(no_docu),'00000') as max_seq
              from neoe.fi_adocu
              where no_docu like 'IS${col.dt_acct}%'
              `;
        var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
        var tMaxDocuNo = 1;
        if (tRet7[0].max_seq === '00000') {
            tMaxDocuNo = parseFloat(tRet7[0].max_seq) + 1;
        } else {
            tMaxDocuNo = parseFloat(tRet7[0].max_seq.substring(10, 15)) + 1;
        }

        var tZero = '00000';
        var strMaxDocuNo = tZero.substring(0, 5 - String(tMaxDocuNo).length) + String(tMaxDocuNo);
        var strDocuNo = `IS${col.dt_acct}${strMaxDocuNo}`;
        var strTaxNo = `${strDocuNo}001`;

        console.log(col);
        console.log(col2);
        console.log(col3);

        col.row_id = strDocuNo;
        col.no_docu = strDocuNo;

        var tSQLArray = [];
        let sql99 = `
              insert into neoe.fi_adocu (
                  row_id,
                  row_no,
                  no_tax,
                  cd_pc,
                  cd_wdept,
                  no_docu,
                  no_doline,
                  cd_company,
                  id_write,
                  cd_docu,
                  dt_acct,
                  st_docu,
                  tp_drcr,
                  cd_acct,
                  amt,
                  cd_pjt,
                  cd_partner,
                  dt_start,
                  dt_end,
                  am_taxstd,
                  am_addtax,
                  tp_tax,
                  no_company,
                  nm_note,
                  cd_bizarea,
                  cd_cc,
                  ucd_mng1,
                  ucd_mng2,
                  ucd_mng3,
                  ucd_mng4,
                  ucd_mng5,
                  tp_docu,
                  no_acct,
                  cd_exch,
                  rt_exch,
                  am_ex,
                  no_to,
                  dt_shipping,
                  tp_gubun,
                  md_tax1,
                  nm_item1,
                  nm_size1,
                  qt_tax1,
                  am_prc1,
                  am_supply1,
                  am_tax1,
                  nm_note1,
                  cd_mngd1,
                  nm_mngd1,
                  cd_mngd2,
                  nm_mngd2,
                  cd_mngd3,
                  nm_mngd3,
                  cd_mngd4,
                  nm_mngd4,
                  cd_mngd5,
                  nm_mngd5,
                  cd_mngd6,
                  nm_mngd6,
                  cd_mngd7,
                  nm_mngd7,
                  cd_mngd8,
                  nm_mngd8,
                  yn_iss,
                  final_status
              ) values (
                '${col.row_id}',
                '${col.row_no}',
                '${col.no_tax}',
                '${col.cd_pc}',
                '${col.cd_wdept}',
                '${col.no_docu}',
                '${col.no_doline}',
                '${col.cd_company}',
                '${col.id_write}',
                '${col.cd_docu}',
                '${col.dt_acct}',
                '${col.st_docu}',
                '${col.tp_drcr}',
                '${col.cd_acct}',
                '${col.amt}',
                '${col.cd_pjt}',
                '${col.cd_partner}',
                '${col.dt_start}',
                '${col.dt_end}',
                '${col.am_taxstd}',
                '${col.am_addtax}',
                '${col.tp_tax}',
                '${col.no_company}',
                '${col.nm_note}',
                '${col.cd_bizarea}',
                '${col.cd_cc}',
                '${col.ucd_mng1}',
                '${col.ucd_mng2}',
                '${col.ucd_mng3}',
                '${col.ucd_mng4}',
                '${col.ucd_mng5}',
                '${col.tp_docu}',
                '${col.no_acct}',
                '${col.cd_exch}',
                '${col.rt_exch}',
                '${col.am_ex}',
                '${col.no_to}',
                '${col.dt_shipping}',
                '${col.tp_gubun}',
                '${col.md_tax1}',
                '${col.nm_item1}',
                '${col.nm_size1}',
                '${col.qt_tax1}',
                '${col.am_prc1}',
                '${col.am_supply1}',
                '${col.am_tax1}',
                '${col.nm_note1}',
                '${col.cd_mngd1}',
                '${col.nm_mngd1}',
                '${col.cd_mngd2}',
                '${col.nm_mngd2}',
                '${col.cd_mngd3}',
                '${col.nm_mngd3}',
                '${col.cd_mngd4}',
                '${col.nm_mngd4}',
                '${col.cd_mngd5}',
                '${col.nm_mngd5}',
                '${col.cd_mngd6}',
                '${col.nm_mngd6}',
                '${col.cd_mngd7}',
                '${col.nm_mngd7}',
                '${col.cd_mngd8}',
                '${col.nm_mngd8}',
                '${col.yn_iss}',
                '${col.final_status}'
              )
              `;
        var tRet99 = prisma.$queryRaw(Prisma.raw(sql99));
        tSQLArray.push(tRet99);

        if (typeof col2.row_id !== 'undefined') {

            col2.row_id = strDocuNo;
            col2.no_docu = strDocuNo;

            let sql99 = `
                insert into neoe.fi_adocu (
                  row_id,
                  row_no,
                  no_tax,
                  cd_pc,
                  cd_wdept,
                  no_docu,
                  no_doline,
                  cd_company,
                  id_write,
                  cd_docu,
                  dt_acct,
                  st_docu,
                  tp_drcr,
                  cd_acct,
                  amt,
                  cd_pjt,
                  cd_partner,
                  dt_start,
                  dt_end,
                  am_taxstd,
                  am_addtax,
                  tp_tax,
                  no_company,
                  nm_note,
                  cd_bizarea,
                  cd_cc,
                  ucd_mng1,
                  ucd_mng2,
                  ucd_mng3,
                  ucd_mng4,
                  ucd_mng5,
                  tp_docu,
                  no_acct,
                  cd_exch,
                  rt_exch,
                  am_ex,
                  no_to,
                  dt_shipping,
                  tp_gubun,
                  md_tax1,
                  nm_item1,
                  nm_size1,
                  qt_tax1,
                  am_prc1,
                  am_supply1,
                  am_tax1,
                  nm_note1,
                  cd_mngd1,
                  nm_mngd1,
                  cd_mngd2,
                  nm_mngd2,
                  cd_mngd3,
                  nm_mngd3,
                  cd_mngd4,
                  nm_mngd4,
                  cd_mngd5,
                  nm_mngd5,
                  cd_mngd6,
                  nm_mngd6,
                  cd_mngd7,
                  nm_mngd7,
                  cd_mngd8,
                  nm_mngd8,
                  yn_iss,
                  final_status
              ) values (
                '${col2.row_id}',
                '${col2.row_no}',
                '${col2.no_tax}',
                '${col2.cd_pc}',
                '${col2.cd_wdept}',
                '${col2.no_docu}',
                '${col2.no_doline}',
                '${col2.cd_company}',
                '${col2.id_write}',
                '${col2.cd_docu}',
                '${col2.dt_acct}',
                '${col2.st_docu}',
                '${col2.tp_drcr}',
                '${col2.cd_acct}',
                '${col2.amt}',
                '',
                '${col2.cd_partner}',
                '${col2.dt_start}',
                '${col2.dt_end}',
                '${col2.am_taxstd}',
                '${col2.am_addtax}',
                '${col2.tp_tax}',
                '${col2.no_company}',
                '${col2.nm_note}',
                '${col2.cd_bizarea}',
                '${col2.cd_cc}',
                '${col2.ucd_mng1}',
                '${col2.ucd_mng2}',
                '${col2.ucd_mng3}',
                '${col2.ucd_mng4}',
                '${col2.ucd_mng5}',
                '${col2.tp_docu}',
                '${col2.no_acct}',
                '${col2.cd_exch}',
                '${col2.rt_exch}',
                '${col2.am_ex}',
                '${col2.no_to}',
                '${col2.dt_shipping}',
                '${col2.tp_gubun}',
                '${col2.md_tax1}',
                '${col2.nm_item1}',
                '${col2.nm_size1}',
                '${col2.qt_tax1}',
                '${col2.am_prc1}',
                '${col2.am_supply1}',
                '${col2.am_tax1}',
                '${col2.nm_note1}',
                '${col2.cd_mngd1}',
                '${col2.nm_mngd1}',
                '${col2.cd_mngd2}',
                '${col2.nm_mngd2}',
                '${col2.cd_mngd3}',
                '${col2.nm_mngd3}',
                '${col2.cd_mngd4}',
                '${col2.nm_mngd4}',
                '${col2.cd_mngd5}',
                '${col2.nm_mngd5}',
                '${col2.cd_mngd6}',
                '${col2.nm_mngd6}',
                '${col2.cd_mngd7}',
                '${col2.nm_mngd7}',
                '${col2.cd_mngd8}',
                '${col2.nm_mngd8}',
                '${col2.yn_iss}',
                '${col2.final_status}'
              )
              `;
            var tRet99 = prisma.$queryRaw(Prisma.raw(sql99));
            tSQLArray.push(tRet99);
        }



        col3.row_id = strDocuNo;
        col3.no_docu = strDocuNo;

        let sql99 = `
              insert into neoe.fi_adocu (
                  row_id,
                  row_no,
                  no_tax,
                  cd_pc,
                  cd_wdept,
                  no_docu,
                  no_doline,
                  cd_company,
                  id_write,
                  cd_docu,
                  dt_acct,
                  st_docu,
                  tp_drcr,
                  cd_acct,
                  amt,
                  cd_pjt,
                  cd_partner,
                  dt_start,
                  dt_end,
                  am_taxstd,
                  am_addtax,
                  tp_tax,
                  no_company,
                  nm_note,
                  cd_bizarea,
                  cd_cc,
                  ucd_mng1,
                  ucd_mng2,
                  ucd_mng3,
                  ucd_mng4,
                  ucd_mng5,
                  tp_docu,
                  no_acct,
                  cd_exch,
                  rt_exch,
                  am_ex,
                  no_to,
                  dt_shipping,
                  tp_gubun,
                  md_tax1,
                  nm_item1,
                  nm_size1,
                  qt_tax1,
                  am_prc1,
                  am_supply1,
                  am_tax1,
                  nm_note1,
                  cd_mngd1,
                  nm_mngd1,
                  cd_mngd2,
                  nm_mngd2,
                  cd_mngd3,
                  nm_mngd3,
                  cd_mngd4,
                  nm_mngd4,
                  cd_mngd5,
                  nm_mngd5,
                  cd_mngd6,
                  nm_mngd6,
                  cd_mngd7,
                  nm_mngd7,
                  cd_mngd8,
                  nm_mngd8,
                  yn_iss,
                  final_status
              ) values (
                '${col3.row_id}',
                '${col3.row_no}',
                '${col3.no_tax}',
                '${col3.cd_pc}',
                '${col3.cd_wdept}',
                '${col3.no_docu}',
                '${col3.no_doline}',
                '${col3.cd_company}',
                '${col3.id_write}',
                '${col3.cd_docu}',
                '${col3.dt_acct}',
                '${col3.st_docu}',
                '${col3.tp_drcr}',
                '${col3.cd_acct}',
                '${col3.amt}',
                '${col3.cd_pjt}',
                '${col3.cd_partner}',
                '${col3.dt_start}',
                '${col3.dt_end}',
                '${col3.am_taxstd}',
                '${col3.am_addtax}',
                '${col3.tp_tax}',
                '${col3.no_company}',
                '${col3.nm_note}',
                '${col3.cd_bizarea}',
                '${col3.cd_cc}',
                '${col3.ucd_mng1}',
                '${col3.ucd_mng2}',
                '${col3.ucd_mng3}',
                '${col3.ucd_mng4}',
                '${col3.ucd_mng5}',
                '${col3.tp_docu}',
                '${col3.no_acct}',
                '${col3.cd_exch}',
                '${col3.rt_exch}',
                '${col3.am_ex}',
                '${col3.no_to}',
                '${col3.dt_shipping}',
                '${col3.tp_gubun}',
                '${col3.md_tax1}',
                '${col3.nm_item1}',
                '${col3.nm_size1}',
                '${col3.qt_tax1}',
                '${col3.am_prc1}',
                '${col3.am_supply1}',
                '${col3.am_tax1}',
                '${col3.nm_note1}',
                '${col3.cd_mngd1}',
                '${col3.nm_mngd1}',
                '${col3.cd_mngd2}',
                '${col3.nm_mngd2}',
                '${col3.cd_mngd3}',
                '${col3.nm_mngd3}',
                '${col3.cd_mngd4}',
                '${col3.nm_mngd4}',
                '${col3.cd_mngd5}',
                '${col3.nm_mngd5}',
                '${col3.cd_mngd6}',
                '${col3.nm_mngd6}',
                '${col3.cd_mngd7}',
                '${col3.nm_mngd7}',
                '${col3.cd_mngd8}',
                '${col3.nm_mngd8}',
                '${col3.yn_iss}',
                '${col3.final_status}'
              )
              `;
        var tRet99 = prisma.$queryRaw(Prisma.raw(sql99));
        tSQLArray.push(tRet99);

        try {
            await prisma.$transaction(tSQLArray);
            var tObj = {};
            tObj.INVOICE_NO = col.nm_note;
            tObj.DOCU_NO = strDocuNo;
            tRetArray.push(tObj);
        } catch (e) {
            console.log(`ERROR: insert Docu:${e.message}`);;
        }

    }

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })
    res.end(JSON.stringify(tRetArray));

});


restApi.all('/insert_docu_domestic_product/:user_id', async (req, res) => {
    var tInData = [...req.body];
    console.log(tInData);
    console.log(tInData.length);

    var tRetArray = [];
    var tIdx = 0;
    for (tIdx = 0; tIdx < tInData.length; tIdx++) {
        var col = {
            ...tInData[tIdx].DATA1
        };
        var col2 = {
            ...tInData[tIdx].DATA2
        };
        var col3 = {
            ...tInData[tIdx].DATA3
        };

        let sql0 = `
             select cd_sysdef
             from neoe.ma_codedtl
             where cd_field='MA_B000005'
             and cd_company = '1000'
             and nm_sysdef = '${col.nm_mngd4}'
              `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        var strNeoeCurrCd = '';
        if (tRet0.length > 0) strNeoeCurrCd = tRet0[0].cd_sysdef;
        col.cd_exch = strNeoeCurrCd;
        console.log(strNeoeCurrCd);

        let sql1 = `
             select rate_base
             from neoe.ma_exchange
             where curr_sour = '${strNeoeCurrCd}'
             and   yymmdd = '${col.dt_acct}'
              `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        var strRateBase = '1';
        if (tRet1.length > 0) strRateBase = tRet1[0].rate_base;
        col.rt_exch = strRateBase;
        console.log(strRateBase);

        let sql6 = `
              select nm_mngd
              from neoe.fi_mngd
              where cd_mngd = '${col.AF_A23_CODE}'
              and cd_mng='a23'
              and cd_company='1000'
              `;
        var tRet6 = await prisma.$queryRaw(Prisma.raw(sql6));
        var strA23Name = '';
        if (tRet6.length > 0) strA23Name = tRet6[0].nm_mngd;
        col2.nm_mngd3 = strA23Name;
        console.log(strA23Name);

        let sql7 = `
              select isnull(max(no_docu),'00000') as max_seq
              from neoe.fi_adocu
              where no_docu like 'IS${col.dt_acct}%'
              `;
        var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
        var tMaxDocuNo = 1;
        if (tRet7[0].max_seq === '00000') {
            tMaxDocuNo = parseFloat(tRet7[0].max_seq) + 1;
        } else {
            tMaxDocuNo = parseFloat(tRet7[0].max_seq.substring(10, 15)) + 1;
        }

        var tZero = '00000';
        var strMaxDocuNo = tZero.substring(0, 5 - String(tMaxDocuNo).length) + String(tMaxDocuNo);
        var strDocuNo = `IS${col.dt_acct}${strMaxDocuNo}`;
        var strTaxNo = `${strDocuNo}001`;

        console.log(col);
        console.log(col2);
        console.log(col3);

        col.row_id = strDocuNo;
        col.no_docu = strDocuNo;

        var tSQLArray = [];
        let sql99 = `
              insert into neoe.fi_adocu (
                  row_id,
                  row_no,
                  no_tax,
                  cd_pc,
                  cd_wdept,
                  no_docu,
                  no_doline,
                  cd_company,
                  id_write,
                  cd_docu,
                  dt_acct,
                  st_docu,
                  tp_drcr,
                  cd_acct,
                  amt,
                  cd_pjt,
                  cd_partner,
                  dt_start,
                  dt_end,
                  am_taxstd,
                  am_addtax,
                  tp_tax,
                  no_company,
                  nm_note,
                  cd_bizarea,
                  cd_cc,
                  ucd_mng1,
                  ucd_mng2,
                  ucd_mng3,
                  ucd_mng4,
                  ucd_mng5,
                  tp_docu,
                  no_acct,
                  cd_exch,
                  rt_exch,
                  am_ex,
                  no_to,
                  dt_shipping,
                  tp_gubun,
                  md_tax1,
                  nm_item1,
                  nm_size1,
                  qt_tax1,
                  am_prc1,
                  am_supply1,
                  am_tax1,
                  nm_note1,
                  cd_mngd1,
                  nm_mngd1,
                  cd_mngd2,
                  nm_mngd2,
                  cd_mngd3,
                  nm_mngd3,
                  cd_mngd4,
                  nm_mngd4,
                  cd_mngd5,
                  nm_mngd5,
                  cd_mngd6,
                  nm_mngd6,
                  cd_mngd7,
                  nm_mngd7,
                  cd_mngd8,
                  nm_mngd8,
                  yn_iss,
                  final_status
              ) values (
                '${col.row_id}',
                '${col.row_no}',
                '${col.no_tax}',
                '${col.cd_pc}',
                '${col.cd_wdept}',
                '${col.no_docu}',
                '${col.no_doline}',
                '${col.cd_company}',
                '${col.id_write}',
                '${col.cd_docu}',
                '${col.dt_acct}',
                '${col.st_docu}',
                '${col.tp_drcr}',
                '${col.cd_acct}',
                '${col.amt}',
                '',
                '${col.cd_partner}',
                '${col.dt_start}',
                '${col.dt_end}',
                '${col.am_taxstd}',
                '${col.am_addtax}',
                '${col.tp_tax}',
                '${col.no_company}',
                '${col.nm_note}',
                '${col.cd_bizarea}',
                '${col.cd_cc}',
                '${col.ucd_mng1}',
                '${col.ucd_mng2}',
                '${col.ucd_mng3}',
                '${col.ucd_mng4}',
                '${col.ucd_mng5}',
                '${col.tp_docu}',
                '${col.no_acct}',
                '${col.cd_exch}',
                '${col.rt_exch}',
                '${col.am_ex}',
                '${col.no_to}',
                '${col.dt_shipping}',
                '${col.tp_gubun}',
                '${col.md_tax1}',
                '${col.nm_item1}',
                '${col.nm_size1}',
                '${col.qt_tax1}',
                '${col.am_prc1}',
                '${col.am_supply1}',
                '${col.am_tax1}',
                '${col.nm_note1}',
                '${col.cd_mngd1}',
                '${col.nm_mngd1}',
                '${col.cd_mngd2}',
                '${col.nm_mngd2}',
                '${col.cd_mngd3}',
                '${col.nm_mngd3}',
                '${col.cd_mngd4}',
                '${col.nm_mngd4}',
                '${col.cd_mngd5}',
                '${col.nm_mngd5}',
                '${col.cd_mngd6}',
                '${col.nm_mngd6}',
                '${col.cd_mngd7}',
                '${col.nm_mngd7}',
                '${col.cd_mngd8}',
                '${col.nm_mngd8}',
                '${col.yn_iss}',
                '${col.final_status}'
              )
              `;
        var tRet99 = prisma.$queryRaw(Prisma.raw(sql99));
        tSQLArray.push(tRet99);

        if (typeof col2.row_id !== 'undefined') {

            col2.row_id = strDocuNo;
            col2.no_docu = strDocuNo;

            let sql99 = `
                insert into neoe.fi_adocu (
                  row_id,
                  row_no,
                  no_tax,
                  cd_pc,
                  cd_wdept,
                  no_docu,
                  no_doline,
                  cd_company,
                  id_write,
                  cd_docu,
                  dt_acct,
                  st_docu,
                  tp_drcr,
                  cd_acct,
                  amt,
                  cd_pjt,
                  cd_partner,
                  dt_start,
                  dt_end,
                  am_taxstd,
                  am_addtax,
                  tp_tax,
                  no_company,
                  nm_note,
                  cd_bizarea,
                  cd_cc,
                  ucd_mng1,
                  ucd_mng2,
                  ucd_mng3,
                  ucd_mng4,
                  ucd_mng5,
                  tp_docu,
                  no_acct,
                  cd_exch,
                  rt_exch,
                  am_ex,
                  no_to,
                  dt_shipping,
                  tp_gubun,
                  md_tax1,
                  nm_item1,
                  nm_size1,
                  qt_tax1,
                  am_prc1,
                  am_supply1,
                  am_tax1,
                  nm_note1,
                  cd_mngd1,
                  nm_mngd1,
                  cd_mngd2,
                  nm_mngd2,
                  cd_mngd3,
                  nm_mngd3,
                  cd_mngd4,
                  nm_mngd4,
                  cd_mngd5,
                  nm_mngd5,
                  cd_mngd6,
                  nm_mngd6,
                  cd_mngd7,
                  nm_mngd7,
                  cd_mngd8,
                  nm_mngd8,
                  yn_iss,
                  final_status
              ) values (
                '${col2.row_id}',
                '${col2.row_no}',
                '${col2.no_tax}',
                '${col2.cd_pc}',
                '${col2.cd_wdept}',
                '${col2.no_docu}',
                '${col2.no_doline}',
                '${col2.cd_company}',
                '${col2.id_write}',
                '${col2.cd_docu}',
                '${col2.dt_acct}',
                '${col2.st_docu}',
                '${col2.tp_drcr}',
                '${col2.cd_acct}',
                '${col2.amt}',
                '',
                '${col2.cd_partner}',
                '${col2.dt_start}',
                '${col2.dt_end}',
                '${col2.am_taxstd}',
                '${col2.am_addtax}',
                '${col2.tp_tax}',
                '${col2.no_company}',
                '${col2.nm_note}',
                '${col2.cd_bizarea}',
                '${col2.cd_cc}',
                '${col2.ucd_mng1}',
                '${col2.ucd_mng2}',
                '${col2.ucd_mng3}',
                '${col2.ucd_mng4}',
                '${col2.ucd_mng5}',
                '${col2.tp_docu}',
                '${col2.no_acct}',
                '${col2.cd_exch}',
                '${col2.rt_exch}',
                '${col2.am_ex}',
                '${col2.no_to}',
                '${col2.dt_shipping}',
                '${col2.tp_gubun}',
                '${col2.md_tax1}',
                '${col2.nm_item1}',
                '${col2.nm_size1}',
                '${col2.qt_tax1}',
                '${col2.am_prc1}',
                '${col2.am_supply1}',
                '${col2.am_tax1}',
                '${col2.nm_note1}',
                '${col2.cd_mngd1}',
                '${col2.nm_mngd1}',
                '${col2.cd_mngd2}',
                '${col2.nm_mngd2}',
                '${col2.cd_mngd3}',
                '${col2.nm_mngd3}',
                '${col2.cd_mngd4}',
                '${col2.nm_mngd4}',
                '${col2.cd_mngd5}',
                '${col2.nm_mngd5}',
                '${col2.cd_mngd6}',
                '${col2.nm_mngd6}',
                '${col2.cd_mngd7}',
                '${col2.nm_mngd7}',
                '${col2.cd_mngd8}',
                '${col2.nm_mngd8}',
                '${col2.yn_iss}',
                '${col2.final_status}'
              )
              `;
            var tRet99 = prisma.$queryRaw(Prisma.raw(sql99));
            tSQLArray.push(tRet99);
        }


        col3.row_id = strDocuNo;
        col3.no_docu = strDocuNo;

        let sql99 = `
              insert into neoe.fi_adocu (
                  row_id,
                  row_no,
                  no_tax,
                  cd_pc,
                  cd_wdept,
                  no_docu,
                  no_doline,
                  cd_company,
                  id_write,
                  cd_docu,
                  dt_acct,
                  st_docu,
                  tp_drcr,
                  cd_acct,
                  amt,
                  cd_pjt,
                  cd_partner,
                  dt_start,
                  dt_end,
                  am_taxstd,
                  am_addtax,
                  tp_tax,
                  no_company,
                  nm_note,
                  cd_bizarea,
                  cd_cc,
                  ucd_mng1,
                  ucd_mng2,
                  ucd_mng3,
                  ucd_mng4,
                  ucd_mng5,
                  tp_docu,
                  no_acct,
                  cd_exch,
                  rt_exch,
                  am_ex,
                  no_to,
                  dt_shipping,
                  tp_gubun,
                  md_tax1,
                  nm_item1,
                  nm_size1,
                  qt_tax1,
                  am_prc1,
                  am_supply1,
                  am_tax1,
                  nm_note1,
                  cd_mngd1,
                  nm_mngd1,
                  cd_mngd2,
                  nm_mngd2,
                  cd_mngd3,
                  nm_mngd3,
                  cd_mngd4,
                  nm_mngd4,
                  cd_mngd5,
                  nm_mngd5,
                  cd_mngd6,
                  nm_mngd6,
                  cd_mngd7,
                  nm_mngd7,
                  cd_mngd8,
                  nm_mngd8,
                  yn_iss,
                  final_status
              ) values (
                '${col3.row_id}',
                '${col3.row_no}',
                '${col3.no_tax}',
                '${col3.cd_pc}',
                '${col3.cd_wdept}',
                '${col3.no_docu}',
                '${col3.no_doline}',
                '${col3.cd_company}',
                '${col3.id_write}',
                '${col3.cd_docu}',
                '${col3.dt_acct}',
                '${col3.st_docu}',
                '${col3.tp_drcr}',
                '${col3.cd_acct}',
                '${col3.amt}',
                '',
                '${col3.cd_partner}',
                '${col3.dt_start}',
                '${col3.dt_end}',
                '${col3.am_taxstd}',
                '${col3.am_addtax}',
                '${col3.tp_tax}',
                '${col3.no_company}',
                '${col3.nm_note}',
                '${col3.cd_bizarea}',
                '${col3.cd_cc}',
                '${col3.ucd_mng1}',
                '${col3.ucd_mng2}',
                '${col3.ucd_mng3}',
                '${col3.ucd_mng4}',
                '${col3.ucd_mng5}',
                '${col3.tp_docu}',
                '${col3.no_acct}',
                '${col3.cd_exch}',
                '${col3.rt_exch}',
                '${col3.am_ex}',
                '${col3.no_to}',
                '${col3.dt_shipping}',
                '${col3.tp_gubun}',
                '${col3.md_tax1}',
                '${col3.nm_item1}',
                '${col3.nm_size1}',
                '${col3.qt_tax1}',
                '${col3.am_prc1}',
                '${col3.am_supply1}',
                '${col3.am_tax1}',
                '${col3.nm_note1}',
                '${col3.cd_mngd1}',
                '${col3.nm_mngd1}',
                '${col3.cd_mngd2}',
                '${col3.nm_mngd2}',
                '${col3.cd_mngd3}',
                '${col3.nm_mngd3}',
                '${col3.cd_mngd4}',
                '${col3.nm_mngd4}',
                '${col3.cd_mngd5}',
                '${col3.nm_mngd5}',
                '${col3.cd_mngd6}',
                '${col3.nm_mngd6}',
                '${col3.cd_mngd7}',
                '${col3.nm_mngd7}',
                '${col3.cd_mngd8}',
                '${col3.nm_mngd8}',
                '${col3.yn_iss}',
                '${col3.final_status}'
              )
              `;
        var tRet99 = prisma.$queryRaw(Prisma.raw(sql99));
        tSQLArray.push(tRet99);

        try {
            await prisma.$transaction(tSQLArray);
            var tObj = {};
            tObj.INVOICE_NO = col.nm_note;
            tObj.DOCU_NO = strDocuNo;
            tRetArray.push(tObj);
        } catch (e) {
            console.log(`ERROR: insert Docu:${e.message}`);;
        }

    }

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })
    res.end(JSON.stringify(tRetArray));

});


restApi.all('/insert_docu_import_material/:user_id', async (req, res) => {
    var tInData = [...req.body];
    console.log(tInData);
    console.log(tInData.length);

    var tRetArray = [];
    var tIdx = 0;
    for (tIdx = 0; tIdx < tInData.length; tIdx++) {
        var col = {
            ...tInData[tIdx].DATA1
        };
        var col2 = {
            ...tInData[tIdx].DATA2
        };
        var col3 = {
            ...tInData[tIdx].DATA3
        };

        let sql0 = `
             select cd_sysdef
             from neoe.ma_codedtl
             where cd_field='MA_B000005'
             and cd_company = '1000'
             and nm_sysdef = '${col.nm_mngd4}'
              `;
        var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
        var strNeoeCurrCd = '';
        if (tRet0.length > 0) strNeoeCurrCd = tRet0[0].cd_sysdef;
        col.cd_exch = strNeoeCurrCd;
        console.log(strNeoeCurrCd);

        let sql1 = `
             select rate_base
             from neoe.ma_exchange
             where curr_sour = '${strNeoeCurrCd}'
             and   yymmdd = '${col.dt_acct}'
              `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        var strRateBase = '1';
        if (tRet1.length > 0) strRateBase = tRet1[0].rate_base;
        col.rt_exch = strRateBase;
        console.log(strRateBase);

        let sql7 = `
              select isnull(max(no_docu),'00000') as max_seq
              from neoe.fi_adocu
              where no_docu like 'IM${col.dt_acct}%'
              `;
        var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
        var tMaxDocuNo = 1;
        if (tRet7[0].max_seq === '00000') {
            tMaxDocuNo = parseFloat(tRet7[0].max_seq) + 1;
        } else {
            tMaxDocuNo = parseFloat(tRet7[0].max_seq.substring(10, 15)) + 1;
        }

        var tZero = '00000';
        var strMaxDocuNo = tZero.substring(0, 5 - String(tMaxDocuNo).length) + String(tMaxDocuNo);
        var strDocuNo = `IM${col.dt_acct}${strMaxDocuNo}`;
        var strTaxNo = `${strDocuNo}001`;

        console.log(col);
        console.log(col2);
        console.log(col3);

        col.row_id = strDocuNo;
        col.no_docu = strDocuNo;

        var tSQLArray = [];
        let sql99 = `
              insert into neoe.fi_adocu (
                  row_id,
                  row_no,
                  no_tax,
                  cd_pc,
                  cd_wdept,
                  no_docu,
                  no_doline,
                  cd_company,
                  id_write,
                  cd_docu,
                  dt_acct,
                  st_docu,
                  tp_drcr,
                  cd_acct,
                  amt,
                  cd_pjt,
                  cd_partner,
                  dt_start,
                  dt_end,
                  am_taxstd,
                  am_addtax,
                  tp_tax,
                  no_company,
                  nm_note,
                  cd_bizarea,
                  cd_cc,
                  ucd_mng1,
                  ucd_mng2,
                  ucd_mng3,
                  ucd_mng4,
                  ucd_mng5,
                  tp_docu,
                  no_acct,
                  cd_exch,
                  rt_exch,
                  am_ex,
                  no_to,
                  dt_shipping,
                  tp_gubun,
                  md_tax1,
                  nm_item1,
                  nm_size1,
                  qt_tax1,
                  am_prc1,
                  am_supply1,
                  am_tax1,
                  nm_note1,
                  cd_mngd1,
                  nm_mngd1,
                  cd_mngd2,
                  nm_mngd2,
                  cd_mngd3,
                  nm_mngd3,
                  cd_mngd4,
                  nm_mngd4,
                  cd_mngd5,
                  nm_mngd5,
                  cd_mngd6,
                  nm_mngd6,
                  cd_mngd7,
                  nm_mngd7,
                  cd_mngd8,
                  nm_mngd8,
                  yn_iss,
                  final_status
              ) values (
                '${col.row_id}',
                '${col.row_no}',
                '${col.no_tax}',
                '${col.cd_pc}',
                '${col.cd_wdept}',
                '${col.no_docu}',
                '${col.no_doline}',
                '${col.cd_company}',
                '${col.id_write}',
                '${col.cd_docu}',
                '${col.dt_acct}',
                '${col.st_docu}',
                '${col.tp_drcr}',
                '${col.cd_acct}',
                '${col.amt}',
                '${col.cd_pjt}',
                '${col.cd_partner}',
                '${col.dt_start}',
                '${col.dt_end}',
                '${col.am_taxstd}',
                '${col.am_addtax}',
                '${col.tp_tax}',
                '${col.no_company}',
                '${col.nm_note}',
                '${col.cd_bizarea}',
                '${col.cd_cc}',
                '${col.ucd_mng1}',
                '${col.ucd_mng2}',
                '${col.ucd_mng3}',
                '${col.ucd_mng4}',
                '${col.ucd_mng5}',
                '${col.tp_docu}',
                '${col.no_acct}',
                '${col.cd_exch}',
                '${col.rt_exch}',
                '${col.am_ex}',
                '${col.no_to}',
                '${col.dt_shipping}',
                '${col.tp_gubun}',
                '${col.md_tax1}',
                '${col.nm_item1}',
                '${col.nm_size1}',
                '${col.qt_tax1}',
                '${col.am_prc1}',
                '${col.am_supply1}',
                '${col.am_tax1}',
                '${col.nm_note1}',
                '${col.cd_mngd1}',
                '${col.nm_mngd1}',
                '${col.cd_mngd2}',
                '${col.nm_mngd2}',
                '${col.cd_mngd3}',
                '${col.nm_mngd3}',
                '${col.cd_mngd4}',
                '${col.nm_mngd4}',
                '${col.cd_mngd5}',
                '${col.nm_mngd5}',
                '${col.cd_mngd6}',
                '${col.nm_mngd6}',
                '${col.cd_mngd7}',
                '${col.nm_mngd7}',
                '${col.cd_mngd8}',
                '${col.nm_mngd8}',
                '${col.yn_iss}',
                '${col.final_status}'
              )
              `;
        var tRet99 = prisma.$queryRaw(Prisma.raw(sql99));
        tSQLArray.push(tRet99);

        if (typeof col2.row_id !== 'undefined') {

            col2.row_id = strDocuNo;
            col2.no_docu = strDocuNo;

            let sql99 = `
                insert into neoe.fi_adocu (
                  row_id,
                  row_no,
                  no_tax,
                  cd_pc,
                  cd_wdept,
                  no_docu,
                  no_doline,
                  cd_company,
                  id_write,
                  cd_docu,
                  dt_acct,
                  st_docu,
                  tp_drcr,
                  cd_acct,
                  amt,
                  cd_pjt,
                  cd_partner,
                  dt_start,
                  dt_end,
                  am_taxstd,
                  am_addtax,
                  tp_tax,
                  no_company,
                  nm_note,
                  cd_bizarea,
                  cd_cc,
                  ucd_mng1,
                  ucd_mng2,
                  ucd_mng3,
                  ucd_mng4,
                  ucd_mng5,
                  tp_docu,
                  no_acct,
                  cd_exch,
                  rt_exch,
                  am_ex,
                  no_to,
                  dt_shipping,
                  tp_gubun,
                  md_tax1,
                  nm_item1,
                  nm_size1,
                  qt_tax1,
                  am_prc1,
                  am_supply1,
                  am_tax1,
                  nm_note1,
                  cd_mngd1,
                  nm_mngd1,
                  cd_mngd2,
                  nm_mngd2,
                  cd_mngd3,
                  nm_mngd3,
                  cd_mngd4,
                  nm_mngd4,
                  cd_mngd5,
                  nm_mngd5,
                  cd_mngd6,
                  nm_mngd6,
                  cd_mngd7,
                  nm_mngd7,
                  cd_mngd8,
                  nm_mngd8,
                  yn_iss,
                  final_status
              ) values (
                '${col2.row_id}',
                '${col2.row_no}',
                '${col2.no_tax}',
                '${col2.cd_pc}',
                '${col2.cd_wdept}',
                '${col2.no_docu}',
                '${col2.no_doline}',
                '${col2.cd_company}',
                '${col2.id_write}',
                '${col2.cd_docu}',
                '${col2.dt_acct}',
                '${col2.st_docu}',
                '${col2.tp_drcr}',
                '${col2.cd_acct}',
                '${col2.amt}',
                '',
                '${col2.cd_partner}',
                '${col2.dt_start}',
                '${col2.dt_end}',
                '${col2.am_taxstd}',
                '${col2.am_addtax}',
                '${col2.tp_tax}',
                '${col2.no_company}',
                '${col2.nm_note}',
                '${col2.cd_bizarea}',
                '${col2.cd_cc}',
                '${col2.ucd_mng1}',
                '${col2.ucd_mng2}',
                '${col2.ucd_mng3}',
                '${col2.ucd_mng4}',
                '${col2.ucd_mng5}',
                '${col2.tp_docu}',
                '${col2.no_acct}',
                '${col2.cd_exch}',
                '${col2.rt_exch}',
                '${col2.am_ex}',
                '${col2.no_to}',
                '${col2.dt_shipping}',
                '${col2.tp_gubun}',
                '${col2.md_tax1}',
                '${col2.nm_item1}',
                '${col2.nm_size1}',
                '${col2.qt_tax1}',
                '${col2.am_prc1}',
                '${col2.am_supply1}',
                '${col2.am_tax1}',
                '${col2.nm_note1}',
                '${col2.cd_mngd1}',
                '${col2.nm_mngd1}',
                '${col2.cd_mngd2}',
                '${col2.nm_mngd2}',
                '${col2.cd_mngd3}',
                '${col2.nm_mngd3}',
                '${col2.cd_mngd4}',
                '${col2.nm_mngd4}',
                '${col2.cd_mngd5}',
                '${col2.nm_mngd5}',
                '${col2.cd_mngd6}',
                '${col2.nm_mngd6}',
                '${col2.cd_mngd7}',
                '${col2.nm_mngd7}',
                '${col2.cd_mngd8}',
                '${col2.nm_mngd8}',
                '${col2.yn_iss}',
                '${col2.final_status}'
              )
              `;
            var tRet99 = prisma.$queryRaw(Prisma.raw(sql99));
            tSQLArray.push(tRet99);
        }



        col3.row_id = strDocuNo;
        col3.no_docu = strDocuNo;

        let sql99 = `
              insert into neoe.fi_adocu (
                  row_id,
                  row_no,
                  no_tax,
                  cd_pc,
                  cd_wdept,
                  no_docu,
                  no_doline,
                  cd_company,
                  id_write,
                  cd_docu,
                  dt_acct,
                  st_docu,
                  tp_drcr,
                  cd_acct,
                  amt,
                  cd_pjt,
                  cd_partner,
                  dt_start,
                  dt_end,
                  am_taxstd,
                  am_addtax,
                  tp_tax,
                  no_company,
                  nm_note,
                  cd_bizarea,
                  cd_cc,
                  ucd_mng1,
                  ucd_mng2,
                  ucd_mng3,
                  ucd_mng4,
                  ucd_mng5,
                  tp_docu,
                  no_acct,
                  cd_exch,
                  rt_exch,
                  am_ex,
                  no_to,
                  dt_shipping,
                  tp_gubun,
                  md_tax1,
                  nm_item1,
                  nm_size1,
                  qt_tax1,
                  am_prc1,
                  am_supply1,
                  am_tax1,
                  nm_note1,
                  cd_mngd1,
                  nm_mngd1,
                  cd_mngd2,
                  nm_mngd2,
                  cd_mngd3,
                  nm_mngd3,
                  cd_mngd4,
                  nm_mngd4,
                  cd_mngd5,
                  nm_mngd5,
                  cd_mngd6,
                  nm_mngd6,
                  cd_mngd7,
                  nm_mngd7,
                  cd_mngd8,
                  nm_mngd8,
                  yn_iss,
                  final_status
              ) values (
                '${col3.row_id}',
                '${col3.row_no}',
                '${col3.no_tax}',
                '${col3.cd_pc}',
                '${col3.cd_wdept}',
                '${col3.no_docu}',
                '${col3.no_doline}',
                '${col3.cd_company}',
                '${col3.id_write}',
                '${col3.cd_docu}',
                '${col3.dt_acct}',
                '${col3.st_docu}',
                '${col3.tp_drcr}',
                '${col3.cd_acct}',
                '${col3.amt}',
                '${col3.cd_pjt}',
                '${col3.cd_partner}',
                '${col3.dt_start}',
                '${col3.dt_end}',
                '${col3.am_taxstd}',
                '${col3.am_addtax}',
                '${col3.tp_tax}',
                '${col3.no_company}',
                '${col3.nm_note}',
                '${col3.cd_bizarea}',
                '${col3.cd_cc}',
                '${col3.ucd_mng1}',
                '${col3.ucd_mng2}',
                '${col3.ucd_mng3}',
                '${col3.ucd_mng4}',
                '${col3.ucd_mng5}',
                '${col3.tp_docu}',
                '${col3.no_acct}',
                '${col3.cd_exch}',
                '${col3.rt_exch}',
                '${col3.am_ex}',
                '${col3.no_to}',
                '${col3.dt_shipping}',
                '${col3.tp_gubun}',
                '${col3.md_tax1}',
                '${col3.nm_item1}',
                '${col3.nm_size1}',
                '${col3.qt_tax1}',
                '${col3.am_prc1}',
                '${col3.am_supply1}',
                '${col3.am_tax1}',
                '${col3.nm_note1}',
                '${col3.cd_mngd1}',
                '${col3.nm_mngd1}',
                '${col3.cd_mngd2}',
                '${col3.nm_mngd2}',
                '${col3.cd_mngd3}',
                '${col3.nm_mngd3}',
                '${col3.cd_mngd4}',
                '${col3.nm_mngd4}',
                '${col3.cd_mngd5}',
                '${col3.nm_mngd5}',
                '${col3.cd_mngd6}',
                '${col3.nm_mngd6}',
                '${col3.cd_mngd7}',
                '${col3.nm_mngd7}',
                '${col3.cd_mngd8}',
                '${col3.nm_mngd8}',
                '${col3.yn_iss}',
                '${col3.final_status}'
              )
              `;
        var tRet99 = prisma.$queryRaw(Prisma.raw(sql99));
        tSQLArray.push(tRet99);

        try {
            await prisma.$transaction(tSQLArray);
            var tObj = {};
            tObj.INVOICE_NO = col.nm_note;
            tObj.DOCU_NO = strDocuNo;
            tRetArray.push(tObj);
        } catch (e) {
            console.log(`ERROR: insert Docu:${e.message}`);;
        }

    }

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })
    res.end(JSON.stringify(tRetArray));

});

restApi.all('/insert_docu_domestic_material/:user_id', async (req, res) => {
    var tInData = [...req.body];
    // console.log(tInData);
    // console.log(tInData.length);

    var tRetArray = [];
    var tIdx = 0;
    for (tIdx = 0; tIdx < tInData.length; tIdx++) {
        var col = {
            ...tInData[tIdx].DATA1
        };
        var col2 = {
            ...tInData[tIdx].DATA2
        };
        var col3 = {
            ...tInData[tIdx].DATA3
        };

        /*
        let sql0 = `
             select cd_sysdef
             from neoe.ma_codedtl
             where cd_field='MA_B000005'
             and cd_company = '1000'
             and nm_sysdef = '${col.nm_mngd4}'
              `;
          var tRet0 = await prisma.$queryRaw(Prisma.raw(sql0));
          var strNeoeCurrCd  = '';
          if (tRet0.length > 0) strNeoeCurrCd = tRet0[0].cd_sysdef;
          col.cd_exch = strNeoeCurrCd;
          console.log(strNeoeCurrCd);
         */

        var strNeoeCurrCd = col.cd_exch;
        let sql1 = `
             select rate_base
             from neoe.ma_exchange
             where curr_sour = '${strNeoeCurrCd}'
             and   yymmdd = '${col.dt_acct}'
              `;
        var tRet1 = await prisma.$queryRaw(Prisma.raw(sql1));
        var strRateBase = '1';
        if (tRet1.length > 0) strRateBase = tRet1[0].rate_base;
        col.rt_exch = strRateBase;
        console.log(strRateBase);

        /*
        let sql6 = `
            select nm_mngd
            from neoe.fi_mngd
            where cd_mngd = '${col.AF_A23_CODE}'
            and cd_mng='a23'
            and cd_company='1000'
            `;
        var tRet6 = await prisma.$queryRaw(Prisma.raw(sql6));
        var strA23Name = '';
        if (tRet6.length > 0) strA23Name = tRet6[0].nm_mngd;
        col2.nm_mngd3 = strA23Name;
        console.log(strA23Name);
        */

        let sql7 = `
              select isnull(max(no_docu),'00000') as max_seq
              from neoe.fi_adocu
              where no_docu like 'DM${col.dt_acct}%'
              `;
        var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
        var tMaxDocuNo = 1;
        if (tRet7[0].max_seq === '00000') {
            tMaxDocuNo = parseFloat(tRet7[0].max_seq) + 1;
        } else {
            tMaxDocuNo = parseFloat(tRet7[0].max_seq.substring(10, 15)) + 1;
        }

        var tZero = '00000';
        var strMaxDocuNo = tZero.substring(0, 5 - String(tMaxDocuNo).length) + String(tMaxDocuNo);
        var strDocuNo = `DM${col.dt_acct}${strMaxDocuNo}`;
        var strTaxNo = `${strDocuNo}001`;

        console.log(col);
        console.log(col2);
        console.log(col3);

        col.row_id = strDocuNo;
        col.no_docu = strDocuNo;

        var tSQLArray = [];
        let sql99 = `
              insert into neoe.fi_adocu (
                  row_id,
                  row_no,
                  no_tax,
                  cd_pc,
                  cd_wdept,
                  no_docu,
                  no_doline,
                  cd_company,
                  id_write,
                  cd_docu,
                  dt_acct,
                  st_docu,
                  tp_drcr,
                  cd_acct,
                  amt,
                  cd_pjt,
                  cd_partner,
                  dt_start,
                  dt_end,
                  am_taxstd,
                  am_addtax,
                  tp_tax,
                  no_company,
                  nm_note,
                  cd_bizarea,
                  cd_cc,
                  ucd_mng1,
                  ucd_mng2,
                  ucd_mng3,
                  ucd_mng4,
                  ucd_mng5,
                  tp_docu,
                  no_acct,
                  cd_exch,
                  rt_exch,
                  am_ex,
                  no_to,
                  dt_shipping,
                  tp_gubun,
                  md_tax1,
                  nm_item1,
                  nm_size1,
                  qt_tax1,
                  am_prc1,
                  am_supply1,
                  am_tax1,
                  nm_note1,
                  cd_mngd1,
                  nm_mngd1,
                  cd_mngd2,
                  nm_mngd2,
                  cd_mngd3,
                  nm_mngd3,
                  cd_mngd4,
                  nm_mngd4,
                  cd_mngd5,
                  nm_mngd5,
                  cd_mngd6,
                  nm_mngd6,
                  cd_mngd7,
                  nm_mngd7,
                  cd_mngd8,
                  nm_mngd8,
                  yn_iss,
                  final_status
              ) values (
                '${col.row_id}',
                '${col.row_no}',
                '${col.no_tax}',
                '${col.cd_pc}',
                '${col.cd_wdept}',
                '${col.no_docu}',
                '${col.no_doline}',
                '${col.cd_company}',
                '${col.id_write}',
                '${col.cd_docu}',
                '${col.dt_acct}',
                '${col.st_docu}',
                '${col.tp_drcr}',
                '${col.cd_acct}',
                '${col.amt}',
                '',
                '${col.cd_partner}',
                '${col.dt_start}',
                '${col.dt_end}',
                '${col.am_taxstd}',
                '${col.am_addtax}',
                '${col.tp_tax}',
                '${col.no_company}',
                '${col.nm_note}',
                '${col.cd_bizarea}',
                '${col.cd_cc}',
                '${col.ucd_mng1}',
                '${col.ucd_mng2}',
                '${col.ucd_mng3}',
                '${col.ucd_mng4}',
                '${col.ucd_mng5}',
                '${col.tp_docu}',
                '${col.no_acct}',
                '${col.cd_exch}',
                '${col.rt_exch}',
                '${col.am_ex}',
                '${col.no_to}',
                '${col.dt_shipping}',
                '${col.tp_gubun}',
                '${col.md_tax1}',
                '${col.nm_item1}',
                '${col.nm_size1}',
                '${col.qt_tax1}',
                '${col.am_prc1}',
                '${col.am_supply1}',
                '${col.am_tax1}',
                '${col.nm_note1}',
                '${col.cd_mngd1}',
                '${col.nm_mngd1}',
                '${col.cd_mngd2}',
                '${col.nm_mngd2}',
                '${col.cd_mngd3}',
                '${col.nm_mngd3}',
                '${col.cd_mngd4}',
                '${col.nm_mngd4}',
                '${col.cd_mngd5}',
                '${col.nm_mngd5}',
                '${col.cd_mngd6}',
                '${col.nm_mngd6}',
                '${col.cd_mngd7}',
                '${col.nm_mngd7}',
                '${col.cd_mngd8}',
                '${col.nm_mngd8}',
                '${col.yn_iss}',
                '${col.final_status}'
              )
              `;
        var tRet99 = prisma.$queryRaw(Prisma.raw(sql99));
        tSQLArray.push(tRet99);

        if (typeof col2.row_id !== 'undefined' && typeof col2.row_no !== 'undefined') {

            col2.row_id = strDocuNo;
            col2.no_docu = strDocuNo;

            let sql99 = `
                insert into neoe.fi_adocu (
                  row_id,
                  row_no,
                  no_tax,
                  cd_pc,
                  cd_wdept,
                  no_docu,
                  no_doline,
                  cd_company,
                  id_write,
                  cd_docu,
                  dt_acct,
                  st_docu,
                  tp_drcr,
                  cd_acct,
                  amt,
                  cd_pjt,
                  cd_partner,
                  dt_start,
                  dt_end,
                  am_taxstd,
                  am_addtax,
                  tp_tax,
                  no_company,
                  nm_note,
                  cd_bizarea,
                  cd_cc,
                  ucd_mng1,
                  ucd_mng2,
                  ucd_mng3,
                  ucd_mng4,
                  ucd_mng5,
                  tp_docu,
                  no_acct,
                  cd_exch,
                  rt_exch,
                  am_ex,
                  no_to,
                  dt_shipping,
                  tp_gubun,
                  md_tax1,
                  nm_item1,
                  nm_size1,
                  qt_tax1,
                  am_prc1,
                  am_supply1,
                  am_tax1,
                  nm_note1,
                  cd_mngd1,
                  nm_mngd1,
                  cd_mngd2,
                  nm_mngd2,
                  cd_mngd3,
                  nm_mngd3,
                  cd_mngd4,
                  nm_mngd4,
                  cd_mngd5,
                  nm_mngd5,
                  cd_mngd6,
                  nm_mngd6,
                  cd_mngd7,
                  nm_mngd7,
                  cd_mngd8,
                  nm_mngd8,
                  yn_iss,
                  final_status
              ) values (
                '${col2.row_id}',
                '${col2.row_no}',
                '${col2.no_tax}',
                '${col2.cd_pc}',
                '${col2.cd_wdept}',
                '${col2.no_docu}',
                '${col2.no_doline}',
                '${col2.cd_company}',
                '${col2.id_write}',
                '${col2.cd_docu}',
                '${col2.dt_acct}',
                '${col2.st_docu}',
                '${col2.tp_drcr}',
                '${col2.cd_acct}',
                '${col2.amt}',
                '',
                '${col2.cd_partner}',
                '${col2.dt_start}',
                '${col2.dt_end}',
                '${col2.am_taxstd}',
                '${col2.am_addtax}',
                '${col2.tp_tax}',
                '${col2.no_company}',
                '${col2.nm_note}',
                '${col2.cd_bizarea}',
                '${col2.cd_cc}',
                '${col2.ucd_mng1}',
                '${col2.ucd_mng2}',
                '${col2.ucd_mng3}',
                '${col2.ucd_mng4}',
                '${col2.ucd_mng5}',
                '${col2.tp_docu}',
                '${col2.no_acct}',
                '${col2.cd_exch}',
                '${col2.rt_exch}',
                '${col2.am_ex}',
                '${col2.no_to}',
                '${col2.dt_shipping}',
                '${col2.tp_gubun}',
                '${col2.md_tax1}',
                '${col2.nm_item1}',
                '${col2.nm_size1}',
                '${col2.qt_tax1}',
                '${col2.am_prc1}',
                '${col2.am_supply1}',
                '${col2.am_tax1}',
                '${col2.nm_note1}',
                '${col2.cd_mngd1}',
                '${col2.nm_mngd1}',
                '${col2.cd_mngd2}',
                '${col2.nm_mngd2}',
                '${col2.cd_mngd3}',
                '${col2.nm_mngd3}',
                '${col2.cd_mngd4}',
                '${col2.nm_mngd4}',
                '${col2.cd_mngd5}',
                '${col2.nm_mngd5}',
                '${col2.cd_mngd6}',
                '${col2.nm_mngd6}',
                '${col2.cd_mngd7}',
                '${col2.nm_mngd7}',
                '${col2.cd_mngd8}',
                '${col2.nm_mngd8}',
                '${col2.yn_iss}',
                '${col2.final_status}'
              )
              `;
            var tRet99 = prisma.$queryRaw(Prisma.raw(sql99));
            tSQLArray.push(tRet99);
        }


        if (typeof col3.row_id !== 'undefined' && typeof col3.row_no !== 'undefined') {
            col3.row_id = strDocuNo;
            col3.no_docu = strDocuNo;

            let sql99 = `
					  insert into neoe.fi_adocu (
					  row_id,
					  row_no,
					  no_tax,
					  cd_pc,
					  cd_wdept,
					  no_docu,
					  no_doline,
					  cd_company,
					  id_write,
					  cd_docu,
					  dt_acct,
					  st_docu,
					  tp_drcr,
					  cd_acct,
					  amt,
					  cd_pjt,
					  cd_partner,
					  dt_start,
					  dt_end,
					  am_taxstd,
					  am_addtax,
					  tp_tax,
					  no_company,
					  nm_note,
					  cd_bizarea,
					  cd_cc,
					  ucd_mng1,
					  ucd_mng2,
					  ucd_mng3,
					  ucd_mng4,
					  ucd_mng5,
					  tp_docu,
					  no_acct,
					  cd_exch,
					  rt_exch,
					  am_ex,
					  no_to,
					  dt_shipping,
					  tp_gubun,
					  md_tax1,
					  nm_item1,
					  nm_size1,
					  qt_tax1,
					  am_prc1,
					  am_supply1,
					  am_tax1,
					  nm_note1,
					  cd_mngd1,
					  nm_mngd1,
					  cd_mngd2,
					  nm_mngd2,
					  cd_mngd3,
					  nm_mngd3,
					  cd_mngd4,
					  nm_mngd4,
					  cd_mngd5,
					  nm_mngd5,
					  cd_mngd6,
					  nm_mngd6,
					  cd_mngd7,
					  nm_mngd7,
					  cd_mngd8,
					  nm_mngd8,
					  yn_iss,
					  final_status
					  ) values (
					'${col3.row_id}',
					'${col3.row_no}',
					'${col3.no_tax}',
					'${col3.cd_pc}',
					'${col3.cd_wdept}',
					'${col3.no_docu}',
					'${col3.no_doline}',
					'${col3.cd_company}',
					'${col3.id_write}',
					'${col3.cd_docu}',
					'${col3.dt_acct}',
					'${col3.st_docu}',
					'${col3.tp_drcr}',
					'${col3.cd_acct}',
					'${col3.amt}',
					'',
					'${col3.cd_partner}',
					'${col3.dt_start}',
					'${col3.dt_end}',
					'${col3.am_taxstd}',
					'${col3.am_addtax}',
					'${col3.tp_tax}',
					'${col3.no_company}',
					'${col3.nm_note}',
					'${col3.cd_bizarea}',
					'${col3.cd_cc}',
					'${col3.ucd_mng1}',
					'${col3.ucd_mng2}',
					'${col3.ucd_mng3}',
					'${col3.ucd_mng4}',
					'${col3.ucd_mng5}',
					'${col3.tp_docu}',
					'${col3.no_acct}',
					'${col3.cd_exch}',
					'${col3.rt_exch}',
					'${col3.am_ex}',
					'${col3.no_to}',
					'${col3.dt_shipping}',
					'${col3.tp_gubun}',
					'${col3.md_tax1}',
					'${col3.nm_item1}',
					'${col3.nm_size1}',
					'${col3.qt_tax1}',
					'${col3.am_prc1}',
					'${col3.am_supply1}',
					'${col3.am_tax1}',
					'${col3.nm_note1}',
					'${col3.cd_mngd1}',
					'${col3.nm_mngd1}',
					'${col3.cd_mngd2}',
					'${col3.nm_mngd2}',
					'${col3.cd_mngd3}',
					'${col3.nm_mngd3}',
					'${col3.cd_mngd4}',
					'${col3.nm_mngd4}',
					'${col3.cd_mngd5}',
					'${col3.nm_mngd5}',
					'${col3.cd_mngd6}',
					'${col3.nm_mngd6}',
					'${col3.cd_mngd7}',
					'${col3.nm_mngd7}',
					'${col3.cd_mngd8}',
					'${col3.nm_mngd8}',
					'${col3.yn_iss}',
					'${col3.final_status}'
					  )
					  `;
            var tRet99 = prisma.$queryRaw(Prisma.raw(sql99));
            tSQLArray.push(tRet99);
        }

        try {
            await prisma.$transaction(tSQLArray);
            var tObj = {};
            tObj.INVOICE_NO = col.nm_note;
            tObj.DOCU_NO = strDocuNo;
            tRetArray.push(tObj);
        } catch (e) {
            console.log(`ERROR: insert Docu:${e.message}`);;
        }

    }

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })
    res.end(JSON.stringify(tRetArray));

});


module.exports = restApi;