Ext.application({
    name : 'fyber-challenge',
    
    launch : function(){
        
        Ext.create('Ext.container.Viewport', 
        {
            layout : 'fit',
            
            items : [{
                title : 'First ExtJS Application - Viewport title',
                html : 'Application Viewport area.'
            }]
        });
        
    }
});


Ext.define('');