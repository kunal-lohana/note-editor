const sectionList = [
        {
            'id': 'section-wizard-p-0',
            'images': [
                {
                    id : 'img-sec-p-0',
                    url: 'images/form-wizard-s11.jpg'
                },
                {
                    id : 'img-sec-p-1',
                    url: 'images/form-wizard-s12.jpg'
                }
            ],
            'form-header': 'Information',
            'form-content-title': 'Please fill all your mandatory details',
            'errorText': 'Age and Sex are mandatory',
            'form-rows': [
                {
                    'title': 'Form No.',
                    'type': '',
                    'id': 'formNumber',
                    'isValidate': false
                },
                {
                    'label': 'Age (in years)',
                    'type': 'number',
                    'id': 'age',
                    'placeholder': 'Age (in years)',
                    'isValidate': true
                },
                {
                    'label': 'male',
                    'type': 'radio',
                    'value': 1,
                    'name': 'gender',
                    'id': 'male',
                    'placeholder': '',
                    'isValidate': true
                },
                {
                    'label': 'female',
                    'type': 'radio',
                    'value': 0,
                    'name': 'gender',
                    'id': 'female',
                    'placeholder': '',
                    'isValidate': true
                }
            ]
        }
]
export default sectionList;