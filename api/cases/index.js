const request = require('request-promise');
const jp = require('jsonpath');
const express = require('express');
const router = express.Router();
const config = require('../../config');
const proxy = require('../../lib/proxy');
const jwtDecode = require('jwt-decode');
const schema = require('../../benefit_schema.json');
const sscsSchema = require('./sscs.schema');


function generateRequest(url, params) {
    let options = {
        url: url,
        headers: {
            ...params.headers,
            'Content-Type': 'application/json'
        },
        json: true
    };
    if (config.useProxy) {
        options = proxy(options);
    }
    return request(options);
}


function getCase(caseId, userId, options) {
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/5899/jurisdictions/SSCS/case-types/jui_test/cases/1526651248651203`, options)
}



function replaceSectionValues(section, caseData) {
    if(section.sections && section.sections.length) {
        section.sections.forEach(childSection => {
            replaceSectionValues(childSection, caseData);
        });
    }
    else {
        section.fields.forEach(field => {
            field.value = jp.query(caseData, field.lookup);
            delete field.lookup;
        });
    }
}


//Get case
router.get('/:case_id', (req, res, next) => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ2ZzQyMm9ocmZtcDBwcG0ydDFuaGJrMzUwayIsInN1YiI6IjU4OTkiLCJpYXQiOjE1MjcxNzIzODMsImV4cCI6MTUyNzIwMTE4MywiZGF0YSI6ImNhc2V3b3JrZXItcHJvYmF0ZSxjYXNld29ya2VyLXByb2JhdGUtaXNzdWVyLGNhc2V3b3JrZXItcHJvYmF0ZS1leGFtaW5lcixjYXNld29ya2VyLXByb2JhdGUtYXV0aG9yaXNlcixjYXNld29ya2VyLWNtYyxjYXNld29ya2VyLXNzY3MsY2FzZXdvcmtlci1kaXZvcmNlLGNhc2V3b3JrZXItZGl2b3JjZS1jb3VydGFkbWluLGNhc2V3b3JrZXItdGVzdCxjYXNld29ya2VyLXJlZmVyZW5jZS1kYXRhLGNhc2V3b3JrZXItc3Njcy1jYWxsYWdlbnQsY2FzZXdvcmtlcixjYXNld29ya2VyLXByb2JhdGUtbG9hMSxjYXNld29ya2VyLXByb2JhdGUtaXNzdWVyLWxvYTEsY2FzZXdvcmtlci1wcm9iYXRlLWV4YW1pbmVyLWxvYTEsY2FzZXdvcmtlci1wcm9iYXRlLWF1dGhvcmlzZXItbG9hMSxjYXNld29ya2VyLWNtYy1sb2ExLGNhc2V3b3JrZXItc3Njcy1sb2ExLGNhc2V3b3JrZXItZGl2b3JjZS1sb2ExLGNhc2V3b3JrZXItZGl2b3JjZS1jb3VydGFkbWluLWxvYTEsY2FzZXdvcmtlci10ZXN0LWxvYTEsY2FzZXdvcmtlci1yZWZlcmVuY2UtZGF0YS1sb2ExLGNhc2V3b3JrZXItc3Njcy1jYWxsYWdlbnQtbG9hMSxjYXNld29ya2VyLWxvYTEiLCJ0eXBlIjoiQUNDRVNTIiwiaWQiOiI1ODk5IiwiZm9yZW5hbWUiOiJTdHVhcnQiLCJzdXJuYW1lIjoiUGx1bW1lciIsImRlZmF1bHQtc2VydmljZSI6IkNDRCIsImxvYSI6MSwiZGVmYXVsdC11cmwiOiJodHRwczovL3d3dy5jY2QuZGVtby5wbGF0Zm9ybS5obWN0cy5uZXQiLCJncm91cCI6ImNhc2V3b3JrZXIifQ.a9gV-DESgGRKpu6rZWzoTz5zqD7aQNAD6Rd1FjncMy4';
    const tokenData = jwtDecode(token);

    const caseId = req.params.case_id;
    const userId = tokenData.id;



    getCase(caseId, userId, {
        headers: {
            'Authorization': token,
            'ServiceAuthorization': req.headers.ServiceAuthorization
        }
    }).then(caseData => {
        const schema = JSON.parse(JSON.stringify(sscsSchema));
        schema.sections.forEach(section => {
            replaceSectionValues(section, caseData);
        });
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(JSON.stringify(schema));
    }).catch(e => console.log(e))
});


//List of cases
router.get('/', (req, res, next) => {
    res.status(200).send('Get list of cases');
});


module.exports = router;