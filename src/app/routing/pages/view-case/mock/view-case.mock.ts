import {PageDateCase} from '../../../../domain/models/section_fields';

export interface CaseData {
    caseData: PageDateCase;
}

export const mockCase: CaseData = {
    caseData: {
        id: 'case_id',
        case_jurisdiction: 'SSCS',
        case_type_id: 'Benefit',
        sections: [
            {
                id: 'section_id1',
                name: 'section_name1'
            },
            {
                id: 'section_id2',
                name: 'section_name2'
            },
            {
                id: 'section_id3',
                name: 'section_name3'
            }
        ]
    }
};

export const mockSectionsService = [
    {
        href: `/case/SSCS/Benefit/case_id/section_id1`,
        text: 'section_name1',
        label: 'section_name1',
        id: 'section_id1',
        active: false
    },
    {
        href: `/case/SSCS/Benefit/case_id/section_id2`,
        text: 'section_name2',
        label: 'section_name2',
        id: 'section_id2',
        active:  true
    },
    {
        href: `/case/SSCS/Benefit/case_id/section_id3`,
        text: 'section_name3',
        label: 'section_name3',
        id: 'section_id3',
        active: false
    }
];
