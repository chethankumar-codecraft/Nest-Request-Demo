import { Logger } from '@nestjs/common';

export function ipBlock(req, res, next) {
  const logger = new Logger('ipBlock');
  logger.log(`IP: ${req.ip}`);
  const blockIp = ['127.0.0.1', '::1'];

  if (blockIp.includes(req.ip)) {
    res.status(403).send('Access Denied');
    return;
  }
  next();
}
