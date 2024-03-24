//src/index.js
import { logger } from "./application/logging.js";
import { app } from "./application/web.js";


// Jalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});