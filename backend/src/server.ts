import http from 'http';
import './database/connection';
import app from './app';

const server = http.createServer(app);
server.listen(3333);
