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
            width: 300,
            html: '',
            renderTo: Ext.getBody()
        });

    }
});

function log (data){
    var old = debugPanel.body.dom.innerHTML;
    debugPanel.body.update(old+ "<br/>" + data);
    
    console.log(old);
}


function createForm() {


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
            log('Cancelled Clicked!');
        }
    });

    var resetBtn = Ext.create('Ext.Button', {
        text: 'Reset',
        renderTo: Ext.getBody(),
        handler: function () {
            panel.getForm().reset();
            log('Cancelled Clicked!');
        }
    });

    var saveBtn = Ext.create('Ext.Button', {
        text: 'Save',
        renderTo: Ext.getBody(),
        handler: function () {
            debugPanel.update('Reset Clicked!');
            var values = panel.getForm().getValues();
            
            switch(values.travelClass){
                default:
                case 1:
                    debugPanel.update('Reset Clicked!');
                    break;
                case 1:
                    break;
                case 1:
                    break;
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