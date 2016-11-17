var app = app || {};

app.Skill = Backbone.Model.extend({
	default: {
		skillLevel: 0,
		skillName: ''
	}
});