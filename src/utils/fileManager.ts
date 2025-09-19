import fs from 'fs';
import path from 'path';
import type { Page } from 'puppeteer';
import { PATHS } from '../config/config.js';

export function ensureDirectoryExistence(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    }
}

export function saveScreenshot(page: Page, filename: string): Promise<Uint8Array> {
    const screenshotsDir = path.resolve(process.cwd(), PATHS.screenshots);
    ensureDirectoryExistence(screenshotsDir);

    return page.screenshot({ path: path.join(screenshotsDir, filename) });
}
