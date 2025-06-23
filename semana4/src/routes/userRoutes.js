import { getUsers, addUser } from '../controllers/userController.js';

export function usersRouter(req, res) {
  if (req.pathname === '/users' && req.method === 'GET') {
    return getUsers(req, res);
  }
  if (req.pathname === '/users' && req.method === 'POST') {
    return addUser(req, res);
  }
  return false
}