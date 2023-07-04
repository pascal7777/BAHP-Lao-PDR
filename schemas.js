const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required().escapeHTML(),
    location: Joi.string().required().escapeHTML(),
        connection: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
        situation: Joi.string().required().escapeHTML(),
    scope: Joi.string().escapeHTML(),
    scope_detail: Joi.string().escapeHTML(),
      scope_starty: Joi.string().escapeHTML(),
      scope_startq: Joi.string().escapeHTML(),
          scope_endy: Joi.string().escapeHTML(),
       scope_endq: Joi.string().escapeHTML(),
    
     equipment1: Joi.string().escapeHTML(),
      equipment1_starty: Joi.string().escapeHTML(),
        equipment1_startq: Joi.string().escapeHTML(),
            equipment1_endy: Joi.string().escapeHTML(),
         equipment1_endq: Joi.string().escapeHTML(),
       equipment2: Joi.string().escapeHTML(),
    equipment2_starty: Joi.string().escapeHTML(),
      equipment2_startq: Joi.string().escapeHTML(),
          equipment2_endy: Joi.string().escapeHTML(),
       equipment2_endq: Joi.string().escapeHTML(),
    
     safeguards: Joi.string().escapeHTML(),
     gender: Joi.string().escapeHTML(),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().required().escapeHTML(),
  }).required(),
});
