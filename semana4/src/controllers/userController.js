import storage, { saveData } from '../storage.js';

export function getUsers(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(storage.users));
}

// export function getUserById(req, res) {}

export function addUser(req, res) {
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', async () => {
    const user = JSON.parse(body);
    user.id = storage.users.length + 1;
    storage.users.push(user);
    await saveData('users');
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Usuario creado',
      user
    }));
  });
}

//export function updateUser() { }
//export function deleteUser() { }