import 'reflect-metadata';

import app from "./app";
import { createConnection } from "typeorm";
createConnection();

app.listen(app.get('port'), "0.0.0.0");
console.log('Server on port', app.get('port'));