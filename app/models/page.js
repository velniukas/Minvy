var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Count = mongoose.model('Count');
var config = load.helper('config');

// Make _id a Numver once old schemas are migrated from version 1 to 2
var PageSchema = new Schema({
  _id: { type: ObjectId },
  id: { type: Number, unique: true, index: true },
  name: { type: String, trim: true },
  category: { type: String, trim: true },

  onelinepitch: { type: String },
  detailedpitch: { type: String },
  opsheader: { type: String },
  calltoaction: { type: String }
  email: { type: String, index: true, trim: true },

  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
}, {
  collection: 'pages'
});

// Set default id
PageSchema.pre('save', function(next) {
  var page = this;


  if(!page.id) {
    Count.getNext('page', function(error, id) {
      page.id = id;
      next();
    })
  } else {
    next();
  }
});

PageSchema.statics.findById = function(id, callback) {
  try {
    id = parseInt(id.toString());
  } catch(error) {
    log.warn('Database migration required');
  }

  this.findOne({ id: id }, callback);
};

PageSchema.statics.findOrCreate = function(source, pageData, promise) {
  findBySource(source, pageData, function(error, dbPage){
    if (error) {
      promise.fail(error);
    }

    if(!dbPage) {
      log.trace('Could not find page!');

      // if no, add a new page with specified info
      createNew(source, pageData, function(error, dbPage) {
        if(error) {
          promise.fail(error);
        }
        
        promise.fulfill(dbPage);
      });
    } else {
      // if yes, merge/update the info
      if(!source) {
        promise.fulfill(dbPage);
      } else {
        var now = new Date();
        dbPage[source] = pageData;
        dbPage.markModified(source);
        dbPage.modified_at = now.getTime();

        if(!dbPage.name && pageData['name']) {
          dbPage.name = pageData.name;
        }
        if(!dbPage.email && pageData['email']) {
          dbPage.email = pageData.email;
        }

        dbPage.save(function(error) {
          if(error) {
            promise.fail(error);
          }
          promise.fulfill(dbPage);
        });
      }
    }
  });
};

mongoose.model('Page', PageSchema);

var Page = mongoose.model('Page');


// Support functions

var createNew = function(source, pageData, callback) {
  var newPage = new Page();
  if(pageData.name) {
    newPage.name = pageData.name
  }
  if(pageData.email) {
    newPage.email = pageData.email;
  }

  } 

  newPage[source] = pageData;
  newPage.save(function(error) {
    if(error) {
      callback(error);
    }

    callback(null, newPage);
  });
};



