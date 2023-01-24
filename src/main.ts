import * as core from '@actions/core'
import { uploader } from "./uploader";

async function run(): Promise<void> {
    const access_token = core.getInput('access-token');
    const uploadTo = core.getInput('url');
    const files: string[] = core
        .getInput('files')
        .split("\n")
        .filter(x => x !== "");

    uploader({ access_token, uploadTo, files });
}

run();
