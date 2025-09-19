
export function logInfo(message: string): void {
    console.info(`[INFO]: ${message}`);
}

export function logError(error: Error): void {
    console.error(`[ERROR]: ${error.message}`);
}
