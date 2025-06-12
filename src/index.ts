import { env } from '@/common/utils/envConfig';
import { app, logger } from '@/server';

app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});
