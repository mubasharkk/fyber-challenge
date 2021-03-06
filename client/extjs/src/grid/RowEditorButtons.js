/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-09-18 17:18:59 (940c324ac822b840618a3a8b2b4b873f83a1a9b1)
*/
/**
 * @private
 * Private Container class used by the {@link Ext.grid.RowEditor} to hold its buttons.
 */
Ext.define('Ext.grid.RowEditorButtons', {
    extend: 'Ext.container.Container',
    alias: 'widget.roweditorbuttons',

    frame: true,
    shrinkWrap: true,
    position: 'bottom',

    constructor: function(config) {
        var me = this,
            rowEditor = config.rowEditor,
            cssPrefix = Ext.baseCSSPrefix,
            plugin = rowEditor.editingPlugin;

        config = Ext.apply({
            baseCls: cssPrefix + 'grid-row-editor-buttons',
            defaults: {
                xtype: 'button',
                ui: rowEditor.buttonUI,
                scope: plugin,
                flex: 1,
                minWidth: Ext.panel.Panel.prototype.minButtonWidth
            },
            items: [{
                cls: cssPrefix + 'row-editor-update-button',
                itemId: 'update',
                handler: plugin.completeEdit,
                text: rowEditor.saveBtnText,
                disabled: rowEditor.updateButtonDisabled
            }, {
                cls: cssPrefix + 'row-editor-cancel-button',
                handler: plugin.cancelEdit,
                text: rowEditor.cancelBtnText
            }]
        }, config);

        me.callParent([config]);

        me.addClsWithUI(me.position);
    },

    setButtonPosition: function(position) {
        var me = this,
            rowEditor = this.rowEditor,
            rowEditorHeight = rowEditor.getHeight(),
            rowEditorBody = rowEditor.body,
            bottom = '',
            top = '';

        me.removeClsWithUI(me.position);
        me.position = position;
        me.addClsWithUI(position);
        // we tried setting the top/bottom value in the stylesheet based on form field
        // height + row editor padding, but that approach does not work when there are
        // larger things inside the editor, e.g. textarea, so we have to measure
        // the row editor height and position the buttons accordingly (see EXTJSIV-9914).
        if (position === 'top') {
            bottom = (rowEditorHeight - rowEditorBody.getBorderWidth('t')) + 'px';
        } else {
            top = (rowEditorHeight - rowEditorBody.getBorderWidth('b')) + 'px';
        }

        me.el.setStyle({
            top: top,
            bottom: bottom
        });
    },

    getFramingInfoCls: function(){
        return this.baseCls + '-' + this.ui + '-' + this.position;
    },

    getFrameInfo: function() {
        var frameInfo = this.callParent();

        // Trick Renderable into rendering the top framing elements, even though they
        // are not needed in the default "bottom" position.  This allows us to flip the
        // buttons into "top" position without re-rendering.
        frameInfo.top = true;

        return frameInfo;
    }
});