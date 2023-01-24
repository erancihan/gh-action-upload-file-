import { uploader } from '../src/uploader';

uploader({
  access_token: '',
  files: ['./package-lock.json'],
  uploadTo: 'http://localhost:8080/upload',
});
