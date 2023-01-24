import * as core from '@actions/core';
import axios from 'axios';
import FormData = require('form-data');;
import * as fs from 'fs';

type WorkParams = {
    access_token?: string;
    uploadTo: string;
    files: string[];
}

export async function uploader(params: WorkParams) {
    const { uploadTo, files } = params;
    const access_token = params?.access_token ?? undefined;

    for (const file of files) {
        core.info(`Uploading ${file} to ${uploadTo}`);

        const form = new FormData();
        form.append('file', fs.createReadStream(file));

        const headers = {};
        Object.assign(
            headers,
            access_token
                ? { 'Authorization': `Bearer ${access_token}` }
                : {},
            { ...form.getHeaders() }
        );
        const request_config = { headers };

        try {
            await axios.post(uploadTo, form, request_config);
        } catch (err: any) {
            core.error(`Failed to upload ${file} to ${uploadTo}`);
            core.error(err.message);
        }
    }
}