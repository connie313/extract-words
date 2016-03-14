var mongoose = require('mongoose');

// Create a new schema for our tweet data
var schema = new mongoose.Schema({
    airlinecode: String,
    keywords: [String],
    created_at: Date,
    id: Number,
    id_str: String,
    text: String,
    source: String,
    truncated: Boolean,
    in_reply_to_status_id: Number,
    in_reply_to_status_id_str: String,
    in_reply_to_user_id: Number,
    in_reply_to_user_id_str: String,
    in_reply_to_screen_name: String,
    entities: 
   {
    hashtags: [String],
    symbols: [String],
    urls: [String],
    user_mentions: [String],
    media: [{
      id: Number,
      id_str: String,
      indices: [Number],
      media_url: String,
      media_url_https: String,
      url: String,
      display_url: String,
      expanded_url: String,
      type: String,
      sizes: {
        medium: {
          w: Number,
          h: Number,
          resize: String
        },
        thumb: {
          w: Number,
          h: Number,
          resize: String
        },
        small: {
          w: Number,
          h: Number,
          resize: String
        },
        large: {
          w: Number,
          h: Number,
          resize: String
        }
        }
        }]
    },
    user: 
    { 
    id: Number,
     id_str: String,
     name: String,
     screen_name: String,
     location: String,
     url: String,
     description: String,
     protected: Boolean,
     verified: Boolean,
     followers_count: Number,
     friends_count: Number,
     listed_count: Number,
     favourites_count: Number,
     statuses_count: Number,
     created_at: Date,
     utc_offset: Number,
     time_zone: String,
     geo_enabled: Boolean,
     lang: String,
     contributors_enabled: Boolean,
     is_translator: Boolean,
     profile_background_color: String,
     profile_background_image_url: String,
     profile_background_image_url_https: String,
     profile_background_tile: Boolean,
     profile_link_color: String,
     profile_sidebar_border_color: String,
     profile_sidebar_fill_color: String,
     profile_text_color: String,
     profile_use_background_image: Boolean,
     profile_image_url: String,
     profile_image_url_https: String,
     default_profile: Boolean,
     default_profile_image: Boolean,
     following: String,
     follow_request_sent: Boolean,
     notifications: Boolean },
  coordinates: {
    coordinates:[Number]
  },
  place: {
     bounding_box:
    {
      coordinates:[Number]
    },
     country:String,
     country_code:String,
     full_name:String,
     id:String,
     name:String,
     place_type:String,
     url: String
  },
  contributors: [{
    id:Number,
    id_str: String,
    screen_name:String
  }],
  is_quote_status: Boolean,
  retweet_count: Number,
  favorite_count: Number,
  favorited: Boolean,
  retweeted: Boolean,
  filter_level: String,
  lang: String,
  timestamp_ms: String,
  sentiment: Number
})
.index({
  'text':'text'
});

module.exports = Tweet = mongoose.model('Tweet', schema);