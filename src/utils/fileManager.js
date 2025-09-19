import fs from 'fs';
import path from 'path';
import { PATHS } from '../config/config.js';

export function ensureDirectoryExistence(dirPath) {
    if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    }
}

export function saveScreenshot(page, filename) {
    const screenshotsDir = path.resolve(process.cwd(), PATHS.screenshots);
    ensureDirectoryExistence(screenshotsDir);

    return page.screenshot({ path: path.join(screenshotsDir, filename) });
}
