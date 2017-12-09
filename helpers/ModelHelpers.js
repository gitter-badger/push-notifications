
function createRecord(model, data) {
  model.create(data, (err, post) => {
    if (err) return next(err);
    return post;
  });
}
