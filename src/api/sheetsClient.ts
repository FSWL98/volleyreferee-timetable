/**
 * Инициализация Google Sheets API клиента с переменными окружения
 */

import GoogleSheetsAPI from './googleSheets';

// Получаем API ключ из переменных окружения
// В Create React App переменные окружения доступны через process.env
// но только внутри функций, а не на верхнем уровне файла?
// На самом деле в CRA process.env доступен и на верхнем уровне,
// но для надежности можно использовать функцию-геттер

const getApiKey = (): string => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    if (!apiKey) {
        console.warn('VITE_API_KEY не найден в переменных окружения');
        return '';
    }
    return apiKey;
};

// Создаем и экспортируем единственный экземпляр
const sheetsAPI = new GoogleSheetsAPI(getApiKey());

export default sheetsAPI;