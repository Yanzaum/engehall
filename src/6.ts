import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 3000;

app.use(express.json());

interface User {
  id: number;
  username: string;
  password: string;
}

const users: User[] = [
  {
    id: 1,
    username: 'user1',
    password: '$2b$10$E9cWc0Z.wH3VxlH6USbTneJcX9h6qfwUlx2rTgZh/QsJhfp6uBlgK' // password1
  }
];

const jwtSecret = 'jwtsecret';

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });

  res.json({ token });
});

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as User;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

app.get('/protected', authenticateJWT, (req: Request, res: Response) => {
  res.json({ message: 'Acesso concedido à rota protegida', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
