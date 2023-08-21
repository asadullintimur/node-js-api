const Router = require('../services/Router'),
     postController = require('../controllers/PostController');

const postRouter = new Router();

postRouter.get('/posts', postController.index)
postRouter.post('/posts', postController.create)
postRouter.put('/posts', postController.update)
postRouter.delete('/posts', postController.delete)

module.exports = postRouter;