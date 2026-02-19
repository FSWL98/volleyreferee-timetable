export interface SheetDataResponse {
    values: string[][];
    range: string;
    headers: string[];
}

class GoogleSheetsAPI {
    private readonly apiKey: string;
    private readonly baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * Получить данные из таблицы по диапазону
     * @param spreadsheetId - ID таблицы
     * @param range - диапазон (например, 'Sheet1!A:J')
     */
    async getSheetData(spreadsheetId: string, range: string): Promise<SheetDataResponse> {
        try {
            const url = `${this.baseUrl}/${spreadsheetId}/values/${range}?key=${this.apiKey}`;

            const response = await fetch(url);

            if (!response.ok) {
                const error = await response.json() as { error?: { message: string } };
                throw new Error(error.error?.message || 'Ошибка загрузки данных');
            }

            const data = await response.json() as { values?: string[][]; range: string };
            return {
                values: data.values || [],
                range: data.range,
                headers: data.values?.[0] || [] // первая строка - заголовки
            };
        } catch (error) {
            console.error('Google Sheets API Error:', error);
            throw error;
        }
    }
}

export default GoogleSheetsAPI;