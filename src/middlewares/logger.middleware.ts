import { NextFunction } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const now = new Date();
  const format = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric'
  });
  console.log(now);

  console.log(
    `Estas ejecutando un metodo ${req.method} en la ruta ${req.url} con fecha: ${format}`,
  );
  next();
}
