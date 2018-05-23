
const jp = require('jsonpath');
const express = require('express');
const router = express.Router();


const caseInfo = require('../../raw-case.json');
const schema = require('../../benefit_schema.json');

const divorce = {
    sections: [
        {
            id: 'summary',
            name: 'Summary',
            sections: [
                {
                    id: 'case_details',
                    name: 'Case Details',
                    fields: [
                        {
                            label: 'Case number',
                            lookup: '$.id'
                        },
                        {
                            label: 'Case number',
                            lookup: '$.id'
                        }
                    ]
                }
            ]
        }
    ]
}

const sscs = {
    sections: [
        {
            id: 'summary',
            name: 'Summary',
            type: 'section',
            sections: [
                {
                    id: 'case_details',
                    name: 'Case Details',
                    type: 'panel',
                    fields: [
                        {
                            label: 'Parties',
                            lookup: '$.id'
                        },
                        {
                            label: 'Case number',
                            lookup: '$.id'
                        },
                        {
                            label: 'Case type',
                            lookup: '$.case_type_id'
                        }
                    ]
                }
            ]
        },
        {
            id: 'parties',
            name: 'Parties',
            type: 'section',
            sections: [
                {
                    id: 'case_details',
                    name: 'Case Details',
                    type: 'panel',
                    fields: [
                        {
                            label: 'Parties',
                            lookup: '$.id'
                        }
                    ]
                }
            ]
        },
        {
            id: 'casefile',
            name: 'Case file',
            type: 'section',
            sections: [
                {
                    id: 'case_details',
                    name: 'Case Details',
                    type: 'panel',
                    fields: [
                        {
                            label: 'Parties',
                            lookup: '$.id'
                        }
                    ]
                }
            ]
        }
    ]
    // representatives: {
    //     judge: '',
    //     medical: '',
    //     disability_member: ''
    // },
    // case_summary: {
    //     parties: '',
    //     id: 'id',
    //     type: 'jurisdiction',
    //     tribunal: 'lookupfrom schema',
    //     additional_requirements: ''
    // }
};



function replaceSectionValues(section, caseInfo) {
    if(section.sections && section.sections.length) {
        section.sections.forEach(childSection => {
            replaceSectionValues(childSection, caseInfo);
        });
    }
    else {
        section.fields.forEach(field => {
            field.value = jp.query(caseInfo, field.lookup);
            delete field.lookup;
        });
    }
}


//Get case
router.get('/:case_id', (req, res, next) => {
    const schema = JSON.parse(JSON.stringify(sscs));
    schema.sections.forEach(section => {
        replaceSectionValues(section, caseInfo);
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(JSON.stringify(schema));
});


//List of cases
router.get('/', (req, res, next) => {
    res.status(200).send('Get list of cases');
});


module.exports = router;