/**
 * Хук для загрузки данных из Google Sheets с поддержкой кэширования
 */

import { useState, useEffect, useCallback } from 'react';
import { sheetsClient } from '../api';

export interface UseGoogleSheetsOptions {
    skip?: boolean;
    cacheTime?: number;
    transformData?: (data: string[][]) => any[];
    dependencies?: any[];
}

export interface UseGoogleSheetsResult<T = string[][]> {
    data: T | null;
    headers: string[];
    loading: boolean;
    error: string | null;
    lastUpdated: number | null;
    refresh: () => Promise<void>;
    isEmpty: boolean;
}

const useGoogleSheets = <T = any[]>(
    spreadsheetId: string | null,
    range: string | null,
    options: UseGoogleSheetsOptions = {}
): UseGoogleSheetsResult<T> => {
    const {
        skip = false,
        cacheTime = 5 * 60 * 1000, // 5 минут кэширование по умолчанию
        transformData = null,
        dependencies = []
    } = options;

    const [data, setData] = useState<T | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [loading, setLoading] = useState(!skip);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<number | null>(null);

    const fetchData = useCallback(async () => {
        if (!spreadsheetId || !range) return;


        try {
            setLoading(true);
            setError(null);

            const result = await sheetsClient.getSheetData(spreadsheetId, range);

            // Применяем трансформацию если нужно
            const processedData = transformData
                ? transformData(result.values) as T
                : result.values as T;

            setData(processedData);
            setHeaders(result.headers);
            setLastUpdated(Date.now());
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки данных';
            setError(errorMessage);
            console.error('useGoogleSheets error:', err);
        } finally {
            setLoading(false);
        }
    }, [spreadsheetId, range, transformData, cacheTime]);

    const refresh = useCallback(() => {
        return fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (!skip && spreadsheetId && range) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spreadsheetId, range, skip, ...dependencies]);

    return {
        data,
        headers,
        loading,
        error,
        lastUpdated,
        refresh,
        isEmpty: !data || (Array.isArray(data) && data.length === 0)
    };
};

export default useGoogleSheets;