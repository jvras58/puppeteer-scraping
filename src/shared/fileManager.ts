import fs from 'fs';
import path from 'path';
import type { Page } from 'puppeteer';
import { PATHS } from './config.js';

export function ensureDirectoryExistence(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    }
}

export function saveScreenshot(page: Page, filename: string): Promise<Uint8Array> {
    const screenshotsDir = path.resolve(process.cwd(), PATHS.screenshots);
    ensureDirectoryExistence(screenshotsDir);
    
    const validExtensions = ['.png', '.jpeg', '.webp'];
    const hasValidExtension = validExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    const finalFilename = hasValidExtension ? filename : `${filename}.png`;
    
    const screenshotPath = path.join(screenshotsDir, finalFilename) as `${string}.png` | `${string}.jpeg` | `${string}.webp`;

    return page.screenshot({ path: screenshotPath });
}
