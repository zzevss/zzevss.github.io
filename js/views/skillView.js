var app = app || {};

app.SkillView = Backbone.View.extend({
    tagName: 'li',

    template: _.template( $('#skill-item-template').html() ),

    events: {
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'blurInput'
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    },

    edit: function(e) {
        $(e.target).closest('.info-block').addClass('editing').
            find('.edit').focus().select();
    },

    close: function(skill) {
        var $this = $(this),
            value = $this.val().trim(),
            name = $this.data('name');

        if ( value ) {
            name == 'skillName' ? skill.save({ skillName: value }) : skill.save({ skillLevel: value });
        }
        $this.closest('.info-block').removeClass('editing');
    },

    blurInput: function( e ) {
        this.close.call($(e.target), this.model);
    },

    updateOnEnter: function( e ) {
        if ( e.which === ENTER_KEY ) {
            this.close.call($(e.target), this.model);
        }
    }
});