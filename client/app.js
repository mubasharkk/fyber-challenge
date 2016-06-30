Ext.application({
    name: 'fyber-challenge',
    launch: function () {

        Ext.create('Ext.Button', {
            text: 'Add Details',
            renderTo: Ext.getBody(),
            handler: createForm,
            scale: 'large'
        });


        window.debugPanel = Ext.create('Ext.panel.Panel', {
            title: 'Debug Details',
            id: 'debug-panel',
            width: 300,
            html: '',
            renderTo: Ext.getBody()
        });
        
    }
});

function log (html){
    
    var html = debugPanel.body.dom.innerHTML + "<br/>" + html;
    debugPanel.update(html);

}



function createForm() {
    
    log('Form created!');


    var classField = new Ext.form.RadioGroup({
        id: 'class-group',
        xtype: 'radiogroup',
        fieldLabel: 'Travel Class',
        // Arrange radio buttons into three columns, distributed vertically
        columns: 3,
        vertical: true,
        items: [
            {boxLabel: '1st', name: 'travelClass', inputValue: '1', checked: true},
            {boxLabel: 'Economy', name: 'travelClass', inputValue: '2'},
            {boxLabel: 'Coach', name: 'travelClass', inputValue: '3'},
        ]
    });

    var destinationField = {
        xtype: 'textfield',
        name: 'destination',
        fieldLabel: 'Destination',
        allowBlank: false  // requires a non-empty value
    };

    var approvedField = {
        xtype: 'fieldcontainer',
        fieldLabel: 'Approved',
        defaultType: 'checkboxfield',
        items: [
            {
                boxLabel: 'Yes',
                name: 'approved',
                inputValue: '1',
                id: 'approved-field'
            }
        ]
    };

    var cancelBtn = Ext.create('Ext.Button', {
        text: 'Cancel',
        renderTo: Ext.getBody(),
        handler: function () {
            panel.close();
            log('Cancel Clicked!');
        }
    });

    var resetBtn = Ext.create('Ext.Button', {
        text: 'Reset',
        renderTo: Ext.getBody(),
        handler: function () {
            panel.getForm().reset();
            log('Reset Clicked!');
        }
    });

    var saveBtn = Ext.create('Ext.Button', {
        text: 'Save',
        renderTo: Ext.getBody(),
        handler: function () {
            
            log('Save Clicked!');
            var values = panel.getForm().getValues();
            
            switch(values.travelClass){
                default:
                case 1:
                    log('Class: 1st');
                    break;
                case 2:
                    log('Class: Economy');
                    break;
                case 3:
                    log('Class: Coach');
                    break;
            }
            
            if(values.destination){
                log('Destination: ' + values.destination);
            }
            
            if(values.approved){
                log('Approved: Yes');
            }

        }
    });



    var panel = new Ext.create('Ext.form.Panel', {
        title: 'Traveling Details',
        width: 300,
        bodyPadding: 10,
        renderTo: Ext.getBody(),
        items: [
            classField,
            destinationField,
            approvedField,
            resetBtn,
            cancelBtn,
            saveBtn
        ]
    });
}