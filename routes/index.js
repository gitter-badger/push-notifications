import express from 'express';
import User from '../models/User';

const router = express.Router();

function createRecord(model, data) {
  model.create(data, (err, post) => {
    if (err) return err;
    return post;
  });
}

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express'
  });
  const user = new User({
    name: 'semih',
    username: 'semyonic',
    password: '123'
  });
  console.error(createRecord(User, user));
});

export default router;
