var app = app || {};

app.AppView = Backbone.View.extend({
    el: '.skills',
    // statsTemplate: _.template( $('#stats-template').html() ),

    events: {
        'keypress .enter-skill-level' : 'createOnEnter',
        'click .clear-skills' : 'clearSkillsList',
    },

    initialize: function(){
        this.$inputSkillName = this.$('.enter-skill-name');
        this.$inputSkillLevel = this.$('.enter-skill-level');
        this.$clearButon = this.$('.clear-skills');
        this.$main = this.$('.main');
        this.listenTo(app.Skills, 'add', this.addOne);
        this.listenTo(app.Skills, 'reset', this.addAll);
        // this.listenTo(app.Skills, 'change:completed', this.filterOne);
        // this.listenTo(app.Skills,'filter', this.filterAll);
        this.listenTo(app.Skills, 'all', this.render);
        app.Skills.fetch();
    },

    render: function() {
        if ( app.Skills.length ) {
            this.$main.removeClass('invisible');
        } else {
            this.$main.addClass('invisible');
        }
    },

    addOne: function(skill){
        var view = new app.SkillView({
            model:skill
        });
        $('.skills-list').append( view.render().el );
    },

    addAll: function(){
        this.$('.skills-list').html('');
        app.Skills.each(this.addOne,this);
    },

    newAttributes: function() {
        return {
            skillLevel: this.$inputSkillLevel.val().trim(),
            order: app.Skills.nextOrder(),
            skillName: this.$inputSkillName.val().trim()
        };
    },

    createOnEnter: function( event ) {
        if ( event.which !== ENTER_KEY || !this.$inputSkillName.val().trim() || !this.$inputSkillLevel.val().trim() ) {
            return;
        }
        app.Skills.create( this.newAttributes() );
        this.$inputSkillName.val('');
        this.$inputSkillLevel.val('');
    },

    clearSkillsList: function() {
        // _.invoke(app.Skills, 'destroy');
        app.Skills.reset();
        app.Skills.localStorage._clear();
        this.$clearButon.addClass('disabled');
        // return false;
    }

});