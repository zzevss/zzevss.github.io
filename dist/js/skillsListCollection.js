var app = app || {};

var SkillsList = Backbone.Collection.extend({
	model: app.Skill,
	localStorage: new Backbone.LocalStorage('skills-backbone'),

	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	},
	comparator: function( skill ) {
		return skill.get('order');
	}
});

app.Skills = new SkillsList();